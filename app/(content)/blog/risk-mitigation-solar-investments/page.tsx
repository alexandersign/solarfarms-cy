import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Shield, AlertTriangle, CheckCircle, TrendingDown, Umbrella } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Risk Mitigation in Solar Farm Investments | Protect Your Renewable Energy ROI',
  description: 'Comprehensive guide to managing risks in solar farm investments. Insurance, warranties, diversification strategies, and how to protect your renewable energy returns.',
  keywords: [
    'solar investment risks',
    'renewable energy risk management',
    'solar farm insurance',
    'investment protection strategies',
    'solar risk mitigation',
  ],
}

const riskCategories = [
  {
    category: "Technical Risks",
    icon: AlertTriangle,
    color: "red",
    risks: [
      {
        risk: "Equipment Failure",
        probability: "Medium",
        impact: "High",
        mitigation: "Tier 1 equipment, extended warranties, preventive maintenance"
      },
      {
        risk: "Performance Degradation",
        probability: "Low",
        impact: "Medium", 
        mitigation: "Performance guarantees, quality components, professional O&M"
      },
      {
        risk: "Grid Connection Issues",
        probability: "Low",
        impact: "High",
        mitigation: "Professional electrical design, utility partnerships"
      }
    ]
  },
  {
    category: "Financial Risks",
    icon: TrendingDown,
    color: "orange",
    risks: [
      {
        risk: "Electricity Rate Changes",
        probability: "Medium",
        impact: "Medium",
        mitigation: "Long-term PPAs, diversified revenue streams"
      },
      {
        risk: "Interest Rate Increases",
        probability: "Medium",
        impact: "Medium",
        mitigation: "Fixed-rate financing, conservative leverage"
      },
      {
        risk: "Currency Fluctuation",
        probability: "Low",
        impact: "Low",
        mitigation: "EUR-denominated investments within EU"
      }
    ]
  },
  {
    category: "Regulatory Risks",
    icon: FileText,
    color: "blue",
    risks: [
      {
        risk: "Policy Changes",
        probability: "Low",
        impact: "Medium",
        mitigation: "EU framework stability, established regulations"
      },
      {
        risk: "Permit Delays",
        probability: "Medium",
        impact: "Medium",
        mitigation: "Professional permitting services, early applications"
      },
      {
        risk: "Grid Access Changes",
        probability: "Low",
        impact: "High",
        mitigation: "Secured grid connection agreements"
      }
    ]
  },
  {
    category: "Environmental Risks",
    icon: Umbrella,
    color: "green",
    risks: [
      {
        risk: "Weather Extremes",
        probability: "Low",
        impact: "Medium",
        mitigation: "Insurance coverage, robust design standards"
      },
      {
        risk: "Natural Disasters",
        probability: "Very Low",
        impact: "High",
        mitigation: "Comprehensive insurance, geographic diversification"
      },
      {
        risk: "Climate Change",
        probability: "Low",
        impact: "Low",
        mitigation: "Conservative projections, adaptive management"
      }
    ]
  }
]

const mitigationStrategies = [
  {
    strategy: "Insurance Coverage",
    description: "Comprehensive insurance policies protecting against various risks",
    coverage: [
      "Property damage and business interruption",
      "Performance and revenue protection", 
      "Professional liability and errors & omissions",
      "Environmental liability coverage"
    ],
    cost: "0.3-0.8% of project value annually"
  },
  {
    strategy: "Performance Guarantees",
    description: "Contractual guarantees ensuring minimum performance levels",
    coverage: [
      "25-year equipment performance warranties",
      "Energy yield guarantees with compensation",
      "Availability and uptime guarantees",
      "O&M service level agreements"
    ],
    cost: "Included in equipment and service contracts"
  },
  {
    strategy: "Financial Hedging",
    description: "Financial instruments to protect against market risks",
    coverage: [
      "Long-term power purchase agreements",
      "Fixed-rate financing arrangements",
      "Currency hedging (if applicable)",
      "Interest rate protection"
    ],
    cost: "0.1-0.5% of revenue annually"
  },
  {
    strategy: "Diversification",
    description: "Portfolio diversification to spread and reduce overall risk",
    coverage: [
      "Multiple project locations",
      "Different project sizes and types",
      "Varied completion timelines",
      "Mixed financing structures"
    ],
    cost: "Opportunity cost of concentration"
  }
]

export default function RiskMitigationSolarInvestmentsArticle() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="cyprus" className="mb-4">Risk Management</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Risk Mitigation in
                <span className="block gradient-text">
                  Solar Farm Investments
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive strategies to protect your solar investment returns and 
                minimize risks in renewable energy projects.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Lighthief Cyprus Risk Management</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>11 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/1690376781153.jpg"
                alt="Solar investment risk management"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Solar Investment Risks</h2>
            
            <p className="text-gray-700 mb-8">
              While solar farm investments offer attractive returns, understanding and mitigating 
              risks is essential for protecting your investment. Here's a comprehensive breakdown 
              of potential risks and mitigation strategies:
            </p>

            <div className="space-y-8 mb-12">
              {riskCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <category.icon className={`w-6 h-6 text-${category.color}-500 mr-3`} />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.risks.map((riskItem, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-4 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{riskItem.risk}</h4>
                            </div>
                            <div className="text-center">
                              <Badge variant={riskItem.probability === 'Low' ? 'secondary' : riskItem.probability === 'Medium' ? 'outline' : 'destructive'} className="text-xs">
                                {riskItem.probability}
                              </Badge>
                              <div className="text-xs text-gray-500 mt-1">Probability</div>
                            </div>
                            <div className="text-center">
                              <Badge variant={riskItem.impact === 'Low' ? 'secondary' : riskItem.impact === 'Medium' ? 'outline' : 'destructive'} className="text-xs">
                                {riskItem.impact}
                              </Badge>
                              <div className="text-xs text-gray-500 mt-1">Impact</div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">{riskItem.mitigation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Mitigation Strategies</h2>
            
            <div className="space-y-6 mb-8">
              {mitigationStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 text-green-500 mr-2" />
                      {strategy.strategy}
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Coverage Areas:</h4>
                        <div className="space-y-2">
                          {strategy.coverage.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Typical Cost:</h4>
                        <Badge variant="outline" className="text-xs">{strategy.cost}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lighthief Cyprus Risk Management</h2>
            
            <p className="text-gray-700 mb-6">
              At Lighthief Cyprus, we implement comprehensive risk management strategies for all our projects:
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Our Risk Management Approach</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Tier 1 Equipment:</strong> Only premium components with proven track records</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Comprehensive Insurance:</strong> Full coverage including performance protection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Professional O&M:</strong> 24/7 monitoring and preventive maintenance</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Long-term PPAs:</strong> Secured revenue streams with credit-worthy offtakers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Regulatory Expertise:</strong> Full compliance and permit security</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800"><strong>Financial Transparency:</strong> Regular reporting and performance tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Protect Your Solar Investment
              </h3>
              <p className="text-gray-700 mb-4">
                Learn how our comprehensive risk management approach protects your investment 
                and ensures consistent returns over the 25+ year project life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" asChild>
                  <Link href="/services">
                    Explore Our Services
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Risk Assessment Consultation
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
