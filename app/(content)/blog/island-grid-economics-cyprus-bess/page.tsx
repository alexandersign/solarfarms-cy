import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  Battery,
  Shield,
  Sun,
  Moon,
  Network,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "Island Grid Economics: Why BESS on Cyprus's Isolated Grid Is Different from Mainland Europe",
  description: "Cyprus operates the EU's only fully isolated electricity grid — no interconnectors, no frequency support from neighbours. This creates unique BESS economics that mainland European models cannot capture.",
  keywords: [
    'island grid BESS',
    'Cyprus electricity grid',
    'isolated grid energy storage',
    'Cyprus energy transition',
    'BESS economics island grid',
    'Cyprus TSOC grid',
    'EuroAsia interconnector BESS',
    'Cyprus solar curtailment grid',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Island Grid Economics: Why BESS on Cyprus\u2019s Isolated Grid Is Different from Mainland Europe",
  datePublished: '2026-03-23',
  dateModified: '2026-03-23',
  author: {
    '@type': 'Person',
    name: 'Alexander Papacosta',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lighthief Cyprus Ltd',
    logo: {
      '@type': 'ImageObject',
      url: 'https://solarfarms.cy/images/logo.png',
    },
  },
  description: "Cyprus operates the EU's only fully isolated electricity grid — no interconnectors, no frequency support from neighbours. This creates unique BESS economics that mainland European models cannot capture.",
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://solarfarms.cy/blog/island-grid-economics-cyprus-bess',
  },
}

export default function IslandGridEconomicsArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-indigo-600 text-white">
              Market Analysis &mdash; March 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Island Grid Economics
              <span className="block gradient-text mt-2">
                Why BESS on Cyprus&apos;s Isolated Grid Is Different from Mainland Europe
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Cyprus has zero interconnection to any neighbouring grid. Every MWh generated must be
              consumed or stored on-island. This creates a fundamentally different business case for
              Battery Energy Storage Systems &mdash; one that mainland European models simply cannot capture.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>March 23, 2026</span>
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

            {/* Section 1: The Island Grid Problem */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-indigo-500" />
                The Island Grid Problem
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus&apos;s electricity grid has a peak demand of approximately 1,500&nbsp;MW &mdash; and it is
                completely isolated. The Transmission System Operator Cyprus (TSOC) must balance supply
                and demand in real time with absolutely no help from neighbouring grids.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Consider what this means in practice. Germany can export surplus solar to 17 neighbouring
                grids. Spain sends excess power to France, Portugal, and Morocco. Even Greece &mdash; Cyprus&apos;s
                closest EU neighbour &mdash; has interconnectors to Italy, Bulgaria, and Turkey. Cyprus has none.
                Not a single cable connects the island to any other electricity system.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The EuroAsia Interconnector &mdash; an ambitious 2,000&nbsp;MW submarine cable linking Cyprus to
                Greece and Israel &mdash; won&apos;t arrive before 2029 at the earliest. Until then, every electron
                generated on the island must find a home on the island, or it is wasted.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-indigo-900 mb-2">
                  <Network className="inline w-5 h-5 mr-2" />
                  This isolation creates three cascading effects that fundamentally alter BESS economics:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-2">
                  <li>A curtailment spiral that worsens every year</li>
                  <li>Extreme price volatility with no smoothing mechanism</li>
                  <li>A must-run thermal constraint that locks out solar</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-indigo-700 mb-1">0</div>
                    <div className="text-sm text-gray-600">Interconnectors</div>
                    <div className="text-xs text-gray-400 mt-1">Fully isolated grid</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-indigo-700 mb-1">1,500</div>
                    <div className="text-sm text-gray-600">MW Peak Demand</div>
                    <div className="text-xs text-gray-400 mt-1">Small grid, big solar</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-indigo-700 mb-1">2029+</div>
                    <div className="text-sm text-gray-600">Interconnector ETA</div>
                    <div className="text-xs text-gray-400 mt-1">EuroAsia cable</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-red-600 mb-1">47%</div>
                    <div className="text-sm text-gray-600">Solar Curtailment</div>
                    <div className="text-xs text-gray-400 mt-1">2025 actual</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 2: Effect 1 — Curtailment Spiral */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-red-500" />
                Effect 1: The Curtailment Spiral
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Without interconnection, excess solar production has literally nowhere to go. TSOC must
                maintain 210&ndash;250&nbsp;MW of conventional thermal generation as &ldquo;must-run&rdquo; capacity at
                all times to provide frequency regulation and system inertia. This thermal floor is
                non-negotiable &mdash; the grid physically cannot operate without it.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                On a sunny day with 500+&nbsp;MW of solar producing, the grid literally cannot absorb all
                the energy. After meeting demand and maintaining the thermal floor, there is simply no
                room for the remaining solar output. The result: TSOC orders solar parks to curtail &mdash;
                to reduce or completely stop production despite perfect sunshine.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The trajectory has been devastating: from 0% curtailment in 2021 to 47% in 2025, a
                near-vertical climb that shows no sign of slowing. With 200+&nbsp;MW of new solar capacity
                licensed for 2026&ndash;2027, the spiral will only tighten.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Curtailment Rate Comparison: Cyprus vs Mainland Europe</CardTitle>
                  <CardDescription>
                    Island isolation drives curtailment rates 5&ndash;20&times; higher than interconnected markets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-red-800">Cyprus (isolated)</span>
                        <span className="font-bold text-red-700">47%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: '94%' }}
                        >
                          <span className="text-white text-xs font-semibold">47%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-yellow-800">Greece (partial interconnection)</span>
                        <span className="font-bold text-yellow-700">6&ndash;10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: '20%' }}
                        >
                          <span className="text-white text-xs font-semibold">~8%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-yellow-700">Italy (multiple interconnectors)</span>
                        <span className="font-bold text-yellow-600">5&ndash;8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: '13%' }}
                        >
                          <span className="text-white text-xs font-semibold">~6%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-green-800">Germany (17 interconnectors)</span>
                        <span className="font-bold text-green-700">3&ndash;5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: '8%' }}
                        >
                          <span className="text-white text-xs font-semibold">~4%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-green-700">Spain (FR, PT, MA interconnections)</span>
                        <span className="font-bold text-green-600">2&ndash;4%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-green-300 to-green-400 h-6 rounded-full flex items-center justify-end pr-2"
                          style={{ width: '6%' }}
                        >
                          <span className="text-white text-xs font-semibold">~3%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Source: National TSO data, ENTSO-E Transparency Platform (2024&ndash;2025)
                  </p>
                </CardContent>
              </Card>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <AlertTriangle className="inline w-5 h-5 mr-2 text-red-500" />
                  <strong>The pattern is unmistakable:</strong> interconnection is the single greatest
                  predictor of curtailment levels. Cyprus, with zero interconnection, sits at the extreme
                  end of the scale &mdash; and will remain there until the EuroAsia Interconnector arrives
                  in 2029 at the earliest.
                </p>
              </div>
            </div>

            {/* Section 3: Effect 2 — Extreme Price Volatility */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-500" />
                Effect 2: Extreme Price Volatility
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Island grids have exaggerated price swings compared to interconnected markets. On mainland
                Europe, interconnection acts as a natural price-smoothing mechanism &mdash; surplus electricity
                in one country flows to a deficit in another, dampening peaks and filling troughs.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus has no smoothing mechanism whatsoever. When solar floods the grid at midday, prices
                collapse to &euro;77&ndash;101/MWh because there is no export route to relieve the oversupply.
                When the sun sets and thermal generation must ramp to meet evening demand, prices spike to
                &euro;183&ndash;186/MWh because there is no imported electricity to moderate the surge.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The resulting average spread of &euro;82/MWh between peak evening and midday prices is
                significantly higher than most mainland European markets &mdash; and this spread is the
                foundation of BESS arbitrage economics.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <Sun className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <div className="text-center">
                      <div className="text-sm font-semibold text-amber-800 mb-1">Midday (10:00&ndash;14:00)</div>
                      <div className="text-4xl font-bold text-amber-700">&euro;77&ndash;101</div>
                      <div className="text-sm text-amber-600">/MWh average</div>
                      <p className="text-xs text-gray-500 mt-3">
                        Solar oversupply crashes prices &mdash; no export route to absorb excess
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="pt-6">
                    <Moon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-800 mb-1">Evening Peak (17:00&ndash;21:00)</div>
                      <div className="text-4xl font-bold text-blue-700">&euro;183&ndash;186</div>
                      <div className="text-sm text-blue-600">/MWh average</div>
                      <p className="text-xs text-gray-500 mt-3">
                        Thermal generation needed after sunset &mdash; no imports to dampen prices
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Price Spread Comparison: Island vs Mainland</CardTitle>
                  <CardDescription>
                    Average peak-to-midday arbitrage spread by market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-semibold text-gray-700">Cyprus</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-8">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-8 rounded-full flex items-center justify-end pr-3"
                          style={{ width: '100%' }}
                        >
                          <span className="text-white text-sm font-bold">&euro;82/MWh</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-semibold text-gray-700">Germany</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-8">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-500 h-8 rounded-full flex items-center justify-end pr-3"
                          style={{ width: '43%' }}
                        >
                          <span className="text-white text-sm font-bold">~&euro;35/MWh</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-semibold text-gray-700">Spain</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-8">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-8 rounded-full flex items-center justify-end pr-3"
                          style={{ width: '30%' }}
                        >
                          <span className="text-white text-sm font-bold">~&euro;25/MWh</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Wider spreads = more arbitrage revenue per BESS cycle
                  </p>
                </CardContent>
              </Card>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <TrendingUp className="inline w-5 h-5 mr-2 text-green-600" />
                  <strong>For BESS operators, this volatility is an opportunity, not a problem.</strong> Every
                  charge-discharge cycle on Cyprus captures 2&ndash;3&times; more revenue than the same cycle on
                  a mainland European grid, purely because the price spread is wider.
                </p>
              </div>
            </div>

            {/* Section 4: Effect 3 — Must-Run Thermal Constraint */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-500" />
                Effect 3: The Must-Run Thermal Constraint
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Every electricity grid requires a minimum amount of synchronous generation running at all
                times. These thermal generators provide essential services that solar panels cannot:
                rotational inertia to resist frequency changes, reactive power for voltage control, and
                fast-acting governor response to sudden load swings.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                On large continental grids, the collective inertia of thousands of generators across dozens
                of countries provides an enormous buffer. On Cyprus, the buffer is thin. TSOC requires
                210&ndash;250&nbsp;MW of conventional capacity online at all times &mdash; roughly 14&ndash;17% of peak
                demand &mdash; just to keep the grid stable.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This thermal floor directly competes with solar during peak production hours. On a day
                when demand might be 800&nbsp;MW and solar is producing 500+&nbsp;MW, the 250&nbsp;MW
                thermal floor means only 550&nbsp;MW of &ldquo;space&rdquo; exists for solar. The excess
                must be curtailed.
              </p>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 text-center">How BESS Breaks the Thermal Constraint</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Without BESS (Current State)
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold mt-0.5">&times;</span>
                          <span>210&ndash;250 MW thermal must run at all times</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold mt-0.5">&times;</span>
                          <span>Thermal directly competes with solar for limited grid space</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold mt-0.5">&times;</span>
                          <span>No alternative source of inertia or frequency response</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold mt-0.5">&times;</span>
                          <span>Curtailment worsens every MW of new solar added</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2">
                        <Battery className="w-5 h-5" />
                        With BESS (Unlocked Potential)
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold mt-0.5">&check;</span>
                          <span>BESS provides synthetic inertia via grid-forming inverters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold mt-0.5">&check;</span>
                          <span>Sub-second frequency response &mdash; faster than any thermal plant</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold mt-0.5">&check;</span>
                          <span>Potentially reduces thermal must-run by 50&ndash;100 MW</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold mt-0.5">&check;</span>
                          <span>Creates room for MORE solar &mdash; and more BESS revenue</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Zap className="inline w-5 h-5 mr-2 text-amber-500" />
                  This creates a <strong>virtuous cycle</strong>: BESS deployment reduces the thermal floor,
                  which unlocks more solar capacity, which increases curtailment recovery opportunities for
                  BESS, which improves BESS economics further. On island grids, BESS doesn&apos;t just benefit
                  from the problem &mdash; it actively solves it while generating revenue.
                </p>
              </div>
            </div>

            {/* Section 5: Why This Makes BESS Economics Stronger */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Why This Makes BESS Economics Stronger
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Every one of the three island-grid effects &mdash; curtailment, price volatility, and thermal
                constraints &mdash; individually strengthens the BESS business case. Together, they create
                economics that are fundamentally superior to mainland deployments.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This isn&apos;t theoretical. It&apos;s measurable, bankable, and available now. Let&apos;s compare
                the two environments side by side.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold border-b-2">Economic Factor</th>
                      <th className="text-center p-4 font-semibold border-b-2 text-green-700">
                        <div className="flex items-center justify-center gap-2">
                          <Battery className="w-4 h-4" />
                          Island Grid (Cyprus)
                        </div>
                      </th>
                      <th className="text-center p-4 font-semibold border-b-2 text-blue-700">
                        <div className="flex items-center justify-center gap-2">
                          <Network className="w-4 h-4" />
                          Mainland Europe
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Curtailment Recovery</td>
                      <td className="text-center p-4">
                        <span className="text-green-700 font-bold">47% curtailed</span>
                        <div className="text-xs text-gray-500">Massive pool of &ldquo;free&rdquo; energy</div>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-blue-700 font-bold">2&ndash;10% curtailed</span>
                        <div className="text-xs text-gray-500">Limited recovery opportunity</div>
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold text-gray-700">Arbitrage Spread</td>
                      <td className="text-center p-4">
                        <span className="text-green-700 font-bold">&euro;82/MWh avg</span>
                        <div className="text-xs text-gray-500">Midday &euro;77&ndash;101 &rarr; Evening &euro;183&ndash;186</div>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-blue-700 font-bold">&euro;20&ndash;40/MWh avg</span>
                        <div className="text-xs text-gray-500">Interconnection smooths prices</div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold text-gray-700">Grid Services Value</td>
                      <td className="text-center p-4">
                        <span className="text-green-700 font-bold">Premium pricing</span>
                        <div className="text-xs text-gray-500">Small grid = scarce service = high value</div>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-blue-700 font-bold">Competitive pricing</span>
                        <div className="text-xs text-gray-500">Many providers = price compression</div>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold text-gray-700">Competition Risk</td>
                      <td className="text-center p-4">
                        <span className="text-green-700 font-bold">Zero import competition</span>
                        <div className="text-xs text-gray-500">No cheap electricity from neighbours</div>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-blue-700 font-bold">Import competition</span>
                        <div className="text-xs text-gray-500">Cross-border flows cap local prices</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">More &ldquo;Free&rdquo; Energy to Capture</h3>
                    <p className="text-gray-700 text-sm">
                      At 47% curtailment, nearly half of all solar production is wasted. A BESS co-located
                      with a 5&nbsp;MW park can recover 2,000+&nbsp;MWh annually &mdash; energy that costs
                      nothing to capture because it would otherwise be lost entirely.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">More Revenue Per Cycle</h3>
                    <p className="text-gray-700 text-sm">
                      The &euro;82/MWh spread means each charge-discharge cycle on Cyprus generates 2&ndash;3&times;
                      more revenue than the same cycle on a German or Spanish grid. This dramatically shortens
                      BESS payback periods.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Grid Services at a Premium</h3>
                    <p className="text-gray-700 text-sm">
                      Frequency regulation on a 1,500&nbsp;MW island grid is far more valuable than on a
                      500,000&nbsp;MW continental grid. There are fewer providers, the service is more critical,
                      and the TSO will pay accordingly.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No Import Competition</h3>
                    <p className="text-gray-700 text-sm">
                      On mainland Europe, stored energy competes with cheap imports from neighbouring countries.
                      On Cyprus, there are no imports &mdash; every MWh discharged from a BESS displaces expensive
                      thermal generation at full evening prices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 6: The Convergence Window 2026-2029 */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                The Convergence Window: 2026&ndash;2029
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The next three to four years represent a unique convergence of factors that will likely never
                repeat. Three market forces are simultaneously aligned in favour of BESS deployment on Cyprus,
                and each has a limited time horizon.
              </p>

              <div className="space-y-4 mb-8">
                <Card className="border-l-4 border-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">(a) Peak Curtailment Revenues</h3>
                        <p className="text-gray-700 text-sm">
                          Curtailment is at historic highs and climbing. BESS deployed now captures maximum
                          curtailment recovery revenue &mdash; revenue that will naturally decrease once the
                          EuroAsia Interconnector provides an export route for surplus solar. The first years
                          of operation will generate the highest returns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">(b) Early-Mover Advantage in Ancillary Services</h3>
                        <p className="text-gray-700 text-sm">
                          Cyprus&apos;s ancillary services market is nascent. The first BESS operators to offer
                          frequency regulation, voltage support, and spinning reserve will secure premium
                          contracts before competition drives prices down. As the market matures and more
                          BESS comes online, these premium rates will compress.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">(c) Historic Low Equipment Costs</h3>
                        <p className="text-gray-700 text-sm">
                          LFP battery cell prices have fallen approximately 40% since 2023, driven by Chinese
                          manufacturing scale and raw material price normalisation. Current all-in BESS costs
                          of &euro;110&ndash;136/MWh installed are unlikely to fall much further &mdash; and supply
                          chain disruptions, tariffs, or demand surges could push prices back up.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-center mb-4">What Happens After the Interconnector?</h3>
                <p className="text-gray-700 text-center mb-6">
                  When the EuroAsia Interconnector eventually connects Cyprus to the European grid,
                  curtailment will decrease &mdash; but BESS economics don&apos;t disappear. They evolve.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-gray-700 mb-2">Pre-Interconnector</div>
                    <div className="text-xs text-gray-500 mb-3">2026&ndash;2029</div>
                    <Badge className="bg-green-600 text-white mb-2">Primary Revenue</Badge>
                    <p className="text-sm text-gray-700">Curtailment recovery + time-of-day arbitrage</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-gray-700 mb-2">Transition Period</div>
                    <div className="text-xs text-gray-500 mb-3">2029&ndash;2031</div>
                    <Badge className="bg-blue-600 text-white mb-2">Mixed Revenue</Badge>
                    <p className="text-sm text-gray-700">Reduced curtailment + growing grid services market</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-sm font-bold text-gray-700 mb-2">Post-Interconnector</div>
                    <div className="text-xs text-gray-500 mb-3">2031+</div>
                    <Badge className="bg-purple-600 text-white mb-2">Evolved Revenue</Badge>
                    <p className="text-sm text-gray-700">Cross-border arbitrage + ancillary services + capacity payments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Cyprus vs Other Island Grids */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Network className="w-8 h-8 text-blue-600" />
                Cyprus vs Other Island Grids: Lessons Learned
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus is not the first island grid to face these challenges. Other isolated or semi-isolated
                systems have already proven that BESS is the solution &mdash; and the results consistently show
                that island grids are where storage economics are strongest.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">United Kingdom</CardTitle>
                        <CardDescription>Before interconnector expansion</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      The UK deployed 4+ GW of BESS while still partially islanded from continental Europe.
                      Early-mover BESS operators secured frequency response contracts worth &pound;50&ndash;100k/MW/year
                      &mdash; contracts that proved the commercial viability of grid-scale storage globally.
                    </p>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      8+ GW now deployed
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Ireland</CardTitle>
                        <CardDescription>Still partially islanded</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Ireland&apos;s DS3 programme created a dedicated ancillary services market specifically
                      because the island grid needed faster frequency response than thermal plants could provide.
                      BESS operators earn &euro;40&ndash;80k/MW/year from grid services alone.
                    </p>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      DS3 ancillary market
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Sun className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Hawaii</CardTitle>
                        <CardDescription>Extreme solar + storage penetration</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Hawaii mandated 100% renewable energy by 2045 and rapidly deployed BESS to manage
                      extreme solar penetration on small island grids. The Kapolei Energy Storage project
                      (185&nbsp;MW/565&nbsp;MWh) demonstrates utility-scale storage can replace thermal plants entirely.
                    </p>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">
                      100% RES target by 2045
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Canary Islands</CardTitle>
                        <CardDescription>EU island grid with high solar</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Each Canary Island operates an isolated grid similar to Cyprus. BESS deployments on
                      Lanzarote and Tenerife have demonstrated 15&ndash;20% ROI on curtailment recovery alone,
                      validating the island-grid BESS thesis in a Mediterranean/EU regulatory environment.
                    </p>
                    <Badge variant="outline" className="text-red-700 border-red-300">
                      15&ndash;20% demonstrated ROI
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Globe className="inline w-5 h-5 mr-2 text-blue-500" />
                  <strong>The pattern is universal:</strong> every island grid that has deployed BESS at scale
                  has seen stronger returns than comparable mainland installations. Cyprus, with the EU&apos;s
                  highest curtailment rate and widest price spreads, may represent the strongest island-grid
                  BESS opportunity in Europe today.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Explore BESS Opportunities for Your Cyprus Park
              </h2>
              <p className="text-xl mb-4 opacity-90">
                Island-grid economics make Cyprus one of the strongest BESS markets in Europe. Whether
                you&apos;re building a new solar park or retrofitting an existing one, the numbers speak
                for themselves.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Our team has analysed curtailment data from dozens of operational parks across Cyprus.
                Let us show you what BESS can do for your specific project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Battery className="w-5 h-5 mr-2" />
                    Get a BESS Assessment
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/blog/cyprus-curtailment-crisis-bess-solution">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Read Our Curtailment Analysis
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
