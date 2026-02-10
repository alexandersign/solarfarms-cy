'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import {
  Wrench,
  Shield,
  Battery,
  Sun,
  BarChart3,
  Globe,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'EPC Delivery',
    description: 'Full turnkey Engineering, Procurement & Construction for solar farms and BESS — from design to grid connection.',
    href: '/services/epc-services',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'O&M Services',
    description: 'Long-term Operations & Maintenance with performance guarantees, real-time monitoring, and preventive care.',
    href: '/services/om-management',
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Battery,
    title: 'BESS Integration',
    description: 'Tier-1 battery energy storage systems — bankable, warranted, and optimised for Cyprus grid conditions.',
    href: '/energy-storage',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Sun,
    title: 'Solar Investments',
    description: 'Ready-to-build Cyprus solar parks with 8-12% equity IRR and full lifecycle management.',
    href: '/investment-guide',
    color: 'from-solar-500 to-yellow-500',
    bg: 'bg-solar-50',
  },
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description: 'Real-time TSOC electricity market data and BESS arbitrage analysis for informed decision-making.',
    href: '/market',
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50',
  },
  {
    icon: Globe,
    title: 'Cross-European Expertise',
    description: '8+ years across European renewables. Multi-market O&M experience scaled to Cyprus\'s island-grid context.',
    href: '/about',
    color: 'from-cyprus-500 to-blue-600',
    bg: 'bg-cyprus-50',
  },
]

export function WhyLighthief() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-sm">Why Lighthief</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              One Partner. Full Lifecycle.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From EPC construction to long-term O&amp;M, from solar farms to bankable BESS —
              Lighthief delivers the complete renewable energy value chain in Cyprus.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link href={service.href} className="group block h-full">
                <div className="relative h-full bg-white rounded-2xl border border-gray-100 p-7 transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                    <service.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-solar-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-solar-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimatedSection animation="fadeUp" delay={0.3}>
          <div className="text-center mt-12">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/contact">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
