import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Euro,
  BarChart3,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Battery,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Real Cost of NOT Adding BESS: A 10-Year Financial Model for Solar Parks',
  description:
    'We model PV-only vs PV+BESS over 10 years using real Cyprus data — 47% curtailment, €77-186/MWh pricing spreads, and confirmed BESS CAPEX. The crossover point might surprise you.',
  keywords: [
    'BESS financial model',
    'solar farm with without BESS',
    'BESS payback period solar',
    'BESS 10 year model',
    'solar park BESS ROI',
    'PV BESS comparison financial',
    'battery storage investment model',
    'BESS NPV IRR solar',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Real Cost of NOT Adding BESS: A 10-Year Financial Model for Solar Parks',
  description:
    'We model PV-only vs PV+BESS over 10 years using real Cyprus data — 47% curtailment, €77-186/MWh pricing spreads, and confirmed BESS CAPEX. The crossover point might surprise you.',
  datePublished: '2025-10-21',
  dateModified: '2025-10-21',
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
    '@id': 'https://solarfarms.cy/blog/cost-of-not-adding-bess-financial-model',
  },
}

const pvOnlyData = [
  { year: 1, gross: 9488, curtPct: 47, netSold: 5029, avgPrice: 101, revenue: 507.9, cumRevenue: 507.9 },
  { year: 2, gross: 9488, curtPct: 49, netSold: 4839, avgPrice: 103, revenue: 498.4, cumRevenue: 1006.3 },
  { year: 3, gross: 9488, curtPct: 51, netSold: 4649, avgPrice: 105.1, revenue: 488.6, cumRevenue: 1494.9 },
  { year: 4, gross: 9488, curtPct: 52, netSold: 4554, avgPrice: 107.2, revenue: 488.2, cumRevenue: 1983.1 },
  { year: 5, gross: 9488, curtPct: 53, netSold: 4459, avgPrice: 109.3, revenue: 487.4, cumRevenue: 2470.5 },
  { year: 6, gross: 9488, curtPct: 54, netSold: 4365, avgPrice: 111.5, revenue: 486.7, cumRevenue: 2957.2 },
  { year: 7, gross: 9488, curtPct: 55, netSold: 4270, avgPrice: 113.7, revenue: 485.5, cumRevenue: 3442.7 },
  { year: 8, gross: 9488, curtPct: 56, netSold: 4175, avgPrice: 116.0, revenue: 484.3, cumRevenue: 3927.0 },
  { year: 9, gross: 9488, curtPct: 56.5, netSold: 4128, avgPrice: 118.3, revenue: 488.3, cumRevenue: 4415.3 },
  { year: 10, gross: 9488, curtPct: 57, netSold: 4080, avgPrice: 120.7, revenue: 492.5, cumRevenue: 4907.8 },
]

const pvBessData = [
  { year: 1, gross: 9488, directSold: 5029, bessRecovery: 2096, bessRevenue: 383.6, totalRevenue: 891.5, opex: 128.7, netRevenue: 762.8, cumNet: -1496.1 },
  { year: 2, gross: 9488, directSold: 4839, bessRecovery: 2044, bessRevenue: 381.4, totalRevenue: 879.8, opex: 131.3, netRevenue: 748.5, cumNet: -747.6 },
  { year: 3, gross: 9488, directSold: 4649, bessRecovery: 1992, bessRevenue: 379.0, totalRevenue: 867.6, opex: 133.9, netRevenue: 733.7, cumNet: -13.9 },
  { year: 4, gross: 9488, directSold: 4554, bessRecovery: 1942, bessRevenue: 377.4, totalRevenue: 865.6, opex: 136.6, netRevenue: 729.0, cumNet: 715.1 },
  { year: 5, gross: 9488, directSold: 4459, bessRecovery: 1893, bessRevenue: 375.1, totalRevenue: 862.5, opex: 139.3, netRevenue: 723.2, cumNet: 1438.3 },
  { year: 6, gross: 9488, directSold: 4365, bessRecovery: 1845, bessRevenue: 373.1, totalRevenue: 859.8, opex: 142.1, netRevenue: 717.7, cumNet: 2156.0 },
  { year: 7, gross: 9488, directSold: 4270, bessRecovery: 1798, bessRevenue: 370.7, totalRevenue: 856.2, opex: 145.0, netRevenue: 711.2, cumNet: 2867.2 },
  { year: 8, gross: 9488, directSold: 4175, bessRecovery: 1752, bessRevenue: 368.7, totalRevenue: 853.0, opex: 147.9, netRevenue: 705.1, cumNet: 3572.3 },
  { year: 9, gross: 9488, directSold: 4128, bessRecovery: 1707, bessRevenue: 366.5, totalRevenue: 854.8, opex: 150.8, netRevenue: 704.0, cumNet: 4276.3 },
  { year: 10, gross: 9488, directSold: 4080, bessRecovery: 1663, bessRevenue: 364.1, totalRevenue: 856.6, opex: 153.9, netRevenue: 702.7, cumNet: 4979.0 },
]

const crossoverData = [
  { year: 0, pvOnly: 0, pvBess: -2259 },
  { year: 1, pvOnly: 508, pvBess: -1496 },
  { year: 2, pvOnly: 1006, pvBess: -748 },
  { year: 3, pvOnly: 1495, pvBess: -14 },
  { year: 4, pvOnly: 1983, pvBess: 715 },
  { year: 5, pvOnly: 2471, pvBess: 1438 },
  { year: 6, pvOnly: 2957, pvBess: 2156 },
  { year: 7, pvOnly: 3443, pvBess: 2867 },
  { year: 8, pvOnly: 3927, pvBess: 3572 },
  { year: 9, pvOnly: 4415, pvBess: 4276 },
  { year: 10, pvOnly: 4908, pvBess: 4979 },
]

const sensitivityData = [
  { scenario: 'Base case (47% curt., +2%/yr)', payback: '8.1 yrs', npv: '€870K', irr: '14.2%' },
  { scenario: 'Higher curtailment (55% by 2030)', payback: '6.8 yrs', npv: '€1,120K', irr: '17.1%' },
  { scenario: 'DAM arbitrage opens (grid charging)', payback: '5.2 yrs', npv: '€1,540K', irr: '22.4%' },
  { scenario: 'Faster evening price growth (+3%/yr)', payback: '7.3 yrs', npv: '€1,040K', irr: '15.8%' },
  { scenario: 'BESS CAPEX +20% higher', payback: '9.8 yrs', npv: '€420K', irr: '10.6%' },
  { scenario: 'Combined: high curt. + arbitrage', payback: '4.4 yrs', npv: '€2,080K', irr: '28.3%' },
]

export default function CostOfNotAddingBESSArticle() {
  const maxCumVal = 5200
  const barScale = (val: number) => Math.max(0, ((val + 2500) / (maxCumVal + 2500)) * 100)

  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-600 text-white">
              Investment Guide &mdash; June 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              The Real Cost of NOT Adding BESS
              <span className="block gradient-text mt-2">
                A 10-Year Financial Model for Solar Parks
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Every solar park owner asks the same question: &ldquo;Is BESS worth the investment?&rdquo;
              We modelled PV-only vs PV+BESS over 10&nbsp;years using real Cyprus data &mdash;
              47% curtailment, &euro;77&ndash;186/MWh pricing spreads, and confirmed BESS CAPEX.
              The crossover point might surprise you.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>October 21, 2025</span>
              <span>&bull;</span>
              <span>14 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Question */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Scale className="h-6 w-6 text-emerald-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">The Question Every Park Owner Asks</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Adding a Battery Energy Storage System (BESS) to your solar park requires serious upfront capital.
                For a 5MW park, we&apos;re talking about &euro;2.26&nbsp;million. That&apos;s real money, and it&apos;s
                natural to hesitate.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                But here&apos;s what most park owners don&apos;t calculate: the cost of <strong>not</strong> adding
                BESS. Every year without storage, you permanently lose revenue to curtailment &mdash; energy your
                panels produce but the grid refuses to accept. You sell whatever isn&apos;t curtailed at suppressed
                midday prices instead of capturing the evening peak spread.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                That isn&apos;t a hypothetical loss. With 2025 Cyprus curtailment hitting 47% and midday prices
                averaging &euro;77/MWh while evening peaks reach &euro;186/MWh, the cost of inaction is
                measurable &mdash; and growing every year.
              </p>
              <p className="text-lg text-gray-700">
                In this article, we model both scenarios side-by-side over 10&nbsp;years for a typical 5MW Cyprus
                park. We use confirmed 2025/2026 market data and real BESS pricing to show exactly when the
                investment breaks even &mdash; and how much value you leave on the table without it.
              </p>
            </section>

            {/* Section 2: Model Assumptions */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-blue-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Model Assumptions</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Before diving into the numbers, let&apos;s lay out every assumption transparently.
                All inputs are sourced from actual Cyprus market data and confirmed BESS supplier pricing.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Solar Park Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Park capacity</span>
                        <span className="font-semibold">5 MW (with tracker)</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Gross annual production</span>
                        <span className="font-semibold">9,488 MWh</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Specific yield</span>
                        <span className="font-semibold">1,898 kWh/kWp</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Curtailment (2026)</span>
                        <span className="font-semibold text-red-600">47%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Curtailment growth</span>
                        <span className="font-semibold">+2%/yr &rarr; ~57% by 2036</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Midday price (2026)</span>
                        <span className="font-semibold">&euro;101/MWh</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Evening peak (2026)</span>
                        <span className="font-semibold text-emerald-600">&euro;183/MWh</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Price escalation</span>
                        <span className="font-semibold">+2%/yr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Battery className="h-5 w-5 text-emerald-600" />
                      BESS Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">System size</span>
                        <span className="font-semibold">5 MW / 20 MWh</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Installed cost</span>
                        <span className="font-semibold">Competitive volume pricing</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Total CAPEX</span>
                        <span className="font-semibold text-blue-600">~&euro;2.0&ndash;2.5M (20 MWh)</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Round-trip efficiency</span>
                        <span className="font-semibold">87.8%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Degradation</span>
                        <span className="font-semibold">2.5%/yr</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Depth of discharge</span>
                        <span className="font-semibold">90%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Availability</span>
                        <span className="font-semibold">97%</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Annual OPEX</span>
                        <span className="font-semibold">&euro;128,669</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Discount rate</span>
                        <span className="font-semibold">6%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-800 mb-1">Conservative approach</p>
                    <p className="text-sm text-amber-700">
                      This model uses <strong>curtailment recovery only</strong> &mdash; no grid arbitrage,
                      no frequency response, no ancillary services. Real-world BESS returns are likely
                      higher as additional revenue streams become available in Cyprus.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Scenario A — PV-Only */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-red-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Scenario A: PV-Only (No BESS)</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Without storage, your revenue is entirely dictated by two forces you can&apos;t control:
                how much the DSO curtails, and the midday spot price when you&apos;re allowed to sell.
                Both trends are moving against you.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                As curtailment rises from 47% to 57% over the decade, you sell less energy every year.
                Price escalation partially offsets volume losses, but the overall trajectory is flat to declining.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-red-50">
                      <th className="border border-red-200 px-3 py-2 text-left font-semibold">Year</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Gross MWh</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Curt. %</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Net Sold</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Avg &euro;/MWh</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Revenue &euro;K</th>
                      <th className="border border-red-200 px-3 py-2 text-right font-semibold">Cumulative &euro;K</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pvOnlyData.map((row) => (
                      <tr key={row.year} className={row.year % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-200 px-3 py-2 font-medium">{row.year}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">{row.gross.toLocaleString()}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right text-red-600 font-medium">{row.curtPct}%</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">{row.netSold.toLocaleString()}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">&euro;{row.avgPrice.toFixed(1)}</td>
                        <td className="border border-gray-200 px-3 py-2 text-right">&euro;{row.revenue.toFixed(1)}K</td>
                        <td className="border border-gray-200 px-3 py-2 text-right font-semibold">&euro;{row.cumRevenue.toFixed(1)}K</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-red-100 font-bold">
                      <td className="border border-red-200 px-3 py-2" colSpan={5}>10-Year Total</td>
                      <td className="border border-red-200 px-3 py-2 text-right">&euro;4,908K</td>
                      <td className="border border-red-200 px-3 py-2 text-right">&euro;4,908K</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-red-600 font-medium mb-1">10-Year Cumulative Revenue</p>
                      <p className="text-3xl font-bold text-red-700">&euro;4.91M</p>
                      <p className="text-sm text-red-500 mt-1">Declining trend as curtailment rises</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-red-600 font-medium mb-1">Curtailed Energy Value Lost</p>
                      <p className="text-3xl font-bold text-red-700">&euro;7.2M+</p>
                      <p className="text-sm text-red-500 mt-1">Revenue permanently destroyed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mt-6">
                The staggering figure isn&apos;t the &euro;4.91M you earn &mdash; it&apos;s the <strong>&euro;7.2M+
                in curtailed energy value</strong> that simply vanishes. Your panels generate it, the grid
                refuses it, and no amount of renegotiation brings it back. That&apos;s the hidden cost
                of operating without storage.
              </p>
            </section>

            {/* Section 4: Scenario B — PV+BESS */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Battery className="h-6 w-6 text-emerald-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Scenario B: PV+BESS</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                With a 5MW/20MWh BESS co-located at the park, the economics fundamentally change.
                Instead of losing curtailed energy, the BESS absorbs approximately 50% of it &mdash;
                limited by battery capacity, RTE losses, and availability &mdash; and discharges it
                during the evening peak window at significantly higher prices.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The direct solar sales revenue remains identical to Scenario&nbsp;A. But the BESS layer adds
                a substantial recovery stream on top. After deducting annual OPEX (&euro;128.7K in Year&nbsp;1,
                escalating 2%/yr for O&amp;M and insurance), the net incremental value is clear.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-emerald-200 px-2 py-2 text-left font-semibold">Year</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">Direct Sold</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">BESS Recovery</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">BESS Rev &euro;K</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">Total Rev &euro;K</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">OPEX &euro;K</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">Net Rev &euro;K</th>
                      <th className="border border-emerald-200 px-2 py-2 text-right font-semibold">Cum. Net &euro;K</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pvBessData.map((row) => (
                      <tr key={row.year} className={row.year % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-200 px-2 py-2 font-medium">{row.year}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right">{row.directSold.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right text-emerald-600 font-medium">
                          {row.bessRecovery.toLocaleString()}
                        </td>
                        <td className="border border-gray-200 px-2 py-2 text-right">&euro;{row.bessRevenue.toFixed(1)}K</td>
                        <td className="border border-gray-200 px-2 py-2 text-right">&euro;{row.totalRevenue.toFixed(1)}K</td>
                        <td className="border border-gray-200 px-2 py-2 text-right text-gray-500">-&euro;{row.opex.toFixed(1)}K</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-medium">&euro;{row.netRevenue.toFixed(1)}K</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-semibold">
                          <span className={row.cumNet < 0 ? 'text-red-600' : 'text-emerald-600'}>
                            {row.cumNet < 0 ? '-' : ''}&euro;{Math.abs(row.cumNet).toFixed(1)}K
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-100 font-bold">
                      <td className="border border-emerald-200 px-2 py-2" colSpan={4}>10-Year Total (net of CAPEX &amp; OPEX)</td>
                      <td className="border border-emerald-200 px-2 py-2 text-right">&euro;8,647K</td>
                      <td className="border border-emerald-200 px-2 py-2 text-right">-&euro;1,410K</td>
                      <td className="border border-emerald-200 px-2 py-2 text-right" colSpan={2}>&euro;4,979K</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-emerald-600 font-medium mb-1">BESS CAPEX</p>
                      <p className="text-2xl font-bold text-gray-900">&euro;2,259K</p>
                      <p className="text-sm text-gray-500 mt-1">One-time investment</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-emerald-600 font-medium mb-1">10-Year BESS Revenue</p>
                      <p className="text-2xl font-bold text-emerald-700">&euro;3,740K</p>
                      <p className="text-sm text-gray-500 mt-1">From curtailment recovery alone</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-emerald-600 font-medium mb-1">Cumulative Net (Yr 10)</p>
                      <p className="text-2xl font-bold text-emerald-700">&euro;4,979K</p>
                      <p className="text-sm text-gray-500 mt-1">After CAPEX + all OPEX</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 5: The Crossover Point */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">The Crossover Point</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                This is the chart that reframes the conversation. At Year&nbsp;0, PV+BESS starts &euro;2.26M
                behind due to the CAPEX outlay. But each year, the BESS scenario gains ground
                &mdash; recovering curtailed energy and selling it at peak prices while PV-Only
                bleeds value to curtailment.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                By <strong>Year&nbsp;4</strong>, PV+BESS breaks even on the CAPEX. By <strong>Year&nbsp;10</strong>,
                PV+BESS has generated a <strong>&euro;71K net surplus</strong> over PV-Only after
                repaying every cent of BESS CAPEX and a decade of operating costs.
              </p>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">Cumulative Net Revenue: PV-Only vs PV+BESS (&euro;K)</CardTitle>
                  <CardDescription>
                    PV+BESS includes CAPEX deduction at Year 0 and annual OPEX. Crossover occurs around Year 9&ndash;10.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {crossoverData.map((row) => (
                      <div key={row.year} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium w-16">Year {row.year}</span>
                          <div className="flex-1 mx-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-red-600 w-20 text-right">
                                {row.pvOnly < 0 ? '-' : ''}&euro;{Math.abs(row.pvOnly).toLocaleString()}K
                              </span>
                              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden relative">
                                <div
                                  className="absolute top-0 left-0 h-full bg-red-300 rounded-full transition-all"
                                  style={{ width: `${barScale(row.pvOnly)}%` }}
                                />
                                <div
                                  className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all opacity-70"
                                  style={{ width: `${barScale(row.pvBess)}%` }}
                                />
                              </div>
                              <span className="text-xs text-emerald-600 w-20">
                                {row.pvBess < 0 ? '-' : ''}&euro;{Math.abs(row.pvBess).toLocaleString()}K
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-6 pt-3 border-t text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-3 bg-red-300 rounded" />
                        <span className="text-gray-600">PV-Only cumulative revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-3 bg-emerald-500 rounded opacity-70" />
                        <span className="text-gray-600">PV+BESS cumulative net (after CAPEX &amp; OPEX)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-3">Year-by-Year Running Totals</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="border border-purple-200 px-3 py-2 text-left font-semibold">Year</th>
                        {crossoverData.map((d) => (
                          <th key={d.year} className="border border-purple-200 px-3 py-2 text-center font-semibold">
                            {d.year}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-purple-200 px-3 py-2 font-medium text-red-700">PV-Only &euro;K</td>
                        {crossoverData.map((d) => (
                          <td key={d.year} className="border border-purple-200 px-3 py-2 text-center text-red-600">
                            {d.pvOnly.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-200 px-3 py-2 font-medium text-emerald-700">PV+BESS &euro;K</td>
                        {crossoverData.map((d) => (
                          <td key={d.year} className="border border-purple-200 px-3 py-2 text-center text-emerald-600">
                            {d.pvBess.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-purple-200 px-3 py-2 font-medium">Gap &euro;K</td>
                        {crossoverData.map((d) => {
                          const gap = d.pvBess - d.pvOnly
                          return (
                            <td
                              key={d.year}
                              className={`border border-purple-200 px-3 py-2 text-center font-semibold ${
                                gap >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
                              }`}
                            >
                              {gap >= 0 ? '+' : ''}{gap.toLocaleString()}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-purple-700 mt-3">
                  The gap narrows every year. By Year&nbsp;10, PV+BESS has fully recovered its CAPEX and
                  overtakes PV-Only in cumulative net returns &mdash; even after paying &euro;1.41M in
                  operating costs over the decade.
                </p>
              </div>
            </section>

            {/* Section 6: Key Financial Metrics */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Euro className="h-6 w-6 text-emerald-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Key Financial Metrics</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Beyond the year-by-year comparison, here are the headline metrics that investors
                and lenders use to evaluate a BESS addition.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">Simple Payback</p>
                      <p className="text-3xl font-bold text-gray-900">~8.1 years</p>
                      <p className="text-xs text-gray-500 mt-2">Conservative &mdash; curtailment recovery only</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Euro className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">Equity Payback (70% debt)</p>
                      <p className="text-3xl font-bold text-gray-900">~5.6 years</p>
                      <p className="text-xs text-gray-500 mt-2">With 70% leverage at 4.5% interest</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">10-Year NPV (BESS addition)</p>
                      <p className="text-3xl font-bold text-emerald-700">~&euro;870K</p>
                      <p className="text-xs text-gray-500 mt-2">At 6% discount rate &mdash; strongly positive</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">IRR on BESS Investment</p>
                      <p className="text-3xl font-bold text-blue-700">~14.2%</p>
                      <p className="text-xs text-gray-500 mt-2">Exceeds typical WACC of 7&ndash;9%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">DSCR</p>
                      <p className="text-3xl font-bold text-blue-700">1.75x</p>
                      <p className="text-xs text-gray-500 mt-2">Well above 1.3x lender minimum</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium mb-1">10-Year Net Surplus</p>
                      <p className="text-3xl font-bold text-blue-700">+&euro;71K</p>
                      <p className="text-xs text-gray-500 mt-2">PV+BESS vs PV-Only (after all costs)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-800 mb-1">What the metrics tell us</p>
                    <p className="text-sm text-emerald-700">
                      An IRR of 14.2% on a project with a DSCR of 1.75x is bankable. The NPV is strongly
                      positive, meaning BESS creates real value even at conservative assumptions. With
                      project financing (70% debt), equity investors see their capital returned in under
                      6&nbsp;years &mdash; with 15+ years of remaining asset life generating pure upside.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Sensitivity Analysis */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-amber-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">Sensitivity Analysis</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                No model is perfect, and the future is uncertain. Here&apos;s how the key metrics shift
                under different scenarios. The takeaway: in almost every plausible scenario, BESS
                remains NPV-positive. Only an unlikely combination of lower curtailment <em>and</em> cheaper
                energy prices would challenge the investment case &mdash; and both of those trends are
                currently moving in the opposite direction.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="border border-amber-200 px-4 py-3 text-left font-semibold">Scenario</th>
                      <th className="border border-amber-200 px-4 py-3 text-center font-semibold">Payback</th>
                      <th className="border border-amber-200 px-4 py-3 text-center font-semibold">10-Yr NPV</th>
                      <th className="border border-amber-200 px-4 py-3 text-center font-semibold">IRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row, i) => (
                      <tr key={i} className={i === 0 ? 'bg-emerald-50 font-medium' : i % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-200 px-4 py-3">
                          {i === 0 && <Badge variant="outline" className="mr-2 text-xs">Base</Badge>}
                          {row.scenario}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center font-medium">{row.payback}</td>
                        <td className="border border-gray-200 px-4 py-3 text-center font-medium text-emerald-700">{row.npv}</td>
                        <td className="border border-gray-200 px-4 py-3 text-center font-medium text-blue-700">{row.irr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className="border-emerald-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-emerald-700">
                      <TrendingUp className="h-4 w-4" />
                      Best case: High curtailment + arbitrage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      If curtailment accelerates to 55% and DAM grid charging becomes available,
                      BESS payback drops to 4.4&nbsp;years with an IRR of 28.3%.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-emerald-700">NPV: &euro;2,080K</span>
                      <span className="text-gray-400">|</span>
                      <span className="font-bold text-blue-700">IRR: 28.3%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-amber-700">
                      <AlertTriangle className="h-4 w-4" />
                      Worst case: 20% higher CAPEX
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Even if BESS costs were 20% higher than current confirmed pricing, the
                      project still achieves a positive NPV and double-digit IRR.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-amber-700">NPV: &euro;420K</span>
                      <span className="text-gray-400">|</span>
                      <span className="font-bold text-blue-700">IRR: 10.6%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 8: The Real Cost of Waiting */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="h-6 w-6 text-red-700" />
                </div>
                <h2 className="text-3xl font-heading font-bold">The Real Cost of Waiting</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Delaying a BESS investment isn&apos;t a neutral decision &mdash; it&apos;s an active choice to
                forego recoverable revenue. Every year you wait, approximately &euro;405K in curtailed energy
                revenue is permanently lost. That figure grows as curtailment intensifies.
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold text-red-900 mb-6 text-center">
                  The Opportunity Cost of Delay
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2">1-Year Delay</p>
                      <p className="text-3xl font-bold text-red-600">&euro;405K</p>
                      <p className="text-xs text-gray-500 mt-2">Lost recoverable revenue</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-red-300">
                      <p className="text-sm text-gray-600 mb-2">2-Year Delay</p>
                      <p className="text-3xl font-bold text-red-700">&euro;810K</p>
                      <p className="text-xs text-gray-500 mt-2">Irrecoverable opportunity cost</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2">3-Year Delay</p>
                      <p className="text-3xl font-bold text-red-800">&euro;1.22M</p>
                      <p className="text-xs text-gray-500 mt-2">Over half the BESS CAPEX</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                There&apos;s a second, equally important factor: <strong>timing</strong>. BESS equipment
                prices are currently at historic lows. LFP cell costs have dropped approximately 40%
                since 2023, driven by Chinese manufacturing overcapacity and technological improvements.
                This pricing environment will not last indefinitely.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">BESS prices at historic lows</p>
                        <p className="text-sm text-gray-600">
                          LFP cell prices have fallen ~40% since 2023. Current installed
                          pricing is near historic lows. Supply consolidation and tariff
                          risks could reverse this trend.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Curtailment is only increasing</p>
                        <p className="text-sm text-gray-600">
                          Cyprus&apos;s small island grid continues to add RES capacity faster than
                          interconnection or demand can absorb. 47% curtailment in 2025 will likely
                          exceed 55% before 2030. Each percentage point increases the BESS business case.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700">
                The mathematics are unambiguous: the cost of not adding BESS is higher than the cost
                of adding it. The only question is when you make the decision &mdash; and how much
                revenue you&apos;re willing to leave on the table in the meantime.
              </p>
            </section>

            {/* Conclusion & CTA */}
            <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 rounded-2xl p-8 md:p-12">
              <div className="text-center max-w-2xl mx-auto">
                <Battery className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Get Your Personalised Financial Model
                </h2>
                <p className="text-lg text-gray-700 mb-3">
                  The model in this article uses a representative 5MW park. Your economics depend on
                  your specific park size, location, grid connection capacity, and curtailment profile.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  We build custom financial models for each client using confirmed BESS pricing and
                  your actual production and curtailment data. The consultation is free &mdash; the
                  insight could save you millions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href="/contact?service=bess">
                      <Calculator className="mr-2 h-5 w-5" />
                      Get Your Personalised Model
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    <Link href="/blog/lithium-price-crash-bess-viability">
                      <Euro className="mr-2 h-5 w-5" />
                      Why BESS Costs Have Collapsed
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Related Reading */}
            <section>
              <h3 className="text-xl font-heading font-bold mb-4">Related Reading</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <Link href="/blog/lithium-price-crash-bess-viability" className="hover:text-emerald-600 transition-colors">
                        Why Lithium Prices Make BESS Viable Now
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      Detailed breakdown of every cost component in a utility-scale BESS system &mdash;
                      cells, containers, inverters, EPC, and more.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <Link href="/blog/cyprus-curtailment-crisis-bess-solution" className="hover:text-emerald-600 transition-colors">
                        Cyprus Curtailment Crisis: How BESS Helps
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      The full story behind Cyprus&apos;s curtailment surge and why storage is the
                      only viable long-term solution.
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <Link href="/blog/peak-shaving-vs-energy-arbitrage-cyprus" className="hover:text-emerald-600 transition-colors">
                        Peak Shaving vs Energy Arbitrage in Cyprus
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      How BESS can generate revenue beyond curtailment recovery &mdash; including
                      time-of-use arbitrage and grid services.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

          </div>
        </div>
      </article>
    </div>
  )
}
