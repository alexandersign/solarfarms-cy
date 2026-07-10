/**
 * Galascope 5.01 MWp operational tracker park (PARK-REF-5001 / Dino portfolio).
 * Investor pack: asking price + current PV-only vs BESS-augmented merchant economics.
 *
 * Align with: app/(marketing)/projects/park-ref-5001/page.tsx PARK_DATA
 */

import { CYPRUS_TSOC_DAM_SAMPLE } from '../market/cyprus-tsoc-dam-sample'
import {
  BESS_DEFAULTS,
  DAM,
  computeOpex,
  computeRevenueModel,
  LH_EPC,
} from './rtb-deal-types'

/** Indicative asking price — seller guidance Jun 2026 */
export const GALASCOPE_ASKING_PRICE_EUR = 9_000_000

export const GALASCOPE_5MW_OPERATIONAL = {
  referenceCode: 'PARK-REF-5001',
  publicTitle: '5.01 MWp Operational Solar — Single-Axis Trackers (Famagusta)',
  locationLine: 'Famagusta District, Cyprus (Galascope Limited)',
  solarMWp: 5.01,
  solarMWac: 4.62,
  askingPriceEUR: GALASCOPE_ASKING_PRICE_EUR,

  /** ~10 GWh gross typical; tracker yield ~2,000 kWh/kWp */
  specificYieldKwhPerKwp: 2000,
  annualProductionMWh: 10020,

  /** Weighted avg 2022–2025; 2025 actual 45.8% */
  curtailmentPctHistoricalAvg: 0.258,
  curtailmentPct2025: 0.458,
  /** Model scenarios */
  curtailmentPctCurrentCase: 0.35,
  curtailmentPctStressCase: 0.458,

  /** PPA-style offtake — preferential discount to EAC D40 */
  ppaTariffEURPerMWh: 190,
  ppaNote: 'Local independent distributor — preferential discount to EAC D40 (€190/MWh indicative 2024)',

  omCostsY1EUR: 113_000,
  landLeaseY1EUR: 25_000,

  bessPowerMW: 5,
  bessMWh: 12.5,
  bessDurationHours: 2.5,
  bessEpcPerMWhEUR: 140_000,
  bessEpcTotalEUR: 12.5 * 140_000,

  equipment: {
    panels: 'Trina Solar TSM-DEG15M.20 (395–400 Wp bifacial glass/glass)',
    inverters: 'Huawei SUN2000-105KTL-H1 (44 units)',
    tracking: 'Nclave SP160 single-axis trackers (2P)',
    scada: 'IESA Automation',
  },

  productionHistory: [
    { year: 2020, productionMWh: 7171, curtailmentPct: 0 },
    { year: 2021, productionMWh: 10146, curtailmentPct: 0 },
    { year: 2022, productionMWh: 9897, curtailmentPct: 3.5 },
    { year: 2023, productionMWh: 8861, curtailmentPct: 13.4 },
    { year: 2024, productionMWh: 7436, curtailmentPct: 26.7 },
    { year: 2025, productionMWh: 5599, curtailmentPct: 45.8 },
  ],

  landLease: {
    start: '2019-09-01',
    end: '2039-09-01',
    escalation: '10% every 5 years',
    extensions: '2 × 5-year options',
  },

  _meta: {
    source: 'park-ref-5001 PARK_DATA; Galascope operational DD',
    date: '2026-06-19',
  },
} as const

const G = GALASCOPE_5MW_OPERATIONAL

function pvOnlyFinancials(curtailmentPct: number) {
  const grossMWh = G.annualProductionMWh
  const netMWh = Math.round(grossMWh * (1 - curtailmentPct))
  const grossRev = Math.round(netMWh * G.ppaTariffEURPerMWh)
  const opex = G.omCostsY1EUR + G.landLeaseY1EUR
  const netIncome = grossRev - opex
  const roiPct = (netIncome / G.askingPriceEUR) * 100
  const payback = G.askingPriceEUR / netIncome
  return { grossMWh, netMWh, grossRev, opex, netIncome, roiPct, payback }
}

/** PV-only — PPA/offtaker model (current operations) */
export const GALASCOPE_PV_ONLY = pvOnlyFinancials(G.curtailmentPctCurrentCase)

/** PV-only stress — 2025 curtailment level */
export const GALASCOPE_PV_ONLY_STRESS = pvOnlyFinancials(G.curtailmentPctStressCase)

/** Merchant BESS augmentation on top of acquisition */
export const GALASCOPE_WITH_BESS = (() => {
  const rev = computeRevenueModel({
    solarMWp: G.solarMWp,
    specificYieldKwhPerKwp: G.specificYieldKwhPerKwp,
    curtailmentPct: G.curtailmentPctCurrentCase,
    bessCapacityMWh: G.bessMWh,
  })
  const totalCapex = G.askingPriceEUR + G.bessEpcTotalEUR
  const opex = computeOpex({
    solarMWp: G.solarMWp,
    bessCapacityMWh: G.bessMWh,
    capexTotal: totalCapex,
    landLeasePerYear: G.landLeaseY1EUR,
    pvOmPerMWPerYear: Math.round(G.omCostsY1EUR / G.solarMWp),
  })
  const totalOpex = opex.pvOm + opex.bessOm + opex.landLease + opex.other
  const netRev = rev.grossRevY1EUR * (1 - 0.1)
  const ebitda = netRev - totalOpex
  const da = Math.round(G.bessEpcTotalEUR / 20)
  const tax = Math.round(Math.max(0, ebitda - da) * 0.15)
  const fcf = ebitda - tax
  const roiPct = (fcf / totalCapex) * 100
  return {
    rev,
    opex,
    totalOpex,
    totalCapex,
    netRev,
    ebitda,
    tax,
    fcfY1: fcf,
    roiPct,
    paybackYears: fcf > 0 ? totalCapex / fcf : 99,
    upliftVsPvOnly: rev.grossRevY1EUR - GALASCOPE_PV_ONLY.grossRev,
  }
})()

export const GALASCOPE_INVESTOR_PACK = {
  slug: 'galascope-5mw-trackers',
  outputDir: 'public/lighthief-cyprus/parks-for-sale/galascope-5mw-trackers',
  internalDir: 'parks-for-sale/galascope-5mw-trackers',
  teaserFile: 'galascope-5mw-investor-teaser-jun2026.html',
  modelFile: 'galascope-5mw-investor-model-jun2026.xlsx',
  basePath: '/lighthief-cyprus/parks-for-sale/galascope-5mw-trackers',
  listingSlug: 'park-ref-5001',
  marketDAM: CYPRUS_TSOC_DAM_SAMPLE,
  dam: DAM,
  bessDefaults: BESS_DEFAULTS,
  lhEpc: LH_EPC,
} as const
