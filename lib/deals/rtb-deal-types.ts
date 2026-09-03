/**
 * Shared types for all RTB (Ready-to-Build) investor teasers.
 * Each project has a corresponding data file (e.g. shia-sia-rtb.ts) that
 * exports an RtbDeal conforming to this interface.
 * The universal generator (scripts/generate-rtb-teasers.ts) renders HTML from these.
 */

export type RtbStatus =
  | 'ready_to_build'      // All permits + grid connection terms issued
  | 'permit_ready'        // CERA + planning issued; grid connection in progress
  | 'fully_licensed'      // All permits issued (synonym for ready_to_build on some projects)

/**
 * Grid connection status — tracked independently of RtbStatus because a project can be
 * "fully licensed" on all OTHER permits while still awaiting final EAC connection terms.
 * Use this field for the timeline row, NOT rtbStatus.
 */
export type GridConnectionStatus =
  | 'final_issued'       // Binding final EAC connection terms issued
  | 'preliminary_filed'  // Preliminary DSO application filed; formal offer pending
  | 'pending_upgrade'    // Area grid at capacity; waiting for TSO/EAC substation upgrade
  | 'not_filed'          // No application filed yet

/** Public hub badge — driven by grid connection, not permit/rtb status alone. */
export type PublicListingStatusColor = 'green' | 'blue' | 'yellow' | 'red'

export function publicGridListingStatus(grid: GridConnectionStatus): {
  label: string
  color: PublicListingStatusColor
} {
  switch (grid) {
    case 'final_issued':
      return { label: 'Connection terms issued', color: 'green' }
    case 'preliminary_filed':
      return { label: 'Connection terms pending', color: 'yellow' }
    case 'pending_upgrade':
      return { label: 'Connection terms pending', color: 'yellow' }
    case 'not_filed':
      return { label: 'Connection terms pending', color: 'yellow' }
    default:
      return { label: 'Connection terms pending', color: 'yellow' }
  }
}

/** Secondary permit line for cards — avoids implying full RTB when grid is outstanding. */
export function permitsInPlaceLabel(rtbStatus: RtbStatus): string {
  switch (rtbStatus) {
    case 'ready_to_build':
      return 'Permits & licences in place'
    case 'fully_licensed':
      return 'Fully licensed (permits)'
    case 'permit_ready':
      return 'Major permits issued'
    default:
      return 'Permitting in progress'
  }
}

export interface RtbDealCapex {
  rtbAcquisition: number          // €  flat RTB acquisition cost
  pvEpc: number                   // €  PV EPC turnkey (Lighthief)
  pvUnitNote: string              // e.g. "€0.72/Wp turnkey"
  bessEpc: number                 // €  BESS EPC turnkey (Lighthief)
  bessUnitNote: string            // e.g. "€127k/MWh ex VAT"
  /** Connection terms are priced separately; show here if included in RTB, else 0 */
  connectionTerms: number
  connectionTermsNote: string
  total: number                   // sum of above
}

export interface RtbDealRevenue {
  /** % of gross annual PV production that is curtailed */
  curtailmentPct: number
  /** % of curtailed energy captured by BESS */
  bessCapturePct: number
  uncurtailedSolarMWh: number
  uncurtailedSolarRateEURPerMWh: number   // DAM daytime avg
  uncurtailedSolarRevY1EUR: number
  bessDischargedMWh: number
  bessDischargeRateEURPerMWh: number      // DAM evening peak
  bessRevY1EUR: number
  grossRevY1EUR: number
}

export interface RtbDealFinance {
  grossEnergyRevenueY1EUR: number
  aggregatorFeePct: number        // 0.10
  citPct: number                  // 0.15 (Cyprus CIT from 1 Jan 2026)
  seniorDebtEUR: number
  equityEUR: number
  loanNominalRate: number         // 0.05
  loanTermYears: number           // 15
  leveredEquityIrrIndicative: string  // e.g. "~16–20%"
}

export interface RtbDealOpex {
  pvOm: number        // €/yr  PV O&M
  bessOm: number      // €/yr  BESS O&M
  landLease: number   // €/yr
  other: number       // €/yr  insurance + admin + monitoring
}

export interface RtbDeal {
  /** URL-safe slug → output goes to public/lighthief-cyprus/teasers/{slug}/ */
  slug: string
  referenceCode: string

  /** Public-facing title — NO SPV/company names */
  publicTitle: string
  /** District-level location only — no village/plot details */
  locationLine: string

  rtbStatus: RtbStatus
  /** EAC grid connection status — used for timeline row colouring */
  gridConnectionStatus: GridConnectionStatus
  /** One-line grid connection note for teaser timeline */
  gridConnectionNote: string
  /** One-line permit summary shown on teaser */
  permitSummary: string

  /** Target construction/COD note */
  timelineNote: string

  // ── Technical ────────────────────────────────────────────────────────────
  solarMWp: number
  /** Standard: 1,650 kWh/kWp; bifacial high-albedo: up to 2,150 */
  specificYieldKwhPerKwp: number
  annualProductionMWh: number
  technologySolar: string

  bessPowerMW: number
  bessMWh: number
  bessDurationHours: number
  technologyBess: string

  // ── Economics ────────────────────────────────────────────────────────────
  capex: RtbDealCapex
  revenueModel: RtbDealRevenue
  finance: RtbDealFinance
  opexY1: RtbDealOpex

  // ── Meta ─────────────────────────────────────────────────────────────────
  _meta: {
    date: string          // ISO date of last review
    confidential: boolean // always true for teasers
    note: string
  }
}

/** Investor pack paths (served under /public) */
export interface RtbInvestorPack {
  basePath: string    // URL path prefix under /public
  teaserFile: string  // HTML filename
}

export function investorPackForDeal(deal: RtbDeal): RtbInvestorPack {
  return {
    basePath: `/lighthief-cyprus/teasers/${deal.slug}`,
    teaserFile: `${deal.slug}-teaser.html`,
  }
}

// ── Shared financial constants ────────────────────────────────────────────

/** TSOC DAM underwriting sample used in deal models (Oct 2025 – Feb 2026).
 *  Live website stats: `lib/market/cyprus-tsoc-dam-sample.ts` (339 days to 4 Sep 2026).
 *  Do not retune investor models from the live file without regenerating packs. */
export const DAM = {
  avgEURPerMWh: 158.19,
  peakEveningEURPerMWh: 182.99,
  middayEURPerMWh: 101.13,
  daytimeEURPerMWh: 140.88,
  sampleNote: '134 TSOC day-ahead days (1 Oct 2025 – 11 Feb 2026)',
} as const

/** Lighthief EPC pricing (from v4 workbook) */
export const LH_EPC = {
  pvPerMWp: 720_000,    // €/MWp turnkey (Lighthief rate ~5 MWp scale)
  bessPerMWh: 127_000,  // €/MWh ex VAT (Tier-1 LFP OEM, Lighthief installed)
  pvUnitNote: '€0.72/Wp turnkey (Lighthief)',
  bessUnitNote: '€127k/MWh ex VAT (Tier-1 LFP OEM, Lighthief installed)',
} as const

/** BESS model defaults — calibrated against Galascope 2.5MW real 2025 data */
export const BESS_DEFAULTS = {
  rteAcAc: 0.8632,         // Full system AC-AC RTE incl. cabling losses
  capturePct: 0.874,        // % of curtailed energy captured (87.4% — Galascope real model with overflow constraints)
  curtailmentPct: 0.50,     // Cyprus 2027 baseline (50% — operator-reported, consistent with Galascope seasonal peaks)
  dischargePriceEURPerMWh: 195, // Blended evening peak discharge price (above DAM avg €184, below Apr 2026 peak €340)
  durationHours: 4,         // Default teaser duration; per-deal override common
  omPerMWhPerYear: 2_470,   // €/MWh/year BESS O&M basic
  /** Days/year BESS can fully cycle on curtailed solar (~280 curtailment-active days in Cyprus) */
  fullCycleDaysPerYear: 280,
} as const

/** RTB acquisition costs (flat per project, user-defined) */
export const RTB_COSTS = {
  withoutConnectionTerms: 400_000,   // €  CERA + planning + building permit; grid connection not yet issued
  withConnectionTerms: 600_000,      // €  all above + EAC grid connection terms issued
} as const

/** Standard PV O&M and finance parameters */
export const PV_DEFAULTS = {
  omPerMWPerYear: 15_000,   // €/MW/year
  yieldKwhPerKwp: 1_650,    // Standard Cyprus fixed-tilt monofacial
  yieldBifacialKwhPerKwp: 1_700,  // Bifacial, white albedo, optimised tilt
  loanRate: 0.05,
  loanTermYears: 15,
  ltvOfEpcCosts: 0.50,      // Senior debt as % of PV+BESS EPC only
  aggregatorFeePct: 0.10,
  citPct: 0.15,
} as const

/** Compute standard revenue model for a given project */
export function computeRevenueModel(params: {
  solarMWp: number
  specificYieldKwhPerKwp: number
  curtailmentPct: number
  bessCapacityMWh: number
  /** Override BESS discharge €/MWh (default: BESS_DEFAULTS.dischargePriceEURPerMWh) */
  bessDischargePriceEURPerMWh?: number
}): RtbDealRevenue {
  const { solarMWp, specificYieldKwhPerKwp, curtailmentPct, bessCapacityMWh } = params
  const annualMWh = solarMWp * specificYieldKwhPerKwp
  const uncurtailedMWh = Math.round(annualMWh * (1 - curtailmentPct))
  const curtailedMWh = Math.round(annualMWh * curtailmentPct)
  const idealChargeMWh = Math.round(curtailedMWh * BESS_DEFAULTS.capturePct)
  const maxChargeMWh = Math.round(bessCapacityMWh * BESS_DEFAULTS.fullCycleDaysPerYear)
  const bessCharged = Math.min(idealChargeMWh, maxChargeMWh)
  const effectiveCapturePct = curtailedMWh > 0 ? bessCharged / curtailedMWh : 0
  const bessDischargedMWh = Math.round(bessCharged * BESS_DEFAULTS.rteAcAc)
  const solarRate = DAM.daytimeEURPerMWh
  const bessRate = params.bessDischargePriceEURPerMWh ?? BESS_DEFAULTS.dischargePriceEURPerMWh
  const solarRev = Math.round(uncurtailedMWh * solarRate)
  const bessRev = Math.round(bessDischargedMWh * bessRate)
  return {
    curtailmentPct,
    bessCapturePct: effectiveCapturePct,
    uncurtailedSolarMWh: uncurtailedMWh,
    uncurtailedSolarRateEURPerMWh: solarRate,
    uncurtailedSolarRevY1EUR: solarRev,
    bessDischargedMWh,
    bessDischargeRateEURPerMWh: bessRate,
    bessRevY1EUR: bessRev,
    grossRevY1EUR: solarRev + bessRev,
  }
}

/** Compute standard CAPEX stack */
export function computeCapex(params: {
  solarMWp: number
  bessCapacityMWh: number
  rtbCost: number
  connectionTerms?: number
}): RtbDealCapex {
  const pvEpc = Math.round(params.solarMWp * LH_EPC.pvPerMWp)
  const bessEpc = Math.round(params.bessCapacityMWh * LH_EPC.bessPerMWh)
  const connectionTerms = params.connectionTerms ?? 0
  return {
    rtbAcquisition: params.rtbCost,
    pvEpc,
    pvUnitNote: LH_EPC.pvUnitNote,
    bessEpc,
    bessUnitNote: LH_EPC.bessUnitNote,
    connectionTerms,
    connectionTermsNote: connectionTerms > 0
      ? 'EAC grid connection terms included in RTB'
      : 'EAC grid connection terms priced separately (case-by-case)',
    total: params.rtbCost + pvEpc + bessEpc + connectionTerms,
  }
}

/**
 * Compute 100% equity finance block (no debt).
 * All-equity model: investor supplies full CAPEX. Returns are unlevered.
 * irrIndicative should be set per-project based on scale/risk profile.
 */
export function computeFinance(
  capex: RtbDealCapex,
  grossRevY1: number,
  irrIndicative = '~12–15%',
): RtbDealFinance {
  return {
    grossEnergyRevenueY1EUR: grossRevY1,
    aggregatorFeePct: PV_DEFAULTS.aggregatorFeePct,
    citPct: PV_DEFAULTS.citPct,
    seniorDebtEUR: 0,          // 100% equity — no debt
    equityEUR: capex.total,    // investor supplies full CAPEX
    loanNominalRate: 0,
    loanTermYears: 0,
    leveredEquityIrrIndicative: irrIndicative,
  }
}

/** Compute standard Y1 OPEX */
export function computeOpex(params: {
  solarMWp: number
  bessCapacityMWh: number
  capexTotal: number
  landLeasePerYear: number
  /** Override portfolio default (€15k/MW/yr) per park */
  pvOmPerMWPerYear?: number
}): RtbDealOpex {
  const pvOmRate = params.pvOmPerMWPerYear ?? PV_DEFAULTS.omPerMWPerYear
  return {
    pvOm: Math.round(params.solarMWp * pvOmRate),
    bessOm: Math.round(params.bessCapacityMWh * BESS_DEFAULTS.omPerMWhPerYear),
    landLease: params.landLeasePerYear,
    other: Math.round(params.capexTotal * 0.005) + 15_000, // insurance 0.5% CAPEX + admin
  }
}
