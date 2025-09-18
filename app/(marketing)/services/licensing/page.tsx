import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award,
  TrendingUp,
  Building,
  Zap,
  Landmark,
  Globe,
  AlertCircle,
  Users
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Licensing & Applications | Permits & Regulatory Services Cyprus | Lighthief Cyprus',
  description: 'Expert solar farm licensing and permit applications in Cyprus. Environmental clearances, building permits, grid connections, and regulatory compliance.',
  keywords: [
    'solar permits Cyprus',
    'solar licensing Cyprus',
    'renewable energy permits',
    'solar farm applications',
    'Cyprus regulatory compliance',
  ],
}

const licensingServices = [
  {
    icon: Building,
    title: "Building & Construction Permits",
    description: "Complete building permit applications and construction authorizations",
    requirements: [
      "Architectural and engineering drawings",
      "Structural calculations and certifications",
      "Fire safety and access compliance",
      "Local authority coordination",
      "Building code compliance verification"
    ],
    timeline: "6-10 weeks",
    authority: "Local Municipal Authorities",
    cost: "€5,000-€15,000"
  },
  {
    icon: Landmark,
    title: "Environmental Permits",
    description: "Environmental impact assessments and clearance approvals",
    requirements: [
      "Environmental Impact Assessment (EIA)",
      "Flora and fauna surveys",
      "Soil and water impact studies",
      "Noise and visual impact analysis",
      "Mitigation measures planning"
    ],
    timeline: "8-12 weeks",
    authority: "Cyprus Environment Service",
    cost: "€10,000-€25,000"
  },
  {
    icon: Zap,
    title: "Grid Connection Permits",
    description: "Electrical grid connection approvals and utility agreements",
    requirements: [
      "Grid impact studies",
      "Electrical system design",
      "Protection and control systems",
      "Utility interconnection agreements",
      "Grid code compliance certification"
    ],
    timeline: "10-16 weeks",
    authority: "Cyprus Electricity Authority (EAC)",
    cost: "€15,000-€50,000"
  },
  {
    icon: FileText,
    title: "Operating Licenses",
    description: "Business and operational licenses for solar farm operations",
    requirements: [
      "Business registration and licenses",
      "Electricity generation license",
      "Health and safety certifications",
      "Insurance and bonding requirements",
      "Tax registration and compliance"
    ],
    timeline: "4-8 weeks",
    authority: "Cyprus Energy Regulatory Authority (CERA)",
    cost: "€3,000-€10,000"
  }
]

const regulatoryFramework = [
  {
    category: "National Legislation",
    laws: [
      "Renewable Energy Sources Law (2013)",
      "Energy Efficiency Law (2014)", 
      "Electricity Market Law (2017)",
      "Environmental Protection Law",
      "Building and Planning Law"
    ]
  },
  {
    category: "EU Directives",
    laws: [
      "Renewable Energy Directive (RED II)",
      "Energy Efficiency Directive",
      "Environmental Impact Assessment Directive",
      "Birds and Habitats Directives",
      "State Aid Guidelines"
    ]
  },
  {
    category: "Technical Standards",
    laws: [
      "IEC 61215 (Solar Panel Standards)",
      "IEC 61730 (Safety Requirements)",
      "EN 50438 (Grid Connection)",
      "IEEE 1547 (Interconnection Standards)",
      "Cyprus Grid Code"
    ]
  }
]

const permitTimeline = [
  {
    month: "Month 1-2",
    activities: [
      "Initial consultations with authorities",
      "Document preparation and submission",
      "Environmental studies initiation"
    ]
  },
  {
    month: "Month 3-4", 
    activities: [
      "Authority review and feedback",
      "Technical clarifications and revisions",
      "Public consultation periods"
    ]
  },
  {
    month: "Month 5-6",
    activities: [
      "Final approvals and permit issuance",
      "Grid connection agreements",
      "Construction authorization"
    ]
  }
]

export default function LicensingServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Solar licensing and regulatory compliance"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Licensing &
              <span className="block gradient-text">
                Applications
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Expert navigation of Cyprus regulatory requirements. We handle all permits, 
              licenses, and applications for seamless solar farm development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Start Permit Process
              </Button>
              <Button variant="outline" size="lg">
                Regulatory Consultation
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">6-16</div>
                <div className="text-sm text-gray-600">Weeks Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€33K-€100K</div>
                <div className="text-sm text-gray-600">Total Permit Costs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Services */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Complete Licensing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All permits and licenses required for solar farm development and operation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {licensingServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyprus-100 to-solar-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-cyprus-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {service.timeline}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {service.cost}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Authority:</strong> {service.authority}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements & Documentation:</h4>
                    <div className="space-y-2">
                      {service.requirements.map((requirement, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <FileText className="w-4 h-4 text-cyprus-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Framework */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Cyprus Regulatory Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive understanding of applicable laws and regulations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regulatoryFramework.map((framework, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Landmark className="w-5 h-5 text-cyprus-500 mr-2" />
                    {framework.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {framework.laws.map((law, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{law}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Permit Timeline */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Typical Permit Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Structured approach to navigate Cyprus regulatory requirements efficiently
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {permitTimeline.map((period, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid lg:grid-cols-4 gap-0">
                  <div className="bg-gradient-to-r from-cyprus-500 to-solar-600 text-white p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold">{period.month}</div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 p-6">
                    <div className="space-y-3">
                      {period.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    Regulatory Compliance Notice
                  </h3>
                  <div className="text-blue-800 space-y-2">
                    <p>
                      <strong>Important:</strong> All solar farm developments in Cyprus must comply with national 
                      and EU regulations. Our licensing services ensure full compliance with:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Cyprus Energy Regulatory Authority (CERA) requirements</li>
                      <li>Environmental Protection Department standards</li>
                      <li>Local municipal building codes and zoning</li>
                      <li>EU renewable energy directives and guidelines</li>
                      <li>Grid connection and safety standards</li>
                    </ul>
                    <p className="mt-4">
                      <strong>Guarantee:</strong> We provide full regulatory compliance with money-back guarantee 
                      if permits are not obtained due to our error or oversight.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-cyprus-500 to-solar-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Secure Your Solar Farm Permits
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Expert regulatory navigation with guaranteed permit approval and compliance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Start Permit Application
              </Link>
            </Button>
            <Button size="lg" className="btn-outline-on-dark" asChild>
              <Link href="/services/development">
                View Development Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
