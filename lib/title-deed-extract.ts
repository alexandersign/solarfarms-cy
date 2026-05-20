import OpenAI from 'openai'
import { z } from 'zod'

const titleDeedSchema = z.object({
  registrationNumber: z.string().optional(),
  sheetPlan: z.string().optional(),
  block: z.string().optional(),
  plotNumber: z.string().optional(),
  district: z.string().optional(),
  village: z.string().optional(),
  areaSqm: z.number().optional(),
  areaDescription: z.string().optional(),
  zoneCode: z.string().optional(),
  owners: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

export type TitleDeedExtract = z.infer<typeof titleDeedSchema> & {
  source: 'ai' | 'manual'
  confidence: 'high' | 'medium' | 'low'
}

const EXTRACT_PROMPT = `You extract structured data from Cyprus Land Registry title deeds or cadastral documents (Greek and/or English).
Return JSON only with these fields when present:
registrationNumber, sheetPlan, block, plotNumber, district, village, areaSqm (number), areaDescription (e.g. "2.5 hectares"),
zoneCode (planning zone like Γ3, G3, Α2), owners (array of names), notes (brief caveats).
If a field is missing, omit it. areaSqm must be in square metres if stated; convert hectares/donums if needed (1 donum ≈ 1000 sqm, 1 ha = 10000 sqm).`

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

async function extractFromImage(buffer: Buffer, mime: string): Promise<TitleDeedExtract | null> {
  const openai = getOpenAI()
  if (!openai) return null

  const b64 = buffer.toString('base64')
  const dataUrl = `data:${mime};base64,${b64}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: EXTRACT_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Extract all cadastral fields from this Cyprus title deed or plot document.' },
          { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } },
        ],
      },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 800,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) return null
  const parsed = titleDeedSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) return null

  return {
    ...parsed.data,
    source: 'ai',
    confidence: parsed.data.registrationNumber && parsed.data.areaSqm ? 'high' : 'medium',
  }
}

async function extractFromPdfText(text: string): Promise<TitleDeedExtract | null> {
  const openai = getOpenAI()
  if (!openai || text.length < 20) return null

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: EXTRACT_PROMPT },
      {
        role: 'user',
        content: `Extract cadastral fields from this title deed text:\n\n${text.slice(0, 12000)}`,
      },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 800,
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) return null
  const parsed = titleDeedSchema.safeParse(JSON.parse(raw))
  if (!parsed.success) return null

  return {
    ...parsed.data,
    source: 'ai',
    confidence: parsed.data.registrationNumber ? 'high' : 'medium',
  }
}

/** Best-effort PDF text via dynamic import (pdf-parse v2 API). */
async function pdfToText(buffer: Buffer): Promise<string> {
  try {
    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    try {
      const textResult = await parser.getText()
      return textResult.text || ''
    } finally {
      await parser.destroy()
    }
  } catch {
    return ''
  }
}

export async function extractTitleDeedFromFile(
  file: File
): Promise<TitleDeedExtract | null> {
  const mime = file.type || 'application/octet-stream'
  const buffer = Buffer.from(await file.arrayBuffer())

  if (mime.startsWith('image/')) {
    return extractFromImage(buffer, mime)
  }

  if (mime === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const text = await pdfToText(buffer)
    if (text.length > 50) {
      return extractFromPdfText(text)
    }
    // Scanned PDF — no text layer: skip unless we add OCR later
    return null
  }

  return null
}

/** Merge AI extract into user form defaults */
export function mergeTitleExtractIntoAssessment(input: {
  plotSize: string
  location: string
  zoneCode: string
  extract: TitleDeedExtract | null
}): { plotSize: string; location: string; zoneCode: string; enrichedFromTitle: boolean } {
  if (!input.extract) {
    return { plotSize: input.plotSize, location: input.location, zoneCode: input.zoneCode, enrichedFromTitle: false }
  }

  let plotSize = input.plotSize
  let location = input.location
  let zoneCode = input.zoneCode
  let enriched = false

  if (!plotSize && input.extract.areaSqm) {
    plotSize = `${input.extract.areaSqm} m²`
    enriched = true
  } else if (!plotSize && input.extract.areaDescription) {
    plotSize = input.extract.areaDescription
    enriched = true
  }

  if ((!location || location.length < 4) && (input.extract.village || input.extract.district)) {
    location = [input.extract.village, input.extract.district].filter(Boolean).join(', ')
    enriched = true
  }

  if (!zoneCode && input.extract.zoneCode) {
    zoneCode = input.extract.zoneCode
    enriched = true
  }

  return { plotSize, location, zoneCode, enrichedFromTitle: enriched }
}
