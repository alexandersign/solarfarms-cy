/**
 * Shia-Sia (Novikov DD) — documented assumptions with package references.
 * Used by scripts/generate-shia-sia-investor-pack.ts
 *
 * Align with: parks-for-sale/novikov/SHIA-SIA-PROJECT-ANALYSIS.md
 * DD received: 9 May 2026
 */

export const SHIA_SIA_INVESTOR_PACK = {
  slug: 'shia-sia-nicosia',
  referenceCode: 'PARK-RTB-SIA-2026',
  outputDir: 'public/lighthief-cyprus/parks-for-sale/shia-sia-nicosia',
  internalDir: 'parks-for-sale/novikov/investor-pack',
  modelFile: 'shia-sia-investor-model.xlsx',
  teaserFile: 'shia-sia-investor-teaser.html',
  sourcesFile: 'SOURCES.md',
} as const

/** EAC / grid — OCR from 498000141 + Amendment 5 (May 2026 DD) */
export const EAC_CONNECTION = {
  reference: '498000141',
  voltageKv: 22,
  licensedMWp: 3.0,
  acExportLimitMW: 2.7,
  inverterNote: 'Huawei SUN2000-150K — 3 × 330 kW (per DD technical summary)',
  preliminaryGridWorksEUR: 83_842.14,
  preliminaryGridWorksRoundedEUR: 83_842,
  depositExVATEUR: 4_192.11,
  depositInclVATEUR: 4_988.61,
  depositPaidDate: '2022-02-22',
  preliminaryTermsDate: '2023-02-07',
  amendment5Date: '2025-06',
  annualTelecomEUR: 180,
  annualSubleaseEUR: 10,
  acceptanceNote: 'Arnal Verde accepted preliminary terms + paid 5% deposit within 30-day deadline',
  preliminaryDisclaimer:
    'Preliminary estimate only — not binding; final cost after EAC Techno-Economic Study',
  ddDocuments: [
    'EAC connection/498000141_Grid_Connection_Terms_SIA.pdf',
    'Scan_Grid_Connection_Terms_5__SIA.pdf',
    'EAC letter FL4145 (Feb 2026) — substation sublease documents requested',
  ],
} as const

/** Permits — from DD package index */
export const PERMITS = {
  ceraLicence: 'E3511',
  ceraIssued: '2025-04',
  townPlanningMWp: 3.32,
  townPlanningIssued: '2025-05-05',
  landPlot: 'Plot 316, Sheet XXXIX/47, Sia, Larnaca District',
  landLeaseExecuted: '2025-05',
  environmentalForm: 'ΛΕΥ-542-2023 (Feb 2025)',
} as const

/** Seller commercial (DD) — NOT used in Lighthief merchant base case */
export const SELLER_COMMERCIAL = {
  ppaCounterparty: 'Synenergia',
  ppaStatus: 'Draft v2 — January 2026, not executed',
  ppaRateUSDPerKwhY1: 0.16,
  ppaTenorYears: 30,
  ppaIndexedFromYear: 6,
  novikovFmFile: 'FM_3,2MW_250126_BESS.xlsx',
  novikovTotalCapexEUR: 4_780_000,
  novikovDevCostEUR: 1_600_000,
  novikovEquityIrrPct: 29.7,
  novikovNote: 'Seller model — south-facing yield, levered; not Lighthief base case',
} as const

/** PV yield — PVGIS run 15 Jun 2026 (parks-for-sale/novikov/pvgis-yield-shia-sia.json) */
export const PV_YIELD = {
  method: 'PVGIS API v5.2',
  layout: 'Bifacial east–west 10° (50% aspect −90° + 50% aspect +90°)',
  coords: { lat: 34.957, lon: 33.377 },
  lossPct: 14,
  bifacialGainPct: 5,
  pvgisKwhKwp: 1_487,
  modelKwhKwp: 1_480,
  runDate: '2026-06-15',
  script: 'scripts/pvgis-park-yield.py',
  southReferenceKwhKwp: 1_633,
} as const

/** Pricing — Lighthief EPC schedule (v4 workbook / rtb-deal-types LH_EPC) */
export const LH_PRICING = {
  pvEURPerMWp: 720_000,
  bessEURPerMWh: 127_000,
  rtbWithConnectionTermsEUR: 600_000,
  source: 'lib/deals/rtb-deal-types.ts LH_EPC + RTB_COSTS; Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx',
} as const

/** OPEX lines with source tags */
export const OPEX_SOURCES = {
  pvOmEURPerMWp: 8_000,
  pvOmNote: 'Shia-Sia scoped O&M rate (investor pack assumption — confirm at NDA)',
  bessOmEURPerMWh: 2_470,
  bessOmNote: 'BESS_DEFAULTS.omPerMWhPerYear — basic O&M; LTSA Tier C quoted separately',
  landLeaseEUR: 18_000,
  landLeaseNote: 'INDICATIVE — executed lease May 2025 on file; annual rent not OCR’d from deed',
  insurancePctOfCapex: 0.005,
  adminEUR: 15_000,
  eacAnnualFeesEUR: EAC_CONNECTION.annualTelecomEUR + EAC_CONNECTION.annualSubleaseEUR,
} as const
