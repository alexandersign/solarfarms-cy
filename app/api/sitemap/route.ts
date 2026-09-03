import { NextResponse } from 'next/server'
import { CYPRUS_CITIES } from '@/lib/constants'
import { getProjectSlugsForSitemap } from '@/lib/investment-listings'

const BLOG_SLUGS = [
  'ai-gpu-mining-renewable-energy-cyprus',
  'bess-bankability-choosing-right-service-partner',
  'bess-fire-safety-thermal-management',
  'bess-installation-container-to-grid',
  'bess-installation-quality-workmanship-risks',
  'bess-insurance-risk-lenders',
  'bess-sizing-solar-farms',
  'bess-warranties-guarantees-checklist',
  'cost-of-not-adding-bess-financial-model',
  'curtailed-energy-revenue-recovery-cyprus',
  'cyprus-bess-regulations-vs-europe',
  'cyprus-bess-regulatory-framework-europe',
  'cyprus-curtailment-crisis-bess-solution',
  'cyprus-energy-storage-roadmap-2027-2030',
  'cyprus-solar-market-analysis-2025',
  'cyprus-vs-eu-solar-markets',
  'dc-coupled-vs-ac-coupled-bess',
  'ems-scada-bess-revenue',
  'euroasia-interconnector-bess-cyprus',
  'grid-forming-vs-grid-following-bess',
  'importance-of-om-solar-farms',
  'investors-guide-battery-energy-storage',
  'island-grid-economics-cyprus-bess',
  'lfp-vs-nmc-utility-scale-bess',
  'lithium-price-crash-bess-viability',
  'peak-shaving-vs-energy-arbitrage-cyprus',
  'risk-mitigation-solar-investments',
  'solar-bitcoin-mining-cyprus-case-study',
  'solar-farm-financing-strategies-2025',
  'solar-incentives-cyprus-2025',
  'virtual-power-plants-island-grids',
  'why-bess-no-longer-optional-res-cyprus',
]

export async function GET() {
  const baseUrl = 'https://solarfarms.cy'

  const staticPages = [
    '',
    '/about',
    '/services',
    '/projects',
    '/landowners',
    '/calculator',
    '/contact',
    '/blog',
    '/energy-storage',
    '/energy-storage/calculator',
    '/market',
    '/investment-guide',
    '/crypto',
    '/crypto/solar-mining',
    '/crypto/ai-mining',
  ]

  const cityPages = CYPRUS_CITIES.map((city) => `/cyprus-solar-investment/${city.slug}`)
  const projectPages = getProjectSlugsForSitemap().map((slug) => `/projects/${slug}`)
  const postPages = BLOG_SLUGS.map((slug) => `/blog/${slug}`)

  const allPages = [...staticPages, ...cityPages, ...projectPages, ...postPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${getChangeFreq(page)}</changefreq>
    <priority>${getPriority(page)}</priority>
  </url>`
  )
  .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}

function getChangeFreq(page: string): string {
  if (page === '') return 'daily'
  if (page === '/market') return 'daily'
  if (page.includes('/blog')) return 'weekly'
  if (page.includes('/calculator')) return 'weekly'
  if (page.includes('/cyprus-solar-investment')) return 'weekly'
  return 'monthly'
}

function getPriority(page: string): string {
  if (page === '') return '1.0'
  if (page.includes('/calculator') || page === '/energy-storage' || page === '/market') return '0.9'
  if (page.includes('/cyprus-solar-investment') || page === '/investment-guide') return '0.8'
  if (['/about', '/services', '/projects', '/contact'].includes(page)) return '0.8'
  if (page.startsWith('/blog/')) return '0.6'
  return '0.6'
}
