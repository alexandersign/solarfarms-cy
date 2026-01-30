import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BessInquiryForm } from '@/components/forms/BessInquiryForm'
import { 
  Battery, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Building,
  Clock,
  Euro,
  Sun,
  Award,
  Wrench,
  Phone,
  Mail,
  Globe,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Battery Energy Storage Systems Cyprus | Linyang BESS | Lighthief Official Distributor',
  description: 'Utility-scale BESS solutions in Cyprus. Linyang LFP battery systems from €100k/MWh. Official Cyprus distributor & O&M partner. Reduce curtailment, maximize solar ROI.',
  keywords: [
    'BESS Cyprus',
    'battery energy storage Cyprus',
    'Linyang BESS',
    'utility scale battery storage',
    'solar battery storage Cyprus',
    'energy storage systems Cyprus',
    'LFP battery Cyprus',
    'grid scale battery',
    'curtailment solution Cyprus',
    'solar farm battery',
    'BESS installation Cyprus',
    'battery storage pricing Cyprus',
    'energy storage O&M',
    'Lighthief BESS',
    'renewable energy storage',
    'Cyprus grid storage',
    'solar plus storage Cyprus',
    'battery arbitrage Cyprus',
    'peak shaving Cyprus',
    'frequency regulation Cyprus'
  ],
  openGraph: {
    title: 'Battery Energy Storage Systems Cyprus | Linyang BESS',
    description: 'Official Linyang BESS distributor in Cyprus. Utility-scale battery storage from €100k/MWh. Expert O&M services.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://solarfarms.cy/energy-storage'
  }
}

// BESS sizing options with Linyang pricing (includes 10% Lighthief markup)
const bessSystems = [
  {
    capacity: '1-2 MW',
    storage: '4-8 MWh',
    pricePerMWh: '€165k-175k',
    useCase: 'Small commercial solar parks',
    payback: '5-6 years',
    features: ['Containerized solution', 'Plug & play installation', 'Remote monitoring']
  },
  {
    capacity: '2.5-5 MW',
    storage: '10-20 MWh',
    pricePerMWh: '€125k-145k',
    useCase: 'Medium utility-scale parks',
    payback: '4-5 years',
    features: ['Multiple container config', 'MV integration', 'Full EMS included'],
    featured: true
  },
  {
    capacity: '8-25 MW',
    storage: '32-100 MWh',
    pricePerMWh: '€100k-115k',
    useCase: 'Large utility-scale installations',
    payback: '4 years',
    features: ['Turnkey solution', 'Grid services ready', 'LTSA available']
  },
]

const bessFeatures = [
  {
    icon: Battery,
    title: 'Linyang LFP Technology',
    description: 'Lithium Iron Phosphate cells with 88.39% round-trip efficiency and 6,000+ cycle life.'
  },
  {
    icon: Shield,
    title: '15-Year Warranty',
    description: 'Comprehensive performance warranty with optional extended LTSA packages.'
  },
  {
    icon: Wrench,
    title: 'Full O&M Support',
    description: 'Lighthief Cyprus provides preventive maintenance, 24/7 monitoring, and 97% availability guarantee.'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization',
    description: 'Curtailment recovery, evening arbitrage, and grid services to maximize returns.'
  },
  {
    icon: Euro,
    title: 'Competitive Pricing',
    description: 'Direct from manufacturer pricing with local support. From €100k/MWh for large systems.'
  },
  {
    icon: Clock,
    title: 'Fast Deployment',
    description: 'Pre-engineered containerized solutions. 3-6 month delivery and installation.'
  },
]

const useCases = [
  {
    title: 'Curtailment Recovery',
    description: 'Cyprus solar parks face 25-55% curtailment. Store excess during peak production and sell during evening hours.',
    benefit: 'Recover €50-80k per MW annually',
    icon: Sun
  },
  {
    title: 'Evening Arbitrage',
    description: 'Buy/store at €110/MWh during day, sell at €160/MWh during evening peak. Daily profit from price spread.',
    benefit: '€15-25k per MWh annually',
    icon: TrendingUp
  },
  {
    title: 'Grid Services',
    description: 'Frequency regulation, voltage support, and spinning reserve. Additional revenue from TSO contracts.',
    benefit: 'Growing market opportunity',
    icon: Zap
  },
  {
    title: 'Peak Shaving',
    description: 'Reduce demand charges for commercial facilities. Discharge during expensive peak hours.',
    benefit: 'Up to 30% electricity cost reduction',
    icon: Euro
  },
]

export default function EnergyStoragePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-blue-900 via-cyprus-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-blue-500 text-white text-sm px-4 py-1">
                <Battery className="w-3 h-3 mr-1" />
                Utility Scale BESS
              </Badge>
              <Badge className="bg-green-500 text-white text-sm px-4 py-1">
                Official Linyang Partner
              </Badge>
              <Badge className="bg-white/20 text-white text-sm px-4 py-1 backdrop-blur-sm">
                Cyprus Distributor
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Battery Energy Storage
              <span className="block text-blue-300 mt-2">Systems for Cyprus</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Linyang LFP battery systems • From €100k/MWh • 
              Official Cyprus distributor & O&M partner
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/energy-storage/calculator">
                  <Zap className="w-5 h-5 mr-2" />
                  BESS ROI Calculator
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
                <Link href="#inquiry-form">
                  <Battery className="w-5 h-5 mr-2" />
                  Request Proposal
                </Link>
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Battery className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">100+ MWh</div>
                <div className="text-sm text-white/70">Deployed Capacity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Euro className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">€100k</div>
                <div className="text-sm text-white/70">From per MWh</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">15 Years</div>
                <div className="text-sm text-white/70">Warranty</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">88.4%</div>
                <div className="text-sm text-white/70">Round-Trip Efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding bg-gradient-to-r from-cyprus-50 to-blue-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-cyprus-100 text-cyprus-800 mb-4">Official Partnership</Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Lighthief Cyprus Ltd
                  <span className="block text-cyprus-600 text-2xl mt-2">Official Linyang ESS Distributor</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  As the exclusive Cyprus partner for Linyang Energy Storage, we provide complete 
                  turnkey BESS solutions from supply through installation and long-term O&M.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Direct Manufacturer Pricing</h3>
                      <p className="text-sm text-gray-600">Best prices in Cyprus through official distribution channel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Utility Scale O&M Partner</h3>
                      <p className="text-sm text-gray-600">Certified for Linyang BESS maintenance and warranty service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Local Engineering Support</h3>
                      <p className="text-sm text-gray-600">Cyprus-based team for site assessment and integration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Card className="border-2 border-cyprus-200 bg-white shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex items-center justify-center gap-6 mb-2">
                        <Image 
                          src="/logo/lighthief-logo.png" 
                          alt="Lighthief Logo" 
                          width={120} 
                          height={40}
                          className="h-10 w-auto"
                        />
                        <span className="text-2xl text-gray-300">×</span>
                        <Image 
                          src="/logo/linyang_logo.jpg" 
                          alt="Linyang Energy Logo" 
                          width={120} 
                          height={40}
                          className="h-10 w-auto"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold">Linyang Energy</h3>
                        <p className="text-gray-600">Battery Storage Systems</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-cyprus-600">5.015</div>
                        <div className="text-xs text-gray-600">MWh per Container</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-cyprus-600">LFP</div>
                        <div className="text-xs text-gray-600">Chemistry</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-cyprus-600">20ft</div>
                        <div className="text-xs text-gray-600">HC Container</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-cyprus-600">6000+</div>
                        <div className="text-xs text-gray-600">Cycle Life</div>
                      </div>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500">
                      MV Skid Containers • Complete EMS • SCADA Integration
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Sizing Options */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              BESS System Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Scalable solutions from small commercial to utility-scale installations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {bessSystems.map((system, index) => (
              <Card 
                key={index} 
                className={`relative ${system.featured ? 'border-2 border-blue-500 shadow-xl' : 'border'}`}
              >
                {system.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">MOST POPULAR</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">{system.capacity}</div>
                    <div className="text-lg text-gray-600">{system.storage}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{system.pricePerMWh}</div>
                    <div className="text-sm text-gray-500">per MWh installed</div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">Best For</div>
                    <div className="font-semibold">{system.useCase}</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">Typical Payback</div>
                    <div className="font-semibold text-green-600">{system.payback}</div>
                  </div>
                  
                  <ul className="space-y-2">
                    {system.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={system.featured ? 'gradient' : 'outline'} 
                    className="w-full"
                    asChild
                  >
                    <Link href="#inquiry-form">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-8">
            Prices include 10% Lighthief service margin. Final pricing based on site assessment and configuration.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Linyang BESS?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bessFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              BESS Applications in Cyprus
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple revenue streams from battery energy storage
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyprus-600 rounded-xl">
                      <useCase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{useCase.description}</p>
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {useCase.benefit}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* O&M Services */}
      <section className="section-padding bg-gradient-to-br from-cyprus-900 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">BESS O&M Services</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Long-Term Service Agreements
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Comprehensive BESS maintenance and performance guarantee packages
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Basic O&M</h3>
                  <div className="text-2xl font-bold text-blue-300 mb-2">€2,470/MWh/yr</div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Preventive maintenance</li>
                    <li>• Remote monitoring 24/7</li>
                    <li>• Bi-annual site visits</li>
                    <li>• Corrective maintenance</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">With Availability</h3>
                  <div className="text-2xl font-bold text-blue-300 mb-2">€4,670/MWh/yr</div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• All Basic O&M included</li>
                    <li>• 97% availability guarantee</li>
                    <li>• Local spare parts warehouse</li>
                    <li>• Priority response team</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Extended Warranty</h3>
                  <div className="text-2xl font-bold text-blue-300 mb-2">Custom</div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Years 6-10 extension</li>
                    <li>• Years 11-15 extension</li>
                    <li>• Years 16-20 extension</li>
                    <li>• Performance guarantee</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="section-padding scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Request BESS Study & Proposal
              </h2>
              <p className="text-xl text-gray-600">
                Own a solar park? Get a free curtailment analysis and BESS sizing proposal.
              </p>
            </div>

            <Card className="border-2 border-blue-200 shadow-xl">
              <CardContent className="p-8">
                <BessInquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-cyprus-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Speak With Our BESS Team</h3>
                  <p className="text-gray-600">Direct line to our energy storage specialists</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyprus-100 rounded-xl">
                      <Phone className="w-6 h-6 text-cyprus-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Alexander Papacosta</div>
                      <div className="text-gray-600">+357 99 164 158</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyprus-100 rounded-xl">
                      <Mail className="w-6 h-6 text-cyprus-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Email Us</div>
                      <div className="text-gray-600">office@lighthief.com</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-500">
                    Lighthief Cyprus Ltd • Official Linyang Energy Storage Distributor
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
