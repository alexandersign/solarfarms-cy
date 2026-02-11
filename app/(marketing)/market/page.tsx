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
              Real pricing analytics from the Cyprus Transmission System Operator (TSOC), 
              sourced from 134 official TSOC DAM files spanning Oct 1, 2025 &ndash; Feb 11, 2026 
              (6,432 half-hourly records). Track market clearing prices, identify BESS arbitrage 
              opportunities, and understand how the new competitive market is shaping energy investment.
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
                    Data shown here is sourced from <strong>134 official TSOC DAM files</strong> (Oct 1, 2025 &ndash; Feb 11, 2026), 
                    covering 134 days and 6,432 half-hourly records.
                  </p>
                  <p>
                    The <strong>Day-Ahead Market (DAM)</strong> determines half-hourly market clearing prices 
                    through a bidding process. Since launch, the overall average MCP has been <strong>&euro;158.19/MWh</strong>,
                    with solar hours (06&ndash;17) averaging <strong>&euro;140.88/MWh</strong>, midday (10&ndash;14) at <strong>&euro;101.13/MWh</strong>, 
                    and evening peak hours (17&ndash;21) at <strong>&euro;182.99/MWh</strong>. 
                    Zero-price periods account for <strong>336 intervals (5.2%)</strong> of all records.
                  </p>
                  <p>
                    Important note: as of February 2026, <strong>BESS cannot yet buy from the DAM</strong>. 
                    Current BESS revenue comes from <strong>curtailment recovery</strong> &mdash; storing 
                    otherwise-wasted solar energy and selling at peak prices. Future DAM arbitrage 
                    participation is expected when enabling legislation is passed.
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
                    In Cyprus, BESS currently generates revenue through <strong>curtailment recovery</strong> &mdash; 
                    storing solar energy that would otherwise be curtailed by the DSO, and discharging it 
                    at evening peak prices (&euro;183/MWh avg). Revenue per MWh discharged: <strong>&euro;160.67</strong> (charge 
                    at &euro;0, discharge at peak, 87.8% round-trip efficiency).
                  </p>
                  <p>
                    With <strong>29.4% midday curtailment rates</strong> (periods &le;&euro;50, 09&ndash;15) across Cyprus solar parks 
                    and zero charge cost (curtailed energy is free), BESS delivers <strong>&euro;146,600&ndash;&euro;222,800 
                    annual revenue</strong> (2.5&ndash;3.8 MWh/day discharged) from curtailment recovery alone.
                  </p>
                  <p>
                    <strong>Future upside:</strong> When legislation enables BESS participation in the 
                    Day-Ahead Market (DAM), additional arbitrage revenue from buying at midday prices 
                    (&euro;101/MWh) and selling at peak (&euro;183/MWh) &mdash; a spread of &euro;81.86/MWh 
                    yielding <strong>&euro;71.87 net per MWh</strong> after 87.8% RTE &mdash; will create a further revenue stream.
                    Grid ancillary services represent additional future potential.
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
                Market data is sourced from 134 official TSOC DAM files (Oct 1, 2025 &ndash; Feb 11, 2026). 
                134 days with 6,432 half-hourly records have been processed, covering the competitive 
                open market period since launch.
                Last updated: <strong>February 11, 2026</strong>. Raw files stored in 
                <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/excel/</code> and processed
                statistics in <code className="bg-gray-200 px-1.5 py-0.5 rounded">market/data/market-data.json</code>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
