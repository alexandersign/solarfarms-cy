import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Investment Blog | Market Analysis & Investment Guides',
  description: 'Expert insights on Cyprus solar investments, market analysis, and investment strategies. Stay updated with the latest renewable energy trends.',
  keywords: [
    'solar investment blog',
    'Cyprus solar market',
    'renewable energy news',
    'solar farm investment guide',
    'market analysis',
  ],
}

export default function BlogPage() {
  const getCategoryColor = (category: string) => {
    const colors = {
      'market-analysis': 'bg-blue-100 text-blue-800',
      'investment-guide': 'bg-green-100 text-green-800',
      'technology': 'bg-purple-100 text-purple-800',
      'regulations': 'bg-orange-100 text-orange-800',
      'case-study': 'bg-cyan-100 text-cyan-800',
      'news': 'bg-red-100 text-red-800',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Solar Investment
              <span className="block gradient-text">
                Insights & Analysis
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert insights on Cyprus solar investments, market trends, and strategies 
              to maximize your renewable energy portfolio returns.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-padding">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-heading font-bold">Featured Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
                  alt="Importance of O&M for solar farms"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('operations-maintenance')}>operations-maintenance</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/importance-of-om-solar-farms">
                    Why O&M is Critical for Solar Farm Success
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Professional operations and maintenance can boost your solar farm ROI by 15% and extend asset life beyond 25 years.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Technical Team</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/importance-of-om-solar-farms"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/1690376781153.jpg"
                  alt="Cyprus solar market analysis"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('market-analysis')}>market-analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cyprus-solar-market-analysis-2025">
                    Cyprus Solar Market Analysis 2025
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Why Cyprus represents Europe's most compelling solar investment opportunity with 3,300+ sunshine hours and ambitious government targets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Market Research</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/cyprus-solar-market-analysis-2025"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt="2025 solar incentives Cyprus"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('regulations')}>policy-update</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/solar-incentives-cyprus-2025">
                    2025 Solar Incentives in Cyprus
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Complete guide to 2025 government incentives, EU funding, and policy updates supporting solar farm investments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Policy Team</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/solar-incentives-cyprus-2025"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-solar-100 to-cyprus-100 flex items-center justify-center">
                  <div className="text-6xl">💰</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('investment-guide')}>investment-strategy</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/solar-farm-financing-strategies-2025">
                    Solar Farm Financing Strategies 2025
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Learn how strategic financing can boost your solar farm ROI from 18% to 45%+ while preserving capital.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Alexander Papacosta</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/solar-farm-financing-strategies-2025"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-cyprus-100 to-solar-100 flex items-center justify-center">
                  <div className="text-6xl">🛡️</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('case-study')}>risk-management</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/risk-mitigation-solar-investments">
                    Risk Mitigation in Solar Investments
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Comprehensive strategies to protect your solar investment returns and minimize risks in renewable energy projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Risk Management</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/risk-mitigation-solar-investments"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <div className="text-6xl">🇪🇺</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('market-analysis')}>market-comparison</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cyprus-vs-eu-solar-markets">
                    Cyprus vs Other EU Solar Markets
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Detailed comparison of Cyprus solar investments vs Germany, Spain, Italy. Why Cyprus delivers superior returns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Research Team</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sep 11, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/cyprus-vs-eu-solar-markets"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Stay Updated with Solar Investment Insights
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get weekly market analysis and investment opportunities delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-solar-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}