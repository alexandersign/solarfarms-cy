import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  AlertTriangle,
  Battery,
  TrendingUp,
  Zap,
  ArrowRight,
  Euro,
  Calculator,
  Sun,
  BarChart3,
  CheckCircle,
  Cpu,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Curtailed Energy Is Not Lost Energy: Revenue Recovery Strategies for Cyprus PV Parks',
  description: '306 GWh of solar energy was curtailed in Cyprus in 2025 — worth over €58M at market rates. We break down three proven strategies to recover this revenue: BESS time-shifting, behind-the-meter loads, and computational monetisation.',
  keywords: [
    'solar curtailment recovery',
    'curtailed energy monetization',
    'Cyprus solar curtailment solutions',
    'BESS curtailment recovery',
    'solar revenue protection Cyprus',
    'curtailed energy strategies',
    'Cyprus solar energy waste',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Curtailed Energy Is Not Lost Energy: Revenue Recovery Strategies for Cyprus PV Parks',
  description: '306 GWh of solar energy was curtailed in Cyprus in 2025 — worth over €58M at market rates. We break down three proven strategies to recover this revenue: BESS time-shifting, behind-the-meter loads, and computational monetisation.',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
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
    '@id': 'https://solarfarms.cy/blog/curtailed-energy-revenue-recovery-cyprus',
  },
}

export default function CurtailedEnergyRevenueRecoveryArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-amber-600 text-white">
              Market Analysis — May 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Curtailed Energy Is Not Lost Energy
              <span className="block gradient-text mt-2">
                Revenue Recovery Strategies for Cyprus PV Parks
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              306 GWh of solar energy was curtailed in Cyprus during 2025 — worth over €58 million at market prices.
              That energy wasn&apos;t consumed, wasn&apos;t exported, wasn&apos;t stored. It was simply thrown away.
              But it doesn&apos;t have to be.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>May 25, 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Scale of the Problem */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                The Scale of the Problem
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus curtailed <strong>306 GWh</strong> of solar energy in 2025 — an 83% increase over
                2024&apos;s already-alarming 167 GWh. At the average market price of €190/MWh, that
                represents <strong>over €58 million</strong> in energy value that was generated, measured,
                and then deliberately discarded because the grid couldn&apos;t absorb it.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This isn&apos;t a rounding error. It&apos;s a systemic failure that scales with every new MW of solar
                added to an isolated island grid with zero interconnection. And it&apos;s getting worse every year.
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Curtailment Growth: 0 GWh to 306 GWh in 4 Years
                  </h3>
                  <p className="text-gray-600">
                    System-wide curtailed solar energy across Cyprus
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {[
                      { year: '2021', gwh: '0', value: '€0', pct: '0%', barH: '2%', color: 'green' },
                      { year: '2022', gwh: '~23', value: '~€4.4M', pct: '3.5%', barH: '8%', color: 'green' },
                      { year: '2023', gwh: '~89', value: '~€17M', pct: '13.4%', barH: '29%', color: 'orange' },
                      { year: '2024', gwh: '167', value: '~€32M', pct: '29%', barH: '55%', color: 'orange' },
                      { year: '2025', gwh: '306', value: '€58M+', pct: '47%', barH: '100%', color: 'red' },
                    ].map((item) => (
                      <div key={item.year} className="text-center">
                        <div className="text-sm font-semibold text-gray-700 mb-2">{item.year}</div>
                        <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-${item.color}-500 to-${item.color}-300 rounded-b-lg`}
                            style={{ height: item.barH }}
                          />
                        </div>
                        <div className="mt-2">
                          <div className={`text-lg font-bold text-${item.color}-600`}>{item.gwh} GWh</div>
                          <div className="text-xs text-gray-500">{item.value}</div>
                          <div className="text-xs text-gray-400">{item.pct} curtailment</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Source: TSOC operational data, Lighthief portfolio analysis
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-red-200 bg-red-50/50 text-center">
                  <CardContent className="pt-6">
                    <Sun className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-700 mb-1">306 GWh</div>
                    <div className="text-sm text-gray-600">Total curtailed energy in 2025</div>
                    <div className="text-xs text-gray-400 mt-2">Enough to power 51,000 homes for a year</div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50 text-center">
                  <CardContent className="pt-6">
                    <Euro className="w-10 h-10 text-red-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-700 mb-1">€58M+</div>
                    <div className="text-sm text-gray-600">Wasted energy value at market price</div>
                    <div className="text-xs text-gray-400 mt-2">At average €190/MWh wholesale price</div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50 text-center">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-700 mb-1">+83%</div>
                    <div className="text-sm text-gray-600">Year-on-year curtailment increase</div>
                    <div className="text-xs text-gray-400 mt-2">From 167 GWh (2024) to 306 GWh (2025)</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Calculator className="inline w-5 h-5 mr-2" />
                  What does this mean for a typical 5MW park?
                </p>
                <p className="text-gray-700">
                  At 47% curtailment, a 5MW park with ~10,000 MWh annual gross production loses approximately
                  <strong> 4,700 MWh</strong> to curtailment — worth roughly <strong>€893,000 per year</strong> in
                  unrealised revenue. Over a 25-year project lifetime, that&apos;s over €22 million in permanently
                  lost income.
                </p>
              </div>
            </div>

            {/* Section 2: Strategy 1 — BESS Time-Shifting */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-green-600" />
                Strategy 1: BESS Time-Shifting (Primary)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The most proven and immediately deployable strategy for recovering curtailed revenue is
                Battery Energy Storage Systems (BESS). The concept is straightforward: instead of wasting
                curtailed energy, store it in batteries and discharge during the evening peak when prices are highest.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This is not a future technology — it is operational today. Lighthief is deploying BESS across
                51 parks in Cyprus under Category B licensing, with first installations going live in 2026.
              </p>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mb-8">
                <CardHeader>
                  <CardTitle>How BESS Time-Shifting Works</CardTitle>
                  <CardDescription>Charge during curtailment, discharge during evening peak</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Sun className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">10:00 – 14:00</h4>
                      <p className="text-sm text-gray-700">
                        TSOC curtails your output. Instead of losing energy, the BESS charges
                        from the curtailed solar production at <strong>€0 cost</strong>.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Battery className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">14:00 – 17:00</h4>
                      <p className="text-sm text-gray-700">
                        Battery holds stored energy. EMS monitors market prices and SOC levels,
                        preparing for optimal discharge window.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">17:00 – 21:00</h4>
                      <p className="text-sm text-gray-700">
                        Discharge at <strong>€183/MWh</strong> evening peak. After 86.32% round-trip
                        efficiency, net revenue is <strong>~€161/MWh</strong>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">BESS Revenue Model (5MW Park)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Curtailed energy available:</span>
                      <span className="font-semibold">~4,700 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recovery rate (current systems):</span>
                      <span className="font-semibold">50%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Energy recovered:</span>
                      <span className="font-semibold">~2,350 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">After RTE (86.32%):</span>
                      <span className="font-semibold">~2,029 MWh dispatched</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Evening peak price:</span>
                      <span className="font-semibold">€183/MWh</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold text-green-700">
                      <span>Net BESS revenue:</span>
                      <span>~€405,000/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Effective revenue/MWh:</span>
                      <span className="font-semibold text-green-600">~€161/MWh</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Why BESS Is the Primary Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Proven technology:</strong> LFP batteries with 15+ year warranty, 6,000+ cycle life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Licensed today:</strong> Category B permits allow co-located BESS under existing PV licenses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Bankable:</strong> Accepted by lenders with performance guarantees and insurance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Scalable:</strong> Lighthief deploying across 51 parks with group pricing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Fast payback:</strong> 4.5-year payback at current curtailment rates for 2-hour systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Strategy 2 — Behind-the-Meter Consumption */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-500" />
                Strategy 2: Behind-the-Meter Consumption
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A complementary approach is to consume curtailed energy directly on-site, avoiding the grid
                entirely. During curtailment periods, the TSOC is signalling that the grid doesn&apos;t want your
                energy — but that doesn&apos;t mean nobody can use it.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Behind-the-meter (BTM) consumption routes curtailed power to on-site loads that would otherwise
                draw from the grid, effectively converting wasted solar into direct electricity savings.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Typical On-Site Loads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Battery className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>BESS auxiliary systems:</strong> Cooling, BMS, inverter standby — typically 30-50 kW per container</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Monitoring &amp; SCADA:</strong> Site controllers, communication equipment, weather stations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Security systems:</strong> CCTV, perimeter detection, lighting — 5-15 kW continuous</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sun className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm"><strong>Co-located industrial loads:</strong> Agricultural processing, cold storage, water pumping</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Recovery Potential</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Park auxiliary loads:</span>
                          <span className="font-semibold">50-100 MWh/year</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full" style={{ width: '5%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">BESS auxiliary systems:</span>
                          <span className="font-semibold">100-200 MWh/year</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Co-located commercial:</span>
                          <span className="font-semibold">200-1,000 MWh/year</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-sm text-gray-700">
                          <strong>Total BTM recovery: 350-1,300 MWh/year</strong> — modest compared to BESS
                          time-shifting but essentially free savings with minimal capital expenditure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Zap className="inline w-5 h-5 mr-2 text-blue-500" />
                  <strong>Best for:</strong> Parks with adjacent commercial or industrial consumers who can absorb
                  power during peak curtailment hours. Agricultural areas with irrigation pumps, cold storage
                  facilities, or food processing plants are ideal candidates.
                </p>
              </div>
            </div>

            {/* Section 4: Strategy 3 — Computational Load Monetisation */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                Strategy 3: Computational Load Monetisation
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The most innovative approach is to convert curtailed energy into computation. When the grid
                refuses your electricity, use it to power computational workloads that create direct economic
                value — without needing grid export at all.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Two primary applications have emerged for solar parks with surplus curtailed energy:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Bitcoin Mining with Curtailed Solar</CardTitle>
                    <CardDescription>Converting waste energy into digital value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Zero electricity cost</strong> — curtailed energy is free</li>
                      <li>• ASIC miners can start/stop within seconds based on curtailment signals</li>
                      <li>• Revenue independent of grid pricing or electricity markets</li>
                      <li>• Containerised solutions fit within existing PV park footprint</li>
                      <li>• Proven model used by Riot Platforms, Marathon Digital in Texas</li>
                    </ul>
                    <div className="mt-4 bg-amber-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">
                        Read more:{' '}
                        <Link href="/blog/solar-bitcoin-mining-curtailed-energy" className="text-amber-700 underline">
                          Solar Bitcoin Mining with Curtailed Energy
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>AI GPU Inference</CardTitle>
                    <CardDescription>Training and inference using free solar power</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• GPU clusters for AI inference workloads during curtailment windows</li>
                      <li>• Revenue via cloud GPU rental platforms (€2-4/GPU-hour for H100s)</li>
                      <li>• Batch processing workloads tolerate intermittent availability</li>
                      <li>• Higher capital cost than mining but potentially higher margins</li>
                      <li>• Growing demand from EU AI companies seeking low-cost compute</li>
                    </ul>
                    <div className="mt-4 bg-purple-100 rounded-lg p-3">
                      <p className="text-xs text-gray-600">
                        Read more:{' '}
                        <Link href="/blog/ai-gpu-mining-solar-farms" className="text-purple-700 underline">
                          AI GPU Mining at Solar Farms
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-purple-900 mb-2">
                  <Euro className="inline w-5 h-5 mr-2" />
                  Cyprus Tax Advantage
                </p>
                <p className="text-gray-700">
                  Cyprus offers <strong>8% corporate tax</strong> for IP companies — one of the lowest rates in the EU.
                  Computational workloads generating intellectual property (AI model training, data processing) can
                  qualify for this preferential rate, significantly improving the post-tax return on curtailed
                  energy monetisation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3">Complexity vs Return Trade-off</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-white">
                        <th className="text-left p-3 font-semibold border-b-2">Factor</th>
                        <th className="text-center p-3 font-semibold border-b-2">Bitcoin Mining</th>
                        <th className="text-center p-3 font-semibold border-b-2">AI Inference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 text-gray-600">Capital cost</td>
                        <td className="text-center p-3">€200-400K per MW</td>
                        <td className="text-center p-3">€500K-1M per MW</td>
                      </tr>
                      <tr className="border-b bg-white">
                        <td className="p-3 text-gray-600">Revenue certainty</td>
                        <td className="text-center p-3 text-amber-600">Medium (BTC volatility)</td>
                        <td className="text-center p-3 text-green-600">Higher (contract-based)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-gray-600">Operational complexity</td>
                        <td className="text-center p-3 text-green-600">Low</td>
                        <td className="text-center p-3 text-amber-600">Medium-High</td>
                      </tr>
                      <tr className="border-b bg-white">
                        <td className="p-3 text-gray-600">Intermittency tolerance</td>
                        <td className="text-center p-3 text-green-600">Excellent</td>
                        <td className="text-center p-3 text-amber-600">Good (batch workloads)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Cooling requirements</td>
                        <td className="text-center p-3">High (immersion or air)</td>
                        <td className="text-center p-3">Very high (liquid cooling)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 5: Combining Strategies */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Combining Strategies for Maximum Recovery
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                These three strategies are not mutually exclusive. On a single 5MW site, they can be layered
                to capture progressively more of the curtailed energy waterfall. The key is prioritisation:
                highest-value recovery first, then cascading to lower-value but still profitable uses.
              </p>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-8">
                <CardHeader>
                  <CardTitle>Combined Recovery Waterfall — 5MW Park Example</CardTitle>
                  <CardDescription>Annual curtailed energy: ~4,700 MWh (47% curtailment)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">BESS Time-Shifting (Priority 1)</h4>
                          <Badge className="bg-green-600 text-white">~€405K/year</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Captures ~2,350 MWh of curtailed energy, dispatches ~2,029 MWh at evening peak.
                          Highest €/MWh value at ~€161/MWh net.
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '50%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">50% of curtailed energy captured</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">Behind-the-Meter Consumption (Priority 2)</h4>
                          <Badge className="bg-amber-600 text-white">~€50-100K/year</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Powers BESS auxiliaries, site loads, and co-located consumers with
                          another ~300-500 MWh. Saves on grid import costs.
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-amber-500 h-3 rounded-full" style={{ width: '10%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">~7-10% of curtailed energy consumed</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">Computational Loads (Priority 3)</h4>
                          <Badge className="bg-purple-600 text-white">~€80-200K/year</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Remaining ~1,850 MWh of still-curtailed energy powers mining or AI
                          inference. Variable return depending on BTC price or GPU rental rates.
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '35%' }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Up to 40% of remaining curtailed energy</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">Total Combined Recovery</div>
                          <div className="text-sm text-gray-600">vs €893K annual curtailment loss</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">€535K – €705K/year</div>
                          <div className="text-sm text-green-700">60-79% of curtailed value recovered</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 6: The Urgency */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-red-500" />
                The Urgency: Curtailment Is Getting Worse
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you think 47% curtailment is bad, the trajectory is even more alarming. Every year,
                more solar capacity connects to the same isolated grid, while storage deployment and
                interconnection lag far behind.
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  Curtailment Escalation: The Trend Line
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { year: '2021', pct: '0%', color: 'green', label: 'No curtailment' },
                    { year: '2022', pct: '3.5%', color: 'green', label: 'Minor impact' },
                    { year: '2023', pct: '13.4%', color: 'amber', label: 'Growing concern' },
                    { year: '2024', pct: '29%', color: 'orange', label: 'Severe impact' },
                  ].map((item) => (
                    <Card key={item.year} className="text-center">
                      <CardContent className="pt-4 pb-3">
                        <div className="text-sm font-semibold text-gray-500 mb-1">{item.year}</div>
                        <div className={`text-2xl font-bold text-${item.color}-600`}>{item.pct}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center border-red-300 bg-red-50">
                    <CardContent className="pt-4 pb-3">
                      <div className="text-sm font-semibold text-gray-500 mb-1">2025 (Actual)</div>
                      <div className="text-3xl font-bold text-red-600">47%</div>
                      <div className="text-xs text-red-500 mt-1">Crisis level</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center border-red-400 bg-red-100">
                    <CardContent className="pt-4 pb-3">
                      <div className="text-sm font-semibold text-gray-500 mb-1">2026 (Projected)</div>
                      <div className="text-3xl font-bold text-red-700">50-55%</div>
                      <div className="text-xs text-red-600 mt-1">+100 MW new solar licensed</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center border-red-500 bg-red-200">
                    <CardContent className="pt-4 pb-3">
                      <div className="text-sm font-semibold text-gray-500 mb-1">2027 (Projected)</div>
                      <div className="text-3xl font-bold text-red-800">55-60%</div>
                      <div className="text-xs text-red-700 mt-1">Without massive BESS deployment</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-red-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  200+ MW of new solar is in the pipeline for 2026-2027.
                </p>
                <p className="text-gray-700">
                  Without equivalent grid-scale storage deployment, curtailment will continue its exponential
                  climb. The EuroAsia Interconnector won&apos;t arrive before 2029+. BESS is the only viable
                  solution for the next 3-5 years — and every month of delay is revenue permanently lost.
                </p>
              </div>

              <p className="text-lg text-gray-700">
                The math is simple: at 55% curtailment, a 5MW park loses <strong>5,500 MWh/year</strong> — over
                <strong> €1 million annually</strong>. Park operators who haven&apos;t deployed storage by then will
                be generating more energy that they waste than energy that they sell. That is not a sustainable
                business model.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Recover Your Curtailed Revenue
              </h2>
              <p className="text-xl mb-4 opacity-90">
                Every MWh curtailed is revenue lost forever. BESS can recover 50%+ of that value starting
                from day one of operation.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Whether you operate a 1MW commercial installation or a 10MW utility park, we can quantify
                your curtailment losses and design a recovery strategy tailored to your site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Battery className="w-5 h-5 mr-2" />
                    Recover Your Curtailed Revenue
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/blog/cyprus-curtailment-crisis-bess-solution">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Read Our Full Curtailment Analysis
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
