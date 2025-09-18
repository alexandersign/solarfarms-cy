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
  Smartphone,
  Recycle,
  Users
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'O&M Management - Operations & Maintenance Services | Lighthief Cyprus',
  description: 'Professional O&M services by Lighthief Cyprus. From recycling expertise to comprehensive maintenance. Maximize your solar farm performance and protect 8-12% IRR.',
  keywords: [
    'Lighthief O&M services',
    'solar farm maintenance Cyprus',
    'solar operations Cyprus',
    'Lighthief maintenance',
    'solar asset management',
  ],
}

const lighthiefOMEvolution = [
  {
    phase: "2017: Recycling Foundation",
    description: "Started with end-of-life solar panel recycling, understanding component lifecycle",
    insight: "Deep knowledge of equipment degradation and failure patterns",
    icon: Recycle
  },
  {
    phase: "O&M Service Development", 
    description: "Expanded into operations and maintenance recognizing market need",
    insight: "Preventive maintenance strategies based on recycling experience",
    icon: Wrench
  },
  {
    phase: "2025: Comprehensive O&M",
    description: "Full-service O&M with Cyprus headquarters and certified specialists",
    insight: "Complete lifecycle management from installation to recycling",
    icon: Monitor
  }
]

const omServiceLevels = [
  {
    level: "Essential O&M",
    pricing: "1.5-2.0% of annual revenue",
    description: "Basic monitoring and maintenance for smaller installations",
    features: [
      "Remote monitoring and basic alerts",
      "Quarterly performance reports",
      "Annual maintenance visits",
      "Emergency response within 48 hours",
      "Basic warranty management"
    ],
    suitable: "Residential and small commercial (up to 500kW)",
    guarantees: ["95% uptime", "Annual performance reporting"]
  },
  {
    level: "Professional O&M",
    pricing: "2.0-2.5% of annual revenue", 
    description: "Comprehensive management for commercial and small solar farms",
    features: [
      "24/7 remote monitoring with instant alerts",
      "Monthly performance optimization",
      "Bi-annual maintenance visits",
      "Emergency response within 24 hours",
      "Comprehensive warranty and insurance management",
      "Detailed investor reporting"
    ],
    suitable: "Commercial and small solar farms (500kW - 5MW)",
    guarantees: ["98% uptime", "Monthly performance reports", "Response time SLA"],
    popular: true
  },
  {
    level: "Premium O&M",
    pricing: "2.5-3.0% of annual revenue",
    description: "Full-service asset management for large-scale solar farms",
    features: [
      "Everything in Professional O&M",
      "Advanced predictive maintenance",
      "Drone inspections and thermal imaging",
      "Performance optimization consulting",
      "Dedicated account management",
      "End-of-life recycling planning"
    ],
    suitable: "Large solar farms (5MW+)",
    guarantees: ["99% uptime", "Performance optimization", "Dedicated support"]
  }
]

const lighthiefOMAdvantages = [
  {
    title: "Recycling Expertise",
    description: "Unique understanding of component lifecycle from our founding recycling business",
    benefit: "Predictive maintenance based on end-of-life knowledge",
    icon: Recycle
  },
  {
    title: "Cyprus Climate Knowledge",
    description: "Deep understanding of Cyprus's 300+ sunny days and specific environmental challenges",
    benefit: "Optimized maintenance schedules for local conditions",
    icon: Camera
  },
  {
    title: "Certified Specialists",
    description: "Team of certified specialists providing quality service and ongoing support",
    benefit: "Professional execution with continuous improvement",
    icon: Users
  },
  {
    title: "International Standards",
    description: "Global Lighthief network expertise applied to Cyprus market",
    benefit: "Best practices from international markets",
    icon: Award
  },
  {
    title: "Technology Integration",
    description: "Advanced monitoring and diagnostic tools for optimal performance",
    benefit: "Early issue detection and performance optimization",
    icon: Smartphone
  },
  {
    title: "Lifecycle Planning",
    description: "Complete asset management from installation through recycling",
    benefit: "Maximized asset value and sustainable disposal",
    icon: TrendingUp
  }
]

export default function OMManagementPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Lighthief Cyprus O&M services"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Lighthief O&M Management
              <span className="block gradient-text">
                Operations & Maintenance Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Born from recycling expertise, evolved into comprehensive O&M services. 
              Protect your 8-12% IRR with professional maintenance and lifecycle management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                Get O&M Proposal
              </Button>
              <Button variant="outline" size="lg">
                Download O&M Guide
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">2017</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99%</div>
                <div className="text-sm text-gray-600">Uptime Target</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">25+</div>
                <div className="text-sm text-gray-600">Years Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lighthief O&M Evolution */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our O&M Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique expertise developed through our evolution from recycling to full-service O&M
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {lighthiefOMEvolution.map((phase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <phase.icon className="w-8 h-8 text-solar-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{phase.phase}</h3>
                  <p className="text-gray-600 text-sm mb-4">{phase.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-xs font-medium">{phase.insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* O&M Service Levels */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              O&M Service Levels
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible service levels designed for different project sizes and requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {omServiceLevels.map((service, index) => (
              <Card key={index} className={`${service.popular ? 'border-2 border-cyprus-200' : ''} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center">
                  {service.popular && (
                    <Badge variant="cyprus" className="w-fit mx-auto mb-2">Most Popular</Badge>
                  )}
                  <CardTitle>{service.level}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="text-lg font-bold gradient-text mt-4">{service.pricing}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 py-2 border-t">
                    <div className="mb-2">Suitable for: {service.suitable}</div>
                    <div className="space-y-1">
                      {service.guarantees.map((guarantee, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-1">
                          {guarantee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant={service.popular ? "cyprus" : "outline"} className="w-full" asChild>
                    <Link href="/contact">
                      Select Package
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lighthief O&M Advantages */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Lighthief O&M
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique advantages from our recycling heritage and comprehensive solar expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lighthiefOMAdvantages.map((advantage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyprus-100 to-solar-100 rounded-lg flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-cyprus-600" />
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                  <CardDescription>{advantage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 font-medium">✓ {advantage.benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-cyprus-500 to-solar-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Protect Your Solar Investment
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Leverage Lighthief's unique recycling heritage and O&M expertise for maximum asset protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Request O&M Proposal
              </Link>
            </Button>
            <Button size="lg" className="btn-outline-on-dark" asChild>
              <Link href="/services/epc-services">
                View EPC Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
