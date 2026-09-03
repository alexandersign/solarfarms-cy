/**
 * Cyprus TSOC day-ahead market — reconciled sample statistics (single source).
 * Used by: marketing pages, blogs, CRM talk-tracks, /market copy where aligned.
 *
 * Deal underwriting rates (e.g. Agios revenueModel.bessDischargeRateEURPerMWh)
 * are frozen separately — do not silently retune investor models from this file.
 *
 * Dataset: market/data/market-data.json (339 TSOC DAM reports, Oct 2025 – 4 Sep 2026).
 * Fetch is not daily in CI (Cloudflare); run `npm run market:fetch` locally to extend.
 */

export const CYPRUS_TSOC_DAM_SAMPLE = {
  avgEURPerMWh: 200.23,
  peakEveningEURPerMWh: 212.42,
  middayEURPerMWh: 104.55,
  peakMiddaySpreadEURPerMWh: 107.88,
  /** Daytime 06:00–17:00 average MCP */
  daytime06001700EURPerMWh: 151.38,
  /** Peak × 86.32% AC-AC RTE — curtailment-recovery value per MWh discharged */
  curtailmentRecoveryEURPerMWh: 183.4,
  tradingDays: 339,
  halfHourlyPrints: 62670,
  dateFromLabel: '1 Oct 2025',
  dateToLabel: '4 Sep 2026',
  daysWithZeroMiddayPrints: 166,
  daysWithPositivePeakMiddaySpread: 339,
  sourceUrl:
    'https://tsoc.org.cy/competitive-electricity-market/mms-reports/day-ahead-market-daily-activity-reports-en/',
  sampleNote:
    '339 TSOC day-ahead days (1 Oct 2025 – 4 Sep 2026), 62,670 half-hourly prints',
  seasonalNote:
    'Shoulder months (Apr–May) show deep midday zeros; July–early September 2026 midday is often €200+ and the duck curve can flatten to a ~€15–40 spread.',
  _meta: {
    source: 'TSOC competitive market / DAM activity reports (compiled sample)',
    date: '2026-09-03',
  },
} as const

export type CyprusTsocDamSample = typeof CYPRUS_TSOC_DAM_SAMPLE

/** Rounded €/MWh for compact teaser metric tiles */
export function damEurMwhRounded(n: number): number {
  return Math.round(n)
}

export function damEurMwhLabel(n: number): string {
  return `€${Math.round(n)}`
}
