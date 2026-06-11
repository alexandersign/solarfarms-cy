# Cyprus EPC Insurance & Bank Guarantees — Research Pack

Internal research for Lighthief Cyprus Ltd BESS/solar EPC projects: insurance providers, bank guarantee channels, RFIs, and contact directory.

**Research date:** June 2026  
**Primary bank:** Bank of Cyprus (BOC)  
**Status:** Contacts verified where marked ✓; unverified entries marked ⚠ verify before sending

---

## Folder Contents

| File | Purpose |
|------|---------|
| [providers-and-contacts.md](./providers-and-contacts.md) | Master directory of insurers, brokers, and banks |
| [boc-bank-guarantees.md](./boc-bank-guarantees.md) | BOC-specific guidance for performance bonds and guarantees |
| [rfi-insurance.template.md](./rfi-insurance.template.md) | RFI template for insurance / surety providers |
| [rfi-bank-guarantee.template.md](./rfi-bank-guarantee.template.md) | RFI template for bank guarantee desks |
| [research-notes.md](./research-notes.md) | Detailed findings with source URLs |

---

## Key Findings (Executive Summary)

### Bank guarantees

1. **BOC department:** **Wholesale Banking → Εμπορικές Διευκολύνσεις** (Commercial Trade Facilities). This unit explicitly offers **εγγυητικές επιστολές** (letters of guarantee), import/export credits, and related trade finance products.
2. **Entry point for existing BOC clients:** Your **Relationship Manager (RM)** in Wholesale/Corporate Banking — they route guarantee requests to Trade Finance.
3. **Large EPC projects:** Also engage **Project Finance** (Wholesale → Specialized Services) for facility-level structuring alongside guarantees.
4. **Alternative banks:** Alpha Bank Cyprus (Trade Services), Eurobank Cyprus (post-Hellenic merger — contact RM/CC).

### Insurance

1. **Construction phase:** CAR (Contractors All Risks) and EAR (Erection All Risks) from local insurers — **ERB Asfalistiki (Pancyprian)** has explicit CAR/EAR product pages.
2. **Liability:** Public liability, employer's liability, product liability — standard commercial packages.
3. **Performance bonds (insurance-backed):** Typically placed via **insurance brokers** (Aon Cyprus verified ✓); Marsh/WTW Cyprus presence likely but contacts not verified online.
4. **Eurolife** (BOC group): Business insurance desk — general corporate cover; technical CAR may still route via ERB or broker.

### Typical EPC guarantee stack (Cyprus utility-scale BESS/solar)

| Instrument | Typical use | Provider type |
|------------|-------------|---------------|
| Bid bond | Tender participation | Bank or insurance surety |
| Performance bond | 5–10% contract value, through defects period | Bank (preferred) or insurance |
| Advance payment guarantee | Matches advance % received | Bank |
| Retention guarantee | Release retained amounts | Bank |
| Warranty / maintenance bond | Post-COD O&M period | Bank or insurance |
| CAR / EAR | Construction & erection | Insurer |
| Public / employer liability | Site operations | Insurer |
| Professional indemnity | Design/engineering liability | Insurer / broker |

---

## Next Steps

1. Contact BOC Relationship Manager with [rfi-bank-guarantee.template.md](./rfi-bank-guarantee.template.md).
2. Send [rfi-insurance.template.md](./rfi-insurance.template.md) to Aon Cyprus + ERB Asfalistiki (and Marsh/WTW once contacts confirmed).
3. Request indicative pricing for a representative multi-MW BESS EPC project (no internal portfolio figures in RFIs).

---

## Research Limitations

- Firecrawl API credits exhausted during research; supplementary fetches via direct HTTP.
- BOC English `/business/` URLs return 404 — current corporate banking lives under `/wholesale/`.
- Marsh.com and WTW blocked/rate-limited — contacts marked unverified.
- Hellenic Bank trade finance pages redirect to Eurobank merger landing page.
