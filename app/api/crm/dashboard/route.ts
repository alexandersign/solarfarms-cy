/**
 * CRM Dashboard API — Alexander-only.
 *
 * Returns:
 *  - activitySummary: per-user call/email/note/status counts, filtered by date range
 *  - pipelineByStage: count + totalDealValue + weightedValue per outreach_status
 *  - deals: prospects in proposal_sent | negotiating (with probability + close date)
 *
 * GET ?range=today|week|month   (default: week)
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCrmToken } from '@/lib/crm-auth'
import { DAILY_CALL_TARGETS } from '@/lib/crm-targets'
import type { ActivityEntry } from '@/lib/supabase'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'

const STAGE_PROBABILITY: Record<string, number> = {
  new: 0.05, researching: 0.10, contacted: 0.20, responded: 0.35,
  meeting_set: 0.50, proposal_sent: 0.65, negotiating: 0.80,
  won: 1.0, lost: 0, not_interested: 0,
}

function startOfRange(range: string): Date {
  const now = new Date()
  if (range === 'today') {
    const d = new Date(now)
    d.setHours(0, 0, 0, 0)
    return d
  }
  if (range === 'month') {
    const d = new Date(now)
    d.setDate(1); d.setHours(0, 0, 0, 0)
    return d
  }
  // default: week
  const d = new Date(now)
  d.setDate(d.getDate() - 6); d.setHours(0, 0, 0, 0)
  return d
}

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (token.email !== ALEXANDER_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const range = new URL(request.url).searchParams.get('range') || 'week'
  const since = startOfRange(range).toISOString()

  // Fetch all prospects with activity_feed + deal fields
  const { data, error } = await supabase
    .from('pv_prospects')
    .select(
      'id, company_name, outreach_status, offer_type, estimated_deal_value, ' +
      'assigned_name, assigned_to, close_probability, expected_close_date, ' +
      'last_contact_date, first_contact_date, activity_feed, segment, district'
    )
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const all = (data as unknown as {
    id: string
    company_name?: string
    outreach_status?: string
    offer_type?: string
    estimated_deal_value?: number
    assigned_name?: string
    assigned_to?: string
    close_probability?: number
    expected_close_date?: string
    last_contact_date?: string
    first_contact_date?: string
    activity_feed?: ActivityEntry[]
    segment?: string
    district?: string
  }[]) || []

  // ─── A. Activity summary ──────────────────────────────────────────────────
  const activityMap: Record<string, {
    calls: number; emails: number; notes: number; statusChanges: number
    lastActive: string | null
  }> = {}

  for (const p of all) {
    const feed = (p.activity_feed || []) as ActivityEntry[]
    for (const e of feed) {
      if (e.ts < since) continue
      const author = e.author || 'Unknown'
      if (!activityMap[author]) {
        activityMap[author] = { calls: 0, emails: 0, notes: 0, statusChanges: 0, lastActive: null }
      }
      const a = activityMap[author]
      if (e.type === 'call')   a.calls++
      else if (e.type === 'email') a.emails++
      else if (e.type === 'note')  a.notes++
      else if (e.type === 'status') a.statusChanges++
      if (!a.lastActive || e.ts > a.lastActive) a.lastActive = e.ts
    }
  }

  // Build CRM user → email lookup for target resolution
  // Author names in activity_feed match CRM_USERS.name, so we match by name key
  const nameToEmail: Record<string, string> = {
    'Alexander': 'alexander.papacosta@lighthief.com',
    'Zinovia': 'zinovia@lighthief.com',
    'Costas': 'costas@lighthief.com',
    'Andreas': 'office@lighthief.com',
    'Office': 'office@lighthief.com',  // legacy entries keep working
  }

  const activitySummary = Object.entries(activityMap)
    .map(([author, stats]) => {
      const email = nameToEmail[author] || author
      const callTarget = DAILY_CALL_TARGETS[email] ?? 10
      const callPct = Math.min(100, Math.round((stats.calls / callTarget) * 100))
      return { author, ...stats, callTarget, callPct }
    })
    .sort((a, b) => (b.calls + b.emails + b.notes) - (a.calls + a.emails + a.notes))

  // ─── B. Pipeline by stage ─────────────────────────────────────────────────
  const stageMap: Record<string, { count: number; totalDealValue: number; weightedValue: number }> = {}
  for (const p of all) {
    const st = p.outreach_status || 'new'
    if (!stageMap[st]) stageMap[st] = { count: 0, totalDealValue: 0, weightedValue: 0 }
    const deal = Number(p.estimated_deal_value) || 0
    const prob = (p.close_probability != null ? p.close_probability / 100 : STAGE_PROBABILITY[st]) ?? 0.1
    stageMap[st].count++
    stageMap[st].totalDealValue += deal
    stageMap[st].weightedValue  += deal * prob
  }

  const STAGE_ORDER = ['new','researching','contacted','responded','meeting_set','proposal_sent','negotiating','won','lost','not_interested']
  const pipelineByStage = STAGE_ORDER
    .filter((s) => stageMap[s])
    .map((stage) => ({ stage, ...stageMap[stage] }))

  // ─── C. Deals table (proposal_sent + negotiating) ─────────────────────────
  const deals = all
    .filter((p) => ['proposal_sent', 'negotiating'].includes(p.outreach_status || ''))
    .map((p) => {
      const prob = p.close_probability != null
        ? p.close_probability
        : Math.round((STAGE_PROBABILITY[p.outreach_status || 'new'] ?? 0.1) * 100)
      const daysSinceContact = p.last_contact_date
        ? Math.floor((Date.now() - new Date(p.last_contact_date).getTime()) / 86400000)
        : null
      return {
        id: p.id,
        company_name: p.company_name,
        outreach_status: p.outreach_status,
        offer_type: p.offer_type,
        estimated_deal_value: p.estimated_deal_value,
        assigned_name: p.assigned_name,
        assigned_to: p.assigned_to,
        close_probability: prob,
        expected_close_date: p.expected_close_date,
        last_contact_date: p.last_contact_date,
        days_since_contact: daysSinceContact,
        segment: p.segment,
        district: p.district,
        weighted_value: Math.round((Number(p.estimated_deal_value) || 0) * prob / 100),
      }
    })
    .sort((a, b) => (b.weighted_value || 0) - (a.weighted_value || 0))

  // ─── D. Totals ────────────────────────────────────────────────────────────
  const totals = {
    total: all.length,
    active: all.filter((p) => ['contacted','responded','meeting_set','proposal_sent','negotiating'].includes(p.outreach_status || '')).length,
    won: all.filter((p) => p.outreach_status === 'won').length,
    totalPipeline: all.reduce((s, p) => s + (Number(p.estimated_deal_value) || 0), 0),
    weightedPipeline: all.reduce((s, p) => {
      const prob = p.close_probability != null ? p.close_probability / 100 : (STAGE_PROBABILITY[p.outreach_status || 'new'] ?? 0.1)
      return s + (Number(p.estimated_deal_value) || 0) * prob
    }, 0),
  }

  return NextResponse.json({ activitySummary, pipelineByStage, deals, totals, range })
}
