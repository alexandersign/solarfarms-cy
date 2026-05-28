/**
 * Merge license-level plant segments into cera-rtb-segments.json
 */

import * as fs from 'fs'
import * as path from 'path'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const MATCHES_JSON = path.join(process.cwd(), 'marketing', 'cyprus-plant-matches.json')
const RTB_SEGMENTS_JSON = path.join(process.cwd(), 'marketing', 'cera-rtb-segments.json')

interface PlantRow {
  cera_license_no: string
  company_name: string
  pv_kw: number
  bess_kw: number
  plant_class: string
  license_status: string
  municipality: string
  commercial_segments?: string[]
  eac_res_listed?: boolean
  existing_client?: boolean
  priority_score?: number
}

export function mergePlantLevelIntoSegmentsFile(): boolean {
  if (!fs.existsSync(PLANTS_JSON) || !fs.existsSync(RTB_SEGMENTS_JSON)) {
    return false
  }

  const plantsData = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  let plants: PlantRow[] = plantsData.plants || []

  if (fs.existsSync(MATCHES_JSON)) {
    const matches = JSON.parse(fs.readFileSync(MATCHES_JSON, 'utf-8'))
    const byLic = new Map<string, boolean>()
    for (const m of matches.matches || []) {
      byLic.set(m.plant.cera_license_no, m.eac_res_listed)
    }
    plants = plants.map((p) => ({
      ...p,
      eac_res_listed: byLic.get(p.cera_license_no) ?? p.eac_res_listed,
    }))
  }

  const standaloneBess = plants.filter(
    (p) => p.plant_class === 'bess_standalone' && !p.existing_client
  )
  const eacMatchedConstruction = plants.filter(
    (p) =>
      p.license_status === 'under_construction' &&
      p.eac_res_listed &&
      !p.existing_client &&
      (p.pv_kw >= 1000 || p.bess_kw >= 1000)
  )
  const bessPreSalePlants = plants.filter(
    (p) =>
      p.commercial_segments?.includes('bess_pre_sale_epc') && !p.existing_client
  )
  const pvOmPlants = plants.filter(
    (p) => p.commercial_segments?.includes('pv_om') && !p.existing_client
  )

  let unmatchedEac: unknown[] = []
  if (fs.existsSync(MATCHES_JSON)) {
    unmatchedEac = JSON.parse(fs.readFileSync(MATCHES_JSON, 'utf-8')).unmatchedEac || []
  }

  const existing = JSON.parse(fs.readFileSync(RTB_SEGMENTS_JSON, 'utf-8'))
  existing.plantLevel = {
    standaloneBess: standaloneBess.slice(0, 100),
    eacMatchedConstruction: eacMatchedConstruction.slice(0, 100),
    bessPreSalePlants: bessPreSalePlants
      .sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
      .slice(0, 100),
    pvOmPlants: pvOmPlants
      .sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
      .slice(0, 100),
    unmatchedEacSample: unmatchedEac.slice(0, 30),
  }
  existing.counts = {
    ...existing.counts,
    standaloneBess: standaloneBess.length,
    eacMatchedConstruction: eacMatchedConstruction.length,
    bessPreSalePlants: bessPreSalePlants.length,
    pvOmPlants: pvOmPlants.length,
    eacUnmatchedRows: unmatchedEac.length,
  }
  fs.writeFileSync(RTB_SEGMENTS_JSON, JSON.stringify(existing, null, 2))
  return true
}
