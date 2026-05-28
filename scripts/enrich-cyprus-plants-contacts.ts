/**
 * Add email / phone / LinkedIn to plants already enriched from e-filing.
 * Does NOT re-hit the company register (fast).
 *
 * Usage:
 *   npx tsx scripts/enrich-cyprus-plants-contacts.ts
 *   npx tsx scripts/enrich-cyprus-plants-contacts.ts --limit 50 --min-score 35
 *   npx tsx scripts/enrich-cyprus-plants-contacts.ts --force
 */

import * as fs from 'fs'
import * as path from 'path'
import { discoverContactNoHunter } from '../lib/contact-discovery'
import { applyCyprusContactOverrides } from '../lib/cyprus-contact-overrides'

// Load .env.local / .env for GOOGLE_MAPS_KEY when run via npm
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(process.cwd(), envFile)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

function parseArgs() {
  const args = process.argv.slice(2)
  let limit = 60
  let minScore = 35
  let force = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10)
      i++
    }
    if (args[i] === '--min-score' && args[i + 1]) {
      minScore = parseInt(args[i + 1], 10)
      i++
    }
    if (args[i] === '--force') force = true
  }
  return { limit, minScore, force }
}

interface PlantRow {
  company_name: string
  priority_score?: number
  existing_client?: boolean
  contact_director_1?: string
  contact_director_2?: string
  company_reg_no?: string
  contact_email?: string
  contact_phone?: string
  contact_website?: string
  contact_linkedin?: string
  contact_email_source?: string
  register_searched?: boolean
  [key: string]: unknown
}

async function main() {
  const { limit, minScore, force } = parseArgs()
  const googleKey =
    process.env.GOOGLE_MAPS_KEY || process.env.GOOGLE_PLACES_KEY || ''

  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Missing', PLANTS_JSON)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants: PlantRow[] = data.plants || []

  const byCompany = new Map<string, PlantRow[]>()
  for (const p of plants) {
    if (p.existing_client) continue
    if ((p.priority_score || 0) < minScore) continue
    const key = p.company_name.trim().toUpperCase()
    if (!byCompany.has(key)) byCompany.set(key, [])
    byCompany.get(key)!.push(p)
  }

  const queue = [...byCompany.entries()]
    .filter(([, rows]) => rows[0].contact_director_1 || rows[0].register_searched)
    .filter(([, rows]) => {
      if (force) return true
      const r = rows[0]
      return !r.contact_email || !r.contact_phone
    })
    .sort((a, b) => (b[1][0].priority_score || 0) - (a[1][0].priority_score || 0))
    .slice(0, limit)

  console.log(`Contact enrichment: ${queue.length} companies (Google Places: ${googleKey ? 'yes' : 'no'})`)

  let updated = 0

  for (const [, rows] of queue) {
    const row = rows[0]
    const directors = [row.contact_director_1, row.contact_director_2].filter(
      Boolean
    ) as string[]

    const manual = applyCyprusContactOverrides({
      company_name: row.company_name,
      company_reg_no: row.company_reg_no,
      contact_director_1: row.contact_director_1,
      contact_director_2: row.contact_director_2,
    })

    const discovered = await discoverContactNoHunter({
      companyName: row.company_name,
      directorNames: directors,
      existingWebsite: row.contact_website,
      googlePlacesKey: googleKey || undefined,
    })

    const website = discovered.company_website || row.contact_website
    const safeWebsite =
      website &&
      !['lighthief', 'solarfarms.cy'].some((b) => String(website).toLowerCase().includes(b))
        ? website
        : row.contact_website &&
            !['lighthief', 'solarfarms.cy'].some((b) =>
              String(row.contact_website).toLowerCase().includes(b)
            )
          ? row.contact_website
          : undefined

    const rawPhone = manual.contact_phone || discovered.contact_phone || row.contact_phone
    const cleanPhone = rawPhone
      ? decodeURIComponent(String(rawPhone).trim()).replace(/%20/g, ' ').trim()
      : undefined

    const patch: Partial<PlantRow> = {
      contact_email: manual.contact_email || discovered.contact_email || row.contact_email,
      contact_phone: cleanPhone,
      contact_linkedin:
        manual.contact_linkedin || discovered.contact_linkedin || row.contact_linkedin,
      contact_website: safeWebsite,
      contact_email_source:
        manual.contact_email_source ||
        discovered.email_source ||
        row.contact_email_source,
      contacts_enriched_at: new Date().toISOString(),
    }

    if (manual.contact_name) patch.contact_name = manual.contact_name

    const hasNew =
      patch.contact_email !== row.contact_email ||
      patch.contact_phone !== row.contact_phone ||
      patch.contact_linkedin !== row.contact_linkedin

    if (hasNew) {
      updated++
      console.log(
        `  ✓ ${row.company_name}: ${patch.contact_email || '—'} | ${patch.contact_phone || '—'}${patch.contact_linkedin ? ' | LinkedIn' : ''}`
      )
    } else {
      console.log(`  - ${row.company_name}: no new contacts`)
    }

    for (const r of rows) {
      Object.assign(r, patch)
    }
  }

  data.plants = plants
  data.contactsEnrichedAt = new Date().toISOString()
  fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2))
  console.log(`\nDone: ${updated}/${queue.length} companies updated → ${PLANTS_JSON}`)
  console.log('Next: npm run cyprus:sales-export')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
