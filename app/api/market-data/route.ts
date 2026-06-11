/**
 * Market Data API Route
 * 
 * GET /api/market-data
 *   Query params:
 *     - view: 'summary' | 'daily' | 'hourly' | 'records' | 'latest' | 'bess' | 'saturation'
 *     - date: specific date (YYYY-MM-DD)
 *     - startDate: range start
 *     - endDate: range end
 *     - days: number of recent days
 */

import { NextResponse } from 'next/server'
import {
  hasMarketData,
  getMarketDataSummary,
  getMarketDataFull,
  getRecordsByDate,
  getRecordsByDateRange,
  getLatestDayRecords,
  getDailyStatsLastNDays,
  calculateBESSArbitrage,
  generateDemoData,
  getBessSaturation,
} from '@/lib/market-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const view = searchParams.get('view') || 'summary'
    const date = searchParams.get('date')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const days = searchParams.get('days')
    const demo = searchParams.get('demo')
    
    // Check if we have real data, fall back to demo
    const useDemo = demo === 'true' || !hasMarketData()
    
    if (useDemo) {
      const demoData = generateDemoData()
      // eslint-disable-next-line no-unused-vars
      const { records, ...summary } = demoData
      
      switch (view) {
        case 'summary':
          return NextResponse.json({
            ...summary,
            isDemo: true,
            message: 'Showing demo data. Run the download script to get real TSOC data.',
          })
        
        case 'latest': {
          const latestDate = demoData.dateRange.end
          const latestRecords = demoData.records.filter(r => r.date === latestDate)
          return NextResponse.json({
            date: latestDate,
            records: latestRecords,
            isDemo: true,
          })
        }
        
        case 'hourly':
          return NextResponse.json({
            hourlyAvg: demoData.statistics.hourlyAvg,
            isDemo: true,
          })
        
        case 'daily': {
          const n = days ? parseInt(days, 10) : 30
          return NextResponse.json({
            daily: demoData.statistics.daily.slice(-n),
            isDemo: true,
          })
        }
        
        case 'bess':
          return NextResponse.json({
            bess: calculateBESSArbitrage(demoData),
            overall: demoData.statistics.overall,
            isDemo: true,
          })

        case 'saturation': {
          const saturation = getBessSaturation()
          return NextResponse.json({ saturation, isDemo: true })
        }
        
        case 'records': {
          if (date) {
            return NextResponse.json({
              date,
              records: demoData.records.filter(r => r.date === date),
              isDemo: true,
            })
          }
          const n2 = days ? parseInt(days, 10) : 7
          const cutoff = new Date()
          cutoff.setDate(cutoff.getDate() - n2)
          const cutoffStr = cutoff.toISOString().slice(0, 10)
          return NextResponse.json({
            records: demoData.records.filter(r => r.date >= cutoffStr),
            isDemo: true,
          })
        }
        
        default:
          return NextResponse.json({ error: 'Invalid view parameter' }, { status: 400 })
      }
    }
    
    // Real data path
    switch (view) {
      case 'summary': {
        const summary = getMarketDataSummary()
        if (!summary) return NextResponse.json({ error: 'No data available' }, { status: 404 })
        return NextResponse.json(summary)
      }
      
      case 'latest': {
        const latest = getLatestDayRecords()
        if (!latest) return NextResponse.json({ error: 'No data available' }, { status: 404 })
        return NextResponse.json(latest)
      }
      
      case 'hourly': {
        const summary2 = getMarketDataSummary()
        if (!summary2) return NextResponse.json({ error: 'No data available' }, { status: 404 })
        return NextResponse.json({ hourlyAvg: summary2.statistics.hourlyAvg })
      }
      
      case 'daily': {
        const n = days ? parseInt(days, 10) : 30
        const dailyStats = getDailyStatsLastNDays(n)
        return NextResponse.json({ daily: dailyStats })
      }
      
      case 'bess': {
        const summaryBess = getMarketDataSummary()
        if (!summaryBess) return NextResponse.json({ error: 'No data available' }, { status: 404 })
        return NextResponse.json({
          bess: calculateBESSArbitrage(summaryBess),
          overall: summaryBess.statistics.overall,
        })
      }

      case 'saturation': {
        const saturation = getBessSaturation()
        return NextResponse.json({ saturation })
      }
      
      case 'records': {
        if (date) {
          return NextResponse.json({ date, records: getRecordsByDate(date) })
        }
        if (startDate && endDate) {
          return NextResponse.json({ records: getRecordsByDateRange(startDate, endDate) })
        }
        // Default: last 7 days
        const data = getMarketDataFull()
        if (!data) return NextResponse.json({ error: 'No data available' }, { status: 404 })
        const n2 = days ? parseInt(days, 10) : 7
        const cutoff = new Date()
        cutoff.setDate(cutoff.getDate() - n2)
        const cutoffStr = cutoff.toISOString().slice(0, 10)
        return NextResponse.json({
          records: data.records.filter(r => r.date >= cutoffStr),
        })
      }
      
      default:
        return NextResponse.json({ error: 'Invalid view parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Market data API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
