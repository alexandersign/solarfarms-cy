import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar & BESS Investment Blog | Market Analysis & Guides | Lighthief Cyprus',
  description: 'Expert insights on Cyprus solar and BESS investments, market analysis, and strategies to maximize your renewable energy portfolio returns.',
  keywords: [
    'solar investment blog',
    'BESS investment guide',
    'Cyprus solar market',
    'battery energy storage',
    'renewable energy news',
    'solar farm investment guide',
    'market analysis',
  ],
}

interface Article {
  slug: string
  title: string
  description: string
  category: string
  categoryColor: string
  author: string
  date: string
  image?: string
  gradient?: string
  emoji?: string
}

const articles: Article[] = [
  {
    slug: 'bess-installation-quality-workmanship-risks',
    title: 'Why BESS Projects Fail in Year One: Installation Quality on Solar Farms',
    description: 'More than 50% of BESS failures happen in the first 2 years. That is not ageing — it is construction. We examine the workmanship gaps that hide between responsibilities.',
    category: 'Construction Risk',
    categoryColor: 'bg-red-100 text-red-800',
    author: 'Alexander Papacosta',
    date: 'Feb 26, 2026',
    gradient: 'from-red-100 to-orange-100',
  },
  {
    slug: 'investors-guide-battery-energy-storage',
    title: "The Investor\u2019s Guide to Battery Energy Storage",
    description: "What BESS means for your solar park\u2019s revenue, grid connection, and asset valuation. Written for PV park owners, not hobbyists.",
    category: 'Investment Guide',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Feb 18, 2026',
    gradient: 'from-blue-100 to-cyan-100',
  },
  {
    slug: 'why-bess-no-longer-optional-res-cyprus',
    title: 'Why BESS Is No Longer Optional for RES Projects in Cyprus',
    description: '47% curtailment, \u20AC77/MWh midday prices, and \u20AC893K annual losses per 5MW park. The data says it all \u2014 solar without BESS is no longer viable.',
    category: 'Market Reality',
    categoryColor: 'bg-red-100 text-red-800',
    author: 'Alexander Papacosta',
    date: 'Feb 13, 2026',
    image: '/images/bess-no-longer-optional-cyprus.png',
  },
  {
    slug: 'bess-bankability-choosing-right-service-partner',
    title: 'BESS Bankability: Why the Right Service Partner Makes or Breaks Your Investment',
    description: "Why Cyprus\u2019s isolated grid is entering a BESS cycle, and how Tier-1 OEM partnerships and multi-layered insurance make BESS assets bankable investments.",
    category: 'Investment Guide',
    categoryColor: 'bg-emerald-100 text-emerald-800',
    author: 'Alexander Papacosta',
    date: 'Feb 10, 2026',
    image: '/images/IMG_0149.JPG',
  },
  {
    slug: 'lithium-price-crash-bess-viability',
    title: 'Lithium Prices Crashed 85% \u2014 Why BESS Is Now Viable',
    description: 'From $80,000 to under $10,000 per tonne. How the lithium collapse made battery storage payback under 5 years and ignited global BESS deployment.',
    category: 'Market Analysis',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Jan 30, 2026',
    gradient: 'from-green-100 to-emerald-100',
  },
  {
    slug: 'lfp-vs-nmc-utility-scale-bess',
    title: 'LFP vs NMC for Utility-Scale BESS',
    description: 'Why LFP chemistry wins for utility-scale BESS \u2014 cycle life economics, fire safety, and insurance implications make the case clear.',
    category: 'Technology',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Jan 27, 2026',
    gradient: 'from-purple-100 to-indigo-100',
  },
  {
    slug: 'island-grid-economics-cyprus-bess',
    title: 'Island Grid Economics: Why Cyprus BESS Is Different',
    description: 'Zero interconnection means higher curtailment, wider price spreads, and stronger BESS economics than mainland Europe.',
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Jan 20, 2026',
    gradient: 'from-sky-100 to-blue-100',
  },
  {
    slug: 'bess-sizing-solar-farms',
    title: 'BESS Sizing for Solar Farms',
    description: "How to match storage capacity to your park\u2019s revenue potential using real curtailment data and grid constraints.",
    category: 'Technology',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Jan 13, 2026',
    gradient: 'from-emerald-100 to-teal-100',
  },
  {
    slug: 'solar-bitcoin-mining-cyprus-case-study',
    title: 'Solar Bitcoin Mining in Cyprus: 5MW Case Study',
    description: 'How a 5MW park generates BTC from curtailed energy. Analysis with/without BESS, Cyprus tax advantages, and off-grid solutions.',
    category: 'Case Study',
    categoryColor: 'bg-orange-100 text-orange-800',
    author: 'Alexander Papacosta',
    date: 'Jan 8, 2026',
    image: '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
  },
  {
    slug: 'ai-gpu-mining-renewable-energy-cyprus',
    title: 'AI GPU Mining: The Off-Grid Solar Opportunity',
    description: 'Global AI power demand is exploding. How Cyprus solar parks can become green compute centers.',
    category: 'Industry Analysis',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Jan 2, 2026',
    image: '/images/solar-park-field-unsplash.jpg',
  },
  {
    slug: 'peak-shaving-vs-energy-arbitrage-cyprus',
    title: 'Peak Shaving vs Energy Arbitrage in Cyprus',
    description: 'Two revenue models compared with real Cyprus pricing \u2014 \u20AC77/MWh midday vs \u20AC186/MWh evening.',
    category: 'Investment Guide',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Dec 29, 2025',
    gradient: 'from-green-100 to-emerald-100',
  },
  {
    slug: 'bess-insurance-risk-lenders',
    title: 'BESS Insurance and Risk: What Lenders Look For',
    description: 'Insurance is the overlooked gatekeeper of bankability. What insurers assess and how it affects your project finance.',
    category: 'Risk Management',
    categoryColor: 'bg-cyan-100 text-cyan-800',
    author: 'Alexander Papacosta',
    date: 'Dec 16, 2025',
    gradient: 'from-red-100 to-rose-100',
  },
  {
    slug: 'cyprus-bess-regulatory-framework-europe',
    title: 'Cyprus BESS Regulations vs Europe',
    description: 'Permitting, grid connection, and market access rules compared across Cyprus, Germany, Spain, Italy, Greece, and the UK.',
    category: 'Regulations',
    categoryColor: 'bg-orange-100 text-orange-800',
    author: 'Alexander Papacosta',
    date: 'Dec 2, 2025',
    gradient: 'from-slate-100 to-gray-100',
  },
  {
    slug: 'cyprus-curtailment-crisis-bess-solution',
    title: 'Cyprus Curtailment Crisis: The BESS Solution',
    description: 'Curtailment surged from 0% to 47% in 4 years. Learn how Battery Storage protects your solar investment ROI.',
    category: 'Market Alert',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Nov 26, 2025',
    image: '/images/IMG_0149.JPG',
  },
  {
    slug: 'curtailed-energy-revenue-recovery-cyprus',
    title: 'Curtailed Energy Is Not Lost Energy',
    description: '306 GWh curtailed in 2025, worth \u20AC58M. Three proven strategies to recover this revenue for your PV park.',
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Nov 18, 2025',
    gradient: 'from-amber-100 to-orange-100',
  },
  {
    slug: 'ems-scada-bess-revenue',
    title: 'EMS and SCADA: Why Your Software Determines Revenue',
    description: "A well-configured EMS generates 20\u201340% more revenue from the same BESS hardware. Here\u2019s what matters.",
    category: 'Technology',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Nov 4, 2025',
    gradient: 'from-violet-100 to-purple-100',
  },
  {
    slug: 'cost-of-not-adding-bess-financial-model',
    title: 'The Real Cost of NOT Adding BESS: 10-Year Model',
    description: 'PV-only vs PV+BESS over 10 years with real Cyprus data. The crossover point might surprise you.',
    category: 'Investment Guide',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Oct 21, 2025',
    gradient: 'from-emerald-100 to-green-100',
  },
  {
    slug: 'bess-fire-safety-thermal-management',
    title: 'BESS Fire Safety and Thermal Management',
    description: 'Designing BESS for 45\u00B0C Cyprus summers. Thermal management, fire suppression, and engineering decisions.',
    category: 'Technology',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Oct 7, 2025',
    gradient: 'from-red-100 to-orange-100',
  },
  {
    slug: 'bess-warranties-guarantees-checklist',
    title: 'BESS Warranties and Performance Bonds Checklist',
    description: 'Capacity warranties, availability guarantees, performance bonds, and LTSA structures \u2014 with our exact terms.',
    category: 'Investment Guide',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Sep 23, 2025',
    gradient: 'from-blue-100 to-indigo-100',
  },
  {
    slug: 'importance-of-om-solar-farms',
    title: 'Why O&M is Critical for Solar Farm Success',
    description: 'Professional operations and maintenance can boost your solar farm ROI by 15% and extend asset life beyond 25 years.',
    category: 'Operations',
    categoryColor: 'bg-gray-100 text-gray-800',
    author: 'Technical Team',
    date: 'Sep 15, 2025',
    image: '/images/solar-park-field-unsplash.jpg',
  },
  {
    slug: 'cyprus-solar-market-analysis-2025',
    title: 'Cyprus Solar Market Analysis 2025',
    description: 'Why Cyprus represents Europe\u2019s most compelling solar investment opportunity with 3,300+ sunshine hours and ambitious government targets.',
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Market Research',
    date: 'Sep 11, 2025',
    image: '/images/1690376781153.jpg',
  },
  {
    slug: 'bess-installation-container-to-grid',
    title: 'From Container Ship to Grid Connection',
    description: 'Every phase of utility-scale BESS installation \u2014 factory production to CIF delivery, civil works, and grid commissioning.',
    category: 'Case Study',
    categoryColor: 'bg-cyan-100 text-cyan-800',
    author: 'Alexander Papacosta',
    date: 'Sep 2, 2025',
    gradient: 'from-cyan-100 to-sky-100',
  },
  {
    slug: 'solar-incentives-cyprus-2025',
    title: '2025 Solar Incentives in Cyprus',
    description: 'Complete guide to 2025 government incentives, EU funding, and policy updates supporting solar farm investments.',
    category: 'Policy Update',
    categoryColor: 'bg-orange-100 text-orange-800',
    author: 'Policy Team',
    date: 'Aug 28, 2025',
    image: '/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg',
  },
  {
    slug: 'solar-farm-financing-strategies-2025',
    title: 'Solar Farm Financing Strategies 2025',
    description: 'Learn how strategic financing can boost your solar farm ROI from 18% to 45%+ while preserving capital.',
    category: 'Investment Strategy',
    categoryColor: 'bg-green-100 text-green-800',
    author: 'Alexander Papacosta',
    date: 'Aug 12, 2025',
    emoji: '\uD83D\uDCB0',
    gradient: 'from-solar-100 to-cyprus-100',
  },
  {
    slug: 'cyprus-energy-storage-roadmap-2027-2030',
    title: 'Cyprus Energy Storage Roadmap: 2027\u20132030',
    description: 'From curtailment recovery to grid services and the EuroAsia Interconnector \u2014 the BESS landscape through 2030.',
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Aug 5, 2025',
    gradient: 'from-teal-100 to-emerald-100',
  },
  {
    slug: 'risk-mitigation-solar-investments',
    title: 'Risk Mitigation in Solar Investments',
    description: 'Comprehensive strategies to protect your solar investment returns and minimize risks in renewable energy projects.',
    category: 'Risk Management',
    categoryColor: 'bg-cyan-100 text-cyan-800',
    author: 'Risk Management',
    date: 'Jul 29, 2025',
    emoji: '\uD83D\uDEE1\uFE0F',
    gradient: 'from-cyprus-100 to-solar-100',
  },
  {
    slug: 'virtual-power-plants-island-grids',
    title: 'Virtual Power Plants on Island Grids',
    description: 'How aggregated BESS capacity could participate in balancing markets, ancillary services, and synthetic inertia.',
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Jul 22, 2025',
    gradient: 'from-indigo-100 to-blue-100',
  },
  {
    slug: 'dc-coupled-vs-ac-coupled-bess',
    title: 'DC-Coupled vs AC-Coupled BESS for PV Parks',
    description: 'Which architecture maximises revenue when retrofitting BESS onto existing solar parks? We analyse both.',
    category: 'Technology',
    categoryColor: 'bg-purple-100 text-purple-800',
    author: 'Alexander Papacosta',
    date: 'Jul 8, 2025',
    gradient: 'from-orange-100 to-amber-100',
  },
  {
    slug: 'cyprus-vs-eu-solar-markets',
    title: 'Cyprus vs Other EU Solar Markets',
    description: 'Detailed comparison of Cyprus solar investments vs Germany, Spain, Italy. Why Cyprus delivers superior returns.',
    category: 'Market Comparison',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Research Team',
    date: 'Jun 24, 2025',
    emoji: '\uD83C\uDDEA\uD83C\uDDFA',
    gradient: 'from-blue-100 to-green-100',
  },
  {
    slug: 'euroasia-interconnector-bess-cyprus',
    title: 'BESS and the EuroAsia Interconnector',
    description: "The 2,000 MW submarine cable changes Cyprus\u2019s grid. We analyse what interconnection means for BESS investors.",
    category: 'Market Analysis',
    categoryColor: 'bg-blue-100 text-blue-800',
    author: 'Alexander Papacosta',
    date: 'Jun 10, 2025',
    gradient: 'from-blue-100 to-sky-100',
  },
]

export default function BlogPage() {
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
              Expert insights on Cyprus solar and BESS investments, market trends, and strategies 
              to maximize your renewable energy portfolio returns.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.slug} className="group hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                      {article.emoji ? (
                        <div className="text-6xl">{article.emoji}</div>
                      ) : (
                        <div className="text-4xl font-bold text-gray-400/30">BESS</div>
                      )}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className={article.categoryColor}>{article.category}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-solar-600 transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${article.slug}`} className="flex items-center space-x-1 text-solar-600 hover:text-solar-700 font-medium">
                      <span>Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
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
