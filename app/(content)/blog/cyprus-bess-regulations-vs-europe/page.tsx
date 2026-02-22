import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  FileCheck,
  Globe,
  Scale,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Building2,
  Landmark,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "How Cyprus's BESS Regulatory Framework Compares to the Rest of Europe",
  description: "Cyprus BESS regulations lag behind mainland Europe but are evolving fast. From CERA licensing to grid connection requirements and EU Battery Regulation compliance — a practical guide for developers navigating Cyprus approvals.",
  keywords: [
    'BESS regulations Cyprus',
    'battery storage permitting Cyprus',
    'CERA energy storage',
    'EU BESS regulation',
    'Cyprus BESS licensing',
    'energy storage regulations Europe',
    'BESS grid connection Cyprus',
    'Cyprus energy policy BESS',
  ],
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Cyprus's BESS Regulatory Framework Compares to the Rest of Europe",
  "author": { "@type": "Person", "name": "Alexander Papacosta" },
  "publisher": { "@type": "Organization", "name": "Lighthief Cyprus Ltd", "url": "https://solarfarms.cy" },
  "datePublished": "2026-05-11",
  "description": "Cyprus BESS regulations lag behind mainland Europe but are evolving fast. From CERA licensing to grid connection requirements and EU Battery Regulation compliance — a practical guide for developers navigating Cyprus approvals.",
  "mainEntityOfPage": "https://solarfarms.cy/blog/cyprus-bess-regulations-vs-europe",
}

export default function CyprusBESSRegulationsArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-orange-600 text-white">
              Regulations &mdash; May 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              How Cyprus&apos;s BESS Regulatory Framework
              <span className="block gradient-text mt-2">
                Compares to the Rest of Europe
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Cyprus&apos;s energy storage regulations are evolving rapidly, but the island still lags behind mature
              European markets. From CERA licensing categories to grid connection protocols and the incoming EU Battery
              Regulation — here&apos;s what developers need to know to navigate the current framework and prepare for
              what&apos;s coming next.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>May 11, 2026</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Regulatory Landscape */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                The Regulatory Landscape: Where Cyprus Stands
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus&apos;s energy storage regulatory framework is still very much a work in progress. While the island has
                made significant strides in deploying solar generation — now accounting for over 20% of total electricity
                production — the rules governing battery storage remain narrow in scope and lag behind the frameworks
                established by peer EU member states.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In contrast, Germany has allowed full standalone BESS market participation since 2017, the UK has operated
                a merchant BESS market since 2016, and Italy&apos;s MACSE capacity market actively compensates storage operators
                for availability. Cyprus currently restricts BESS deployment to specific categories tied to co-located
                renewable energy projects, with standalone storage and grid-charging provisions still in the planning stage.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                      <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Developing Framework</h3>
                    <p className="text-gray-700 text-sm">
                      CERA (Cyprus Energy Regulatory Authority) has established initial licensing categories for
                      storage but the framework remains narrower than most mainland European markets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Key Limitations</h3>
                    <p className="text-gray-700 text-sm">
                      No grid charging permitted for co-located BESS. No standalone storage licensing yet.
                      Revenue limited to curtailment recovery from co-located PV generation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Rapid Evolution</h3>
                    <p className="text-gray-700 text-sm">
                      CERA and TSOC are actively developing new rules for grid charging, ancillary services,
                      and standalone storage — expected to align with EU Clean Energy Package mandates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 2: Cyprus BESS Licensing Categories */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Cyprus BESS Licensing Categories
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                CERA&apos;s current regulatory framework divides energy storage into distinct licensing categories. Understanding
                these categories is essential for any developer planning a BESS deployment in Cyprus, as they determine what
                your system can and cannot do from a revenue perspective.
              </p>

              <div className="space-y-6">
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-900">
                      <FileCheck className="w-6 h-6 mr-2" />
                      Category A: Small-Scale Behind-the-Meter Storage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      Category A covers small-scale battery systems installed behind the meter at commercial or residential
                      premises. These systems are primarily designed for self-consumption optimisation — storing excess
                      rooftop solar during peak generation and discharging during evening demand peaks.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Permitted Uses</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Self-consumption optimisation</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Peak demand reduction</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Backup power during outages</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Typical Parameters</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>Capacity: Up to ~100 kWh</li>
                          <li>Application: Residential / commercial</li>
                          <li>Metering: Net metering eligible</li>
                          <li>Grid export: Limited or none</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <CardTitle className="flex items-center text-emerald-900">
                      <Scale className="w-6 h-6 mr-2" />
                      Category B: Co-Located Storage with RES Projects
                    </CardTitle>
                    <CardDescription className="text-emerald-700 font-medium">
                      Current primary framework for utility-scale BESS in Cyprus
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      Category B is the framework under which most utility-scale BESS projects in Cyprus are currently
                      being developed. It permits battery storage co-located with licensed renewable energy projects —
                      predominantly solar PV parks. The critical constraint: the BESS may only charge from the
                      co-located solar installation, not from the grid.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-semibold text-emerald-800 mb-2">Permitted Uses</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Curtailment recovery from co-located PV</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Time-shifting solar generation to evening peaks</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Grid export within existing PPA limits</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Key Restrictions</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>No grid charging permitted</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>No pure arbitrage revenue possible</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>BESS must be physically co-located</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                      <p className="text-sm font-semibold text-amber-900 mb-1">
                        <AlertTriangle className="inline w-4 h-4 mr-1" />
                        Revenue Implication
                      </p>
                      <p className="text-sm text-gray-700">
                        Because Category B restricts charging to co-located PV only, the BESS cannot participate in
                        day-ahead market (DAM) arbitrage — buying cheap grid power at night and selling at peak prices.
                        Revenue is limited to recovering curtailed solar energy and capturing the evening tariff premium.
                        This is still highly valuable given Cyprus&apos;s 40%+ curtailment rates, but it means the full
                        revenue stack available in markets like the UK or Germany is not yet accessible.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 border-dashed">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="flex items-center text-purple-900">
                      <Clock className="w-6 h-6 mr-2" />
                      Future: Standalone Storage &amp; Grid-Charging Provisions
                    </CardTitle>
                    <CardDescription className="text-purple-700 font-medium">
                      Expected regulatory developments — timeline uncertain
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-4">
                      CERA has signalled its intent to introduce standalone storage licensing and grid-charging
                      provisions, aligning Cyprus with the EU Clean Energy Package mandate for technology-neutral
                      market participation. When enacted, these rules would unlock the full BESS revenue stack.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-purple-700">DAM Arbitrage</div>
                        <div className="text-sm text-gray-600">Buy low, sell high across grid pricing windows</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-purple-700">Ancillary Services</div>
                        <div className="text-sm text-gray-600">Frequency response and voltage regulation payments</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-purple-700">Standalone BESS</div>
                        <div className="text-sm text-gray-600">Grid-connected storage without co-located generation</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Grid Connection Requirements */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Grid Connection Requirements
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Connecting a BESS to the Cyprus grid requires meeting the requirements set by TSOC (Transmission System
                Operator of Cyprus) and EAC (Electricity Authority of Cyprus). The process is more involved than solar-only
                connections and involves additional technical studies, protection system design, and monitoring obligations.
              </p>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      Grid Code Compliance (EN 50549-2)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      All BESS installations must comply with EN 50549-2, the European standard for grid-connected
                      generating plants and storage systems on distribution networks. This covers:
                    </p>
                    <ul className="text-gray-700 text-sm space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Active and reactive power control capabilities</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Frequency response behaviour (under/over-frequency ride-through)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Voltage ride-through requirements during grid disturbances</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Power quality limits (harmonics, flicker, DC injection)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Scale className="w-5 h-5 text-emerald-600 mr-2" />
                      Protection System Design &amp; Testing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      TSOC requires a comprehensive protection system design reviewed and approved before commissioning.
                      On Cyprus&apos;s isolated grid, protection coordination is especially critical since faults cannot
                      propagate to or be absorbed by interconnected networks.
                    </p>
                    <ul className="text-gray-700 text-sm space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Anti-islanding protection (critical for isolated grids)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Over/under-voltage and frequency protection relays</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reverse power flow protection settings</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Pre-commissioning relay testing and TSOC witness inspection</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 text-purple-600 mr-2" />
                      SCADA &amp; Remote Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      TSOC mandates SCADA (Supervisory Control and Data Acquisition) connectivity for all utility-scale
                      BESS installations. The operator must be able to remotely dispatch the system, and TSOC must
                      have visibility into real-time state-of-charge, power output, and alarm conditions.
                    </p>
                    <ul className="text-gray-700 text-sm space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Real-time telemetry to TSOC dispatch centre</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Remote curtailment signal compliance (SCADA-based dispatch)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>State-of-charge and state-of-health reporting</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Building2 className="w-5 h-5 text-amber-600 mr-2" />
                        Metering Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3">
                        EAC requires bi-directional metering at the point of connection, separately metering the
                        BESS charge/discharge cycles from the co-located PV generation. This separation is essential
                        for tariff calculation and curtailment verification.
                      </p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Bi-directional revenue-grade meters</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Separate PV and BESS metering points</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <FileCheck className="w-5 h-5 text-cyan-600 mr-2" />
                        Grid Impact Study
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3">
                        For larger BESS installations (typically above 1 MW), TSOC requires a grid impact study
                        assessing the effect of the storage system on local network voltage, fault levels, and
                        thermal capacity of existing infrastructure.
                      </p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Fault level contribution analysis</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Voltage profile and thermal capacity assessment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Section 4: EU Battery Regulation */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-indigo-600 text-white">EU Regulation 2023/1542</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  EU Battery Regulation: What&apos;s Coming
                </h2>
                <p className="text-lg text-gray-600">
                  The EU Battery Regulation (2023/1542) applies to all batteries placed on the European market —
                  including utility-scale BESS deployed in Cyprus. Compliance timelines are staggered, with the
                  most impactful provisions taking effect between 2025 and 2028.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 text-green-600 mr-2" />
                      Carbon Footprint Declaration
                    </CardTitle>
                    <CardDescription>Effective from February 2025 for industrial batteries &gt; 2 kWh</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      Manufacturers must declare the carbon footprint of batteries across the full lifecycle — from raw
                      material extraction through manufacturing, transport, and end-of-life processing. For utility-scale
                      BESS, this means the OEM must provide a verified carbon footprint declaration per kWh of capacity.
                      Maximum carbon footprint thresholds will follow in subsequent phases.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      Due Diligence for Raw Materials
                    </CardTitle>
                    <CardDescription>Supply chain transparency requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      Companies placing batteries on the EU market must implement due diligence policies for sourcing
                      cobalt, lithium, nickel, natural graphite, and manganese. This includes risk assessment of adverse
                      impacts related to social and environmental factors throughout the supply chain. For LFP-chemistry
                      BESS (which avoids cobalt and nickel), compliance is significantly simpler.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-indigo-200">
                  <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-lg flex items-center text-indigo-900">
                      <FileCheck className="w-5 h-5 mr-2" />
                      Battery Passport (Digital Product Passport)
                    </CardTitle>
                    <CardDescription className="text-indigo-700">From February 2027 — major compliance milestone</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 text-sm mb-4">
                      Every industrial and EV battery placed on the EU market will require a digital battery passport
                      accessible via QR code. For utility-scale BESS, this means each container or rack must carry a
                      unique digital identity containing:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Battery chemistry and composition</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Carbon footprint data</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Recycled content percentages</span>
                        </li>
                      </ul>
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Supply chain due diligence report</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>State-of-health and expected lifetime data</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Disassembly and recycling instructions</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Scale className="w-5 h-5 text-emerald-600 mr-2" />
                      Recycling &amp; End-of-Life Requirements
                    </CardTitle>
                    <CardDescription>Extended producer responsibility obligations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-3">
                      Battery manufacturers and importers must finance collection, treatment, and recycling of batteries
                      at end of life. Minimum recycled content requirements will be phased in — 16% cobalt, 6% lithium,
                      and 6% nickel from 2031, increasing to 26%, 12%, and 15% respectively by 2036.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  What This Means for OEM Selection
                </h3>
                <p className="text-gray-700 text-sm">
                  Tier-1 manufacturers — particularly those listed by BloombergNEF — are already investing heavily in
                  EU Battery Regulation compliance. They have the scale and resources to implement carbon footprint
                  tracking, build digital passport infrastructure, and establish recycling programmes. Choosing a Tier-1
                  OEM for your Cyprus BESS project is not just about bankability — it&apos;s about ensuring your equipment
                  remains market-legal under tightening EU regulations throughout its 15-20 year operational life.
                </p>
              </div>
            </div>

            {/* Section 5: European Comparison Table */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                How Other EU Markets Handle BESS
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                To understand where Cyprus stands, it helps to see what&apos;s possible in markets with more mature
                regulatory frameworks. Each of these countries offers lessons for Cyprus as its own rules evolve.
              </p>

              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-900 min-w-[120px]">Market</th>
                      <th className="text-left p-4 font-semibold text-gray-900 min-w-[160px]">BESS Framework</th>
                      <th className="text-left p-4 font-semibold text-gray-900 min-w-[160px]">Revenue Streams</th>
                      <th className="text-left p-4 font-semibold text-gray-900 min-w-[140px]">Deployed Capacity</th>
                      <th className="text-left p-4 font-semibold text-gray-900 min-w-[180px]">Lesson for Cyprus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Germany</td>
                      <td className="p-4 text-gray-700">Full standalone BESS permitted. Technology-neutral market access since 2017.</td>
                      <td className="p-4 text-gray-700">Merchant arbitrage, FCR/aFRR frequency response, intraday trading</td>
                      <td className="p-4 text-gray-700">~5 GW (utility-scale)</td>
                      <td className="p-4 text-gray-700">Technology-neutral market access unlocks maximum revenue stacking</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">UK</td>
                      <td className="p-4 text-gray-700">Fully deregulated. Merchant BESS market since 2016. No storage-specific licence required.</td>
                      <td className="p-4 text-gray-700">Merchant trading, CfD, capacity market, FFR/DC/DM grid services</td>
                      <td className="p-4 text-gray-700">~8+ GW deployed</td>
                      <td className="p-4 text-gray-700">Removing licensing barriers accelerates deployment dramatically</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Italy</td>
                      <td className="p-4 text-gray-700">MACSE capacity market with availability payments. Co-location and standalone permitted.</td>
                      <td className="p-4 text-gray-700">Capacity payments (€70-120K/MW/year), merchant, ancillary services</td>
                      <td className="p-4 text-gray-700">~3 GW (pipeline + operational)</td>
                      <td className="p-4 text-gray-700">Capacity payments provide revenue certainty that improves bankability</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Spain</td>
                      <td className="p-4 text-gray-700">Hybrid PV+BESS auctions. Priority grid access for co-located storage.</td>
                      <td className="p-4 text-gray-700">Auction-based CfD, merchant, curtailment reduction</td>
                      <td className="p-4 text-gray-700">~2 GW (rapidly growing)</td>
                      <td className="p-4 text-gray-700">Priority grid access for hybrids incentivises co-location</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Greece</td>
                      <td className="p-4 text-gray-700">Hybrid licensing framework. Ambitious 3 GW storage target by 2030.</td>
                      <td className="p-4 text-gray-700">Hybrid PPA premiums, ancillary services (developing), merchant</td>
                      <td className="p-4 text-gray-700">~500 MW (early stage)</td>
                      <td className="p-4 text-gray-700">Similar island grid challenges (Crete, islands) offer parallel regulatory paths</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Ireland</td>
                      <td className="p-4 text-gray-700">DS3 grid services market specifically designed for storage and flexible generation.</td>
                      <td className="p-4 text-gray-700">DS3 services (14 products), capacity remuneration, merchant</td>
                      <td className="p-4 text-gray-700">~1.5 GW (operational + pipeline)</td>
                      <td className="p-4 text-gray-700">DS3-style grid services market could suit Cyprus&apos;s isolated grid needs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <Landmark className="inline w-5 h-5 mr-2" />
                  The Common Thread
                </p>
                <p className="text-gray-700">
                  Every mature BESS market in Europe has moved beyond co-location-only rules. The UK removed
                  storage-specific licensing entirely. Germany treats storage as a technology-neutral market participant.
                  Italy added capacity payments to guarantee revenue floors. Cyprus&apos;s regulatory evolution will likely
                  follow a similar trajectory — and developers who position their projects for these changes now will
                  capture first-mover advantage when the rules open up.
                </p>
              </div>
            </div>

            {/* Section 6: Expected Regulatory Developments */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Expected Regulatory Developments in Cyprus
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                CERA and TSOC have publicly indicated several regulatory changes on the horizon. While exact timelines
                remain uncertain, the direction of travel is clear — Cyprus is moving toward a more open, EU-aligned
                BESS regulatory framework.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">DAM Arbitrage Access</h4>
                      <Badge variant="outline" className="text-xs">High Priority</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      Allowing BESS to charge from the grid — not just co-located PV — is the single most impactful
                      regulatory change expected. This would enable day-ahead market arbitrage, roughly doubling the
                      available revenue stack for existing co-located BESS installations.
                    </p>
                    <p className="text-xs text-gray-500">
                      Impact: Unlocks €40-80K/MW/year in additional arbitrage revenue
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">Ancillary Services Market Opening</h4>
                      <Badge variant="outline" className="text-xs">Medium Term</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      Cyprus currently has no formal ancillary services market for BESS. TSOC is exploring frequency
                      response and voltage regulation services that BESS is uniquely suited to provide on the isolated
                      grid. An Ireland-style DS3 framework has been discussed as a potential model.
                    </p>
                    <p className="text-xs text-gray-500">
                      Impact: Additional revenue stream worth €15-40K/MW/year depending on market design
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">Standalone Storage Licensing</h4>
                      <Badge variant="outline" className="text-xs">Medium Term</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      A licensing pathway for standalone BESS — not tied to co-located generation — would allow pure
                      storage projects sited at strategic grid locations. This is mandated by the EU Clean Energy
                      Package and will eventually be required for Cyprus to meet its transposition obligations.
                    </p>
                    <p className="text-xs text-gray-500">
                      Impact: Opens entirely new project category; enables grid-strategic storage siting
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">Updated Grid Code for Storage</h4>
                      <Badge variant="outline" className="text-xs">Ongoing</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      TSOC is updating the Cyprus grid code to specifically address storage systems — covering
                      bidirectional power flow, state-of-charge reporting, and coordinated dispatch with the
                      existing generation fleet. Current grid code provisions were designed for generation-only assets.
                    </p>
                    <p className="text-xs text-gray-500">
                      Impact: Clearer technical requirements reduce permitting uncertainty
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5 border">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-cyan-700" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">EU Clean Energy Package Alignment</h4>
                      <Badge variant="outline" className="text-xs">Mandatory</Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      As an EU member state, Cyprus must transpose the Electricity Market Directive (2019/944) and
                      Electricity Regulation (2019/943), which require non-discriminatory market access for storage.
                      Full alignment will require removing the current co-location-only restriction and enabling
                      BESS participation across all market segments.
                    </p>
                    <p className="text-xs text-gray-500">
                      Impact: Full regulatory parity with mainland European BESS markets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Practical Guide */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-green-600 text-white">Developer Guide</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Practical Guide: Navigating Cyprus BESS Approvals Today
                </h2>
                <p className="text-lg text-gray-600">
                  Despite the regulatory limitations, BESS projects are being permitted and built in Cyprus right now.
                  Here&apos;s the step-by-step process developers should follow under the current framework.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">CERA Licensing Application</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Submit a Category B storage licence application to CERA, referencing the existing RES licence
                      for the co-located PV park. The application must include the proposed BESS capacity (MW/MWh),
                      technology specification, and a justification based on curtailment data from the existing park.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Timeline: 4-8 weeks for initial review</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Environmental Impact Assessment (EIA)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Depending on the scale and location, an EIA or environmental screening may be required from the
                      Department of Environment. Co-located BESS on existing solar park land typically qualifies for a
                      simplified screening process rather than a full EIA, particularly if no new land disturbance is involved.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Timeline: 2-6 weeks (screening) or 3-6 months (full EIA)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Building Permit</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      A building permit from the local planning authority is required for the BESS installation,
                      covering the concrete pads, container placement, fencing, and any auxiliary structures (transformer
                      station, switchgear housing). Fire safety clearances from the Fire Service may also be required
                      depending on the municipality.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Timeline: 4-12 weeks depending on municipality</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">TSOC Grid Connection Agreement</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Apply to TSOC for a grid connection modification agreement. This requires submitting the full
                      electrical design, protection system schematic, SCADA integration plan, and — for larger systems
                      — the grid impact study results. TSOC will review and issue connection conditions.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Timeline: 6-12 weeks including technical review</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-white text-lg">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">EAC Metering &amp; Billing Setup</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Coordinate with EAC to install bi-directional metering, establish the BESS billing account, and
                      configure the tariff structure for stored energy exports. The metering setup must separately track
                      PV generation, BESS charge cycles, and BESS discharge exports.
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Timeline: 2-4 weeks (often concurrent with commissioning)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-green-100 border-2 border-green-500 rounded-lg p-5">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Commissioning &amp; Commercial Operation</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      After all permits are secured and equipment installed, TSOC conducts a final inspection
                      and witness test. Upon passing, the system receives its commercial operation date (COD) and
                      begins generating revenue from curtailment recovery.
                    </p>
                    <div className="bg-white rounded-lg p-3 mt-3">
                      <p className="text-sm font-semibold text-green-800">
                        Total timeline: 6-12 months from initial application to commercial operation
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Experienced EPC partners with established CERA/TSOC relationships can significantly
                        compress timelines by running permit workstreams in parallel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Key Takeaways for Developers</h2>
              <p className="text-lg text-gray-700 mb-6">
                Cyprus&apos;s BESS regulatory framework is not where it needs to be — but it&apos;s heading in the right
                direction. Here&apos;s what matters most for developers making decisions today:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Build Now, Benefit Later</h3>
                    <p className="text-gray-700 text-sm">
                      Co-located BESS projects permitted under Category B today will automatically benefit when
                      grid-charging and ancillary services are enabled. The hardware is the same — only the software
                      configuration and regulatory permissions change.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Choose EU-Compliant Equipment</h3>
                    <p className="text-gray-700 text-sm">
                      The EU Battery Regulation applies regardless of Cyprus&apos;s local BESS rules. Selecting a Tier-1
                      OEM that is already preparing for the 2027 battery passport requirement avoids future
                      compliance headaches and potential market access restrictions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Engage CERA Early</h3>
                    <p className="text-gray-700 text-sm">
                      The regulatory framework is actively being shaped. Developers who engage with CERA and TSOC
                      during the consultation process have the opportunity to influence the rules and gain advance
                      visibility into upcoming changes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Learn from European Peers</h3>
                    <p className="text-gray-700 text-sm">
                      Cyprus doesn&apos;t need to reinvent the wheel. Ireland&apos;s DS3 model for island grid services,
                      Italy&apos;s capacity payments for revenue certainty, and the UK&apos;s licensing simplification all
                      offer proven templates that CERA can adapt to Cyprus&apos;s specific context.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* References */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">References &amp; Sources</h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>
                  CERA (Cyprus Energy Regulatory Authority) — <em>Energy Storage Licensing Framework</em>, 2025-2026 publications
                </li>
                <li>
                  TSOC (Transmission System Operator of Cyprus) — <em>Grid Code and Connection Requirements</em>
                </li>
                <li>
                  EU Regulation 2023/1542 — <em>Concerning batteries and waste batteries</em> (EU Battery Regulation)
                </li>
                <li>
                  EU Directive 2019/944 — <em>Common rules for the internal market for electricity</em> (Electricity Market Directive)
                </li>
                <li>
                  BNEF (BloombergNEF) — <em>European Energy Storage Market Outlook</em>, 2026
                </li>
                <li>
                  EirGrid/SONI — <em>DS3 System Services Implementation</em> (Ireland model reference)
                </li>
                <li>
                  Terna — <em>MACSE Capacity Market Design</em> (Italy model reference)
                </li>
                <li>
                  European Commission — <em>Clean Energy Package: Energy Storage</em>, implementation progress reports
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Get Regulatory Guidance for Your BESS Project
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Navigating Cyprus&apos;s evolving BESS regulations requires local expertise and established relationships
                with CERA and TSOC. Let us help you move from application to commercial operation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Get Regulatory Guidance
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/energy-storage">
                    See Our BESS Solutions
                    <ArrowRight className="w-5 h-5 ml-2" />
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
