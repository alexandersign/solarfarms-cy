import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Battery,
  AlertTriangle,
  CheckCircle,
  Euro,
  Zap,
  Shield,
  Globe,
  Calculator,
  TrendingDown,
  Clock,
  BarChart3,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why BESS Is No Longer Optional for RES Projects in Cyprus | 2026 Market Reality',
  description: 'With curtailment at 47%, midday prices collapsing to €77/MWh, and annual revenue losses exceeding €800K per 5MW park, adding BESS to your renewable energy project in Cyprus is now a financial necessity — not an option.',
  keywords: [
    'BESS Cyprus 2026',
    'battery storage renewable energy',
    'Cyprus solar curtailment',
    'BESS mandatory RES',
    'energy storage Cyprus',
    'solar curtailment losses',
    'Cyprus electricity prices midday',
    'evening peak energy prices',
    'EU BESS market comparison',
    'solar revenue protection Cyprus',
    'PV BESS integration',
    'Lighthief Cyprus BESS',
  ],
}

export default function WhyBESSNoLongerOptionalArticle() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-red-600 text-white">
              Market Reality Check — February 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Why BESS Is No Longer Optional
              <span className="block gradient-text mt-2">
                for New RES Projects in Cyprus
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Curtailment at 47%. Midday prices collapsing to €77/MWh while evenings hit €186/MWh.
              Revenue losses exceeding €170K per MW annually. The data is clear: building a solar park
              without BESS in Cyprus is no longer a viable strategy.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>February 13, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="container -mt-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/bess-no-longer-optional-cyprus.png"
              alt="Why BESS is no longer optional for new PV projects in Europe — PV to Grid to Storage flow diagram showing curtailment risk and BESS flexibility"
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-3">
            From &ldquo;must-sell now&rdquo; to &ldquo;sell when it makes sense&rdquo; — the BESS paradigm shift
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Uncomfortable Truth */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Uncomfortable Truth About Solar-Only Projects</h2>
              <p className="text-lg text-gray-700 mb-4">
                If you&apos;re planning a new renewable energy project in Cyprus today — whether a 1MW commercial rooftop
                or a 10MW utility-scale park — building without Battery Energy Storage is like buying a car without
                insurance. The question is no longer <em>&ldquo;should I add BESS?&rdquo;</em> but rather
                <em>&ldquo;how much BESS do I need?&rdquo;</em>
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Three converging forces have made this shift inevitable: runaway curtailment destroying production,
                midday price collapse eroding per-MWh revenue, and EU-wide regulatory trends mandating storage
                integration. Let&apos;s examine each with real data.
              </p>
            </div>

            {/* Section 2: Curtailment Explosion */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                Curtailment: From Zero to Crisis in Four Years
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus has experienced the most dramatic curtailment escalation in the entire EU. Data from an
                operational 5.01MW solar park tells the story:
              </p>

              {/* Curtailment Timeline */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Curtailment Growth: 0% to 47% in 4 Years
                  </h3>
                  <p className="text-gray-600">
                    Real operational data from a 5.01MW solar park in Cyprus
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {[
                      { year: '2021', curtailment: 0, production: '10,146', color: 'green', height: '100%' },
                      { year: '2022', curtailment: 3.5, production: '9,897', color: 'green', height: '96.5%' },
                      { year: '2023', curtailment: 13.4, production: '8,861', color: 'orange', height: '86.6%' },
                      { year: '2024', curtailment: 29, production: '7,436', color: 'orange', height: '71%' },
                      { year: '2025', curtailment: 47, production: '5,599', color: 'red', height: '53%' },
                    ].map((item) => (
                      <div key={item.year} className="text-center">
                        <div className="text-sm font-semibold text-gray-700 mb-2">{item.year}</div>
                        <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                            style={{ height: item.height }}
                          />
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-gray-500">Curtailment</div>
                          <div className={`text-lg font-bold text-${item.color}-600`}>
                            {item.curtailment}%
                          </div>
                          <div className="text-xs text-gray-400">{item.production} MWh</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      <span className="inline-block w-4 h-4 bg-green-400 rounded mr-2 align-middle"></span>
                      Energy Sold
                      <span className="inline-block w-4 h-4 bg-red-400 rounded ml-6 mr-2 align-middle"></span>
                      Curtailed Energy (Wasted)
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                At a system-wide level, the numbers are staggering. In 2025, approximately <strong>306 GWh</strong> of
                clean solar energy was curtailed — enough to power 51,000 households for an entire year. That
                represents an 83% increase over 2024&apos;s already-alarming 167 GWh.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-red-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  Why is curtailment so extreme in Cyprus?
                </p>
                <p className="text-gray-700">
                  Cyprus operates as an <strong>isolated grid</strong> with zero interconnection to any neighbouring country.
                  Unlike Spain, Germany, or Greece — which can export surplus solar to neighbours — every MWh generated
                  in Cyprus must be consumed on-island or wasted. Meanwhile, the TSO must maintain 210-250 MW of
                  conventional &ldquo;must-run&rdquo; thermal generation for grid stability, directly competing with solar
                  during peak production hours.
                </p>
              </div>
            </div>

            {/* Section 3: Revenue Loss Per MW Size */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Euro className="w-8 h-8 text-red-500" />
                What Curtailment Actually Costs You: Loss Per MW
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The financial impact scales linearly with park size. Here&apos;s what solar-only operators are
                losing annually at current curtailment rates, based on verified 2025 operational data:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">1 MW Park</CardTitle>
                      <Badge variant="destructive">Small Commercial</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gross Production:</span>
                      <span>~2,000 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Curtailed (47%):</span>
                      <span className="text-red-600 font-semibold">~940 MWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Net Sold:</span>
                      <span>~1,060 MWh</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 text-red-700">
                      <span>Annual Revenue Lost:</span>
                      <span>~€178,600</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">at avg €190/MWh</div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">3 MW Park</CardTitle>
                      <Badge variant="destructive">Medium Commercial</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gross Production:</span>
                      <span>~6,000 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Curtailed (47%):</span>
                      <span className="text-red-600 font-semibold">~2,820 MWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Net Sold:</span>
                      <span>~3,180 MWh</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 text-red-700">
                      <span>Annual Revenue Lost:</span>
                      <span>~€535,800</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">at avg €190/MWh</div>
                  </CardContent>
                </Card>

                <Card className="border-red-300 bg-red-100/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">5 MW Park</CardTitle>
                      <Badge variant="destructive">Utility Scale</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gross Production:</span>
                      <span>~10,000 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Curtailed (47%):</span>
                      <span className="text-red-600 font-semibold">~4,700 MWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Net Sold:</span>
                      <span>~5,300 MWh</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 text-red-700">
                      <span>Annual Revenue Lost:</span>
                      <span>~€893,000</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">at avg €190/MWh</div>
                  </CardContent>
                </Card>

                <Card className="border-red-400 bg-red-100/60">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">10 MW Park</CardTitle>
                      <Badge variant="destructive">Large Utility</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gross Production:</span>
                      <span>~20,000 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Curtailed (47%):</span>
                      <span className="text-red-600 font-semibold">~9,400 MWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Net Sold:</span>
                      <span>~10,600 MWh</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 text-red-700">
                      <span>Annual Revenue Lost:</span>
                      <span>~€1,786,000</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">at avg €190/MWh</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <TrendingDown className="inline w-5 h-5 mr-2" />
                  Over 25 years, a 5MW park without BESS loses €22.3 million in unrealised revenue.
                </p>
                <p className="text-gray-700">
                  And this assumes curtailment stabilises at 47%. With 200+ MW of new solar licensed for 2026-2027,
                  the trend will only worsen without grid-scale storage deployment.
                </p>
              </div>
            </div>

            {/* Section 4: Midday Price Collapse */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Sun className="w-8 h-8 text-amber-500" />
                The Midday Price Collapse: When Solar Eats Itself
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Even the energy that <em>isn&apos;t</em> curtailed faces a brutal economic reality. When every solar
                park on the island generates at full capacity between 10:00-14:00, electricity prices collapse.
                Verified data from 134 days of Cyprus Day-Ahead Market (DAM) trading (October 2025 – February 2026)
                reveals a stark picture:
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-blue-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  Cyprus Electricity Price Profile: Midday vs Evening
                </h3>

                {/* Price comparison visual */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-amber-100/80 border-amber-300">
                    <CardContent className="pt-6 text-center">
                      <Sun className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                      <div className="text-sm font-semibold text-amber-800 mb-1">Midday Average (10:00-14:00)</div>
                      <div className="text-4xl font-bold text-amber-700">€101</div>
                      <div className="text-sm text-amber-600">/MWh</div>
                      <div className="mt-3 text-xs text-amber-700 bg-amber-200 rounded-full px-3 py-1 inline-block">
                        Daily low: €77/MWh at 12:00
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-100/80 border-gray-300">
                    <CardContent className="pt-6 text-center">
                      <BarChart3 className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                      <div className="text-sm font-semibold text-gray-700 mb-1">Daily Average</div>
                      <div className="text-4xl font-bold text-gray-700">€158</div>
                      <div className="text-sm text-gray-600">/MWh</div>
                      <div className="mt-3 text-xs text-gray-700 bg-gray-200 rounded-full px-3 py-1 inline-block">
                        134-day verified dataset
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-100/80 border-blue-300">
                    <CardContent className="pt-6 text-center">
                      <Moon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className="text-sm font-semibold text-blue-800 mb-1">Peak Evening (17:00-21:00)</div>
                      <div className="text-4xl font-bold text-blue-700">€183</div>
                      <div className="text-sm text-blue-600">/MWh</div>
                      <div className="mt-3 text-xs text-blue-700 bg-blue-200 rounded-full px-3 py-1 inline-block">
                        Daily high: €186/MWh at 19:00
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600">€81.86/MWh</div>
                    <div className="text-sm text-gray-600 mt-1">Average Peak-to-Midday Spread</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-bold text-green-600">100%</div>
                      <div className="text-gray-500">Days with positive spread</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600">78%</div>
                      <div className="text-gray-500">Days with spread &gt;€20</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600">61%</div>
                      <div className="text-gray-500">Days with spread &gt;€40</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The implications are devastating for solar-only operators. Your panels produce the most energy
                precisely when it&apos;s worth the least. On some days, midday prices dip to <strong>zero or even
                negative</strong> — 5.2% of all half-hour periods in our dataset recorded €0/MWh prices, and 7.3%
                were at or below €10/MWh.
              </p>

              <p className="text-lg text-gray-700 mb-4">
                A BESS changes this equation fundamentally. Instead of being forced to sell at rock-bottom midday
                prices (or having your production curtailed entirely), you <strong>store energy at €0 cost</strong> (since
                it would otherwise be wasted) and <strong>discharge during the €183/MWh evening peak</strong>.
                Every MWh shifted from curtailment to evening dispatch nets you ~€161/MWh after accounting for
                87.8% round-trip efficiency losses.
              </p>
            </div>

            {/* Section 5: EU Markets Comparison */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-500" />
                What Other EU Markets Are Doing — and Why Cyprus Must Follow
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus is not alone in facing solar integration challenges. But while other EU markets have
                adapted, Cyprus remains critically behind on storage deployment:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold border-b-2">Market</th>
                      <th className="text-center p-4 font-semibold border-b-2">Curtailment Rate</th>
                      <th className="text-center p-4 font-semibold border-b-2">Grid-Scale BESS</th>
                      <th className="text-center p-4 font-semibold border-b-2">Interconnection</th>
                      <th className="text-center p-4 font-semibold border-b-2">BESS Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-red-50 border-b">
                      <td className="p-4 font-bold text-red-800">Cyprus</td>
                      <td className="text-center p-4 text-red-700 font-bold">47%</td>
                      <td className="text-center p-4 text-red-600">~0 MW</td>
                      <td className="text-center p-4">None (isolated)</td>
                      <td className="text-center p-4 text-red-600">Limited — Category B only</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Germany</td>
                      <td className="text-center p-4 text-green-600">3-5%</td>
                      <td className="text-center p-4">12+ GW deployed</td>
                      <td className="text-center p-4">17 interconnectors</td>
                      <td className="text-center p-4 text-green-600">Full market participation</td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="p-4 font-semibold">Spain</td>
                      <td className="text-center p-4 text-green-600">2-4%</td>
                      <td className="text-center p-4">4.5+ GW deployed</td>
                      <td className="text-center p-4">France, Portugal, Morocco</td>
                      <td className="text-center p-4 text-green-600">Capacity market + ancillary</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Italy</td>
                      <td className="text-center p-4 text-yellow-600">5-8%</td>
                      <td className="text-center p-4">3+ GW deployed</td>
                      <td className="text-center p-4">Multiple (FR, AT, CH, SI)</td>
                      <td className="text-center p-4 text-green-600">MACSE capacity market</td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="p-4 font-semibold">Greece</td>
                      <td className="text-center p-4 text-yellow-600">6-10%</td>
                      <td className="text-center p-4">1.5+ GW pipeline</td>
                      <td className="text-center p-4">Italy, Bulgaria, Turkey</td>
                      <td className="text-center p-4 text-green-600">Hybrid licensing + storage targets</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">UK</td>
                      <td className="text-center p-4 text-green-600">1-3%</td>
                      <td className="text-center p-4">8+ GW deployed</td>
                      <td className="text-center p-4">France, Netherlands, Belgium</td>
                      <td className="text-center p-4 text-green-600">Full merchant + CfD</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 text-blue-900">EU Trends Making BESS Mandatory</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Germany:</strong> New PV parks above 1MW now routinely pair with BESS. The market rewards flexibility — arbitrage revenue alone justifies investment.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Spain:</strong> Hybrid PV+BESS auctions launched in 2024. Storage co-location gives priority grid access and better PPAs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Italy:</strong> MACSE capacity market pays BESS operators €70k-120k/MW/year just for availability — on top of energy revenues.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>UK:</strong> 8 GW of grid-scale BESS delivers frequency response + arbitrage. New solar without co-located storage is now the exception.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 text-red-900">Why Cyprus Is Uniquely Vulnerable</h3>
                    <ul className="space-y-3 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Zero interconnection:</strong> No cables to export surplus. Every MWh must be used or stored on-island.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Highest solar irradiation:</strong> 1,800 kWh/m²/year means massive midday oversupply vs tiny grid demand.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>No grid-scale BESS:</strong> ~0 MW deployed vs 12+ GW in Germany. Cyprus is years behind.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>76% fossil fuel dependency:</strong> Grid carbon intensity is 493 gCO₂/kWh — more than double the EU average of 230.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Globe className="inline w-5 h-5 mr-2 text-blue-500" />
                  The direction across Europe is unmistakable: <strong>every major EU market is either mandating,
                  incentivising, or economically driving co-located BESS for new solar</strong>. Cyprus will follow
                  this trajectory — the only question is whether you invest now at lower BESS prices, or later when
                  it becomes regulatory requirement.
                </p>
              </div>
            </div>

            {/* Section 6: The Price Arbitrage Opportunity */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                The BESS Business Case: Two Revenue Streams
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                BESS doesn&apos;t just protect against losses — it creates new revenue. For Cyprus RES projects,
                the business case rests on two pillars:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Revenue Stream 1: Curtailment Recovery</CardTitle>
                    <CardDescription>Capture energy that would otherwise be wasted</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Charge cost:</span>
                      <span className="font-semibold text-green-700">€0/MWh (free — curtailed solar)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discharge price:</span>
                      <span className="font-semibold">€183/MWh (evening peak)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Round-trip efficiency:</span>
                      <span>87.8%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold text-green-700">
                      <span>Net revenue per MWh:</span>
                      <span>~€161/MWh</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This is pure profit recovery — you&apos;re monetising energy that would otherwise
                      generate zero income.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Revenue Stream 2: Time-of-Day Arbitrage</CardTitle>
                    <CardDescription>Sell at evening premium instead of midday discount</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Midday selling price:</span>
                      <span className="text-amber-700 font-semibold">€101/MWh average</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Evening selling price:</span>
                      <span className="text-blue-700 font-semibold">€183/MWh average</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Spread after efficiency:</span>
                      <span>~€60/MWh net</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold text-blue-700">
                      <span>Arbitrage premium:</span>
                      <span>+59% per MWh</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Even non-curtailed energy earns 59% more when shifted to evening hours.
                      Future DAM access legislation will unlock additional grid arbitrage.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 7: Real ROI by Park Size */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-3xl font-heading font-bold mb-2 text-center">BESS ROI by Park Size</h2>
              <p className="text-center text-gray-600 mb-8">
                Conservative estimates based on 2025 curtailment levels and verified market pricing
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>5 MW Park + 12.5 MWh BESS</CardTitle>
                    <CardDescription>2.5 MWh per MW installed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">BESS Investment:</span>
                      <span className="font-bold">€1,750,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual BESS Revenue:</span>
                      <span className="text-green-600 font-semibold">€294,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual BESS OPEX:</span>
                      <span>€25,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Net BESS Income:</span>
                      <span className="font-bold text-green-600">€269,000/year</span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">BESS Standalone ROI</div>
                      <div className="text-3xl font-bold text-green-700">15.4%</div>
                      <div className="text-xs text-gray-500">Payback: ~6.5 years</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>10 MW Park + 25 MWh BESS</CardTitle>
                    <CardDescription>2.5 MWh per MW installed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">BESS Investment:</span>
                      <span className="font-bold">€2,875,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual BESS Revenue:</span>
                      <span className="text-green-600 font-semibold">€588,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual BESS OPEX:</span>
                      <span>€43,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Net BESS Income:</span>
                      <span className="font-bold text-green-600">€545,000/year</span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">BESS Standalone ROI</div>
                      <div className="text-3xl font-bold text-green-700">19.0%</div>
                      <div className="text-xs text-gray-500">Payback: ~5.3 years | Economies of scale</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <p className="text-lg text-gray-700">
                  <strong>Key insight:</strong> BESS equipment costs drop significantly at scale
                  (€165k/MWh for small systems vs €100-115k/MWh for large systems), meaning larger parks
                  achieve even better BESS ROI through economies of scale.
                </p>
              </div>
            </div>

            {/* Section 8: Environmental Cost */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                The Hidden Environmental Cost
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                When solar energy is curtailed, the grid must burn fossil fuels to meet that same demand later
                in the day. The environmental cost is staggering:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="text-center bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-gray-800 mb-1">200,000+</div>
                    <div className="text-sm text-gray-600">Tonnes CO₂ from curtailment in 2025</div>
                    <div className="text-xs text-gray-400 mt-2">Clean energy wasted, replaced by fossil fuels</div>
                  </CardContent>
                </Card>

                <Card className="text-center bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-gray-800 mb-1">€15M+</div>
                    <div className="text-sm text-gray-600">ETS penalties from curtailment alone</div>
                    <div className="text-xs text-gray-400 mt-2">EU Emissions Trading costs passed to consumers</div>
                  </CardContent>
                </Card>

                <Card className="text-center bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-gray-800 mb-1">493</div>
                    <div className="text-sm text-gray-600">gCO₂/kWh grid intensity (vs 230 EU avg)</div>
                    <div className="text-xs text-gray-400 mt-2">Cyprus: 2x the EU average carbon intensity</div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700">
                BESS deployment doesn&apos;t just improve your ROI — it directly reduces carbon emissions by
                displacing evening fossil fuel generation with stored solar energy. Every MWh shifted from
                daytime curtailment to evening dispatch prevents ~0.49 tonnes of CO₂ from being emitted.
              </p>
            </div>

            {/* Section 9: Regulatory Outlook */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-500" />
                What&apos;s Coming: Regulatory Tailwinds
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus is behind but catching up. Several regulatory developments will further strengthen
                the case for BESS:
              </p>

              <div className="space-y-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">DAM Arbitrage Access (Expected)</h3>
                        <p className="text-gray-700 text-sm">
                          Upcoming legislation will allow BESS to charge from the grid (not just from co-located solar).
                          This unlocks an additional ~€72/MWh net revenue per charge-discharge cycle from pure grid
                          arbitrage — on top of curtailment recovery.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Grid Services Market</h3>
                        <p className="text-gray-700 text-sm">
                          Frequency regulation, voltage support, and spinning reserve markets are being developed.
                          In mature EU markets, these services generate €50-120k/MW/year in additional revenue for
                          BESS operators.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">EuroAsia Interconnector</h3>
                        <p className="text-gray-700 text-sm">
                          The 2,000 MW submarine cable connecting Cyprus to Greece and Israel will eventually reduce
                          curtailment by enabling exports. But it won&apos;t arrive before 2029+ — meaning BESS is
                          the only solution for the next 3-5 years of acute curtailment.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <strong>Bottom line:</strong> Investing in BESS now means you benefit from curtailment recovery
                  today, and unlock additional revenue streams (grid arbitrage, ancillary services) as the
                  regulatory framework matures. Early movers get the best returns.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                The Window to Act Is Now
              </h2>
              <p className="text-xl mb-4 opacity-90">
                BESS equipment prices are at historic lows. Curtailment is at historic highs. The spread between
                midday and evening prices guarantees returns. Every month you wait is revenue permanently lost.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Whether you&apos;re developing a new PV project or retrofitting an existing park, we can design
                the right BESS solution for your specific curtailment profile and revenue targets.
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
                Contact Alexander Papacosta: +357 99 164 158 | alexander.papacosta@lighthief.com
              </p>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
