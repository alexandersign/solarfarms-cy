import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Battery,
  Calendar,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  User,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Battery Boom: Prices Fall, Capacity Surges | What It Means for Solar Investors',
  description:
    'Installed battery costs are falling while global capacity is accelerating. A practical breakdown of the 2019-2024 trend and what it means for project economics in Cyprus and Europe.',
  keywords: [
    'battery boom',
    'battery prices',
    'global battery capacity',
    'utility scale battery storage',
    'BESS investment economics',
    'Cyprus battery storage',
    'solar plus storage',
    'Alexander Papacosta',
  ],
}

const trendData = [
  { year: '2019', costUsdPerKwh: 360, capacityGw: 5 },
  { year: '2020', costUsdPerKwh: 280, capacityGw: 8 },
  { year: '2021', costUsdPerKwh: 255, capacityGw: 13 },
  { year: '2022', costUsdPerKwh: 290, capacityGw: 25 },
  { year: '2023', costUsdPerKwh: 250, capacityGw: 60 },
  { year: '2024', costUsdPerKwh: 140, capacityGw: 122 },
]

export default function BatteryBoomArticlePage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-cyprus-600 text-white">Market Trend 2026</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              The Battery Boom:
              <span className="block gradient-text mt-2">Prices Fall, Capacity Surges</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              A clear global pattern is emerging: utility-scale storage is scaling fast while installed
              costs trend lower. For solar developers and investors, this changes project economics
              more than any single policy update.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <User className="w-4 h-4" />
                By Alexander Papacosta
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                February 22, 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />8 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="container -mt-4 mb-8">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/bess-no-longer-optional-cyprus.png"
            alt="Battery storage market trend and BESS growth context"
            width={1400}
            height={840}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What the chart is telling us</h2>
              <p className="text-lg text-gray-700 mb-4">
                The trend is straightforward. Global utility-scale battery capacity accelerated from
                single digits in 2019 to well above 100 GW by 2024, while average installed cost fell
                materially over the same period.
              </p>
              <p className="text-lg text-gray-700">
                There is one temporary bump around 2022, but the direction is still down for cost and
                up for deployment. That combination typically signals structural market maturity, not a
                short-term anomaly.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-2">Battery Boom at a Glance (2019-2024)</h3>
              <p className="text-sm text-gray-500 mb-6">
                Approximate values interpreted from IEA chart (The State of Energy Innovation 2026).
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendData.map((item) => (
                  <Card key={item.year} className="border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.year}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                      <p className="flex items-center justify-between">
                        <span className="text-gray-600">Installed cost:</span>
                        <span className="font-semibold">${item.costUsdPerKwh}/kWh</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="text-gray-600">Global capacity:</span>
                        <span className="font-semibold">{item.capacityGw} GW</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                  <p className="text-sm text-gray-700 mb-1">Cost trend (2019 to 2024)</p>
                  <p className="text-2xl font-bold text-green-700 inline-flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    ~61% lower
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                  <p className="text-sm text-gray-700 mb-1">Capacity trend (2019 to 2024)</p>
                  <p className="text-2xl font-bold text-blue-700 inline-flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    ~24x growth
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why both lines move this way</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  <strong>1) Scale lowers cost.</strong> More projects means better procurement, more
                  standardized system integration, and improved manufacturing throughput.
                </p>
                <p>
                  <strong>2) Better bankability unlocks growth.</strong> As insurers, lenders, and
                  off-takers get more comfortable with BESS, project pipelines accelerate.
                </p>
                <p>
                  <strong>3) Grid stress creates demand.</strong> Markets with rising curtailment and
                  volatile intraday prices naturally push solar projects toward storage integration.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyprus-50 to-solar-50 rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl font-heading font-bold mb-6">What this means for developers in practice</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">5 MWh block</CardTitle>
                    <CardDescription>Illustrative cost shift</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      At ~$360/kWh (2019), capex is about <strong>$1.80M</strong>. At ~$140/kWh (2024),
                      it is about <strong>$0.70M</strong>.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">20 MWh block</CardTitle>
                    <CardDescription>Illustrative cost shift</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      At ~$360/kWh (2019), capex is about <strong>$7.20M</strong>. At ~$140/kWh (2024),
                      it is about <strong>$2.80M</strong>.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Commercial impact</CardTitle>
                    <CardDescription>Why timing matters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Lower storage capex can materially improve DSCR resilience and payback windows in
                      projects exposed to curtailment and midday price compression.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">2026 execution checklist</h2>
              <div className="space-y-3">
                {[
                  'Design PV and BESS together from day one, not as a late retrofit.',
                  'Model revenue with hourly price spreads, not flat annual tariff assumptions.',
                  'Stress-test guarantees: availability, SOH trajectory, and response times.',
                  'Prioritize EPC + O&M structures that are financeable and auditable.',
                  'Lock battery supply and commissioning windows early for grid deadline certainty.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-3xl font-heading font-bold mb-4">Bottom line</h2>
              <p className="text-lg text-gray-700 mb-4">
                The battery boom is no longer a forecast; it is already visible in both deployment
                volumes and installed cost trajectory. The strategic question for project owners is not
                whether storage matters, but how quickly they can integrate it in a bankable way.
              </p>
              <p className="text-sm text-gray-500">
                Source referenced in chart prompt: IEA, <em>The State of Energy Innovation 2026</em>.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <Battery className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-3">Want the same analysis for your project?</h3>
              <p className="text-white/90 mb-6">
                We can run a project-specific storage sizing and revenue model for your site, timeline,
                and financing constraints.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-cyprus-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">Request BESS assessment</Link>
                </Button>
                <Button size="lg" variant="outline-on-dark" asChild>
                  <Link href="/energy-storage/calculator">
                    Open storage calculator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

