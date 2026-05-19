import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, Zap, Battery, ArrowRight } from 'lucide-react'
import { BESS_DELIVERY_STEPS } from '@/lib/marketing/bess-page'

export function BessDeliveryProcess() {
  return (
    <section id="how-we-deliver" className="section-padding bg-gray-50 scroll-mt-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-[#C9A432]">
            How Lighthief Delivers BESS in Cyprus
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            End-to-end turnkey delivery — from site assessment through commissioning and long-term O&M
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {BESS_DELIVERY_STEPS.map((step) => (
            <Card key={step.step} className="overflow-hidden border border-gray-200">
              <div className="grid lg:grid-cols-3 gap-0">
                <div
                  className="p-8 flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #1A365D 0%, #2B5FA0 100%)' }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">Step {step.step}</div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                </div>

                <div className="lg:col-span-2 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>

                  <div
                    className="rounded-lg p-4 mb-6 border"
                    style={{ backgroundColor: '#F0F4F8', borderColor: '#1A365D33' }}
                  >
                    <h4 className="font-semibold mb-2 text-[#1A365D]">Lighthief advantage</h4>
                    <p className="text-sm text-gray-700">{step.lighthiefAdvantage}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key deliverables</h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#1A365D] hover:bg-[#2B5FA0]" asChild>
            <Link href="/energy-storage/calculator">
              <Zap className="w-5 h-5 mr-2" />
              BESS ROI Calculator
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#inquiry-form">
              <Battery className="w-5 h-5 mr-2" />
              Request Proposal
            </Link>
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Installation discipline:{' '}
          <Link href="/services/epc-services" className="text-[#1A365D] hover:underline font-medium">
            EPC services
          </Link>
          {' · '}
          Ongoing operations:{' '}
          <Link href="/services/om-management" className="text-[#1A365D] hover:underline font-medium">
            O&M management
          </Link>
          {' · '}
          Market data:{' '}
          <Link href="/market" className="text-[#1A365D] hover:underline font-medium">
            Cyprus DAM pricing
            <ArrowRight className="w-3 h-3 inline ml-0.5" />
          </Link>
        </p>
      </div>
    </section>
  )
}
