'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Clock, FileText, Download, ArrowRight } from 'lucide-react'
import {
  PV_FEASIBILITY_PACKAGES,
  PV_FEASIBILITY_NOTES,
  type FeasibilityPackageId,
} from '@/lib/pv-feasibility-packages'

function PackageCTA({ packageId, name }: { packageId: FeasibilityPackageId; name: string }) {
  return (
    <Button variant={packageId === 'professional' ? 'gradient' : 'outline'} className="w-full" asChild>
      <Link href={`/contact?subject=Feasibility%20${encodeURIComponent(name)}%20Package`}>
        Request {name}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  )
}

export function FeasibilityPackages() {
  return (
    <section id="feasibility-packages" className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-[#1A365D] text-white hover:bg-[#1A365D]">
            From free assessment to Ready-to-Build
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Feasibility Study Packages
          </h2>
          <p className="text-xl text-gray-600">
            Start with our free instant land assessment, then choose a fixed-fee package to validate
            your site, grid connection, and licensing path. Fees credited toward EPC if you build with us.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {PV_FEASIBILITY_PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative flex flex-col h-full ${
                pkg.popular ? 'border-2 border-[#C9A432] shadow-xl lg:scale-[1.02]' : 'border border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#C9A432] text-gray-900 hover:bg-[#C9A432] px-4">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Package {pkg.number}
                </div>
                <CardTitle className="text-2xl text-[#1A365D]">{pkg.name}</CardTitle>
                <CardDescription className="text-base">{pkg.tagline}</CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-[#1A365D]">{pkg.priceLabel}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Fixed fee · ex VAT · authority fees separate
                    {pkg.maxCapacity ? ` · ${pkg.maxCapacity}` : ''}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-4">
                <p className="text-sm text-gray-600 italic">{pkg.recommendedFor}</p>
                <ul className="space-y-2 text-sm flex-1">
                  {pkg.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {pkg.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-amber-800">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{item} — not included</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {pkg.delivery}
                  </div>
                  <div><strong>Payment:</strong> {pkg.paymentTerms}</div>
                </div>
                <PackageCTA packageId={pkg.id} name={pkg.name} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-[#1A365D]/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#C9A432] flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{PV_FEASIBILITY_NOTES.epcCredit}</p>
                  <p>{PV_FEASIBILITY_NOTES.freeConsultation}</p>
                  <p>{PV_FEASIBILITY_NOTES.authorityFees}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button variant="outline" asChild>
                  <a href={PV_FEASIBILITY_NOTES.pdfPath} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Package Brochure
                  </a>
                </Button>
                <Button variant="gradient" asChild>
                  <Link href="/contact?subject=Free%20Landowner%20Consultation">
                    Book Free 30-Minute Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
