import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Zap,
  Battery,
  ArrowRight,
  CheckCircle,
  XCircle,
  Settings,
  CircuitBoard,
  Sun,
  BarChart3,
  Shield,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'DC-Coupled vs AC-Coupled BESS: Which Architecture Maximises Revenue for Existing PV Parks?',
  description:
    'Retrofitting BESS onto an existing solar park? The coupling architecture — DC or AC — affects your curtailment capture efficiency, inverter compatibility, and total cost. We analyse both options for Cyprus PV parks.',
  keywords: [
    'DC coupled AC coupled BESS',
    'BESS retrofit solar farm',
    'BESS coupling architecture',
    'AC coupled battery storage',
    'DC coupled solar storage',
    'BESS retrofit PV park',
    'solar storage coupling comparison',
    'BESS architecture decision',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'DC-Coupled vs AC-Coupled BESS: Which Architecture Maximises Revenue for Existing PV Parks?',
  description:
    'Retrofitting BESS onto an existing solar park? The coupling architecture — DC or AC — affects your curtailment capture efficiency, inverter compatibility, and total cost. We analyse both options for Cyprus PV parks.',
  datePublished: '2026-09-28',
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
    '@id': 'https://solarfarms.cy/blog/dc-coupled-vs-ac-coupled-bess',
  },
}

export default function DCvsACCoupledBESSArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-orange-600 text-white">
              Technology &mdash; September 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              DC-Coupled vs AC-Coupled BESS
              <span className="block gradient-text mt-2">
                Which Architecture Maximises Revenue for Existing PV Parks?
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Adding battery storage to an operational solar park isn&apos;t just a procurement
              decision &mdash; it&apos;s an architecture decision. Where you connect the battery
              relative to the inverter determines your efficiency, installation complexity, and
              ultimately, your return on investment. Here&apos;s how to choose.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>September 28, 2026</span>
              <span>&bull;</span>
              <span>9 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Architecture Decision */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Architecture Decision</h2>
              <p className="text-lg text-gray-700 mb-4">
                When adding BESS to an existing photovoltaic park, you face a fundamental engineering
                choice: where does the battery connect within the electrical system? The answer defines
                two distinct architectures &mdash; <strong>DC-coupling</strong> and <strong>AC-coupling</strong>.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                In DC-coupling, the battery connects on the DC side of the solar inverter. The battery
                and the solar panels share the same inverter and DC bus. In AC-coupling, the battery
                has its own dedicated inverter (power conversion system) and connects on the AC side,
                independent of the existing solar infrastructure.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                For new-build projects where PV and BESS are designed together from scratch, either
                architecture can work well. But for <strong>retrofits</strong> &mdash; adding storage to
                parks that are already generating, already grid-connected, and already earning revenue
                &mdash; the choice has significant practical, financial, and regulatory implications.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-orange-900 mb-2">
                  <Settings className="inline w-5 h-5 mr-2" />
                  The Core Question
                </p>
                <p className="text-gray-700">
                  Do you modify your existing solar system to integrate a shared DC bus with the battery
                  (DC-coupled), or do you leave the existing system untouched and add the battery as an
                  independent AC-connected unit (AC-coupled)? For Cyprus&apos;s 51 operational PV parks,
                  the answer was clear &mdash; but the reasoning is worth understanding.
                </p>
              </div>
            </div>

            {/* Section 2: How DC-Coupling Works */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <CircuitBoard className="inline w-8 h-8 mr-2 text-amber-600" />
                How DC-Coupling Works
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In a DC-coupled configuration, the battery connects directly to the DC bus between the
                solar panels and the inverter. Energy flows through a single conversion path: solar DC
                power enters the shared bus, the battery charges and discharges via the same bus, and
                only one inverter handles the DC-to-AC conversion for grid export.
              </p>

              <Card className="mb-6 border-2 border-amber-200">
                <CardHeader className="bg-amber-50">
                  <CardTitle className="text-amber-900">DC-Coupled Energy Flow</CardTitle>
                  <CardDescription>Solar panels &rarr; DC bus &rarr; shared inverter &rarr; AC grid</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="text-center">
                        <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-700">Solar Panels</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <Zap className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-700">DC Bus</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <Settings className="w-8 h-8 text-orange-500 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-700">Shared Inverter</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 text-red-500 mx-auto mb-1" />
                        <span className="text-sm font-semibold text-gray-700">AC Grid</span>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
                        <Battery className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">Battery charges/discharges via DC bus</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Advantages
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Higher efficiency &mdash; one DC-AC conversion instead of two</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Captures curtailed energy <em>before</em> the inverter clips it</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Round-trip efficiency: 90&ndash;92%</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Fewer components &mdash; no separate battery inverter needed</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                        <XCircle className="w-5 h-5 mr-2 text-red-500" />
                        Disadvantages
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Requires compatible hybrid inverter or inverter upgrade</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Existing solar inverter may need full replacement</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>More complex installation &mdash; requires DC system modifications</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Solar system downtime during retrofit</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 3: How AC-Coupling Works */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Zap className="inline w-8 h-8 mr-2 text-blue-600" />
                How AC-Coupling Works
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In an AC-coupled configuration, the battery system is completely independent of the
                existing solar installation. The solar panels connect to their existing inverter as
                before. The battery has its own inverter (PCS &mdash; power conversion system) and
                connects to the AC side of the system, typically at the point of common coupling or
                the park&apos;s MV switchgear.
              </p>

              <Card className="mb-6 border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">AC-Coupled Energy Flow</CardTitle>
                  <CardDescription>Two independent systems sharing a grid connection point</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-r from-yellow-50 via-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-yellow-700 mb-3 text-center">Solar System (Existing)</h4>
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <Sun className="w-7 h-7 text-yellow-500 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Panels</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="text-center">
                            <Settings className="w-7 h-7 text-yellow-600 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Existing Inverter</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="text-center">
                            <BarChart3 className="w-7 h-7 text-yellow-700 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">AC Grid</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-blue-700 mb-3 text-center">Battery System (New)</h4>
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <Battery className="w-7 h-7 text-blue-500 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Battery</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="text-center">
                            <Settings className="w-7 h-7 text-blue-600 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">Battery PCS</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="text-center">
                            <BarChart3 className="w-7 h-7 text-blue-700 mx-auto mb-1" />
                            <span className="text-xs text-gray-600">AC Grid</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Advantages
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Uses existing inverter as-is &mdash; no modifications needed</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Simpler retrofit &mdash; minimal disruption to operating solar park</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Independent systems &mdash; battery issues don&apos;t affect solar production</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Easier to scale &mdash; add more battery containers independently</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Compatible with any existing inverter brand or configuration</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                        <XCircle className="w-5 h-5 mr-2 text-red-500" />
                        Disadvantages
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Two conversion stages (DC&rarr;AC&rarr;DC&rarr;AC) reduce efficiency</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Lower round-trip efficiency: 85&ndash;88%</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Cannot capture pre-inverter curtailment (clipping losses)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>Requires additional inverter hardware (PCS in container)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Comparison Table */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <BarChart3 className="inline w-8 h-8 mr-2 text-orange-600" />
                Head-to-Head Comparison
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The choice between DC and AC coupling involves trade-offs across multiple dimensions.
                Here&apos;s a detailed comparison of the metrics that matter for existing PV park
                retrofits in Cyprus.
              </p>

              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-100 to-amber-100">
                      <th className="text-left p-4 font-semibold text-gray-900">Metric</th>
                      <th className="text-left p-4 font-semibold text-amber-900">
                        <div className="flex items-center">
                          <CircuitBoard className="w-4 h-4 mr-2" />
                          DC-Coupled
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-blue-900">
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          AC-Coupled
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-900">Retrofit Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Round-Trip Efficiency</td>
                      <td className="p-4 text-amber-800 font-semibold">90&ndash;92%</td>
                      <td className="p-4 text-gray-700">85&ndash;88%</td>
                      <td className="p-4">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Curtailment Capture</td>
                      <td className="p-4 text-amber-800 font-semibold">Pre-clipping capture</td>
                      <td className="p-4 text-gray-700">Post-inverter only</td>
                      <td className="p-4">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Inverter Requirements</td>
                      <td className="p-4 text-gray-700">Needs hybrid/compatible inverter</td>
                      <td className="p-4 text-blue-800 font-semibold">Uses existing inverter as-is</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Retrofit Complexity</td>
                      <td className="p-4 text-gray-700">High &mdash; DC system modifications</td>
                      <td className="p-4 text-blue-800 font-semibold">Low &mdash; independent connection</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Installation Cost</td>
                      <td className="p-4 text-gray-700">Higher (inverter replacement + rewiring)</td>
                      <td className="p-4 text-blue-800 font-semibold">Lower (plug-and-play container)</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Solar System Downtime</td>
                      <td className="p-4 text-gray-700">Days to weeks during retrofit</td>
                      <td className="p-4 text-blue-800 font-semibold">Minimal &mdash; hours for AC tie-in</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">System Independence</td>
                      <td className="p-4 text-gray-700">Coupled &mdash; shared failure modes</td>
                      <td className="p-4 text-blue-800 font-semibold">Independent &mdash; isolated failure modes</td>
                      <td className="p-4">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Scalability</td>
                      <td className="p-4 text-gray-700">Limited by shared inverter capacity</td>
                      <td className="p-4 text-blue-800 font-semibold">Modular &mdash; add containers freely</td>
                      <td className="p-4">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Grid Metering Compliance</td>
                      <td className="p-4 text-gray-700">Complex &mdash; shared metering point</td>
                      <td className="p-4 text-blue-800 font-semibold">Simple &mdash; separate metering</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mt-6">
                <p className="text-lg font-semibold text-orange-900 mb-2">
                  <BarChart3 className="inline w-5 h-5 mr-2" />
                  Reading the Table
                </p>
                <p className="text-gray-700">
                  DC-coupling wins on efficiency (2&ndash;4% higher RTE). AC-coupling wins on
                  everything else that matters for a retrofit: cost, complexity, downtime, independence,
                  scalability, and regulatory compliance. For existing operational parks, the non-efficiency
                  factors dominate the decision.
                </p>
              </div>
            </div>

            {/* Section 5: Why We Use AC-Coupling in Cyprus */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-blue-600 text-white">Our Architecture Choice</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Why We Use AC-Coupling in Cyprus
                </h2>
                <p className="text-lg text-gray-600">
                  For the Lighthief portfolio &mdash; 51 parks, 881.78&nbsp;MWh, 251 containers &mdash;
                  AC-coupling is the standard. Here&apos;s why.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-white border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Existing Inverter Infrastructure</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      All 51 parks have operational inverters installed years ago. Replacing them for
                      DC-coupling would mean scrapping functional equipment, incurring unnecessary
                      capital expenditure, and creating weeks of solar production downtime per park.
                      AC-coupling leaves the existing inverter infrastructure completely untouched.
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">Zero inverter replacement cost</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Integrated PCS in Every Container</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Each Linyang container includes an integrated power conversion system (PCS), which
                      means the battery inverter is built into the container itself. The system arrives
                      as a complete, self-contained AC-ready unit &mdash; connect it to the park&apos;s
                      AC bus and it&apos;s operational. System-level RTE: 87.8%.
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">87.8% system-level round-trip efficiency</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Regulatory Compliance</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Cyprus Category&nbsp;B grid connection for BESS requires separate metering for
                      storage assets. AC-coupling inherently provides this separation &mdash; the battery
                      system has its own connection point with independent metering. DC-coupled systems
                      require additional metering infrastructure to achieve the same regulatory compliance.
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">Category B metering compliance built-in</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Reduced EPC Risk &amp; Timeline</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      AC-coupling means the BESS installation doesn&apos;t touch the existing solar
                      system. Civil works, container placement, AC cabling, and transformer connection
                      proceed without affecting solar production. The EPC contractor doesn&apos;t need
                      to coordinate with the solar inverter manufacturer or manage DC system modifications.
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">Simpler installation, lower risk profile</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-semibold mb-4 text-center">The Efficiency Gap in Context</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center bg-amber-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">DC-Coupled RTE</div>
                    <div className="text-3xl font-bold text-amber-600">90&ndash;92%</div>
                    <div className="text-xs text-gray-500">Theoretical maximum</div>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">AC-Coupled RTE</div>
                    <div className="text-3xl font-bold text-blue-600">87.8%</div>
                    <div className="text-xs text-gray-500">Linyang system-level</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Efficiency Gap</div>
                    <div className="text-3xl font-bold text-green-600">2&ndash;4%</div>
                    <div className="text-xs text-gray-500">Offset by cost savings</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  The 2&ndash;4% efficiency gap represents approximately &euro;6,000&ndash;15,000/year
                  in lost revenue for a 5&nbsp;MW system &mdash; far less than the cost of inverter
                  replacement, extended installation time, and production downtime that DC-coupling would
                  require for a retrofit.
                </p>
              </div>
            </div>

            {/* Section 6: When DC-Coupling Makes Sense */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">When DC-Coupling Makes Sense</h2>
              <p className="text-lg text-gray-700 mb-6">
                AC-coupling is the right answer for retrofits, but DC-coupling has legitimate
                advantages in specific scenarios. It&apos;s worth understanding when the higher
                efficiency of DC-coupling justifies the additional complexity.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Sun className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">New Build Projects</h3>
                    <p className="text-gray-700 text-sm">
                      When PV and BESS are designed together from the outset, the inverter can be
                      specified as a hybrid unit from day one. No retrofit, no replacement, no downtime.
                      The shared DC bus is designed into the system architecture, maximising efficiency
                      without the complexity penalty.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Undersized Inverters</h3>
                    <p className="text-gray-700 text-sm">
                      Parks where the existing inverter is significantly undersized relative to PV
                      capacity experience substantial pre-clipping losses. DC-coupling captures this
                      energy before it&apos;s lost. If the inverter needs replacement anyway (due to
                      age or underperformance), the incremental cost of DC-coupling decreases
                      significantly.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Marginal Economics</h3>
                    <p className="text-gray-700 text-sm">
                      Projects where every percentage point of efficiency matters for financial viability
                      may justify DC-coupling&apos;s higher installation cost. If the business case is
                      borderline and the 2&ndash;4% efficiency gain tips the IRR above threshold,
                      DC-coupling can be the right choice despite higher complexity.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <CircuitBoard className="inline w-5 h-5 mr-2" />
                  A Practical Note
                </p>
                <p className="text-gray-700">
                  Even in these scenarios, DC-coupling requires careful inverter specification and
                  integration testing. The hybrid inverter market for utility-scale applications is less
                  mature than the standalone PCS market, and compatibility between different manufacturers&apos;
                  solar panels and battery modules adds engineering risk. For most projects, the proven
                  reliability of AC-coupled containerised BESS remains the lower-risk path.
                </p>
              </div>
            </div>

            {/* Section 7: What This Means for Your Retrofit */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What This Means for Your Retrofit</h2>
              <p className="text-lg text-gray-700 mb-6">
                If you own an existing PV park in Cyprus and you&apos;re planning a BESS retrofit,
                here&apos;s the practical guidance.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-lg text-green-900">Choose AC-Coupling If&hellip;</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Your park has existing, operational inverters</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You want to minimise solar production downtime during installation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You need separate metering for Category B grid compliance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You want system independence (battery issues don&apos;t affect solar)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You prefer proven containerised BESS with integrated PCS</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You want the lowest-risk installation path with fastest timeline</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <CircuitBoard className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-lg text-amber-900">Consider DC-Coupling If&hellip;</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <CircuitBoard className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>You&apos;re building a new PV + BESS project from scratch</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CircuitBoard className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Your existing inverter needs replacement anyway (age/failure)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CircuitBoard className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Pre-clipping losses are significant and quantified</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CircuitBoard className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>The project economics are marginal without maximum efficiency</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CircuitBoard className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>You have engineering resources for hybrid inverter integration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  <Battery className="inline w-5 h-5 mr-2" />
                  The Bottom Line
                </p>
                <p className="text-gray-700">
                  For the vast majority of existing Cyprus PV parks, AC-coupling is the clear winner.
                  The 2&ndash;4% efficiency advantage of DC-coupling does not justify the cost of inverter
                  replacement, the complexity of DC system modifications, the weeks of solar production
                  downtime, or the regulatory challenges of shared metering. Modern containerised BESS
                  units with integrated PCS (like the Linyang containers in our portfolio) are specifically
                  designed for AC-coupled retrofits &mdash; plug in, connect, commission.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Plan Your BESS Retrofit
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Whether your park is 1&nbsp;MW or 10&nbsp;MW, we can assess the optimal coupling
                architecture for your specific installation. Our engineering team has designed and
                commissioned AC-coupled BESS across 51 parks &mdash; we know what works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Plan Your BESS Retrofit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/energy-storage">
                    See Our BESS Technical Specs
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
