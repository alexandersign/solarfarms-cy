import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Bitcoin, 
  Sun, 
  Battery,
  TrendingUp,
  Zap,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Bitcoin Mining in Cyprus: 5MW Case Study with BESS Analysis | SolarFarms.cy',
  description: 'Real-world case study: How a 5MW Cyprus solar farm can generate additional revenue through Bitcoin mining. Analysis with and without BESS, off-grid solutions, and 8% tax advantage.',
  keywords: [
    'solar bitcoin mining Cyprus',
    'BTC mining case study',
    'renewable energy mining',
    'curtailment mining',
    'Cyprus crypto tax 8%',
    'off-grid bitcoin mining',
  ],
  openGraph: {
    title: 'Solar Bitcoin Mining in Cyprus: 5MW Case Study',
    description: 'How to turn curtailed solar energy into Bitcoin with 8% tax advantage',
    type: 'article',
    publishedTime: '2025-01-08',
  },
}

export default function SolarBitcoinMiningCaseStudyPage() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
            alt="Solar bitcoin mining farm Cyprus"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-amber-900/80 to-yellow-900/90 z-10"></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-orange-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Case Study
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                <Bitcoin className="w-4 h-4 mr-1" />
                Bitcoin Mining
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Solar Bitcoin Mining in Cyprus: 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                5MW Case Study with BESS Analysis
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8">
              How Cyprus solar parks can transform curtailed energy into Bitcoin revenue, 
              with detailed analysis comparing scenarios with and without battery storage.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Alexander Papacosta</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 8, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            {/* Introduction */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8 not-prose">
              <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                The Cyprus Curtailment Crisis
              </h3>
              <p className="text-orange-700 mb-4">
                Cyprus grid curtailment reached <strong>45.8% in 2025</strong>, meaning solar parks 
                are losing nearly half their potential revenue. This "wasted" energy presents 
                a unique opportunity for Bitcoin mining.
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { year: '2021', rate: '0%' },
                  { year: '2022', rate: '1.6%' },
                  { year: '2023', rate: '13.7%' },
                  { year: '2024', rate: '26.7%' },
                  { year: '2025', rate: '45.8%' }
                ].map((item) => (
                  <div key={item.year} className="bg-white rounded-lg p-2 text-center shadow-sm">
                    <div className="text-xs text-gray-600">{item.year}</div>
                    <div className={`text-lg font-bold ${item.rate === '45.8%' ? 'text-red-600' : 'text-gray-800'}`}>
                      {item.rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-yellow-500" />
              Why Cyprus for Bitcoin Mining?
            </h2>
            
            <p>
              Cyprus offers a unique combination of advantages for solar-powered Bitcoin mining:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-green-800 mb-2">🇨🇾 8% Flat Tax Rate</h4>
                  <p className="text-green-700 text-sm">
                    Non-domiciled residents pay just 8% on crypto trading profits - one of the lowest 
                    rates in Europe. Compare: UK 45%, Germany 42%, USA 37%.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">☀️ 3,300+ Sun Hours</h4>
                  <p className="text-yellow-700 text-sm">
                    Europe's sunniest country means maximum solar production. High irradiation 
                    translates to low energy costs for mining operations.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-blue-800 mb-2">🇪🇺 EU Jurisdiction</h4>
                  <p className="text-blue-700 text-sm">
                    Full EU member with robust legal framework. Regulatory clarity for crypto 
                    businesses and access to EU banking.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-purple-800 mb-2">⚡ Free Curtailed Energy</h4>
                  <p className="text-purple-700 text-sm">
                    With 45.8% curtailment, nearly half of solar production is currently wasted. 
                    Mining converts this to Bitcoin at €0/kWh marginal cost.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              Case Study: 5MW Solar Park
            </h2>
            
            <p>
              Let's analyze a real 5MW solar park in Cyprus (similar to our PARK-REF-5001 listing) 
              and calculate the potential Bitcoin mining revenue under three scenarios.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-6 not-prose">
              <h4 className="font-semibold text-gray-900 mb-4">Park Specifications:</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">DC Capacity:</span>
                  <span className="font-semibold ml-2">5.01 MW</span>
                </div>
                <div>
                  <span className="text-gray-600">AC Capacity:</span>
                  <span className="font-semibold ml-2">4.6 MW</span>
                </div>
                <div>
                  <span className="text-gray-600">Technology:</span>
                  <span className="font-semibold ml-2">Single-axis Tracking</span>
                </div>
                <div>
                  <span className="text-gray-600">Annual Production:</span>
                  <span className="font-semibold ml-2">~9,000 MWh</span>
                </div>
                <div>
                  <span className="text-gray-600">Curtailment Rate:</span>
                  <span className="font-semibold ml-2">25-45%</span>
                </div>
                <div>
                  <span className="text-gray-600">Curtailed Energy:</span>
                  <span className="font-semibold ml-2">2,250-4,050 MWh/year</span>
                </div>
              </div>
            </div>

            <h3 className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Scenario 1: Curtailment Mining (No BESS)
            </h3>
            
            <p>
              The simplest approach: deploy mining equipment that activates only during grid curtailment 
              periods. Energy cost is effectively €0/kWh since this power would otherwise be wasted.
            </p>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 my-6 not-prose">
              <h4 className="font-semibold text-orange-800 mb-4">Scenario 1 Economics:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Cost:</span>
                    <span className="font-bold text-green-600">€0/kWh (curtailed)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operating Hours:</span>
                    <span className="font-semibold">6-8 hrs/day peak</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Energy Available:</span>
                    <span className="font-semibold">~2,250 MWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miners Deployable:</span>
                    <span className="font-semibold">~350 Antminer S19 XP</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hashrate:</span>
                    <span className="font-semibold">49 PH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipment Cost:</span>
                    <span className="font-semibold">~€1,225,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-bold text-green-600">€35,000-50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual ROI:</span>
                    <span className="font-bold text-orange-600">25-40%</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-blue-500" />
              Scenario 2: BESS-Enabled 24/7 Mining
            </h3>
            
            <p>
              Add battery storage (BESS) to enable continuous mining operations. The BESS stores 
              excess solar production during the day and powers miners through the night.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 my-6 not-prose">
              <h4 className="font-semibold text-blue-800 mb-4">Scenario 2 Economics:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">BESS Size:</span>
                    <span className="font-semibold">9.2 MWh (2-hour system)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BESS Cost:</span>
                    <span className="font-semibold">~€1,288,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Cost:</span>
                    <span className="font-bold text-green-600">€0.06-0.08/kWh avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operating Hours:</span>
                    <span className="font-semibold">24 hrs/day</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miners Deployable:</span>
                    <span className="font-semibold">~280 Antminer S19 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hashrate:</span>
                    <span className="font-semibold">39 PH/s</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-bold text-green-600">€28,000-40,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual ROI:</span>
                    <span className="font-bold text-blue-600">18-30%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-blue-700 text-sm">
                  <strong>Note:</strong> BESS provides consistent operation but adds capex and 
                  energy costs (RTE losses). Best for investors prioritizing reliability over maximum ROI.
                </p>
              </div>
            </div>

            <h3 className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-green-500" />
              Scenario 3: Off-Grid Mining (No Grid Connection)
            </h3>
            
            <p>
              For parks without grid connection (2-5 year wait in Cyprus), convert the entire 
              solar output to Bitcoin mining. This eliminates curtailment entirely.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 my-6 not-prose">
              <h4 className="font-semibold text-green-800 mb-4">Scenario 3 Economics:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Cost:</span>
                    <span className="font-bold text-green-600">€0.05-0.07/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operating Hours:</span>
                    <span className="font-semibold">10-12 hrs/day (daylight)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Energy:</span>
                    <span className="font-semibold">~9,000 MWh (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miners Deployable:</span>
                    <span className="font-semibold">~800 Antminer S19 XP</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hashrate:</span>
                    <span className="font-semibold">112 PH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Equipment Cost:</span>
                    <span className="font-semibold">~€2,800,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-bold text-green-600">€80,000-120,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual ROI:</span>
                    <span className="font-bold text-green-600">35-50%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-green-700 text-sm">
                  <strong>Best for:</strong> Parks waiting for grid connection. Generate immediate 
                  revenue instead of waiting 2-5 years for grid approval.
                </p>
              </div>
            </div>

            <h2 className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              ROI Comparison Summary
            </h2>

            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Metric</th>
                    <th className="border p-3 text-center">Curtailment Only</th>
                    <th className="border p-3 text-center">With BESS</th>
                    <th className="border p-3 text-center">Off-Grid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Energy Cost</td>
                    <td className="border p-3 text-center font-semibold text-green-600">€0/kWh</td>
                    <td className="border p-3 text-center">€0.06-0.08</td>
                    <td className="border p-3 text-center">€0.05-0.07</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Initial Investment</td>
                    <td className="border p-3 text-center">~€1.2M</td>
                    <td className="border p-3 text-center">~€2.5M</td>
                    <td className="border p-3 text-center">~€2.8M</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Annual Revenue</td>
                    <td className="border p-3 text-center">€420-600K</td>
                    <td className="border p-3 text-center">€336-480K</td>
                    <td className="border p-3 text-center">€960K-1.4M</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border p-3 font-semibold">Annual ROI</td>
                    <td className="border p-3 text-center font-bold text-orange-600">25-40%</td>
                    <td className="border p-3 text-center font-bold text-blue-600">18-30%</td>
                    <td className="border p-3 text-center font-bold text-green-600">35-50%</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Payback Period</td>
                    <td className="border p-3 text-center">2-3 years</td>
                    <td className="border p-3 text-center">3-4 years</td>
                    <td className="border p-3 text-center">2-3 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Key Takeaways</h2>
            
            <div className="not-prose space-y-3 my-6">
              {[
                'Curtailment mining offers the highest ROI on investment due to zero energy costs',
                'Off-grid mining is ideal for parks waiting for grid connection (2-5 year wait in Cyprus)',
                'BESS-enabled mining provides consistent operation but at lower ROI due to added capex',
                'Cyprus 8% tax rate makes all scenarios more profitable vs other jurisdictions',
                'Equipment financing available through Lighthief network partnerships'
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            <h2>Getting Started with Solar Mining</h2>
            
            <p>
              Lighthief Cyprus provides end-to-end support for solar-powered Bitcoin mining:
            </p>
            
            <ul>
              <li><strong>Site Assessment:</strong> Evaluate curtailment patterns and infrastructure</li>
              <li><strong>Equipment Sourcing:</strong> Access to Tier-1 miners at competitive prices</li>
              <li><strong>Installation:</strong> Container-based solutions with cooling systems</li>
              <li><strong>Operations:</strong> Remote monitoring and maintenance</li>
              <li><strong>PPA Terms:</strong> Long-term power purchase agreements for miners</li>
            </ul>

          </div>
          
          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Turn Your Curtailed Energy Into Bitcoin?
                </h3>
                <p className="text-white/90 mb-6">
                  Get a custom mining analysis for your solar park. Our team will evaluate 
                  curtailment patterns and provide detailed revenue projections.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                    <Link href="/contact">
                      <Bitcoin className="w-5 h-5 mr-2" />
                      Get Mining Consultation
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                    <Link href="/crypto/solar-mining">
                      Learn More About Mining
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  )
}
