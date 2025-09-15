import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, TrendingUp, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why O&M is Critical for Solar Farm Success | Maximize ROI with Professional Maintenance',
  description: 'Discover why professional O&M services are essential for solar farm success. Learn how proper maintenance can boost ROI by 15% and extend asset life.',
  keywords: [
    'solar farm O&M',
    'solar maintenance importance',
    'solar farm operations',
    'maximize solar ROI',
    'solar asset management',
  ],
}

const omBenefits = [
  {
    title: "Performance Optimization",
    impact: "5-15% yield increase",
    description: "Regular maintenance and cleaning can improve energy production by 5-15%, directly impacting your investment returns."
  },
  {
    title: "Extended Asset Life",
    impact: "25+ years operation",
    description: "Proper maintenance extends equipment life beyond warranty periods, maximizing long-term investment value."
  },
  {
    title: "Risk Mitigation",
    impact: "99.5% uptime",
    description: "Proactive monitoring and maintenance prevent costly failures and revenue loss from system downtime."
  },
  {
    title: "Warranty Protection",
    impact: "Full warranty coverage",
    description: "Professional O&M ensures warranty compliance and maximizes manufacturer coverage benefits."
  }
]

const costOfPoorOM = [
  {
    issue: "Soiling and Dust Accumulation",
    impact: "10-25% production loss",
    cost: "€20,000-50,000 annually",
    solution: "Regular cleaning and monitoring"
  },
  {
    issue: "Component Failures",
    impact: "Complete system downtime",
    cost: "€50,000-200,000 per incident",
    solution: "Preventive maintenance and early detection"
  },
  {
    issue: "Inverter Issues",
    impact: "30-100% production loss",
    cost: "€100,000+ replacement costs",
    solution: "Regular servicing and monitoring"
  },
  {
    issue: "Grid Connection Problems",
    impact: "Total revenue loss",
    cost: "€500-2,000 per day",
    solution: "Professional electrical maintenance"
  }
]

export default function OMImportanceArticle() {
  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="cyprus" className="mb-4">Operations & Maintenance</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Why O&M is Critical for
                <span className="block gradient-text">
                  Solar Farm Success
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional operations and maintenance can boost your solar farm ROI by 15% 
                and extend asset life beyond 25 years. Here's why it matters.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>September 11, 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Lighthief Cyprus Technical Team</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
                alt="Professional solar farm maintenance"
                width={800}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Hidden Cost of Neglecting Solar Farm Maintenance</h2>
              
              <p className="text-gray-700 mb-6">
                When investors evaluate solar farm opportunities, they often focus on initial construction costs, 
                land acquisition, and projected energy yields. However, one critical factor that can make or break 
                the long-term success of a solar investment is often overlooked: professional operations and 
                maintenance (O&M) services.
              </p>

              <p className="text-gray-700 mb-8">
                In Cyprus's unique climate, with over 3,300 hours of sunshine annually but also significant 
                dust and seasonal weather challenges, proper O&M becomes even more crucial for maintaining 
                optimal performance and protecting your investment.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Financial Impact of Professional O&M</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {omBenefits.map((benefit, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        <Badge variant="solar" className="text-xs">{benefit.impact}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Example: 5MW Solar Farm in Cyprus</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Case Study: Professional O&M vs. Minimal Maintenance</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">✓ With Professional O&M</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Annual revenue: €1,125,000</li>
                      <li>• O&M cost: €28,125 (2.5%)</li>
                      <li>• Net profit: €1,096,875</li>
                      <li>• 25-year NPV: €16.5M</li>
                      <li>• System availability: 99.5%</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-800 mb-3">✗ Minimal Maintenance</h4>
                    <ul className="space-y-2 text-sm text-red-700">
                      <li>• Annual revenue: €950,000 (15% loss)</li>
                      <li>• Emergency repairs: €50,000</li>
                      <li>• Net profit: €900,000</li>
                      <li>• 25-year NPV: €12.8M</li>
                      <li>• System availability: 85%</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                  <p className="text-blue-900 font-semibold">
                    Result: Professional O&M adds €3.7M in 25-year NPV value - a 23% improvement in total returns!
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Cost of Poor Maintenance</h2>
              
              <p className="text-gray-700 mb-6">
                Understanding what can go wrong helps illustrate why professional O&M is essential:
              </p>

              <div className="space-y-6 mb-8">
                {costOfPoorOM.map((cost, index) => (
                  <Card key={index} className="border-red-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{cost.issue}</h3>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-red-600">Impact:</span>
                              <p className="text-gray-600">{cost.impact}</p>
                            </div>
                            <div>
                              <span className="font-medium text-red-600">Annual Cost:</span>
                              <p className="text-gray-600">{cost.cost}</p>
                            </div>
                            <div>
                              <span className="font-medium text-green-600">Solution:</span>
                              <p className="text-gray-600">{cost.solution}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cyprus-Specific O&M Considerations</h2>
              
              <p className="text-gray-700 mb-6">
                Cyprus's Mediterranean climate presents unique challenges and opportunities for solar farm operations:
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Climate Challenges</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Dust and Sand:</strong> Saharan dust events can reduce output by 20-30%</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>High Temperatures:</strong> Summer heat can reduce panel efficiency</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Salt Air:</strong> Coastal locations require corrosion protection</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Climate Advantages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Consistent Sun:</strong> 3,300+ hours annually for predictable output</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Mild Winters:</strong> Year-round accessibility for maintenance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700"><strong>Low Extreme Weather:</strong> Minimal storm damage risk</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Lighthief Cyprus O&M Advantage</h2>
              
              <p className="text-gray-700 mb-6">
                Our comprehensive O&M services are specifically designed for Cyprus conditions, 
                combining international best practices with local expertise:
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Our O&M Results</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-700">99.7%</div>
                    <div className="text-sm text-green-600">Average Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">12%</div>
                    <div className="text-sm text-green-600">Performance Improvement</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">18h</div>
                    <div className="text-sm text-green-600">Average Response Time</div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: O&M as Investment Protection</h2>
              
              <p className="text-gray-700 mb-6">
                Professional O&M is not an expense—it's an investment protection strategy that can add 
                millions to your 25-year returns. For a 5MW solar farm in Cyprus, the difference between 
                professional and minimal maintenance can be €3.7M in additional NPV.
              </p>

              <p className="text-gray-700 mb-8">
                When evaluating solar farm investments, always factor in professional O&M services. 
                The 2.5% annual cost is more than offset by the 15%+ performance improvements and 
                risk mitigation benefits.
              </p>

              <div className="bg-solar-50 border border-solar-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-solar-900 mb-4">
                  Ready to Protect Your Solar Investment?
                </h3>
                <p className="text-solar-800 mb-4">
                  Learn how Lighthief Cyprus O&M services can maximize your solar farm performance 
                  and protect your investment returns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="solar" asChild>
                    <Link href="/services/om">
                      Explore O&M Services
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Schedule O&M Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link href="/blog/cyprus-solar-market-analysis-2025" className="hover:text-solar-600">
                      Cyprus Solar Market Analysis 2025
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive analysis of the Cyprus solar investment landscape and opportunities.
                  </p>
                  <Badge variant="outline" className="text-xs">Market Analysis</Badge>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link href="/blog/solar-incentives-cyprus-2025" className="hover:text-solar-600">
                      2025 Solar Incentives in Cyprus
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Latest government incentives and policy updates for solar farm investments.
                  </p>
                  <Badge variant="outline" className="text-xs">Policy Update</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
