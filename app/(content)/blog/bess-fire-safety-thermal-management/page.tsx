import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/StructuredData'
import {
  Flame,
  Shield,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Battery,
  Monitor,
  ArrowRight,
  Building2,
  Eye,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS Fire Safety and Thermal Management: Deploying Large-Scale BESS in Cyprus Heat',
  description:
    'Outdoor BESS containers face 45°C Cyprus summers. We cover thermal management, fire suppression systems, container spacing, insurance requirements, and the engineering decisions behind our large-scale BESS deployment.',
  keywords: [
    'BESS fire safety',
    'battery storage thermal management',
    'BESS fire suppression system',
    'LFP fire safety',
    'battery container fire protection',
    'BESS thermal runaway prevention',
    'battery storage safety engineering',
    'BESS Cyprus heat',
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'BESS Fire Safety and Thermal Management: Deploying Large-Scale BESS in Cyprus Heat',
  description:
    'Outdoor BESS containers face 45°C Cyprus summers. We cover thermal management, fire suppression systems, container spacing, insurance requirements, and the engineering decisions behind our large-scale BESS deployment.',
  datePublished: '2025-10-07',
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
    '@id': 'https://solarfarms.cy/blog/bess-fire-safety-thermal-management',
  },
}

export default function BESSFireSafetyArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={articleSchema} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-red-600 text-white">
              Technology &amp; Operations &mdash; July 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              BESS Fire Safety and Thermal Management
              <span className="block gradient-text mt-2">
                Deploying Large-Scale BESS in Cyprus Heat
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              When ambient temperatures exceed 45&deg;C and you&apos;re responsible for hundreds of battery
              containers spread across multiple solar parks, fire safety and thermal engineering stop being
              line items on a spec sheet. They become the foundation every other decision is built on.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>&bull;</span>
              <span>October 7, 2025</span>
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

            {/* Section 1: Safety Is Not Optional */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-heading font-bold">Safety Is Not Optional</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                BESS safety incidents make headlines. A single thermal event at a battery storage
                facility draws the kind of media coverage that can stall permitting for an entire
                region. As developers planning hundreds of containers across our portfolio &mdash; totalling
                hundreds of MWh of lithium iron phosphate storage &mdash; safety engineering is not a
                feature we offer. It is the prerequisite for everything else.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                This article covers the specific decisions we made across thermal management, fire
                suppression, container layout, and BMS design &mdash; and the reasoning behind each
                one. These are not theoretical best practices pulled from a whitepaper. They are the
                engineering constraints we designed around for a real deployment, in a Mediterranean
                climate, under commercial insurance requirements, with lender oversight.
              </p>
              <p className="text-lg text-gray-700">
                If you are evaluating BESS for your solar park, this is the conversation your EPC
                partner should be having with you. If they are not, that tells you something.
              </p>
            </div>

            {/* Section 2: Understanding BESS Fire Risk */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Flame className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-heading font-bold">Understanding BESS Fire Risk</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Not all battery chemistries carry the same fire risk. Understanding why requires
                looking at what happens when a lithium-ion cell is pushed beyond its safe operating
                envelope &mdash; a process called thermal runaway.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      LFP (Our Choice)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Thermal runaway onset: <strong>&gt;270&deg;C</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Releases phosphate gas when overheated &mdash; <strong>non-flammable</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">No oxygen release &mdash; does not feed its own fire</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Stable olivine crystal structure resists decomposition</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-800">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      NMC (Higher Risk)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Thermal runaway onset: <strong>150&ndash;210&deg;C</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Releases oxygen when overheated &mdash; <strong>feeds fire</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Self-sustaining thermal cascade possible across cells</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Higher energy density increases thermal load per unit volume</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  Real-World Incidents
                </p>
                <p className="text-gray-700 mb-3">
                  The pattern in reported BESS fires is unambiguous:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Arizona, USA (2019):</strong> NMC battery system explosion injured four
                      firefighters. Thermal runaway cascaded across multiple racks.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                    <span>
                      <strong>South Korea (2017&ndash;2019):</strong> 23 separate BESS fire incidents,
                      the vast majority involving NMC chemistry. Triggered a nationwide safety review
                      and temporary moratorium on new installations.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                    <span>
                      <strong>Liverpool, UK (2020):</strong> NMC battery fire at a 20&nbsp;MW facility
                      burned for several days. Fire service struggled with re-ignition &mdash; a hallmark
                      of oxygen-releasing chemistries.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-700">
                The physics is straightforward: when NMC cells overheat, the cathode decomposes and
                releases oxygen. Oxygen feeds combustion. The fire can sustain itself even in a sealed
                container. LFP cells, when pushed past their limits, release phosphate gas &mdash;
                which is not an oxidiser. Without oxygen release, the chain reaction stalls. This does
                not make LFP fireproof, but it makes the difference between a manageable incident and
                a catastrophic one.
              </p>
            </div>

            {/* Section 3: Thermal Management Systems */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Thermometer className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-heading font-bold">Thermal Management Systems</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus summers routinely push ambient temperatures above 40&deg;C, with extreme days
                exceeding 45&deg;C. Battery cells operate optimally between 15&deg;C and 35&deg;C.
                The gap between ambient and optimal is the engineering problem thermal management
                exists to solve.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Each of our 40ft BESS containers incorporates a multi-layered thermal management
                system designed for sustained operation in Mediterranean climates:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                        <Thermometer className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Active Liquid Cooling</h4>
                        <p className="text-sm text-gray-600">
                          Liquid-cooled battery racks provide direct thermal contact with cell
                          modules. Liquid cooling achieves 3&ndash;5&times; the heat transfer rate
                          of forced air, maintaining tighter temperature uniformity across cells
                          within each rack.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-cyan-100 rounded-lg p-2 flex-shrink-0">
                        <Battery className="w-5 h-5 text-cyan-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">HVAC Climate Control</h4>
                        <p className="text-sm text-gray-600">
                          Industrial HVAC units maintain internal container temperature between
                          20&ndash;25&deg;C regardless of external conditions. Redundant units
                          ensure cooling continues if one system fails.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                        <Eye className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Per-Module Temperature Sensors</h4>
                        <p className="text-sm text-gray-600">
                          Thermal sensors on every cell module feed real-time data to the BMS. No
                          blind spots. If one module drifts even 3&deg;C above its neighbours, the
                          BMS flags it immediately.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-100 rounded-lg p-2 flex-shrink-0">
                        <Monitor className="w-5 h-5 text-red-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Automatic Shutdown Triggers</h4>
                        <p className="text-sm text-gray-600">
                          The BMS enforces hard temperature limits. If internal temperature exceeds
                          configurable thresholds, the system reduces power output first, then
                          isolates the affected rack, then shuts down the container entirely.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-blue-700" />
                    Container Design for Cyprus Climate
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Insulated Walls</p>
                      <p className="text-sm text-gray-600">
                        Multi-layer insulation reduces solar heat gain. Standard shipping containers
                        are not suitable &mdash; purpose-built enclosures with thermal break design
                        are required.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reflective Coating</p>
                      <p className="text-sm text-gray-600">
                        External surfaces use high-albedo coatings that reflect solar radiation
                        rather than absorbing it. This alone can reduce internal heat load by
                        15&ndash;20%.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Ventilation Management</p>
                      <p className="text-sm text-gray-600">
                        Controlled airflow paths prevent hot spots while maintaining fire-rated
                        compartmentalisation. Air intake and exhaust positions are engineered for
                        prevailing wind patterns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Fire Suppression: Our Approach */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-heading font-bold">Fire Suppression: Our Approach</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Even with LFP chemistry and comprehensive thermal management, a credible fire
                suppression system is non-negotiable. Insurers require it. Lenders require it.
                And the physics of lithium-ion storage demands it &mdash; regardless of chemistry.
              </p>

              <div className="bg-white rounded-xl border p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Integrated Aerosol Fire Suppression
                </h3>
                <p className="text-gray-700 mb-4">
                  Every container in our portfolio is equipped with an integrated aerosol-based fire
                  suppression system. This was not the only option available. Here is why we chose it:
                </p>

                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-100 to-orange-100">
                        <th className="text-left p-4 font-semibold text-gray-900">Technology</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Mechanism</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Pros</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Cons</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Our Assessment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="bg-green-50">
                        <td className="p-4 font-medium text-green-800">Aerosol</td>
                        <td className="p-4 text-gray-700">
                          Disperses potassium-based particles that interrupt the combustion chain reaction
                        </td>
                        <td className="p-4 text-gray-700">
                          Fast activation, no pressurised vessels, low maintenance, no water damage to electronics
                        </td>
                        <td className="p-4 text-gray-700">
                          Single-use canisters require replacement after activation
                        </td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Selected</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Inert Gas (Novec/FM200)</td>
                        <td className="p-4 text-gray-700">
                          Displaces oxygen to starve the fire
                        </td>
                        <td className="p-4 text-gray-700">
                          Clean agent, no residue, proven in data centres
                        </td>
                        <td className="p-4 text-gray-700">
                          Requires sealed enclosure, heavy pressurised cylinders, higher cost
                        </td>
                        <td className="p-4">
                          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Considered</Badge>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">Water Mist</td>
                        <td className="p-4 text-gray-700">
                          Fine water droplets cool the fire and displace oxygen
                        </td>
                        <td className="p-4 text-gray-700">
                          Effective cooling, can be refilled, some re-use capability
                        </td>
                        <td className="p-4 text-gray-700">
                          Water + high-voltage electronics risk, complex plumbing, freeze risk in some climates
                        </td>
                        <td className="p-4">
                          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Not Selected</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-orange-600" />
                      Automatic Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      Each container has a multi-sensor detection array:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          <strong>Smoke detectors:</strong> optical and ionisation types for early-stage detection
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          <strong>Heat sensors:</strong> rate-of-rise and fixed-temperature detection
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          <strong>Gas sensors:</strong> detect off-gassing from cells before visible smoke appears
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-600" />
                      Two-Stage Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      The suppression protocol follows a deliberate two-stage sequence:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">BMS Isolation</p>
                          <p className="text-sm text-gray-600">
                            The affected rack is electrically isolated. Contactors open, current
                            stops flowing. This removes the electrical energy source before
                            suppression activates.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Suppression Activation</p>
                          <p className="text-sm text-gray-600">
                            Aerosol canisters deploy automatically once isolation is confirmed.
                            The entire container volume is flooded within seconds.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-orange-900 mb-2">
                  <Building2 className="inline w-5 h-5 mr-2" />
                  External Fire Service Access
                </p>
                <p className="text-gray-700">
                  Suppression systems buy time &mdash; they do not replace a fire service response.
                  Every site is designed with fire department access in mind: minimum 4m-wide access
                  roads around the container array, hard-standing turning areas for fire appliances,
                  and clearly marked isolation points. Container spacing (covered below) ensures that
                  fire crews can approach any container from at least two sides.
                </p>
              </div>
            </div>

            {/* Section 5: Container Spacing and Site Design */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-8 h-8 text-gray-700" />
                <h2 className="text-3xl font-heading font-bold">Container Spacing and Site Design</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                The physical layout of containers on a solar park site is a fire engineering decision
                as much as a civil engineering one. Spacing determines whether a thermal event in one
                container can propagate to its neighbours &mdash; and whether emergency responders
                can intervene effectively.
              </p>

              <div className="overflow-x-auto rounded-xl border mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900">Spacing Parameter</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Typical Minimum</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Side-to-side clearance</td>
                      <td className="p-4 text-gray-700 font-semibold">3&nbsp;m</td>
                      <td className="p-4 text-gray-700">
                        Limits radiant heat transfer between adjacent containers. Allows personnel
                        access for maintenance and inspection.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">End-to-end clearance</td>
                      <td className="p-4 text-gray-700 font-semibold">6&nbsp;m</td>
                      <td className="p-4 text-gray-700">
                        Container doors face the ends. Greater spacing allows emergency egress,
                        ventilation, and fire service approach with hose lines.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Fire access road width</td>
                      <td className="p-4 text-gray-700 font-semibold">4&nbsp;m minimum</td>
                      <td className="p-4 text-gray-700">
                        Must accommodate fire appliances. Hardened surface required &mdash; no gravel
                        that impedes vehicle movement.
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Distance to property boundary</td>
                      <td className="p-4 text-gray-700 font-semibold">10&ndash;15&nbsp;m</td>
                      <td className="p-4 text-gray-700">
                        Prevents fire propagation to neighbouring properties. Local planning
                        authority may impose greater distances.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-900">Distance to occupied structures</td>
                      <td className="p-4 text-gray-700 font-semibold">15&ndash;30&nbsp;m</td>
                      <td className="p-4 text-gray-700">
                        Depends on local building code and container capacity. Larger BESS
                        installations require greater setbacks.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Card className="border-amber-200 bg-amber-50/50 mb-6">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    Cyprus-Specific Site Design Considerations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Dry Climate &amp; Brush Fire Risk</p>
                          <p className="text-sm text-gray-600">
                            Cyprus summers are arid. Vegetation clearance around container pads is
                            mandatory &mdash; a 5m firebreak zone of cleared or gravel-covered ground
                            prevents brush fires from reaching the BESS area.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Wind Patterns</p>
                          <p className="text-sm text-gray-600">
                            Prevailing westerly winds in summer can carry embers and accelerate fire
                            spread. Container orientation and HVAC intake positioning account for
                            dominant wind direction to prevent smoke ingestion.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Dust and Debris</p>
                          <p className="text-sm text-gray-600">
                            Fine dust from agricultural land and construction sites clogs HVAC filters
                            faster than in temperate climates. Filter inspection and replacement
                            intervals are shorter &mdash; quarterly rather than annually.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Total Site Area Impact</p>
                          <p className="text-sm text-gray-600">
                            Proper spacing increases the total footprint of a BESS installation by
                            30&ndash;40% compared to minimum-code layouts. This is a cost worth
                            paying &mdash; it is the difference between an insurable installation
                            and one no underwriter will touch.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 6: Insurance Requirements Drive Design */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-heading font-bold">Insurance Requirements Drive Design</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                In our experience, the insurer&apos;s requirements are more demanding than the local
                building code. This is not a complaint &mdash; it is the reality of deploying
                bankable energy storage. If you design to code and your insurer refuses to cover
                it, you do not have a project.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Here is what our insurance negotiations have taught us about what underwriters
                actually require:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-100 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fire Suppression Certification</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Insurers mandate that the fire suppression system carries third-party
                      certification (e.g., UL, FM, or equivalent). An uncertified system, regardless
                      of its technical merit, will not satisfy underwriting requirements. Our
                      containers are UL 9540A fire-safety tested.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-100 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">LFP Chemistry Qualification</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      LFP chemistry typically qualifies for lower premiums than NMC for utility-scale
                      installations. Some insurers now apply surcharges or exclusions for NMC
                      above certain capacities. Our choice of LFP across all parks in our portfolio was validated
                      during the insurance procurement process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-100 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Container Spacing Compliance</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Insurer spacing requirements often exceed local building code minimums.
                      Designing to code alone is insufficient &mdash; the site layout must satisfy
                      the insurer&apos;s fire engineering consultants, who typically require wider
                      clearances, more access roads, and specific turning circle dimensions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-100 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Annual Fire Safety Inspections</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Insurance policies mandate annual inspections of all fire safety systems:
                      suppression canisters, detection sensors, BMS alarm logs, and emergency
                      response procedures. These inspections are a condition of continued coverage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="bg-indigo-100 rounded-lg p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Documentation Package</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Underwriters require a comprehensive fire safety plan, emergency response
                      procedures, evidence of operator training, and maintenance logs. This
                      documentation is not optional &mdash; it is a condition precedent for
                      policy inception.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-indigo-900 mb-2">
                  <Shield className="inline w-5 h-5 mr-2" />
                  The Insurance Reality
                </p>
                <p className="text-gray-700">
                  Designing a BESS installation without early engagement with insurers is a common
                  and expensive mistake. We involve our insurance broker during the site design phase
                  &mdash; not after construction. This front-loaded approach has saved us from
                  costly redesigns and ensures that every park is insurable from day one.
                </p>
              </div>
            </div>

            {/* Section 7: BMS: The First Line of Defence */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Monitor className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-heading font-bold">BMS: The First Line of Defence</h2>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                The Battery Management System is the most underappreciated safety component in a BESS.
                It is not glamorous. It does not make for impressive site photos. But it is the system
                that monitors every cell, every second, and intervenes before thermal management or
                fire suppression ever need to activate.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our BMS architecture provides seven layers of active monitoring and protection:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <Battery className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cell-Level Voltage Monitoring</p>
                      <p className="text-sm text-gray-600">
                        Every individual cell voltage is monitored continuously. Deviation from
                        the expected range triggers an immediate alert. Overvoltage and undervoltage
                        both indicate potential cell failure modes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <Thermometer className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Temperature Monitoring Per Module</p>
                      <p className="text-sm text-gray-600">
                        Temperature sensors on each battery module feed real-time thermal data
                        to the BMS. Thermal gradients between modules are tracked &mdash;
                        a sudden differential is an early warning of internal cell failure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Current Limiting &amp; Overcurrent Protection</p>
                      <p className="text-sm text-gray-600">
                        The BMS enforces maximum charge and discharge current limits. Overcurrent
                        events &mdash; whether from grid faults, inverter malfunctions, or external
                        short circuits &mdash; are cut within milliseconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <Battery className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">SOC Management</p>
                      <p className="text-sm text-gray-600">
                        State of charge is managed within safe bounds. The BMS prevents
                        overcharging (which generates excess heat and gas) and deep discharging
                        (which accelerates cell degradation and can cause copper dissolution).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Automatic Isolation of Faulty Cells</p>
                      <p className="text-sm text-gray-600">
                        When a cell or module exhibits abnormal behaviour &mdash; voltage drift,
                        temperature spike, impedance change &mdash; the BMS isolates the affected
                        string. The rest of the container continues operating.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <Monitor className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">EMS Communication for System-Level Shutdown</p>
                      <p className="text-sm text-gray-600">
                        The BMS communicates with the site-level Energy Management System (EMS)
                        via Modbus TCP. If the BMS determines that a container-level issue threatens
                        the broader installation, it can trigger a coordinated shutdown across
                        the entire BESS array.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">EN 50549-2 Grid Compliance</p>
                      <p className="text-sm text-gray-600">
                        The BMS supports fault ride-through as required by EN 50549-2. During
                        grid disturbances (voltage dips, frequency excursions), the system remains
                        connected and responds according to grid code requirements rather than
                        tripping offline and creating additional instability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-purple-900 mb-2">
                  <Monitor className="inline w-5 h-5 mr-2" />
                  Defence in Depth
                </p>
                <p className="text-gray-700">
                  The BMS, thermal management, fire detection, and suppression systems form concentric
                  layers of protection. The BMS catches problems at the cell level before they become
                  thermal events. The thermal management system maintains safe operating temperatures
                  to prevent the BMS from ever needing to intervene. And the fire suppression system
                  exists as the final backstop &mdash; the layer we invest in heavily but hope never
                  to activate.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Putting It All Together</h2>
              <p className="text-lg text-gray-700 mb-6">
                Safety engineering for a utility-scale BESS deployment is not a single system or a
                single decision. It is the integration of chemistry selection, thermal design,
                fire suppression, site layout, BMS architecture, and insurance compliance into a
                coherent whole. Each layer depends on the others.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-red-50 rounded-xl p-6">
                  <Flame className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-700">LFP Only</div>
                  <div className="text-sm text-gray-600">&gt;270&deg;C thermal runaway onset</div>
                </div>
                <div className="text-center bg-blue-50 rounded-xl p-6">
                  <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">20&ndash;25&deg;C</div>
                  <div className="text-sm text-gray-600">Internal container temperature</div>
                </div>
                <div className="text-center bg-green-50 rounded-xl p-6">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">Hundreds</div>
                  <div className="text-sm text-gray-600">Containers with integrated suppression</div>
                </div>
              </div>

              <p className="text-lg text-gray-700">
                When someone asks why we chose a particular fire suppression technology, or why our
                containers are spaced further apart than the minimum code requires, or why we
                specified liquid cooling in a market where air cooling is cheaper &mdash; the answer
                is always the same. We are building infrastructure that must operate safely for
                20 years, survive annual insurance renewals, and protect the investment of the solar
                park owners who trust us with their sites. Cutting corners on safety is not a cost
                saving. It is a liability.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Discuss Safety Engineering for Your BESS
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Whether you&apos;re evaluating fire suppression options, reviewing container
                layouts, or preparing for an insurance submission, our team can walk you through the
                safety engineering decisions behind our large-scale LFP deployment &mdash;
                and what they mean for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Discuss Safety Engineering for Your BESS
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/blog/lfp-vs-nmc-utility-scale-bess">
                    See Our LFP Chemistry Rationale
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
