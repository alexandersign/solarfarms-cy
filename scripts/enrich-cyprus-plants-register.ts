/**
 * Enrich cyprus-energy-plants.json with Cyprus e-filing directors (one lookup per company).
 *
 * Usage:
 *   npx tsx scripts/enrich-cyprus-plants-register.ts --limit 30
 *   npx tsx scripts/enrich-cyprus-plants-register.ts --min-score 55
 *   npx tsx scripts/enrich-cyprus-plants-register.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  lookupCompanyRegister,
  COMPANY_REGISTER_URL,
} from '../lib/cyprus-company-register'
import { discoverContactNoHunter } from '../lib/contact-discovery'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const REGISTER_DELAY_MS = 2500

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function parseArgs() {
  const args = process.argv.slice(2)
  let limit = 50
  let minScore = 0
  let dryRun = false
  let withContacts = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10)
      i++
    }
    if (args[i] === '--min-score' && args[i + 1]) {
      minScore = parseInt(args[i + 1], 10)
      i++
    }
    if (args[i] === '--dry-run') dryRun = true
    if (args[i] === '--with-contacts') withContacts = true
  }
  return { limit, minScore, dryRun, withContacts }
}

interface PlantRow {
  company_name: string
  cera_license_no: string
  priority_score?: number
  existing_client?: boolean
  primary_sales_target?: string
  company_reg_no?: string
  contact_director_1?: string
  contact_director_2?: string
  contact_secretary?: string
  registered_address?: string
  register_enriched_at?: string
  register_searched?: boolean
  [key: string]: unknown
}

async function main() {
  const { limit, minScore, dryRun, withContacts } = parseArgs()

  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Run: npx tsx scripts/import-cera-plants.ts --json-only')
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
    .filter(([, rows]) => !rows[0].contact_director_1 && !rows[0].register_searched)
    .sort((a, b) => (b[1][0].priority_score || 0) - (a[1][0].priority_score || 0))
    .slice(0, limit)

  console.log(`Companies to enrich: ${queue.length} (from ${byCompany.size} unique SPVs)`)

  if (dryRun) {
    queue.slice(0, 15).forEach(([k, rows]) => {
      console.log(
        `  ${rows[0].company_name} — ${rows.length} licence(s) — target: ${rows[0].primary_sales_target}`
      )
    })
    return
  }

  const pw = await import('playwright')
  const browser = await pw.chromium.launch({
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0',
  })

  let ok = 0
  let miss = 0

  for (const [, rows] of queue) {
    const companyName = rows[0].company_name
    try {
      const reg = await lookupCompanyRegister(page, companyName)
      const patch: Partial<PlantRow> = {
        register_searched: true,
        register_enriched_at: new Date().toISOString(),
      }

      if (reg) {
        patch.company_reg_no = reg.company_reg_no
        patch.registered_address = reg.registered_address
        patch.contact_director_1 = reg.directors[0]
        patch.contact_director_2 = reg.directors[1]
        patch.contact_secretary = reg.secretary || undefined
        patch.contact_title = 'Director'
        patch.register_matched_name = reg.matched_name
        patch.org_status = reg.org_status

        if (withContacts && reg.directors.length) {
          const { applyCyprusContactOverrides } = await import(
            '../lib/cyprus-contact-overrides'
          )
          const manual = applyCyprusContactOverrides({
            company_name: companyName,
            company_reg_no: reg.company_reg_no,
            contact_director_1: reg.directors[0],
            contact_director_2: reg.directors[1],
          })
          const contact = await discoverContactNoHunter({
            companyName,
            directorNames: reg.directors,
            googlePlacesKey:
              process.env.GOOGLE_MAPS_KEY || process.env.GOOGLE_PLACES_KEY,
          })
          if (manual.contact_email || contact.contact_email)
            patch.contact_email = manual.contact_email || contact.contact_email
          if (manual.contact_phone || contact.contact_phone)
            patch.contact_phone = manual.contact_phone || contact.contact_phone
          if (manual.contact_linkedin) patch.contact_linkedin = manual.contact_linkedin
          if (contact.company_website) patch.contact_website = contact.company_website
          patch.contact_email_source =
            manual.contact_email_source || contact.email_source
        }

        ok++
        console.log(
          `  ✓ ${companyName}: ${reg.company_reg_no} | ${reg.directors.slice(0, 2).join(', ')}`
        )
      } else {
        miss++
        console.log(`  - ${companyName}: not in register`)
      }

      for (const row of rows) {
        Object.assign(row, patch)
      }
    } catch (e) {
      miss++
      console.log(`  ✗ ${companyName}: ${(e as Error).message}`)
      for (const row of rows) {
        row.register_searched = true
      }
    }
    await sleep(REGISTER_DELAY_MS)
  }

  await browser.close()

  data.plants = plants
  data.registerEnrichedAt = new Date().toISOString()
  fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2))

  console.log(`\nDone: ${ok} enriched, ${miss} missed. Updated ${PLANTS_JSON}`)
  console.log(`Register: ${COMPANY_REGISTER_URL}`)
  console.log('Next: npx tsx scripts/analyze-cyprus-directors.ts')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
