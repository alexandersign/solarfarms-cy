/**
 * Curated blog posts for "From our journal" strips on marketing pages.
 */

export interface JournalPost {
  slug: string
  title: string
  description: string
  category: string
  date: string
}

export const BESS_JOURNAL_POSTS: JournalPost[] = [
  {
    slug: 'investors-guide-battery-energy-storage',
    title: "The Investor's Guide to Battery Energy Storage",
    description: 'What BESS means for revenue, grid connection, and asset valuation.',
    category: 'Investment Guide',
    date: 'Feb 18, 2026',
  },
  {
    slug: 'bess-bankability-choosing-right-service-partner',
    title: 'BESS Bankability: Choosing the Right Service Partner',
    description: 'Tier-1 OEM partnerships and insurance for lender-ready storage assets.',
    category: 'Investment Guide',
    date: 'Feb 10, 2026',
  },
  {
    slug: 'island-grid-economics-cyprus-bess',
    title: 'Island Grid Economics: Why Cyprus BESS Is Different',
    description: 'Price spreads and merchant upside on an isolated grid.',
    category: 'Market Analysis',
    date: 'Jan 20, 2026',
  },
]

export const PROJECTS_JOURNAL_POSTS: JournalPost[] = [
  {
    slug: 'investors-guide-battery-energy-storage',
    title: "The Investor's Guide to Battery Energy Storage",
    description: 'Sizing storage alongside solar acquisitions and RTB deals.',
    category: 'Investment Guide',
    date: 'Feb 18, 2026',
  },
  {
    slug: 'solar-farm-financing-strategies-2025',
    title: 'Solar Farm Financing Strategies',
    description: 'Structures that work for Cyprus utility-scale projects.',
    category: 'Financing',
    date: '2025',
  },
  {
    slug: 'risk-mitigation-solar-investments',
    title: 'Risk Mitigation for Solar Investments',
    description: 'Permits, grid, and O&M — what investors should verify.',
    category: 'Investment Guide',
    date: '2025',
  },
]
