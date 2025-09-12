import { NextResponse } from 'next/server'
import { CYPRUS_CITIES } from '@/lib/constants'

export async function GET() {
  const baseUrl = 'https://solarfarms.cy'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services', 
    '/projects',
    '/calculator',
    '/contact',
    '/blog',
  ]
  
  // Dynamic city pages
  const cityPages = CYPRUS_CITIES.map(city => `/cyprus-solar-investment/${city.slug}`)
  
  // Investment size pages
  const calculatorPages = [
    '/solar-farm-roi/1mw-calculator',
    '/solar-farm-roi/5mw-calculator', 
    '/solar-farm-roi/10mw-calculator'
  ]
  
  const allPages = [...staticPages, ...cityPages, ...calculatorPages]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${getChangeFreq(page)}</changefreq>
    <priority>${getPriority(page)}</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600'
    }
  })
}

function getChangeFreq(page: string): string {
  if (page === '') return 'daily'
  if (page.includes('/blog')) return 'weekly'
  if (page.includes('/calculator')) return 'weekly'
  if (page.includes('/cyprus-solar-investment')) return 'weekly'
  return 'monthly'
}

function getPriority(page: string): string {
  if (page === '') return '1.0'
  if (page.includes('/calculator')) return '0.9'
  if (page.includes('/cyprus-solar-investment')) return '0.8'
  if (['/about', '/services', '/projects', '/contact'].includes(page)) return '0.8'
  return '0.6'
}
