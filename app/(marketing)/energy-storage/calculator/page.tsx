import { Metadata } from 'next'
import Link from 'next/link'
import { BESSFinanceCalculator } from '@/components/calculators/BESSFinanceCalculator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Battery, ArrowLeft, Calculator, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS Finance Calculator | Battery Storage ROI Analysis | SolarFarms.cy',
  description: 'Professional BESS financial calculator for Cyprus. Model standalone battery storage or Solar+BESS investments with full ROI, IRR, NPV analysis. Export detailed PDF reports.',
  keywords: [
    'BESS calculator',
    'battery storage ROI',
    'BESS financial model',
    'battery investment calculator',
    'solar BESS calculator',
    'energy storage ROI Cyprus',
    'battery NPV IRR calculator',
    'BESS investment analysis',
    'Linyang battery calculator',
    'Cyprus BESS financing',
  ],
  openGraph: {
    title: 'BESS Finance Calculator | Battery Storage Investment Analysis',
    description: 'Professional BESS financial calculator. Model battery storage investments with full ROI, IRR, and NPV analysis.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://solarfarms.cy/energy-storage/calculator'
  }
}

export default function BESSCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link href="/energy-storage" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Energy Storage
            </Link>
            <span>/</span>
            <span>Calculator</span>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-blue-500 text-white">
              <Calculator className="w-3 h-3 mr-1" />
              Professional Tool
            </Badge>
            <Badge className="bg-green-500 text-white">
              <FileText className="w-3 h-3 mr-1" />
              PDF Export
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            BESS Finance Calculator
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl">
            Professional-grade battery energy storage financial modeling. 
            Analyze standalone BESS or Solar+BESS investments with comprehensive 
            ROI, IRR, NPV, and cash flow projections.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <Battery className="w-4 h-4" />
              <span>Linyang Pricing Built-in</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <Calculator className="w-4 h-4" />
              <span>25-Year Projections</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <FileText className="w-4 h-4" />
              <span>Investor-Grade Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding">
        <div className="container">
          <BESSFinanceCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Ready to Discuss Your BESS Project?
            </h2>
            <p className="text-gray-600 mb-6">
              Our team can provide a customized analysis based on your specific site conditions, 
              curtailment data, and investment requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/energy-storage#inquiry-form">
                  Request Custom Proposal
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
