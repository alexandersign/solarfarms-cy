/**
 * PV O&M package pricing — internal sales reference.
 * Source: pv-om/internal/pricing-benchmarks.md (May 2026).
 * Not in portfolio-data.ts (BESS SSOT only).
 */

export const PV_OM_META = {
  source: 'pv-om/internal/pricing-benchmarks.md',
  date: '2026-05',
} as const

export const POLAND_PACKAGES = [
  {
    id: 'eco',
    name: 'ECO',
    eurPerMwYr: 4_230,
    includes: 'SCADA + 2 inspections per year',
  },
  {
    id: 'silver',
    name: 'SILVER',
    eurPerMwYr: 9_512,
    includes: 'ECO + cleaning (1×), thermography, vegetation (2×), spares, insurance mgmt',
  },
  {
    id: 'gold',
    name: 'GOLD',
    eurPerMwYr: 11_256,
    includes: 'SILVER + PPA mgmt, security, warranty admin, 4 call-outs, 6 inspections',
  },
] as const

export const POLAND_CALLOUT = {
  emergencyVisitEur: 459,
  responseHours: 12,
  setupPerMwEur: 1_176,
} as const

export const GREENVILLE_CUSTOM = [
  { mw: 5, annualEur: 26_355, eurPerMw: 5_271 },
  { mw: 10, annualEur: 52_002, eurPerMw: 5_200 },
] as const

export const SPANERCOM_PV_OM = {
  client: 'Spanercom Ltd',
  parks: 'Anarita East + West (2 × 5 MW)',
  annualExVat: 56_400,
  perParkYr: 28_200,
  eurPerMwYr: 5_640,
  incumbentComparison: 60_000,
  savingVsIncumbent: 3_600,
  cleaningsPerYr: 2,
  vegetationPerYr: 4,
  includedCallouts: 6,
  urgentResponseHours: 4,
  availabilityPct: 99,
} as const

export const CYPRUS_OM_BANDS = [
  { size: 'Up to 2 MW', eco: '€6,000–8,000/yr', silver: '€14,000–18,000/yr', gold: '€20,000–26,000/yr' },
  { size: '2–5 MW', eco: '€8,000–14,000/yr', silver: '€22,000–32,000/yr', gold: '€35,000–50,000/yr' },
  { size: '5–10 MW', eco: '€14,000–22,000/yr', silver: '€40,000–60,000/yr', gold: '€70,000–110,000/yr' },
  { size: '10–25 MW', eco: '€20,000–35,000/yr', silver: '€60,000–100,000/yr', gold: '€110,000–160,000/yr' },
] as const
