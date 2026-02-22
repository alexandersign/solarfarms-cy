# PV Plant Prospect Research Guide - Cyprus

## Quick Reference: Data Sources

### 1. CERA Licensing Archive (Primary source for PV plant data)

| Resource | URL |
|----------|-----|
| **Producers & Licensing Archive** | https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1 |
| **RES Exemptions (50kW-8MW)** | https://www.cera.org.cy/en-gb/ilektrismos/1169/eksairesi-ape |
| **Market Participants Share (monthly gen)** | https://www.cera.org.cy/en-gb/smv |
| **Construction & Operation Licenses** | https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-adeies |
| **CERA Contact** | +357 22 666363 • 81-83 Griva Digeni Avenue, 1080 Nicosia |

**What you get:** License holder company name, plant capacity (kW/MW), location/district, license number, date, plant type (PV/Wind/etc.)

**License tiers:**
- **>8 MW:** Requires Construction & Operation License from CERA (fee: 8.5430 c/kW, min €170.86)
- **50kW-8MW:** Exempt from license but registered on RES Exemptions page
- **<50kW:** Net metering, generally not tracked by CERA

---

### 2. Cyprus Company Register (Find owners, directors, groups)

| Resource | URL |
|----------|-----|
| **Company Search (free)** | https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU |
| **Department Homepage** | https://www.companies.gov.cy/en/ |

**Free search returns:**
- Company name, registration number (HE XXXXXX), registration date
- Organisation type & status (active/struck off)
- Registered office address
- Current directors and secretary names
- Preview of filed documents
- Last annual report filing date

**Paid detailed search (€10):**
- Full historical file: name history, registered office history
- Directors/secretaries history (all past directors)
- Members/shareholders with shareholding details
- Share capital history
- Charges and mortgages

**Research tips:**
- Most PV plants are SPVs (Special Purpose Vehicles) registered as "HE" (Limited Company)
- Search keywords: "Solar", "Photovoltaic", "PV", "Energy", "Power", "Renewable"
- Directors of the SPV often sit on the board of the parent group → reveals group structure
- Cross-reference director names to find all related companies

---

### 3. LinkedIn - Decision Makers

**Search strategies:**
1. **Company page → People tab:** Find all employees of the target company
2. **Name search:** Use director names from company register
3. **Industry search:** "solar" OR "renewable energy" + Cyprus location filter
4. **Sales Navigator (paid):** Advanced filters by title, company, geography

**Target titles:**
- CEO, Managing Director, Director
- Managing Partner, Partner
- Head of Business Development
- CFO, Finance Director
- Project Manager, Technical Director

**Outreach approach:**
- Personalized connection request mentioning their specific plant/curtailment
- InMail for premium contacts (if you have Sales Navigator)
- Group membership in Cyprus energy/solar groups

---

### 4. Email Discovery Tools

| Tool | URL | Free Tier |
|------|-----|-----------|
| **Hunter.io** | https://hunter.io | 50 searches/month |
| **Apollo.io** | https://www.apollo.io | 10k credits (generous free) |
| **Lusha** | https://www.lusha.com | 5 contacts/month |
| **Snov.io** | https://snov.io | 50 credits/month |
| **RocketReach** | https://rocketreach.co | 5 lookups/month |
| **Clearbit** | https://clearbit.com | Limited free |

**Email pattern guessing:**
Once you know one email from a company domain:
- `firstname@domain.com`
- `firstname.lastname@domain.com`
- `f.lastname@domain.com`
- `firstnamelastname@domain.com`

Verify with Hunter.io email verifier or NeverBounce.

---

### 5. DSO / TSO / Grid Operator Contacts

#### EAC - Distribution System Operator (DSO)
- **Address:** 11 Amfipoleos St., 2025 Strovolos, P.O. Box 24506, 1399 Lefkosia
- **Phone:** +357 22 201000
- **Fax:** +357 22 201020
- **Email:** eac@eac.com.cy
- **Website:** https://www.eac.com.cy
- **Emergency:** 1800
- **DSO Unit page:** https://www.eac.com.cy/EN/RegulatedActivities/Distribution/about/Pages/distributionsoperator.aspx

#### TSOC - Transmission System Operator Cyprus
- **Director:** Stavros Stavrinos
- **Phone:** +357 22 277000
- **Email:** director@dsm.org.cy
- **Website:** https://www.tsoc.org.cy
- **Contact page:** https://www.tsoc.org.cy/organization/contact-us/
- **Role:** Transmission grid operation, RES integration, ENTSO-E member

#### CSE - Cyprus Stock Exchange (Energy Market)
- **Energy Market Portal:** https://www.cse.com.cy/en-GB/AGORA-ELECTRISMOY/Home/
- **Role:** Operates the Cyprus Day-Ahead Market (DAM), lists registered market participants

---

## Research Workflow

```
1. CERA Licensing Archive
   → Download producer list
   → Extract: company name, capacity, location, license no.
   
2. Cyprus Company Register  
   → Search each company name
   → Extract: directors, registered address, parent group
   
3. LinkedIn
   → Search director names
   → Extract: LinkedIn URL, current title, mutual connections
   
4. Email Discovery (Hunter/Apollo/Lusha)
   → Enter company domain or person name
   → Extract: verified email, phone number
   
5. Add to PV Prospects Tracker (/admin/prospects)
   → Enter all data
   → Set priority (high for >5MW with curtailment)
   → Set offer type (bess_retrofit for curtailed plants)
   → Schedule follow-up date
   
6. Execute Outreach
   → Email / Phone / LinkedIn message
   → Update status after each touchpoint
   → Set next follow-up
```

## Priority Scoring Guidelines

| Priority | Criteria |
|----------|----------|
| **Urgent** | >10MW plant, known high curtailment (>30%), active relationship/referral |
| **High** | 5-10MW plant, likely curtailment, known company with contact info |
| **Medium** | 1-5MW plant, unknown curtailment, basic company info only |
| **Low** | <1MW, planned/not yet built, minimal info available |

## BESS Retrofit Targeting

Focus on plants with:
- **High curtailment** (>20% = significant lost revenue → strong BESS business case)
- **Operational since 2018-2022** (most likely experiencing curtailment now)
- **>2MW capacity** (smaller plants harder to justify BESS economics)
- **Good grid location** (evening peak arbitrage opportunity)

Typical offer: Linyang BESS retrofit at ~€127k/MWh installed, 4-hour duration
- 5MW plant → ~20MWh BESS → ~€2.54M deal value
- 10MW plant → ~40MWh BESS → ~€5.08M deal value
