# 🚀 Deployment Guide for SolarFarms.cy

## Overview
This guide covers deploying SolarFarms.cy to various platforms, with primary focus on Vercel deployment.

## Prerequisites
- Node.js 18+
- Git repository
- Environment variables configured
- Sanity Studio set up
- Supabase project created

## Vercel Deployment (Recommended)

### 1. Initial Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel
```

### 2. Environment Variables
Add these environment variables in Vercel dashboard:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://solarfarms.cy

# Email
RESEND_API_KEY=re_***

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_***
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 4. Domain Configuration
1. Add custom domain in Vercel dashboard
2. Configure DNS records:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`

## Alternative Deployment Options

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: out

# Add to next.config.js
output: 'export',
trailingSlash: true,
images: {
  unoptimized: true
}
```

### Railway
```bash
# Create railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### DigitalOcean App Platform
```yaml
# .do/app.yaml
name: solarfarms-cy
services:
- name: web
  source_dir: /
  github:
    repo: your-username/solarfarms-cy
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  build_command: npm run build
```

## Environment-Specific Configuration

### Development
```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_DATASET=development
```

### Staging
```bash
# Staging environment variables
NEXTAUTH_URL=https://staging.solarfarms.cy
NEXT_PUBLIC_SANITY_DATASET=staging
```

### Production
```bash
# Production environment variables
NEXTAUTH_URL=https://solarfarms.cy
NEXT_PUBLIC_SANITY_DATASET=production
```

## Post-Deployment Checklist

### 1. Verify Core Functionality
- [ ] Homepage loads correctly
- [ ] ROI calculator works
- [ ] Contact forms submit successfully
- [ ] Email notifications work
- [ ] Analytics tracking active

### 2. SEO Verification
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Meta tags rendering correctly
- [ ] Structured data valid
- [ ] Open Graph images working
- [ ] Page speed scores >90

### 3. Performance Testing
- [ ] Core Web Vitals all green
- [ ] Lighthouse scores >95
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Image optimization working

### 4. Security Checks
- [ ] HTTPS certificate active
- [ ] Security headers configured
- [ ] CORS policies correct
- [ ] API rate limiting enabled
- [ ] Environment variables secure

## Monitoring & Maintenance

### 1. Performance Monitoring
```bash
# Vercel Analytics
# Automatic with Vercel deployment

# PostHog Setup
npm install posthog-js
```

### 2. Error Tracking
```bash
# Sentry Setup
npm install @sentry/nextjs
```

### 3. Uptime Monitoring
- Vercel provides built-in uptime monitoring
- Additional options: Pingdom, UptimeRobot, StatusPage

### 4. Backup Strategy
```bash
# Sanity Content Backup
sanity dataset export production backup.tar.gz

# Supabase Backup
# Use Supabase dashboard or CLI for database backups
```

## Continuous Deployment

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Automatic Sanity Deployments
```bash
# sanity.cli.ts
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
  },
  studioHost: 'solarfarms-cy'
})
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Environment Variable Issues
```bash
# Verify variables are set
vercel env ls

# Add missing variables
vercel env add VARIABLE_NAME
```

#### Image Optimization Issues
```bash
# Add domains to next.config.js
images: {
  domains: ['cdn.sanity.io', 'images.unsplash.com'],
}
```

### Performance Issues
```bash
# Bundle analyzer
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

### SEO Issues
```bash
# Validate structured data
# Use Google's Rich Results Test

# Check meta tags
# Use Facebook's Sharing Debugger
# Use Twitter's Card Validator
```

## Scaling Considerations

### 1. CDN Configuration
- Vercel Edge Network (automatic)
- Cloudflare (additional layer)
- AWS CloudFront (enterprise)

### 2. Database Scaling
- Supabase automatic scaling
- Connection pooling
- Read replicas for high traffic

### 3. Caching Strategy
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 4. Load Testing
```bash
# Use tools like:
# - Artillery.io
# - Apache Bench
# - Lighthouse CI
```

## Security Hardening

### 1. Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
]
```

### 2. Rate Limiting
```javascript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})
```

## Support & Documentation

### Internal Documentation
- Keep deployment logs
- Document configuration changes
- Maintain environment variable inventory

### External Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Sanity Deployment](https://www.sanity.io/docs/deployment)

---
*Last updated: September 11, 2025*
