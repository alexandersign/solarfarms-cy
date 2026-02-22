/**
 * CERA PV Plant Prospects Auto-Importer
 * 
 * Parses the CERA licensing archive CSV, filters for commercial PV plants,
 * groups by company, and bulk-inserts into the pv_prospects Supabase table.
 * 
 * Usage:
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/import-cera-prospects.ts
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/import-cera-prospects.ts --min-kw 500
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/import-cera-prospects.ts --dry-run
 * 
 * Options:
 *   --dry-run        Parse and display results without inserting into DB
 *   --min-kw N       Minimum total capacity per company in kW (default: 100)
 *   --operational    Only import operational plants (skip construction permits)
 *   --all            Import all PV (including individuals / ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ)
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

// ─── Config ──────────────────────────────────────────────────────────────────

const CSV_PATH = path.join(process.cwd(), 'marketing', 'ALL Cyprus PV plants.csv - Website Registry.csv')

const SUPABASE_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ─── Greek → English Mappings ────────────────────────────────────────────────

const DISTRICT_MAP: Record<string, string> = {
  'Λάρνακα': 'Larnaca',
  'Λευκωσία': 'Nicosia',
  'Λεμεσός': 'Limassol',
  'Πάφος': 'Paphos',
  'Αμμόχωστος': 'Famagusta',
  'Κερύνεια': 'Kyrenia',
}

// License type mapping
const LICENSE_STATUS_MAP: Record<string, string> = {
  'Λειτουργίας Σταθμού Παραγωγής Ηλεκτρισμού': 'operational',
  'Κατασκευής Σταθμού Παραγωγής Ηλεκτρισμού': 'under_construction',
  'Κατασκευής - Λειτουργίας': 'operational',
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface CeraRow {
  companyName: string
  licenseNo: string
  startDate: string
  endDate: string
  capacityKw: number
  bessOutputKw: number
  bessCapacityKwh: number
  technology: string
  techType: string
  fuel: string
  licenseType: string
  operatingRegime: string
  district: string
  municipality: string
}

interface CompanyAggregate {
  companyName: string
  totalCapacityKw: number
  totalCapacityMwp: number
  totalBessKw: number
  totalBessKwh: number
  hasBess: boolean
  licenses: CeraRow[]
  districts: string[]
  municipalities: string[]
  licenseNumbers: string[]
  plantStatus: string  // operational if any operational, else under_construction
  operatingRegimes: string[]
  earliestDate: string
  latestDate: string
}

// ─── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSV(content: string): CeraRow[] {
  const lines = content.split('\n')
  const rows: CeraRow[] = []

  // Skip header rows (line 0 is title, line 1 is header)
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Parse CSV respecting quotes
    const fields = parseCSVLine(line)
    if (fields.length < 14) continue

    const capacityKw = parseNumber(fields[4])
    const bessOutputKw = parseNumber(fields[5])
    const bessCapacityKwh = parseNumber(fields[6])

    rows.push({
      companyName: cleanCompanyName(fields[0]),
      licenseNo: fields[1].trim(),
      startDate: fields[2].trim(),
      endDate: fields[3].trim(),
      capacityKw,
      bessOutputKw,
      bessCapacityKwh,
      technology: fields[7].trim(),
      techType: fields[8].trim(),
      fuel: fields[9].trim(),
      licenseType: fields[10].trim(),
      operatingRegime: fields[11].trim(),
      district: fields[12].trim(),
      municipality: fields[13].trim(),
    })
  }

  return rows
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++ // skip escaped quote
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current) // last field

  return fields
}

function parseNumber(val: string): number {
  const cleaned = val.trim().replace(/[^0-9.,]/g, '').replace(',', '.')
  if (cleaned === '' || cleaned === '-') return 0
  return parseFloat(cleaned) || 0
}

function cleanCompanyName(name: string): string {
  return name
    .trim()
    .replace(/&AMP;/g, '&')
    .replace(/\s+/g, ' ')
}

// ─── Aggregation ─────────────────────────────────────────────────────────────

function aggregateByCompany(rows: CeraRow[]): CompanyAggregate[] {
  const map = new Map<string, CeraRow[]>()

  for (const row of rows) {
    const key = row.companyName.toUpperCase()
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(row)
  }

  const aggregates: CompanyAggregate[] = []

  for (const [, licenses] of map) {
    const company = licenses[0].companyName
    const totalCapacityKw = licenses.reduce((sum, l) => sum + l.capacityKw, 0)
    const totalBessKw = licenses.reduce((sum, l) => sum + l.bessOutputKw, 0)
    const totalBessKwh = licenses.reduce((sum, l) => sum + l.bessCapacityKwh, 0)

    const districts = [...new Set(licenses.map(l => l.district).filter(Boolean))]
    const municipalities = [...new Set(licenses.map(l => l.municipality).filter(Boolean))]
    const licenseNumbers = licenses.map(l => l.licenseNo)
    const regimes = [...new Set(licenses.map(l => l.operatingRegime).filter(Boolean))]

    // Determine plant status: operational if any license is for operation
    const hasOperational = licenses.some(l =>
      l.licenseType.includes('Λειτουργίας')
    )
    const plantStatus = hasOperational ? 'operational' : 'under_construction'

    // Date range
    const dates = licenses.map(l => l.startDate).filter(Boolean).sort()

    aggregates.push({
      companyName: company,
      totalCapacityKw,
      totalCapacityMwp: Math.round(totalCapacityKw / 10) / 100, // kW to MWp, rounded to 2 decimal
      totalBessKw,
      totalBessKwh,
      hasBess: totalBessKw > 0 || totalBessKwh > 0,
      licenses,
      districts,
      municipalities,
      licenseNumbers,
      plantStatus,
      operatingRegimes: regimes,
      earliestDate: dates[0] || '',
      latestDate: dates[dates.length - 1] || '',
    })
  }

  // Sort by total capacity descending
  aggregates.sort((a, b) => b.totalCapacityKw - a.totalCapacityKw)

  return aggregates
}

// ─── Priority Scoring ────────────────────────────────────────────────────────

function scorePriority(agg: CompanyAggregate): 'urgent' | 'high' | 'medium' | 'low' {
  const mwp = agg.totalCapacityMwp

  // Urgent: >10MW operational without BESS
  if (mwp >= 10 && agg.plantStatus === 'operational' && !agg.hasBess) return 'urgent'

  // High: 5-10MW operational, or >10MW under construction
  if (mwp >= 5 && agg.plantStatus === 'operational') return 'high'
  if (mwp >= 10) return 'high'

  // Medium: 1-5MW operational, or 5-10MW under construction
  if (mwp >= 1 && agg.plantStatus === 'operational') return 'medium'
  if (mwp >= 5) return 'medium'

  // Low: everything else
  return 'low'
}

function determineOfferType(agg: CompanyAggregate): string {
  if (agg.plantStatus === 'operational' && !agg.hasBess && agg.totalCapacityMwp >= 1) {
    return 'bess_retrofit'
  }
  if (agg.plantStatus === 'under_construction' && agg.totalCapacityMwp >= 2) {
    return 'epc'
  }
  if (agg.hasBess) {
    return 'partnership'
  }
  return 'bess_retrofit'
}

function estimateBessPotentialMwh(agg: CompanyAggregate): number | undefined {
  if (agg.hasBess) return undefined // already has BESS
  if (agg.totalCapacityMwp < 1) return undefined
  // Rough estimate: 4-hour BESS at plant capacity
  return Math.round(agg.totalCapacityMwp * 4 * 10) / 10
}

function estimateDealValue(agg: CompanyAggregate): number | undefined {
  const bessMwh = estimateBessPotentialMwh(agg)
  if (!bessMwh) return undefined
  // ~€127k/MWh BESS installed cost
  return Math.round(bessMwh * 127000)
}

// ─── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  let dryRun = false
  let minKw = 100
  let operationalOnly = false
  let includeIndividuals = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') dryRun = true
    if (args[i] === '--operational') operationalOnly = true
    if (args[i] === '--all') includeIndividuals = true
    if (args[i] === '--min-kw' && args[i + 1]) {
      minKw = parseInt(args[i + 1], 10)
      i++
    }
  }

  return { dryRun, minKw, operationalOnly, includeIndividuals }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { dryRun, minKw, operationalOnly, includeIndividuals } = parseArgs()

  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  CERA PV Plant Prospects Auto-Importer                  ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`  Mode:       ${dryRun ? 'DRY RUN (no DB writes)' : 'LIVE (will insert into Supabase)'}`)
  console.log(`  Min kW:     ${minKw} kW (${minKw / 1000} MWp)`)
  console.log(`  Filter:     ${operationalOnly ? 'Operational only' : 'All (operational + construction)'}`)
  console.log(`  Individuals: ${includeIndividuals ? 'Included' : 'Excluded (ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ)'}`)
  console.log('')

  // ── Read CSV ──
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found: ${CSV_PATH}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8')
  const allRows = parseCSV(csvContent)
  console.log(`  Total rows in CSV: ${allRows.length}`)

  // ── Filter for PV plants ──
  let pvRows = allRows.filter(r => {
    // Must be PV technology
    const isPV = r.techType.includes('Φωτοβολταϊκό') || r.techType.includes('φωτοβολταϊκό')
    if (!isPV) return false

    // Exclude individuals unless --all
    if (!includeIndividuals && r.companyName.includes('ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ')) return false

    // Only commercial use (skip backup generators, etc.)
    if (r.operatingRegime === 'Εφεδρεία') return false

    // Operational only filter
    if (operationalOnly && !r.licenseType.includes('Λειτουργίας')) return false

    return true
  })

  console.log(`  PV plants after filtering: ${pvRows.length}`)

  // ── Aggregate by company ──
  const companies = aggregateByCompany(pvRows)
  console.log(`  Unique companies: ${companies.length}`)

  // ── Filter by minimum capacity ──
  const filtered = companies.filter(c => c.totalCapacityKw >= minKw || c.totalBessKw >= minKw)
  console.log(`  Companies >= ${minKw} kW: ${filtered.length}`)
  console.log('')

  // ── Stats ──
  const totalMwp = filtered.reduce((sum, c) => sum + c.totalCapacityMwp, 0)
  const operationalCount = filtered.filter(c => c.plantStatus === 'operational').length
  const constructionCount = filtered.filter(c => c.plantStatus === 'under_construction').length
  const withBess = filtered.filter(c => c.hasBess).length
  const withoutBess = filtered.filter(c => !c.hasBess).length

  console.log('  ═══ Summary ═══')
  console.log(`  Total capacity:    ${totalMwp.toFixed(1)} MWp`)
  console.log(`  Operational:       ${operationalCount} companies`)
  console.log(`  Under construction: ${constructionCount} companies`)
  console.log(`  Already has BESS:  ${withBess} companies`)
  console.log(`  BESS opportunity:  ${withoutBess} companies`)
  console.log('')

  // ── Display top prospects ──
  console.log('  ═══ Top 30 Prospects (by capacity) ═══')
  console.log('  ' + '-'.repeat(90))
  console.log(`  ${'Company'.padEnd(40)} ${'MWp'.padStart(8)} ${'BESS'.padStart(6)} ${'Status'.padEnd(18)} ${'District'.padEnd(12)} Priority`)
  console.log('  ' + '-'.repeat(90))

  for (const c of filtered.slice(0, 30)) {
    const priority = scorePriority(c)
    const bessLabel = c.hasBess ? 'Yes' : 'No'
    const status = c.plantStatus === 'operational' ? 'Operational' : 'Construction'
    const districts = c.districts.map(d => DISTRICT_MAP[d] || d).join(', ')

    console.log(
      `  ${c.companyName.substring(0, 39).padEnd(40)} ${c.totalCapacityMwp.toFixed(2).padStart(8)} ${bessLabel.padStart(6)} ${status.padEnd(18)} ${districts.substring(0, 11).padEnd(12)} ${priority}`
    )
  }
  console.log('  ' + '-'.repeat(90))
  console.log('')

  if (dryRun) {
    console.log('  DRY RUN: No data inserted. Remove --dry-run to import into Supabase.')

    // Write JSON preview
    const previewPath = path.join(process.cwd(), 'marketing', 'cera-prospects-preview.json')
    const preview = filtered.map(c => ({
      company: c.companyName,
      capacityMwp: c.totalCapacityMwp,
      hasBess: c.hasBess,
      bessKwh: c.totalBessKwh,
      status: c.plantStatus,
      districts: c.districts.map(d => DISTRICT_MAP[d] || d),
      municipalities: c.municipalities,
      licenseCount: c.licenses.length,
      licenses: c.licenseNumbers,
      priority: scorePriority(c),
      offerType: determineOfferType(c),
    }))
    fs.writeFileSync(previewPath, JSON.stringify(preview, null, 2))
    console.log(`  Preview written to: ${previewPath}`)
    return
  }

  // ── Check for existing prospects ──
  console.log('  Checking existing prospects in Supabase...')
  const { data: existing } = await supabase
    .from('pv_prospects')
    .select('company_name, plant_name')

  const existingNames = new Set(
    (existing || []).map(e => e.company_name?.toUpperCase() || e.plant_name?.toUpperCase())
  )
  console.log(`  Existing prospects: ${existingNames.size}`)

  // ── Insert into Supabase ──
  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const c of filtered) {
    // Skip if already exists
    if (existingNames.has(c.companyName.toUpperCase())) {
      skipped++
      continue
    }

    const districts = c.districts.map(d => DISTRICT_MAP[d] || d)
    const priority = scorePriority(c)
    const offerType = determineOfferType(c)
    const bessPotential = estimateBessPotentialMwh(c)
    const dealValue = estimateDealValue(c)

    const prospect = {
      plant_name: c.companyName,
      cera_license_no: c.licenseNumbers.slice(0, 3).join(', ') + (c.licenseNumbers.length > 3 ? ` (+${c.licenseNumbers.length - 3} more)` : ''),
      capacity_mwp: c.totalCapacityMwp,
      technology: 'PV',
      plant_status: c.plantStatus,
      location: c.municipalities.slice(0, 3).join(', '),
      district: districts[0] || '',
      commissioning_date: c.earliestDate,
      company_name: c.companyName,
      outreach_status: 'new',
      offer_type: offerType,
      estimated_deal_value: dealValue,
      bess_potential_mwh: bessPotential,
      priority,
      data_source: 'cera',
      tags: [
        ...(c.hasBess ? ['has-bess'] : ['no-bess']),
        ...districts.map(d => d.toLowerCase()),
        c.plantStatus,
        ...(c.totalCapacityMwp >= 10 ? ['large-scale'] : c.totalCapacityMwp >= 5 ? ['utility-scale'] : []),
        ...(c.operatingRegimes.includes('FiT') ? ['fit-tariff'] : []),
        ...(c.operatingRegimes.includes('Εμπορική Χρήση') ? ['commercial'] : []),
      ],
      notes: [
        `CERA Licenses: ${c.licenseNumbers.join(', ')}`,
        `Total PV: ${c.totalCapacityMwp} MWp across ${c.licenses.length} license(s)`,
        c.hasBess ? `Has BESS: ${c.totalBessKw} kW / ${c.totalBessKwh} kWh` : 'No BESS - retrofit opportunity',
        `Districts: ${districts.join(', ')}`,
        `Municipalities: ${c.municipalities.join(', ')}`,
        `Operating regime: ${c.operatingRegimes.join(', ')}`,
        `License dates: ${c.earliestDate} to ${c.latestDate}`,
      ].join('\n'),
    }

    const { error } = await supabase
      .from('pv_prospects')
      .insert([prospect])

    if (error) {
      console.error(`  ✗ Failed: ${c.companyName} - ${error.message}`)
      failed++
    } else {
      inserted++
      if (inserted % 50 === 0) {
        console.log(`  ... inserted ${inserted} prospects so far`)
      }
    }
  }

  // ── Summary ──
  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log(`  Inserted:  ${inserted} new prospects`)
  console.log(`  Skipped:   ${skipped} (already in DB)`)
  console.log(`  Failed:    ${failed}`)
  console.log(`  Total:     ${inserted + skipped + failed}`)
  console.log('═══════════════════════════════════════════')

  if (inserted > 0) {
    console.log(`\n  View your prospects at: /admin/prospects`)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
