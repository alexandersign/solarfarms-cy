/**
 * Import CERA licences at plant (license) level into cyprus_energy_plants.
 *
 * Usage:
 *   npx tsx scripts/import-cera-plants.ts --dry-run
 *   npx tsx scripts/import-cera-plants.ts --min-mwp 0.5
 *   npx tsx scripts/import-cera-plants.ts --json-only
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import {
  readCeraCsv,
  filterPvRows,
  rowsToPlantRecords,
  type CeraPlantRecord,
} from '../lib/cyprus-cera-parse'
import { matchPortfolioClient } from '../lib/cyprus-portfolio-clients'
import { scorePlant } from '../lib/cyprus-prospect-scoring'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

const SUPABASE_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function parseArgs() {
  const args = process.argv.slice(2)
  let dryRun = false
  let jsonOnly = false
  let minKw = 250  // 250 kW minimum — below this are commercial rooftop installs, not utility parks
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') dryRun = true
    if (args[i] === '--json-only') jsonOnly = true
    if (args[i] === '--min-kw' && args[i + 1]) {
      minKw = parseInt(args[i + 1], 10)
      i++
    }
    if (args[i] === '--min-mwp' && args[i + 1]) {
      const mwp = parseFloat(args[i + 1])
      if (!Number.isNaN(mwp)) minKw = Math.round(mwp * 1000)
      i++
    }
  }
  return { dryRun, jsonOnly, minKw }
}

function toDbRow(
  p: CeraPlantRecord &
    ReturnType<typeof scorePlant> & { existing_client: boolean; portfolio_group?: string }
) {
  return {
    cera_license_no: p.cera_license_no,
    company_name: p.company_name,
    pv_kw: p.pv_kw,
    bess_kw: p.bess_kw,
    bess_kwh: p.bess_kwh,
    plant_class: p.plant_class,
    license_status: p.license_status,
    license_type_raw: p.license_type_raw,
    operating_regime: p.operating_regime,
    district: p.district_en || p.district,
    municipality: p.municipality,
    license_start_date: p.license_start_date,
    license_end_date: p.license_end_date,
    eac_res_listed: false,
    connection_terms_status: 'unknown',
    commercial_segments: p.commercial_segments,
    pipeline_stage: p.pipeline_stage,
    primary_sales_target: p.primary_sales_target,
    secondary_sales_targets: p.secondary_sales_targets,
    sales_target_summary: p.sales_target_summary,
    priority_score: p.priority_score,
    outreach_priority: p.outreach_priority,
    existing_client: p.existing_client,
    portfolio_group: p.portfolio_group || null,
    updated_at: new Date().toISOString(),
  }
}

async function main() {
  const { dryRun, jsonOnly, minKw } = parseArgs()
  console.log('Cyprus CERA plant-level import')
  console.log(`  min kW: ${minKw} | dry-run: ${dryRun} | json-only: ${jsonOnly}`)

  const rows = filterPvRows(readCeraCsv())
  const plants = rowsToPlantRecords(rows).filter(
    (p) => p.pv_kw >= minKw || p.bess_kw >= minKw
  )

  const enriched = plants.map((plant) => {
    const portfolio = matchPortfolioClient(plant.company_name)
    const scored = scorePlant({
      plant,
      eac_res_listed: false,
      eac_match_confidence: 0,
      existing_client: portfolio.existing_client,
    })
    return {
      ...plant,
      ...scored,
      ...portfolio,
    }
  })

  const standalone = enriched.filter((p) => p.plant_class === 'bess_standalone')
  console.log(`  Plants: ${enriched.length} | standalone BESS: ${standalone.length}`)

  fs.writeFileSync(
    PLANTS_JSON,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        minKw,
        count: enriched.length,
        plants: enriched,
      },
      null,
      2
    )
  )
  console.log(`  Wrote ${PLANTS_JSON}`)

  if (jsonOnly || dryRun) {
    if (dryRun) console.log('  DRY RUN — no Supabase writes')
    return
  }

  let ok = 0
  let fail = 0
  const batchSize = 50
  for (let i = 0; i < enriched.length; i += batchSize) {
    const batch = enriched.slice(i, i + batchSize).map((p) => toDbRow(p))
    const { error } = await supabase
      .from('cyprus_energy_plants')
      .upsert(batch, { onConflict: 'cera_license_no' })
    if (error) {
      console.error(`  Batch ${i}: ${error.message}`)
      if (error.message.includes('does not exist')) {
        console.error('  Run docs/internal/cyprus-energy-plants-migration.sql in Supabase first.')
        process.exit(1)
      }
      fail += batch.length
    } else {
      ok += batch.length
    }
  }
  console.log(`  Upserted: ${ok} | failed: ${fail}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
