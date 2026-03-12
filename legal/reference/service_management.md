# BESS SERVICE MANAGEMENT SYSTEM
## Lighthief Cyprus Ltd – Operations Framework

---

## 1. EQUIPMENT REGISTRY

### Active BESS Installations

| Project ID | Client Name | Site Location | Capacity (MWh) | Commissioning Date | Warranty Expiry | LTSA Status | Next Maintenance |
|------------|-------------|---------------|----------------|--------------------|-----------------|--------------|--------------------|
| CY-BESS-001 | [Client A] | [Location] | [●] | [●] | [●] | Active/Pending | [●] |
| CY-BESS-002 | [Client B] | [Location] | [●] | [●] | [●] | Active/Pending | [●] |
| CY-BESS-003 | [Client C] | [Location] | [●] | [●] | [●] | Active/Pending | [●] |

### Equipment Details Template

```
PROJECT ID: CY-BESS-XXX
═══════════════════════════════════════════════════════════════

CLIENT INFORMATION
  Legal Name:           [●]
  Contact Person:       [●]
  Phone:                [●]
  Email:                [●]
  Site Address:         [●]
  GPS Coordinates:      [●]

EQUIPMENT SPECIFICATION
  Battery Manufacturer: Linyang Energy Storage
  Battery Model:        [●]
  Capacity:             [●] MWh
  Power Rating:         [●] MW
  Container Qty:        [●]
  PCS Model:            [●]
  Transformer:          [●] MVA

SERIAL NUMBERS
  Container 1:          [●]
  Container 2:          [●]
  PCS Unit 1:           [●]
  PCS Unit 2:           [●]
  BMS Controller:       [●]

KEY DATES
  Contract Signed:      [●]
  Equipment Delivered:  [●]
  PAC Issued:           [●]
  FAC Issued:           [●]
  Warranty Start:       [●]
  Warranty End:         [●]
  LTSA Start:           [●]
  LTSA End:             [●]

MONITORING ACCESS
  Platform:             [●]
  Login URL:            [●]
  Username:             [●]
  Password:             [Stored securely]

DOCUMENTATION
  ☐ EPC Agreement
  ☐ LTSA Agreement
  ☐ O&M Manual
  ☐ Single Line Diagram
  ☐ As-Built Drawings
  ☐ Commissioning Report
  ☐ PAC Certificate
  ☐ FAC Certificate
  ☐ Warranty Certificate
```

---

## 2. MAINTENANCE SCHEDULE CALENDAR

### Annual Maintenance Planning

| Month | Week | Activity | Projects | Status |
|-------|------|----------|----------|--------|
| **Q1** | | | | |
| January | 1-2 | Q4 Health Check Reports | All | ☐ |
| January | 3-4 | Annual Review Reports | All | ☐ |
| February | 1 | Annual Maintenance | CY-BESS-001 | ☐ |
| February | 2 | Annual Maintenance | CY-BESS-002 | ☐ |
| March | 1 | Q1 Health Check | All | ☐ |
| **Q2** | | | | |
| April | 1-2 | Monthly Reports | All | ☐ |
| May | 1-2 | Monthly Reports | All | ☐ |
| June | 1 | Q2 Health Check | All | ☐ |
| June | 2-4 | Mid-Year Review | All | ☐ |
| **Q3** | | | | |
| July | 1-2 | Monthly Reports | All | ☐ |
| August | 1-2 | Monthly Reports | All | ☐ |
| September | 1 | Q3 Health Check | All | ☐ |
| **Q4** | | | | |
| October | 1-2 | Monthly Reports | All | ☐ |
| November | 1-2 | Monthly Reports | All | ☐ |
| December | 1 | Q4 Health Check | All | ☐ |
| December | 2-4 | Year-End Review Prep | All | ☐ |

### Recurring Task Schedule

| Task | Frequency | Responsible | Due Date Pattern |
|------|-----------|-------------|------------------|
| Performance Data Review | Daily | Monitoring Team | Daily by 09:00 |
| Alert Log Review | Daily | Monitoring Team | Daily by 09:00 |
| Weekly Summary | Weekly | Monitoring Team | Every Monday |
| **Monthly OEM Checks** | Monthly | Monitoring Team | End of each month |
| **Monthly BMS Data Backup** | Monthly | Monitoring Team | End of each month |
| Monthly Performance Report | Monthly | O&M Manager | 10th of following month |
| Quarterly Health Check | Quarterly | Technical Lead | End of Mar/Jun/Sep/Dec |
| Bi-Annual Maintenance Visit 1 | Every 6 months | Service Team | PAC anniversary |
| Bi-Annual Maintenance Visit 2 | Every 6 months | Service Team | PAC + 6 months |
| **Annual Ground Resistance Test** | Annually | Service Team | During maintenance visit |
| Annual Review Report | Annually | O&M Manager | 30 days after anniversary |
| Annual SOH Test (if applicable) | Annually | Technical Lead | 30 days before anniversary |
| Availability Report (Tier C/D) | Annually | O&M Manager | 15 days after year end |
| LTSA Renewal Review | Annually | Commercial Team | 120 days before expiry |
| Insurance Verification | Annually | Admin | January |
| Spare Parts Inventory Review | Quarterly | O&M Manager | End of quarter |

### OEM-Mandated Maintenance Schedule (Linyang)

**Reference:** Linyang Power Atlantic 5MWh Battery Container Maintenance Manual

| Frequency | Required Items | Pass Criteria |
|-----------|----------------|---------------|
| **Initial Grid Connection** | Cable specs, terminals, bolts, gaskets | Per OEM specification |
| **Monthly** | Container condition, BMS data backup, system status | No damage, data saved |
| **Every 6 Months** | Cable shielding, SPD, fuses, full inspection | Secure, no faults |
| **Annually** | Ground resistance, equipotential bonding, cable layout | Ground ≤4Ω |

---

## 3. SERVICE VISIT CHECKLISTS

### Pre-Visit Preparation Checklist

```
PROJECT: ________________     DATE: ________________

PRE-VISIT PREPARATION (Complete 7 days before visit)
═══════════════════════════════════════════════════════════════

☐ Review previous maintenance reports
☐ Check monitoring data for anomalies
☐ Review open issues/punch list items
☐ Confirm visit date with client
☐ Obtain site access authorisation
☐ Prepare required tools and equipment
☐ Prepare spare consumables (filters, etc.)
☐ Print maintenance checklist
☐ Confirm thermal imaging camera available
☐ Confirm torque wrench calibrated
☐ Check OEM firmware update availability
☐ Brief service team on site specifics

TOOLS AND EQUIPMENT CHECKLIST
☐ Multimeter (calibrated)
☐ Thermal imaging camera
☐ Torque wrench set
☐ Insulated tools
☐ PPE (hard hat, safety glasses, gloves, boots)
☐ Laptop with diagnostic software
☐ Camera for documentation
☐ Cleaning supplies
☐ Replacement filters
☐ First aid kit
☐ Site-specific access keys/codes

Prepared by: ________________     Date: ________________
```

### On-Site Maintenance Report Template

```
MAINTENANCE VISIT REPORT
═══════════════════════════════════════════════════════════════

PROJECT ID:         ________________
CLIENT:             ________________
SITE:               ________________
VISIT DATE:         ________________
VISIT TYPE:         ☐ Annual  ☐ Quarterly  ☐ Corrective  ☐ Other
ENGINEER(S):        ________________
ARRIVAL TIME:       ________________
DEPARTURE TIME:     ________________
WEATHER CONDITIONS: ________________

───────────────────────────────────────────────────────────────
SECTION 1: VISUAL INSPECTION
───────────────────────────────────────────────────────────────

External Enclosure:
  Condition:        ☐ Good  ☐ Fair  ☐ Poor
  Notes:            ________________________________

Door Seals/Gaskets:
  Condition:        ☐ Good  ☐ Fair  ☐ Poor
  Notes:            ________________________________

Safety Signage:
  Complete:         ☐ Yes  ☐ No
  Notes:            ________________________________

Fire Extinguisher:
  Present:          ☐ Yes  ☐ No
  Expiry Date:      ________________
  Notes:            ________________________________

───────────────────────────────────────────────────────────────
SECTION 2: ELECTRICAL SYSTEMS
───────────────────────────────────────────────────────────────

Cable Terminations:
  Visual:           ☐ Good  ☐ Fair  ☐ Poor
  Torque Verified:  ☐ Yes  ☐ No
  Notes:            ________________________________

Busbar Connections:
  Condition:        ☐ Good  ☐ Fair  ☐ Poor
  Notes:            ________________________________

Switchgear:
  Operation:        ☐ Normal  ☐ Abnormal
  Notes:            ________________________________

Protection Relays:
  Settings Verified: ☐ Yes  ☐ No
  Notes:            ________________________________

Grounding:
  Continuity:       ☐ Verified  ☐ Not Verified
  Resistance:       ________ Ω
  Notes:            ________________________________

Thermal Imaging Results:
  Hotspots Found:   ☐ Yes  ☐ No
  Location(s):      ________________________________
  Max Temperature:  ________ °C
  Action Required:  ________________________________

───────────────────────────────────────────────────────────────
SECTION 3: BATTERY SYSTEMS
───────────────────────────────────────────────────────────────

Overall SOH:        ________ %
Overall SOC:        ________ %

Cell Voltage Range:
  Minimum:          ________ V    (Cell ID: ________)
  Maximum:          ________ V    (Cell ID: ________)
  Imbalance:        ________ mV

Cell Temperature Range:
  Minimum:          ________ °C   (Cell ID: ________)
  Maximum:          ________ °C   (Cell ID: ________)
  Delta:            ________ °C

Module Status:
  Total Modules:    ________
  Healthy:          ________
  Degraded:         ________
  Faulty:           ________

BMS Communication:
  Status:           ☐ Normal  ☐ Abnormal
  Notes:            ________________________________

───────────────────────────────────────────────────────────────
SECTION 4: THERMAL MANAGEMENT
───────────────────────────────────────────────────────────────

HVAC System:
  Operation:        ☐ Normal  ☐ Abnormal
  Set Point:        ________ °C
  Actual Temp:      ________ °C
  Notes:            ________________________________

Cooling Fans:
  Qty Operational:  ________ / ________
  Noise Level:      ☐ Normal  ☐ Abnormal
  Notes:            ________________________________

Filters:
  Condition:        ☐ Clean  ☐ Dirty  ☐ Replaced
  Notes:            ________________________________

Temperature Sensors:
  Calibration:      ☐ Verified  ☐ Not Verified
  Notes:            ________________________________

───────────────────────────────────────────────────────────────
SECTION 5: SAFETY SYSTEMS
───────────────────────────────────────────────────────────────

Fire Suppression:
  Type:             ________________
  Status:           ☐ Armed  ☐ Not Armed
  Pressure:         ________ bar
  Notes:            ________________________________

Smoke/Heat Detectors:
  Test Result:      ☐ Pass  ☐ Fail
  Notes:            ________________________________

Emergency Stop:
  Test Result:      ☐ Pass  ☐ Fail
  Notes:            ________________________________

Door Interlocks:
  Test Result:      ☐ Pass  ☐ Fail
  Notes:            ________________________________

Ventilation:
  Operation:        ☐ Normal  ☐ Abnormal
  Notes:            ________________________________

───────────────────────────────────────────────────────────────
SECTION 6: SOFTWARE AND COMMUNICATIONS
───────────────────────────────────────────────────────────────

BMS Firmware:
  Current Version:  ________________
  Latest Version:   ________________
  Updated:          ☐ Yes  ☐ No  ☐ N/A

PCS Firmware:
  Current Version:  ________________
  Latest Version:   ________________
  Updated:          ☐ Yes  ☐ No  ☐ N/A

EMS Version:
  Current Version:  ________________
  Notes:            ________________________________

Remote Monitoring:
  Connection:       ☐ Online  ☐ Offline
  Data Integrity:   ☐ Verified  ☐ Issues Found
  Notes:            ________________________________

Alarm Log Review:
  Period Reviewed:  ________________ to ________________
  Total Alarms:     ________
  Critical:         ________
  Major:            ________
  Minor:            ________
  Key Findings:     ________________________________

───────────────────────────────────────────────────────────────
SECTION 7: SUMMARY AND RECOMMENDATIONS
───────────────────────────────────────────────────────────────

Overall System Status:  ☐ Healthy  ☐ Attention Required  ☐ Critical

Issues Identified:
1. ________________________________________________________________
2. ________________________________________________________________
3. ________________________________________________________________

Immediate Actions Required:
1. ________________________________________________________________
2. ________________________________________________________________

Recommendations for Next Visit:
1. ________________________________________________________________
2. ________________________________________________________________

Parts/Materials Used:
| Item | Quantity | Notes |
|------|----------|-------|
| | | |
| | | |

Parts/Materials Required:
| Item | Quantity | Priority |
|------|----------|----------|
| | | |
| | | |

───────────────────────────────────────────────────────────────
SIGN-OFF
───────────────────────────────────────────────────────────────

Service Engineer:
  Name:             ________________
  Signature:        ________________
  Date:             ________________

Client Representative:
  Name:             ________________
  Title:            ________________
  Signature:        ________________
  Date:             ________________

Report Reference:   CY-BESS-XXX-MNT-YYYY-MM-DD
```

---

## 4. MONITORING ALERT PROTOCOLS

### Alert Classification Matrix

| Alert Level | Description | Response Time | Notification Method | Escalation |
|-------------|-------------|---------------|---------------------|------------|
| **CRITICAL** | Immediate safety/system risk | 4 hours | Phone + Email | Immediate to Technical Lead |
| **MAJOR** | Significant performance issue | 24 hours | Email | Within 4 hours to O&M Manager |
| **MINOR** | Non-urgent issue | 72 hours | Email | Weekly review |
| **INFO** | Trend/logging data | Next report | Report only | N/A |

### Critical Alert Examples
- Fire suppression activated
- Emergency stop triggered
- Communication loss > 4 hours
- Cell over-temperature (> threshold)
- Cell over/under voltage
- Ground fault detected
- PCS trip/failure
- Container door open alarm

### Major Alert Examples
- SOH degradation > 2% in 30 days
- Cell imbalance > 50mV
- Cooling system fault
- Partial communication loss
- Repeated minor alarms
- Sensor malfunction

### Minor Alert Examples
- Filter replacement due
- Minor cell imbalance (20-50mV)
- Firmware update available
- Scheduled maintenance due
- Environmental alerts (humidity, dust)

### Alert Response Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    ALERT DETECTED                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. ACKNOWLEDGE                                              │
│    • Log alert in tracking system                           │
│    • Timestamp acknowledgement                              │
│    • Assign to engineer                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. DIAGNOSE                                                 │
│    • Review monitoring data                                 │
│    • Check related parameters                               │
│    • Identify root cause                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. NOTIFY CLIENT                                            │
│    • Critical: Phone + Email within 30 mins                 │
│    • Major: Email within 2 hours                            │
│    • Include: Issue, impact, recommended action             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. RESOLVE                                                  │
│    • Remote resolution if possible                          │
│    • Dispatch engineer if required                          │
│    • Coordinate with OEM if needed                          │
│    • Document all actions taken                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. CLOSE                                                    │
│    • Confirm issue resolved                                 │
│    • Update client                                          │
│    • Complete incident report                               │
│    • Update maintenance log                                 │
│    • Identify preventive measures                           │
└─────────────────────────────────────────────────────────────┘
```

### Escalation Contacts

| Level | Role | Contact | Escalation Trigger |
|-------|------|---------|-------------------|
| L1 | Monitoring Technician | [●] | First response |
| L2 | Technical Lead | [●] | Unresolved after 2 hours |
| L3 | O&M Manager | [●] | Unresolved after 8 hours |
| L4 | Managing Director | [●] | Critical unresolved > 24 hours |
| OEM | Linyang Technical Support | [●] | OEM expertise required |

---

## 5. SPARE PARTS INVENTORY

### Recommended Spare Parts List

| Category | Item | Min Stock | Current Stock | Reorder Point | Lead Time |
|----------|------|-----------|---------------|---------------|-----------|
| **Consumables** | | | | | |
| | Air Filters | 10 | [●] | 5 | 2 weeks |
| | HVAC Filters | 5 | [●] | 2 | 2 weeks |
| | Cleaning Supplies | 5 sets | [●] | 2 | 1 week |
| | Cable Ties/Fasteners | 100 | [●] | 50 | 1 week |
| **Electrical** | | | | | |
| | Fuses (various) | 20 | [●] | 10 | 2 weeks |
| | Contactors | 2 | [●] | 1 | 4 weeks |
| | Circuit Breakers | 2 | [●] | 1 | 4 weeks |
| | Surge Protectors | 2 | [●] | 1 | 3 weeks |
| **Sensors** | | | | | |
| | Temperature Sensors | 5 | [●] | 2 | 3 weeks |
| | Voltage Sensors | 2 | [●] | 1 | 4 weeks |
| | Current Sensors | 2 | [●] | 1 | 4 weeks |
| **Cooling** | | | | | |
| | Cooling Fans | 2 | [●] | 1 | 4 weeks |
| | Fan Motors | 1 | [●] | 1 | 6 weeks |
| **Communications** | | | | | |
| | Network Switches | 1 | [●] | 1 | 2 weeks |
| | Communication Cables | 10m | [●] | 5m | 1 week |
| | Fiber Optic Cables | 5m | [●] | 2m | 2 weeks |

### Inventory Management

```
SPARE PARTS REQUISITION FORM
═══════════════════════════════════════════════════════════════

Date:               ________________
Requested By:       ________________
Project/Site:       ________________
Urgency:            ☐ Routine  ☐ Urgent  ☐ Emergency

Items Requested:
| Item | Part Number | Quantity | Reason |
|------|-------------|----------|--------|
| | | | |
| | | | |
| | | | |

Approved By:        ________________
Date:               ________________
Order Placed:       ☐ Yes  ☐ No
Supplier:           ________________
Expected Delivery:  ________________
```

---

## 6. CLIENT COMMUNICATION LOG

### Communication Log Template

| Date | Time | Project | Contact Method | Client Contact | Subject | Action Required | Status |
|------|------|---------|----------------|----------------|---------|-----------------|--------|
| | | | ☐ Email ☐ Phone ☐ Meeting | | | | ☐ Open ☐ Closed |

### Monthly Report Distribution

| Project ID | Client | Primary Contact | Email | Report Day | Format |
|------------|--------|-----------------|-------|------------|--------|
| CY-BESS-001 | [●] | [●] | [●] | 10th | PDF + Portal |
| CY-BESS-002 | [●] | [●] | [●] | 10th | PDF + Portal |
| CY-BESS-003 | [●] | [●] | [●] | 10th | PDF + Portal |

### Standard Communication Templates

**Monthly Report Email:**
```
Subject: [Project Name] - Monthly Performance Report - [Month Year]

Dear [Client Name],

Please find attached the monthly performance report for [Project Name] 
covering the period [Start Date] to [End Date].

Summary:
- Energy Throughput: [●] MWh
- Average Availability: [●]%
- Current SOH: [●]%
- Alerts: [●] Critical, [●] Major, [●] Minor

[Key highlights or concerns]

The full report is also available on your monitoring portal at [URL].

Please contact us if you have any questions.

Best regards,
[Name]
Lighthief Cyprus Ltd
```

**Alert Notification Email (Critical):**
```
Subject: URGENT - [Project Name] - Critical Alert - [Alert Type]

Dear [Client Name],

A critical alert has been detected on [Project Name]:

Alert Details:
- Type: [Alert Type]
- Time Detected: [Timestamp]
- Description: [Description]
- Immediate Impact: [Impact]

Actions Being Taken:
[Description of immediate response]

We will provide an update within [timeframe].

For immediate assistance, please call [Emergency Number].

Best regards,
[Name]
Lighthief Cyprus Ltd
```

---

## 7. DOCUMENT CONTROL

### Document Register

| Document | Version | Last Updated | Next Review | Owner |
|----------|---------|--------------|-------------|-------|
| EPC Agreement Template | 1.0 | [●] | [●] | Legal |
| LTSA Template | 1.0 | [●] | [●] | Legal |
| Maintenance Checklist | 1.0 | [●] | Annually | O&M |
| Alert Protocol | 1.0 | [●] | Annually | O&M |
| Spare Parts List | 1.0 | [●] | Quarterly | O&M |
| Report Templates | 1.0 | [●] | Annually | O&M |

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [●] | [●] | Initial release |

---

## 8. KEY CONTACTS

### Internal Contacts

| Role | Name | Phone | Email | Backup |
|------|------|-------|-------|--------|
| Managing Director | [●] | [●] | [●] | [●] |
| O&M Manager | [●] | [●] | [●] | [●] |
| Technical Lead | [●] | [●] | [●] | [●] |
| Service Engineer 1 | [●] | [●] | [●] | [●] |
| Service Engineer 2 | [●] | [●] | [●] | [●] |
| Commercial Manager | [●] | [●] | [●] | [●] |

### External Contacts

| Organisation | Contact | Phone | Email | Purpose |
|--------------|---------|-------|-------|---------|
| Linyang Technical Support | [●] | [●] | [●] | OEM Support |
| Linyang Spare Parts | [●] | [●] | [●] | Parts Orders |
| Grid Operator (TSOC) | [●] | [●] | [●] | Grid Issues |
| Insurance Provider | [●] | [●] | [●] | Claims |
| Emergency Services | 112/199 | N/A | N/A | Emergencies |

---

*Document Version: 1.0*
*Created: [Date]*
*Lighthief Cyprus Ltd*

