import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bitcoin, 
  Cpu, 
  Sun, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  BadgePercent,
  ArrowRight,
  CheckCircle,
  Building2,
  Leaf
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Crypto Investments Cyprus | 8% Flat Tax | Solar-Powered Mining | SolarFarms.cy',
  description: 'Invest in crypto mining with Cyprus 8% flat tax advantage. Solar-powered Bitcoin and AI GPU mining with renewable energy. Tax-efficient crypto investment solutions.',
  keywords: [
    'Cyprus crypto tax 8%',
    'crypto investment Cyprus',
    'solar bitcoin mining',
    'AI GPU mining renewable',
    'crypto tax haven Cyprus',
    'solar powered mining',
    'renewable energy crypto',
  ],
}

const taxComparison = [
  { country: 'USA', rate: '37%', flag: '🇺🇸' },
  { country: 'UK', rate: '45%', flag: '🇬🇧' },
  { country: 'Germany', rate: '42%', flag: '🇩🇪' },
  { country: 'Portugal', rate: '28%', flag: '🇵🇹' },
  { country: 'Cyprus', rate: '8%', flag: '🇨🇾', highlight: true },
]

const investmentPathways = [
  {
    icon: Sun,
    title: 'Direct Solar Investment',
    description: 'Traditional solar farm investment with 8-13% ROI. Benefits from Cyprus tax efficiency on all returns.',
    benefits: ['8-12% equity IRR', 'Asset-backed security', '25+ year income', 'EU-regulated'],
    link: '/calculator',
    cta: 'Calculate Returns'
  },
  {
    icon: Bitcoin,
    title: 'Solar Bitcoin Mining',
    description: 'Power BTC mining with surplus solar energy. Zero grid costs during peak production hours.',
    benefits: ['Utilize curtailed energy', '€0.06-0.10/kWh cost', '8% tax on gains', 'Off-grid capable'],
    link: '/crypto/solar-mining',
    cta: 'Learn More'
  },
  {
    icon: Cpu,
    title: 'AI GPU Mining',
    description: 'Rent GPU processing power for AI workloads. Growing demand with renewable energy advantage.',
    benefits: ['High margin potential', 'Decentralized compute', 'Scalable operations', 'Tax optimized'],
    link: '/crypto/ai-mining',
    cta: 'Explore Options'
  }
]

const services = [
  {
    icon: Zap,
    title: 'Power Purchase Agreements',
    description: 'Long-term PPAs at €0.08-0.12/kWh for mining operations. Stable costs, renewable energy.',
  },
  {
    icon: Building2,
    title: 'Off-Grid Solutions',
    description: 'For parks without grid connection - 100% energy utilization for mining. No curtailment waste.',
  },
  {
    icon: Shield,
    title: 'Tier-1 Equipment',
    description: 'Access to premium mining hardware through our network. Antminer, Whatsminer, NVIDIA partnerships.',
  },
  {
    icon: Leaf,
    title: 'Green Credentials',
    description: 'ESG-compliant mining with certified renewable energy. Attract institutional capital.',
  }
]

export default function CryptoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
            alt="Solar panels powering crypto mining"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-blue-900/90 z-10"></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-6 text-base px-4 py-2">
              <BadgePercent className="w-5 h-5 mr-2" />
              Cyprus: 8% Flat Tax on Crypto Gains
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Crypto Meets
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300">
                Solar Energy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
              Combine the tax advantages of Cyprus with renewable energy-powered mining. 
              8% flat tax on crypto gains, solar energy at cost, EU jurisdiction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
                <Link href="/crypto/solar-mining">
                  <Bitcoin className="w-5 h-5 mr-2" />
                  Explore Solar Mining
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">8%</div>
                <div className="text-sm text-gray-300">Crypto Tax Rate</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400">€0.08</div>
                <div className="text-sm text-gray-300">Solar kWh Cost</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400">3,300+</div>
                <div className="text-sm text-gray-300">Sun Hours/Year</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400">EU</div>
                <div className="text-sm text-gray-300">Jurisdiction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Comparison Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The Cyprus Tax Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Why sophisticated crypto investors choose Cyprus for their operations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {taxComparison.map((item) => (
                <Card 
                  key={item.country}
                  className={`text-center ${item.highlight ? 'border-2 border-green-500 bg-green-50 shadow-xl transform scale-105' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-2">{item.flag}</div>
                    <div className="font-semibold text-gray-900">{item.country}</div>
                    <div className={`text-2xl font-bold ${item.highlight ? 'text-green-600' : 'text-gray-700'}`}>
                      {item.rate}
                    </div>
                    {item.highlight && (
                      <Badge className="mt-2 bg-green-500">Best Rate</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cyprus Crypto Tax Details:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>8% flat tax</strong> on crypto trading profits for non-domiciled residents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>No capital gains tax</strong> on disposal of cryptocurrency assets</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>No inheritance tax</strong> on crypto holdings passed to heirs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Pathways */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Pathways
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your entry point into renewable energy crypto investments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investmentPathways.map((pathway) => (
              <Card key={pathway.title} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-solar-200">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-xl flex items-center justify-center mb-4">
                    <pathway.icon className="w-7 h-7 text-solar-600" />
                  </div>
                  <CardTitle className="text-xl">{pathway.title}</CardTitle>
                  <CardDescription className="text-base">{pathway.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {pathway.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="gradient" className="w-full" asChild>
                    <Link href={pathway.link}>
                      {pathway.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Lighthief Mining Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              End-to-end support for solar-powered crypto operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="bg-white/10 border-white/20 text-white">
                <CardContent className="pt-6">
                  <service.icon className="w-10 h-10 text-solar-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
              <Link href="/contact">
                Discuss Your Mining Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Cyprus + Solar Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Why Cyprus for 
                <span className="gradient-text"> Crypto Mining?</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <BadgePercent className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">8% Flat Tax Rate</h3>
                    <p className="text-gray-600 text-sm">One of Europe's lowest tax jurisdictions for crypto. Non-domiciled residents pay just 8% on profits.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <Sun className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">3,300+ Sun Hours</h3>
                    <p className="text-gray-600 text-sm">Europe's sunniest country means maximum solar production. Power your mining at €0.06-0.10/kWh.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <Globe className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">EU Jurisdiction</h3>
                    <p className="text-gray-600 text-sm">Full EU member with robust legal framework. Regulatory clarity for crypto businesses.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <Leaf className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Green Mining</h3>
                    <p className="text-gray-600 text-sm">Certified renewable energy for ESG-compliant mining. Attract institutional capital.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt="Solar farm powering crypto mining in Cyprus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">€0.08</div>
                    <div className="text-sm text-gray-600">Solar Power Cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Your Crypto Mining Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Combine Cyprus tax advantages with renewable energy. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
              <Link href="/contact">
                Schedule Expert Consultation
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10" asChild>
              <Link href="/crypto/solar-mining">
                Explore Solar Mining
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
