/**
 * Cyprus TSOC day-ahead market — reconciled sample statistics (single source).
 * Used by: Agios RTB deal (`marketDAM`), Cyprus market one-page teaser, /market copy where aligned.
 *
 * Source window matches `lib/constants.ts` CYPRUS_MARKET_DEFAULTS comments and TSOC MMS reports.
 */

export const CYPRUS_TSOC_DAM_SAMPLE = {
  avgEURPerMWh: 158.19,
  peakEveningEURPerMWh: 182.99,
  middayEURPerMWh: 101.13,
  peakMiddaySpreadEURPerMWh: 81.86,
  /** Daytime 06:00–17:00 average MCP */
  daytime06001700EURPerMWh: 140.88,
  tradingDays: 134,
  halfHourlyPrints: 6432,
  dateFromLabel: '1 Oct 2025',
  dateToLabel: '11 Feb 2026',
  daysWithZeroMiddayPrints: 57,
  daysWithPositivePeakMiddaySpread: 134,
  sourceUrl: 'https://tsoc.org.cy/competitive-electricity-market/mms-reports/',
  sampleNote:
    '134 TSOC day-ahead days (1 Oct 2025 – 11 Feb 2026), 6,432 half-hourly prints',
  _meta: {
    source: 'TSOC competitive market / DAM activity reports (compiled sample)',
    date: '2026-03-31',
  },
} as const

export type CyprusTsocDamSample = typeof CYPRUS_TSOC_DAM_SAMPLE

/** Rounded €/MWh for compact teaser metric tiles */
export function damEurMwhRounded(n: number): number {
  return Math.round(n)
}
