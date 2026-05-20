# Galascope 2 (2.5 MW) — Rev F/G Field & SwS Strategy

> **Site:** [35.065°N, 33.856°E](https://www.google.com/maps/place/35%C2%B003'54.6%22N+33%C2%B051'22.5%22E/@35.064364,33.8618646,338m/data=!3m1!1e3)  
> **Issue:** Customer **ABB UniSec** appears **full** (same as G1) — need to **free one bay** for BESS without a new cubicle.  
> **Satellite (May 2026):** **Three** small compound structures on the array perimeter — **not** side-by-side like G1.

---

## Satellite layout vs approved MCTS drawing

| Source | What it shows |
|--------|----------------|
| **EL00.01.02** (2.5 MW MCTS) | **One** MCTS: **JZ1**→SwS, **JZ2**→80 A fuse→**one 1250 kVA** trafo, **800 V** LVS, **11×250 A** inverter feeders |
| **SCADA** (Galascope 2) | **22×** Huawei inverters — **2×11** groups (two LV collection zones) |
| **Satellite** | **Three** grey pads: **T1** (NW), **T2** (W-central), **T3** (NE, near red-roof building) |

**Site walk required:** Confirm which pads are **1250 kVA + 8DJH MCTS** vs inverter/aux buildings. For **2.5 MW AC**, **two** 1250 kVA units are plausible; **three** full trafos would be **3.75 MVA nameplate** (high unless one pad is legacy/spare).

### Estimated pad spacing (20 m scale bar)

| Link | Straight-line | Trench BOQ (+15–20%) |
|------|---------------|----------------------|
| **T1 ↔ T2** (closest pair) | **~70–80 m** | **~85–95 m** |
| **T1 ↔ T3** | **~160–180 m** | **~185–210 m** |
| **T2 ↔ T3** (longest) | **~220–240 m** | **~255–280 m** |

---

## Rev F at SwS (same concept as G1)

| Cubicle | Role |
|---------|------|
| **JZ1** | EAC incomer — unchanged |
| **JZ2** | **Combined PV** — one MV feeder serves merged field network |
| **JZ3** | **Freed** → **BESS** skid (7SJ82 + MV cable ~30 m) |

**Retire:** One (or two) existing **JZ→pad** cables that today feed separate MCTS incomers.

**Electrical @ 22 kV:** Full **2.5 MW** ≈ **65.6 A** — well within **UniSec 200 A** and **80 A** MCTS fuses per branch.

---

## Rev G field options (G2) — same families as G1, longer cables

Assume **two** operational 1250 kVA trafos (**T1 + T2** closest); **T3** verified on walk.

### G2a — Outdoor tee + radial spurs (preferred if MCTS allows)

```text
SwS JZ2 ──► tee / junction pit (near T1 or road hub)
              ├── ~75–95 m ──► T1 MCTS
              └── ~75–95 m ──► T2 MCTS
T3: isolate from SwS OR fed from second tee leg if still in service
```

| Item | G2 vs G1 |
|------|----------|
| **8DJH swap** | **None** on each kept MCTS |
| **New MV cable** | **~85–95 m × 2** branches (not ~10 m) |
| **Tee / joint** | **RSTI-58** or prefabricated **3-way** at hub |
| **Civil** | **Much higher** than G1 — perimeter trench along west array |

### G2b — Hub MCTS with extra 8DJH T-modules

| Item | Detail |
|------|--------|
| **Location** | **T1** (nearest road / SwS cable landing) |
| **Lineup** | **R + T₁ + T₂** (+ **T₃** if three trafos confirmed) |
| **Spurs** | **~85–95 m** to **T2**; **~185–210 m** to **T3** if included |
| **Swap** | **Add 1–2 Siemens 8DJH T-units** at hub — **not** SM6 |

**Limit:** 8DJH lineup length / bus rating — confirm with Siemens or MCTS before committing to **three** T feeders.

### G2c — Ring main between MCTS (three-pad variant)

```text
SwS JZ2 ──► T1 (R) ── ~75 m ──► T2 (R) ── ~220 m ──► T3 (R) ──► (open ring or back to T1)
```

| Item | Detail |
|------|--------|
| **Cable** | **~75 m + ~220 m** ring sections (longest run **T2–T3**) |
| **8DJH** | **No swap** if each pad has **R** module |
| **Risk** | Long ring → higher **fault level** / protection grading — **MCTS study** |

---

## If all three pads are real transformers

| Strategy | SwS feeders freed | Field work |
|----------|-------------------|------------|
| **Merge T1+T2 only** (recommended first) | **1 bay** (JZ3 → BESS) | ~**95 m** × 2 from hub |
| **Merge all three on one JZ2** | **2 bays** (one BESS + spare?) | **~95 m + ~210 m + ~240 m** class runs — costly |
| **Keep T3 separate** | **1 bay** only | T3 stays on old JZ until second study |

For **BESS only**, merging **two** of three units onto **JZ2** and using **JZ3** for BESS is enough — **do not need** to collapse all three unless a **second** freed bay is required.

---

## Comparison G1 vs G2 (Rev G)

| | **G1 (5 MW)** | **G2 (2.5 MW)** |
|---|---------------|-----------------|
| Pads (satellite) | **2** adjacent | **3** perimeter |
| Closest trafo spacing | **~10 m** | **~75 m** |
| Typical new MV cable | **10–12 m** | **85–95 m** per spur |
| MCTS drawing | 2×1250 (EL00.02.02) | **1×1250** (EL00.01.02) — **verify** |
| Rev F SwS | JZ2 merge + JZ3 BESS | **Same** |
| Preferred field option | **G1a** tee | **G2a** tee at **hub** (civil scope ↑) |

---

## MCTS RFI (G2-specific)

- [ ] How many **1250 kVA / 22 kV** trafos are energised today (**1, 2, or 3**)?
- [ ] Which **UniSec JZ** feeds **T1, T2, T3** (cable route / as-built index)?
- [ ] Approve **JZ3** repurposing for **2.5 MW BESS** (Category B).
- [ ] Approve **HV parallel** of two (or three) trafos on one **JZ2** feeder.
- [ ] Maximum **MV cable run** and **tee** at 22 kV for ring/tee topology.

---

**Folder:** [`../CHANGELOG.md`](../CHANGELOG.md) · **Drawings:** [`../sld/rev-G/`](../sld/rev-G/)

*Lighthief internal — 19 May 2026*
