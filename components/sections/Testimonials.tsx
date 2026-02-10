'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Quote, 
  Building2, 
  Award, 
  Shield, 
  CheckCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Marcus Schmidt",
    role: "Private Investor",
    location: "Munich, Germany",
    image: null,
    initials: "MS",
    rating: 5,
    text: "After researching solar investments across Southern Europe, Cyprus stood out. Lighthief's team provided exceptional due diligence on my 2MW acquisition. The ROI has exceeded projections despite curtailment challenges.",
    investment: "€2.4M Investment",
    highlight: "Exceeded Projections"
  },
  {
    id: 2,
    name: "Elena Petrov",
    role: "Family Office Director",
    location: "London, UK",
    image: null,
    initials: "EP",
    rating: 5,
    text: "We've deployed €12M across three Cyprus solar parks through SolarFarms.cy. The transparency of financials and BESS integration advice has been invaluable. Highly recommend for institutional investors.",
    investment: "€12M Portfolio",
    highlight: "3 Parks Acquired"
  },
  {
    id: 3,
    name: "Dmitri Volkov",
    role: "Tech Entrepreneur",
    location: "Limassol, Cyprus",
    image: null,
    initials: "DV",
    rating: 5,
    text: "As a Cyprus-based investor, I wanted local expertise. Lighthief helped me navigate the licensing process and acquire a ready-to-build 5MW park. The ongoing O&M support has been excellent.",
    investment: "€8.5M Investment",
    highlight: "RTB to Operational"
  },
]

const trustSignals = [
  {
    icon: Shield,
    title: "100s MW Assets Managed",
    description: "Across Cyprus solar portfolio"
  },
  {
    icon: Award,
    title: "Official Tier-1 BESS Partner",
    description: "Cyprus distributor & O&M"
  },
  {
    icon: Building2,
    title: "15+ Years Experience",
    description: "In renewable energy sector"
  },
  {
    icon: CheckCircle,
    title: "EU Regulated",
    description: "Cyprus company registration"
  }
]

const partners = [
  { name: "Tier-1 BESS OEM", description: "BESS Systems" },
  { name: "EAC", description: "Grid Connection" },
  { name: "Bank of Cyprus", description: "Project Financing" },
  { name: "PWC Cyprus", description: "Tax Advisory" },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextSlide = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Trusted by Investors</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What Our Investors Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join successful investors who have trusted Lighthief Cyprus for their solar investments
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustSignals.map((signal, index) => (
            <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-solar-100 to-cyprus-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <signal.icon className="w-6 h-6 text-solar-600" />
                </div>
                <h4 className="font-semibold text-gray-900">{signal.title}</h4>
                <p className="text-sm text-gray-600">{signal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="border-0 shadow-xl bg-white">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Left - Quote */}
                        <div className="flex-1">
                          <Quote className="w-12 h-12 text-solar-200 mb-4" />
                          
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>

                          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                            &ldquo;{testimonial.text}&rdquo;
                          </blockquote>

                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-solar-500 to-cyprus-600 flex items-center justify-center text-white font-bold text-lg">
                              {testimonial.initials}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{testimonial.name}</div>
                              <div className="text-sm text-gray-600">{testimonial.role}</div>
                              <div className="text-sm text-gray-500">{testimonial.location}</div>
                            </div>
                          </div>
                        </div>

                        {/* Right - Stats */}
                        <div className="md:w-48 flex md:flex-col gap-4 justify-center">
                          <div className="bg-gradient-to-br from-solar-50 to-cyprus-50 rounded-xl p-4 text-center flex-1">
                            <div className="text-2xl font-bold gradient-text">{testimonial.investment.split(' ')[0]}</div>
                            <div className="text-xs text-gray-600">{testimonial.investment.split(' ')[1]}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center flex-1">
                            <div className="text-2xl font-bold text-green-600">{testimonial.highlight.split(' ')[0]}</div>
                            <div className="text-xs text-gray-600">{testimonial.highlight.split(' ').slice(1).join(' ')}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-solar-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
            Trusted Partners & Collaborators
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="text-xl font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  {partner.name}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                  {partner.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
