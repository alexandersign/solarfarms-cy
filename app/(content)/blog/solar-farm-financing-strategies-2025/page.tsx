import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Euro, TrendingUp, Calculator, Building, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Farm Financing Strategies 2025 | Maximize ROI with Smart Financing',
  description: 'Comprehensive guide to solar farm financing options in Cyprus. Bank loans, leverage strategies, and how to boost ROI from 18% to 45%+ with smart financing.',
  keywords: [
    'solar farm financing',
    'solar investment leverage',
    'Cyprus solar loans',
    'renewable energy financing',
    'maximize solar ROI',
  ],
}

const financingOptions = [
  {
    type: "Cash Purchase",
    downPayment: "100%",
    leverage: "None",
    typicalROI: "15-20%",
    riskLevel: "Low",
    advantages: [
      "Immediate full ownership",
      "No interest payments",
      "Maximum cash flow",
      "Simplified structure"
    ],
    considerations: [
      "High initial capital requirement",
      "Lower leverage benefits",
      "Opportunity cost of capital"
    ],
    bestFor: "Conservative investors with significant liquid assets"
  },
  {
    type: "70% Bank Financing",
    downPayment: "30%",
    leverage: "2.33x",
    typicalROI: "35-45%",
    riskLevel: "Medium",
    advantages: [
      "Reduced capital requirement",
      "Leverage amplifies returns",
      "Preserve liquidity",
      "Tax-deductible interest"
    ],
    considerations: [
      "Interest payment obligations",
      "Bank approval requirements",
      "Moderate financial risk"
    ],
    bestFor: "Growth-oriented investors seeking leverage",
    popular: true
  },
  {
    type: "80% Bank Financing",
    downPayment: "20%", 
    leverage: "5x",
    typicalROI: "50-70%",
    riskLevel: "Higher",
    advantages: [
      "Maximum leverage benefits",
      "Minimal capital requirement",
      "Highest potential returns",
      "Multiple project capability"
    ],
    considerations: [
      "Higher interest rates",
      "Stricter bank requirements",
      "Increased financial risk"
    ],
    bestFor: "Experienced investors with strong financials"
  }
]

const bankPartners = [
  {
    bank: "Bank of Cyprus",
    solarRate: "4.2-4.8%",
    maxLTV: "75%",
    term: "15 years",
    specialties: ["Large commercial projects", "Established relationships"]
  },
  {
    bank: "Hellenic Bank",
    solarRate: "4.5-5.0%", 
    maxLTV: "70%",
    term: "12 years",
    specialties: ["Fast approval process", "Competitive rates"]
  },
  {
    bank: "Alpha Bank Cyprus",
    solarRate: "4.3-4.9%",
    maxLTV: "80%",
    term: "15 years", 
    specialties: ["Green financing programs", "EU funding coordination"]
  },
  {
    bank: "Eurobank Cyprus",
    solarRate: "4.4-5.1%",
    maxLTV: "70%",
    term: "10 years",
    specialties: ["Quick decisions", "Flexible terms"]
  }
]

export default function SolarFinancingStrategiesArticle() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="solar" className="mb-4">Investment Strategy</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Solar Farm Financing Strategies
                <span className="block gradient-text">
                  Maximize ROI with Smart Leverage
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn how strategic financing can boost your solar farm ROI from 18% to 45%+ 
                while preserving capital for additional investments.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Alexander Papacosta, Business Development</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>9 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
                alt="Solar farm financing and investment strategies"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Financing Options Comparison */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Financing Options Comparison</h2>
            
            <p className="text-gray-700 mb-8">
              Understanding different financing structures is crucial for optimizing your solar investment returns. 
              Here's a comprehensive comparison of available options in Cyprus:
            </p>

            <div className="space-y-6 mb-12">
              {financingOptions.map((option, index) => (
                <Card key={index} className={`${option.popular ? 'border-2 border-solar-200' : ''} overflow-hidden`}>
                  <CardHeader className={option.popular ? 'bg-solar-50' : ''}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {option.type}
                          {option.popular && <Badge variant="solar" className="ml-3">Most Popular</Badge>}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <Badge variant="outline">{option.downPayment} Down</Badge>
                          <Badge variant="secondary">{option.leverage} Leverage</Badge>
                          <Badge variant={option.riskLevel === 'Low' ? 'secondary' : option.riskLevel === 'Medium' ? 'outline' : 'destructive'}>
                            {option.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">{option.typicalROI}</div>
                        <div className="text-sm text-gray-600">Typical ROI</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-3">Advantages</h4>
                        <ul className="space-y-1 text-sm">
                          {option.advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-3">Considerations</h4>
                        <ul className="space-y-1 text-sm">
                          {option.considerations.map((consideration, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600">{consideration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-cyprus-700 mb-3">Best For</h4>
                        <p className="text-sm text-gray-600">{option.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cyprus Bank Partners & Rates</h2>
            
            <p className="text-gray-700 mb-6">
              Lighthief Cyprus has established relationships with major Cyprus banks offering 
              competitive rates for solar farm financing:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {bankPartners.map((bank, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 text-cyprus-500 mr-2" />
                      {bank.bank}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Interest Rate:</span>
                        <div className="font-semibold text-green-600">{bank.solarRate}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Max LTV:</span>
                        <div className="font-semibold">{bank.maxLTV}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Term:</span>
                        <div className="font-semibold">{bank.term}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {bank.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Financing Example</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Case Study: 5MW Solar Farm with 70% Financing
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Investment Structure</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Total Project Cost: €5,250,000</li>
                    <li>Bank Loan (70%): €3,675,000</li>
                    <li>Cash Investment (30%): €1,575,000</li>
                    <li>Interest Rate: 4.5%</li>
                    <li>Loan Term: 15 years</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">Annual Returns</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Annual Revenue: €1,125,000</li>
                    <li>Operating Costs: €84,375</li>
                    <li>Loan Payments: €337,500</li>
                    <li>Net Profit: €703,125</li>
                    <li><strong>ROI on Cash: 44.7%</strong></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-900 font-semibold text-center">
                  Leverage increases ROI from 18.5% (cash) to 44.7% (financed) - a 141% improvement!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Optimize Your Solar Farm Financing
              </h3>
              <p className="text-gray-700 mb-4">
                Use our advanced calculator to compare financing options and find the optimal 
                structure for your investment goals and risk tolerance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" asChild>
                  <Link href="/calculator">
                    Try Financing Calculator
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Discuss Financing Options
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
