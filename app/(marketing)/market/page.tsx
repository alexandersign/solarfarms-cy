import { Metadata } from 'next'
import { MarketDashboard } from '@/components/market/MarketDashboard'
import { MarketPageIntro, MarketPageFooter } from '@/components/market/MarketPageIntro'
import { getMarketDataSummary } from '@/lib/market-data'

export const metadata: Metadata = {
  title: 'Cyprus Electricity Market Data | Day-Ahead Prices & BESS Analysis',
  description:
    'Live Cyprus day-ahead electricity market pricing data from TSOC. Hourly price charts, solar vs peak analysis, and BESS arbitrage opportunities for energy storage investors.',
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
  const summary = getMarketDataSummary()

  return (
    <div className="min-h-screen">
      <MarketPageIntro summary={summary} />

      <section className="section-padding">
        <div className="container">
          <MarketDashboard />
        </div>
      </section>

      <MarketPageFooter summary={summary} />
    </div>
  )
}
