import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Scale,
  FileCheck,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Shield,
  Building2,
  AlertTriangle,
  ScrollText,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "How Cyprus's BESS Regulatory Framework Compares to the Rest of Europe",
  description: 'Cyprus is rapidly developing its energy storage regulations. We compare permitting, grid connection, and market access rules across Cyprus, Germany, Spain, Italy, Greece, and the UK to help developers navigate the landscape.',
  keywords: [
    'BESS regulations Cyprus',
    'battery storage permitting Cyprus',
    'CERA energy storage',
    'EU BESS regulation',
    'Cyprus energy storage policy',
    'BESS grid connection Cyprus',
    'battery storage licensing Europe',
    'Cyprus TSOC BESS',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How Cyprus's BESS Regulatory Framework Compares to the Rest of Europe",
  description: 'Cyprus is rapidly developing its energy storage regulations. We compare permitting, grid connection, and market access rules across Cyprus, Germany, Spain, Italy, Greece, and the UK to help developers navigate the landscape.',
  datePublished: '2025-12-02',
  dateModified: '2025-12-02',
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
    '@id': 'https://solarfarms.cy/blog/cyprus-bess-regulatory-framework-europe',
  },
}

export default function CyprusBESSRegulatoryFrameworkArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-slate-700 text-white">
              Regulations &mdash; May 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              How Cyprus&apos;s BESS Regulatory Framework
              <span className="block gradient-text mt-2">
                Compares to the Rest of Europe
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Six markets, six rulebooks. From mature frameworks with full market participation
              to emerging regimes still finding their footing &mdash; where does Cyprus stand,
              and what does it mean for your project?
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>December 2, 2025</span>
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

            {/* Section 1: The Regulatory Landscape for BESS in Europe */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center">
                <Globe className="w-8 h-8 text-slate-600 mr-3 flex-shrink-0" />
                The Regulatory Landscape for BESS in Europe
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Battery Energy Storage Systems (BESS) sit at the intersection of energy generation,
                grid infrastructure, and electricity markets &mdash; and every EU member state draws
                those boundaries differently. Some countries treat storage as a generation asset;
                others classify it as grid infrastructure. Some allow standalone BESS to participate
                in wholesale markets; others restrict batteries to co-located renewables. The result
                is a patchwork of rules that determines what revenue streams are available, what
                permissions are required, and how long it takes to get a project from concept to
                commercial operation.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                For developers operating across multiple jurisdictions, this fragmentation creates both
                complexity and opportunity. Markets with mature frameworks &mdash; the UK, Germany &mdash;
                offer full market access but face intense competition and saturated grid connection
                queues. Markets still catching up &mdash; Cyprus, Greece &mdash; present less competition
                but require developers to navigate regulatory uncertainty and accept narrower initial
                revenue streams.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This article maps the regulatory landscape across six key European markets: Cyprus,
                Germany, Spain, Italy, Greece, and the UK. For each, we cover licensing requirements,
                permitted charging sources, market access, grid connection processes, and permitting
                timelines. The goal is practical: if you&rsquo;re deciding where and how to deploy BESS
                in Europe, this is the comparison you need.
              </p>

              <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  <Scale className="inline w-5 h-5 mr-2" />
                  Why Regulation Matters More Than You Think
                </p>
                <p className="text-gray-700">
                  A BESS project&rsquo;s bankability depends not on the battery chemistry or the EPC
                  contract &mdash; it depends on the revenue model. And the revenue model is entirely
                  shaped by regulation. Whether you can charge from the grid, participate in the
                  Day-Ahead Market, or offer ancillary services determines your project&rsquo;s IRR
                  more than any hardware decision.
                </p>
              </div>
            </div>

            {/* Section 2: Cyprus — Where Things Stand */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center">
                <ScrollText className="w-8 h-8 text-cyprus-600 mr-3 flex-shrink-0" />
                Cyprus: Where Things Stand
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus is in the early stages of building a comprehensive energy storage regulatory
                framework. The foundations are in place &mdash; CERA oversees licensing, TSOC manages
                grid connections, and municipalities handle building permits &mdash; but significant
                gaps remain, particularly around market participation and standalone storage.
              </p>

              <div className="space-y-4 mb-8">
                <Card className="border-cyprus-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FileCheck className="w-5 h-5 text-cyprus-600 mr-2" />
                      CERA Licensing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      The Cyprus Energy Regulatory Authority (CERA) oversees all energy licensing on the
                      island. BESS projects co-located with renewable energy sources require a
                      <strong> Category B licence</strong>, which covers storage systems attached to
                      an existing or new RES installation. The application process involves submitting
                      technical specifications, grid impact studies, and environmental screening
                      documentation.
                    </p>
                    <p className="text-gray-700">
                      Standalone BESS &mdash; systems not attached to a solar or wind farm &mdash; do
                      not yet have a dedicated licensing pathway. CERA has indicated that standalone
                      storage licensing is under development, but no formal framework has been published
                      as of May 2026.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-cyprus-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 text-cyprus-600 mr-2" />
                      Charging Restrictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Under the current regulatory framework, BESS in Cyprus can <strong>only charge
                      from the co-located solar or wind installation</strong>. Grid charging &mdash;
                      drawing power from the network to store and discharge later &mdash; is not
                      permitted. This means BESS revenue in Cyprus is currently limited to curtailment
                      recovery and time-shifting of co-located renewable generation. The arbitrage
                      opportunity that drives BESS economics in the UK and Germany is not yet available.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-cyprus-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Scale className="w-5 h-5 text-cyprus-600 mr-2" />
                      Market Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Day-Ahead Market (DAM) participation for BESS is under development by the
                      Cyprus TSO (TSOC). Currently, BESS cannot independently bid into the wholesale
                      electricity market. The ancillary services market &mdash; frequency response,
                      voltage support &mdash; remains closed to storage. These market limitations are
                      the most significant regulatory gap relative to other European markets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-cyprus-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Building2 className="w-5 h-5 text-cyprus-600 mr-2" />
                      Grid Connection &amp; Permitting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      Grid connection for BESS is managed by TSOC and requires full technical compliance
                      with <strong>EN 50549-2</strong> (the European standard for generating plants
                      connected to MV/HV distribution networks). Equipment must carry T&Uuml;V or
                      equivalent certification demonstrating conformity. The connection study and
                      approval process typically takes 3&ndash;6 months.
                    </p>
                    <p className="text-gray-700">
                      Building permits are issued at the municipal level and require site plans,
                      structural calculations, and fire safety assessments. Larger installations
                      (&gt;5&nbsp;MW or &gt;10,000&nbsp;m&sup2; footprint) require an
                      Environmental Impact Assessment (EIA) coordinated through the Department
                      of Environment.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  The Key Constraint
                </p>
                <p className="text-gray-700">
                  The single biggest regulatory limitation in Cyprus is the prohibition on grid
                  charging. Without it, BESS can only capture curtailed energy from the co-located
                  solar plant &mdash; a valuable function, but one that leaves the full arbitrage
                  and ancillary services revenue stack untapped. Every other market in this comparison
                  allows grid charging in some form.
                </p>
              </div>
            </div>

            {/* Section 3: The EU-Wide Comparison */}
            <div>
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-blue-600 text-white">Comprehensive Comparison</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">The EU-Wide Comparison</h2>
                <p className="text-lg text-gray-600">
                  How Cyprus stacks up against five other European markets across eight key
                  regulatory dimensions.
                </p>
              </div>

              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full min-w-[900px] bg-white rounded-xl overflow-hidden shadow-sm border">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left p-4 font-semibold text-gray-900 border-b-2 border-slate-200 w-[180px]">Aspect</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">Cyprus</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">Germany</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">Spain</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">Italy</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">Greece</th>
                      <th className="text-center p-4 font-semibold text-gray-900 border-b-2 border-slate-200">UK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-semibold text-gray-800">Standalone BESS licensing</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">Not available</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Full framework</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Since 2024</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Terna framework</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Pilot phase</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Mature</span>
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-800">Co-located BESS</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Category B</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Standard</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Hybridaci&oacute;n</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Standard</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">RAE licence</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Standard</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 font-semibold text-gray-800">Grid charging allowed</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">Solar only</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Full access</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Full access</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Full access</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Partial</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Full access</span>
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-800">DAM participation</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">In development</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">EPEX Spot</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">OMIE</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">GME/IPEX</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Limited</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">N2EX / EPEX</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 font-semibold text-gray-800">Ancillary services market</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">Not open</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">FCR / aFRR</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Opening</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">MSD market</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">Not open</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">FFR / DC / DM</span>
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-800">Capacity market</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">None</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-xs text-gray-500">None</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Proposed</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <Clock className="w-5 h-5 text-amber-500" />
                          <span className="text-xs text-gray-500">Planned</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-xs text-gray-500">T-1 / T-4</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 font-semibold text-gray-800">Permitting timeline</td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                          6&ndash;12 mo
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                          12&ndash;24 mo
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50">
                          18&ndash;36 mo
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50">
                          18&ndash;30 mo
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-red-700 border-red-300 bg-red-50">
                          12&ndash;24 mo
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                          6&ndash;12 mo
                        </Badge>
                      </td>
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="p-4 font-semibold text-gray-800">Grid connection process</td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">TSOC application</span>
                          <span className="text-xs text-gray-500">EN 50549-2</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">DSO/TSO dual</span>
                          <span className="text-xs text-gray-500">VDE-AR-N 4120</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">REE application</span>
                          <span className="text-xs text-gray-500">P.O. 12.2</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">Terna process</span>
                          <span className="text-xs text-gray-500">CEI 0-16</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">ADMIE/DEDDIE</span>
                          <span className="text-xs text-gray-500">Grid code v2</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-gray-600 font-medium">NGESO/DNO</span>
                          <span className="text-xs text-gray-500">G99 / G100</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Available / Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>In development / Partial</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Not available</span>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-900">Most Mature Markets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      <strong>UK and Germany</strong> lead with comprehensive regulatory frameworks that
                      allow standalone BESS, full grid charging, wholesale market participation, and
                      ancillary services revenue. The UK&rsquo;s capacity market provides an additional
                      revenue floor that significantly improves bankability.
                    </p>
                    <p className="text-gray-700">
                      The trade-off: intense competition, grid connection queues measured in years,
                      and saturated ancillary services procurement rounds that have compressed margins.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-900">Emerging Markets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      <strong>Cyprus and Greece</strong> are the least developed in terms of BESS
                      regulation, but this creates a window of opportunity. Permitting timelines
                      are shorter, grid connection queues are manageable, and first-mover advantage
                      is real.
                    </p>
                    <p className="text-gray-700">
                      The constraint: limited revenue streams today. But regulatory trajectories are
                      clear &mdash; both countries are actively working toward full market integration.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 4: What's Coming for Cyprus */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center">
                <Clock className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                What&rsquo;s Coming for Cyprus
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus is not standing still. CERA, TSOC, and the Ministry of Energy are actively
                developing regulatory reforms that will bring the island closer to European norms.
                Here&rsquo;s the expected timeline based on published consultations, EU transposition
                deadlines, and industry engagement.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">DAM Arbitrage Access (Grid Charging)</h4>
                      <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                        Expected 2027
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      The most impactful upcoming change. TSOC is developing market rules that would
                      allow BESS to charge from the grid and participate in the Day-Ahead Market.
                      This unlocks the full arbitrage revenue stream &mdash; buying low during
                      off-peak hours and selling high during evening peaks. Based on current DAM
                      price spreads in Cyprus (&euro;40&ndash;80/MWh differential), this could add
                      &euro;15,000&ndash;30,000 per MWh of installed capacity annually.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">Ancillary Services Market Opening</h4>
                      <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                        Expected 2027&ndash;2028
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      TSOC is developing procurement mechanisms for frequency containment reserves
                      (FCR) and automatic frequency restoration reserves (aFRR). BESS is uniquely
                      suited to provide these services due to sub-second response times. Cyprus&rsquo;s
                      isolated grid makes frequency stability particularly valuable &mdash; potentially
                      commanding premium pricing compared to interconnected markets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">Standalone BESS Licensing Framework</h4>
                      <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                        Expected 2027
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      CERA is preparing a dedicated licensing category for standalone storage that
                      is not co-located with renewable generation. This will enable grid-scale
                      storage projects at optimal grid locations rather than being constrained to
                      existing solar park sites. The framework is expected to build on lessons from
                      the co-located Category B process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ScrollText className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">Updated Grid Code for Storage</h4>
                      <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                        Ongoing
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      TSOC is revising the Transmission and Distribution Grid Codes to include
                      storage-specific technical requirements, covering power quality, fault ride-through
                      behaviour, and island-mode operation parameters. The updated codes will align
                      with EN 50549-2 while addressing Cyprus-specific grid conditions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border border-blue-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-7 h-7 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">EU Battery Regulation Alignment</h4>
                      <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                        2027 deadlines
                      </Badge>
                    </div>
                    <p className="text-gray-700">
                      The EU Battery Regulation (2023/1542) introduces sustainability requirements
                      including carbon footprint declarations, recycled content minimums, and due
                      diligence obligations. Cyprus must transpose these into national law. For
                      developers, this means sourcing equipment from manufacturers that comply with
                      the regulation&rsquo;s traceability and sustainability provisions &mdash; a
                      factor that favours established Tier-1 OEMs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Practical Guide */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-green-600 text-white">Step-by-Step</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Practical Guide: What Developers Need Today
                </h2>
                <p className="text-lg text-gray-600">
                  Navigating the current Cyprus BESS regulatory framework, step by step.
                  This checklist applies to co-located BESS projects under the existing rules.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Secure Category B Licence from CERA</h4>
                    <p className="text-gray-700 text-sm">
                      Submit a licence application to the Cyprus Energy Regulatory Authority specifying
                      the BESS capacity (MW and MWh), the co-located RES installation details, and the
                      intended charging/discharging profile. Include a technical description of the
                      battery system, PCS specifications, and preliminary grid impact assessment.
                      Timeline: 2&ndash;4 months for review and approval.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Obtain Grid Connection Agreement from TSOC</h4>
                    <p className="text-gray-700 text-sm">
                      Apply to the Transmission System Operator of Cyprus for grid connection, providing
                      detailed electrical single-line diagrams, protection relay settings, and reactive
                      power capability curves. TSOC will conduct a connection impact assessment and
                      issue connection terms. Timeline: 3&ndash;6 months including the technical study.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Ensure Equipment Meets EN 50549-2 (T&Uuml;V Certified)</h4>
                    <p className="text-gray-700 text-sm">
                      All BESS equipment connected to the Cyprus grid must demonstrate compliance with
                      EN 50549-2. This requires T&Uuml;V or equivalent third-party certification covering
                      power quality, frequency response, fault ride-through, and anti-islanding protection.
                      Ensure your OEM provides the required certificates before procurement &mdash; retrofitting
                      non-compliant equipment is expensive and time-consuming.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Apply for Building Permit (Municipal Level)</h4>
                    <p className="text-gray-700 text-sm">
                      Building permits for BESS installations are processed by the local municipality
                      where the project is located. Submissions require architectural plans, structural
                      calculations for foundations, fire safety assessments, and noise impact studies if
                      the site is near residential areas. Timeline: 1&ndash;3 months depending on municipality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Complete Environmental Screening</h4>
                    <p className="text-gray-700 text-sm">
                      All BESS installations undergo environmental screening. Smaller projects
                      (&lt;5&nbsp;MW) typically require only a preliminary assessment. Larger installations
                      or those near Natura 2000 sites require a full Environmental Impact Assessment (EIA)
                      coordinated through the Department of Environment. Timeline: 1&ndash;6 months
                      depending on project scale and location sensitivity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Install and Commission with Certified EPC Partner</h4>
                    <p className="text-gray-700 text-sm">
                      Engage an EPC contractor with demonstrated experience in utility-scale BESS
                      installation in Cyprus. The contractor should handle civil works, electrical
                      installation, EMS/SCADA integration, and commissioning testing. Ensure the EPC
                      contract includes performance guarantees, warranty pass-through from the OEM,
                      and commissioning test protocols aligned with TSOC requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-green-50 border-2 border-green-500 rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">7</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Submit for Grid Connection Testing and Approval</h4>
                    <p className="text-gray-700 text-sm">
                      After installation, TSOC conducts grid connection testing to verify compliance
                      with the connection agreement terms. This includes protection relay testing,
                      power quality measurements, frequency response verification, and anti-islanding
                      tests. Successful completion results in a Connection Completion Certificate and
                      permission to commence commercial operation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg p-5 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Total Expected Timeline
                </h4>
                <p className="text-gray-700">
                  From initial CERA application to commercial operation: <strong>6&ndash;12 months</strong> for
                  co-located BESS projects. This is shorter than most European markets because Cyprus
                  processes permits at the municipal level (no federal bureaucracy) and TSOC handles
                  a smaller queue of applications compared to larger TSOs. The key bottleneck is
                  typically the grid connection study, which can take 3&ndash;6 months depending on
                  grid capacity at the connection point.
                </p>
              </div>
            </div>

            {/* Section 6: Why the Regulatory Gap Is Actually an Opportunity */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center">
                <AlertTriangle className="w-8 h-8 text-solar-600 mr-3 flex-shrink-0" />
                Why the Regulatory Gap Is Actually an Opportunity
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                It&rsquo;s tempting to look at the comparison table and conclude that Cyprus is a
                poor choice for BESS deployment. After all, no grid charging, no DAM participation,
                no ancillary services &mdash; that&rsquo;s a limited revenue stack. But the developers
                who wait for regulatory perfection before deploying will find themselves late to a
                market that rewards early movers.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">First-Mover Market Position</h3>
                    <p className="text-gray-700 text-sm">
                      Cyprus has very limited installed BESS capacity today. Developers who deploy
                      now establish relationships with TSOC, build a compliance track record, and
                      position themselves for priority consideration when new market services open.
                      Grid connection capacity is finite &mdash; early movers secure the best
                      connection points before queues build.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Equipment Prices at Historic Lows</h3>
                    <p className="text-gray-700 text-sm">
                      LFP battery container prices have dropped over 50% since 2023 and are currently
                      at or near all-time lows. This pricing environment is driven by Chinese
                      manufacturing overcapacity &mdash; a structural condition that won&rsquo;t last
                      as consolidation occurs. Locking in CAPEX now at these prices materially
                      improves project IRR regardless of which revenue streams open later.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Curtailment Recovery Available NOW</h3>
                    <p className="text-gray-700 text-sm">
                      Cyprus solar curtailment has reached 45% at some parks. Co-located BESS can
                      capture this lost energy today, under the current regulatory framework, without
                      waiting for DAM access or ancillary services. For parks already losing significant
                      revenue to curtailment, BESS pays for itself on curtailment recovery alone &mdash;
                      every future revenue stream is pure upside.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">First-Mover Advantage in New Revenue Streams</h3>
                    <p className="text-gray-700 text-sm">
                      When grid charging and ancillary services regulations arrive (expected 2027),
                      installed capacity will have immediate access to new revenue streams. Developers
                      who deploy in 2026 will have operational systems, proven performance data, and
                      established TSOC relationships &mdash; all of which translate to preferential
                      access when new market services launch.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <p className="text-lg text-gray-700 italic border-l-4 border-green-500 pl-4">
                  &ldquo;The best time to plant a tree was twenty years ago. The second best time is
                  now. In Cyprus BESS, the best time to deploy was when curtailment hit 20%. The
                  second best time is before regulations catch up and competition arrives. We&rsquo;re
                  building the infrastructure today that will capture tomorrow&rsquo;s revenue
                  streams.&rdquo;
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  &mdash; Alexander Papacosta, Managing Director, Lighthief Cyprus
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Navigate Cyprus BESS Regulations with Us
              </h2>
              <p className="text-xl mb-6 opacity-90">
                From CERA licensing to TSOC grid connection, we handle the regulatory
                complexity so you can focus on returns. Our team has navigated the
                permitting process for multiple parks across Cyprus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Talk to Our Regulatory Team
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/energy-storage">
                    See Our Compliance Approach
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
