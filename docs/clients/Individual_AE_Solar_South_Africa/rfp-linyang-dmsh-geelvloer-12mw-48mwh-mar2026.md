# RFP: CIF Quotation — DMSH Geelvloer BESS (South Africa)

## Document Control

| Field | Value |
|-------|-------|
| **Document Reference** | LCY-RFP-SA-GEELVLOER-2026-001 |
| **Version** | 1.0 |
| **Date** | 17 March 2026 |
| **Status** | READY TO SEND |
| **Author** | Alexander Papacosta |

---

## Email Details

| Field | Value |
|-------|-------|
| **To** | Kamil Talar (kamil@linyang.com) |
| **CC** | [Internal team] |
| **Subject** | RFP — CIF Quotation Request — 12 MW / 48 MWh BESS — South Africa (Standalone Order) |
| **Priority** | HIGH |

---

## EMAIL BODY

Dear Kamil,

I hope this finds you well.

We have a new standalone BESS project opportunity in **South Africa** and would like to request a CIF quotation from Linyang. This is **not part of the Cyprus group order** — it is an independent project with a separate client and delivery destination.

The project has received its **Eskom Planning Report** (grid connection officially secured), and we need indicative pricing urgently to prepare our EPC proposal.

---

## 1. Project Summary

| Parameter | Value |
|-----------|-------|
| **Project Name** | DMSH Geelvloer Facility |
| **Location** | Kenhardt area, Northern Cape, South Africa |
| **Client** | AE Alternative Energy GmbH (Germany) |
| **EPC Contractor** | Lighthief Ltd |
| **Grid Operator** | Eskom |
| **Project Type** | Private IPP — PPA with Eskom |
| **Application** | Utility-scale 75 MWp solar PV + BESS hybrid |
| **BESS Purpose** | Grid stability, energy shifting, dispatchability |

---

## 2. BESS Technical Requirements (Eskom Final — March 2026)

| Parameter | Value |
|-----------|-------|
| **BESS Power** | **12 MW** (fixed, Eskom confirmed) |
| **BESS Energy** | **48 MWh** (4-hour duration) |
| **C-Rate** | 0.25C charge / 0.25C discharge |
| **Architecture** | AC-coupled |
| **Internal MV Voltage** | 33 kV |
| **POC Voltage** | 132 kV (Eskom transmission) |
| **Frequency** | 50 Hz |
| **System Fault Level** | **4.55 kA** at 132 kV — all switchgear/protection must be rated accordingly |
| **Grid Code** | South African BESF Code v5.3 — **Category C** compliance mandated by Eskom |

---

## 3. Grid Code Compliance Requirements (SA BESF v5.3 + RPP Rev 3.1)

Eskom mandates full Category C compliance. Key requirements:

| Requirement | Value |
|-------------|-------|
| **LVRT** | 0 pu (zero voltage) for 150 ms — must stay connected |
| **HVRT** | 120% voltage for 2 seconds |
| **RoCoF withstand** | ±2.5 Hz/s (200 ms measurement window) |
| **Reactive power** | ±0.33 × Pn = ±3.96 MVAr (PF 0.95) |
| **Frequency range** | 47.0 – 52.0 Hz |
| **Continuous frequency** | 49.0 – 51.0 Hz |
| **Deadband** | 49.85 – 50.15 Hz |
| **Droop (mandatory FSM)** | 4% |
| **Droop (LFSM-U / LFSM-O)** | 10% |
| **Active power recovery** | ≥90% within 1 second post-fault |
| **Reactive current injection** | Within ±20% tolerance after 60 ms |
| **Phase jump tolerance** | 20° |
| **Anti-islanding** | Detection + disconnect within 2 seconds |
| **Ramp rate** | 1% – 20% of Pn per minute (adjustable) |
| **SCADA protocol** | IEC 60870-5-101 (transmission connection) |
| **PQ monitoring** | IEC 61000-4-30 Class A |

**Question for Linyang:** Can you confirm that the Linyang BESS + Kehua PCS platform meets all of the above SA grid code requirements? If any item requires additional equipment or certification, please specify.

---

## 4. Environmental & Site Conditions

| Parameter | Value | Design Impact |
|-----------|-------|---------------|
| **Ambient Temperature Max** | **45°C** | PCS and HVAC derating required |
| **Ambient Temperature Min** | **-5°C** | Cold start / heating required |
| **Altitude** | **916 m** | Air density reduction — cooling derating (~5-10%) |
| **Pollution Level** | **Heavy** (semi-desert, dust) | IP-rated switchgear, sealed cabinets, dust filters |
| **Terrain Slope** | Max 9.2% N-S | Foundation design consideration |
| **Distance from Coast** | ≥10 km (≈400 km inland) | Standard corrosion protection adequate |

**Question for Linyang:**
1. What is the PCS power derating at 45°C ambient and 916 m altitude? Please confirm the continuous output at these conditions.
2. What IP rating is provided for the PCS skid and battery containers? Is heavy pollution / dust environment covered by standard design?
3. Are additional HVAC upgrades or dust filtration options required for this environment?

---

## 5. Quotation Request — Two Scenarios

We request CIF pricing for **two scenarios** to allow the client to choose:

### Scenario A: Grid Following Only

| Item | Specification |
|------|--------------|
| Battery containers | 12 MW / 48 MWh (standard Linyang LFP containers) |
| PCS / Inverters | Grid Following — standard Kehua PCS |
| MV Transformer | 0.63/33 kV, Dyn11, ONAN |
| MV Switchgear | Rated ≥ 4.55 kA |
| Containerised PCS skid(s) | Per Linyang standard configuration |

### Scenario B: Grid Forming (150% Overload for 10 seconds)

| Item | Specification |
|------|--------------|
| Battery containers | 12 MW / 48 MWh (standard Linyang LFP containers) |
| PCS / Inverters | **Grid Forming — 150% overload (18 MW) for 10 seconds** |
| MV Transformer | 0.63/33 kV, Dyn11, ONAN — sized for overload |
| MV Switchgear | Rated ≥ 4.55 kA |
| Containerised PCS skid(s) | Per Linyang configuration for grid forming |

**For each scenario, please provide:**

1. **CIF price (Cape Town, South Africa)** — itemised:
   - Battery containers (total)
   - PCS / inverters (total)
   - MV transformer
   - MV switchgear
   - Containerised PCS skid(s)
   - Cabling / accessories
   - Freight (Shanghai → Cape Town)
2. **Container count** and individual container capacity (MWh)
3. **PCS model and quantity** (which Kehua model?)
4. **Skid configuration** (T1/T2/T4/T8?)
5. **Total shipping weight and dimensions** (for transport planning)
6. **Production lead time** from order confirmation
7. **Shipping time** (Shanghai → Cape Town)

---

## 6. Delivery & Timeline

| Parameter | Value |
|-----------|-------|
| **Incoterms** | **CIF Cape Town, South Africa** |
| **Target Delivery** | **August 2026 (Q3)** |
| **Port of Discharge** | Cape Town |

**Question for Linyang:** Given the August 2026 target, what is the latest date a production order must be placed? Please confirm production lead time (90 days per Cyprus standard?) and shipping duration to Cape Town.

---

## 7. Warranty & Support

| Parameter | Request |
|-----------|---------|
| **Base Warranty** | 5 years (per Linyang standard) |
| **Extended Warranty** | Please quote Yr 6-10 and Yr 11-15 rates (per MWh, consistent with Cyprus portfolio pricing) |
| **SOH Guarantees** | Please confirm SOH curve applies (85% @ Yr 5, ~80% @ Yr 10, 70% @ Yr 15) |
| **Cycle Life** | 7,000 cycles at 70% EOL DoD |

---

## 8. Scope Clarification

### Included in Linyang CIF scope (please confirm):
- Battery containers (fully assembled, tested)
- PCS / storage inverters
- MV transformer (LV/MV step-up)
- MV switchgear
- Containerised PCS skid(s)
- Internal cabling and accessories
- Marine freight (Shanghai → Cape Town)
- Marine cargo insurance

### NOT included (Lighthief scope):
- HV transformer (33/132 kV) — TBC
- 132 kV switchgear and interconnection
- Civil works, foundations, fencing
- EMS / SCADA (Lighthief / Voltus)
- IEC 60870-5-101 gateway
- IEC 61000-4-30 Class A PQ monitoring
- Commissioning and grid code compliance testing
- Local installation labour in South Africa

---

## 9. Commercial Terms

| Parameter | Request |
|-----------|---------|
| **Payment Terms** | Please propose (reference: Cyprus portfolio is 20/50/20/10) |
| **Quotation Validity** | Minimum 60 days |
| **Currency** | EUR or USD — please specify |
| **Performance Bond** | Required? Same terms as Cyprus (5% bank guarantee)? |

---

## 10. Documentation Required with Quotation

Please provide with your quotation:
1. Itemised CIF pricing (both scenarios)
2. PCS datasheet for the proposed model (with derating curves for 45°C / 916 m)
3. Battery container datasheet (capacity, dimensions, weight, IP rating)
4. Preliminary GA drawing / container layout for 12 MW / 48 MWh
5. SA grid code compliance confirmation or gap analysis
6. Production and shipping timeline

---

**Response requested by: 24 March 2026**

This is a time-sensitive opportunity — the client has received Eskom grid connection approval and needs our EPC proposal promptly.

Thank you, Kamil. Please let me know if you need any additional information.

Best regards,

**Alexander Papacosta**
Lighthief Cyprus Ltd
