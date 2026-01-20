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
  Calendar, 
  Euro, 
  TrendingUp,
  CheckCircle,
  Building,
  FileText,
  Clock,
  Shield,
  Activity
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Anarita 10MW Operational Solar Park | BESS-Ready Investment | SolarFarms.cy',
  description: 'Fully operational 10MW solar park in Anarita, Paphos. Grid connected and generating revenue. BESS-ready infrastructure for enhanced returns. Immediate cash flow opportunity.',
  keywords: [
    'Anarita solar park',
    'Cyprus solar investment',
    '10MW solar farm',
    'operational solar asset',
    'Paphos solar farm',
    'BESS ready solar',
    'solar PV Cyprus',
    'renewable energy investment'
  ],
  openGraph: {
    title: 'Anarita 10MW Operational Solar Park | BESS-Ready',
    description: 'Fully operational 10MW solar park. Grid connected with proven revenue. BESS integration ready.',
    type: 'website',
  }
}

export default function Anarita10MWProjectPage() {
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
              <Badge className="bg-blue-500 text-white text-sm px-4 py-1">
                Grid Connected
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
              Fully energized utility-scale solar park • Proven revenue track record • 
              BESS-ready infrastructure
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">Energized</div>
                <div className="text-sm text-white/70">Grid Status</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">14.5%</div>
                <div className="text-sm text-white/70">Current ROI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Euro className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">€1.95M</div>
                <div className="text-sm text-white/70">Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantage: Operational */}
      <section className="section-padding bg-green-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Already Generating Revenue</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Why Buy Operational?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Skip the development risk. This 10MW park is already connected to the grid and 
              generating merchant revenue. Immediate cash flow from day one of acquisition.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Development Wait</h3>
                  <p className="text-gray-600 text-sm">
                    Skip 2-3 years of permitting, construction, and grid connection delays.
                    Start earning immediately.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Proven Performance</h3>
                  <p className="text-gray-600 text-sm">
                    Real production data, actual curtailment figures, and verified revenue.
                    No projections - real numbers.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <Battery className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">BESS Upside</h3>
                  <p className="text-gray-600 text-sm">
                    Infrastructure ready for battery storage. Add BESS to recover curtailed 
                    energy and boost ROI to 18%+.
                  </p>
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
                    <div className="text-xl font-bold text-gray-900">Active</div>
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
                    <span className="font-semibold text-green-800">Annual Production</span>
                  </div>
                  <div className="text-3xl font-bold text-green-700">~17.5 GWh</div>
                  <div className="text-sm text-green-600">Based on operational data</div>
                </div>
              </CardContent>
            </Card>

            {/* BESS Opportunity */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Battery className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">BESS Integration Opportunity</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Recommended BESS</div>
                    <div className="text-xl font-bold text-gray-900">40 MWh</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-xl font-bold text-gray-900">4 Hours</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Est. BESS Cost</div>
                    <div className="text-xl font-bold text-gray-900">~€5.1M</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">ROI with BESS</div>
                    <div className="text-xl font-bold text-green-600">18%+</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">BESS Benefits</span>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Recover curtailed energy (~25-30%)</li>
                    <li>• Evening peak arbitrage (€160/MWh)</li>
                    <li>• Grid services revenue potential</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven operational asset with immediate cash flow
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Acquisition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-600" />
                  Acquisition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Asking Price</span>
                    <span className="font-semibold">€12.5M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Price per MW</span>
                    <span className="font-semibold">€1.25M/MW</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Asset Type</span>
                    <span className="font-semibold">Operational</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-800">Immediate Revenue</span>
                    <span className="text-xl font-bold text-green-700">Day 1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Current Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual Revenue</span>
                    <span className="font-semibold text-green-600">€1.95M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual OPEX</span>
                    <span className="font-semibold">~€150k</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Net Cash Flow</span>
                    <span className="font-semibold text-green-600">~€1.8M/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Current ROI</span>
                    <span className="font-semibold text-green-600">14.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* With BESS */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5 text-blue-600" />
                  Potential with BESS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">BESS Investment</span>
                    <span className="font-semibold">~€5.1M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Additional Revenue</span>
                    <span className="font-semibold text-green-600">+€600k/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-semibold text-green-600">~€2.55M/yr</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 mt-4 text-white">
                  <div className="text-center">
                    <div className="text-sm opacity-90">Enhanced ROI</div>
                    <div className="text-3xl font-bold">18%+</div>
                  </div>
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
                icon: Zap,
                title: 'Grid Connected',
                description: 'Active grid connection with established merchant market participation.'
              },
              {
                icon: Battery,
                title: 'BESS Ready',
                description: 'Infrastructure in place for battery storage integration. Add BESS to boost returns.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Returns',
                description: 'Real performance data available. 14.5% ROI verified, 18%+ potential with BESS.'
              },
              {
                icon: Euro,
                title: 'Immediate Cash Flow',
                description: 'Start receiving revenue from day one. No waiting for construction or connection.'
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
            Skip the development phase. Start generating returns immediately with this 
            proven 10MW operational solar park.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Request Due Diligence Pack
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
              <Link href="/calculator">
                <TrendingUp className="w-5 h-5 mr-2" />
                Model BESS Integration
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
