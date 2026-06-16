/**
 * Sales targeting for Cyprus energy plants (PV EPC, PV O&M, BESS EPC, BESS O&M).
 */

import type { CeraPlantRecord } from './cyprus-cera-parse'

export type CommercialSegment =
  | 'bess_pre_sale_epc'
  | 'bess_retrofit'
  | 'pv_rtb_epc'
  | 'pv_om'
  | 'bess_om'
  | 'standalone_bess'

export type PipelineStage =
  | 'operational_pv'
  | 'operational_hybrid'
  | 'operational_bess'
  | 'construction_pv'
  | 'construction_hybrid'
  | 'construction_bess_only'
  | 'small_scale'
  | 'existing_client'

export type PrimarySalesTarget =
  | 'PV O&M'
  | 'PV EPC'
  | 'BESS EPC'
  | 'BESS O&M'
  | 'Hybrid EPC (PV + BESS)'
  | 'PV O&M + BESS O&M'
  | 'BESS retrofit'
  | 'Portfolio — do not contact'
  | 'Review manually'

export const RTB_PANEL_MIN_KW = 1000

export interface ScoringInput {
  plant: CeraPlantRecord
  eac_res_listed: boolean
  eac_match_confidence: number
  existing_client: boolean
}

export interface ScoringResult {
  commercial_segments: CommercialSegment[]
  pipeline_stage: PipelineStage
  primary_sales_target: PrimarySalesTarget
  secondary_sales_targets: string[]
  /** One-line pitch for CRM / CSV */
  sales_target_summary: string
  priority_score: number
  outreach_priority: 'urgent' | 'high' | 'medium' | 'low'
}

function mwpFromPlant(plant: CeraPlantRecord): number {
  return Math.max(plant.pv_kw, plant.bess_kw) / 1000
}

function derivePipelineStage(plant: CeraPlantRecord, existing_client: boolean): PipelineStage {
  if (existing_client) return 'existing_client'
  const mwp = mwpFromPlant(plant)
  if (mwp < 1 && plant.plant_class !== 'bess_standalone') return 'small_scale'

  if (plant.plant_class === 'bess_standalone') return 'construction_bess_only'
  if (plant.license_status === 'operational') {
    if (plant.plant_class === 'pv_bess_hybrid' || plant.bess_kw > 0) return 'operational_hybrid'
    return 'operational_pv'
  }
  if (plant.plant_class === 'pv_bess_hybrid' || (plant.bess_kw > 0 && plant.pv_kw > 0)) {
    return 'construction_hybrid'
  }
  return 'construction_pv'
}

function derivePrimaryTarget(
  plant: CeraPlantRecord,
  stage: PipelineStage,
  segments: CommercialSegment[],
  eac_res_listed: boolean
): { primary: PrimarySalesTarget; secondary: string[]; summary: string } {
  const mwp = mwpFromPlant(plant)
  const pvMwp = plant.pv_kw / 1000
  const bessMwp = plant.bess_kw / 1000

  if (stage === 'existing_client') {
    return {
      primary: 'Portfolio — do not contact',
      secondary: [],
      summary: 'Existing Lighthief pipeline client',
    }
  }

  if (stage === 'small_scale') {
    return {
      primary: 'Review manually',
      secondary: [],
      summary: `Below ${RTB_PANEL_MIN_KW} kW utility threshold — qualify before outreach`,
    }
  }

  if (stage === 'construction_bess_only') {
    return {
      primary: 'BESS EPC',
      secondary: ['BESS O&M (post-COD)'],
      summary: `Standalone BESS ${bessMwp.toFixed(1)} MW — BESS EPC + LTSA`,
    }
  }

  if (stage === 'construction_hybrid') {
    return {
      primary: 'Hybrid EPC (PV + BESS)',
      secondary: ['PV O&M', 'BESS O&M'],
      summary: `Pre-operational hybrid ${pvMwp.toFixed(1)} MWp PV + ${bessMwp.toFixed(1)} MW BESS — co-located EPC package`,
    }
  }

  if (stage === 'construction_pv') {
    return {
      primary: 'PV EPC',
      secondary: plant.bess_kw > 0 ? ['BESS EPC'] : ['BESS retrofit (future)'],
      summary: `CERA construction licence only — ${pvMwp.toFixed(1)} MWp PV EPC${eac_res_listed ? ' (EAC POS listed)' : ''}`,
    }
  }

  if (stage === 'operational_hybrid') {
    return {
      primary: 'PV O&M + BESS O&M',
      secondary: segments.includes('bess_retrofit') ? ['BESS retrofit'] : [],
      summary: `Operational hybrid — PV O&M + BESS O&M (${pvMwp.toFixed(1)} MWp / ${bessMwp.toFixed(1)} MW BESS)`,
    }
  }

  if (stage === 'operational_pv') {
    const secondary: string[] = []
    if (segments.includes('bess_retrofit')) secondary.push('BESS retrofit', 'BESS EPC')
    return {
      primary: 'PV O&M',
      secondary,
      summary: `Operational PV ${pvMwp.toFixed(1)} MWp — PV O&M${secondary.length ? ' + BESS upsell' : ''}`,
    }
  }

  return {
    primary: 'Review manually',
    secondary: [],
    summary: `Unclassified — ${plant.plant_class} / ${plant.license_status}`,
  }
}

export function scorePlant(input: ScoringInput): ScoringResult {
  const { plant, eac_res_listed, eac_match_confidence, existing_client } = input
  const segments: CommercialSegment[] = []
  const mwp = mwpFromPlant(plant)

  if (!existing_client) {
    if (plant.plant_class === 'bess_standalone') {
      segments.push('standalone_bess', 'bess_pre_sale_epc')
    }

    if (
      plant.license_status === 'under_construction' &&
      (plant.bess_kw > 0 || plant.plant_class === 'bess_standalone') &&
      mwp >= 0.5
    ) {
      if (!segments.includes('bess_pre_sale_epc')) segments.push('bess_pre_sale_epc')
    }

    if (
      plant.license_status === 'operational' &&
      plant.pv_kw >= RTB_PANEL_MIN_KW &&
      plant.bess_kw <= 0
    ) {
      segments.push('bess_retrofit')
    }

    if (plant.license_status === 'under_construction' && plant.pv_kw >= RTB_PANEL_MIN_KW) {
      segments.push('pv_rtb_epc')
    }

    if (
      plant.license_status === 'operational' &&
      plant.pv_kw >= RTB_PANEL_MIN_KW &&
      eac_res_listed
    ) {
      segments.push('pv_om')
    }

    if (
      (plant.license_status === 'operational' && plant.bess_kw > 0) ||
      (plant.plant_class === 'pv_bess_hybrid' && plant.license_status === 'operational')
    ) {
      segments.push('bess_om')
    }
  }

  const pipeline_stage = derivePipelineStage(plant, existing_client)
  const { primary, secondary, summary } = derivePrimaryTarget(
    plant,
    pipeline_stage,
    segments,
    eac_res_listed
  )

  let priority_score = 0
  if (!existing_client) {
    priority_score += Math.min(40, mwp * 4)
    if (eac_res_listed) priority_score += 15
    priority_score += Math.round(eac_match_confidence * 20)
    if (primary === 'Hybrid EPC (PV + BESS)' || primary === 'BESS EPC') priority_score += 20
    if (primary === 'PV EPC') priority_score += 18
    if (primary === 'PV O&M' || primary === 'PV O&M + BESS O&M') priority_score += 14
    if (secondary.includes('BESS retrofit')) priority_score += 10
    priority_score = Math.min(100, Math.round(priority_score))
  }

  let outreach_priority: ScoringResult['outreach_priority'] = 'low'
  if (priority_score >= 75) outreach_priority = 'urgent'
  else if (priority_score >= 55) outreach_priority = 'high'
  else if (priority_score >= 35) outreach_priority = 'medium'

  return {
    commercial_segments: [...new Set(segments)],
    pipeline_stage,
    primary_sales_target: primary,
    secondary_sales_targets: secondary,
    sales_target_summary: summary,
    priority_score,
    outreach_priority,
  }
}
