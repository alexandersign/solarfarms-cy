import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  TrendingDown,
  TrendingUp,
  Battery,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Calculator,
  Clock,
  Euro,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lithium Prices Crashed 85% — Why BESS Is Now Financially Viable for Every Solar Park',
  description: 'Lithium carbonate dropped from $80,000 to under $10,000 per tonne. This collapse has made battery storage payback periods shorter than 5 years — and the global BESS market is exploding as a result.',
  keywords: [
    'lithium price crash',
    'BESS cost reduction',
    'battery storage viable',
    'lithium carbonate price 2025',
    'BESS financial model',
    'battery storage payback',
    'LFP battery cost',
    'BESS market growth',
    'energy storage economics',
    'battery cost per kWh',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Lithium Prices Crashed 85% — Why BESS Is Now Financially Viable for Every Solar Park',
  description: 'Lithium carbonate dropped from $80,000 to under $10,000 per tonne. This collapse has made battery storage payback periods shorter than 5 years — and the global BESS market is exploding as a result.',
  datePublished: '2026-01-30',
  dateModified: '2026-01-30',
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
    '@id': 'https://solarfarms.cy/blog/lithium-price-crash-bess-viability',
  },
}

export default function LithiumPriceCrashArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-600 text-white">
              Market Analysis &mdash; January 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Lithium Prices Crashed 85%
              <span className="block gradient-text mt-2">
                Why BESS Is Now Financially Viable for Every Solar Park
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Between November 2022 and early 2025, lithium carbonate prices collapsed from $80,000 to
              under $10,000 per tonne. This single commodity shift has transformed battery energy storage
              from an expensive hedge into a financial no-brainer &mdash; with payback periods now under
              5 years in high-curtailment markets. The global BESS market is responding with explosive growth.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>January 30, 2026</span>
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

            {/* Section 1: The Price Collapse */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-green-600" />
                The Lithium Price Collapse: What Happened
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The story of BESS viability is fundamentally a story about lithium. Lithium carbonate
                &mdash; the key raw material for both LFP and NMC battery cells &mdash; experienced one
                of the most dramatic commodity price collapses in recent history.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Between 2020 and late 2022, surging demand from electric vehicles and grid storage combined
                with supply constraints to push lithium carbonate from ~$6,000/tonne to a peak of
                <strong> $81,000/tonne</strong> in November 2022. Then the market corrected &mdash; violently.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  Lithium Carbonate Price Trajectory
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { year: '2020', price: '$6,000', label: 'Pre-EV boom', color: 'text-gray-600' },
                    { year: 'Nov 2022', price: '$81,000', label: 'Peak mania', color: 'text-red-600' },
                    { year: '2024', price: '$12,000', label: '85% crash', color: 'text-amber-600' },
                    { year: '2025-26', price: '$9,500', label: 'New floor', color: 'text-green-600' },
                  ].map((item) => (
                    <div key={item.year} className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <div className="text-sm font-semibold text-gray-500">{item.year}</div>
                      <div className={`text-2xl font-bold ${item.color} my-1`}>{item.price}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-bold text-green-600 text-xl">85%</div>
                      <div className="text-gray-500">Price decline from peak</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600 text-xl">3x</div>
                      <div className="text-gray-500">New lithium mine capacity since 2022</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600 text-xl">Stable</div>
                      <div className="text-gray-500">Analysts expect $8K&ndash;$15K range through 2027</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <strong>Why did lithium crash?</strong> Massive new mining capacity came online in
                  Australia, Chile, and China &mdash; while EV sales growth moderated from exponential to
                  merely rapid. Supply overshot demand. The result: battery-grade lithium is now cheaper
                  than at any point since the EV revolution began.
                </p>
              </div>
            </div>

            {/* Section 2: How Lithium Prices Translate to BESS Costs */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-blue-600" />
                From Lithium to System Cost: How the Savings Flow Through
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Lithium accounts for approximately 30&ndash;40% of the cost of an LFP battery cell.
                When lithium prices collapse, cell prices follow &mdash; and system-level costs cascade
                downward through the entire BESS supply chain.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold border-b-2">Cost Component</th>
                      <th className="text-center p-4 font-semibold border-b-2">2022 (Peak)</th>
                      <th className="text-center p-4 font-semibold border-b-2">2025&ndash;26</th>
                      <th className="text-center p-4 font-semibold border-b-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-semibold">LFP Cell ($/kWh)</td>
                      <td className="text-center p-4">$135&ndash;$160</td>
                      <td className="text-center p-4 font-bold text-green-700">$48&ndash;$62</td>
                      <td className="text-center p-4 text-green-600 font-semibold">&minus;60%</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 text-gray-700 font-semibold">Battery Module ($/kWh)</td>
                      <td className="text-center p-4">$180&ndash;$220</td>
                      <td className="text-center p-4 font-bold text-green-700">$65&ndash;$85</td>
                      <td className="text-center p-4 text-green-600 font-semibold">&minus;62%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 text-gray-700 font-semibold">Containerised System ($/kWh)</td>
                      <td className="text-center p-4">$280&ndash;$350</td>
                      <td className="text-center p-4 font-bold text-green-700">$105&ndash;$140</td>
                      <td className="text-center p-4 text-green-600 font-semibold">&minus;58%</td>
                    </tr>
                    <tr className="bg-emerald-50">
                      <td className="p-4 text-gray-700 font-semibold">Turnkey Installed ($/kWh)</td>
                      <td className="text-center p-4">$400&ndash;$500</td>
                      <td className="text-center p-4 font-bold text-green-700">$140&ndash;$200</td>
                      <td className="text-center p-4 text-green-600 font-semibold">&minus;60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The numbers tell a striking story. In 2022, a turnkey 5 MW / 20 MWh BESS installation
                would have cost <strong>$8&ndash;$10 million</strong>. Today, the same system costs
                <strong> $2.8&ndash;$4 million</strong>. That&apos;s a 60% reduction in just three years.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                And critically, the cost reductions are <em>structural</em>, not temporary. Chinese LFP
                manufacturers (CATL, BYD, EVE Energy, Linyang) have built enormous production capacity
                that keeps cell prices low even as demand grows. BloombergNEF projects LFP cell prices
                will stabilise between $45&ndash;$65/kWh through 2028.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-blue-700 mb-2">$52</div>
                    <div className="text-sm text-gray-600">Average LFP cell price/kWh (2025)</div>
                    <div className="text-xs text-gray-400 mt-2">Down from $145 in Nov 2022</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-green-700 mb-2">1,200+</div>
                    <div className="text-sm text-gray-600">GWh of LFP capacity installed globally</div>
                    <div className="text-xs text-gray-400 mt-2">Massive overcapacity keeps prices low</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-amber-700 mb-2">7,000</div>
                    <div className="text-sm text-gray-600">Cycle life at 70% SOH EOL (LFP)</div>
                    <div className="text-xs text-gray-400 mt-2">15+ year operational lifespan</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: The Financial Tipping Point */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-600" />
                The Financial Tipping Point: When BESS Payback Went Under 5 Years
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                For most investors, the magic number is <strong>5 years</strong>. A BESS system that pays
                back within 5 years and then generates pure profit for the remaining 10&ndash;15 years of
                its warranty period is a compelling investment by any standard. The lithium crash pushed
                BESS past this threshold in 2024&ndash;2025.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The maths is straightforward. When system costs were $400&ndash;$500/kWh, a 20 MWh system
                cost $8&ndash;$10M. Even with strong curtailment revenue, payback exceeded 10 years &mdash;
                too long for most project finance. At $140&ndash;$200/kWh, the same system costs
                $2.8&ndash;$4M, and payback drops to <strong>4&ndash;5 years</strong> in high-curtailment
                markets.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  How Lithium Prices Drive BESS Payback
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/70">
                        <th className="text-left p-3 font-semibold border-b-2">Scenario</th>
                        <th className="text-center p-3 font-semibold border-b-2">System Cost</th>
                        <th className="text-center p-3 font-semibold border-b-2">Payback</th>
                        <th className="text-center p-3 font-semibold border-b-2">Investor Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-red-50/50">
                        <td className="p-3 font-semibold text-red-700">2022 Peak ($81K/t lithium)</td>
                        <td className="text-center p-3">$400&ndash;$500/kWh</td>
                        <td className="text-center p-3 font-bold text-red-700">10&ndash;15 years</td>
                        <td className="text-center p-3 text-red-600">Not viable</td>
                      </tr>
                      <tr className="border-b bg-amber-50/50">
                        <td className="p-3 font-semibold text-amber-700">2023 ($30K/t lithium)</td>
                        <td className="text-center p-3">$220&ndash;$300/kWh</td>
                        <td className="text-center p-3 font-bold text-amber-700">7&ndash;9 years</td>
                        <td className="text-center p-3 text-amber-600">Marginal</td>
                      </tr>
                      <tr className="border-b bg-green-50/50">
                        <td className="p-3 font-semibold text-green-700">2024&ndash;25 ($10K/t lithium)</td>
                        <td className="text-center p-3">$140&ndash;$200/kWh</td>
                        <td className="text-center p-3 font-bold text-green-700">4&ndash;5 years</td>
                        <td className="text-center p-3 text-green-600 font-bold">Highly viable</td>
                      </tr>
                      <tr className="bg-emerald-50/50">
                        <td className="p-3 font-semibold text-emerald-700">Current (&lt;$10K/t lithium)</td>
                        <td className="text-center p-3">$130&ndash;$180/kWh</td>
                        <td className="text-center p-3 font-bold text-emerald-700">3.5&ndash;4.5 years</td>
                        <td className="text-center p-3 text-emerald-600 font-bold">Exceptional</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Payback assumes 40&ndash;50% curtailment, &euro;175/MWh blended discharge price, LFP
                  chemistry. Actual payback varies by market, curtailment rate, and grid pricing.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Euro className="inline w-5 h-5 mr-2 text-emerald-600" />
                  <strong>The implication for solar park owners:</strong> every month you wait to add BESS
                  is a month of curtailed revenue permanently lost. At current lithium prices, the investment
                  case is the strongest it has ever been &mdash; and may ever be. There is no financial
                  argument left for delaying.
                </p>
              </div>
            </div>

            {/* Section 4: Global BESS Market Explosion */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-600" />
                The Global BESS Market Is Exploding
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The market has noticed. Global utility-scale BESS deployment is growing at extraordinary
                rates, driven almost entirely by the economics enabled by cheap lithium.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800">Global Deployment</CardTitle>
                    <CardDescription>Utility-scale BESS capacity added per year</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { year: '2020', gw: '5 GW', gwh: '10 GWh', growth: '' },
                      { year: '2021', gw: '10 GW', gwh: '22 GWh', growth: '+100%' },
                      { year: '2022', gw: '16 GW', gwh: '36 GWh', growth: '+60%' },
                      { year: '2023', gw: '30 GW', gwh: '70 GWh', growth: '+90%' },
                      { year: '2024', gw: '50 GW', gwh: '120 GWh', growth: '+71%' },
                      { year: '2025E', gw: '75 GW', gwh: '190 GWh', growth: '+58%' },
                    ].map((item) => (
                      <div key={item.year} className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-gray-700 w-16">{item.year}</span>
                        <span className="text-blue-700">{item.gw} / {item.gwh}</span>
                        {item.growth && (
                          <span className="text-green-600 font-semibold">{item.growth}</span>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">Market Leaders</CardTitle>
                    <CardDescription>BESS deployment by region (2024&ndash;25)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { region: 'China', pct: 60, note: 'Largest by far — dominated by LFP' },
                      { region: 'United States', pct: 18, note: 'IRA subsidies driving growth' },
                      { region: 'Europe', pct: 10, note: 'UK, Germany, Italy leading' },
                      { region: 'Australia', pct: 5, note: 'Strong grid-scale market' },
                      { region: 'Rest of World', pct: 7, note: 'Middle East, India emerging' },
                    ].map((item) => (
                      <div key={item.region}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-semibold text-gray-700">{item.region}</span>
                          <span className="text-green-700 font-bold">{item.pct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                BloombergNEF projects the global BESS market will exceed <strong>$120 billion annually</strong> by
                2030, up from approximately $35 billion in 2024. The compound annual growth rate of ~25%
                is driven by the same force: lithium prices have made BESS economics work in virtually
                every market where solar curtailment or price arbitrage exists.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-700">$120B</div>
                    <div className="text-sm text-gray-600">Projected annual BESS market by 2030</div>
                  </CardContent>
                </Card>
                <Card className="text-center bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-700">500+ GWh</div>
                    <div className="text-sm text-gray-600">Expected annual deployment by 2030</div>
                  </CardContent>
                </Card>
                <Card className="text-center bg-amber-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-amber-700">25%</div>
                    <div className="text-sm text-gray-600">CAGR through 2030 (BNEF)</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 5: Why Island Grids Benefit Most */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-500" />
                Why Island Grids Like Cyprus Benefit Most
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The lithium price crash has made BESS viable in most solar markets. But it has made BESS
                <em> exceptionally</em> compelling in isolated grid markets like Cyprus, for three reasons:
              </p>

              <div className="space-y-4 mb-8">
                <Card className="border-l-4 border-red-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-700 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Extreme Curtailment = Higher Revenue Per MWh Stored
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Cyprus curtails 47% of solar production &mdash; the highest rate in the EU. Every
                          MWh your BESS captures was going to be wasted. The &ldquo;charge cost&rdquo; is
                          literally &euro;0. In interconnected markets, BESS must buy energy at market prices
                          to charge. In Cyprus, curtailed solar is free fuel.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Wide Price Spreads = Higher Revenue Per Cycle
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Cyprus DAM prices average &euro;102/MWh at midday and &euro;184/MWh at evening peak
                          &mdash; an &euro;82 spread. Isolated grids without interconnection tend to have wider
                          price spreads than interconnected markets, where arbitrage equalises prices across
                          borders. This spread directly increases BESS revenue per cycle.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-700 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          No Export Alternative = Storage Is the Only Option
                        </h3>
                        <p className="text-gray-700 text-sm">
                          Spain can export surplus solar to France. Germany can send it to Denmark. Cyprus
                          has zero interconnection. Until the EuroAsia Interconnector arrives (2029+), BESS
                          is the <strong>only</strong> way to monetise curtailed energy. This creates a
                          captive demand environment that doesn&apos;t exist in mainland Europe.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <strong>The result:</strong> at current lithium-driven BESS prices, a 5 MW solar park in
                  Cyprus with 47% curtailment achieves payback in approximately 4 years &mdash; compared to
                  7&ndash;8 years in interconnected EU markets with lower curtailment and narrower spreads.
                  Cyprus is arguably the single best BESS market in Europe right now.
                </p>
              </div>
            </div>

            {/* Section 6: The Window of Opportunity */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-600" />
                The Window of Opportunity: Why Timing Matters
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Lithium prices may not stay this low forever. Several forces could push prices higher in
                the medium term:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800">Upside Risks to Lithium Prices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span><strong>EV acceleration:</strong> EV sales still growing 20&ndash;30% annually. If growth re-accelerates, demand could outstrip supply again.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span><strong>Mine closures:</strong> Several high-cost lithium mines are closing at current prices. Reduced supply could tighten the market.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span><strong>Trade policy:</strong> Export controls on critical minerals, tariffs, or resource nationalism could constrain supply.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span><strong>Grid storage boom:</strong> The very BESS deployment boom we&apos;re describing creates its own demand pressure on lithium.</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Downside Risks (Prices Stay Low)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>Structural oversupply:</strong> 3x mining capacity built since 2022. Takes years to reduce even if demand grows.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>Sodium-ion competition:</strong> Na-ion batteries (no lithium) are entering the market for stationary storage, capping lithium pricing power.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>Recycling:</strong> Battery recycling capacity is scaling rapidly, creating a secondary lithium supply source.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span><strong>Manufacturing efficiency:</strong> Chinese manufacturers continue to reduce cell production costs through automation and scale.</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The consensus among energy analysts (BNEF, Wood Mackenzie, IEA) is that lithium prices
                will remain in the <strong>$8,000&ndash;$15,000/tonne</strong> range through at least 2027.
                This suggests BESS prices will remain at historically attractive levels for the next 2&ndash;3
                years. After that, increasing demand from both EVs and grid storage could push prices
                moderately higher.
              </p>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Clock className="inline w-5 h-5 mr-2 text-purple-600" />
                  <strong>The message is clear:</strong> BESS equipment is at or near its cheapest point
                  in history. Curtailment in Cyprus is at its peak. The combination of historically low
                  CAPEX and historically high lost revenue creates an investment window that may not remain
                  open indefinitely. Early movers lock in today&apos;s prices; late movers pay whatever
                  the market charges in 2028.
                </p>
              </div>
            </div>

            {/* Section 7: What This Means for Your Solar Park */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
                What This Means for Your Solar Park
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Whether you own a 1 MW commercial installation or a 10 MW utility-scale park, the
                lithium price revolution has fundamentally changed the BESS investment equation:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="font-bold text-green-800 mb-4">Before (2022&ndash;2023)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">&times;</span>
                      <span>BESS CAPEX too high for sub-7-year payback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">&times;</span>
                      <span>Banks reluctant to finance &mdash; technology risk too high</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">&times;</span>
                      <span>Insurance premiums elevated due to limited track record</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">&times;</span>
                      <span>Curtailment lower (13&ndash;29%) &mdash; less revenue to recover</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-800 mb-4">Now (2025&ndash;2026)</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>BESS CAPEX at historic lows &mdash; 60% below 2022 peak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Banks actively financing BESS &mdash; proven technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Insurance market mature &mdash; competitive LFP premiums</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Curtailment at 47% &mdash; massive revenue recovery potential</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-gray-700">
                The alignment of cheap lithium, high curtailment, wide price spreads, and mature
                financing/insurance infrastructure creates a once-in-a-cycle investment opportunity.
                This is not a speculative bet on future technology &mdash; it&apos;s deploying proven,
                bankable hardware at the best price the market has ever offered.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Lock In Today&apos;s BESS Prices Before the Window Closes
              </h2>
              <p className="text-xl mb-4 opacity-90">
                Lithium-driven BESS pricing is at historic lows. Curtailment revenue recovery is at
                historic highs. We can model your specific park&apos;s economics and show you exactly
                what BESS adds to your bottom line.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Whether you have one park or twenty, our team will deliver a detailed financial assessment
                using your actual curtailment data and current market pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Calculator className="w-5 h-5 mr-2" />
                    Request a Free BESS Assessment
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/energy-storage">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Explore Our BESS Solutions
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
