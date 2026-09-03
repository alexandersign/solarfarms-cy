'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sun } from 'lucide-react'

export function HeroSectionContent() {
  return (
    <motion.div
      initial={false}
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
          <Link href="/projects">
            View Projects
          </Link>
        </Button>
        <Button variant="outline" size="xl" asChild>
          <Link href="/energy-storage/calculator">
            <Play className="w-4 h-4 mr-2" />
            BESS Calculator
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {[
          { value: '3,300+', label: 'Sun Hours / Year' },
          { value: '8-12%', label: 'Equity IRR' },
          { value: '15+', label: 'Years Experience' },
          { value: '100s MW', label: 'Under Management' },
        ].map((stat, i) => (
          <div key={i} className="text-center lg:text-left">
            <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-600 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
