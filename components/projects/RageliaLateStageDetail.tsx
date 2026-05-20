import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowLeft, Battery, Sun, Clock, PenLine } from 'lucide-react'
import type { RageliaLateStagePark } from '@/lib/deals/ragelia-late-stage'
import { formatCurrency } from '@/lib/utils'

type Props = {
  park: RageliaLateStagePark
}

export function RageliaLateStageDetail({ park }: Props) {
  const loiHref = `/loi?listing=${encodeURIComponent(park.slug)}`
  const tierColor =
    park.tier === 'tier2_late' ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'

  return (
    <div className="min-h-screen">
      <section className="relative section-padding bg-gradient-to-br from-cyprus-800 via-cyprus-900 to-solar-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
            alt={park.publicTitle}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <Button variant="ghost" className="text-white/80 hover:text-white mb-6 -ml-2" asChild>
            <Link href="/projects/ragelia-portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ragelia portfolio
            </Link>
          </Button>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-amber-500 text-white">Late stage</Badge>
              <Badge className={tierColor}>{park.tierLabel}</Badge>
              <Badge className="bg-white/20 text-white">{park.referenceCode}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{park.publicTitle}</h1>
            <div className="flex items-center gap-2 text-white/80 mb-6">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>{park.publicLocation}</span>
            </div>
            <p className="text-lg text-white/90 mb-8">{park.summary}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Sun className="w-5 h-5 mx-auto mb-1 text-solar-300" />
                <div className="text-xl font-bold">{park.capacityMW} MWp</div>
              </div>
              {park.bessLabel ? (
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <Battery className="w-5 h-5 mx-auto mb-1 text-green-400" />
                  <div className="text-sm font-medium">{park.bessLabel}</div>
                </div>
              ) : null}
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-solar-300" />
                <div className="text-sm font-medium">RTB {park.rtbTarget}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Indicative terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span>Park ID</span>
                <span className="font-medium text-gray-900">{park.parkId}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Indicative asking price</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(park.askingPriceEUR)}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Development status</span>
                <span className="font-medium text-gray-900">{park.tierLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>RTB target</span>
                <span className="font-medium text-gray-900">{park.rtbTarget}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                {park.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-cyprus-600">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <p className="text-sm text-amber-900 mb-4">
                Investor teaser not yet published for this park. Express interest via LOI; we will
                share a data room when the RTB milestone is reached ({park.rtbTarget}).
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" asChild>
                  <Link href={loiHref}>
                    <PenLine className="w-4 h-4 mr-2" />
                    Letter of intent
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/projects">All listings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-gray-500">
            Indicative only — not an offer. Part of{' '}
            <Link href="/projects/ragelia-portfolio" className="text-cyprus-600 underline">
              RAGELIA-PORTFOLIO-2026
            </Link>
            . Lighthief Cyprus Ltd (HE 477423).
          </p>
        </div>
      </section>
    </div>
  )
}
