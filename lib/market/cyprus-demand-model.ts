/**
 * Cyprus grid demand & BESS market saturation model (SSOT).
 *
 * Combines TSOC DAM daily energy, island load-shape profile, must-run thermal,
 * and CERA-licensed BESS capacity to estimate addressable storage market.
 */

import * as fs from 'fs'
import * as path from 'path'
import { PORTFOLIO } from '../portfolio-data'

// ─── Grid anchors ───────────────────────────────────────────────────────────

export const CYPRUS_GRID = {
  peakDemandMW: 1500,
  mustRunThermalMW: 240,
  tsoBessMW: 120,
  tsoBessMWh: 400,
  _meta: {
    peakDemandMW: { source: 'TSOC / Lighthief market analysis', date: '2026-05-29' },
    mustRunThermalMW: { source: 'MSGL must-run 210–250 MW; model uses 240 MW', date: '2026-05-29' },
    tsoBess: { source: 'CERA TSOC BESS approval June 2025', date: '2026-05-29' },
  },
} as const

/** Hours when utility-scale solar is negligible (18:00–09:00). */
export const NON_SOLAR_HOURS = [18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export const EVENING_HOURS = [17, 18, 19, 20, 21] as const

export const NIGHT_HOURS = [0, 1, 2, 3, 4, 5] as const

/**
 * Fraction of peak load by hour — typical Cyprus island profile.
 * Scaled to match daily non-solar energy from DAM data.
 */
export const LOAD_SHAPE_PEAK_FRACTION: Record<number, number> = {
  0: 0.62,
  1: 0.6,
  2: 0.59,
  3: 0.58,
  4: 0.59,
  5: 0.61,
  6: 0.68,
  7: 0.75,
  8: 0.82,
  9: 0.88,
  10: 0.85,
  11: 0.83,
  12: 0.8,
  13: 0.82,
  14: 0.85,
  15: 0.88,
  16: 0.92,
  17: 0.95,
  18: 0.93,
  19: 0.97,
  20: 1.0,
  21: 0.96,
  22: 0.88,
  23: 0.78,
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ProcessedDaySummary {
  date: string
  total_volume_mwh: number
  solar_volume_mwh: number
}

export interface BessCapacityTotals {
  licensedBessMW: number
  licensedBessMWh: number
  operationalPvMW: number
  licensedPvMW: number
  plantCount: number
}

export interface HourlyDemandEstimate {
  hour: number
  demandMW: number
}

export interface DemandWindowResult {
  hours: readonly number[]
  totalDemandMWh: number
  mustRunMWh: number
  addressableMWh: number
  hourly: HourlyDemandEstimate[]
}

export interface BessSaturationResult {
  computedAt: string
  inputs: {
    avgDailyMWh: number
    avgSolarMWh: number
    avgNonSolarMWh: number
    peakDemandMW: number
    mustRunMW: number
    processedSummaryDays: number
  }
  windows: {
    nonSolar16h: DemandWindowResult
    evening17to21: DemandWindowResult
    night00to05: DemandWindowResult
  }
  bessPools: {
    ceraLicensedMWh: number
    ceraLicensedMW: number
    tsoMWh: number
    totalLicensedPlusTsoMWh: number
    lighthiefPipelineMWh: number
  }
  saturation: {
    /** Licensed BESS MWh / 16h addressable MWh */
    licensedVs16hAddressablePct: number
    licensedPlusTsoVs16hAddressablePct: number
    lighthiefVs16hAddressablePct: number
    licensedVsEveningAddressablePct: number
    gapMWhToSaturate16h: number
  }
  _meta: {
    source: string
    date: string
    note: string
  }
}

// ─── Data loaders ───────────────────────────────────────────────────────────

const PROCESSED_SUMMARIES = path.join(
  process.cwd(),
  'market',
  'data',
  'processed-summaries.json'
)
const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')

export function loadProcessedSummaries(): ProcessedDaySummary[] {
  if (!fs.existsSync(PROCESSED_SUMMARIES)) return []
  const raw = JSON.parse(fs.readFileSync(PROCESSED_SUMMARIES, 'utf8')) as ProcessedDaySummary[]
  return Array.isArray(raw) ? raw : []
}

export function loadBessCapacityTotals(): BessCapacityTotals {
  if (!fs.existsSync(PLANTS_JSON)) {
    return {
      licensedBessMW: 0,
      licensedBessMWh: 0,
      operationalPvMW: 0,
      licensedPvMW: 0,
      plantCount: 0,
    }
  }
  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf8')) as {
    plants: Array<{
      pv_kw: number
      bess_kw: number
      bess_kwh: number
      license_status: string
    }>
  }
  let licensedBessMW = 0
  let licensedBessMWh = 0
  let operationalPvMW = 0
  let licensedPvMW = 0
  for (const p of data.plants) {
    licensedPvMW += (p.pv_kw || 0) / 1000
    licensedBessMW += (p.bess_kw || 0) / 1000
    licensedBessMWh += (p.bess_kwh || 0) / 1000
    if (p.license_status === 'operational') {
      operationalPvMW += (p.pv_kw || 0) / 1000
    }
  }
  return {
    licensedBessMW: round(licensedBessMW, 2),
    licensedBessMWh: round(licensedBessMWh, 1),
    operationalPvMW: round(operationalPvMW, 1),
    licensedPvMW: round(licensedPvMW, 1),
    plantCount: data.plants.length,
  }
}

// ─── Model ──────────────────────────────────────────────────────────────────

function round(n: number, d = 0): number {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function avg(nums: number[]): number {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

/**
 * Scale load-shape fractions to a target energy total (MWh) over given hours.
 */
export function estimateHourlyDemand(
  hours: readonly number[],
  totalEnergyMWh: number,
  peakMW: number = CYPRUS_GRID.peakDemandMW
): HourlyDemandEstimate[] {
  const fracs = hours.map((h) => LOAD_SHAPE_PEAK_FRACTION[h] ?? 0.7)
  const rawSum = fracs.reduce((s, f) => s + f * peakMW, 0)
  const scale = rawSum > 0 ? totalEnergyMWh / rawSum : 0
  return hours.map((h, i) => ({
    hour: h,
    demandMW: round(fracs[i] * peakMW * scale, 1),
  }))
}

/** Build 24h demand profile (MWh per hour) scaled to daily DAM energy. */
export function buildDailyDemandProfile(
  dailyEnergyMWh: number,
  peakMW: number = CYPRUS_GRID.peakDemandMW
): HourlyDemandEstimate[] {
  const hours = Array.from({ length: 24 }, (_, h) => h)
  return estimateHourlyDemand(hours, dailyEnergyMWh, peakMW)
}

export function computeDemandWindow(
  hours: readonly number[],
  hourlyProfile: HourlyDemandEstimate[],
  mustRunMW: number = CYPRUS_GRID.mustRunThermalMW
): DemandWindowResult {
  const hourSet = new Set(hours)
  const hourly = hourlyProfile.filter((h) => hourSet.has(h.hour))
  const totalDemandMWh = round(hourly.reduce((s, x) => s + x.demandMW, 0), 0)
  const mustRunMWh = round(mustRunMW * hours.length, 0)
  const addressableMWh = round(Math.max(0, totalDemandMWh - mustRunMWh), 0)
  return { hours, totalDemandMWh, mustRunMWh, addressableMWh, hourly }
}

/** Scale load shape to a target MWh total over the given hours (used for 16h non-solar window). */
export function computeDemandWindowFromEnergy(
  hours: readonly number[],
  totalEnergyMWh: number,
  mustRunMW: number = CYPRUS_GRID.mustRunThermalMW,
  peakMW: number = CYPRUS_GRID.peakDemandMW
): DemandWindowResult {
  const hourly = estimateHourlyDemand(hours, totalEnergyMWh, peakMW)
  const totalDemandMWh = round(hourly.reduce((s, x) => s + x.demandMW, 0), 0)
  const mustRunMWh = round(mustRunMW * hours.length, 0)
  const addressableMWh = round(Math.max(0, totalDemandMWh - mustRunMWh), 0)
  return { hours, totalDemandMWh, mustRunMWh, addressableMWh, hourly }
}

export interface SaturationOptions {
  lighthiefPipelineMWh?: number
  mustRunMW?: number
  peakDemandMW?: number
}

export function computeBessSaturation(options: SaturationOptions = {}): BessSaturationResult {
  const summaries = loadProcessedSummaries()
  const bess = loadBessCapacityTotals()
  const mustRunMW = options.mustRunMW ?? CYPRUS_GRID.mustRunThermalMW
  const peakMW = options.peakDemandMW ?? CYPRUS_GRID.peakDemandMW
  const lighthiefPipelineMWh = options.lighthiefPipelineMWh ?? PORTFOLIO.mwh

  const dailyTotals = summaries.map((s) => s.total_volume_mwh)
  const solarTotals = summaries.map((s) => s.solar_volume_mwh)
  const avgDailyMWh = avg(dailyTotals) || 7259.2
  const avgSolarMWh = avg(solarTotals) || 635.1
  const avgNonSolarMWh = avgDailyMWh - avgSolarMWh

  const dailyProfile = buildDailyDemandProfile(avgDailyMWh, peakMW)
  const nonSolar16h = computeDemandWindowFromEnergy(
    NON_SOLAR_HOURS,
    avgNonSolarMWh,
    mustRunMW,
    peakMW
  )
  const evening17to21 = computeDemandWindow(EVENING_HOURS, dailyProfile, mustRunMW)
  const night00to05 = computeDemandWindow(NIGHT_HOURS, dailyProfile, mustRunMW)

  const totalLicensedPlusTsoMWh = bess.licensedBessMWh + CYPRUS_GRID.tsoBessMWh
  const addr16 = nonSolar16h.addressableMWh || 1
  const addrEve = evening17to21.addressableMWh || 1

  return {
    computedAt: new Date().toISOString(),
    inputs: {
      avgDailyMWh: round(avgDailyMWh, 1),
      avgSolarMWh: round(avgSolarMWh, 1),
      avgNonSolarMWh: round(avgNonSolarMWh, 1),
      peakDemandMW: peakMW,
      mustRunMW,
      processedSummaryDays: summaries.length,
    },
    windows: {
      nonSolar16h,
      evening17to21,
      night00to05,
    },
    bessPools: {
      ceraLicensedMWh: bess.licensedBessMWh,
      ceraLicensedMW: bess.licensedBessMW,
      tsoMWh: CYPRUS_GRID.tsoBessMWh,
      totalLicensedPlusTsoMWh: round(totalLicensedPlusTsoMWh, 1),
      lighthiefPipelineMWh,
    },
    saturation: {
      licensedVs16hAddressablePct: round((bess.licensedBessMWh / addr16) * 100, 1),
      licensedPlusTsoVs16hAddressablePct: round((totalLicensedPlusTsoMWh / addr16) * 100, 1),
      lighthiefVs16hAddressablePct: round((lighthiefPipelineMWh / addr16) * 100, 1),
      licensedVsEveningAddressablePct: round((bess.licensedBessMWh / addrEve) * 100, 1),
      gapMWhToSaturate16h: round(Math.max(0, addr16 - totalLicensedPlusTsoMWh), 0),
    },
    _meta: {
      source:
        'market/data/processed-summaries.json + marketing/cyprus-energy-plants.json + TSOC peak demand',
      date: '2026-05-29',
      note:
        'Hourly MW demand is modeled via load-shape scaling; DAM files provide daily MWh totals only until volume parser is re-run on Excel sources.',
    },
  }
}
