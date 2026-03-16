# Alex Anarita — Park Study

**Project:** Alex Anarita  
**Site:** Anarita, Paphos district, Cyprus  
**Date:** March 2026

---

## 1. Park Configuration

| Parameter | Value |
|-----------|-------|
| **Plot area** | 700 m² |
| **Orientation** | East-West |
| **Row pitch** | 1 m |
| **Tilt angle** | 10° |
| **Site** | Anarita (Paphos) |

### PV Capacity on 700 m²

| Land use | m²/kWp | PV capacity |
|----------|--------|-------------|
| Tight (1 m pitch, 10°) | 8 | **~87 kWp** |
| Conservative | 10 | ~70 kWp |
| Optimistic | 6 | ~117 kWp |

**Estimate: ~87 kWp** on 700 m² (8 m²/kWp). Validate with layout software.

### Layout Notes

- **East-West:** Panels face east and west. Flatter production profile than south-facing; better morning/evening capture, lower midday peak.
- **1 m pitch:** Row spacing between panel rows. Tighter than typical 2–3 m; reduces land use but may increase self-shading.
- **10° tilt:** Low tilt suitable for E-W layouts; maximises diffuse capture and reduces soiling angle.

---

## 2. Yield Assumptions

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Base yield (south-facing)** | 1800 kWh/kWp/year | Cyprus standard |
| **E-W factor** | 0.80 | 80% of south-facing (typical for E-W at 10°) |
| **Effective yield** | **1440 kWh/kWp/year** | 1800 × 0.80 |

*Validate with PVsyst or similar. E-W factor depends on latitude, albedo, and bifacial gain.*

---

## 3. Alex Anarita Plot — 700 m²

| Parameter | Value |
|-----------|-------|
| **Plot area** | 700 m² |
| **PV capacity** | **~87 kWp** (8 m²/kWp, tight layout) |
| **MWh/year** | ~125 (87 × 1440) |
| **S21+ count** | ~17 |
| **20ft containers** | **1** (168 slots; 16 used) |

---

## 4. MWh per Year by Size (Reference)

| Park size | MWh/year |
|-----------|----------|
| 0.087 MW (87 kWp) | ~125 |
| 1 MW | 1,440 |
| 5 MW | 7,200 |
| 10 MW | 14,400 |

---

## 5. Mining Sizing (Daytime-Only)

Using Antminer S21+ (216 TH/s, 3.56 kW), 6 hrs/day equivalent:

| Park size | MWh/year | S21+ count | 20ft containers |
|-----------|----------|------------|-----------------|
| **87 kWp (Alex Anarita)** | **~125** | **~17** | **1** |
| 1 MW | 1,440 | 185 | 2 |
| 5 MW | 7,200 | 926 | 6 |
| 10 MW | 14,400 | 1,847 | 11 |

**Alex Anarita plot (700 m², ~87 kWp):** supports **1 container** (~17 S21+).

---

## 6. JV Economics (5-Year Horizon)

*Fair split, EPC included. See solhash project presentation for methodology.*

| Park size | Park share | Park €/kWh | Mining NPV | Mining IRR | Payback |
|-----------|------------|------------|------------|------------|---------|
| 1 MW | ~5% | ~0.44¢ | — | — | — |
| 5 MW | ~5% | ~0.44¢ | — | — | — |
| 10 MW | ~5% | ~0.44¢ | — | — | — |

*Run `npm run solhash:presentation` with park-specific yield (1440 kWh/kWp) for exact figures.*

---

## 7. References

- Anarita East layout: `docs/clients/Individual_Spanercom/Anarita East v33b 20-07-2023-Layout.pdf`
- Anarita West layout: `docs/clients/Individual_Spanercom/Anarita West v47c 10-07-2023-Layout.pdf`
- Base solhash model: `solhash/model/`, `solhash/data/`

---

## 8. Next Steps

1. **Validate land use** — Confirm 8 m²/kWp for 1 m pitch, 10° E-W layout.
2. **Validate E-W yield** — PVsyst or similar with exact layout.
3. **Confirm plot boundaries** — 700 m² usable for PV (excl. access, inverters).
