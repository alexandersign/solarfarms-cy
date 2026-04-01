'use client'

import Link from 'next/link'
import { FileText, Download, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getListingBySlug } from '@/lib/investment-listings'

type Props = {
  slug: string
  className?: string
}

/**
 * Teaser / Excel / LOI links for a listing slug. Safe on client-only pages.
 */
export function InvestorPackActions({ slug, className = '' }: Props) {
  const listing = getListingBySlug(slug)
  if (!listing) return null

  const loiHref = `/loi?listing=${encodeURIComponent(slug)}`

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50/80 p-4 md:p-5 ${className}`}
    >
      <p className="text-xs text-slate-500 mb-3">
        Investor pack — indicative materials only; not an offer to sell securities.
      </p>
      <div className="flex flex-wrap gap-2">
        {listing.teaserFile ? (
          <Button variant="outline" size="sm" asChild>
            <a href={listing.teaserFile} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              Teaser
            </a>
          </Button>
        ) : null}
        {listing.modelFile ? (
          <Button variant="outline" size="sm" asChild>
            <a href={listing.modelFile} download>
              <Download className="w-4 h-4 mr-2" />
              Excel model
            </a>
          </Button>
        ) : null}
        <Button variant="default" size="sm" asChild>
          <Link href={loiHref}>
            <PenLine className="w-4 h-4 mr-2" />
            Letter of intent
          </Link>
        </Button>
      </div>
    </div>
  )
}
