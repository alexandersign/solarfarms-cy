import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Wrench, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Phone,
  Euro,
  Zap,
  Settings,
  BarChart3,
  FileCheck,
  AlertTriangle,
  Users,
  Calendar,
  Award,
  Battery
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar O&M Services Cyprus | Operations & Maintenance | Lighthief',
  description: 'Professional solar farm O&M services in Cyprus. 99% uptime guarantee, remote monitoring, preventive maintenance. Maximize your solar asset performance with Lighthief.',
  keywords: [
    'solar O&M Cyprus',
    'solar maintenance Cyprus',
    'PV operations management',
    'solar farm maintenance',
    'solar asset management Cyprus',
    'preventive maintenance solar',
    'solar monitoring Cyprus',
    'PV O&M services',
    'solar performance optimization',
    'Lighthief O&M',
  ],
  openGraph: {
    title: 'Solar O&M Services Cyprus | Lighthief',
    description: 'Professional solar farm operations and maintenance services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://solarfarms.cy/services/om-management'
  }
}

const omServices = [
  {
    icon: Settings,
    title: "Preventive Maintenance",
    description: "Scheduled inspections, cleaning, and component checks to prevent failures before they occur.",
    frequency: "Bi-annual visits"
  },
  {
    icon: Wrench,
    title: "Corrective Maintenance",
    description: "Rapid response to equipment failures with guaranteed repair times to minimize downtime.",
    frequency: "24/7 response"
  },
  {
    icon: BarChart3,
    title: "Remote Monitoring",
    description: "24/7 SCADA monitoring of your solar plant with real-time alerts and performance tracking.",
    frequency: "Continuous"
  },
  {
    icon: FileCheck,
    title: "Performance Reporting",
    description: "Monthly and annual reports with KPIs, yield analysis, and optimization recommendations.",
    frequency: "Monthly"
  },
  {
    icon: AlertTriangle,
    title: "Fault Diagnosis",
    description: "Advanced diagnostic tools to identify issues quickly, including IV curve tracing and thermal imaging.",
    frequency: "As needed"
  },
  {
    icon: TrendingUp,
    title: "Yield Optimization",
    description: "Continuous analysis and recommendations to maximize energy production and revenue.",
    frequency: "Ongoing"
  }
]

const pricingTiers = [
  {
    name: "Essential",
    price: "€12",
    unit: "/kWp/year",
    description: "For well-maintained, newer installations",
    features: [
      "2× annual preventive visits",
      "Remote monitoring (8am-6pm)",
      "Basic performance reports",
      "Email support",
      "48hr response time"
    ],
    highlight: false
  },
  {
    name: "Professional",
    price: "€15",
    unit: "/kWp/year",
    description: "Our most popular O&M package",
    features: [
      "4× annual preventive visits",
      "24/7 remote monitoring",
      "Comprehensive monthly reports",
      "Priority phone support",
      "24hr response time",
      "Spare parts inventory",
      "Annual thermal inspection"
    ],
    highlight: true
  },
  {
    name: "Premium",
    price: "€18",
    unit: "/kWp/year",
    description: "Maximum protection and performance",
    features: [
      "6× annual preventive visits",
      "24/7 monitoring + alerts",
      "Real-time yield dashboard",
      "Dedicated account manager",
      "4hr critical response",
      "Full spare parts coverage",
      "Availability guarantee (97%)",
      "Insurance coordination"
    ],
    highlight: false
  }
]

const bessOmPricing = [
  {
    service: "BESS Preventive & Corrective O&M",
    price: "€1,158",
    unit: "/MWh/year",
    description: "Including remote monitoring & bi-annual servicing"
  },
  {
    service: "PCS + MVS Maintenance",
    price: "€1,312",
    unit: "/MWh/year",
    description: "Power conversion system & medium voltage maintenance"
  },
  {
    service: "97% Availability Guarantee",
    price: "€2,202",
    unit: "/MWh/year",
    description: "Performance guarantee for years 1-20"
  }
]

const statistics = [
  { value: "99.2%", label: "Average Uptime" },
  { value: "1GW+", label: "Assets Under Management" },
  { value: "<4hrs", label: "Critical Response Time" },
  { value: "15+", label: "Years Experience" }
]

export default function OMManagementPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-900 via-cyprus-800 to-solar-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_0149.JPG"
            alt="Solar farm O&M services"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-solar-500/20 text-solar-300 border-solar-500/30">
              Professional Solar Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Operations & Maintenance
              <span className="block text-solar-400">
                That Maximizes Returns
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 text-balance">
              Keep your solar investment performing at its peak with Lighthief&apos;s 
              comprehensive O&M services. 99%+ uptime guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="solar" size="xl" asChild>
                <Link href="/contact">Request O&M Quote</Link>
              </Button>
              <Button variant="outline-on-dark" size="xl" asChild>
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Comprehensive O&M Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to keep your solar asset running efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {omServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-solar-100 to-cyprus-100 rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-solar-600" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {service.frequency}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Transparent Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Solar PV O&M Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible packages tailored to your asset&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${tier.highlight ? 'border-2 border-solar-500 shadow-xl' : ''}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-solar-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                    <span className="text-gray-600">{tier.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={tier.highlight ? "gradient" : "outline"} 
                    className="w-full mt-6"
                    asChild
                  >
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            * Prices for systems 1MW+. Contact us for custom pricing on larger portfolios.
          </p>
        </div>
      </section>

      {/* BESS O&M Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 bg-blue-100 border-blue-300">
                <Battery className="w-3 h-3 mr-1" />
                BESS Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Battery Storage O&M
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                As the official Cyprus partner for Linyang energy storage systems, 
                we offer comprehensive BESS O&M services with performance guarantees.
              </p>
              
              <div className="space-y-4">
                {bessOmPricing.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{item.service}</h4>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{item.price}</div>
                        <div className="text-xs text-gray-500">{item.unit}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" className="mt-8" asChild>
                <Link href="/energy-storage">Explore BESS Solutions</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-solar-500" />
                  BESS LTSA Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">97% Availability Guarantee</span>
                      <p className="text-sm text-gray-600">Performance-backed SLA with financial penalties</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Extended Warranty Options</span>
                      <p className="text-sm text-gray-600">Coverage up to 20 years for both BESS and PCS</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Remote Monitoring Included</span>
                      <p className="text-sm text-gray-600">24/7 system monitoring with instant alerts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Scheduled Servicing</span>
                      <p className="text-sm text-gray-600">Bi-annual on-site maintenance visits</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Optimize Your Solar Asset?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get a customized O&M proposal for your solar park. Our team will analyze your 
            specific needs and recommend the right package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Request O&M Quote
              </Link>
            </Button>
            <Button variant="outline-on-dark" size="lg" asChild>
              <Link href="/projects">
                View Our Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
