import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Download, 
  Star, 
  Clock, 
  Users,
  TrendingUp,
  Calculator,
  BookOpen,
  Shield,
  Globe,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Investment Resources & Guides | Solar Farm Investment Education | Lighthief Cyprus',
  description: 'Free investment guides, ROI calculators, market reports, and educational resources for Cyprus solar farm investments. Expert insights and analysis.',
  keywords: [
    'solar investment guide',
    'Cyprus solar resources',
    'renewable energy guides',
    'solar ROI calculator',
    'investment education',
  ],
}

const investmentGuides = [
  {
    title: "Complete Guide to Cyprus Solar Farm Investments",
    description: "Comprehensive 25-page guide covering everything from market analysis to investment strategies, financial projections, and risk mitigation.",
    category: "Investment Guide",
    targetAudience: "First-time & Experienced Investors",
    pages: 25,
    downloadCount: "2,500+",
    rating: 4.9,
    keyTopics: [
      "Cyprus market opportunity analysis",
      "Financial modeling and ROI calculations",
      "Risk assessment and mitigation strategies",
      "Step-by-step investment process",
      "Regulatory framework and incentives",
      "Due diligence checklist"
    ],
    featured: true,
    gated: true
  },
  {
    title: "Institutional Solar Investment Strategies",
    description: "Advanced guide for family offices and institutional investors covering portfolio allocation, ESG compliance, and large-scale investment strategies.",
    category: "Advanced Strategy",
    targetAudience: "Institutional Investors",
    pages: 35,
    downloadCount: "800+",
    rating: 4.8,
    keyTopics: [
      "Portfolio diversification strategies",
      "ESG reporting and compliance",
      "Large-scale investment structuring",
      "Performance benchmarking",
      "Exit strategies and secondary markets",
      "Institutional due diligence"
    ],
    featured: true,
    gated: true
  },
  {
    title: "Cyprus Solar Market Report 2025",
    description: "In-depth analysis of the Cyprus solar market including government policies, electricity rates, competition analysis, and growth projections.",
    category: "Market Analysis",
    targetAudience: "All Investors",
    pages: 18,
    downloadCount: "3,200+",
    rating: 4.7,
    keyTopics: [
      "Market size and growth projections",
      "Government policies and incentives",
      "Electricity rate analysis",
      "Competition landscape",
      "Investment opportunities",
      "Future market trends"
    ],
    featured: false,
    gated: false
  },
  {
    title: "Technical Guide to Solar Farm Operations",
    description: "Detailed technical guide covering solar farm design, equipment selection, performance optimization, and maintenance best practices.",
    category: "Technical Guide",
    targetAudience: "Technical Professionals",
    pages: 42,
    downloadCount: "1,100+",
    rating: 4.9,
    keyTopics: [
      "Solar farm design principles",
      "Equipment selection criteria",
      "Performance monitoring systems",
      "Maintenance and optimization",
      "Grid integration requirements",
      "Safety and compliance"
    ],
    featured: false,
    gated: true
  }
]

const calculatorTools = [
  {
    title: "Interactive ROI Calculator",
    description: "Advanced calculator with financing options, real Cyprus data, and detailed projections",
    features: [
      "1MW, 5MW, 10MW project sizes",
      "Bank financing options (70%, 80%)",
      "Real-time calculations",
      "25-year NPV analysis",
      "PDF report generation"
    ],
    link: "/calculator"
  },
  {
    title: "Financing Comparison Tool",
    description: "Compare cash vs. financed investments to optimize your ROI strategy",
    features: [
      "Cash vs. 70% vs. 80% financing",
      "Leverage impact analysis",
      "Interest rate scenarios",
      "Payback period comparison",
      "Risk-return optimization"
    ],
    link: "/calculator"
  },
  {
    title: "City-Specific Calculators",
    description: "Location-based calculators for different Cyprus regions",
    features: [
      "Nicosia, Limassol, Paphos, Larnaca, Famagusta",
      "Local electricity rates",
      "Regional solar irradiation data",
      "City-specific incentives",
      "Local market conditions"
    ],
    link: "/cyprus-solar-investment/nicosia"
  }
]

const marketReports = [
  {
    title: "Q3 2025 Cyprus Solar Market Update",
    date: "September 2025",
    summary: "Latest market developments, policy changes, and investment opportunities",
    size: "2.1 MB"
  },
  {
    title: "European Solar Investment Outlook 2025",
    date: "August 2025", 
    summary: "Comprehensive analysis of European solar markets with Cyprus focus",
    size: "3.8 MB"
  },
  {
    title: "Cyprus Renewable Energy Policy Analysis",
    date: "July 2025",
    summary: "Detailed review of government policies and their impact on investments",
    size: "1.9 MB"
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
              alt="Solar investment resources and guides"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Investment
              <span className="block gradient-text">
                Resources & Guides
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Comprehensive educational resources, calculators, and market insights 
              to help you make informed solar investment decisions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">7,600+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">120+</div>
                <div className="text-sm text-gray-600">Pages of Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-600">All Resources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Guides */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert-authored guides covering all aspects of solar farm investments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentGuides.map((guide, index) => (
              <Card key={index} className={`${guide.featured ? 'border-2 border-solar-200' : ''} hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={guide.featured ? "solar" : "secondary"}>
                      {guide.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{guide.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{guide.downloadCount}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {guide.targetAudience}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Topics Covered:</h4>
                    <div className="space-y-1">
                      {guide.keyTopics.slice(0, 4).map((topic, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{topic}</span>
                        </div>
                      ))}
                      {guide.keyTopics.length > 4 && (
                        <div className="text-xs text-gray-500 ml-4">
                          +{guide.keyTopics.length - 4} more topics...
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant={guide.featured ? "gradient" : "outline"} className="w-full" asChild>
                    <Link href="/contact">
                      {guide.gated ? "Download Guide (Free)" : "Download Now"}
                      <Download className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Tools */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Interactive Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade financial tools for accurate investment analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {calculatorTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-solar-600" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={tool.link}>
                      Use Calculator
                      <Calculator className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Reports */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Market Reports & Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest market insights and analysis for informed investment decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketReports.map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-cyprus-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-cyprus-600" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">{report.date}</Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.summary}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>PDF Document</span>
                    <span>{report.size}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/contact">
                      Download Report
                      <Download className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Educational Content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about solar investments through our comprehensive educational resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-solar-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ROI Fundamentals</h3>
                <p className="text-sm text-gray-600 mb-4">Learn how to calculate and evaluate solar investment returns</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">Read Articles</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-cyprus-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
                <p className="text-sm text-gray-600 mb-4">Understand and mitigate risks in renewable energy investments</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">Read Articles</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Stay updated with Cyprus and European solar market trends</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">Read Articles</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Case Studies</h3>
                <p className="text-sm text-gray-600 mb-4">Real investor stories and project success examples</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/projects">View Projects</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Your Solar Investment Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Download our complete investment guide and schedule a consultation with our experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">
                Download Complete Guide
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">
                Schedule Expert Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
