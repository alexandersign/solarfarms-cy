# PV O&M — Lighthief Cyprus Ltd
## Photovoltaic Operation & Maintenance Division

---

## Folder Structure

```
pv-om/
├── README.md                          # This file
├── internal/                          # Internal use only — DO NOT share with clients
│   ├── lesa-dimos-rates.md            # Dimos Demosthenos LESA sub-contractor rates
│   ├── pv-om-cost-model.md            # Full cost model, margins, and add-on pricing
│   └── pricing-benchmarks.md          # Poland vs Cyprus market rate comparison
├── contracts/
│   ├── generate-standard-pv-om-contract.py   # Standard contract generator (edit top section)
│   └── output/                                # Generated .docx files (git-ignored)
├── reference-docs/                    # Third-party pricing references
│   ├── GreenVille 5MW.pdf             # Lighthief Poland quote — 5 MW custom
│   ├── GreenVille 10MW.pdf            # Lighthief Poland quote — 10 MW custom
│   └── Kompleksowa oferta z pakietami.pdf  # Lighthief Poland package pricing (ECO/SILVER/GOLD)
└── team-profile-pv-om-may2026.html    # Team capability profile
```

**Client-specific contracts** live in:
`docs/clients/[CLIENT_FOLDER]/contracts/`

---

## Quick Start — Generate a New Contract

1. Open `contracts/generate-standard-pv-om-contract.py`
2. Edit the `CLIENT`, `PARKS`, and pricing section at the top
3. Run: `python pv-om/contracts/generate-standard-pv-om-contract.py`
4. Output saved to `pv-om/contracts/output/`

---

## Pricing Reference

| Package | Per MW per year | What's included |
|---|---|---|
| ECO | ~€4,200/MW | SCADA + inspections only |
| SILVER | ~€9,500/MW | + cleaning (1x), thermography, vegetation (2x) |
| GOLD | ~€11,300/MW | + PPA, security, warranty, 6 inspections |
| **Custom** | **Negotiated flat** | Tailored scope — see contracts/ |

**Current active contracts:**
- Spanercom Ltd (Anarita East + West, 2×5 MW) — EUR 56,400/yr ex. VAT
  → `docs/clients/Individual_Spanercom/contracts/`

---

## Key Sub-Contractors

| Role | Name | Rate | Notes |
|---|---|---|---|
| LESA / MV licensed | Dimos Demosthenos | €1,600/park/yr + call-outs | See internal/lesa-dimos-rates.md |

---

## Internal Cost Model Summary (5 MW park)

| Service | Cost to us | Sell price | Margin |
|---|---|---|---|
| Panel cleaning (1 visit) | ~€630 | ~€3,200 | ~80% |
| Grass cutting (1 visit) | ~€390 | ~€1,700 | ~77% |
| Preventive maintenance visit | ~€660 | embedded | strong |
| LESA retainer | €1,600/yr | embedded | 5.7% of fee |
| **Full Custom (5 MW park)** | **~€5,640** | **€28,200** | **~80%** |

Full detail in `internal/pv-om-cost-model.md`.
