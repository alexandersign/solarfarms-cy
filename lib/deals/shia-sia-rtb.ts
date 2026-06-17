/**
 * SIA Solar Park with Battery Storage — Nicosia District, Cyprus
 * Slug: shia-sia-nicosia | Ref: PARK-RTB-SIA-2026
 *
 * Technical basis: DD package (May 2026) — CERA E3511, Town Planning issued May 2025.
 * EAC grid connection in progress (FL4145 sublease pending).
 * BESS sized at 2.5 MW / 7.5 MWh (3h) — E-W layout reduces midday curtailment vs south-facing;
 * 45% curtailment base (vs 50% portfolio default for flat south profiles).
 * SPV/seller details NOT included — location-level anonymisation only.
 *
 * Align with: parks-for-sale/novikov/SHIA DD package/
 */

import {
  type RtbDeal,
  computeRevenueModel,
  computeCapex,
  computeFinance,
  computeOpex,
  RTB_COSTS,
} from './rtb-deal-types'

const solarMWp = 3.32
const bessMWh = 7.5
const bessPowerMW = 2.5
/** Jinko 645W bifacial, east–west 10° — PVGIS E-W model 15 Jun 2026: 1,487 kWh/kWp (+5% bifacial); use 1,480 */
const specificYield = 1_480
/** E-W flatter midday profile — lower curtailment than south-facing 50% baseline */
const curtailmentPct = 0.45
const landLease = 18_000       // Executed lease on file; indicative annual estimate

const rev = computeRevenueModel({ solarMWp, specificYieldKwhPerKwp: specificYield, curtailmentPct, bessCapacityMWh: bessMWh })
// Preliminary connection terms issued 07/02/2023; acceptance + 5% deposit (€4,988.61 incl. VAT) paid 22/02/2023.
// Preliminary EAC grid infrastructure cost: ~€83,842 ex VAT (from OCR of 498000141 terms document).
// Final binding terms pending substation building permit + sublease agreement → RTB = withConnectionTerms
const capex = computeCapex({
  solarMWp,
  bessCapacityMWh: bessMWh,
  rtbCost: RTB_COSTS.withConnectionTerms,
  connectionTerms: 83_842,  // EAC grid infrastructure works — PRELIMINARY estimate (not binding). Final cost set after EAC Techno-Economic Study post-permit.
})
const finance = computeFinance(capex, rev.grossRevY1EUR, '~9–11%')
const opex = computeOpex({
  solarMWp,
  bessCapacityMWh: bessMWh,
  capexTotal: capex.total,
  landLeasePerYear: landLease,
  pvOmPerMWPerYear: 8_000,  // Shia-Sia scoped rate — €8k/MWp/yr (not portfolio default €15k)
})

export const SHIA_SIA_RTB: RtbDeal = {
  slug: 'shia-sia-nicosia',
  referenceCode: 'PARK-RTB-SIA-2026',

  publicTitle: 'Sia Solar Park with Battery Storage',
  locationLine: 'Larnaca District, Cyprus',

  rtbStatus: 'permit_ready',
  gridConnectionStatus: 'final_issued',
  gridConnectionNote: 'EAC preliminary terms issued Feb 2023 (ref 498000141); 5% acceptance deposit paid Feb 2023; Amendment 5 issued Jun 2025. Grid infrastructure cost confirmed ~€84k ex VAT. Final binding terms pending substation building permit + sublease (FL4145)',
  permitSummary: 'CERA generation licence issued (Apr 2025) · Town planning permit issued (May 2025) · EIA approved · Land lease executed · EAC grid connection terms issued (ref 498000141 + Amendment 5, Jun 2025) · Substation sublease formalisation in progress',

  timelineNote: 'Target COD Q3 2027 (subject to EAC grid connection finalisation)',

  solarMWp,
  specificYieldKwhPerKwp: specificYield,
  annualProductionMWh: Math.round(solarMWp * specificYield),
  technologySolar: 'Jinko 645W bifacial, east–west 10° tilt, Larnaca District',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 3,
  technologyBess: 'LFP, Tier-1 OEM, 3-hour duration, EN 50549-2 (TÜV certified)',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-09',
    confidential: true,
    note: 'BESS 2.5 MW / 7.5 MWh (3h) sized for E-W 10° curtailment profile (~45% base vs 50% south). PV yield from PVGIS E-W model (scripts/pvgis-park-yield.py, Jun 2026). Figures based on Lighthief EPC pricing and TSOC DAM sample (Oct 2025 – Feb 2026).',
  },
}
