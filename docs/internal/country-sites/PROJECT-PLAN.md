# Lighthief country sites — project plan

**Status:** ready to start after founder approval  
**Companion:** [FOUNDER-BRIEF.md](./FOUNDER-BRIEF.md)  
**Date:** 4 September 2026  
**Priority order:** Italy + Germany → CRM/HR on those domains → Cyprus public site → Spain → Poland `.com` (SEO-safe last)

---

## 1. Decisions already made

| Decision | Choice |
|---|---|
| Product | One Next.js app (`lighthief-web`), not WordPress, not five sites |
| Hosting | Vercel, one project, five hostnames |
| Design | Shared templates; navy / gold brand |
| Languages | Default language at `/`; other two as `/en/`, `/de/`, etc. |
| `.com` role | Poland + group. Polish URLs stay at root. Rebuild last. |
| CRM / HR | Same product as solarfarms.cy, country-scoped. Group sees all. Local sees one country. |
| Cyprus CRM | Stays on solarfarms.cy until a later cutover |
| solarfarms.cy | Untouched as investor + current Cyprus CRM |

---

## 2. What already exists (reuse, do not rewrite)

### Public / investor (solarfarms.cy)

- Next.js 14 marketing site, calculators, project pages, blog (hardcoded MDX-style pages)
- Sanity installed but lightly used (`sanity.config.ts`, `lib/sanity.ts`)
- Brand tokens, `COMPANY_DATA`, `lib/portfolio-data.ts`
- WordPress sync for lighthief.cy only (`scripts/wp-lighthief-sync.ts`)

### CRM — working Cyprus sales desk

| Area | What it does | Key paths |
|---|---|---|
| Pipeline | Developer / commercial / investor segments; list, kanban, daily queue | `app/crm/page.tsx` |
| Activity | Notes, calls, emails, SPIN qualifying questions | `app/api/crm/prospects/activity` |
| Tasks + follow-up | Manual + cron auto-tasks | `lib/crm-follow-up-rules.ts`, `/api/cron/auto-followup-tasks` |
| Outreach | Resend intro + 2 follow-ups | `lib/crm-outreach.ts` |
| Knowledge | Internal sales KB + offer PDFs | `app/crm/knowledge` |
| Dashboard | Team KPIs — Alexander only today | `app/crm/dashboard` |
| Auth | 4 hardcoded emails, shared password | `lib/crm-users.ts`, `lib/auth.ts` |

### HR — working Cyprus leave desk

| Area | What it does today |
|---|---|
| Employee | Balance, request leave, view own payslips |
| Admin | Alexander only — approve / reject, edit balances |
| Default entitlement | 20 days (Cyprus Cap. 8) |
| Payslips | Static HTML in `team/payslips/` mapped by email slug |

### How Cyprus CRM was filled (the playbook we copy)

**Track A — parks / developers** (`npm run cyprus:full`)

1. CERA licence CSV → `cyprus-energy-plants.json`
2. EAC connection-term PDFs → match to parks
3. Company register (directors, HE number)
4. Cluster SPVs into real developers
5. Hunter.io emails
6. Sync to `pv_prospects` (one row per company, ≥250 kW)
7. Never overwrite salesperson notes / status

**Track B — warehouse rooftops** (`npm run commercial:pipeline`)

1. OpenStreetMap industrial roofs (4 cities)
2. PVGIS yield + savings
3. Google Places name / phone / website
4. Hunter emails
5. Sync as `segment=commercial`

TSOC market prices are **intelligence only** — they do not create CRM rows.

---

## 3. Country packs (the only thing that should differ)

### 3.1 Website / market

```
lib/markets.ts
  it | de | cy | es | pl
    host, defaultLocale, locales[3]
    legal entity, phone, email, named contact
    enabled services[]
    pricingProfile
    projectSources[]
    currency
```

| Market | Host | Root lang | Other langs | First-wave services | Named contact |
|---|---|---|---|---|---|
| Italy | lighthief.it | `it` | `en`, `de` | EPC, O&M, BESS, development | Maurizio Ganis |
| Germany | lighthief.de | `de` | `en`, `pl` | EPC, O&M, BESS | Leon Volkerink |
| Cyprus | lighthief.cy | `el` | `en`, `ru` | EPC, BESS, O&M, licensing | Alexander Papacosta |
| Spain | lighthief.es | `es` | `en`, `de` | TBD | Marko Hernaiz |
| Poland | lighthief.com | `pl` | `en`, `de` | O&M, recycling, washing, BDO, DD, EPC | Maciej Krzyżanowski |

Confirm services with founder before pages go live. Do not advertise what the local company cannot deliver.

### 3.2 CRM pack

| | Cyprus (built) | Italy (to build) | Germany (to build) |
|---|---|---|---|
| Regions | 5 districts | Regioni / province | Bundesländer |
| Park register | CERA CSV | Terna Anagrafica / GSE ATLAIMPIANTI | **MaStR** download |
| Connection / RTB | EAC RES PDFs | Terna / DSO connection (harder, often gated) | DSO Netzanschluss (fragmented) |
| Company register | DRCOR e-filing | Registro Imprese / InfoCamere | Handelsregister |
| Commercial roofs | OSM + PVGIS + Places | **Same stack, Italian cities** | **Same stack, German cities** |
| Email find | Hunter | Hunter | Hunter |
| Qualifying questions | EAC POS, CERA BESS, net billing | Ritiro / FER / zonal / GSE | EEG, Redispatch, grid fees |
| Offer types | BESS retrofit, EPC, O&M, rooftop | Match approved IT services | Match approved DE services |
| Size cut | ≥250 kW developer | Same starting cut | Same; MaStR must be filtered hard |

**Honest constraint:** CERA is a small, named-SPV list. MaStR is national and huge — filter to PV/BESS ≥250 kW (or ≥1 MW for the first import). Italy’s fully public extracts are often aggregated; first Italy developer list may be thinner than Cyprus until InfoCamere enrichment is running. **Do not block the website on a perfect scraper.**

### 3.3 HR pack

| Setting | Cyprus | Italy | Germany | Poland (later) |
|---|---|---|---|---|
| Law floor | Cap. 8 — 20 days (5-day week) | D.Lgs. 66/2003 — 4 weeks | BUrlG — 4 weeks (20 days Mon–Fri) | Kodeks pracy — 20 / 26 by seniority |
| Typical contract | 20 + ~14 PH | CCNL often 26–28 + 13th/14th | Often 25–30 + Land PH | 20 or 26 + 14 PH |
| Must-take rule | None in code | ≥2 weeks in year of accrual | None in v1 | None in v1 |
| Public holidays | CY calendar (info only) | National + region | National + Land | National |
| Approver | Country admin (was Alexander email) | Italy director | Germany lead | Poland director |
| 13th salary | Cyprus practice | Common | Rare | Common (optional) |
| Payslip store | `team/payslips/cy/` | `team/payslips/it/` | `team/payslips/de/` | `team/payslips/pl/` |

v1 HR: same leave types (annual / sick / unpaid / TOIL / public). Country default entitlement + holiday calendar + approver. No payroll engine. Payslips remain uploaded files.

Replace every hardcoded `alexander.papacosta@lighthief.com` admin check with `role = country_admin | group`.

---

## 4. Target architecture

```
lighthief.it  ─┐
lighthief.de  ─┼─►  lighthief-web (Next.js)
lighthief.es  ─┤      middleware: host → market
lighthief.cy  ─┤      next-intl: path → locale
lighthief.com ─┘      /        public pages
                      /crm     sales desk
                      /crm/hr  leave + payslips
                      /studio  Sanity (blog, pages)

Shared: markets.ts, CRM/HR country packs, brand UI
Supabase: existing project + `country` column (do not fork the database)
Cyprus CRM on solarfarms.cy keeps reading the same table; new IT/DE rows are `country=it|de`
```

**Do not** put this inside the current `app/` tree (CRM + tablet + investor + admin is already one overloaded app). New folder: `lighthief-web/`. Extract CRM/HR modules across; share `lib/constants.ts` and portfolio figures by import.

### Hosting and domains (one project, five hostnames)

| Vercel project | Code | Domains |
|---|---|---|
| **lighthief-web** (new) | `lighthief-web/` | lighthief.it, lighthief.de, later .es .cy .com |
| **solarfarms-cy** (existing) | current repo `app/` | solarfarms.cy only |

Do **not** add country domains to the existing solarfarms.cy Vercel project.

**Go-live per domain**

1. Add hostname in Vercel → Settings → Domains (apex + www).
2. At the registrar, set website DNS only:
   - Apex `@` → A `76.76.21.21` (or the values Vercel prints)
   - `www` → CNAME `cname.vercel-dns.com`
3. In Vercel, redirect `www` → apex.
4. Leave MX / email records untouched.

Preview on `*.vercel.app` until the founder approves the DNS flip.

| Domain | When to attach |
|---|---|
| lighthief.it / lighthief.de | First launch (Phase 2) |
| lighthief.es | When Spain market pack is ready |
| lighthief.cy | Cyprus public rebuild (Phase 6) |
| lighthief.com | Poland SEO cutover only (Phase 8) |
| solarfarms.cy | Never on lighthief-web |

### Data tenancy

- Add `country` (`it` \| `de` \| `cy` \| `es` \| `pl`) to `pv_prospects`, `hr_leave_requests`, `hr_leave_balances`
- Backfill existing rows as `cy`
- Users: `markets[]` + `role` (`local` \| `country_admin` \| `group`)
- Queries: `country IN user.markets` unless `role = group`
- Host on lighthief.it defaults the UI to Italy

### Security to fix while extracting

- Auth-protect GET `/api/crm/prospects` and follow-ups (currently open)
- Per-user passwords (drop shared `CRM_PASSWORD`)
- RLS: stop `USING (true)` once `country` exists

---

## 5. Italy / Germany CRM population plan

### Phase A — launch with people we already know (week of site launch)

- Import any Excel / email lists from Maurizio (IT) and Leon (DE)
- Manual “off-registry” file (same pattern as `lib/crm-off-registry-prospects.ts`)
- Website contact form writes `country` from host
- Staff can add prospects by hand from day one

### Phase B — commercial rooftops (portable, do this second)

Reuse `scripts/solar-prospect-sweep.py` (OSM + PVGIS + Google Places):

| Italy first cities | Germany first cities |
|---|---|
| Milano, Torino, Bologna, Padova | Hannover, Hamburg, Köln, München |

Same ≥200 m² roof cut. Same Hunter pass. Sync as `segment=commercial`, `country=it|de`.

### Phase C — developer / utility parks (country scrapers)

**Germany (closer to CERA):**

1. MaStR open data dump — filter `Energieträger=Solare Strahlungsenergie` (and Speicher), `Nettonennleistung ≥ 250 kW`
2. Operator name → Handelsregister directors
3. Cluster by operator / group (Germany uses fewer tiny SPVs than Cyprus, but still does)
4. Hunter on operator domain
5. `sync-de-to-crm.ts` — same idempotent rules as `sync-cyprus-to-crm.ts`

**Italy (more work):**

1. Terna public Anagrafica / dati.terna.it extracts (region, size class, storage)
2. GSE ATLAIMPIANTI / pubblicazioni where plant or beneficiary names exist
3. InfoCamere / Registro Imprese for directors (often paid API — budget this)
4. Cluster + Hunter
5. `sync-it-to-crm.ts`

If a named plant list is incomplete, start with **developers and IPPs Maurizio already knows** + commercial sweep. Do not delay the website.

### Energy / market pages (public site, not CRM)

| Country | Public market inputs for `/mercato` / `/markt` |
|---|---|
| Italy | Terna Data Portal, GSE FER rules, zonal prices, BESS = metering/authorization test (see `docs/internal/regulation/bess-law-europe-vs-cyprus-analysis.md`) |
| Germany | SMARD / BNetzA, EEG, Redispatch, EnWG §118(6) grid-fee exemption to 2029, inertia market |
| Cyprus | Already have TSOC + CERA content on solarfarms.cy — reuse later |

Internal CIF / margins stay out of all public pages.

---

## 6. Workstreams and phases

### Phase 0 — approvals and access (before / on day 1)

- [ ] Founder approves brief
- [ ] Confirm IT / DE service menus
- [ ] Confirm IT / DE CRM + HR owners
- [ ] Confirm lighthief.it and lighthief.de registrar + who can edit website DNS (MX/email unchanged)
- [ ] Collect existing prospect lists
- [ ] Sanity project (reuse `42llz831` or new “Lighthief Group” dataset)
- [ ] Resend sending domain for `@lighthief.it` / `@lighthief.de` (or shared `noreply@`)

### Phase 1 — foundation (days 1–3)

- Create `lighthief-web/` Next.js app
- `lib/markets.ts` for `it` and `de` (stubs for cy/es/pl)
- Host middleware + next-intl
- Shared layout: nav, footer, brand, language switcher, country switcher (public)
- Empty `/crm` auth gate using new user table (not the 4-email list)

### Phase 2 — Italy + Germany public sites (days 3–10) — **urgent**

Pages (same set, local copy):

- Home, About, Services (only enabled), Projects (local or empty), Market, Contact, Legal (privacy/terms), Blog index

Deliver:

- IT: Italian root + EN + DE
- DE: German root + EN + PL
- Local entity, phone, email, monitoring-centre mention (Trieste / Hannover)
- Contact form → CRM prospect `country=it|de`
- Staging URLs for review; then attach DNS

**Not in this phase:** Poland `.com` cutover, Cyprus public rebuild.

### Phase 3 — CRM / HR extract onto IT + DE (days 7–14, overlaps Phase 2)

- Copy CRM + HR UI/API into `lighthief-web`
- Add `country` column; backfill Cyprus rows
- Roles instead of Alexander-email checks
- Country packs: regions, questions, offer types, leave defaults, holiday calendars
- Users: Maurizio (`it`, country_admin), Leon (`de`, country_admin), Arkadius + Alexander (`group`)
- Per-user passwords
- Import Phase A lists
- Lock down open GET APIs

Cyprus team keeps using solarfarms.cy against the same database (Cyprus rows only).

### Phase 4 — fill IT / DE pipelines (days 14–21+)

1. Commercial OSM sweep (Italian + German cities)
2. Germany MaStR filtered import
3. Italy Terna/GSE + InfoCamere (as access allows)
4. Local-language outreach templates (no Cyprus curtailment story)

### Phase 5 — blog / AI drafts (after sites are live)

- Sanity desk filtered by market + locale
- “Draft with AI” from a country brief (regulator, keywords, allowed services, local contact)
- Human publish only
- Translate to the other two languages of that market

### Phase 6 — Cyprus public site (lower priority)

- Same templates on lighthief.cy
- solarfarms.cy remains investor + Cyprus CRM until a planned cutover
- Preserve existing lighthief.cy slugs (`/bess-systems/`, `/our-team/`, …)

### Phase 7 — Spain

- Turn on `es` market when entity + services + owner are ready
- Same templates; empty CRM until a list exists

### Phase 8 — Poland `.com` last (SEO)

1. Full URL inventory (WP sitemap + Search Console)
2. Rebuild every indexed slug 1:1 on staging
3. Polish stays at `/` — never `/pl/`
4. EN/DE as prefixes
5. 301 sheet for anything that must move
6. DNS cut only after staging parity
7. Keep WordPress read-only 90 days

---

## 7. Suggested first tickets (tomorrow)

1. `lighthief-web` scaffold + brand layout
2. `markets.ts` for Italy and Germany (from `COMPANY_DATA`)
3. Host + locale routing
4. IT/DE home + services + contact (English first if translations lag; then IT/DE copy)
5. Supabase migration: `country` on prospects + HR tables
6. CRM user table (replace `CRM_USERS` constant)
7. Import stub for “CSV → prospects” so Maurizio’s list can load without a scraper

---

## 8. What we will not do

- Rebuild lighthief.com in the first sprint
- Turn off solarfarms.cy
- Clone WordPress five times
- Wait for a perfect Italy plant scraper before launching lighthief.it
- Show Cyprus parks or Cyprus prices on IT/DE
- Put CIF, margins, or group-order notes on any public page

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| Italy plant names not as public as CERA | Launch CRM with known relationships + rooftop sweep |
| MaStR too large | Hard MW filter; import in batches |
| Shared CRM password / open GET APIs | Fix during extract (Phase 3) |
| Design drift if someone edits WP | Freeze new WP pages; all new work in `lighthief-web` |
| `.com` SEO | Do not touch until Phase 8 |
| InfoCamere / Handelsregister fees | Budget paid lookups; Hunter already in use |
| Local legal copy (privacy, employment) | Lawyer review of IT/DE privacy + HR defaults before public launch |

---

## 10. Success for the first release

Italy and Germany websites live, same design, local language, local contact.  
Maurizio and the German lead can log into CRM, see only their country, add/import prospects, and request leave.  
You can log in and see both countries.  
Cyprus and Poland keep working exactly as they do today.
