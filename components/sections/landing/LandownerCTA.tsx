'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'

const stats = [
  { value: '€25K/year', label: 'Average 5-acre lease' },
  { value: '€600K', label: 'Average sale premium' },
  { value: '18 months', label: 'To Ready-to-Build' },
  { value: 'Free', label: 'Initial Assessment' },
]

export function LandownerCTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-green-500 to-solar-500 text-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="slideLeft">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Own Land in Cyprus?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Discover your land&apos;s solar potential. Get an instant assessment and learn
                how to earn €15K–80K annually or a €200K–2M sale premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                  <Link href="/landowners">
                    Assess My Land Value
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/landowners">
                    Upload Title Deed
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
