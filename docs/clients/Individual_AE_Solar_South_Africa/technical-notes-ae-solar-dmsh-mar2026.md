# Technical Notes — AE Solar / DMSH Geelvloer BESS (South Africa)

> **INTERNAL USE ONLY — NOT FOR CLIENT**
> **Date:** 5 March 2026
> **Project:** DMSH Geelvloer Facility — Utility-Scale Solar + BESS Hybrid
> **Location:** Northern Cape, South Africa

---

## 1. Client Details

| Field | Value |
|-------|-------|
| **Company** | AE Alternative Energy GmbH |
| **Contact** | Natalia Iniotaki — Business Development Manager |
| **Email** | natalia@ae-solar.com |
| **Phone** | +49 8231 97 82 68-0 |
| **Mobile** | +90 541 575 49 16 |
| **Address** | Messerschmittring 54, D-86343 Königsbrunn, Germany |
| **Website** | www.ae-solar.com |
| **Origin** | Met in person (Greece expansion discussion) |

---

## 2. Project Overview

| Parameter | Value |
|-----------|-------|
| **Project Name** | DMSH Geelvloer Facility |
| **Location** | Northern Cape, South Africa |
| **Solar Capacity** | ~75 MW |
| **Grid Connection** | 33 kV |
| **Application** | Utility-scale solar + BESS hybrid plant |
| **BESS Purpose** | Grid stability, energy shifting, improved dispatchability |
| **PPA** | With ZESCO, expected end of March 2026 |
| **Storage Configuration** | To be proposed by supplier |
| **System Architecture** | Open for recommendation |
| **Development Stage** | Advanced — PPA pending |

---

## 3. RatedPower Preliminary Design (Client-Provided)

Extracted from RatedPower drawings (dated 2025-08-06, FOR INFORMATION ONLY):

### 3.1 BESS Specifications

| Parameter | Value |
|-----------|-------|
| **Rated Power** | 36.5 MW |
| **Rated Storage Capacity** | 50.0 MWh |
| **Hours of Discharge** | 1.37 h |
| **Number of Battery Containers** | 10 (AC BESS) |
| **Single Container Capacity** | 5.0 MWh |
| **Storage Inverter** | SINACON PV4560, 4560.0 kVA |
| **DC Input** | 919 V – 1500 Vdc |
| **Max DC-AC Efficiency** | 98.74% |
| **AC Output** | 4560.0 kVA / 4560.0 kWac, 630 V |
| **Number of Inverters** | 8 |
| **Power Conversion System** | 36.5 MVA, 0.63/33.0 kV |
| **Number of PCS** | 1 |
| **Apparent Power** | 36.5 MVA |
| **Power Factor (Storage Inverter)** | 1.000 |

### 3.2 Transformer & MV

| Parameter | Value |
|-----------|-------|
| **Transformer Rating** | 36.48 MVA |
| **Voltage** | 33.0 kV / 0.63 kV |
| **Vector Group** | Dyn11 |
| **Cooling** | ONAN |
| **Tap Changer** | 2.5%, 5%, 7.5%, 10% |
| **Short Circuit (Xcc)** | 0.08 |
| **MV Busbar** | 800 A, 25 kA, 36 kV, 50 Hz |
| **MV Cable (BA-1)** | 6×(1×300 mm²) Al XLPE, 20/35 kV, 64.23 m |

### 3.3 Container Dimensions

| Parameter | Value |
|-----------|-------|
| **Length** | 12.0 m |
| **Width** | 2.44 m |
| **Height** | 2.59 m |
| **Face-to-Face Spacing** | 4.0 m |
| **Side-to-Side Spacing** | 3.0 m |

### 3.4 Civil Works

| Parameter | Value |
|-----------|-------|
| **Earthworks Fill** | 1,917.15 m³ |
| **Earthworks Cut** | 1,204.77 m³ |
| **Fence Perimeter** | 164.96 m (2.0 m height, 3.0 m post spacing) |
| **MV Trench** | 800 × 1,000 mm, 64.23 m length, 51.39 m³ volume |
| **Cable** | 300 mm² Al XLPE, buried in trench (IEC 60502-2) |
| **Max Voltage Drop (MV)** | 0.50% |

### 3.5 Site

| Parameter | Value |
|-----------|-------|
| **City / Town** | Kaimoepslaagte |
| **Region** | Northern Cape |
| **Country** | South Africa |
| **Latitude** | -29.43° |
| **Longitude** | +20.13° |
| **Suitable Area** | 2.88 ha |
| **Altitude** | 916.27 m a.m.s.l. |
| **Timezone** | UTC +2 |
| **Coordinate System** | EPSG:32734 |
| **Elevation Data** | SRTM-30 (30 m resolution) |

---

## 4. Documents Received

| Document | Filename | Status |
|----------|----------|--------|
| BESS Layout | `RatedPower-DMSH Geelvloer Facility-517-BESS_LAYOUT.pdf` | ✅ Received |
| MV/LV Single Line Diagram | `RatedPower-DMSH Geelvloer Facility-517-BESS_MV_LV_SLD.pdf` | ✅ Received |
| Preliminary Technical Report | `RatedPower-DMSH Geelvloer Facility-517-BESS_REPORT.pdf` | ✅ Received |

All documents in `client-docs/`. RatedPower report dated 2025-08-06 (13 pages).

---

## 5. Key Observations

### Sizing Discrepancy
- Client states **~75 MW solar**, but the RatedPower BESS design is only **36.5 MW / 50 MWh**
- 50 MWh / 36.5 MW = **1.37 hours** discharge — very short duration
- Typical utility-scale solar+BESS would target 2–4 hour storage
- Need to clarify: is the 50 MWh a first phase, or does the client want us to propose a larger system?

### Architecture
- RatedPower design uses **Siemens SINACON PV4560** inverters — client may be open to alternatives
- Client explicitly states "storage configuration: to be proposed by supplier" and "system architecture: open for recommendation"
- This gives us freedom to propose Kehua/Linyang containerised solution

### Grid Connection
- 33 kV connection — standard for utility-scale
- Need to confirm: is the BESS connecting at the same POI as the solar, or separate?
- Need grid code requirements for South Africa (NRS 097-2-1, SAGCRP)

### Commercial
- This is a **non-Cyprus** project — different pricing, logistics, and regulatory framework
- CIF destination would be a South African port (Durban or Cape Town likely)
- Need to assess local installation partner requirements
- Currency: likely USD or ZAR pricing, not EUR

---

## 6. Client Request

The client has requested:
1. Technical proposal for BESS solution
2. Indicative quotation
3. Proposed system architecture
4. Integration approach

---

## 7. Action Items

- [ ] Clarify BESS sizing requirements — is 50 MWh the target or should we propose larger?
- [ ] Obtain the preliminary technical report (mentioned but not attached)
- [ ] Assess South African grid code requirements (NRS 097-2-1)
- [ ] Determine CIF logistics to South Africa (port, freight cost delta vs Cyprus)
- [ ] Evaluate local installation/EPC partner requirement
- [ ] Prepare initial technical proposal with Linyang/Kehua options
- [ ] Determine pricing approach for non-portfolio international project
