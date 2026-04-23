/**
 * Agios Theodoros RTB (PARK-RTB-2026) — public deal figures.
 * Single source for: investor xlsx defaults, one-page teaser, /projects/agios-theodoros-rtb, investment-listings.
 * Built pack (teaser + model): public/.../agios-theodoros-rtb/ — see AGIOS_INVESTOR_PACK.
 *
 * Align with: docs/internal/Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx (portfolio stack)
 * and scripts/generate-agios-theodoros-investor-xlsx.ts (Assumptions sheet).
 */

import { CYPRUS_TSOC_DAM_SAMPLE } from '../market/cyprus-tsoc-dam-sample'

export const AGIOS_THEODOROS_RTB = {
  referenceCode: 'PARK-RTB-2026',
  ceraLicense: 'Ε004576/2024',
  publicTitle: 'Agios Theodoros Solar Park with Battery Storage',
  locationLine: 'Agios Theodoros, Larnaca District, Cyprus',
  solarMWp: 2.64,
  bessPowerMW: 2.5,
  bessMWh: 10.56,
  bessDurationHours: 4,

  /** Panel spec — drives bifacial yield derivation */
  panelSpec: {
    wattage: 680,
    bifacialityPct: 75,
    mountType: 'fixed-tilt-south' as const,
    tiltDeg: 25,
    /** White ground surface (white limestone gravel / coated concrete pad) */
    albedo: 0.70,
    /**
     * Bifacial gain = bifaciality_factor × rear_irradiance / POA_front
     * Cyprus GHI ~1,900 kWh/m²/yr; rear view factor to ground ≈ 0.97 at 25° tilt
     * Rear irradiance ≈ 0.70 × 1,900 × 0.97 × (correction for angle) ≈ 11% of front
     * Gain = 0.75 × 0.11 × (adjustment) ≈ 11%
     */
    bifacialGainPct: 11,
    monofacialBaselineKwhPerKwp: 1950,
  },

  /** 2.64 MWp × 2,150 kWh/kWp (bifacial 680W + white albedo, fixed tilt 25°) */
  specificYieldKwhPerKwp: 2150,
  /** MWh/year = MWp × yield */
  annualProductionMWh: 5676,
  /** Shown as GWh on site */
  annualProductionGWh: 5.68,
  technologySolar: '680W bifacial TopCon, fixed tilt 25° south, white albedo ground',
  technologyBess: 'LFP, Tier-1 OEM, EN 50549-2 (TÜV certified)',

  capexStackEUR: {
    pvEpc: 1_900_000,
    pvUnitNote: '€0.72/Wp turnkey',
    bessEpc: 1_340_000,
    bessUnitNote: '€127k/MWh ex VAT',
    rtbAcquisition: 1_000_000,
    development: 350_000,
    total: 4_590_000,
  },

  /**
   * Revenue model — derived from bifacial yield + TSOC DAM dispatch.
   * Curtailment at 65% (realistic 2027 baseline; Cyprus curtailment trending up).
   * Solar (uncurtailed 35%) sold at DAM daytime avg; BESS dispatched at DAM evening peak.
   *
   * Derivation:
   *   Production:         5,676 MWh/yr (2.64 MWp × 2,150 kWh/kWp)
   *   Curtailed (65%):    3,689 MWh
   *   BESS captured (95%):3,505 MWh → discharged 3,025 MWh (RTE 86.32%) × €182.99 = €554k
   *   Uncurtailed (35%):  1,987 MWh × €140.88/MWh (DAM daytime 06-17h) = €280k
   *   Gross Y1:           €833,500
   */
  revenueModel: {
    curtailmentPct: 0.65,
    bessCapturePct: 0.95,
    uncurtailedSolarMWh: 1987,
    /** DAM daytime average 06:00–17:00 from TSOC sample */
    uncurtailedSolarRateEURPerMWh: 140.88,
    bessDischargedMWh: 3025,
    /** DAM evening peak 17:00–21:00 from TSOC sample */
    bessDischargeRateEURPerMWh: 182.99,
    uncurtailedSolarRevY1EUR: 279_872,
    bessRevY1EUR: 553_628,
    grossRevY1EUR: 833_500,
    _note: 'Both rates from lib/market/cyprus-tsoc-dam-sample.ts TSOC DAM sample (Oct 2025 – Feb 2026)',
  },

  finance: {
    /** Derived from revenueModel above — kept for backward compat with xlsx/teaser */
    grossEnergyRevenueY1EUR: 833_500,
    grossRevenueNote: 'Y1 gross: uncurtailed solar €280k (35% × €141/MWh) + BESS €554k (3,025 MWh × €183/MWh) — see revenueModel',
    aggregatorFeePct: 0.1,
    citPct: 0.15,
    citNote: '15% from 1 Jan 2026',
    seniorDebtEUR: 2_270_000,
    equityEUR: 2_320_000,
    loanNominalRate: 0.05,
    loanTermYears: 15,
    /** Real dispatch model with 65% curtailment; upside from rising DAM prices and lower curtailment */
    leveredEquityIrrIndicative: '~16-20%',
    npvDiscountRate: 0.1,
  },

  opexY1EUR: {
    pvOm: 40_000,
    bessOm: 26_000,
    other: 38_000,
    landLease: 18_000,
  },

  /** D&A bases — match xlsx Assumptions */
  depreciationEUR: {
    pvPlusBessBase: 3_240_000,
    pvPlusBessYears: 20,
    rtbPlusDevBase: 1_350_000,
    rtbPlusDevYears: 15,
  },

  /** TSOC DAM — reconciled sample; shared with Cyprus market teaser */
  marketDAM: CYPRUS_TSOC_DAM_SAMPLE,

  /** Indicative equity tickets — cash to equity Y1 approx.; full economics in xlsx */
  equityTiers: [
    { pct: 25, equityEUR: 580_000, indicativeAnnualCashEUR: '~€184k' },
    { pct: 50, equityEUR: 1_160_000, indicativeAnnualCashEUR: '~€367k' },
    { pct: 75, equityEUR: 1_740_000, indicativeAnnualCashEUR: '~€551k' },
    { pct: 100, equityEUR: 2_320_000, indicativeAnnualCashEUR: '~€735k', featured: true },
  ] as const,

  timelineHeadline: 'Target Q4 2026',

  _meta: {
    source:
      'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx; investor model Assumptions (Mar 2026)',
    date: '2026-03-31',
    note: 'Figures aligned across solarfarms.cy, one-page teaser, and agios-theodoros-rtb-investor-model xlsx.',
  },
} as const

/** Single folder for static teaser + Excel (served under /public). */
export const AGIOS_INVESTOR_PACK = {
  /** URL path prefix (no trailing slash) */
  basePath: '/lighthief-cyprus/parks-for-sale/agios-theodoros-rtb',
  teaserFile: 'agios-theodoros-park-sale-teaser-mar2026.html',
  modelFile: 'agios-theodoros-rtb-investor-model-mar2026.xlsx',
} as const

export type AgiosTheodorosRtb = typeof AGIOS_THEODOROS_RTB

/** €1.05M / €580k — for UI */
export function formatAgiosEurCompact(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return m % 1 === 0 ? `€${m}M` : `€${m.toFixed(2)}M`
  }
  if (n >= 1000) return `€${Math.round(n / 1000)}k`
  return `€${n}`
}
