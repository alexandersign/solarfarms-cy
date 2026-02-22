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
  Wrench,
  Shield,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Building2,
  Container,
  AlertTriangle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Understanding BESS Costs in 2026: CAPEX Breakdown for Project Developers',
  description: 'Beyond the headline €/MWh figure lies a complex cost stack. We break down every layer in a utility-scale BESS project — from equipment to civil works, EMS, insurance, and import duties — based on our 881 MWh portfolio.',
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
  description: 'Beyond the headline €/MWh figure lies a complex cost stack. We break down every layer in a utility-scale BESS project — from equipment to civil works, EMS, insurance, and import duties — based on our 881 MWh portfolio.',
  datePublished: '2026-02-03',
  dateModified: '2026-02-03',
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
              Investment Guide
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
              <span>February 3, 2026</span>
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
                footnotes: these numbers represent <strong>equipment cost only</strong> &mdash; the price of the
                battery containers and power conversion systems delivered to port.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The <em>installed</em>, grid-connected, commissioned cost &mdash; what you actually need to budget &mdash;
                includes 10+ additional line items that most analyses conveniently ignore. Import duties, crane and
                transport, civil works, EMS/SCADA, cabling, protection engineering, insurance, documentation, and
                compliance costs all sit on top of the headline figure.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We know this from first-hand experience. Lighthief is preparing to deploy 881.78&nbsp;MWh across 51 parks
                in Cyprus &mdash; one of the largest co-located BESS portfolios in Europe. Every line item in our
                cost stack is confirmed by signed contracts, binding quotations, or validated engineering estimates.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Calculator className="inline w-5 h-5 mr-2" />
                  Why This Matters
                </p>
                <p className="text-gray-700">
                  If you budget based on the headline equipment cost alone, you&rsquo;ll underestimate your true CAPEX
                  by 13&ndash;18%, depending on geography and system size. On a 20&nbsp;MWh system, that can mean
                  &euro;250,000+ in unplanned costs. Understanding the full cost stack upfront is essential for
                  accurate financial modelling, lender presentations, and investment committee approvals.
                </p>
              </div>
            </div>

            {/* Section 2: The Full Cost Stack */}
            <div>
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-orange-600 text-white">The Centrepiece</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">The Four Layers of BESS Cost</h2>
                <p className="text-lg text-gray-600">
                  Every utility-scale BESS project has the same cost structure. Understanding each layer
                  helps you evaluate quotes, compare vendors, and budget accurately.
                </p>
              </div>

              {/* Layer 1: Equipment */}
              <Card className="mb-6 border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center text-blue-900">
                    <Package className="w-6 h-6 mr-2" />
                    Layer 1: Equipment (Delivered to Port)
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    The headline number &mdash; what most people quote
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    This covers battery containers (LFP cells, racks, BMS, thermal management, fire suppression),
                    power conversion systems (PCS/inverters), MV skids, and step-up transformers &mdash; delivered
                    to Limassol port under CIF Incoterms.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">What&rsquo;s included</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> LFP battery containers</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> PCS / inverter units</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> MV skids &amp; transformers</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Factory acceptance testing (FAT)</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Marine freight &amp; insurance to port</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-900 mb-2">Key considerations</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> This is 82&ndash;88% of total cost</li>
                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Volume drives price significantly</li>
                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> OEM selection impacts bankability</li>
                        <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Tier-1 status required for insurance</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Lighthief advantage:</strong> Our 881&nbsp;MWh portfolio volume with a BloombergNEF
                      Tier-1 OEM partner achieves equipment pricing well below published industry benchmarks.
                      Contact us for project-specific pricing.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Layer 2: Physical Adders */}
              <Card className="mb-6 border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center text-orange-900">
                    <Container className="w-6 h-6 mr-2" />
                    Layer 2: Physical Adders
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    Getting equipment from port to site, installed and connected
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    These are the costs that sit between &ldquo;equipment delivered to port&rdquo; and
                    &ldquo;system commissioned on site.&rdquo; They vary by location, site conditions, and
                    system size, but every project has them.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-orange-200">
                          <th className="text-left p-3 font-semibold text-gray-900">Cost Item</th>
                          <th className="text-right p-3 font-semibold text-gray-900">Typical Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Import duty</strong>
                            <span className="block text-sm text-gray-500">Weighted HS codes, EU tariff schedule</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">2.5&ndash;3.0% of equipment value</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Port &amp; landing charges</strong>
                            <span className="block text-sm text-gray-500">Container terminal handling</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Per-container basis</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Customs clearance</strong>
                            <span className="block text-sm text-gray-500">Freight forwarder processing</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Per-declaration basis</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Crane + transport to site</strong>
                            <span className="block text-sm text-gray-500">Heavy haulage, 40&ndash;43T capacity vehicles</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Per-container, distance-dependent</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Civil works</strong>
                            <span className="block text-sm text-gray-500">Foundations, fencing, access roads</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;2,000&ndash;3,500/MWh</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>MV cabling &amp; terminations</strong>
                            <span className="block text-sm text-gray-500">Medium-voltage feeders to grid connection</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Site-specific</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Protection engineering</strong>
                            <span className="block text-sm text-gray-500">Relay settings, coordination studies</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;5K&ndash;8K per park</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Lightning protection</strong>
                            <span className="block text-sm text-gray-500">SPD + LPS per site risk assessment</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">Site-specific</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-gray-700">
                            <strong>Marine &amp; transit insurance</strong>
                            <span className="block text-sm text-gray-500">Factory-to-port coverage</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">0.5&ndash;1.5% of equipment value</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="p-3 text-gray-700">
                            <strong>Documentation &amp; compliance</strong>
                            <span className="block text-sm text-gray-500">Grid code, permits, technical dossier</span>
                          </td>
                          <td className="p-3 text-right font-mono text-gray-900">&euro;5K&ndash;10K per park</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Total adder impact:</strong> Physical adders typically represent 7&ndash;12% on top of
                      equipment cost, depending on system size, site access, and distance from port. Portfolio-scale
                      procurement reduces these through batch logistics and pre-negotiated subcontractor rates.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Layer 3: EMS / SCADA */}
              <Card className="mb-6 border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center text-purple-900">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Layer 3: EMS / SCADA
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Energy management, monitoring, and dispatch control
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    The EMS/SCADA layer is often underestimated but directly determines revenue performance.
                    A well-configured energy management system can generate 20&ndash;40% more revenue from
                    the same hardware through optimised dispatch, curtailment signal integration, and real-time
                    state-of-health monitoring.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-900 mb-1">Per-Container EMS</h4>
                      <p className="text-sm text-gray-600">Individual container energy management and BMS integration</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-900 mb-1">Local SCADA</h4>
                      <p className="text-sm text-gray-600">On-site monitoring, control, and TSO-compliant dispatch</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-purple-900 mb-1">Global SCADA</h4>
                      <p className="text-sm text-gray-600">Portfolio-wide monitoring and performance analytics platform</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-800">
                      <strong>Cost impact:</strong> EMS/SCADA typically represents 3&ndash;5% of total installed cost.
                      At portfolio scale, global SCADA and platform costs are amortised across all parks, significantly
                      reducing the per-MWh burden compared to standalone installations.
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
                  <div className="bg-white rounded-lg p-5 border border-green-200 mb-6">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      The Adder Gap: Why It Matters
                    </h4>
                    <p className="text-gray-700 mb-3">
                      The difference between what industry reports quote (equipment cost) and what you actually pay
                      (fully installed) is typically 13&ndash;18% for utility-scale BESS in Cyprus. This &ldquo;adder
                      gap&rdquo; is material enough to change IRR calculations, debt-service coverage ratios, and
                      investment committee decisions.
                    </p>
                    <p className="text-gray-700">
                      Every project developer should model the full cost stack &mdash; not just the equipment
                      headline &mdash; when preparing investment cases and lender submissions.
                    </p>
                  </div>

                  {/* Visual summary bar */}
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-center mb-4">Typical Cost Composition</h4>
                    <div className="relative h-10 rounded-full overflow-hidden bg-gray-200">
                      <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-l-full" style={{ width: '86%' }} />
                      <div className="absolute inset-y-0 bg-orange-500" style={{ left: '86%', width: '9%' }} />
                      <div className="absolute inset-y-0 bg-purple-500 rounded-r-full" style={{ left: '95%', width: '5%' }} />
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-gray-600">Equipment (82&ndash;88%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-gray-600">Physical Adders (7&ndash;12%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-gray-600">EMS/SCADA (3&ndash;5%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 3: What's NOT Included */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What&rsquo;s NOT Included (Client-Paid Items)</h2>
              <p className="text-lg text-gray-700 mb-6">
                The installed cost above is what the EPC contractor charges. However, several items
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
                    <p className="text-gray-700 text-sm">
                      Relay testing and protection coordination verification for each container. Required
                      by the TSO before grid connection approval. Typically &euro;1,000&ndash;1,500 per container.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Electrical Design Drawings</h3>
                    <p className="text-gray-700 text-sm">
                      Licensed engineer drawings for EAC and building permit applications.
                      Cost depends on site complexity and number of systems. Typically &euro;5,000&ndash;15,000 per site.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">External Lightning Protection</h3>
                    <p className="text-gray-700 text-sm">
                      Site-specific external lightning protection system (if required by the
                      risk assessment). Cost varies significantly by site topology and soil resistivity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">VAT</h3>
                    <p className="text-gray-700 text-sm">
                      Cyprus standard VAT rate applied on top of the EPC contract price.
                      Recoverable for VAT-registered entities. Current rate: 19%.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: Volume Effect */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-cyan-600 text-white">Key Insight</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">The Volume Effect on BESS Pricing</h2>
                <p className="text-lg text-gray-600">
                  System size and portfolio scale are the two biggest drivers of per-MWh cost. Understanding
                  this dynamic is critical for investment decisions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-cyan-900">System Size Effect</h4>
                  <p className="text-gray-700 mb-3">
                    Larger systems amortise fixed per-park costs (protection engineering, documentation,
                    SCADA setup) across more MWh. The per-MWh cost difference between a 2-container and
                    a 12-container system can exceed 25%.
                  </p>
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <p className="text-sm text-cyan-800">
                      <strong>Example:</strong> Fixed costs of ~&euro;15&ndash;25K per park (protection,
                      documentation, SCADA) are spread across 10&nbsp;MWh or 60&nbsp;MWh &mdash;
                      a 6x difference in per-MWh impact.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-cyan-900">Portfolio Aggregation Effect</h4>
                  <p className="text-gray-700 mb-3">
                    Ordering 880+ MWh in one portfolio unlocks OEM pricing tiers, batch logistics savings,
                    volume insurance rates, and subcontractor programme pricing that no individual project
                    can access.
                  </p>
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <p className="text-sm text-cyan-800">
                      <strong>Result:</strong> Portfolio-scale procurement typically delivers 15&ndash;20%
                      total cost reduction compared to standalone project procurement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-cyan-200">
                <h4 className="font-semibold text-cyan-900 mb-2 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Why Group Procurement Matters
                </h4>
                <p className="text-gray-700">
                  At portfolio scale, you negotiate with the factory, not the sales office. You plan logistics
                  as a programme, not as individual shipments. And you design civil works as a coordinated
                  deployment, not as one-off projects. Every layer of the cost stack benefits from scale.
                </p>
              </div>
            </div>

            {/* Section 5: How This Compares to Global Benchmarks */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">How This Compares to Global Benchmarks</h2>
              <p className="text-lg text-gray-700 mb-6">
                Published industry benchmarks provide context for evaluating BESS project economics.
                Here&rsquo;s how the market is positioned in 2026.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">BNEF 2025 Benchmark</div>
                    <div className="text-3xl font-bold text-red-600">$250&ndash;300</div>
                    <div className="text-sm text-gray-500">/kWh installed</div>
                    <p className="text-xs text-gray-400 mt-3">
                      BloombergNEF utility-scale reference. Includes basic BoS but varies by region.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">China OEM (Volume)</div>
                    <div className="text-3xl font-bold text-blue-600">$100&ndash;150</div>
                    <div className="text-sm text-gray-500">/kWh equipment</div>
                    <p className="text-xs text-gray-400 mt-3">
                      Direct Tier-1 OEM pricing at volume. Equipment only, before all adders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-600 mb-2">Portfolio-Scale Installed</div>
                    <div className="text-3xl font-bold text-green-600">$130&ndash;180</div>
                    <div className="text-sm text-gray-500">/kWh fully installed</div>
                    <p className="text-xs text-gray-400 mt-3">
                      All adders included. Achievable with volume procurement and integrated EPC.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Portfolio-scale procurement with direct OEM partnerships can achieve installed costs
                40&ndash;55% below published benchmarks. This is driven by three structural advantages:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Direct OEM partnership:</strong> Factory-direct pricing eliminates intermediary
                    margins. BloombergNEF Tier-1 certification ensures bankability and insurance compatibility.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Volume aggregation:</strong> 880+ MWh across 51 parks provides procurement
                    leverage that individual projects cannot access, with production planned in optimised batches.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    <strong>Integrated EPC delivery:</strong> Single-contractor model with pre-negotiated
                    subcontracts eliminates coordination overhead and double-margins across every cost layer.
                  </p>
                </div>
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
                    <strong>Headline equipment pricing is not your budget.</strong> The adder gap of 13&ndash;18%
                    means your installed cost is materially higher than what industry reports quote.
                    Budget for the full stack or face surprises.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>System size drives per-MWh cost.</strong> Larger systems can be 20&ndash;25% cheaper
                    per MWh simply from amortising fixed costs across more capacity.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Group procurement unlocks 15&ndash;20% savings.</strong> At 880+ MWh, portfolio-scale
                    procurement achieves OEM pricing tiers, logistics efficiencies, and batch subcontractor rates
                    that no standalone project can match.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <p className="text-lg text-gray-700">
                    <strong>Request project-specific pricing.</strong> Every park is different &mdash; system size,
                    distance from port, grid connection requirements, and site conditions all affect the final
                    cost. We provide detailed, line-by-line CAPEX breakdowns for each project.
                  </p>
                </div>
              </div>
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
