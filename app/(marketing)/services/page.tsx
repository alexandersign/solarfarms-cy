import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Wrench, 
  Monitor, 
  TrendingUp, 
  Recycle, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award,
  ArrowRight,
  Zap,
  Settings,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Investment Services | EPC, O&M, Asset Management | Lighthief Cyprus',
  description: 'Comprehensive solar farm services: EPC development, O&M management, asset optimization, and lifecycle support. Full-service solar investment solutions in Cyprus.',
  keywords: [
    'solar EPC Cyprus',
    'solar farm management',
    'O&M services Cyprus',
    'solar asset optimization',
    'renewable energy services',
  ],
}

const services = [
  {
    icon: Wrench,
    title: "EPC Services",
    subtitle: "Engineering, Procurement & Construction",
    description: "Complete turnkey solar farm development from initial design to grid connection and commissioning.",
    features: [
      "Site Assessment & Feasibility Studies",
      "Engineering & Design Optimization", 
      "Equipment Procurement (Tier 1 Components)",
      "Construction Management & Quality Assurance",
      "Grid Connection & Commissioning"
    ],
    benefits: [
      "Fixed-price contracts with performance guarantees",
      "6-12 months delivery vs industry 18-24 months",
      "€450-600k/MW competitive pricing",
      "European quality standards"
    ],
    pricing: "€450,000 - €600,000 per MW",
    color: "solar",
    slug: "epc-services"
  },
  {
    icon: Monitor,
    title: "O&M Management",
    subtitle: "Operations & Maintenance",
    description: "24/7 monitoring and maintenance services to maximize performance and extend asset life throughout the 25+ year operational period.",
    features: [
      "24/7 Remote Monitoring & Diagnostics",
      "Preventive & Corrective Maintenance",
      "Performance Optimization & Yield Forecasting",
      "Insurance & Warranty Management",
      "Financial Reporting & Investor Relations"
    ],
    benefits: [
      "99.5% uptime guarantee",
      "Performance guarantee: 97% Year 1, 85% Year 25",
      "24-hour response time for critical issues",
      "Comprehensive performance reporting"
    ],
    pricing: "2.5% of annual revenue",
    color: "cyprus",
    slug: "om-management"
  },
  {
    icon: TrendingUp,
    title: "Asset Optimization",
    subtitle: "Performance Enhancement",
    description: "Advanced optimization services including robotic cleaning, thermal diagnostics, and performance troubleshooting to maximize energy yield.",
    features: [
      "Professional Panel Cleaning (Robotic Systems)",
      "Thermal Diagnostic Inspections",
      "Drone-Based Aerial Surveys",
      "Performance Troubleshooting & Repair",
      "Equipment Upgrades & Retrofits"
    ],
    benefits: [
      "5-15% performance improvement",
      "Extended equipment lifespan",
      "Reduced degradation rates",
      "Optimized energy production"
    ],
    pricing: "Custom pricing based on scope",
    color: "green",
    slug: "asset-optimization"
  },
  {
    icon: Recycle,
    title: "Lifecycle Support",
    subtitle: "End-to-End Management",
    description: "Complete lifecycle support including decommissioning, recycling, and site restoration to ensure responsible asset management.",
    features: [
      "End-of-Life Decommissioning",
      "Panel Recycling & Material Recovery",
      "Site Restoration & Repurposing",
      "Regulatory Compliance Management",
      "Environmental Impact Mitigation"
    ],
    benefits: [
      "Responsible asset disposal",
      "Regulatory compliance assurance",
      "Material value recovery",
      "Environmental stewardship"
    ],
    pricing: "Included in O&M contracts",
    color: "blue",
    slug: "lifecycle-support"
  }
]

const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Free assessment of your investment goals and site evaluation",
    duration: "1-2 weeks"
  },
  {
    step: 2,
    title: "Due Diligence",
    description: "Land acquisition, permitting, and grid connection planning",
    duration: "4-8 weeks"
  },
  {
    step: 3,
    title: "Engineering & Procurement",
    description: "System design optimization and equipment sourcing",
    duration: "6-10 weeks"
  },
  {
    step: 4,
    title: "Construction",
    description: "Professional project management and quality assurance",
    duration: "12-16 weeks"
  },
  {
    step: 5,
    title: "Commissioning & O&M",
    description: "Grid connection and ongoing maintenance services",
    duration: "Ongoing 25+ years"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Comprehensive solar services"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Comprehensive Solar
              <span className="block gradient-text">
                Investment Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Full lifecycle solar farm services from development to recycling. 
              Everything you need for successful solar investments in Cyprus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Explore Services
              </Button>
              <Button variant="outline" size="lg">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Complete Solar Investment Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial development to end-of-life recycling, we provide comprehensive services 
              for every stage of your solar investment journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-${service.color}-100 flex items-center justify-center`}>
                        <service.icon className={`w-6 h-6 text-${service.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-solar-600 transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium">
                          {service.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {service.pricing}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Award className="w-4 h-4 text-blue-500 mr-2" />
                      Benefits
                    </h4>
                    <div className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-cyprus-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full group-hover:bg-solar-50" asChild>
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Investment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined process from initial consultation to operational solar farm with ongoing management
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-solar-500 to-cyprus-600 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-6 mt-12 w-0.5 h-8 bg-gradient-to-b from-solar-200 to-cyprus-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Service Guarantees
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive warranties and guarantees to protect your investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">25 Years</div>
                <div className="font-semibold mb-2">Performance Warranty</div>
                <div className="text-sm text-gray-600">Guaranteed energy production with compensation for underperformance</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">24 Hours</div>
                <div className="font-semibold mb-2">Response Time</div>
                <div className="text-sm text-gray-600">Critical issue response with emergency repair capabilities</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">99.5%</div>
                <div className="font-semibold mb-2">Uptime Guarantee</div>
                <div className="text-sm text-gray-600">System availability with performance compensation</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="font-semibold mb-2">Completion Rate</div>
                <div className="text-sm text-gray-600">Perfect track record of on-time, on-budget delivery</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Innovation */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Technology Innovation
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-solar-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-solar-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Monitoring</h3>
                    <p className="text-gray-600 text-sm">
                      Advanced machine learning algorithms predict maintenance needs and optimize performance 
                      in real-time, reducing downtime and maximizing energy yield.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-cyprus-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Robotic Cleaning Systems</h3>
                    <p className="text-gray-600 text-sm">
                      Automated cleaning robots maintain optimal panel efficiency without water waste, 
                      ensuring consistent performance in Cyprus's dusty environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Thermal Diagnostics</h3>
                    <p className="text-gray-600 text-sm">
                      Drone-based thermal imaging identifies potential issues before they impact performance, 
                      enabling proactive maintenance and preventing revenue loss.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/1690376781153.jpg"
                  alt="Advanced solar monitoring technology"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">15%</div>
                  <div className="text-xs text-gray-600">Performance Boost</div>
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
            Ready to Start Your Solar Investment?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a free consultation to discuss your investment goals and service requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Download Service Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
