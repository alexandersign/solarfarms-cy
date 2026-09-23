'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { ArrowRight, MapPin } from 'lucide-react'
import { getFeaturedListings } from '@/lib/investment-listings'

import { publicHybridCase } from '@/lib/public-hybrid-ssot'

function eurM(n: number) {
  return `€${(n / 1_000_000).toFixed(2)}M`
}

function eurK(n: number) {
  return `€${Math.round(n / 1000)}K`
}

const sizeMw = [1, 5, 10] as const
const tiers = sizeMw.map((mw) => {
  const fixed = publicHybridCase(mw, 'fixed')
  const tracker = publicHybridCase(mw, 'tracker')
  const label = mw === 5 ? 'Most Popular' : mw === 1 ? 'Entry' : 'Institutional'
  return {
    size: `${mw} MW`,
    label,
    subtitle: `+ ${mw * 4} MWh BESS`,
    investment: `${eurM(fixed.capex)} – ${eurM(tracker.capex)}`,
    annual: `${eurK(fixed.gross)} – ${eurK(tracker.gross)}`,
    irr: `${((fixed.irr20 ?? 0) * 100).toFixed(1)}–${((tracker.irr20 ?? 0) * 100).toFixed(1)}%`,
    payback: `${Math.min(fixed.simplePayback ?? 99, tracker.simplePayback ?? 99).toFixed(1)}–${Math.max(fixed.simplePayback ?? 99, tracker.simplePayback ?? 99).toFixed(1)} yr`,
    popular: mw === 5,
  }
})

const featured = getFeaturedListings(2)

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
              All-in turnkey pricing: PV EPC + 4-hour BESS + RTB + indicative EAC connection.
              Fixed bifacial or 2P tracker. Public O&amp;M and LTSA included in the model.
            </p>
            <div className="mt-6">
              <Button variant="gradient" size="lg" asChild className="focus-visible:ring-2 focus-visible:ring-[#1A365D]">
                <Link href="/projects">
                  View current opportunities
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {featured.length > 0 && (
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
              {featured.map((listing) => (
                <Link
                  key={listing.slug}
                  href={listing.detailRoute}
                  className="group rounded-xl border border-cyprus-100 bg-cyprus-50/50 p-4 hover:border-cyprus-300 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-cyprus-600 uppercase tracking-wide">
                        Live listing
                      </p>
                      <p className="font-semibold text-gray-900 group-hover:text-[#1A365D] line-clamp-1">
                        {listing.publicTitle}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
                        {listing.publicLocation}
                        {listing.capacityMW > 0 ? ` · ${listing.capacityMW} MW` : ''}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyprus-500 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}

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
                  <div className="text-sm font-medium text-cyprus-600">{tier.subtitle}</div>
                  <div className="text-gray-400 text-xs mt-1">{!tier.popular ? tier.label : 'Solar + BESS'}</div>
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
                    <span className="text-gray-500 text-sm">20-year IRR</span>
                    <span className="font-semibold text-emerald-600">{tier.irr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500 text-sm">Simple payback</span>
                    <span className="font-semibold text-gray-900">{tier.payback}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={tier.popular ? 'gradient' : 'outline'}
                    className="w-full focus-visible:ring-2 focus-visible:ring-[#1A365D]"
                    asChild
                  >
                    <Link href="/calculator">
                      Calculate Returns
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-cyprus-700" asChild>
                    <Link href="/projects">Browse listings</Link>
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection animation="fadeUp" delay={0.3}>
          <p className="text-center text-sm text-gray-400 mt-8">
            100% equity, current TSOC DAM, 50% curtailment recovery into a 4-hour BESS.
            Indicative, ex-VAT. Site-specific land lease and grid works can move the ticket.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
