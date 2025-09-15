import { Metadata } from 'next'
import Image from 'next/image'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Calendar,
  MessageCircle,
  FileText,
  Users,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Lighthief Cyprus | Solar Investment Consultation',
  description: 'Contact Lighthief Cyprus for solar farm investment opportunities. Schedule free consultation, download investment guides, or speak with our Cyprus-based experts.',
  keywords: [
    'contact Lighthief Cyprus',
    'solar investment consultation',
    'Cyprus solar experts',
    'renewable energy consultation',
    'solar farm investment contact',
  ],
}

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Consultation",
    description: "Speak directly with our investment experts",
    contact: "+357 [Cyprus Office]",
    availability: "Mon-Fri 9AM-6PM CET",
    action: "Call Now",
    color: "solar"
  },
  {
    icon: Mail,
    title: "Email Inquiry",
    description: "Detailed written consultation and proposals",
    contact: "info@solarfarms.cy",
    availability: "24-hour response guarantee",
    action: "Send Email", 
    color: "cyprus"
  },
  {
    icon: Calendar,
    title: "Video Conference",
    description: "Virtual meetings with screen sharing and presentations",
    contact: "Book online calendar",
    availability: "Flexible scheduling available",
    action: "Schedule Meeting",
    color: "green"
  },
  {
    icon: MapPin,
    title: "Office Visit",
    description: "In-person meetings at our Cyprus headquarters",
    contact: "Cyprus Headquarters",
    availability: "By appointment",
    action: "Book Visit",
    color: "blue"
  }
]

const offices = [
  {
    city: "Cyprus (Headquarters)",
    address: "28 October Ave 249\nLophitis Business Center 1, Office 201\n3035 Limassol, Cyprus",
    phone: "+357 77 77 00 50",
    email: "office@lighthief.com",
    hours: "Mon-Fri 9AM-6PM CET",
    primary: true
  },
  {
    city: "Business Development",
    address: "Alexander Papacosta\nBusiness Development Manager",
    phone: "+357 99 164 158", 
    email: "alexander.papacosta@lighthief.com",
    hours: "Mon-Fri 9AM-6PM CET",
    primary: false
  },
  {
    city: "Investor Relations",
    address: "Investment & Partnership Inquiries",
    phone: "+357 95 152 788",
    email: "a.sybaris@lighthief.com", 
    hours: "Mon-Fri 9AM-6PM CET",
    primary: false
  }
]

const faqs = [
  {
    question: "What is the minimum investment amount?",
    answer: "Our investment opportunities start from €900,000 for 1MW solar farms. We also offer fractional ownership options for smaller investors through our investment syndication program."
  },
  {
    question: "How long does the investment process take?",
    answer: "From initial consultation to operational solar farm typically takes 6-12 months, significantly faster than the industry average of 18-24 months due to our streamlined process and ready-to-build projects."
  },
  {
    question: "What guarantees do you provide?",
    answer: "We provide comprehensive guarantees including 25-year performance warranty, 99.5% uptime guarantee, fixed construction costs, and timeline commitments with penalty clauses for delays."
  },
  {
    question: "Can international investors participate?",
    answer: "Yes, we welcome international investors. Cyprus's EU membership provides a stable regulatory framework, and we assist with all legal and tax considerations for foreign investment."
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Contact Lighthief Cyprus"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Get Started with
              <span className="block gradient-text">
                Solar Investing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Schedule a free consultation with our Cyprus-based solar investment experts. 
              We'll prepare a customized proposal within 24 hours.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-600">Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24h</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">€500M+</div>
                <div className="text-sm text-gray-600">Managed Assets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">150+</div>
                <div className="text-sm text-gray-600">Happy Investors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our solar investment experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className={`w-6 h-6 text-${method.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <div className="text-sm font-medium text-gray-900 mb-1">{method.contact}</div>
                  <div className="text-xs text-gray-500 mb-4">{method.availability}</div>
                  <Button variant="outline" size="sm" className="group-hover:bg-solar-50">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <ContactForm />
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
              Global presence with local expertise in key renewable energy markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className={`${office.primary ? 'border-2 border-solar-200' : ''} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{office.city}</CardTitle>
                    {office.primary && (
                      <Badge variant="solar">Headquarters</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600 whitespace-pre-line">{office.address}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="text-sm text-gray-600">{office.phone}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="text-sm text-gray-600">{office.email}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="text-sm text-gray-600">{office.hours}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about solar farm investments and our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Have more questions? Our investment experts are here to help.
            </p>
            <Button variant="gradient" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
