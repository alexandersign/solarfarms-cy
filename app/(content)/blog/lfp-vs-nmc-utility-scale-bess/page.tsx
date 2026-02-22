import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Battery,
  Shield,
  Flame,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Thermometer,
  Clock,
  Calculator,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'LFP vs NMC for Utility-Scale BESS: Why Chemistry Matters for Your 20-Year Investment',
  description:
    'We chose LFP (LiFePO4) for all 51 parks in our 881 MWh Cyprus portfolio. Here\u2019s why cycle life economics, fire safety, and insurance implications make LFP the clear winner for utility-scale BESS.',
  keywords: [
    'LFP vs NMC utility scale',
    'LFP battery solar farm',
    'BESS chemistry comparison investment',
    'LiFePO4 utility BESS',
    'NMC vs LFP cost',
    'battery chemistry solar storage',
    'LFP fire safety BESS',
    'LFP cycle life economics',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LFP vs NMC for Utility-Scale BESS: Why Chemistry Matters for Your 20-Year Investment',
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
  datePublished: '2026-01-27',
  image: 'https://solarfarms.cy/images/blog/lfp-vs-nmc-bess.jpg',
  description:
    'We chose LFP (LiFePO4) for all 51 parks in our 881 MWh Cyprus portfolio. Here\u2019s why cycle life economics, fire safety, and insurance implications make LFP the clear winner for utility-scale BESS.',
}

export default function LFPvsNMCArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-600 text-white">
              Technology &mdash; March 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              LFP vs NMC for Utility-Scale BESS
              <span className="block gradient-text mt-2">
                Why Chemistry Matters for Your 20-Year Investment
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              When we committed to 881.78&nbsp;MWh of battery storage across 51 parks in Cyprus,
              the first engineering decision wasn&apos;t about containers or inverters &mdash; it was
              about cell chemistry. We chose LFP. Every single park. Here&apos;s the business case
              behind that decision.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>January 27, 2026</span>
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

            {/* Section 1: This Is Not a Chemistry Lesson */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">This Is Not a Chemistry Lesson</h2>
              <p className="text-lg text-gray-700 mb-4">
                Both lithium iron phosphate (LFP/LiFePO<sub>4</sub>) and nickel manganese cobalt (NMC) are
                mature, commercially proven battery chemistries. Millions of cells of each type are deployed
                worldwide in electric vehicles, grid storage, and industrial applications. Neither is
                &ldquo;new&rdquo; or &ldquo;experimental.&rdquo;
              </p>
              <p className="text-lg text-gray-700 mb-4">
                But when you&apos;re signing an EPC contract that locks in a technology choice for 20 years
                &mdash; across dozens of parks, hundreds of containers, and tens of millions of euros &mdash;
                the differences between these chemistries stop being academic and start being financial.
              </p>
              <p className="text-lg text-gray-700">
                This article isn&apos;t about cathode crystal structures or lithium-ion intercalation
                mechanisms. It&apos;s about total cost of ownership, insurance premiums, fire codes, warranty
                enforcement, and the bankability implications of picking the wrong chemistry for a utility-scale
                deployment in a Mediterranean climate.
              </p>
            </div>

            {/* Section 2: The Head-to-Head Comparison */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Head-to-Head Comparison</h2>
              <p className="text-lg text-gray-700 mb-6">
                Before diving into the business case, here&apos;s a side-by-side view of the metrics that
                actually matter for utility-scale BESS. Pay attention to the columns that affect your
                20-year financial model &mdash; not the ones that matter for an electric car.
              </p>

              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-indigo-100">
                      <th className="text-left p-4 font-semibold text-gray-900">Metric</th>
                      <th className="text-left p-4 font-semibold text-purple-900">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          LFP (LiFePO<sub>4</sub>)
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700">NMC</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Utility Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Cycle Life</td>
                      <td className="p-4 text-purple-800 font-semibold">7,000+ cycles</td>
                      <td className="p-4 text-gray-700">3,000&ndash;5,000 cycles</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Cost per Cycle (Levelised)</td>
                      <td className="p-4 text-purple-800 font-semibold">Lower</td>
                      <td className="p-4 text-gray-700">1.4&ndash;2.3&times; higher</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Thermal Runaway Onset</td>
                      <td className="p-4 text-purple-800 font-semibold">&gt;270&deg;C</td>
                      <td className="p-4 text-gray-700">150&ndash;210&deg;C</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Fire Risk</td>
                      <td className="p-4 text-purple-800 font-semibold">Inherently safer</td>
                      <td className="p-4 text-gray-700">Higher &mdash; requires active suppression</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Energy Density</td>
                      <td className="p-4 text-gray-700">~160 Wh/kg</td>
                      <td className="p-4 text-gray-700 font-semibold">~200&ndash;250 Wh/kg</td>
                      <td className="p-4">
                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Low</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Calendar Life</td>
                      <td className="p-4 text-gray-700">15&ndash;20 years</td>
                      <td className="p-4 text-gray-700">15&ndash;20 years</td>
                      <td className="p-4">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Round-Trip Efficiency</td>
                      <td className="p-4 text-gray-700">86&ndash;88%</td>
                      <td className="p-4 text-gray-700">86&ndash;88%</td>
                      <td className="p-4">
                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Comparable</Badge>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Degradation Curve</td>
                      <td className="p-4 text-purple-800 font-semibold">Linear, predictable</td>
                      <td className="p-4 text-gray-700">Steeper after year 5&ndash;8</td>
                      <td className="p-4">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mt-6">
                <p className="text-lg font-semibold text-purple-900 mb-2">
                  <Battery className="inline w-5 h-5 mr-2" />
                  The Key Takeaway
                </p>
                <p className="text-gray-700">
                  NMC&apos;s only advantage &mdash; higher energy density &mdash; is the one metric that
                  doesn&apos;t matter for utility-scale outdoor deployments. You&apos;re not trying to fit a
                  battery into a car chassis. You have land. What you need is longevity, safety, and
                  predictable economics over two decades.
                </p>
              </div>
            </div>

            {/* Section 3: Cycle Life Economics */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Calculator className="inline w-8 h-8 mr-2 text-purple-600" />
                Cycle Life Economics: The 20-Year Math
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                This is where the LFP decision pays for itself &mdash; literally. The difference in cycle
                life between LFP and NMC isn&apos;t a minor specification detail. It&apos;s the difference
                between a battery that lasts the full investment horizon and one that needs a costly
                mid-life replacement.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                      LFP: 7,000+ Cycles
                    </CardTitle>
                    <CardDescription>At 70% end-of-life threshold</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Daily cycling (1 cycle/day)</span>
                        <span className="font-bold text-purple-800">19.2 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Mid-life replacement needed?</span>
                        <span className="font-bold text-green-600">No</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">SOH at year 15</span>
                        <span className="font-bold text-purple-800">&ge;70%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total replacement cost (20 yr)</span>
                        <span className="font-bold text-green-600">&euro;0</span>
                      </div>
                      <hr className="border-purple-200" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Effective cost per usable cycle</span>
                        <span className="font-bold text-purple-800">Lowest</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50">
                  <CardHeader>
                    <CardTitle className="text-gray-700 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                      NMC: 3,000&ndash;5,000 Cycles
                    </CardTitle>
                    <CardDescription>At 70% end-of-life threshold</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Daily cycling (1 cycle/day)</span>
                        <span className="font-bold text-gray-800">8.2&ndash;13.7 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Mid-life replacement needed?</span>
                        <span className="font-bold text-red-600">Yes (year 8&ndash;14)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">SOH at year 15</span>
                        <span className="font-bold text-gray-800">Replaced or &lt;60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total replacement cost (20 yr)</span>
                        <span className="font-bold text-red-600">40&ndash;60% of original CAPEX</span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Effective cost per usable cycle</span>
                        <span className="font-bold text-gray-800">1.4&ndash;2.3&times; LFP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                  Our Warranty Data Tells the Story
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  The EVE LFP cells in our Linyang-integrated containers carry SOH performance guarantees
                  that are only possible because of LFP&apos;s predictable, linear degradation profile:
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 5</div>
                    <div className="text-3xl font-bold text-green-600">&ge; 85%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 10</div>
                    <div className="text-3xl font-bold text-blue-600">&ge; 79.58%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 15</div>
                    <div className="text-3xl font-bold text-purple-600">&ge; 70%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  These are contractual guarantees from the OEM, backed by warranty reserves on their books
                  &mdash; not marketing estimates. NMC manufacturers rarely offer comparable guarantees
                  beyond year 10 because the degradation curve becomes too unpredictable.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Calculator className="inline w-5 h-5 mr-2" />
                  The Mid-Life Replacement Trap
                </p>
                <p className="text-gray-700">
                  NMC proponents often compare upfront &euro;/kWh costs, where NMC can appear competitive.
                  But this ignores the elephant in the room: if your NMC system hits end-of-life at year 10,
                  you face a full re-celling or container replacement at a cost of 40&ndash;60% of your
                  original CAPEX &mdash; at a point when your revenue model assumed the system was still
                  earning. Factor in 2&ndash;4 months of downtime during replacement, lost revenue,
                  re-commissioning costs, and updated permitting, and the total cost of ownership for NMC
                  can exceed LFP by 30&ndash;50% over 20 years.
                </p>
              </div>
            </div>

            {/* Section 4: Fire Safety */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Flame className="inline w-8 h-8 mr-2 text-red-500" />
                Fire Safety: A Non-Negotiable for Outdoor Cyprus Deployments
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus summers routinely hit 45&deg;C ambient temperatures. BESS containers sitting in
                direct sunlight on exposed land parcels adjacent to dry vegetation face thermal stress
                that would be manageable in Northern Europe but becomes a genuine safety consideration
                in the Eastern Mediterranean.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The difference between LFP and NMC in thermal stability isn&apos;t marginal &mdash;
                it&apos;s fundamental.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-green-900 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      LFP Thermal Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Thermal runaway onset: <strong>&gt;270&deg;C</strong></span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">No oxygen release during decomposition</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Self-extinguishing behaviour in most failure modes</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Simpler fire suppression requirements</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Smaller safety setback distances between containers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-red-900 flex items-center">
                      <Flame className="w-5 h-5 mr-2 text-red-600" />
                      NMC Thermal Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Thermal runaway onset: <strong>150&ndash;210&deg;C</strong></span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Releases oxygen during decomposition (self-feeding fire)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Cascade propagation risk between cells and modules</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Requires active gas detection and suppression systems</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Larger mandatory clearances increase land requirements</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-red-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  Real-World BESS Fire Incidents
                </p>
                <p className="text-gray-700 mb-3">
                  The most high-profile BESS fires have predominantly involved NMC chemistry:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Arizona, USA (2019):</strong> McMicken NMC BESS explosion injured four
                      firefighters. Root cause: thermal runaway cascading through NMC modules with
                      inadequate ventilation.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>South Korea (2017&ndash;2022):</strong> Over 30 BESS fire incidents, the
                      majority involving NMC chemistry. This led to a nationwide moratorium and revised
                      safety standards that added significant cost to NMC deployments.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Liverpool, UK (2020):</strong> NMC-based grid-scale BESS fire burned for
                      days, requiring extensive emergency response and causing significant environmental
                      contamination.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4">
                  &ldquo;In a hot Mediterranean climate where ambient temperatures regularly exceed 40&deg;C,
                  the 60&ndash;120&deg;C margin between LFP&apos;s thermal runaway onset and peak summer
                  conditions is not a luxury &mdash; it&apos;s a fundamental safety requirement. With NMC,
                  that margin shrinks to as little as 105&deg;C, and every degree matters when you&apos;re
                  deploying 176 containers across an island.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  &mdash; Alexander Papacosta, Managing Director, Lighthief Cyprus
                </p>
              </div>
            </div>

            {/* Section 5: Insurance Implications */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <Shield className="inline w-8 h-8 mr-2 text-indigo-600" />
                Insurance Implications: LFP Makes Your Project Insurable
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Insurance is where the LFP vs NMC debate moves from engineering preference to hard
                financial reality. Underwriters at the world&apos;s leading insurance firms have learned
                from the BESS fire incidents of the past decade, and their pricing reflects a clear
                chemistry preference.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-green-900">LFP Insurance Advantages</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Lower CAR/EAR premiums during construction phase</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduced ongoing property insurance rates (operational phase)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Broader insurer appetite &mdash; more competition, better terms</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Simpler fire suppression requirements reduce policy exclusions</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Better project finance terms due to lower perceived risk</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-red-900">NMC Insurance Challenges</h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Some insurers refuse to underwrite NMC at utility scale entirely</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Higher premiums reflecting increased thermal runaway risk</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Mandatory fire suppression upgrades as policy conditions</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Larger deductibles and more restrictive policy exclusions</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Potential re-underwriting risk if fire incidents increase globally</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-indigo-900 mb-2">
                  <Shield className="inline w-5 h-5 mr-2" />
                  What This Means for Project Finance
                </p>
                <p className="text-gray-700">
                  When lenders evaluate a BESS project, insurance availability and cost are key inputs
                  to the financial model. A project that cannot secure comprehensive insurance at
                  reasonable rates faces higher equity requirements, worse debt terms, and potentially
                  fails to reach financial close altogether. By choosing LFP, we ensured that every park
                  in our 51-park portfolio qualifies for full CAR/EAR coverage during construction and
                  competitive property insurance rates during operations &mdash; making each project
                  individually bankable.
                </p>
              </div>
            </div>

            {/* Section 6: Why NMC Still Dominates Headlines */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Why NMC Still Dominates Headlines
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                It&apos;s worth being fair to NMC. It&apos;s not a bad chemistry &mdash; it&apos;s the
                wrong chemistry for this application.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                NMC&apos;s higher energy density (200&ndash;250 Wh/kg vs LFP&apos;s ~160 Wh/kg)
                represents a genuine advantage in applications where weight and volume are critical
                constraints. This is why NMC dominates the electric vehicle market, where every kilogram
                matters for range and performance. It&apos;s also relevant for urban or rooftop
                installations where space is at a premium.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                But for utility-scale outdoor BESS? The calculus is entirely different.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Thermometer className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Land Is Not the Constraint</h3>
                    <p className="text-gray-700 text-sm">
                      Utility BESS sites in Cyprus are co-located with solar farms on multi-hectare
                      parcels. The 20&ndash;30% footprint savings from NMC&apos;s higher density are
                      irrelevant when you have acres of available land.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Longevity Is the Constraint</h3>
                    <p className="text-gray-700 text-sm">
                      A 20-year PPA or investment horizon demands a chemistry that can deliver
                      7,000+ cycles without mid-life replacement. That&apos;s LFP&apos;s domain, and
                      NMC cannot match it.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Safety Is the Priority</h3>
                    <p className="text-gray-700 text-sm">
                      Outdoor deployments in hot climates, adjacent to agricultural land and rural
                      communities, demand the safest possible chemistry. LFP&apos;s inherent thermal
                      stability is a requirement, not a preference.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-blue-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  The Market Agrees
                </p>
                <p className="text-gray-700">
                  Globally, LFP has overtaken NMC for stationary storage deployments. According to
                  BloombergNEF, LFP accounted for over 85% of new utility-scale BESS installations
                  worldwide in 2025. The market has spoken: for grid storage, LFP is the standard.
                  NMC retains its position in EVs, but the utility storage sector has moved on.
                </p>
              </div>
            </div>

            {/* Section 7: Our Choice */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-indigo-600 text-white">Our Technology Stack</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Our Choice: EVE LFP Cells, Linyang Integration
                </h2>
                <p className="text-lg text-gray-600">
                  We didn&apos;t just choose a chemistry &mdash; we chose the specific cell manufacturer
                  and system integrator that provide the best bankability profile for our portfolio.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Battery className="w-6 h-6 text-purple-600 mr-2" />
                    EVE Energy &mdash; Cell Manufacturer
                  </h3>
                  <p className="text-gray-700 mb-4">
                    EVE Energy is a global top-5 LFP cell manufacturer, supplying cells for both EV and
                    stationary storage applications worldwide. Their LF280K cells, used throughout our
                    portfolio, are among the most widely deployed utility-grade LFP cells globally.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Global top-5 LFP cell producer by shipment volume</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Vertically integrated manufacturing (cathode to cell)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Proven cycle life data across millions of deployed cells</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-indigo-600 mr-2" />
                    Linyang &mdash; System Integrator
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Linyang integrates EVE cells into fully containerised, TÜV-certified BESS units
                    ready for utility-scale deployment. Each container is a complete, pre-tested energy
                    storage system.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">5.015&nbsp;MWh per 40ft container</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">86.32% system-level round-trip efficiency</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">TÜV-certified: EN 50549-2 (cert D 115067 0077)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">UL 9540A fire safety tested and passed</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Strategic shareholder in EVE &mdash; full cell-to-system traceability</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Portfolio at a Glance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-700">51</div>
                    <div className="text-sm text-gray-600">Parks</div>
                  </div>
                  <div className="text-center bg-indigo-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-indigo-700">881.78</div>
                    <div className="text-sm text-gray-600">MWh Total</div>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">176</div>
                    <div className="text-sm text-gray-600">Containers</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">100%</div>
                    <div className="text-sm text-gray-600">LFP Chemistry</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion / CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Discuss Your BESS Chemistry Options
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Whether you&apos;re evaluating LFP vs NMC for a new project or reviewing an existing
                proposal, our team can walk you through the 20-year financial implications of each
                chemistry choice &mdash; with real data from 881&nbsp;MWh of deployed LFP systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Discuss Your BESS Chemistry Options
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/energy-storage">
                    See Our Full BESS Specifications
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
