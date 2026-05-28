/**
 * Match CERA plants to EAC RES system rows (municipality + capacity).
 * EAC PDFs do not list SPV names — name-based tiers apply only when EAC has real names.
 *
 * Usage:
 *   npx tsx scripts/match-cyprus-plants.ts
 *   npx tsx scripts/match-cyprus-plants.ts --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import {
  readCeraCsv,
  filterPvRows,
  rowsToPlantRecords,
  DISTRICT_MAP,
  type CeraPlantRecord,
} from '../lib/cyprus-cera-parse'
import {
  normalizeCompanyName,
  tokenSetRatio,
  capacityWithinTolerance,
  municipalitiesMatch,
  normalizeMunicipality,
} from '../lib/cyprus-name-match'
import { matchPortfolioClient } from '../lib/cyprus-portfolio-clients'
import { scorePlant, type ScoringResult } from '../lib/cyprus-prospect-scoring'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const EAC_JSON = path.join(process.cwd(), 'marketing', 'research', 'eac-res-systems.json')
const MATCHES_JSON = path.join(process.cwd(), 'marketing', 'cyprus-plant-matches.json')

const SUPABASE_URL = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

interface EacRow {
  district: string
  application_ref: string
  applicant_name: string
  capacity_kw: number
  municipality: string
  pos_accepted: boolean
  pos_acceptance_date?: string
}

interface MatchResult {
  plant: CeraPlantRecord &
    ScoringResult & {
      existing_client: boolean
      portfolio_group?: string
    }
  eac: EacRow | null
  confidence: number
  tier: 'A' | 'B' | 'C' | 'none'
  eac_res_listed: boolean
}

function plantCapacityKw(p: CeraPlantRecord): number {
  if (p.plant_class === 'bess_standalone') return p.bess_kw
  return p.pv_kw || p.bess_kw
}

function districtMatch(plantDistrictEn: string, eacDistrict: string): boolean {
  return plantDistrictEn.toLowerCase() === eacDistrict.toLowerCase()
}

function findBestEacMatch(
  plant: CeraPlantRecord,
  eacRows: EacRow[]
): { eac: EacRow | null; confidence: number; tier: MatchResult['tier'] } {
  const capKw = plantCapacityKw(plant)
  const candidates = eacRows.filter(
    (e) =>
      districtMatch(plant.district_en, e.district) &&
      municipalitiesMatch(plant.municipality, e.municipality)
  )

  if (!candidates.length) {
    return { eac: null, confidence: 0, tier: 'none' }
  }

  const withCap = candidates.filter((e) =>
    capacityWithinTolerance(capKw, e.capacity_kw, 0.05)
  )

  const pool = withCap.length ? withCap : candidates.filter((e) =>
    capacityWithinTolerance(capKw, e.capacity_kw, 0.1)
  )

  if (!pool.length) {
    if (candidates.length === 1) {
      return { eac: candidates[0], confidence: 0.5, tier: 'C' }
    }
    return { eac: null, confidence: 0, tier: 'none' }
  }

  let best = pool[0]
  if (pool.length > 1) {
    pool.sort((a, b) => {
      const da = Math.abs(a.capacity_kw - capKw)
      const db = Math.abs(b.capacity_kw - capKw)
      return da - db
    })
    best = pool[0]
  }

  const nameRatio = tokenSetRatio(
    normalizeCompanyName(plant.company_name),
    normalizeCompanyName(best.applicant_name)
  )
  const genericEntity =
    best.applicant_name.includes('ΝΟΜΙΚΟ') ||
    best.applicant_name.includes('ΦΥΣΙΚΟ')

  let confidence = 0.75
  let tier: MatchResult['tier'] = 'B'

  if (!genericEntity && nameRatio >= 90 && capacityWithinTolerance(capKw, best.capacity_kw, 0.05)) {
    confidence = 0.95
    tier = 'A'
  } else if (pool.length === 1 && capacityWithinTolerance(capKw, best.capacity_kw, 0.05)) {
    confidence = 0.85
    tier = 'B'
  } else if (pool.length > 1) {
    confidence = 0.55
    tier = 'C'
  }

  if (best.pos_accepted) confidence = Math.min(1, confidence + 0.05)

  return { eac: best, confidence, tier }
}

function loadEacRows(): EacRow[] {
  if (!fs.existsSync(EAC_JSON)) return []
  const data = JSON.parse(fs.readFileSync(EAC_JSON, 'utf-8'))
  return (data.systems || []) as EacRow[]
}

function loadPlants(): CeraPlantRecord[] {
  if (fs.existsSync(PLANTS_JSON)) {
    const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
    return data.plants as CeraPlantRecord[]
  }
  const rows = filterPvRows(readCeraCsv())
  return rowsToPlantRecords(rows).filter((p) => p.pv_kw >= 100 || p.bess_kw >= 100)
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const eacRows = loadEacRows()
  const plants = loadPlants()

  console.log(`Matching ${plants.length} plants to ${eacRows.length} EAC rows`)

  const results: MatchResult[] = []
  const unmatchedEac = new Set(eacRows.map((e, i) => i))

  for (const plant of plants) {
    const portfolio = matchPortfolioClient(plant.company_name)
    const { eac, confidence, tier } = findBestEacMatch(plant, eacRows)
    const eac_res_listed = eac != null && confidence >= 0.5

    const scored = scorePlant({
      plant,
      eac_res_listed,
      eac_match_confidence: confidence,
      existing_client: portfolio.existing_client,
    })

    results.push({
      plant: { ...plant, ...scored, ...portfolio },
      eac,
      confidence,
      tier,
      eac_res_listed,
    })

    if (eac) {
      const idx = eacRows.indexOf(eac)
      if (idx >= 0) unmatchedEac.delete(idx)
    }
  }

  const matched = results.filter((r) => r.eac_res_listed)
  console.log(`  Matched (≥0.5): ${matched.length}`)
  console.log(`  Tier A/B/C: ${results.filter((r) => r.tier === 'A').length} / ${results.filter((r) => r.tier === 'B').length} / ${results.filter((r) => r.tier === 'C').length}`)

  const payload = {
    generatedAt: new Date().toISOString(),
    matchedCount: matched.length,
    plantCount: results.length,
    eacRowCount: eacRows.length,
    unmatchedEacCount: unmatchedEac.size,
    matches: results,
    unmatchedEac: [...unmatchedEac].map((i) => eacRows[i]),
  }
  fs.writeFileSync(MATCHES_JSON, JSON.stringify(payload, null, 2))

  if (dryRun) {
    console.log(`  DRY RUN — wrote ${MATCHES_JSON}`)
    return
  }

  for (const r of results) {
    const update = {
      eac_res_listed: r.eac_res_listed,
      eac_match_confidence: r.confidence,
      eac_listed_capacity_kw: r.eac?.capacity_kw ?? null,
      connection_terms_status: r.eac?.pos_accepted
        ? 'preliminary_issued'
        : 'unknown',
      commercial_segments: r.plant.commercial_segments,
      pipeline_stage: r.plant.pipeline_stage,
      primary_sales_target: r.plant.primary_sales_target,
      secondary_sales_targets: r.plant.secondary_sales_targets,
      sales_target_summary: r.plant.sales_target_summary,
      priority_score: r.plant.priority_score,
      outreach_priority: r.plant.outreach_priority,
      existing_client: r.plant.existing_client,
      portfolio_group: r.plant.portfolio_group ?? null,
      notes: r.eac
        ? `EAC ref ${r.eac.application_ref}; POS accepted ${r.eac.pos_acceptance_date || 'n/a'}; match tier ${r.tier}`
        : null,
      updated_at: new Date().toISOString(),
    }
    const { error } = await supabase
      .from('cyprus_energy_plants')
      .update(update)
      .eq('cera_license_no', r.plant.cera_license_no)
    if (error && !error.message.includes('does not exist')) {
      console.warn(`  ${r.plant.cera_license_no}: ${error.message}`)
    }
  }
  console.log('  Supabase plant rows updated (if table exists)')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
