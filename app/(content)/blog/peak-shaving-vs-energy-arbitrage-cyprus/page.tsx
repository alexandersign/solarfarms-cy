import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  TrendingUp,
  Battery,
  Zap,
  Sun,
  Moon,
  ArrowRight,
  Calculator,
  Clock,
  Euro,
  BarChart3,
  CheckCircle,
  Shield,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Peak Shaving vs Energy Arbitrage: Which BESS Revenue Model Works in Cyprus?',
  description: 'Two revenue models, one grid. We compare peak shaving and energy arbitrage using real Cyprus day-ahead pricing — €77/MWh midday vs €186/MWh evening — to show which strategy maximises BESS returns.',
  keywords: [
    'BESS revenue model',
    'peak shaving vs arbitrage solar',
    'BESS revenue Cyprus',
    'energy arbitrage BESS',
    'peak shaving battery storage',
    'Cyprus electricity pricing BESS',
    'BESS revenue stacking',
    'solar storage revenue model',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Peak Shaving vs Energy Arbitrage: Which BESS Revenue Model Works in Cyprus?',
  description: 'Two revenue models, one grid. We compare peak shaving and energy arbitrage using real Cyprus day-ahead pricing — €77/MWh midday vs €186/MWh evening — to show which strategy maximises BESS returns.',
  datePublished: '2025-12-29',
  dateModified: '2025-12-29',
  author: {
    '@type': 'Person',
    name: 'Alexander Papacosta',
    jobTitle: 'Managing Director',
    worksFor: {
      '@type': 'Organization',
      name: 'Lighthief Cyprus Ltd',
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lighthief Cyprus Ltd',
    url: 'https://solarfarms.cy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://solarfarms.cy/images/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://solarfarms.cy/blog/peak-shaving-vs-energy-arbitrage-cyprus',
  },
}

export default function PeakShavingVsArbitrageArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-600 text-white">
              Investment Guide &mdash; April 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Peak Shaving vs Energy Arbitrage
              <span className="block gradient-text mt-2">
                Which BESS Revenue Model Works in Cyprus?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Most BESS revenue analyses assume grid-connected arbitrage. In Cyprus, where BESS is
              legally restricted to co-located solar discharge, the picture is different. We model
              both strategies with real pricing data.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>December 29, 2025</span>
              <span>&bull;</span>
              <span>10 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: Two Models, One Battery */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Two Models, One Battery</h2>
              <p className="text-lg text-gray-700 mb-4">
                Every BESS operator faces the same fundamental question: how will this battery
                earn money? The hardware is identical &mdash; lithium iron phosphate cells, a power
                conversion system, an energy management platform. What changes is the
                <em> operating strategy</em>. Globally, two primary models dominate the conversation.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Peak Shaving</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Reduce grid demand charges by discharging the battery during peak consumption
                      periods. The battery acts as a buffer, flattening the load curve and avoiding
                      expensive demand tariffs. This is primarily a behind-the-meter commercial
                      strategy used by large consumers &mdash; factories, data centres, commercial
                      buildings &mdash; to lower their electricity bills.
                    </p>
                    <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                      Behind-the-Meter
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Energy Arbitrage</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Buy or store energy when prices are low, then sell when prices are high.
                      Classic buy-low, sell-high applied to wholesale electricity markets. This is
                      primarily a front-of-meter utility strategy where the battery participates
                      directly in the day-ahead or intraday market, capturing the spread between
                      off-peak and on-peak prices.
                    </p>
                    <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                      Front-of-Meter
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <Zap className="inline w-5 h-5 mr-2" />
                  In Cyprus, a Third Model Dominates
                </p>
                <p className="text-gray-700">
                  Neither pure peak shaving nor classical arbitrage describes what actually happens
                  in Cyprus. Instead, a third model has emerged: <strong>Curtailment Recovery</strong>.
                  You store otherwise-wasted solar energy during curtailment periods and discharge
                  it during the evening demand peak. This is effectively a hybrid of both models
                  &mdash; you&apos;re shaving the midday solar peak while arbitraging the price
                  difference between free curtailed energy and &euro;183/MWh evening prices.
                  Understanding this distinction is critical for modelling returns accurately.
                </p>
              </div>
            </div>

            {/* Section 2: The Cyprus Pricing Landscape */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Cyprus Pricing Landscape</h2>
              <p className="text-lg text-gray-700 mb-4">
                Revenue from any BESS strategy depends entirely on the price spread between
                charging and discharging hours. We analysed 134 days of Cyprus day-ahead market
                data from October 2025 through February 2026 to establish the structural pricing
                patterns that define BESS economics on the island.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sun className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Midday Average (10:00&ndash;14:00)</p>
                    <p className="text-4xl font-bold text-yellow-600 mb-1">&euro;101<span className="text-lg">/MWh</span></p>
                    <p className="text-sm text-gray-500">Daily low at noon: &euro;77/MWh</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Daily Average</p>
                    <p className="text-4xl font-bold text-gray-600 mb-1">&euro;134<span className="text-lg">/MWh</span></p>
                    <p className="text-sm text-gray-500">Average spread: &euro;82/MWh</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Moon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Evening Peak (17:00&ndash;21:00)</p>
                    <p className="text-4xl font-bold text-indigo-600 mb-1">&euro;183<span className="text-lg">/MWh</span></p>
                    <p className="text-sm text-gray-500">Daily high at 19:00: &euro;186/MWh</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spread Reliability (134-Day Dataset)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">100%</p>
                    <p className="text-sm text-gray-600">of days show positive spread</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-gray-600">of days with spread &gt;&euro;20/MWh</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">61%</p>
                    <p className="text-sm text-gray-600">of days with spread &gt;&euro;40/MWh</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Source: Cyprus TSO (TSOC) Day-Ahead Market data, Oct 2025 &ndash; Feb 2026
                </p>
              </div>
            </div>

            {/* Section 3: Revenue Model 1 — Curtailment Recovery */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Revenue Model 1: Curtailment Recovery</h2>
                  <p className="text-sm text-green-600 font-semibold">Available Now Under Current Legislation</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Under current Cyprus law, BESS can only charge from co-located solar. Far from
                being a limitation, this constraint actually produces the most profitable operating
                model available today. The reason is simple: your charging cost is &euro;0/MWh
                because you&apos;re capturing energy that the TSO has ordered you to waste.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Curtailment recovery is not a theoretical concept &mdash; it is the only BESS
                revenue model legally permitted in Cyprus right now, and its economics are
                compelling precisely because the input cost is zero.
              </p>

              <Card className="mb-6 border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-900">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Charge from curtailed solar at &euro;0/MWh</p>
                        <p className="text-sm text-gray-600">
                          When the TSO issues a curtailment signal, your co-located BESS absorbs
                          the excess solar production. Your marginal charging cost is zero &mdash;
                          this energy was going to waste.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Discharge during evening peak at &euro;183/MWh average</p>
                        <p className="text-sm text-gray-600">
                          The Cyprus day-ahead market peaks between 17:00&ndash;21:00, with prices
                          regularly hitting &euro;183&ndash;186/MWh. This is when you sell your
                          stored energy at maximum value.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Net revenue after RTE losses: ~&euro;158/MWh per cycle</p>
                        <p className="text-sm text-gray-600">
                          After accounting for 86.32% round-trip efficiency (RTE) losses, each
                          MWh discharged nets approximately &euro;158/MWh &mdash; pure margin since
                          your input cost was zero.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Annual Revenue: 5&nbsp;MW / 20&nbsp;MWh System at 47% Curtailment
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Calculator className="w-5 h-5 text-green-600 mr-2" />
                      Input Assumptions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Park capacity:</span>
                        <span className="font-semibold">5 MW</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">BESS size:</span>
                        <span className="font-semibold">5 MW / 20 MWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Annual gross production:</span>
                        <span className="font-semibold">~10,000 MWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Curtailment rate:</span>
                        <span className="font-semibold text-red-600">47%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Curtailed energy:</span>
                        <span className="font-semibold">~4,700 MWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Charging cost:</span>
                        <span className="font-semibold text-green-600">&euro;0/MWh</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Euro className="w-5 h-5 text-green-600 mr-2" />
                      Revenue Output
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">BESS recoverable:</span>
                        <span className="font-semibold">~2,520 MWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">After 86.32% RTE:</span>
                        <span className="font-semibold">~2,213 MWh discharged</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average evening DAM price:</span>
                        <span className="font-semibold">&euro;183/MWh</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Net revenue per MWh:</span>
                        <span className="font-semibold">&euro;158/MWh</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2 mt-2">
                        <span className="text-gray-600">Annual revenue:</span>
                        <span className="font-bold text-lg text-green-600">~&euro;398,400</span>
                      </div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3 mt-4">
                      <p className="text-sm text-green-800 font-semibold text-center">
                        Pure margin &mdash; zero charging cost means every euro is profit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Revenue Model 2 — Grid Arbitrage */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Revenue Model 2: Grid Arbitrage</h2>
                  <p className="text-sm text-blue-600 font-semibold">Coming Soon &mdash; When DAM Legislation Passes</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                When the Day-Ahead Market legislation passes and BESS operators gain permission to
                charge from the grid, a second revenue stream opens: classical energy arbitrage.
                You charge during midday when solar oversupply crashes prices, then discharge
                during the evening peak when demand &mdash; and prices &mdash; spike.
              </p>

              <Card className="mb-6 border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Charge from grid at midday: &euro;101/MWh average</p>
                        <p className="text-sm text-gray-600">
                          Between 10:00&ndash;14:00, solar oversupply drives DAM prices to their
                          daily lows. At &euro;77&ndash;101/MWh, grid energy is cheap &mdash; but
                          unlike curtailment recovery, it&apos;s not free.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Discharge during evening: &euro;183/MWh average</p>
                        <p className="text-sm text-gray-600">
                          The 17:00&ndash;21:00 demand peak creates a reliable sell window. Air
                          conditioning load, commercial activity, and residential demand converge
                          to push prices 2&ndash;2.5&times; above midday levels.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Gross spread: ~&euro;82/MWh average</p>
                        <p className="text-sm text-gray-600">
                          The difference between average buy (&euro;101/MWh) and sell (&euro;183/MWh)
                          creates a gross spread of &euro;82/MWh. After 86.32% RTE and the charging
                          cost, net revenue is approximately &euro;60/MWh per cycle.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Arbitrage Revenue: 5&nbsp;MW / 20&nbsp;MWh System &mdash; Daily Cycling
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="text-sm text-gray-500 mb-1">Gross Spread</div>
                    <div className="text-3xl font-bold text-blue-600">~&euro;82</div>
                    <div className="text-xs text-gray-400">per MWh per cycle</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="text-sm text-gray-500 mb-1">After 86.32% RTE + Charge Cost</div>
                    <div className="text-3xl font-bold text-blue-600">~&euro;60</div>
                    <div className="text-xs text-gray-400">net per MWh per cycle</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center border-2 border-blue-300">
                    <div className="text-sm text-gray-500 mb-1">Annual Revenue</div>
                    <div className="text-3xl font-bold text-blue-600">&euro;170K&ndash;280K</div>
                    <div className="text-xs text-gray-400">additional per year</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">
                    Curtailment Recovery + Grid Arbitrage Combined
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-blue-200">
                          <th className="text-left p-3 font-semibold text-gray-900">Revenue Stream</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Annual Range</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Curtailment recovery</strong>
                            <span className="block text-sm text-gray-500">&euro;0 charge cost, evening discharge</span>
                          </td>
                          <td className="p-3 text-right font-mono font-semibold text-green-700">~&euro;405,860</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Available Now</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Grid arbitrage</strong>
                            <span className="block text-sm text-gray-500">Second cycle, grid-charged</span>
                          </td>
                          <td className="p-3 text-right font-mono font-semibold text-blue-700">&euro;170K&ndash;280K</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Coming Soon</Badge>
                          </td>
                        </tr>
                        <tr className="bg-emerald-50">
                          <td className="p-3 text-gray-700">
                            <strong>Combined total</strong>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700 text-lg">&gt;&euro;600K/year</td>
                          <td className="p-3 text-right">
                            <Badge className="bg-emerald-600 text-white">Stacked</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Revenue Model 3 — Future Grid Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Revenue Model 3: Future Grid Services</h2>
                  <p className="text-sm text-amber-600 font-semibold">When Cyprus Balancing Market Opens</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Mature European electricity markets already offer BESS operators significant
                revenue from ancillary services &mdash; grid-stabilisation products that batteries
                are uniquely positioned to deliver. As Cyprus modernises its grid and integrates
                with ENTSO-E standards, these services will become available locally.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Frequency Containment Reserve (FCR)</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Sub-second response to frequency deviations. BESS responds faster than any
                      thermal plant, making it the preferred provider for primary frequency response.
                      In island grids, frequency stability is even more critical due to limited inertia.
                    </p>
                    <p className="font-mono text-sm text-gray-900 font-semibold">&euro;50&ndash;120K/MW/year</p>
                    <p className="text-xs text-gray-500">In mature EU markets (UK, Germany)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Automatic Frequency Restoration (aFRR)</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Slower-acting frequency response that restores system balance after initial
                      containment. BESS can provide both upward and downward regulation, earning
                      availability payments even when not dispatched.
                    </p>
                    <p className="font-mono text-sm text-gray-900 font-semibold">Capacity + energy payments</p>
                    <p className="text-xs text-gray-500">Revenue varies by market design</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Synthetic Inertia</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Critical for island grids like Cyprus. As thermal generators retire, the grid
                      loses rotational inertia. BESS can provide synthetic inertia through rapid
                      power injection, preventing frequency collapse during sudden generation trips.
                    </p>
                    <p className="font-mono text-sm text-gray-900 font-semibold">Emerging service</p>
                    <p className="text-xs text-gray-500">High value for isolated grids</p>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Revenue Potential for 5&nbsp;MW System</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      In mature EU markets, frequency regulation alone generates &euro;50&ndash;120K
                      per MW per year. For a 5&nbsp;MW system, that translates to
                      <strong> &euro;250,000&ndash;600,000/year</strong> in additional revenue from
                      grid services alone.
                    </p>
                    <p className="text-sm text-amber-800 font-semibold">
                      Revenue stacking: curtailment + arbitrage + grid services
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  Not Yet Available &mdash; But Worth Sizing For
                </p>
                <p className="text-gray-700">
                  These services are not yet available in Cyprus, but they are expected as the
                  grid modernises and ENTSO-E integration progresses. Investors who size their
                  BESS for 4-hour duration and spec an EMS capable of sub-second response will
                  be positioned to capture these revenues when they materialise &mdash; without
                  additional capital expenditure.
                </p>
              </div>
            </div>

            {/* Section 6: The Revenue Stacking Timeline */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-purple-600 text-white">Revenue Roadmap</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">The Revenue Stacking Timeline</h2>
                <p className="text-lg text-gray-600">
                  BESS deployed today earns from curtailment recovery immediately. Revenue grows
                  as new markets open &mdash; without any hardware changes.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-2 border-green-300 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                          <Sun className="w-7 h-7 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-green-300 mt-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-green-900">2026: Curtailment Recovery Only</h3>
                          <Badge className="bg-green-600 text-white">Active Now</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">
                          Charge from curtailed solar at &euro;0/MWh, discharge during evening
                          peak at &euro;183/MWh. The only model available under current legislation
                          &mdash; but already the most profitable per-MWh strategy.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Estimated Annual Revenue (5&nbsp;MW / 20&nbsp;MWh):</span>
                            <span className="text-2xl font-bold text-green-600">~&euro;400K/yr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-300 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-blue-300 mt-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-blue-900">2027&ndash;2028: + Grid Arbitrage</h3>
                          <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Coming Soon</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">
                          When DAM legislation passes, BESS operators gain permission to charge from
                          the grid during low-price midday hours and discharge during the evening peak.
                          This second cycle adds &euro;170K&ndash;280K/year on top of curtailment revenue.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Estimated Annual Revenue (combined):</span>
                            <span className="text-2xl font-bold text-blue-600">&euro;570&ndash;680K/yr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center">
                          <Zap className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-purple-900">2028&ndash;2030: + Ancillary Services</h3>
                          <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">Future</Badge>
                        </div>
                        <p className="text-gray-700 mb-3">
                          When the Cyprus balancing market matures, BESS can earn from frequency
                          regulation, synthetic inertia, and reserve capacity payments. In mature EU
                          markets, these services generate &euro;50&ndash;120K/MW/year. For a 5&nbsp;MW
                          system, this adds &euro;250&ndash;600K/year.
                        </p>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Estimated Annual Revenue (full stack):</span>
                            <span className="text-2xl font-bold text-purple-600">&euro;820K&ndash;1.28M/yr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-purple-200">
                  <div className="text-sm text-gray-500 mb-1">Payback Period (Full Stack)</div>
                  <div className="text-4xl font-bold text-purple-600">2.0&ndash;3.0</div>
                  <div className="text-sm text-gray-400">years</div>
                  <p className="text-xs text-gray-500 mt-2">
                    When all three revenue streams are active
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-green-200">
                  <div className="text-sm text-gray-500 mb-1">Revenue Growth Multiplier</div>
                  <div className="text-4xl font-bold text-green-600">2&ndash;3&times;</div>
                  <div className="text-sm text-gray-400">vs curtailment-only</div>
                  <p className="text-xs text-gray-500 mt-2">
                    Same hardware, same CAPEX &mdash; revenue compounds as markets open
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7: What This Means for Your Investment */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What This Means for Your Investment</h2>
              <p className="text-lg text-gray-700 mb-6">
                The key insight from this analysis is not which model is &ldquo;best&rdquo; &mdash;
                it&apos;s that <strong>BESS deployed today earns from curtailment recovery immediately,
                then revenue grows as new markets open</strong>. You don&apos;t need to wait for
                legislation. You don&apos;t need to predict regulatory timelines. You deploy now,
                earn now, and capture upside later.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-lg text-green-900">Early Movers Win</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Start earning ~&euro;400K/year from day one via curtailment recovery</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Lock in today&apos;s BESS prices before supply tightens</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Revenue grows automatically as new markets open</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Already recovering investment while competitors wait for legislation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Battery className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-lg text-blue-900">Size for 4-Hour Duration</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>4-hour systems (e.g. 5&nbsp;MW / 20&nbsp;MWh) capture all three revenue streams</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Sufficient capacity for dual cycling (curtailment + arbitrage)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Headroom for ancillary services without compromising energy trades</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Higher CAPEX repaid by dramatically higher lifetime revenue</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  The Bottom Line
                </p>
                <p className="text-gray-700">
                  A 5&nbsp;MW / 20&nbsp;MWh BESS system installed today at ~&euro;2.26M earns
                  back ~&euro;400K/year immediately from curtailment recovery alone. When grid
                  arbitrage opens, that grows to &euro;570&ndash;680K/year. When ancillary
                  services mature, total revenue could reach &euro;820K&ndash;1.28M/year.
                  The same battery, the same investment &mdash; revenue that compounds as
                  Cyprus&apos;s energy market evolves. Early movers who size for 4-hour duration
                  are best positioned to capture all three revenue streams.
                </p>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Data Sources &amp; Assumptions</h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>
                  Cyprus TSO (TSOC) &mdash; Day-ahead market price data, 134-day dataset Oct 2025 &ndash; Feb 2026
                </li>
                <li>
                  Lighthief operational data &mdash; Curtailment rates from 5.01&nbsp;MW reference park (47% average, 2025)
                </li>
                <li>
                  Linyang Energy &mdash; Battery specifications: 86.32% round-trip efficiency (full system AC-AC incl. cabling losses), LFP chemistry (EVE cells), 7,000-cycle warranty at 70% EOL
                </li>
                <li>
                  Lighthief EPC Confirmed Adders v4 &mdash; Installed cost of ~&euro;113K/MWh (portfolio average), updated February 2026
                </li>
                <li>
                  ENTSO-E &mdash; Ancillary service revenue benchmarks from EU balancing markets (Germany, Ireland, UK)
                </li>
                <li>
                  Revenue calculations use conservative assumptions: 95% availability, single daily cycle for arbitrage, 47% curtailment rate
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Model Your BESS Revenue Potential
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Get a site-specific revenue projection based on your park&apos;s curtailment
                profile, system size, and target operating strategy. See exactly how each
                revenue stream contributes to your investment case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Model Your Revenue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/blog/cyprus-curtailment-crisis-bess-solution">
                    Read Our Curtailment Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-75">
                Contact Alexander Papacosta: +357 99 164 158 | office@lighthief.com
              </p>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
