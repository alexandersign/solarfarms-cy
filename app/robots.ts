import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/crm/',
          '/alex/',
          '/tablet/',
          '/manager/',
          '/client/',
          '/bess-project/',
          '/internal-docs/',
          '/login',
          '/preferences',
          '/unsubscribe',
        ],
      },
    ],
    sitemap: 'https://solarfarms.cy/sitemap.xml',
  }
}
