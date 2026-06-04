/**
 * CRM prospects that are not in the CERA PV/BESS licence feed (cyprus-energy-plants.json).
 * Synced by scripts/sync-off-registry-to-crm.ts into pv_prospects.
 */

import { AEOLIAN } from './portfolio-data'
import type { PvProspect } from './supabase'
import { buildSearchAliases } from './greek-translit'

export type OffRegistryProspect = Partial<PvProspect> & {
  company_name: string
  plant_name: string
}

/** H.E.S.S — TSOC ΠΟΣ Apr 2025; not listed in CERA website registry export. */
export const HESS_PROSPECT: OffRegistryProspect = {
  company_name: 'H.E.S.S HYBRID ENERGY STORAGE SYSTEMS LTD',
  plant_name: 'HESS Power On BESS — Psevdas',
  cera_license_no: 'ΚΕΑ14-2024',
  technology: 'BESS',
  plant_status: 'under_construction',
  rtb_status: 'under_construction',
  district: 'Larnaca',
  location: 'Psevdas (Ψευδάς)',
  grid_connection_point: 'Psevdas TS — 132 kV (TSOC ref. 320.7.11)',
  bess_potential_mwh: 120,
  capacity_mwp: 59,
  construction_mwp: 59,
  connection_terms_status: 'preliminary_issued',
  bess_sales_angle: 'pre_sale',
  offer_type: 'epc',
  priority: 'urgent',
  outreach_status: 'new',
  estimated_deal_value: undefined,
  data_source: 'tso_pos+internal',
  tags: ['off_registry', 'standalone_bess', 'tso_preliminary_pos'],
  notes: [
    '59 MWp / 120 MWh standalone ΕΑΕ; max discharge <50 MW @ POC.',
    'TSOC preliminary connection terms ΔΣΜΚ/ΠΟΣ/320.7.11 issued 7 Apr 2025.',
    'Not in CERA website registry CSV — track manually in CRM.',
  ].join(' '),
}

function aeolianProspect(): OffRegistryProspect {
  return {
    company_name: 'TP AEOLIAN DYNAMICS LTD',
    plant_name: 'Agia Anna Wind Farm Hybrid BESS',
    technology: 'Hybrid',
    plant_status: 'licensed',
    rtb_status: 'under_construction',
    district: AEOLIAN.district,
    location: AEOLIAN.location,
    bess_potential_mwh: AEOLIAN.mwh,
    capacity_mwp: AEOLIAN.mw,
    construction_mwp: AEOLIAN.mw,
    bess_sales_angle: 'pre_sale',
    offer_type: 'epc',
    priority: 'high',
    outreach_status: 'proposal_sent',
    estimated_deal_value: AEOLIAN.revenue,
    data_source: 'portfolio_quote',
    tags: ['off_registry', 'wind_hybrid', 'quoted'],
    notes: [
      `${AEOLIAN.windFarmMw} MW wind + ${AEOLIAN.mw} MW / ${AEOLIAN.mwh} MWh BESS.`,
      'Final offer Mar 2026 — not signed; active prospect (not portfolio signed client).',
      'Not in CERA PV licence feed.',
    ].join(' '),
  }
}

export function getOffRegistryProspects(): OffRegistryProspect[] {
  const rows = [HESS_PROSPECT, aeolianProspect()]
  return rows.map((r) => ({
    ...r,
    segment: 'developer' as const,
    search_aliases: buildSearchAliases(
      r.company_name,
      r.plant_name,
      r.contact_name,
      'AEOLIAN',
      'HESS',
      'PSEVDAS'
    ),
  }))
}
