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
            {/* NEW - Why BESS No Longer Optional */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-red-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/bess-no-longer-optional-cyprus.png"
                  alt="Why BESS is no longer optional for RES projects in Cyprus"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">MUST READ</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">NEW</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">Market Reality</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">BESS</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/why-bess-no-longer-optional-res-cyprus">
                    Why BESS Is No Longer Optional for RES Projects in Cyprus
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  47% curtailment, €77/MWh midday prices, and €893K annual losses per 5MW park. The data says it all — solar without BESS is no longer viable.
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
                      <span>Feb 13, 2026</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/why-bess-no-longer-optional-res-cyprus"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* NEW - BESS Bankability Article */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-emerald-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/IMG_0149.JPG"
                  alt="BESS Bankability and Choosing the Right Service Partner"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white">BANKABILITY</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">NEW</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Investment Guide</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">BESS</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-bankability-choosing-right-service-partner">
                    BESS Bankability: Why the Right Service Partner Makes or Breaks Your Investment
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Why Cyprus's isolated grid is entering a BESS cycle, and how Tier-1 OEM partnerships and multi-layered insurance make BESS assets bankable investments.
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
                      <span>Feb 10, 2026</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/bess-bankability-choosing-right-service-partner"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* NEW - Solar Bitcoin Mining Case Study */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt="Solar Bitcoin Mining in Cyprus"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">CRYPTO</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">NEW</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Case Study</Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Bitcoin</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/solar-bitcoin-mining-cyprus-case-study">
                    Solar Bitcoin Mining in Cyprus: 5MW Case Study
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  How a 5MW park generates BTC from curtailed energy. Analysis with/without BESS, 8% tax advantage, and off-grid solutions.
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
                      <span>Jan 8, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/solar-bitcoin-mining-cyprus-case-study"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* NEW - AI GPU Mining Article */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-purple-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/solar-park-field-unsplash.jpg"
                  alt="AI GPU Mining with Solar Energy"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500 text-white">AI</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">NEW</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Industry Analysis</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">GPU Mining</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/ai-gpu-mining-renewable-energy-cyprus">
                    AI GPU Mining: The Off-Grid Solar Opportunity
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Global AI power demand is exploding. How Cyprus solar parks can become green compute centers.
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
                      <span>Jan 8, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/ai-gpu-mining-renewable-energy-cyprus"
                    className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Curtailment Crisis Blog Post */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-red-200">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src="/images/IMG_0149.JPG"
                  alt="Cyprus Curtailment Crisis and BESS Solution"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive">CRITICAL TREND</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">NEW</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getCategoryColor('market-analysis')}>Market Alert</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">BESS</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cyprus-curtailment-crisis-bess-solution">
                    Cyprus Curtailment Crisis: The BESS Solution
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  Curtailment surged from 0% to 45.8% in 4 years. Learn how Battery Storage protects your solar investment ROI.
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
                      <span>Nov 26, 2025</span>
                    </div>
                  </div>
                  <Link 
                    href="/blog/cyprus-curtailment-crisis-bess-solution"
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
                  src="/images/solar-park-field-unsplash.jpg"
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
                  <Badge variant="secondary" className={getCategoryColor('operations-maintenance')}>Operations & Maintenance</Badge>
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
                  <Badge variant="secondary" className={getCategoryColor('market-analysis')}>Market Analysis</Badge>
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
                  <Badge variant="secondary" className={getCategoryColor('regulations')}>Policy Update</Badge>
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
                  <Badge variant="secondary" className={getCategoryColor('investment-guide')}>Investment Strategy</Badge>
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
                  <Badge variant="secondary" className={getCategoryColor('case-study')}>Risk Management</Badge>
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
                  <Badge variant="secondary" className={getCategoryColor('market-analysis')}>Market Comparison</Badge>
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

      {/* BESS Investment Series */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-2">BESS Investment Series</h2>
            <p className="text-lg text-gray-600">Comprehensive guides to battery energy storage for PV park owners, investors, and project developers.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Investor's Guide */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/investors-guide-battery-energy-storage">The Investor&apos;s Guide to Battery Energy Storage</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">What BESS means for your solar park&apos;s revenue, grid connection, and asset valuation. Written for PV park owners, not hobbyists.</CardDescription>
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
                      <span>Mar 2, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/investors-guide-battery-energy-storage" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 2. BESS Costs 2026 */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-amber-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-costs-2026-capex-breakdown">Understanding BESS Costs in 2026: CAPEX Breakdown</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Beyond the headline &euro;/MWh figure — every line item from CIF container pricing to civil works, EMS, insurance, and import duties.</CardDescription>
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
                      <span>Mar 9, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-costs-2026-capex-breakdown" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 3. LFP vs NMC */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-purple-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Technology</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/lfp-vs-nmc-utility-scale-bess">LFP vs NMC for Utility-Scale BESS</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Why we chose LFP for all 881 MWh across 51 parks — cycle life economics, fire safety, and insurance implications.</CardDescription>
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
                      <span>Mar 16, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/lfp-vs-nmc-utility-scale-bess" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 4. Island Grid Economics */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-sky-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Market Analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/island-grid-economics-cyprus-bess">Island Grid Economics: Why Cyprus BESS Is Different</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Zero interconnection means higher curtailment, wider price spreads, and stronger BESS economics than mainland Europe.</CardDescription>
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
                      <span>Mar 23, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/island-grid-economics-cyprus-bess" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 5. BESS Sizing */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-emerald-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Technology</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-sizing-solar-farms">BESS Sizing for Solar Farms</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">How to match storage capacity to your park&apos;s revenue potential using real curtailment data and grid constraints.</CardDescription>
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
                      <span>Mar 30, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-sizing-solar-farms" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 6. Peak Shaving vs Energy Arbitrage */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-green-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/peak-shaving-vs-energy-arbitrage-cyprus">Peak Shaving vs Energy Arbitrage in Cyprus</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Two revenue models compared with real Cyprus pricing — &euro;77/MWh midday vs &euro;186/MWh evening.</CardDescription>
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
                      <span>Apr 13, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/peak-shaving-vs-energy-arbitrage-cyprus" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 7. BESS Insurance and Risk */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-red-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">Risk Management</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-insurance-risk-lenders">BESS Insurance and Risk: What Lenders Look For</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Insurance is the overlooked gatekeeper of bankability. What insurers assess and how it affects your project finance.</CardDescription>
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
                      <span>Apr 27, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-insurance-risk-lenders" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 8. Cyprus BESS Regulations vs Europe */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-slate-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Regulations</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cyprus-bess-regulatory-framework-europe">Cyprus BESS Regulations vs Europe</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Permitting, grid connection, and market access rules compared across Cyprus, Germany, Spain, Italy, Greece, and the UK.</CardDescription>
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
                      <span>May 11, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/cyprus-bess-regulatory-framework-europe" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 9. Curtailed Energy Revenue Recovery */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-amber-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Market Analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/curtailed-energy-revenue-recovery-cyprus">Curtailed Energy Is Not Lost Energy</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">306 GWh curtailed in 2025, worth &euro;58M. Three proven strategies to recover this revenue for your PV park.</CardDescription>
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
                      <span>May 25, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/curtailed-energy-revenue-recovery-cyprus" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 10. EMS and SCADA */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-violet-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Technology</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/ems-scada-bess-revenue">EMS and SCADA: Why Your Software Determines Revenue</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">A well-configured EMS generates 20-40% more revenue from the same BESS hardware. Here&apos;s what matters.</CardDescription>
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
                      <span>Jun 8, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/ems-scada-bess-revenue" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 11. Cost of NOT Adding BESS */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-emerald-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cost-of-not-adding-bess-financial-model">The Real Cost of NOT Adding BESS: 10-Year Model</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">PV-only vs PV+BESS over 10 years with real Cyprus data. The crossover point might surprise you.</CardDescription>
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
                      <span>Jun 22, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/cost-of-not-adding-bess-financial-model" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 12. BESS Fire Safety */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-red-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Technology</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-fire-safety-thermal-management">BESS Fire Safety and Thermal Management</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Deploying 251 containers in 45&deg;C Cyprus summers. Thermal management, fire suppression, and engineering decisions.</CardDescription>
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
                      <span>Jul 6, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-fire-safety-thermal-management" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 13. BESS Warranties and Performance Bonds */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-warranties-guarantees-checklist">BESS Warranties and Performance Bonds Checklist</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Capacity warranties, availability guarantees, performance bonds, and LTSA structures — with our exact terms.</CardDescription>
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
                      <span>Jul 20, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-warranties-guarantees-checklist" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 14. From Container Ship to Grid Connection */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-cyan-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">Case Study</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-installation-container-to-grid">From Container Ship to Grid Connection</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Every phase of utility-scale BESS installation — factory to commissioning — based on our 51-park deployment.</CardDescription>
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
                      <span>Aug 3, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-installation-container-to-grid" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 15. Group Procurement */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-yellow-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Investment Guide</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/bess-group-procurement-cost-savings">Group Procurement: 15-20% BESS Cost Savings</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">How aggregating 51 parks into one 881 MWh order achieves Tier-1 OEM pricing no individual buyer can access.</CardDescription>
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
                      <span>Aug 17, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/bess-group-procurement-cost-savings" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 16. Cyprus Energy Storage Roadmap */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-teal-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Market Analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/cyprus-energy-storage-roadmap-2027-2030">Cyprus Energy Storage Roadmap: 2027-2030</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">From curtailment recovery to grid services and the EuroAsia Interconnector — the BESS landscape through 2030.</CardDescription>
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
                      <span>Aug 31, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/cyprus-energy-storage-roadmap-2027-2030" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 17. Virtual Power Plants */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-indigo-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Market Analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/virtual-power-plants-island-grids">Virtual Power Plants on Island Grids</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">How aggregated BESS capacity could participate in balancing markets, ancillary services, and synthetic inertia.</CardDescription>
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
                      <span>Sep 14, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/virtual-power-plants-island-grids" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 18. DC-Coupled vs AC-Coupled */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-orange-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Technology</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/dc-coupled-vs-ac-coupled-bess">DC-Coupled vs AC-Coupled BESS for PV Parks</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">Which architecture maximises revenue when retrofitting BESS onto existing solar parks? We analyse both.</CardDescription>
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
                      <span>Sep 28, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/dc-coupled-vs-ac-coupled-bess" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 19. EuroAsia Interconnector */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Market Analysis</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/euroasia-interconnector-bess-cyprus">BESS and the EuroAsia Interconnector</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">The 2,000 MW submarine cable changes Cyprus&apos;s grid. We analyse what interconnection means for BESS investors.</CardDescription>
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
                      <span>Oct 12, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/euroasia-interconnector-bess-cyprus" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 20. Lessons from Year One */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-emerald-600/30">BESS</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">Case Study</Badge>
                </div>
                <CardTitle className="group-hover:text-solar-600 transition-colors">
                  <Link href="/blog/lessons-year-one-bess-operations-cyprus">Lessons from Year One: 881 MWh of BESS</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">After commissioning 251 containers across 51 parks — what worked, what surprised us, and operational realities.</CardDescription>
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
                      <span>Oct 26, 2026</span>
                    </div>
                  </div>
                  <Link href="/blog/lessons-year-one-bess-operations-cyprus" className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
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