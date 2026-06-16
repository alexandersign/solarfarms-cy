/**
 * Merge manual RTB enrichment CSV into cyprus_energy_plants (or JSON fallback).
 *
 * Usage:
 *   npx tsx scripts/merge-rtb-enrichment.ts
 *   npx tsx scripts/merge-rtb-enrichment.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

const CSV_PATH = path.join(
  process.cwd(),
  'marketing',
  'research',
  'rtb-enrichment-template.csv'
)
const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

const SUPABASE_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      inQuotes = !inQuotes
    } else if (c === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += c
    }
  }
  fields.push(current.trim())
  return fields
}

function parseEnrichmentCsv(): Record<string, Record<string, string>> {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Missing ${CSV_PATH}`)
    process.exit(1)
  }
  const lines = fs.readFileSync(CSV_PATH, 'utf-8').split('\n').filter(Boolean)
  const header = parseCsvLine(lines[0])
  const byLicense: Record<string, Record<string, string>> = {}

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i])
    if (fields.length < 2) continue
    const row: Record<string, string> = {}
    header.forEach((h, idx) => {
      row[h] = fields[idx] || ''
    })
    const lic = row.cera_license_no?.trim()
    if (lic) byLicense[lic] = row
  }
  return byLicense
}

const STATUS_MAP: Record<string, string> = {
  none: 'none',
  applied: 'applied',
  preliminary_issued: 'preliminary_issued',
  preliminary: 'preliminary_issued',
  final_issued: 'final_issued',
  final: 'final_issued',
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const enrichment = parseEnrichmentCsv()
  const keys = Object.keys(enrichment).filter((k) => {
    const row = enrichment[k]
    return row.connection_terms_status && row.connection_terms_status !== 'none'
  })

  console.log(`Enrichment rows with connection status: ${keys.length}`)
  if (keys.length === 0) {
    console.log('No rows to merge (fill rtb-enrichment-template.csv)')
    return
  }

  if (fs.existsSync(PLANTS_JSON)) {
    const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
    let updated = 0
    for (const p of data.plants || []) {
      const row = enrichment[p.cera_license_no]
      if (!row) continue
      if (row.connection_terms_status) {
        p.connection_terms_status =
          STATUS_MAP[row.connection_terms_status.toLowerCase()] ||
          row.connection_terms_status
        updated++
      }
      if (row.notes) p.enrichment_notes = row.notes
    }
    if (!dryRun) {
      fs.writeFileSync(PLANTS_JSON, JSON.stringify(data, null, 2))
      console.log(`  Updated ${updated} plants in ${PLANTS_JSON}`)
    } else {
      console.log(`  DRY RUN would update ${updated} plants in JSON`)
    }
  }

  if (dryRun) return

  for (const lic of keys) {
    const row = enrichment[lic]
    const status =
      STATUS_MAP[row.connection_terms_status?.toLowerCase()] ||
      row.connection_terms_status
    const { error } = await supabase
      .from('cyprus_energy_plants')
      .update({
        connection_terms_status: status,
        notes: row.notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('cera_license_no', lic)
    if (error && !error.message.includes('does not exist')) {
      console.warn(`  ${lic}: ${error.message}`)
    }
  }
  console.log('  Supabase merge attempted (requires migration applied)')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
