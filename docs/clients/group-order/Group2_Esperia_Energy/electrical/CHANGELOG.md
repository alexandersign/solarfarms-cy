# Galascope MV / BESS — Electrical drawing changelog

> **Folder:** `electrical/sld/` — all issued SLD DXF/PNG by revision.  
> **Generators:** `electrical/scripts/galascope-sld-rev*.py`  
> **Analysis:** `electrical/analysis/`

---

## Revision index (current = **G**)

| Rev | Date | SwS / topology | Field (G1 / G2) | Status |
|-----|------|----------------|-----------------|--------|
| **C** | 2026-03 | HTML only — JZ4 new panel (SM6 assumption) | 2×1250 label (incorrect on G2) | **Superseded** — `sld/html/` |
| **D** | 2026-04-28 | New indoor cubicle JZ4/JZ5 + MV to skid | — | Superseded — wrong SwS (SM6 vs **UniSec**) |
| **E** | 2026-05 | Repurpose spare SwS bay → skid RMU | — | Alternative if spare bay proven |
| **F** | 2026-05-19 | **JZ2** combined PV; **JZ3** BESS; no new cubicle | G1: 2-pad ~10 m; G2: 3-pad ~75–95 m notes | **Active** — MCTS approval |
| **G** | 2026-05-19 | Same SwS as **F** | **G1a/b/c** and **G2a/b/c** on drawing | **Active** — preferred for MCTS (field options) |

---

## As-built corrections (May 2026)

| Item | Was assumed | Corrected |
|------|-------------|-----------|
| Customer SwS | Schneider **SM6** | **ABB UniSec** 24 kV, 16 kA/1s, 200 A |
| G2 PV trafos | **2×1250 kVA** on HTML Rev C | **1×1250** on MCTS EL00.01.02; satellite **3 pads** — walk-down |
| G1 field | — | **2×1250 kVA** adjacent pads ~10 m (5 MW) |
| BESS LV | 800 V | **690 V** (BCS1250K); PV LVS remain **800 V** |

---

## Drawing register

### Rev D — `sld/rev-D/`

| File | Project |
|------|---------|
| `LC-G1-SLD-001-D_Cypriot.dxf` | Galascope 1 — 5 MW |
| `LC-G1-SLD-001-D-IEC.dxf` | Galascope 1 — IEC |
| `LC-G2-SLD-001-D_Cypriot.dxf` | Galascope 2 — 2.5 MW |
| `LC-G2-SLD-001-D-IEC.dxf` | Galascope 2 — IEC |

### Rev E — `sld/rev-E/`

| File | Project |
|------|---------|
| `LC-G1-SLD-001-E_Cypriot.dxf` / `-IEC.dxf` | G1 — skid RMU direct |
| `LC-G2-SLD-001-E_Cypriot.dxf` / `-IEC.dxf` | G2 — skid RMU direct |

### Rev F — `sld/rev-F/` (current SwS baseline)

| File | Project |
|------|---------|
| `LC-G1-SLD-001-F_Cypriot.dxf` / `-IEC.dxf` | G1 — JZ2 merge + JZ3 BESS |
| `LC-G2-SLD-001-F_Cypriot.dxf` / `-IEC.dxf` | G2 — JZ3 BESS + G2 field notes |

### Rev G — `sld/rev-G/` (current + field options)

| File | Project |
|------|---------|
| `LC-G1-SLD-001-G_Cypriot.dxf` / `-IEC.dxf` | G1 — G1a/b/c notes |
| `LC-G2-SLD-001-G_Cypriot.dxf` / `-IEC.dxf` | G2 — G2a/b/c notes |

### Legacy / reference — `sld/legacy/`

| File | Notes |
|------|--------|
| `galascope-1-5mw-sld.dxf` | Early ABIO-style |
| `galascope-2-2.5mw-sld.dxf` | Early ABIO-style |
| `galascope-*-sld-v2.dxf` | v2 generator output |

### HTML (superseded) — `sld/html/`

| File | Notes |
|------|--------|
| `SLD-galascope-2.5MW-BESS.html` | Rev C — partial corrections May 2026 |
| `galascope-cable-runs.html` | Site cable diagram — UniSec note added |

---

## Regenerate commands

Run from `electrical/scripts/`:

```powershell
cd docs\clients\group-order\Group2_Esperia_Energy\electrical\scripts
python galascope-sld-revD.py
python galascope-sld-revE.py
python galascope-sld-revF.py
python galascope-sld-revG.py
```

---

## 2026-05-19

- Created `electrical/` layout: `CHANGELOG.md`, `sld/rev-*`, `analysis/`, `scripts/`.
- Added Rev **F** (UniSec, JZ2/JZ3) and Rev **G** (G1a/b/c, G2a/b/c field coupling).
- Moved all `LC-G*-SLD-*.dxf` from Esperia root into revision subfolders.
