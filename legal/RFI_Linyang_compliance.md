# REQUEST FOR INFORMATION (RFI)
## Linyang Energy Storage – Cyprus DSO Compliance

**From:** Lighthief Cyprus Ltd
**To:** Jiangsu Linyang Energy Storage Technology Co., Ltd
**Date:** January 2026
**Reference:** LCY-RFI-001
**Subject:** Outstanding Documentation for Cyprus Grid Connection Approval

---

## 1. INTRODUCTION

Dear Linyang Team,

We are preparing for grid connection approval of Linyang Power Atlantic 5MWh BESS systems in Cyprus under the new **Special Development Order 2026 (Gazette No. 5992)**. 

Following our compliance review against EAC (DSO) Technical Requirements, we have identified a small number of outstanding items required to complete our regulatory submission.

We request your urgent response to the following items.

---

## 2. OUTSTANDING ITEMS

### 2.1 Final UL 9540A Report – Container Level

| Item | Requirement |
|------|-------------|
| **Document** | Final UL 9540A Test Report at Container/System Level |
| **Current Status** | Draft version available |
| **Priority** | 🔴 HIGH |
| **Reason** | Cyprus Fire Authority may request final certification |

**Request:** Please provide the final (non-draft) UL 9540A test report for the complete container assembly, or confirm expected date of availability.

---

### 2.2 SCADA Signal Confirmation Matrix

| Item | Requirement |
|------|-------------|
| **Document** | Explicit signal mapping to EAC SCADA requirements |
| **Current Status** | IEC 61850 ICD file provided; explicit matrix needed |
| **Priority** | 🔴 HIGH |
| **Reason** | EAC requires confirmation of all mandatory signals |

**Request:** Please complete and return the following signal confirmation matrix:

#### Telemetry Signals (to EAC SCADA)

| Signal | Description | Unit | Linyang Tag | Confirmed |
|--------|-------------|------|-------------|-----------|
| P | Active Power | kW | | ☐ |
| Q | Reactive Power | kVAr | | ☐ |
| V_L1 | Voltage Phase L1 | V | | ☐ |
| V_L2 | Voltage Phase L2 | V | | ☐ |
| V_L3 | Voltage Phase L3 | V | | ☐ |
| I_L1 | Current Phase L1 | A | | ☐ |
| I_L2 | Current Phase L2 | A | | ☐ |
| I_L3 | Current Phase L3 | A | | ☐ |
| f | Frequency | Hz | | ☐ |
| SOC | State of Charge | % | | ☐ |
| SOH | State of Health | % | | ☐ |

#### Alarm Signals

| Signal | Description | Type | Linyang Tag | Confirmed |
|--------|-------------|------|-------------|-----------|
| ALM_FIRE | Fire Alarm | DI | | ☐ |
| ALM_ISO | Isolation Fault | DI | | ☐ |
| ALM_PCS | PCS Fault | DI | | ☐ |
| ALM_BMS | BMS Fault | DI | | ☐ |
| ALM_TEMP | Over-temperature | DI | | ☐ |

#### Status Signals

| Signal | Description | Type | Linyang Tag | Confirmed |
|--------|-------------|------|-------------|-----------|
| CB_STATUS | Main Breaker Status | DI | | ☐ |
| SYS_MODE | System Mode (Charge/Discharge/Standby) | DI | | ☐ |
| SYS_AVAIL | Availability Status | DI | | ☐ |

#### Remote Commands (from EAC SCADA)

| Command | Description | Type | Linyang Tag | Confirmed |
|---------|-------------|------|-------------|-----------|
| P_SET | Active Power Setpoint | AO | | ☐ |
| Q_SET | Reactive Power Setpoint | AO | | ☐ |
| CMD_START | Remote Start | DO | | ☐ |
| CMD_STOP | Remote Stop | DO | | ☐ |
| CMD_TRIP | Remote Trip | DO | | ☐ |
| ZERO_EXPORT | Enable Zero Export | DO | | ☐ |

---

### 2.3 Grid-Forming Capability Declaration

| Item | Requirement |
|------|-------------|
| **Document** | Declaration of grid-forming/grid-following capabilities |
| **Current Status** | Not yet confirmed |
| **Priority** | 🟡 MEDIUM |
| **Reason** | Future TSO requirements and project differentiation |

**Request:** Please confirm the following for the Power Atlantic PCS system:

| Parameter | Response |
|-----------|----------|
| Grid-forming capable? | ☐ Yes / ☐ No |
| Virtual inertia response time | _______ ms |
| Frequency droop setting range | _______ % |
| Voltage droop setting range | _______ % |
| Black-start capable? | ☐ Yes / ☐ No |
| Island mode capable? | ☐ Yes / ☐ No |

---

### 2.4 Environmental Operating Envelope

| Item | Requirement |
|------|-------------|
| **Document** | Temperature and humidity operating limits with derating |
| **Current Status** | Basic specs provided; derating curves needed |
| **Priority** | 🟡 MEDIUM |
| **Reason** | Cyprus high ambient temperatures (up to 45°C) |

**Request:** Please provide:

| Parameter | Value |
|-----------|-------|
| Maximum ambient temperature (continuous operation) | _______ °C |
| Maximum ambient temperature (with derating) | _______ °C |
| Derating curve (power vs temperature) | ☐ Attach graph |
| Cooling system capacity | 45 kW (confirmed) |
| Humidity operating range | < 95% RH non-condensing (confirmed) |
| Coastal operation suitability (salt spray) | ☐ Confirm distance requirements |

---

### 2.5 SOH Guarantee and Cell Augmentation Commitment (CRITICAL)

| Item | Requirement |
|------|-------------|
| **Document** | Written commitment for SOH warranty reserve and cell augmentation |
| **Current Status** | Not yet formalised |
| **Priority** | 🔴 CRITICAL |
| **Reason** | Required for Tier D LTSA offerings to end clients |

**Background:**
Lighthief is offering Tier D Premium LTSA services that include an SOH (State of Health) Guarantee to end clients. This guarantee is backed by the OEM (Linyang) warranty reserve as stated in our LTSA Section 10.6.

**Request:** Please confirm the following in writing:

#### Cell Augmentation Commitment

| Commitment | Linyang Response |
|------------|------------------|
| If battery SOH falls below the specified degradation curve due to manufacturing factors, Linyang will provide replacement cells at no cost to Lighthief | ☐ Confirmed / ☐ Not Available |
| Replacement cells will be shipped within _____ days of confirmed warranty claim | _______ days |
| Linyang maintains an adequate warranty reserve for Cyprus-deployed systems | ☐ Confirmed |
| The warranty reserve covers cell augmentation for up to _____% capacity restoration | _______% |

#### Degradation Curve Confirmation

| Year | Guaranteed SOH (per Linyang Warranty) | Linyang Confirmation |
|------|---------------------------------------|---------------------|
| Year 1 | 98% | ☐ |
| Year 2 | 96% | ☐ |
| Year 5 | 90% | ☐ |
| Year 10 | 80% | ☐ |
| Year 15 | 70% | ☐ |
| Year 20 | 60% | ☐ |

#### Financial Commitment

| Parameter | Linyang Response |
|-----------|------------------|
| Estimated cost per kWh for replacement cells (for Lighthief planning) | EUR _______ /kWh |
| Maximum warranty reserve per system (5MWh container) | EUR _______ |
| Linyang product liability insurance covers warranty reserve obligations | ☐ Confirmed |

**Why This Matters:**
If Lighthief offers Tier D LTSA services and the batteries degrade prematurely:
1. The Client will claim under the SOH Guarantee (LTSA Section 10);
2. Lighthief must augment the system or pay Liquidated Damages;
3. Lighthief needs certainty that Linyang will supply replacement cells under warranty;
4. Without this commitment, Lighthief cannot offer Tier D services.

**Requested Format:** Please provide a signed letter on Linyang letterhead confirming the above commitments, referencing the Distribution Agreement dated November 28, 2025.

---

## 3. TIMELINE

| Item | Requested Response Date |
|------|-------------------------|
| SCADA Signal Matrix | Within 5 working days |
| Grid-Forming Declaration | Within 5 working days |
| Environmental Envelope | Within 5 working days |
| Final UL 9540A Report | Confirm availability date |
| **SOH Guarantee / Cell Augmentation Letter** | **Within 10 working days (CRITICAL)** |

---

## 4. CONTACT

Please direct responses to:

**Lighthief Cyprus Ltd**
[Contact details]

---

## 5. DOCUMENTS ALREADY RECEIVED (Confirmation)

For the record, we confirm receipt of the following certifications:

| Document | Received |
|----------|----------|
| UN 38.3 (Cell) | ✅ |
| UN 38.3 (Pack) | ✅ |
| UL9540A (Cell) | ✅ |
| UL9540A (Pack - Draft) | ✅ |
| IEC 62619 (Pack) | ✅ |
| IEC 63056 (Pack) | ✅ |
| IEC 62933-5-2 Notification | ✅ |
| EN 62477-1 (PCS) | ✅ |
| IEC 61000 series (EMC) | ✅ |
| EN 60204-1 / ISO 12100 | ✅ |
| UL 60947 (Breakers) | ✅ |
| UL94 (Flammability) | ✅ |
| Harmonic Test Report | ✅ |
| Flicker/DC Injection Report | ✅ |
| IEC 61850 ICD File | ✅ |
| User Manual V2.0 | ✅ |
| Maintenance Manual | ✅ |
| Degradation Curve | ✅ |
| Warranty Terms V2 | ✅ |

Thank you for your prompt attention to these items.

---

**Lighthief Cyprus Ltd**

*RFI Reference: LCY-RFI-001*
*Date: January 2026*

