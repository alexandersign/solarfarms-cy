/**
 * Ragelia Portfolio — Combined Package #2205 + #2206 (2.817 MW total)
 * Slug: ragelia-2205-2206 | Ref: PARK-RTB-RAG2206-2026
 * Source: Projects_Offer.pdf (Ragelia Investments Ltd, Apr 2026)
 *
 * Sold as a combined package only (both SPVs simultaneously).
 * Package asking price: €1,850,000
 *   Land (#2205 + #2206):     €405,000 — FREEHOLD (company-owned, zero lease risk)
 *   Permitting & licensing:   €1,126,000
 *   Constructed works (#2205):  €200,000 (civil + electrical complete)
 *   Constructed works (#2206):  €119,000 (earthworks + fencing complete)
 *
 * #2205 — 0.5 MWp: CONSTRUCTION COMPLETE — awaiting grid connection only.
 * #2206 — 2.317 MWp + 2.2MW/0.75MWh BESS: Tier 1 RTB, awaiting grid connection.
 *
 * BESS: Lighthief upgrades existing 2.2MW/0.75MWh to full 4h system (1.5MW/6MWh).
 * PV EPC: Only #2206 needs full EPC (2.317 MWp); #2205 is already built.
 */
import {
  type RtbDeal, computeRevenueModel, computeCapex, computeFinance, computeOpex,
  LH_EPC,
} from './rtb-deal-types'

// Combined PV capacity
const solarMWp    = 2.817   // 0.5 (#2205 built) + 2.317 (#2206 RTB)
const bessMWh     = 6
const bessPowerMW = 1.5
const specificYield = 1_650
const curtailmentPct = 0.50
// No land lease — both plots are FREEHOLD (company-owned)
const landLease   = 0

// PV EPC: only #2206 needs it (#2205 already built), adjust accordingly
const pvEpcForBuild = Math.round(2.317 * LH_EPC.pvPerMWp)  // €1,668k for RTB portion only
const bessEpc       = Math.round(bessMWh * LH_EPC.bessPerMWh)
const rtbAcquisition = 1_850_000  // package asking price

const rev = computeRevenueModel({ solarMWp, specificYieldKwhPerKwp: specificYield, curtailmentPct, bessCapacityMWh: bessMWh })

// Custom capex — #2205 EPC is already sunk (buyer acquires built works in the €1.85M package price)
const capex = {
  rtbAcquisition,
  pvEpc: pvEpcForBuild,
  pvUnitNote: '€0.72/Wp turnkey — #2206 only (#2205 already constructed)',
  bessEpc,
  bessUnitNote: '€127k/MWh ex VAT (Tier-1 LFP OEM, Lighthief installed)',
  connectionTerms: 0,
  connectionTermsNote: 'EAC grid connection terms pending for both plots — priced separately (case-by-case)',
  total: rtbAcquisition + pvEpcForBuild + bessEpc,
}

const finance = computeFinance(capex, rev.grossRevY1EUR, '~13–16%')
const opex    = computeOpex({ solarMWp, bessCapacityMWh: bessMWh, capexTotal: capex.total, landLeasePerYear: landLease })

export const RAGELIA_2205_2206_RTB: RtbDeal = {
  slug: 'ragelia-2205-2206',
  referenceCode: 'PARK-RTB-RAG2206-2026',

  publicTitle: 'Solar Parks #2205 + #2206 — Combined Package (2.817 MW)',
  locationLine: 'Nicosia District, Cyprus',

  rtbStatus: 'fully_licensed',
  gridConnectionStatus: 'preliminary_filed',
  gridConnectionNote: 'Grid connection awaiting DSO formal offer on both plots (#2205 already constructed)',
  permitSummary: '#2205 (0.5 MWp): Construction complete — grid connection terms pending · #2206 (2.317 MWp + BESS): Tier 1 licensed, permits in place · Land: FREEHOLD on both plots · Grid: formal EAC connection terms pending',

  timelineNote: '#2205: target energisation Q3 2026 · #2206: target COD Q4 2026 (upon grid offer)',

  solarMWp,
  specificYieldKwhPerKwp: specificYield,
  annualProductionMWh: Math.round(solarMWp * specificYield),
  technologySolar: '#2205: 0.5 MWp built · #2206: 2.317 MWp ground-mounted RTB',

  bessPowerMW,
  bessMWh,
  bessDurationHours: 4,
  technologyBess: 'Tier-1 LFP BESS, 4-hour duration — Lighthief upgrade on existing licensed 2.2MW/0.75MWh BESS',

  capex,
  revenueModel: rev,
  finance,
  opexY1: opex,

  _meta: {
    date: '2026-05-10',
    confidential: true,
    note: 'Combined package — sold as two SPVs in simultaneous closing. Land is FREEHOLD (no lease risk). #2205 civil + electrical construction complete. #2206 earthworks + fencing complete. Package price €1.85M per seller offer (Apr 2026).',
  },
}
