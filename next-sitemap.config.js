/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://solarfarms.cy',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/admin/*',
    '/studio/*',
    '/404',
    '/500',
    '/_*',
  ],
  additionalPaths: async (config) => {
    const result = []
    
    // Cyprus cities for programmatic SEO
    const cities = ['nicosia', 'limassol', 'paphos', 'larnaca', 'famagusta']
    cities.forEach(city => {
      result.push({
        loc: `/cyprus-solar-investment/${city}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })
    
    // Investment size pages
    const sizes = ['1mw', '5mw', '10mw']
    sizes.forEach(size => {
      result.push({
        loc: `/solar-farm-roi/${size}-calculator`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })
    })
    
    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/studio/',
          '/_next/',
          '/404',
          '/500',
        ],
      },
    ],
    additionalSitemaps: [
      'https://solarfarms.cy/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    const customConfig = { ...config }
    
    if (path === '/') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    } else if (path.includes('/calculator')) {
      customConfig.priority = 0.9
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/blog')) {
      customConfig.priority = 0.7
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/cyprus-solar-investment')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'weekly'
    }
    
    return {
      loc: path,
      changefreq: customConfig.changefreq || 'monthly',
      priority: customConfig.priority || 0.6,
      lastmod: new Date().toISOString(),
    }
  },
}
