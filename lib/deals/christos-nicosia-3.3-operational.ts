/**
 * Christos Nicosia 3.3 MW — operational PV + 1.7 MWp expansion (no grid connection).
 * Investor pack: current PV economics vs BESS augmentation; data-centre captive-load angle on 1.7 MWp.
 *
 * Align with: solhash/studies/christos-nicosia-3.3/, Individual_Christos_Nicosia client docs.
 */

import { CYPRUS_TSOC_DAM_SAMPLE } from '../market/cyprus-tsoc-dam-sample'
import {
  BESS_DEFAULTS,
  DAM,
  computeOpex,
  computeRevenueModel,
  LH_EPC,
} from './rtb-deal-types'

export const CHRISTOS_NICOSIA_OPERATIONAL = {
  referenceCode: 'PARK-OP-CHR-33-2026',
  publicTitle: 'Nicosia Solar Park — 3.3 MWp Operational + 1.7 MWp Expansion',
  locationLine: 'Margí, Nicosia District, Cyprus',
  ceraLicense: 'Ε004836/2025',
  operationalSince: 'July 2025',

  /** Built and grid-connected */
  solarMWp: 3.3,
  specificYieldKwhPerKwp: 1900,
  annualProductionMWh: 6270,
  technologySolar: 'Bifacial fixed-tilt — operational asset',

  /** Licensed expansion on same site — building permit only, no EAC connection terms */
  expansionMWp: 1.7,
  expansionMWhPerYear: 3230,
  expansionStatus:
    'CERA construction licence / building permit — no grid connection terms. Suitable for captive load (data centre, mining, industrial).',

  bessPowerMW: 3.3,
  bessMWh: 10,
  bessDurationHours: 3,
  bessEpcClientQuoteEUR: 1_321_976,
  bessEpcPerMWhNote: '€132.20/kWh — Lighthief turnkey quote (Feb 2026, group-order scale)',

  /** Merchant curtailment — rising Cyprus baseline; park operational <1 yr */
  curtailmentPctCurrent: 0.35,
  curtailmentPctWithBess: 0.47,

  landLeaseEUR: 18_000,

  _meta: {
    source: 'CSAP/CERA Ε004836/2025; solhash christos-nicosia-3.3; client BESS proposal Mar 2026',
    date: '2026-06-19',
  },
} as const

const C = CHRISTOS_NICOSIA_OPERATIONAL

/** PV-only merchant model (no acquisition — operating asset economics) */
export const CHRISTOS_PV_ONLY = (() => {
  const rev = computeRevenueModel({
    solarMWp: C.solarMWp,
    specificYieldKwhPerKwp: C.specificYieldKwhPerKwp,
    curtailmentPct: C.curtailmentPctCurrent,
    bessCapacityMWh: 0,
  })
  const opex = {
    pvOm: Math.round(C.solarMWp * 15_000),
    bessOm: 0,
    landLease: C.landLeaseEUR,
    other: 20_000,
  }
  const totalOpex = opex.pvOm + opex.bessOm + opex.landLease + opex.other
  const netRev = rev.grossRevY1EUR * (1 - 0.1)
  const ebitda = netRev - totalOpex
  const tax = Math.round(Math.max(0, ebitda) * 0.15)
  const fcf = ebitda - tax
  return { rev, opex, totalOpex, netRev, ebitda, tax, fcfY1: fcf }
})()

/** Operational PV + BESS augmentation (BESS EPC added to cash flow basis) */
export const CHRISTOS_WITH_BESS = (() => {
  const rev = computeRevenueModel({
    solarMWp: C.solarMWp,
    specificYieldKwhPerKwp: C.specificYieldKwhPerKwp,
    curtailmentPct: C.curtailmentPctWithBess,
    bessCapacityMWh: C.bessMWh,
  })
  const bessEpc = C.bessEpcClientQuoteEUR
  const opex = computeOpex({
    solarMWp: C.solarMWp,
    bessCapacityMWh: C.bessMWh,
    capexTotal: bessEpc,
    landLeasePerYear: C.landLeaseEUR,
  })
  const totalOpex = opex.pvOm + opex.bessOm + opex.landLease + opex.other
  const netRev = rev.grossRevY1EUR * (1 - 0.1)
  const ebitda = netRev - totalOpex
  const da = Math.round(bessEpc / 20)
  const tax = Math.round(Math.max(0, ebitda - da) * 0.15)
  const fcf = ebitda - tax
  const incrementalFcf = fcf - CHRISTOS_PV_ONLY.fcfY1
  const bessRoi = bessEpc > 0 ? (incrementalFcf / bessEpc) * 100 : 0
  return {
    rev,
    opex,
    totalOpex,
    netRev,
    ebitda,
    tax,
    fcfY1: fcf,
    bessEpc,
    incrementalFcf,
    bessRoiPct: bessRoi,
    bessPaybackYears: incrementalFcf > 0 ? bessEpc / incrementalFcf : 99,
  }
})()

export const CHRISTOS_INVESTOR_PACK = {
  slug: 'christos-nicosia-3.3',
  outputDir: 'public/lighthief-cyprus/parks-for-sale/christos-nicosia-3.3',
  internalDir: 'parks-for-sale/christos-nicosia-3.3',
  teaserFile: 'christos-nicosia-3.3-investor-teaser-jun2026.html',
  modelFile: 'christos-nicosia-3.3-investor-model-jun2026.xlsx',
  basePath: '/lighthief-cyprus/parks-for-sale/christos-nicosia-3.3',
  marketDAM: CYPRUS_TSOC_DAM_SAMPLE,
  dam: DAM,
  bessDefaults: BESS_DEFAULTS,
  lhEpc: LH_EPC,
} as const
