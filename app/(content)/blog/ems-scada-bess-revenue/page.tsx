import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Cpu,
  Monitor,
  BarChart3,
  Zap,
  Battery,
  Settings,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Network,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'EMS and SCADA for BESS: Why Your Energy Management System Determines Your Revenue',
  description: 'The EMS is the brain of your BESS. We explain how real-time curtailment signal integration, SOC optimisation, and degradation management directly determine whether your battery earns €300K or €500K per year.',
  keywords: [
    'BESS EMS revenue optimization',
    'energy management system battery storage',
    'SCADA BESS integration',
    'BESS EMS software',
    'battery storage energy management',
    'BESS SOC optimization',
    'curtailment signal BESS',
    'BESS revenue maximization software',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'EMS and SCADA for BESS: Why Your Energy Management System Determines Your Revenue',
  description: 'The EMS is the brain of your BESS. We explain how real-time curtailment signal integration, SOC optimisation, and degradation management directly determine whether your battery earns €300K or €500K per year.',
  datePublished: '2025-11-04',
  dateModified: '2025-11-04',
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
    '@id': 'https://solarfarms.cy/blog/ems-scada-bess-revenue',
  },
}

export default function EMSSCADABESSRevenueArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-violet-600 text-white">
              Technology &mdash; June 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              EMS and SCADA for BESS
              <span className="block gradient-text mt-2">
                Why Your Energy Management System Determines Your Revenue
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              The hardware is identical. The battery cells, inverters, and containers are the same.
              Yet one BESS earns €500K per year while another earns €300K. The difference? The Energy
              Management System &mdash; making thousands of real-time decisions every day about when to
              charge, when to discharge, and how hard to push the cells.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>November 4, 2025</span>
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

            {/* Section 1: The Brain of Your BESS */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-violet-600" />
                The Brain of Your BESS
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A Battery Energy Storage System is only as smart as the software controlling it. The
                Energy Management System (EMS) sits at the centre of every operational decision your BESS
                makes: when to absorb curtailed solar, when to hold energy in reserve, when to dispatch to
                the grid, and how aggressively to cycle the cells.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Think of it this way: buying a BESS without a capable EMS is like buying a Formula 1 car
                and handing the keys to someone who learned to drive last week. The engine is identical,
                but the results will be dramatically different.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In the Cyprus market &mdash; where curtailment patterns shift daily, evening peak prices
                fluctuate between €140 and €220/MWh, and grid compliance rules are still evolving &mdash;
                the EMS is the single largest controllable variable in your BESS revenue equation. A
                well-configured EMS can generate <strong>20&ndash;40% more revenue</strong> from the exact
                same hardware compared to a basic or poorly tuned system.
              </p>

              <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-violet-900 mb-2">
                  <Cpu className="inline w-5 h-5 mr-2" />
                  The revenue gap is real and measurable
                </p>
                <p className="text-gray-700">
                  For a 5MW/20MWh BESS system in Cyprus, the difference between a basic EMS running
                  fixed schedules and an advanced EMS with real-time optimisation is approximately
                  <strong> €60&ndash;80K per year</strong> in additional revenue &mdash; purely from
                  smarter software decisions, with zero additional hardware cost.
                </p>
              </div>
            </div>

            {/* Section 2: What a BESS EMS Actually Does */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600" />
                What a BESS EMS Actually Does
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                A modern BESS EMS performs five core functions simultaneously, balancing revenue
                maximisation against battery longevity and grid compliance. Each function directly
                impacts your bottom line.
              </p>

              <div className="space-y-6 mb-8">
                {/* Function 1: Curtailment Signal Integration */}
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">1. Curtailment Signal Integration</h3>
                        <p className="text-gray-700 mb-3">
                          The EMS connects directly to the TSOC&apos;s curtailment dispatch system. When
                          the grid operator sends a curtailment command &mdash; reducing your PV output from
                          100% to, say, 40% &mdash; the EMS automatically diverts the remaining 60% into the
                          battery instead of wasting it.
                        </p>
                        <div className="bg-white rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 text-center text-sm">
                            <div>
                              <div className="font-bold text-red-600">Without EMS</div>
                              <div className="text-gray-600">60% energy wasted</div>
                            </div>
                            <div>
                              <div className="font-bold text-amber-600">Basic EMS</div>
                              <div className="text-gray-600">Manual response, 5-15 min delay</div>
                            </div>
                            <div>
                              <div className="font-bold text-green-600">Advanced EMS</div>
                              <div className="text-gray-600">Sub-second diversion to battery</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Function 2: SOC Optimization */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Battery className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">2. SOC Optimisation</h3>
                        <p className="text-gray-700 mb-3">
                          State of Charge management is where revenue is won or lost. The EMS must balance
                          having enough capacity to absorb the next curtailment event against having enough
                          stored energy to maximise evening discharge revenue.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Predictive SOC targeting based on weather forecasts and historical curtailment patterns</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Dynamic adjustment throughout the day as actual production diverges from forecast</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Evening discharge scheduling optimised for peak price windows (17:00&ndash;21:00)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Function 3: Degradation Management */}
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">3. Degradation Management</h3>
                        <p className="text-gray-700 mb-3">
                          Every charge-discharge cycle ages the battery. An aggressive EMS that squeezes
                          maximum revenue today may destroy the battery by year 8 instead of year 15. A
                          well-tuned EMS balances short-term revenue against long-term asset value.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="font-bold text-gray-700 mb-1">Depth of Discharge</div>
                            <div className="text-gray-600">Limits DoD to 90% to reduce cell stress</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="font-bold text-gray-700 mb-1">Cycling Rate</div>
                            <div className="text-gray-600">Caps at 1&ndash;1.5 cycles/day for LFP longevity</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="font-bold text-gray-700 mb-1">Target SOH</div>
                            <div className="text-gray-600">&ge;70% State of Health at year 15</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Function 4: Price Signal Response */}
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">4. Price Signal Response</h3>
                        <p className="text-gray-700 mb-3">
                          When Day-Ahead Market (DAM) access legislation arrives &mdash; enabling BESS
                          to charge from the grid, not just co-located solar &mdash; the EMS becomes a
                          trading engine. It will buy electricity at midday lows (€77&ndash;101/MWh) and
                          sell at evening peaks (€183+/MWh), capturing the spread automatically.
                        </p>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Midday buy price:</span>
                            <span className="font-semibold text-amber-700">€77&ndash;101/MWh</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Evening sell price:</span>
                            <span className="font-semibold text-blue-700">€183/MWh average</span>
                          </div>
                          <div className="flex justify-between text-sm border-t pt-2 font-bold text-green-700">
                            <span>Net arbitrage spread (after RTE):</span>
                            <span>~€72/MWh per cycle</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Function 5: Grid Compliance */}
                <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Network className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">5. Grid Compliance</h3>
                        <p className="text-gray-700 mb-3">
                          Every BESS connected to the Cyprus grid must comply with EN 50549-2 grid code
                          requirements. The EMS handles this automatically &mdash; managing frequency
                          response, voltage regulation, ramp rate limits, and power factor correction
                          without manual intervention.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Automatic frequency droop response within 200ms</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Reactive power compensation for voltage support</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Anti-islanding protection and fault ride-through capability</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Local SCADA vs Global SCADA */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Monitor className="w-8 h-8 text-blue-600" />
                Local SCADA vs Global SCADA
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                SCADA (Supervisory Control and Data Acquisition) is the monitoring and control layer
                that sits alongside the EMS. For multi-park portfolios like Lighthief&apos;s 51-park
                deployment, there are two distinct SCADA tiers &mdash; and both are essential.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Local SCADA</CardTitle>
                    <CardDescription>Per-park monitoring and control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700 mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Individual battery rack monitoring (voltage, temperature, current per cell)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Inverter performance tracking and fault detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Local fire suppression and HVAC integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>Real-time SOC, SOH, and throughput dashboards</span>
                      </li>
                    </ul>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-blue-800 mb-1">Investment</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Basic (&le;8 MWh systems):</span>
                        <span className="font-semibold">€15,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Advanced (&ge;10 MWh systems):</span>
                        <span className="font-semibold">€30,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                      <Network className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Global SCADA</CardTitle>
                    <CardDescription>Portfolio-level visibility and optimisation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700 mb-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Aggregated data from all parks in a single dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Cross-park performance benchmarking and anomaly detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Fleet-wide firmware updates and configuration management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Centralised alarm management and dispatch coordination</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm font-semibold text-purple-800 mb-1">Investment</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per group deployment:</span>
                        <span className="font-semibold">€60,000</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Covers all parks within a client group</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  <Network className="inline w-5 h-5 mr-2" />
                  Why multi-park portfolios need both tiers
                </p>
                <p className="text-gray-700">
                  Local SCADA ensures each individual BESS operates safely and efficiently. Global SCADA
                  enables portfolio-level insights that no single-park view can provide &mdash; identifying
                  underperforming sites, optimising maintenance schedules across the fleet, and providing
                  investors with consolidated performance reporting. For a portfolio like Lighthief&apos;s
                  51-park deployment, fleet-level visibility is not optional; it&apos;s essential for
                  operational excellence.
                </p>
              </div>
            </div>

            {/* Section 4: Our EMS Choice: Voltus */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                Our EMS Choice: Voltus
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                After evaluating multiple EMS providers, Lighthief selected Voltus as the EMS and SCADA
                platform for our entire 51-park BESS portfolio. The decision was driven by five critical
                factors specific to the Cyprus market.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Native Curtailment Signal Integration</h4>
                          <p className="text-sm text-gray-700">
                            Voltus connects directly to TSOC&apos;s dispatch infrastructure, reading
                            curtailment commands in real time and diverting energy to the battery within
                            milliseconds &mdash; not minutes.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Proven on Island Grids</h4>
                          <p className="text-sm text-gray-700">
                            Voltus has operational experience on isolated island grids with characteristics
                            similar to Cyprus &mdash; limited interconnection, high solar penetration, and
                            volatile frequency dynamics.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">LFP-Tuned Algorithms</h4>
                          <p className="text-sm text-gray-700">
                            SOC and degradation management algorithms specifically calibrated for LFP
                            (Lithium Iron Phosphate) chemistry, targeting &ge;70% SOH at year 15 with
                            optimal cycling profiles.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Remote Monitoring &amp; Updates</h4>
                          <p className="text-sm text-gray-700">
                            Cloud-based monitoring with remote firmware updates, configuration changes,
                            and diagnostics. No truck rolls needed for software optimisation &mdash;
                            critical when managing 51 distributed sites.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Multi-Revenue Stacking</h4>
                          <p className="text-sm text-gray-700">
                            When DAM arbitrage and ancillary services markets open in Cyprus, Voltus is
                            pre-configured to layer multiple revenue streams &mdash; curtailment recovery,
                            energy arbitrage, and frequency response &mdash; simultaneously.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-green-800 mb-2">
                          Total EMS/SCADA Investment
                        </div>
                        <div className="text-3xl font-bold text-green-700 mb-1">€3.99M</div>
                        <div className="text-sm text-gray-600">Across 51 parks in our portfolio</div>
                        <div className="text-xs text-gray-400 mt-2">
                          Includes local SCADA, global SCADA, EMS licensing, and integration
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Section 5: EMS vs No EMS — The Revenue Difference */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-3xl font-heading font-bold mb-2 text-center">
                EMS vs No EMS: The Revenue Difference
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Same 5MW/20MWh BESS hardware. Same curtailment profile. Different software.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-red-200 bg-white">
                  <CardHeader className="pb-3">
                    <Badge className="mb-2 bg-red-600 text-white w-fit">Not Recommended</Badge>
                    <CardTitle className="text-lg">Without EMS</CardTitle>
                    <CardDescription>Manual operation, no automation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>&bull; Manual charge/discharge by operator</li>
                      <li>&bull; Missed curtailment windows (minutes of delay)</li>
                      <li>&bull; Fixed discharge schedules, no price optimisation</li>
                      <li>&bull; No degradation management &mdash; battery ages faster</li>
                      <li>&bull; No remote monitoring or alerts</li>
                    </ul>
                    <div className="bg-red-50 rounded-lg p-4 text-center mt-4">
                      <div className="text-sm text-gray-600 mb-1">Revenue Capture</div>
                      <div className="text-3xl font-bold text-red-600">60&ndash;70%</div>
                      <div className="text-sm text-gray-500">of theoretical maximum</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">Estimated annual revenue</div>
                      <div className="text-lg font-bold text-gray-800">~€243&ndash;284K</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-white">
                  <CardHeader className="pb-3">
                    <Badge className="mb-2 bg-amber-600 text-white w-fit">Acceptable</Badge>
                    <CardTitle className="text-lg">Basic EMS</CardTitle>
                    <CardDescription>Automated curtailment response, fixed schedules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>&bull; Automated curtailment signal response</li>
                      <li>&bull; Fixed time-based discharge schedules</li>
                      <li>&bull; Basic SOC management with safety limits</li>
                      <li>&bull; Standard degradation protection</li>
                      <li>&bull; Basic remote monitoring dashboards</li>
                    </ul>
                    <div className="bg-amber-50 rounded-lg p-4 text-center mt-4">
                      <div className="text-sm text-gray-600 mb-1">Revenue Capture</div>
                      <div className="text-3xl font-bold text-amber-600">80&ndash;85%</div>
                      <div className="text-sm text-gray-500">of theoretical maximum</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">Estimated annual revenue</div>
                      <div className="text-lg font-bold text-gray-800">~€324&ndash;344K</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-500 bg-white">
                  <CardHeader className="pb-3">
                    <Badge className="mb-2 bg-green-600 text-white w-fit">Recommended</Badge>
                    <CardTitle className="text-lg">Advanced EMS</CardTitle>
                    <CardDescription>Real-time optimisation, predictive algorithms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>&bull; Sub-second curtailment response</li>
                      <li>&bull; Predictive dispatch based on price forecasts</li>
                      <li>&bull; Dynamic SOC targeting with weather integration</li>
                      <li>&bull; AI-driven degradation optimisation</li>
                      <li>&bull; Multi-revenue stream stacking</li>
                    </ul>
                    <div className="bg-green-50 rounded-lg p-4 text-center mt-4">
                      <div className="text-sm text-gray-600 mb-1">Revenue Capture</div>
                      <div className="text-3xl font-bold text-green-600">95&ndash;100%</div>
                      <div className="text-sm text-gray-500">of theoretical maximum</div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">Estimated annual revenue</div>
                      <div className="text-lg font-bold text-green-700">~€385&ndash;405K</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-center">The EMS Revenue Premium</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      Basic &rarr; Advanced Upgrade
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">+€60&ndash;80K/yr</div>
                    <p className="text-sm text-gray-700">
                      Additional revenue from the same hardware, purely through smarter software.
                      Over 15 years, that&apos;s <strong>€900K&ndash;1.2M</strong> in cumulative
                      additional income.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                      No EMS &rarr; Advanced Upgrade
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">+€120&ndash;160K/yr</div>
                    <p className="text-sm text-gray-700">
                      The cost of operating without proper EMS. Over 15 years, manual operation
                      leaves <strong>€1.8&ndash;2.4M on the table</strong> compared to an advanced
                      EMS.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: What to Look For in a BESS EMS */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
                What to Look For in a BESS EMS
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Whether you&apos;re evaluating EMS providers for a new project or considering an upgrade
                to an existing system, here is a practical buyer&apos;s checklist based on our experience
                deploying across 51 parks.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-500" />
                      Must-Have Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Real-time curtailment integration:</strong> Sub-second response to TSO dispatch signals, not polling-based with minute-level delays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Dynamic SOC management:</strong> Predictive algorithms that adjust targets based on weather, curtailment forecasts, and price signals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Degradation-aware cycling:</strong> Battery health management that balances revenue against longevity, targeting contractual SOH guarantees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>EN 50549-2 compliance:</strong> Grid code conformance built into the control logic, not bolted on as an afterthought</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Remote management:</strong> Cloud-based monitoring, firmware updates, and configuration changes without site visits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      Differentiating Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Multi-revenue stacking:</strong> Ability to layer curtailment recovery, energy arbitrage, and ancillary services simultaneously</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Weather-integrated forecasting:</strong> Solar production and curtailment predictions that improve SOC pre-positioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Portfolio-level optimisation:</strong> Global SCADA that benchmarks and coordinates across multiple parks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>API ecosystem:</strong> Open APIs for integration with third-party monitoring, trading platforms, and reporting tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Chemistry-specific tuning:</strong> Algorithms optimised for your specific cell chemistry (LFP, NMC) rather than generic profiles</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-lg mb-4">Red Flags When Evaluating EMS Vendors</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">&times;</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Fixed-schedule-only discharge</strong> &mdash; means the EMS cannot adapt to
                      changing prices or curtailment patterns in real time
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">&times;</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>No remote update capability</strong> &mdash; every configuration change
                      requires an on-site technician, costing time and money
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">&times;</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Single-vendor lock-in</strong> &mdash; EMS that only works with one battery
                      manufacturer limits your procurement options and negotiating leverage
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">&times;</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>No degradation modelling</strong> &mdash; cycling your battery without
                      health-aware algorithms can void warranties and reduce asset life by 3&ndash;5 years
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-indigo-900 mb-2">
                  <Cpu className="inline w-5 h-5 mr-2" />
                  Bottom line: the EMS is not an optional add-on
                </p>
                <p className="text-gray-700">
                  Your EMS selection will determine 20&ndash;40% of your BESS project&apos;s lifetime
                  revenue. It deserves the same due diligence as your battery procurement, your EPC
                  selection, and your insurance coverage. A €50&ndash;80K investment in a premium EMS
                  generates €900K&ndash;1.2M in additional revenue over the project lifetime. That&apos;s
                  not a cost &mdash; it&apos;s the highest-ROI line item in your entire BESS budget.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Get the Right EMS for Your BESS Project
              </h2>
              <p className="text-xl mb-4 opacity-90">
                The difference between a good and great EMS is hundreds of thousands of euros over your
                project&apos;s lifetime. We can help you choose, configure, and optimise the right system.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Lighthief has deployed Voltus EMS across 51 parks with 881 MWh of battery storage.
                We bring real-world operational experience to every EMS discussion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Cpu className="w-5 h-5 mr-2" />
                    Discuss EMS Options for Your BESS Project
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/energy-storage">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Explore Our Technology Stack
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
