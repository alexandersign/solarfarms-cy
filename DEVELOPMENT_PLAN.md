# 📋 Development Plan for SolarFarms.cy

## Project Overview
Premium solar investment platform targeting high-net-worth individuals and institutional investors in Cyprus. Focus on 15-20% ROI solar farm investments with comprehensive lifecycle services.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity Studio
- **Database/Auth**: Supabase
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics + PostHog

## Development Phases

### Phase 1: Foundation (Week 1)
**Goals**: MVP landing page with hero, value prop, email capture
**Deliverables**:
- [x] Next.js 15 setup with App Router
- [x] Tailwind CSS + shadcn/ui configuration
- [x] Sanity Studio setup
- [x] Hero section with ROI calculator widget
- [x] Email capture form
- [x] Basic SEO setup (next-seo, sitemap)
- [x] Vercel deployment pipeline

### Phase 2: Core Features (Week 2)
**Goals**: Investment calculators, project pages, CMS integration
**Deliverables**:
- [ ] Interactive ROI calculators (1MW, 5MW, 10MW)
- [ ] Dynamic project pages with ISR
- [ ] Supabase integration for lead capture
- [ ] Live chat integration (Crisp)
- [ ] Investment process flow
- [ ] Contact forms and consultation booking

### Phase 3: Content & SEO (Week 3)
**Goals**: Programmatic SEO, content management, performance optimization
**Deliverables**:
- [ ] Programmatic SEO pages (city-specific ROI pages)
- [ ] Blog system with MDX
- [ ] OG image automation
- [ ] Structured data implementation
- [ ] Performance optimization
- [ ] Analytics and conversion tracking

### Phase 4: Advanced Features (Week 4)
**Goals**: AI features, investor portal, lead nurturing
**Deliverables**:
- [ ] AI-assisted content drafting (cron jobs)
- [ ] Semantic search functionality
- [ ] Investor lead magnets (PDF downloads)
- [ ] Advanced analytics and funnels
- [ ] A/B testing setup
- [ ] Multi-language support (EN/GR)

## File Structure
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
│   ├── (legal)/                  # Legal pages group
│   │   ├── privacy/
│   │   └── terms/
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   ├── calculator/           # ROI calculations
│   │   ├── newsletter/           # Email capture
│   │   └── chat/                 # AI chat endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404 page
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── calculators/              # ROI calculator components
│   ├── charts/                   # Data visualization
│   └── sections/                 # Page sections
├── lib/                          # Utilities and configurations
│   ├── sanity.ts                 # Sanity client
│   ├── supabase.ts               # Supabase client
│   ├── utils.ts                  # Utility functions
│   └── validations.ts            # Form validation schemas
├── sanity/                       # Sanity Studio
│   ├── schemas/                  # Content schemas
│   ├── lib/                      # Sanity utilities
│   └── sanity.config.ts          # Studio configuration
├── public/                       # Static assets
│   ├── images/                   # Optimized images
│   ├── icons/                    # SVG icons
│   └── documents/                # PDFs, investment guides
└── docs/                         # Documentation
    ├── DEVELOPMENT_PLAN.md
    ├── CONTENT_STRATEGY.md
    └── DEPLOYMENT.md
```

## Key Features Implementation

### 1. ROI Calculator Component
```typescript
// Advanced calculator with real-time updates
interface CalculatorProps {
  projectSize: '1MW' | '5MW' | '10MW'
  location: string
  sunHours: number
  electricityRate: number
}

// Features:
// - Real-time ROI calculations
// - Interactive charts (Recharts)
// - PDF report generation
// - Lead capture integration
```

### 2. Programmatic SEO Pages
```typescript
// Generate city-specific investment pages
// /cyprus-solar-investment/nicosia
// /cyprus-solar-investment/limassol
// /cyprus-solar-investment/paphos

// Dynamic content based on:
// - Local electricity rates
// - Sun hours data
// - Regional incentives
// - Market conditions
```

### 3. Content Management (Sanity)
```typescript
// Schema types:
// - Projects (case studies)
// - Blog posts
// - Team members
// - Services
// - Testimonials
// - Investment guides
```

## Performance Targets
- **Core Web Vitals**: All green scores
- **Lighthouse**: 95+ across all metrics
- **Page Load**: <2s on 3G
- **SEO Score**: 100/100

## SEO Strategy
1. **Technical SEO**: Perfect meta tags, structured data, sitemaps
2. **Content SEO**: City-specific landing pages, comprehensive guides
3. **Local SEO**: Cyprus-focused content, local business schema
4. **International SEO**: Multi-language support (EN/GR)

## Security & Compliance
- GDPR compliance for EU visitors
- SSL/TLS encryption
- Secure form handling
- Data privacy controls
- Cookie consent management

## Analytics & Conversion Tracking
- Vercel Analytics for performance
- PostHog for user behavior
- Conversion funnels for lead capture
- A/B testing for optimization
- ROI calculator usage tracking

## Deployment Strategy
1. **Development**: Local development with hot reload
2. **Staging**: Vercel preview deployments
3. **Production**: Vercel production with CDN
4. **Monitoring**: Real-time performance monitoring

## Component Architecture

### Core Components

#### 1. Hero Section
```typescript
// components/sections/HeroSection.tsx
// Features:
// - Compelling headline and subheadline
// - ROI calculator widget integration
// - Lead capture form
// - Key statistics display
// - CTA buttons (consultation, guide download)
```

#### 2. ROI Calculator
```typescript
// components/calculators/ROICalculator.tsx
// Features:
// - Interactive sliders for project size
// - Real-time calculations
// - Chart visualizations
// - PDF report generation
// - Lead capture integration
```

#### 3. Investment Opportunities
```typescript
// components/sections/InvestmentOpportunities.tsx
// Features:
// - 1MW, 5MW, 10MW project cards
// - Financial projections
// - Interactive comparison
// - CTA for detailed analysis
```

#### 4. Why Lighthief Cyprus
```typescript
// components/sections/WhyLighthief.tsx
// Features:
// - Company advantages
// - Global network visualization
// - Service portfolio
// - Track record statistics
```

#### 5. Process Flow
```typescript
// components/sections/ProcessFlow.tsx
// Features:
// - Step-by-step investment process
// - Timeline visualization
// - Interactive elements
// - Progress indicators
```

### Form Components

#### 1. Contact Form
```typescript
// components/forms/ContactForm.tsx
// Features:
// - Multi-step form
// - Investment size selection
// - Timeline preferences
// - Validation with Zod
// - Supabase integration
```

#### 2. Newsletter Signup
```typescript
// components/forms/NewsletterForm.tsx
// Features:
// - Email capture
// - GDPR compliance
// - Success/error states
// - Analytics tracking
```

#### 3. Consultation Booking
```typescript
// components/forms/ConsultationForm.tsx
// Features:
// - Calendar integration
// - Investment profile questions
// - Automated follow-up
// - CRM integration
```

## API Routes

### 1. Contact Handler
```typescript
// app/api/contact/route.ts
// Features:
// - Form validation
// - Supabase storage
// - Email notifications
// - CRM integration
```

### 2. Calculator API
```typescript
// app/api/calculator/route.ts
// Features:
// - ROI calculations
// - PDF generation
// - Results caching
// - Analytics tracking
```

### 3. Newsletter API
```typescript
// app/api/newsletter/route.ts
// Features:
// - Email validation
// - Subscription management
// - Welcome sequences
// - Segmentation
```

## Content Management

### Sanity Schemas

#### 1. Project Schema
```typescript
// sanity/schemas/project.ts
// Fields:
// - Title, description, location
// - Investment size, ROI, timeline
// - Images, documents
// - Status, completion date
```

#### 2. Blog Post Schema
```typescript
// sanity/schemas/blogPost.ts
// Fields:
// - Title, slug, excerpt
// - Content (portable text)
// - Author, publish date
// - SEO metadata
// - Categories, tags
```

#### 3. Team Member Schema
```typescript
// sanity/schemas/teamMember.ts
// Fields:
// - Name, position, bio
// - Photo, credentials
// - LinkedIn, email
// - Expertise areas
```

## SEO Implementation

### 1. Page-Level SEO
```typescript
// Each page includes:
// - Optimized title tags
// - Meta descriptions
// - Structured data
// - Open Graph tags
// - Canonical URLs
```

### 2. Programmatic Pages
```typescript
// Generate pages for:
// - Cyprus cities (Nicosia, Limassol, Paphos, Larnaca)
// - Investment sizes (1MW, 5MW, 10MW)
// - Service categories (EPC, O&M, Development)
```

### 3. Content Optimization
```typescript
// Features:
// - Keyword optimization
// - Internal linking
// - Image alt tags
// - Schema markup
// - Sitemap generation
```

## Testing Strategy

### 1. Unit Testing
```typescript
// Test coverage for:
// - Utility functions
// - Form validations
// - Calculator logic
// - API routes
```

### 2. Integration Testing
```typescript
// Test coverage for:
// - Form submissions
// - API integrations
// - Database operations
// - Email sending
```

### 3. E2E Testing
```typescript
// Test scenarios:
// - User journey flows
// - Calculator interactions
// - Form submissions
// - Page navigation
```

## Monitoring & Analytics

### 1. Performance Monitoring
```typescript
// Track:
// - Core Web Vitals
// - Page load times
// - Error rates
// - Uptime
```

### 2. User Analytics
```typescript
// Track:
// - Page views
// - User sessions
// - Conversion rates
// - Calculator usage
```

### 3. Business Metrics
```typescript
// Track:
// - Lead generation
// - Consultation bookings
// - Download rates
// - Email signups
```

## Next Steps
1. Initialize Next.js project
2. Configure Tailwind CSS + shadcn/ui
3. Set up Sanity Studio
4. Create hero section with calculator
5. Implement lead capture forms
6. Deploy to Vercel

---
*Last updated: September 11, 2025*
