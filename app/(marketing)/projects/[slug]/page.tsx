import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RtbProjectDetail } from '@/components/projects/RtbProjectDetail'
import { RageliaLateStageDetail } from '@/components/projects/RageliaLateStageDetail'
import { getRtbDealBySlug, getAllRtbDealSlugs } from '@/lib/deals/rtb-deals-registry'
import { getLateStageParkBySlug, getLateStageSlugs } from '@/lib/deals/ragelia-late-stage'
import { getListingBySlug } from '@/lib/investment-listings'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [...getAllRtbDealSlugs(), ...getLateStageSlugs()].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = getListingBySlug(slug)
  const canonical = `https://solarfarms.cy/projects/${slug}`

  const deal = getRtbDealBySlug(slug)
  if (deal) {
    const title = `${deal.publicTitle} | ${deal.locationLine} | Cyprus Solar Investment`
    const description = `${deal.solarMWp} MWp solar + ${deal.bessMWh} MWh BESS. ${deal.locationLine}. ${deal.timelineNote}`
    return {
      title,
      description,
      openGraph: { title, description, type: 'website', url: canonical },
      alternates: { canonical },
    }
  }
  const park = getLateStageParkBySlug(slug)
  if (park) {
    const title = `${park.publicTitle} | Cyprus Late-Stage Solar`
    const description = `${park.summary} ${park.publicLocation}.`
    return {
      title,
      description,
      openGraph: { title, description, type: 'website', url: canonical },
      alternates: { canonical },
    }
  }
  if (listing) {
    const title = `${listing.publicTitle} | ${listing.publicLocation} | Lighthief Cyprus`
    const description = listing.summary
    return {
      title,
      description,
      openGraph: { title, description, type: 'website', url: canonical },
      alternates: { canonical },
    }
  }
  return { title: 'Project | SolarFarms.cy' }
}

export default async function DynamicProjectPage({ params }: PageProps) {
  const { slug } = await params
  const deal = getRtbDealBySlug(slug)
  if (deal) {
    return <RtbProjectDetail deal={deal} />
  }
  const park = getLateStageParkBySlug(slug)
  if (park) {
    return <RageliaLateStageDetail park={park} />
  }
  notFound()
}
