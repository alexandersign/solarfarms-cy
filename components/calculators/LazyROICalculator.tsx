'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const ROICalculator = dynamic(
  () => import('@/components/calculators/ROICalculator').then((m) => ({ default: m.ROICalculator })),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false,
  }
)

function CalculatorSkeleton() {
  return (
    <div className="animate-pulse space-y-6 rounded-xl border border-gray-200 bg-white p-8">
      <div className="h-8 w-2/3 mx-auto rounded bg-gray-200" />
      <div className="h-4 w-1/2 mx-auto rounded bg-gray-100" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="h-24 rounded bg-gray-100" />
        <div className="h-24 rounded bg-gray-100" />
        <div className="h-24 rounded bg-gray-100" />
      </div>
      <div className="h-12 w-64 mx-auto rounded bg-gray-200" />
    </div>
  )
}

export function LazyROICalculator() {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof window !== 'undefined' && window.location.hash === '#calculator') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="min-h-[320px]">
      {shouldLoad ? <ROICalculator /> : <CalculatorSkeleton />}
    </div>
  )
}
