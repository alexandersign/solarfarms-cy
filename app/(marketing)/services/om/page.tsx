import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Monitor, 
  CheckCircle, 
  Clock, 
  Shield, 
  Award,
  TrendingUp,
  Wrench,
  Zap,
  BarChart3,
  AlertTriangle,
  Camera,
  Smartphone
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'O&M Services - Solar Farm Operations & Maintenance | Lighthief Cyprus',
  description: '24/7 solar farm monitoring and maintenance services. 99.5% uptime guarantee, performance optimization, and comprehensive asset management for maximum ROI.',
  keywords: [
    'solar O&M Cyprus',
    'solar farm maintenance',
    'solar monitoring services',
    'solar asset management',
    'renewable energy operations',
  ],
}

const omServices = [
  {
    icon: Monitor,
    title: "24/7 Remote Monitoring",
    description: "Real-time performance tracking with immediate alert systems for optimal uptime",
    features: [
      "Real-time performance dashboards",
      "Automatic fault detection",
      "Weather station integration",
      "Mobile app access",
      "Historical data analytics"
    ],
    benefit: "Immediate issue detection and resolution"
  },
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    description: "Scheduled maintenance programs to prevent issues and maximize system lifespan",
    features: [
      "Quarterly system inspections",
      "Annual deep cleaning",
      "Electrical connection checks",
      "Inverter maintenance",
      "Performance optimization"
    ],
    benefit: "Extended equipment life and consistent performance"
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Continuous optimization to ensure maximum energy yield and revenue generation",
    features: [
      "Yield analysis and forecasting",
      "Underperformance identification",
      "System parameter optimization",
      "Energy production reporting",
      "ROI tracking and analysis"
    ],
    benefit: "Maximized energy production and investment returns"
  },
  {
    icon: AlertTriangle,
    title: "Corrective Maintenance",
    description: "Fast response repair services with guaranteed parts availability",
    features: [
      "24-hour emergency response",
      "On-site repair services",
      "Spare parts inventory",
      "Equipment replacement",
      "Warranty claim management"
    ],
    benefit: "Minimized downtime and revenue loss"
  },
  {
    icon: Camera,
    title: "Advanced Diagnostics",
    description: "Cutting-edge diagnostic tools including thermal imaging and drone inspections",
    features: [
      "Thermal imaging inspections",
      "Drone-based aerial surveys",
      "Electrical testing",
      "Performance analytics",
      "Predictive maintenance"
    ],
    benefit: "Early issue detection and prevention"
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Comprehensive reporting for investors with detailed performance and financial data",
    features: [
      "Monthly performance reports",
      "Financial analysis",
      "Investor dashboards",
      "Compliance reporting",
      "Benchmarking analysis"
    ],
    benefit: "Complete transparency and investment tracking"
  }
]

const omPackages = [
  {
    name: "Essential O&M",
    price: "2.0%",
    description: "Basic monitoring and maintenance",
    features: [
      "Remote monitoring",
      "Quarterly inspections",
      "Basic maintenance",
      "Emergency response",
      "Annual reporting"
    ],
    suitable: "1-2MW projects"
  },
  {
    name: "Professional O&M",
    price: "2.5%",
    description: "Comprehensive management package",
    features: [
      "24/7 monitoring",
      "Monthly inspections",
      "Preventive maintenance",
      "Performance optimization",
      "Detailed reporting",
      "Thermal diagnostics"
    ],
    suitable: "3-7MW projects",
    popular: true
  },
  {
    name: "Premium O&M",
    price: "3.0%",
    description: "Full-service asset management",
    features: [
      "Everything in Professional",
      "Drone inspections",
      "Robotic cleaning",
      "Advanced analytics",
      "Investor portal access",
      "Dedicated account manager"
    ],
    suitable: "8MW+ projects"
  }
]

const guarantees = [
  {
    icon: Shield,
    title: "99.5% Uptime",
    description: "System availability guarantee with compensation for downtime",
    metric: "99.5%"
  },
  {
    icon: TrendingUp,
    title: "Performance Guarantee",
    description: "97% Year 1, declining to 85% in Year 25 with compensation",
    metric: "97% → 85%"
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "24-hour response for critical issues, 72-hour for non-critical",
    metric: "24 hours"
  },
  {
    icon: Award,
    title: "SLA Compliance",
    description: "Service Level Agreement with penalty clauses for non-compliance",
    metric: "100%"
  }
]

export default function OMServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Solar farm operations and maintenance"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              O&M Services
              <span className="block gradient-text">
                Operations & Maintenance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              24/7 monitoring and maintenance services to maximize performance and protect your investment. 
              99.5% uptime guarantee with comprehensive asset management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Get O&M Quote
              </Button>
              <Button variant="outline" size="lg">
                Download O&M Guide
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.5%</div>
                <div className="text-sm text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24h</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">25+</div>
                <div className="text-sm text-gray-600">Years Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O&M Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Comprehensive O&M Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete operations and maintenance coverage for optimal solar farm performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {omServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyprus-100 to-solar-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-cyprus-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 font-medium">✓ {service.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our O&M Guarantees
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading service level agreements with compensation for non-compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyprus-100 to-solar-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <guarantee.icon className="w-8 h-8 text-cyprus-600" />
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-2">{guarantee.metric}</div>
                  <div className="font-semibold text-gray-900 mb-2">{guarantee.title}</div>
                  <div className="text-sm text-gray-600">{guarantee.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* O&M Packages */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              O&M Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible packages designed for different project sizes and requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {omPackages.map((package_, index) => (
              <Card key={index} className={`${package_.popular ? 'border-2 border-cyprus-200' : ''} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center">
                  {package_.popular && (
                    <Badge variant="cyprus" className="w-fit mx-auto mb-2">Most Popular</Badge>
                  )}
                  <CardTitle>{package_.name}</CardTitle>
                  <CardDescription>{package_.description}</CardDescription>
                  <div className="text-3xl font-bold gradient-text mt-4">{package_.price}</div>
                  <div className="text-sm text-gray-600">of annual revenue</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {package_.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600 py-2 border-t">
                    Suitable for: {package_.suitable}
                  </div>
                  <Button variant={package_.popular ? "cyprus" : "outline"} className="w-full">
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Advanced O&M Technology
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5 text-cyprus-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mobile Monitoring App</h3>
                    <p className="text-gray-600 text-sm">
                      Real-time access to your solar farm performance data, alerts, and financial metrics 
                      from anywhere in the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-solar-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-solar-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Drone Inspections</h3>
                    <p className="text-gray-600 text-sm">
                      Regular aerial surveys using thermal imaging drones to identify potential issues 
                      before they impact performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analytics</h3>
                    <p className="text-gray-600 text-sm">
                      Machine learning algorithms analyze performance patterns to predict maintenance needs 
                      and optimize energy production.
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
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">5-15%</div>
                  <div className="text-xs text-gray-600">Performance Boost</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-cyprus-500 to-solar-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Maximize Your Solar Farm Performance
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Protect your investment with professional O&M services and guaranteed performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Request O&M Proposal
              </Link>
            </Button>
            <Button size="lg" className="btn-outline-on-dark" asChild>
              <Link href="/projects">
                View O&M Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
