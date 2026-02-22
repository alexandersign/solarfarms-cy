import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Euro,
  Calculator,
  TrendingDown,
  Package,
  Ship,
  Wrench,
  Shield,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Understanding BESS Costs in 2026: CAPEX Breakdown for Project Developers',
  description: 'Beyond the headline €/MWh figure lies a complex cost stack. We break down every line item in a utility-scale BESS project — from CIF container pricing to civil works, EMS, insurance, and import duties — using real confirmed pricing from our 881 MWh portfolio.',
  keywords: [
    'BESS cost 2026',
    'battery storage CAPEX breakdown',
    'BESS EPC cost per MWh',
    'BESS installed cost',
    'battery storage project cost',
    'BESS cost components',
    'energy storage pricing 2026',
    'BESS turnkey cost'
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Understanding BESS Costs in 2026: CAPEX Breakdown for Project Developers',
  description: 'Beyond the headline €/MWh figure lies a complex cost stack. We break down every line item in a utility-scale BESS project — from CIF container pricing to civil works, EMS, insurance, and import duties — using real confirmed pricing from our 881 MWh portfolio.',
  datePublished: '2026-03-09',
  dateModified: '2026-03-09',
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
    '@id': 'https://solarfarms.cy/blog/bess-costs-2026-capex-breakdown',
  },
}

export default function BESSCosts2026Article() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-amber-600 text-white">
              Investment Guide &mdash; March 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Understanding BESS Costs in 2026
              <span className="block gradient-text mt-2">
                CAPEX Breakdown for Project Developers
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Most BESS cost analyses give you a single &euro;/MWh figure.
              We break down every component &mdash; because the devil is in the adders.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>March 9, 2026</span>
              <span>&bull;</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Problem with Headline BESS Pricing */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Problem with Headline BESS Pricing</h2>
              <p className="text-lg text-gray-700 mb-4">
                Most industry reports quote $150&ndash;250/kWh for utility-scale BESS. BloombergNEF, Wood Mackenzie,
                and IHS Markit all benchmark around these figures. But there&rsquo;s a critical caveat buried in the
                footnotes: these numbers represent <strong>CIF container cost only</strong> &mdash; the price of the
                battery containers and power conversion systems delivered to port.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The <em>installed</em>, grid-connected, commissioned cost &mdash; what you actually need to budget &mdash;
                includes 10+ additional line items that most analyses conveniently ignore. Import duties, crane and
                transport, civil works, EMS/SCADA, cabling, protection engineering, insurance, documentation, and
                compliance costs all sit on top of the headline figure.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We know this from first-hand experience. Lighthief is deploying 881.78&nbsp;MWh across 51 parks
                in Cyprus &mdash; one of the largest co-located BESS portfolios in Europe. Every line item in our
                cost stack is confirmed by signed contracts, binding quotations, or validated engineering estimates.
                This article shares the real numbers.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Calculator className="inline w-5 h-5 mr-2" />
                  Why This Matters
                </p>
                <p className="text-gray-700">
                  If you budget based on the headline CIF number alone, you&rsquo;ll underestimate your true CAPEX by
                  roughly 13&ndash;14%. On a 20&nbsp;MWh system, that&rsquo;s over &euro;260,000 in unplanned costs.
                  Understanding the full cost stack upfront is essential for accurate financial modelling, lender
                  presentations, and investment committee approvals.
                </p>
              </div>
            </div>

            {/* Section 2: The Full Cost Stack */}
            <div>
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-orange-600 text-white">The Centrepiece</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">The Full Cost Stack</h2>
                <p className="text-lg text-gray-600">
                  Every line item for a utility-scale BESS project, using real confirmed pricing from
                  our 881.78&nbsp;MWh portfolio. Reference system: 5&nbsp;MW / 20&nbsp;MWh (4 containers).
                </p>
              </div>

              {/* Layer 1: Equipment (CIF) */}
              <Card className="mb-6 border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center text-blue-900">
                    <Package className="w-6 h-6 mr-2" />
                    Layer 1: Equipment (CIF)
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    The headline number &mdash; what most people quote
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-blue-200">
                          <th className="text-left p-3 font-semibold text-gray-900">Component</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Rate</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Battery containers + PCS</strong>
                            <span className="block text-sm text-gray-500">CIF Limassol, Linyang Energy (Tier-1)</span>
                          </td>
                          <td className="p-3 text-right font-mono font-semibold text-blue-700">~&euro;97,490/MWh</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Confirmed</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Portfolio average:</strong> &euro;97,490.09/MWh CIF Limassol. This is the weighted
                      average across 251 containers (two Linyang quotes: LY202601271 for 40 parks and LY202602111
                      for 11 parks). Includes battery containers, PCS units, MV skids, and transformers delivered
                      to Limassol port. This is the number you see in BNEF benchmarks &mdash; everything below
                      is additional.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Layer 2: Physical Adders */}
              <Card className="mb-6 border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center text-orange-900">
                    <Ship className="w-6 h-6 mr-2" />
                    Layer 2: Physical Adders
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    Getting equipment from port to site, installed and connected
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-orange-200">
                          <th className="text-left p-3 font-semibold text-gray-900">Cost Item</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Rate</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Import duty</strong>
                            <span className="block text-sm text-gray-500">Weighted HS codes, EU tariff</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">2.66% of CIF (~&euro;2,592/MWh)</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Confirmed</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Port &amp; landing charges</strong>
                            <span className="block text-sm text-gray-500">ECTL Limassol port</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;600 per 40HC container</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Customs clearance</strong>
                            <span className="block text-sm text-gray-500">Interfreight</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;85 per declaration</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Crane + transport to site</strong>
                            <span className="block text-sm text-gray-500">A. Soulis Haulage (6&times; 20ft trucks, 43T capacity)</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;2,360 per container</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Civil works</strong>
                            <span className="block text-sm text-gray-500">Foundations, fencing, access roads</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;2,000/MWh</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Confirmed</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>LV cabling</strong>
                            <span className="block text-sm text-gray-500">Low-voltage interconnection</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Included in EPC scope</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50">Estimated</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>MV cabling</strong>
                            <span className="block text-sm text-gray-500">Medium-voltage feeders to grid connection</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">~&euro;3,500 per MV feeder</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50">Estimated</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>MV terminations</strong>
                            <span className="block text-sm text-gray-500">Cable termination and testing</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">~&euro;2,200 per MV feeder</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50">Estimated</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Protection engineering</strong>
                            <span className="block text-sm text-gray-500">Relay settings, coordination studies</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;5K&ndash;6K per park</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50">Estimated</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Lightning protection</strong>
                            <span className="block text-sm text-gray-500">DEHN SPD + LPS, StrikeRA installation</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Varies per site</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Marine insurance</strong>
                            <span className="block text-sm text-gray-500">Factory-to-port transit coverage</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">0.75% of CIF</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Confirmed</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Documentation &amp; compliance</strong>
                            <span className="block text-sm text-gray-500">Grid code, permits, technical dossier</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;7,000 per park</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-gray-700 border-gray-300 bg-gray-50">Estimated</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Layer 3: EMS / SCADA */}
              <Card className="mb-6 border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center text-purple-900">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Layer 3: EMS / SCADA (Voltus)
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Energy management, monitoring, and dispatch control
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-purple-200">
                          <th className="text-left p-3 font-semibold text-gray-900">Component</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Rate</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>EMS per container</strong>
                            <span className="block text-sm text-gray-500">Energy management system, per-container licence</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">From confirmed Voltus pricing</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Local SCADA</strong>
                            <span className="block text-sm text-gray-500">On-site monitoring and control</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;15K basic (&le;8&nbsp;MWh) / &euro;30K advanced (&ge;10&nbsp;MWh)</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Global SCADA</strong>
                            <span className="block text-sm text-gray-500">Portfolio-wide monitoring platform</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;60K per group</td>
                          <td className="p-3 text-right">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">Quoted</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-800">
                      Portfolio total EMS/SCADA: &euro;3,993,617 across 51 parks. The Voltus platform provides
                      TSO-compliant dispatch, curtailment signal integration, and real-time SOH monitoring &mdash;
                      all requirements for grid-connected BESS in Cyprus.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Layer 4: Total Installed Cost */}
              <Card className="mb-6 border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-900 text-2xl">
                    <Euro className="w-7 h-7 mr-2" />
                    Layer 4: Total Installed Cost
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    The real number &mdash; fully installed, commissioned, and grid-connected
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">CIF Container Cost</div>
                      <div className="text-3xl font-bold text-blue-600">&euro;97,490</div>
                      <div className="text-xs text-gray-400 mt-1">per MWh</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">Adder Gap</div>
                      <div className="text-3xl font-bold text-orange-600">+&euro;13,210</div>
                      <div className="text-xs text-gray-400 mt-1">per MWh (+13.6%)</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-green-300">
                      <div className="text-sm text-gray-500 mb-1">Installed Cost</div>
                      <div className="text-3xl font-bold text-green-600">&euro;110,700</div>
                      <div className="text-xs text-gray-400 mt-1">per MWh (average)</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      The Adder Gap: Why It Matters
                    </h4>
                    <p className="text-gray-700 mb-3">
                      The &ldquo;adder gap&rdquo; of &euro;13,210/MWh represents the difference between what industry
                      reports quote and what you actually pay. At 13.6% above CIF, this gap is material enough to
                      change IRR calculations, debt-service coverage ratios, and investment committee decisions.
                    </p>
                    <p className="text-gray-700">
                      Portfolio total: &euro;97.6M installed cost across 881.78&nbsp;MWh. Of this, &euro;86.0M is
                      CIF equipment and &euro;11.6M is physical adders plus EMS/SCADA. Every euro is accounted for
                      in confirmed contracts and binding quotations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Visual summary bar */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-center mb-4">Cost Composition: CIF vs. Adders</h4>
                <div className="relative h-10 rounded-full overflow-hidden bg-gray-200">
                  <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-l-full" style={{ width: '88%' }} />
                  <div className="absolute inset-y-0 bg-orange-500" style={{ left: '88%', width: '7%' }} />
                  <div className="absolute inset-y-0 bg-purple-500 rounded-r-full" style={{ left: '95%', width: '5%' }} />
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-gray-600">CIF Equipment (88%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-gray-600">Physical Adders (7%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-gray-600">EMS/SCADA (5%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: What's NOT Included */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What&rsquo;s NOT Included (Client-Paid Items)</h2>
              <p className="text-lg text-gray-700 mb-6">
                The installed cost above is what the EPC contractor (Lighthief) charges. However, several items
                are separately paid by the park owner. These are standard in Cyprus BESS projects and should be
                budgeted alongside the EPC contract.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Protection Testing</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Relay testing and protection coordination verification for each container. Required
                      by the TSO before grid connection approval.
                    </p>
                    <p className="font-mono text-amber-800 font-semibold">&euro;1,250 per container</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Electrical Design Drawings</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Licensed engineer drawings for EAC and building permit applications.
                      Cost depends on site complexity and number of systems.
                    </p>
                    <p className="font-mono text-amber-800 font-semibold">&euro;5,000&ndash;15,000 per site</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">External Lightning Protection</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Site-specific external lightning protection system (if required by the
                      risk assessment). DEHN provides per-site quotations coordinated by Lighthief.
                    </p>
                    <p className="font-mono text-amber-800 font-semibold">Site-specific (DEHN quote)</p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">VAT</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Cyprus standard VAT rate applied on top of the EPC contract price.
                      Recoverable for VAT-registered entities.
                    </p>
                    <p className="font-mono text-amber-800 font-semibold">19% of EPC price</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: Client Pricing */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-cyan-600 text-white">Confirmed Pricing</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">Client Pricing: What You Actually Pay</h2>
                <p className="text-lg text-gray-600">
                  All-in turnkey pricing per MWh, confirmed as of February 2026. Includes EPC delivery,
                  commissioning, and grid connection. Note the volume effect.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-cyan-100">
                      <th className="text-left p-4 font-semibold text-gray-900">System Size</th>
                      <th className="text-right p-4 font-semibold text-gray-900">Containers</th>
                      <th className="text-right p-4 font-semibold text-gray-900">&euro;/MWh (Turnkey)</th>
                      <th className="text-right p-4 font-semibold text-gray-900">Total Cost (20&nbsp;MWh equiv.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-green-50">
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        8&nbsp;MW / 60&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">~12</td>
                      <td className="p-4 text-right font-mono font-bold text-green-700">&euro;100,052</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;6,003,120</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        25&nbsp;MW / 100&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">~20</td>
                      <td className="p-4 text-right font-mono font-bold text-green-700">&euro;106,279</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;10,627,900</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        5&nbsp;MW / 20&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">4</td>
                      <td className="p-4 text-right font-mono font-bold text-blue-700">&euro;112,945</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;2,258,900</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        2.5&nbsp;MW / 10&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">2</td>
                      <td className="p-4 text-right font-mono font-bold text-blue-700">&euro;120,630</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;1,206,300</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        5&nbsp;MW / 15&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">3</td>
                      <td className="p-4 text-right font-mono font-bold text-orange-700">&euro;130,792</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;1,961,880</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-semibold">
                        <CheckCircle className="inline w-4 h-4 text-green-600 mr-1" />
                        5&nbsp;MW / 10&nbsp;MWh
                      </td>
                      <td className="p-4 text-right text-gray-600">2</td>
                      <td className="p-4 text-right font-mono font-bold text-orange-700">&euro;136,106</td>
                      <td className="p-4 text-right text-gray-500 text-sm">&euro;1,361,060</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-white rounded-lg p-5 border border-cyan-200">
                <h4 className="font-semibold text-cyan-900 mb-2 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  The Volume Effect
                </h4>
                <p className="text-gray-700">
                  The cost difference between a 5&nbsp;MW/10&nbsp;MWh system (&euro;136,106/MWh) and an
                  8&nbsp;MW/60&nbsp;MWh system (&euro;100,052/MWh) is <strong>&euro;36,054/MWh &mdash; a 26%
                  reduction</strong>. Larger systems amortise fixed per-park costs (protection engineering,
                  documentation, SCADA) across more MWh. This is why group procurement matters.
                </p>
              </div>
            </div>

            {/* Section 5: Why Group Procurement Drops Costs */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why Group Procurement Drops Costs 15&ndash;20%</h2>
              <p className="text-lg text-gray-700 mb-6">
                The Lighthief portfolio&rsquo;s 881.78&nbsp;MWh order achieves pricing that no individual 5&nbsp;MW
                park could negotiate independently. Here&rsquo;s where the savings come from:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Package className="w-5 h-5 text-blue-600 mr-2" />
                      OEM Volume Negotiation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Ordering 251 containers gives Lighthief pricing leverage that a single 4-container order
                      cannot approach. The CIF price per MWh drops significantly when the OEM can plan production
                      in batches across a 90-day window, optimise container configurations, and guarantee factory
                      utilisation. Our &euro;97,490/MWh average is well below spot market rates for equivalent
                      Tier-1 equipment.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Ship className="w-5 h-5 text-cyan-600 mr-2" />
                      Shared Logistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Shipping 251 containers in three coordinated batches (280&nbsp;MWh, 230&nbsp;MWh,
                      283&nbsp;MWh) reduces per-unit freight costs, port handling charges, and customs processing
                      fees. Marine insurance at 0.75% of CIF is negotiated at portfolio level &mdash; individual
                      orders typically face 1.0&ndash;1.5% rates.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                      Consolidated EMS/SCADA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      A portfolio-wide Voltus contract spreads the &euro;60K global SCADA cost and &euro;420K
                      platform investment across 51 parks instead of burdening a single site. Per-container EMS
                      licensing and local SCADA costs also benefit from volume tiers that are unavailable to
                      standalone projects.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Wrench className="w-5 h-5 text-emerald-600 mr-2" />
                      Batch Civil Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Mobilising a civil works crew for 51 parks in sequence is dramatically cheaper per park
                      than individual mobilisations. Foundations, fencing, and access road construction at
                      &euro;2,000/MWh reflects portfolio-level subcontractor pricing &mdash; standalone projects
                      typically see &euro;2,500&ndash;3,500/MWh for equivalent scope.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <p className="text-lg text-gray-700 italic border-l-4 border-green-500 pl-4">
                  &ldquo;The difference between buying one BESS container and buying 251 is not just a discount &mdash;
                  it&rsquo;s a fundamentally different procurement model. At portfolio scale, you negotiate with
                  the factory, not the sales office. You plan logistics, not react to them. And you design civil
                  works as a programme, not as individual projects.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  &mdash; Alexander Papacosta, Managing Director, Lighthief Cyprus
                </p>
              </div>
            </div>

            {/* Section 6: How This Compares to Global Benchmarks */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">How This Compares to Global Benchmarks</h2>
              <p className="text-lg text-gray-700 mb-6">
                To contextualise the Lighthief portfolio pricing, here&rsquo;s how it stacks up against
                published industry benchmarks for utility-scale BESS.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">BNEF 2025 Benchmark</div>
                    <div className="text-3xl font-bold text-red-600">$250&ndash;300</div>
                    <div className="text-sm text-gray-500">/kWh installed</div>
                    <p className="text-xs text-gray-400 mt-3">
                      BloombergNEF utility-scale reference. Includes basic BoS but not all adders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Lighthief CIF</div>
                    <div className="text-3xl font-bold text-blue-600">~$120&ndash;135</div>
                    <div className="text-sm text-gray-500">/kWh CIF Limassol</div>
                    <p className="text-xs text-gray-400 mt-3">
                      Equipment cost only. Direct OEM partnership pricing at 881&nbsp;MWh volume.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Lighthief Installed</div>
                    <div className="text-3xl font-bold text-green-600">~$135&ndash;155</div>
                    <div className="text-sm text-gray-500">/kWh fully installed</div>
                    <p className="text-xs text-gray-400 mt-3">
                      All adders included, before client margin. Among the most competitive in Europe.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The Lighthief portfolio achieves installed costs roughly 45&ndash;55% below the BNEF benchmark.
                This is not a theoretical exercise &mdash; it&rsquo;s the result of three specific structural advantages:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Direct OEM partnership:</strong> Exclusive distribution agreement with Linyang Energy
                    (BloombergNEF Tier-1) eliminates intermediary margins and provides factory-direct pricing.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Volume aggregation:</strong> 881.78&nbsp;MWh across 51 parks provides procurement
                    leverage that individual projects cannot access, with production planned in 3 optimised batches.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Integrated EPC delivery:</strong> Single-contractor model with pre-negotiated
                    subcontracts for civil works, transport, lightning protection, and EMS eliminates
                    coordination overhead and double-margins.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold mb-3">A Note on Currency Conversion</h4>
                <p className="text-sm text-gray-600">
                  BNEF benchmarks are in USD; Lighthief pricing is in EUR. At the approximate EUR/USD
                  rate of ~1.08 (Q1 2026), the &euro;110,700/MWh installed cost translates to approximately
                  $119,556/MWh or ~$120/kWh. USD comparisons above use a range to account for exchange
                  rate fluctuations and container-size mix.
                </p>
              </div>
            </div>

            {/* Conclusion / Summary */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Key Takeaways</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Headline CIF pricing is not your budget.</strong> The adder gap of +13.6% means
                    a 5&nbsp;MW/20&nbsp;MWh system costs &euro;110,700/MWh installed, not &euro;97,490/MWh.
                    Budget for the full stack or face surprises.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>System size drives per-MWh cost.</strong> An 8&nbsp;MW/60&nbsp;MWh system achieves
                    &euro;100,052/MWh vs &euro;136,106/MWh for a 5&nbsp;MW/10&nbsp;MWh &mdash; 26% cheaper
                    per MWh simply from scale.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Group procurement unlocks 15&ndash;20% savings.</strong> At 881&nbsp;MWh, the
                    Lighthief portfolio achieves OEM pricing, logistics efficiencies, and civil works batch
                    rates that no standalone project can match.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Lighthief pricing is globally competitive.</strong> At ~$135&ndash;155/kWh installed,
                    the portfolio sits 45&ndash;55% below the BNEF 2025 benchmark &mdash; among the most
                    competitive utility-scale BESS pricing available in Europe.
                  </p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>
                  Linyang Energy &mdash; CIF quotations LY202601271 (40 parks) and LY202602111 (11 parks), confirmed February 2026
                </li>
                <li>
                  Lighthief EPC Confirmed Adders v4 &mdash; internal Excel workbook, 51 parks, updated February 2026
                </li>
                <li>
                  Voltus Energy &mdash; EMS/SCADA pricing confirmation, February 2026
                </li>
                <li>
                  A. Soulis Haulage &mdash; crane and transport quotation, January 2026
                </li>
                <li>
                  DEHN Cyprus &mdash; SPD and LPS quotations, January&ndash;February 2026
                </li>
                <li>
                  ECTL (Eurogate Container Terminal Limassol) &mdash; port and landing charges, quoted 2026
                </li>
                <li>
                  Interfreight &mdash; customs clearance rates, quoted 2026
                </li>
                <li>
                  BloombergNEF &mdash; <em>&ldquo;Energy Storage System Cost Survey 2025&rdquo;</em>, Q4 2025
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Request Detailed Pricing for Your Park
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Get a site-specific CAPEX breakdown based on your park&rsquo;s MW, MWh, and location.
                See exactly how each cost layer applies to your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Request Detailed Pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/energy-storage">
                    Explore Our BESS Solutions
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
