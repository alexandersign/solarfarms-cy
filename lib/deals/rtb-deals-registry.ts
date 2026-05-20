/**
 * Central registry of all RtbDeal tickets — used by teaser generator,
 * /projects listings, and dynamic detail pages.
 */
import type { RtbDeal } from './rtb-deal-types'
import { SHIA_SIA_RTB } from './shia-sia-rtb'
import { JONATHAN_VANALIO_RTB } from './jonathan-vanalio-rtb'
import { RAGELIA_2205_2206_RTB } from './ragelia-2205-2206-rtb'
import { RAGELIA_2302_RTB } from './ragelia-2302-rtb'
import { RAGELIA_2110_RTB } from './ragelia-2110-rtb'
import { RAGELIA_2105_RTB } from './ragelia-2105-rtb'

export const ALL_RTB_DEALS: RtbDeal[] = [
  SHIA_SIA_RTB,
  JONATHAN_VANALIO_RTB,
  RAGELIA_2205_2206_RTB,
  RAGELIA_2302_RTB,
  RAGELIA_2110_RTB,
  RAGELIA_2105_RTB,
]

const BY_SLUG = new Map(ALL_RTB_DEALS.map((d) => [d.slug, d]))

export function getRtbDealBySlug(slug: string): RtbDeal | undefined {
  return BY_SLUG.get(slug)
}

export function getAllRtbDealSlugs(): string[] {
  return ALL_RTB_DEALS.map((d) => d.slug)
}
