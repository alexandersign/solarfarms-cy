import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Battery,
  Calculator,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS Sizing for Solar Farms: How to Match Storage to Your Park\'s Revenue Potential',
  description: 'How much BESS does your solar park need? We break down the sizing methodology using real curtailment data, evening peak pricing, and grid export constraints from our Cyprus portfolio.',
  keywords: [
    'BESS sizing solar farm',
    'battery storage capacity MW MWh',
    'how much BESS do I need solar park',
    'BESS duration solar farm',
    'solar storage sizing guide',
    'BESS MW to MWh ratio',
    'battery storage sizing methodology',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'BESS Sizing for Solar Farms: How to Match Storage to Your Park\'s Revenue Potential',
  description: 'How much BESS does your solar park need? We break down the sizing methodology using real curtailment data, evening peak pricing, and grid export constraints from our Cyprus portfolio.',
  datePublished: '2026-01-13',
  dateModified: '2026-01-13',
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
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://solarfarms.cy/blog/bess-sizing-solar-farms',
  },
}

export default function BESSSizingSolarFarmsArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-600 text-white">
              Technology &amp; Investment Guide &mdash; March 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              BESS Sizing for Solar Farms
              <span className="block gradient-text mt-2">
                How to Match Storage to Your Park&apos;s Revenue Potential
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              This is not the residential battery calculator approach. Utility-scale BESS sizing depends on
              your curtailment profile, grid export constraints, pricing windows, and investment horizon &mdash;
              not just how many panels you have on the roof. Here&apos;s the methodology we use across our
              Cyprus portfolio.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>January 13, 2026</span>
              <span>&bull;</span>
              <span>11 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: Sizing BESS Is Not Like Sizing Solar Panels */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Scale className="w-8 h-8 text-emerald-600" />
                Sizing BESS Is Not Like Sizing Solar Panels
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                When you size a solar park, the formula is relatively predictable: take your available land area,
                multiply by irradiation (Cyprus enjoys ~1,800 kWh/m&sup2;/year), select your panel Wp, and you
                get a nameplate capacity. A 10-hectare site with trackers yields roughly 5 MW. The maths is
                deterministic.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                BESS sizing is fundamentally different. You cannot simply say &ldquo;I have a 5 MW park,
                therefore I need X MWh of storage.&rdquo; The optimal battery size depends on four
                interdependent variables that are unique to your project:
              </p>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span><strong>Your curtailment profile</strong> &mdash; how many MWh are you losing daily, and during which hours?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span><strong>Your grid export constraints</strong> &mdash; what is your connection agreement&apos;s maximum export capacity?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span><strong>Electricity pricing patterns</strong> &mdash; how wide is the spread between midday and evening prices?</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span><strong>Your investment horizon</strong> &mdash; are you optimising for fastest payback or maximum lifetime revenue?</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                Get the sizing wrong and you either leave money on the table (undersized) or pay for capacity
                you&apos;ll never use (oversized). This guide walks through the methodology we&apos;ve developed
                across our portfolio to get it right.
              </p>
            </div>

            {/* Section 2: The Three Key Variables */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-teal-600" />
                The Three Key Variables
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Every BESS system is defined by three interrelated parameters. Understanding how they interact
                is the foundation of correct sizing.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Duration (Hours)</CardTitle>
                    <CardDescription>How long the battery discharges at rated power</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Duration defines how many hours the system can export at its full MW rating. A 2-hour
                      system discharges fully in 2 hours; a 4-hour system lasts 4 hours.
                    </p>
                    <div className="bg-white rounded-lg p-3 text-sm">
                      <div className="font-semibold text-blue-700 mb-1">Common durations:</div>
                      <div className="space-y-1 text-gray-600">
                        <div>2-hour &mdash; Short-duration, fast payback</div>
                        <div>3-hour &mdash; Balanced configuration</div>
                        <div>4-hour &mdash; Full evening peak coverage</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Power (MW)</CardTitle>
                    <CardDescription>Maximum instantaneous export capacity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Power rating must match your grid connection export capacity. If your connection agreement
                      allows 5 MW export, your BESS power rating should be 5 MW.
                    </p>
                    <div className="bg-white rounded-lg p-3 text-sm">
                      <div className="font-semibold text-amber-700 mb-1">Key constraint:</div>
                      <p className="text-gray-600">
                        The grid connection is the bottleneck. A 10 MW battery on a 5 MW connection can only
                        ever export 5 MW at any given moment.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Energy (MWh)</CardTitle>
                    <CardDescription>Total storable energy = Duration &times; Power</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Energy capacity is what you actually store and sell. It&apos;s the product of duration
                      and power. This is the number that determines your revenue ceiling per cycle.
                    </p>
                    <div className="bg-white rounded-lg p-3 text-sm">
                      <div className="font-semibold text-green-700 mb-1">Formula:</div>
                      <p className="text-gray-600 font-mono">
                        MWh = MW &times; Hours
                      </p>
                      <p className="text-gray-500 mt-1">5 MW &times; 4h = 20 MWh</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-center mb-4">MW:MWh Ratios from Our Portfolio</h3>
                <p className="text-center text-gray-600 text-sm mb-6">
                  Standard configurations across the Lighthief portfolio
                </p>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">1:2</div>
                    <div className="text-sm font-semibold text-gray-700">2-Hour System</div>
                    <div className="text-xs text-gray-500 mt-2">5 MW / 10 MWh</div>
                    <div className="text-xs text-gray-500">10 MW / 20 MWh</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-3xl font-bold text-amber-600 mb-1">1:3</div>
                    <div className="text-sm font-semibold text-gray-700">3-Hour System</div>
                    <div className="text-xs text-gray-500 mt-2">5 MW / 15 MWh</div>
                    <div className="text-xs text-gray-500">10 MW / 30 MWh</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-1">1:4</div>
                    <div className="text-sm font-semibold text-gray-700">4-Hour System</div>
                    <div className="text-xs text-gray-500 mt-2">5 MW / 20 MWh</div>
                    <div className="text-xs text-gray-500">10 MW / 40 MWh</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Understanding Duration */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-600" />
                Understanding Duration: 2-Hour vs 3-Hour vs 4-Hour
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Duration is the single most consequential sizing decision you&apos;ll make. It determines your
                CAPEX, your daily dispatch window, and your ability to capture future revenue streams. Here&apos;s
                how the three standard configurations compare, using confirmed February 2026 pricing from
                Lighthief for a reference 5 MW park.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold border-b-2">Parameter</th>
                      <th className="text-center p-4 font-semibold border-b-2 text-blue-700">2-Hour</th>
                      <th className="text-center p-4 font-semibold border-b-2 text-amber-700">3-Hour</th>
                      <th className="text-center p-4 font-semibold border-b-2 text-green-700">4-Hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 text-gray-600 font-semibold">Configuration</td>
                      <td className="text-center p-4">5 MW / 10 MWh</td>
                      <td className="text-center p-4">5 MW / 15 MWh</td>
                      <td className="text-center p-4">5 MW / 20 MWh</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 text-gray-600 font-semibold">&euro;/MWh Installed</td>
                      <td className="text-center p-4 font-bold text-blue-700" colSpan={3}>Contact for current pricing &mdash; per-MWh cost decreases with longer duration</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-600 font-semibold">Total CAPEX</td>
                      <td className="text-center p-4" colSpan={3}>Contact for current pricing (incl. grid connection + 5% contingency)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 text-gray-600 font-semibold">Evening Dispatch Window</td>
                      <td className="text-center p-4">17:00&ndash;19:00</td>
                      <td className="text-center p-4">17:00&ndash;20:00</td>
                      <td className="text-center p-4">17:00&ndash;21:00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-600 font-semibold">Year 1 Energy Captured</td>
                      <td className="text-center p-4">2,459 MWh (57%)</td>
                      <td className="text-center p-4">3,264 MWh (76%)</td>
                      <td className="text-center p-4">3,755 MWh (87%)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 text-gray-600 font-semibold">Payback (47% curtailment)</td>
                      <td className="text-center p-4 font-bold text-blue-700">4.0 years</td>
                      <td className="text-center p-4 font-bold text-amber-700">4.3 years</td>
                      <td className="text-center p-4 font-bold text-green-700">4.3 years</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 text-gray-600 font-semibold">Containers (@ 5.015 MWh each)</td>
                      <td className="text-center p-4">2 containers</td>
                      <td className="text-center p-4">3 containers</td>
                      <td className="text-center p-4">4 containers</td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="p-4 text-gray-600 font-semibold">Future-Proofing</td>
                      <td className="text-center p-4">Limited</td>
                      <td className="text-center p-4">Moderate</td>
                      <td className="text-center p-4 font-semibold text-green-700">Best</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-2 border-blue-300 bg-blue-50/50">
                  <CardHeader className="pb-2">
                    <Badge className="mb-1 bg-blue-600 text-white w-fit">Lowest CAPEX</Badge>
                    <CardTitle className="text-lg">2-Hour System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Lowest capital outlay with 4.0-year payback and 26% ROI. However, captures only 57%
                      of available curtailed energy &mdash; 1,839 MWh/yr overflows and is permanently lost.
                      Only 2 hours of evening dispatch limits future arbitrage potential.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-300 bg-amber-50/50">
                  <CardHeader className="pb-2">
                    <Badge className="mb-1 bg-amber-600 text-white w-fit">Balanced</Badge>
                    <CardTitle className="text-lg">3-Hour System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Captures 76% of curtailment with 33% more revenue than the 2-hour system, for a
                      near-identical 4.3-year payback. Covers most of the evening peak (17:00&ndash;20:00) when
                      prices average &euro;183/MWh. Strong balance of capital outlay and energy recovery.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-300 bg-green-50/50">
                  <CardHeader className="pb-2">
                    <Badge className="mb-1 bg-green-600 text-white w-fit">Most Revenue</Badge>
                    <CardTitle className="text-lg">4-Hour System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Best per-MWh cost (~17% lower than 2-hour) and captures 87% of curtailment &mdash;
                      53% more energy than the 2-hour system. Full evening coverage (17:00&ndash;21:00).
                      Same 4.3-year payback as 3-hour, drops to ~3.0 years with DAM arbitrage.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
                <p className="text-sm text-gray-500 italic">
                  All pricing reflects confirmed Feb 2026 pricing from Lighthief,
                  including grid connection costs and 5% contingency. Total CAPEX includes EPC, civil works,
                  grid infrastructure, commissioning, and insurance.
                </p>
              </div>
            </div>

            {/* Section 4: Matching Duration to Your Curtailment Profile */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-emerald-600" />
                Matching Duration to Your Curtailment Profile
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A common misconception is that all BESS sizes recover the same amount of curtailed energy,
                since &ldquo;the constraint is the curtailment, not the battery.&rdquo; Our day-by-day analysis
                of 365 days of real operational data from a 5 MW park proves this <strong>wrong</strong>.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Daily curtailment is highly variable &mdash; from 0 MWh on cloudy winter days to 40+ MWh
                during spring peaks. A smaller battery overflows on high-curtailment days, and that spilled
                energy is <strong>permanently lost</strong> to the PV park.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  The Overflow Effect: Bigger Battery = More Revenue
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="text-sm font-semibold text-blue-700 mb-2">2-Hour (10 MWh)</div>
                    <div className="text-3xl font-bold text-blue-600">2,459 MWh</div>
                    <div className="text-xs text-gray-500 mt-1">57% capture rate</div>
                    <div className="text-xs text-red-500 mt-1">1,839 MWh lost (overflows 233 days)</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="text-sm font-semibold text-amber-700 mb-2">3-Hour (15 MWh)</div>
                    <div className="text-3xl font-bold text-amber-600">3,264 MWh</div>
                    <div className="text-xs text-gray-500 mt-1">76% capture rate</div>
                    <div className="text-xs text-red-500 mt-1">1,033 MWh lost (overflows 149 days)</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="text-sm font-semibold text-green-700 mb-2">4-Hour (20 MWh)</div>
                    <div className="text-3xl font-bold text-green-600">3,755 MWh</div>
                    <div className="text-xs text-gray-500 mt-1">87% capture rate</div>
                    <div className="text-xs text-red-500 mt-1">542 MWh lost (overflows 88 days)</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="text-gray-700 text-sm text-center">
                    Average daily curtailment is ~11.8 MWh, but this masks huge seasonal variability. March
                    averages 18.5 MWh/day while December averages 5.2 MWh/day. A 2-hour system (8.5 MWh usable
                    daily capacity after DoD and SOH) overflows on most spring and autumn days. That energy is
                    revenue your PV park permanently loses.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Battery className="inline w-5 h-5 mr-2 text-emerald-600" />
                  <strong>The key insight:</strong> despite a 4-hour system capturing 53% more energy than a 2-hour,
                  the payback periods converge (4.0 vs 4.3 years) because CAPEX scales proportionally. All three
                  durations pay back within 4.3 years. The 4-hour system generates &euro;199K/yr more gross revenue
                  (&euro;577K vs &euro;378K) &mdash; making it the strongest choice for absolute return.
                </p>
              </div>
            </div>

            {/* Section 5: When Longer Duration Wins */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                When Longer Duration Wins
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The analysis above applies to today&apos;s regulatory environment, where BESS can only charge
                from its co-located solar park. But Cyprus is developing Day-Ahead Market (DAM) arbitrage
                legislation that will fundamentally change the equation.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                When DAM arbitrage access passes, your BESS will be able to <strong>charge from the grid</strong>
                &mdash; not just from your own curtailed solar. At that point, duration directly equals revenue
                capacity. More hours of storage means more cycles, more arbitrage, and more income.
              </p>

              <Card className="bg-gradient-to-br from-green-50 to-cyan-50 border-green-200 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">The DAM Arbitrage Revenue Model</CardTitle>
                  <CardDescription>How a 4-hour system unlocks grid charging revenue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Charge Window (Midday)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Grid buy price:</span>
                          <span className="font-semibold">&euro;77&ndash;&euro;101/MWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Charge duration:</span>
                          <span>4 hours at 5 MW = 20 MWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily charge cost:</span>
                          <span className="text-red-600">&euro;1,540&ndash;&euro;2,020</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Discharge Window (Evening)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Grid sell price:</span>
                          <span className="font-semibold">&euro;183&ndash;&euro;186/MWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Usable discharge:</span>
                          <span>~17.26 MWh (86.32% RTE)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily sell revenue:</span>
                          <span className="text-green-600">&euro;3,214&ndash;&euro;3,267</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600">Daily Net Arbitrage</div>
                        <div className="text-2xl font-bold text-green-600">&euro;467&ndash;&euro;770</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600">Annual Arbitrage Revenue</div>
                        <div className="text-2xl font-bold text-green-600">&euro;170K&ndash;&euro;280K</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600">4-Hour Payback With Arbitrage</div>
                        <div className="text-2xl font-bold text-green-700">~3.0 years</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-lg text-gray-700 mb-4">
                The additional &euro;170K&ndash;&euro;280K/year from grid arbitrage further enhances
                the 4-hour system&apos;s economics. Its already-strong 4.3-year payback drops to
                approximately 3.0 years &mdash; significantly faster than any other duration.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <TrendingUp className="inline w-5 h-5 mr-2 text-green-600" />
                  <strong>The strategic insight:</strong> a 4-hour system already captures 53% more energy
                  than a 2-hour at the same 4.3-year payback. With future DAM arbitrage, the gap widens
                  dramatically. If you believe legislation will pass within the 15-year warranty period (virtually
                  certain given EU directives), the 4-hour system delivers far superior lifetime returns.
                </p>
              </div>
            </div>

            {/* Section 6: The Sizing Decision Framework */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                The Sizing Decision Framework
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                After sizing BESS across our portfolio, we&apos;ve distilled the decision into
                a practical framework. Use this to determine which duration best matches your objectives.
              </p>

              <div className="space-y-4 mb-8">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-700 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Primary goal is curtailment recovery <em>now</em>
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <ArrowRight className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-700">2-hour system</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Fastest payback (4.0 years) with lowest capital outlay. Captures 57% of
                          curtailment (2,459 MWh/yr) &mdash; 1,839 MWh permanently lost. Best for
                          operators with constrained capital who accept lower absolute revenue.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Balance between today&apos;s returns and future potential
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <ArrowRight className="w-4 h-4 text-amber-600" />
                          <span className="font-semibold text-amber-700">3-hour system</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Captures 76% of curtailment (3,264 MWh/yr) with payback matching
                          the 4-hour system at 4.3 years. Covers the core evening peak (17:00&ndash;20:00)
                          and generates 33% more revenue than 2-hour.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-700 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Maximum future-proofing and best per-MWh pricing
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <ArrowRight className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-700">4-hour system</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Captures 87% of curtailment (3,755 MWh/yr) &mdash; 53% more than 2-hour.
                          Best &euro;/MWh cost (~17% lower). Full evening dispatch (17:00&ndash;21:00).
                          Payback: 4.3 years now, drops to ~3.0 years with grid arbitrage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-700 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Park &gt;10 MW with ambitions for ancillary services
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <ArrowRight className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-purple-700">4-hour system</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Larger parks benefit from economies of scale on 4-hour systems. The per-MWh cost
                          advantage compounds with size. Longer duration also qualifies for more ancillary
                          service products (frequency regulation, spinning reserve) when those markets open
                          in Cyprus.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <strong>Our recommendation for most clients:</strong> go 4-hour. It captures 87% of curtailment
                  (vs 57% for 2-hour), generates &euro;199K/yr more revenue, and pays back in 4.3 years
                  &mdash; the same payback as 3-hour. The 17% per-MWh cost advantage and future DAM
                  arbitrage upside make it the strongest risk-adjusted investment. If capital is constrained,
                  a 2-hour system still delivers 26% ROI with a 4.0-year payback.
                </p>
              </div>
            </div>

            {/* Section 7: Container Count */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-cyan-600" />
                Container Count: How It Scales
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Each Linyang BESS container in our portfolio holds 5.015 MWh of nameplate energy capacity.
                This standardised unit makes scaling straightforward &mdash; simply multiply containers by
                the number of MWh you need.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold border-b-2">System Size</th>
                      <th className="text-center p-4 font-semibold border-b-2">Power</th>
                      <th className="text-center p-4 font-semibold border-b-2">Energy</th>
                      <th className="text-center p-4 font-semibold border-b-2">Containers</th>
                      <th className="text-center p-4 font-semibold border-b-2">Footprint</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Small (2-hour)</td>
                      <td className="text-center p-4">5 MW</td>
                      <td className="text-center p-4">10 MWh</td>
                      <td className="text-center p-4 font-bold">2</td>
                      <td className="text-center p-4">~60 m&sup2;</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Standard (4-hour)</td>
                      <td className="text-center p-4">5 MW</td>
                      <td className="text-center p-4">20 MWh</td>
                      <td className="text-center p-4 font-bold">4</td>
                      <td className="text-center p-4">~120 m&sup2;</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Medium (4-hour)</td>
                      <td className="text-center p-4">10 MW</td>
                      <td className="text-center p-4">40 MWh</td>
                      <td className="text-center p-4 font-bold">8</td>
                      <td className="text-center p-4">~240 m&sup2;</td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="p-4 font-semibold">Large (4-hour)</td>
                      <td className="text-center p-4">20 MW</td>
                      <td className="text-center p-4">80 MWh</td>
                      <td className="text-center p-4 font-bold">16</td>
                      <td className="text-center p-4">~480 m&sup2;</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-cyan-700">5.015</div>
                    <div className="text-sm text-gray-600 mt-1">MWh per Linyang container</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-teal-700">2–16</div>
                    <div className="text-sm text-gray-600 mt-1">Containers per typical system</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-emerald-700">20+</div>
                    <div className="text-sm text-gray-600 mt-1">Tonnes per container</div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Each container is a self-contained unit with integrated battery modules, BMS, thermal
                  management, and fire suppression &mdash; delivered as a plug-and-play system.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Get Your Custom BESS Sizing Assessment
              </h2>
              <p className="text-xl mb-4 opacity-90">
                Every park has a unique curtailment profile, grid connection, and revenue target. We&apos;ll
                model your specific scenario using real operational data and confirmed pricing to recommend
                the optimal duration and configuration.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Whether you&apos;re sizing for a single 1 MW site or a portfolio of parks, our team will
                deliver a detailed financial model with payback projections under multiple curtailment
                and arbitrage scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Calculator className="w-5 h-5 mr-2" />
                    Get Your Custom Sizing Assessment
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/bess-calculator">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Try Our BESS Calculator
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
