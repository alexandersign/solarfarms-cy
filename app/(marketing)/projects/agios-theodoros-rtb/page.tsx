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
  Users,
  FileText,
  ArrowRight,
  Clock,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agios Theodoros Solar Park with BESS | 2.64 MWp RTB Investment | SolarFarms.cy',
  description: 'Ready-to-build 2.64 MWp solar park with 10.56 MWh battery storage in Larnaca. Leveraged equity IRR 35%+. Equity participation from 25%. Target Q4 2026.',
  keywords: [
    'Agios Theodoros solar park',
    'Cyprus solar investment',
    'BESS solar project',
    'ready to build solar',
    'Larnaca solar farm',
    'battery storage investment',
    'solar PV Cyprus',
    'renewable energy investment'
  ],
  openGraph: {
    title: 'Agios Theodoros Solar Park with Battery Storage | RTB Investment',
    description: 'Ready-to-build 2.64 MWp solar + 10.56 MWh BESS. Leveraged IRR 35%+. Target Q4 2026.',
    type: 'website',
  }
}

export default function AgiosTheodorosProjectPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-solar-900 via-cyprus-800 to-solar-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-farm-aerial-unsplash.jpg"
            alt="Agios Theodoros Solar Park"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-green-500 text-white text-sm px-4 py-1">
                Ready to Build
              </Badge>
              <Badge className="bg-solar-500 text-white text-sm px-4 py-1">
                Target Q4 2026
              </Badge>
              <Badge className="bg-white/20 text-white text-sm px-4 py-1 backdrop-blur-sm">
                Ref: PARK-RTB-2026
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Agios Theodoros Solar Park
              <span className="block text-solar-300 mt-2">with Battery Storage</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Utility-scale solar PV with integrated BESS • Merchant market exposure • 
              Zero curtailment risk
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <MapPin className="w-5 h-5 text-solar-300" />
              <span className="text-lg">Agios Theodoros, Larnaca District, Cyprus</span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Sun className="w-6 h-6 text-solar-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">2.64 MWp</div>
                <div className="text-sm text-white/70">Solar Capacity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Battery className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">10.56 MWh</div>
                <div className="text-sm text-white/70">Battery Storage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-solar-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">35%+</div>
                <div className="text-sm text-white/70">Leveraged IRR</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Euro className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">€1.23M</div>
                <div className="text-sm text-white/70">Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Solar PV Specs */}
            <Card className="border-2 border-solar-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-solar-100 rounded-xl">
                    <Sun className="w-6 h-6 text-solar-600" />
                  </div>
                  <CardTitle className="text-2xl">Solar PV System</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Installed Capacity</div>
                    <div className="text-xl font-bold text-gray-900">2.64 MWp</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Technology</div>
                    <div className="text-xl font-bold text-gray-900">Bifacial PV</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Mounting</div>
                    <div className="text-xl font-bold text-gray-900">Fixed Tilt</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Specific Yield</div>
                    <div className="text-xl font-bold text-gray-900">2,100 kWh/kWp</div>
                  </div>
                </div>
                <div className="bg-solar-50 rounded-lg p-4 border border-solar-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-solar-600" />
                    <span className="font-semibold text-solar-800">Annual Generation</span>
                  </div>
                  <div className="text-3xl font-bold text-solar-700">5.54 GWh</div>
                  <div className="text-sm text-solar-600">Estimated annual production</div>
                </div>
              </CardContent>
            </Card>

            {/* BESS Specs */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Battery className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Battery Energy Storage</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Capacity</div>
                    <div className="text-xl font-bold text-gray-900">10.56 MWh</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-xl font-bold text-gray-900">4 Hours</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Daily Cycles</div>
                    <div className="text-xl font-bold text-gray-900">1 Full Cycle</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Function</div>
                    <div className="text-xl font-bold text-gray-900">Arbitrage</div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Key Benefits</span>
                  </div>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Curtailment elimination</li>
                    <li>• Evening peak arbitrage (€160/MWh)</li>
                    <li>• Grid stabilization revenue potential</li>
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
              Financial Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conservative assumptions with strong leveraged returns
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Capital Expenditure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-solar-600" />
                  Capital Expenditure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">PV EPC Cost</span>
                    <span className="font-semibold">€1.90M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">(€0.72/Wp turnkey)</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">BESS System</span>
                    <span className="font-semibold">€1.34M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">(€127k/MWh ex. VAT)</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">RTB Acquisition</span>
                    <span className="font-semibold">€1.00M</span>
                  </div>
                </div>
                <div className="bg-solar-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-solar-800">Total CAPEX</span>
                    <span className="text-2xl font-bold text-solar-700">€4.24M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financing Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-600" />
                  Financing Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Senior Debt (80%)</span>
                    <span className="font-semibold">€2.59M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">On PV EPC + BESS</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Equity (RTB + 20%)</span>
                    <span className="font-semibold">€1.65M</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-800">Equity Required</span>
                    <span className="text-2xl font-bold text-green-700">€1.65M</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <strong>DSCR:</strong> Above 3.0x (conservative)
                </div>
              </CardContent>
            </Card>

            {/* Revenue & Returns */}
            <Card className="border-2 border-solar-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-solar-600" />
                  Revenue & Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Base Power Price</span>
                    <span className="font-semibold">€110/MWh</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Evening Arbitrage</span>
                    <span className="font-semibold">€160/MWh</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual Revenue</span>
                    <span className="font-semibold text-green-600">~€1.23M</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Annual OPEX</span>
                    <span className="font-semibold text-red-600">~€89k</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Net Cash Flow</span>
                    <span className="font-semibold text-green-600">~€1.14M/yr</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-solar-500 to-solar-600 rounded-lg p-4 mt-4 text-white">
                  <div className="text-center">
                    <div className="text-sm opacity-90">Leveraged Equity IRR</div>
                    <div className="text-3xl font-bold">High 30% Range</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible equity participation suitable for private investors, family offices, and strategic energy investors
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { percent: 25, equity: '€410k', revenue: '~€285k/yr' },
              { percent: 50, equity: '€825k', revenue: '~€570k/yr' },
              { percent: 75, equity: '€1.24M', revenue: '~€855k/yr' },
              { percent: 100, equity: '€1.65M', revenue: '~€1.14M/yr', featured: true },
            ].map((option) => (
              <Card 
                key={option.percent} 
                className={`text-center ${option.featured ? 'border-2 border-solar-500 shadow-lg' : ''}`}
              >
                {option.featured && (
                  <div className="bg-solar-500 text-white text-sm font-bold py-1">
                    FULL OWNERSHIP
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-4xl font-bold gradient-text">
                    {option.percent}%
                  </CardTitle>
                  <p className="text-gray-600">Equity Stake</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Investment</div>
                    <div className="text-xl font-bold">{option.equity}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Annual Cash Flow</div>
                    <div className="text-xl font-bold text-green-600">{option.revenue}</div>
                  </div>
                  <Button 
                    variant={option.featured ? 'gradient' : 'outline'} 
                    className="w-full"
                    asChild
                  >
                    <Link href="/contact">Express Interest</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why This Project
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle,
                title: 'Ready to Build',
                description: 'All permits secured. Construction can begin immediately upon closing.'
              },
              {
                icon: Battery,
                title: 'Integrated BESS',
                description: '4-hour battery storage eliminates curtailment risk and captures evening premium prices.'
              },
              {
                icon: Sun,
                title: 'Premium Technology',
                description: 'High-yield bifacial PV modules delivering 2,100 kWh/kWp specific yield.'
              },
              {
                icon: TrendingUp,
                title: 'Strong Returns',
                description: 'Leveraged equity IRR in the high 30% range with conservative assumptions.'
              },
              {
                icon: Users,
                title: 'Single Operator',
                description: 'Lighthief handles EPC, BESS integration, and long-term O&M - one experienced partner.'
              },
              {
                icon: Shield,
                title: 'De-risked Investment',
                description: 'RTB status, BESS curtailment protection, and DSCR above 3.0x provides safety margin.'
              }
            ].map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-solar-100 rounded-xl">
                      <highlight.icon className="w-6 h-6 text-solar-600" />
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

      {/* Delivery & Operations */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Delivery & Operations
              </h2>
              <p className="text-xl text-gray-600">
                Single experienced operator from construction to operations
              </p>
            </div>

            <Card className="border-2 border-cyprus-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src="/images/1690376781153.jpg"
                    alt="Lighthief"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-cyprus-700">Lighthief</h3>
                    <p className="text-gray-600">Full-service solar developer & operator</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building className="w-8 h-8 text-solar-600 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">EPC Contractor</h4>
                    <p className="text-sm text-gray-600">Turnkey construction</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Battery className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">BESS Integration</h4>
                    <p className="text-sm text-gray-600">Energy Management System</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-8 h-8 text-cyprus-600 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Long-term O&M</h4>
                    <p className="text-sm text-gray-600">Asset management</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-600 to-cyprus-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Interested in This Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Schedule a call to discuss investment options, review detailed financials, and 
            understand the project timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Request Information Pack
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
              <Link href="/calculator">
                <TrendingUp className="w-5 h-5 mr-2" />
                Run Your Own Numbers
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Reference: PARK-RTB-2026 | Agios Theodoros, Larnaca District
          </p>
        </div>
      </section>
    </div>
  )
}
