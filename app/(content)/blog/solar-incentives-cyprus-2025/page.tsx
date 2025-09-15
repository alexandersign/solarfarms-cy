import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Euro, Gift, TrendingUp, FileText, Globe, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '2025 Solar Incentives Cyprus | Government Support for Solar Farms & Parks',
  description: 'Complete guide to 2025 solar incentives in Cyprus. Government support, EU funding, tax benefits, and policy updates for solar farm investments.',
  keywords: [
    'Cyprus solar incentives 2025',
    'solar farm subsidies Cyprus',
    'renewable energy incentives',
    'Cyprus government support',
    'EU solar funding Cyprus',
  ],
}

const incentivePrograms = [
  {
    title: "Fast-Track Permitting Program",
    type: "Regulatory Incentive",
    value: "Time Savings",
    description: "Accelerated permitting process for solar projects over 1MW",
    benefits: [
      "50% reduction in permitting timeline",
      "Dedicated government liaison",
      "Streamlined environmental assessments",
      "Priority grid connection reviews"
    ],
    eligibility: "Projects 1MW+ with confirmed financing",
    deadline: "Applications accepted year-round",
    impact: "6-12 months faster project completion"
  },
  {
    title: "EU Green Deal Funding",
    type: "Financial Incentive",
    value: "€200M Available",
    description: "European Union funding for renewable energy projects in Cyprus",
    benefits: [
      "Up to 30% project cost coverage",
      "Low-interest financing options",
      "Technical assistance grants",
      "Performance-based incentives"
    ],
    eligibility: "Projects contributing to 2030 targets",
    deadline: "December 31, 2025",
    impact: "Significant reduction in project costs"
  },
  {
    title: "Renewable Energy Tax Credits",
    type: "Tax Incentive",
    value: "20% Tax Credit",
    description: "Corporate tax credits for renewable energy investments",
    benefits: [
      "20% investment tax credit",
      "Accelerated depreciation (5 years)",
      "Reduced corporate tax rate (10%)",
      "Property tax exemptions"
    ],
    eligibility: "Cyprus-registered companies",
    deadline: "Ongoing through 2030",
    impact: "Improved after-tax returns"
  },
  {
    title: "Grid Connection Incentives",
    type: "Infrastructure Support",
    value: "Up to €100k",
    description: "Government support for grid connection infrastructure",
    benefits: [
      "Subsidized grid connection costs",
      "Priority transmission access",
      "Reduced interconnection fees",
      "Technical support services"
    ],
    eligibility: "Projects in designated zones",
    deadline: "Subject to annual budget",
    impact: "Lower initial investment requirements"
  }
]

const policyUpdates = [
  {
    date: "January 2025",
    title: "New Renewable Energy Strategy 2025-2030",
    description: "Cyprus government announced ambitious targets and supporting policies",
    keyPoints: [
      "1,250 MW solar capacity target by 2030",
      "€500M government investment commitment",
      "Simplified permitting procedures",
      "Enhanced grid infrastructure development"
    ]
  },
  {
    date: "March 2025",
    title: "EU State Aid Approval for Solar Support",
    description: "European Commission approved Cyprus solar support scheme",
    keyPoints: [
      "€300M approved for renewable energy support",
      "Feed-in tariff guarantees for 15 years",
      "Priority dispatch for renewable energy",
      "Grid stability support mechanisms"
    ]
  },
  {
    date: "June 2025",
    title: "Cyprus Energy Regulatory Authority Updates",
    description: "CERA introduced new regulations supporting large-scale solar development",
    keyPoints: [
      "Streamlined licensing for projects 5MW+",
      "Standardized grid connection procedures",
      "Performance-based incentive structures",
      "Long-term PPA framework establishment"
    ]
  }
]

const financialBenefits = [
  {
    category: "Direct Financial Support",
    incentives: [
      "Up to 30% EU grant funding",
      "20% investment tax credit",
      "Subsidized loan programs (2-3% interest)",
      "Grid connection cost sharing"
    ]
  },
  {
    category: "Tax Benefits",
    incentives: [
      "Accelerated depreciation (5 years)",
      "Reduced corporate tax rate (10%)",
      "Property tax exemptions",
      "VAT exemptions on equipment"
    ]
  },
  {
    category: "Revenue Enhancements",
    incentives: [
      "Premium feed-in tariff rates",
      "15-year rate guarantees",
      "Priority grid dispatch",
      "Green certificate trading"
    ]
  }
]

export default function SolarIncentivesCyprus2025Article() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="solar" className="mb-4">Policy Update</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                2025 Solar Incentives in Cyprus
                <span className="block gradient-text">
                  Government Support for Solar Farms
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive overview of 2025 government incentives, EU funding, and policy updates 
                supporting solar farm and solar park investments in Cyprus.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Lighthief Cyprus Policy Team</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>10 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                alt="Cyprus government solar incentives 2025"
                width={800}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Incentive Programs */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2025 Incentive Programs</h2>
            
            <p className="text-gray-700 mb-8">
              The Cyprus government has introduced comprehensive incentive programs to accelerate 
              solar farm development and achieve the 2030 renewable energy targets. Here are the 
              key programs available in 2025:
            </p>

            <div className="space-y-8 mb-12">
              {incentivePrograms.map((program, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-solar-50 to-cyprus-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{program.title}</CardTitle>
                        <CardDescription className="flex items-center mt-2">
                          <Badge variant="outline" className="mr-2">{program.type}</Badge>
                          <Badge variant="solar">{program.value}</Badge>
                        </CardDescription>
                      </div>
                      <Gift className="w-8 h-8 text-solar-500" />
                    </div>
                    <p className="text-gray-700 mt-4">{program.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Program Benefits:</h4>
                        <div className="space-y-2">
                          {program.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                          <p className="text-sm text-gray-600">{program.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Application Deadline:</h4>
                          <p className="text-sm text-gray-600">{program.deadline}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-800 text-sm font-medium">
                            <strong>Impact:</strong> {program.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Policy Updates</h2>
            
            <div className="space-y-6 mb-8">
              {policyUpdates.map((update, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Badge variant="cyprus" className="text-xs">{update.date}</Badge>
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                    </div>
                    <CardDescription>{update.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {update.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <FileText className="w-4 h-4 text-cyprus-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Benefits Summary</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {financialBenefits.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.incentives.map((incentive, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <Euro className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{incentive}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Maximize Incentive Benefits</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Action Steps for Investors</h3>
              <ol className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <strong className="text-green-800">Early Application:</strong>
                    <span className="text-green-700"> Submit applications early as some programs have limited funding</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <strong className="text-green-800">Professional Guidance:</strong>
                    <span className="text-green-700"> Work with experienced developers to navigate complex requirements</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <strong className="text-green-800">Compliance Focus:</strong>
                    <span className="text-green-700"> Ensure all environmental and technical requirements are met</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <strong className="text-green-800">Strategic Timing:</strong>
                    <span className="text-green-700"> Align project timeline with incentive program schedules</span>
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact on Investment Returns</h2>
            
            <p className="text-gray-700 mb-6">
              The combination of available incentives can significantly improve solar farm investment returns:
            </p>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5MW Solar Farm Example with Incentives</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Without Incentives</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Total Investment: €5,250,000</li>
                    <li>Annual Revenue: €1,125,000</li>
                    <li>ROI: 18.5%</li>
                    <li>25-Year NPV: €16.5M</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">With 2025 Incentives</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Net Investment: €3,675,000 (30% EU grant)</li>
                    <li>Annual Revenue: €1,125,000</li>
                    <li>ROI: 26.4% (+7.9%)</li>
                    <li>25-Year NPV: €22.1M (+€5.6M)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-900 font-semibold text-center">
                  Result: €5.6M additional value from utilizing available incentives!
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Process & Timeline</h2>
            
            <p className="text-gray-700 mb-6">
              To maximize incentive benefits, follow this strategic application timeline:
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-solar-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <strong className="text-gray-900">Months 1-2:</strong> Initial applications for EU funding and fast-track permitting
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-cyprus-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <strong className="text-gray-900">Months 3-4:</strong> Complete environmental assessments and technical documentation
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <strong className="text-gray-900">Months 5-6:</strong> Finalize approvals and begin construction with incentive benefits
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Act Now for Maximum Benefits</h2>
            
            <p className="text-gray-700 mb-6">
              The 2025 incentive landscape for Cyprus solar farms is the most favorable it has ever been. 
              The combination of EU funding, government support, and tax benefits can add millions to 
              your investment returns.
            </p>

            <p className="text-gray-700 mb-8">
              However, many of these programs have limited funding or application deadlines. 
              Early action is essential to secure maximum benefits for your solar farm investment.
            </p>

            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 border border-solar-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Your 2025 Incentives
              </h3>
              <p className="text-gray-700 mb-4">
                Our team specializes in maximizing incentive benefits for solar farm investors. 
                Let us help you navigate the application process and secure maximum support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" asChild>
                  <Link href="/contact">
                    Schedule Incentive Consultation
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/services/licensing">
                    Learn About Permitting Services
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
