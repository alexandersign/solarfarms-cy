/**
 * Vanalio Solar Parks — Agios Ioannis Malountas, Nicosia District, Cyprus
 * Slug: vanalio-nicosia | Ref: PARK-RTB-VAN-2026
 *
 * 4 plots, 10.4 MWp total: Plot 9 (1.4), Plot 45 (3.5), Plot 47 (1.6), Plot 149 (5.0).
 * Source: Technical Due Diligence Vanalio Holdings LTD (Dec 2024).
 * All permits fully licensed: CERA (extended to 31/12/2029), Town Planning, Building Permits.
 * Grid connection: preliminary terms issued — final binding terms pending.
 * Land lease valid to 26/11/2051 · Annual lease ~€30,000.
 * SPV/owner name NOT shown — location-level anonymisation only.
 */

import {
  type RtbDeal,
  computeRevenueModel,
  computeCapex,
  computeFinance,
  computeOpex,
  RTB_COSTS,
} from './rtb-deal-types'

const solarMWp = 10.4
const bessMWh = 20
const bessPowerMW = 5
/** Standard fixed-tilt monofacial (no bifacial spec confirmed in DD) */
const specificYield = 1_650
const curtailmentPct = 0.50   // Cyprus 2027 baseline
const landLease = 30_000      // Confirmed in technical DD (~€30k/year)

const rev = computeRevenueModel({ solarMWp, specificYieldKwhPerKwp: specificYield, curtailmentPct, bessCapacityMWh: bessMWh })
// Preliminary terms only; TSO confirmed no grid capacity (Jan 2023) pending area substation upgrade → withoutConnectionTerms
const capex = computeCapex({ solarMWp, bessCapacityMWh: bessMWh, rtbCost: RTB_COSTS.withoutConnectionTerms })
const finance = computeFinance(capex, rev.grossRevY1EUR, '~13–15%')
const opex = computeOpex({ solarMWp, bessCapacityMWh: bessMWh, capexTotal: capex.total, landLeasePerYear: landLease })

export const JONATHAN_VANALIO_RTB: RtbDeal = {
  slug: 'vanalio-nicosia',
  referenceCode: 'PARK-RTB-VAN-2026',

  publicTitle: 'Agios Ioannis Malountas Solar Parks (10.4 MWp)',
  locationLine: 'Agios Ioannis Malountas, Nicosia District, Cyprus',

  rtbStatus: 'fully_licensed',
  gridConnectionStatus: 'pending_upgrade',
  gridConnectionNote: 'Preliminary DSO refs issued (400387217–400387472). TSO confirmed no area grid capacity (Jan 2023). EAC/TSO area substation upgrade in progress — est. completion Q4 2026. Final binding terms not yet issued.',
  permitSummary: 'CERA production licences (extended to 31/12/2029) · Town planning permits issued · Building permits issued · Environmental approval (Dept of Environment) · Land leases valid to 2051 · EAC preliminary grid terms issued · ⚠ TSO confirmed no area grid capacity (Jan 2023); area substation upgrade in progress by EAC/TSO (est. completion Q4 2026)',

  timelineNote: 'Target COD 2027/2028 — subject to EAC final grid connection terms (preliminary terms issued)',

  solarMWp,
  specificYieldKwhPerKwp: specificYield,
  annualProductionMWh: Math.round(solarMWp * specificYield),
  technologySolar: 'Fixed-tilt monofacial PV, 4 plots — 1.4 + 3.5 + 1.6 + 5.0 MWp',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 4,
  technologyBess: 'LFP, Tier-1 OEM, 4-hour duration, EN 50549-2',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-09',
    confidential: true,
    note: '4 contiguous plots; single grid connection point. BESS sized for 50% curtailment profile. EAC final connection terms required before financial close.',
  },
}
