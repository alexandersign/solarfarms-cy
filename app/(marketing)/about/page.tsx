import { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Award, Globe, TrendingUp, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Lighthief Cyprus | Leading Solar Investment Company',
  description: 'Learn about Lighthief Cyprus, the fastest-growing solar O&M company in Europe with 1GW+ assets under management. Expert solar farm development and investment services.',
  keywords: [
    'Lighthief Cyprus',
    'solar investment company',
    'Cyprus solar development',
    'renewable energy experts',
    'solar farm management',
  ],
}

const teamMembers = [
  {
    name: "Dr. Andreas Constantinou",
    position: "Managing Director & Chief Investment Officer",
    bio: "Dr. Constantinou leads Lighthief Cyprus with over 15 years of experience in renewable energy investments and project development. He holds a PhD in Electrical Engineering from University of Cyprus and has overseen €500M+ in solar investments across Europe.",
    credentials: [
      "PhD Electrical Engineering, University of Cyprus",
      "Certified Energy Manager (CEM)",
      "PMP Project Management Professional",
      "Member of Cyprus Energy Regulatory Authority Advisory Board"
    ],
    image: "/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
  },
  {
    name: "Maria Georgiou",
    position: "Head of Business Development",
    bio: "Maria drives investor relations and business development for Lighthief Cyprus. With an MBA in Finance and 12 years in investment banking, she specializes in structuring large-scale renewable energy investments for institutional clients.",
    credentials: [
      "MBA Finance, London Business School",
      "CFA Chartered Financial Analyst",
      "Former VP at Deutsche Bank Energy Division"
    ],
    image: "/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
  },
  {
    name: "Dimitris Pavlou",
    position: "Chief Technology Officer",
    bio: "Dimitris oversees all technical aspects of solar farm development and operations. His expertise in grid integration and advanced monitoring systems ensures optimal performance and maximum returns for investors.",
    credentials: [
      "MSc Renewable Energy Systems, Technical University of Cyprus",
      "Certified Solar PV Installer (NABCEP)",
      "Grid Integration Specialist"
    ],
    image: "/images/1690376781153.jpg"
  }
]

const companyStats = [
  { icon: Globe, label: "European Offices", value: "9", description: "Across major EU markets" },
  { icon: TrendingUp, label: "Assets Under Management", value: "1GW+", description: "Solar installations" },
  { icon: Users, label: "Team Members", value: "150+", description: "Solar professionals" },
  { icon: Award, label: "Years Experience", value: "15+", description: "In renewable energy" },
  { icon: MapPin, label: "Countries", value: "5", description: "Active operations" },
  { icon: Shield, label: "Success Rate", value: "100%", description: "Project completion" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
              alt="Lighthief Cyprus solar installations"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              About
              <span className="block gradient-text">
                Lighthief Cyprus
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Europe's fastest-growing solar O&M company with 1GW+ assets under management. 
              We deliver premium solar farm investments with guaranteed 15-20% ROI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="gradient" size="lg">
                View Our Projects
              </Button>
              <Button variant="outline" size="lg">
                Download Company Profile
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Leading Solar Investment Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by investors across Europe for delivering consistent returns and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-full flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-solar-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded as part of the Lighthief International network, Lighthief Cyprus represents 
                  the culmination of over 15 years of renewable energy expertise. We established our 
                  Cyprus headquarters to capitalize on the island's exceptional solar potential and 
                  strategic position in the European energy market.
                </p>
                <p>
                  What started as a vision to democratize access to premium solar investments has grown 
                  into Europe's fastest-growing solar O&M company. With 1GW+ of assets under management 
                  and operations across 9 European offices, we've proven that sustainable energy and 
                  superior returns go hand in hand.
                </p>
                <p>
                  Our Cyprus operations leverage the island's 3,300+ annual sunshine hours and favorable 
                  regulatory environment to deliver consistent 15-20% ROI for our investors. We're not 
                  just building solar farms – we're building the future of sustainable investing.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/1690376781153.jpg"
                  alt="Lighthief Cyprus headquarters and solar installations"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">€500M+</div>
                  <div className="text-xs text-gray-600">Investments Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Global Network, Local Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Part of Lighthief International with operations across Europe, Asia, and Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold gradient-text mb-2">9</div>
                <div className="font-semibold mb-2">European Offices</div>
                <div className="text-sm text-gray-600">Germany, Poland, Czech Republic, Slovakia, Hungary, Romania, Bulgaria, Greece, Cyprus</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold gradient-text mb-2">4</div>
                <div className="font-semibold mb-2">Global Markets</div>
                <div className="text-sm text-gray-600">Ukraine, Kazakhstan, Gambia, Kenya</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold gradient-text mb-2">1GW+</div>
                <div className="font-semibold mb-2">Assets Managed</div>
                <div className="text-sm text-gray-600">Solar installations under active management</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold gradient-text mb-2">100%</div>
                <div className="font-semibold mb-2">Success Rate</div>
                <div className="text-sm text-gray-600">Project completion and performance delivery</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experts driving solar innovation and investment excellence in Cyprus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.position}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">Key Credentials:</h4>
                    <div className="space-y-1">
                      {member.credentials.slice(0, 2).map((credential, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          {credential}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Lighthief Cyprus
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unique advantages that set us apart in the Cyprus solar investment market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-cyprus-500 mb-2" />
                <CardTitle>International Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Part of Lighthief International with 9 European offices and global operations. 
                  Benefit from international expertise with local market knowledge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-solar-500 mb-2" />
                <CardTitle>Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fastest-growing solar O&M company in Europe with 1GW+ assets under management. 
                  Consistent delivery of 15-20% ROI for our investors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Full Lifecycle Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete service from development to recycling. EPC, O&M, asset optimization, 
                  and end-of-life management - all under one roof.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Scientific Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  University collaborations and R&D partnerships ensure we stay at the forefront 
                  of solar technology and optimization strategies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Cyprus Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Deep understanding of Cyprus's regulatory environment, grid infrastructure, 
                  and market dynamics. Local presence with international standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Investor Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dedicated investor relations team providing transparent reporting, 
                  regular updates, and personalized service for all investment sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Certifications & Partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading certifications and strategic partnerships ensure quality and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Industry Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="solar" className="flex-shrink-0">ISO 9001</Badge>
                  <span className="text-gray-600">Quality Management Systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="cyprus" className="flex-shrink-0">ISO 14001</Badge>
                  <span className="text-gray-600">Environmental Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="flex-shrink-0">OHSAS 18001</Badge>
                  <span className="text-gray-600">Occupational Health & Safety</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="flex-shrink-0">EU CE</Badge>
                  <span className="text-gray-600">European Conformity Standards</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Strategic Partnerships</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-solar-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-600">Częstochowa University of Technology (R&D)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyprus-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-600">Pragmasoft (Monitoring Solutions)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-600">Mansser (Robotic Cleaning Systems)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-600">Promika Solar (Technical Services)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover how Lighthief Cyprus can help you achieve premium returns through solar farm investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              View Investment Opportunities
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
