import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Zap,
  Battery,
  Sun,
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react'
import { InvestorPackActions } from '@/components/investor/InvestorPackActions'
import type { RtbDeal, RtbStatus } from '@/lib/deals/rtb-deal-types'
import { formatCurrency } from '@/lib/utils'

function statusBadgeClass(status: RtbStatus): string {
  switch (status) {
    case 'ready_to_build':
    case 'fully_licensed':
      return 'bg-green-500 text-white'
    case 'permit_ready':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-amber-500 text-white'
  }
}

function statusLabel(status: RtbStatus): string {
  switch (status) {
    case 'ready_to_build':
      return 'Ready to Build'
    case 'permit_ready':
      return 'Permit Ready'
    case 'fully_licensed':
      return 'Fully Licensed'
    default:
      return 'RTB'
  }
}

type Props = {
  deal: RtbDeal
}

export function RtbProjectDetail({ deal }: Props) {
  const opexY1Total =
    deal.opexY1.pvOm + deal.opexY1.bessOm + deal.opexY1.landLease + deal.opexY1.other

  return (
    <div className="min-h-screen">
      <section className="relative section-padding bg-gradient-to-br from-solar-900 via-cyprus-800 to-solar-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-park-field-unsplash.jpg"
            alt={deal.publicTitle}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <Button variant="ghost" className="text-white/80 hover:text-white mb-6 -ml-2" asChild>
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All listings
            </Link>
          </Button>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className={statusBadgeClass(deal.rtbStatus)}>{statusLabel(deal.rtbStatus)}</Badge>
              <Badge className="bg-white/20 text-white backdrop-blur-sm">{deal.referenceCode}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{deal.publicTitle}</h1>
            <div className="flex items-center gap-2 text-white/80 mb-8">
              <MapPin className="w-5 h-5 text-solar-300 shrink-0" />
              <span>{deal.locationLine}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Sun className="w-6 h-6 text-solar-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">{deal.solarMWp} MWp</div>
                <div className="text-sm text-white/70">Solar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Battery className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{deal.bessMWh} MWh</div>
                <div className="text-sm text-white/70">BESS ({deal.bessDurationHours}h)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-solar-300 mx-auto mb-2" />
                <div className="text-2xl font-bold">{deal.finance.leveredEquityIrrIndicative}</div>
                <div className="text-sm text-white/70">Indic. IRR (equity)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">
                  {formatCurrency(deal.finance.grossEnergyRevenueY1EUR)}
                </div>
                <div className="text-sm text-white/70">Y1 gross revenue (indic.)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container max-w-4xl">
          <InvestorPackActions slug={deal.slug} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Permits &amp; licensing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{deal.permitSummary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyprus-600" />
                  Grid &amp; timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{deal.gridConnectionNote}</p>
                <p className="text-sm font-medium text-gray-900">{deal.timelineNote}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Technical summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600">Solar technology</div>
                  <div className="font-medium text-gray-900">{deal.technologySolar}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600">BESS</div>
                  <div className="font-medium text-gray-900">{deal.technologyBess}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600">Annual production (indic.)</div>
                  <div className="font-medium text-gray-900">
                    {deal.annualProductionMWh.toLocaleString()} MWh/yr
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600">Specific yield</div>
                  <div className="font-medium text-gray-900">
                    {deal.specificYieldKwhPerKwp.toLocaleString()} kWh/kWp
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle>Indicative economics</CardTitle>
              <p className="text-sm text-gray-600 font-normal">
                Illustrative only — not an offer. Review the investor teaser and your advisers.
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-600">
                      <th className="py-2 pr-4">Item</th>
                      <th className="py-2 text-right">Indicative (€)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">RTB acquisition (seller asking)</td>
                      <td className="py-2 text-right font-medium">
                        {formatCurrency(deal.capex.rtbAcquisition)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">PV EPC</td>
                      <td className="py-2 text-right">{formatCurrency(deal.capex.pvEpc)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">BESS EPC</td>
                      <td className="py-2 text-right">{formatCurrency(deal.capex.bessEpc)}</td>
                    </tr>
                    {deal.capex.connectionTerms > 0 ? (
                      <tr className="border-b border-gray-100">
                        <td className="py-2">Grid connection terms</td>
                        <td className="py-2 text-right">
                          {formatCurrency(deal.capex.connectionTerms)}
                        </td>
                      </tr>
                    ) : null}
                    <tr className="font-bold">
                      <td className="py-3">Total indicative stack</td>
                      <td className="py-3 text-right">{formatCurrency(deal.capex.total)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">Y1 gross energy revenue (model)</td>
                      <td className="py-2 text-right text-green-700 font-medium">
                        {formatCurrency(deal.finance.grossEnergyRevenueY1EUR)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">Y1 OPEX (indic.)</td>
                      <td className="py-2 text-right">{formatCurrency(opexY1Total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p>
              Materials are indicative and confidential. {deal._meta.note} Last reviewed:{' '}
              {deal._meta.date}. Lighthief Cyprus Ltd (HE 477423) — solarfarms.cy
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
