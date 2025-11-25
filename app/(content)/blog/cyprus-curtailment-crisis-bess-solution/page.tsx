import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Battery, 
  AlertTriangle,
  CheckCircle,
  Euro,
  Zap,
  Shield,
  Award,
  Globe,
  Calculator
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cyprus Solar Curtailment Crisis 2025: How BESS Protects Your Investment ROI',
  description: 'Curtailment surged from 0% to 45.8% in 4 years. Learn how Battery Energy Storage Systems (BESS) can recover lost revenue and protect your solar investment ROI in Cyprus.',
  keywords: [
    'Cyprus solar curtailment',
    'BESS Cyprus',
    'battery storage Cyprus',
    'solar curtailment solution',
    'Cyprus renewable energy',
    'solar ROI protection',
    'energy storage Cyprus',
    'Lighthief Cyprus BESS',
    'solar investment protection'
  ],
}

export default function CyprusCurtailmentBESSArticle() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge variant="destructive" className="mb-4">
              Market Alert - Critical Trend
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Cyprus Solar Curtailment Crisis 2025:
              <span className="block gradient-text mt-2">
                How BESS Protects Your Investment ROI
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Curtailment has surged from 0% to 45.8% in just four years. Battery Energy Storage Systems (BESS) 
              are now essential for protecting solar investment returns in Cyprus.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>November 26, 2025</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* The Crisis */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Cyprus Curtailment Crisis</h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus is experiencing a dramatic surge in solar curtailment - when grid operators force solar parks 
                to reduce or stop production despite available sunshine. Real-world data from operational parks shows 
                a shocking trend: curtailment has increased from essentially 0% in 2021 to a staggering 45.8% in 2025.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This isn't a theoretical problem. For a typical 5MW solar park, this translates to millions of euros 
                in lost revenue over the project lifetime, fundamentally altering investment economics and ROI projections.
              </p>
            </div>

            {/* Curtailment Visualization */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge variant="destructive" className="mb-3">Critical Market Trend</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cyprus Curtailment Crisis: The BESS Opportunity
                </h3>
                <p className="text-gray-600">
                  Curtailment increased from 0% to 45.8% in just 4 years - making BESS essential for ROI protection
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">2021</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: '100%' }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className="text-lg font-bold text-green-600">0%</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">2022</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: '96.5%' }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className="text-lg font-bold text-green-600">3.5%</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">2023</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: '86.6%' }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className="text-lg font-bold text-orange-600">13.4%</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">2024</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: '73.3%' }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className="text-lg font-bold text-orange-600">26.7%</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">2025</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: '54.2%' }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className="text-lg font-bold text-red-600">45.8%</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-4 h-4 bg-green-400 rounded mr-2"></span>
                    Energy Sold
                    <span className="inline-block w-4 h-4 bg-red-400 rounded ml-6 mr-2"></span>
                    Curtailed Energy
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Source: Galascope Limited 5.01MW Solar Park (Operational Data)</p>
                </div>
              </div>
            </div>

            {/* Real Impact */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Real Financial Impact</h2>
              <p className="text-lg text-gray-700 mb-4">
                Let's look at concrete numbers from an actual 5.01MW solar park operating in Cyprus:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-900">2021: The Golden Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Production: 10,146 MWh</li>
                      <li>• Curtailment: 0 MWh (0%)</li>
                      <li>• Revenue: ~€2.03M (at €200/MWh)</li>
                      <li className="font-semibold text-green-600">• Full revenue captured ✓</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-500">
                  <CardHeader>
                    <CardTitle className="text-red-900">2025: The Crisis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Production: 5,599 MWh</li>
                      <li>• Curtailment: 4,598 MWh (45.8%)</li>
                      <li>• Revenue: ~€1.06M (at €190/MWh)</li>
                      <li className="font-semibold text-red-600">• €873K lost annually ✗</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-red-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  That's nearly €1 million in annual revenue vanishing into thin air.
                </p>
                <p className="text-gray-700">
                  Over a 25-year project lifetime, this represents approximately €21.8 million in lost revenue 
                  (assuming curtailment stabilizes at current levels, which historical trends suggest is optimistic).
                </p>
              </div>
            </div>

            {/* Why This is Happening */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why Is Curtailment Exploding in Cyprus?</h2>
              <p className="text-lg text-gray-700 mb-4">
                Several factors are driving this unprecedented curtailment crisis:
              </p>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">1. Rapid Solar Penetration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Cyprus has successfully deployed significant solar capacity, often exceeding daytime demand 
                      during peak sunshine hours. The grid simply cannot absorb all the solar energy being generated.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">2. Limited Grid Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Cyprus operates as an isolated grid without interconnections to neighboring countries. 
                      Unlike mainland Europe, excess power cannot be exported, creating local oversupply situations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Lack of Large-Scale Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Until recently, Cyprus had minimal grid-scale or distributed battery storage. This means 
                      no mechanism exists to time-shift solar generation from peak production to peak demand periods.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* The BESS Solution */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The BESS Solution: Turning Crisis into Opportunity</h2>
              <p className="text-lg text-gray-700 mb-6">
                Battery Energy Storage Systems (BESS) transform the curtailment problem into a profit opportunity. 
                Here's how it works:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">1. Capture Curtailed Energy</h3>
                    <p className="text-gray-700 text-sm">
                      Instead of losing energy during curtailment periods, store it in batteries for later use
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">2. Shift to Premium Hours</h3>
                    <p className="text-gray-700 text-sm">
                      Discharge stored energy during evening/night when demand is high and tariffs are 20-30% higher
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                      <Euro className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">3. Maximize Revenue</h3>
                    <p className="text-gray-700 text-sm">
                      Recover 30-60% of curtailed revenue plus earn premium nighttime tariff differentials
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ROI Scenarios */}
            <div className="bg-cyprus-50 rounded-2xl p-8">
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">Real ROI Comparison: 5MW Park Example</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Scenario A: Solar Only (Current Reality)</CardTitle>
                    <CardDescription>No BESS - Exposed to Full Curtailment Impact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-bold">€9,600,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Production:</span>
                      <span>10,000 MWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Curtailed Energy:</span>
                      <span className="text-red-600 font-semibold">2,580 MWh (25.8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Production:</span>
                      <span>7,420 MWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Revenue:</span>
                      <span>€1,410,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual OPEX:</span>
                      <span>€138,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Net Income:</span>
                      <span className="font-bold">€1,272,000</span>
                    </div>
                    <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
                      <span className="font-bold text-lg">Annual ROI:</span>
                      <span className="font-bold text-lg text-green-600">13.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payback Period:</span>
                      <span>7.5 years</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-500">
                  <CardHeader>
                    <Badge className="mb-2 bg-green-600">Recommended Solution</Badge>
                    <CardTitle>Scenario B: Solar + BESS (Future-Proof)</CardTitle>
                    <CardDescription>12.5 MWh BESS (2.5 MWh per MW)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-bold">€11,350,000</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Solar: €9.6M + BESS: €1.75M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Recovery:</span>
                      <span className="text-green-600 font-semibold">1,290 MWh (50%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enhanced Production:</span>
                      <span>8,710 MWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Revenue:</span>
                      <span className="text-green-600">€1,704,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual OPEX:</span>
                      <span>€163,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-bold">Net Income:</span>
                      <span className="font-bold text-green-600">€1,541,000</span>
                    </div>
                    <div className="flex justify-between bg-green-100 p-3 rounded-lg">
                      <span className="font-bold text-lg">Enhanced ROI:</span>
                      <span className="font-bold text-lg text-green-600">13.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payback Period:</span>
                      <span>7.4 years</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mt-4">
                      <div className="text-sm font-semibold text-green-900 mb-1">BESS Standalone ROI:</div>
                      <div className="text-2xl font-bold text-green-600">15.4%</div>
                      <div className="text-xs text-gray-600">BESS pays for itself in ~6.5 years</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/projects/park-ref-5001">
                    <Calculator className="w-5 h-5 mr-2" />
                    Try Interactive BESS Calculator
                  </Link>
                </Button>
              </div>
            </div>

            {/* Lighthief Cyprus BESS Expertise */}
            <div className="bg-gradient-to-br from-cyprus-50 to-solar-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Lighthief Cyprus: Your Local BESS Partner
                </h2>
                <p className="text-xl text-gray-600">
                  Official Tier-1 BESS reseller with local O&M expertise and EU-backed support
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-cyprus-600 mr-2" />
                    Why Choose Lighthief Cyprus for BESS
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Official Tier-1 Reseller:</strong> Direct partnerships with leading BESS manufacturers (Tesla, BYD, Huawei, Sungrow)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Local O&M Expertise:</strong> 24/7 monitoring and maintenance from our Cyprus-based team</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>EU Backing:</strong> Full warranty support backed by EU regulations and consumer protection</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Local Spares Inventory:</strong> Critical components stocked in Cyprus for rapid response</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Track Record:</strong> Since 2017, evolved from recycling pioneers to full-service EPC with BESS integration</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Award className="w-6 h-6 text-solar-600 mr-2" />
                    Our BESS Services
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-cyprus-700 mb-2">BESS Design & Procurement</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Optimal sizing based on curtailment profile</li>
                        <li>• Tier-1 equipment at competitive pricing</li>
                        <li>• Complete technical specifications</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-cyprus-700 mb-2">Installation & Commissioning</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Turnkey installation by certified engineers</li>
                        <li>• Grid integration and permitting</li>
                        <li>• Performance testing and optimization</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-cyprus-700 mb-2">24/7 O&M & Support</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Real-time monitoring and optimization</li>
                        <li>• Preventive maintenance programs</li>
                        <li>• Emergency response within 24 hours</li>
                        <li>• Performance guarantee commitments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <Globe className="w-12 h-12 text-cyprus-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Local Service, Global Standards</h4>
                    <p className="text-gray-700 mb-3">
                      Unlike international suppliers with distant support, Lighthief Cyprus provides local presence 
                      in Limassol with same-day response capabilities. Our team understands Cyprus grid conditions, 
                      regulatory requirements, and curtailment patterns intimately.
                    </p>
                    <p className="text-gray-700">
                      We maintain strategic spare parts inventory in Cyprus, ensuring minimal downtime and rapid 
                      repairs - critical for maximizing your BESS ROI and curtailment recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BESS Economics */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">BESS Investment Economics for Cyprus</h2>
              <p className="text-lg text-gray-700 mb-6">
                Based on current market conditions and Tier-1 equipment pricing:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>BESS Costs (2025 Market Rates)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>BESS Equipment:</span>
                      <span className="font-semibold">€140,000 per MWh</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>5MW park (2.5 MWh/MW):</span>
                      <span>12.5 MWh total</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total BESS Investment:</span>
                      <span className="font-bold text-lg">€1,750,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Annual O&M:</span>
                      <span>€25,000 (2%)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle>BESS Returns (Conservative Estimate)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Energy Recovered:</span>
                      <span className="font-semibold">1,290 MWh/year</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>50% of curtailed energy:</span>
                      <span>2,580 MWh × 50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Revenue:</span>
                      <span className="font-bold text-lg text-green-600">€294,000/year</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Net BESS Income:</span>
                      <span className="font-bold">€269,000/year</span>
                    </div>
                    <div className="bg-green-200 rounded-lg p-3">
                      <div className="flex justify-between">
                        <span className="font-bold">BESS ROI:</span>
                        <span className="font-bold text-xl text-green-700">15.4%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-6">
                <Button variant="cyprus" size="lg" asChild>
                  <Link href="/projects/park-ref-5001">
                    View Live 5MW Park with BESS Calculator →
                  </Link>
                </Button>
              </div>
            </div>

            {/* Financing Options */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">BESS Financing Options in Cyprus</h2>
              <p className="text-lg text-gray-700 mb-6">
                Banks and financial institutions increasingly recognize BESS value in curtailment mitigation:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Solar-Only Financing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      Traditional solar financing in Cyprus typically caps at:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>€500,000 per MW</strong> maximum debt</li>
                      <li>• 4.5-5.0% interest rates</li>
                      <li>• 10-15 year terms</li>
                      <li>• Conservative LTV ratios</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle>Solar + BESS Financing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">
                      Enhanced financing available for hybrid systems:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Up to 70% of total capex</strong></li>
                      <li>• Similar interest rates (4.5-5.0%)</li>
                      <li>• BESS revenue streams improve bankability</li>
                      <li>• Future-proof asset valuation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">BESS Retrofit Timeline</h2>
              <p className="text-lg text-gray-700 mb-6">
                Adding BESS to existing solar parks or new developments:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
                  <div className="w-12 h-12 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyprus-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Assessment & Design (2-4 weeks)</h4>
                    <p className="text-gray-700 text-sm">
                      Site evaluation, curtailment analysis, optimal BESS sizing, grid integration study
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
                  <div className="w-12 h-12 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyprus-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Procurement & Permitting (8-12 weeks)</h4>
                    <p className="text-gray-700 text-sm">
                      Equipment ordering, grid operator approvals, electrical permits, final engineering
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-lg p-4">
                  <div className="w-12 h-12 bg-cyprus-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyprus-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Installation & Commissioning (4-6 weeks)</h4>
                    <p className="text-gray-700 text-sm">
                      On-site installation, electrical integration, testing, grid synchronization, operator training
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Operational: Start Recovering Curtailed Revenue</h4>
                    <p className="text-gray-700 text-sm">
                      Total timeline: 14-22 weeks from contract to revenue generation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Protect Your Solar Investment with BESS
              </h2>
              <p className="text-xl mb-6 opacity-90">
                With curtailment projected to increase further, now is the time to future-proof your solar assets
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Request BESS Assessment
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/projects/park-ref-5001">
                    Explore 5MW Park with BESS
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-75">
                Contact Alexander Papacosta: +357 99 164 158 | lighthiefcyprus@gmail.com
              </p>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}

