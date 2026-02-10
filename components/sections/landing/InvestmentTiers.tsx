'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { ArrowRight } from 'lucide-react'

const tiers = [
  {
    size: '1 MW',
    label: 'Entry',
    investment: '€900K – €1.2M',
    annual: '€120K – €160K',
    irr: '8–10%',
    npv: '€2.5M – €4.0M',
    popular: false,
  },
  {
    size: '5 MW',
    label: 'Most Popular',
    investment: '€4.5M – €6.0M',
    annual: '€600K – €800K',
    irr: '10–12%',
    npv: '€12M – €20M',
    popular: true,
  },
  {
    size: '10 MW',
    label: 'Institutional',
    investment: '€9.0M – €12.0M',
    annual: '€1.2M – €1.6M',
    irr: '10–12%',
    npv: '€25M – €40M',
    popular: false,
  },
]

export function InvestmentTiers() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-sm">Investment Tiers</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Scalable Solar Farm Investments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from proven project sizes with transparent financials — all include
              EPC delivery, grid connection, and optional long-term O&amp;M.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.12}>
          {tiers.map((tier) => (
            <StaggerItem key={tier.size}>
              <div
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  tier.popular
                    ? 'border-2 border-solar-300 shadow-lg ring-1 ring-solar-100'
                    : 'border border-gray-200 shadow-md'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-solar-500 text-white text-xs px-3 shadow-sm">
                      {tier.label}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-1">{tier.size}</div>
                  <div className="text-gray-500 text-sm">{!tier.popular ? tier.label : 'Solar Farm'}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Total Investment</span>
                    <span className="font-semibold text-gray-900">{tier.investment}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Annual Revenue</span>
                    <span className="font-semibold text-gray-900">{tier.annual}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Equity IRR</span>
                    <span className="font-semibold text-emerald-600">{tier.irr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500 text-sm">25-Year NPV</span>
                    <span className="font-semibold text-gray-900">{tier.npv}</span>
                  </div>
                </div>

                <Button
                  variant={tier.popular ? 'gradient' : 'outline'}
                  className="w-full"
                  asChild
                >
                  <Link href="/calculator">
                    Calculate Returns
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection animation="fadeUp" delay={0.3}>
          <p className="text-center text-sm text-gray-400 mt-8">
            All figures are indicative and based on current TSOC market pricing, typical Cyprus irradiation, and standard financing assumptions.
            Actual returns depend on site-specific conditions, grid connection timing, and PPA terms.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
