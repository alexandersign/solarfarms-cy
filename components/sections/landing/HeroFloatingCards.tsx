'use client'

import { motion } from 'framer-motion'

export function HeroFloatingCards() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 z-10"
      >
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text">300+</div>
          <div className="text-xs text-gray-600">Sunny Days / Year</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 z-10"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">Bankable</div>
          <div className="text-xs text-gray-600">Insured &amp; Warranted</div>
        </div>
      </motion.div>
    </>
  )
}
