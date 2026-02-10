'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sun, Shield, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/solar-park-field-unsplash.jpg"
          alt="Solar panels against bright blue Cyprus sky"
          fill
          className="object-cover opacity-8"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 text-sm font-medium">
                <Sun className="w-3.5 h-3.5 mr-1.5" />
                Europe&apos;s Sunniest Investment Climate
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Cyprus Solar &amp; BESS
              <span className="block gradient-text mt-1">
                Investments That Perform
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 text-balance leading-relaxed">
              Turnkey solar farms and battery storage with 8-12% equity IRR,
              full EPC delivery, and long-term O&amp;M — backed by Tier-1 OEM
              partnerships and multi-layered insurance.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
            >
              <Button variant="gradient" size="xl" asChild>
                <Link href="/investment-guide">
                  Explore Investments
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/energy-storage/calculator">
                  <Play className="w-4 h-4 mr-2" />
                  BESS Calculator
                </Link>
              </Button>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {[
                { value: '3,300+', label: 'Sun Hours / Year', icon: Sun },
                { value: '8-12%', label: 'Equity IRR', icon: Zap },
                { value: '15+', label: 'Years Experience', icon: Shield },
                { value: '100s MW', label: 'Under Management', icon: Shield },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                alt="Modern solar farm installation in Cyprus with blue sky and mountains"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Turnkey EPC + O&amp;M</div>
                    <div className="text-sm font-semibold text-gray-900">Solar &amp; BESS — Single Partner</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solar-500 to-cyprus-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">300+</div>
                <div className="text-xs text-gray-500">Sunny Days / Year</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">Bankable</div>
                <div className="text-xs text-gray-500">Insured &amp; Warranted</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
