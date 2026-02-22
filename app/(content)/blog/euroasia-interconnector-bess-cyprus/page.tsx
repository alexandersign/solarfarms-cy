import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Globe,
  Plug2,
  Zap,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Battery,
  BarChart3,
  AlertTriangle,
  Anchor,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS and the EuroAsia Interconnector: How Grid Connection Changes the Game for Cyprus',
  description:
    'The 2,000 MW EuroAsia submarine cable will end Cyprus\'s grid isolation by 2029-2030. We analyse what interconnection means for BESS investors — less curtailment, but new arbitrage and export opportunities.',
  keywords: [
    'EuroAsia interconnector BESS',
    'Cyprus grid interconnection',
    'BESS Cyprus interconnector impact',
    'EuroAsia cable energy storage',
    'Cyprus grid connection Europe',
    'BESS interconnector opportunities',
    'Cyprus energy infrastructure',
    'submarine cable Cyprus BESS',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'BESS and the EuroAsia Interconnector: How Grid Connection Changes the Game for Cyprus',
  description:
    'The 2,000 MW EuroAsia submarine cable will end Cyprus\'s grid isolation by 2029-2030. We analyse what interconnection means for BESS investors — less curtailment, but new arbitrage and export opportunities.',
  datePublished: '2025-06-10',
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
    '@id': 'https://solarfarms.cy/blog/euroasia-interconnector-bess-cyprus',
  },
}

export default function EuroAsiaInterconnectorArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-600 text-white">
              Market Analysis &mdash; October 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              BESS and the EuroAsia Interconnector
              <span className="block gradient-text mt-2">
                How Grid Connection Changes the Game for Cyprus
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Cyprus is the EU&apos;s only fully isolated electricity grid. A 2,000&nbsp;MW submarine
              cable will change that by 2029&ndash;2030 &mdash; connecting the island to Crete and
              Israel. For BESS investors, this means less curtailment revenue but new arbitrage and
              grid services opportunities. Here&apos;s how to position your investment.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>June 10, 2025</span>
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

            {/* Section 1: The Cable That Changes Everything */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Anchor className="inline w-8 h-8 mr-2 text-blue-600" />
                The Cable That Changes Everything
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The EuroAsia Interconnector is a 2,000&nbsp;MW high-voltage direct current (HVDC)
                submarine cable connecting Cyprus to Crete (Greece) and Israel. At approximately
                1,208&nbsp;km, it will be one of the longest submarine power cables in the world.
                When operational, it will end Cyprus&apos;s status as the EU&apos;s only fully
                electrically isolated member state.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The project has been designated a European Project of Common Interest (PCI) and has
                received EU funding support. The expected operational date is 2029&ndash;2030, though
                the project has experienced previous delays (the original target was 2025).
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Capacity</p>
                    <p className="text-4xl font-bold text-blue-600 mb-1">2,000<span className="text-lg">&nbsp;MW</span></p>
                    <p className="text-sm text-gray-500">Bidirectional power transfer</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Anchor className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Cable Length</p>
                    <p className="text-4xl font-bold text-sky-600 mb-1">~1,208<span className="text-lg">&nbsp;km</span></p>
                    <p className="text-sm text-gray-500">Submarine HVDC cable</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">Connections</p>
                    <p className="text-4xl font-bold text-cyan-600 mb-1">3</p>
                    <p className="text-sm text-gray-500">Cyprus &bull; Crete &bull; Israel</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  <Globe className="inline w-5 h-5 mr-2" />
                  Why It Matters
                </p>
                <p className="text-gray-700">
                  Today, every MWh of electricity consumed in Cyprus must be generated in Cyprus.
                  There is no import or export capability. When solar production exceeds demand,
                  the grid operator (TSOC) has no choice but to curtail renewable generators &mdash;
                  ordering parks to reduce or stop production. The interconnector creates an alternative:
                  export excess solar to Greece or Israel instead of wasting it.
                </p>
              </div>
            </div>

            {/* Section 2: What Interconnection Changes for Solar */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What Interconnection Changes for Solar</h2>
              <p className="text-lg text-gray-700 mb-4">
                The most immediate impact of the EuroAsia Interconnector on Cyprus&apos;s solar
                sector is the reduction of curtailment. Today, approximately 47% of solar production
                from utility-scale parks is curtailed during peak irradiance hours. This wasted energy
                represents hundreds of millions of euros in lost revenue across the industry.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                With a 2,000&nbsp;MW export pathway to Greece and Israel, excess solar production can
                be sold into European wholesale markets instead of being discarded. But the impact on
                curtailment will not be binary.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-green-900">What Improves</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Curtailment decreases significantly &mdash; excess solar can be exported</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Solar parks earn more revenue from their existing capacity</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Access to European wholesale price levels (potentially higher than domestic)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Investment climate improves as curtailment risk decreases for new projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-amber-900">What Doesn&apos;t Change</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Curtailment won&apos;t drop to zero &mdash; cable capacity is finite</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Transmission costs (wheeling charges) apply to exports</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Grid congestion at the Cyprus converter station may limit flows</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Export depends on price differential &mdash; sometimes domestic is better</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: What Interconnection Changes for BESS */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Battery className="inline w-8 h-8 mr-2 text-blue-600" />
                What Interconnection Changes for BESS
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                For BESS investors, the interconnector doesn&apos;t eliminate the investment case
                &mdash; it transforms it. Some revenue streams shrink while others expand, and
                entirely new opportunities emerge. The net effect depends on timing and market
                positioning.
              </p>

              <div className="space-y-6 mb-8">
                <Card className="border-l-4 border-red-400">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Curtailment Recovery &mdash; Decreases
                        </h3>
                        <p className="text-gray-700 text-sm mb-2">
                          As curtailment drops, the volume of free energy available for BESS charging
                          decreases. This is the primary revenue stream today, and it will shrink
                          post-interconnector. However, curtailment won&apos;t vanish entirely &mdash;
                          cable congestion and transmission costs mean some local curtailment will persist,
                          particularly during peak summer solar hours.
                        </p>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Revenue Decreases</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-400">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Arbitrage &mdash; Expands Significantly
                        </h3>
                        <p className="text-gray-700 text-sm mb-2">
                          International price spreads between Cyprus, Greece, and Israel create new
                          arbitrage opportunities. When Greek prices spike (winter evenings, cold snaps),
                          Cyprus-based BESS can charge from local solar and discharge into a higher-priced
                          export market. The cross-border spread is likely to be larger and more volatile
                          than the domestic spread alone, creating premium arbitrage windows.
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Revenue Expands</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-400">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Grid Services &mdash; Increases
                        </h3>
                        <p className="text-gray-700 text-sm mb-2">
                          Cross-border power flows require fast-response balancing assets at both ends of
                          the cable. BESS is uniquely suited for frequency regulation and voltage support
                          at the Cyprus converter station. As the grid transitions from isolated to
                          interconnected operation, the demand for ancillary services increases substantially.
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Revenue Increases</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-400">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plug2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Congestion Management &mdash; New Revenue Stream
                        </h3>
                        <p className="text-gray-700 text-sm mb-2">
                          When the cable reaches capacity, BESS located near the Cyprus converter station
                          can provide congestion relief &mdash; absorbing excess power that cannot be
                          exported and releasing it during off-peak cable utilisation periods. This is an
                          entirely new revenue stream that doesn&apos;t exist today and emerges only
                          because of the interconnector.
                        </p>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New Revenue Stream</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: Revenue Impact Analysis */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-indigo-600 text-white">Revenue Analysis</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Revenue Impact: Before vs After Interconnector
                </h2>
                <p className="text-lg text-gray-600">
                  How the BESS revenue model shifts for a 5&nbsp;MW / 20&nbsp;MWh system deployed today.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="border-2 border-amber-300 bg-white">
                  <CardHeader className="bg-amber-50">
                    <CardTitle className="text-amber-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Before Interconnector (2026&ndash;2029)
                    </CardTitle>
                    <CardDescription>Revenue driven by curtailment recovery</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Curtailment recovery</span>
                          <span className="font-bold text-green-600">~&euro;400K/yr</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Domestic arbitrage</span>
                          <span className="font-bold text-gray-400">Pending legislation</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gray-300 h-3 rounded-full" style={{ width: '0%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Grid services</span>
                          <span className="font-bold text-gray-400">Market developing</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gray-300 h-3 rounded-full" style={{ width: '0%' }} />
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Estimated total</span>
                        <span className="text-2xl font-bold text-amber-600">~&euro;400K/yr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-300 bg-white">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-900 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      After Interconnector (2030+)
                    </CardTitle>
                    <CardDescription>Revenue shifts to diversified streams</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Curtailment recovery</span>
                          <span className="font-bold text-yellow-600">~&euro;150&ndash;200K/yr</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Cross-border arbitrage</span>
                          <span className="font-bold text-blue-600">~&euro;120&ndash;200K/yr</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Grid services &amp; congestion</span>
                          <span className="font-bold text-purple-600">~&euro;80&ndash;150K/yr</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '30%' }} />
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Estimated total</span>
                        <span className="text-2xl font-bold text-blue-600">&euro;350&ndash;550K/yr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-indigo-200">
                <h3 className="text-lg font-semibold mb-3 text-center">Key Insight</h3>
                <p className="text-gray-700 text-center">
                  Total BESS revenue may <strong>stay stable or increase</strong> post-interconnector,
                  even as curtailment revenue decreases. New arbitrage and grid services streams
                  compensate for the curtailment reduction. The revenue model doesn&apos;t disappear
                  &mdash; it diversifies.
                </p>
              </div>
            </div>

            {/* Section 5: The Early Mover Advantage */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <TrendingUp className="inline w-8 h-8 mr-2 text-green-600" />
                The Early Mover Advantage
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Deploying BESS now &mdash; before the interconnector becomes operational &mdash;
                creates a compounding advantage that late entrants cannot replicate.
              </p>

              <div className="space-y-6 mb-8">
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">1</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                          3&ndash;4 Years of Maximum Curtailment Revenue
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Between now and 2029&ndash;2030, curtailment remains at peak levels (~47%
                          average). Every year of BESS operation during this period earns at the
                          highest possible curtailment recovery rate &mdash; approximately &euro;400K/year
                          for a 5&nbsp;MW / 20&nbsp;MWh system. Investors who deploy in 2026 capture
                          3&ndash;4 years of this premium revenue before the interconnector dilutes it.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">2</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                          CAPEX Recovered Before Revenue Model Shifts
                        </h3>
                        <p className="text-gray-700 text-sm">
                          At ~&euro;400K/year curtailment recovery revenue, a 5&nbsp;MW / 20&nbsp;MWh
                          system deployed in 2026 recovers a significant portion of its CAPEX by 2029.
                          By the time the interconnector reduces curtailment revenue, the system is
                          already well into its payback period &mdash; and the transition to diversified
                          revenue streams (arbitrage, grid services) begins from a position of financial strength.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">3</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                          First-Mover Position in Grid Services Market
                        </h3>
                        <p className="text-gray-700 text-sm">
                          When the interconnector creates demand for fast-response grid services at the
                          Cyprus converter station, operators with established BESS installations and
                          proven operational track records will be first in line for service contracts.
                          New entrants entering the market post-2030 will face competition from
                          incumbents with years of performance data.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">4</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                          Operational Track Record When Others Arrive
                        </h3>
                        <p className="text-gray-700 text-sm">
                          By 2030, early movers will have 3&ndash;4 years of real operational data:
                          degradation curves, revenue performance, maintenance records, and EMS
                          optimisation history. This data is bankable &mdash; it supports refinancing,
                          portfolio expansion, and competitive positioning against new entrants who
                          can only offer projections.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-green-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  The Compounding Effect
                </p>
                <p className="text-gray-700">
                  Early deployment doesn&apos;t just mean earlier revenue &mdash; it means
                  <strong> better revenue</strong> in the pre-interconnector period, <strong>lower risk</strong> in
                  the transition period (because CAPEX is already recovering), and <strong>competitive
                  advantage</strong> in the post-interconnector market. Waiting for the interconnector
                  to deploy BESS means missing the highest-revenue window entirely.
                </p>
              </div>
            </div>

            {/* Section 6: Timeline Uncertainty */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Clock className="inline w-8 h-8 mr-2 text-amber-600" />
                Timeline Uncertainty
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The EuroAsia Interconnector has faced repeated delays. The original target for
                completion was 2025, subsequently revised to 2027, and currently expected for
                2029&ndash;2030. Submarine cable projects of this scale and complexity frequently
                encounter delays from permitting, procurement, seabed survey complications, and
                geopolitical factors.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                For BESS investors, this uncertainty reinforces the case for immediate deployment
                rather than waiting.
              </p>

              <div className="overflow-x-auto rounded-xl border mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-amber-100 to-yellow-100">
                      <th className="text-left p-4 font-semibold text-gray-900">Scenario</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Interconnector Timeline</th>
                      <th className="text-left p-4 font-semibold text-gray-900">BESS Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium text-gray-900">On Schedule</td>
                      <td className="p-4 text-gray-700">Operational 2029&ndash;2030</td>
                      <td className="p-4 text-gray-700">
                        3&ndash;4 years of maximum curtailment revenue, then transition to diversified
                        revenue model
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Delayed (Likely)</td>
                      <td className="p-4 text-gray-700">Operational 2031&ndash;2033</td>
                      <td className="p-4 text-gray-700">
                        5&ndash;7 years of premium curtailment revenue &mdash; CAPEX fully recovered
                        before revenue model shifts
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Significantly Delayed</td>
                      <td className="p-4 text-gray-700">Operational 2034+</td>
                      <td className="p-4 text-gray-700">
                        BESS investment fully amortised under high-curtailment revenue; post-interconnector
                        revenue is pure upside
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <p className="text-lg font-semibold text-red-900 mb-2">
                    <AlertTriangle className="inline w-5 h-5 mr-2" />
                    The Risk of Waiting
                  </p>
                  <p className="text-gray-700 text-sm">
                    Investors who wait for the interconnector to deploy BESS face a double risk: if
                    the cable arrives on time, they missed 3&ndash;4 years of premium curtailment
                    revenue. If the cable is delayed, they missed even more. Either way, the
                    curtailment problem exists <strong>right now</strong> &mdash; every month without
                    BESS is wasted energy and lost revenue.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-lg font-semibold text-green-900 mb-2">
                    <CheckCircle className="inline w-5 h-5 mr-2" />
                    The Right Approach
                  </p>
                  <p className="text-gray-700 text-sm">
                    Invest based on today&apos;s economics &mdash; which are compelling on curtailment
                    recovery alone. Treat the interconnector and its associated revenue diversification
                    as <strong>upside</strong>, not as the base case. If the cable arrives, your revenue
                    model improves. If it doesn&apos;t, you&apos;re still earning premium returns
                    from curtailment recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Invest in BESS Before the Interconnector
              </h2>
              <p className="text-xl mb-6 opacity-90">
                The window for maximum curtailment recovery revenue is open now. Don&apos;t wait
                for a cable that may arrive in 2030 &mdash; or later. Deploy BESS today, earn
                premium returns, and position yourself for the diversified revenue landscape ahead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Invest in BESS Before the Interconnector
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/blog/island-grid-economics-cyprus-bess">
                    See Current BESS Economics
                    <ArrowRight className="w-4 h-4 ml-2" />
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
