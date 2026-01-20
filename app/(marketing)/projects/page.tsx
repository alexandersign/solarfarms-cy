import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Euro, 
  Award,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Solar Farm Projects | Success Stories & Case Studies | Lighthief Cyprus',
  description: 'Explore our successful solar farm projects across Cyprus. Real investment results, ROI achievements, and client testimonials from 1MW to 10MW installations.',
  keywords: [
    'Cyprus solar projects',
    'solar farm case studies',
    'investment success stories',
    'solar ROI results',
    'renewable energy portfolio',
  ],
}

const projects = [
  {
    title: "Agios Theodoros Solar Park with Battery Storage",
    location: "Agios Theodoros, Larnaca District",
    capacity: 2.64,
    investment: 4590000,
    roi: 35,
    annualRevenue: 1230000,
    status: "Ready to Build",
    statusColor: "green",
    completionDate: "Target Q4 2026",
    image: "/images/solar-farm-aerial-unsplash.jpg",
    highlights: [
      "Integrated 10.56 MWh BESS - 4-hour duration (€127k/MWh)",
      "Bifacial PV modules - 2,100 kWh/kWp yield",
      "Zero curtailment risk with battery arbitrage",
      "Leveraged equity IRR: high 30% range",
      "Single operator: Lighthief EPC + O&M"
    ],
    testimonial: {
      quote: "Ready to build utility scale project with integrated battery storage removing curtailment risk. Strong leveraged returns with conservative assumptions.",
      client: "Reference: PARK-RTB-2026"
    },
    featured: true,
    link: "/projects/agios-theodoros-rtb"
  },
  {
    title: "Anarita Solar Park - 10MW Operational",
    location: "Anarita, Paphos District",
    capacity: 10,
    investment: 12500000,
    roi: 14.5,
    annualRevenue: 1950000,
    status: "Operational",
    statusColor: "green",
    completionDate: "Energized & Grid Connected",
    image: "/images/solar-park-field-unsplash.jpg",
    highlights: [
      "Fully operational 10MW utility-scale park",
      "Already energized and grid connected",
      "BESS-ready infrastructure in place",
      "Strong merchant revenue track record",
      "Immediate cash flow from day one"
    ],
    testimonial: {
      quote: "Turnkey operational asset with proven performance. BESS integration opportunity to maximize curtailment recovery and evening arbitrage.",
      client: "Reference: PARK-ANARITA-10"
    },
    featured: true,
    link: "/projects/anarita-10mw"
  },
  {
    title: "5MW Solar Park with Single-Axis Tracking",
    location: "Cyprus", // Location not disclosed for confidentiality
    capacity: 5.01,
    investment: 9600000,
    roi: 13.3,
    annualRevenue: 1410000,
    status: "Available for Acquisition",
    statusColor: "red",
    completionDate: "Operational since 2020",
    image: "/images/IMG_0149.JPG",
    highlights: [
      "Single-axis tracking system - premium technology",
      "Real curtailment data: 45.8% (2025) - BESS opportunity",
      "Tier-1 equipment: Trina, Huawei, Nclave trackers",
      "€18.5k in spare parts included",
      "BESS compatible - enhance ROI to 15.4%"
    ],
    testimonial: {
      quote: "Transparent historical data and realistic curtailment modeling. BESS integration makes this future-proof.",
      client: "Confidential - Reference: PARK-REF-5001"
    },
    featured: true,
    link: "/projects/park-ref-5001"
  }
]

const getStatusColor = (color: string) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800', 
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  }
  return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
              alt="Successful solar farm projects"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Proven Solar Farm
              <span className="block gradient-text">
                Success Stories
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Real projects, real returns. Explore our portfolio of successful solar farm 
              investments delivering consistent 15-20% ROI across Cyprus.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">17.6MW</div>
                <div className="text-sm text-gray-600">Available Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€26M+</div>
                <div className="text-sm text-gray-600">Investment Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">35%+</div>
                <div className="text-sm text-gray-600">Top Leveraged IRR</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">3</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Showcase of our most successful solar farm investments with detailed performance data
            </p>
          </div>

          <div className="space-y-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(project.statusColor)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-bold">{project.capacity}MW</div>
                      <div className="text-sm opacity-90">Solar Farm</div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{project.location}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{project.completionDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold gradient-text">{project.roi}%</div>
                        <div className="text-xs text-gray-600">Annual ROI</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold gradient-text">{formatCurrency(project.annualRevenue)}</div>
                        <div className="text-xs text-gray-600">Annual Revenue</div>
                      </div>
                    </div>

                    {/* Project Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="w-4 h-4 text-solar-500 mr-2" />
                        Project Highlights
                      </h4>
                      <div className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 italic mb-2">"{project.testimonial.quote}"</p>
                      <p className="text-xs text-gray-600">— {project.testimonial.client}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="gradient" className="flex-1" asChild>
                        <Link href={project.link || '/contact'}>
                          View Full {project.link ? 'Project Listing' : 'Case Study'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      {!project.link && (
                        <Button variant="outline">
                          Similar Projects
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Project Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete overview of our solar farm developments across Cyprus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={getStatusColor(project.statusColor)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-xl font-bold">{project.capacity}MW</div>
                    <div className="text-xs opacity-90">{project.location}</div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-solar-600 transition-colors line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.completionDate}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold gradient-text">{project.roi}%</div>
                      <div className="text-xs text-gray-600">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold gradient-text">{formatCurrency(project.annualRevenue)}</div>
                      <div className="text-xs text-gray-600">Annual Revenue</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group-hover:bg-solar-50" asChild>
                    <Link href={project.link || '/contact'}>
                      View Project Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Current Investment Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready-to-build projects with all permits secured and financing available
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-solar-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-solar-500 to-solar-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                FEATURED
              </div>
              <CardHeader className="text-center">
                <Badge variant="solar" className="w-fit mx-auto mb-2">Ready to Build</Badge>
                <CardTitle>Agios Theodoros Solar + BESS</CardTitle>
                <CardDescription>2.64 MWp + 10.56 MWh Battery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total CAPEX</span>
                    <span className="font-semibold">€4.59M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Equity (100%)</span>
                    <span className="font-semibold">€1.75M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leveraged IRR</span>
                    <span className="font-semibold text-green-600">35%+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Revenue</span>
                    <span className="font-semibold">€1.23M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target</span>
                    <span className="font-semibold">Q4 2026</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                  <strong>Equity options:</strong> 25%, 50%, 75%, or 100%
                </div>
                <Button variant="solar" className="w-full" asChild>
                  <Link href="/projects/agios-theodoros-rtb">
                    View Full Details
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyprus-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Badge variant="cyprus" className="w-fit mx-auto mb-2">Available</Badge>
                <CardTitle>5MW Tracker Park</CardTitle>
                <CardDescription>Operational • BESS Opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-semibold">€9.6M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current ROI</span>
                    <span className="font-semibold text-green-600">13.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">With BESS</span>
                    <span className="font-semibold text-green-600">15.4%</span>
                  </div>
                </div>
                <Button variant="cyprus" className="w-full" asChild>
                  <Link href="/projects/park-ref-5001">
                    View Project
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Badge variant="outline" className="w-fit mx-auto mb-2">Planning</Badge>
                <CardTitle>Custom Solar Farm</CardTitle>
                <CardDescription>1-15MW • Your Specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-semibold">Custom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projected ROI</span>
                    <span className="font-semibold text-green-600">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline</span>
                    <span className="font-semibold">6-18 months</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Discuss Requirements
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
            Start Your Solar Investment Journey
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join successful investors who have achieved premium returns with our proven solar farm projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
              Schedule Project Tour
            </Button>
            <Button variant="outline-on-dark" size="lg">
              Download Project Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
