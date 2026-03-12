import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  AlertTriangle,
  Wrench,
  Zap,
  CheckCircle,
  ArrowRight,
  Shield,
  Droplets,
  Thermometer,
  ClipboardCheck,
  Users,
  Eye,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why BESS Projects Fail in Year One: Installation Quality on Solar Farms | Lighthief Cyprus',
  description: 'More than 50% of BESS failures happen in the first 2 years. That is not ageing — it is construction. We examine the workmanship gaps that hide between civil, electrical, and OEM responsibilities, and how to prevent them.',
  keywords: [
    'BESS installation quality',
    'BESS workmanship failures',
    'battery storage construction risks',
    'BESS commissioning defects',
    'solar farm BESS installation',
    'BESS torque protocol',
    'BESS interface management',
    'utility scale BESS quality',
    'BESS early life failures',
    'BESS construction best practices',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why BESS Projects Fail in Year One: Installation Quality on Solar Farms',
  description: 'More than 50% of BESS failures happen in the first 2 years. That is not ageing — it is construction. We examine the workmanship gaps that hide between responsibilities.',
  datePublished: '2026-02-26',
  dateModified: '2026-02-26',
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
    '@id': 'https://solarfarms.cy/blog/bess-installation-quality-workmanship-risks',
  },
}

export default function BESSInstallationQualityArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-red-600 text-white">
              Construction Risk &mdash; February 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Why BESS Projects Fail in Year One
              <span className="block gradient-text mt-2">
                Installation Quality on Solar Farms
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              More than 50% of BESS failures happen in the first two years.
              That is not ageing &mdash; it is construction. We examine the workmanship
              gaps that hide between civil, electrical, and OEM responsibilities,
              and what it takes to close them.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>February 26, 2026</span>
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

            {/* The Problem */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                The Pattern Nobody Talks About
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                In large-scale BESS projects, the same patterns appear again and again.
                Loose terminations. Water in cable trays. Incorrect torque settings.
                &ldquo;Let&rsquo;s fix it during commissioning.&rdquo;
              </p>
              <p className="text-lg text-gray-700 mb-4">
                None of this sounds dramatic. But under load, heat, and vibration,
                small workmanship gaps turn into system risk. A termination that passed
                visual inspection at 20&deg;C develops hot spots at full discharge current.
                A cable entry that looked sealed during a dry installation lets moisture in
                during the first winter storm. A grounding bond that measured fine on day one
                degrades because the surface preparation was inadequate.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                BESS projects rarely fail because of chemistry. They fail because execution
                gaps hide between responsibilities.
              </p>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red-700">50%+</p>
                      <p className="text-sm text-red-600 mt-1">of BESS failures occur in the first 2 years</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red-700">Year 1&ndash;2</p>
                      <p className="text-sm text-red-600 mt-1">peak failure period &mdash; construction, not degradation</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red-700">30%</p>
                      <p className="text-sm text-red-600 mt-1">of early failures traceable to torque-related defects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* The Interface Problem */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-orange-600" />
                The Interface Problem
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Here is the uncomfortable truth: most of these issues do not belong clearly
                to one discipline.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Civil says the slab is fine. Electrical says the wiring is complete.
                The OEM says the container left the factory fully tested. But nobody truly
                owns the interface.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The cable entry. The grounding bond. The torque protocol. The drainage detail
                at the container base. These are the points where three or four scopes of work
                meet &mdash; and where quality falls through the cracks.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-orange-600" />
                      Civil Execution Issues
                    </CardTitle>
                    <CardDescription>Surface first, get dismissed as cosmetic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                        <span>Poor slab drainage &mdash; water pools at container bases, corrodes cable entries over 6&ndash;12 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                        <span>Foundation levelness out of tolerance &mdash; causes racking stress on internal busbars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                        <span>Cable trench backfill compaction &mdash; settlement cracks conduit seals later</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                        <span>Missing drip edges or weather barriers at cable penetrations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-red-600" />
                      Electrical Workmanship Issues
                    </CardTitle>
                    <CardDescription>Hidden until thermal cycling exposes them</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>Inconsistent torque on busbar connections &mdash; no protocol, or protocol not witnessed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>Crimps done with wrong die size &mdash; passes visual inspection, fails under load</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>Grounding daisy-chained instead of star-configured per OEM spec</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span>Fibre optic BMS cables bent below minimum radius &mdash; intermittent comms faults</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Why It Matters for Solar Farm Owners */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-amber-600" />
                Why Solar Farm Sites Are Particularly Exposed
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Retrofitting BESS onto existing solar farms introduces additional risk
                factors that greenfield installations do not face. The existing site
                infrastructure was designed for PV &mdash; not for 43-tonne BESS containers with
                high-voltage DC systems, liquid cooling, and fire suppression.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In Cyprus, the combination of 45&deg;C summer ambient temperatures, coastal
                salt spray exposure, and winter storm rainfall creates an environment where
                marginal workmanship degrades faster than it would in a temperate climate.
                A loose termination that might survive 5 years in Germany develops a hot spot
                within 6 months in Limassol.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6 text-center">
                    <Thermometer className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <p className="font-semibold text-amber-900">Thermal Stress</p>
                    <p className="text-sm text-amber-700 mt-2">
                      Daily temperature swings of 30&deg;C+ cause thermal expansion cycles
                      that loosen connections over weeks, not years
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6 text-center">
                    <Droplets className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <p className="font-semibold text-amber-900">Water Ingress</p>
                    <p className="text-sm text-amber-700 mt-2">
                      Poorly sealed cable entries and inadequate drainage allow moisture
                      to reach DC connections &mdash; accelerating corrosion and arc risk
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                    <p className="font-semibold text-amber-900">Salt Corrosion</p>
                    <p className="text-sm text-amber-700 mt-2">
                      Island geography means salt spray affects even inland sites.
                      C5-rated enclosures protect the container &mdash; not the interfaces
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Five Prevention Protocols */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <ClipboardCheck className="w-8 h-8 text-green-600" />
                Five Protocols That Prevent Early-Life Failures
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The fix is not more inspections. It is fewer gaps in ownership. These five
                protocols, applied consistently during every BESS installation on a solar farm
                site, eliminate the most common root causes of early-life failures.
              </p>

              <div className="space-y-4">
                {/* Protocol 1 */}
                <Card className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-700">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Interface Ownership Matrix</h4>
                        <p className="text-gray-600 mb-3">
                          Before construction starts, map every physical interface &mdash; cable entry,
                          grounding bond, drainage detail, HVAC penetration &mdash; to a single named
                          person. Not a discipline, not a company. A person who signs off that specific
                          interface.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Why it works:</strong> When a cable entry is nobody&rsquo;s
                            responsibility, it gets sealed by whoever finishes last. When it belongs to
                            a named engineer, it gets sealed correctly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol 2 */}
                <Card className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-700">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Torque Witness Protocol</h4>
                        <p className="text-gray-600 mb-3">
                          Every critical connection torqued to OEM specification, marked with
                          torque-indicating paint, photographed with a timestamped image, and logged
                          in the project record. Two-person witness for all busbar and MV terminations.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Why it works:</strong> This single protocol eliminates an estimated
                            30% of early-life electrical failures. A torqued-and-marked connection
                            creates accountability and a verifiable record.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol 3 */}
                <Card className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-700">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Pre-Energisation Walk-Down</h4>
                        <p className="text-gray-600 mb-3">
                          Not a punch list. A structured, interface-by-interface inspection with the named
                          owner of each interface point, conducted before any load is applied.
                          Every cable entry, every grounding bond, every drainage path, every seal.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Why it works:</strong> Commissioning is too late to find workmanship
                            defects. Under energisation pressure, there is always an incentive to
                            defer &mdash; &ldquo;let&rsquo;s fix it during O&amp;M.&rdquo; The walk-down
                            is the last gate before that incentive takes over.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol 4 */}
                <Card className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-700">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">48-Hour Thermal Soak Test</h4>
                        <p className="text-gray-600 mb-3">
                          Before handover, run the system under full charge/discharge cycles for 48 hours
                          continuously. Thermal imaging of all connections at hour 0, hour 24, and hour 48.
                          Any connection that develops a hot spot under thermal cycling is reworked before PAC.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Why it works:</strong> Cold-check torque verification catches about
                            70% of loose connections. The other 30% only show up once thermal expansion
                            cycles begin. Two days of soak testing catches them before the client does.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol 5 */}
                <Card className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-700">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">As-Built Drainage Verification</h4>
                        <p className="text-gray-600 mb-3">
                          Run water through every cable tray, every trench, every container base
                          penetration. If water pools at any point, resolve it before energisation.
                          Document the test with video evidence showing water flow direction and
                          drainage clearance at every interface point.
                        </p>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            <strong>Why it works:</strong> Drainage failures are invisible until the first
                            heavy rain. In Cyprus, that may be 4&ndash;6 months after a summer
                            installation &mdash; well past the point where civil works crews have
                            demobilised.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* The Real Lesson */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Eye className="w-8 h-8 text-sky-600" />
                The Real Lesson
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The failure is not in the battery. It is in the space between contracts.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                A BESS container leaves the factory fully tested. The civil foundation meets
                its design spec. The electrical installation follows the single-line diagram.
                Each package, taken alone, is compliant. But the system is only as reliable as
                its weakest interface &mdash; and interfaces live between packages.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                If you want reliability, own the interfaces, not just the packages. That means
                having an EPC integrator or owner&rsquo;s engineer whose explicit scope is the
                boundary between every discipline &mdash; and who has the authority to hold all
                parties accountable at those boundaries.
              </p>

              <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-heading font-bold text-sky-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2 text-sky-800">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>The majority of BESS failures in years 1&ndash;2 are construction defects, not battery degradation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>Interface points &mdash; where civil, electrical, and OEM scopes meet &mdash; are the highest-risk areas on any BESS site.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>A torque witness protocol alone eliminates ~30% of early-life electrical failures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>Pre-energisation walk-downs and 48-hour thermal soak tests catch defects that cold inspections miss.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>Cyprus&rsquo;s climate &mdash; extreme heat, salt spray, and seasonal rain &mdash; accelerates every workmanship gap.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                      <span>Own the interfaces, not just the packages. Assign a named person to every boundary point.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Our Approach */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold text-green-900 mb-3">
                  How We Handle This at Lighthief
                </h3>
                <p className="text-green-800 mb-4">
                  As the EPC integrator for our portfolio, we own every interface between
                  the OEM container, the civil contractor, and the electrical installer. Our
                  internal service manual includes mandatory torque witness protocols,
                  pre-energisation walk-downs, thermal soak testing, and drainage verification
                  for every BESS installation across our 51-park portfolio.
                </p>
                <p className="text-green-800">
                  We do not subcontract interface management. If a cable entry sits between the
                  civil and electrical scope, it is ours to inspect, verify, and sign off.
                  That is the only way to guarantee that workmanship gaps do not become
                  warranty claims &mdash; or worse, safety incidents.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Adding BESS to Your Solar Farm?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Installation quality determines whether your BESS delivers reliable returns
                or becomes a maintenance liability. Talk to us about how we manage construction
                risk across our portfolio &mdash; and how we can apply the same standards to
                your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/contact?service=bess">
                    Discuss Your BESS Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog/bess-installation-container-to-grid">
                    Our Installation Process
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="text-center pt-8 border-t">
              <Button asChild variant="ghost">
                <Link href="/blog">
                  <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                  Back to All Articles
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
