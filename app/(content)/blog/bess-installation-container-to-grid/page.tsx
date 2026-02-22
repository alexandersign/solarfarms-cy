import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Ship,
  Wrench,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  Package,
  Building2,
  Network,
  Shield,
  Truck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'From Container Ship to Grid Connection: Inside a Utility-Scale BESS Installation',
  description: 'What does it actually take to install a utility-scale BESS? We walk through every phase — from factory production to CIF delivery, civil works, electrical installation, and TSOC grid connection — based on our 51-park deployment timeline.',
  keywords: [
    'BESS installation timeline',
    'utility BESS construction',
    'BESS EPC process',
    'battery storage installation steps',
    'BESS commissioning process',
    'BESS grid connection Cyprus',
    'utility scale battery installation',
    'BESS construction timeline',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'From Container Ship to Grid Connection: Inside a Utility-Scale BESS Installation',
  description: 'What does it actually take to install a utility-scale BESS? We walk through every phase — from factory production to CIF delivery, civil works, electrical installation, and TSOC grid connection — based on our 51-park deployment timeline.',
  datePublished: '2025-09-02',
  dateModified: '2025-09-02',
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
    '@id': 'https://solarfarms.cy/blog/bess-installation-container-to-grid',
  },
}

export default function BESSInstallationArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-sky-600 text-white">
              Case Study &mdash; August 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              From Container Ship to Grid Connection
              <span className="block gradient-text mt-2">
                Inside a Utility-Scale BESS Installation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              What does it actually take to install a utility-scale BESS? We walk through every
              phase &mdash; from factory production to CIF delivery, civil works, electrical
              installation, and TSOC grid connection &mdash; based on our 51-park deployment
              timeline.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>September 2, 2025</span>
              <span>&bull;</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Installation Journey */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Package className="w-8 h-8 text-sky-600" />
                The Installation Journey
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                BESS installation is fundamentally more complex than solar PV. A solar park is
                panels on racks &mdash; the logistics are repetitive and well-understood. A
                utility-scale BESS involves heavy containers weighing 20+ tonnes each, high-voltage
                electrical systems, fire suppression infrastructure, liquid cooling loops,
                EMS/SCADA integration, and rigorous grid compliance testing.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Each phase has its own specialists, lead times, and dependencies. A delay in civil
                works pushes back electrical installation. Late EMS commissioning delays grid
                connection testing. And without TSOC approval, the system sits idle regardless of
                how perfectly it&rsquo;s been installed.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Here&rsquo;s every phase of a utility-scale BESS installation, based on our planned
                deployment of 251 containers across 51 solar parks in Cyprus. These aren&rsquo;t
                theoretical timelines &mdash; they&rsquo;re our confirmed production and
                installation schedule.
              </p>

              {/* Visual Timeline Overview */}
              <Card className="border-sky-200 bg-sky-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-sky-900 mb-4">End-to-End Timeline Overview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="w-6 h-6 text-sky-600" />
                      </div>
                      <p className="text-sm font-semibold text-sky-800">Production</p>
                      <p className="text-xs text-sky-600">90 days</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Ship className="w-6 h-6 text-sky-600" />
                      </div>
                      <p className="text-sm font-semibold text-sky-800">Shipping</p>
                      <p className="text-xs text-sky-600">50 days</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Building2 className="w-6 h-6 text-sky-600" />
                      </div>
                      <p className="text-sm font-semibold text-sky-800">Civil &amp; Electrical</p>
                      <p className="text-xs text-sky-600">8&ndash;12 weeks</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-sky-600" />
                      </div>
                      <p className="text-sm font-semibold text-sky-800">Grid Connection</p>
                      <p className="text-xs text-sky-600">2&ndash;4 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Phase 1: Factory Production */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Package className="w-8 h-8 text-sky-600" />
                Phase 1: Factory Production (90 Days)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The journey begins at the OEM factory. For our portfolio, that&rsquo;s Linyang
                Energy in Nantong, China &mdash; one of the largest integrated BESS manufacturers
                globally. Each container is assembled as a complete unit: EVE LFP battery modules,
                Kehua power conversion system (PCS), battery management system (BMS), liquid
                cooling system, fire suppression, and container enclosure.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Each container delivers 5.015&nbsp;MWh of nameplate capacity. The production
                process takes approximately 90 days from order confirmation to Factory Acceptance
                Testing (FAT).
              </p>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Factory Acceptance Testing (FAT)</CardTitle>
                  <CardDescription>
                    Every container is tested before shipment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Cell-level voltage and capacity verification</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Module balancing and BMS calibration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>PCS power output testing</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Cooling system performance under load</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Fire suppression system integrity check</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Insulation resistance and hi-pot testing</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Our team inspects at the factory before shipment. Non-conformances are resolved
                    before containers leave the production line.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Phase 2: Shipping and Logistics */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Ship className="w-8 h-8 text-sky-600" />
                Phase 2: Shipping and Logistics (50 Days)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Once FAT is completed and approved, containers are loaded for CIF (Cost, Insurance,
                and Freight) delivery to Limassol port. The shipping route from eastern China to
                Cyprus takes approximately 40&ndash;50 days depending on vessel schedules and
                routing.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The logistics chain involves multiple parties and cost components, all of which need
                to be coordinated precisely to avoid demurrage charges and storage fees at port.
              </p>

              <Card className="border-sky-200">
                <CardHeader>
                  <CardTitle className="text-lg">Shipping Cost Breakdown</CardTitle>
                  <CardDescription>Per-container and per-declaration costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-700">Marine insurance</span>
                      </div>
                      <span className="font-semibold text-gray-900">0.5&ndash;1.5% of equipment value</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-700">Port landing (ECTL)</span>
                      </div>
                      <span className="font-semibold text-gray-900">&euro;600 per 40HC container</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-700">Customs clearance</span>
                      </div>
                      <span className="font-semibold text-gray-900">&euro;85 per declaration</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-500" />
                        <span className="text-gray-700">Import duty</span>
                      </div>
                      <span className="font-semibold text-gray-900">2.5&ndash;3.0% (EU tariff schedule)</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    For a 251-container portfolio, these &ldquo;small&rdquo; per-unit costs add up
                    to a significant line item. They must be factored into every BESS CAPEX model.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Phase 3: Transport to Site */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Truck className="w-8 h-8 text-sky-600" />
                Phase 3: Transport to Site
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Once cleared through customs at Limassol port, containers must be transported to
                individual solar park sites across Cyprus. Each BESS container weighs approximately
                20&ndash;23 tonnes and requires specialised heavy transport.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                For our portfolio, we contracted A.&nbsp;Soulis for crane and transport services.
                The logistics involve coordinating across multiple parks, ensuring site access roads
                can handle the load, and scheduling crane availability.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <Truck className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">&euro;2,360</p>
                    <p className="text-sm text-gray-500">per container (crane &amp; transport)</p>
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <Package className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">6&times; 20ft trucks</p>
                    <p className="text-sm text-gray-500">at 43 tonnes capacity each</p>
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="pt-6 text-center">
                    <Building2 className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">51 sites</p>
                    <p className="text-sm text-gray-500">coordinated delivery schedule</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-gray-600 mt-4 text-sm">
                Site access is a critical planning factor. Rural solar parks often have narrow access
                roads, soft ground, or overhead power lines that restrict crane operation. A site
                survey before delivery is essential.
              </p>
            </div>

            {/* Phase 4: Civil Works */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-sky-600" />
                Phase 4: Civil Works (4&ndash;6 Weeks)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Civil works prepare the site to receive the BESS containers. This phase runs in
                parallel with shipping where possible, so that sites are ready when containers
                arrive. The scope includes foundations, fencing, access roads, drainage, and fire
                access requirements.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Civil works are often underestimated in BESS budgets. Unlike solar racking which
                sits on simple driven piles, BESS containers require engineered concrete
                foundations capable of supporting 20+ tonnes of concentrated load.
              </p>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Civil Works Scope</CardTitle>
                  <CardDescription>
                    Budget: &euro;2,000/MWh installed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Structural</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Reinforced concrete pads for each container</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Level foundations with proper drainage gradient</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Cable trenches between containers and switchgear</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Earthing/grounding grid installation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Site Infrastructure</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Perimeter security fencing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Fire access roads (minimum 3.5m width)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Stormwater drainage systems</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Lighting and CCTV infrastructure</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Phase 5: Electrical Installation */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-sky-600" />
                Phase 5: Electrical Installation (4&ndash;6 Weeks)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The electrical installation phase connects the BESS containers to the existing solar
                park&rsquo;s medium-voltage infrastructure and, ultimately, to the grid. This is the
                most technically demanding phase and requires qualified HV/MV electricians with BESS
                experience.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The electrical scope spans from low-voltage connections within and between
                containers, through medium-voltage cabling and terminations, to protection
                engineering and lightning protection systems.
              </p>

              <div className="space-y-4">
                <Card className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">LV Cabling</h4>
                        <p className="text-gray-600">
                          Low-voltage connections from container terminals to local switchgear. Includes
                          DC cabling between battery modules and PCS, and AC output cabling to the LV
                          busbar. Cable sizing must account for full charge/discharge current at ambient
                          temperature extremes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">MV Cabling &amp; Terminations</h4>
                        <p className="text-gray-600 mb-2">
                          Medium-voltage cabling connects the BESS transformer to the park&rsquo;s
                          existing MV switchgear or ring main unit. Each feeder requires proper
                          termination and testing.
                        </p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-500">MV cabling: <strong className="text-gray-900">&euro;3,500/feeder</strong></span>
                          <span className="text-gray-500">MV terminations: <strong className="text-gray-900">&euro;2,200/feeder</strong></span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Protection Engineering</h4>
                        <p className="text-gray-600">
                          Protection relay settings, fault current calculations, and coordination studies
                          must be completed and approved before energisation. This ensures the BESS
                          disconnects safely during grid faults without damaging equipment or creating
                          safety hazards.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Lightning Protection &amp; UPS</h4>
                        <p className="text-gray-600">
                          DEHN surge protection devices (SPD) and lightning protection system (LPS)
                          safeguard the BESS against atmospheric discharge events. A UPS system ensures
                          the BMS and cooling remain operational during brief grid outages &mdash; critical
                          for cell safety.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phase 6: EMS/SCADA Commissioning */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Network className="w-8 h-8 text-sky-600" />
                Phase 6: EMS/SCADA Commissioning (2&ndash;3 Weeks)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The Energy Management System (EMS) and SCADA are the brain of the BESS. Without
                proper commissioning, the battery hardware is just an expensive box of chemicals.
                The EMS decides when to charge, when to discharge, how much power to deliver, and
                how to respond to grid signals.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                For our portfolio, Voltus provides the EMS platform. Commissioning involves both
                local configuration at each park and integration into a global SCADA system that
                provides portfolio-wide visibility and control.
              </p>

              <Card className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Local Setup</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Voltus EMS installation and configuration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Local SCADA HMI setup and testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>BMS-to-EMS communication verification</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Charge/discharge cycle testing</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Global Integration</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Global SCADA platform integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Curtailment signal testing with DSO</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Communication protocol validation (Modbus/IEC 61850)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>Remote monitoring and alarm configuration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Phase 7: Grid Connection and Testing */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-sky-600" />
                Phase 7: Grid Connection and Testing (2&ndash;4 Weeks)
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The final phase &mdash; and often the most unpredictable. Grid connection requires
                coordination with the Cyprus Transmission System Operator (TSOC) and Distribution
                System Operator (EAC). The system must demonstrate compliance with European grid
                codes before it can be energised and begin commercial operation.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This phase involves protection testing, compliance verification, formal grid
                connection application, and the issuance of a Provisional Acceptance Certificate
                (PAC) &mdash; the milestone that marks the start of commercial operation and the
                beginning of the defect liability period.
              </p>

              <div className="space-y-4">
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Testing Requirements</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>Protection relay testing (&euro;1,250 per container)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>EN 50549-2 compliance verification</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>Frequency and voltage ride-through tests</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>Anti-islanding protection verification</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Grid Connection Process</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>TSOC grid connection application</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>EAC metering and billing setup</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>Energisation and first synchronisation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                            <span>PAC (Provisional Acceptance Certificate) issuance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 9: The Full Timeline */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                <Clock className="w-8 h-8 text-sky-600" />
                The Full Timeline: Batch 1 Example
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Here&rsquo;s the real timeline from our portfolio&rsquo;s first production batch.
                This isn&rsquo;t a theoretical estimate &mdash; it&rsquo;s our confirmed schedule
                with contractual milestones and penalty dates.
              </p>

              <Card className="border-sky-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-sky-700">Mar 8, 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-sky-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Production Start</p>
                        <p className="text-sm text-gray-500">Linyang factory begins Batch 1 assembly</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-sky-700">Jun 5, 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-sky-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Production Complete</p>
                        <p className="text-sm text-gray-500">FAT completed, containers cleared for shipment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-sky-700">Jun 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-sky-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Shipping</p>
                        <p className="text-sm text-gray-500">CIF Limassol via container vessel</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-sky-700">Jul 5, 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-sky-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">CIF Arrival</p>
                        <p className="text-sm text-gray-500">Containers arrive Limassol port, customs clearance begins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-3 border-b border-gray-100">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-sky-700">Jul&ndash;Oct 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Installation Phase</p>
                        <p className="text-sm text-gray-500">Transport, civil works, electrical, EMS commissioning</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 py-3">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-semibold text-green-700">Oct 31, 2026</span>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">PAC Target</p>
                        <p className="text-sm text-gray-500">Commercial operation begins, DLP starts</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-sky-50 rounded-lg p-4">
                    <p className="text-sky-800 font-semibold">
                      Total: ~8 months from factory to grid
                    </p>
                    <p className="text-sky-700 text-sm mt-1">
                      Production (90 days) + Shipping (50 days) + Installation &amp; Commissioning
                      (~90 days) = approximately 8 months from order to commercial operation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold text-sky-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2 text-sky-800">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span>BESS installation is a 7&ndash;8 phase process requiring 6&ndash;8 months from factory to grid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span>Civil works and electrical installation run 4&ndash;6 weeks each &mdash; don&rsquo;t underestimate them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span>EMS/SCADA commissioning is critical &mdash; hardware without software is just an expensive box.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span>Grid connection depends on TSOC/EAC coordination &mdash; start the application early.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span>Batch deployment across multiple parks creates efficiencies that single-park installations can&rsquo;t achieve.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Planning Your BESS Installation?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Every solar park is different. Site access, grid connection capacity, and local
                permitting all affect your installation timeline. Let&rsquo;s discuss your specific
                project and build a realistic deployment schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700">
                  <Link href="/contact?service=bess">
                    Plan Your BESS Installation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog/bess-costs-2026-capex-breakdown">
                    See Our BESS Cost Breakdown
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
