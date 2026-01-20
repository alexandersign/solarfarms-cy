import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Linkedin, 
  Twitter, 
  Battery,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calculator
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cyprus Grid Curtailment Hits 45.8% in 2025: Why BESS is Essential | SolarFarms.cy',
  description: 'Analysis of Cyprus solar curtailment reaching record 45.8% levels and why battery energy storage systems (BESS) are now critical for protecting solar investment returns.',
  keywords: [
    'Cyprus solar curtailment 2025',
    'BESS Cyprus',
    'solar curtailment solution',
    'battery energy storage Cyprus',
    'grid curtailment',
    'solar ROI protection',
    'Cyprus energy storage',
    'solar investment risk',
  ],
  openGraph: {
    title: 'Cyprus Grid Curtailment Hits 45.8% in 2025: Why BESS is Essential',
    description: 'Analysis of record Cyprus curtailment and the BESS solution',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00.000Z',
    authors: ['Alexander Papacosta'],
  },
  alternates: {
    canonical: 'https://solarfarms.cy/blog/cyprus-solar-curtailment-2025-bess-solution'
  }
}

export default function CurtailmentBessArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <Image
          src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
          alt="Solar panels in Cyprus facing curtailment challenges"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="container relative z-10 pb-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <Badge className="bg-red-500 text-white mb-4">Market Analysis</Badge>
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 max-w-4xl">
            Cyprus Grid Curtailment Hits 45.8% in 2025: Why BESS is Now Essential
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-solar-500 rounded-full flex items-center justify-center text-white font-bold">
                AP
              </div>
              <span>Alexander Papacosta</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              January 15, 2025
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              8 min read
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 prose prose-lg max-w-none">
              {/* Key Takeaways */}
              <Card className="not-prose mb-8 border-solar-200 bg-solar-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-solar-600" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-solar-600 font-bold">•</span>
                      Cyprus solar curtailment reached 45.8% in Q1 2025, up from 26.7% in 2024
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-solar-600 font-bold">•</span>
                      Without BESS, solar farms lose up to 45% of potential revenue
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-solar-600 font-bold">•</span>
                      BESS can recover 50% of curtailed energy, boosting ROI by 2-4%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-solar-600 font-bold">•</span>
                      Linyang BESS systems from €100k/MWh make storage economically viable
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <p className="lead text-xl text-gray-600">
                The Cyprus electricity grid is struggling under the weight of rapid solar deployment. 
                In Q1 2025, curtailment rates hit a record <strong>45.8%</strong>, meaning nearly half 
                of all solar energy generated couldn&apos;t be sold to the grid. For investors, this 
                creates both a challenge and an opportunity.
              </p>

              <h2>Understanding Cyprus Curtailment</h2>
              
              <p>
                Curtailment occurs when the grid operator (TSO) orders solar plants to reduce or stop 
                generation because the grid cannot absorb all the electricity being produced. In Cyprus, 
                this happens primarily during midday hours when solar production peaks but demand is 
                relatively low.
              </p>

              <div className="not-prose my-8">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-2">2025 Curtailment Crisis</h4>
                        <div className="grid grid-cols-3 gap-4 text-center mt-4">
                          <div>
                            <div className="text-3xl font-bold text-red-600">45.8%</div>
                            <div className="text-xs text-red-700">Q1 2025 Rate</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-red-600">€180k</div>
                            <div className="text-xs text-red-700">Lost Revenue/MW/yr</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-red-600">6-8hrs</div>
                            <div className="text-xs text-red-700">Peak Curtailment</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2>Historical Curtailment Trends</h2>

              <p>
                Cyprus has experienced rapidly increasing curtailment as solar capacity has grown 
                faster than grid infrastructure:
              </p>

              <div className="not-prose my-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold">Year</th>
                        <th className="text-center py-2 font-semibold">Curtailment Rate</th>
                        <th className="text-center py-2 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">2022</td>
                        <td className="text-center">12.3%</td>
                        <td className="text-center text-gray-500">—</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">2023</td>
                        <td className="text-center">19.7%</td>
                        <td className="text-center text-red-600">+7.4%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">2024</td>
                        <td className="text-center">26.7%</td>
                        <td className="text-center text-red-600">+7.0%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold">2025 (Q1)</td>
                        <td className="text-center font-bold text-red-600">45.8%</td>
                        <td className="text-center text-red-600">+19.1%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-4">
                    Source: Cyprus TSO data, Lighthief analysis
                  </p>
                </div>
              </div>

              <h2>The BESS Solution</h2>

              <p>
                Battery Energy Storage Systems (BESS) offer a compelling solution to the curtailment 
                problem. Instead of losing revenue when the grid curtails your solar plant, you store 
                the excess energy and sell it later when prices are higher.
              </p>

              <div className="not-prose my-8">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Battery className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-900 mb-2">How BESS Protects Your Investment</h4>
                        <ul className="space-y-2 text-sm text-green-800">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Store curtailed energy instead of losing it
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Discharge during evening peak hours (€0.19-0.21/kWh)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Recover 50%+ of otherwise lost revenue
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Future-proof against increasing curtailment
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2>Financial Impact: Solar Only vs. Solar + BESS</h2>

              <p>
                Let&apos;s analyze a typical 5MW solar park in Cyprus comparing returns with and 
                without battery storage:
              </p>

              <div className="not-prose my-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-red-200">
                    <CardContent className="p-6 text-center">
                      <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-4">Solar Only</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Production</span>
                          <span className="font-semibold">8,250 MWh/yr</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Curtailed (45.8%)</span>
                          <span className="font-semibold">-3,778 MWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Sold</span>
                          <span className="font-semibold">4,472 MWh</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span className="font-semibold">Net Revenue</span>
                          <span className="font-bold text-red-600">€850k/yr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI</span>
                          <span className="font-semibold">11.3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-4">Solar + 2hr BESS</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Production</span>
                          <span className="font-semibold">8,250 MWh/yr</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>BESS Recovered</span>
                          <span className="font-semibold">+1,670 MWh</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Sold</span>
                          <span className="font-semibold">6,142 MWh</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                          <span className="font-semibold">Net Revenue</span>
                          <span className="font-bold text-green-600">€1,168k/yr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI</span>
                          <span className="font-semibold text-green-600">13.6%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Based on 5MW solar park, €9.5M CAPEX (solar only), €10.7M with BESS. Linyang 88.39% RTE.
                </p>
              </div>

              <h2>BESS Pricing in Cyprus</h2>

              <p>
                As the official Cyprus distributor for Linyang energy storage systems, Lighthief 
                offers competitive pricing for utility-scale BESS installations:
              </p>

              <div className="not-prose my-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold">System Size</th>
                        <th className="text-center py-2 font-semibold">Price/MWh</th>
                        <th className="text-center py-2 font-semibold">Payback</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">1-2 MW (Small Commercial)</td>
                        <td className="text-center">€165k-175k</td>
                        <td className="text-center">5-6 years</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">2.5-5 MW (Medium Utility)</td>
                        <td className="text-center">€125k-145k</td>
                        <td className="text-center">4-5 years</td>
                      </tr>
                      <tr>
                        <td className="py-2">8-25 MW (Large Utility)</td>
                        <td className="text-center">€100k-115k</td>
                        <td className="text-center">4 years</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-4">
                    Turnkey installed pricing including MV integration. LTSA available.
                  </p>
                </div>
              </div>

              <h2>Conclusion: BESS is No Longer Optional</h2>

              <p>
                With curtailment rates approaching 50%, battery storage has shifted from a 
                &quot;nice to have&quot; to a critical investment protection measure. The economics 
                are clear: BESS systems pay for themselves in 4-5 years while adding 2-4% to your 
                overall project IRR.
              </p>

              <p>
                For existing solar parks, retrofitting BESS is increasingly attractive. For new 
                projects, we strongly recommend integrating storage from day one.
              </p>

              <div className="not-prose mt-8 p-6 bg-gradient-to-r from-solar-50 to-cyprus-50 rounded-xl border border-solar-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-solar-600" />
                  Model Your BESS Investment
                </h3>
                <p className="text-gray-600 mb-4">
                  Use our advanced calculator to model BESS integration for your specific project, 
                  with real Linyang pricing and Cyprus market data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="gradient" asChild>
                    <Link href="/calculator">Open Advanced Calculator</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/energy-storage">Explore BESS Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Share this article</h4>
                  <div className="flex gap-3">
                    <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Related */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Related Articles</h4>
                  <div className="space-y-4">
                    <Link href="/blog/linyang-bess-systems-cyprus-pricing-guide" className="block group">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-solar-600 transition-colors">
                        Linyang BESS Systems: Complete Cyprus Pricing Guide 2025
                      </p>
                      <p className="text-xs text-gray-500 mt-1">6 min read</p>
                    </Link>
                    <Link href="/blog/bitcoin-mining-cyprus-solar-farm" className="block group">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-solar-600 transition-colors">
                        Bitcoin Mining with Solar Power in Cyprus
                      </p>
                      <p className="text-xs text-gray-500 mt-1">10 min read</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-cyprus-600 to-solar-600 text-white">
                <CardContent className="p-6 text-center">
                  <Battery className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <h4 className="font-bold mb-2">Get a BESS Quote</h4>
                  <p className="text-sm opacity-90 mb-4">
                    Request a customized BESS proposal for your solar park
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                    <Link href="/energy-storage#inquiry">Request Proposal</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </article>
  )
}
