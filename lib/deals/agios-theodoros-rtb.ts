/**
 * Agios Theodoros RTB (PARK-RTB-2026) — public deal figures.
 * Single source for: investor xlsx defaults, one-page teaser, /projects/agios-theodoros-rtb, investment-listings.
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
  specificYieldKwhPerKwp: 1800,
  /** MWh/year = MWp × yield */
  annualProductionMWh: 4752,
  /** Shown as GWh on site */
  annualProductionGWh: 4.75,
  technologySolar: 'Bifacial TopCon PV, fixed tilt south',
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

  finance: {
    grossEnergyRevenueY1EUR: 1_050_000,
    grossRevenueNote: 'Y1 gross energy revenue (merchant / blended DAM) — before aggregator fee',
    aggregatorFeePct: 0.1,
    citPct: 0.15,
    citNote: '15% from 1 Jan 2026',
    seniorDebtEUR: 2_270_000,
    equityEUR: 2_320_000,
    loanNominalRate: 0.05,
    loanTermYears: 15,
    leveredEquityIrrIndicative: '~30%',
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
