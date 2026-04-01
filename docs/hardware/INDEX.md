# Linyang / Kehua Hardware Specifications Index

> **Location:** `docs/hardware/`
> **Previously at:** `legal/linyang_hardware_specs_docs/` (moved 26 Mar 2026)
> **OEM:** Linyang Energy (system integrator) + Kehua Tech (PCS manufacturer)

---

## 1. PCS Units (Kehua C-Series — Standalone)

| Model | Power | DC Range | AC Output | Efficiency | Status | Datasheet |
|-------|-------|----------|-----------|------------|--------|-----------|
| **BCS1000K-C-HUD** | 1.00 MW | 1000–1500 Vdc | 690 Vac | ≥99% | In production | `PCS+SKID+Transformer/BCS1000K~1250K-C-HUD Series.pdf` |
| **BCS1250K-C-HUD** | 1.25 MW | 1000–1500 Vdc | 690 Vac | ≥99% | In production | `PCS+SKID+Transformer/BCS1250K-C-HUD Series -250828.pdf` |

**Notes:**
- Both models share the same physical chassis (735 × 2135 × 1300 mm, ~950 kg)
- IP65 rated, -35°C to +60°C, C5 corrosion
- Communication: Modbus-RTU/TCP, IEC 61850, IEC 104
- Grid code: EN 50549-2 (TÜV certified)

### PCS Certificates

| Certificate | File |
|-------------|------|
| EN 50549-2/10 (Grid Code) | `PCS+SKID+Transformer/BCS1000K~1250K-C-HUD  EN50549-2 10 cert.pdf` |
| EN 50549-2/10 Report | `PCS+SKID+Transformer/BCS1250K-C-HUD  EN50549-2 -10 Report.pdf` |
| IEC 62477-1 (Safety) | `PCS+SKID+Transformer/BCS1000~1250K-C-HUD  IEC62477-1 CB cert.pdf` |
| CE-LVD | `PCS+SKID+Transformer/BCS1000~1250K-C-HUD CE-LVD.pdf` |
| CE-EMC | `PCS+SKID+Transformer/BCS1000~1250K-C-HUD  CE-EMC  CERT.pdf` |
| IEC 62116 / IEC 61727 | `PCS+SKID+Transformer/BCS1000~1250K-C-HUD IEC62116 61727.pdf` |
| IEC 62909-1/-2 | `PCS+SKID+Transformer/BCS1000-1250K-C-HUD IEC62909-1 -2 cert.pdf` |
| Full certification dossier | `PCS+SKID+Transformer/certyfikacja_BCS1250-K-C-HUD.pdf` |

### PCS Performance Data

| Document | File |
|----------|------|
| Efficiency Curve (BCS1250K) | `PCS+SKID+Transformer/01--V3.0--BCS1250K-C-HUD efficiency Curve.pdf` |
| PQ Curve (single PCS) | `PCS+SKID+Transformer/single--PCS  PQ Curve.pdf` |
| PQ Curve (parallel PCS) | `PCS+SKID+Transformer/parallel--PCS PQ Curve.pdf` |
| Current Harmonics | `PCS+SKID+Transformer/Current Harmonic(BCS-C-HUD).pdf` |
| Flicker / DC Injection | `PCS+SKID+Transformer/Flicker-DC Injection(BCS-C-HUD).pdf` |
| FRT Characteristics | `PCS+SKID+Transformer/Charakterystyka FRT 1000K-C-HUD & 1250K-C-HUD_ang.pdf` |

---

## 2. MV Skid Containers (PCS + Transformer Integrated)

| Skid Model | Container | PCS Slots | PCS Models | Power Range | Transformer | Datasheet |
|------------|-----------|-----------|------------|-------------|-------------|-----------|
| **T1** | 20ft Std (6058mm) | 1 | BCS1000K or BCS1250K | 1.0–1.25 MW | 1,000–1,250 kVA | `BCS1000~1250K-C-HUD T1.pdf` |
| **T2** | 20ft Std (6058mm) | 2 | BCS1000K (confirmed) | 2.0 MW | SL-2000 (2,000 kVA) | `BCS2000K-C-HUD-T2 Datasheet .pdf` |
| **T4** | 40ft HC (12192mm) | 4 | BCS1000K or BCS1250K | 4.0–5.0 MW | 4,000–5,000 kVA | `BCS4000K-C-HUD T4--20250827.pdf` |
| **T8** | 40ft HC (12192mm) | 8 | BCS1250K (confirmed) | 10.0 MW | 10,000 kVA | `PCS+SKID+Transformer/BCS10000K-C-HUD T8.pdf` |

### Additional T8 Documentation

| Document | File |
|----------|------|
| T8 Datasheet (alt version) | `PCS+SKID+Transformer/BCS8000K~10000K-C-HUD T8--20251215.pdf` |
| T8 Foundation Diagram | `PCS+SKID+Transformer/BCS10000K-C-HUD-T8 appearance and recommended foundation diagram.dwg` |
| T8 Layout (8–10 MW) | `PCS+SKID+Transformer/8~10MW PCS Layout.pdf` |
| T8 SLD (10 MW, 22kV) | `PCS+SKID+Transformer/10MW PCS Single Line Diagram(22kV).pdf` |

### Missing Skid Datasheets

| Missing | Expected | Notes |
|---------|----------|-------|
| T2 with BCS1250K (2.5 MW) | BCS2500K-C-HUD/T2 | Request from Linyang |
| T8 with BCS1000K (8.0 MW) | BCS8000K-C-HUD/T8 | Request from Linyang |

---

## 3. MV Transformers (Oil-Immersed, Kehua SL-Series)

| Rating | Model | MV Voltage | Vector Group | Pairs With | Datasheet |
|--------|-------|------------|--------------|------------|-----------|
| **1,000 kVA** | SL-1000 | 6–33 kV (custom) | Dy11 | T1 (1.0 MW) | `mv-transformers/MV Transformer 1000kVA  Datasheet(Polish).pdf` |
| **1,250 kVA** | SL-1250 | 6–33 kV (custom) | Dy11 | T1 (1.25 MW) | `mv-transformers/MV Transformer 1250kVA  Datasheet(Polish).pdf` |
| **2,000 kVA** | SL-2000 | 6–35 kV (custom) | Dy11 | T2 (2.0 MW) | `mv-transformers/MV Transformer 2000kVA  Datasheet(Polish).pdf` |
| **2,500 kVA** | SL-2500 | 6–35 kV (custom) | Dy11 | T2 (2.5 MW) | `mv-transformers/MV Transformer 2500kVA  Datasheet(Polish).pdf` |
| **4,000 kVA** | SL-4000 | 6–35 kV (custom) | Dy11 | T4 (4.0 MW) | `mv-transformers/MV Transformer 4000kVA  Datasheet.pdf` |
| **5,000 kVA** | SL-5000 | 6–35 kV (custom) | Dy11 | T4 (5.0 MW) | `mv-transformers/MV Transformer 5000kVA  Datasheet(Polish).pdf` |
| **8,000 kVA** | SL-8000 | 6–35 kV (custom) | Dy11-y11 | T8 (8.0 MW) | `mv-transformers/MV Transformer 8000kVA  Datasheet.pdf` |
| **10,000 kVA** | SL-10000 | 20 or 30 kV (custom) | Dy11-y11 | T8 (10.0 MW) | `mv-transformers/MV Transformer 10000kVA  Datasheet(Polish).pdf` |

**Common specs:** Oil-immersed, 50 Hz, 0.69 kV LV side, Tier 2 efficiency, tap changer ±2×2.5%

**Also on file:** `PCS+SKID+Transformer/MV Transformer 10000kVA  Datasheet_PL_EN.pdf` (earlier bilingual version)

---

## 4. Battery Containers (Linyang — LFP/EVE)

| Model | Capacity | Cell | Container | Datasheet |
|-------|----------|------|-----------|-----------|
| **Power Atlantic 5.015 MWh** | 5,015 kWh | EVE 314Ah LFP | 20ft HC | `Battery_Container/5MWhSpecification.pdf` |
| **Power Atlantic 3.34 MWh** | 3,343 kWh | EVE LFP | 20ft HC | `Battery_Container/Specification_3,34MWh.pdf` |

### Battery Documentation

| Document | File |
|----------|------|
| 5 MWh Full Specification | `Battery_Container/5MWhSpecification.pdf` |
| 5 MWh Maintenance Manual | `Battery_Container/5MWhMaintenanceManual.pdf` |
| 5 MWh Product Brochure | `Battery_Container/Power Atlantic_5MWh_EN.pdf` |
| User Manual V2.0 | `Battery_Container/User_Manual_V2.0.pdf` |
| 5 MWh Degradation Curve | `Battery_Container/Degradation Curve_5MWh.pdf` |
| 4 MWh Degradation Curve | `Battery_Container/Degradation Curve_4MWh.pdf` |
| 3.34 MWh Specification | `Battery_Container/Specification_3,34MWh.pdf` |
| 3.34 MWh Summary | `Battery_Container/Specification_3.34MWh_summary.md` |

### Key Battery Specs (5.015 MWh container)

- Dimensions: 6,058 × 2,438 × 2,896 mm (20ft HC)
- Weight: ~41.5 tonnes
- DC Voltage: 1,164.8–1,497.6 Vdc (nominal 1,331.2 Vdc)
- BMS: 3-level (BMU L1 / BCMU L2 / BAMS L3), 96 BMUs per container
- Cooling: Liquid cooled
- IP55, C5 corrosion rated
- Fire suppression: Integrated

---

## 5. RMU (Ring Main Unit)

| Document | File |
|----------|------|
| Schneider RM AirSeT 12–24kV (SF6-free) | `RMU/RM AirSeT 12~24kV SF6 free[EN].pdf` |

---

## 6. BESS Round-Trip Efficiency

| Document | File |
|----------|------|
| RTE Calculation | `BESS RTE/02_RTE Calculation.pdf` |
| BCS1250K Efficiency Curve | `BESS RTE/BCS1250K-C-HUD Effiency Curve (1).pdf` |
| System Drawings | `BESS RTE/Drawings.zip` |

---

## 7. EAC/DSO Compliance Certificates

All in `EAC Complience/Re_RFI - DSO Compliance_____20251209/`:

| Standard | Document |
|----------|----------|
| UL 9540A (Cell) | `UL9540A (Cell).pdf` |
| UL 9540A (Pack, Draft) | `PACK UL 9540A (DRAFT).pdf` |
| UL 9540A (Container) | `CT_LY_RACK_EVE314_1P104S_TD_UL9540A_80239432_20250912.pdf` |
| IEC 62619 (Pack Safety) | `PACK IEC 62619.pdf` |
| IEC 63056 (Stationary) | `PACK IEC 63056.pdf` |
| IEC 62933-5-2 | `IEC62933-5-2 Notification letter.pdf` |
| UN 38.3 (Cell) | `UN38.3 (Cell).pdf` |
| UN 38.3 (Pack) | `UN38.3 (Pack).pdf` |
| UL 94 (Flammability) | `UL94.pdf` |
| EN 60204-1 / EN ISO 12100 | `EN 60204-1 EN ISO 12100.pdf` |
| IEC 61000-6-2/4 | `IEC 61000-6-2--4.pdf` |
| EN IEC 61000-6-2/4 + EN55011 | `EN IEC 61000-6-2--4  EN55011.pdf` |
| EN IEC 61000-3-2 | `EN IEC 61000-3-2.pdf` |
| PA-4000 CE 62477 | `PA-4000 CE 62477.pdf` |
| PA-4000 IEC 61000 | `PA-4000 IEC 61000.pdf` |
| PA-5000 EN 62477-1 / IEC EN 62040 | `PA-5000 EN 62477-1- IEC EN 62040.pdf` |
| PACK EN IEC 61000 | `PACK EN IEC 61000.pdf` |
| UL 60947 (MCCB) | `Molded case circuit breaker UL 60947.pdf` |
| BMS IEC 61850 ICD | `bms61850.icd` |

---

## 8. Communication Protocols

| Document | File |
|----------|------|
| BCS1250K Modbus Protocol V1.0 | `PCS+SKID+Transformer/WRDF-0I002-103...Modbus Communication Protocol(V1.00A) 001.xlsx` |
| IEC 104 Point List | `PCS+SKID+Transformer/WRWF-0I002-06...IEC104 Point List_002.xlsx` |
| BMS-EMS Modbus IO List | `PCS+SKID+Transformer/BMS-EMS_Modbus_IO_List_ang_chinski.xlsx` |
| BMS IEC 61850 ICD file | `EAC Complience/.../bms61850.icd` |

---

## 9. System-Level Reference Drawings

| Document | File |
|----------|------|
| 10 MW PCS SLD (22kV) | `PCS+SKID+Transformer/10MW PCS Single Line Diagram(22kV).pdf` |
| 8–10 MW PCS Layout | `PCS+SKID+Transformer/8~10MW PCS Layout.pdf` |
| Anatoliko 40MW/160MWh SLD | `PCS+SKID+Transformer/Anatoliko SS 40MW 160MWh BESS Single Line Diagram(22kV).pdf` |
| Athalassa 40MW/80MWh SLD | `PCS+SKID+Transformer/Athalassa SS 40MW 80MWh BESS Single Line Diagram(22kV).pdf` |
| FIZ 40MW/160MWh SLD | `PCS+SKID+Transformer/FIZ SS 40MW 160MWh BESS Single Line Diagram(22kV).pdf` |

---

## 10. Warranty

| Document | File |
|----------|------|
| Linyang Warranty Terms V2 | `Linyang Warranty Terms v2.pdf` |

---

## Configuration Quick Reference

### Valid Configurations (1:1 PCS:BESS ratio — standard)

| MW | MWh | BESS Containers | MV Skid(s) | PCS Model | Duration |
|----|-----|-----------------|------------|-----------|----------|
| 1.0 | 5 | 1 | T1 | 1 × BCS1000K | 5.0h |
| 1.25 | 5 | 1 | T1 | 1 × BCS1250K | 4.0h |
| 2.0 | 10 | 2 | T2 | 2 × BCS1000K | 5.0h |
| 2.5 | 10 | 2 | T2 | 2 × BCS1250K | 4.0h |
| 4.0 | 20 | 4 | T4 | 4 × BCS1000K | 5.0h |
| 5.0 | 20 | 4 | T4 | 4 × BCS1250K | 4.0h |
| 5.0 | 25 | 5 | T4 + T1 | 4+1 × BCS1000K | 5.0h |
| 6.25 | 25 | 5 | T4 + T1 | 4+1 × BCS1250K | 4.0h |
| 6.0 | 30 | 6 | T4 + T2 | 4+2 × BCS1000K | 5.0h |
| 7.5 | 30 | 6 | T4 + T2 | 4+2 × BCS1250K | 4.0h |
| 10.0 | 40 | 8 | T8 | 8 × BCS1250K | 4.0h |

### Valid Configurations (2:1 PCS:BESS ratio — power-dense)

| MW | MWh | BESS Containers | MV Skid(s) | PCS Model | Duration |
|----|-----|-----------------|------------|-----------|----------|
| 2.0 | 5 | 1 | T2 | 2 × BCS1000K | 2.5h |
| 2.5 | 5 | 1 | T2 | 2 × BCS1250K | 2.0h |
| 4.0 | 10 | 2 | T4 | 4 × BCS1000K | 2.5h |
| 5.0 | 10 | 2 | T4 | 4 × BCS1250K | 2.0h |
| 8.0 | 20 | 4 | T8 | 8 × BCS1000K | 2.5h |
| 10.0 | 20 | 4 | T8 | 8 × BCS1250K | 2.0h |

### Aeolian Dynamics Project — Configuration Options for 20 MWh

| Config | MW | Skid | PCS | Ratio | Duration | Tender ≥5.4MW? | Tender ≥3h? | Expandable? |
|--------|-----|------|-----|-------|----------|----------------|-------------|-------------|
| T4 / 1:1 / BCS1250K | **5.0** | T4 | 4 × 1.25 | 1:1 | 4.0h | No | Yes | Limited |
| T8 / 1:1 / BCS1250K (5 of 8 populated) | **6.25** | T8 | 5 × 1.25 | ~1.25:1 | 3.2h | Yes | Yes | **Yes — 3 spare slots** |
| T8 / 2:1 / BCS1000K | **8.0** | T8 | 8 × 1.00 | 2:1 | 2.5h | Yes | **No** | No |
| T8 / 2:1 / BCS1250K | **10.0** | T8 | 8 × 1.25 | 2:1 | 2.0h | Yes | **No** | No |

> **Note:** The "6.5 MW" configuration from Linyang quotation LY202601271 needs clarification.
> A partially populated T8 with 5 × BCS1250K gives 6.25 MW and meets all tender criteria while providing expandability.
> This requires confirmation from Linyang that a T8 can ship with 5 of 8 PCS slots populated and an appropriately sized transformer (likely 8,000 kVA).
