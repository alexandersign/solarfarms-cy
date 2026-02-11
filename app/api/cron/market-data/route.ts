/**
 * Market Data Cron API Route
 * 
 * Vercel cron job that runs daily to trigger the GitHub Actions workflow
 * for fetching fresh TSOC market data. Also provides data freshness status.
 * 
 * GET /api/cron/market-data
 *   - When called by Vercel Cron (with CRON_SECRET): triggers GitHub Action
 *   - When called manually: returns data freshness status
 * 
 * Required env vars:
 *   CRON_SECRET       - Vercel cron authorization secret
 *   GITHUB_TOKEN      - Personal Access Token with 'repo' + 'actions' scopes
 *   GITHUB_OWNER      - GitHub username/org (e.g. 'your-username')
 *   GITHUB_REPO       - Repository name (e.g. 'solinvest')
 */

import { NextRequest, NextResponse } from 'next/server'
import { hasMarketData, getMarketDataSummary } from '@/lib/market-data'

const WORKFLOW_FILE = 'fetch-market-data.yml'

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

  // ── If not authorized (manual call), just return status ───────
  if (!isAuthorized) {
    return NextResponse.json({
      ...status,
      message: 'Data freshness status (authenticate with CRON_SECRET to trigger update)',
    })
  }

  // ── Trigger GitHub Action ─────────────────────────────────────
  const githubToken = process.env.GITHUB_TOKEN
  const githubOwner = process.env.GITHUB_OWNER
  const githubRepo = process.env.GITHUB_REPO

  if (!githubToken || !githubOwner || !githubRepo) {
    return NextResponse.json({
      ...status,
      success: false,
      message: 'GitHub configuration missing. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO env vars.',
      missing: {
        GITHUB_TOKEN: !githubToken,
        GITHUB_OWNER: !githubOwner,
        GITHUB_REPO: !githubRepo,
      }
    }, { status: 500 })
  }

  try {
    // Check if data is already fresh (updated today)
    if (latestDataDate) {
      const today = new Date().toISOString().slice(0, 10)
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      if (latestDataDate >= yesterday) {
        return NextResponse.json({
          ...status,
          success: true,
          message: `Data is fresh (${dataAge}), skipping update`,
          triggered: false,
        })
      }
    }

    // Trigger the GitHub Action workflow
    const dispatchUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/actions/workflows/${WORKFLOW_FILE}/dispatches`

    const response = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({ ref: 'main' }),
    })

    if (response.status === 204) {
      return NextResponse.json({
        ...status,
        success: true,
        message: 'GitHub Action triggered successfully. Data will update in ~5-10 minutes.',
        triggered: true,
      })
    }

    // Handle errors
    const errorText = await response.text().catch(() => 'Unknown error')
    return NextResponse.json({
      ...status,
      success: false,
      message: `GitHub API returned ${response.status}`,
      details: errorText,
      triggered: false,
    }, { status: 502 })

  } catch (err) {
    return NextResponse.json({
      ...status,
      success: false,
      message: `Error triggering GitHub Action: ${(err as Error).message}`,
      triggered: false,
    }, { status: 500 })
  }
}
