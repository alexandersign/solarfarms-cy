/**
 * Load Cyprus energy plants from Supabase or local JSON fallback.
 */

import * as fs from 'fs'
import * as path from 'path'
import { supabase, type CyprusEnergyPlant } from './supabase'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const MATCHES_JSON = path.join(process.cwd(), 'marketing', 'cyprus-plant-matches.json')

export interface EnrichedCyprusPlant extends CyprusEnergyPlant {
  district_en?: string
  pipeline_stage?: string
  primary_sales_target?: string
  secondary_sales_targets?: string[]
  sales_target_summary?: string
  contact_director_1?: string
  contact_director_2?: string
  contact_secretary?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  contact_website?: string
  contact_email_source?: string
  registered_address?: string
  company_reg_no?: string
  eac_application_ref?: string
  eac_pos_accepted?: boolean
  match_tier?: string
}

function loadJsonPlants(): EnrichedCyprusPlant[] {
  if (!fs.existsSync(PLANTS_JSON)) return []
  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants = (data.plants || []) as EnrichedCyprusPlant[]

  if (!fs.existsSync(MATCHES_JSON)) return plants

  const matches = JSON.parse(fs.readFileSync(MATCHES_JSON, 'utf-8'))
  const byLicense = new Map<string, (typeof matches.matches)[0]>()
  for (const m of matches.matches || []) {
    byLicense.set(m.plant.cera_license_no, m)
  }

  return plants.map((p) => {
    const m = byLicense.get(p.cera_license_no)
    if (!m) return p
    return {
      ...p,
      eac_res_listed: m.eac_res_listed,
      eac_match_confidence: m.confidence,
      eac_listed_capacity_kw: m.eac?.capacity_kw,
      connection_terms_status: m.eac?.pos_accepted ? 'preliminary_issued' : p.connection_terms_status,
      commercial_segments: m.plant.commercial_segments,
      priority_score: m.plant.priority_score,
      outreach_priority: m.plant.outreach_priority,
      existing_client: m.plant.existing_client,
      portfolio_group: m.plant.portfolio_group,
      eac_application_ref: m.eac?.application_ref,
      eac_pos_accepted: m.eac?.pos_accepted,
      match_tier: m.tier,
    }
  })
}

export async function getCyprusPlants(filters?: {
  plant_class?: string
  eac_res_listed?: boolean
  commercial_segment?: string
  primary_sales_target?: string
  min_match_confidence?: number
  district?: string
  existing_client?: boolean
  search?: string
}): Promise<{ plants: EnrichedCyprusPlant[]; source: 'supabase' | 'json' }> {
  try {
    let query = supabase
      .from('cyprus_energy_plants')
      .select('*')
      .order('priority_score', { ascending: false })

    if (filters?.plant_class) query = query.eq('plant_class', filters.plant_class)
    if (filters?.eac_res_listed !== undefined) {
      query = query.eq('eac_res_listed', filters.eac_res_listed)
    }
    if (filters?.district) query = query.eq('district', filters.district)
    if (filters?.existing_client !== undefined) {
      query = query.eq('existing_client', filters.existing_client)
    }
    if (filters?.commercial_segment) {
      query = query.contains('commercial_segments', [filters.commercial_segment])
    }
    if (filters?.primary_sales_target) {
      query = query.eq('primary_sales_target', filters.primary_sales_target)
    }
    if (filters?.min_match_confidence != null) {
      query = query.gte('eac_match_confidence', filters.min_match_confidence)
    }
    if (filters?.search) {
      query = query.or(
        `company_name.ilike.%${filters.search}%,cera_license_no.ilike.%${filters.search}%,municipality.ilike.%${filters.search}%`
      )
    }

    const { data, error } = await query
    if (!error && data && data.length > 0) {
      return { plants: data as EnrichedCyprusPlant[], source: 'supabase' }
    }
  } catch {
    /* fallback */
  }

  let plants = loadJsonPlants()
  if (filters?.plant_class) {
    plants = plants.filter((p) => p.plant_class === filters.plant_class)
  }
  if (filters?.eac_res_listed !== undefined) {
    plants = plants.filter((p) => Boolean(p.eac_res_listed) === filters.eac_res_listed)
  }
  if (filters?.district) {
    plants = plants.filter(
      (p) =>
        p.district === filters.district ||
        (p as { district_en?: string }).district_en === filters.district
    )
  }
  if (filters?.existing_client !== undefined) {
    plants = plants.filter((p) => Boolean(p.existing_client) === filters.existing_client)
  }
  if (filters?.commercial_segment) {
    plants = plants.filter((p) =>
      (p.commercial_segments || []).includes(filters.commercial_segment!)
    )
  }
  if (filters?.primary_sales_target) {
    plants = plants.filter(
      (p) => p.primary_sales_target === filters.primary_sales_target
    )
  }
  if (filters?.min_match_confidence != null) {
    plants = plants.filter(
      (p) => (p.eac_match_confidence || 0) >= filters.min_match_confidence!
    )
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    plants = plants.filter(
      (p) =>
        p.company_name?.toLowerCase().includes(q) ||
        p.cera_license_no?.toLowerCase().includes(q) ||
        p.municipality?.toLowerCase().includes(q)
    )
  }
  plants.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
  return { plants, source: 'json' }
}
