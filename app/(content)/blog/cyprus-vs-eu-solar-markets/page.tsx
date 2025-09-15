import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Globe, TrendingUp, Euro, Sun, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cyprus vs Other EU Solar Markets | Why Cyprus Offers Superior Returns',
  description: 'Detailed comparison of Cyprus solar investments vs Germany, Spain, Italy. Why Cyprus delivers 15-20% ROI while other EU markets offer 8-14%.',
  keywords: [
    'Cyprus vs EU solar markets',
    'European solar investment comparison',
    'best EU solar returns',
    'Cyprus solar advantages',
    'European renewable energy markets',
  ],
}

const marketComparison = [
  {
    country: "Cyprus",
    flag: "🇨🇾",
    solarIrradiation: "1,800",
    typicalROI: "15-20%",
    marketMaturity: "Emerging",
    advantages: ["Highest EU solar potential", "Premium electricity rates", "Government support", "EU stability"],
    challenges: ["Smaller market size", "Limited local expertise"],
    investmentRange: "€900K-€12M",
    featured: true
  },
  {
    country: "Germany", 
    flag: "🇩🇪",
    solarIrradiation: "1,200",
    typicalROI: "8-12%",
    marketMaturity: "Saturated",
    advantages: ["Large market", "Established infrastructure", "Technical expertise"],
    challenges: ["Low irradiation", "Market saturation", "Declining incentives"],
    investmentRange: "€5M-€50M"
  },
  {
    country: "Spain",
    flag: "🇪🇸", 
    solarIrradiation: "1,700",
    typicalROI: "10-14%",
    marketMaturity: "Mature",
    advantages: ["Good solar resource", "Large market", "Experience"],
    challenges: ["High competition", "Regulatory complexity", "Grid constraints"],
    investmentRange: "€2M-€100M"
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    solarIrradiation: "1,500", 
    typicalROI: "9-13%",
    marketMaturity: "Mature",
    advantages: ["Established market", "Good incentives", "Infrastructure"],
    challenges: ["Bureaucracy", "Grid limitations", "Regional variations"],
    investmentRange: "€1M-€50M"
  },
  {
    country: "Greece",
    flag: "🇬🇷",
    solarIrradiation: "1,600",
    typicalROI: "11-15%",
    marketMaturity: "Growing",
    advantages: ["Good solar resource", "Growing market", "EU support"],
    challenges: ["Economic uncertainty", "Regulatory changes", "Grid issues"],
    investmentRange: "€500K-€20M"
  }
]

const detailedAnalysis = [
  {
    metric: "Solar Resource Quality",
    cyprus: "1,800 kWh/m²/year",
    cyprusRank: "1st in EU",
    comparison: "40% higher than EU average",
    impact: "Higher energy yields = better returns"
  },
  {
    metric: "Market Saturation",
    cyprus: "13.8% renewable penetration",
    cyprusRank: "Significant growth potential", 
    comparison: "vs 19.7% EU average",
    impact: "Less competition, better opportunities"
  },
  {
    metric: "Electricity Rates",
    cyprus: "€0.267/kWh commercial",
    cyprusRank: "Among highest in EU",
    comparison: "vs €0.21/kWh EU average",
    impact: "Premium PPA rates possible"
  },
  {
    metric: "Regulatory Stability",
    cyprus: "EU member, stable framework",
    cyprusRank: "Excellent",
    comparison: "Same as other EU markets",
    impact: "Low regulatory risk"
  }
]

export default function CyprusVsEUSolarMarketsArticle() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="solar" className="mb-4">Market Comparison</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Cyprus vs Other EU
                <span className="block gradient-text">
                  Solar Markets
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Detailed analysis of why Cyprus offers superior solar investment returns 
                compared to established European markets like Germany, Spain, and Italy.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Lighthief Cyprus Research Team</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>13 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
                alt="European solar market comparison"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Market Comparison */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">European Solar Market Comparison</h2>
            
            <div className="space-y-6 mb-12">
              {marketComparison.map((market, index) => (
                <Card key={index} className={`${market.featured ? 'border-2 border-solar-200 bg-solar-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{market.flag}</span>
                        <div>
                          <CardTitle className="text-xl">{market.country}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={market.featured ? "solar" : "outline"} className="text-xs">
                              {market.marketMaturity}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {market.solarIrradiation} kWh/m²/year
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${market.featured ? 'gradient-text' : 'text-gray-700'}`}>
                          {market.typicalROI}
                        </div>
                        <div className="text-sm text-gray-600">Typical ROI</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Advantages</h4>
                        <ul className="space-y-1 text-sm">
                          {market.advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">Challenges</h4>
                        <ul className="space-y-1 text-sm">
                          {market.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Investment Range</h4>
                        <p className="text-sm text-gray-600">{market.investmentRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Performance Analysis</h2>
            
            <div className="space-y-6 mb-8">
              {detailedAnalysis.map((analysis, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{analysis.metric}</h3>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold gradient-text">{analysis.cyprus}</div>
                        <div className="text-xs text-gray-600">Cyprus</div>
                      </div>
                      <div className="text-center">
                        <Badge variant="solar" className="text-xs">{analysis.cyprusRank}</Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{analysis.comparison}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{analysis.impact}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Cyprus Outperforms</h2>
            
            <div className="bg-gradient-to-r from-cyprus-50 to-solar-50 border border-cyprus-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Cyprus Advantage</h3>
              <p className="text-gray-700 mb-6">
                Cyprus combines the best elements of European markets while avoiding their limitations:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✓ What Cyprus Has</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• EU's highest solar irradiation (1,800 kWh/m²/year)</li>
                    <li>• Premium electricity rates supporting better PPAs</li>
                    <li>• Significant market gap (only 13.8% renewable)</li>
                    <li>• Stable EU regulatory framework</li>
                    <li>• Government support and fast-track permitting</li>
                    <li>• Lower competition vs mature markets</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3">✗ What Cyprus Avoids</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Market saturation (like Germany)</li>
                    <li>• Declining incentives (like mature markets)</li>
                    <li>• Grid constraints (like Spain/Italy)</li>
                    <li>• Regulatory uncertainty (like some markets)</li>
                    <li>• Low irradiation (like Northern EU)</li>
                    <li>• Intense competition driving down returns</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Recommendation</h2>
            
            <p className="text-gray-700 mb-6">
              For investors seeking optimal risk-adjusted returns in European solar markets, 
              Cyprus presents a compelling opportunity that combines:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <Sun className="w-5 h-5 text-solar-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Superior Solar Resource:</strong>
                  <span className="text-gray-700"> 40% higher irradiation than EU average</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Higher Returns:</strong>
                  <span className="text-gray-700"> 15-20% ROI vs 8-14% in mature markets</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-cyprus-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Growth Potential:</strong>
                  <span className="text-gray-700"> Significant room for expansion vs saturated markets</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">EU Stability:</strong>
                  <span className="text-gray-700"> Same regulatory protection as other EU markets</span>
                </div>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Explore Cyprus Solar Opportunities
              </h3>
              <p className="text-gray-700 mb-4">
                Discover why leading European investors are choosing Cyprus for their 
                renewable energy portfolios and superior investment returns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" asChild>
                  <Link href="/calculator">
                    Compare Cyprus ROI
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
