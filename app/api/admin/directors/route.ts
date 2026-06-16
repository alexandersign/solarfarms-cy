import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

const DIRECTORS_JSON = path.join(
  process.cwd(),
  'marketing',
  'cyprus-top-directors.json'
)

export async function GET() {
  try {
    if (!fs.existsSync(DIRECTORS_JSON)) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'Run: npx tsx scripts/analyze-cyprus-directors.ts after register enrichment',
      })
    }
    const raw = JSON.parse(fs.readFileSync(DIRECTORS_JSON, 'utf-8'))
    return NextResponse.json({
      success: true,
      data: raw.directors || [],
      generatedAt: raw.generatedAt,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: String(error),
      data: [],
    })
  }
}
