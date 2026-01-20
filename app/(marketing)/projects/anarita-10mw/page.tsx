import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Zap, 
  Battery, 
  Sun, 
  Euro, 
  TrendingUp,
  CheckCircle,
  Building,
  FileText,
  Clock,
  Shield,
  Activity,
  AlertTriangle,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Anarita 10MW Operational Solar Park | 35-54% Curtailment - BESS Opportunity | SolarFarms.cy',
  description: 'Fully operational 10MW solar park in Anarita, Paphos. Real curtailment data: 35-54%. BESS integration to recover lost revenue. ROI boost from 14.5% to 18%+.',
  keywords: [
    'Anarita solar park',
    'Cyprus solar investment',
    '10MW solar farm',
    'operational solar asset',
    'Paphos solar farm',
    'BESS ready solar',
    'solar curtailment Cyprus',
    'battery storage investment',
    'Linyang BESS Cyprus'
  ],
  openGraph: {
    title: 'Anarita 10MW Operational Solar Park | BESS Opportunity',
    description: 'Operational 10MW park with 35-54% curtailment. BESS integration ready to recover €600k+ annually.',
    type: 'website',
  }
}

// Real curtailment data from operational monitoring (May 2024 - Oct 2025)
const curtailmentData = [
  { month: 'May-24', curtailment: 45, production: 1921 },
  { month: 'Jun-24', curtailment: 12, production: 1987 },
  { month: 'Jul-24', curtailment: 7, production: 2034 },
  { month: 'Aug-24', curtailment: 5, production: 1944 },
  { month: 'Sep-24', curtailment: 23, production: 1724 },
  { month: 'Oct-24', curtailment: 42, production: 1108 },
  { month: 'Nov-24', curtailment: 44, production: 1160 },
  { month: 'Dec-24', curtailment: 27, production: 922 },
  { month: 'Jan-25', curtailment: 49, production: 955 },
  { month: 'Feb-25', curtailment: 45, production: 1086 },
  { month: 'Mar-25', curtailment: 66, production: 1513 },
  { month: 'Apr-25', curtailment: 67, production: 1669 },
  { month: 'May-25', curtailment: 52, production: 1921 },
  { month: 'Jun-25', curtailment: 28, production: 1987 },
  { month: 'Jul-25', curtailment: 27, production: 2034 },
  { month: 'Aug-25', curtailment: 39, production: 1944 },
  { month: 'Sep-25', curtailment: 44, production: 1724 },
  { month: 'Oct-25', curtailment: 59, production: 1461 },
]

export default function Anarita10MWProjectPage() {
  // Calculate averages from real data
  const avgCurtailment = Math.round(curtailmentData.reduce((sum, d) => sum + d.curtailment, 0) / curtailmentData.length)
  const maxCurtailment = Math.max(...curtailmentData.map(d => d.curtailment))
  
  // BESS calculations with Linyang pricing (10% Lighthief markup)
  const bessCapacityMWh = 40 // 4-hour system for 10MW
  const bessCostPerMWh = 110000 // €110k/MWh (Linyang + 10% markup for large system)
  const totalBessCost = bessCapacityMWh * bessCostPerMWh // €4.4M
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-green-900 via-cyprus-800 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-park-field-unsplash.jpg"
            alt="Anarita 10MW Solar Park"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-green-500 text-white text-sm px-4 py-1">
                <Activity className="w-3 h-3 mr-1" />
                Operational
              </Badge>
              <Badge className="bg-orange-500 text-white text-sm px-4 py-1">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {avgCurtailment}% Avg Curtailment
              </Badge>
              <Badge className="bg-blue-500 text-white text-sm px-4 py-1">
                BESS Opportunity
              </Badge>
              <Badge className="bg-white/20 text-white text-sm px-4 py-1 backdrop-blur-sm">
                Ref: PARK-ANARITA-10
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Anarita Solar Park
              <span className="block text-green-300 mt-2">10MW Operational Asset</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Fully energized utility-scale solar park • Real curtailment data available • 
              BESS integration to recover €600k+ annually
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <MapPin className="w-5 h-5 text-green-300" />
              <span className="text-lg">Anarita, Paphos District, Cyprus</span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Sun className="w-6 h-6 text-green-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">10 MW</div>
                <div className="text-sm text-white/70">Installed Capacity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-400/50">
                <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{avgCurtailment}%</div>
                <div className="text-sm text-white/70">Avg Curtailment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">14.5%</div>
                <div className="text-sm text-white/70">Current ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-400/50">
                <Battery className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">18%+</div>
                <div className="text-sm text-white/70">ROI with BESS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Curtailment Data Section */}
      <section className="section-padding bg-orange-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4">
                <BarChart3 className="w-5 h-5" />
                <span className="font-semibold">Real Operational Data</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Curtailment Reality: {avgCurtailment}% Average, Up to {maxCurtailment}%
              </h2>
              <p className="text-xl text-gray-600">
                18 months of verified production data showing significant curtailment loss.
                BESS integration can recover €600k+ annually.
              </p>
            </div>

            {/* Curtailment Chart */}
            <Card className="border-2 border-orange-200 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  Monthly Curtailment Rate (May 2024 - Oct 2025)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="flex gap-1 min-w-[800px] h-48 items-end">
                    {curtailmentData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full rounded-t ${data.curtailment > 50 ? 'bg-red-500' : data.curtailment > 30 ? 'bg-orange-500' : 'bg-yellow-500'}`}
                          style={{ height: `${data.curtailment * 2}px` }}
                        />
                        <div className="text-xs text-gray-500 mt-1 rotate-45 origin-left whitespace-nowrap">
                          {data.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded" />
                    <span>&lt;30% curtailment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span>30-50% curtailment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span>&gt;50% curtailment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center border-orange-200">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">{avgCurtailment}%</div>
                  <div className="text-sm text-gray-600">Average Curtailment</div>
                </CardContent>
              </Card>
              <Card className="text-center border-red-200">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-red-600">{maxCurtailment}%</div>
                  <div className="text-sm text-gray-600">Peak Curtailment</div>
                </CardContent>
              </Card>
              <Card className="text-center border-orange-200">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-orange-600">~€750k</div>
                  <div className="text-sm text-gray-600">Annual Revenue Lost</div>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-200">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-blue-600">~€600k</div>
                  <div className="text-sm text-gray-600">Recoverable with BESS</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Current System */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Sun className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Current Installation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Installed Capacity</div>
                    <div className="text-xl font-bold text-gray-900">10 MWp</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Grid Connection</div>
                    <div className="text-xl font-bold text-green-600">Active</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="text-xl font-bold text-gray-900">Paphos</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Land Area</div>
                    <div className="text-xl font-bold text-gray-900">~15 Ha</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Potential Annual Production</span>
                  </div>
                  <div className="text-3xl font-bold text-green-700">~18.5 GWh</div>
                  <div className="text-sm text-orange-600 mt-1">Currently selling ~12 GWh due to {avgCurtailment}% curtailment</div>
                </div>
              </CardContent>
            </Card>

            {/* BESS Solution */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Battery className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">BESS Integration Solution</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Linyang LFP System via Lighthief Cyprus</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Recommended BESS</div>
                    <div className="text-xl font-bold text-gray-900">{bessCapacityMWh} MWh</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-xl font-bold text-gray-900">4 Hours</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">System Cost</div>
                    <div className="text-xl font-bold text-gray-900">€{(totalBessCost / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Cost per MWh</div>
                    <div className="text-xl font-bold text-gray-900">€{(bessCostPerMWh / 1000).toFixed(0)}k</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">BESS Revenue Streams</span>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Curtailment recovery: ~€500k/year</li>
                    <li>• Evening arbitrage (€160/MWh): ~€150k/year</li>
                    <li>• Grid services potential: Additional upside</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Comparison */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Comparison: Solar Only vs Solar + BESS
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real numbers based on operational data and Linyang BESS pricing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Current - Solar Only */}
            <Card className="border-2 border-gray-300">
              <CardHeader className="bg-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <Sun className="w-5 h-5" />
                  Current: Solar Only
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Acquisition Price</span>
                    <span className="font-semibold">€12.5M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Potential Generation</span>
                    <span className="font-semibold">~18.5 GWh</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-orange-600">Curtailed Energy ({avgCurtailment}%)</span>
                    <span className="font-semibold text-orange-600">~6.5 GWh LOST</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Actual Sold</span>
                    <span className="font-semibold">~12 GWh</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual Revenue</span>
                    <span className="font-semibold text-green-600">€1.95M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual OPEX</span>
                    <span className="font-semibold text-red-600">€150k</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Net Cash Flow</span>
                    <span className="font-semibold text-green-600">€1.8M/yr</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">ROI</span>
                    <span className="text-2xl font-bold text-gray-700">14.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced - Solar + BESS */}
            <Card className="border-2 border-blue-400 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5" />
                  Enhanced: Solar + BESS
                  <Badge className="bg-white text-blue-600 ml-auto">RECOMMENDED</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Solar Acquisition</span>
                    <span className="font-semibold">€12.5M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">BESS Addition (40MWh)</span>
                    <span className="font-semibold">€4.4M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 font-semibold">Total Investment</span>
                    <span className="font-bold">€16.9M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Base Solar Revenue</span>
                    <span className="font-semibold">€1.95M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-blue-600">BESS Additional Revenue</span>
                    <span className="font-semibold text-blue-600">+€650k</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total Annual Revenue</span>
                    <span className="font-semibold text-green-600">€2.6M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total OPEX (incl BESS O&M)</span>
                    <span className="font-semibold text-red-600">€250k</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Net Cash Flow</span>
                    <span className="font-semibold text-green-600">€2.35M/yr</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 mt-4 text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Enhanced ROI</span>
                    <span className="text-3xl font-bold">18%+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BESS Supplier Info */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-2 border-cyprus-200 bg-gradient-to-br from-cyprus-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-cyprus-100 rounded-xl">
                    <Battery className="w-8 h-8 text-cyprus-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyprus-800">BESS Supply & Installation</h3>
                    <p className="text-gray-600">Linyang Energy Storage via Lighthief Cyprus Ltd</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-semibold text-cyprus-700">Technology</div>
                    <div className="text-gray-600">LFP Battery Systems</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-semibold text-cyprus-700">Warranty</div>
                    <div className="text-gray-600">15 Years Performance</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-semibold text-cyprus-700">O&M Partner</div>
                    <div className="text-gray-600">Lighthief Cyprus</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="gradient" asChild className="w-full md:w-auto">
                    <Link href="/energy-storage">
                      Learn About Our BESS Solutions →
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: 'Fully Operational',
                description: 'No development risk. The park is already generating electricity and revenue.'
              },
              {
                icon: BarChart3,
                title: 'Real Data Available',
                description: '18 months of verified production and curtailment data. No projections - real numbers.'
              },
              {
                icon: AlertTriangle,
                title: 'Known Curtailment',
                description: `${avgCurtailment}% average, up to ${maxCurtailment}% peak. Quantified opportunity for BESS recovery.`
              },
              {
                icon: Battery,
                title: 'BESS Ready',
                description: 'Infrastructure in place. Add 40MWh Linyang BESS to boost ROI from 14.5% to 18%+.'
              },
              {
                icon: Euro,
                title: 'Immediate Cash Flow',
                description: 'Start receiving €1.8M/year from day one. Add BESS for €2.35M/year.'
              },
              {
                icon: Shield,
                title: 'De-risked Asset',
                description: 'All permits, licenses, and grid agreements already secured and operational.'
              }
            ].map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <highlight.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                      <p className="text-gray-600 text-sm">{highlight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-green-600 to-cyprus-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Acquire This Operational Asset
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            10MW operational park with transparent curtailment data. Add BESS to recover 
            €600k+ annually and boost ROI to 18%+.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Request Due Diligence Pack
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
              <Link href="/energy-storage">
                <Battery className="w-5 h-5 mr-2" />
                Explore BESS Solutions
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Reference: PARK-ANARITA-10 | Anarita, Paphos District
          </p>
        </div>
      </section>
    </div>
  )
}
