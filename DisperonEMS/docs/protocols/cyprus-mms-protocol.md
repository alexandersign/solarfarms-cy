# Cyprus MMS Protocol Implementation Guide

> **Source**: Market Participant Interfaces Technical Description V1.3 (TSOC, May 2023)
> **Purpose**: Technical protocol details for implementing the MMS SOAP/CIM XML integration
> **Last Updated**: 2026-02-10

---

## 1. PROTOCOL OVERVIEW

### 1.1 Communication Stack

```
┌─────────────────────────────────────────────┐
│          Application Layer                   │
│  ENTSO-E CIM XML Documents (IEC 62325-451)  │
├─────────────────────────────────────────────┤
│          Service Layer                       │
│  SOAP 1.1 with WS-Security                  │
├─────────────────────────────────────────────┤
│          Transport Layer                     │
│  HTTPS (TLS 1.2+)                           │
├─────────────────────────────────────────────┤
│          Authentication                      │
│  WS-Security UsernameToken                   │
└─────────────────────────────────────────────┘
```

### 1.2 Data Submission Methods

The MMS accepts data through three methods:

1. **MMS GUI Upload**: User uploads XML file via HTTPS web interface
2. **SOAP Web Service**: System-to-system XML submission via SOAP over HTTPS
3. **MMS GUI Manual Entry**: User enters data in web forms

**GridMind will use method 2 (SOAP Web Service) for automated trading.**

---

## 2. SOAP ENVELOPE STRUCTURE

### 2.1 Request Template (Input File Submission)

```xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
  <soapenv:Header>
    <wsse:Security>
      <wsse:UsernameToken>
        <wsse:Username>{MMS_USERNAME}</wsse:Username>
        <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">{MMS_PASSWORD}</wsse:Password>
      </wsse:UsernameToken>
    </wsse:Security>
  </soapenv:Header>
  <soapenv:Body>
    {CIM_XML_DOCUMENT}
  </soapenv:Body>
</soapenv:Envelope>
```

### 2.2 DAM Margin Query (SOAP Web Service)

```xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:dam="http://tsoc.etse.com/DAMMarginDerivationDataService"
    xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
  <soapenv:Header>
    <wsse:Security>
      <wsse:UsernameToken>
        <wsse:Username>{USERNAME}</wsse:Username>
        <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">{PASSWORD}</wsse:Password>
      </wsse:UsernameToken>
    </wsse:Security>
  </soapenv:Header>
  <soapenv:Body>
    <dam:processDAMMarginData>
      <arg0>
        <period>
          <start>2026-02-09T22:00:00.000Z</start>
          <end>2026-02-10T22:00:00.000Z</end>
        </period>
        <marketParty>{PARTICIPANT_EIC}</marketParty>
        <resourceObject>{RESOURCE_EIC_OR_EMPTY}</resourceObject>
        <initial>false</initial>
      </arg0>
    </dam:processDAMMarginData>
  </soapenv:Body>
</soapenv:Envelope>
```

### 2.3 DAM Margin Response

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns2:processDAMMarginDataResponse
        xmlns:ns2="http://tsoc.etse.com/DAMMarginDerivationDataService">
      <return><![CDATA[<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <results>
          <result>
            <endDate>2026-02-09T22:30Z</endDate>
            <marketParty>{PARTICIPANT}</marketParty>
            <resourceObject>{RESOURCE}</resourceObject>
            <startDate>2026-02-09T22:00Z</startDate>
            <value>60.00000</value>
          </result>
          <!-- 48 intervals × N resources -->
        </results>]]>
      </return>
    </ns2:processDAMMarginDataResponse>
  </soap:Body>
</soap:Envelope>
```

---

## 3. CIM XML DOCUMENT TEMPLATES

### 3.1 DAM Simple Energy Offer (Z04)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ReserveBid_MarketDocument
    xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:1">
  <mRID>{UNIQUE_MESSAGE_ID}</mRID>
  <revisionNumber>1</revisionNumber>
  <type>Z02</type>  <!-- DAM bid document -->
  <process.processType>A01</process.processType>  <!-- Day Ahead -->
  <sender_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</sender_MarketParticipant.mRID>
  <sender_MarketParticipant.marketRole.type>A27</sender_MarketParticipant.marketRole.type>
  <receiver_MarketParticipant.mRID codingScheme="A01">{TSOC_EIC}</receiver_MarketParticipant.mRID>
  <receiver_MarketParticipant.marketRole.type>A11</receiver_MarketParticipant.marketRole.type>
  <createdDateTime>{YYYY-MM-DDTHH:MM:SSZ}</createdDateTime>
  <reserveBid_Period.timeInterval>
    <start>{TRADING_DAY_START_UTC}</start>  <!-- e.g., 2026-02-09T22:00Z for EET day 2026-02-10 -->
    <end>{TRADING_DAY_END_UTC}</end>        <!-- e.g., 2026-02-10T22:00Z -->
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">{CYPRUS_CONTROL_AREA_EIC}</domain.mRID>
  <subject_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</subject_MarketParticipant.mRID>
  <subject_MarketParticipant.marketRole.type>A27</subject_MarketParticipant.marketRole.type>

  <!-- Step 1 of Simple Offer -->
  <BidTimeSeries>
    <mRID>{UNIQUE_TS_ID_1}</mRID>
    <auction.mRID>DAM auction</auction.mRID>
    <businessType>Z04</businessType>  <!-- Simple Offer -->
    <acquiring_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</acquiring_Domain.mRID>
    <connecting_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</connecting_Domain.mRID>
    <quantity_Measure_Unit.name>MWH</quantity_Measure_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <price_Measure_Unit.name>MWH</price_Measure_Unit.name>
    <divisible>A01</divisible>
    <priority>1</priority>  <!-- Step index 1-10 -->
    <registeredResource.mRID codingScheme="A01">{RESOURCE_EIC}</registeredResource.mRID>
    <flowDirection.direction>A01</flowDirection.direction>  <!-- Up = Sell -->
    <energyPrice_Measure_Unit.name>MWH</energyPrice_Measure_Unit.name>

    <Period>
      <timeInterval>
        <start>{TRADING_DAY_START_UTC}</start>
        <end>{TRADING_DAY_END_UTC}</end>
      </timeInterval>
      <resolution>PT30M</resolution>
      <!-- 48 points for each half-hour -->
      <Point>
        <position>1</position>
        <quantity.quantity>1.250</quantity.quantity>  <!-- MWh, 3 decimals -->
        <energy_Price.amount>65.50</energy_Price.amount>  <!-- EUR/MWh, 2 decimals -->
      </Point>
      <Point>
        <position>2</position>
        <quantity.quantity>1.250</quantity.quantity>
        <energy_Price.amount>62.00</energy_Price.amount>
      </Point>
      <!-- ... positions 3-48 ... -->
    </Period>
  </BidTimeSeries>

  <!-- Additional steps (priority 2-10) as separate BidTimeSeries -->
</ReserveBid_MarketDocument>
```

### 3.2 Balancing Energy Offer (BEO)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ReserveBid_MarketDocument
    xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:1">
  <mRID>{UNIQUE_MESSAGE_ID}</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A37</type>  <!-- Reserve tender document -->
  <process.processType>A41</process.processType>  <!-- Redispatch Process -->
  <sender_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</sender_MarketParticipant.mRID>
  <sender_MarketParticipant.marketRole.type>A27</sender_MarketParticipant.marketRole.type>
  <receiver_MarketParticipant.mRID codingScheme="A01">{TSOC_EIC}</receiver_MarketParticipant.mRID>
  <receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type>
  <createdDateTime>{YYYY-MM-DDTHH:MM:SSZ}</createdDateTime>
  <reserveBid_Period.timeInterval>
    <start>{TRADING_DAY_START_UTC}</start>
    <end>{TRADING_DAY_END_UTC}</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">{CYPRUS_CONTROL_AREA_EIC}</domain.mRID>
  <subject_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</subject_MarketParticipant.mRID>
  <subject_MarketParticipant.marketRole.type>A27</subject_MarketParticipant.marketRole.type>

  <!-- Upward BEO Step 1 -->
  <BidTimeSeries>
    <mRID>{TS_ID}</mRID>
    <auction.mRID>ISP BEO auction</auction.mRID>
    <businessType>A86</businessType>  <!-- Control area balance energy -->
    <acquiring_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</acquiring_Domain.mRID>
    <connecting_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</connecting_Domain.mRID>
    <quantity_Measure_Unit.name>MWH</quantity_Measure_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <price_Measure_Unit.name>MWH</price_Measure_Unit.name>
    <divisible>A01</divisible>
    <priority>1</priority>
    <registeredResource.mRID codingScheme="A01">{RESOURCE_EIC}</registeredResource.mRID>
    <flowDirection.direction>A01</flowDirection.direction>  <!-- Up -->
    <energyPrice_Measure_Unit.name>MWH</energyPrice_Measure_Unit.name>

    <Period>
      <timeInterval>
        <start>{TRADING_DAY_START_UTC}</start>
        <end>{TRADING_DAY_END_UTC}</end>
      </timeInterval>
      <resolution>PT30M</resolution>
      <!-- 48 points required -->
      <Point>
        <position>1</position>
        <quantity.quantity>0.625</quantity.quantity>
        <energy_Price.amount>80.00</energy_Price.amount>
      </Point>
      <!-- ... positions 2-48 ... -->
    </Period>
  </BidTimeSeries>
</ReserveBid_MarketDocument>
```

### 3.3 Reserve Capacity Offer (FCR)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ReserveBid_MarketDocument
    xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:1">
  <mRID>{UNIQUE_MESSAGE_ID}</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A32</type>  <!-- Proposed capacity -->
  <process.processType>A52</process.processType>  <!-- FCR -->
  <sender_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</sender_MarketParticipant.mRID>
  <sender_MarketParticipant.marketRole.type>A27</sender_MarketParticipant.marketRole.type>
  <receiver_MarketParticipant.mRID codingScheme="A01">{TSOC_EIC}</receiver_MarketParticipant.mRID>
  <receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type>
  <createdDateTime>{YYYY-MM-DDTHH:MM:SSZ}</createdDateTime>
  <reserveBid_Period.timeInterval>
    <start>{TRADING_DAY_START_UTC}</start>
    <end>{TRADING_DAY_END_UTC}</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">{CYPRUS_CONTROL_AREA_EIC}</domain.mRID>
  <subject_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</subject_MarketParticipant.mRID>
  <subject_MarketParticipant.marketRole.type>A27</subject_MarketParticipant.marketRole.type>

  <!-- FCR Up Offer -->
  <BidTimeSeries>
    <mRID>{TS_ID}</mRID>
    <auction.mRID>ISP RCO auction</auction.mRID>
    <businessType>A95</businessType>  <!-- FCR -->
    <acquiring_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</acquiring_Domain.mRID>
    <connecting_Domain.mRID codingScheme="A01">{CYPRUS_EIC}</connecting_Domain.mRID>
    <quantity_Measure_Unit.name>MAW</quantity_Measure_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <price_Measure_Unit.name>MAW</price_Measure_Unit.name>
    <divisible>A01</divisible>
    <priority>1</priority>
    <registeredResource.mRID codingScheme="A01">{RESOURCE_EIC}</registeredResource.mRID>
    <flowDirection.direction>A01</flowDirection.direction>  <!-- Up -->
    <energyPrice_Measure_Unit.name>MAW</energyPrice_Measure_Unit.name>

    <Period>
      <timeInterval>
        <start>{TRADING_DAY_START_UTC}</start>
        <end>{TRADING_DAY_END_UTC}</end>
      </timeInterval>
      <resolution>PT30M</resolution>
      <Point>
        <position>1</position>
        <quantity.quantity>0</quantity.quantity>  <!-- 0 for producer; MMS replaces with standing data -->
        <price.amount>15.50</price.amount>  <!-- EUR/MW capacity price -->
      </Point>
      <!-- ... positions 2-48 ... -->
    </Period>
  </BidTimeSeries>
</ReserveBid_MarketDocument>
```

### 3.4 Non-Availability Declaration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Schedule_MarketDocument
    xmlns="urn:iec62325.351:tc57wg16:451-2:scheduledocument:5:1">
  <mRID>{UNIQUE_MESSAGE_ID}</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A28</type>  <!-- Generation availability schedule -->
  <process.processType>A12</process.processType>  <!-- Long term -->
  <process.classificationType>A01</process.classificationType>  <!-- Exchange -->
  <sender_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</sender_MarketParticipant.mRID>
  <sender_MarketParticipant.marketRole.type>A21</sender_MarketParticipant.marketRole.type>
  <receiver_MarketParticipant.mRID codingScheme="A01">{TSOC_EIC}</receiver_MarketParticipant.mRID>
  <receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type>
  <createdDateTime>{YYYY-MM-DDTHH:MM:SSZ}</createdDateTime>
  <schedule_Time_Period.timeInterval>
    <start>{PERIOD_START_UTC}</start>
    <end>{PERIOD_END_UTC}</end>
  </schedule_Time_Period.timeInterval>
  <domain.mRID codingScheme="A01">{CYPRUS_CONTROL_AREA_EIC}</domain.mRID>

  <TimeSeries>
    <mRID>{TS_ID}</mRID>
    <version>1</version>
    <businessType>Z01</businessType>  <!-- Partial unavailability -->
    <product>8716867000016</product>  <!-- Active power -->
    <objectAggregation>A06</objectAggregation>  <!-- Resource Object -->
    <marketEvaluationPoint.mRID codingScheme="A01">{RESOURCE_EIC}</marketEvaluationPoint.mRID>
    <measurement_Unit.name>MAW</measurement_Unit.name>
    <curveType>A03</curveType>  <!-- Variable sized block -->

    <Period>
      <timeInterval>
        <start>{PERIOD_START_UTC}</start>
        <end>{PERIOD_END_UTC}</end>
      </timeInterval>
      <resolution>PT30M</resolution>
      <Point>
        <position>1</position>
        <quantity>0.800</quantity>  <!-- Available capacity in MW -->
      </Point>
    </Period>

    <Reason>
      <code>B19</code>  <!-- Foreseen Maintenance -->
      <text>Scheduled maintenance window</text>
    </Reason>
  </TimeSeries>
</Schedule_MarketDocument>
```

---

## 4. VALIDATION FLOW

### 4.1 Two-Level Validation

```
XML Submission
      │
      ▼
┌─────────────────┐
│  Level 1: XSD   │  Technical validation (schema compliance)
│  Validation     │  → If fails: file rejected, logged, NO acknowledgement XML
└────────┬────────┘
         │ Pass
         ▼
┌─────────────────┐
│  Level 2:       │  Business validation (gate times, resource ownership,
│  Business Rules │  price limits, volume limits, etc.)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Acknowledgement │  Always generated for Level 2
│  Document       │  Contains: accepted/rejected status with reason codes
└─────────────────┘
```

### 4.2 Common Validation Rules (All Interfaces)

| Rule | Description |
|------|-------------|
| SchemaFormatValidationRule | XML must comply with XSD schema |
| SendingUserRule | User must be linked to the message sender |
| MessageIdentificationVersionRule | New version > previous version for same (mRID, type, sender, interval) |
| SenderRoleRule | Sender role matches expected role for the interface |
| ReceiverIdentificationRule | Receiver is TSOC EIC code |
| ReceiverRoleRule | Receiver role matches expected (A04 or A11) |
| MessageTimeIntervalRule | Interval is a full EET day (for daily interfaces) |
| DomainCyprusRule | Domain is Cyprus Control Area EIC |
| ResourceObjectRule | Resource belongs to sender, has correct type/capabilities |

### 4.3 Acknowledgement Response Structure

```xml
<Acknowledgement_MarketDocument
    xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:7:0">
  <mRID>{ACK_ID}</mRID>
  <createdDateTime>{TIMESTAMP}</createdDateTime>
  <sender_MarketParticipant.mRID codingScheme="A01">{TSOC_EIC}</sender_MarketParticipant.mRID>
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type>
  <receiver_MarketParticipant.mRID codingScheme="A01">{PARTICIPANT_EIC}</receiver_MarketParticipant.mRID>
  <receiver_MarketParticipant.marketRole.type>A27</receiver_MarketParticipant.marketRole.type>
  <receiver_MarketDocument.mRID>{ORIGINAL_MSG_ID}</receiver_MarketDocument.mRID>
  <receiver_MarketDocument.revisionNumber>{ORIGINAL_VERSION}</receiver_MarketDocument.revisionNumber>
  <receiver_MarketDocument.type>{ORIGINAL_TYPE}</receiver_MarketDocument.type>
  <receiver_MarketDocument.createdDateTime>{ORIGINAL_TIMESTAMP}</receiver_MarketDocument.createdDateTime>

  <!-- Reason codes for rejection -->
  <Reason>
    <code>{REASON_CODE}</code>
    <text>{HUMAN_READABLE_DESCRIPTION}</text>
  </Reason>

  <!-- Rejected time series (if partial rejection) -->
  <TimeSeries>
    <mRID>{REJECTED_TS_ID}</mRID>
    <Reason>
      <code>{TS_REASON_CODE}</code>
      <text>{TS_REASON_TEXT}</text>
    </Reason>
  </TimeSeries>
</Acknowledgement_MarketDocument>
```

---

## 5. TIME HANDLING

### 5.1 EET Trading Day Mapping

Cyprus uses EET (Eastern European Time, UTC+2 / EEST UTC+3 in summer).

| Trading Day (EET) | XML Start (UTC) | XML End (UTC) | Periods |
|-------------------|-----------------|---------------|---------|
| Normal day (winter) | D-1 22:00Z | D 22:00Z | 48 × PT30M |
| Normal day (summer) | D-1 21:00Z | D 21:00Z | 48 × PT30M |
| DST transition (spring, 23h) | Varies | Varies | 46 × PT30M |
| DST transition (autumn, 25h) | Varies | Varies | 50 × PT30M |

### 5.2 Position Numbering

- Position 1 = first 30-minute interval of the trading day
- Position 48 = last 30-minute interval
- For RTBM (PT5M): 1 position per 5-minute interval

### 5.3 Message Versioning

- First submission: revisionNumber = 1
- Updated submission: revisionNumber = previous + 1
- MMS checks: new version > previous version for same (mRID, type, sender, interval)
- Time series version follows document version for initial; tracks separately for modifications

---

## 6. IMPLEMENTATION RECOMMENDATIONS

### 6.1 Python Libraries

| Library | Purpose |
|---------|---------|
| `lxml` | XML generation and XSD validation |
| `zeep` | SOAP client with WS-Security support |
| `xmlschema` | XSD schema validation |
| `python-dateutil` | EET/UTC timezone conversion |
| `pytz` / `zoneinfo` | Timezone-aware datetime handling |

### 6.2 Suggested Module Structure

```
cloud/trading/mms/
├── __init__.py
├── client.py              # SOAP client with WS-Security
├── xml_builder.py         # CIM XML document generator
├── xml_parser.py          # CIM XML document parser
├── xsd_validator.py       # XSD schema validation
├── gate_scheduler.py      # Gate closure management
├── ack_handler.py         # Acknowledgement processing
├── documents/
│   ├── __init__.py
│   ├── dam_offer.py       # DAM energy offers/bids (Z02)
│   ├── beo.py             # Balancing energy offers (A37)
│   ├── rco.py             # Reserve capacity offers (A32)
│   ├── nad.py             # Non-availability declarations (A28)
│   ├── ted.py             # Techno-economic declarations (Z01)
│   ├── nominations.py     # PDN/PON/FCN (A14/Z03)
│   ├── reserve_bids.py    # RR/BS/CR bids (A24)
│   └── res_forecast.py    # RES injection forecast (A69)
├── outputs/
│   ├── __init__.py
│   ├── dispatch.py        # Dispatch instructions (Z14) → PCS setpoints
│   ├── market_schedule.py # Market schedules (A09)
│   ├── clearing.py        # MCP, cleared volumes (A44/Z07)
│   ├── reserves.py        # Reserve awards, commitment (A38/Z09)
│   └── settlement.py      # Statement and notice files
└── schemas/
    ├── iec62325-451-1-acknowledgement_v7_0.xsd
    ├── iec62325-451-2-schedule_v5_1.xsd
    ├── iec62325-451-3-auctionspecification_v7_1.xsd
    ├── iec62325-451-4-settlement_v4_0.xsd
    ├── iec62325-451-7-reservebiddocument_v7_1.xsd
    ├── participant-techno-economic-declaration-v2r1.xsd
    ├── urn-entsoe-eu-wgedi-codelists.xsd
    └── urn-entsoe-eu-wgedi-components.xsd
```

### 6.3 Dispatch Instruction → PCS Setpoint Translation

The most critical real-time interface. Flow:

```
MMS Dispatch Instruction (Z14, 5-min)
    │
    ├── Parse Z32 (Dispatch MW Gross) → Primary power setpoint
    ├── Parse Z33 (Dispatch MW Net) → Net power setpoint
    ├── Parse Z24/Z25 (FCR Up/Down) → FCR capacity allocation
    ├── Parse Z26/Z27 (aFRR Up/Down) → aFRR capacity allocation
    ├── Parse Z28/Z29 (mFRR Up/Down) → mFRR capacity allocation
    ├── Parse Z16 (Start-up) → Start BESS
    ├── Parse Z17 (Shutdown) → Stop BESS
    └── Parse Z19 (AGC) → Enable/disable AGC mode
    │
    ▼
EMS Core Control Loop
    │
    ├── Validate against SOC limits
    ├── Apply protection constraints
    ├── Calculate PCS setpoint (kW)
    └── Send to PCS via Modbus TCP
```

---

## 7. REVISION HISTORY

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-10 | 1.0 | Initial creation from MMS V1.3 analysis |
