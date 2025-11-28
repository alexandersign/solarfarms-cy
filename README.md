# SolarFarms.cy - Premium Cyprus Solar Investment Platform

**Version 2.0** | **Status: Production Operational** | **Last Updated: November 26, 2025**

A Next.js-powered investment platform connecting high-net-worth individuals and institutional investors with premium solar farm opportunities in Cyprus. Features verified email system, BESS ROI modeling, real curtailment data, and professional document generation.

## 🌟 **Platform Highlights**

- ✅ **Live Production**: https://solarfarms.cy
- ✅ **Verified Email**: Professional delivery from noreply@solarfarms.cy
- ✅ **Real Park Listing**: 5.01MW with tracking system (€9.6M)
- ✅ **BESS Calculator**: Interactive curtailment mitigation scenarios
- ✅ **Document Generation**: LOI and PDF investment reports
- ✅ **Newsletter System**: Automated subscriber notifications
- ✅ **Realistic Pricing**: €1.5M/MW based on actual market data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd solinvest
npm install
```

2. **Environment setup**:
```bash
# Copy environment template
cp .env.example .env.local

# Add your API keys:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Start development server**:
```bash
npm run dev
```

4. **Start Sanity Studio** (separate terminal):
```bash
npm run sanity
```

Visit:
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 🏗️ Project Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity Studio
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + PostHog

### Key Features
- ⚡ **Interactive ROI Calculators** (1MW, 5MW, 10MW)
- 📊 **Real-time Financial Projections**
- 🎯 **Lead Capture & CRM Integration**
- 📝 **Headless CMS Content Management**
- 🔍 **Programmatic SEO Pages**
- 📱 **Mobile-First Responsive Design**
- 🚀 **Edge-Optimized Performance**
- 🌐 **Multi-language Support** (EN/GR)

## 📁 Project Structure

```
solarfarms-cy/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages group
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # About Lighthief Cyprus
│   │   ├── services/             # EPC, O&M, Asset Management
│   │   ├── projects/             # Case studies & portfolio
│   │   ├── calculator/           # ROI Calculator tool
│   │   └── contact/              # Contact & consultation
│   ├── (content)/                # Content pages group
│   │   ├── blog/                 # Blog system
│   │   └── resources/            # Investment guides, whitepapers
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   ├── calculator/           # ROI calculations
│   │   └── newsletter/           # Email capture
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── calculators/              # ROI calculator components
│   └── sections/                 # Page sections
├── lib/                          # Utilities and configurations
│   ├── sanity.ts                 # Sanity client
│   ├── supabase.ts               # Supabase client
│   └── utils.ts                  # Utility functions
├── sanity/                       # Sanity Studio
│   ├── schemas/                  # Content schemas
│   └── sanity.config.ts          # Studio configuration
└── public/                       # Static assets
    ├── images/                   # Optimized images
    └── documents/                # PDFs, investment guides
```

## 🎯 Target Audience

### Primary: High-Net-Worth Individuals
- **Assets**: €1M+ liquid assets
- **Age**: 35-65 years
- **Location**: Cyprus, EU, International
- **Goals**: 15-20% ROI, diversified portfolio

### Secondary: Institutional Investors
- **Type**: Family offices, pension funds
- **AUM**: €10M+ (Family), €100M+ (Institutional)
- **Timeline**: 6-12 month decision cycles
- **Requirements**: ESG compliance, due diligence

## 💰 Investment Opportunities

### 1MW Solar Farm
- **Investment**: €900K - €1.2M
- **Annual Revenue**: €200K - €250K
- **ROI**: 15-20%
- **Payback**: 5-8 years
- **25-year NPV**: €2.5M - €4.0M

### 5MW Solar Farm
- **Investment**: €4.5M - €6.0M
- **Annual Revenue**: €1.0M - €1.25M
- **ROI**: 15-20%
- **Payback**: 5-8 years
- **25-year NPV**: €12M - €20M

### 10MW Solar Farm
- **Investment**: €9.0M - €12.0M
- **Annual Revenue**: €2.0M - €2.5M
- **ROI**: 15-20%
- **Payback**: 5-8 years
- **25-year NPV**: €25M - €40M

## 🏆 Competitive Advantages

### Lighthief Cyprus Benefits
- **Global Network**: 9 European offices + international operations
- **Market Leadership**: 1GW+ assets under management
- **Local Expertise**: Cyprus headquarters, 300+ sunny days
- **Full Lifecycle**: Development → Construction → O&M → Recycling
- **Cost Leadership**: 15-20% lower than local competitors
- **Speed**: 6-12 months vs 18-24 months typical

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run sanity          # Start Sanity Studio

# Building
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking

# Sanity
npm run sanity:build    # Build Sanity Studio
npm run sanity:deploy   # Deploy Sanity Studio
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Email (Resend)
RESEND_API_KEY=

# Misc
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## 📊 Performance Targets

- **Core Web Vitals**: All green scores
- **Lighthouse**: 95+ across all metrics  
- **Page Load**: <2s on 3G
- **SEO Score**: 100/100
- **Accessibility**: WCAG 2.1 AA compliant

## 📈 SEO Strategy

### Programmatic Pages
- `/cyprus-solar-investment/nicosia`
- `/cyprus-solar-investment/limassol`
- `/cyprus-solar-investment/paphos`
- `/solar-farm-roi/1mw-calculator`
- `/solar-farm-roi/5mw-calculator`
- `/solar-farm-roi/10mw-calculator`

### Content Strategy
- **Blog**: Weekly market analysis, investment guides
- **Resources**: Downloadable investment guides, ROI calculators
- **Case Studies**: Real project examples and returns
- **Local SEO**: Cyprus-specific content and optimization

## 🔒 Security & Compliance

- **GDPR**: EU privacy compliance
- **SSL/TLS**: End-to-end encryption
- **Data Security**: Supabase row-level security
- **Form Security**: CSRF protection, input validation
- **Content Security**: Sanity content validation

## 📞 Support & Contact

- **Website**: https://solarfarms.cy
- **Email**: info@solarfarms.cy
- **Phone**: +357 [Cyprus office]
- **Address**: Cyprus headquarters

## 📝 Development Status

### ✅ Completed (All Phases - 100%)
- [x] Complete platform development
- [x] Next.js 14 with App Router
- [x] Tailwind CSS + shadcn/ui with custom themes
- [x] Comprehensive content creation (25+ pages)
- [x] Advanced ROI calculator with bank financing
- [x] Professional email system with Resend
- [x] Real Lighthief Cyprus contact integration
- [x] SEO optimization with structured data
- [x] Blog system with 5 expert articles
- [x] Complete service portfolio
- [x] Working API routes and form processing

### 🚀 Ready for Business Launch
- [x] Professional website design
- [x] Working contact forms
- [x] Email automation system
- [x] Advanced calculator tools
- [x] Comprehensive business content
- [x] Mobile responsive design
- [x] Production deployment on Vercel

### 📧 Email Activation (30 minutes)
- [ ] Add Resend API key to Vercel
- [ ] Verify email domains
- [ ] Test automated responses

### 📊 Optional Enhancements
- [ ] Supabase database for lead management
- [ ] Google Analytics activation
- [ ] Live chat integration
- [ ] Multi-language support (Greek)

---

**Last Updated**: September 11, 2025  
**Next Review**: September 25, 2025

For detailed development phases, see `DEVELOPMENT_PLAN.md`  
For content strategy, see `CONTENT_STRATEGY.md`
