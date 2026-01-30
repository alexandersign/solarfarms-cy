import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Award, Globe, TrendingUp, Shield, Zap, Building2, Leaf, Factory } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Lighthief | European Renewable Energy O&M Operator',
  description: 'Lighthief manages hundreds of megawatts of solar, wind, and biogas installations across 11 countries. NATO-certified provider with comprehensive EPC and O&M services.',
  keywords: [
    'Lighthief',
    'renewable energy operator',
    'solar O&M Europe',
    'BESS solutions',
    'NATO certified',
    'solar farm management',
    'Cyprus solar investment',
  ],
}

const teamMembers = [
  {
    name: "Dr. Arkadius Sybaris",
    position: "Founder & CEO",
    countries: ["PL", "UK", "KZ", "UZ", "UA", "RO"],
    bio: "Dr. Arkadius founded Lighthief nearly a decade ago and has been instrumental in renewable energy for over 10 years. He focuses on investor relations and new market development, overseeing Eurasian expansion across Kazakhstan, Uzbekistan, and Kyrgyzstan, as well as operations in Ukraine and Romania. As a private investor, he holds substantial renewable energy assets: over 250 MW in photovoltaic farms, 60 MW in wind energy, and 4 MW in biogas installations.",
    credentials: [
      "Founder & CEO, Lighthief Group",
      "250+ MW PV, 60 MW Wind, 4 MW Biogas",
      "Biomethane LTD - Biogas Division",
      "Future Business Strategy Architect"
    ],
    email: "a.sybaris@lighthief.com",
    linkedin: true,
    image: "/images/team/arkadius.jpg"
  },
  {
    name: "Alexander Papacosta",
    position: "Cyprus Director",
    countries: ["CY", "GR"],
    bio: "Alexander leads our rapidly expanding Cyprus operations, specializing in off-grid energy systems and the innovative integration of renewable energy with cryptocurrency mining and AI infrastructure. He manages investor relations for photovoltaic farm development across Cyprus and Greece, overseeing strategic Joint Ventures including our partnership with 7Sun, one of Europe's major renewable energy wholesalers.",
    credentials: [
      "Cyprus & Greece Market Lead",
      "Off-Grid & BESS Specialist",
      "7Sun JV Partnership",
      "Crypto & AI Infrastructure Integration"
    ],
    email: "alexander.papacosta@lighthief.com",
    linkedin: true,
    image: "/images/team/alexander-papacosta.jpg"
  },
  {
    name: "Costas Hadjikyriacou",
    position: "Electrical Engineer",
    countries: ["CY"],
    bio: "ETEK-licensed Electrical Engineer with extensive experience in photovoltaic systems design, installation, and O&M. Background includes leading B2B green energy solutions and managing residential and commercial PV operations. Holds MEng in Electrical & Computer Engineering from Aristotle University of Thessaloniki and MSc in Energy Systems from International Hellenic University.",
    credentials: [
      "ETEK Licensed Engineer",
      "MEng Electrical & Computer Engineering",
      "MSc Energy Systems - Energy Management",
      "Certified PV Installer (Cyprus)"
    ],
    email: "costas@lighthief.com",
    linkedin: true,
    image: "/images/1690376781153.jpg"
  },
  {
    name: "Maciej Krzyżanowski",
    position: "Poland Director",
    countries: ["PL"],
    bio: "Maciej brings years of renewable energy experience from leading OZE companies. For the past four years, he has architected the Polish operation's strategy and explosive growth. Under his leadership, Lighthief Poland developed the state-of-the-art Częstochowa headquarters—a facility combining 1,000 m² of office space, 3,500 m² of warehouse capacity, and a 23-hectare research center with integrated PV farms, biogas plant, and BESS systems.",
    credentials: [
      "Poland Operations Director",
      "Częstochowa HQ Development Lead",
      "Solar EPC & BESS Division",
      "European O&M Expansion"
    ],
    email: "m.krzyzanowski@lighthief.com",
    linkedin: true,
    image: "/images/team/maciej.jpg"
  },
  {
    name: "Maurizio Ganis",
    position: "Italy Director",
    countries: ["IT"],
    bio: "Maurizio brings elite-level expertise from decades of operating at the highest echelons of European, American, and Asian investment funds. His career spans Renewable Energy, Oil & Gas, and Real Estate sectors, where he has held senior executive positions including Chairman, CEO, and Commercial Director. His deep relationships with institutional investors and understanding of structured finance position Lighthief Italy for aggressive growth.",
    credentials: [
      "Italy Market Director",
      "Institutional Investment Expert",
      "Structured Finance Specialist",
      "Utility-Scale Project Execution"
    ],
    email: "m.ganis@lighthief.com",
    linkedin: true,
    image: "/images/team/maurizio.jpg"
  },
  {
    name: "Leon Volkerink",
    position: "Director & Chief Compliance Officer",
    countries: ["NL", "DE", "CY"],
    bio: "Leon oversees our Dutch market and plays a key role in German operations while serving as Chief Compliance Officer for the entire Lighthief Group. He ensures transaction security, manages KYC protocols, and establishes procedural frameworks that protect operations across 11 countries and maintain NATO certification standards. A Dutch national who has lived in Cyprus for over 15 years, Leon bridges Northern and Mediterranean European business cultures seamlessly.",
    credentials: [
      "Chief Compliance Officer",
      "Netherlands & Germany Operations",
      "NATO Certification Compliance",
      "KYC & Transaction Security"
    ],
    email: "leon.volkerink@lighthief.com",
    linkedin: true,
    image: "/images/team/leon.jpg"
  },
  {
    name: "Marko Hernaiz",
    position: "Spain / Poland Director",
    countries: ["ES", "PL"],
    bio: "One of Lighthief's founding members alongside Arkadius, helping build the company from its earliest days. Today, he oversees Spanish market development, leveraging his unique dual heritage—half Polish, half Spanish—to bridge cultural and business practices across our European operations. His expertise in people management and team building has been invaluable to Lighthief's growth.",
    credentials: [
      "Co-Founder, Lighthief",
      "Spain Market Director",
      "Team Building Expert",
      "Circular Economy Specialist"
    ],
    email: "m.hernaiz@lighthief.com",
    linkedin: true,
    image: "/images/team/marko.jpg"
  }
]

const companyStats = [
  { icon: Globe, label: "Countries", value: "11", description: "Active operations across Europe and Asia" },
  { icon: Zap, label: "Assets Managed", value: "100s MW", description: "Solar, wind, and biogas installations" },
  { icon: Users, label: "Team Size", value: "150+", description: "Renewable energy professionals" },
  { icon: Award, label: "Experience", value: "10+ Years", description: "In renewable energy sector" },
  { icon: Shield, label: "Certification", value: "NATO", description: "Certified service provider" },
  { icon: Factory, label: "R&D Center", value: "23 ha", description: "Innovation hub in Poland" }
]

const officeLocations = [
  { city: "Częstochowa", country: "Poland", flag: "🇵🇱", status: "HQ", description: "European headquarters, R&D center" },
  { city: "Limassol", country: "Cyprus", flag: "🇨🇾", status: "Active", description: "Mediterranean hub" },
  { city: "Trieste", country: "Italy", flag: "🇮🇹", status: "Active", description: "Italian operations" },
  { city: "Salerno", country: "Italy", flag: "🇮🇹", status: "Active", description: "Southern Italy" },
  { city: "Malaga", country: "Spain", flag: "🇪🇸", status: "Active", description: "Spanish market" },
  { city: "Hannover", country: "Germany", flag: "🇩🇪", status: "Active", description: "German operations" },
  { city: "Utrecht", country: "Netherlands", flag: "🇳🇱", status: "Active", description: "Dutch market" },
  { city: "Athens", country: "Greece", flag: "🇬🇷", status: "Active", description: "Greek expansion" },
  { city: "Astana", country: "Kazakhstan", flag: "🇰🇿", status: "Active", description: "Central Asia hub" },
  { city: "Tashkent", country: "Uzbekistan", flag: "🇺🇿", status: "Active", description: "Uzbek operations" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴", status: "2026", description: "Planned expansion" },
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿", status: "2026", description: "Planned expansion" },
]

const services = [
  {
    icon: Zap,
    title: "Solar EPC",
    description: "Turnkey solar projects from concept to commissioning across Europe. Technical design, equipment procurement, construction management, and grid connection."
  },
  {
    icon: Building2,
    title: "Solar & Wind O&M",
    description: "24/7 monitoring from four European control centers, preventive maintenance, rapid emergency response, thermal imaging, and performance optimization."
  },
  {
    icon: Factory,
    title: "BESS Solutions",
    description: "Comprehensive battery energy storage from system design to ongoing monitoring. Large-scale commercial, residential, and SMB solutions."
  },
  {
    icon: Leaf,
    title: "Repowering & Recycling",
    description: "Extend installation lifecycles through strategic repowering. Complete physical recycling capabilities at our Polish facility for PV and wind assets."
  }
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
              alt="Lighthief solar installations"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="solar" className="mb-4">NATO Certified Provider</Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              About
              <span className="block gradient-text">
                Lighthief
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              European-Asian renewable energy O&M operator managing hundreds of megawatts 
              of solar, wind, and biogas installations across 11 countries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/projects">
                <Button variant="gradient" size="lg">
                  View Our Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="section-padding">
        <div className="container">
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

      {/* About Us Story */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded nearly a decade ago, Lighthief has evolved from a small Polish-British company 
                  into a rapidly growing European-Asian renewable energy O&M operator. Today, we manage 
                  hundreds of megawatts of solar, wind, and biogas installations across 11 countries, 
                  providing comprehensive EPC and O&M services throughout the entire lifecycle of 
                  renewable energy projects.
                </p>
                <p>
                  Our team of over 150 renewable energy professionals combines field engineers, technical 
                  specialists, project managers, and monitoring experts—all united by hands-on experience 
                  and commitment to operational excellence. Led by Founder Dr. Arkadius Sybaris, our 
                  multinational workforce speaks the language of local markets while maintaining unified 
                  quality standards.
                </p>
                <p>
                  Our strength lies in our people: engineers who've weathered countless installations, 
                  technicians who know every panel and inverter intimately, and managers who understand 
                  that renewable energy service is ultimately about reliability, response time, and results.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/1690376781153.jpg"
                  alt="Lighthief solar installations"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">11</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Hub */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/solar-park-field-unsplash.jpg"
                  alt="Lighthief Innovation Hub Poland"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4">R&D Center</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Innovation Hub
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our Polish facility represents a major investment in renewable energy research and 
                  development. Located on a <strong>23-hectare site</strong>, this center combines 
                  cutting-edge research with practical applications, featuring:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-solar-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>2×8 MW</strong> photovoltaic farm for live testing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-solar-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>1 MW</strong> biogas plant</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-solar-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Advanced <strong>energy storage systems</strong></span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-solar-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>1,000 m²</strong> office space + <strong>3,500 m²</strong> warehouse</span>
                  </li>
                </ul>
                <p>
                  This living laboratory allows us to test, optimize, and validate technologies before 
                  deploying them across our client portfolio. Our innovative O&M solutions have been 
                  supported by <strong>numerous EU grants</strong> for research and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Standards */}
      <section className="section-padding bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 text-solar-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Security & Standards
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              As a <strong className="text-white">certified NATO service provider</strong>, Lighthief adheres to 
              stringent security protocols and quality standards. This certification reflects our commitment 
              to operational excellence, data security, and reliable service delivery for critical 
              infrastructure projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/10 text-white border-white/20">NATO Certified</Badge>
              <Badge className="bg-white/10 text-white border-white/20">ISO 9001</Badge>
              <Badge className="bg-white/10 text-white border-white/20">ISO 14001</Badge>
              <Badge className="bg-white/10 text-white border-white/20">EU Grants Recipient</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lighthief's strategic goal is to provide comprehensive O&M coverage across the entire 
              European Union and establish ourselves as one of the largest renewable energy service 
              operators in the region. Our expansion into Ukraine and Eurasian markets reflects this 
              ambition, positioning us at the forefront of renewable energy growth in both established 
              and emerging markets.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              End-to-end renewable energy solutions from project development through operations, 
              maintenance, and end-of-life recycling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-full flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-solar-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Over 150 renewable energy professionals across Europe and Asia, led by experienced 
              directors with hands-on expertise earned in the field
            </p>
          </div>

          {/* Horizontal row with circular photos */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center group w-36 sm:w-40">
                {/* Circular Photo */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-solar-400 to-cyprus-600 p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Name & Title */}
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-solar-600 font-medium mt-1">
                  {member.position}
                </p>
                
                {/* Country flags */}
                <div className="flex gap-1 mt-2">
                  {member.countries.map((country, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {country}
                    </span>
                  ))}
                </div>
                
                {/* Email link */}
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-xs text-gray-500 hover:text-solar-600 mt-2 truncate max-w-full"
                >
                  {member.email.split('@')[0]}@...
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategic offices across Europe and Central Asia with 24/7 monitoring centers 
              in Poland, Germany, Italy, and Spain
            </p>
          </div>

          {/* Locations Map */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/loghithief-locations.webp"
                alt="Lighthief global office locations"
                fill
                className="object-contain bg-white"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {officeLocations.map((office, index) => (
              <Card key={index} className={`text-center ${office.status === '2026' ? 'opacity-60' : ''}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="text-2xl mb-2">{office.flag}</div>
                  <div className="font-semibold text-gray-900">{office.city}</div>
                  <div className="text-xs text-gray-500">{office.country}</div>
                  {office.status === '2026' && (
                    <Badge variant="outline" className="mt-2 text-xs">2026</Badge>
                  )}
                  {office.status === 'HQ' && (
                    <Badge variant="solar" className="mt-2 text-xs">HQ</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <strong>24/7 Monitoring Centers:</strong> Częstochowa (Poland), Hannover (Germany), 
              Trieste (Italy), Malaga (Spain)
            </p>
          </div>
        </div>
      </section>

      {/* Why Local Presence */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Why Local Presence Matters
              </h2>
            </div>
            <div className="bg-gradient-to-r from-solar-50 to-cyprus-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700 text-center">
                For O&M and EPC services, local presence isn't just about representation — it's about 
                <strong> boots on the ground</strong>, immediate response capabilities, and deep understanding 
                of regional regulations, weather patterns, and market dynamics. Renewable energy service 
                delivery demands logistics excellence, rapid reaction times, and local market expertise. 
                This is precisely what our partners, investors, and clients value most about working with Lighthief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Partner with Lighthief?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover how our expertise can maximize the performance of your renewable energy investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/energy-storage">
              <Button variant="outline-on-dark" size="lg">
                Explore BESS Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
