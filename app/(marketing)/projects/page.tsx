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
    title: "Limassol Solar Farm - 5MW Premium Investment",
    location: "Limassol, Cyprus",
    capacity: 5,
    investment: 5250000,
    roi: 18.5,
    annualRevenue: 1125000,
    status: "Operational",
    statusColor: "green",
    completionDate: "August 2024",
    image: "/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg",
    highlights: [
      "Exceeded ROI projections by 1.5%",
      "Completed 2 weeks ahead of schedule", 
      "Zero safety incidents during construction",
      "Grid connection achieved in record time"
    ],
    testimonial: {
      quote: "Outstanding project delivery and performance. The ROI has exceeded our expectations.",
      client: "George Andreou, Andreou Family Office"
    },
    featured: true
  },
  {
    title: "Nicosia Industrial Solar Complex - 10MW",
    location: "Nicosia, Cyprus", 
    capacity: 10,
    investment: 10500000,
    roi: 19.2,
    annualRevenue: 2250000,
    status: "Construction",
    statusColor: "blue",
    completionDate: "March 2025",
    image: "/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg",
    highlights: [
      "Largest solar installation in Nicosia region",
      "Advanced bifacial panel technology",
      "Direct industrial client PPA",
      "Expected 20%+ ROI based on current progress"
    ],
    testimonial: {
      quote: "Professional project management and transparent communication throughout the process.",
      client: "Elena Christodoulou, Mediterranean Energy Partners"
    },
    featured: true
  },
  {
    title: "Paphos Coastal Solar Farm - 1MW",
    location: "Paphos, Cyprus",
    capacity: 1,
    investment: 1050000,
    roi: 17.8,
    annualRevenue: 225000,
    status: "Planning",
    statusColor: "yellow",
    completionDate: "September 2025",
    image: "/images/1690376781153.jpg",
    highlights: [
      "Prime coastal location with optimal exposure",
      "Perfect entry-level investment opportunity",
      "Premium PPA rates secured",
      "Fast-track permitting approved"
    ],
    testimonial: {
      quote: "Ideal first solar investment with clear projections and professional support.",
      client: "Michael & Sarah Thompson, Private Investors"
    },
    featured: false
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
                <div className="text-3xl font-bold gradient-text">16MW+</div>
                <div className="text-sm text-gray-600">Total Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">€16.8M</div>
                <div className="text-sm text-gray-600">Investments Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">18.5%</div>
                <div className="text-sm text-gray-600">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
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
                      <Button variant="gradient" className="flex-1">
                        View Full Case Study
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline">
                        Similar Projects
                      </Button>
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

                  <Button variant="outline" className="w-full group-hover:bg-solar-50">
                    View Project Details
                    <ArrowRight className="w-4 h-4 ml-2" />
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
            <Card className="border-2 border-solar-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Badge variant="solar" className="w-fit mx-auto mb-2">Available Now</Badge>
                <CardTitle>Larnaca Solar Farm</CardTitle>
                <CardDescription>2MW • Strategic Location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-semibold">€2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projected ROI</span>
                    <span className="font-semibold text-green-600">18.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline</span>
                    <span className="font-semibold">8 months</span>
                  </div>
                </div>
                <Button variant="solar" className="w-full">
                  Express Interest
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyprus-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Badge variant="cyprus" className="w-fit mx-auto mb-2">Coming Soon</Badge>
                <CardTitle>Famagusta Solar Complex</CardTitle>
                <CardDescription>7MW • Industrial Scale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment</span>
                    <span className="font-semibold">€7.35M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projected ROI</span>
                    <span className="font-semibold text-green-600">19.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timeline</span>
                    <span className="font-semibold">12 months</span>
                  </div>
                </div>
                <Button variant="cyprus" className="w-full">
                  Join Waitlist
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
            <Button size="lg" className="btn-outline-on-dark">
              Download Project Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
