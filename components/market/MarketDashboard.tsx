'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Battery,
  Sun,
  Moon,
  Clock,
  RefreshCw,
  BarChart3,
  Activity,
  Euro,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  ComposedChart,
  Cell,
} from 'recharts'

// Types matching the API response
interface HourlyAverage {
  hour: number
  avgPrice: number
  minPrice: number
  maxPrice: number
  count: number
}

interface DailyStats {
  date: string
  avgPrice: number
  minPrice: number
  maxPrice: number
  peakHourPrice: number
  offPeakAvgPrice: number
  solarHourAvgPrice: number
  totalVolume: number
}

interface OverallStats {
  avgPrice: number
  minPrice: number
  maxPrice: number
  medianPrice: number
  totalRecords: number
  solarHoursAvg: number
  peakHoursAvg: number
  offPeakAvg: number
  arbitrageSpread: number
}

interface WeeklyStats {
  week: string
  avgPrice: number
  count: number
}

interface LatestRecord {
  date: string
  hour: number
  period: string
  price: number
  volume: number
}

interface BESSArbitrage {
  avgDailySpread: number
  avgChargePrice: number
  avgDischargePrice: number
  estimatedRevenuePerMWhPerDay: number
  annualRevenuePerMWh: number
}

type TimeRange = '7d' | '30d' | '90d' | 'all'

export function MarketDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  
  // Data states
  const [overall, setOverall] = useState<OverallStats | null>(null)
  const [hourlyAvg, setHourlyAvg] = useState<HourlyAverage[]>([])
  const [daily, setDaily] = useState<DailyStats[]>([])
  const [weekly, setWeekly] = useState<WeeklyStats[]>([])
  const [latestRecords, setLatestRecords] = useState<LatestRecord[]>([])
  const [latestDate, setLatestDate] = useState('')
  const [bessData, setBessData] = useState<BESSArbitrage | null>(null)
  const [lastUpdated, setLastUpdated] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const daysMap: Record<TimeRange, string> = {
        '7d': '7',
        '30d': '30',
        '90d': '90',
        'all': '9999',
      }
      
      // Fetch all data in parallel
      const [summaryRes, latestRes, bessRes] = await Promise.all([
        fetch(`/api/market-data?view=summary`),
        fetch(`/api/market-data?view=latest`),
        fetch(`/api/market-data?view=bess`),
      ])
      
      if (!summaryRes.ok) throw new Error('Failed to fetch summary data')
      
      const summaryData = await summaryRes.json()
      const latestData = latestRes.ok ? await latestRes.json() : null
      const bessDataRes = bessRes.ok ? await bessRes.json() : null
      
      setIsDemo(summaryData.isDemo || false)
      setOverall(summaryData.statistics?.overall || null)
      setHourlyAvg(summaryData.statistics?.hourlyAvg || [])
      setWeekly(summaryData.statistics?.weekly || [])
      setLastUpdated(summaryData.lastUpdated || '')
      setDateRange(summaryData.dateRange || { start: '', end: '' })
      
      // Apply time range filter to daily data
      const allDaily: DailyStats[] = summaryData.statistics?.daily || []
      const days = parseInt(daysMap[timeRange])
      setDaily(allDaily.slice(-days))
      
      if (latestData) {
        setLatestRecords(latestData.records || [])
        setLatestDate(latestData.date || '')
      }
      
      if (bessDataRes) {
        setBessData(bessDataRes.bess || null)
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [timeRange])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  // Format helpers
  const formatPrice = (price: number) => `€${price.toFixed(2)}`
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`
  
  // Custom tooltip for charts
  const PriceTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatPrice(entry.value)}/MWh
          </p>
        ))}
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-cyprus-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading market data...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 font-medium">Error loading market data: {error}</p>
          <Button variant="outline" onClick={fetchData} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" /> Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Compute recent trend (last 7 vs previous 7 days)
  const recentDaily = daily.slice(-7)
  const previousDaily = daily.slice(-14, -7)
  const recentAvg = recentDaily.length > 0 
    ? recentDaily.reduce((a, d) => a + d.avgPrice, 0) / recentDaily.length : 0
  const previousAvg = previousDaily.length > 0
    ? previousDaily.reduce((a, d) => a + d.avgPrice, 0) / previousDaily.length : 0
  const priceTrend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0
  
  return (
    <div className="space-y-6">
      {/* Data Source Banner */}
      {isDemo ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <Activity className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800">Demo Data</p>
            <p className="text-sm text-amber-700 mt-1">
              Showing simulated market data based on typical Cyprus patterns. Download real TSOC data 
              by running: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs font-mono">npx ts-node scripts/download-market-data.ts</code>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <Activity className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800">Real Market Data</p>
            <p className="text-sm text-green-700 mt-1">
              Showing actual TSOC Day-Ahead Market data from {dateRange.start ? formatDate(dateRange.start) : ''} to {dateRange.end ? formatDate(dateRange.end) : ''}. 
              Source: Cyprus Transmission System Operator (TSOC) &mdash; {overall?.totalRecords || 0} hourly price records.
            </p>
          </div>
        </div>
      )}
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Market Overview</h2>
            {lastUpdated && (
              <Badge variant="secondary" className="text-xs">
                Updated {formatDate(lastUpdated)}
              </Badge>
            )}
          </div>
          {dateRange.start && (
            <p className="text-sm text-gray-500 mt-1">
              Data from {formatDate(dateRange.start)} to {formatDate(dateRange.end)}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d', 'all'] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? 'bg-cyprus-600 hover:bg-cyprus-700' : ''}
            >
              {range === 'all' ? 'All' : range}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <Euro className="w-5 h-5 text-cyan-600" />
              {priceTrend > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-red-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.avgPrice) : '--'}
            </p>
            <p className="text-xs text-gray-600">Avg Price/MWh</p>
            <p className={`text-xs mt-1 font-medium ${priceTrend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {priceTrend > 0 ? '+' : ''}{priceTrend.toFixed(1)}% vs prev week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="pt-4 pb-4">
            <Sun className="w-5 h-5 text-amber-600" />
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.solarHoursAvg) : '--'}
            </p>
            <p className="text-xs text-gray-600">Solar Hours Avg</p>
            <p className="text-xs text-gray-500 mt-1">06:00 - 18:00</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <CardContent className="pt-4 pb-4">
            <Moon className="w-5 h-5 text-indigo-600" />
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.peakHoursAvg) : '--'}
            </p>
            <p className="text-xs text-gray-600">Peak Hours Avg</p>
            <p className="text-xs text-gray-500 mt-1">17:00 - 21:00</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-4 pb-4">
            <Battery className="w-5 h-5 text-green-600" />
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.arbitrageSpread) : '--'}
            </p>
            <p className="text-xs text-gray-600">Arbitrage Spread</p>
            <p className="text-xs text-gray-500 mt-1">Peak - Solar</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-4 pb-4">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.maxPrice) : '--'}
            </p>
            <p className="text-xs text-gray-600">Max Price</p>
            <p className="text-xs text-gray-500 mt-1">All-time high</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-4 pb-4">
            <TrendingDown className="w-5 h-5 text-purple-600" />
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {overall ? formatPrice(overall.minPrice) : '--'}
            </p>
            <p className="text-xs text-gray-600">Min Price</p>
            <p className="text-xs text-gray-500 mt-1">All-time low</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 1: Hourly Profile + Latest Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Hourly Price Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-cyprus-600" />
              Average Hourly Price Profile
            </CardTitle>
            <CardDescription>
              Typical 24-hour price curve across all available data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={hourlyAvg.map(h => ({
                ...h,
                label: formatHour(h.hour),
                isSolar: h.hour >= 6 && h.hour <= 18,
                isPeak: h.hour >= 17 && h.hour <= 21,
              }))}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 11 }} 
                  interval={2}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `€${v}`}
                />
                <Tooltip content={<PriceTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="maxPrice"
                  name="Max"
                  stroke="#fbbf24"
                  fill="url(#priceGradient)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="minPrice"
                  name="Min"
                  stroke="#a855f7"
                  fill="transparent"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="avgPrice"
                  name="Avg Price"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', r: 3 }}
                  activeDot={{ r: 6 }}
                />
                {/* Reference lines for solar and peak periods */}
                <ReferenceLine x="06:00" stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Solar Start", position: "top", fill: "#f59e0b", fontSize: 10 }} />
                <ReferenceLine x="18:00" stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Solar End", position: "top", fill: "#f59e0b", fontSize: 10 }} />
              </ComposedChart>
            </ResponsiveContainer>
            
            {/* Solar / Peak / Off-Peak Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-gray-600">Solar Hours (06-18)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-gray-600">Peak Hours (17-21)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-600">Off-Peak (22-06)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Latest Day Hourly Prices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-solar-500" />
              Latest Day: {latestDate ? formatDate(latestDate) : 'N/A'}
            </CardTitle>
            <CardDescription>
              Hour-by-hour market clearing prices for the most recent trading day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={latestRecords.map(r => ({
                ...r,
                label: formatHour(r.hour),
                fill: r.hour >= 17 && r.hour <= 21 
                  ? '#6366f1'  // Peak - indigo
                  : r.hour >= 6 && r.hour <= 18 
                    ? '#f59e0b' // Solar - amber
                    : '#94a3b8', // Off-peak - gray
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={2} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `€${v}`} />
                <Tooltip content={<PriceTooltip />} />
                <Bar 
                  dataKey="price" 
                  name="MCP"
                  radius={[4, 4, 0, 0]}
                >
                  {latestRecords.map((entry, idx) => {
                    const color = entry.hour >= 17 && entry.hour <= 21
                      ? '#6366f1'
                      : entry.hour >= 6 && entry.hour <= 18
                        ? '#f59e0b'
                        : '#94a3b8'
                    return <Cell key={idx} fill={color} />
                  })}
                </Bar>
                {overall && (
                  <ReferenceLine 
                    y={overall.avgPrice} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    label={{ value: `Avg €${overall.avgPrice.toFixed(0)}`, position: "right", fill: "#ef4444", fontSize: 11 }}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 2: Daily Trend + Weekly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Average Price Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-cyprus-600" />
              Daily Average Price Trend
            </CardTitle>
            <CardDescription>
              Day-by-day average market clearing price with peak and solar bands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={daily.map(d => ({
                ...d,
                label: d.date.slice(5), // MM-DD
                spread: d.peakHourPrice - d.solarHourAvgPrice,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 10 }} 
                  interval={Math.max(0, Math.floor(daily.length / 12))}
                />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `€${v}`} />
                <Tooltip content={<PriceTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="peakHourPrice"
                  name="Peak Price"
                  stroke="#6366f1"
                  fill="#6366f120"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="solarHourAvgPrice"
                  name="Solar Price"
                  stroke="#f59e0b"
                  fill="#f59e0b15"
                  strokeWidth={1.5}
                />
                <Line
                  type="monotone"
                  dataKey="avgPrice"
                  name="Avg Price"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Weekly Average */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-green-600" />
              Weekly Average Price
            </CardTitle>
            <CardDescription>
              Weekly moving average of market clearing prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={weekly.slice(-Math.min(weekly.length, timeRange === '7d' ? 4 : timeRange === '30d' ? 8 : 20)).map(w => ({
                ...w,
                label: w.week.slice(5), // MM-DD
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `€${v}`} />
                <Tooltip content={<PriceTooltip />} />
                <Bar
                  dataKey="avgPrice"
                  name="Weekly Avg"
                  fill="#0ea5e9"
                  radius={[6, 6, 0, 0]}
                />
                {overall && (
                  <ReferenceLine
                    y={overall.avgPrice}
                    stroke="#ef4444"
                    strokeDasharray="5 5"
                    label={{ value: `Overall €${overall.avgPrice.toFixed(0)}`, position: "insideTopRight", fill: "#ef4444", fontSize: 11 }}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* BESS Arbitrage Analysis */}
      {bessData && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Battery className="w-5 h-5 text-green-600" />
              BESS Arbitrage Opportunity
            </CardTitle>
            <CardDescription>
              Battery energy storage revenue potential based on actual market price spreads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(bessData.avgChargePrice)}
                </p>
                <p className="text-xs text-gray-500">Charge Price</p>
                <p className="text-xs text-gray-400">Solar hours avg</p>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Moon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(bessData.avgDischargePrice)}
                </p>
                <p className="text-xs text-gray-500">Discharge Price</p>
                <p className="text-xs text-gray-400">Peak hours avg</p>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Zap className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-700">
                  {formatPrice(bessData.avgDailySpread)}
                </p>
                <p className="text-xs text-gray-500">Spread</p>
                <p className="text-xs text-gray-400">Per MWh</p>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Euro className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-cyan-700">
                  {formatPrice(bessData.estimatedRevenuePerMWhPerDay)}
                </p>
                <p className="text-xs text-gray-500">Daily Revenue</p>
                <p className="text-xs text-gray-400">Per MWh (87.8% RTE)</p>
              </div>
              
              <div className="text-center p-3 bg-green-100 rounded-lg shadow-sm border border-green-300">
                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-800">
                  {formatPrice(bessData.annualRevenuePerMWh)}
                </p>
                <p className="text-xs text-green-700 font-medium">Annual Revenue</p>
                <p className="text-xs text-green-600">Per MWh capacity</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Based on 87.8% round-trip efficiency (Linyang spec) &bull; 1 cycle/day &bull; 
              Charge during solar hours (06-18), discharge during peak (17-21)
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Seasonal Price Analysis Table */}
      {daily.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-cyprus-600" />
              Seasonal Price Analysis
            </CardTitle>
            <CardDescription>
              Average Market Clearing Prices by season and time of day (from real TSOC data)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              // Group daily stats by season
              const seasonData: Record<string, { label: string; color: string; days: DailyStats[] }> = {
                winter: { label: 'Winter (Jan-Feb)', color: 'bg-blue-100 text-blue-800', days: [] },
                spring: { label: 'Spring (Apr-May)', color: 'bg-green-100 text-green-800', days: [] },
                summer: { label: 'Summer (Jun-Aug)', color: 'bg-amber-100 text-amber-800', days: [] },
                autumn: { label: 'Autumn (Sep)', color: 'bg-orange-100 text-orange-800', days: [] },
              }
              
              for (const d of daily) {
                const month = parseInt(d.date.split('-')[1])
                if (month >= 1 && month <= 2) seasonData.winter.days.push(d)
                else if (month >= 3 && month <= 5) seasonData.spring.days.push(d)
                else if (month >= 6 && month <= 8) seasonData.summer.days.push(d)
                else seasonData.autumn.days.push(d)
              }
              
              const seasonEntries = Object.values(seasonData).filter(s => s.days.length > 0)
              
              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Season</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Overall Avg</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Solar Avg</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Peak Avg</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Spread</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Min</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Max</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasonEntries.map((s) => {
                        const avgP = s.days.reduce((a, d) => a + d.avgPrice, 0) / s.days.length
                        const solarP = s.days.reduce((a, d) => a + d.solarHourAvgPrice, 0) / s.days.length
                        const peakP = s.days.reduce((a, d) => a + d.peakHourPrice, 0) / s.days.length
                        const minP = Math.min(...s.days.map(d => d.minPrice))
                        const maxP = Math.max(...s.days.map(d => d.maxPrice))
                        const spread = peakP - solarP
                        
                        return (
                          <tr key={s.label} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2.5 px-3">
                              <Badge variant="secondary" className={s.color}>
                                {s.label}
                              </Badge>
                            </td>
                            <td className="text-right py-2.5 px-3 font-semibold">{formatPrice(avgP)}</td>
                            <td className="text-right py-2.5 px-3 text-amber-700">{formatPrice(solarP)}</td>
                            <td className="text-right py-2.5 px-3 text-indigo-700">{formatPrice(peakP)}</td>
                            <td className="text-right py-2.5 px-3 font-semibold text-green-700">{formatPrice(spread)}</td>
                            <td className="text-right py-2.5 px-3 text-gray-500">{formatPrice(minP)}</td>
                            <td className="text-right py-2.5 px-3 text-red-600">{formatPrice(maxP)}</td>
                            <td className="text-right py-2.5 px-3 text-gray-500">{s.days.length}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            })()}
            
            <p className="text-xs text-gray-500 mt-4">
              All prices in EUR/MWh. Solar hours: 06:00-17:00. Peak hours: 17:00-21:00. 
              Spread = Peak Avg - Solar Avg (BESS arbitrage opportunity).
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Data Source Attribution */}
      <div className="text-center text-xs text-gray-400 py-4">
        <p>
          Data source: <a href="https://tsoc.org.cy/competitive-electricity-market/third-dryrun/reports/day-ahead-market-daily-activity-reports-el/" 
            target="_blank" rel="noopener noreferrer" className="text-cyprus-500 hover:underline">
            TSOC Cyprus - Day-Ahead Market Reports
          </a>
        </p>
        <p className="mt-1">
          Cyprus Transmission System Operator &bull; Competitive Electricity Market
        </p>
      </div>
    </div>
  )
}
