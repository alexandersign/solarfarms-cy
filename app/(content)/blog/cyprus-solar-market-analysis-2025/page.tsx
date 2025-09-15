import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, TrendingUp, Globe, Euro, Zap, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cyprus Solar Market Analysis 2025 | Investment Opportunities & Market Trends',
  description: 'Comprehensive analysis of Cyprus solar market in 2025. Government targets, investment opportunities, electricity rates, and why Cyprus leads EU solar potential.',
  keywords: [
    'Cyprus solar market 2025',
    'Cyprus renewable energy',
    'solar investment Cyprus',
    'Cyprus electricity market',
    'EU solar potential',
  ],
}

const marketStats = [
  {
    metric: "3,300+",
    label: "Annual Sunshine Hours",
    description: "Highest in the European Union",
    trend: "Consistent year-over-year"
  },
  {
    metric: "1,800",
    label: "Solar Irradiation (kWh/m²/year)",
    description: "Optimal conditions for solar generation",
    trend: "Above EU average by 40%"
  },
  {
    metric: "13.8%",
    label: "Current Renewable Share",
    description: "Significant growth potential vs EU average 19.7%",
    trend: "Growing 2-3% annually"
  },
  {
    metric: "1,250 MW",
    label: "Government Target by 2030",
    description: "Massive expansion planned",
    trend: "900+ MW still needed"
  }
]

const investmentDrivers = [
  {
    title: "Government Support & Targets",
    description: "Cyprus government committed to 1,250 MW renewable capacity by 2030, with specific support for solar farms.",
    impact: "Strong policy framework ensures long-term market stability"
  },
  {
    title: "Premium Electricity Rates",
    description: "Cyprus has among the highest electricity rates in EU (€0.32/kWh residential, €0.267/kWh commercial).",
    impact: "Higher electricity prices mean better PPA rates and investment returns"
  },
  {
    title: "EU Membership Benefits",
    description: "Stable regulatory environment, access to EU funding, and established legal framework.",
    impact: "Reduced investment risk and access to favorable financing"
  },
  {
    title: "Strategic Location",
    description: "Gateway between Europe, Asia, and Africa with growing energy demand.",
    impact: "Potential for energy export and regional market expansion"
  }
]

const competitiveAnalysis = [
  {
    company: "Local Cyprus Developers",
    strengths: ["Local market knowledge", "Established relationships"],
    weaknesses: ["Limited scale", "Higher costs", "Basic O&M"],
    marketShare: "35%"
  },
  {
    company: "European Utilities",
    strengths: ["Large capital", "EU experience"],
    weaknesses: ["Limited local presence", "Slow decision making"],
    marketShare: "25%"
  },
  {
    company: "Lighthief Cyprus",
    strengths: ["International expertise", "Local presence", "Full lifecycle", "Competitive pricing"],
    weaknesses: ["Newer market entrant"],
    marketShare: "15% (growing)"
  },
  {
    company: "Other International",
    strengths: ["Various specializations"],
    weaknesses: ["Limited local knowledge", "Higher costs"],
    marketShare: "25%"
  }
]

export default function CyprusMarketAnalysisArticle() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="cyprus" className="mb-4">Market Analysis</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Cyprus Solar Market Analysis
                <span className="block gradient-text">
                  2025 Investment Landscape
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Why Cyprus represents Europe's most compelling solar investment opportunity 
                with 3,300+ sunshine hours and ambitious government targets.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Lighthief Cyprus Market Research</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/1690376781153.jpg"
                alt="Cyprus solar market landscape"
                width={800}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Overview: Europe's Solar Goldmine</h2>
            
            <p className="text-gray-700 mb-6">
              Cyprus stands out as Europe's most underutilized solar market. Despite having the highest 
              solar irradiation levels in the EU, the island has achieved only 13.8% renewable energy 
              penetration compared to the EU average of 19.7%. This gap represents a massive investment 
              opportunity for forward-thinking investors.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {marketStats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.metric}</div>
                    <div className="font-semibold text-gray-900 mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-600 mb-2">{stat.description}</div>
                    <Badge variant="outline" className="text-xs">{stat.trend}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Investment Drivers</h2>
            
            <div className="space-y-6 mb-8">
              {investmentDrivers.map((driver, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{driver.title}</CardTitle>
                    <CardDescription>{driver.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 font-medium">
                        <strong>Investment Impact:</strong> {driver.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Market Dynamics</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Euro className="w-5 h-5 text-green-500 mr-2" />
                    Electricity Rates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Residential Rate</span>
                    <span className="font-semibold">€0.32/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commercial Rate</span>
                    <span className="font-semibold">€0.267/kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Typical PPA Rate</span>
                    <span className="font-semibold text-green-600">€0.15-0.25/kWh</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                    <p className="text-green-800 text-sm">
                      <strong>Advantage:</strong> High electricity rates create attractive PPA opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-cyprus-500 mr-2" />
                    Investment Returns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Typical ROI Range</span>
                    <span className="font-semibold">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback Period</span>
                    <span className="font-semibold">5-8 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25-Year NPV (5MW)</span>
                    <span className="font-semibold text-green-600">€12-20M</span>
                  </div>
                  <div className="bg-cyprus-50 border border-cyprus-200 rounded-lg p-3 mt-4">
                    <p className="text-cyprus-800 text-sm">
                      <strong>Result:</strong> Superior returns compared to traditional investments
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Competitive Landscape</h2>
            
            <div className="space-y-4 mb-8">
              {competitiveAnalysis.map((competitor, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{competitor.company}</h3>
                        <Badge variant="outline" className="text-xs">{competitor.marketShare}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-700 mb-2">Weaknesses</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li key={idx}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Market Share</h4>
                        <div className="text-lg font-bold gradient-text">{competitor.marketShare}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">2025 Market Outlook</h2>
            
            <p className="text-gray-700 mb-6">
              The Cyprus solar market is poised for significant expansion in 2025, driven by:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-solar-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Government Acceleration:</strong>
                  <span className="text-gray-700"> New fast-track permitting for projects over 1MW</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Euro className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">EU Funding:</strong>
                  <span className="text-gray-700"> €200M allocated for Cyprus renewable energy projects</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-cyprus-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Regional Integration:</strong>
                  <span className="text-gray-700"> EuroAsia Interconnector enabling energy export opportunities</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Opportunities in 2025</h2>
            
            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Gap Analysis</h3>
              <p className="text-gray-700 mb-4">
                To reach the 2030 target of 1,250 MW, Cyprus needs to add approximately 900 MW 
                of new solar capacity. This represents over €4.5 billion in investment opportunities.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">900 MW</div>
                  <div className="text-sm text-gray-600">Capacity Needed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">€4.5B</div>
                  <div className="text-sm text-gray-600">Investment Required</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">180+</div>
                  <div className="text-sm text-gray-600">New Projects Needed</div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cyprus Outperforms Other EU Markets</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cyprus Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Solar Resource:</strong> 40% higher irradiation than EU average</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Electricity Rates:</strong> Premium rates support better PPA terms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Market Gap:</strong> Significant room for growth vs other EU markets</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Regulatory:</strong> Stable EU framework with local incentives</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comparison with Other EU Markets</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Germany</span>
                    <span className="text-sm"><Badge variant="outline">Saturated, 8-12% ROI</Badge></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Spain</span>
                    <span className="text-sm"><Badge variant="outline">Competitive, 10-14% ROI</Badge></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Italy</span>
                    <span className="text-sm"><Badge variant="outline">Mature, 9-13% ROI</Badge></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Cyprus</span>
                    <span className="text-sm"><Badge variant="solar">Emerging, 15-20% ROI</Badge></span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Forecast: 2025-2030</h2>
            
            <p className="text-gray-700 mb-6">
              Based on current market trends, government policies, and EU directives, we project:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="w-8 h-8 text-solar-500 mx-auto mb-3" />
                  <div className="text-xl font-bold gradient-text mb-2">180 MW/year</div>
                  <div className="text-sm text-gray-600">Average annual additions needed</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Euro className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <div className="text-xl font-bold gradient-text">€900M/year</div>
                  <div className="text-sm text-gray-600">Annual investment opportunity</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 text-cyprus-500 mx-auto mb-3" />
                  <div className="text-xl font-bold gradient-text">15-20%</div>
                  <div className="text-sm text-gray-600">Projected ROI range</div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: The Cyprus Opportunity</h2>
            
            <p className="text-gray-700 mb-6">
              Cyprus represents a unique convergence of factors that create exceptional solar investment 
              opportunities: the EU's highest solar potential, significant market gap, supportive government 
              policies, and premium electricity rates.
            </p>

            <p className="text-gray-700 mb-8">
              For investors seeking diversified renewable energy exposure with superior returns, 
              Cyprus offers a compelling proposition that is unlikely to persist as the market matures. 
              The window for premium returns is open now, but won't remain indefinitely.
            </p>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Start Your Cyprus Solar Investment
              </h3>
              <p className="text-gray-700 mb-4">
                Explore current investment opportunities and calculate your potential returns 
                in Europe's most promising solar market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" asChild>
                  <Link href="/calculator">
                    Calculate Cyprus Solar ROI
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Schedule Market Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
