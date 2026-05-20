'use client'

import { useState, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Zap,
  Battery,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Send,
  Loader2,
  Sun,
  Leaf,
} from 'lucide-react'

const PORTFOLIO_REF = 'RAGELIA-PORTFOLIO-2026'

interface Park {
  id: string
  type: string
  capacityMW: number
  bessLabel: string | null
  tier: string
  tierColor: 'green' | 'yellow' | 'orange'
  rtbTimeline: string
  /** Public listing slug on /projects when published */
  listingSlug?: string
}

const PARKS: Park[] = [
  {
    id: '#2105',
    type: 'Photovoltaic',
    capacityMW: 0.690,
    bessLabel: null,
    tier: 'Tier 1 — Licensed · connection terms pending',
    tierColor: 'yellow',
    rtbTimeline: 'Grid terms pending',
    listingSlug: 'ragelia-2105',
  },
  {
    id: '#2110',
    type: 'Photovoltaic',
    capacityMW: 0.714,
    bessLabel: null,
    tier: 'Tier 1 — Licensed · connection terms pending',
    tierColor: 'yellow',
    rtbTimeline: 'Grid terms pending',
    listingSlug: 'ragelia-2110',
  },
  {
    id: '#2302',
    type: 'Photovoltaic',
    capacityMW: 0.825,
    bessLabel: null,
    tier: 'Tier 1 — Licensed · connection terms pending',
    tierColor: 'yellow',
    rtbTimeline: 'Grid terms pending',
    listingSlug: 'ragelia-2302',
  },
  {
    id: '#2402',
    type: 'Agrivoltaic + BESS',
    capacityMW: 0.950,
    bessLabel: '0.95 MW / 1.9 MWh',
    tier: 'Tier 2 — Late Stage (~70–85%)',
    tierColor: 'yellow',
    rtbTimeline: 'Q4 2026',
    listingSlug: 'ragelia-2402',
  },
  {
    id: '#2501',
    type: 'Photovoltaic + BESS',
    capacityMW: 0.950,
    bessLabel: '0.4 MW / 2 MWh',
    tier: 'Tier 2 — Late Stage (~70–85%)',
    tierColor: 'yellow',
    rtbTimeline: 'Q4 2026',
    listingSlug: 'ragelia-2501',
  },
  {
    id: '#2205',
    type: 'Photovoltaic',
    capacityMW: 0.500,
    bessLabel: null,
    tier: 'Tier 1 — Licensed · connection terms pending',
    tierColor: 'yellow',
    rtbTimeline: 'Grid terms pending',
    listingSlug: 'ragelia-2205-2206',
  },
  {
    id: '#2206',
    type: 'Photovoltaic + BESS',
    capacityMW: 2.317,
    bessLabel: '2.2 MW / 0.75 MWh',
    tier: 'Tier 1 — Licensed · connection terms pending',
    tierColor: 'yellow',
    rtbTimeline: 'Grid terms pending',
    listingSlug: 'ragelia-2205-2206',
  },
  {
    id: '#2502',
    type: 'Photovoltaic + BESS',
    capacityMW: 2.765,
    bessLabel: '1.2 MW / 2.4 MWh',
    tier: 'Tier 3 — Mid Stage (~40–60%)',
    tierColor: 'orange',
    rtbTimeline: 'Q1 2027',
    listingSlug: 'ragelia-2502',
  },
]

const TOTAL_MW = PARKS.reduce((s, p) => s + p.capacityMW, 0)
const LICENSED_COUNT = PARKS.filter((p) => p.tier.includes('Licensed')).length
const BESS_COUNT = PARKS.filter((p) => p.bessLabel).length

const tierBadgeClass: Record<Park['tierColor'], string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-amber-100 text-amber-800',
  orange: 'bg-orange-100 text-orange-800',
}

export default function RageliaPortfolioPage() {
  const formId = useId()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/project-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectRef: PORTFOLIO_REF,
          name: formState.name,
          email: formState.email,
          phone: formState.phone || null,
          message: formState.message || null,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[520px] flex items-end overflow-hidden">
        <Image
          src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
          alt="Solar farm portfolio Cyprus"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/50 to-transparent" />
        <div className="container relative z-10 pb-12">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            All listings
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-blue-100 text-blue-800">For sale</Badge>
            <Badge variant="outline" className="bg-white/90 text-gray-800 border-0">
              Secondary sale
            </Badge>
            <Badge variant="outline" className="bg-white/90 text-gray-800 border-0 font-mono text-[10px]">
              {PORTFOLIO_REF}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
            Cyprus Solar Portfolio
            <span className="block text-solar-300 mt-1">8 Parks · {TOTAL_MW.toFixed(3)} MW</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Diversified small-cap portfolio — licensed tickets with grid connection terms mostly pending,
            plus late- and mid-stage development. Suitable for phased or bulk acquisition.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-gray-900 text-white">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-solar-300">{TOTAL_MW.toFixed(2)}</div>
              <div className="text-sm text-gray-400 mt-1">Total MW</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-solar-300">{PARKS.length}</div>
              <div className="text-sm text-gray-400 mt-1">Parks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">{LICENSED_COUNT}</div>
              <div className="text-sm text-gray-400 mt-1">Licensed (grid TBD)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">{BESS_COUNT}</div>
              <div className="text-sm text-gray-400 mt-1">BESS-integrated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Park table */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">Portfolio overview</h2>
                <p className="text-gray-600 mb-6">
                  All parks are located in Cyprus. Pricing is available on request following a
                  confidentiality agreement. Technical and licensing documentation will be provided
                  to qualified buyers.
                </p>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-900 text-white">
                        <th className="text-left p-4 font-semibold">#</th>
                        <th className="text-left p-4 font-semibold">Type</th>
                        <th className="text-right p-4 font-semibold">Capacity (MW)</th>
                        <th className="text-left p-4 font-semibold">BESS</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-center p-4 font-semibold">Grid / milestone</th>
                        <th className="text-center p-4 font-semibold">Listing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PARKS.map((park, idx) => (
                        <tr
                          key={park.id}
                          className={`border-t border-gray-100 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <td className="p-4 font-mono text-xs text-gray-500">{park.id}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              {park.type.includes('BESS') ? (
                                <Battery className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              ) : park.type.includes('Agrivoltaic') ? (
                                <Leaf className="w-3.5 h-3.5 text-green-600 shrink-0" />
                              ) : (
                                <Sun className="w-3.5 h-3.5 text-solar-500 shrink-0" />
                              )}
                              <span className="font-medium">{park.type}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-semibold tabular-nums">
                            {park.capacityMW.toFixed(3)}
                          </td>
                          <td className="p-4 text-gray-600 text-xs">
                            {park.bessLabel ?? <span className="text-gray-300">—</span>}
                          </td>
                          <td className="p-4">
                            <Badge className={`text-xs ${tierBadgeClass[park.tierColor]}`}>
                              {park.tier}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`text-xs font-semibold ${
                                park.rtbTimeline === 'Grid terms pending'
                                  ? 'text-amber-700'
                                  : 'text-gray-700'
                              }`}
                            >
                              {park.rtbTimeline}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {park.listingSlug ? (
                              <Link
                                href={`/projects/${park.listingSlug}`}
                                className="text-xs font-medium text-cyprus-600 hover:text-cyprus-800 underline"
                              >
                                View
                              </Link>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                        <td className="p-4 text-gray-700" colSpan={2}>
                          TOTAL
                        </td>
                        <td className="p-4 text-right tabular-nums">{TOTAL_MW.toFixed(3)}</td>
                        <td colSpan={4} />
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {PARKS.map((park) => (
                    <Card key={park.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="font-mono text-xs text-gray-400 block">{park.id}</span>
                            <span className="font-semibold">{park.type}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold">{park.capacityMW.toFixed(3)}</span>
                            <span className="text-xs text-gray-500 ml-1">MW</span>
                          </div>
                        </div>
                        {park.bessLabel && (
                          <div className="flex items-center gap-1 text-xs text-amber-700 mb-2">
                            <Battery className="w-3 h-3" />
                            {park.bessLabel}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${tierBadgeClass[park.tierColor]}`}>
                            {park.tier}
                          </Badge>
                          <span className="text-xs font-semibold text-gray-600">
                            {park.rtbTimeline}
                          </span>
                        </div>
                        {park.listingSlug ? (
                          <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                            <Link href={`/projects/${park.listingSlug}`}>View listing</Link>
                          </Button>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                  <div className="text-right text-sm font-bold text-gray-700 pr-2">
                    Total: {TOTAL_MW.toFixed(3)} MW
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">Portfolio highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Zap className="w-5 h-5 text-solar-500" />,
                      title: 'Licensed tickets — grid terms mostly pending',
                      body: 'Four licensed parks with investor teasers; formal EAC connection terms outstanding on most (see each listing). Package includes constructed 0.5 MW (#2205) with #2206.',
                    },
                    {
                      icon: <Battery className="w-5 h-5 text-amber-500" />,
                      title: 'BESS integration',
                      body: '4 parks include battery storage ranging from 0.75 MWh to 2.4 MWh — positioned for merchant and arbitrage revenue.',
                    },
                    {
                      icon: <Leaf className="w-5 h-5 text-green-600" />,
                      title: 'Agrivoltaic asset',
                      body: 'Park #2402 combines solar generation with agricultural use — a niche and growing segment in the Cyprus licensing framework.',
                    },
                    {
                      icon: <MapPin className="w-5 h-5 text-cyprus-600" />,
                      title: 'Cyprus — EU jurisdiction',
                      body: '15% CIT, EU rule-of-law, established day-ahead market. All parks operate under the Cyprus CERA licensing framework.',
                    },
                  ].map((item) => (
                    <Card key={item.title} className="border border-gray-100">
                      <CardContent className="p-5 flex gap-3">
                        <div className="shrink-0 mt-0.5">{item.icon}</div>
                        <div>
                          <div className="font-semibold text-sm mb-1">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.body}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
                <p className="font-semibold mb-1">Pricing available on request</p>
                <p>
                  No asking prices are published online. Individual park valuations and a portfolio
                  summary are available to qualified buyers following a brief introduction and
                  confidentiality agreement. Use the form opposite to express interest.
                </p>
              </div>
            </div>

            {/* Interest form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 border-solar-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-t-xl pb-4">
                    <CardTitle className="text-lg">Express interest</CardTitle>
                    <p className="text-gray-300 text-sm">
                      We will respond within one business day with pricing and documentation.
                    </p>
                    <div className="mt-2 font-mono text-xs text-gray-400">{PORTFOLIO_REF}</div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">Interest registered</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Thank you. Our team will be in touch within one business day.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/projects">View all listings</Link>
                        </Button>
                      </div>
                    ) : (
                      <form
                        id={formId}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate
                      >
                        <div>
                          <label
                            htmlFor={`${formId}-name`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Full name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id={`${formId}-name`}
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${formId}-email`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id={`${formId}-email`}
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            required
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${formId}-phone`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone / WhatsApp
                          </label>
                          <Input
                            id={`${formId}-phone`}
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+357 ..."
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${formId}-message`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Message
                          </label>
                          <Textarea
                            id={`${formId}-message`}
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="Which parks are of interest? Are you looking at the full portfolio or select parks?"
                            rows={4}
                            disabled={submitting}
                          />
                        </div>

                        {error && (
                          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {error}
                          </p>
                        )}

                        <Button
                          type="submit"
                          variant="gradient"
                          className="w-full"
                          disabled={submitting || !formState.name || !formState.email}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send enquiry
                            </>
                          )}
                        </Button>

                        <p className="text-[11px] text-gray-400 text-center">
                          Seller details are not disclosed at this stage. All inquiries are handled
                          confidentially by SolarFarms.cy.
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Or express interest via LOI</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/loi?listing=ragelia-portfolio`}>Open LOI generator</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="container max-w-3xl text-center">
          <p className="text-xs text-gray-500">
            This listing is for informational purposes only and does not constitute an offer to sell
            or a solicitation to buy any asset. Pricing, capacity figures, and status are indicative
            and subject to change. All information is provided without warranty; buyers should
            conduct independent due diligence. Reference:{' '}
            <span className="font-mono">{PORTFOLIO_REF}</span>.
          </p>
        </div>
      </section>
    </div>
  )
}
