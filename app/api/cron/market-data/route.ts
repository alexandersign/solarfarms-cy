/**
 * Market Data status API (automated fetch disabled).
 *
 * GET /api/cron/market-data — returns TSOC data freshness from market-data.json.
 * Scheduled Vercel cron and GitHub Actions daily fetch are off (Cloudflare blocks CI).
 *
 * Refresh locally: npm run market:fetch && npm run market:parse, then commit
 * market/data/market-data.json. Optional CI: workflow_dispatch + SCRAPINGBEE_API_KEY.
 */

import { NextRequest, NextResponse } from 'next/server'
import { hasMarketData, getMarketDataSummary } from '@/lib/market-data'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const isAuthorized = authHeader === `Bearer ${process.env.CRON_SECRET}`

  // ── Data freshness check ──────────────────────────────────────
  const dataAvailable = hasMarketData()
  let lastUpdated: string | null = null
  let latestDataDate: string | null = null
  let dataAge: string | null = null

  if (dataAvailable) {
    const summary = getMarketDataSummary()
    if (summary) {
      lastUpdated = summary.lastUpdated
      latestDataDate = summary.dateRange.end

      // Calculate age
      const lastDate = new Date(summary.dateRange.end)
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      dataAge = `${diffDays} day${diffDays !== 1 ? 's' : ''} old`
    }
  }

  const status = {
    dataAvailable,
    lastUpdated,
    latestDataDate,
    dataAge,
    timestamp: new Date().toISOString(),
  }

  const refreshInstructions =
    'Automated fetch is disabled. Run locally: npm run market:fetch && npm run market:parse, then commit market/data/market-data.json. Or trigger GitHub workflow "Fetch TSOC Market Data" manually with SCRAPINGBEE_API_KEY set.'

  return NextResponse.json({
    ...status,
    success: true,
    automatedFetchEnabled: false,
    triggered: false,
    message: isAuthorized
      ? refreshInstructions
      : `Data freshness status. ${refreshInstructions}`,
  })
}
