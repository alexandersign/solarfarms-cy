# Internal cost build — Larnaca Mall BESS Addon
**Client:** ΑΝΔΡΕΑΣ ΙΩΑΝΝΙΔΗΣ · **Site:** Larnaca Mall, Larnaca (Industrial) · **Ref:** LCY-IND-IOANNIDES-2026-06  
**Internal only — not for client**

## System
| Item | Value |
|------|-------|
| PV (existing) | 2 MW net billing |
| BESS power | 2.0 MW |
| BESS energy | 8 MWh (quoted) / 8.358 MWh nominal (2× ME 4.179) |
| Duration | 4.0 h @ rated power |
| Hardware | 2× Linyang ME 4.179 MWh + T2 MV Skid (2× BCS1000K) + Voltus EMS |
| Units on site | 3 (2 BESS + 1 T2 skid) |

## Client price (ex VAT)
| Item | € |
|------|---|
| Turnkey EPC | **1,136,000** |
| €/MWh | **142,000** |
| VAT 19% | 215,840 |
| **Total inc VAT** | **1,351,840** |

## Installed cost stack (estimated)

Anchor: **Galascope 2** — 2.5 MW / 10 MWh, T2 skid (`lib/portfolio-data.ts` BATCH1_PARKS_CONFIRMED): CIF €974,457, installed €1,132,823, client €120,630/MWh (6.1% margin).

Scaled for 8 MWh + 2×1000K PCS + standalone EMS (+10% per Generic 7MW independent template).

| Category | Low (€) | Mid (€) | High (€) | Basis |
|----------|---------|---------|----------|-------|
| **A. Linyang CIF** (2×ME4 + T2 2×1000K) | 730,000 | 800,000 | 860,000 | ~82% of Galascope 2 CIF (8/10 MWh) minus €50–80K PCS derate (2×1000K vs 2×1250K). **Needs Linyang park quote — ME4 not in LY202601271.** |
| **B. Logistics & import** | 40,000 | 44,000 | 48,000 | ~5.5% of CIF (duty, port, crane, transport) |
| **C. Civil** (3×20ft platforms) | 45,000 | 55,000 | 70,000 | Industrial pad; below Kouklis Galascope €32,985 for 3×20ft |
| **D. Electrical** (minor cable/trench) | 20,000 | 27,000 | 35,000 | Compound-only scope per brief |
| **E. DEHN** (compound) | 12,000 | 15,000 | 17,000 | Portfolio adder rate |
| **F. EMS/SCADA upfront** | 42,000 | 48,000 | 55,000 | Standalone: EMS hardware + €15K SCADA Local + global allocation |
| **G. Insurance / PM / ETEK** | 10,000 | 12,000 | 15,000 | CAR + project management + docs |
| **TOTAL INSTALLED** | **899,000** | **1,001,000** | **1,100,000** | |

## Margin analysis

| Scenario | Installed (€) | Revenue (€) | Gross margin (€) | Margin % |
|----------|---------------|-------------|------------------|----------|
| Low cost / tight | 1,100,000 | 1,136,000 | 36,000 | 3.2% |
| **Mid (planning case)** | **1,001,000** | **1,136,000** | **135,000** | **11.9%** |
| High margin | 899,000 | 1,136,000 | 237,000 | 20.9% |

## Benchmark comparison

| Reference | Client €/MWh | Installed €/MWh | Margin % |
|-----------|-------------|-----------------|----------|
| Galascope 2 (group, 2.5/10) | 120,630 | 113,282 | 6.1% |
| Maltezos (individual 2.5/10) | 144,780 | ~126,000 est. | ~13% |
| **Ioannides (this offer)** | **142,000** | **112,625–137,500** | **3–21%** |

Standalone client premium vs group: +17.7% on €/MWh (€142K vs €120,630 Galascope 2 equivalent).

## Payment cashflow (client → Lighthief)

| Milestone | % | Amount (€) |
|-----------|---|------------|
| Advance | 30% | 340,800 |
| Pre-shipment | 55% | 624,800 |
| PAC | 10% | 113,600 |
| Retention (12 mo) | 5% | 56,800 |

## Excluded items (not in margin / pass-through)

| Item | Estimate (€) | Notes |
|------|-------------|-------|
| PPC / PCC bay extension | 15,000–40,000 | Indicative only; excluded from turnkey |
| Protection relay testing | 2,500 | €1,250 × 2 containers — client-paid per SSOT |
| Licensed drawings / as-built | 5,000–15,000 | Full site — client engineer |
| EAC/DSO fees | 3,000–10,000 | Client → EAC |

## Annual recurring (informational)

| Item | €/yr (8 MWh) |
|------|-------------|
| LTSA Tier C | 13,920 |
| EMS subscription | 3,200 |
| Ext. warranty Yr 6–10 (optional, → Linyang) | 13,293 |

## Risk flags

1. **ME 4.179 MWh containers** — non-standard vs portfolio 5.015 MWh; CIF not in LY202601271. Request Linyang 8 MWh park quote before contract.
2. **Mid-case margin ~12%** — acceptable for standalone; watch CIF if Linyang quotes at Galascope 2 pro-rata without PCS discount.
3. **Tight-case 3%** — if CIF lands at high end (€860K) + full civil (€70K), installed approaches €1.1M; minimal buffer.
4. **Grid voltage TBC** — transformer rating on T2 skid depends on site POC (11/22/33 kV).
5. **PPC bay** — excluded; margin unaffected if client procures separately.

## Action before contract

- [ ] Request Linyang CIF for 2×ME4 + T2@2MW (new park line item)
- [ ] Site visit: MV room, cable route, grid voltage, PPC bay requirement
- [ ] Confirm net-billing meter point and EMS integration interface with existing PV SCADA
