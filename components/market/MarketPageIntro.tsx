import type { ReactNode } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Battery,
  Zap,
  ExternalLink,
  Download,
  BarChart3,
} from 'lucide-react'
import type { MarketDataSummary } from '@/lib/market-data'
import { TSOC_DAM_REPORTS_URL } from '@/lib/tsoc-market-fetch'

function formatDisplayDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function daysSince(isoDate: string): number {
  const end = new Date(isoDate.includes('T') ? isoDate : `${isoDate}T12:00:00`)
  const now = new Date()
  return Math.floor((now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24))
}

interface MarketPageIntroProps {
  summary: MarketDataSummary | null
}

export function MarketPageIntro({ summary }: MarketPageIntroProps) {
  const hasData = !!summary
  const overall = summary?.statistics?.overall
  const start = summary?.dateRange?.start ?? '2025-10-01'
  const end = summary?.dateRange?.end ?? ''
  const totalFiles = summary?.totalFiles ?? 0
  const totalRecords = summary?.totalRecords ?? 0
  const staleDays = end ? daysSince(end) : 999
  const isStale = hasData && staleDays > 3

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-green-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-cyprus-100 text-cyprus-700 hover:bg-cyprus-200">
              <BarChart3 className="w-3.5 h-3.5 mr-1" />
              Cyprus Energy Market Intelligence
            </Badge>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Cyprus Day-Ahead
              <span className="block gradient-text mt-1">Electricity Market Data</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {hasData ? (
                <>
                  Real pricing analytics from the Cyprus Transmission System Operator (TSOC), sourced from{' '}
                  <strong>{totalFiles} official TSOC DAM reports (REP_MO-003)</strong> spanning{' '}
                  {formatDisplayDate(start)} &ndash; {formatDisplayDate(end)} (
                  {totalRecords.toLocaleString()} hourly records). Track market clearing prices, identify
                  BESS arbitrage opportunities, and understand how the competitive market is shaping energy
                  investment.
                </>
              ) : (
                <>
                  Live Cyprus day-ahead electricity market pricing from TSOC. Data is updated daily from
                  official MMS reports once the fetch pipeline has run.
                </>
              )}
            </p>

            {hasData && overall && (
              <p className="text-sm text-gray-500 mb-6 max-w-xl mx-auto">
                Portfolio average MCP: <strong>€{overall.avgPrice.toFixed(2)}/MWh</strong> &middot; Solar hours
                (06&ndash;17): <strong>€{overall.solarHoursAvg.toFixed(2)}/MWh</strong> &middot; Evening peak
                (17&ndash;21): <strong>€{overall.peakHoursAvg.toFixed(2)}/MWh</strong>
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4">
              <FeaturePill icon={<Zap className="w-4 h-4 text-solar-500" />} label="Hourly Price Data" />
              <FeaturePill icon={<Battery className="w-4 h-4 text-green-500" />} label="BESS Revenue Analysis" />
              <FeaturePill icon={<TrendingUp className="w-4 h-4 text-cyprus-500" />} label="Market Trends" />
            </div>
          </div>
        </div>
      </section>

      {isStale && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container py-3">
            <p className="text-sm text-amber-800 text-center">
              <strong>Data may be outdated.</strong> Latest TSOC report in our dataset:{' '}
              {formatDisplayDate(end)} ({staleDays} days ago). Daily sync runs via GitHub Actions — charts
              below reflect the last successful import.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

function FeaturePill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
      {icon}
      <span>{label}</span>
    </div>
  )
}

export function MarketPageFooter({ summary }: { summary: MarketDataSummary | null }) {
  const hasData = !!summary
  const overall = summary?.statistics?.overall
  const start = summary?.dateRange?.start ?? '2025-10-01'
  const end = summary?.dateRange?.end ?? ''
  const totalFiles = summary?.totalFiles ?? 0
  const totalRecords = summary?.totalRecords ?? 0
  const lastUpdated = summary?.lastUpdated ? formatDisplayDate(summary.lastUpdated) : '—'

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-cyprus-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyprus-600" />
                About This Data
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  The Cyprus competitive electricity market launched on <strong>October 1, 2025</strong>,
                  operated by TSOC following the EU Target Model. Reports are published as{' '}
                  <strong>REP_MO-003</strong> Excel files on TSOC&apos;s MMS portal.
                </p>
                {hasData && overall ? (
                  <p>
                    This dashboard covers <strong>{totalFiles} daily reports</strong> (
                    {formatDisplayDate(start)} &ndash; {formatDisplayDate(end)}),{' '}
                    <strong>{totalRecords.toLocaleString()}</strong> hourly records. Average MCP:{' '}
                    <strong>€{overall.avgPrice.toFixed(2)}/MWh</strong>; solar hours{' '}
                    <strong>€{overall.solarHoursAvg.toFixed(2)}/MWh</strong>; evening peak{' '}
                    <strong>€{overall.peakHoursAvg.toFixed(2)}/MWh</strong>.
                  </p>
                ) : null}
                <p>
                  Important: as of 2026, <strong>BESS cannot yet buy from the DAM</strong> in Cyprus.
                  Current BESS revenue is primarily from <strong>curtailment recovery</strong>.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={TSOC_DAM_REPORTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-cyprus-600 hover:text-cyprus-700 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Raw Reports on TSOC
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5 text-green-600" />
                BESS Investment Opportunity
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  BESS revenue in Cyprus today comes from <strong>curtailment recovery</strong> — charging
                  when solar is curtailed and discharging at evening peak prices.
                </p>
                {hasData && overall ? (
                  <p>
                    Evening peak (17&ndash;21) averages <strong>€{overall.peakHoursAvg.toFixed(2)}/MWh</strong>{' '}
                    vs solar hours <strong>€{overall.solarHoursAvg.toFixed(2)}/MWh</strong> —{' '}
                    <strong>€{overall.arbitrageSpread.toFixed(2)}/MWh</strong> indicative spread for future
                    DAM participation.
                  </p>
                ) : null}
              </div>
              <div className="mt-4 pt-4 border-t border-green-100 flex flex-col sm:flex-row gap-3">
                <Button variant="gradient" size="sm" asChild>
                  <Link href="/energy-storage/calculator">
                    <Battery className="w-4 h-4 mr-2" />
                    BESS Calculator
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/energy-storage">Learn About BESS</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-4 text-xs text-gray-500 border border-gray-100">
            <p className="font-medium text-gray-700 mb-2 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Data Pipeline
            </p>
            <p>
              {hasData ? (
                <>
                  {totalFiles} TSOC REP_MO-003 files ({formatDisplayDate(start)} &ndash;{' '}
                  {formatDisplayDate(end)}), {totalRecords.toLocaleString()} records. Last import:{' '}
                  <strong>{lastUpdated}</strong>.
                </>
              ) : (
                <>
                  Run <code className="bg-gray-200 px-1 rounded">npm run market:fetch</code> then{' '}
                  <code className="bg-gray-200 px-1 rounded">npm run market:parse</code> to refresh.
                </>
              )}{' '}
              Raw: <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/excel/</code> · JSON:{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/data/market-data.json</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
