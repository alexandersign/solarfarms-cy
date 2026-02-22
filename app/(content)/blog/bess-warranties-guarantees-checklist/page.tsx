import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Clock,
  Award,
  ArrowRight,
  Lock,
  Euro,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Warranties, Guarantees, and Performance Bonds: The BESS Buyer\'s Protection Checklist',
  description: 'Not all BESS warranties are equal. We break down capacity warranties, availability guarantees, performance bonds, and LTSA structures — with the exact terms we secured for our 881 MWh portfolio.',
  keywords: [
    'BESS warranty guide',
    'battery storage performance guarantee',
    'BESS LTSA',
    'BESS performance bond',
    'battery warranty comparison',
    'BESS SOH guarantee',
    'energy storage warranty terms',
    'BESS buyer checklist',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Warranties, Guarantees, and Performance Bonds: The BESS Buyer\'s Protection Checklist',
  description: 'Not all BESS warranties are equal. We break down capacity warranties, availability guarantees, performance bonds, and LTSA structures — with the exact terms we secured for our 881 MWh portfolio.',
  datePublished: '2026-07-20',
  dateModified: '2026-07-20',
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
    '@id': 'https://solarfarms.cy/blog/bess-warranties-guarantees-checklist',
  },
}

export default function BESSWarrantiesGuaranteesArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-indigo-600 text-white">
              Investment Guide &mdash; July 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Warranties, Guarantees, and Performance Bonds
              <span className="block gradient-text mt-2">
                The BESS Buyer&apos;s Protection Checklist
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Not all BESS warranties are equal. We break down capacity warranties, availability
              guarantees, performance bonds, and LTSA structures &mdash; with the exact terms we
              secured for our 881&nbsp;MWh portfolio.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>July 20, 2026</span>
              <span>&bull;</span>
              <span>11 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: Why Warranties Make or Break Your Investment */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-indigo-600" />
                Why Warranties Make or Break Your Investment
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A BESS is a 15&ndash;20 year asset. Unlike solar panels that sit passively on racks,
                battery systems are electrochemical machines that degrade with every cycle, respond to
                thermal stress, and depend on dozens of interconnected components &mdash; from individual
                cells to power conversion systems to cooling infrastructure. Over two decades, things
                will go wrong.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The warranty structure determines whether you&rsquo;re protected against degradation,
                equipment failure, and performance shortfalls &mdash; or whether you&rsquo;re left
                absorbing losses that erode your investment returns. Most buyers focus on the headline
                price per MWh but ignore the warranty terms. This is a costly mistake.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We&rsquo;ve seen proposals where the upfront price looks attractive, but the warranty
                package is thin: vague SOH thresholds, no liquidated damages for downtime, and extended
                warranty pricing left as &ldquo;to be negotiated.&rdquo; When you model these gaps over
                15 years, the &ldquo;cheap&rdquo; system costs significantly more than a properly
                warranted one.
              </p>
              <Card className="border-indigo-200 bg-indigo-50">
                <CardContent className="pt-6">
                  <p className="text-lg text-indigo-800 font-medium">
                    <Lock className="w-5 h-5 inline-block mr-2 mb-1" />
                    In our 881&nbsp;MWh portfolio, warranty terms were negotiated as a package &mdash;
                    not line by line. The result is a comprehensive protection framework that satisfies
                    both investors and insurers. Here&rsquo;s what that looks like.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: The Four Types of BESS Protection */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-indigo-600" />
                The Four Types of BESS Protection
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Every serious BESS procurement should include four distinct layers of protection. Each
                serves a different purpose, and gaps in any one of them create exposure that can&rsquo;t
                be covered by the others.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Card A: Capacity Warranty */}
                <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">Capacity Warranty (SOH Guarantee)</CardTitle>
                    </div>
                    <CardDescription>
                      Guarantees minimum state of health over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      The most critical warranty for any battery system. It defines the minimum usable
                      capacity at key milestones throughout the battery&rsquo;s life. Without year-by-year
                      SOH milestones, you have no contractual recourse when degradation exceeds expectations.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-800 mb-2">Our Confirmed Terms:</p>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span><strong>Year 5:</strong> &ge;85% SOH</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span><strong>Year 10:</strong> &ge;79.58% SOH</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span><strong>Year 15:</strong> &ge;70% SOH</span>
                        </li>
                      </ul>
                      <p className="text-sm text-blue-600 mt-3">
                        At year 15, your 20&nbsp;MWh system still delivers at least 14&nbsp;MWh of
                        usable capacity &mdash; guaranteed.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card B: Availability Guarantee */}
                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">Availability Guarantee</CardTitle>
                    </div>
                    <CardDescription>
                      System must be operational a guaranteed percentage of time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Availability guarantees ensure your system is ready to charge and discharge when
                      you need it. A system that&rsquo;s offline during peak pricing windows costs you
                      real revenue &mdash; and you need contractual compensation for that.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-green-800 mb-2">Our Confirmed Terms:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span><strong>Availability target:</strong> 97%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span><strong>Liquidated damages:</strong> &euro;30/MWh/day for shortfalls</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span><strong>Measured:</strong> Monthly rolling average</span>
                        </li>
                      </ul>
                      <p className="text-sm text-green-600 mt-3">
                        If availability drops below 97%, the service provider pays &mdash; not you.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card C: Cycle Life Warranty */}
                <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <CardTitle className="text-xl">Cycle Life Warranty</CardTitle>
                    </div>
                    <CardDescription>
                      Guarantees minimum cycles before end of life
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Cycle life defines how many charge-discharge cycles the battery can complete before
                      degradation reaches end-of-life thresholds. This directly impacts your revenue model
                      &mdash; more cycles means more years of productive operation.
                    </p>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-amber-800 mb-2">Our Confirmed Terms:</p>
                      <ul className="space-y-1 text-sm text-amber-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span><strong>Cycle count:</strong> 7,000 cycles</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span><strong>Depth of discharge:</strong> 70% DOD</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span><strong>Cell chemistry:</strong> EVE LFP (LiFePO&sub4;)</span>
                        </li>
                      </ul>
                      <p className="text-sm text-amber-600 mt-3">
                        At daily cycling, 7,000 cycles equates to 19+ years of productive operation.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Card D: Performance Bond */}
                <Card className="border-violet-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                        <Euro className="w-5 h-5 text-violet-600" />
                      </div>
                      <CardTitle className="text-xl">Performance Bond</CardTitle>
                    </div>
                    <CardDescription>
                      Financial guarantee that the EPC delivers as specified
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      A performance bond is a financial instrument &mdash; typically a bank guarantee or
                      surety bond &mdash; that protects the buyer if the EPC contractor fails to deliver
                      the system as specified. It&rsquo;s your financial safety net during construction
                      and the defect liability period.
                    </p>
                    <div className="bg-violet-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-violet-800 mb-2">Standard Terms:</p>
                      <ul className="space-y-1 text-sm text-violet-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                          <span><strong>Value:</strong> 5&ndash;10% of contract value</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                          <span><strong>Duration:</strong> Construction + defect liability period</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                          <span><strong>Held in:</strong> Escrow or bank guarantee</span>
                        </li>
                      </ul>
                      <p className="text-sm text-violet-600 mt-3">
                        For a &euro;2M+ BESS installation, a performance bond of &euro;100K&ndash;200K
                        provides critical leverage if the contractor underdelivers.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: OEM Warranty vs EPC Guarantee */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <FileCheck className="w-8 h-8 text-indigo-600" />
                OEM Warranty vs EPC Guarantee
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                This is the distinction that most buyers miss &mdash; and it can leave you exposed to
                significant financial risk. There are two separate layers of contractual protection, and
                they cover different failure modes entirely.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                When a system underperforms, the first question is: <em>whose fault is it?</em> If a
                battery cell fails prematurely, that&rsquo;s a manufacturing defect &mdash; the OEM is
                responsible. But if the system delivers 15% less energy than projected because the
                installer wired the cooling incorrectly or misconfigured the EMS, the OEM warranty
                won&rsquo;t cover it. That&rsquo;s an installation issue, and you need the EPC
                guarantee.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      OEM Warranty
                    </CardTitle>
                    <CardDescription>Manufacturer responsibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span>Covers <strong>hardware defects</strong> in battery cells, PCS, BMS, and cooling systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span>Cell-level SOH guarantee against premature degradation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span>Cycle life guarantee based on specified DOD and temperature conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span>Replacement or repair of defective components at OEM cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                        <span>Does <strong>not</strong> cover installation errors, configuration issues, or site-specific problems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-green-600" />
                      EPC Guarantee
                    </CardTitle>
                    <CardDescription>Installer responsibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>Covers <strong>system-level performance</strong> as installed and commissioned</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>Guarantees the system delivers specified MW and MWh at the point of connection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>Covers workmanship: cabling, connections, cooling setup, EMS configuration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span>Defect liability period (typically 24 months from PAC)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                        <span>Does <strong>not</strong> cover inherent cell degradation or manufacturing defects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <p className="text-lg text-red-800 font-medium">
                    <AlertTriangle className="w-5 h-5 inline-block mr-2 mb-1" />
                    <strong>Critical:</strong> If your contract bundles OEM warranty and EPC guarantee
                    into a single clause, you have a liability gap. When something fails, each party
                    points to the other. Insist on <strong>separate, clearly defined</strong> warranty
                    and guarantee sections in your contracts.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: LTSA — The Long-Term Service Agreement */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Wrench className="w-8 h-8 text-indigo-600" />
                LTSA: The Long-Term Service Agreement
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                A Long-Term Service Agreement (LTSA) is your ongoing protection after the initial
                warranty period. It covers scheduled maintenance, emergency repairs, spare parts, remote
                monitoring, and availability commitments. Without an LTSA, you&rsquo;re responsible for
                maintaining a complex electrochemical system with your own resources &mdash; or paying
                market rates for ad hoc service calls.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The LTSA should be negotiated and priced <em>at the time of procurement</em>, not after
                commissioning. Post-commissioning, you have zero negotiating leverage &mdash; the service
                provider knows you have no alternative.
              </p>

              <Card className="border-indigo-200 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Our LTSA Structure</CardTitle>
                  <CardDescription>
                    Lighthief Cyprus Ltd &mdash; 15-year Tier C comprehensive service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contract Details</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span><strong>Duration:</strong> 15 years</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span><strong>Tier:</strong> C (comprehensive)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Euro className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span><strong>Rate:</strong> &euro;1,740/MWh over contract period</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span><strong>Response SLA:</strong> 4-hour response time</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span><strong>Provider:</strong> Lighthief Cyprus Ltd (local, OEM-backed)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Included Services</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Preventive maintenance (quarterly)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Corrective maintenance (on-call)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>24/7 remote monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Spare parts management</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Firmware updates and optimisation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-lg">Extended Warranty Pricing</CardTitle>
                  <CardDescription>
                    Confirmed upfront &mdash; not &ldquo;to be negotiated&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    One of the most important aspects of our LTSA is that extended warranty pricing is
                    locked in at contract signing. You know exactly what years 6&ndash;15 will cost
                    before you commit.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <p className="text-sm text-gray-500 mb-1">Years 6&ndash;10</p>
                      <p className="text-2xl font-bold text-amber-700">&euro;1,661.68<span className="text-sm font-normal text-gray-500">/MWh</span></p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <p className="text-sm text-gray-500 mb-1">Years 11&ndash;15</p>
                      <p className="text-2xl font-bold text-amber-700">&euro;2,083.72<span className="text-sm font-normal text-gray-500">/MWh</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 5: The Buyer's Protection Checklist */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <FileCheck className="w-8 h-8 text-indigo-600" />
                The Buyer&apos;s Protection Checklist
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Before signing any BESS EPC contract, verify that every item on this checklist is
                explicitly addressed. Missing even one creates a gap that can cost you hundreds of
                thousands over the asset&rsquo;s lifetime.
              </p>

              <div className="space-y-4">
                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">SOH Guarantee with Year-by-Year Milestones</h4>
                        <p className="text-gray-600">
                          Not just an end-of-warranty threshold. You need milestones at years 5, 10, and
                          15 minimum. If degradation exceeds the curve at any milestone, the OEM must
                          remediate &mdash; replace cells, augment capacity, or compensate financially.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Cycle Life Guarantee at Specified DOD</h4>
                        <p className="text-gray-600">
                          The cycle count must specify the depth of discharge. 7,000 cycles at 70% DOD is
                          very different from 7,000 cycles at 100% DOD. Ensure the DOD matches your
                          operating profile.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Availability Guarantee with Liquidated Damages</h4>
                        <p className="text-gray-600">
                          A 97% availability target is meaningless without financial consequences. Liquidated
                          damages (&euro;/MWh/day) create accountability and ensure the service provider is
                          incentivised to keep your system running.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Separate OEM Warranty and EPC Guarantee</h4>
                        <p className="text-gray-600">
                          These must be distinct contractual sections with clear delineation of
                          responsibility. When hardware fails, the OEM pays. When installation causes
                          underperformance, the EPC pays. No ambiguity, no finger-pointing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Performance Bond (5&ndash;10% of Contract Value)</h4>
                        <p className="text-gray-600">
                          Financial security held in escrow or as a bank guarantee during the construction
                          and defect liability period. If the EPC fails to deliver, you have recourse
                          without litigation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">6</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">24-Month Defect Liability Period (DLP)</h4>
                        <p className="text-gray-600">
                          The period after commissioning during which the EPC contractor must fix any
                          defects at their own cost. 12 months is standard but insufficient for BESS;
                          push for 24 months to capture seasonal performance variations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">7</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">LTSA with Defined SLAs and Response Times</h4>
                        <p className="text-gray-600">
                          A 4-hour response time SLA with clear escalation procedures. The LTSA should
                          specify preventive maintenance schedules, corrective maintenance commitments,
                          and spare parts availability.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">8</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Spare Parts Strategy</h4>
                        <p className="text-gray-600">
                          Should you purchase spare parts upfront or rely on warranty replacement? The answer
                          depends on lead times and your risk tolerance. For our portfolio, we maintain a
                          shared spare parts pool across 51 parks &mdash; cost-effective and fast.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">9</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Extended Warranty Pricing Confirmed Upfront</h4>
                        <p className="text-gray-600">
                          &ldquo;Available upon request&rdquo; or &ldquo;to be negotiated at year 5&rdquo;
                          is not acceptable. Extended warranty rates should be locked in at the time of
                          initial procurement, when you have maximum negotiating leverage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-700 font-bold text-sm">10</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Insurance Compatibility</h4>
                        <p className="text-gray-600">
                          Your warranties must satisfy insurer requirements. If your insurer requires OEM
                          certification, annual maintenance records, and specific fire suppression systems,
                          your warranty and LTSA must align. Misalignment can void your insurance coverage.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 6: Red Flags in BESS Warranty Terms */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                Red Flags in BESS Warranty Terms
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We&rsquo;ve reviewed dozens of BESS proposals from OEMs and EPC contractors. These are
                the warning signs that indicate weak protection &mdash; or worse, deliberate ambiguity
                designed to limit the supplier&rsquo;s liability.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Vague SOH Thresholds</h4>
                        <p className="text-red-700 text-sm">
                          &ldquo;Battery will maintain reasonable performance over the warranty period.&rdquo;
                          Without specific percentages at defined milestones, this is unenforceable. Demand
                          exact SOH figures at years 5, 10, and 15.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">No Cycle Life Guarantee</h4>
                        <p className="text-red-700 text-sm">
                          If the manufacturer won&rsquo;t guarantee cycle count at a specified DOD,
                          it signals a lack of confidence in their cells. Every Tier-1 LFP manufacturer
                          should provide this as standard.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">&ldquo;Best Efforts&rdquo; Availability</h4>
                        <p className="text-red-700 text-sm">
                          &ldquo;We will use best efforts to maintain system availability&rdquo; is
                          worthless. You need a guaranteed percentage (97% minimum) with liquidated damages
                          for shortfalls. No percentage, no damages &mdash; no deal.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">No Liquidated Damages</h4>
                        <p className="text-red-700 text-sm">
                          Guarantees without financial consequences are aspirational statements, not
                          contractual commitments. If the supplier isn&rsquo;t willing to pay when
                          they underdeliver, the guarantee is meaningless.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Extended Warranty &ldquo;Available Upon Request&rdquo;</h4>
                        <p className="text-red-700 text-sm">
                          This means the supplier will price the extension after you&rsquo;re locked in.
                          By year 5, you have no alternatives and no leverage. Extended warranty pricing
                          must be agreed at procurement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Bundled OEM/EPC Warranty</h4>
                        <p className="text-red-700 text-sm">
                          A single warranty clause covering both hardware and installation creates a grey
                          zone. When problems arise, neither party accepts responsibility. Always demand
                          separate, clearly delineated warranty sections.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Summary Card */}
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  The Bottom Line
                </h3>
                <p className="text-indigo-800 mb-4">
                  Warranty terms are not an afterthought &mdash; they&rsquo;re the foundation of your
                  BESS investment case. A system with excellent warranties at &euro;115K/MWh is a better
                  investment than a system at &euro;100K/MWh with gaps in protection. The savings on
                  purchase price are wiped out by a single unwarrantied failure event.
                </p>
                <p className="text-indigo-800">
                  For our 881&nbsp;MWh portfolio, we negotiated every term on this checklist &mdash; and
                  confirmed extended warranty pricing upfront. The result is a warranty framework that
                  gives our investors and their insurers complete confidence in the asset&rsquo;s long-term
                  value.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Want to See Our Warranty Terms?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We&rsquo;re transparent about our warranty structure because we believe informed buyers
                make better decisions. Review our terms, compare them to other proposals, and see why
                our investors are confident in their BESS investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/contact?service=bess">
                    Review Our Warranty Terms
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog/bess-bankability-choosing-right-service-partner">
                    Read Our Bankability Guide
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
