/**
 * Public generic PV + 4h BESS stack (solarfarms.cy teasers, calculators, 1/5/10 MW pack).
 *
 * Named RTB deals (Agios, Shia, Galascope, Ragelia) keep their own files — do not
 * retune those from this module.
 *
 * Client-facing copy must use public EPC / O&M / LTSA rates only.
 * Self-cost fields are internal reference and must not appear on teasers.
 */

import { CYPRUS_TSOC_DAM_SAMPLE } from './market/cyprus-tsoc-dam-sample'

export const PUBLIC_HYBRID = {
  yieldFixedKwhKwp: 1800,
  yieldTrackerKwhKwp: 2200,

  pvEpcSelfFixedPerMW: 500_000,
  pvEpcSelfTrackerPerMW: 650_000,
  publicEpcMarkup: 0.2,
  pvEpcPublicFixedPerMW: 600_000,
  pvEpcPublicTrackerPerMW: 780_000,

  rtbPerMW: 450_000,
  connectionPerMW: 150_000,

  bessHours: 4,
  bessPublicPerMWh: 125_000,

  pvOmPerMW: 9_000,
  bessLtsaPerMWh: 2_200,

  curtailmentPct: 0.5,
  capturePct: 0.95,
  rte: 0.8632,
  fullCycleDays: 280,

  aggregatorPct: 0.1,
  citPct: 0.15,
  insPct: 0.005,
  scadaPa: 5_000,
  adminPa: 10_000,
  landLeaseByMw: { 1: 8_000, 5: 25_000, 10: 45_000 } as const,

  daEpcYears: 20,
  daDevYears: 15,
  horizonYears: 20,
  pvDegradation: 0.005,
  bessDegradation: 0.025,
  npvDiscount: 0.08,

  damDayEURPerMWh: CYPRUS_TSOC_DAM_SAMPLE.daytime06001700EURPerMWh,
  damEveningEURPerMWh: CYPRUS_TSOC_DAM_SAMPLE.peakEveningEURPerMWh,
} as const

export type PublicHybridTech = 'fixed' | 'tracker'
export type PublicHybridMw = 1 | 5 | 10

export function publicYieldKwhKwp(tech: PublicHybridTech): number {
  return tech === 'fixed'
    ? PUBLIC_HYBRID.yieldFixedKwhKwp
    : PUBLIC_HYBRID.yieldTrackerKwhKwp
}

export function publicPvEpcPerMW(tech: PublicHybridTech): number {
  return tech === 'fixed'
    ? PUBLIC_HYBRID.pvEpcPublicFixedPerMW
    : PUBLIC_HYBRID.pvEpcPublicTrackerPerMW
}

export function publicPvSidePerMW(tech: PublicHybridTech): number {
  return (
    publicPvEpcPerMW(tech) +
    PUBLIC_HYBRID.rtbPerMW +
    PUBLIC_HYBRID.connectionPerMW
  )
}

export function publicBessPerMW(): number {
  return PUBLIC_HYBRID.bessHours * PUBLIC_HYBRID.bessPublicPerMWh
}

export function publicAllInPerMW(tech: PublicHybridTech): number {
  return publicPvSidePerMW(tech) + publicBessPerMW()
}

export interface PublicHybridCase {
  tech: PublicHybridTech
  mw: number
  mwh: number
  yieldKwhKwp: number
  pvEpc: number
  bessEpc: number
  rtb: number
  connection: number
  capex: number
  annualMwh: number
  uncurtailedMwh: number
  dischargedMwh: number
  solarRev: number
  bessRev: number
  gross: number
  netRev: number
  pvOm: number
  bessOm: number
  opex: number
  ebitda: number
  da: number
  tax: number
  fcf: number
  cashYield: number
  simplePayback: number | null
  irr20: number | null
  npv8: number
}

function annuityNpv(cashflows: number[], rate: number): number {
  return cashflows.reduce((sum, cf, t) => sum + cf / (1 + rate) ** t, 0)
}

function irrNewton(cashflows: number[], guess = 0.1): number | null {
  let r = guess
  for (let i = 0; i < 100; i++) {
    let npv = 0
    let deriv = 0
    for (let t = 0; t < cashflows.length; t++) {
      npv += cashflows[t] / (1 + r) ** t
      if (t) deriv -= (t * cashflows[t]) / (1 + r) ** (t + 1)
    }
    if (Math.abs(deriv) < 1e-12) return null
    const next = r - npv / deriv
    if (Math.abs(next - r) < 1e-8) {
      return next > -0.99 && next < 5 ? next : null
    }
    r = next
  }
  return null
}

export function publicHybridCase(
  mw: PublicHybridMw,
  tech: PublicHybridTech
): PublicHybridCase {
  const h = PUBLIC_HYBRID
  const mwh = mw * h.bessHours
  const yieldKwhKwp = publicYieldKwhKwp(tech)
  const pvEpc = mw * publicPvEpcPerMW(tech)
  const bessEpc = mwh * h.bessPublicPerMWh
  const rtb = mw * h.rtbPerMW
  const connection = mw * h.connectionPerMW
  const capex = pvEpc + bessEpc + rtb + connection

  const annualMwh = mw * yieldKwhKwp
  const uncurtailedMwh = annualMwh * (1 - h.curtailmentPct)
  const curtailedMwh = annualMwh * h.curtailmentPct
  const charged = Math.min(curtailedMwh * h.capturePct, mwh * h.fullCycleDays)
  const dischargedMwh = charged * h.rte

  const solarRev = uncurtailedMwh * h.damDayEURPerMWh
  const bessRev = dischargedMwh * h.damEveningEURPerMWh
  const gross = solarRev + bessRev
  const netRev = gross * (1 - h.aggregatorPct)

  const land = h.landLeaseByMw[mw]
  const pvOm = mw * h.pvOmPerMW
  const bessOm = mwh * h.bessLtsaPerMWh
  const insurance = capex * h.insPct
  const opex = pvOm + bessOm + h.scadaPa + h.adminPa + land + insurance
  const ebitda = netRev - opex

  const da =
    (pvEpc + bessEpc) / h.daEpcYears + (rtb + connection) / h.daDevYears
  const tax = Math.max(0, ebitda - da) * h.citPct
  const fcf = ebitda - tax
  const cashYield = capex > 0 ? fcf / capex : 0
  const simplePayback = fcf > 0 ? capex / fcf : null

  const cashflows = [-capex]
  for (let y = 1; y <= h.horizonYears; y++) {
    const degPv = (1 - h.pvDegradation) ** (y - 1)
    const degB = (1 - h.bessDegradation) ** (y - 1)
    const g = solarRev * degPv + bessRev * Math.min(degPv, degB)
    const n = g * (1 - h.aggregatorPct)
    const e = n - opex
    const taxY = Math.max(0, e - da) * h.citPct
    cashflows.push(e - taxY)
  }

  return {
    tech,
    mw,
    mwh,
    yieldKwhKwp,
    pvEpc,
    bessEpc,
    rtb,
    connection,
    capex,
    annualMwh,
    uncurtailedMwh,
    dischargedMwh,
    solarRev,
    bessRev,
    gross,
    netRev,
    pvOm,
    bessOm,
    opex,
    ebitda,
    da,
    tax,
    fcf,
    cashYield,
    simplePayback,
    irr20: irrNewton(cashflows),
    npv8: annuityNpv(cashflows, h.npvDiscount),
  }
}

function roundEur(n: number): number {
  return Math.round(n)
}

function investmentSize(mw: PublicHybridMw) {
  const fixed = publicHybridCase(mw, 'fixed')
  const tracker = publicHybridCase(mw, 'tracker')
  return {
    minInvestment: roundEur(fixed.capex),
    maxInvestment: roundEur(tracker.capex),
    pvOnlyCost: roundEur(fixed.pvEpc),
    bessCost: roundEur(fixed.bessEpc),
    rtbCost: roundEur(fixed.rtb),
    connectionCost: roundEur(fixed.connection),
    minRevenue: roundEur(fixed.gross),
    maxRevenue: roundEur(tracker.gross),
    minROI: Math.round(fixed.cashYield * 1000) / 10,
    maxROI: Math.round(tracker.cashYield * 1000) / 10,
    minPayback: Math.round(Math.min(fixed.simplePayback ?? 99, tracker.simplePayback ?? 99) * 10) / 10,
    maxPayback: Math.round(Math.max(fixed.simplePayback ?? 99, tracker.simplePayback ?? 99) * 10) / 10,
    minNPV: roundEur(Math.min(fixed.npv8, tracker.npv8)),
    maxNPV: roundEur(Math.max(fixed.npv8, tracker.npv8)),
    financingCap: 500_000 * mw,
    bessFinancingPct: 70,
  } as const
}

export const PUBLIC_INVESTMENT_SIZES = {
  '1MW': investmentSize(1),
  '5MW': investmentSize(5),
  '10MW': investmentSize(10),
} as const
