# Internal cost build — Limassol Tennis Center carport PV
**Client:** Evgeny · **Site:** Parekklisia, Limassol · **Ref:** LCY-PV-LTC-PAREKKLISIA-2026-06  
**Internal only — not for client**

## System
| Item | Value |
|------|-------|
| PV | 144 × 590 W = 84.96 kWp |
| Layout | 3 × 10-car sections, 18 bases |
| Battery | 264 kWh LFP (~4 h summer peak storage) |
| Orientation | West 10°, bifacial carport |

## Direct costs (ex VAT)

### Supply
| Line | € | Notes |
|------|---|-------|
| Carport steel (Greece, with mounts) | 62,000 | Ships ready — corrected from erroneous €54k figure |
| Sea freight Greece → Limassol (4 × €2,000) | 8,000 | Container shipping |
| **Port → site — 4 containers (market)** | **4,945** | See breakdown below |
| Modules (144 × €84) | 12,096 | |
| Inverters (2 × 50 kW Deye @ €3,600) | 7,200 | |
| **Supply subtotal** | **94,241** | |

#### Port → site breakdown (Interfreight market rates, Jan 2026)
| Item | Rate | × 4 | € |
|------|------|-----|---|
| Port landing (40′ HC, mid-range) | €600/cont | 4 | 2,400 |
| Inland haul Limassol → Parekklisia | €115/cont | 4 | 460 |
| Site offload (crane / hiab, est.) | €450/cont | 4 | 1,800 |
| Customs declaration (1 × shipment) | flat | 1 | 85 |
| **Port → site total** | | | **4,945** |

> Source: `docs/quotations/interfreight/logistics-quote-interfreight-jan2026.md` — landing €550–650, Limassol city haul €110–120/cont. Site crane offload estimated (special handling quoted separately per Interfreight §7).

### Cables, protection & BOS
| Line | € |
|------|---|
| DC string cabling, connectors, combiner boxes | (in BOS) |
| AC cabling to DB, AC/DC protection, SPDs, boards | (in BOS) |
| Earthing, net-billing meter interface | (in BOS) |
| **Cables & BOS lump sum** | **8,500** |

### Foundations — 18 bases
| Line | € |
|------|---|
| Excavation ~1.5 m deep @ €450/base | 8,100 |
| Concrete 2.5 m³ @ €135/m³ × 18 (45 m³ total) | 6,075 |
| Steel anchor cage @ €280/base | 5,040 |
| **Foundations subtotal** | **19,215** |

### Install & soft costs
| Line | € |
|------|---|
| Carport assembly, panel install, electrical labour, ETEK, permitting support | 18,000 |

### Battery (Option B only)
| Line | € |
|------|---|
| 264 kWh LFP (€33,000 + €2,000 shipping) | 35,000 |

---

## Totals

| | € |
|--|--|
| **Direct cost — PV only** | **139,956** |
| **Direct cost — PV + BESS** | **174,956** |
| **Client price +25% — PV only** | **174,945** |
| **Client price +25% — PV + BESS** | **218,695** |
| BESS add-on client (+25%) | 43,750 |

*Direct PV = 94,241 + 8,500 + 19,215 + 18,000 = 139,956*

## PVGIS production — Parekklisia (34.736°N, 33.008°E)
- West 10°, 14% loss, +8% bifacial
- **137,341 kWh/yr** (1,617 kWh/kWp)
- Summer 4 h block (13:00–16:00): ~290 kWh → 264 kWh battery sizing OK

## Simulation @ €0.28/kWh (ops until 22:00, no EAC bills yet)

| Scenario | Self-consumed | Export | Annual value @ €0.28 |
|----------|---------------|--------|----------------------|
| PV only | 87% (~119 MWh) | 13% (~18 MWh) | **~€36,000** |
| PV + 264 kWh BESS | ~100% | ~0 | **~€39,400** |
| BESS uplift | +18 MWh shifted | — | **+€3,400/yr** |

## Payback (client price, ex VAT)
- Option A €174,945 / €36,000 ≈ **4.9 yr**
- Option B €218,695 / €39,400 ≈ **5.6 yr**
