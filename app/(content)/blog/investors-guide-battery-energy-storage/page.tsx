import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Battery,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Euro,
  BarChart3,
  Calculator,
  Users,
  Globe,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "The Investor's Guide to Battery Energy Storage | What Every PV Park Owner Needs to Know",
  description: "BESS isn't just technology — it's a revenue protection tool. Learn what battery energy storage means for your solar park's grid connection, asset valuation, and annual returns in Cyprus.",
  keywords: [
    'BESS investment guide',
    'battery storage for solar farms',
    'BESS ROI solar park',
    'battery energy storage investment',
    'BESS Cyprus',
    'solar park battery storage',
    'BESS asset valuation',
    'energy storage solar investment',
  ],
}

export default function InvestorsGuideBatteryEnergyStoragePage() {
  return (
    <div className="min-h-screen">
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The Investor's Guide to Battery Energy Storage",
        "author": { "@type": "Person", "name": "Alexander Papacosta" },
        "publisher": { "@type": "Organization", "name": "Lighthief Cyprus Ltd", "url": "https://solarfarms.cy" },
        "datePublished": "2026-02-18",
        "description": "BESS isn't just technology — it's a revenue protection tool. Learn what battery energy storage means for your solar park's grid connection, asset valuation, and annual returns in Cyprus.",
        "mainEntityOfPage": "https://solarfarms.cy/blog/investors-guide-battery-energy-storage",
      }} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-600 text-white">
              Investment Guide &mdash; March 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              The Investor&apos;s Guide to Battery Energy Storage
              <span className="block gradient-text mt-2">
                What Every PV Park Owner Needs to Know
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              This isn&apos;t a technology primer on how lithium-ion cells work. This is a guide
              for PV park owners and investors who want to understand what adding battery storage
              changes about their business model, their revenue profile, and the long-term value
              of their asset. If you own a solar park in Cyprus &mdash; or are planning to build
              one &mdash; BESS is the single most important decision you&apos;ll make in 2026.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>February 18, 2026</span>
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

            {/* Section 1: What BESS Actually Means for Your Solar Park */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-blue-500" />
                What BESS Actually Means for Your Solar Park
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Forget the chemistry. Forget the spec sheets. What does adding a battery to your solar
                park actually <em>change</em>? The answer comes down to three fundamental shifts in how
                your asset operates and earns revenue.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">From Price-Taker to Price-Maker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      A solar-only park sells electricity when the sun shines &mdash; regardless of
                      what the market is willing to pay. At midday in Cyprus, that means selling at
                      &euro;77&ndash;&euro;101/MWh when every other solar park is dumping power into
                      the same grid. With BESS, you <strong>choose when to sell</strong>. Store at
                      midday, discharge during the &euro;183/MWh evening peak. You become a price-maker
                      instead of a price-taker.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-2">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">From Curtailed to Protected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      Cyprus curtailment hit 47% in 2025. That means nearly half of your gross solar
                      production is being ordered off the grid and wasted. With BESS, curtailed energy
                      is <strong>captured and stored</strong> rather than lost. Instead of watching
                      &euro;178,600 per MW per year evaporate, you convert that wasted energy into
                      evening revenue at &euro;161/MWh net.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">From Static Asset to Flexible Asset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      A solar-only park does one thing: generate electricity when the sun is up.
                      A PV+BESS park is a <strong>dispatchable power plant</strong>. It can provide
                      grid services, participate in future ancillary markets, support frequency
                      regulation, and respond to grid operator dispatch signals. That flexibility
                      is where the next decade of revenue growth lives.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Battery className="inline w-5 h-5 mr-2 text-blue-500" />
                  <strong>The bottom line:</strong> BESS doesn&apos;t change your solar panels. It
                  changes your <em>business model</em>. You go from a passive generator subject to
                  grid constraints and price cycles to an active market participant who controls when,
                  how, and at what price your energy reaches the grid.
                </p>
              </div>
            </div>

            {/* Section 2: The Revenue Case */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-green-500" />
                The Revenue Case: Numbers from 51 Cyprus Parks
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                This isn&apos;t a theoretical exercise. Lighthief is currently deploying BESS across
                a portfolio of <strong>51 solar parks</strong> in Cyprus &mdash; totalling
                <strong> 249 MW</strong> of BESS capacity and <strong>881.78 MWh</strong> of storage.
                The financial case is built on verified operational data from parks already running on
                the island.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                At 47% curtailment, a typical solar park in Cyprus produces roughly 2,000 MWh per MW
                per year &mdash; but only sells about 1,060 MWh. The remaining ~940 MWh per MW is
                curtailed: ordered off the grid by the TSO and wasted. BESS recovers a significant
                portion of this curtailed energy and discharges it during the evening peak at
                &euro;183/MWh. After accounting for 86.32% AC-AC round-trip efficiency, the net revenue per
                recovered MWh is approximately <strong>&euro;158/MWh</strong>.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-center mb-2">
                  Revenue Impact by Park Size
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  Based on 47% curtailment, 50% BESS recovery rate, &euro;161/MWh net discharge revenue
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-green-200 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">1 MW Park</CardTitle>
                        <Badge className="bg-green-600 text-white">Small Commercial</Badge>
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
                        <span className="text-gray-600">BESS Recoverable (50%):</span>
                        <span className="text-emerald-600 font-semibold">~470 MWh</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2 text-green-700">
                        <span>Annual Revenue Recovered:</span>
                        <span>~&euro;75,670</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right">at &euro;161/MWh net</div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-300 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">5 MW Park</CardTitle>
                        <Badge className="bg-green-600 text-white">Utility Scale</Badge>
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
                        <span className="text-gray-600">BESS Recoverable (50%):</span>
                        <span className="text-emerald-600 font-semibold">~2,350 MWh</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2 text-green-700">
                        <span>Annual Revenue Recovered:</span>
                        <span>~&euro;378,350</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right">at &euro;161/MWh net</div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-400 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">10 MW Park</CardTitle>
                        <Badge className="bg-green-600 text-white">Large Utility</Badge>
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
                        <span className="text-gray-600">BESS Recoverable (50%):</span>
                        <span className="text-emerald-600 font-semibold">~4,700 MWh</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2 text-green-700">
                        <span>Annual Revenue Recovered:</span>
                        <span>~&euro;756,700</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right">at &euro;161/MWh net</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  This is recovered revenue &mdash; money that would otherwise be lost entirely.
                </p>
                <p className="text-gray-700">
                  These figures represent energy that your park is already producing but being forced
                  to throw away due to grid curtailment. BESS doesn&apos;t require you to generate
                  more energy &mdash; it captures what you&apos;re already losing and sells it at
                  the highest-priced hours of the day.
                </p>
              </div>

              <p className="text-lg text-gray-700">
                Beyond curtailment recovery, BESS also enables time-of-day arbitrage: shifting
                non-curtailed energy from the &euro;101/MWh midday trough to the &euro;183/MWh evening
                peak. Even on days with zero curtailment, BESS earns an additional ~&euro;60/MWh net
                spread on every MWh shifted &mdash; a 59% premium over midday selling prices.
              </p>
            </div>

            {/* Section 3: Grid Connection Value */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-cyan-500" />
                How BESS Changes Your Grid Connection Value
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Your grid connection isn&apos;t just a cable &mdash; it&apos;s a licensed right to
                inject power into the national grid. And on an isolated island like Cyprus, where grid
                capacity is finite and competition for dispatch windows is fierce, the <em>quality</em> of
                that connection matters as much as its existence.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                A PV-only park&apos;s grid connection is essentially a one-way, daytime-only asset. It
                delivers power when the grid is already saturated with solar, contributing to the very
                oversupply that triggers curtailment. From the TSO&apos;s perspective, it&apos;s a
                source of instability &mdash; more supply when supply is already excessive.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-gray-200 bg-gray-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-600">PV-Only Grid Connection</CardTitle>
                    <CardDescription>Limited, inflexible, vulnerable</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Power injection only during daytime solar hours</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Subject to TSO curtailment orders at any time</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Zero value to the grid during evening peak demand</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>No participation in future grid services markets</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Weakening PPA negotiation position as curtailment rises</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-emerald-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-emerald-700">PV+BESS Grid Connection</CardTitle>
                    <CardDescription>Dispatchable, flexible, premium</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Power dispatch across <strong>all hours</strong> including evening peak</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Curtailed energy captured and stored rather than wasted</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Highest-value dispatch during 17:00&ndash;21:00 peak window</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Eligible for frequency regulation and ancillary services</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Stronger PPA terms: guaranteed evening dispatch capability</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The implications for PPA negotiations are significant. Off-takers &mdash; whether
                utilities, corporate buyers, or aggregators &mdash; increasingly prefer dispatchable
                supply. A PV+BESS park can offer a <strong>shaped PPA</strong> that guarantees delivery
                during high-demand hours, commanding a premium of &euro;15&ndash;&euro;30/MWh over
                flat solar PPAs. For a 5 MW park, that translates to &euro;80,000&ndash;&euro;160,000
                in additional annual PPA revenue.
              </p>

              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Globe className="inline w-5 h-5 mr-2 text-cyan-500" />
                  <strong>Looking ahead:</strong> As Cyprus develops its grid services market &mdash;
                  following the trajectory of Germany, Italy, and the UK &mdash; BESS-equipped parks
                  will be first in line for frequency response contracts, spinning reserve payments,
                  and virtual power plant (VPP) participation. These revenue streams, worth
                  &euro;50&ndash;&euro;120K/MW/year in mature EU markets, will be available exclusively
                  to parks with storage. Your grid connection becomes the gateway to an entirely new
                  category of income.
                </p>
              </div>
            </div>

            {/* Section 4: Asset Valuation */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                Asset Valuation: PV-Only vs PV+BESS
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Beyond annual revenue, BESS fundamentally changes how banks, institutional investors,
                and secondary-market buyers value your solar asset. The shift is driven by three factors
                that directly affect how a discounted cash flow (DCF) model treats your park.
              </p>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      1. Protected Revenue Streams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      A PV-only park&apos;s revenue projection carries a massive asterisk: curtailment
                      risk. Every financial model must discount future cash flows by the expected
                      curtailment rate &mdash; currently 47% and rising. When your model shows that
                      nearly half of gross production generates zero revenue, the net present value
                      (NPV) drops accordingly. A PV+BESS park eliminates much of this discount. BESS
                      converts curtailed energy into revenue, stabilising the cash flow projection and
                      reducing the risk premium that lenders and investors apply. The result: higher
                      NPV, better debt service coverage ratios (DSCR), and more favourable financing
                      terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                      2. Reduced Risk Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Institutional investors and infrastructure funds use risk-adjusted return metrics.
                      A PV-only park in Cyprus now carries three compounding risks: rising curtailment,
                      midday price collapse, and potential regulatory changes that could mandate storage
                      retroactively. A PV+BESS park hedges against all three. BESS captures curtailed
                      energy (curtailment hedge), sells at evening peak prices (price hedge), and
                      pre-empts any storage mandate (regulatory hedge). Lower risk means a lower
                      discount rate in DCF models, which directly increases asset valuation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Euro className="w-5 h-5 text-amber-600 mr-2" />
                      3. Future Revenue Optionality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      BESS provides optionality that a PV-only asset simply cannot access. When Cyprus
                      opens DAM arbitrage to BESS operators, when grid services markets launch, when
                      VPP aggregation platforms arrive &mdash; only PV+BESS parks will participate.
                      This optionality has quantifiable value. In mature EU markets, grid services alone
                      generate &euro;50&ndash;&euro;120K/MW/year. Even before these markets open in
                      Cyprus, sophisticated buyers factor in this optionality when valuing assets,
                      because the battery hardware will already be in place to capture these revenues
                      the moment regulation allows.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold text-center mb-6">
                  The Financing Advantage: PV-Only vs PV+BESS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-600 mb-4 text-center">PV-Only</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Typical LTV:</span>
                        <span className="font-semibold text-gray-800">25&ndash;35%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Interest Rate Premium:</span>
                        <span className="font-semibold text-gray-800">+50&ndash;100 bps</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenue Risk Discount:</span>
                        <span className="font-semibold text-red-600">High (47% curtailment)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lender Appetite:</span>
                        <span className="font-semibold text-amber-600">Declining</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-emerald-200">
                    <h4 className="font-semibold text-emerald-700 mb-4 text-center">PV+BESS</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Typical LTV:</span>
                        <span className="font-semibold text-emerald-700">60&ndash;70%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Interest Rate Premium:</span>
                        <span className="font-semibold text-emerald-700">Standard terms</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenue Risk Discount:</span>
                        <span className="font-semibold text-green-600">Low (protected by storage)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lender Appetite:</span>
                        <span className="font-semibold text-green-600">Strong &amp; Growing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <TrendingUp className="inline w-5 h-5 mr-2 text-purple-500" />
                  <strong>The valuation gap is widening.</strong> As curtailment increases and grid
                  services markets develop, the premium that PV+BESS commands over PV-only will grow.
                  Parks that add BESS now lock in current equipment prices while positioning for
                  maximum future value. Parks that wait face rising curtailment losses <em>and</em> the
                  risk of higher BESS costs as demand outstrips supply.
                </p>
              </div>
            </div>

            {/* Section 5: Five Questions */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-500" />
                The Five Questions Every Park Owner Should Ask Before Adding BESS
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Before committing to a BESS investment, every PV park owner should have clear answers
                to these five questions. They form the foundation of any credible BESS business case
                and will be scrutinised by lenders, investors, and independent engineers during due
                diligence.
              </p>

              <div className="space-y-6">
                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-lg">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          What&apos;s my current curtailment rate?
                        </h3>
                        <p className="text-gray-700 mb-3">
                          This is the single most important input to your BESS revenue model. Request
                          your actual curtailment data from the TSO or your monitoring system &mdash;
                          don&apos;t rely on island-wide averages. Your specific location, grid
                          connection capacity, and transformer station load all affect your actual
                          curtailment rate.
                        </p>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>What to look for:</strong> Monthly curtailment percentages for the
                            past 12 months, seasonal variation, and trend direction. Parks on congested
                            transformer stations may see curtailment significantly above the 47% island
                            average.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-lg">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          What duration system matches my profile?
                        </h3>
                        <p className="text-gray-700 mb-3">
                          BESS systems come in different durations &mdash; typically 2-hour, 3-hour,
                          or 4-hour configurations. The right choice depends on your curtailment
                          profile and your view on future revenue streams. Under current Cyprus law
                          (curtailment recovery only), shorter-duration systems often achieve faster
                          payback because all three durations recover the same amount of energy.
                        </p>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Key trade-off:</strong> A 2-hour system (10 MWh for 5 MW) offers
                            the fastest payback (~4.5 years at 47% curtailment). A 4-hour system
                            (20 MWh for 5 MW) costs more upfront but is best positioned for future
                            DAM arbitrage and grid services revenue, with the lowest &euro;/MWh
                            installed cost.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-lg">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          What&apos;s the all-in installed cost per MWh?
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Don&apos;t compare equipment prices alone. The all-in cost includes the
                          battery containers, power conversion system (PCS), energy management system
                          (EMS), grid connection upgrades, civil works, cabling, fire suppression,
                          insurance during construction, and contingency. Ask for a fully loaded
                          &euro;/MWh figure that includes everything needed to reach commercial
                          operation.
                        </p>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Benchmark:</strong> Lighthief&apos;s confirmed group-order pricing
                            for 5 MW / 20 MWh systems (4-hour duration) is <strong>&euro;112,945/MWh
                            </strong> all-in &mdash; including grid connection, EMS, and 5%
                            contingency. Individual procurement typically costs 15&ndash;20% more.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-lg">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          What warranties and service agreements are included?
                        </h3>
                        <p className="text-gray-700 mb-3">
                          BESS is not a &ldquo;set and forget&rdquo; asset. It requires active
                          monitoring, thermal management, firmware updates, and preventive maintenance.
                          Your EPC partner should provide an OEM warranty with a clear State of Health
                          (SOH) guarantee trajectory, a long-term O&M agreement with availability
                          guarantees, and comprehensive insurance covering both construction and
                          operational phases.
                        </p>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Minimum standards:</strong> 5-year base warranty (extendable to 15
                            years), &ge;70% SOH guarantee at year 15, 97% annual availability SLA,
                            4-hour critical fault response, 24/7 remote monitoring, and UL 9540A
                            safety certification.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 font-bold text-lg">5</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          What&apos;s my payback period under conservative assumptions?
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Insist on seeing a financial model with conservative inputs &mdash; not best-
                          case scenarios. Use verified curtailment data (not projections), current
                          evening peak prices (not forecasts), and realistic degradation rates. A
                          credible model should show payback under both the current 47% curtailment
                          scenario <em>and</em> a more conservative 25&ndash;30% scenario.
                        </p>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            <strong>What &ldquo;good&rdquo; looks like:</strong> For a 5 MW / 20 MWh
                            system at &euro;112,945/MWh, simple payback is ~8.7 years at 47%
                            curtailment (conservative model). With 70% project finance at 4.5%
                            interest, equity payback drops to ~6.1 years. When DAM arbitrage
                            legislation passes, payback falls to ~4.8 years.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 6: Why Group Procurement Matters */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-indigo-500" />
                Why Group Procurement Matters
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                BESS equipment follows the same economics as any manufactured product: volume
                drives price. A single 5 MW park buying one battery container gets the retail
                price. A group of 51 parks ordering 881.78 MWh of storage gets a fundamentally
                different price from the manufacturer.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Lighthief&apos;s 51-park group order achieves <strong>15&ndash;20% cost
                reduction</strong> compared to individual procurement. This isn&apos;t a
                negotiation tactic &mdash; it&apos;s the structural result of aggregating demand
                across 249 MW of BESS capacity into a single OEM purchase order.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                  Group Order Economics: How Volume Drives Value
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-700 mb-1">51</div>
                    <div className="text-sm text-gray-600">Parks in Group Order</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Battery className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-purple-700 mb-1">881.78</div>
                    <div className="text-sm text-gray-600">MWh Total Storage</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Euro className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-1">&euro;112,945</div>
                    <div className="text-sm text-gray-600">/MWh (5 MW / 20 MWh System)</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-center mb-4">Where the Savings Come From</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>OEM volume pricing:</strong> Factory production runs are optimised
                        for large orders, reducing per-unit manufacturing cost by 10&ndash;15%.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Consolidated shipping:</strong> Full container loads from factory to
                        port to site, eliminating per-unit logistics premiums.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Shared engineering:</strong> Grid connection design, EMS
                        configuration, and commissioning protocols are developed once and deployed
                        across all 51 sites.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Portfolio O&amp;M:</strong> A single monitoring platform, shared
                        spare parts inventory, and coordinated maintenance schedules reduce
                        per-park operational costs.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Insurance economies:</strong> Portfolio-level CAR and operational
                        insurance policies achieve better rates than individual site coverage.
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Exclusive OEM terms:</strong> The group order volume secures
                        exclusive distributor pricing, enhanced warranty terms, and direct factory
                        support that individual buyers cannot access.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Users className="inline w-5 h-5 mr-2 text-indigo-500" />
                  <strong>The maths is simple:</strong> at &euro;112,945/MWh through the group order
                  versus &euro;130,000&ndash;&euro;140,000/MWh for individual procurement, a 5 MW /
                  20 MWh system saves &euro;341,000&ndash;&euro;541,000 in CAPEX. That savings alone
                  reduces payback by 1&ndash;2 years. Group procurement doesn&apos;t just lower costs
                  &mdash; it structurally improves the investment case.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Get Your Free BESS Assessment
              </h2>
              <p className="text-xl mb-4 opacity-90">
                Every PV park has a unique curtailment profile, grid connection, and revenue structure.
                We&apos;ll analyse your specific situation and show you exactly what BESS changes about
                your returns &mdash; using real data, not projections.
              </p>
              <p className="text-lg mb-8 opacity-80">
                Whether you own a 1 MW commercial rooftop or a 10 MW utility-scale park, our team will
                model the BESS configuration that matches your investment objectives and payback targets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Calculator className="w-5 h-5 mr-2" />
                    Get Your Free BESS Assessment
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
