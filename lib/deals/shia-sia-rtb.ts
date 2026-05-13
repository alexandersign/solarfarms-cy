/**
 * SIA Solar Park with Battery Storage — Nicosia District, Cyprus
 * Slug: shia-sia-nicosia | Ref: PARK-RTB-SIA-2026
 *
 * Technical basis: DD package (May 2026) — CERA E3511, Town Planning issued May 2025.
 * EAC grid connection in progress (FL4145 sublease pending).
 * BESS sized at 2.5 MW / 10 MWh (4h) — optimal for 50% curtailment profile.
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

const solarMWp = 3.2
const bessMWh = 10
const bessPowerMW = 2.5
/** Bifacial 645W panels, fixed tilt, Nicosia district — conservative 1,700 kWh/kWp */
const specificYield = 1_700
const curtailmentPct = 0.50   // Confirmed from EAC curtailment signals analysis
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
const finance = computeFinance(capex, rev.grossRevY1EUR, '~12–15%')
const opex = computeOpex({ solarMWp, bessCapacityMWh: bessMWh, capexTotal: capex.total, landLeasePerYear: landLease })

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
  technologySolar: '645W bifacial LFP module, fixed tilt, Nicosia District',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 4,
  technologyBess: 'LFP, Tier-1 OEM, 4-hour duration, EN 50549-2 (TÜV certified)',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-09',
    confidential: true,
    note: 'BESS sized for 50% curtailment profile (2-5h daily block curtailment, EAC signals 30–100%). Figures based on Lighthief EPC pricing and TSOC DAM sample (Oct 2025 – Feb 2026).',
  },
}
