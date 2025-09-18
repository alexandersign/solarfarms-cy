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
  Calendar,
  Building,
  Globe
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'EPC Services - Engineering, Procurement & Construction | Lighthief Cyprus',
  description: 'Complete EPC services for Cyprus solar farms by Lighthief Cyprus. From recycling pioneers to full EPC contractors since 2017. €800k-€1.2M/MW with realistic 8-12% IRR.',
  keywords: [
    'Lighthief EPC services',
    'solar farm construction Cyprus',
    'engineering procurement construction',
    'turnkey solar projects Cyprus',
    'Lighthief Cyprus EPC',
  ],
}

const lighthiefEPCProcess = [
  {
    step: 1,
    title: "Initial Assessment & Design",
    description: "Comprehensive site evaluation and optimal system design leveraging our 8+ years of experience",
    duration: "2-4 weeks",
    lighthiefAdvantage: "Proven design methodology from residential to large-scale projects",
    deliverables: [
      "Solar irradiation analysis with Cyprus-specific data",
      "Grid connection feasibility using local utility relationships", 
      "Environmental impact assessment with recycling considerations",
      "Financial projections based on realistic 8-12% IRR targets",
      "Optimized layout design for maximum efficiency"
    ]
  },
  {
    step: 2,
    title: "Engineering & Procurement",
    description: "Detailed engineering and equipment sourcing with focus on long-term performance and recyclability",
    duration: "4-6 weeks",
    lighthiefAdvantage: "Unique expertise in component lifecycle and end-of-life planning",
    deliverables: [
      "Complete electrical and structural engineering",
      "Equipment selection prioritizing quality and recyclability",
      "Grid connection design with utility coordination",
      "Performance modeling with conservative projections",
      "Comprehensive project documentation"
    ]
  },
  {
    step: 3,
    title: "Construction & Installation",
    description: "Professional construction management with certified specialists and quality assurance",
    duration: "8-16 weeks",
    lighthiefAdvantage: "Team of certified specialists with proven project delivery track record",
    deliverables: [
      "Site preparation and foundation work",
      "Professional panel and inverter installation",
      "Electrical connections and safety systems",
      "Quality assurance and testing protocols",
      "Grid connection and commissioning"
    ]
  },
  {
    step: 4,
    title: "Commissioning & Handover",
    description: "Complete system testing, commissioning, and transition to operations with O&M planning",
    duration: "2-4 weeks",
    lighthiefAdvantage: "Seamless transition to our proven O&M services developed since 2017",
    deliverables: [
      "System testing and performance verification",
      "Grid connection completion and certification",
      "Performance documentation and warranties",
      "O&M service transition planning",
      "Investor reporting system setup"
    ]
  }
]

const lighthiefDifferentiators = [
  {
    title: "Recycling Heritage",
    description: "Founded in 2017 with solar panel recycling expertise, ensuring sustainable project lifecycle",
    icon: Shield,
    benefit: "Unique end-of-life planning from project inception"
  },
  {
    title: "Evolution to EPC",
    description: "Strategic growth from recycling → O&M → full EPC contractor with proven track record",
    icon: TrendingUp,
    benefit: "Comprehensive understanding of entire solar project lifecycle"
  },
  {
    title: "Cyprus Headquarters",
    description: "Limassol-based operations with deep local market knowledge and utility relationships",
    icon: MapPin,
    benefit: "Local expertise with international standards and support"
  },
  {
    title: "Certified Specialists",
    description: "Team of certified specialists providing quality installations and ongoing support",
    icon: Users,
    benefit: "Professional execution with continuous customer service"
  },
  {
    title: "Realistic Projections",
    description: "Conservative 8-12% equity IRR projections based on actual market data and experience",
    icon: FileText,
    benefit: "Credible financial modeling that investors can trust"
  },
  {
    title: "International Network",
    description: "Part of global Lighthief network combining international expertise with local knowledge",
    icon: Globe,
    benefit: "Best practices from international markets applied locally"
  }
]

const epcPackages = [
  {
    name: "Standard EPC Package",
    description: "Complete turnkey development with proven Lighthief methodology",
    priceRange: "€800,000 - €1,000,000 per MW",
    targetIRR: "8-10%",
    features: [
      "Comprehensive site assessment and design",
      "Quality component procurement with recyclability focus",
      "Professional construction by certified specialists",
      "Grid connection and commissioning",
      "Performance warranties and documentation",
      "Transition to Lighthief O&M services"
    ],
    timeline: "6-12 months",
    suitable: "1-5MW projects"
  },
  {
    name: "Premium EPC Package", 
    description: "Enhanced package with advanced monitoring and optimization features",
    priceRange: "€1,000,000 - €1,200,000 per MW",
    targetIRR: "10-12%",
    features: [
      "Everything in Standard Package",
      "Advanced monitoring and control systems",
      "Premium component selection for maximum efficiency",
      "Enhanced performance guarantees",
      "Dedicated project management and reporting",
      "Priority O&M service inclusion"
    ],
    timeline: "8-14 months",
    suitable: "5-10MW+ projects",
    popular: true
  },
  {
    name: "Custom EPC Solutions",
    description: "Tailored solutions for unique requirements and special circumstances",
    priceRange: "Custom pricing based on requirements",
    targetIRR: "8-12%",
    features: [
      "Customized system design and engineering",
      "Specialized equipment and technology selection",
      "Unique site requirement accommodation",
      "Flexible timeline and milestone planning",
      "Enhanced warranty and service options",
      "Dedicated account management"
    ],
    timeline: "Variable based on complexity",
    suitable: "All sizes with special requirements"
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
              alt="Lighthief Cyprus EPC services"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Lighthief EPC Services
              <span className="block gradient-text">
                Engineering, Procurement & Construction
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              From recycling pioneers to full EPC contractors. Complete turnkey solar farm development 
              with 8+ years of experience and realistic 8-12% equity IRR projections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Request EPC Proposal
              </Button>
              <Button variant="outline" size="lg">
                Download EPC Guide
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€800K-1.2M</div>
                <div className="text-sm text-gray-600">Per MW Investment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">8-12%</div>
                <div className="text-sm text-gray-600">Equity IRR</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">2017</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">300+</div>
                <div className="text-sm text-gray-600">Cyprus Sunny Days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lighthief EPC Differentiators */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The Lighthief EPC Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique expertise from our evolution: recycling → O&M → full EPC contractor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lighthiefDifferentiators.map((differentiator, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-lg flex items-center justify-center mb-4">
                    <differentiator.icon className="w-6 h-6 text-solar-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{differentiator.title}</h3>
                  <p className="text-gray-600 mb-4">{differentiator.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 font-medium">✓ {differentiator.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lighthief EPC Process */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Proven EPC Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Refined methodology developed through 8+ years of solar industry experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {lighthiefEPCProcess.map((step, index) => (
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
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="bg-solar-50 border border-solar-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-solar-900 mb-2">Lighthief Advantage:</h4>
                      <p className="text-solar-800 text-sm">{step.lighthiefAdvantage}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables:</h4>
                      <div className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
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

      {/* EPC Packages */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Lighthief EPC Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with realistic projections based on actual market experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {epcPackages.map((package_, index) => (
              <Card key={index} className={`${package_.popular ? 'border-2 border-solar-200' : ''} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center">
                  {package_.popular && (
                    <Badge variant="solar" className="w-fit mx-auto mb-2">Most Popular</Badge>
                  )}
                  <CardTitle>{package_.name}</CardTitle>
                  <CardDescription>{package_.description}</CardDescription>
                  <div className="text-lg font-bold gradient-text mt-4">{package_.priceRange}</div>
                  <Badge variant="cyprus" className="mt-2">Target IRR: {package_.targetIRR}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {package_.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 py-2 border-t">
                    <div>Timeline: {package_.timeline}</div>
                    <div>Suitable for: {package_.suitable}</div>
                  </div>
                  
                  <Button variant={package_.popular ? "gradient" : "outline"} className="w-full" asChild>
                    <Link href="/contact">
                      Request Quote
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Evolution Story */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                From Recycling Pioneers to EPC Leaders
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2017: Recycling Foundation</h3>
                    <p className="text-gray-600 text-sm">
                      Founded by Darius and Arkadius to address solar panel recycling needs, 
                      establishing our commitment to sustainable solar solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-cyprus-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">O&M Service Expansion</h3>
                    <p className="text-gray-600 text-sm">
                      Recognized growing need for reliable servicing and maintenance, 
                      expanding into comprehensive O&M services for solar installations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-solar-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-solar-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2025: Full EPC Contractor</h3>
                    <p className="text-gray-600 text-sm">
                      Evolution into complete EPC contractor with Cyprus headquarters, 
                      offering full project lifecycle management from development to recycling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/1690376781153.jpg"
                  alt="Lighthief Cyprus EPC evolution"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">8+ Years</div>
                  <div className="text-xs text-gray-600">Experience</div>
                </div>
              </div>
            </div>
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
            Partner with Lighthief Cyprus for proven EPC services with realistic projections and sustainable solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Schedule EPC Consultation
              </Link>
            </Button>
            <Button size="lg" className="btn-outline-on-dark" asChild>
              <Link href="/calculator">
                Calculate Realistic ROI
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
