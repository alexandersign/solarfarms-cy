'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { BarChart3, TrendingUp, Battery, Zap } from 'lucide-react'

export function MarketDataCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-green-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="scaleUp">
            <div className="bg-white rounded-2xl shadow-lg border border-cyprus-100 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-10">
                  <div className="inline-flex items-center gap-1.5 bg-cyprus-100 text-cyprus-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <BarChart3 className="w-3.5 h-3.5" aria-hidden />
                    Cyprus Open Market
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    Live Electricity
                    <span className="block gradient-text">Market Pricing</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Verified day-ahead data from a 134-day TSOC sample (Oct 2025 – Feb 2026).
                    Evening peaks near €183/MWh versus midday around €77/MWh create a strong
                    spread for BESS — peak shifting and merchant dispatch, not only curtailment recovery.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="gradient" asChild className="focus-visible:ring-2 focus-visible:ring-[#1A365D]">
                      <Link href="/market">
                        <BarChart3 className="w-4 h-4 mr-2" aria-hidden />
                        View Market Data
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="focus-visible:ring-2 focus-visible:ring-[#1A365D]">
                      <Link href="/energy-storage/calculator">
                        <Battery className="w-4 h-4 mr-2" aria-hidden />
                        BESS Calculator
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyprus-600 to-cyprus-800 p-8 md:p-10 text-white">
                  <h3 className="font-heading font-semibold text-lg mb-6 opacity-90">Market Insights</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-solar-300" aria-hidden />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Hourly price curves</p>
                        <p className="text-xs text-cyprus-200">Solar dip vs evening peak — the spread that drives storage economics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-300" aria-hidden />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Peak shifting &amp; merchant upside</p>
                        <p className="text-xs text-cyprus-200">Charge when prices are low, discharge into the evening peak — indicative €150+ /MWh spread value</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Battery className="w-4 h-4 text-amber-300" aria-hidden />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">BESS yield models</p>
                        <p className="text-xs text-cyprus-200">Real-data-backed revenue estimates per MWh of storage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
