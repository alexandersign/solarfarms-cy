import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { buildSystemPrompt } from '@/lib/chat-knowledge-base'
import { supabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// In-memory rate limiter: max requests per IP within a sliding window
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10  // max 10 requests per minute per IP
const RATE_LIMIT_DAILY_MAX = 100    // max 100 requests per day per IP
const DAY_MS = 86_400_000

const rateLimitMap = new Map<string, number[]>()
const dailyLimitMap = new Map<string, number[]>()

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamps] of rateLimitMap) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
    if (valid.length === 0) rateLimitMap.delete(key)
    else rateLimitMap.set(key, valid)
  }
  for (const [key, timestamps] of dailyLimitMap) {
    const valid = timestamps.filter((t) => now - t < DAY_MS)
    if (valid.length === 0) dailyLimitMap.delete(key)
    else dailyLimitMap.set(key, valid)
  }
}, 300_000)

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now()

  // Per-minute check
  const minuteTimestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )
  if (minuteTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = minuteTimestamps[0]
    return { allowed: false, retryAfterMs: RATE_LIMIT_WINDOW_MS - (now - oldestInWindow) }
  }

  // Daily check
  const dayTimestamps = (dailyLimitMap.get(ip) || []).filter(
    (t) => now - t < DAY_MS
  )
  if (dayTimestamps.length >= RATE_LIMIT_DAILY_MAX) {
    return { allowed: false, retryAfterMs: DAY_MS - (now - dayTimestamps[0]) }
  }

  minuteTimestamps.push(now)
  dayTimestamps.push(now)
  rateLimitMap.set(ip, minuteTimestamps)
  dailyLimitMap.set(ip, dayTimestamps)

  return { allowed: true }
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  messages: ChatMessage[]
  visitorName?: string
  visitorEmail?: string
  sessionId?: string
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Chat service is not configured.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Rate limiting
    const clientIp = getClientIp(request)
    const { allowed, retryAfterMs } = checkRateLimit(clientIp)
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((retryAfterMs || 60000) / 1000)),
          },
        }
      )
    }

    const body: ChatRequestBody = await request.json()
    const { messages, visitorName, visitorEmail, sessionId } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (messages.length > 50) {
      return new Response(
        JSON.stringify({ error: 'Conversation too long. Please start a new chat.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate message content sizes to prevent prompt injection via oversized payloads
    const totalContentLength = messages.reduce((sum, m) => sum + (m.content?.length || 0), 0)
    if (totalContentLength > 20_000) {
      return new Response(
        JSON.stringify({ error: 'Message content too large.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (visitorEmail && sessionId) {
      saveChatLead(visitorName, visitorEmail, sessionId, messages).catch(() => {})
    }

    const systemPrompt = buildSystemPrompt()
    const liveMarketData = getLatestMarketStats()

    const contextNote = [
      visitorName
        ? `\nThe visitor's name is ${visitorName}. Use it naturally in conversation when appropriate (don't overuse it).`
        : '',
      liveMarketData
        ? `\n\n## Live Market Data (auto-updated daily from TSOC)\n${liveMarketData}`
        : '',
    ].join('')

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt + contextNote },
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`
            )
          )
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function saveChatLead(
  name: string | undefined,
  email: string,
  sessionId: string,
  messages: ChatMessage[]
) {
  try {
    const { error } = await supabase.from('chat_leads').upsert(
      {
        session_id: sessionId,
        name: name || null,
        email,
        message_count: messages.length,
        last_message: messages[messages.length - 1]?.content?.slice(0, 500),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    )
  } catch {
    // Silently fail — lead capture is best-effort
  }
}

let cachedMarketStats: { data: string; loadedAt: number } | null = null
const MARKET_CACHE_TTL = 3_600_000 // 1 hour

function getLatestMarketStats(): string | null {
  try {
    if (cachedMarketStats && Date.now() - cachedMarketStats.loadedAt < MARKET_CACHE_TTL) {
      return cachedMarketStats.data
    }

    const filePath = path.join(process.cwd(), 'market/data/market-data.json')
    if (!fs.existsSync(filePath)) return null

    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const stats = raw.statistics?.overall
    const dateRange = raw.dateRange
    const lastUpdated = raw.lastUpdated

    if (!stats) return null

    const hourly: Array<{ hour: number; avgPrice: number }> = raw.statistics?.hourlyAvg || []
    const middayAvg = hourly
      .filter((h) => h.hour >= 10 && h.hour <= 14)
      .reduce((sum, h) => sum + h.avgPrice, 0) / 5
    const peakAvg = hourly
      .filter((h) => h.hour >= 17 && h.hour <= 20)
      .reduce((sum, h) => sum + h.avgPrice, 0) / 4
    const lowestHour = hourly.reduce((min, h) => (h.avgPrice < min.avgPrice ? h : min), hourly[0])
    const highestHour = hourly.reduce((max, h) => (h.avgPrice > max.avgPrice ? h : max), hourly[0])

    const result = [
      `Data last updated: ${new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      `Dataset period: ${dateRange?.start} to ${dateRange?.end} (${raw.totalFiles} TSOC DAM files, ${raw.totalRecords?.toLocaleString()} half-hourly records)`,
      `Overall average MCP: €${stats.avgPrice?.toFixed(1)}/MWh`,
      `Solar hours average (06:00-17:00): €${stats.solarHoursAvg?.toFixed(1)}/MWh`,
      `Peak hours average (17:00-21:00): €${stats.peakHoursAvg?.toFixed(1)}/MWh`,
      `Midday average (10:00-14:00): €${middayAvg?.toFixed(1)}/MWh`,
      `Evening peak average (17:00-20:00): €${peakAvg?.toFixed(1)}/MWh`,
      `Peak-to-midday arbitrage spread: €${(peakAvg - middayAvg)?.toFixed(1)}/MWh`,
      `Lowest average hour: ${lowestHour?.hour}:00 at €${lowestHour?.avgPrice?.toFixed(1)}/MWh`,
      `Highest average hour: ${highestHour?.hour}:00 at €${highestHour?.avgPrice?.toFixed(1)}/MWh`,
      `Price range: €${stats.minPrice}/MWh to €${stats.maxPrice}/MWh`,
    ].join('\n')

    cachedMarketStats = { data: result, loadedAt: Date.now() }
    return result
  } catch {
    return null
  }
}
