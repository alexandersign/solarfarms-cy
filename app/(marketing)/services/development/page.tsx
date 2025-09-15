import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award,
  TrendingUp,
  FileText,
  Zap,
  Search,
  Building,
  Landmark,
  Globe
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Farm Development Services | Project Development Cyprus | Lighthief Cyprus',
  description: 'Complete solar farm development services from site identification to ready-to-build projects. Land acquisition, permitting, grid connection, and investment structuring.',
  keywords: [
    'solar farm development Cyprus',
    'solar project development',
    'land acquisition solar',
    'solar permitting Cyprus',
    'ready to build solar projects',
  ],
}

const developmentServices = [
  {
    icon: Search,
    title: "Site Identification & Acquisition",
    description: "Strategic site selection and land acquisition for optimal solar farm development",
    process: [
      "Solar resource assessment and mapping",
      "Land availability and ownership research",
      "Zoning and regulatory compliance check",
      "Preliminary feasibility analysis",
      "Negotiation and acquisition support"
    ],
    deliverables: [
      "Site evaluation reports",
      "Land acquisition agreements",
      "Due diligence documentation",
      "Preliminary design concepts"
    ],
    timeline: "4-8 weeks"
  },
  {
    icon: FileText,
    title: "Permitting & Licensing",
    description: "Complete regulatory approval process for solar farm development",
    process: [
      "Environmental impact assessments",
      "Building and construction permits",
      "Grid connection applications",
      "Local authority approvals",
      "Regulatory compliance verification"
    ],
    deliverables: [
      "All required permits and licenses",
      "Environmental clearances",
      "Construction approvals",
      "Grid connection agreements"
    ],
    timeline: "8-16 weeks"
  },
  {
    icon: Zap,
    title: "Grid Connection Development",
    description: "Electrical infrastructure design and utility interconnection planning",
    process: [
      "Grid capacity and stability analysis",
      "Transmission line design",
      "Substation requirements assessment",
      "Utility coordination and agreements",
      "Grid code compliance verification"
    ],
    deliverables: [
      "Grid connection design",
      "Utility interconnection agreement",
      "Electrical infrastructure plans",
      "Grid compliance certification"
    ],
    timeline: "6-12 weeks"
  },
  {
    icon: Building,
    title: "Financial Structuring",
    description: "Investment structure optimization and financing arrangement",
    process: [
      "Financial modeling and projections",
      "Investment structure design",
      "Bank financing coordination",
      "Tax optimization strategies",
      "Legal structure establishment"
    ],
    deliverables: [
      "Financial models and projections",
      "Investment memorandum",
      "Financing arrangements",
      "Legal documentation"
    ],
    timeline: "4-6 weeks"
  }
]

const developmentPhases = [
  {
    phase: "Phase 1: Pre-Development",
    duration: "8-12 weeks",
    activities: [
      "Site identification and evaluation",
      "Preliminary feasibility studies", 
      "Land acquisition negotiations",
      "Initial regulatory consultations"
    ],
    outcome: "Secured development site with preliminary approvals"
  },
  {
    phase: "Phase 2: Development",
    duration: "12-20 weeks", 
    activities: [
      "Detailed engineering design",
      "Permit applications and approvals",
      "Grid connection agreements",
      "Financial structuring and funding"
    ],
    outcome: "Ready-to-build project with all permits and financing"
  },
  {
    phase: "Phase 3: Pre-Construction",
    duration: "4-8 weeks",
    activities: [
      "Final design optimization",
      "Equipment procurement planning",
      "Construction contractor selection",
      "Project timeline finalization"
    ],
    outcome: "Construction-ready project with optimized design"
  }
]

const readyToBuildProjects = [
  {
    location: "Larnaca Industrial Zone",
    capacity: "3MW",
    investment: "€3.15M",
    roi: "18.8%",
    status: "Permits Approved",
    timeline: "6 months to operation",
    highlights: [
      "All permits secured",
      "Grid connection approved",
      "Land lease agreements signed",
      "Financing pre-approved"
    ]
  },
  {
    location: "Famagusta Agricultural Area", 
    capacity: "7MW",
    investment: "€7.35M",
    roi: "19.4%",
    status: "Development Complete",
    timeline: "8 months to operation",
    highlights: [
      "Environmental clearance obtained",
      "Utility interconnection agreement",
      "Construction permits ready",
      "Equipment procurement initiated"
    ]
  },
  {
    location: "Troodos Mountain Region",
    capacity: "2MW", 
    investment: "€2.1M",
    roi: "17.2%",
    status: "Final Approvals",
    timeline: "4 months to operation",
    highlights: [
      "Unique mountain location",
      "Premium electricity rates",
      "Fast-track approval process",
      "Immediate construction ready"
    ]
  }
]

export default function DevelopmentServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/1690376781153.jpg"
              alt="Solar farm development and planning"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Solar Farm
              <span className="block gradient-text">
                Development Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Complete project development from site identification to ready-to-build solar farms. 
              We handle land acquisition, permitting, grid connection, and investment structuring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                View Ready-to-Build Projects
              </Button>
              <Button variant="outline" size="lg">
                Development Consultation
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">12MW+</div>
                <div className="text-sm text-gray-600">Ready-to-Build</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600">Permit Success</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">6-18</div>
                <div className="text-sm text-gray-600">Months Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€12M+</div>
                <div className="text-sm text-gray-600">Projects Developed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Services */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Complete Development Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              End-to-end project development with guaranteed outcomes and transparent timelines
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {developmentServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-solar-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.timeline}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Development Process:</h4>
                    <div className="space-y-2">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Deliverables:</h4>
                    <div className="space-y-2">
                      {service.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{deliverable}</span>
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

      {/* Development Phases */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Development Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Structured approach ensuring efficient project development and risk mitigation
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {developmentPhases.map((phase, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid lg:grid-cols-4 gap-0">
                  <div className="bg-gradient-to-r from-solar-500 to-cyprus-600 text-white p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{phase.phase}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                        {phase.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Activities:</h4>
                        <div className="space-y-2">
                          {phase.activities.map((activity, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-cyprus-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Phase Outcome:</h4>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-800">{phase.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-to-Build Projects */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready-to-Build Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fully developed projects with all permits secured, ready for immediate investment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {readyToBuildProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="solar" className="text-xs">Ready to Build</Badge>
                    <Badge variant="outline" className="text-xs">{project.capacity}</Badge>
                  </div>
                  <CardTitle className="text-xl">{project.location}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.timeline}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold gradient-text">{project.investment}</div>
                      <div className="text-xs text-gray-600">Investment</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold gradient-text">{project.roi}</div>
                      <div className="text-xs text-gray-600">Projected ROI</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Project Status:</h4>
                    <div className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="gradient" className="w-full">
                    View Project Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Advantages */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Development Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Why choose Lighthief Cyprus for your solar farm development needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-cyprus-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">Local Expertise</div>
                <div className="text-sm text-gray-600">Deep understanding of Cyprus regulations and market conditions</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-solar-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">Proven Track Record</div>
                <div className="text-sm text-gray-600">100% success rate in obtaining permits and approvals</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">Fast Development</div>
                <div className="text-sm text-gray-600">Accelerated timelines through established relationships</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">Risk Mitigation</div>
                <div className="text-sm text-gray-600">Comprehensive due diligence and regulatory compliance</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Start Your Solar Farm Development
          </h2>
          <p className="text-xl mb-8 opacity-90">
            From concept to construction-ready project with guaranteed permits and approvals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Schedule Development Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/calculator">
                Calculate Development ROI
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
