# Cyprus MMS Market Participant Interfaces - Development Guide

> **Source Document**: Market Participant Interfaces Technical Description V1.3 (May 2023)
> **Issued by**: TSOC (Transmission System Operator Cyprus)
> **Purpose**: Maps the official MMS interface specification to GridMind development requirements
> **Last Updated**: 2026-02-10

---

## 1. OVERVIEW

### 1.1 Cyprus Electricity Market Structure

The Cyprus electricity market is a **Net Pool market** managed by TSOC, operating through the
**Market Management System (MMS)**. The market comprises:

| Market | Description | Resolution | Gate Closure |
|--------|-------------|------------|--------------|
| **Forward Market (FM)** | Bilateral OTC contracts, nominations | 30-min (PT30M) | D-1 09:00 EET |
| **Day-Ahead Market (DAM)** | Centralized energy auction | 30-min (PT30M) | Per gate schedule |
| **Balancing Market (BM/ISP)** | Integrated Scheduling Process | 30-min (PT30M) | Per BEO gate |
| **Real-Time Balancing (RTBM)** | Real-time dispatch and balancing | 5-min (PT5M) | Real-time |

### 1.2 Communication Protocol

**All MMS communication uses ENTSO-E CIM XML documents over HTTPS.**

| Aspect | Specification |
|--------|---------------|
| **Protocol** | SOAP over HTTPS |
| **Authentication** | WS-Security (UsernameToken) |
| **Document Format** | ENTSO-E CIM XML (IEC 62325-451) |
| **Validation** | XSD schema validation + business rule validation |
| **Time Zone** | EET (Eastern European Time) for trading days, UTC in XML |
| **Time Format** | `YYYY-MM-DDTHH:MM:SSZ` (UTC) |

### 1.3 Participant Identification

| Entity | Role Code | Description |
|--------|-----------|-------------|
| **TSOC** | A04 (System Operator) / A11 (Market Operator) | Receiver for all input files |
| **Producer** | A21 | Generation resource owner |
| **Consumer** | A13 | Load resource owner |
| **Resource Provider** | A27 | Generic market participant |
| **Trade Responsible Party** | A01 | OTC/bilateral trader |
| **Imbalance Settlement Responsible** | A05 | Settlement entity |
| **Balance Responsible Party** | A08 | Balancing responsible |

All participants and resources are identified by **EIC codes** (Energy Identification Codes).

### 1.4 CIM Document Types (XSD Schemas)

| XSD | IEC Standard | Used For |
|-----|-------------|----------|
| `iec62325-451-2-schedule_v5_1.xsd` | Schedule Market Document | NAD, PDN/PON, FCN, RR Nominations, Market Schedules, Dispatch Instructions |
| `iec62325-451-7-reservebiddocument_v7_1.xsd` | Reserve Bid Document | DAM Offers/Bids, BEO, RCO, RR/BS/CR Bids |
| `iec62325-451-4-settlement_v4_0.xsd` | Energy Account Document | MCP, Cleared Volumes, Reserve Awards, Settlement Statements |
| `iec62325-451-3-auctionspecification_v7_1.xsd` | Auction Specification | RR/BS/CR Auction Specifications |
| `iec62325-451-1-acknowledgement_v7_0.xsd` | Acknowledgement | Validation responses for all input files |
| `participant-techno-economic-declaration-v2r1.xsd` | Custom (ENTSO-E like) | Techno-Economic Declarations |
| `iec62325-451-2-anomaly_v5_0.xsd` | Anomaly Document | FCN mismatch anomalies |
| `iec62325-451-2-confirmation_v5_01.xsd` | Confirmation Document | FCN final confirmations |

Common shared XSDs:
- `urn-entsoe-eu-wgedi-codelists.xsd`
- `urn-entsoe-eu-wgedi-components.xsd`
- `urn-entsoe-eu-local-extension-types.xsd`

---

## 2. INPUT INTERFACES (GridMind → MMS)

### 2.1 Non-Availability Declaration (NAD)

**Relevance for BESS**: Declare planned outages or partial unavailability.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-2-schedule_v5_1.xsd` |
| **Message Type** | Generation availability schedule (A28) |
| **Process Type** | Long term (A12) |
| **Sender Role** | Producer (A21) |
| **Receiver Role** | System Operator (A04) or Market Operator (A11) |
| **Resolution** | PT30M |
| **Business Types** | Z01 (Partial), Z02 (Total), Z03 (Cancellation) |
| **Curve Type** | Variable sized Block (A03) |
| **Gate Rule** | Must be ≥30 minutes in the future |

**Key Validation Rules:**
- Resource must be the sender's resource (EIC match)
- Quantity = available capacity (MW) for partial; 0 for total/cancellation
- Reason code required (except cancellation): B18 (Failure), B19 (Maintenance), B20 (Shutdown)
- Only one position per time interval

### 2.2 Techno-Economic Declaration (TED)

**Relevance for BESS**: Declare operating costs for variable cost calculations.

| Field | Value |
|-------|-------|
| **XSD** | `participant-techno-economic-declaration-v2r1.xsd` (custom) |
| **Message Type** | Z01 |
| **Sender Role** | Producer (A21) |
| **Gate Closure** | D-1 16:00 EET |
| **Content** | Fuel costs, start-up costs, CO2 costs, variable cost blocks (max 10) |

**Key Validation Rules:**
- Message interval must be a full EET day
- Resource must be generating unit, dispatchable RES >1MW, CCGT config, or dispatchable load
- Variable cost blocks contain: net generation level (MW), fuel composition, raw material/maintenance/labour costs (EUR/MWh)

### 2.3 DAM Energy Offers and Bids

**Relevance for BESS**: Primary revenue source - submit energy offers/bids to the Day-Ahead Market.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-7-reservebiddocument_v7_1.xsd` |
| **Message Type** | DAM bid document (Z02) |
| **Process Type** | Day Ahead (A01) |
| **Sender Role** | Resource Provider (A27) |
| **Receiver Role** | Market Operator (A11) |
| **Resolution** | PT30M (48 periods per day) |
| **Currency** | EUR |
| **Price Unit** | EUR/MWh (2 decimal precision) |
| **Quantity Unit** | MWh (3 decimal precision) |

**Order Types:**

| Type | Code | Direction | Description |
|------|------|-----------|-------------|
| Simple Offer (SO) | Z04 | Up (A01) | Half-hourly energy sell offer, 1-10 priority steps |
| Block Offer (BO) | Z05 | Up (A01) | Multi-period energy sell offer, min acceptance ratio |
| Simple Bid (SB) | Z06 | Down (A02) | Half-hourly energy buy bid, 1-10 priority steps |

**Key Validation Rules:**
- All offers/bids are divisible (A01)
- Simple offers: stepwise non-decreasing prices
- Simple bids: stepwise non-increasing prices
- Max 10 priority steps per resource/direction
- Max 10 block offers per resource per trading day
- Block offers can be linked (father-son-grandson, max 3 levels)
- Prices must be positive, ≤ Energy Offer Cap (standing data)
- Dominant participants: prices ≥ Minimum Variable Cost
- Volume constrained by DAM Margin
- Non-priced offers allowed for units in commissioning/test

### 2.4 Physical Offtake/Delivery Nominations (PON/PDN)

**Relevance for BESS**: Nominate planned physical delivery (discharge) or offtake (charge).

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-2-schedule_v5_1.xsd` |
| **Message Type** | Resource Schedule (A14) |
| **Process Type** | Forward Market (Z01) |
| **Resolution** | PT30M |
| **Gate Closure** | D-1 09:00 EET (initial), D-1 09:15-10:00 EET (final) |

**Business Types:**
- Production (A01) for PDN - Sender Role: Producer (A21)
- Consumption (A04) for PON - Sender Role: Consumer (A13)

**Key Validation Rules:**
- PDN quantity cannot exceed available capacity minus nominated RR
- Cannot modify past data
- Message interval must be full EET day

### 2.5 Forward Contract Nominations (FCN)

**Relevance for BESS**: Nominate bilateral OTC contract schedules.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-2-schedule_v5_1.xsd` |
| **Message Type** | Forward Contract Nomination (Z03) |
| **Sender Role** | Trade responsible party (A01) |
| **Gate Closure** | D-1 09:00 EET |
| **Business Type** | Internal inter area trade (A30) |

**Key Validation Rules:**
- Sender must be either inParty or outParty
- Counter-party matching: CP Missing → Mismatch → Match
- Wholesale supplier NDP must not be positive
- Bilateral contract ID (marketAgreement.mRID) required
- Max 2 schedules per bilateral contract ID

### 2.6 Bids for RR, BS, and CR

**Relevance for BESS**: Participate in long-term reserve auctions.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-7-reservebiddocument_v7_1.xsd` |
| **Message Type** | Bid document (A24) |
| **Process Type** | Long Term (A12) |
| **Sender Role** | Resource Provider (A27) |

| Reserve Product | Code | Resolution | Auction Period | Divisible |
|----------------|------|------------|----------------|-----------|
| Replacement Reserve (RR) | A98 | PT30M | Monthly | Yes (A01) |
| Contingency Reserve (CR) | B55 | P1Y | Yearly | Yes (A01) |
| Black Start (BS) | Z07 | P1Y | Yearly | No (A02) |

**Key Validation Rules:**
- RR: 1-10 priority blocks, Up/Down direction, capacity in MAW, price in EUR/MAW
- CR: Priority=1 only, Up only, quantity=0 (MMS calculates)
- BS: Priority=1 only, Up only, quantity=0, unit must have BS capability
- RR price ≤ RR Offer Cap; CR price ≤ CR Offer Cap; BS price ≤ BS Offer Cap

### 2.7 Balancing Energy Offers (BEO)

**Relevance for BESS**: Primary balancing market participation - offer energy deviations from market schedule.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-7-reservebiddocument_v7_1.xsd` |
| **Message Type** | Reserve tender document (A37) |
| **Process Type** | Redispatch Process (A41) |
| **Business Type** | Control area balance energy (A86) |
| **Resolution** | PT30M (48 periods per day) |
| **Priority** | 1-10 steps per resource/direction |

**Key Validation Rules:**
- Up direction: ascending prices between priority steps
- Down direction: descending prices with ascending priority
- Prices in EUR/MWh (2 decimals), quantities in MWh (3 decimals)
- UP prices: between max(MVC, BEO_MIN_UP) and BEO_CAP_UP
- DOWN prices: between BEOLL and min(MVC, BEO_CAP_UP) for gen units
- Sum of UP quantities = Available Capacity - Market Schedule (for gen units)
- Sum of DOWN quantities = Market Schedule (for gen units)
- Technical minimum constraints apply

### 2.8 Balancing Reserve Capacity Offers (RCO)

**Relevance for BESS**: Offer reserve capacity for FCR, aFRR, mFRR in the ISP.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-7-reservebiddocument_v7_1.xsd` |
| **Message Type** | Proposed capacity (A32) |
| **Resolution** | PT30M |
| **Priority** | 1 only (single offer per resource/direction/commodity) |

| Process Type | Business Type | Product |
|-------------|---------------|---------|
| Frequency containment reserve (A52) | FCR (A95) | Capacity in MAW |
| Automatic frequency restoration reserve (A51) | aFRR (A96) | Capacity in MAW |
| Manual frequency restoration reserve (A47) | mFRR (A97) | Capacity in MAW |

**Key Validation Rules:**
- Resource must have corresponding capability flag in standing data
- Producer/RES: quantity=0, MMS replaces with standing data max capability
- Load units: quantity must be >0 and ≤ declared capability
- Price must be >0 and < administratively defined Reserve Offer Cap
- Direction: Up (A01) or Down (A02)

### 2.9 RES Injection Forecast

**Relevance for BESS**: Submit RES generation forecasts for co-located solar/wind.

| Field | Value |
|-------|-------|
| **XSD** | `iec62325-451-2-schedule_v5_1.xsd` |
| **Message Type** | Wind/solar/DER forecast (A69) |
| **Business Type** | Wind/Solar/DER generation (A93) |
| **Resolution** | PT30M |
| **Gate Closure** | D-1 11:00 EET |
| **Unit** | MAW (MW) |

### 2.10 DAM Margin (SOAP Web Service)

**Relevance for BESS**: Query available DAM margin before submitting offers.

| Field | Value |
|-------|-------|
| **Protocol** | SOAP web service |
| **Authentication** | WS-Security UsernameToken |
| **Namespace** | `http://tsoc.etse.com/DAMMarginDerivationDataService` |
| **Operation** | `processDAMMarginData` |
| **Parameters** | period (start/end), marketParty, resourceObject, initial (boolean) |

**Response**: XML with DAM Margin values per resource per 30-min interval.

---

## 3. OUTPUT INTERFACES (MMS → GridMind)

### 3.1 Forward Market Outputs

| Interface | Doc Type | XSD | Description |
|-----------|----------|-----|-------------|
| Net Delivery Position | Z04 | schedule_v5_1 | Participant's NDP per 30-min period |
| FM Mismatch Quantity | Z05 | settlement_v4_0 | Mismatch between PDN/PON and FCN |
| Auction Specs (RR/BS/CR) | A51 | auctionspecification_v7_1 | Auction parameters and requirements |
| Awarded Bids (RR/BS/CR) | A38 | settlement_v4_0 | Awarded capacity and marginal price |
| Acknowledgements | - | acknowledgement_v7_0 | Validation results for all input files |
| FCN Anomaly | - | anomaly_v5_0 | Counter-party schedule mismatches |
| FCN Confirmation | A08 | confirmation_v5_01 | Final scheduled quantities |

### 3.2 Day-Ahead Market Outputs

| Interface | Doc Type | XSD | Description |
|-----------|----------|-----|-------------|
| Forecasted MCP | Z06 | settlement_v4_0 | Forecasted market clearing prices (published 10:00 daily) |
| Market Clearing Prices | A44 | settlement_v4_0 | Final MCPs per 30-min period |
| Cleared Energy Volumes | Z07 | settlement_v4_0 | Awarded price/quantity per resource per 30-min |
| Market Schedules | A09 | schedule_v5_1 | Sum of PDN/PON + DAM cleared quantities |

### 3.3 Balancing Market Outputs

| Interface | Doc Type | Resolution | Description |
|-----------|----------|------------|-------------|
| Commitment Schedules | Z09 | PT30M | Boolean committed/not-committed per resource |
| Reserve Awards | A38 | PT30M | FCR/aFRR/mFRR awarded capacity and price |
| Marginal Reserve Prices | A44 | PT30M | Public marginal prices per reserve type |
| Indicative Dispatch Schedules | Z10 | PT30M | Indicative energy schedule from ISP |
| Planned BEO Activation | A83 | PT30M | Indicative activation quantities and prices |
| Planned Marginal BE Prices | A44 | PT30M | Indicative marginal balancing energy prices |
| Prospective Payments | Z13 | PT30M | Start-up costs (Z14) and BEO acceptance (Z15) |
| **BEO Awards** | **A83** | **PT5M** | **Final activation quantities (RTBM)** |
| **Marginal BE Prices** | **A44** | **PT5M** | **Final marginal balancing energy prices (RTBM)** |
| **Dispatch Instructions** | **Z14** | **PT5M** | **Real-time dispatch commands** |

### 3.4 Dispatch Instructions (Z14) - CRITICAL FOR BESS

The Dispatch Instruction is the **most critical output interface for BESS operation**. It contains real-time 5-minute dispatch commands with the following business types:

| Business Type | Code | Unit | Description |
|--------------|------|------|-------------|
| Start-up Instruction | Z16 | Boolean | Start the unit |
| Shutdown Instruction | Z17 | Boolean | Shut down the unit |
| Ramp Rate Instruction | Z18 | MAW | Ramp rate in MW |
| Unit on AGC | Z19 | Boolean | Unit under AGC control |
| Min run time >10min | Z20 | Boolean | Minimum run time flag |
| Partially available | Z21 | Boolean | Resource partially available |
| Unavailable for dispatch | Z22 | Boolean | Resource unavailable |
| Already dispatched | Z23 | Boolean | Already dispatched flag |
| **Awarded FCR Up** | **Z24** | **MAW** | **FCR capacity awarded upward** |
| **Awarded FCR Down** | **Z25** | **MAW** | **FCR capacity awarded downward** |
| **Awarded aFRR Up** | **Z26** | **MAW** | **aFRR capacity awarded upward** |
| **Awarded aFRR Down** | **Z27** | **MAW** | **aFRR capacity awarded downward** |
| **Awarded mFRR Up** | **Z28** | **MAW** | **mFRR capacity awarded upward** |
| **Awarded mFRR Down** | **Z29** | **MAW** | **mFRR capacity awarded downward** |
| **Awarded RR Up** | **Z30** | **MAW** | **RR capacity awarded upward** |
| **Awarded RR Down** | **Z31** | **MAW** | **RR capacity awarded downward** |
| **Dispatch MW Gross** | **Z32** | **MAW** | **Gross dispatch setpoint** |
| **Dispatch MW Net** | **Z33** | **MAW** | **Net dispatch setpoint** |

**GridMind MUST parse and act on Z32/Z33 (Dispatch MW Gross/Net) as the primary power setpoint, and Z24-Z31 for reserve capacity allocation.**

### 3.5 Settlement Outputs

#### Statement Types (per Settlement Day)

| Type | Code | Description |
|------|------|-------------|
| DAM Statement | Z20 | Day-ahead energy revenue/cost (DAER, DAEP) |
| IMB Statement | Z21 | Imbalance charges (instructed/uninstructed quantities, BEO activations) |
| ANS Statement | Z22 | Ancillary services (FCR/aFRR/mFRR/RR capacity, RMGC, start-up costs) |
| UPL Statement | Z25 | Uplift charges |
| NOC Statement | Z26 | Non-compliance charges (energy offers, AS, nominations, dispatch) |
| REC Statement | Z27 | Reconciliation (metering differences) |
| AGG Statement | Z28 | Aggregate settlement (difference from previous settlement) |

#### Notice Types (per Billing Month)

| Type | Code | Description |
|------|------|-------------|
| DAM Notice | Z30 | Monthly DAM energy revenue/cost summary |
| IMB Notice | Z31 | Monthly imbalance charges |
| ANS Notice | Z32 | Monthly ancillary services revenue |
| TUS Notice | Z33 | Transmission use of system charges |
| DUS Notice | Z34 | Distribution use of system charges |
| UPL Notice | Z35 | Monthly uplift charges |
| NOC Notice | Z36 | Monthly non-compliance charges |
| REC Notice | Z37 | Monthly reconciliation |
| AGG Notice | Z38 | Aggregate billing notice |

---

## 4. GATE CLOSURE SCHEDULE

| Interface | Gate Closure | Notes |
|-----------|-------------|-------|
| Techno-Economic Declaration | D-1 16:00 EET | Full EET day |
| Physical Delivery/Offtake Nominations | D-1 09:00 EET (initial) | D-1 09:15-10:00 EET (final) |
| Forward Contract Nominations | D-1 09:00 EET | Full EET day |
| RES Injection Forecast | D-1 11:00 EET | Full EET day |
| DAM Offers/Bids | Per DAM gate schedule | Full EET day |
| RR Nominations | D-1 09:00 EET | After RR auction results (5 business days) |
| RR/BS/CR Bids | Per auction gate | Varies by auction type |
| Balancing Energy Offers | Per BEO gate schedule | Full EET day |
| Reserve Capacity Offers | Per RCO gate schedule | Full EET day |
| Non-Availability Declaration | ≥30 min before execution | Any future period |

---

## 5. DEVELOPMENT IMPLICATIONS FOR GRIDMIND

### 5.1 Required New Components

| Component | Priority | Description |
|-----------|----------|-------------|
| **CIM XML Builder** | Critical | Generate ENTSO-E CIM XML documents for all input interfaces |
| **CIM XML Parser** | Critical | Parse all MMS output XML documents |
| **XSD Validator** | Critical | Validate XML against IEC 62325-451 XSD schemas |
| **SOAP Client** | Critical | HTTPS SOAP client with WS-Security authentication |
| **MMS Market Connector** | Critical | Replace/augment HEnEx connector with direct MMS integration |
| **Dispatch Instruction Handler** | Critical | Parse Z14 dispatch instructions, translate to PCS setpoints |
| **DAM Offer Generator** | High | Generate stepwise energy offers/bids from optimization |
| **BEO Generator** | High | Generate balancing energy offers from available capacity |
| **RCO Generator** | High | Generate reserve capacity offers (FCR/aFRR/mFRR) |
| **Settlement Parser** | Medium | Parse settlement statements for revenue tracking |
| **Acknowledgement Handler** | High | Process validation responses, retry logic |
| **Gate Closure Scheduler** | High | Automated submission timing per gate schedule |

### 5.2 Architecture Changes

```
Current Architecture:
  Trading Engine → REST API → Market Exchange (HEnEx/EPEX)

Required Architecture:
  Trading Engine → CIM XML Builder → SOAP Client → MMS (TSOC)
                                                         ↓
  EMS Core ← Dispatch Handler ← CIM XML Parser ← MMS Output Files
                                                         ↓
  Settlement Module ← Statement Parser ← Settlement Files
```

### 5.3 Data Model Changes

The current `Trade` database model needs additional fields:

| New Field | Type | Description |
|-----------|------|-------------|
| `mms_message_id` | String | MMS message mRID for tracking |
| `mms_revision` | Integer | Message revision number |
| `mms_document_type` | String | CIM document type code (A28, Z02, A37, etc.) |
| `mms_business_type` | String | CIM business type code (Z04, Z05, Z06, A86, etc.) |
| `resource_eic` | String | Resource Object EIC code |
| `participant_eic` | String | Market participant EIC code |
| `trading_period_start` | DateTime | 30-min or 5-min period start (UTC) |
| `trading_period_end` | DateTime | Period end (UTC) |
| `priority_step` | Integer | Priority/step index (1-10) |
| `flow_direction` | String | A01 (Up/Sell) or A02 (Down/Buy) |

### 5.4 Configuration Requirements

The Cyprus market config needs:

| Parameter | Value | Source |
|-----------|-------|--------|
| `tsoc_eic_code` | (from TSOC registration) | Standing Data |
| `participant_eic_code` | (from TSOC registration) | Standing Data |
| `resource_eic_codes` | (per BESS unit) | Standing Data |
| `cyprus_control_area_eic` | (from TSOC) | Standing Data |
| `mms_soap_endpoint` | (from TSOC) | Integration |
| `dam_energy_offer_cap` | EUR/MWh | Standing Data |
| `beo_cap_up` | EUR/MWh | Standing Data |
| `beo_min_up` | EUR/MWh | Standing Data |
| `reserve_offer_caps` | Per reserve type | Standing Data |

---

## 6. REVENUE STREAMS FOR BESS

Based on the MMS interfaces, BESS can participate in:

| Revenue Stream | Interface | Estimated Priority |
|---------------|-----------|-------------------|
| **DAM Energy Arbitrage** | DAM Offers/Bids (Z02) | Highest |
| **FCR Capacity** | Reserve Capacity Offers (A32/A52) | High |
| **aFRR Capacity** | Reserve Capacity Offers (A32/A51) | High |
| **mFRR Capacity** | Reserve Capacity Offers (A32/A47) | High |
| **Balancing Energy** | BEO (A37/A41) | High |
| **RR Capacity** | RR Bids (A24/A98) | Medium |
| **OTC Bilateral** | Forward Contract Nominations (Z03) | Medium |
| **Non-Compliance Avoidance** | Accurate dispatch following | Critical |

---

## 7. GLOSSARY OF MMS CODES

### Message Type Codes
| Code | Description |
|------|-------------|
| A14 | Resource Schedule |
| A24 | Bid document |
| A28 | Generation availability schedule |
| A32 | Proposed capacity |
| A37 | Reserve tender document |
| A38 | Reserve Allocation Result |
| A44 | Price Document |
| A51 | Capacity Auction Specification |
| A69 | Wind/solar/DER forecast |
| A83 | Activated balancing quantities |
| Z01 | Techno-Economic Declaration |
| Z02 | DAM bid document |
| Z03 | Forward Contract Nomination |
| Z04 | Net Delivery Position |
| Z05 | Participant Mismatch Quantity |
| Z06 | Forecasted MCP |
| Z07 | Cleared Energy Volumes and Prices |
| Z09 | Commitment Schedule |
| Z10 | Indicative Dispatch Schedule |
| Z13 | Prospective Payment |
| Z14 | Dispatch Instruction |

### Business Type Codes
| Code | Description |
|------|-------------|
| A01 | Production |
| A04 | Consumption |
| A30 | Internal inter area trade |
| A62 | Spot price |
| A86 | Control area balance energy |
| A93 | Wind/Solar/DER generation |
| A95 | Frequency containment reserve (FCR) |
| A96 | Automatic frequency restoration reserve (aFRR) |
| A97 | Manual frequency restoration reserve (mFRR) |
| A98 | Replacement reserve (RR) |
| B55 | Contingency reserve (CR) |
| Z01 | Partial unavailability |
| Z02 | Total unavailability |
| Z03 | Unavailability cancellation |
| Z04 | Simple Offer (DAM) |
| Z05 | Block Offer (DAM) |
| Z06 | Simple Bid (DAM) |
| Z07 | Black Start (BS) |
| Z08 | Net Delivery Position |
| Z10 | DAM Cleared Energy Volumes |
| Z16-Z33 | Dispatch instruction types (see Section 3.4) |

### Process Type Codes
| Code | Description |
|------|-------------|
| A01 | Day Ahead |
| A04 | System Operation Closure |
| A12 | Long Term |
| A34 | Contracted |
| A41 | Redispatch Process (Energy Offer) |
| A47 | Manual frequency restoration reserve |
| A51 | Automatic frequency restoration reserve |
| A52 | Frequency containment reserve |
| Z01 | Forward Market |
| Z02 | Settlement |
| Z03 | Billing |

### Role Codes
| Code | Description |
|------|-------------|
| A01 | Trade responsible party |
| A04 | System operator |
| A05 | Imbalance settlement responsible |
| A08 | Balance responsible party |
| A11 | Market operator |
| A13 | Consumer |
| A21 | Producer |
| A27 | Resource Provider |

---

## 8. REVISION HISTORY

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.0 | Initial creation from MMS V1.3 analysis |
