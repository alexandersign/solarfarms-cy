# LIGHTNING PROTECTION RFQ - FOR DHEN

**Date:** 27 January 2026
**Project:** Cyprus BESS Portfolio - 47 Parks
**Request:** LPS & SPD Design and Estimate
**Total Capacity:** 863.5 MWh (176 Battery Containers + 70 MV SKIDs)

---

## 1. SCOPE OF WORK REQUIRED

Please provide design and pricing for:

1. **LPS (Lightning Protection System)** - External lightning protection
   - Air terminals (lightning rods)
   - Down conductors
   - Earth electrodes
   - Bonding connections
   - Testing and certification

2. **SPD (Surge Protection Devices)** - Internal surge protection
   - Type 1+2 SPD (AC main incoming)
   - Type 2 SPD (DC side protection)
   - Type 3 SPD (control/communication circuits)

---

## 2. EQUIPMENT SPECIFICATIONS

### 2.1 Battery Container (20HC)

| Parameter | Specification |
|-----------|---------------|
| **Container Type** | 20-foot High Cube (20HC) |
| **Dimensions (L × W × H)** | **6,058 × 2,438 × 2,896 mm** |
| **Height** | **2.896 m** |
| **Footprint** | **14.77 m²** |
| **Weight** | ~41.5 tonnes |
| **IP Rating** | IP55 |
| **Material** | Steel container (standard shipping container construction) |
| **Energy Capacity** | 5.015 MWh (DC) |
| **DC Voltage Range** | 1,164.8 - 1,497.6 V DC |
| **Nominal DC Voltage** | 1,331.2 V DC |

#### Container Models in Portfolio

| Model | Capacity | Quantity | Notes |
|-------|----------|----------|-------|
| **ME 5.015 MWh** | 5,015 kWh | ~140 units | Primary model |
| **ME 4.179 MWh** | 4,179 kWh | ~36 units | Smaller parks |

#### Container Electrical Entry Points

| Entry | Location | Purpose |
|-------|----------|---------|
| DC Power | Bottom/Side | 240 mm² DC cables to PCS |
| Aux Power | Side | 4×35mm² + 1×16mm² (3-phase AC) |
| Communication | Side | CAT6 Ethernet |
| Grounding | Multiple | 120-150 mm² Cu or flat steel |

---

### 2.2 MV SKID Container (40HC)

| Parameter | Specification |
|-----------|---------------|
| **Container Type** | 40-foot High Cube (40HC) |
| **Dimensions (L × W × H)** | **12,192 × 2,438 × 2,896 mm** |
| **Height** | **2.896 m** |
| **Footprint** | **29.72 m²** |
| **Weight** | ~38 tonnes (10MW version) |
| **IP Rating (Skid)** | IP54 |
| **IP Rating (PCS)** | IP65 |

#### MV SKID Components Inside

| Component | Description |
|-----------|-------------|
| **PCS (Inverters)** | 1-8 units × 1,250 kW each (Kehua) |
| **MV Transformer** | 1.1 - 10 MVA (oil or dry type) |
| **MV Switchgear** | ABB (11kV or 22kV) |
| **Protection Relays** | Inside switchgear |
| **RTU** | For SCADA connection |
| **LV Distribution** | AC distribution panel |

#### MV SKID Voltage Levels

| Level | Voltage | Notes |
|-------|---------|-------|
| **MV Output** | 11 kV or 22 kV | To grid POC |
| **LV (PCS Side)** | 480-800 V AC | 3-phase |
| **DC Input** | 1,165-1,498 V DC | From battery containers |
| **Aux Power** | 400 V AC | 3-phase |
| **Control** | 24 V DC / 230 V AC | |

---

### 2.3 MV SKID Configurations in Portfolio

| MV Skid Size | Power | Qty Used | Dimensions |
|--------------|-------|----------|------------|
| 1 MW | 1.0 MW | 8 | 20HC (est.) |
| 1.25 MW | 1.25 MW | 2 | 20HC (est.) |
| 1.5 MW | 1.5 MW | 6 | 20HC (est.) |
| 1.725 MW | 1.725 MW | 8 | 20HC (est.) |
| 2 MW | 2.0 MW | 4 | 20HC (est.) |
| 2.5 MW | 2.5 MW | 10 | 20HC (est.) |
| 3 MW | 3.0 MW | 6 | 20HC (est.) |
| 3.45 MW | 3.45 MW | 6 | 20HC (est.) |
| 4 MW | 4.0 MW | 2 | 40HC |
| 5 MW | 5.0 MW | 4 | 40HC |
| 6 MW | 6.0 MW | 12 | 40HC |
| 6.9 MW | 6.9 MW | 4 | 40HC |
| 7.5 MW | 7.5 MW | 2 | 40HC |
| 8 MW | 8.0 MW | 4 | 40HC |
| 10 MW | 10.0 MW | 2 | 40HC |
| **TOTAL** | | **~70 SKIDs** | |

---

## 3. TYPICAL PARK LAYOUTS

### Small Park (1-2 Containers)

```
┌─────────────────────────────────────────┐
│                                         │
│   ┌──────────┐      ┌──────────┐       │
│   │  BESS    │      │ MV SKID  │       │
│   │  20HC    │      │  20HC    │───────┼── Grid POC
│   │  5 MWh   │      │  2.5MW   │       │
│   └──────────┘      └──────────┘       │
│                                         │
│      ~6m                ~6m             │
│   ◄────────────────────────────────────►│
│              ~25-30m total              │
└─────────────────────────────────────────┘
```

### Medium Park (4-5 Containers)

```
┌────────────────────────────────────────────────────┐
│                                                    │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │  BESS 1  │  │  BESS 2  │  │  BESS 3  │        │
│   │  5 MWh   │  │  5 MWh   │  │  5 MWh   │        │
│   └──────────┘  └──────────┘  └──────────┘        │
│                                                    │
│   ┌──────────┐  ┌──────────────────────────┐      │
│   │  BESS 4  │  │       MV SKID            │──────┼── Grid POC
│   │  5 MWh   │  │        40HC              │      │
│   └──────────┘  │        6MW               │      │
│                 └──────────────────────────┘      │
│                                                    │
│   ◄──────────────────────────────────────────────►│
│                    ~40-50m total                   │
└────────────────────────────────────────────────────┘
```

### Large Park (8+ Containers)

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │BESS 1│ │BESS 2│ │BESS 3│ │BESS 4│ │BESS 5│ │BESS 6│       │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘       │
│                                                               │
│  ┌──────┐ ┌──────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │BESS 7│ │BESS 8│ │   MV SKID 1     │ │   MV SKID 2     │───┼─ Grid
│  └──────┘ └──────┘ │     10MW        │ │     5MW         │   │
│                    └─────────────────┘ └─────────────────┘   │
│                                                               │
│   ◄─────────────────────────────────────────────────────────►│
│                         ~60-80m total                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. LIGHTNING PROTECTION REQUIREMENTS

### 4.1 Standards to Follow

| Standard | Description |
|----------|-------------|
| **IEC 62305** | Protection against lightning |
| **EN 62305-1 to 4** | European standard |
| **BS EN 62305** | UK/Cyprus adoption |
| **IEEE 1410** | Guide for improving lightning performance |

### 4.2 Risk Assessment Parameters

| Parameter | Value |
|-----------|-------|
| **Location** | Cyprus (Mediterranean climate) |
| **Flash Density (Ng)** | ~2-4 flashes/km²/year |
| **Structure Height** | 2.896 m (containers) |
| **Sensitive Electronics** | BMS, PCS, SCADA, RTU |
| **Criticality** | High (grid-connected, revenue-generating) |

### 4.3 LPS Requirements

| Component | Requirement |
|-----------|-------------|
| **Protection Level** | Class II or III (per risk assessment) |
| **Air Terminals** | On each container + MV SKID |
| **Down Conductors** | Min 2 per structure |
| **Earth Electrodes** | Integrated with grounding system |
| **Earth Resistance** | ≤10Ω (preferably ≤1Ω) |
| **Bonding** | All metallic structures interconnected |

### 4.4 SPD Requirements

| Location | SPD Type | Voltage | Notes |
|----------|----------|---------|-------|
| **MV Incoming** | Type 1 | 11/22 kV | At grid POC |
| **LV Main** | Type 1+2 | 400/480 V | At MV SKID LV panel |
| **DC Main** | Type 2 | 1500 V DC | Between battery & PCS |
| **Aux Power** | Type 2 | 400 V | Each container |
| **Control/Comms** | Type 3 | 24 V / Ethernet | BMS, SCADA, RTU |

---

## 5. GROUNDING SPECIFICATIONS (PER LINYANG)

| Parameter | Specification |
|-----------|---------------|
| **Grounding Cross-Section** | ≥250 mm² effective |
| **Connection Impedance** | ≤0.1 Ω |
| **Grounding Cable** | 120-150 mm² Cu (yellow-green) or flat steel |
| **Earth Electrode Type** | TBD by Dhen (rods, plate, ring) |
| **Target Earth Resistance** | ≤1 Ω per container (Cyprus soil) |

---

## 6. PORTFOLIO SUMMARY FOR QUOTATION

### By Container Count

| Containers per Park | Parks | Total Containers | Total MV SKIDs |
|---------------------|-------|------------------|----------------|
| 1 | 10 | 10 | 10 |
| 2 | 12 | 24 | 12 |
| 3 | 7 | 21 | 12 |
| 4 | 5 | 20 | 5 |
| 5 | 5 | 25 | 9 |
| 6 | 1 | 6 | 1 |
| 7 | 1 | 7 | 2 |
| 8 | 5 | 40 | 10 |
| 12 | 1 | 12 | 2 |
| 20 | 1 | 20 | 2 |
| **TOTAL** | **47** | **176** | **~70** |

### Quotation Categories Requested

| Category | Unit | Quantity | Please Quote |
|----------|------|----------|--------------|
| **LPS per 20HC Container** | Each | 176 | €_____/unit |
| **LPS per 40HC MV SKID** | Each | 70 | €_____/unit |
| **SPD Kit (DC 1500V)** | Each | 176 | €_____/unit |
| **SPD Kit (LV 400V)** | Each | 70 | €_____/unit |
| **SPD Kit (MV 11kV)** | Each | 47 | €_____/unit |
| **SPD Kit (Control/Comms)** | Each | 246 | €_____/unit |
| **Earthing Enhancement** | Per Park | 47 | €_____/park |
| **Design & Certification** | Per Park | 47 | €_____/park |

---

## 7. DELIVERABLES REQUIRED

1. **LPS Design** per typical park layout
2. **SPD Selection Schedule** with datasheets
3. **Material List** with quantities
4. **Installation Estimate** (labor hours)
5. **Testing & Certification** (per BS EN 62305)
6. **Maintenance Schedule** recommendation

---

## 8. TIMELINE

| Milestone | Date |
|-----------|------|
| RFQ Issued | 27 Jan 2026 |
| Quotation Due | 10 Feb 2026 |
| First Parks Installation | Q2 2026 |
| Portfolio Completion | Q4 2026 |

---

## 9. CONTACT

**Lighthief Cyprus Ltd**
Email: [Insert email]
Phone: [Insert phone]

---

*Please provide quotation in EUR, valid for 60 days minimum.*
*Installation locations across all Cyprus districts (Nicosia, Limassol, Larnaca, Famagusta, Paphos).*
