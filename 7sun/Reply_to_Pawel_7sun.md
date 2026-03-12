# Reply to Paweł — 7SUN Cyprus Update

**Date:** February 2026  
**From:** Aleksander  
**To:** Paweł (7sun.eu)

---

Hi Paweł,

Great to hear from you. Let me address each point — we've actually done quite a lot of homework already.

---

## 1. Pricing Confirmation — H1-H5 Are Selling Prices

Thank you for confirming. We had already worked out that H1-H5 are suggested selling prices for installers (not our cost), and we've built our entire business model around that assumption. Our current working estimate is that our internal purchase price is approximately 80% of H1 — but this is a rough placeholder.

**Yes, please send us the actual purchase prices for your stock.** This is the single most important thing we need right now. It will allow us to:
- Finalize our first order
- Set competitive Cyprus pricing
- Confirm margins on every product category

> **Research file:** `7SUN_First_Stock_List.md` — contains our complete proposed first delivery with product-by-product analysis, margins calculated at estimated cost, and Cyprus market positioning for every SKU.

---

## 2. Market Research — Yes, It's Done

We have extensive market research ready. Here's what we've prepared:

| File | Contents |
|------|----------|
| **`7SUN_Cyprus_Business_Plan.md`** | Full business plan: Cyprus solar market analysis (957 MW installed, ~120 MW/year growth), competitive landscape, price comparison vs Trikkis Energy (the dominant local distributor), business model, financial projections, risk analysis |
| **`7SUN_First_Stock_List.md`** | Detailed first delivery stock list with product-by-product selection rationale, margin calculations, net billing sizing (4.16 kWp limit), competitive positioning vs local prices |
| **`7SUN_Marketing_Plan.md`** | Complete ad manager plan (Meta + Google Ads), campaign structures, audience targeting, creative library, content calendar, landing pages, KPIs, budget |
| **`7SUN_SWOT_Analysis.md`** | Full SWOT analysis for the Cyprus market entry |
| **`7SUN_Cyprus_Installers_Database.md`** | Database of **390+ RES Fund certified solar installers** in Cyprus — scraped from the official government registry, with contact details |
| **`7SUN_Website_Infrastructure_Plan.md`** | Technical architecture for the 7sun.cy e-commerce platform |
| **`7SUN_Website_Proposal_for_7sun.md`** | Executive summary + cost comparison for 7sun to review |
| **`Trikkis CY-Pricelist-01-09-2025.pdf`** | Competitor pricelist (Trikkis Energy) — full Huawei, Jinko, REC pricing with retail/wholesale/pallet tiers |
| **`KYPROS - Green Energy Solution roadmap-1.xlsx`** | Competitive market analysis from Green Energy Group / Costas at Asbis (end 2024) — their Cyprus distribution plans and product roadmap |

All files are available in both **Markdown** and **HTML** (with PDF export) formats.

---

## 3. Which Products Could Be Successful — Summary

Based on our research + feedback from our local Electrical Engineer, here are the key findings:

### Panels (2-4 models recommended, not more)
- **Longi 455W** and **JA Solar 450W** — both Tier 1, both NOT widely sold in Cyprus by anyone. These are our exclusive advantage.
- **Jinko 455W** — most requested brand in Cyprus (but Trikkis also sells Jinko, so less exclusive)
- All panels sized to fit the **Cyprus 4.16 kWp single-phase net billing limit** (max 5kW inverter, 1kW oversizing rule)
- Our local EE recommends max 2-4 panel models. Installers go for the cheapest.

### Inverters — Deye Single-Phase Hybrid is Our Key Product
- **Deye SUN-5K-SG03LP1-EU** — the most affordable 5kW single-phase hybrid + storage combo for net billing in Cyprus
- Trikkis sells Huawei L-series single-phase hybrids (SUN2000L-5KTL/L1 at €616 wholesale), BUT Huawei LUNA batteries are very expensive (€1,725 + €698 controller = €2,423 for 5kWh storage)
- **Our Deye 5K + SE-G5.1 PRO-B battery kit sells at €1,650-1,850 wholesale — 40-46% cheaper than the Huawei equivalent complete kit (€3,039)**
- This price gap is our #1 competitive weapon

### Important Local Intel from Our Electrical Engineer
- **SolarEdge is already represented in Cyprus by BIGSOLAR (Epiphaniou Group)** — we need to verify if we can sell SolarEdge or if there's a channel conflict
- **Solax is represented by EV Energy CY** — affects our Solax micro inverter plans
- **Micro inverters may not be fully legislated in Cyprus** — EAC grid programming requirements may not be met. Needs verification before we commit stock.
- **Deye SE-G5.1 batteries are NOT waterproof** — installation guidance needed (indoor/covered only)
- **FoxESS** is growing in Europe and may not yet have a Cyprus representative — potential opportunity for a complete inverter series
- EE recommends **1-2 inverter brands with complete series**, not random models from many brands

### Strategic Recommendation for First Order
1. **Panels:** 2-4 models (Longi 455W, JA Solar 450W, possibly Jinko 455W and 500W)
2. **Inverters:** Deye single-phase hybrid (5K) as primary — complete affordable net billing solution
3. **Batteries:** Deye SE-G5.1 PRO-B stackable (5.15-20.6 kWh) — massive price advantage over Huawei LUNA
4. **Huawei 3-phase inverters:** We source locally from Trikkis (unbeatable local pricing, same-day availability)
5. **SolarEdge:** ON HOLD — need to clarify BIGSOLAR/Epiphaniou situation
6. **Micro inverters:** ON HOLD — need to verify EAC legislation compliance
7. **Consider FoxESS** as a second inverter brand with complete series (needs further evaluation)

> **Research files:** `7SUN_First_Stock_List.md` (full product analysis), `7SUN_Cyprus_Business_Plan.md` (Section 3-4: competitive analysis + price comparison)

---

## 4. Online Meeting — Friday Works

Yes, let's do an online meeting on Friday. I'd like to cover:
1. Confirm purchase prices (if you can send them before the call, even better)
2. Walk through our market research and first stock list
3. Discuss the SolarEdge/Solax channel conflict issue
4. Agree on the website approach (see below)
5. Align on timeline for first delivery

Please send a calendar invite with a time that works for you.

---

## 5. Website Platform — React vs WooCommerce

I understand the argument for speed-to-market with a WooCommerce clone. Here's our analysis:

### We've prepared a detailed comparison
> **Files:** `7SUN_Website_Proposal_for_7sun.md` (executive summary + cost comparison) and `7SUN_Website_Infrastructure_Plan.md` (full technical architecture)

### The Key Question: What's "Fast Enough" vs "Right"?

| | WooCommerce Clone | Our Stack (Medusa.js + Next.js) |
|---|---|---|
| **Time to Launch** | 4-6 weeks | ~12 weeks (MVP in 6-8) |
| **Cost to Build** | €25,000-40,000 | €2,500–5,500 (internal + consultant) |
| **Page Speed** | 1.5-4 seconds | 0.2-0.8 seconds |
| **AI Chatbot** | Basic plugin | Native GPT-4o with product API |
| **AI Voice Agent** | Not possible | ElevenLabs 24/7 Greek+English |
| **Auto-Verify Installers** | Not possible | Fuzzy-match 390+ RES Fund DB |
| **B2B Tiered Pricing** | Plugin ($149-299/yr) | Native |
| **Greek Translation** | Manual (WPML) | Auto AI on every sync |
| **3-Year Total Cost** | €133K-148K | ~€19,100–22,100 |

### My Proposal: Pragmatic Hybrid Approach

I hear the urgency. Here's what I suggest:

1. **Phase 1 (Immediate):** Launch a simple WooCommerce landing page / catalog from the 7sun.eu clone — basic product listing, price enquiry form, "coming soon" wholesale portal. This can go live in 2-3 weeks and start capturing leads.

2. **Phase 2 (Parallel):** Build the full Medusa.js + Next.js platform with AI automation, wholesale auto-verification, and all the features that WooCommerce can't deliver. This becomes the real 7sun.cy.

3. **Cutover:** When the React platform is ready, we redirect traffic and have a modern, scalable system that runs on AI with minimal human interaction.

This way we sell fast (your WooCommerce speed) AND build right (our long-term platform). We can discuss the details on Friday.

---

## 6. Your Team Calling Local Installers

Thank you for the offer — and yes, this could be very helpful, but with a focused scope:

**What we already have:**
- Database of **390+ certified installers** from the Cyprus RES Fund registry (names, companies, phone numbers, locations) — see `7SUN_Cyprus_Installers_Database.md`
- Competitive pricing analysis vs Trikkis (the main distributor they all currently use)

**What would be most valuable from your team:**
- Calling **10-15 of the largest installers** in Limassol and Nicosia to ask:
  - What brands/models are they currently installing? (panels, inverters, batteries)
  - What's their biggest pain point with current suppliers? (stock, price, delivery, support?)
  - Would they be interested in Deye single-phase hybrid kits for net billing?
  - What's their monthly volume? (how many systems per month?)
- This gives us real demand signal to finalize the stock list

We can provide the contact list and a call script. The calls would ideally be in **Greek** (most installers in Cyprus are Greek-speaking), but some larger companies have English-speaking staff.

---

## Summary — What We Need From You

| # | Action | Priority | Timeline |
|---|--------|----------|----------|
| 1 | **Send purchase prices** for stock (not H1-H5, our actual cost per SKU) | CRITICAL | Before Friday |
| 2 | **Friday online meeting** — send calendar invite | HIGH | This week |
| 3 | **Confirm SolarEdge status** — can we sell SE in Cyprus given BIGSOLAR is the local rep? | HIGH | Friday call |
| 4 | **Review our research files** — I'll share the full pack (all files listed above) | MEDIUM | Before Friday |
| 5 | **Installer calls** — your team calls 10-15 Cyprus installers (we provide contacts + script) | MEDIUM | Next 2 weeks |
| 6 | **Agree on website approach** — WooCommerce quick-start vs full platform | MEDIUM | Friday call |
| 7 | **Brand assets** — 7sun logo (SVG), brand guidelines for 7sun.cy | LOW | When ready |

Looking forward to the Friday call. I'll share all the research files before then so you can review.

Best regards,
Alex

---

*Attached research files:*
- `7SUN_Cyprus_Business_Plan.md` + `.html`
- `7SUN_First_Stock_List.md` + `.html`
- `7SUN_Marketing_Plan.md` + `.html`
- `7SUN_SWOT_Analysis.md` + `.html`
- `7SUN_Website_Proposal_for_7sun.md` + `.html`
- `7SUN_Website_Infrastructure_Plan.md` + `.html`
- `7SUN_Cyprus_Installers_Database.md`
