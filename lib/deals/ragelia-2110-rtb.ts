/**
 * Ragelia Portfolio — Park #2110 (0.714 MWp PV)
 * Slug: ragelia-2110 | Ref: PARK-RTB-RAG2110-2026
 * Source: Projects_Offer.pdf (Ragelia Investments Ltd, Apr 2026)
 *
 * Asking price: €285,600 (100% SPV share purchase)
 * Grid: Preliminary DSO application submitted; formal offer expected Q3 2026.
 * Land: Leasehold (registered, zero encumbrances)
 * BESS: Not in original licence — added by Lighthief as upgrade.
 */
import {
  type RtbDeal, computeRevenueModel, computeCapex, computeFinance, computeOpex,
} from './rtb-deal-types'

const solarMWp    = 0.714
const bessMWh     = 2
const bessPowerMW = 0.5
const specificYield = 1_650
const curtailmentPct = 0.50
const landLease = 7_500

const rev   = computeRevenueModel({ solarMWp, specificYieldKwhPerKwp: specificYield, curtailmentPct, bessCapacityMWh: bessMWh })
const capex = computeCapex({ solarMWp, bessCapacityMWh: bessMWh, rtbCost: 285_600 })  // seller's asking price
const finance = computeFinance(capex, rev.grossRevY1EUR, '~10–12%')
const opex  = computeOpex({ solarMWp, bessCapacityMWh: bessMWh, capexTotal: capex.total, landLeasePerYear: landLease })

export const RAGELIA_2110_RTB: RtbDeal = {
  slug: 'ragelia-2110',
  referenceCode: 'PARK-RTB-RAG2110-2026',

  publicTitle: 'Solar Park #2110 with Battery Storage — 0.714 MWp',
  locationLine: 'Nicosia District, Cyprus',

  rtbStatus: 'fully_licensed',
  gridConnectionStatus: 'preliminary_filed',
  gridConnectionNote: 'Preliminary DSO application submitted; formal EAC connection offer expected Q3 2026',
  permitSummary: 'Tier 1 licensed — permits in place · Land lease registered, zero encumbrances · Grid: preliminary DSO filed; formal EAC connection terms pending (offer expected Q3 2026)',

  timelineNote: 'Target COD Q4 2026 / Q1 2027 (upon grid offer + EPC procurement)',

  solarMWp,
  specificYieldKwhPerKwp: specificYield,
  annualProductionMWh: Math.round(solarMWp * specificYield),
  technologySolar: 'Fixed-tilt monofacial PV, ground-mounted',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 4,
  technologyBess: 'Tier-1 LFP BESS, 4-hour duration (Lighthief BESS upgrade)',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-10',
    confidential: true,
    note: 'RTB acquisition price per seller offer (Apr 2026). BESS added by Lighthief (licence amendment required). Grid offer expected Q3 2026.',
  },
}
