# Bank Guarantees, Cashflow & Financing Options

**Document Reference:** LCY-FIN-BG-OPTIONS-MAR2026
**Date:** 23 March 2026
**Classification:** CONFIDENTIAL — Founder & Bank Discussion
**Source Data:** `lib/portfolio-data.ts` (SSOT), confirmed quotations, Linyang RFI V3
**Purpose:** Structured discussion paper for the founder and banking partner to agree a financial framework for the BESS EPC portfolio

---

## 1. SITUATION SUMMARY

Lighthief Cyprus Ltd is the exclusive distributor for Linyang Energy battery storage systems in Cyprus. The company has assembled a confirmed pipeline of 28 parks (486.5 MWh, €60.5M client revenue) and is ready to execute Batch 1 (9 parks, 110 MWh, €14.2M revenue) starting 1 April 2026.

**The core challenge:** Lighthief intermediates between clients (who pay 30/55/10/5) and Linyang (who is paid 20/50/20/10). This creates a need for bank guarantees and working capital that exceeds the company's current financial capacity.

| Metric | Batch 1 (Confirmed) | Full Portfolio |
|--------|--------------------:|---------------:|
| Parks | 9 | 28 |
| Capacity (MWh) | 110 | 486.5 |
| CIF cost (Linyang) | €11,116,000 | €47,382,285 |
| Installed cost (all-in) | €12,730,000 | €53,625,000 |
| Client revenue | €14,231,000 | €60,554,955 |
| Net margin | €1,501,000 (10.55%) | €6,929,811 (11.45%) |

---

## 2. THE THREE PAYMENT WATERFALLS

### Client → Lighthief (30/55/10/5)

| Milestone | % | Batch 1 (€) | Full Portfolio (€) | Trigger |
|-----------|--:|------------:|-------------------:|---------|
| Advance | 30 | 4,269,300 | 18,166,487 | On/after 1 April 2026 |
| Pre-Shipment | 55 | 7,827,050 | 33,305,225 | Factory inspection passed |
| PAC | 10 | 1,423,100 | 6,055,496 | Commissioned & grid-connected |
| Retention | 5 | 711,550 | 3,027,748 | Released after 24-month DLP |

### Lighthief → Linyang (20/50/20/10)

| Milestone | % | Batch 1 (€) | Full Portfolio (€) | Trigger |
|-----------|--:|------------:|-------------------:|---------|
| Advance | 20 | 2,223,200 | 9,476,457 | On/after 1 April 2026 |
| Pre-Shipment | 50 | 5,558,000 | 23,691,143 | Ready to ship (Ex-Works) |
| DAP | 20 | 2,223,200 | 9,476,457 | CIF Limassol port arrival |
| SAT | 10 | 1,111,600 | 4,738,229 | PAC completion |

### Lighthief → Voltus (50/20/30)

| Milestone | % | Trigger |
|-----------|--:|---------|
| Advance | 50 | Order date |
| Pre-Delivery | 20 | Pre-delivery |
| Acceptance | 30 | Acceptance |

---

## 3. THE GUARANTEE PROBLEM

### 3A. What Linyang Provides to Lighthief (confirmed)

| Guarantee | Face Value (B1) | Form | Validity | Cost |
|-----------|----------------:|------|----------|------|
| APG | €2,223,200 | Irrevocable on-demand bank guarantee | Until CIF delivery + 30 days | €0 |
| Performance Bond | €555,800 | Corporate-backed bank guarantee | Until PAC + 30 days | €0 |

**Critical constraint:** These guarantees are **non-transferable**. They name Lighthief as the sole beneficiary. They cannot be assigned to clients, pledged to a bank, or used as collateral.

### 3B. What Lighthief Must Provide to Clients

| Guarantee | Face Value (B1) | Form | Validity |
|-----------|----------------:|------|----------|
| Advance Payment Guarantee | €4,269,300 | Bank guarantee or surety bond | Until equipment at site + 30 days |
| Performance (retention) | €711,550 | Cash holdback (not a BG) | 24 months post-PAC |

### 3C. The Gap

| Item | Batch 1 | Full Portfolio |
|------|--------:|---------------:|
| Client APG Lighthief must issue | 4,269,300 | 18,166,487 |
| Linyang APG Lighthief receives (non-transferable) | 2,223,200 | 9,476,457 |
| **Net guarantee exposure** | **2,046,100** | **8,690,030** |

**The Linyang APG cannot be used to back the client APG** because:

1. It is non-transferable (names Lighthief as sole beneficiary)
2. The call conditions don't align (Linyang APG covers Linyang non-delivery; client APG covers Lighthief non-performance — different risks)
3. A Cyprus bank would not issue a BG backed by a foreign bank guarantee at face value — haircuts of 30–50% are typical, and the bank would still require cash collateral for the remainder
4. Even if pledged, the bank cannot call the Linyang APG if the client's claim is against Lighthief

---

## 4. CASHFLOW ANALYSIS — BATCH 1

### 4A. Operations Layer (ex-VAT)

| Month | Cash In (€K) | Cash Out (€K) | Monthly Net (€K) | Cumulative (€K) |
|-------|-------------:|-------------:|------------------:|------------------:|
| **Apr 2026** | +4,269 (client 30%) | -2,223 (Linyang 20%), -260 (Voltus), -146 (insurance), -55 (ops) | **+1,585** | **+1,585** |
| **May** | — | -110 (civil), -55 (ops) | **-165** | **+1,420** |
| **Jun** | +7,827 (client 55%) | -5,558 (Linyang 50%), -110 (civil), -104 (Voltus), -55 (ops) | **+2,000** | **+3,420** |
| **Jul** | — | -105 (DEHN/ops) | **-105** | **+3,315** |
| **Aug** | — | -2,223 (Linyang DAP), -296 (duty), -114 (port/transport), -55 (ops) | **-2,688** | **+627** |
| **Sep** | — | -193 (electrical/ops) | **-193** | **+434** |
| **Oct** | — | -425 (Voltus/protection/docs/elec/ops) | **-425** | **+9** |
| **Nov** | — | -124 (electrical/ops) | **-124** | **-115** |
| **Dec** | +1,423 (client PAC 10%) | -1,112 (Linyang SAT), -55 (ops) | **+256** | **+141** |

**Key finding: Without VAT, Batch 1 is self-funding.** The 30/20 advance mismatch creates a €2M buffer that carries operations through to PAC. The cumulative position dips only -€115K in November before recovering at PAC.

### 4B. VAT Layer — This Is Where Financing Is Needed

| Event | Month | Amount (€K) | Impact |
|-------|-------|------------:|--------|
| VAT received on client 30% advance | Apr | +811 | Cash in (held for remittance) |
| VAT received on client 55% pre-shipment | Jun | +1,487 | Cash in (held for remittance) |
| **Q2 VAT return — remit to tax dept** | **10 Aug** | **-2,248** | Cash out (return of client VAT) |
| **Import VAT at customs** | **20 Aug** | **-2,168** | Cash out (NEW money, no matching income) |
| VAT received on client 10% PAC | Dec | +270 | Cash in |
| Q3 return — excess credit carried forward | 10 Nov | 0 | No refund, credit sits with govt |
| **VAT refund (8-month rule, earliest)** | **Jun 2027** | **+2,168** | 10–15 months after payment |

**The import VAT (€2.17M for Batch 1) is the sole cause of the financing need.** It is paid in cash at customs in August 2026 and locked with the government until mid-2027 at the earliest.

### 4C. Combined Position (Ops + VAT)

| Month | Ops Cumulative (€K) | VAT Position (€K) | **Combined (€K)** |
|-------|---------------------:|-------------------:|-------------------:|
| Apr | +1,585 | +811 | **+2,396** |
| Jun | +3,420 | +2,298 | **+5,718** |
| **Aug** | +627 | -2,118 | **-1,491** |
| **Nov** | -115 | -2,118 | **-2,233** |
| Dec | +141 | -1,848 | **-1,707** |

**Peak deficit: ~€2.2M (November 2026).** Persists until VAT refund is received (mid-2027).

### 4D. Full Portfolio VAT Exposure

| Item | Batch 1 | Full Portfolio |
|------|--------:|---------------:|
| Import VAT at customs | 2,168,000 | 9,437,000 |
| Import duty (cash at customs) | 296,000 | 2,287,000 |
| Total customs cash | 2,464,000 | 11,724,000 |
| VAT locked with govt (net excess credit) | ~2,168,000 | ~7,800,000 |
| Duration locked | 10–15 months | 10–15 months |

---

## 5. CONSTRAINTS

Before reviewing solutions, these are the constraints we are solving around:

| Constraint | Status |
|-----------|--------|
| Lighthief Cyprus has no existing bank credit line | Confirmed |
| Linyang bank guarantees are non-transferable | Standard — expected |
| Parent group has limited funds to inject or guarantee | Working assumption |
| Clients with bank financing will require formal APG | Expected for Esperia/Galascope, Timotheos |
| Client contracts are not yet signed | Batch 1 target: 1 April 2026 |
| Contract structure can still be changed | Yes — this is the window |

---

## 6. SOLUTION OPTIONS

### OPTION A: Split Contract — Equipment Supply + EPC Services (RECOMMENDED)

**Restructure the EPC contract into two separate agreements:**

| Agreement | Parties | Value (B1) | Guarantees |
|-----------|---------|----------:|-----------|
| Equipment Supply | Client → Linyang | ~€11,116,000 | Linyang issues APG + performance bond directly to client |
| EPC Services | Client → Lighthief | ~€3,115,000 | No BG needed (small value, milestone payments) |

**How it works:**

1. Client orders equipment directly from Linyang (Lighthief facilitates under distribution agreement)
2. Client pays Linyang per Linyang's terms (20/50/20/10)
3. Linyang issues APG and performance bond directly to the client
4. Client is named as consignee — client pays import duty + VAT at customs (they recover it against electricity output VAT)
5. Lighthief provides EPC services (civil works, electrical, installation supervision, commissioning, SCADA, docs/compliance) under a separate services contract
6. Lighthief invoices services on milestone basis — no large advance, no BG required

**Financial impact:**

| Metric | Current Turnkey Model | Split Contract Model |
|--------|----------------------:|---------------------:|
| Client APG from Lighthief | €4,269,300 | **€0** |
| Import VAT for Lighthief | €2,168,000 | **€0** |
| Working capital deficit | ~€2,200,000 | **~€0** |
| Bank facility needed | ~€2,500,000 | **€0** |
| Financing cost saved | — | **~€75,000–€150,000** |
| Lighthief margin (preserved) | €1,501,000 | €1,501,000 (as services fee) |

**Advantages:**
- Eliminates ALL guarantee and cashflow problems for Lighthief
- Clients get direct OEM guarantees (stronger than Lighthief guarantee)
- Clients recover import VAT through their own returns (faster for established businesses)
- Lighthief's margin is preserved as a services fee
- No external financing required

**Disadvantages:**
- Clients see the Linyang CIF price (margin visibility)
- More complex contract structure (two agreements per client)
- Lighthief gives up "turnkey EPC" positioning
- Requires Linyang's cooperation on direct client contracts

**Margin visibility mitigation:** The services contract can be structured as a fixed lump-sum covering all EPC scope (civil, electrical, installation, commissioning, project management, insurance, permits). Clients see a CIF price and a services price but not the detailed cost breakdown within either.

---

### OPTION B: Escrow Structure (No Guarantee Needed)

**Client advance is paid into a joint escrow account instead of directly to Lighthief.**

| Step | Action | Amount (B1) |
|------|--------|------------:|
| 1 | Client pays 30% into escrow (lawyer or bank-held) | €4,269,300 |
| 2 | Escrow releases to Lighthief upon proof of Linyang production order | €2,223,200 |
| 3 | Escrow releases upon FAT certificate + photo evidence | €1,500,000 |
| 4 | Escrow releases upon bill of lading / shipping confirmation | €546,100 |
| 5 | Pre-shipment (55%) paid directly to Lighthief | €7,827,050 |
| 6 | PAC (10%) paid directly | €1,423,100 |
| 7 | Retention (5%) held 24 months | €711,550 |

**Why this replaces an APG:** The client's money never leaves their control until verifiable milestones occur. The escrow provides equivalent or better protection than a bank guarantee from a thinly capitalised company.

**Cost:** Escrow agent fee: €3,000–€8,000 per client group. Total Batch 1: ~€15,000–€30,000.

**Advantages:**
- No BG required from Lighthief
- Arguably stronger protection for clients than a shell-company BG
- Standard mechanism in Cyprus (real estate, construction)
- Clients' financing banks understand and accept escrow
- Preserves single turnkey EPC contract structure

**Disadvantages:**
- Lighthief receives cash in stages, not upfront (tighter early cashflow)
- Still requires Lighthief to handle import VAT (unless combined with client-as-importer)
- Some clients may prefer a clean bank guarantee over escrow

---

### OPTION C: Agency Model — Lighthief as Linyang's Cyprus Agent

**Lighthief acts as a sales and project management agent rather than as the EPC principal.**

| Item | Current Model | Agency Model |
|------|--------------|-------------|
| Who contracts with client | Lighthief | Linyang (via Cyprus presence or SPV) |
| Who issues guarantees | Lighthief (cannot) | Linyang's bank |
| Who imports equipment | Lighthief | Linyang or client |
| Who installs | Lighthief subcontractors | Lighthief subcontractors (under Linyang contract) |
| Lighthief revenue | €14.2M turnkey (B1) | ~€1.5M agency fee (B1) + LTSA revenue |
| Cash flow through Lighthief | €14.2M | ~€1.5M |
| BG requirement | €4.27M | **€0** |
| VAT exposure | €2.17M | **€0** |

**Advantages:**
- Zero financial exposure for Lighthief
- Linyang handles all guarantees and import logistics
- Lighthief focuses on what it does: local project management, installation supervision, commissioning, O&M

**Disadvantages:**
- Lighthief gives up EPC principal status
- Revenue drops from €14.2M to ~€1.5M (margin is the same, but top-line shrinks)
- Depends entirely on Linyang's willingness to contract directly in Cyprus
- May complicate the LTSA relationship

---

### OPTION D: Reduced Advance with Milestone Structure

**Reduce the client advance to a level that does not require a formal BG.**

| Structure | Advance | Pre-Shipment | Delivery | PAC | Retention |
|-----------|--------:|------------:|---------:|----:|---------:|
| Current | 30% | 55% | 0% | 10% | 5% |
| Proposed | 10% | 55% | 20% | 10% | 5% |

Client advance drops from €4,269,300 to **€1,423,100**. Most clients (and banks) do not require a formal BG for advances under €1.5M — a corporate guarantee or contractual protections (title retention, termination rights) may suffice.

The 20% delivery milestone (€2,846,200) aligns with Linyang's 20% DAP payment, creating a natural pass-through.

**Cashflow impact:** Lighthief receives €2.85M less upfront. Must fund Linyang's 20% advance (€2.22M) from the €1.42M client advance plus ~€800K from own resources or the Voltus advance must be deferred.

---

### OPTION E: JV with a Funded Cyprus Partner

**Partner with an established Cyprus construction or energy company that has bank credit.**

| What the Partner Provides | What Lighthief Provides |
|--------------------------|------------------------|
| Balance sheet and BG capacity | Exclusive Linyang distribution |
| Cyprus bank credit line | Assembled pipeline (28 parks, €60.5M) |
| Local banking relationships | Technical knowledge (BESS) |
| Possibly: construction capability | Project management, O&M |

**Cost:** The partner will require a share of the margin. Typical range: 2–5% of contract value as a finance/guarantee fee. On Batch 1: €285,000–€712,000 (19–47% of the €1.5M margin).

**When this makes sense:** Only if the client absolutely requires a turnkey EPC with formal bank guarantees and none of the structural alternatives (A, B, C, D) are acceptable.

---

## 7. COMPARISON MATRIX

| Criterion | A: Split Contract | B: Escrow | C: Agency | D: Reduced Advance | E: JV Partner |
|-----------|:-:|:-:|:-:|:-:|:-:|
| BG from Lighthief needed | No | No | No | Maybe small | Partner provides |
| Import VAT eliminated | Yes | No | Yes | No | No |
| Margin preserved | Full | Full | Full | Full | Shared (50–80%) |
| Single contract for client | No (two) | Yes | Yes | Yes | Yes |
| Client sees CIF price | Yes | No | Yes | No | No |
| Linyang cooperation needed | Yes | No | Yes | No | No |
| External financing needed | None | ~€2.2M (VAT) | None | ~€800K + €2.2M VAT | Partner funds |
| Implementation complexity | Medium | Low | High | Low | High |
| Speed to implement | 2–3 weeks | 1 week | 4–6 weeks | 1 week | 4–8 weeks |

---

## 8. RECOMMENDED APPROACH

### Primary: Option A (Split Contract) + elements of Option B

1. **Split the EPC into Equipment Supply (Linyang → Client) and EPC Services (Lighthief → Client)**
2. Linyang issues APG and performance bond directly to clients under the equipment supply agreement
3. Client is named as importer of record — client handles import VAT through their own VAT returns
4. Lighthief provides EPC services under a separate fixed-price services contract with milestone payments
5. For the services advance (if any), use an **escrow mechanism** to avoid the need for a Lighthief APG
6. Lighthief earns the full €1.5M Batch 1 margin as a services fee

**This approach requires zero bank guarantees from Lighthief, zero import VAT exposure, and zero external financing.**

### Fallback: Option B (Escrow) if clients insist on a single turnkey contract

1. Maintain single EPC contract structure
2. Replace the APG requirement with a **joint escrow account** for the 30% advance
3. Combine with **client-as-importer-of-record** for equipment to eliminate the €2.17M import VAT problem
4. If client-as-importer is not feasible, include import duty + VAT as an additional component of the 55% pre-shipment invoice (client pre-funds customs costs)

---

## 9. ACTION ITEMS — BEFORE 1 APRIL 2026

| # | Action | Owner | By When | Dependency |
|---|--------|-------|---------|------------|
| 1 | **Discuss split contract model with Linyang** — confirm willingness to contract directly with Cyprus end-clients for equipment supply | Founder | 28 Mar | None |
| 2 | **Draft two-agreement template** — Equipment Supply Agreement (Linyang ↔ Client) and EPC Services Agreement (Lighthief ↔ Client) | Legal / Founder | 31 Mar | Action 1 confirmation |
| 3 | **Confirm Linyang APG terms for direct-to-client issuance** — issuing bank, face value, validity, call conditions | Founder / Klaudia | 28 Mar | Action 1 |
| 4 | **Sound out Batch 1 clients on split structure** — Galascope/Esperia, Timotheos, Lampros, Spanercom | Founder | 31 Mar | Action 2 draft |
| 5 | **Identify escrow agent (fallback)** — Cyprus law firm or bank escrow service for client advance holdback | Founder / Legal | 31 Mar | None |
| 6 | **Confirm client-as-importer VAT treatment with tax advisor** — ensure clients can recover import VAT on BESS equipment | Tax advisor | 28 Mar | None |
| 7 | **Apply for Economic Operator registration** with Cyprus Customs (required regardless of structure) | Admin | Immediately | None |
| 8 | **Apply for monthly VAT returns** (repayment trader status) with Cyprus Tax Department | Accountant | Before May 2026 | None |

---

## 10. DISCUSSION QUESTIONS FOR FOUNDER

1. **Is Linyang willing to contract directly with end-clients?** The distribution agreement may need an amendment or carve-out for Cyprus projects where Lighthief cannot provide bank guarantees.

2. **Are clients aware that Lighthief has no balance sheet for guarantees?** If not, discovering this after contracts are signed creates serious trust issues. Better to present the split structure proactively as "direct OEM backing" (a strength, not a weakness).

3. **Can the Lighthief international group contribute anything?** Even if funds are limited, a corporate guarantee from a parent with audited accounts and 11-country operations may satisfy some clients (particularly those without bank financing).

4. **What is the minimum acceptable margin structure?** If a JV partner is needed (Option E), how much margin can be shared? At what point does the deal stop making economic sense for Lighthief?

5. **Is the LTSA (O&M) revenue the real long-term value?** If so, the EPC margin is less important than securing the installed base. The split contract model (Option A) or agency model (Option C) both protect LTSA revenue while removing financial risk.

---

## 11. DISCUSSION POINTS FOR THE BANK

If approaching Bank of Cyprus or Hellenic Bank for any facility:

### What Lighthief Can Offer

| Asset | Value | Bankable? |
|-------|-------|-----------|
| Signed EPC/services contracts (Batch 1) | €14.2M revenue | Yes — assignable receivables |
| Linyang distribution agreement (exclusive Cyprus) | Strategic | Yes — supports credit assessment |
| Confirmed pipeline (28 parks) | €60.5M total | Indicative only |
| LTSA contracts (15-year O&M) | ~€846K/year recurring | Yes — long-term cash flow |
| Linyang APG (non-transferable) | €2.22M | No — cannot be pledged |

### What Lighthief May Need From the Bank

| Facility | Amount | Duration | Purpose | Security Offered |
|----------|-------:|----------|---------|-----------------|
| VAT bridge (if Lighthief imports) | €2,200,000 | 12 months | Bridge import VAT until govt refund | Assignment of confirmed VAT refund claim |
| Escrow account services | N/A | 6 months | Hold client advance with milestone release | Self-securing |
| Trade finance (L/C) for Linyang | €2,223,200 | 4 months | Pay Linyang advance via letter of credit | The imported equipment itself |

### Key Message to the Bank

> Lighthief is not requesting unsecured credit. The proposed structure (split contract or escrow) eliminates the need for bank guarantees. The bank's role is limited to:
> (a) providing an escrow account service for client advances, and/or
> (b) a short-term VAT bridge facility secured against a confirmed government refund claim.
>
> The EPC project is self-funding at the operational level. The only cashflow gap is caused by Cyprus's lack of postponed VAT accounting for imports — a structural issue, not a commercial one.

---

## APPENDIX A: Batch 1 Parks

| Park | Group | MW | MWh | Containers | District | Revenue (€) |
|------|-------|----|-----|-----------|----------|------------|
| Galascope 1 | Galascope | 5.0 | 20 | 6 | Famagusta | 2,258,900 |
| Galascope 2 | Galascope | 2.5 | 10 | 3 | Famagusta | 1,206,300 |
| AGM Sunfield 1 | Timotheos | 5.0 | 15 | 5 | Nicosia | 1,961,880 |
| L&T Sun Energy | Timotheos | 5.0 | 15 | 5 | Limassol | 1,961,880 |
| TBC (5 MWh) | Timotheos | 1.5 | 5 | 2 | TBC | 800,000 |
| Solar Breeze | Lampros | 1.51 | 5 | 2 | Limassol | 795,443 |
| Solar Garden | Lampros | 3.29 | 10 | 3 | Limassol | 1,321,976 |
| Anarita 1 | Spanercom | 5.0 | 15 | 5 | Paphos | 1,961,880 |
| Anarita 2 | Spanercom | 5.0 | 15 | 5 | Paphos | 1,961,880 |
| **TOTAL** | | **33.8** | **110** | **36** | | **€14,231,000** |

## APPENDIX B: Key Dates (Batch 1)

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
| FAC (Final Acceptance) | 31 March 2027 |

## APPENDIX C: Document Cross-References

| Document | Location |
|----------|----------|
| Portfolio SSOT | `lib/portfolio-data.ts` |
| Previous BG plan (stale — includes ABIO, old terms) | `financial/batch1-bg-financing-plan-mar2026.md` |
| Guarantee comparison vs competitors | `docs/quotations/internal-analysis/guarantee-comparison.md` |
| Cashflow analysis (Feb 2026, old portfolio) | `docs/internal/cashflow-analysis-feb2026.md` |
| Client EPC template (guarantee clauses §7.4–7.6) | `legal/templates/client_sales.html` |
| Linyang distribution agreement (payment terms §11) | `legal/active/distribution.md` |

---

*Prepared by: Lighthief Cyprus Ltd — Internal Use Only*
*Date: 23 March 2026*
