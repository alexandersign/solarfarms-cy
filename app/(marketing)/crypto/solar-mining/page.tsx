import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bitcoin, 
  Sun, 
  TrendingUp, 
  Zap,
  Battery,
  ArrowRight,
  CheckCircle,
  Calculator,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Bitcoin Mining Cyprus | BTC Mining with Renewable Energy | SolarFarms.cy',
  description: 'Mine Bitcoin with solar energy in Cyprus. Utilize curtailed energy at €0/kWh, 8% tax on profits. Case studies for 5MW parks with and without BESS.',
  keywords: [
    'solar bitcoin mining',
    'BTC mining Cyprus',
    'renewable energy mining',
    'solar powered mining',
    'curtailment mining',
    'off-grid bitcoin mining',
    'Cyprus crypto mining',
  ],
}

const miningScenarios = [
  {
    title: 'Curtailment Mining (No BESS)',
    subtitle: 'Mine during grid curtailment periods',
    icon: Sun,
    highlight: 'FREE ENERGY',
    economics: {
      energyCost: '€0/kWh (curtailed)',
      operatingHours: '6-8 hrs/day peak curtailment',
      annualEnergy: '~1,200 MWh (25% curtailed from 5MW)',
      miners: '~350 Antminer S19 XP (3.25kW each)',
      hashrate: '49 PH/s total',
      monthlyRevenue: '~€35,000-50,000',
      annualROI: '15-25% on equipment'
    },
    pros: [
      'Zero energy cost - using "waste" curtailed power',
      'No additional grid infrastructure needed',
      'Quick setup - plug into existing solar output',
      'Income from otherwise lost production'
    ],
    cons: [
      'Variable operating hours (depends on curtailment)',
      'Equipment idle during non-curtailment',
      'Weather dependent production'
    ]
  },
  {
    title: 'BESS-Enabled 24/7 Mining',
    subtitle: 'Continuous mining with battery storage',
    icon: Battery,
    highlight: '24/7 OPERATION',
    economics: {
      energyCost: '€0.06-0.08/kWh average',
      operatingHours: '24 hrs/day',
      annualEnergy: '~2,500 MWh utilized',
      miners: '~280 Antminer S19 XP (optimized for 24/7)',
      hashrate: '39 PH/s total',
      monthlyRevenue: '~€28,000-40,000',
      annualROI: '18-30% on total investment'
    },
    pros: [
      'Consistent 24/7 mining operation',
      'Optimized equipment utilization',
      'Energy arbitrage opportunities',
      'Predictable revenue streams'
    ],
    cons: [
      'Higher initial BESS investment',
      'Battery degradation costs',
      'More complex operations'
    ]
  },
  {
    title: 'Off-Grid Mining Park',
    subtitle: 'For parks without grid connection',
    icon: Zap,
    highlight: '100% UTILIZATION',
    economics: {
      energyCost: '€0.05-0.07/kWh',
      operatingHours: '10-12 hrs/day (daylight)',
      annualEnergy: '~4,000 MWh (full 5MW output)',
      miners: '~800 Antminer S19 XP',
      hashrate: '112 PH/s total',
      monthlyRevenue: '~€80,000-120,000',
      annualROI: '25-40% on total investment'
    },
    pros: [
      'No grid connection delays (2-5 years wait)',
      '100% energy utilization - no curtailment',
      'Maximum mining capacity',
      'Immediate revenue generation'
    ],
    cons: [
      'Daytime only without BESS',
      'Full mining infrastructure required',
      'Larger upfront investment'
    ]
  }
]

const equipmentSpecs = [
  {
    model: 'Antminer S19 XP',
    hashrate: '140 TH/s',
    power: '3,250W',
    efficiency: '21.5 J/TH',
    price: '~€3,500',
    recommended: true
  },
  {
    model: 'Antminer S19k Pro',
    hashrate: '120 TH/s',
    power: '2,760W',
    efficiency: '23 J/TH',
    price: '~€2,800',
    recommended: false
  },
  {
    model: 'Whatsminer M50S',
    hashrate: '126 TH/s',
    power: '3,276W',
    efficiency: '26 J/TH',
    price: '~€2,500',
    recommended: false
  }
]

export default function SolarMiningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
            alt="Solar Bitcoin mining farm"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-amber-900/80 to-yellow-900/90 z-10"></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-6 text-base px-4 py-2">
              <Bitcoin className="w-5 h-5 mr-2" />
              Solar-Powered Bitcoin Mining
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Mine Bitcoin with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300">
                Free Solar Energy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
              Turn curtailed solar energy into Bitcoin. Zero energy cost during curtailment periods, 
              8% tax on profits, full EU jurisdiction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
                <Link href="/contact">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Mining Quote
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10" asChild>
                <Link href="/projects/park-ref-5001">
                  View 5MW Park Example
                </Link>
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">€0</div>
                <div className="text-sm text-gray-300">Curtailed Energy Cost</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400">25-40%</div>
                <div className="text-sm text-gray-300">Potential ROI</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-orange-400">8%</div>
                <div className="text-sm text-gray-300">Cyprus Tax Rate</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400">45.8%</div>
                <div className="text-sm text-gray-300">2025 Curtailment Peak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                The Cyprus Curtailment Opportunity
              </h2>
              <p className="text-xl text-gray-600">
                Cyprus grid curtailment has reached 45.8% in 2025 - solar parks are losing nearly half their potential revenue. 
                Smart investors are turning this wasted energy into Bitcoin.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cyprus Curtailment Crisis (2021-2025)
              </h3>
              <div className="grid grid-cols-5 gap-4 text-center">
                {[
                  { year: '2021', rate: '0%' },
                  { year: '2022', rate: '1.6%' },
                  { year: '2023', rate: '13.7%' },
                  { year: '2024', rate: '26.7%' },
                  { year: '2025', rate: '45.8%' }
                ].map((item) => (
                  <div key={item.year} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-sm text-gray-600">{item.year}</div>
                    <div className={`text-xl font-bold ${item.rate === '45.8%' ? 'text-red-600' : 'text-gray-800'}`}>
                      {item.rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-green-800 mb-3">The Problem:</h4>
                  <p className="text-green-700 text-sm">
                    Solar parks are forced to curtail (shut down) during peak production hours when the grid can't absorb 
                    excess power. This energy is completely lost - no revenue, no compensation in most cases.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">The Solution:</h4>
                  <p className="text-yellow-700 text-sm">
                    Instead of wasting curtailed energy, direct it to Bitcoin mining equipment on-site. 
                    Transform "worthless" curtailed power into valuable cryptocurrency at zero marginal energy cost.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Scenarios */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Mining Scenarios for 5MW Solar Park
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three approaches to solar-powered Bitcoin mining, each optimized for different investment profiles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {miningScenarios.map((scenario) => (
              <Card key={scenario.title} className="hover:shadow-xl transition-all duration-300 border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
                      <scenario.icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <Badge className="bg-orange-500 text-white">{scenario.highlight}</Badge>
                  </div>
                  <CardTitle className="text-xl">{scenario.title}</CardTitle>
                  <CardDescription className="text-base">{scenario.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Economics */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Cost:</span>
                      <span className="font-semibold text-green-600">{scenario.economics.energyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Hours:</span>
                      <span className="font-medium">{scenario.economics.operatingHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Miners:</span>
                      <span className="font-medium">{scenario.economics.miners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hashrate:</span>
                      <span className="font-medium">{scenario.economics.hashrate}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Monthly Revenue:</span>
                      <span className="font-bold text-green-600">{scenario.economics.monthlyRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual ROI:</span>
                      <span className="font-bold text-orange-600">{scenario.economics.annualROI}</span>
                    </div>
                  </div>
                  
                  {/* Pros */}
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 text-sm">Advantages:</h4>
                    <div className="space-y-1">
                      {scenario.pros.slice(0, 3).map((pro) => (
                        <div key={pro} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">
                Get Custom Mining Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Recommended Mining Equipment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading ASIC miners optimized for solar power operations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {equipmentSpecs.map((equipment) => (
                <Card 
                  key={equipment.model} 
                  className={`${equipment.recommended ? 'border-2 border-orange-500 shadow-lg' : ''}`}
                >
                  {equipment.recommended && (
                    <div className="bg-orange-500 text-white text-center text-sm font-semibold py-1">
                      RECOMMENDED
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">{equipment.model}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hashrate:</span>
                        <span className="font-semibold">{equipment.hashrate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-semibold">{equipment.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-semibold">{equipment.efficiency}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-orange-600">{equipment.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">Equipment Financing Available</h4>
              <p className="text-blue-700 text-sm">
                Through our network of equipment partners, we can arrange financing for mining hardware 
                with terms up to 24 months. Contact us for current rates and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Getting Started
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From solar park to mining operation in 8-12 weeks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Site Assessment', desc: 'Evaluate solar output, curtailment patterns, and infrastructure', icon: Calculator },
                { step: '2', title: 'Equipment Sizing', desc: 'Calculate optimal miner count and power infrastructure', icon: BarChart3 },
                { step: '3', title: 'Installation', desc: 'Container setup, electrical connections, cooling systems', icon: Zap },
                { step: '4', title: 'Operations', desc: 'Remote monitoring, maintenance, revenue optimization', icon: TrendingUp }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-orange-400 font-bold mb-1">STEP {item.step}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 flex items-center justify-center gap-4">
              <Clock className="w-6 h-6 text-orange-400" />
              <span className="text-gray-300">Typical implementation: <strong className="text-white">8-12 weeks</strong> from assessment to first hash</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Turn Your Curtailed Energy Into Bitcoin
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stop losing money to grid curtailment. Start mining with free solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-orange-600 hover:bg-gray-100 font-bold" asChild>
              <Link href="/contact">
                <Bitcoin className="w-5 h-5 mr-2" />
                Get Mining Consultation
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10" asChild>
              <Link href="/crypto/ai-mining">
                Explore AI GPU Mining
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
