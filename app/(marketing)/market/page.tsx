import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MarketDashboard } from '@/components/market/MarketDashboard'
import { 
  TrendingUp, 
  Battery, 
  Zap, 
  ExternalLink, 
  Download,
  BarChart3,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cyprus Electricity Market Data | Day-Ahead Prices & BESS Analysis',
  description: 'Live Cyprus day-ahead electricity market pricing data from TSOC. Hourly price charts, solar vs peak analysis, and BESS arbitrage opportunities for energy storage investors.',
  keywords: [
    'Cyprus electricity market',
    'TSOC day-ahead market',
    'Cyprus electricity prices',
    'DAM Cyprus',
    'energy market data Cyprus',
    'BESS arbitrage Cyprus',
    'battery storage revenue',
    'solar curtailment Cyprus',
    'electricity price chart',
    'MCP Cyprus',
  ],
}

export default function MarketPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-green-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-cyprus-100 text-cyprus-700 hover:bg-cyprus-200">
              <BarChart3 className="w-3.5 h-3.5 mr-1" />
              Cyprus Energy Market Intelligence
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Cyprus Day-Ahead
              <span className="block gradient-text mt-1">
                Electricity Market Data
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Real-time pricing analytics from the Cyprus Transmission System Operator (TSOC). 
              Track hourly market clearing prices, identify BESS arbitrage opportunities, and 
              understand solar production value in the Cyprus electricity market.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                <Zap className="w-4 h-4 text-solar-500" />
                <span>Hourly Price Data</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                <Battery className="w-4 h-4 text-green-500" />
                <span>BESS Revenue Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                <TrendingUp className="w-4 h-4 text-cyprus-500" />
                <span>Market Trends</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Section */}
      <section className="section-padding">
        <div className="container">
          <MarketDashboard />
        </div>
      </section>
      
      {/* Info / CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-cyprus-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About the Data */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyprus-600" />
                  About This Data
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    The Cyprus competitive electricity market launched on <strong>October 1, 2025</strong>,
                    operated by the Transmission System Operator of Cyprus (TSOC) following the EU Target Model.
                  </p>
                  <p>
                    The <strong>Day-Ahead Market (DAM)</strong> determines hourly market clearing prices 
                    through a bidding process where producers, suppliers, and aggregators submit offers 
                    for each 30-minute interval of the following day.
                  </p>
                  <p>
                    Key insight for solar investors: during solar production hours (06:00-18:00), 
                    market prices typically <strong>drop significantly</strong> due to abundant solar supply, 
                    while evening peak hours (17:00-21:00) command premium prices - creating a 
                    clear <strong>BESS arbitrage opportunity</strong>.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href="https://tsoc.org.cy/competitive-electricity-market/third-dryrun/reports/day-ahead-market-daily-activity-reports-el/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-cyprus-600 hover:text-cyprus-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Raw Reports on TSOC
                  </a>
                </div>
              </div>
              
              {/* BESS Opportunity */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-200">
                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5 text-green-600" />
                  BESS Investment Opportunity
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    Battery Energy Storage Systems (BESS) profit from the <strong>price spread</strong> between 
                    low-cost solar hours and high-value peak demand hours.
                  </p>
                  <p>
                    Our analysis shows a consistent <strong>arbitrage opportunity</strong> where BESS 
                    operators can charge during midday solar surplus (low prices) and discharge during 
                    evening peak demand (high prices).
                  </p>
                  <p>
                    Combined with <strong>curtailment recovery</strong> (recovering energy that would 
                    otherwise be wasted due to grid curtailment), BESS delivers compelling returns for 
                    Cyprus solar-storage hybrid projects.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-green-100 flex flex-col sm:flex-row gap-3">
                  <Button variant="gradient" size="sm" asChild>
                    <Link href="/energy-storage/calculator">
                      <Battery className="w-4 h-4 mr-2" />
                      BESS Calculator
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/energy-storage">
                      Learn About BESS
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Technical Note */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4 text-xs text-gray-500 border border-gray-100">
              <p className="font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Data Pipeline
              </p>
              <p>
                Market data is sourced from TSOC daily Excel reports. To update with the latest data, 
                run: <code className="bg-gray-200 px-1.5 py-0.5 rounded">npx ts-node scripts/download-market-data.ts</code>. 
                Files are downloaded to <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/excel/</code>, 
                parsed, and statistics are generated to <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/data/market-data.json</code>. 
                If no real data is available, demo data based on typical Cyprus market patterns is displayed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
