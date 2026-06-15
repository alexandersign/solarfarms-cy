/**
 * GET /api/crm/hr/payslips
 * Returns a list of payslips for the authenticated employee.
 * Scans team/payslips/YYYY-MM/ directories and filters by the employee's name slug.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getCrmToken } from '@/lib/crm-auth'
import fs from 'fs'
import path from 'path'

// Maps CRM email → filename slug used in payslip filenames
const EMAIL_TO_SLUG: Record<string, string> = {
  'costas@lighthief.com':               'costas-hadjikyriacou',
  'zinovia@lighthief.com':              'zinovia-efesopoulou',
  'alexander.papacosta@lighthief.com':  'alexander-papacosta',
  'office@lighthief.com':               'andreas-christoforou',
}

export interface PayslipEntry {
  file: string       // full relative path e.g. "2026-03/payslip-costas-hadjikyriacou-202603.html"
  month: string      // e.g. "2026-03"
  label: string      // e.g. "March 2026"
}

function monthLabel(folder: string): string {
  const [year, mon] = folder.split('-')
  const date = new Date(parseInt(year), parseInt(mon) - 1, 1)
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = token.email as string
  const slug = EMAIL_TO_SLUG[email]
  if (!slug) return NextResponse.json({ payslips: [] })

  const payslipsRoot = path.join(process.cwd(), 'team', 'payslips')

  let monthFolders: string[] = []
  try {
    monthFolders = fs.readdirSync(payslipsRoot)
      .filter(f => /^\d{4}-\d{2}$/.test(f))
      .sort()
      .reverse()
  } catch {
    return NextResponse.json({ payslips: [] })
  }

  const payslips: PayslipEntry[] = []
  for (const folder of monthFolders) {
    const folderPath = path.join(payslipsRoot, folder)
    try {
      const files = fs.readdirSync(folderPath)
      for (const file of files) {
        if (file.includes(slug) && file.endsWith('.html')) {
          payslips.push({
            file: `${folder}/${file}`,
            month: folder,
            label: monthLabel(folder),
          })
        }
      }
    } catch {
      // skip unreadable folder
    }
  }

  return NextResponse.json({ payslips })
}
