/**
 * Ragelia Portfolio — Park #2206 (2.317 MWp PV + BESS)
 * Slug: ragelia-2206 | Ref: PARK-RTB-RAG2206-2026
 * Status: Fully Licensed / RTB
 * Source: Ragelia Investments Ltd portfolio (received Apr 2026, via SolarFarms.cy listing RAGELIA-PORTFOLIO-2026)
 */

import {
  type RtbDeal,
  computeRevenueModel,
  computeCapex,
  computeFinance,
  computeOpex,
  RTB_COSTS,
} from './rtb-deal-types'

const solarMWp = 2.317
const bessMWh = 4
const bessPowerMW = 1
const specificYield = 1_650
const curtailmentPct = 0.50
const landLease = 12_000

const rev = computeRevenueModel({ solarMWp, specificYieldKwhPerKwp: specificYield, curtailmentPct, bessCapacityMWh: bessMWh })
const capex = computeCapex({ solarMWp, bessCapacityMWh: bessMWh, rtbCost: RTB_COSTS.withoutConnectionTerms })
const finance = computeFinance(capex, rev.grossRevY1EUR)
const opex = computeOpex({ solarMWp, bessCapacityMWh: bessMWh, capexTotal: capex.total, landLeasePerYear: landLease })

export const RAGELIA_2206_RTB: RtbDeal = {
  slug: 'ragelia-2206',
  referenceCode: 'PARK-RTB-RAG2206-2026',

  publicTitle: 'Solar Park #2206 with Battery Storage — 2.3 MWp',
  locationLine: 'Cyprus',

  rtbStatus: 'fully_licensed',
  gridConnectionStatus: 'preliminary_filed',
  gridConnectionNote:
    'Awaiting DSO formal EAC connection offer — terms priced separately upon issue (aligned with Ragelia #2205+#2206 package disclosure)',
  permitSummary: 'Fully licensed · Ready to Build — all permits issued',

  timelineNote: 'RTB — construction ready upon financial close',

  solarMWp,
  specificYieldKwhPerKwp: specificYield,
  annualProductionMWh: Math.round(solarMWp * specificYield),
  technologySolar: 'Fixed-tilt monofacial PV',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 4,
  technologyBess: 'LFP, Tier-1 OEM, 4-hour duration',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-09',
    confidential: true,
    note: 'Part of Ragelia portfolio (8 parks, 9.8 MWp total). BESS sized for 4h duration, 1 MW / 4 MWh. Full permit documentation available under NDA.',
  },
}
