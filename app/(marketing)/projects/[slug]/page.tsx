import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RtbProjectDetail } from '@/components/projects/RtbProjectDetail'
import { RageliaLateStageDetail } from '@/components/projects/RageliaLateStageDetail'
import { getRtbDealBySlug, getAllRtbDealSlugs } from '@/lib/deals/rtb-deals-registry'
import { getLateStageParkBySlug, getLateStageSlugs } from '@/lib/deals/ragelia-late-stage'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [...getAllRtbDealSlugs(), ...getLateStageSlugs()].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const deal = getRtbDealBySlug(slug)
  if (deal) {
    return {
      title: `${deal.publicTitle} | RTB Investment | SolarFarms.cy`,
      description: `${deal.solarMWp} MWp solar + ${deal.bessMWh} MWh BESS. ${deal.locationLine}. ${deal.timelineNote}`,
    }
  }
  const park = getLateStageParkBySlug(slug)
  if (park) {
    return {
      title: `${park.publicTitle} | Late-Stage Development | SolarFarms.cy`,
      description: park.summary,
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
