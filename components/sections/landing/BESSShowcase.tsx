'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Battery, Shield, Zap, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

const highlights = [
  'Tier-1 OEM — cell manufacturer & PCS supplier',
  'Multi-layered insurance: product liability, professional indemnity, all-risk',
  '15-year LTSA with SOH performance guarantees',
  'Official distributor — warranty chain fully unified',
  'Grid-forming inverters for Cyprus island grid',
  'Real-time SCADA & energy management',
]

export function BESSShowcase() {
  return (
    <section className="section-padding bg-gradient-to-br from-cyprus-900 via-cyprus-800 to-blue-900 text-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection animation="slideLeft">
            <div>
              <Badge className="mb-5 bg-white/10 text-white border border-white/20">
                <Battery className="w-3.5 h-3.5 mr-1.5" />
                Battery Energy Storage
              </Badge>

              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight">
                Bankable BESS Systems
                <span className="block text-solar-300 mt-1">Built for Lenders</span>
              </h2>

              <p className="text-lg text-cyprus-200 mb-8 leading-relaxed">
                Cyprus&apos;s isolated grid needs storage — and lenders need bankability.
                Lighthief delivers both: Tier-1 BESS hardware with the warranties,
                insurance, and O&amp;M track record that banks require.
              </p>

              <ul className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-cyprus-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-cyprus-900 hover:bg-gray-100" asChild>
                  <Link href="/energy-storage">
                    Explore BESS Solutions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/energy-storage/calculator">
                    BESS Investment Calculator
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats / Visual */}
          <AnimatedSection animation="slideRight" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <Zap className="w-8 h-8 text-solar-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">5 MWh</div>
                <div className="text-sm text-cyprus-300">Per Container</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">15 yr</div>
                <div className="text-sm text-cyprus-300">LTSA Warranty</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">87.8%</div>
                <div className="text-sm text-cyprus-300">Round-Trip Efficiency</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                <Battery className="w-8 h-8 text-amber-300 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">6,000</div>
                <div className="text-sm text-cyprus-300">Cycle Life</div>
              </div>

              {/* Full-width bottom card */}
              <div className="col-span-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Fully Bankable</div>
                    <div className="text-sm text-cyprus-200">
                      OEM warranty + distributor insurance + O&amp;M guarantee = lender-ready asset
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
