# 7SUN Cyprus — E-Commerce Platform Proposal
## AI-Powered Online Store for Cyprus Solar Market

**Prepared:** February 2026  
**For:** 7sun.eu — B2B Photovoltaic Wholesale  
**From:** 7SUN Cyprus / Lighthief.cy Partnership  
**Domain:** 7sun.cy

---

## Executive Summary

We propose building **7sun.cy** — an AI-powered e-commerce platform for the Cyprus solar market that automatically syncs products from 7sun.eu's existing XML feed, handles 80%+ of customer interactions via AI (chat + voice), and provides separate B2C retail, B2B wholesale, and developer portals.

### Key Numbers

| Metric | Value |
|--------|-------|
| **Monthly Platform Cost** | €481/mo (80% less than Shopify Plus) |
| **Development Investment** | €2,500–5,500 (internal build + web consultant) |
| **Products Auto-Synced** | 400–600 from 7sun.eu XML |
| **Sync Interval** | Every 4 hours (zero manual work) |
| **AI Customer Handling** | 80%+ of interactions |
| **Year 1 Revenue Target** | €1,056,000 |
| **Year 1 ROI** | ~23–32× return on website investment |

---

## 1. What We're Building

### Three Portals, One Platform

1. **B2C Retail Store** (7sun.cy/shop) — For homeowners. Retail pricing, solar calculator, 3-click checkout
2. **B2B Wholesale Portal** (7sun.cy/wholesale) — For installers. Tiered pricing (H1–H5), RES Fund auto-verify, CSV bulk upload, credit terms, quote system
3. **Developer Portal** (7sun.cy/apartment-solar) — For real estate developers. Apartment micro inverter kit builder, ROI calculator, bulk quotes

### AI Automation

- **AI Chatbot (GPT-4o)**: Product search, stock check, pricing, quote generation, order tracking, regulatory info — bilingual Greek + English
- **AI Voice Agent (ElevenLabs)**: Handles inbound/outbound phone calls 24/7 in Greek + English. Same knowledge base as chatbot.
- **AI Newsletter Generation**: Automatically writes newsletters when new products sync or prices change
- **AI Greek Translation**: All product descriptions auto-translated from English to Greek on sync

### XML Feed Integration (Zero Manual Work)

Everything syncs from 7sun.eu's existing DataFeedWatch XML feed:
- Product names, descriptions, images, datasheets
- B2B pricing → auto-calculated to 6 tiers (H1–H5 + retail)
- Stock levels in real-time
- Brand, category, specifications, EAN codes
- New products appear automatically; removed products delist automatically

**Nothing changes on 7sun.eu's side. We consume the existing XML feed as-is.**

---

## 2. Why Not WooCommerce?

7sun.eu runs on WordPress/WooCommerce. Here's why 7sun.cy needs a different approach:

### Head-to-Head Comparison

| Feature | WooCommerce | Our Stack (Medusa + Next.js) |
|---------|-------------|------------------------------|
| **Platform License** | Free | Free (open source) |
| **B2B Plugins Required** | 3+ plugins ($149–299/yr each) | Native B2B — €0 |
| **Total Plugins/Year** | €800–1,500/yr | €0 |
| **Hosting** | €50–200/mo (managed WP) | €40/mo (Vercel + Railway) |
| **Page Load Speed** | 1.5–4 seconds | **0.2–0.8 seconds** |
| **Speed Under Load** | Degrades to 10–20s at peak | Consistent (edge CDN) |
| **Mobile Lighthouse** | 40–65 | **90–100** |
| **AI Chatbot** | 3rd party plugin ($50–300/mo), basic | **Native GPT-4o with function calling** |
| **AI Voice Agent** | **Not possible** | **ElevenLabs — 24/7 Greek + English** |
| **Auto-Verify Installers** | **Not possible** | **Fuzzy-match against 390+ RES Fund DB** |
| **Greek Auto-Translation** | Manual (WPML $99/yr) | **GPT-4o-mini on every XML sync** |
| **Security** | #1 hacking target, constant updates | API-only backend, immutable deploys |
| **Plugin Conflicts** | 15–20 plugins, regular breakage | Single codebase, CI/CD tested |
| **SEO** | Decent (limited by speed) | **Superior (server-rendered, fast Core Web Vitals)** |

### Speed = Revenue

| Metric | WooCommerce | Our Stack |
|--------|-------------|-----------|
| Homepage | 2.5–4 seconds | **0.2–0.5 seconds** |
| Product page | 1.8–3 seconds | **0.3–0.8 seconds** |
| Checkout (peak) | 10–20 seconds | **0.5–1 second** |

Research shows every 100ms of faster load time increases conversion by 1%. A 2-second improvement could mean **20%+ higher conversion rates**.

### What WooCommerce Cannot Do

- ✗ AI voice agent handling phone calls 24/7
- ✗ Auto-verify installers against RES Fund database
- ✗ AI chatbot with real-time product API function calling
- ✗ Auto-translate products to Greek via AI on sync
- ✗ 0.2–0.5s page loads with 500+ products
- ✗ Edge-deployed globally with auto-scaling
- ✗ Immutable deployments (zero downtime updates)

---

## 3. Total Cost of Ownership — 3-Year Comparison

| Cost Category | WooCommerce (3 Years) | Our Stack (3 Years) | Savings |
|--------------|----------------------|---------------------|---------|
| Hosting | €5,400 | **€1,440** | €3,960 |
| Plugins/Extensions | €3,600 | **€0** | €3,600 |
| AI Chat | €5,400 | **€4,320** | €1,080 |
| AI Voice | Not available | €4,824 | N/A (new) |
| CDN/WAF/Security | €1,080 | **€720** | €360 |
| Search Engine | €0 (basic) | €1,080 | -€1,080 |
| Email (Klaviyo) | €2,880 | €2,880 | €0 |
| Database | Included | €900 | -€900 |
| Dev Maintenance | €90,000 | **€0 (internal)** | €90,000 |
| **3-Year Total (excl. build)** | **€108,360** | **€16,164** | **€92,196 saved** |
| Initial Development | €25,000–40,000 | €2,500–5,500 (internal build + web consultant) | €22.5K–37.5K saved |
| **3-Year Total (incl. build)** | **€133K–148K** | **~€18,664–21,664** | **€115K–130K saved** |

**Bottom line:** Our stack costs **€115K–130K less over 3 years** than WooCommerce — and includes AI voice agent, auto-installer verification, 5× speed, and 80% AI automation that WooCommerce cannot provide at any price. The platform is built internally; only external cost is €2,500–5,500 for a web design consultant.

---

## 4. Cost Report — Detailed Breakdown

### Development Investment (One-Time)

| Phase | Scope | Weeks | Cost |
|-------|-------|-------|------|
| Foundation | Backend, DB, XML sync, Stripe, hosting | 2 | Internal |
| B2C Storefront | Homepage, catalog, cart, checkout, bilingual | 3 | Internal |
| B2B Wholesale | Portal, tiered pricing, auto-verify, quotes | 2 | Internal |
| AI Integration | Chatbot (GPT-4o), voice agent (ElevenLabs) | 2 | Internal |
| Automation | Klaviyo, email flows, newsletter AI | 1 | Internal |
| Developer Portal | Apartment solar, calculator, kit builder | 1 | Internal |
| Launch | Performance, security, testing, go-live | 1 | Internal |
| External Web Consultant | UI/UX review, design guidance, QA audit | Ongoing | €2,500–5,500 |
| **TOTAL** | | **~12 weeks** | **€2,500–5,500** |

> **Cost model:** Platform coded internally by the founding team. External web consultant provides UI/UX design review, responsive design guidance, and pre-launch quality audit. AI service costs (OpenAI, ElevenLabs, Twilio) are monthly operating expenses — see below.

### Monthly Operating Costs

| Category | Service | Monthly | Annual |
|----------|---------|---------|--------|
| Infrastructure | Vercel + Railway + Supabase + Cloudflare + Search | €147 | €1,525 |
| AI Services | OpenAI (chatbot) + ElevenLabs (voice) + Twilio (phone) | €269 | €3,228 |
| Email | Klaviyo | €65 | €780 |
| **TOTAL** | | **€481** | **€5,533** |

### Revenue Impact

| Metric | Without Website | With 7sun.cy | Impact |
|--------|----------------|-------------|--------|
| Year 1 Revenue | €800,000 | **€1,056,000** | +€256,000 (+32%) |
| Gross Margin | 22% | **25.3%** | +3.3 points |
| Customer Support | Full-time person | AI 80%+ | ~€24,000/yr saved |
| Apartment Kits (new) | €0 | **€144,000/yr** | Pure new revenue |
| Order Processing | Manual | 80% automated | ~20h/week saved |

### Year 1 ROI

| | |
|---|---|
| **Website Investment** | €2,500–5,500 + €5,533 platform = ~€8,033–11,033 |
| **Revenue Uplift** | €256,000+ |
| **ROI** | **~23–32× return in Year 1** |

---

## 5. What We Need from 7sun.eu

| # | Requirement | Details | Status |
|---|------------|---------|--------|
| 1 | XML Product Feed Access | DataFeedWatch feed URL | ✅ Already have |
| 2 | B2B Pricing Confirmation | H1–H5 tier multipliers for Cyprus | ⚠️ Needs confirmation |
| 3 | Brand Assets | 7sun logo (SVG), brand guidelines | ⚠️ Needs from 7sun |
| 4 | Product Datasheets | PDFs per product or URL mapping | ⚠️ Needs mapping |
| 5 | Wholesale Terms | Cyprus B2B reselling agreement | ⚠️ Needs agreement |
| 6 | API Access (Optional) | Direct API for real-time stock beyond XML | Nice to have |

**The XML feed already provides 90% of what we need.** The development team handles everything else.

---

## 6. Timeline & Next Steps

### 20-Week Roadmap

```
Week:  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20
Phase: ████████ ████████████████ ██████████ ██████████ ████████ ████████
       Found.   Storefront      B2B/WS     AI Chat+   Email    Launch
                                            Voice      Auto     🚀
```

### Immediate Next Steps

1. **Approve proposal** — Confirm scope, budget, and timeline
2. **Confirm B2B pricing tiers** — H1–H5 multipliers for Cyprus
3. **Provide brand assets** — 7sun logo (SVG) and guidelines
4. **Sign wholesale terms** — Cyprus reselling agreement
5. **Register domain** — 7sun.cy
6. **Kick off development** — Phase 1 Foundation sprint

---

## Tech Stack Summary

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 15 (on Vercel) | €20/mo |
| Commerce Engine | Medusa.js v2 (open source) | Free |
| Backend Hosting | Railway | €20/mo |
| Database + Auth | Supabase (PostgreSQL) | €25/mo |
| Payments | Stripe (Cyprus, EUR) | 1.5% + €0.25/tx |
| AI Chat | OpenAI GPT-4o Assistants | ~€120/mo |
| AI Voice | ElevenLabs + Twilio | ~€134/mo |
| Email | Klaviyo | ~€65/mo |
| Search | Meilisearch | €30/mo |
| CDN / Security | Cloudflare | €20/mo |
| Analytics | PostHog + GA4 | Free |

---

*Proposal prepared February 2026. All costs in EUR. Platform pricing based on published rates. Development built internally; €2,500–5,500 covers external web consultant. AI token costs are monthly operating expenses. Revenue projections based on 7SUN Cyprus Business Plan.*
