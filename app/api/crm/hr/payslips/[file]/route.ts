/**
 * GET /api/crm/hr/payslips/[file]
 * Serves the HTML content of a specific payslip.
 * The file param is URL-encoded: "2026-03%2Fpayslip-costas-hadjikyriacou-202603.html"
 * Guards that the requested file belongs to the authenticated user.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getCrmToken } from '@/lib/crm-auth'
import fs from 'fs'
import path from 'path'

const EMAIL_TO_SLUG: Record<string, string> = {
  'costas@lighthief.com':               'costas-hadjikyriacou',
  'zinovia@lighthief.com':              'zinovia-efesopoulou',
  'alexander.papacosta@lighthief.com':  'alexander-papacosta',
  'office@lighthief.com':               'andreas-christoforou',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = token.email as string
  const slug = EMAIL_TO_SLUG[email]
  if (!slug) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { file: rawFile } = await params
  // rawFile may be URL-encoded; decode it
  const filePath = decodeURIComponent(rawFile)

  // Security: must contain the user's slug, no path traversal
  if (!filePath.includes(slug) || filePath.includes('..')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Validate structure: should be "YYYY-MM/filename.html"
  const parts = filePath.split('/')
  if (parts.length !== 2 || !/^\d{4}-\d{2}$/.test(parts[0]) || !parts[1].endsWith('.html')) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  const absPath = path.join(process.cwd(), 'team', 'payslips', parts[0], parts[1])

  try {
    const html = fs.readFileSync(absPath, 'utf-8')
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
