import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Cpu, 
  Sun, 
  TrendingUp, 
  Zap,
  Server,
  ArrowRight,
  CheckCircle,
  Globe,
  BarChart3,
  Leaf,
  Building2,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI GPU Mining Cyprus | Renewable Energy Data Centers | SolarFarms.cy',
  description: 'Solar-powered AI GPU mining and compute services in Cyprus. 8% tax rate, renewable energy at €0.06-0.10/kWh. Off-grid data center solutions for AI workloads.',
  keywords: [
    'AI GPU mining Cyprus',
    'solar data center',
    'renewable compute',
    'AI processing Cyprus',
    'GPU mining solar',
    'off-grid data center',
    'green AI compute',
  ],
}

const aiDemandStats = [
  { metric: '50x', description: 'AI compute demand growth by 2030' },
  { metric: '850 TWh', description: 'Projected AI power consumption by 2030' },
  { metric: '$1.3T', description: 'Global AI infrastructure investment' },
  { metric: '60%', description: 'Data centers seeking renewable power' }
]

const gpuOptions = [
  {
    model: 'NVIDIA H100',
    type: 'AI Training & Inference',
    power: '700W',
    revenue: '$50-80/day',
    useCase: 'LLM training, high-value compute',
    premium: true
  },
  {
    model: 'NVIDIA A100',
    type: 'AI Training',
    power: '400W',
    revenue: '$25-40/day',
    useCase: 'Machine learning, scientific compute',
    premium: false
  },
  {
    model: 'NVIDIA RTX 4090',
    type: 'AI Inference & Mining',
    power: '450W',
    revenue: '$15-25/day',
    useCase: 'Inference, rendering, Proof-of-Work',
    premium: false
  }
]

const useCases = [
  {
    icon: Server,
    title: 'Decentralized Compute Networks',
    description: 'Rent GPU power to networks like Render, io.net, Akash. Consistent revenue from AI and rendering workloads.',
    revenue: '€30-60/GPU/day'
  },
  {
    icon: Cpu,
    title: 'AI Model Training',
    description: 'Host GPU clusters for AI companies needing training capacity. Premium rates for renewable energy.',
    revenue: '€50-100/GPU/day'
  },
  {
    icon: Globe,
    title: 'Edge AI Inference',
    description: 'Low-latency inference services for Mediterranean and Middle East markets from Cyprus location.',
    revenue: '€20-40/GPU/day'
  },
  {
    icon: BarChart3,
    title: 'Crypto GPU Mining',
    description: 'Mine GPU-friendly cryptocurrencies (ETH PoW forks, Ravencoin, etc.) during low-demand periods.',
    revenue: '€5-15/GPU/day'
  }
]

const advantages = [
  {
    icon: Sun,
    title: 'Renewable Energy Premium',
    description: 'AI companies pay 10-20% premium for certified green compute. ESG compliance is mandatory for many enterprise contracts.',
    stat: '+15% Premium'
  },
  {
    icon: Zap,
    title: 'Low Energy Costs',
    description: 'Solar power at €0.06-0.10/kWh vs €0.15-0.25 grid rates. Energy is 30-40% of GPU operating costs.',
    stat: '€0.08/kWh'
  },
  {
    icon: Shield,
    title: 'EU Jurisdiction',
    description: 'Full GDPR compliance, EU data protection laws. Required for enterprise AI customers in regulated industries.',
    stat: 'EU Compliant'
  },
  {
    icon: Leaf,
    title: 'Carbon Neutral',
    description: 'Certified renewable energy certificates available. Required for scope 3 emissions reporting by enterprise customers.',
    stat: 'RECs Available'
  }
]

export default function AiMiningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/solar-park-field-unsplash.jpg"
            alt="Solar-powered AI data center"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90 z-10"></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6 text-base px-4 py-2">
              <Cpu className="w-5 h-5 mr-2" />
              AI-Powered Solar Infrastructure
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              The Global AI Boom Needs
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Renewable Energy
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
              AI data centers are consuming unprecedented amounts of power. 
              Solar-powered GPU compute in Cyprus offers green credentials, low costs, and EU jurisdiction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-purple-500 hover:bg-purple-600 text-white font-bold" asChild>
                <Link href="/contact">
                  <Server className="w-5 h-5 mr-2" />
                  Explore GPU Hosting
                </Link>
              </Button>
              <Button size="xl" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
                <Link href="/crypto/solar-mining">
                  See Bitcoin Mining
                </Link>
              </Button>
            </div>
            
            {/* AI Demand Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {aiDemandStats.map((stat) => (
                <div key={stat.metric} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-purple-300">{stat.metric}</div>
                  <div className="text-xs text-gray-400">{stat.description}</div>
                </div>
              ))}
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
                The AI Energy Crisis
              </h2>
              <p className="text-xl text-gray-600">
                AI model training and inference requires massive computing power. 
                Data centers are struggling to find sustainable energy sources.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Explosive Demand</h3>
                    <p className="text-gray-600 text-sm">
                      ChatGPT alone consumes more power than 33,000 homes. Each GPT-4 query uses 10x more energy than a Google search.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Grid Limitations</h3>
                    <p className="text-gray-600 text-sm">
                      Major data center hubs (Virginia, Dublin, Singapore) facing power constraints. 
                      2-3 year waits for new grid connections.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sustainability Mandates</h3>
                    <p className="text-gray-600 text-sm">
                      Microsoft, Google, Amazon all committed to carbon neutrality. 
                      They need renewable-powered compute providers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cyprus Solar Advantage</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">3,300+ sun hours per year</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">€0.06-0.10/kWh solar power</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">No grid connection delays for off-grid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">8% flat tax on profits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">EU jurisdiction & GDPR compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GPU Options */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              GPU Hardware Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade GPUs for AI training, inference, and compute workloads
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {gpuOptions.map((gpu) => (
                <Card 
                  key={gpu.model} 
                  className={`${gpu.premium ? 'border-2 border-purple-500 shadow-lg' : ''}`}
                >
                  {gpu.premium && (
                    <div className="bg-purple-500 text-white text-center text-sm font-semibold py-1">
                      HIGHEST ROI
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-1">{gpu.model}</h3>
                    <p className="text-sm text-gray-600 mb-4">{gpu.type}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-semibold">{gpu.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Revenue:</span>
                        <span className="font-bold text-green-600">{gpu.revenue}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500">{gpu.useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Revenue Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple income streams from solar-powered GPU infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <useCase.icon className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{useCase.description}</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {useCase.revenue}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Competitive Advantages
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Why solar-powered GPU compute in Cyprus outperforms traditional data centers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => (
              <Card key={advantage.title} className="bg-white/10 border-white/20 text-white">
                <CardContent className="pt-6">
                  <advantage.icon className="w-10 h-10 text-purple-400 mb-4" />
                  <Badge className="bg-purple-500 mb-3">{advantage.stat}</Badge>
                  <h3 className="font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-gray-300 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Grid Solution */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-4">Off-Grid Solution</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Solar Parks Without Grid? 
                <span className="gradient-text"> Perfect for AI Compute</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-6">
                Cyprus has a 2-5 year wait for grid connection. Instead of waiting, 
                convert your solar park into an off-grid AI compute center.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Container Data Centers</h3>
                    <p className="text-gray-600 text-sm">Pre-fabricated, climate-controlled GPU containers. 
                    Deploy in weeks, not years. 40-foot containers house 100+ GPUs each.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Energy Utilization</h3>
                    <p className="text-gray-600 text-sm">No curtailment, no wasted energy. 
                    Every kWh your panels produce goes directly to high-value compute.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Immediate Revenue</h3>
                    <p className="text-gray-600 text-sm">Start earning from day one instead of waiting years for grid connection. 
                    Generate income while grid application processes.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="gradient" size="lg" className="mt-8" asChild>
                <Link href="/contact">
                  Discuss Off-Grid Compute
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt="Off-grid solar AI compute center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Server className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5MW</div>
                    <div className="text-sm text-gray-600">= 1,000+ GPUs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Power AI with Solar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Turn your solar park into a renewable compute powerhouse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-purple-600 hover:bg-gray-100 font-bold" asChild>
              <Link href="/contact">
                <Cpu className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Link>
            </Button>
            <Button size="xl" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
              <Link href="/crypto">
                View All Crypto Options
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
