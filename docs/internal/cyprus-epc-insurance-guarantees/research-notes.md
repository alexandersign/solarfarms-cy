# Research Notes — Cyprus EPC Insurance & Bank Guarantees

**Research conducted:** June 2026  
**Method:** Direct HTTP fetch of official websites (Firecrawl API credits exhausted; MCP unavailable). DuckDuckGo blocked by bot detection.  
**Raw scrape cache:** `.firecrawl/cyprus-epc-research/` (not committed)

---

## 1. Executive Summary

Cyprus EPC contractors typically combine **bank-issued guarantees** (performance, advance, retention) with **insurance policies** (CAR/EAR, liability, optionally insurance-backed surety bonds). For a BOC banking client, the correct entry point is **Wholesale Banking → Εμπορικές Διευκολύνσεις** (Commercial Trade Facilities), which explicitly lists **εγγυητικές επιστολές** (letters of guarantee).

Insurance for construction is available from local insurers (notably **ERB Asfalistiki**) and via brokers (**Aon Cyprus** verified with full contacts). International brokers Marsh and WTW operate in Cyprus but public contact pages were inaccessible during research.

---

## 2. Bank of Cyprus — Detailed Findings

### 2.1 Website structure change (important)

Legacy English paths return **404**:
- `https://www.bankofcyprus.com/en-gb/business/trade-finance/` → 404
- `https://www.bankofcyprus.com/en-gb/business/trade-finance/guarantees/` → 404

Current corporate banking is under **`/wholesale/`**:
- https://www.bankofcyprus.com/wholesale/
- https://www.bankofcyprus.com/wholesale/daily-banking/day-to-day/wholesale_emporikes_diefkolinsis/

### 2.2 Trade Finance product content (verified, Greek)

**Source:** https://www.bankofcyprus.com/wholesale/daily-banking/day-to-day/wholesale_emporikes_diefkolinsis/  
**Page title:** Εμπορικές Διευκολύνσεις  
**Fetched:** June 2026

Key product statement (translated):

> *We offer short-term import finance, **letters of guarantee**, import and export credits, bills for collection, foreign exchange negotiation, import and export factoring, spot and forward foreign currency contracts.*

This confirms BOC issues bank guarantees through its wholesale trade finance unit — equivalent to what other banks call "Trade Services" or "Trade Finance."

### 2.3 Wholesale banking structure

From BOC homepage navigation (`/wholesale/`):

| Section | Relevance to EPC |
|---------|------------------|
| Daily Banking → Εμπορικές Διευκολύνσεις | **Primary — guarantees, L/C, trade finance** |
| Financing → Business loans | Working capital, equipment |
| Specialized → Project Finance | Large infrastructure / BESS project lending |
| Specialized → Factoring | Receivables finance alternative |
| Specialized → Markets / Hedging | FX for imported BESS equipment |

### 2.4 Contact channels (verified)

**Source:** https://www.bankofcyprus.com/contact-gr/

| Channel | Number |
|---------|--------|
| Cyprus toll-free | 800 00 800 |
| International | +357 22 128 000 |
| JCC (cards, after hours) | 22 868 100 |

Structured JSON-LD on homepage repeats 800 00 800 as customer service number.

**No public email or direct phone for Trade Finance desk** — industry standard in Cyprus is RM-mediated access.

### 2.5 Recommended approach for Lighthief

1. Email/call existing **BOC Relationship Manager** with RFI (see `rfi-bank-guarantee.template.md`)
2. If no RM assigned: call **800 00 800**, request **Wholesale Banking — Εμπορικές Διευκολύνσεις**
3. For project-level financing + guarantees: also discuss **Project Finance** team

---

## 3. Other Cyprus Banks

### 3.1 Alpha Bank Cyprus — Trade Services ✓

**Source:** https://www.alphabank.com.cy/en/business/trade-services/

**Letter of Guarantee** (verbatim excerpt):

> *The Bank guarantees to third parties that its customers will honor their obligations. Letters of Guarantee may be issued in Euro or foreign currency for imports/exports, **good contractual performance, collection of advances**, payment of instalments, subcontracting, bidding etc. A credit limit for the issuance of Letters of Guarantee may also be offered.*

**Contacts:**
- 8000 3333 (toll-free Cyprus)
- +357 22 888 333
- Support: https://www.alphabank.com.cy/en/business/support-center

Also offers Documentary Letters of Credit and Bills for Collection.

### 3.2 Eurobank Cyprus (incorporating Hellenic Bank) ✓

**Source:** https://www.eurobank.com.cy/en/business/trade-finance/  
**Note:** Page shows **Hellenic Bank / Eurobank merger** transition messaging (2025–2026).

**Contacts:**
- 8000 9999 (Cyprus)
- +357 22 500 500 (abroad)
- contact@eurobank.cy

Dedicated guarantees sub-page redirected to merger FAQ during research — existing Hellenic trade finance clients should contact **Relationship Officer**.

### 3.3 Hellenic Bank

Trade finance URL returned 404. Merger with Eurobank complete — use Eurobank contacts.

---

## 4. Insurance Market — Detailed Findings

### 4.1 ERB Asfalistiki (Pancyprian Insurance Group) ✓

Part of ERB Cyprus / CNP Cyprialife group. Strongest **direct insurer** match for EPC construction covers.

**CAR product** — https://www.pancyprianinsurance.com/en/erb-asfalistiki/products/business/technical/contractors-all-risk

Covers: houses, buildings, roads, factories, etc. — applicable to BESS civil and electrical installation. Options for:
- Third-party liability extension
- Joint coverage of contractor + owner
- Subcontractor inclusion

**EAR product** — erection all risks for plant/equipment (relevant for BESS container installation).

**Contacts verified:**
- General: +357 22 887 600, contact@erbasfalistiki.cy
- Limassol: +357 25 815 180 (66 Ag. Athanasiou Ave)
- Complaints: complaints@erbasfalistiki.cy

### 4.2 Eurolife (Bank of Cyprus Group) ✓

**Source:** https://www.eurolife.com.cy/en/business/-/

Business insurance desk:
- 80008880 / +357 22 124 000
- business.insurance@eurolife.bankofcyprus.com
- HQ: 4 Evrou, 2003 Strovolos, Nicosia

Focus: corporate business insurance planning, group health, employee protection — **not specialist CAR/EAR** on website. May refer to partner underwriters or be entry point for BOC relationship bundling.

### 4.3 Universal Life ✓

**Source:** https://www.universallife.com.cy/en/contact-us/

- +357 22 882 222
- customersupport@unilife.com.cy
- Digeni Akrita 85, 1070 Nicosia

Primarily life, health, pension — **limited construction relevance** except group health for site personnel.

### 4.4 MetLife Cyprus ✓

- +357 22 845 845
- contact@metlife.com
- Branch network across Cyprus

Similar to Universal Life — group benefits rather than CAR.

### 4.5 Aon Cyprus ✓ (Broker — key contact)

**Source:** https://www.aon.com/cyprus/contact-us.jsp

| Entity | Address | Phone | Email |
|--------|---------|-------|-------|
| AON CYPRUS INSURANCE BROKER COMPANY LTD | 8 Kennedy Ave, Office 301, Athienitis House, 1087 Nicosia | +357 22 028 765 | hello@aon.com.cy |
| AON SOLUTIONS CYPRUS LTD | 13 Atho Street, 1087 Nicosia | +357 22 45 80 11 | info@aonsolutions.com.cy |

Emails decoded from Cloudflare-protected page source.

Aon Cyprus website lists: commercial risk, employee benefits, pension consulting, cyber insurance — appropriate for **broker-led EPC insurance programme**.

### 4.6 Marsh & WTW — Not verified

- https://www.marsh.com/ — connection aborted during fetch
- https://www.wtwco.com/en-cy — HTTP 429 Too Many Requests

Both firms are known to operate in Cyprus insurance broking market but **contacts must be verified** before RFI send. Suggest phone directory or LinkedIn search.

---

## 5. BESS / Solar EPC — Cyprus Requirements (Framework)

*General industry practice — confirm per employer contract and CERA/licensing terms.*

### 5.1 Typical employer requirements

| Requirement | Common specification |
|-------------|---------------------|
| Performance security | 5–10% bank guarantee or bond |
| CAR insurance | Contract works value + escalation |
| Public liability | EUR 1M–5M per occurrence |
| Employer's liability | Statutory minimum + contract minimum |
| Professional indemnity | If design responsibility included |
| Advance guarantee | Pro rata to advance % |
| Retention | Bank guarantee or cash (5–10%) |
| Defects period | 12–24 months; security may extend |

### 5.2 BESS-specific underwriting considerations

Insurers may ask about:
- Lithium-ion fire suppression and NFPA/local fire authority compliance
- Thermal runaway protocols and OEM warranties
- Parallel operation with grid / DSO requirements
- Import CIF values for equipment (for sum insured — provide without internal margin data)
- Subcontractor qualifications (electrical ETEK-licensed works)

### 5.3 Performance bonds: bank vs. insurance

| Factor | Bank guarantee | Insurance surety bond |
|--------|----------------|----------------------|
| Cost | Lower for creditworthy clients with line | Higher premium but often less collateral |
| Collateral | Often cash margin required | Usually no margin |
| Employer acceptance | Preferred in Cyprus public/utility | Accepted if wording matches |
| Speed | Depends on credit line | Depends on surety capacity |

---

## 6. Typical Costs & Timelines (Market Benchmarks)

*Not bank/insurer quotes — use for RFI comparison only.*

### Bank guarantees

| Item | Benchmark |
|------|-----------|
| Fee | 0.5%–2.0% p.a. on face value |
| Minimum fee | €500–€2,000 per instrument |
| Margin | 0–100% cash collateral |
| Processing | 5–15 business days |
| Bid bond urgency | 2–5 days with existing line |

### Insurance (CAR/EAR)

| Item | Benchmark |
|------|-----------|
| Rate | 0.1%–0.4% of contract value (highly variable) |
| Minimum premium | €2,500–€10,000 |
| PI | €3,000–€15,000 p.a. depending on limit |
| Surety bond | 1%–3% p.a. of bond amount |

---

## 7. Source URL Index

| Source | URL | Status |
|--------|-----|--------|
| BOC Wholesale | https://www.bankofcyprus.com/wholesale/ | ✓ 200 |
| BOC Trade Facilities | https://www.bankofcyprus.com/wholesale/daily-banking/day-to-day/wholesale_emporikes_diefkolinsis/ | ✓ 200 |
| BOC Project Finance | https://www.bankofcyprus.com/wholesale/Specialized/Services/w_project_finance/ | ✓ 200 |
| BOC Contact | https://www.bankofcyprus.com/contact-gr/ | ✓ 200 |
| Alpha Trade Services | https://www.alphabank.com.cy/en/business/trade-services/ | ✓ 200 |
| Eurobank Trade Finance | https://www.eurobank.com.cy/en/business/trade-finance/ | ✓ 200 |
| ERB CAR | https://www.pancyprianinsurance.com/en/erb-asfalistiki/products/business/technical/contractors-all-risk | ✓ 200 |
| ERB Contact | https://www.pancyprianinsurance.com/en/erb-asfalistiki/contact-us | ✓ 200 |
| Aon Cyprus Contact | https://www.aon.com/cyprus/contact-us.jsp | ✓ 200 |
| Eurolife Business | https://www.eurolife.com.cy/en/business/-/ | ✓ 200 |
| Eurolife Contact | https://www.eurolife.com.cy/en/service-center-redirect/contact-us/ | ✓ 200 |
| Universal Life Contact | https://www.universallife.com.cy/en/contact-us | ✓ 200 |
| MetLife Contact | https://www.metlife.com.cy/en/contact-us/ | ✓ 200 |
| CNP Cyprus Contact | https://www.cnpcyprus.com/en/contact | ✓ 200 |
| Marsh Cyprus | https://www.marsh.com/en/about/locations/cyprus.html | ✗ blocked |
| WTW Cyprus | https://www.wtwco.com/en-cy | ✗ 429 |
| BOC legacy trade finance EN | https://www.bankofcyprus.com/en-gb/business/trade-finance/ | ✗ 404 |

---

## 8. Research Gaps & Follow-Up Actions

| Gap | Action |
|-----|--------|
| BOC Trade Finance direct phone/email | Ask RM on next call |
| Marsh / WTW Cyprus contacts | Manual lookup or phone inquiry |
| Insurance-backed surety capacity in Cyprus | Ask Aon in RFI response |
| Eurobank post-merger guarantee process | Confirm with RM |
| BESS-specific CAR wordings | Request from ERB + broker |
| Comparative fee quotes | Send RFIs to BOC, Alpha, Aon, ERB |

---

## 9. Regulatory References

- **ICPAC** (Insurance Companies Control and Pension Fund Supervision): regulates insurers in Cyprus — verify provider registration at https://www.icpac.gov.cy/
- **CBC** (Central Bank of Cyprus): supervises banks issuing guarantees
- **Cyprus Contract Law** (Cap. 149): governs guarantee obligations
- **EU Solvency II**: insurer capital requirements behind large CAR programmes

---

*End of research notes — June 2026*
