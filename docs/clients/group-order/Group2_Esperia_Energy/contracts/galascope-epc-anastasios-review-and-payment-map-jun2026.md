# Galascope EPC — Anastasios v5.1 review, APG expiry, and payment mapping (Jun 2026)

> **INTERNAL** — negotiation brief for Dino / Anastasios. Maps what the client's lawyer asked,
> our new direct-beneficiary APG structure, the APG expiry gap (Linyang vs client), and the two
> payment chains with equipment vs EPC tagging.

---

## 1. APG EXPIRY — the key tension to resolve

| Party | Wants APG to expire | Reason |
|-------|---------------------|--------|
| **Linyang** | **At port / delivery (CIF Limassol)** | Once equipment is delivered, the advance is "earned"; marine then CAR insurance + delivery take over. Linyang won't carry advance-refund exposure into commissioning. |
| **Anastasios (client)** | **At PAC** (or 12 months after delivery) | Wants protection through commissioning. |
| **Our v5.1 redline #3** | Earlier of **PAC or 12 months after delivery** | Drafted to the client's ask. |

### Why Linyang is conceptually right — and how we sell it to Anastasios

An **APG is an *advance-refund* guarantee**. Its only job is to return the advance **if the equipment is not delivered**. Once equipment **is** delivered, the refund risk is gone — so expiry at/around delivery is the **correct** life for this instrument. The client's "protect me to PAC" concern is really about **performance and defects after delivery**, which is covered by **different layers**:

```
ADVANCE ──────────► DELIVERY ──────────► PAC ──────────► DLP END
   │ APG (refund)        │ CAR / marine insurance   │ Performance bond 5% + Retention 5%
   │ expires here ───────┘ + Performance bond        │ + DWU / OEM warranty
```

| Phase | Risk | Instrument that covers it |
|-------|------|----------------------------|
| Pre-delivery | Advance lost if no equipment | **APG** (expires at delivery + short tail) |
| Delivery → PAC | Transit / site damage, commissioning | **Marine + CAR insurance**, **Performance bond (5% Comp A)** |
| PAC → DLP end | Defects, workmanship | **Retention (5%)**, **Performance bond**, **DWU / OEM warranty** |

### What we propose (compromise)

- **APG expiry: delivery to Site + 30 days** (one step beyond "at port" — covers inland leg to Site), with a hard longstop. Better than Linyang's "at port"; short of client's "PAC".
- **Bridge the delivery→PAC gap** explicitly with the **5% performance bond + CAR insurance + DWU** — present this layering to Anastasios so the shorter APG is clearly *not* a loss of protection.
- If Linyang holds firm at **CIF port**, accept it **provided** marine insurance covers port→Site and the performance bond is in place at delivery.

**Bottom line:** we likely **cannot** meet "APG valid to PAC". We **can** offer delivery+30 (or port) **plus a documented security-layer map** that gives equivalent end-to-end protection.

---

## 2. Anastasios v5.1 comments — ask vs our position

| # | Anastasios / board ask | Our position | Status |
|---|------------------------|--------------|--------|
| 1 | **§8.4.7A FM** — 10 BD dispute right on OEM pass-through | Accept dispute mechanism: 10 BD contest, 30-day → §15.3, **no extension during dispute**, only true §12.1 FM flows through | **Agree (full clause to be inserted)** |
| 2 | **§6.1 Confirmed Price** — full Mysteel calc + expert | Price Basis Certificates at signing + delivery, 14-day query, 5% walk-away; no separate expert unless disputed | **Agree** |
| 3 | **DLP** — 6 months | **Keep 3 months**; offset with performance bond + DWU + CAR | **Hold (offer security layering)** |
| 4 | **§10.9(d) APG** — until PAC / copy to client | **Exceeded:** client is now **beneficiary**, not copy-holder. Validity: see §1 (delivery+30 / port, not PAC) | **Better on beneficiary; negotiate expiry** |
| 5 | **EMS addendum** — execute with EPC, fix €400/MWh | Issue simultaneously; €400/MWh/yr 5 yrs from PAC | **Agree** |
| 6 | **§5A.1(f) Planning** — 60-day endeavours + cap | Add: 60-day endeavours, day-for-day, documented standby only | **Agree** |
| 11/12/13 | **§13.2 Liability** — split OEM vs non-OEM | 10% non-OEM / 50% other / **uncapped OEM defects + fraud**; fix (a) wording so OEM is not in the 10% tier | **Agree (wording fix pending)** |
| D11–D14 | **DWU** — direct enforcement, warranty start, insolvency training | Add §4.1(e) 60-day; warranty start = PAC logic; insolvency → replacement modules CIF + training | **Agree (DWU docs, pre-condition)** |

**Still to physically land in the generator** (independent of negotiation): full §8.4.7A, §6.1(g) certs, §5A.1(f), §13.2(a) wording, licensing clause.

---

## 3. New structure we now have (vs earlier back-to-back / escrow)

- **Direct-beneficiary APG:** Linyang's bank (Bank of Communications) issues the APG with **Galascope Ltd (+ Alpha security agent) as beneficiary** once it has the **signed EPC + Sales Contract** — original issuance, not transfer (which the bank refused).
- **Specimen ready:** `BoC-APG-Galascope-beneficiary-SPECIMEN-jun2026.docx` — for Dino to review and the bank to pre-confirm; attach as EPC "Form of APG" schedule.
- **No escrow / no Cyprus back-to-back** needed — client accepted equipment-only cover.
- **Sign safely:** APG is a **CP to the advance**, not to signature; add a **30-day longstop** to unwind at no cost if the bank doesn't issue.

---

## 4. Payment mapping — keep BOTH chains, show equipment vs EPC

### 4A. Client → Lighthief (EPC milestones — on Contract Price EUR 3,444,300 ex VAT)

| Milestone | % | Amount | Equipment vs EPC | APG-secured? | Trigger |
|-----------|---|--------|------------------|--------------|---------|
| **Advance** | 30% | **1,033,290** | Equipment portion + EPC services (unsecured, accepted) | Equipment advance **secured by APG up to 25% of Linyang CIF value** (confidential, < €846,951) | 30 days after later of Effective Date / Connection Terms / **APG delivery** |
| **Pre-shipment** | 55% | 1,894,365 | Mostly **equipment** (paid before goods leave factory) | n/a (post-FAT) | FAT pass + Linyang written confirmation |
| **PAC** | 10% | 344,430 | **EPC** (commissioning) | n/a | PAC issued |
| **Retention** | 5% | 172,215 | **EPC** (defects security) | n/a | Released at end of DLP (3 mo after PAC) |

### 4B. Lighthief → Linyang (Sales Contract — FINAL, confirmed 15 Jun)

Payment split **25 / 50 / 20 / 5** of the **Linyang CIF supply value** (per blended Sales-LTSA §7.1):

| Milestone | % | Relates to | Trigger |
|-----------|---|-----------|---------|
| **Advance** | **25%** | Equipment | T/T within 7 days of contract effectiveness / PO signing; APG issued (CP) |
| **Ex-Works** | **50%** | Equipment | Products ready for shipment from factory (after FAT + photo evidence) |
| **DAP arrival** | **20%** | Equipment | Products arrive on Site |
| **Holdback** | **5%** | Equipment acceptance | SAT completion + Provisional Acceptance |

*(Linyang shown as % only — the actual CIF price and the resulting amounts are **margin-confidential**.)*

**APG amount = 100% of the 25% advance = 25% of the Linyang CIF supply value (confidential figure — to confirm).** This is **lower** than 25% of EPC Component A, because Linyang's price is below the Component A figure (the difference is Lighthief's margin).

> ⚠️ **Margin-visibility flag (open decision):** if **Galascope is named beneficiary**, the APG face amount (25% of Linyang's real price) is visible to the client, who can back-calculate the OEM cost and Lighthief's margin. Decision pending: (a) keep APG **Lighthief-beneficiary** + give Galascope a separate Cyprus advance guarantee at 30% of **Contract Price** (no margin shown); or (b) accept margin visibility with Galascope as beneficiary.

### What to make explicit to Anastasios

1. **The advance has two parts:** equipment (APG-secured) and EPC services (unsecured, client already accepted).
2. **Equipment milestones** (advance equip-part, pre-shipment, CIF) follow the **goods** → these are where the APG lives and why its expiry tracks **delivery**, not PAC.
3. **EPC milestones** (PAC, retention) follow the **works** → covered by performance bond, retention, DWU — not the APG.
4. Our **upstream** Linyang steps and **downstream** client steps stay **separate and unchanged**; the APG simply bridges the **equipment advance** straight to Galascope.

---

## 5. Summary — agree / negotiate / hold

| Topic | Can agree | Negotiate | Hold |
|-------|-----------|-----------|------|
| FM dispute (§8.4.7A) | ✅ | | |
| Price Basis Certs (§6.1) | ✅ | | |
| Planning (§5A.1(f)) | ✅ | | |
| Liability split (§13.2) | ✅ | | |
| APG **beneficiary = client** | ✅ (better than asked) | | |
| **APG expiry** | delivery + 30 | port (if marine insurance) ↔ PAC | **not PAC** |
| **DLP** | 3 months + security layering | | **not 6 months** |
| EMS / DWU | ✅ | | |

*Lighthief Cyprus Ltd · HE 477423 · office@lighthief.com · +357 99 164 158 · solarfarms.cy*
