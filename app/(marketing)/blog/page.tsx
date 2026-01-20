import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, User, TrendingUp, Battery, Sun, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Investment Blog Cyprus | Market Insights & Analysis | SolarFarms.cy',
  description: 'Expert insights on Cyprus solar farm investments, BESS technology, grid curtailment solutions, and renewable energy market analysis. Stay informed with the latest industry trends.',
  keywords: [
    'Cyprus solar investment blog',
    'solar farm news Cyprus',
    'BESS technology Cyprus',
    'renewable energy insights',
    'solar market analysis',
    'Cyprus grid curtailment',
    'solar ROI analysis',
    'energy storage blog',
  ],
  openGraph: {
    title: 'Solar Investment Blog | SolarFarms.cy',
    description: 'Expert insights on Cyprus solar investments and BESS technology',
    type: 'website',
  },
}

// Blog posts data
const blogPosts = [
  {
    slug: 'cyprus-solar-curtailment-2025-bess-solution',
    title: 'Cyprus Grid Curtailment Hits 45.8% in 2025: Why BESS is Now Essential',
    excerpt: 'With Cyprus solar curtailment reaching record levels, battery energy storage has become critical for protecting solar investment returns. We analyze the data and the BESS solution.',
    image: '/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg',
    category: 'Market Analysis',
    date: 'January 15, 2025',
    readTime: '8 min read',
    author: 'Alexander Papacosta',
    featured: true,
    tags: ['Curtailment', 'BESS', 'Market Analysis']
  },
  {
    slug: 'bitcoin-mining-cyprus-solar-farm',
    title: 'Bitcoin Mining with Solar Power in Cyprus: The 8% Flat Tax Advantage',
    excerpt: 'Cyprus offers unique advantages for crypto mining operations powered by solar energy. Explore how the 8% flat tax on crypto gains combined with cheap solar power creates exceptional returns.',
    image: '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
    category: 'Crypto & Solar',
    date: 'January 10, 2025',
    readTime: '10 min read',
    author: 'Alexander Papacosta',
    featured: false,
    tags: ['Bitcoin', 'Crypto Mining', 'Tax Advantage']
  },
  {
    slug: 'linyang-bess-systems-cyprus-pricing-guide',
    title: 'Linyang BESS Systems: Complete Cyprus Pricing Guide 2025',
    excerpt: 'As the official Cyprus distributor for Linyang energy storage, we break down BESS pricing from €100k/MWh for utility-scale to €175k/MWh for smaller systems.',
    image: '/images/IMG_0149.JPG',
    category: 'BESS Technology',
    date: 'January 5, 2025',
    readTime: '6 min read',
    author: 'Arkadius Sybaris',
    featured: false,
    tags: ['BESS', 'Linyang', 'Pricing']
  },
  {
    slug: 'ai-gpu-data-centers-cyprus-solar',
    title: 'AI GPU Data Centers Powered by Cyprus Solar: The Next Frontier',
    excerpt: 'The explosion in AI computing demand is creating massive opportunities for solar-powered data centers. Cyprus\'s climate and energy costs make it an ideal location.',
    image: '/images/1690376781153.jpg',
    category: 'AI & Energy',
    date: 'December 28, 2024',
    readTime: '12 min read',
    author: 'Alexander Papacosta',
    featured: false,
    tags: ['AI', 'Data Centers', 'Solar Power']
  },
  {
    slug: 'solar-farm-roi-calculator-guide',
    title: 'How to Calculate Solar Farm ROI in Cyprus: Complete Guide',
    excerpt: 'Learn how to accurately calculate your potential returns from Cyprus solar investments using our advanced calculator. Includes real project examples and market data.',
    image: '/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg',
    category: 'Investment Guide',
    date: 'December 20, 2024',
    readTime: '7 min read',
    author: 'Alexander Papacosta',
    featured: false,
    tags: ['ROI', 'Calculator', 'Investment']
  },
  {
    slug: 'cyprus-solar-investment-tax-benefits',
    title: 'Tax Benefits of Solar Investment in Cyprus: What Investors Need to Know',
    excerpt: 'Cyprus offers significant tax advantages for solar investors, from corporate tax rates to capital allowances. A comprehensive guide to maximizing your after-tax returns.',
    image: '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
    category: 'Tax & Legal',
    date: 'December 15, 2024',
    readTime: '9 min read',
    author: 'Arkadius Sybaris',
    featured: false,
    tags: ['Tax', 'Legal', 'Investment']
  },
]

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Market Analysis', count: blogPosts.filter(p => p.category === 'Market Analysis').length },
  { name: 'BESS Technology', count: blogPosts.filter(p => p.category === 'BESS Technology').length },
  { name: 'Crypto & Solar', count: blogPosts.filter(p => p.category === 'Crypto & Solar').length },
  { name: 'Investment Guide', count: blogPosts.filter(p => p.category === 'Investment Guide').length },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured)
  const regularPosts = blogPosts.filter(p => !p.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-900 via-cyprus-800 to-cyprus-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-solar-500/20 text-solar-300 border-solar-500/30">
              Solar Investment Insights
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Market Insights &
              <span className="block text-solar-400">
                Expert Analysis
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 text-balance">
              Stay ahead with the latest insights on Cyprus solar investments, BESS technology, 
              market trends, and strategies to maximize your returns.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-solar-400">{blogPosts.length}+</div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-solar-400">45.8%</div>
                <div className="text-sm text-gray-400">2025 Curtailment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-solar-400">8-12%</div>
                <div className="text-sm text-gray-400">Target IRR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-solar-500" />
              <h2 className="text-xl font-semibold text-gray-900">Featured Article</h2>
            </div>
            
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-solar-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button variant="gradient" className="w-fit group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Categories & Posts */}
      <section className="section-padding">
        <div className="container">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="px-4 py-2 rounded-full border border-gray-200 hover:border-solar-500 hover:bg-solar-50 transition-colors text-sm font-medium text-gray-600 hover:text-solar-600"
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute bottom-4 left-4 bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-solar-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-cyprus-600 to-solar-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Stay Updated on Cyprus Solar Opportunities
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get exclusive market insights, new project alerts, and investment analysis delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                <Link href="/contact">
                  Subscribe to Newsletter
                </Link>
              </Button>
              <Button variant="outline-on-dark" size="lg" asChild>
                <Link href="/calculator">
                  Try ROI Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
