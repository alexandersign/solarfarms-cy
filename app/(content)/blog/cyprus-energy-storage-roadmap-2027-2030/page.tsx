import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  TrendingUp,
  CalendarDays,
  Globe,
  Battery,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Crosshair,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Cyprus Energy Storage Roadmap: What 2027-2030 Looks Like for BESS Investors',
  description:
    'From curtailment recovery to grid services, ancillary markets, and the EuroAsia Interconnector — we map out the BESS investment landscape in Cyprus through 2030 and what it means for early movers.',
  keywords: [
    'Cyprus BESS market forecast',
    'energy storage roadmap Cyprus',
    'BESS investment outlook',
    'Cyprus energy transition 2030',
    'BESS market forecast Europe',
    'Cyprus renewable energy targets',
    'BESS revenue forecast Cyprus',
    'energy storage growth Cyprus',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Cyprus Energy Storage Roadmap: What 2027-2030 Looks Like for BESS Investors',
  description:
    'From curtailment recovery to grid services, ancillary markets, and the EuroAsia Interconnector — we map out the BESS investment landscape in Cyprus through 2030 and what it means for early movers.',
  datePublished: '2025-08-05',
  dateModified: '2025-08-05',
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
    '@id': 'https://solarfarms.cy/blog/cyprus-energy-storage-roadmap-2027-2030',
  },
}

export default function CyprusEnergyStorageRoadmapArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-teal-600 text-white">
              Market Analysis &mdash; August 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              The Cyprus Energy Storage Roadmap
              <span className="block gradient-text mt-2">
                What 2027&ndash;2030 Looks Like for BESS Investors
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              From curtailment recovery to grid services, ancillary markets, and the EuroAsia
              Interconnector &mdash; we map out the BESS investment landscape in Cyprus through
              2030 and what it means for early movers.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>August 5, 2025</span>
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

            {/* Section 1: Where We Are Today */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Crosshair className="w-5 h-5 text-cyan-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Where We Are Today (2026)</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Cyprus sits at a remarkable inflection point. The island has approximately zero megawatts
                of operational grid-scale BESS &mdash; yet it has the EU&apos;s highest solar curtailment
                rate at 47%, the widest day-ahead price spreads in the Mediterranean, and a grid operator
                increasingly desperate for flexibility. Every condition for a storage boom is in place.
                The hardware simply hasn&apos;t arrived yet.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">The Problem</CardTitle>
                        <CardDescription>A grid at breaking point</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>47% curtailment rate &mdash; nearly half of solar generation wasted</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>No grid-scale BESS operational on the island</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>No ancillary services market for batteries</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>DAM access for BESS still under development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">The Opportunity</CardTitle>
                        <CardDescription>First-mover advantage</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Lighthief&apos;s 881&nbsp;MWh portfolio will be among the first</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>BESS equipment at historic low prices globally</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Curtailment recovery alone generates strong ROI</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Zero competition for grid services contracts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Battery className="inline w-5 h-5 mr-2 text-teal-600" />
                  <strong>The inflection point:</strong> Cyprus is the only EU member state with
                  over 40% solar curtailment and zero grid-scale battery storage. This gap won&apos;t
                  last. The question isn&apos;t whether BESS will arrive &mdash; it&apos;s who will
                  be operational when the market opens.
                </p>
              </div>
            </div>

            {/* Section 2: 2027 — The Infrastructure Year */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">2027: The Infrastructure Year</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                2027 marks the year BESS transitions from planning to reality in Cyprus. The first wave
                of grid-scale installations &mdash; including Lighthief&apos;s portfolio &mdash; will
                be commissioned, and the day-ahead market will begin to accommodate battery participation.
                This is the year when early investors start earning.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Battery className="w-4 h-4 text-blue-600" />
                      Commissioning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      First wave of BESS installations expected to be commissioned across Cyprus.
                      Lighthief&apos;s 51-park, 881&nbsp;MWh portfolio is planned to enter operation,
                      becoming one of the largest distributed storage fleets in the Mediterranean.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      DAM Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Day-ahead market arbitrage legislation expected to pass, enabling BESS to
                      buy electricity during low-price midday hours (&euro;77/MWh) and sell
                      during evening peaks (&euro;186/MWh).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Curtailment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Curtailment expected to stabilise around 45&ndash;50% as more solar capacity
                      continues to be installed. Recovery of curtailed energy remains the primary
                      revenue stream for BESS operators.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Zap className="inline w-5 h-5 mr-2 text-blue-500" />
                  <strong>Revenue model (2027):</strong> Curtailment recovery as the primary
                  revenue stream, with early arbitrage participation as DAM rules are finalised.
                  First-mover BESS operators will have the market essentially to themselves.
                </p>
              </div>
            </div>

            {/* Section 3: 2028 — Market Maturation */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">2028: Market Maturation</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                By 2028, Cyprus&apos;s energy storage market shifts from nascent to maturing. The
                ancillary services market opens, Frequency Containment Reserve (FCR) and automatic
                Frequency Restoration Reserve (aFRR) markets are established, and BESS operators
                can begin stacking multiple revenue streams for the first time.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Revenue Stacking Becomes Viable
                  </CardTitle>
                  <CardDescription>
                    Three concurrent revenue streams available to BESS operators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Stream 1</Badge>
                        Curtailment Recovery
                      </h4>
                      <p className="text-sm text-gray-700">
                        The foundational revenue stream. Capture curtailed solar energy that would
                        otherwise be wasted. Still contributes ~&euro;400K/yr for a 5&nbsp;MW /
                        20&nbsp;MWh system.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Stream 2</Badge>
                        DAM Arbitrage
                      </h4>
                      <p className="text-sm text-gray-700">
                        Buy low, sell high on the day-ahead market. The &euro;77&ndash;186/MWh
                        midday-to-evening spread creates substantial margin on every cycle.
                        Adds &euro;170&ndash;280K/yr.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Stream 3</Badge>
                        Grid Services
                      </h4>
                      <p className="text-sm text-gray-700">
                        FCR, aFRR, and other ancillary services. BESS responds to frequency
                        deviations in seconds &mdash; far faster than thermal plants. Premium
                        pricing expected. Adds &euro;250&ndash;600K/yr.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Second Wave Entrants</CardTitle>
                    <CardDescription>New investors enter the market</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      The demonstrated success of first-wave BESS installations triggers a second
                      wave of investment. New entrants arrive &mdash; but they face higher equipment
                      costs, longer permitting queues, and an increasingly competitive market for
                      grid service contracts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Standalone BESS Licensing</CardTitle>
                    <CardDescription>Regulatory evolution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Standalone BESS licensing expected &mdash; batteries no longer restricted
                      to co-located solar parks. This expands the addressable market but also
                      increases competition. Early co-located systems retain the advantage of
                      dual revenue (curtailment + grid services).
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: 2029-2030 — The Interconnector Era */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">2029&ndash;2030: The Interconnector Era</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                The EuroAsia Interconnector &mdash; a 2,000&nbsp;MW subsea cable connecting Cyprus
                to Crete and mainland Greece &mdash; is expected to become operational during this
                period. This fundamentally changes the energy landscape, but it doesn&apos;t
                diminish the BESS case. It transforms it.
              </p>

              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-600" />
                    What the Interconnector Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        What Improves
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>International arbitrage:</strong> Access to European wholesale
                            markets with cross-border price spreads
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Cross-border balancing:</strong> BESS can participate in pan-European
                            frequency regulation markets
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Energy export:</strong> Excess renewable generation can flow to
                            Greece, reducing waste
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Grid stability:</strong> Interconnection support reduces
                            frequency volatility
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-blue-600" />
                        What Shifts
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Curtailment decreases:</strong> Energy can be exported rather
                            than curtailed, reducing one revenue stream
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Revenue pivots:</strong> From curtailment recovery to arbitrage
                            (international price spreads) and grid services (cross-border balancing)
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Competition increases:</strong> More market participants,
                            but total addressable market also grows significantly
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Early investors benefit:</strong> 3+ years of revenue head start.
                            Systems already at or near payback by the time the market changes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <TrendingUp className="inline w-5 h-5 mr-2 text-amber-600" />
                  <strong>The key insight:</strong> Early BESS investors don&apos;t need the
                  interconnector. They earn strong returns from curtailment recovery alone during
                  2027&ndash;2028. By the time the interconnector arrives, their systems are
                  already paid off or close to payback &mdash; and they&apos;re positioned to
                  capture the new revenue streams it creates.
                </p>
              </div>
            </div>

            {/* Section 5: Revenue Evolution Timeline */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Revenue Evolution Timeline</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                The table below illustrates how revenue evolves for a typical 5&nbsp;MW / 20&nbsp;MWh
                BESS system installed in 2026&ndash;2027. Each phase adds new revenue streams while
                maintaining existing ones, creating a compounding effect over time.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-t-4 border-t-cyan-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">Phase 1</Badge>
                      <span className="text-sm text-gray-500">2026&ndash;2027</span>
                    </div>
                    <CardTitle className="text-xl mt-2">Curtailment Recovery</CardTitle>
                    <CardDescription>Foundation revenue stream</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-cyan-700 mb-3">
                      ~&euro;400K<span className="text-lg font-normal text-gray-500">/yr</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>Recover curtailed solar energy (47% curtailment rate)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>Store during midday curtailment, discharge at evening peak</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>No regulatory dependency &mdash; revenue begins at commissioning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Phase 2</Badge>
                      <span className="text-sm text-gray-500">2027&ndash;2028</span>
                    </div>
                    <CardTitle className="text-xl mt-2">+ DAM Arbitrage</CardTitle>
                    <CardDescription>Market participation begins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 mb-3">
                      ~&euro;570&ndash;680K<span className="text-lg font-normal text-gray-500">/yr</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Curtailment recovery continues as base revenue</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Day-ahead market arbitrage: buy at &euro;77/MWh, sell at &euro;186/MWh</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Dual cycling strategy maximises 4-hour battery capacity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Phase 3</Badge>
                      <span className="text-sm text-gray-500">2028&ndash;2030</span>
                    </div>
                    <CardTitle className="text-xl mt-2">+ Grid Services</CardTitle>
                    <CardDescription>Full revenue stacking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-700 mb-3">
                      ~&euro;820K&ndash;1.28M<span className="text-lg font-normal text-gray-500">/yr</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>FCR and aFRR ancillary service contracts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Capacity payments for peak demand reduction</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Premium pricing on isolated grid where alternatives are limited</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-amber-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Phase 4</Badge>
                      <span className="text-sm text-gray-500">Post-Interconnector</span>
                    </div>
                    <CardTitle className="text-xl mt-2">International Markets</CardTitle>
                    <CardDescription>Revenue transformation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-700 mb-3">
                      Revenue shifts<span className="text-lg font-normal text-gray-500"> &mdash; total may increase</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>International price spread arbitrage replaces curtailment</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Cross-border balancing markets open new revenue pools</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>Total addressable market grows with European market access</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  Compounding Revenue
                </p>
                <p className="text-gray-700">
                  A 5&nbsp;MW / 20&nbsp;MWh BESS system installed at ~&euro;2.26M in 2026&ndash;2027
                  earns back its full CAPEX within 4&ndash;5 years from curtailment recovery alone.
                  When arbitrage and grid services are added, the payback period compresses further,
                  and lifetime revenue over 15&ndash;20 years could exceed &euro;10M &mdash; a 4&ndash;5x
                  return on the initial investment.
                </p>
              </div>
            </div>

            {/* Section 6: What This Means for Early Movers */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Crosshair className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">What This Means for Early Movers</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                The 2026&ndash;2027 window represents a rare convergence of conditions that
                maximise returns for BESS investors. Equipment prices are at historic lows,
                curtailment is at historic highs, and competition is effectively zero.
                This combination will not last.
              </p>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    The Early-Mover Window
                  </CardTitle>
                  <CardDescription>
                    Why 2026&ndash;2027 investors capture maximum returns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Battery className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">Equipment Costs</h4>
                      <p className="text-sm text-gray-700">
                        Global BESS prices at historic lows due to manufacturing overcapacity
                        in China. LFP battery cells at &lt;&thinsp;US$50/kWh. This floor
                        won&apos;t hold as demand accelerates globally.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">Curtailment</h4>
                      <p className="text-sm text-gray-700">
                        47% curtailment rate means nearly half of every MWh generated by
                        your solar park is wasted. BESS captures this lost revenue
                        immediately &mdash; no legislation required.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Crosshair className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">Zero Competition</h4>
                      <p className="text-sm text-gray-700">
                        No other grid-scale BESS is operational in Cyprus. When grid service
                        contracts open, early operators will negotiate from a position of
                        scarcity &mdash; commanding premium pricing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Early Movers (2026&ndash;2027)</CardTitle>
                        <CardDescription>Maximum advantage</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Lowest equipment costs in BESS history</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Immediate curtailment recovery revenue from day one</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>First-mover access to grid service contracts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>3+ years of revenue before market becomes competitive</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Systems near payback when interconnector arrives</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Later Entrants (2029+)</CardTitle>
                        <CardDescription>Viable but reduced advantage</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>Higher equipment costs as global demand increases</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>More competition for grid service contracts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>Lower curtailment as interconnector reduces waste</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>Still viable business case, but longer payback period</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>International market access compensates partially</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 7: Risks and Uncertainties */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Risks and Uncertainties</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                No investment roadmap is complete without an honest assessment of what could
                go differently. We identify four key uncertainties &mdash; and explain why
                none of them eliminate the BESS investment case. They shift the timing and
                revenue mix, but the fundamental economics remain robust.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-amber-400">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5 text-amber-600" />
                      EuroAsia Interconnector Delays
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      The cable has been delayed multiple times. Further delays would actually
                      <em> benefit</em> early BESS investors by extending the high-curtailment
                      period and the window of zero competition for grid services.
                    </p>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      Impact: Extends early-mover advantage
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-400">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                      Regulatory Pace
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Ancillary service markets and DAM access could take longer than expected
                      to establish. However, curtailment recovery requires no regulatory change
                      &mdash; it works under current rules and provides the base-case return.
                    </p>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      Impact: Delays additional revenue, not base case
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-400">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Battery className="w-5 h-5 text-purple-600" />
                      Technology Evolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Solid-state batteries may reach commercial scale by 2030, offering higher
                      density and longer life. But today&apos;s LFP systems with 6,000+ cycle
                      warranties and 15&ndash;20 year lifespans will still be generating revenue
                      well into the 2040s.
                    </p>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">
                      Impact: Better tech doesn&apos;t void current investment
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-gray-400">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-gray-600" />
                      Economic Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Cyprus&apos;s economic performance, electricity demand growth, and energy
                      policy priorities could shift. Energy storage, however, is structural &mdash;
                      the grid needs flexibility regardless of economic cycles, and EU renewable
                      mandates provide regulatory certainty.
                    </p>
                    <Badge variant="outline" className="text-gray-700 border-gray-300">
                      Impact: Structural demand is cycle-resilient
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <AlertTriangle className="inline w-5 h-5 mr-2 text-amber-500" />
                  <strong>Our assessment:</strong> These risks affect the <em>trajectory</em> of
                  returns, not the <em>existence</em> of returns. A BESS investment in Cyprus earns
                  a strong return from curtailment recovery alone, even if every other market
                  development is delayed by two years. The roadmap scenarios above represent
                  the upside &mdash; and the upside is substantial.
                </p>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Data Sources &amp; Assumptions</h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>
                  Cyprus TSO (TSOC) &mdash; Historical curtailment data and grid capacity figures (2025&ndash;2026)
                </li>
                <li>
                  Lighthief operational data &mdash; 47% average curtailment from 5.01&nbsp;MW reference park
                </li>
                <li>
                  ENTSO-E &mdash; Ancillary service revenue benchmarks from EU balancing markets (Germany, Ireland, UK)
                </li>
                <li>
                  EuroAsia Interconnector project &mdash; Published timeline and capacity specifications (2,000&nbsp;MW)
                </li>
                <li>
                  Lighthief EPC Confirmed Adders v4 &mdash; Installed cost of ~&euro;113K/MWh (portfolio average), February 2026
                </li>
                <li>
                  Revenue projections use conservative assumptions: 95% availability, single daily cycle for arbitrage, 47% curtailment rate
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Position Your Investment for 2027&ndash;2030
              </h2>
              <p className="text-xl mb-6 opacity-90">
                The window for maximum BESS returns in Cyprus is open now. Equipment costs are
                at historic lows, curtailment is at historic highs, and competition is zero.
                Let us show you how to capture the full roadmap of revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/blog/peak-shaving-vs-energy-arbitrage-cyprus">
                    See Today&apos;s BESS Economics
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
