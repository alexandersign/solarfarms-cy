import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Zap,
  Battery,
  TrendingUp,
  Shield,
  Globe,
  Network,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Activity,
  Gauge,
  Power,
  Signal,
  Clock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Grid-Forming vs Grid-Following: Future-Proof Your BESS and Stop Leaving Money on the Table',
  description:
    "Most battery inverters just follow the grid. The smart ones can become the grid. Here is the plain-English difference between grid-following and grid-forming BESS — and why choosing wrong could cost you years of future revenue on Cyprus's island grid.",
  keywords: [
    'grid-forming vs grid-following',
    'grid-forming BESS',
    'grid-forming inverter',
    'virtual synchronous generator',
    'VSG BESS Cyprus',
    'black start battery storage',
    'synthetic inertia island grid',
    'FCR aFRR Cyprus',
    'BESS ancillary services revenue',
    'Kehua grid-forming PCS',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Grid-Forming vs Grid-Following: Future-Proof Your BESS and Stop Leaving Money on the Table',
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
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
  description:
    "Most battery inverters just follow the grid. The smart ones can become the grid. The plain-English difference between grid-following and grid-forming BESS — and why it protects your future revenue.",
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://solarfarms.cy/blog/grid-forming-vs-grid-following-bess',
  },
}

export default function GridFormingVsFollowingArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-amber-600 text-white">
              Technology &amp; Revenue &mdash; June 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Follow the Grid, or Become the Grid?
              <span className="block gradient-text mt-2">
                The Battery Choice That Future-Proofs Your Revenue
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Most battery inverters simply follow the grid &mdash; they need it to already exist, and they
              just push power into it. A grid-forming battery can <em>become</em> the grid: it sets its own
              voltage and frequency, steadies the system, and even restarts a dead network. On an isolated
              island like Cyprus, that difference is the gap between a battery that just sells energy and one
              that unlocks every future revenue stream.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>June 17, 2026</span>
              <span>&bull;</span>
              <span>9 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The simple version */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Gauge className="w-8 h-8 text-amber-500" />
                The Simple Version: An Orchestra and Its Conductor
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Imagine the electricity grid as an orchestra. Every generator has to play in perfect time &mdash;
                the same rhythm (frequency) and the same volume (voltage). If anyone drifts, the music falls apart.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <Card className="border-l-4 border-gray-400">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Signal className="w-5 h-5 text-gray-600" />
                      </div>
                      <CardTitle className="text-lg">Grid-Following = a musician</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      A grid-following battery listens to the conductor and plays along. It is excellent at its job &mdash;
                      but it cannot play alone. If the conductor stops (the grid goes down, or gets too weak), the
                      musician falls silent. It <strong>follows</strong>; it cannot <strong>lead</strong>.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-amber-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-amber-600" />
                      </div>
                      <CardTitle className="text-lg">Grid-Forming = the conductor</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      A grid-forming battery can <strong>be</strong> the conductor. It sets the rhythm and volume
                      itself, holds the whole orchestra steady, and can even start the music from silence. When the
                      grid wobbles, it pushes back instantly &mdash; just like a heavy spinning power-station turbine.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-lg text-gray-700">
                Here is the part that surprises most park owners: <strong>it is usually the same hardware.</strong>
                The transformer, the switchgear, the battery containers &mdash; identical. The difference lives in the
                inverter&apos;s control software. A grid-forming system simply knows how to lead as well as follow.
              </p>
            </div>

            {/* Section 2: Side by side */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Activity className="w-8 h-8 text-amber-500" />
                Side by Side
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cyprus-700 text-white">
                      <th className="text-left p-4 font-semibold">What it does</th>
                      <th className="text-left p-4 font-semibold">Grid-Following</th>
                      <th className="text-left p-4 font-semibold">Grid-Forming</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 text-gray-700 font-medium">Needs a live grid to work?</td>
                      <td className="p-4 text-gray-700">Yes &mdash; it trips if the grid fails</td>
                      <td className="p-4 text-gray-700">No &mdash; it can stand on its own</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700 font-medium">Provides grid stability (inertia)?</td>
                      <td className="p-4 text-gray-700">No</td>
                      <td className="p-4 text-gray-700">Yes &mdash; synthetic inertia, instantly</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-medium">Can restart a blacked-out network?</td>
                      <td className="p-4 text-gray-700">No</td>
                      <td className="p-4 text-gray-700">Yes &mdash; black-start capable</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700 font-medium">Works on weak / remote grids?</td>
                      <td className="p-4 text-gray-700">Struggles</td>
                      <td className="p-4 text-gray-700">Designed for it</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700 font-medium">Future ancillary-service revenue?</td>
                      <td className="p-4 text-gray-700">Limited</td>
                      <td className="p-4 text-gray-700">Full access</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700 font-medium">Extra hardware cost?</td>
                      <td className="p-4 text-gray-700">&mdash;</td>
                      <td className="p-4 text-gray-700">Typically ~5% on the inverter, often none</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Why Cyprus */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-cyprus-600" />
                Why This Matters More in Cyprus Than Anywhere in Europe
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus runs the EU&apos;s only fully isolated electricity grid. There are no interconnector cables
                to lean on, so the island has to keep itself perfectly balanced, second by second, entirely on its own.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                For decades that balance came from the spinning mass of conventional power stations &mdash; giant
                turbines whose sheer inertia naturally resists sudden changes. But as those plants retire and solar
                floods the grid, that natural stability disappears. Solar panels and ordinary (grid-following) batteries
                provide <strong>no inertia at all</strong>. The grid becomes twitchy, and the operator has to scramble to
                keep the lights on.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg text-gray-700">
                  <Zap className="inline w-5 h-5 mr-2 text-amber-500" />
                  <strong>This is where grid-forming batteries become essential, not optional.</strong> They put
                  inertia back into the system electronically &mdash; the same steadying effect as a spinning turbine,
                  delivered in milliseconds. On an island grid, that is exactly the service the system operator will
                  need to buy. And they can only buy it from assets that can provide it.
                </p>
              </div>
            </div>

            {/* Section 4: Revenue */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                The Revenue Angle: Don&apos;t Lock Yourself Out
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Today, most Cyprus BESS revenue comes from two streams: recovering curtailed solar and shifting
                cheap midday energy into the expensive evening peak. Those are real and they are here now. But the
                bigger, more durable money arrives when the system operator opens its <strong>ancillary-services
                markets</strong> &mdash; paying batteries to keep the grid stable. That transition is on the roadmap
                for 2027&ndash;2030.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-base">FCR</CardTitle>
                    </div>
                    <CardDescription>Frequency Containment Reserve</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      The grid&apos;s fast-reflex service: respond to a frequency dip within seconds. On other island
                      grids this has earned operators <strong>&euro;30&ndash;80k per MW per year</strong>.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Gauge className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-base">aFRR</CardTitle>
                    </div>
                    <CardDescription>automatic Frequency Restoration Reserve</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      The follow-up service: over a few minutes, gently push frequency back to exactly 50.0&nbsp;Hz on
                      the operator&apos;s automatic signal. A steady, contracted income layer on top of trading.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Power className="w-6 h-6 text-amber-600" />
                      <CardTitle className="text-base">Inertia &amp; Black-Start</CardTitle>
                    </div>
                    <CardDescription>Grid-forming only</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Synthetic inertia and the ability to restart a dead grid. These services are
                      <strong> physically impossible</strong> for a grid-following battery &mdash; only grid-forming
                      systems qualify.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <AlertTriangle className="inline w-5 h-5 mr-2 text-red-500" />
                  <strong>The trap:</strong> install a cheaper grid-following-only system today, and when these markets
                  open you may be locked out of the most valuable ones &mdash; or facing an expensive equipment swap.
                  A 15&ndash;20 year asset should be ready for the grid it will live in, not just the grid of today.
                </p>
              </div>
            </div>

            {/* Section 5: Best part - no penalty */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                The Best Part: You Don&apos;t Have to Choose at Install
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A common worry is: &ldquo;If the grid operator only wants a simple grid-following connection now, do I
                lose grid-forming forever?&rdquo; No. A properly specified modern system does both, and switches between
                them.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-gray-700">1</div>
                  <p className="text-gray-700">
                    <strong>Connect in grid-following mode.</strong> Energise the plant, pass the operator&apos;s tests,
                    start earning from day one &mdash; the simple, familiar setup.
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-gray-700">2</div>
                  <p className="text-gray-700">
                    <strong>Flip to grid-forming when the time comes.</strong> When the operator&apos;s rules or markets
                    call for it, the same units switch to grid-forming through a software setting &mdash; no new boxes,
                    no rebuild.
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-gray-700">3</div>
                  <p className="text-gray-700">
                    <strong>Capture the new revenue.</strong> The asset is already qualified to provide inertia and
                    grid services &mdash; you simply turn the capability on.
                  </p>
                </div>
              </div>
              <div className="bg-cyprus-50 border-l-4 border-cyprus-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-700">
                  <Shield className="inline w-5 h-5 mr-2 text-cyprus-600" />
                  The trick is to specify it correctly <em>before</em> you order. The capability has to be built in and
                  certified from the start &mdash; you cannot bolt real grid-forming onto a battery that was never
                  designed for it.
                </p>
              </div>
            </div>

            {/* Section 6: What to check */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Battery className="w-8 h-8 text-cyprus-600" />
                What to Check Before You Buy
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Plenty of vendors say &ldquo;grid-forming ready.&rdquo; Ask for proof, not adjectives. A genuine
                grid-forming system can show you:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ['Multiple operating modes', 'The inverter datasheet should list grid-forming modes (often called VSG and VF) and black-start — not just standard grid-tied operation.'],
                  ['A recognised grid-code certificate', 'Independent type-test certification to the European standard EN 50549 proves the capability is real and lab-verified.'],
                  ['An off-grid voltage spec', 'If it can create its own stable voltage off-grid, it can form a grid. If that spec is missing, it probably cannot.'],
                  ['A black-start procedure', 'A written sequence for restarting a dead network — evidence the feature exists in practice, not just on a brochure.'],
                  ['Frequency-response test results', 'Proof the system reacts to frequency changes (droop response), the foundation of every grid service.'],
                  ['A smart control system (EMS)', 'The site controller must be able to switch modes and respond to the operator’s signals — capability is wasted without it.'],
                ].map(([title, body]) => (
                  <div key={title} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{title}</p>
                      <p className="text-sm text-gray-600">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7: Our kit */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Network className="w-8 h-8 text-amber-500" />
                What We Deploy
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The systems we supply for Cyprus solar parks are built on grid-forming power conversion systems
                (Kehua C-series), type-tested to the European EN 50549 standard. They support the full set of modes &mdash;
                standard grid-following for day-one operation, plus virtual synchronous generator and black-start for
                everything that comes next.
              </p>
              <p className="text-lg text-gray-700">
                In other words: your park earns from curtailment recovery and arbitrage now, and is already qualified
                for the grid-stability markets when they open. No second purchase, no missed window.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Make Sure Your Battery Is Ready for the Next Decade
              </h2>
              <p className="text-xl mb-4 opacity-90">
                A BESS is a 15&ndash;20 year asset. Specifying grid-forming from the start costs little &mdash; and
                protects every future revenue stream the island grid will create.
              </p>
              <p className="text-lg mb-8 opacity-80">
                We will review your project, your connection terms, and your revenue plan, and tell you exactly what
                to specify so you are never locked out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    <Battery className="w-5 h-5 mr-2" />
                    Get a BESS Assessment
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/blog/virtual-power-plants-island-grids">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    How VPPs Create New Revenue
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
