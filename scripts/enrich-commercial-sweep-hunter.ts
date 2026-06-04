/**
 * Second-pass Hunter.io enrichment on commercial sweep CSV rows (website but no email).
 *
 * Usage:
 *   npx tsx scripts/enrich-commercial-sweep-hunter.ts
 *   npx tsx scripts/enrich-commercial-sweep-hunter.ts --csv docs/solar-prospects/solar-sweep-merged.csv
 *   npx tsx scripts/enrich-commercial-sweep-hunter.ts --limit 40
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  hunterAccount,
  hunterDomainSearch,
  HunterError,
  type HunterEmail,
} from '../lib/hunter-client'

for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(process.cwd(), envFile)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  break
}

const SWEEP_DIR = path.join(process.cwd(), 'docs', 'solar-prospects')

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

function parseCsv(text: string): { header: string[]; rows: Record<string, string>[] } {
  const lines: string[][] = []
  let field = ''
  let row: string[] = []
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQ = false
      } else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      if (field !== '' || row.length) { row.push(field); lines.push(row); row = []; field = '' }
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); lines.push(row) }
  if (!lines.length) return { header: [], rows: [] }
  const header = lines[0]
  const rows = lines.slice(1).map((r) => {
    const o: Record<string, string> = {}
    header.forEach((h, idx) => (o[h] = r[idx] ?? ''))
    return o
  })
  return { header, rows }
}

function escapeCsv(v: string): string {
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`
  return v
}

function writeCsv(header: string[], rows: Record<string, string>[], outPath: string) {
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(header.map((h) => escapeCsv(r[h] ?? '')).join(','))
  }
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8')
}

function extractDomain(url: string): string | null {
  try {
    const u = url.startsWith('http') ? url : `https://${url}`
    const host = new URL(u).hostname.replace(/^www\./, '')
    return host.includes('.') ? host : null
  } catch {
    return null
  }
}

function pickEmail(emails: HunterEmail[]): string | null {
  if (!emails.length) return null
  const sorted = [...emails].sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
  const generic = sorted.find((e) =>
    /^(info|contact|sales|office|admin|hello)@/i.test(e.value)
  )
  return (generic || sorted[0]).value
}

function latestCsv(): string | null {
  if (!fs.existsSync(SWEEP_DIR)) return null
  const files = fs
    .readdirSync(SWEEP_DIR)
    .filter((f) => f.startsWith('solar-sweep-') && f.endsWith('.csv'))
    .sort()
  if (!files.length) return null
  const merged = files.filter((f) => f.includes('merged'))
  const pick = merged.length ? merged[merged.length - 1] : files[files.length - 1]
  return path.join(SWEEP_DIR, pick)
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const apiKey = process.env.HUNTER_API_KEY
  if (!apiKey) {
    console.error('HUNTER_API_KEY missing in .env.local')
    process.exit(1)
  }

  const csvPath = arg('--csv', latestCsv() || '')
  const limit = parseInt(arg('--limit', '80'), 10)
  const dryRun = process.argv.includes('--dry-run')

  if (!csvPath || !fs.existsSync(csvPath)) {
    console.error('No CSV found')
    process.exit(1)
  }

  const acct = await hunterAccount(apiKey)
  if (acct) {
    console.log(
      `Hunter: ${acct.searches_used}/${acct.searches_available} searches used · ${acct.plan_name || 'plan'}`
    )
  }

  const { header, rows } = parseCsv(fs.readFileSync(csvPath, 'utf-8'))
  const need = rows.filter((r) => !r.email_found?.trim() && (r.gmb_website || r.website))
  const queue = need.slice(0, limit)
  console.log(`CSV: ${csvPath} · ${rows.length} rows · Hunter queue: ${queue.length}`)

  let enriched = 0
  for (const r of queue) {
    const site = (r.gmb_website || r.website || '').trim()
    const domain = extractDomain(site)
    if (!domain) continue
    if (dryRun) {
      console.log(`  [dry] ${r.name} → ${domain}`)
      continue
    }
    try {
      const res = await hunterDomainSearch(domain, apiKey)
      const email = pickEmail(res.emails)
      if (email) {
        r.email_found = email
        if (r.gmb_found && r.gmb_confidence === 'HIGH') r.send = 'YES'
        enriched++
        console.log(`  + ${r.name}: ${email}`)
      } else {
        console.log(`  - ${r.name}: no emails @ ${domain}`)
      }
    } catch (e) {
      if (e instanceof HunterError && e.status === 429) {
        console.error('Hunter rate limit — stopping')
        break
      }
      console.warn(`  ! ${r.name}: ${e instanceof Error ? e.message : e}`)
    }
    await sleep(400)
  }

  if (!dryRun && enriched > 0) {
    const out = csvPath.replace(/\.csv$/, '-hunter.csv')
    writeCsv(header, rows, out)
    fs.copyFileSync(out, csvPath)
    console.log(`Updated ${enriched} emails → ${csvPath}`)
  } else if (!dryRun) {
    console.log('No new emails from Hunter')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
