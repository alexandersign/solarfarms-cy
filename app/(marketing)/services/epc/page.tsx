import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Wrench, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award,
  TrendingUp,
  MapPin,
  Zap,
  FileText,
  Users,
  Euro,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'EPC Services - Solar Farm Engineering, Procurement & Construction | Lighthief Cyprus',
  description: 'Complete turnkey EPC services for Cyprus solar farms. Fixed-price contracts, €450-600k/MW, 6-12 month delivery with performance guarantees.',
  keywords: [
    'solar EPC Cyprus',
    'solar farm construction',
    'engineering procurement construction',
    'turnkey solar projects',
    'solar development Cyprus',
  ],
}

const epcProcess = [
  {
    step: 1,
    title: "Site Assessment & Feasibility",
    description: "Comprehensive analysis of solar potential, grid connectivity, and regulatory requirements",
    duration: "2-4 weeks",
    deliverables: [
      "Solar irradiation analysis",
      "Grid connection feasibility study", 
      "Environmental impact assessment",
      "Preliminary financial projections",
      "Site layout optimization"
    ]
  },
  {
    step: 2,
    title: "Engineering & Design",
    description: "Detailed system design optimized for maximum energy yield and ROI",
    duration: "4-6 weeks",
    deliverables: [
      "Electrical system design",
      "Structural engineering plans",
      "Grid connection design",
      "Equipment specifications",
      "Performance modeling"
    ]
  },
  {
    step: 3,
    title: "Procurement & Logistics",
    description: "Sourcing of Tier 1 equipment with competitive pricing and extended warranties",
    duration: "6-8 weeks",
    deliverables: [
      "Equipment procurement",
      "Logistics coordination",
      "Quality assurance testing",
      "Delivery scheduling",
      "Warranty documentation"
    ]
  },
  {
    step: 4,
    title: "Construction & Installation",
    description: "Professional construction management with quality assurance and timeline guarantees",
    duration: "8-12 weeks",
    deliverables: [
      "Site preparation",
      "Foundation installation",
      "Panel and inverter installation",
      "Electrical connections",
      "Safety systems integration"
    ]
  },
  {
    step: 5,
    title: "Commissioning & Grid Connection",
    description: "Complete testing, commissioning, and utility interconnection",
    duration: "2-4 weeks",
    deliverables: [
      "System testing and commissioning",
      "Grid connection completion",
      "Performance verification",
      "Documentation handover",
      "O&M transition"
    ]
  }
]

const epcFeatures = [
  {
    icon: Shield,
    title: "Fixed-Price Contracts",
    description: "Guaranteed pricing with no cost overruns or hidden fees",
    benefit: "Budget certainty and risk mitigation"
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "6-12 month project completion vs industry 18-24 months",
    benefit: "Earlier revenue generation and faster ROI"
  },
  {
    icon: Award,
    title: "European Quality",
    description: "Tier 1 components with European standards and certifications",
    benefit: "Superior performance and longevity"
  },
  {
    icon: TrendingUp,
    title: "Performance Guarantees",
    description: "25-year performance warranty with compensation for underperformance",
    benefit: "Protected investment returns"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified engineers and project managers with 15+ years experience",
    benefit: "Professional execution and quality assurance"
  },
  {
    icon: Euro,
    title: "Competitive Pricing",
    description: "€450-600k/MW all-inclusive pricing with transparent costs",
    benefit: "Optimal value and clear investment structure"
  }
]

const technicalSpecs = [
  {
    category: "Solar Panels",
    specifications: [
      "Tier 1 manufacturers (Jinko, LONGi, Canadian Solar)",
      "Monocrystalline and bifacial options",
      "520W-580W power ratings",
      "25-year performance warranty",
      "21-22% efficiency ratings"
    ]
  },
  {
    category: "Inverters",
    specifications: [
      "European certified brands (SMA, Fronius, Huawei)",
      "String and central inverter options",
      "15-year manufacturer warranty",
      "Remote monitoring capabilities",
      "Grid compliance certifications"
    ]
  },
  {
    category: "Mounting Systems",
    specifications: [
      "Galvanized steel structures",
      "Wind and seismic resistance",
      "25-year structural warranty",
      "Optimal tilt angle design",
      "Anti-corrosion protection"
    ]
  },
  {
    category: "Monitoring & Control",
    specifications: [
      "Real-time performance monitoring",
      "Weather station integration",
      "Remote diagnostics capability",
      "Mobile app access",
      "Historical data analytics"
    ]
  }
]

export default function EPCServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
              alt="Solar farm EPC construction"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              EPC Services
              <span className="block gradient-text">
                Engineering, Procurement & Construction
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Complete turnkey solar farm development from initial design to grid connection. 
              Fixed-price contracts with €450-600k/MW pricing and performance guarantees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Request EPC Quote
              </Button>
              <Button variant="outline" size="lg">
                Download EPC Guide
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€450-600k</div>
                <div className="text-sm text-gray-600">Per MW (All-Inclusive)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">6-12</div>
                <div className="text-sm text-gray-600">Months Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">25</div>
                <div className="text-sm text-gray-600">Year Warranty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EPC Features */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Our EPC Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive advantages that deliver superior results and investment returns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {epcFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-solar-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 font-medium">✓ {feature.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EPC Process */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our EPC Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined 5-step process from concept to operational solar farm
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {epcProcess.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="bg-gradient-to-r from-solar-500 to-cyprus-600 text-white p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">Step {step.step}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables:</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium components and systems for optimal performance and longevity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technicalSpecs.map((spec, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 text-solar-500 mr-2" />
                    {spec.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {spec.specifications.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-cyprus-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Packages */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              EPC Pricing & Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent, all-inclusive pricing with performance guarantees
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-solar-200">
              <CardHeader className="text-center">
                <Badge variant="solar" className="w-fit mx-auto mb-2">Most Popular</Badge>
                <CardTitle>Standard EPC</CardTitle>
                <CardDescription>Complete turnkey development</CardDescription>
                <div className="text-3xl font-bold gradient-text mt-4">€500k</div>
                <div className="text-sm text-gray-600">per MW (average)</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Complete site development</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Tier 1 equipment procurement</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Construction management</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Grid connection & commissioning</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>25-year performance warranty</span>
                  </div>
                </div>
                <Button variant="solar" className="w-full">
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Premium EPC</CardTitle>
                <CardDescription>Enhanced performance & monitoring</CardDescription>
                <div className="text-3xl font-bold gradient-text mt-4">€550k</div>
                <div className="text-sm text-gray-600">per MW (average)</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Everything in Standard EPC</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Bifacial panel technology</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Advanced monitoring system</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Robotic cleaning preparation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Enhanced performance guarantee</span>
                  </div>
                </div>
                <Button variant="cyprus" className="w-full">
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Custom EPC</CardTitle>
                <CardDescription>Tailored solutions for unique requirements</CardDescription>
                <div className="text-3xl font-bold gradient-text mt-4">Custom</div>
                <div className="text-sm text-gray-600">based on requirements</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Customized system design</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Specialized equipment options</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unique site requirements</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Extended warranty options</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Dedicated project management</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Discuss Requirements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Your Solar Farm Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a detailed EPC proposal with fixed pricing and guaranteed timeline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Schedule EPC Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/calculator">
                Calculate Project ROI
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
