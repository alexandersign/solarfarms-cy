# 7SUN Cyprus — Website & AI Infrastructure Plan
## Complete E-Commerce Platform with AI Automation

**Prepared:** February 2026  
**Domain:** 7sun.cy  
**Objective:** Fully automated B2B/B2C solar e-commerce with AI-first customer experience, minimal human interaction  
**XML Feed Source:** `https://feeds.datafeedwatch.com/104435/7b7df43f7c54bb8e7b7038271658ed1fd482b55e.xml`

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack Decision](#2-tech-stack)
3. [E-Commerce Platform — Medusa.js](#3-ecommerce-platform)
4. [Frontend — Next.js 15 Storefront](#4-frontend)
5. [XML Feed Integration — Auto Product Sync](#5-xml-feed-integration)
6. [AI Chatbot — Knowledge-Based Assistant](#6-ai-chatbot)
7. [AI Voice Agent — ElevenLabs / Vapi](#7-ai-voice-agent)
8. [Auto-Matched Wholesale Accounts (RES Fund)](#8-auto-wholesale-accounts)
9. [Newsletter & Email Automation](#9-newsletter-automation)
10. [Payment & Checkout](#10-payment-checkout)
11. [Database & Backend Services](#11-database)
12. [Hosting & Infrastructure](#12-hosting)
13. [Security & Compliance](#13-security)
14. [Development Roadmap & Timeline](#14-roadmap)
15. [Monthly Operating Costs](#15-costs)
16. [Team & Resources](#16-team)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         7SUN.CY PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐               │
│  │  B2C STORE   │   │  B2B PORTAL  │   │ DEVELOPER    │               │
│  │  Retail      │   │  Wholesale   │   │ PORTAL       │               │
│  │  Homeowners  │   │  Installers  │   │ Apartment    │               │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘               │
│         │                  │                   │                        │
│         └──────────────────┼───────────────────┘                        │
│                            │                                            │
│                   ┌────────▼────────┐                                   │
│                   │   NEXT.JS 15    │  ← Vercel Edge                   │
│                   │   STOREFRONT    │                                   │
│                   └────────┬────────┘                                   │
│                            │                                            │
│    ┌───────────┬───────────┼───────────┬────────────┐                  │
│    │           │           │           │            │                   │
│    ▼           ▼           ▼           ▼            ▼                   │
│ ┌──────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐            │
│ │MEDUSA│ │AI CHATBOT│ │PAYMENT │ │VOICE AI │ │NEWSLETTER│            │
│ │.js   │ │OpenAI /  │ │Stripe  │ │ElevenLab│ │Klaviyo / │            │
│ │Engine│ │Claude    │ │+ B2B   │ │or Vapi  │ │Brevo     │            │
│ └──┬───┘ └────┬─────┘ └───┬────┘ └────┬────┘ └────┬─────┘            │
│    │          │           │           │            │                   │
│    └──────────┴───────────┼───────────┴────────────┘                   │
│                           │                                            │
│                  ┌────────▼────────┐                                   │
│                  │   SUPABASE      │                                   │
│                  │   PostgreSQL    │                                   │
│                  │   Auth / Storage│                                   │
│                  │   Real-time     │                                   │
│                  └────────┬────────┘                                   │
│                           │                                            │
│              ┌────────────┼────────────┐                               │
│              │            │            │                                │
│              ▼            ▼            ▼                                │
│         ┌────────┐ ┌──────────┐ ┌──────────┐                          │
│         │XML FEED│ │RES FUND  │ │ANALYTICS │                          │
│         │SYNC    │ │AUTO-     │ │GA4 +     │                          │
│         │Cron    │ │VERIFY    │ │Posthog   │                          │
│         └────────┘ └──────────┘ └──────────┘                          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

EXTERNAL INTEGRATIONS:
┌──────────────┐  ┌───────────────┐  ┌──────────────┐  ┌──────────┐
│ 7sun.eu XML  │  │ RES Fund      │  │ EAC/Cyprus   │  │ Shipping │
│ Product Feed │  │ Installer DB  │  │ Business Reg │  │ APIs     │
└──────────────┘  └───────────────┘  └──────────────┘  └──────────┘
```

### Design Principles

1. **AI-First**: Every customer interaction starts with AI — chatbot, voice, email
2. **Zero-Friction**: Checkout in 3 clicks; wholesale accounts auto-approved
3. **Self-Service**: Installers manage their own accounts, orders, quotes
4. **Auto-Sync**: Products, prices, images, stock levels from 7sun.eu XML — zero manual entry
5. **Bilingual**: Full Greek + English throughout (content, AI, email, voice)
6. **Mobile-First**: 73% of Cyprus internet is mobile

---

## 2. Tech Stack Decision

### Recommended Stack: "Modern Headless"

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 15 (App Router) | SSR/ISR for SEO, React Server Components, fast page loads, Vercel-native |
| **Commerce Engine** | Medusa.js v2 | Open-source, B2B-native (tiered pricing, quotes, customer groups), Next.js B2B starter, no license fees |
| **Database** | Supabase (PostgreSQL) | Auth, real-time subscriptions, storage, row-level security, generous free tier |
| **Hosting** | Vercel (frontend) + Railway/Render (Medusa backend) | Edge CDN, serverless functions, auto-scaling |
| **Payments** | Stripe (Cyprus) | EUR native, B2B invoicing, VAT automation, Net-30/60 terms |
| **AI Chat** | OpenAI Assistants API (GPT-4o) | Knowledge base, function calling, product search, quote generation |
| **AI Voice** | ElevenLabs Conversational AI | Sub-100ms latency, 32+ languages (Greek + English), phone integration |
| **Email/Newsletter** | Klaviyo | E-commerce native, product feed sync, abandoned cart, stock alerts, segmentation |
| **Search** | Meilisearch (self-hosted) or Algolia | Typo-tolerant, faceted filtering, instant results, Greek language support |
| **Analytics** | PostHog (self-hosted) + GA4 | Product analytics, session replay, A/B testing, conversion funnels |
| **CDN/WAF** | Cloudflare | DDoS protection, image optimization, caching, Cyprus PoP |
| **File Storage** | Cloudflare R2 or Supabase Storage | Product images, datasheets, PDFs (from XML feed) |
| **Monitoring** | Sentry + Uptime Robot | Error tracking, uptime alerts |

### Why NOT Shopify/BigCommerce?

| Factor | Shopify Plus | Our Stack (Medusa + Next.js) |
|--------|-------------|------------------------------|
| Monthly Platform Fee | $2,300+/mo | $0 (open-source) |
| Transaction Fees | 0.15–0.5% on top of Stripe | Stripe fees only (1.5% + €0.25) |
| B2B Tiered Pricing | Limited (needs apps) | Native in Medusa |
| XML Feed Custom Sync | Very limited | Full custom control |
| AI Chatbot Integration | Third-party apps ($50–300/mo) | Built-in, custom knowledge base |
| Auto-Verify Installer Accounts | Not possible natively | Custom middleware |
| Multilingual (Greek) | Needs $2,000+ translation app | Built-in i18n |
| Total Year 1 Platform Cost | ~$30,000+ | ~$3,000–5,000 |
| **Control & Customization** | **Limited by Shopify APIs** | **100% custom** |

---

## 3. E-Commerce Platform — Medusa.js v2

### Why Medusa.js

Medusa.js is an open-source, Node.js-based headless commerce engine specifically built for developers and B2B commerce. It provides:

- **B2B Starter Kit** — Pre-built Next.js storefront with company accounts, spending limits, quote flows
- **Multi-Channel Sales** — Separate B2C retail and B2B wholesale channels with different pricing
- **Customer Groups** — Auto-assign pricing tiers (Retail, Wholesale H1-H5, Developer)
- **Price Lists** — Customer-specific, time-limited, volume-based pricing
- **Quote System** — Request-for-quote → negotiate → approve → order flow
- **API-First** — Every feature accessible via REST/GraphQL APIs
- **Plugin System** — Extensible with custom modules (AI, XML sync, RES Fund verify)

### Medusa Configuration for 7SUN

```
Medusa.js v2 Backend
├── Sales Channels
│   ├── B2C Retail (7sun.cy/shop)
│   │   └── Standard retail pricing
│   ├── B2B Wholesale (7sun.cy/wholesale)
│   │   ├── H1 Tier — Standard wholesale
│   │   ├── H2 Tier — €500+ orders
│   │   ├── H3 Tier — €1,000+ orders
│   │   ├── H4 Tier — €2,500+ orders
│   │   └── H5 Tier — €5,000+ (volume)
│   └── Developer Portal (7sun.cy/developer)
│       └── Apartment kit pricing
├── Customer Groups
│   ├── Retail Customers
│   ├── Verified Installers (auto-matched from RES Fund)
│   ├── Lighthief.cy (JV partner — purchases at cost price)
│   ├── Real Estate Developers
│   └── Commercial/Industrial
├── Product Categories
│   ├── Solar Panels
│   ├── String Inverters
│   ├── Micro Inverters
│   ├── Battery Storage
│   ├── Optimizers & Accessories
│   ├── EV Chargers
│   └── Apartment Kits (bundles)
└── Custom Modules
    ├── XML Feed Sync (7sun.eu → product catalog)
    ├── RES Fund Installer Verification
    ├── AI Chatbot Integration
    ├── AI Voice Agent Hooks
    └── Klaviyo Newsletter Sync
```

### Product Data Model

Each product in Medusa will have:

| Field | Source | Auto-Sync |
|-------|--------|-----------|
| Title / Name | XML feed `<title>` | Yes |
| SKU / EAN | XML feed `<gtin>` | Yes |
| Brand | XML feed `<brand>` | Yes |
| Category | XML feed `<product_type>` + mapping | Yes |
| Description (EN) | XML feed `<description>` | Yes |
| Description (GR) | AI-generated translation from EN | Auto (GPT) |
| Images (gallery) | XML feed `<image_link>` + `<additional_image_link>` | Yes |
| Datasheet PDF | XML feed `<link>` (product page) → scrape PDF | Semi-auto |
| B2B Price (H1–H5) | XML feed `<price>` with tier multipliers | Yes |
| Retail Price | XML feed price × retail markup | Auto-calculated |
| Stock Level | XML feed `<availability>` + `<quantity>` | Yes |
| Weight / Dimensions | XML feed attributes | Yes |
| Wattage / Specs | XML feed `<custom_label_0>` etc. | Yes |
| Warranty | Per-brand config table | Manual (one-time) |
| Competitor Price (Trikkis) | Manual entry / periodic scrape | Semi-auto |

---

## 4. Frontend — Next.js 15 Storefront

### Page Structure

```
7sun.cy/
├── /                          → Hero + featured products + value props
├── /shop                      → B2C product catalog (all products)
│   ├── /shop/panels           → Solar panels (filterable)
│   ├── /shop/inverters        → All inverters
│   ├── /shop/micro-inverters  → Micro inverter category
│   ├── /shop/batteries        → Battery storage
│   ├── /shop/ev-chargers      → EV charging
│   ├── /shop/accessories      → Optimizers, cables, connectors
│   └── /shop/[slug]           → Individual product page
├── /wholesale                 → B2B portal (login required)
│   ├── /wholesale/catalog     → Wholesale catalog with tiered pricing
│   ├── /wholesale/quote       → Request for Quote form
│   ├── /wholesale/orders      → Order history & tracking
│   ├── /wholesale/account     → Company account management
│   └── /wholesale/credit      → Credit terms & invoices
├── /apartment-solar           → Developer landing page
│   ├── /apartment-solar/calculator → Per-apartment ROI calculator
│   └── /apartment-solar/quote → Developer bulk quote
├── /price-match               → Price match guarantee page
├── /brands                    → Brand showcase (all brands)
│   └── /brands/[brand]        → Brand-specific catalog
├── /resources                 → Knowledge base
│   ├── /resources/guides      → Solar guides (EN + GR)
│   ├── /resources/datasheets  → Product PDFs (auto from XML)
│   └── /resources/news        → Blog / news feed
├── /about                     → About 7SUN Cyprus
├── /contact                   → Contact + AI chatbot
├── /cart                      → Shopping cart
├── /checkout                  → 3-step checkout
├── /account                   → Customer account
│   ├── /account/orders        → Order history
│   ├── /account/quotes        → Quote requests
│   └── /account/settings      → Profile / company details
└── /api                       → API routes (internal)
    ├── /api/chat              → AI chatbot endpoint
    ├── /api/voice             → Voice agent webhook
    ├── /api/xml-sync          → XML feed cron endpoint
    ├── /api/verify-installer  → RES Fund verification
    └── /api/newsletter        → Klaviyo webhook
```

### UI/UX Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Speed** | Static generation (ISG) for product pages, edge middleware, Cloudflare CDN, image optimization via next/image |
| **Mobile-First** | Responsive grid, thumb-friendly buttons, mobile-optimized checkout, PWA support |
| **Bilingual** | Language toggle (EN/GR) in header, all content served in user's preferred language via next-intl |
| **Trust** | SSL, brand logos, warranty badges, reviews, price comparison widget |
| **Conversion** | Sticky "Add to Cart" on product pages, 1-click reorder for B2B, persistent cart, exit-intent popup |
| **Accessibility** | WCAG 2.1 AA, keyboard navigation, screen reader support, high contrast mode |
| **AI-First** | Floating AI chat widget (bottom-right), voice call button, smart search with natural language |

### Homepage Sections

1. **Hero**: "Cyprus's Lowest Solar Prices. Guaranteed." — CTA: Shop Now / Get Wholesale Access
2. **Trust Bar**: Brand logos (Jinko, Huawei, SolarEdge, JA Solar, Longi, FoxESS, Solax...)
3. **Categories**: Visual cards — Panels, Inverters, Batteries, Apartment Kits, EV Chargers
4. **Price Comparison**: Live widget — "Our Price vs Market" for top 5 products
5. **Calculator**: "How much can you save?" — interactive solar savings calculator
6. **For Installers**: CTA block — "Wholesale prices 30% below market. Apply in 60 seconds."
7. **For Developers**: CTA block — "Solar for every apartment. From €400/unit."
8. **Testimonials**: Installer + homeowner quotes
9. **Blog/News**: Latest 3 posts (auto from CMS)
10. **Newsletter Signup**: "Get weekly deals + stock alerts"

### Product Page Features

- **Image Gallery**: Multiple images from XML feed, zoom, 360° if available
- **Datasheet Download**: Auto-linked PDF from 7sun.eu product page
- **Specifications Table**: Parsed from XML attributes
- **Pricing Display**:
  - B2C: Retail price + "Compare at €XX" (Trikkis price)
  - B2B: "Login for wholesale pricing" → shows tier price after login
- **Stock Indicator**: Real-time from XML sync — "In Stock (XX units)" / "Ships in 7-10 days"
- **Add to Cart**: Quantity selector with volume discount preview
- **Related Products**: AI-recommended based on category + buying patterns
- **AI Chat Context**: Product-aware — chatbot knows which product you're viewing
- **Share/Compare**: Share button, add to comparison list

---

## 5. XML Feed Integration — Auto Product Sync

### Feed Source

```
URL: https://feeds.datafeedwatch.com/104435/7b7df43f7c54bb8e7b7038271658ed1fd482b55e.xml
Format: Google Shopping XML (RSS 2.0 / Atom)
Update Frequency: Daily (DataFeedWatch auto-generates from 7sun.eu)
Content: ~5,000+ products with prices, images, descriptions, stock levels, specs
```

### Sync Architecture

```
┌──────────────────┐     ┌───────────────────┐     ┌──────────────┐
│ 7sun.eu Product  │     │ DataFeedWatch     │     │ 7SUN.cy      │
│ Database         │────▶│ XML Feed          │────▶│ Sync Worker  │
│ (Poland)         │     │ (Auto-generated)  │     │ (Cron Job)   │
└──────────────────┘     └───────────────────┘     └──────┬───────┘
                                                          │
                         ┌────────────────────────────────┤
                         │                                │
                         ▼                                ▼
                  ┌──────────────┐              ┌──────────────┐
                  │ Medusa.js    │              │ Cloudflare   │
                  │ Product DB   │              │ R2 / Storage │
                  │ (PostgreSQL) │              │ (Images/PDFs)│
                  └──────────────┘              └──────────────┘
```

### Sync Process (Runs Every 4 Hours)

```
CRON: 0 */4 * * * (every 4 hours)

Step 1: FETCH XML
  → HTTP GET XML feed URL
  → Parse ~5,000 product entries
  → Validate schema

Step 2: DIFF COMPARE
  → Compare each product (by GTIN/SKU) with existing DB
  → Identify: NEW | UPDATED | REMOVED | UNCHANGED
  → Log changes for audit trail

Step 3: PROCESS UPDATES
  For each product:
  ├── Map XML fields → Medusa product schema
  ├── Download new/changed images → Cloudflare R2
  ├── Generate Greek description (GPT-4o-mini) if new
  ├── Calculate retail price: B2B price × markup multiplier
  ├── Calculate tier prices: H1(×1.0), H2(×0.97), H3(×0.94), H4(×0.90), H5(×0.85)
  ├── Set stock status: XML quantity → In Stock / Low Stock / Out of Stock
  └── Upsert to Medusa product catalog

Step 4: POST-SYNC
  ├── Update Meilisearch index (for instant search)
  ├── Trigger Klaviyo catalog sync (for product emails)
  ├── Update AI chatbot knowledge base (new products)
  ├── Generate sitemap.xml for SEO
  └── Send Slack/email notification: "Sync complete: X new, Y updated, Z removed"

Step 5: CURATE (Manual/Semi-Auto)
  ├── Mark "Featured" products for homepage
  ├── Flag Cyprus-relevant products (vs full 5,000 catalog)
  ├── Set category mappings for new brands/types
  └── Review AI-generated Greek translations
```

### XML Field Mapping

| XML Field | Medusa Field | Transformation |
|-----------|-------------|----------------|
| `<g:id>` | `external_id` | Direct map |
| `<title>` | `title` | Clean up, standardize format |
| `<description>` | `description` (EN) | HTML strip, clean |
| — | `description` (GR) | GPT-4o-mini translation |
| `<g:price>` | `variant.prices[B2B_H1]` | Parse EUR value |
| — | `variant.prices[Retail]` | B2B × 1.35–1.50 markup |
| `<g:image_link>` | `images[0]` | Download → R2, optimize |
| `<g:additional_image_link>` | `images[1..n]` | Download → R2 |
| `<g:gtin>` | `variant.ean` | Direct map |
| `<g:brand>` | `metadata.brand` | Map to brand collection |
| `<g:product_type>` | `collection_id` | Map to category |
| `<g:availability>` | `variant.inventory_quantity` | "in stock" → qty from feed |
| `<g:custom_label_0>` | `metadata.wattage` | Parse numeric value |
| `<g:shipping_weight>` | `variant.weight` | Parse kg/g |
| `<link>` | `metadata.source_url` | 7sun.eu product page link |

### Image Processing Pipeline

```
XML image URL → Download → Optimize (Sharp.js) → Upload to R2
                                    │
                          ┌─────────┼─────────┐
                          │         │         │
                        WebP      AVIF    Original
                       1200px    800px     Full res
                       (main)   (thumb)   (zoom)
```

### Selective Catalog (Cyprus-Relevant Products)

Not all 5,000 7sun.eu products are relevant for Cyprus. Filter logic:

| Filter | Rule |
|--------|------|
| **Brands** | Jinko, JA Solar, Longi, Aiko, Jolywood, Canadian Solar, Huawei, SolarEdge, FoxESS, Sofar, Fronius, Solax, Envertech, Tigo, Hyundai |
| **Panel Wattage** | ≥400W only (smaller panels not relevant for CY market) |
| **Inverter Type** | All string + micro + hybrid |
| **Battery** | Huawei LUNA, Solax, FoxESS HV |
| **Exclude** | Mounting hardware, DC cables, ground mount frames (source locally) |
| **Minimum Price** | ≥€10 (skip cheap accessories with high shipping ratio) |

Estimated active catalog for 7sun.cy: **400–600 products** from the 5,000+ feed.

---

## 6. AI Chatbot — Knowledge-Based Assistant

### Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│  User Message    │────▶│  Next.js API Route   │
│  (Text/Widget)   │     │  /api/chat           │
└─────────────────┘     └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │  OpenAI Assistants    │
                        │  API (GPT-4o)        │
                        │                      │
                        │  Knowledge Base:      │
                        │  ├── Product catalog  │
                        │  ├── Pricing rules    │
                        │  ├── Solar guides     │
                        │  ├── Cyprus regs      │
                        │  ├── Company policies │
                        │  └── FAQ database     │
                        │                      │
                        │  Functions:           │
                        │  ├── search_products  │
                        │  ├── get_price        │
                        │  ├── check_stock      │
                        │  ├── create_quote     │
                        │  ├── track_order      │
                        │  ├── schedule_call    │
                        │  └── escalate_human   │
                        └──────────────────────┘
```

### Chatbot Capabilities

| Capability | Description | Example |
|------------|-------------|---------|
| **Product Search** | Natural language product search across catalog | "Show me 440W black panels under €70" |
| **Price Inquiry** | Show appropriate price based on customer tier | "What's the wholesale price for Jinko 440W?" |
| **Stock Check** | Real-time stock from XML sync | "Do you have SolarEdge 10kW in stock?" |
| **Comparison** | Compare products side by side | "Compare Jinko 440W vs JA Solar 450W" |
| **Quote Generation** | Auto-generate quotes for B2B orders | "I need a quote for 100 panels and 10 inverters" |
| **Solar Calculator** | Estimate system size, cost, ROI for address | "How many panels do I need for a 200sqm house in Paphos?" |
| **Order Tracking** | Check order status | "Where is my order #7S-2458?" |
| **Technical Support** | Answer spec/compatibility questions | "Can I use Huawei LUNA with SolarEdge inverter?" |
| **Regulatory Info** | Cyprus solar regulations, net-metering, grants | "How does net-metering work in Cyprus?" |
| **Appointment Booking** | Schedule callback or showroom visit | "I want to schedule a call for tomorrow at 2pm" |
| **Language Switch** | Respond in Greek or English as preferred | "Μπορείτε να μου πείτε για τα φωτοβολταϊκά;" |
| **Escalation** | Hand off to human when needed | "I need to speak to a person" → triggers notification |

### Knowledge Base Content

| Source | Content | Update Frequency |
|--------|---------|-----------------|
| Product Catalog | All products, specs, prices, stock | Auto (every 4 hours via XML sync) |
| Company Policies | Returns, warranty, shipping, payment terms, credit | Manual (quarterly) |
| Solar Knowledge | Panel types, inverter sizing, battery compatibility, wiring | Manual (one-time + updates) |
| Cyprus Regulations | Net-metering rules, EAC process, building permits, grant status | Manual (as regulations change) |
| FAQ Database | Top 100 customer questions + answers | Semi-auto (from chat history analysis) |
| Competitor Pricing | Trikkis price list, market benchmarks | Manual (monthly) |
| Installer Directory | RES Fund registered installers | Semi-auto (quarterly scrape) |

### Chat Widget UX

- **Floating widget** (bottom-right corner, solar-yellow accent)
- **Pre-set quick actions**: "Browse Products", "Get a Quote", "Track Order", "Talk to Human"
- **Context-aware**: Knows which product page you're on
- **Persistent**: Chat history saved to account (or localStorage for guests)
- **Bilingual toggle**: EN/GR switch in chat header
- **Typing indicators** + **streaming responses** for natural feel
- **Rich messages**: Product cards, image carousels, price tables, CTA buttons
- **Mobile**: Full-screen chat on mobile, swipe to dismiss

### Cost Estimate

| Component | Est. Monthly Cost |
|-----------|------------------|
| OpenAI GPT-4o API (est. 10,000 messages/mo) | €80–150 |
| OpenAI GPT-4o-mini (product translations) | €10–20 |
| Vector DB for knowledge (Supabase pgvector) | Included in Supabase |
| **Total AI Chat** | **~€100–170/mo** |

---

## 7. AI Voice Agent — ElevenLabs Conversational AI

### Use Cases

| Use Case | Trigger | Language |
|----------|---------|----------|
| **Inbound Sales Calls** | Customer calls 7SUN.cy phone number | Greek / English (auto-detect) |
| **Outbound Follow-Up** | New B2B lead → auto-call within 5 min | Greek / English |
| **Quote Follow-Up** | Quote not responded to in 48h → auto-call | Greek / English |
| **Order Confirmation** | Large orders → voice confirmation call | Greek / English |
| **Re-engagement** | Inactive customer (30 days) → "We have new stock" | Greek / English |
| **Appointment Reminder** | Scheduled call/visit → reminder call | Greek / English |

### Architecture

```
┌──────────────┐     ┌───────────────┐     ┌──────────────────┐
│ Phone Call    │────▶│ Twilio/Vapi   │────▶│ ElevenLabs       │
│ (In/Outbound)│     │ SIP/VoIP      │     │ Conversational   │
└──────────────┘     └───────────────┘     │ AI Platform      │
                                           │                  │
                                           │ Voice: Custom    │
                                           │ LLM: GPT-4o     │
                                           │ Knowledge: Same  │
                                           │   as chatbot     │
                                           │ Tools:           │
                                           │ ├── search_product│
                                           │ ├── create_quote │
                                           │ ├── check_stock  │
                                           │ ├── book_callback│
                                           │ └── transfer_human│
                                           └──────────────────┘
```

### Voice Agent Configuration

| Setting | Value |
|---------|-------|
| **Platform** | ElevenLabs Conversational AI |
| **Voice Model** | Custom cloned voice (friendly, professional) or pre-made voice |
| **Primary Language** | Greek (Cypriot accent if possible) |
| **Secondary Language** | English |
| **LLM Backend** | GPT-4o (via ElevenLabs) |
| **Latency** | <100ms (ElevenLabs proprietary stack) |
| **Phone Integration** | Twilio SIP trunk → ElevenLabs |
| **Fallback** | Transfer to human (WhatsApp/phone) if AI confidence < 60% |
| **Business Hours** | AI answers 24/7; human transfer only during business hours |
| **Recording** | All calls recorded for quality (with consent) |

### Agent Personality

```
Name: "Maria" (for Greek) / "Alex" (for English)
Tone: Friendly, knowledgeable, efficient
Greeting (GR): "Γεια σας, 7SUN Κύπρος, είμαι η Μαρία. Πώς μπορώ να σας βοηθήσω;"
Greeting (EN): "Hello, 7SUN Cyprus, this is Alex. How can I help you today?"
Closing: Always offer to send details via email/WhatsApp
Escalation: "Let me connect you with one of our specialists."
```

### Cost Estimate

| Component | Est. Monthly Cost |
|-----------|------------------|
| ElevenLabs Pro Plan (500K credits) | €99/mo |
| Twilio phone number (Cyprus +357) | €5/mo |
| Twilio voice minutes (~500 min/mo) | €25–50/mo |
| **Total Voice AI** | **~€130–155/mo** |

---

## 8. Auto-Matched Wholesale Accounts (RES Fund)

### The Problem

Solar installers in Cyprus must be registered with the RES Fund to perform grant-eligible installations. We already have the full list of 390+ registered installers from `resecfund.org.cy/en/katalogos_a1`.

### The Solution: Auto-Verify & Auto-Approve

When a new user registers on 7sun.cy:

```
User Registration Flow:
─────────────────────────────────────────────────────────────────

1. User fills registration form:
   ├── Company Name
   ├── Email
   ├── Phone
   ├── VAT Number (TIN)
   └── "Are you a registered solar installer?" [Yes/No]

2. IF "Yes" → Auto-Verification Starts:
   │
   ├── Step A: Check company name / phone / email against
   │           our RES Fund Installer Database (390+ entries)
   │           → Fuzzy match (Levenshtein distance < 3)
   │
   ├── Step B: If match found:
   │   ├── Auto-assign "Verified Installer" customer group
   │   ├── Unlock wholesale pricing (H1 tier immediately)
   │   ├── Enable Net-30 credit application
   │   ├── Send welcome email: "Your wholesale account is ready"
   │   └── Notify sales team (Slack) for personal follow-up
   │
   └── Step C: If no match found:
       ├── Flag for manual review
       ├── Send email: "We're verifying your installer status"
       ├── Check against full Cyprus business registry (if API available)
       └── Manual verification within 24h (fallback)

3. IF "No" (retail customer):
   └── Standard B2C account created, retail pricing

4. TIER UPGRADE PATH:
   ├── H1: Auto (verified installer)
   ├── H2: After €500 cumulative orders
   ├── H3: After €2,000 cumulative orders
   ├── H4: After €5,000 cumulative orders
   └── H5: After €15,000 cumulative orders OR manual approval
```

### Installer Database Maintenance

```
Quarterly Cron Job:
├── Scrape resecfund.org.cy/en/katalogos_a1 (all pages)
├── Parse installer data (code, name, phone, email, website)
├── Diff against existing database
├── Add new installers
├── Flag removed installers
└── Send report to sales team
```

### Lighthief.cy Special Account

```
Customer: LIGHTHIEF CYPRUS LTD
Group: "Anchor Partner"
Pricing: Custom (below H5, negotiated)
Credit: Net-60, €50,000 limit
Features: API access for direct order integration
Dashboard: Shared analytics (their orders, stock levels)
```

---

## 9. Newsletter & Email Automation

### Platform: Klaviyo

**Why Klaviyo over Brevo:** 60+ e-commerce automations, native product feed sync, advanced segmentation by purchase behavior, predictive analytics, built-in A/B testing.

### Email Flows (Automated)

| Flow | Trigger | Content | Frequency |
|------|---------|---------|-----------|
| **Welcome Series** | New registration | 3-email series: Welcome → Product guide → First order discount | Days 0, 2, 5 |
| **Welcome (Installer)** | Verified installer signup | Wholesale catalog PDF, pricing tiers, credit application | Day 0 |
| **Abandoned Cart** | Cart not completed in 1h | Product images, price, "Still interested?" CTA | 1h, 24h, 72h |
| **Abandoned Browse** | Viewed product, didn't add to cart | "You viewed [product]" + similar products | 4h after browse |
| **Post-Purchase** | Order completed | Thank you + installation tips + review request | Days 0, 7, 30 |
| **Reorder Reminder** | Past customer, 60 days inactive | "Time to restock?" + personalized product recs | Day 60 |
| **Price Drop Alert** | Product in wishlist price drops | "[Product] just dropped to €XX" | Real-time |
| **Back in Stock** | Out-of-stock product returns | "Great news! [Product] is back in stock" | Real-time |
| **Quote Follow-Up** | Quote requested, not ordered in 48h | Quote reminder + chatbot link + phone CTA | 48h, 7d |
| **Review Request** | Order delivered (est. 14 days) | "How was your experience?" + review link | Day 14 |
| **Win-Back** | No activity in 90 days | Special offer: 5% extra discount for next order | Day 90, 120 |

### Newsletter Campaigns (Scheduled)

| Campaign | Frequency | Content | Segments |
|----------|-----------|---------|----------|
| **Weekly Deals** | Every Monday | Top 5 deals of the week, price comparisons | All subscribers |
| **New Arrivals** | Bi-weekly | New products added from XML feed | All subscribers |
| **Stock Alert** | When significant stock arrives | "New delivery just arrived!" + product list | B2B installers |
| **Market Update** | Monthly | Cyprus solar news, regulation changes, tips | All subscribers |
| **Developer Edition** | Monthly | Apartment solar case studies, new kits | Developer segment |
| **Seasonal Push** | Quarterly | Spring push, summer peak, pre-winter storage | All + segmented |

### Auto-Generated Content

Klaviyo + AI integration for auto-generating newsletters:

```
Trigger: New products synced from XML (every 4 hours)
If: ≥5 new products OR significant price changes
Then:
  1. GPT-4o-mini generates newsletter copy (EN + GR)
  2. Klaviyo template auto-populates with product data
  3. Draft saved for human review (optional)
  4. Auto-send if review not done in 4 hours
  5. Track opens, clicks, conversions → feed back to AI
```

### Segmentation

| Segment | Criteria | Est. Size |
|---------|----------|-----------|
| B2B Installers | Customer group = Installer | 200–400 |
| B2C Homeowners | Retail account, has purchased | 500–2,000 |
| Developers | Customer group = Developer | 50–200 |
| High Value | Total orders > €5,000 | 50–100 |
| At Risk | No order in 60+ days | Variable |
| Panel Buyers | Purchased panels | Variable |
| Battery Interested | Viewed/searched batteries | Variable |
| Greek Speaking | Language pref = GR | ~70% |
| English Speaking | Language pref = EN | ~30% |

### Cost Estimate

| Component | Est. Monthly Cost |
|-----------|------------------|
| Klaviyo (up to 1,500 contacts) | €45/mo |
| Klaviyo (up to 5,000 contacts) | €100/mo |
| Klaviyo (up to 10,000 contacts) | €175/mo |
| GPT-4o-mini for auto-copy | €5–10/mo |
| **Year 1 Average** | **~€60–100/mo** |

---

## 10. Payment & Checkout

### Payment Gateway: Stripe (Cyprus)

| Feature | Configuration |
|---------|--------------|
| **Currency** | EUR (primary) |
| **Card Payments** | Visa, Mastercard, Amex |
| **Bank Transfers** | SEPA Direct Debit (for B2B) |
| **Apple/Google Pay** | Enabled |
| **Stripe Invoicing** | Auto-generated VAT invoices for B2B |
| **Net Terms** | Net-30 for verified installers (Stripe Billing) |
| **Tax Automation** | Stripe Tax for Cyprus VAT (19% standard / 5% reduced) |
| **Fees** | 1.5% + €0.25 per card transaction (EU cards) |

### Checkout Flow

```
B2C (Retail) — 3 Steps:
┌─────────┐     ┌──────────┐     ┌──────────┐
│ 1. Cart │────▶│ 2. Info  │────▶│ 3. Pay   │
│ Review  │     │ Address  │     │ Stripe   │
│ Qty/Pkg │     │ Delivery │     │ Checkout │
└─────────┘     └──────────┘     └──────────┘
                                  ├── Card
                                  ├── Apple/Google Pay
                                  └── Bank Transfer

B2B (Wholesale) — Fast Reorder:
┌──────────────┐     ┌─────────────┐
│ 1. Cart /    │────▶│ 2. Confirm  │
│ Quick Order  │     │ + Pay/Credit│
│ (CSV upload) │     │             │
└──────────────┘     └─────────────┘
                      ├── Card
                      ├── SEPA Direct Debit
                      ├── Bank Transfer (proforma)
                      └── Net-30 Credit (if approved)

Developer (Bulk):
┌──────────────┐     ┌──────────┐     ┌──────────┐
│ 1. Configure │────▶│ 2. Quote │────▶│ 3. PO /  │
│ Apartment    │     │ Review   │     │ Pay      │
│ Kit + Qty    │     │ (AI gen) │     │          │
└──────────────┘     └──────────┘     └──────────┘
```

### B2B Features

- **CSV Bulk Upload**: Upload product codes + quantities → instant cart
- **Quick Reorder**: One-click reorder from past orders
- **Purchase Orders**: Upload PO → auto-match to quote
- **Credit Application**: Online form → auto-scored → approval/denial
- **Invoice Portal**: Download all invoices, statements, tax documents
- **Spending Limits**: Per-employee spending caps (Medusa native)

---

## 11. Database & Backend Services

### Supabase (PostgreSQL + Auth + Storage + Realtime)

| Service | Use | Config |
|---------|-----|--------|
| **PostgreSQL** | Medusa commerce DB, product catalog, orders, customers | Supabase Pro ($25/mo), 8GB storage |
| **Auth** | Customer authentication, SSO, magic links | Supabase Auth (included) |
| **Storage** | Product images, datasheets, invoices | Cloudflare R2 (cheaper at scale) |
| **Realtime** | Stock level updates, chat, notifications | Supabase Realtime (included) |
| **pgvector** | AI chatbot knowledge base, semantic search | Extension enabled on Supabase |
| **Edge Functions** | Serverless functions (Deno) for webhooks | Included |
| **Row Level Security** | B2B data isolation, customer-specific pricing | Native PostgreSQL RLS |

### Database Schema (Key Tables)

```
medusa_product          → Products (synced from XML)
medusa_product_variant  → Variants (pricing, stock)
medusa_customer         → Customers (B2B + B2C)
medusa_customer_group   → Retail, Installer H1-H5, Developer, Partner
medusa_order            → Orders
medusa_price_list       → Tiered pricing per customer group
medusa_cart             → Shopping carts
─────────────────────────────────────────────
custom_installer_db     → RES Fund installer directory (390+ rows)
custom_xml_sync_log     → XML feed sync history
custom_chat_history     → AI chatbot conversations
custom_voice_call_log   → AI voice call records
custom_newsletter_sub   → Email subscriptions + preferences
custom_price_comparison → Competitor pricing (Trikkis etc.)
custom_analytics_event  → Custom product/page events
```

---

## 12. Hosting & Infrastructure

### Production Environment

| Component | Host | Plan | Est. Cost |
|-----------|------|------|-----------|
| **Next.js Frontend** | Vercel | Pro ($20/mo) | €20/mo |
| **Medusa.js Backend** | Railway or Render | Pro ($20/mo) | €20/mo |
| **Database** | Supabase | Pro ($25/mo) | €25/mo |
| **Image Storage** | Cloudflare R2 | Pay-as-you-go | €5–15/mo |
| **CDN / WAF** | Cloudflare | Pro ($20/mo) | €20/mo |
| **Search** | Meilisearch Cloud | Build ($30/mo) | €30/mo |
| **Domain** | 7sun.cy | Annual | €25/yr (~€2/mo) |
| **SSL** | Cloudflare (free) | — | €0 |
| **Monitoring** | Sentry (Developer) | Free tier | €0 |
| **Uptime** | Uptime Robot | Pro ($7/mo) | €7/mo |
| **Analytics** | PostHog Cloud | Free (1M events) | €0 |
| **Total Hosting** | | | **~€150/mo** |

### Staging Environment

Mirror of production for testing:

| Component | Host | Cost |
|-----------|------|------|
| Next.js | Vercel (preview deployments) | Included |
| Medusa | Railway (dev instance) | €5/mo |
| Database | Supabase (separate project) | Free tier |
| **Total Staging** | | **~€5/mo** |

### CI/CD Pipeline

```
GitHub Repository
├── /frontend          → Next.js 15 storefront
├── /backend           → Medusa.js v2 server
├── /packages/xml-sync → XML feed sync worker
├── /packages/ai-chat  → AI chatbot logic
├── /packages/res-fund → Installer verification
└── /infra             → IaC (Terraform/Pulumi)

Deploy Flow:
  git push → GitHub Actions → Build → Test → Deploy
  ├── Frontend → Vercel (auto-deploy on push)
  ├── Backend → Railway (auto-deploy on push)
  └── Workers → Railway (cron jobs)
```

---

## 13. Security & Compliance

| Requirement | Implementation |
|-------------|---------------|
| **GDPR** | Cookie consent (Cookiebot), data deletion API, privacy policy, DPO contact |
| **PCI DSS** | Stripe handles all card data (PCI Level 1); no card data touches our servers |
| **SSL/TLS** | Cloudflare Universal SSL (free), HSTS enabled |
| **DDoS Protection** | Cloudflare WAF + rate limiting |
| **Authentication** | Supabase Auth (bcrypt hashing, magic links, 2FA for B2B) |
| **API Security** | Rate limiting, API keys for B2B integrations, CORS policies |
| **Data Encryption** | At rest (Supabase AES-256) + in transit (TLS 1.3) |
| **Backups** | Supabase daily backups (7-day retention on Pro) |
| **Access Control** | Row-level security in PostgreSQL; customer data isolation |
| **Audit Trail** | All admin actions logged; XML sync changes tracked |
| **Cyprus Data Residency** | Supabase EU region (Frankfurt); Cloudflare EU PoP |
| **Cookie Policy** | Bilingual (EN/GR) cookie banner with granular consent |

---

## 14. Development Roadmap & Timeline

### Phase 1: Foundation (Weeks 1–2)

| Task | Duration | Dependencies |
|------|----------|-------------|
| Set up GitHub mono-repo + CI/CD | 2 days | — |
| Deploy Medusa.js v2 backend on Railway | 3 days | Repo |
| Configure Supabase (DB, Auth, Storage) | 2 days | — |
| Set up Cloudflare (domain, CDN, R2) | 1 day | Domain registered |
| Build XML feed sync worker (v1) | 5 days | Medusa running |
| Initial product import (400–600 products) | 2 days | Sync worker |
| Configure Stripe (Cyprus business account) | 2 days | Company registration |
| Set up Vercel + Next.js project scaffold | 2 days | — |
| **Phase 1 Deliverable:** Backend running, products imported, payments configured |

### Phase 2: Storefront (Weeks 3–5)

| Task | Duration | Dependencies |
|------|----------|-------------|
| Next.js storefront — homepage | 4 days | Design approved |
| Product listing pages (catalog, filters, search) | 5 days | Meilisearch |
| Product detail pages (images, specs, pricing) | 4 days | Products imported |
| Shopping cart + checkout flow (B2C) | 4 days | Stripe |
| Customer accounts (login, register, profile) | 3 days | Supabase Auth |
| Bilingual support (EN/GR) via next-intl | 3 days | All pages |
| Mobile responsive design | 3 days | All pages |
| SEO optimization (meta tags, structured data, sitemap) | 2 days | All pages |
| **Phase 2 Deliverable:** Fully functional B2C store, live product catalog |

### Phase 3: B2B & Wholesale (Weeks 6–7)

| Task | Duration | Dependencies |
|------|----------|-------------|
| B2B wholesale portal (login-gated) | 3 days | Auth |
| Tiered pricing display (H1–H5) | 3 days | Medusa price lists |
| RES Fund auto-verification module | 4 days | Installer DB |
| Quote request flow (RFQ → negotiate → order) | 4 days | Medusa B2B |
| CSV bulk order upload | 2 days | Cart |
| B2B invoice portal (Stripe Invoicing) | 2 days | Stripe |
| Credit terms application flow | 2 days | Manual approval backend |
| **Phase 3 Deliverable:** Full B2B wholesale portal with auto-verified installer accounts |

### Phase 4: AI Integration (Weeks 8–9)

| Task | Duration | Dependencies |
|------|----------|-------------|
| AI Chatbot — knowledge base build | 3 days | Products + docs |
| AI Chatbot — OpenAI Assistants API integration | 4 days | Knowledge base |
| AI Chatbot — function calling (search, quote, stock) | 3 days | Medusa API |
| Chat widget UI (floating, bilingual) | 3 days | Frontend |
| ElevenLabs voice agent setup | 3 days | Knowledge base |
| Twilio phone number + SIP integration | 2 days | ElevenLabs |
| Voice agent testing (Greek + English) | 2 days | All voice components |
| **Phase 4 Deliverable:** AI chatbot live on site + AI phone agent operational |

### Phase 5: Automation & Newsletter (Week 10)

| Task | Duration | Dependencies |
|------|----------|-------------|
| Klaviyo integration + product feed sync | 2 days | Medusa |
| Email templates (welcome, cart abandon, etc.) | 3 days | Klaviyo |
| Automated flows (10 flows from Section 9) | 4 days | Templates |
| Newsletter auto-generation (AI + product feed) | 2 days | GPT-4o-mini |
| Subscriber segmentation setup | 1 day | Customer data |
| **Phase 5 Deliverable:** All email automations live, newsletter auto-generating |

### Phase 6: Developer Portal & Kits (Week 11)

| Task | Duration | Dependencies |
|------|----------|-------------|
| Apartment solar landing page | 2 days | — |
| Per-apartment ROI calculator | 2 days | — |
| Kit builder (configure panels + micro inverter) | 3 days | Products |
| Developer bulk quote flow | 2 days | Quote system |
| Developer-specific email flows | 1 day | Klaviyo |
| **Phase 6 Deliverable:** Developer portal live with kit builder and calculator |

### Phase 7: Polish & Launch (Week 12)

| Task | Duration | Dependencies |
|------|----------|-------------|
| Performance optimization (Core Web Vitals) | 3 days | All pages |
| Load testing (simulate 500 concurrent users) | 1 day | — |
| Security audit + penetration testing | 2 days | — |
| GDPR compliance review | 1 day | Legal review |
| UAT with Lighthief.cy (B2B flow test) | 2 days | B2B portal |
| Bug fixes + polish | 3 days | UAT feedback |
| Go-live preparation + DNS switch | 1 day | — |
| **Phase 7 Deliverable:** Production launch of 7sun.cy |

### Total Timeline: **~12 weeks (~3 months)**

```
Week:  1  2  3  4  5  6  7  8  9 10 11 12
Phase: ████ ██████ ████ ████ ██ ██ ████
       Fnd  Store  B2B  AI   Au Dv Launch
```

---

## 15. Monthly Operating Costs

### Infrastructure

| Service | Monthly | Annual |
|---------|---------|--------|
| Vercel Pro (frontend hosting) | €20 | €240 |
| Railway Pro (backend hosting) | €20 | €240 |
| Supabase Pro (database + auth) | €25 | €300 |
| Cloudflare Pro (CDN + WAF) | €20 | €240 |
| Cloudflare R2 (image storage) | €10 | €120 |
| Meilisearch Cloud (search) | €30 | €360 |
| Sentry (error monitoring) | €0 | €0 |
| PostHog (analytics) | €0 | €0 |
| Domain (7sun.cy) | €2 | €25 |
| **Infrastructure Subtotal** | **€147** | **€1,525** |

### AI Services

| Service | Monthly | Annual |
|---------|---------|--------|
| OpenAI GPT-4o (chatbot, ~10K msgs) | €120 | €1,440 |
| OpenAI GPT-4o-mini (translations, newsletter copy) | €15 | €180 |
| ElevenLabs Pro (voice agent) | €99 | €1,188 |
| Twilio (phone number + ~500 min voice) | €35 | €420 |
| **AI Subtotal** | **€269** | **€3,228** |

### Marketing & Email

| Service | Monthly | Annual |
|---------|---------|--------|
| Klaviyo (up to 2,500 contacts Y1) | €65 | €780 |
| **Email Subtotal** | **€65** | **€780** |

### Payment Processing

| Service | Monthly (est.) | Annual |
|---------|---------------|--------|
| Stripe fees (1.5% + €0.25 on ~€88K/mo revenue) | ~€1,540 | ~€18,480 |
| *Note: Stripe fees scale with revenue* | | |

### Total Platform Operating Costs (Excluding Stripe)

| Category | Monthly | Annual |
|----------|---------|--------|
| Infrastructure | €147 | €1,525 |
| AI Services | €269 | €3,228 |
| Email Marketing | €65 | €780 |
| **Total** | **€481** | **€5,533** |

> **Compared to Shopify Plus:** $2,300/mo ($27,600/yr) platform fees alone + apps ($200–500/mo) + higher transaction fees. Our total platform cost of **€481/mo** is ~80% less than Shopify Plus equivalent.

### Scaling Costs (Year 2+)

As traffic and orders grow:

| If Revenue Hits | Est. Platform Cost | Platform Cost % of Revenue |
|----------------|-------------------|---------------------------|
| €50K/mo | €450/mo | 0.9% |
| €100K/mo | €600/mo | 0.6% |
| €200K/mo | €900/mo | 0.45% |
| €500K/mo | €1,500/mo | 0.3% |

---

## 16. Team & Resources

### Development Phase (~12 Weeks — Internal Build)

| Role | Type | Est. Cost |
|------|------|-----------|
| **Full-Stack Development** (Next.js + Medusa + AI) | Internal (founders) | €0 (own time) |
| **External Web Consultant** (UI/UX review, design guidance, QA audit) | Freelance consultant | €2,500–5,500 |
| **Total Development** | | **€2,500–5,500** |

> **Note:** Platform coded internally by the founding team. The €2,500–5,500 covers an external web consultant for UI/UX design review, responsive design guidance, and pre-launch quality audit. All AI service costs (OpenAI, ElevenLabs, Twilio) are monthly operating expenses listed in Section 15.

### Ongoing (Post-Launch)

| Role | Hours/Week | Est. Cost |
|------|-----------|-----------|
| Developer (maintenance, features) | 10–15h | Internal (founders) |
| Content/Marketing (AI-assisted) | 5h | Internal |
| Customer Support (AI handles 80%+) | 5h | Internal (AI handles majority) |
| **Total Ongoing External** | | **€0/mo** (all internal) |

### Build Cost Comparison

| Option | Cost | Timeline |
|--------|------|----------|
| **Our approach (internal + consultant)** | **€2,500–5,500** | **~12 weeks** |
| Freelance team | €34,000–54,000 | 20 weeks |
| Mid-tier agency | €50,000–80,000 | 16–20 weeks |
| Top-tier agency | €80,000–120,000 | 12–16 weeks |

---

## Total Investment Summary

| Category | Cost |
|----------|------|
| **Development (one-time)** | €2,500–5,500 (external web consultant) |
| **First Year Platform Costs** | €5,533 (infra + AI tokens + email) |
| **First Year Ongoing Team** | €0 (internal) |
| **Total Year 1 Website Investment** | **~€8,033–11,033** |
| | |
| **For Context:** | |
| Year 1 Projected Revenue | €1,056,000 |
| Website as % of Revenue | **0.76%** |
| | |
| **Year 2+ Annual Cost** | |
| Platform costs (ongoing) | €5,533/yr |
| Website as % of Revenue (Y2+) | **~0.5%** |

> **Cost breakdown of monthly €481:** Infrastructure €147/mo (Vercel, Railway, Supabase, Cloudflare, Meilisearch) + AI tokens €269/mo (OpenAI GPT-4o chatbot, GPT-4o-mini translations, ElevenLabs voice, Twilio phone) + Email €65/mo (Klaviyo). These are the "AI token add-ons" on top of the €2,500–5,500 build cost.

---

## Key Decision Points

### Decision 1: Build vs. Buy

**Recommendation: Build (Medusa.js + Next.js).**  
The B2B requirements (tiered pricing, auto-installer verification, XML feed sync, AI integration) are too specific for off-the-shelf platforms without expensive customization.

### Decision 2: AI Chat Provider

| Option | Pro | Con | Cost |
|--------|-----|-----|------|
| **OpenAI Assistants (Recommended)** | Best function calling, knowledge base, Greek support | Vendor lock-in | €120/mo |
| Anthropic Claude | Better at structured data, less hallucination | Less e-commerce tooling | €100/mo |
| Custom (open-source LLM) | No vendor lock-in, data stays local | Needs GPU hosting, lower quality | €200+/mo |

### Decision 3: Voice Agent Provider

| Option | Pro | Con | Cost |
|--------|-----|-----|------|
| **ElevenLabs (Recommended)** | Best voice quality, sub-100ms, Greek support | Newer platform | €134/mo |
| Vapi | More telephony features, multi-provider | Requires more dev work | €100–200/mo |
| Bland.ai | Purpose-built for phone calls | Less voice quality | €80–150/mo |

### Decision 4: Newsletter Platform

| Option | Pro | Con | Cost |
|--------|-----|-----|------|
| **Klaviyo (Recommended)** | Best e-commerce automation, product feed sync | More expensive at scale | €65–175/mo |
| Brevo | Cheaper, includes SMS + chat | Fewer e-commerce automations | €25–65/mo |
| Resend + React Email | Cheapest, full control | Must build all automations manually | €20/mo |

### Decision 5: Search Engine

| Option | Pro | Con | Cost |
|--------|-----|-----|------|
| **Meilisearch Cloud (Recommended)** | Fast, typo-tolerant, faceted, Greek support, affordable | Smaller ecosystem than Algolia | €30/mo |
| Algolia | Industry standard, AI recommendations | Expensive at scale | €100+/mo |
| Supabase full-text search | Free, already in stack | Slower, less features | €0 |

---

## Next Steps

1. **Register domain**: 7sun.cy (check availability)
2. **Register Stripe**: Cyprus business account
3. **Set up GitHub repository**: Mono-repo structure
4. **Hire/brief developer(s)**: Full-stack + AI specialist
5. **Design phase**: Wireframes + brand design for 7sun.cy
6. **Begin Phase 1**: Foundation sprint (Weeks 1–4)

---

*This infrastructure plan is designed for a lean, AI-first solar e-commerce operation with maximum automation and minimum human interaction. Total platform costs are ~80% lower than equivalent Shopify Plus setup, while providing superior B2B capabilities, AI integration, and full control over the customer experience.*
