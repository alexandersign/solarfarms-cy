import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Users,
  TrendingDown,
  Euro,
  Package,
  CheckCircle,
  ArrowRight,
  Building2,
  Calculator,
  Shield,
  BarChart3,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Group Procurement for BESS: How PV Park Owners Reduce Costs by 15-20% Through Joint Orders',
  description: 'Individual 5MW parks pay a premium. By aggregating 51 parks into a single 881 MWh procurement, we achieved Tier-1 OEM pricing that no individual buyer could access. Here\'s how group procurement works.',
  keywords: [
    'BESS group procurement',
    'battery storage bulk order',
    'BESS cost reduction strategies',
    'group buying battery storage',
    'BESS volume discount',
    'solar park BESS procurement',
    'battery storage cooperative purchasing',
    'BESS aggregation model',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Group Procurement for BESS: How PV Park Owners Reduce Costs by 15-20% Through Joint Orders',
  description: 'Individual 5MW parks pay a premium. By aggregating 51 parks into a single 881 MWh procurement, we achieved Tier-1 OEM pricing that no individual buyer could access. Here\'s how group procurement works.',
  datePublished: '2026-08-17',
  dateModified: '2026-08-17',
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
    '@id': 'https://solarfarms.cy/blog/bess-group-procurement-cost-savings',
  },
}

export default function BESSGroupProcurementArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-amber-600 text-white">
              Investment Guide &mdash; August 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Group Procurement for BESS
              <span className="block gradient-text mt-2">
                How PV Park Owners Reduce Costs by 15&ndash;20% Through Joint Orders
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Individual 5&nbsp;MW parks pay a premium. By aggregating 51 parks into a single
              881&nbsp;MWh procurement, we achieved Tier-1 OEM pricing that no individual buyer
              could access. Here&rsquo;s how group procurement works &mdash; and why it&rsquo;s
              the smartest strategy for BESS investment in Cyprus.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>August 17, 2026</span>
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

            {/* Section 1: The Individual Buyer's Dilemma */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-600" />
                The Individual Buyer&apos;s Dilemma
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A single 5&nbsp;MW solar park ordering 20&nbsp;MWh of BESS faces a harsh economic
                reality: premium pricing at every level of the supply chain. OEMs prioritise large
                orders &mdash; a 20&nbsp;MWh request doesn&rsquo;t even register on most Tier-1
                manufacturers&rsquo; radar. You&rsquo;re competing for production slots with
                utility developers ordering 200&ndash;500&nbsp;MWh at a time.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The cost disadvantages cascade through every line item. Logistics costs are
                essentially fixed per shipment regardless of how many containers you&rsquo;re
                moving. EMS/SCADA setup and integration costs the same whether you&rsquo;re
                deploying at 1 park or 50. Insurance underwriting for a single small system
                carries higher per-MWh premiums than a portfolio policy.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The result: individual buyers pay 15&ndash;20% more per MWh installed compared
                to what&rsquo;s achievable through volume procurement. For a 20&nbsp;MWh system,
                that premium translates to &euro;440K&ndash;640K of additional cost &mdash; money
                that comes directly off your returns.
              </p>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">The Individual Buyer Premium</h4>
                      <p className="text-red-700">
                        A standalone 5&nbsp;MW/20&nbsp;MWh BESS procurement typically costs
                        &euro;135,000&ndash;145,000/MWh installed. The same system procured through
                        a group order: &euro;112,945/MWh. That&rsquo;s a 16&ndash;22% gap that no
                        amount of negotiation on an individual basis can close.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: How Group Procurement Works */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-amber-600" />
                How Group Procurement Works
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The Lighthief model aggregates demand from multiple independent PV park owners into
                a single procurement event. Each owner maintains full ownership and operational
                independence of their system, but benefits from the collective bargaining power of
                the group.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Think of it like a cooperative purchasing group: you&rsquo;re not giving up
                anything, but you&rsquo;re gaining access to pricing and terms that would be
                impossible to achieve alone.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-amber-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Aggregate Demand</h4>
                        <p className="text-gray-600 text-sm">
                          6 client groups, 51 parks consolidated into a single 881.78&nbsp;MWh order
                          (251 containers).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Single OEM Contract</h4>
                        <p className="text-gray-600 text-sm">
                          Negotiate as one buyer with Linyang for volume pricing that no individual
                          park could access.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Shared Logistics</h4>
                        <p className="text-gray-600 text-sm">
                          Consolidated shipping, transport, craning, and customs clearance across
                          production batches.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Common Terms</h4>
                        <p className="text-gray-600 text-sm">
                          Unified warranty, LTSA, and EMS/SCADA (Voltus) deployment across the
                          entire portfolio.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Where the Savings Come From */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-amber-600" />
                Where the Savings Come From
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The 15&ndash;20% cost reduction isn&rsquo;t a single discount &mdash; it&rsquo;s
                the compound effect of savings across six distinct areas. Each one contributes
                incrementally, but together they deliver a transformative reduction in installed
                cost.
              </p>

              <div className="space-y-4">
                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Euro className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">OEM Volume Pricing</h4>
                        <p className="text-gray-600">
                          An 881&nbsp;MWh order places us in the top tier of OEM pricing brackets.
                          Compare: a 20&nbsp;MWh order gets standard list pricing; an 880+&nbsp;MWh
                          order gets strategic partner pricing. The CIF per MWh differential is
                          substantial &mdash; this is the single largest source of savings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Shipping Efficiency</h4>
                        <p className="text-gray-600">
                          Full container vessel loads rather than LCL (less-than-container-load)
                          shipments. Consolidated shipping routes, negotiated freight rates, and
                          optimised port scheduling. Fewer shipments means fewer customs declarations,
                          fewer port handling charges, and lower marine insurance premiums.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Shared Logistics</h4>
                        <p className="text-gray-600">
                          Transport from port to site, crane hire, and customs clearance costs are
                          shared across batches. A crane mobilised for 10 containers across 3 nearby
                          parks costs significantly less per container than 3 separate crane
                          mobilisations for 3&ndash;4 containers each.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">EMS/SCADA Consolidation</h4>
                        <p className="text-gray-600">
                          Voltus EMS deployment, global SCADA infrastructure, and remote monitoring
                          setup are shared across the entire portfolio. The per-park cost of a global
                          SCADA licence drops dramatically when spread over 51 parks versus 1.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Batch Civil Works</h4>
                        <p className="text-gray-600">
                          Civil works crews move efficiently between parks within a batch. Equipment
                          mobilisation and demobilisation costs are shared. Concrete suppliers offer
                          better rates for larger aggregate orders. Fencing and earthworks contractors
                          commit to batch pricing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Insurance Portfolio Policy</h4>
                        <p className="text-gray-600">
                          A group insurance policy across 881&nbsp;MWh carries significantly lower
                          per-MWh premiums than individual park policies. Insurers prefer portfolio
                          risk &mdash; geographical diversification and statistical predictability
                          reduce their exposure, and they pass the savings through.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: The Numbers */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Euro className="w-8 h-8 text-amber-600" />
                The Numbers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Here&rsquo;s a real comparison between individual procurement and our group model.
                These are confirmed figures from our portfolio, compared against market quotes for
                standalone 5&nbsp;MW/20&nbsp;MWh BESS systems.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-800">Individual Procurement</CardTitle>
                    <CardDescription className="text-red-600">
                      Standalone 5&nbsp;MW / 20&nbsp;MWh system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-red-700">&euro;135K&ndash;145K</p>
                      <p className="text-sm text-red-600">per MWh installed</p>
                    </div>
                    <ul className="space-y-2 text-sm text-red-700">
                      <li className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 flex-shrink-0 rotate-180" />
                        <span>Standard OEM list pricing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 flex-shrink-0 rotate-180" />
                        <span>Individual shipping and logistics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 flex-shrink-0 rotate-180" />
                        <span>Full EMS/SCADA setup per park</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 flex-shrink-0 rotate-180" />
                        <span>Individual insurance policy</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">Group Procurement</CardTitle>
                    <CardDescription className="text-green-600">
                      881.78&nbsp;MWh across 51 parks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-green-700">&euro;112,945</p>
                      <p className="text-sm text-green-600">per MWh installed (confirmed)</p>
                    </div>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Tier-1 OEM volume pricing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Consolidated shipping &amp; logistics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Shared EMS/SCADA infrastructure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Portfolio insurance policy</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-amber-900 mb-4">Impact Per Park</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-700">&euro;22K&ndash;32K</p>
                      <p className="text-sm text-amber-600">saved per MWh</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-700">&euro;440K&ndash;640K</p>
                      <p className="text-sm text-amber-600">saved per 20&nbsp;MWh park</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-700">16&ndash;22%</p>
                      <p className="text-sm text-amber-600">cost reduction</p>
                    </div>
                  </div>
                  <p className="text-sm text-amber-700 mt-4 text-center">
                    Across 51 parks, the total portfolio savings run into the multi-million euro range.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section 5: Client Groups in Our Portfolio */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-amber-600" />
                Client Groups in Our Portfolio
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our 881.78&nbsp;MWh portfolio comprises 6 independent client groups, each with
                their own parks, timelines, and commercial agreements. What unites them is access
                to the same OEM pricing tier, the same logistics infrastructure, and the same
                warranty and LTSA terms.
              </p>

              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 text-gray-500 font-medium">Group</th>
                          <th className="text-center py-3 px-2 text-gray-500 font-medium">Parks</th>
                          <th className="text-center py-3 px-2 text-gray-500 font-medium">Total MW</th>
                          <th className="text-center py-3 px-2 text-gray-500 font-medium">Total MWh</th>
                          <th className="text-center py-3 px-2 text-gray-500 font-medium">Containers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium text-gray-900">Group A</td>
                          <td className="py-3 px-2 text-center text-gray-700">25</td>
                          <td className="py-3 px-2 text-center text-gray-700">125</td>
                          <td className="py-3 px-2 text-center text-gray-700">~430</td>
                          <td className="py-3 px-2 text-center text-gray-700">~86</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium text-gray-900">Group B</td>
                          <td className="py-3 px-2 text-center text-gray-700">10</td>
                          <td className="py-3 px-2 text-center text-gray-700">50</td>
                          <td className="py-3 px-2 text-center text-gray-700">~175</td>
                          <td className="py-3 px-2 text-center text-gray-700">~35</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium text-gray-900">Group C</td>
                          <td className="py-3 px-2 text-center text-gray-700">7</td>
                          <td className="py-3 px-2 text-center text-gray-700">35</td>
                          <td className="py-3 px-2 text-center text-gray-700">~120</td>
                          <td className="py-3 px-2 text-center text-gray-700">~24</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium text-gray-900">Group D</td>
                          <td className="py-3 px-2 text-center text-gray-700">5</td>
                          <td className="py-3 px-2 text-center text-gray-700">25</td>
                          <td className="py-3 px-2 text-center text-gray-700">~80</td>
                          <td className="py-3 px-2 text-center text-gray-700">~16</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium text-gray-900">Group E</td>
                          <td className="py-3 px-2 text-center text-gray-700">3</td>
                          <td className="py-3 px-2 text-center text-gray-700">15</td>
                          <td className="py-3 px-2 text-center text-gray-700">~50</td>
                          <td className="py-3 px-2 text-center text-gray-700">~10</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 font-medium text-gray-900">Group F</td>
                          <td className="py-3 px-2 text-center text-gray-700">1</td>
                          <td className="py-3 px-2 text-center text-gray-700">7.7</td>
                          <td className="py-3 px-2 text-center text-gray-700">~25</td>
                          <td className="py-3 px-2 text-center text-gray-700">~5</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-gray-300">
                          <td className="py-3 px-2 font-bold text-gray-900">Total</td>
                          <td className="py-3 px-2 text-center font-bold text-gray-900">51</td>
                          <td className="py-3 px-2 text-center font-bold text-gray-900">~258</td>
                          <td className="py-3 px-2 text-center font-bold text-gray-900">881.78</td>
                          <td className="py-3 px-2 text-center font-bold text-gray-900">251</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Group names anonymised for client confidentiality. All groups benefit from
                    identical OEM pricing and warranty terms regardless of individual group size.
                  </p>
                </CardContent>
              </Card>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <Card className="border-amber-200">
                  <CardContent className="pt-6 text-center">
                    <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">3 Batches</p>
                    <p className="text-sm text-gray-500">Production schedule for efficiency</p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">Same Terms</p>
                    <p className="text-sm text-gray-500">Identical warranty &amp; LTSA for all</p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">Full Independence</p>
                    <p className="text-sm text-gray-500">Individual ownership &amp; operation</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 6: How to Join a Group Procurement */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-amber-600" />
                How to Join a Group Procurement
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you own or operate a solar park in Cyprus and are considering BESS, joining a
                group procurement round is straightforward. Here&rsquo;s the process from initial
                contact to installation.
              </p>

              <div className="space-y-4">
                <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Contact Lighthief with Park Details</h4>
                        <p className="text-gray-600">
                          Share your park&rsquo;s key specifications: installed MW capacity,
                          location, grid connection point, and current curtailment levels (if known).
                          We&rsquo;ll assess BESS sizing requirements based on your specific
                          situation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Receive Customised BESS Sizing and Pricing</h4>
                        <p className="text-gray-600">
                          We model the optimal BESS size for your park using curtailment data,
                          grid export constraints, and revenue potential. You receive a detailed
                          proposal at group procurement rates &mdash; not inflated individual quotes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Sign Individual EPC Contract</h4>
                        <p className="text-gray-600">
                          Your contract is between you and Lighthief &mdash; not with other park
                          owners. Your park, your timeline, your commercial terms. The group
                          structure is transparent, but your legal relationship is bilateral.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Benefit from Group Pricing and Support</h4>
                        <p className="text-gray-600">
                          Access the same OEM volume pricing, shared logistics, portfolio insurance,
                          and LTSA terms as every other park in the group. Your per-MWh cost reflects
                          the collective 881&nbsp;MWh order, not your individual 20&nbsp;MWh
                          requirement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Maintain Full Ownership and Independence</h4>
                        <p className="text-gray-600">
                          Your BESS system is yours. You own it, you operate it, you capture the
                          revenue. The group procurement model is purely a purchasing mechanism
                          &mdash; there&rsquo;s no ongoing obligation, revenue sharing, or loss of
                          control.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Summary Card */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  The Bottom Line
                </h3>
                <p className="text-amber-800 mb-4">
                  Group procurement is the single most effective cost reduction strategy available
                  to individual PV park owners considering BESS. A 16&ndash;22% reduction in
                  installed cost directly translates to faster payback, higher IRR, and a more
                  bankable investment case.
                </p>
                <p className="text-amber-800">
                  Our 881.78&nbsp;MWh portfolio demonstrates that independent park owners can
                  access Tier-1 OEM pricing, comprehensive warranty protection, and professional
                  O&amp;M support &mdash; without giving up any operational independence. The
                  model works because everyone benefits: owners get lower costs, the OEM gets
                  volume, and the portfolio gets scale.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Ready to Join Our Next Group Procurement Round?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We&rsquo;re continuously aggregating demand for future procurement rounds. Whether
                you have 1 park or 20, contact us with your details and we&rsquo;ll show you what
                group pricing looks like for your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/contact?service=bess">
                    Join Our Next Group Procurement Round
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog/bess-costs-2026-capex-breakdown">
                    See Current Group Pricing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="text-center pt-8 border-t">
              <Button asChild variant="ghost">
                <Link href="/blog">
                  <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                  Back to All Articles
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
