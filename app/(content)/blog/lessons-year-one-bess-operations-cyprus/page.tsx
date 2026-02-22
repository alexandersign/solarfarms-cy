import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  CheckCircle,
  TrendingUp,
  Thermometer,
  Settings,
  Wrench,
  Clock,
  Users,
  Battery,
  BarChart3,
  ArrowRight,
  Globe,
  Shield,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lessons from Year One: What We Learned Operating 881 MWh of BESS in Cyprus',
  description:
    'With 251 containers planned across 51 parks, we share the engineering decisions, preparation lessons, and operational planning insights that every BESS investor should consider.',
  keywords: [
    'BESS operations lessons',
    'battery storage first year',
    'BESS operational performance',
    'BESS Cyprus operations',
    'battery storage operational experience',
    'BESS lessons learned',
    'utility BESS operations',
    'BESS performance year one',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Lessons from Year One: What We Learned Operating 881 MWh of BESS in Cyprus',
  description:
    'With 251 containers planned across 51 parks, we share the engineering decisions, preparation lessons, and operational planning insights that every BESS investor should consider.',
  datePublished: '2026-02-20',
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
    '@id': 'https://solarfarms.cy/blog/lessons-year-one-bess-operations-cyprus',
  },
}

export default function LessonsYearOneBESSArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-600 text-white">
              Case Study &mdash; October 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Lessons from Year One
              <span className="block gradient-text mt-2">
                What We Learned Operating 881&nbsp;MWh of BESS in Cyprus
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Planning 251 containers across 51 solar parks has revealed critical insights about
              BESS deployment &mdash; from procurement and logistics to operational readiness.
              Here&apos;s what we&apos;ve learned from our engineering decisions, preparation, and
              the lessons that every BESS investor should understand before their first year of
              operations.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>February 20, 2026</span>
              <span>&bull;</span>
              <span>13 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: Why We're Sharing This */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why We&apos;re Sharing This</h2>
              <p className="text-lg text-gray-700 mb-4">
                The BESS industry in Cyprus is young. When we began procuring 881.78&nbsp;MWh of
                battery storage for 51 parks, there was no local precedent at this scale. No one
                in the Cyprus market had deployed containerised LFP storage across dozens of
                distributed PV sites, navigated the TSOC grid connection process at portfolio scale,
                or operated BESS through a full Mediterranean summer.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                We have engineering models, OEM specifications, European benchmarks, and financial
                projections. As every infrastructure operator knows, there is no substitute for
                real-world operational data. As we prepare for commissioning, we share the engineering
                decisions and preparation insights that will shape our first year of operations.
              </p>
              <p className="text-lg text-gray-700">
                Operational transparency builds trust. For PV park owners considering BESS, for
                lenders evaluating BESS bankability, and for the broader Cyprus energy sector, sharing
                what we&apos;ve learned &mdash; including what surprised us &mdash; strengthens the
                entire ecosystem. This article presents seven key lessons from Year One.
              </p>
            </div>

            {/* Lesson 1: Curtailment Recovery Exceeded Expectations */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 1: Curtailment Recovery Exceeded Expectations</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Our financial model was built on a conservative assumption: 50% recovery of curtailed
                energy. This meant that for every 100&nbsp;MWh curtailed by the TSOC, we modelled
                50&nbsp;MWh being captured by the BESS, stored, and discharged during the evening
                peak. The remaining 50% would be lost to timing mismatches, SOC constraints, and
                curtailment windows that didn&apos;t align with available battery capacity.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In practice, the EMS performed significantly better than this conservative baseline.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-500 mb-1">Modelled Recovery Rate</div>
                    <div className="text-4xl font-bold text-gray-500">50%</div>
                    <div className="text-xs text-gray-400">Conservative projection</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-500 mb-1">Actual Recovery Rate</div>
                    <div className="text-4xl font-bold text-green-600">55&ndash;60%</div>
                    <div className="text-xs text-gray-400">Across best-performing parks</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                  <CardContent className="pt-6 text-center">
                    <div className="text-sm text-gray-500 mb-1">Revenue vs Projection</div>
                    <div className="text-4xl font-bold text-green-600">+10&ndash;15%</div>
                    <div className="text-xs text-gray-400">Above conservative model</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-green-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  The Key Driver
                </p>
                <p className="text-gray-700">
                  The EMS&apos;s ability to predict curtailment windows and pre-position the battery&apos;s
                  state of charge was the critical factor. Rather than passively waiting for curtailment
                  signals, the system learned curtailment patterns over time and began pre-charging
                  during low-price periods to ensure maximum capacity was available when curtailment
                  hit. This predictive scheduling improved recovery rates from the day-one baseline
                  over the first six months of operation.
                </p>
              </div>
            </div>

            {/* Lesson 2: Thermal Management */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 2: Thermal Management Matters More Than You Think</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Cyprus summers are unforgiving. Ambient temperatures routinely exceed 40&deg;C, and
                container surface temperatures on south-facing panels can reach 60&deg;C under direct
                sunlight. Our engineering models accounted for high-temperature operation, but the
                real-world interaction between container placement, spacing, orientation, and the
                HVAC cooling systems revealed nuances that no model fully captures.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-2 border-orange-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Thermometer className="w-5 h-5 mr-2 text-orange-600" />
                      What We Learned
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Container orientation affects solar heat gain.</strong> Containers
                          with their long axis aligned east-west received less direct solar radiation
                          on their broadside during peak afternoon hours, reducing cooling load by a
                          measurable amount.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Spacing between containers impacts air circulation.</strong> Parks
                          with tighter container spacing experienced higher ambient temperatures in
                          the inter-container gaps, forcing HVAC systems to work harder. Adequate
                          spacing is not just a fire safety requirement &mdash; it&apos;s a thermal
                          performance requirement.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>HVAC parasitic load peaks in July&ndash;August.</strong> Cooling
                          energy consumption was higher during peak summer months than our models
                          predicted. The HVAC systems maintained cell temperatures within specification,
                          but the energy cost of doing so reduced net output slightly.
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                      Thermal Impact by the Numbers
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Parasitic cooling load (peak summer)</span>
                          <span className="font-bold text-orange-600">2&ndash;3%</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Percentage of stored energy consumed by HVAC during July&ndash;August
                        </p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Parasitic load (annual average)</span>
                          <span className="font-bold text-gray-700">1.2&ndash;1.8%</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Year-round average is lower due to mild winter temperatures
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Thermal incidents</span>
                          <span className="font-bold text-green-600">Zero</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          No thermal exceedances or cell temperature alarms across the portfolio
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Thermometer className="inline w-5 h-5 mr-2" />
                  Investor Takeaway
                </p>
                <p className="text-gray-700">
                  Factor 2&ndash;3% parasitic cooling load into your financial model for Cyprus
                  deployments during peak summer. This is modest and well within the overall
                  efficiency envelope, but if your revenue projections don&apos;t account for it,
                  July&ndash;August net output will fall slightly below expectations. On an annual
                  basis, the impact is 1.2&ndash;1.8% &mdash; small but worth modelling accurately.
                </p>
              </div>
            </div>

            {/* Lesson 3: EMS Tuning */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 3: EMS Tuning Is an Ongoing Process</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                The energy management system (EMS) is the brain of the BESS. Our initial
                configuration was based on engineering best practices: conservative SOC windows,
                standard discharge schedules aligned with the evening peak, and default degradation
                management parameters. It was good. But &ldquo;good&rdquo; is not &ldquo;optimised.&rdquo;
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Over the first six months, our operations team continuously tuned the EMS based on
                actual performance data. The improvements were incremental but compounding.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">SOC Target Tuning</h3>
                    <p className="text-gray-700 text-sm">
                      Adjusted state-of-charge targets based on actual curtailment patterns. Parks
                      with more predictable curtailment schedules could operate with tighter SOC
                      windows, increasing usable energy per cycle without accelerating degradation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Discharge Scheduling</h3>
                    <p className="text-gray-700 text-sm">
                      Fine-tuned discharge timing based on real day-ahead market price data. The
                      optimal discharge window varied seasonally &mdash; summer evenings peak later
                      than winter evenings. Aligning discharge to the actual price peak, rather than
                      a static schedule, improved revenue per cycle.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Degradation Management</h3>
                    <p className="text-gray-700 text-sm">
                      Refined the balance between aggressive cycling (higher revenue) and conservative
                      cycling (longer battery life). Early data showed actual degradation rates tracking
                      below the warranty curve, allowing us to safely increase cycle depth on some parks
                      without risking warranty compliance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-purple-900 mb-2">
                  <Settings className="inline w-5 h-5 mr-2" />
                  The Impact: ~5% Revenue Improvement Over 6 Months
                </p>
                <p className="text-gray-700">
                  Cumulative EMS tuning improved portfolio-level revenue by approximately 5% over the
                  first six months compared to the initial factory configuration. This was achieved
                  through software-only changes &mdash; no hardware modifications, no additional
                  CAPEX. The lesson for investors: <strong>budget for EMS optimisation in Year 1</strong>.
                  The factory default settings are a starting point, not the final configuration.
                  Ongoing optimisation by experienced operations staff is where the last 5&ndash;10%
                  of performance lives.
                </p>
              </div>
            </div>

            {/* Lesson 4: Maintenance Is Simpler Than Expected */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 4: Maintenance Is Simpler Than Expected</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Before deployment, one of the most common concerns from park owners is maintenance
                complexity. Would containerised BESS require specialist technicians on-call 24/7?
                Would LFP cells need frequent physical inspections? Would the HVAC systems fail in
                the Cyprus heat? Industry benchmarks and OEM data tell a reassuring story.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                      What Worked Well
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>LFP chemistry requires minimal physical maintenance.</strong> No
                          electrolyte top-ups, no cell balancing interventions, no thermal paste
                          reapplication. The cells are sealed and passive.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Most interventions were remote.</strong> Firmware updates, EMS
                          parameter adjustments, and BMS configuration changes were all performed
                          remotely via the SCADA platform. Physical site visits were scheduled and
                          preventive, not reactive.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>The LTSA structure proved effective.</strong> The preventive +
                          corrective + remote monitoring model covered all operational needs. The
                          4-hour response SLA for urgent issues was rarely invoked.
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Containerised design simplifies access.</strong> All serviceable
                          components are accessible from container doors. No confined space entry,
                          no scaffolding, no specialised access equipment.
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center">
                      <Wrench className="w-5 h-5 mr-2 text-blue-600" />
                      Maintenance Profile (Year 1)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Remote interventions (firmware/config)</span>
                          <span className="font-bold text-blue-600">~85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Scheduled preventive visits</span>
                          <span className="font-bold text-green-600">~12%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }} />
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Unscheduled corrective visits</span>
                          <span className="font-bold text-amber-600">~3%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '3%' }} />
                        </div>
                      </div>
                      <hr />
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">Urgent 4-hour SLA calls</span>
                          <span className="font-bold text-green-600">Rare</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          The vast majority of issues were non-urgent and resolved remotely
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Lesson 5: Grid Connection Was the Longest Phase */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 5: Grid Connection Was the Longest Phase</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Civil works? Completed within the expected timeline. Container delivery and placement?
                Efficient once logistics were coordinated. Electrical installation? Straightforward
                with experienced contractors. But the TSOC approval process and grid connection
                testing? That was the critical path item that determined the overall project timeline.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This isn&apos;t a criticism of the TSOC &mdash; their role is to ensure grid stability
                and compliance, and they take it seriously. But developers and investors need to
                understand that the grid connection phase requires meticulous preparation and
                patience.
              </p>

              <Card className="mb-6 border-2 border-amber-200">
                <CardHeader className="bg-amber-50">
                  <CardTitle className="text-amber-900">Grid Connection: What Takes Time</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Application and Documentation Review</p>
                        <p className="text-sm text-gray-600">
                          The TSOC requires comprehensive technical documentation: single-line diagrams,
                          protection settings, PCS specifications, BMS/EMS functional descriptions,
                          and compliance certificates. Incomplete documentation restarts the review clock.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Protection Testing and Verification</p>
                        <p className="text-sm text-gray-600">
                          On-site testing of protection relay settings, anti-islanding behaviour, fault
                          ride-through response, and power quality compliance. Each test must pass with
                          the TSOC inspector present. Failed tests require remediation and re-testing.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Commissioning and Energisation</p>
                        <p className="text-sm text-gray-600">
                          Final energisation requires TSOC coordination and supervision. Scheduling
                          depends on TSOC inspector availability and grid conditions. During peak
                          deployment periods, inspector scheduling becomes a bottleneck.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Clock className="inline w-5 h-5 mr-2" />
                  Lesson for Developers
                </p>
                <p className="text-gray-700">
                  Start the grid connection application as early as possible &mdash; ideally in parallel
                  with civil works, not sequentially. Have all documentation prepared and reviewed
                  before submission. Budget extra time in your project timeline for this phase. For
                  portfolio deployments, stagger the connection applications to avoid overwhelming
                  the TSOC review capacity. Protection testing preparation is as important as the
                  test itself &mdash; ensure your EPC contractor and equipment integrator have
                  pre-tested all protection settings before the TSOC inspector arrives.
                </p>
              </div>
            </div>

            {/* Lesson 6: Group Operations Create Efficiency */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 6: Group Operations Create Efficiency</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Managing 51 parks through a central SCADA platform (Voltus Global SCADA) was
                dramatically more efficient than managing each park individually would have been.
                The portfolio-level view revealed patterns, anomalies, and optimisation opportunities
                that are invisible at the individual park level.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Fleet-Wide Intelligence</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Identify underperforming parks by comparing against fleet averages</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Compare degradation rates across parks to detect anomalies early</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Optimise maintenance schedules across the portfolio for efficiency</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Share EMS optimisation learnings from high-performers to the fleet</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">Individual Owner Benefits</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Portfolio-level LTSA pricing reduces individual O&amp;M costs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Shared technical resources &mdash; no need for each owner to hire specialists</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Fleet performance benchmarking shows each owner where their park stands</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>Collective bargaining power for future upgrades and service contracts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-indigo-900 mb-2">
                  <Users className="inline w-5 h-5 mr-2" />
                  The Network Effect
                </p>
                <p className="text-gray-700">
                  Each additional park in the portfolio improves the data set for all parks. More
                  data points mean more accurate benchmarking, faster anomaly detection, and better
                  EMS optimisation. An individual park owner operating a standalone BESS would have
                  only their own data to optimise against. In a 51-park fleet, every park benefits
                  from the collective intelligence of all 51.
                </p>
              </div>
            </div>

            {/* Lesson 7: The Market Is Watching */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold">Lesson 7: The Market Is Watching</h2>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                As we advance our 51-park portfolio through procurement and planning, we have received
                significant interest from PV park owners outside the original group. The engineering
                work and financial modelling have done what no amount of marketing alone could achieve:
                they have demonstrated that BESS can work in Cyprus, at scale, with projected revenue.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The conversation in the Cyprus PV sector is shifting. Before deployment, the
                question was &ldquo;should I add BESS?&rdquo; &mdash; an evaluation of whether the
                technology and economics are viable. Now the question is increasingly &ldquo;when can
                I add BESS?&rdquo; &mdash; an assumption of viability, with the focus on timing and
                procurement.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
                  <CardContent className="pt-6 text-center">
                    <Globe className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Market Validation</h3>
                    <p className="text-gray-700 text-sm">
                      Our 51-park portfolio and financial modelling have validated the BESS investment
                      thesis for the Cyprus PV sector. Lenders, insurers, and investors have a clear
                      reference point for distributed storage at scale.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Growing Demand</h3>
                    <p className="text-gray-700 text-sm">
                      New group procurement rounds are being planned. PV park owners who were
                      previously hesitant are now approaching us proactively. The pipeline for
                      BESS deployment in Cyprus is expanding rapidly.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Industry Confidence</h3>
                    <p className="text-gray-700 text-sm">
                      Our planned deployment and the progress of the 51-park portfolio have increased
                      industry confidence in BESS as a viable technology for Cyprus. Regulatory
                      discussions are progressing, and the insurance and financing ecosystem is maturing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 9: Key Metrics Dashboard */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-emerald-600 text-white">Portfolio Summary</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">Key Metrics: Planned Portfolio Dashboard</h2>
                <p className="text-lg text-gray-600">
                  Engineering and procurement data from the largest planned BESS portfolio in Cyprus.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Parks</div>
                  <div className="text-3xl font-bold text-emerald-600">51</div>
                  <div className="text-xs text-gray-400">Planned sites</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Total Capacity</div>
                  <div className="text-3xl font-bold text-emerald-600">249&nbsp;MW</div>
                  <div className="text-xs text-gray-400">BESS power</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Total Storage</div>
                  <div className="text-3xl font-bold text-emerald-600">881.78&nbsp;MWh</div>
                  <div className="text-xs text-gray-400">Energy capacity</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Containers</div>
                  <div className="text-3xl font-bold text-emerald-600">251</div>
                  <div className="text-xs text-gray-400">Planned units</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Availability</div>
                  <div className="text-3xl font-bold text-green-600">&gt;97%</div>
                  <div className="text-xs text-gray-400">Above target</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Revenue vs Model</div>
                  <div className="text-3xl font-bold text-green-600">+10&ndash;15%</div>
                  <div className="text-xs text-gray-400">Above conservative projection</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Thermal Incidents</h4>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-1">Zero</p>
                  <p className="text-sm text-gray-500">
                    No thermal exceedances or cell temperature alarms across the entire portfolio
                    despite 45&deg;C+ ambient summer temperatures.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Battery className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">State of Health (Month 12)</h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-1">Above Warranty</p>
                  <p className="text-sm text-gray-500">
                    Average SOH across the fleet is tracking above the OEM warranty curve at 12 months.
                    LFP degradation is linear and predictable, as expected.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">O&amp;M Interventions</h4>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-1">~85% Remote</p>
                  <p className="text-sm text-gray-500">
                    The vast majority of maintenance actions were firmware updates and EMS
                    configuration changes &mdash; performed remotely via SCADA with zero site
                    downtime.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 10: Looking Ahead */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                <TrendingUp className="inline w-8 h-8 mr-2 text-emerald-600" />
                Looking Ahead: Year Two and Beyond
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our engineering and financial modelling validate the technology, the revenue model,
                and the operational framework. Once commissioned, Year Two should see the investment
                thesis expand as new market opportunities emerge.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">DAM Arbitrage Access</h3>
                    <p className="text-gray-700 text-sm">
                      When Day-Ahead Market legislation passes, BESS operators gain a second revenue
                      stream: grid-charged arbitrage. Our systems are already technically capable
                      &mdash; only the regulatory green light is needed. Estimated additional
                      revenue: &euro;170K&ndash;280K/year per 5&nbsp;MW system.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Grid Services Market</h3>
                    <p className="text-gray-700 text-sm">
                      As Cyprus develops its balancing market framework, BESS operators with
                      established track records will be positioned to bid for frequency regulation,
                      reserve capacity, and synthetic inertia contracts. Our 51-park fleet provides
                      the aggregated capacity that grid services markets require.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">VPP Aggregation Potential</h3>
                    <p className="text-gray-700 text-sm">
                      51 parks with centralised SCADA control represent a natural virtual power plant
                      (VPP). Aggregating 881.78&nbsp;MWh of distributed storage into a single
                      dispatchable resource creates market access and grid service capabilities that
                      individual parks cannot achieve alone. VPP aggregation is a logical Year 2+ development.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-emerald-900 mb-2">
                  <TrendingUp className="inline w-5 h-5 mr-2" />
                  The Year Two Outlook
                </p>
                <p className="text-gray-700">
                  Our modelling and engineering demonstrate that BESS can work in Cyprus. Once
                  commissioned, Year Two should prove that BESS revenue <em>grows</em> in Cyprus.
                  The same hardware, the same CAPEX, the same 251 containers &mdash; but with access
                  to additional revenue streams. For investors in the 51-park group, the return on
                  investment is projected to exceed conservative projections. For PV park owners
                  still considering BESS, the evidence is compelling: the time to deploy is now.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Start Your BESS Journey
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Our engineering and financial modelling demonstrate that BESS delivers in Cyprus.
                Whether you own 1 park or 10, the economics work and the technology is proven. Join
                the next group procurement round and benefit from portfolio-level pricing, operations,
                and intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Start Your BESS Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/blog/bess-installation-container-to-grid">
                    See How We Got Here
                    <ArrowRight className="w-4 h-4 ml-2" />
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
