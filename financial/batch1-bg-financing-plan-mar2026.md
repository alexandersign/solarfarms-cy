# Batch 1 — Bank Guarantees & Financing Plan

**Document Reference:** LCY-FIN-B1-BG-MAR2026
**Date:** 10 March 2026
**Classification:** CONFIDENTIAL — Internal
**Source Data:** `lib/portfolio-data.ts` (SSOT), cashflow models, confirmed quotations

---

## 1. Batch 1 Summary

| Metric | Value |
|--------|-------|
| **Parks** | 12 |
| **Capacity** | 41.3 MW / 131.28 MWh |
| **Containers** | 41 |
| **CIF (Linyang)** | €13,210,000 |
| **Installed Cost** | €15,139,000 |
| **Client Revenue** | €16,955,000 |
| **Gross Margin** | €1,816,000 (10.71%) |

### Client Groups in Batch 1

| Park | Group | MW | MWh | Containers | District | Revenue (€) |
|------|-------|---:|----:|----------:|----------|------------:|
| Easy Power 1 | ABIO | 5.0 | 10 | 3 | Nicosia | 1,361,050 |
| Easy Power 2 | ABIO | 4.5 | 10 | 3 | Nicosia | 1,401,540 |
| Dianary 1 | ABIO | 2.5 | 10 | 3 | Nicosia | 1,206,300 |
| Waneron | ABIO | 3.0 | 11.28 | 3 | Nicosia | 1,472,981 |
| Solartech 3 Ext | ABIO | 2.5 | 10 | 3 | Nicosia | 1,206,300 |
| Galascope 1 | Galascope | 5.0 | 20 | 6 | Famagusta | 2,258,900 |
| Galascope 2 | Galascope | 2.5 | 10 | 3 | Famagusta | 1,206,300 |
| AGM Sunfield 1 | Timotheos | 5.0 | 15 | 5 | Nicosia | 1,961,880 |
| L&T Sun Energy | Timotheos | 5.0 | 15 | 5 | Limassol | 1,961,880 |
| TBC (5 MWh) | Timotheos | 1.5 | 5 | 2 | TBC | 800,000 |
| Solar Breeze | Lampros | 1.51 | 5 | 2 | Limassol | 795,443 |
| Solar Garden | Lampros | 3.29 | 10 | 3 | Limassol | 1,321,976 |
| **TOTAL** | | **41.3** | **131.28** | **41** | | **€16,954,550** |

### Key Dates

| Milestone | Date |
|-----------|------|
| Contract signing / advance | 1 April 2026 |
| Production start | 1 April 2026 |
| Production complete / FAT | 30 June 2026 |
| Shipping (Shanghai → Limassol) | 1 July 2026 |
| CIF Limassol / customs clearance | 20 August 2026 |
| Installation & commissioning | Aug–Dec 2026 |
| PAC (Provisional Acceptance) | 31 December 2026 |
| Retention release (24-month DLP) | 31 December 2028 |

---

## 2. Payment Terms

### Client → Lighthief (30/55/10/5)

| Milestone | % | Amount (€) | Timing |
|-----------|--:|----------:|--------|
| Advance | 30% | 5,086,500 | April 2026 (within 7 days of signing) |
| Pre-Shipment | 55% | 9,325,250 | June 2026 (factory inspection passed) |
| PAC | 10% | 1,695,500 | December 2026 (commissioned & grid-connected) |
| Retention | 5% | 847,750 | December 2028 (24-month DLP release) |
| **Total** | **100%** | **16,955,000** | |

### Lighthief → Linyang (25/50/20/5)

| Milestone | % | Amount (€) | Timing |
|-----------|--:|----------:|--------|
| Advance | 25% | 3,302,500 | April 2026 (order date) |
| Pre-Shipment | 50% | 6,605,000 | June 2026 (ready to ship) |
| DAP | 20% | 2,642,000 | August 2026 (site arrival) |
| SAT | 5% | 660,500 | December 2026 (acceptance test) |
| **Total** | **100%** | **13,210,000** | |

**Note:** The Linyang contract negotiation (6 March review) shows Linyang proposed **30/60/10** instead of 25/50/20/5. If 30/60/10 is agreed, the advance rises to €3,963,000 and pre-shipment to €7,926,000, with only €1,321,000 held back post-delivery.

---

## 3. Bank Guarantee Structure

### 3A. Upstream — Linyang → Lighthief

| Guarantee | Face Value (€) | Form | Valid Period | Cost |
|-----------|---------------:|------|-------------|------|
| **APG** | 3,302,500 | Irrevocable on-demand bank guarantee (international bank) | Until CIF delivery + 30 days (~19 Sep 2026) | €0 to Lighthief |
| **Performance Bond** | 660,500 | Corporate-backed bank guarantee | 14 days after advance until PAC + 30 days (~30 Jan 2027) | €0 to Lighthief |

**Condition precedent:** Lighthief's obligation to pay the advance does NOT become due until the APG is physically delivered (proposed Section 9B.4 of sales contract). Do NOT wire funds without the APG instrument in hand.

### 3B. Downstream — Lighthief → Clients

| Guarantee | Face Value (€) | Form | Valid Period | Est. Cost (€) |
|-----------|---------------:|------|-------------|---------------:|
| **Client APG** | 5,086,500 | Surety bond or bank guarantee | Until equipment delivered to site + 30 days (~19 Sep 2026) | 50,000–150,000 |
| **Retention** | 847,750 | Cash holdback (not a bank guarantee) | 24 months post-PAC (until Dec 2028) | 0 (cash locked) |

The Linyang APG cannot be passed through to clients — it protects Lighthief, not the end client. Lighthief must arrange a **separate** guarantee instrument.

### 3C. Sourcing the Client APG

| Option | Provider | Mechanism | Cost | Pros | Cons |
|--------|----------|-----------|------|------|------|
| **1. Surety bond** (recommended) | Atradius, Euler Hermes, Coface, Trygg Hansa | On-demand surety bond facility | 1–3% of face value p.a. (€50K–€150K) | No cash collateral; standard for EPC | Requires credit assessment of Lighthief |
| **2. Bank guarantee** | Bank of Cyprus, Hellenic Bank | BG backed by cash deposit or property | 0.5–1.5% p.a. (€25K–€75K) | Cheaper; banks familiar with Cyprus market | 100% cash collateral typically required (ties up €5.1M) |
| **3. Linyang APG as partial collateral** | Cyprus bank + Linyang APG | Bank issues €5.1M BG, holds Linyang APG (€3.3M) as collateral, Lighthief covers €1.8M gap | ~€30K–€50K | Leverages existing instrument | Complex; bank must accept foreign bank guarantee |

**Recommendation:** Option 1 (surety bond via insurance RFP). Already requested from Marsh (RFP due 14 March). If Marsh cannot deliver in time, fall back to Option 2 with Bank of Cyprus — but this requires depositing the full €5.1M as collateral, which eliminates the cashflow buffer.

---

## 4. Cashflow Model — Batch 1 Isolated

### 4A. Net Cashflow (Excluding VAT)

| Month | Client In (€K) | Linyang Out (€K) | Subcon/Ops (€K) | Monthly Net (€K) | Cumulative (€K) |
|-------|---------------:|----------------:|----------------:|------------------:|-----------------:|
| **Apr 2026** | +5,087 | -3,303 | -479 | **+1,305** | **+1,305** |
| **May 2026** | — | — | -205 | **-205** | **+1,100** |
| **Jun 2026** | +9,325 | -6,605 | -285 | **+2,435** | **+3,535** |
| **Jul 2026** | — | — | -134 | **-134** | **+3,401** |
| **Aug 2026** | — | -2,642 | -474 | **-3,116** | **+285** |
| **Sep 2026** | — | — | -187 | **-187** | **+98** |
| **Oct 2026** | — | — | -485 | **-485** | **-387** |
| **Nov 2026** | — | — | -105 | **-105** | **-492** |
| **Dec 2026** | +1,696 | -661 | -55 | **+980** | **+488** |

**Key finding: Net of VAT, Batch 1 is self-funding.** The peak negative of -€492K (November) is manageable from the pre-shipment surplus built up through June. Ends at +€488K, plus €848K retention released December 2028.

#### Subcontractor/Ops Breakdown

| Month | Items | Amount (€K) |
|-------|-------|------------:|
| Apr | Voltus EMS advance (~50% of B1 share), insurance inception, overhead | -479 |
| May | Civil works early mobilisation, engineering, overhead | -205 |
| Jun | Voltus pre-delivery (20%), civil works, overhead | -285 |
| Jul | DEHN materials, civil works completion, overhead | -134 |
| Aug | Import duty (€351K), port landing (€25K), customs clearance, transport (€97K), overhead | -474 |
| Sep | Electrical works start, DEHN installation, overhead | -187 |
| Oct | Voltus acceptance (30%), electrical, protection eng., docs/compliance, SCADA, UPS, overhead | -485 |
| Nov | Remaining electrical, overhead | -105 |
| Dec | Overhead | -55 |

### 4B. VAT Layer

| Date | Event | Cash Impact (€K) |
|------|-------|------------------:|
| Apr 2026 | Collect 19% VAT on client advance (received with payment) | +966 |
| Jun 2026 | Collect 19% VAT on pre-shipment invoice (received with payment) | +1,772 |
| **10 Aug 2026** | **Remit Q2 VAT return to Cyprus Tax Department** | **-2,688** |
| **20 Aug 2026** | **Pay import VAT at customs clearance (19% × (CIF + duty))** | **-2,577** |
| 10 Nov 2026 | Q3 return: credit of €2.6M — nothing payable, no refund | 0 |
| Dec 2026 | Collect 19% VAT on PAC invoice | +322 |
| 10 Feb 2027 | Q4 return: +€322K output, offset against Q3 credit | 0 |
| **Jun 2027** | **Earliest date to file VAT 4B refund claim** (8-month rule) | 0 |
| **Aug–Dec 2027** | **Realistic refund receipt** | **+2,205** |

**VAT cash locked with government: €2,205K for 11–15 months.**

### 4C. Combined Cashflow (Net + VAT)

| Month | Net Position (€K) | VAT Position (€K) | **Combined (€K)** |
|-------|-------------------:|-------------------:|-------------------:|
| **Apr 2026** | +1,305 | +966 | **+2,271** |
| **May 2026** | +1,100 | +966 | **+2,066** |
| **Jun 2026** | +3,535 | +2,738 | **+6,273** |
| **Jul 2026** | +3,401 | +2,738 | **+6,140** |
| **Aug 2026** | +285 | -2,527 | **-2,242** |
| **Sep 2026** | +98 | -2,527 | **-2,429** |
| **Oct 2026** | -387 | -2,527 | **-2,914** |
| **Nov 2026** | -492 | -2,527 | **-3,019** |
| **Dec 2026** | +488 | -2,205 | **-1,717** |

**Peak negative: -€3,019K (November 2026).** Driven entirely by the €2.5M import VAT locked with the government.

Without VAT, the deal is self-funding. With VAT, Lighthief needs a working capital facility of **~€3.5M**.

---

## 5. Financing Requirement Summary

| Item | Amount (€) | Duration | Est. Cost (€) |
|------|----------:|----------|---------------:|
| Client APG surety bond | 5,087K face value | 6 months (Apr–Sep 2026) | 50,000–150,000 |
| VAT bridge facility | 3,500K revolving | 12 months (Aug 2026–Aug 2027) | 70,000–105,000 |
| **Total financing cost** | | | **120,000–255,000** |
| **As % of margin** | | | **6.6%–14.0%** |

### Margin After Financing

| Scenario | Margin (€) | Margin % |
|----------|----------:|--------:|
| Gross margin (before financing) | 1,816,000 | 10.71% |
| Margin after financing (low estimate) | 1,696,000 | 9.3% |
| Margin after financing (high estimate) | 1,561,000 | 8.6% |
| Plus retention (released Dec 2028) | +847,750 | |

---

## 6. Risk Register — Batch 1 Specific

| Risk | Probability | Impact (€K) | Mitigation |
|------|------------|------------:|------------|
| Linyang does not deliver APG before advance due | Medium | 3,303 | Section 9B.4 condition precedent — do not pay without APG |
| Marsh surety bond not ready by April 1 | Medium | 5,087 | Fall back to Bank of Cyprus BG; negotiate 7-day grace on client advance |
| Import VAT refund delayed beyond Dec 2027 | Medium | 2,205 | Apply for monthly VAT returns; pre-file documentation |
| Cyprus Customs audit on 41-container import | Low-Medium | 2,577 (delay) | Pre-file customs declarations; Economic Operator registration |
| Linyang production delay (>30 days) | Low | 1,696 (delay LDs) | Schedule buffer built into PAC date |
| Client delays advance payment | Low | 5,087 (timing) | Contract penalty; no production start without advance |

---

## 7. Action Items

### THIS WEEK (10–14 March 2026)

**1. Chase Marsh Insurance RFP**

The comprehensive insurance RFP (LCY-RFP-INS-COMPREHENSIVE-2026) was sent 20 February with a response due 14 March. The APG/surety bond facility (item 8/11) is the critical deliverable for Batch 1.

Contact: Marsh Specialty — Renewable Energy Team (Europe/UK)
Ask specifically for:
- APG/surety bond facility: €5.1M single bond / €15M aggregate
- Timeline to issue the first bond (must be ready by 1 April)
- Credit assessment requirements for Lighthief
- Whether they can issue a Batch 1 standalone bond while the broader facility is underwritten

**2. Confirm Linyang APG Bank and Timeline**

Contact: Linyang (Klaudia / commercial team)
Required information:
- Which bank will issue the APG and performance bond?
- What is the lead time from contract signing to APG delivery?
- Will the APG be issued per-batch or for the full portfolio?
- Can the APG be delivered simultaneously with or before the advance payment date?
- Request a draft/sample APG instrument for review by Lighthief's legal counsel

**3. Engage Cyprus Bank for VAT Facility**

Contact: Bank of Cyprus Corporate Banking / Hellenic Bank Commercial
Facility request:
- Type: Revolving credit facility for VAT bridging
- Amount: €3,500,000
- Term: 12 months (draw from August 2026, repay upon VAT refund)
- Security: Assignment of confirmed VAT refund claim; confirmed EPC contracts as collateral
- Supporting docs to provide:
  - Signed client EPC contracts (or near-final drafts)
  - Linyang sales contract
  - Import schedule (41 containers, August 2026)
  - VAT refund timeline calculation
  - Company financial statements

### WEEK OF 17 MARCH

**4. Apply for Monthly VAT Returns**

Submit application to the Commissioner of Taxation (Cyprus Tax Department, Limassol office):
- Legal basis: Section 11 of VAT Law 95(I)/2000
- Grounds: Company will regularly generate excess input VAT from Q3 2026 due to large capital equipment imports
- Evidence to attach:
  - Projected import schedule (41 containers, €13.2M CIF, August 2026)
  - Projected output/input VAT by quarter showing excess input from Q3 2026
  - Company VAT registration details (TIN: 60187188Q)
- Benefit: Monthly filing allows faster offset of import VAT credits, reducing the 8-month refund wait

**5. Apply for Economic Operator Registration**

Submit application to Cyprus Customs & Excise Department:
- Required for bonded warehouse use (contingency plan for VAT staggering)
- Lead time: 4–6 weeks
- Requirements:
  - Company registration (HE 477423)
  - VAT registration (60187188Q)
  - Clean customs history (NIL — first import)
  - Proof of business activity (EPC contracts)
  - Designated customs representative

### BEFORE APRIL 1

**6. Finalize Linyang Payment Terms**

The payment structure must be locked before contract signing. Impact comparison:

| Metric | 25/50/20/5 (SSOT) | 30/60/10 (Linyang proposal) |
|--------|-------------------:|----------------------------:|
| Advance | €3,302,500 | €3,963,000 |
| Pre-shipment | €6,605,000 | €7,926,000 |
| Pre-delivery total | 75% (€9,907,500) | 90% (€11,889,000) |
| Holdback at delivery | 25% (€3,302,500) | 10% (€1,321,000) |
| APG face value | €3,302,500 | €3,963,000 |
| Risk if Linyang fails post-shipment | €9.9M at risk | €11.9M at risk |

**Recommendation:** Push for 25/50/20/5. The 25% holdback (€3.3M remaining after pre-shipment) gives Lighthief meaningful leverage if quality issues arise at delivery or commissioning. Under 30/60/10, only €1.3M is held back — insufficient pressure on a €13.2M contract.

If Linyang insists on 30/60/10, counter with:
- Increase performance bond from 5% to 10% (€1.32M)
- Add delay LDs from day 1 (no grace period)
- Require the APG to cover 100% of all pre-delivery payments (not just advance)

**7. Confirm Client BG Requirements**

Contact each Batch 1 client group to confirm:

| Group | Contact | Parks | Advance (€) | Question |
|-------|---------|------:|------------:|----------|
| ABIO (Dino) | Dino | 5 | 1,529,634 | Bank guarantee or surety bond acceptable? Bank-financed? |
| Galascope (Esperia) | Esperia contact | 2 | 1,039,560 | Bank guarantee or surety bond acceptable? Bank-financed? |
| Timotheos | Timotheos | 3 | 1,417,128 | Bank guarantee or surety bond acceptable? Bank-financed? |
| Lampros | Lampros | 2 | 635,516 | Bank guarantee or surety bond acceptable? Bank-financed? |

Key questions per client:
1. Does your financing bank require a formal bank guarantee APG, or is an insurance surety bond acceptable?
2. Do you require the APG to name the financing bank as co-beneficiary?
3. Are there any specific APG wording requirements from your bank?
4. Do you require a separate APG per park/SPV or one per group?

---

## Appendix A: Guarantee Instrument Checklist

### Linyang APG — What to Verify on Receipt

- [ ] Issuing bank is internationally recognised and acceptable in Cyprus
- [ ] Amount matches 100% of advance payment (€3,302,500 or as agreed)
- [ ] Unconditional and irrevocable
- [ ] Callable on demand (not conditional on proof of default)
- [ ] Beneficiary is Lighthief Cyprus Ltd (HE 477423)
- [ ] Valid from date of issuance until CIF delivery + 30 days
- [ ] Governed by ICC URDG 758 or similar international standard
- [ ] Original instrument (not copy) received
- [ ] Confirmed by a Cyprus-based correspondent bank (if foreign bank)

### Linyang Performance Bond — What to Verify

- [ ] Amount is 5% of contract value (€660,500)
- [ ] Corporate guarantee backed by bank
- [ ] Valid until PAC + 30 days
- [ ] Covers defects in materials, workmanship, and non-performance
- [ ] Beneficiary is Lighthief Cyprus Ltd

### Client APG — What Lighthief Must Issue

- [ ] Amount matches 100% of each client's advance payment
- [ ] On-demand surety bond or bank guarantee (per client preference)
- [ ] Valid until equipment delivered to client's site + 30 days
- [ ] Each client group's SPV named as beneficiary
- [ ] Financing bank named as co-beneficiary if required
- [ ] Compliant with any bank-specific wording requirements
- [ ] Released automatically upon delivery confirmation (or pro-rata)

---

## Appendix B: Document Cross-References

| Document | Location | Relevance |
|----------|----------|-----------|
| Portfolio SSOT | `lib/portfolio-data.ts` | Batch 1 data, payment terms, pricing |
| Guarantee comparison | `docs/quotations/internal-analysis/guarantee-comparison.md` | Competitive analysis, APG structure |
| Cashflow analysis | `docs/internal/cashflow-analysis-feb2026.md` | Full portfolio cashflow, VAT deep dive |
| Insurance RFP (comprehensive) | `docs/internal/rfp/rfp-insurance-comprehensive-feb2026.md` | APG/surety bond at §3.8 |
| Insurance RFP (Marsh) | `docs/internal/rfp/rfp-insurance-marsh-bess-project-feb2026.md` | CAR/EAR project insurance |
| Warranties & insurance brief | `docs/internal/warranties-and-insurance.md` | Full guarantee flow, insurance coverage |
| Linyang sales contract review | `legal/in-negotiation/linyang-sales/linyang-sales-contract-6mar-review-comments.html` | Section 9B (guarantees), payment terms |
| Linyang blended sales/LTSA | `legal/in-negotiation/linyang-sales/linyang-blended-sales-ltsa.md` | APG/performance bond terms (B5.1, B5.2) |

---

*Prepared by: Lighthief Cyprus Ltd — Internal Use Only*
*Date: 10 March 2026*
