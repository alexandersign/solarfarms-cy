import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle,
  FileText,
  Download,
  PenLine,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import {
  getDealsListings,
  getOperationalReferenceListings,
  dealKindLabel,
  type InvestmentListing,
} from '@/lib/investment-listings'
import { JournalStrip } from '@/components/marketing/JournalStrip'
import { PROJECTS_JOURNAL_POSTS } from '@/lib/marketing/journal-posts'

export const metadata: Metadata = {
  title: 'Solar Projects & Investment Opportunities | Lighthief Cyprus',
  description:
    'Cyprus solar and BESS listings: ready-to-build, secondary sale, and operational reference cases. Teasers, models, and LOI.',
  keywords: [
    'Cyprus solar projects',
    'BESS investment Cyprus',
    'solar farm for sale',
    'ready to build solar Cyprus',
  ],
  openGraph: {
    title: 'Solar & BESS Investment Opportunities | Lighthief Cyprus',
    description:
      'Live Cyprus listings: RTB solar parks, late-stage development, and operational benchmarks with investor packs.',
    type: 'website',
    url: 'https://solarfarms.cy/projects',
  },
  alternates: {
    canonical: 'https://solarfarms.cy/projects',
  },
}

const getStatusColor = (color: string) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  }
  return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

function ListingActions({ listing }: { listing: InvestmentListing }) {
  const loiHref = `/loi?listing=${encodeURIComponent(listing.slug)}`
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <Button variant="gradient" size="sm" className="flex-1 min-w-[8rem]" asChild>
        <Link href={listing.detailRoute}>
          Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
      {listing.teaserFile ? (
        <Button variant="outline" size="sm" asChild>
          <a href={listing.teaserFile} target="_blank" rel="noopener noreferrer">
            <FileText className="w-4 h-4 mr-1" />
            Teaser
          </a>
        </Button>
      ) : null}
      {listing.modelFile ? (
        <Button variant="outline" size="sm" asChild>
          <a href={listing.modelFile} download>
            <Download className="w-4 h-4 mr-1" />
            Excel
          </a>
        </Button>
      ) : null}
      <Button variant="secondary" size="sm" asChild>
        <Link href={loiHref}>
          <PenLine className="w-4 h-4 mr-1" />
          LOI
        </Link>
      </Button>
    </div>
  )
}

function ListingCard({ listing, compact }: { listing: InvestmentListing; compact?: boolean }) {
  const h = compact ? 'h-40' : 'h-48'
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className={`relative ${h}`}>
        <Image
          src={listing.image}
          alt={listing.publicTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <Badge className={getStatusColor(listing.statusColor)}>{listing.statusLabel}</Badge>
          {listing.dealKind ? (
            <Badge variant="outline" className="bg-white/90 text-gray-800 border-0">
              {dealKindLabel(listing.dealKind)}
            </Badge>
          ) : null}
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-xl font-bold">
            {listing.capacityMW > 0 ? `${listing.capacityMW} MW` : '—'}
          </div>
          <div className="text-xs opacity-90 line-clamp-1">{listing.publicLocation}</div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="group-hover:text-solar-600 transition-colors line-clamp-2 text-lg">
          {listing.publicTitle}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Calendar className="w-3 h-3 shrink-0" />
          {listing.completionDate}
          <span className="mx-1">·</span>
          <span className="font-mono text-[10px]">{listing.referenceCode}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-sm text-gray-600 line-clamp-3">{listing.summary}</p>

        <div className="grid grid-cols-2 gap-2 text-center">
          {listing.roiPercent != null ? (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold gradient-text">{listing.roiPercent}%</div>
              <div className="text-[10px] text-gray-600">ROI / IRR (indic.)</div>
            </div>
          ) : (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold text-gray-400">—</div>
              <div className="text-[10px] text-gray-600">ROI / IRR</div>
            </div>
          )}
          {listing.annualRevenueEUR != null ? (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-xs font-bold gradient-text leading-tight">
                {formatCurrency(listing.annualRevenueEUR)}
              </div>
              <div className="text-[10px] text-gray-600">Annual revenue</div>
            </div>
          ) : listing.investmentEUR != null ? (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-xs font-bold gradient-text leading-tight">
                {formatCurrency(listing.investmentEUR)}
              </div>
              <div className="text-[10px] text-gray-600">Indic. value</div>
            </div>
          ) : (
            <div className="p-2 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold text-gray-400">—</div>
              <div className="text-[10px] text-gray-600">Metrics</div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 text-xs text-gray-600 border-t pt-3 mt-auto">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-400 shrink-0 mt-0.5" />
          <span className="italic line-clamp-2">&ldquo;{listing.testimonial.quote}&rdquo;</span>
        </div>

        <ListingActions listing={listing} />
      </CardContent>
    </Card>
  )
}

function FeaturedListingRow({ listing }: { listing: InvestmentListing }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 mb-8">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-auto min-h-[240px]">
          <Image
            src={listing.image}
            alt={listing.publicTitle}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className={getStatusColor(listing.statusColor)}>{listing.statusLabel}</Badge>
            {listing.dealKind ? (
              <Badge className="bg-white/90 text-gray-800">{dealKindLabel(listing.dealKind)}</Badge>
            ) : null}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-2xl font-bold">
              {listing.capacityMW > 0 ? `${listing.capacityMW} MW` : 'Market'}
            </div>
            <div className="text-sm opacity-90">{listing.publicLocation}</div>
          </div>
        </div>

        <div className="p-8 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.publicTitle}</h3>
          <div className="flex items-center text-gray-600 mb-4 text-sm flex-wrap gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{listing.publicLocation}</span>
            <span>·</span>
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{listing.completionDate}</span>
            <span>·</span>
            <span className="font-mono">{listing.referenceCode}</span>
          </div>

          <p className="text-gray-600 mb-4">{listing.summary}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {listing.roiPercent != null && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold gradient-text">{listing.roiPercent}%</div>
                <div className="text-xs text-gray-600">Indicative ROI / IRR</div>
              </div>
            )}
            {listing.annualRevenueEUR != null && (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold gradient-text">
                  {formatCurrency(listing.annualRevenueEUR)}
                </div>
                <div className="text-xs text-gray-600">Annual revenue</div>
              </div>
            )}
            {listing.investmentEUR != null && listing.annualRevenueEUR == null && (
              <div className="text-center p-4 bg-gray-50 rounded-lg col-span-2">
                <div className="text-xl font-bold gradient-text">
                  {formatCurrency(listing.investmentEUR)}
                </div>
                <div className="text-xs text-gray-600">Indicative transaction value</div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
              Highlights
            </h4>
            <div className="space-y-2">
              {listing.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
            <p className="italic text-gray-700 mb-1">&ldquo;{listing.testimonial.quote}&rdquo;</p>
            <p className="text-xs text-gray-600">— {listing.testimonial.client}</p>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Investor pack — indicative only; not an offer. Review teasers and models with your
            advisers.
          </p>
          <ListingActions listing={listing} />
        </div>
      </div>
    </Card>
  )
}

export default function ProjectsPage() {
  const deals = getDealsListings().sort((a, b) => Number(b.featured) - Number(a.featured))
  const featuredDeals = deals.filter((d) => d.featured)
  const otherDeals = deals.filter((d) => !d.featured)
  const operational = getOperationalReferenceListings()

  const dealsCapacityMw = deals
    .filter((d) => d.capacityMW > 0)
    .reduce((s, d) => s + d.capacityMW, 0)
  const dealsInvestment = deals
    .map((d) => d.investmentEUR)
    .filter((n): n is number => n != null)
    .reduce((s, n) => s + n, 0)

  return (
    <div className="min-h-screen">
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
              alt="Solar farm projects"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Solar &amp; BESS
              <span className="block gradient-text">Listings &amp; reference projects</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Licensed development tickets (grid connection status per listing), operational acquisitions,
              and portfolio-scale opportunities — with indicative economics, teasers, and LOI where available.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {dealsCapacityMw > 0 ? `${dealsCapacityMw.toFixed(2)}` : '—'}
                </div>
                <div className="text-sm text-gray-600">MWp in deal lane</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {dealsInvestment > 0 ? `€${(dealsInvestment / 1e6).toFixed(1)}M+` : '—'}
                </div>
                <div className="text-sm text-gray-600">Indic. deal scale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">~30%</div>
                <div className="text-sm text-gray-600">Top levered IRR (RTB)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">{deals.length + operational.length}</div>
                <div className="text-sm text-gray-600">Live listings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Licensed projects, for sale, and market-level materials — grid terms stated on each card.
            </p>
          </div>

          <div className="space-y-8">
            {featuredDeals.map((listing) => (
              <FeaturedListingRow key={listing.slug} listing={listing} />
            ))}
          </div>

          {otherDeals.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {otherDeals.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} compact />
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <Card className="border-2 border-solar-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <Badge variant="solar" className="w-fit mx-auto mb-2">
                  Bespoke
                </Badge>
                <CardTitle>Custom solar / BESS</CardTitle>
                <CardDescription>1–15 MW • Your specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Greenfield or retrofit — we align capacity, storage, and offtake with your target
                  returns.
                </p>
                <Button variant="solar" className="w-full" asChild>
                  <Link href="/contact">Discuss requirements</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-dashed">
              <CardHeader className="text-center">
                <Badge variant="outline" className="w-fit mx-auto mb-2">
                  Documentation
                </Badge>
                <CardTitle>Letter of intent</CardTitle>
                <CardDescription>Non-binding expression of interest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Prefill from any listing with <span className="font-mono text-xs">?listing=slug</span>{' '}
                  on the LOI page.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/loi">
                    <PenLine className="w-4 h-4 mr-2" />
                    Open LOI generator
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Operational reference
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Operational benchmarks with verified production — useful for sizing BESS and merchant
              investment cases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {operational.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} compact />
            ))}
          </div>
        </div>
      </section>

      <JournalStrip
        title="From our journal"
        subtitle="Financing, risk, and BESS guides for Cyprus solar investors."
        posts={PROJECTS_JOURNAL_POSTS}
      />

      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Start your solar investment journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book a call or request a data room — we&apos;ll align the right listing and diligence
            pack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
              <Link href="/contact">Contact Lighthief Cyprus</Link>
            </Button>
            <Button variant="outline-on-dark" size="lg" asChild>
              <Link href="/lighthief-cyprus/parks-for-sale/cyprus-bess-investment-teaser-mar2026.html" target="_blank">
                Cyprus market teaser
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
