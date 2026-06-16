# Galascope-only — VAT & project cashflow (Q3 start)

**Status:** INTERNAL — management estimates  
**Scope:** Galascope 2 parks only (€3,444,300 ex VAT)  
**Source:** `lib/portfolio-data.ts` BATCHES[0], PAYMENT_TERMS, user assumptions May 2026  
**Opening cash:** €0 · **Company burn:** €25,000/month from first invoice  

---

## Assumptions (locked)

| # | Assumption |
|---|------------|
| 1 | First client invoice **August 2026** → production order starts |
| 2 | Second milestone invoice **4 months later** (December 2026) = **55% pre-ship** |
| 3 | **CIF landing** = first payment **+ 7 months + 54 days shipping** |
| 4 | **PAC / 10% client** = **6 weeks after landing**; Linyang **10% SAT** same window |
| 5 | **Kick-off sensitivity:** client connection may allow start **Jul / Aug / Sep / Oct** — shifts all dates |
| 6 | **VAT:** 19%; subcontractor **input VAT** only on **v5 local adders** (ex-VAT €370,538 → input VAT €70,402 max) |
| 7 | **Linyang:** 20 / 50 / 20 / 10 on CIF €2,823,169 — payments **ex VAT** |
| 8 | **Import VAT:** 19% × CIF = **€536,402** cash at customs (no postponed accounting) |
| 9 | **Early refund:** request after quarter return due date; **6 weeks** to cash (safe) |
| 10 | **Not in model:** origination pool, retention release, bank facility, other projects |

---

## Base case — first payment 1 August 2026

| Milestone | Date |
|-----------|------|
| 30% client + Linyang 20% | **1 Aug 2026** |
| 55% client | **1 Dec 2026** |
| Linyang 50% pre-ship | **1 Feb 2027** (ready-to-ship ~54d before landing) |
| CIF landing + import VAT + Linyang 20% DAP | **24 Apr 2027** |
| PAC 10% client + Linyang 10% SAT | **5 Jun 2027** |
| 5% retention | ~Sep 2027 (+3m DLP, indicative) |

### VAT calendar (base case)

| Quarter | Content | Return due | Net (est.) | Refund cash (+6w) |
|---------|---------|------------|------------|-------------------|
| Q3 2026 | 30% client invoice (Aug) | 10 Nov 2026 | **Pay ~€175k** | N/A (payable) |
| Q4 2026 | 55% client (Dec) + subcon inputs | 10 Feb 2027 | **Pay ~€310k** | N/A (payable) |
| Q2 2027 | Import Apr + PAC Jun + subcon | 10 Aug 2027 | **Credit ~€470k** | **~21 Sep 2027** |

---

## Cash items (ex VAT unless noted)

| Item | € |
|------|---:|
| Client 30% gross (inc VAT) | 1,229,615 |
| Client 55% gross | 2,254,294 |
| Client 10% PAC gross | 409,872 |
| Linyang 20% / 50% / 20% / 10% | 564,634 / 1,411,585 / 564,634 / 282,317 |
| Local adders (ex VAT, v5) | 370,538 |
| Import VAT (cash at port) | 536,402 |

---

## Monthly cumulative (base case, €'000)

Subcon ex-VAT spread Aug 2026–Mar 2027; Linyang 50% Feb 2027.

| Month | Key flows | Cumul. |
|-------|-----------|-------:|
| Aug 26 | +1,230 client −565 LY −30 subcon −25 burn | **+610** |
| Sep–Oct 26 | subcon + burn | **+480** |
| Nov 26 | **−175 Q3 VAT** + subcon + burn | **+240** |
| Dec 26 | +2,254 client −85 subcon/burn | **+2,409** |
| Jan 27 | subcon + burn | **+2,334** |
| Feb 27 | **−310 Q4 VAT −1,412 LY 50%** + subcon/burn | **+527** |
| Mar 27 | subcon + burn | **+452** |
| **Apr 27** | **−536 import VAT −565 LY DAP** + burn | **−664** ← **peak** |
| May 27 | burn | **−689** |
| Jun 27 | +410 PAC −282 LY SAT + burn | **−586** |
| Jul 27 | burn | **−636** |
| **Sep 27** | **+470 VAT refund** (Q2 credit) | **−166** |
| Oct 27 | burn | **−191** |

**Peak project + burn deficit: ~€690k (May 2027)** before PAC partial relief; **~€636k (Jul)** before Sep refund.

After Sep refund + further milestones → back positive.

---

## Kick-off sensitivity (landing date)

First payment → landing = **+7 months + 54 days**

| First invoice | Landing | PAC (+6w) | Q2 VAT refund (~6w after 10 Aug) |
|---------------|---------|-----------|-----------------------------------|
| Jul 2026 | 27 Mar 2027 | 8 May 2027 | ~21 Sep 2027 |
| **Aug 2026** | **24 Apr 2027** | **5 Jun 2027** | **~21 Sep 2027** |
| Sep 2026 | 28 May 2027 | 9 Jul 2027 | ~21 Sep 2027 |
| Oct 2026 | 27 Jun 2027 | 8 Aug 2027 | ~21 Sep 2027 |

Peak shape similar; **later start → later crunch → later refund**.

---

## Why this is NOT €1.3M

Old `cashflow-analysis-feb2026.html` peak **~€1.32M** used **multi-park Batch 1** and **€5M+ Q2 output VAT** / **€2.58M refund**.  
Galascope-only with **Q3 start** peaks at **~€650–690k** (project + €25k/mo burn), driven by:

1. **Apr 2027 import VAT €536k** (cash out)  
2. **Apr 2027 Linyang DAP €565k**  
3. **Feb 2027 Q4 VAT remittance ~€310k**  
4. **Sep 2027** earliest bulk refund (Q2 credit) — **~5 months** after import  

Not “19% × €3.5M twice” — timing of **import cash** vs **delayed input-VAT refund**.

---

## Shapiro / bridge sizing (this model)

| Tier | € | Covers |
|------|---:|--------|
| Import VAT bridge only | **550–600k** | Customs VAT until refund (tight if no PAC timing help) |
| Through peak (May–Jul 27) | **650–750k** | Peak cumulative + small buffer |
| Comfortable + buffer | **800k–1.0M** | Slippage on Linyang 50%, subcon, or kick-off month |

**Offer 1 (€500k)** ≈ import VAT bridge — **slightly short** for full peak.  
**Offer 2 (€1.5M)** — **more than Galascope timing needs** unless combined with company-wide runway or second project.

---

## Open validation

- [ ] Confirm Linyang **50%** aligns **Feb 2027** (pre-ship) vs **Dec 2026** with client 55%  
- [ ] Confirm actual **first invoice month** when EPC signs  
- [ ] Accountant: early refund eligibility on **Q2 2027** credit (import + PAC same quarter)  
- [ ] Retention **5%** timing for cash completeness  

---

*Lighthief Cyprus Ltd — internal only — May 2026*
