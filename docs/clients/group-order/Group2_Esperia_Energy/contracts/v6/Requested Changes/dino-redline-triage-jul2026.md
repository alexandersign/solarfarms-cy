# Galascope v6 — Dino / Anastasios Redline Triage
**Prepared by Lighthief Cyprus Ltd · July 2026**
**Sources:** EPC client redline, LTSA client redline, Anastasios lawyer memo ("Galascope Lawyer comments")

---

## Final decisions log (22 Jul 2026)

The following calls were confirmed and implemented in the v6 generators (EPC Annex V6 + LTSA rewrites). Package regenerated and verified.

| # | Item | Decision | Where implemented |
|---|------|----------|-------------------|
| 1 | Precedence / integrated suite | **Accept as client wants** — most-favourable-to-Client interpretation governs (fixed-order counter dropped) | EPC Annex V6 §11.5 |
| 2 | Independent Engineer sign-off | **Confirm for PAC payment only** (10-BD deemed acceptance; advance & pre-shipment unaffected) | EPC Annex V6 §7.1A |
| 3 | Liability carve-outs (§13.3A) | **Accept recommendation** — uncap latent defects + safety/grid-code only; firmware/software/design stay OEM-backed & capped | EPC Annex V6 §13.3A |
| 4 | LTSA termination | **Accept client** — Client 90 days; Service Provider 12 months (post-Initial-Term), warranty/data preserved | LTSA §13.4 |
| 5 | LTSA SOH systemic trigger | **Accept client** — 5% → 3% of capacity | LTSA §10.4(b) + Schedule 5 Category B |
| 6 | Cyber-security §18A | **Pending** — awaiting DISPERON/Voltus IEC 62443 / NIS2 confirmation (THIRD-PARTY) | Not implemented (see A4) |
| 7 | EMS fee vs LTSA fee | **Include EMS in the LTSA rate** — €1,740/MWh/yr is the all-in Tier C rate matching the competitor price the client understood; DISPERON EMS subscription not billed separately on top | LTSA Schedule 2 |
| 8 | Lighthief International guarantee | **Confirmation letter, Arkadiusz signs** — narrow performance undertaking (delivery, install/commissioning, 5-yr EPC warranty) by letter signed by Dr. Arkadius Sybaris | EPC Annex V6 §16.3B |

---

## How to read this document

| Rating | Meaning |
|--------|---------|
| **ACCEPT** | Safe, aligned with our position, or a drafting clarification. Implementing now in the generators. |
| **NEGOTIATE** | Has commercial or liability implications. Decision needed from you before we incorporate. Recommended position stated. |
| **PUSH-BACK** | Materially against Lighthief's interests. We recommend a counter-position. |
| **THIRD-PARTY** | Cannot commit unilaterally — needs Linyang, Alpha Bank, Marsh, DISPERON or the board. Flagged for follow-up. |

---

## Part A — EPC v6 Redline

### A1. ACCEPT items (implementing now)

| Ref | Dino/Anastasios ask | Why we accept | What we are adding |
|-----|---------------------|---------------|-------------------|
| EPC 10.x + Anastasios #6 | Grid-forming (VSG) / black start activation, firmware, commissioning support **included in the Contract Price** unless a post-signing DSO requirement first published after the Effective Date materially exceeds known requirements | Matches our stated commercial position in the cover note; closes the contradiction with the Technical Agreement which reserves price recalculation | Replace the existing "confirmed by amendment" wording with the client's cleaner version — included in price with the DSO carve-out |
| EPC 4.4(f) | Contractor responsible for end-to-end BMS/PCS/SCADA/EMS interface compatibility, command execution and data integrity at PAC and through DLP; affiliate/subcontractor failure is the Contractor's | Consistent with our single-point-responsibility model and the EMS guarantee in §4.4(b) | New §4.4(f) clause |
| EPC 10.5A + Anastasios #4 | EMS-affiliate carve-out: warranty-void conditions (§10.5) and availability exclusions (LTSA §9.3(e)) do **not** apply where the failure is attributable to DISPERON or any Lighthief group entity | Legitimate. We cannot hide behind our own affiliate causing an outage. Client's lawyer is right on this. | New EPC §10.5A clause |
| Anastasios #1 | LTSA executed **simultaneously** with (or as a CP to) the EPC | Already our intent per §11.4. Tighten wording to make it a genuine condition precedent, not just a stated intent | Update §11.4 / Annex 1A.5 companion-document list |
| EPC 19.12 | Contractor delivers all as-builts, certificates, SCADA/IEC 60870-5-104 point lists, Modbus register maps, relay settings, firmware records, serial numbers, fire-system certs, C5 coating certs, SLD, protection-setting records | Good practice; already in spirit (§19.1 reference to v4.0). An explicit list avoids disputes at handover | New §19.12 clause |
| Schedule A General | Technical Specification frozen before order placement; all TBCs and placeholders closed before PO | Protects us equally — we should not order against an open spec | Note added to Schedule A |
| EPC 14.4 / 14.5 | Insurance evidence provided **before** the first payment, not after it | Currently §14.4 says "within 14 days of first payment" — clients and lenders reasonably expect evidence first | Change the trigger from "after" to "before" |

---

### A2. NEGOTIATE items (decision needed)

| Ref | Ask | Our recommended position | Your call |
|-----|-----|--------------------------|-----------|
| EPC 9.2 + Anastasios #3 | DLP 3 months → **6 months** (minimum); client also floats 12 months + latent-defect obligation (§9.2A) | **Recommend accepting 6 months.** Extends three protections simultaneously (Contractor's rectification obligation, OEM 5% performance guarantee, 5% retention/SAT). It costs us 3 extra months of guarantee validity and 3 months' later release of the retention. Counter the 12-month/latent-defect ask — 6 months for all defects, latent or otherwise, is adequate. | Accept 6? Or stay at 3? |
| EPC 9.2 (FAC) | Reinstate a Final Acceptance Certificate at end of DLP; retention only released on FAC | Our current design (no FAC, auto-release) is clean. If you accept 6-month DLP, the auto-release at DLP end is fine — a FAC just adds an approval step where the client could drag its feet | Accept FAC or keep auto-release? |
| EPC 9.1A/9.1B | PAC acceptance matrix (capacity, RTE, SCADA, protection, BMS, EMS, fire, emergency stop all required before PAC sign-off); if performance is below Contract guarantees but above PAC floor, Contractor must remedy post-PAC | Accepting the matrix concept is fine — it's essentially what PAC already requires. The **remediation obligation for sub-guarantee performance above the PAC floor** is a new LD-type exposure: we need this **capped and back-to-back with Linyang** (capacity/RTE are OEM equipment-dependent). Do not accept open-ended. | Accept capped remedy? What cap (suggest: same LD formula, max 10% Component A)? |
| EPC 8.4.2A / 8.4.8 | Delivery Schedule binding with hardcoded latest dates; no extension of time for production capacity, raw-material, port congestion, financing | This directly conflicts with our deliberate "confirmed at order release, production lead-time may change" design and the upstream FM flow-through we negotiated. Accepting removes most of our EOT protection and makes us liable for OEM-side delays we cannot control | Push back: offer hardened milestone-tracking (binding Delivery Schedule, progress reporting) but preserve the EOT regime we have. Specifically, OEM-declared FM per §8.4.7A and connection-term delays remain valid EOT grounds. |
| EPC 8.4.4A | LD cap does not limit completion obligation or APG-recoverable amounts | Agreeable in principle — the cap should not excuse non-delivery. But "any amounts recoverable under APGs" is redundant (APG is separate) and "regulatory, fire-protection, cyber-security non-conformity" adds new liability categories | Accept with redraft: cap does not limit completion or safety/grid-code mandatory rectification; keep APG reference out |
| EPC 7.4(e) | Set-off rights: client may set off Delay LDs, performance LDs, defect costs, third-party completion costs against any unpaid milestone | Moderate concession. Standard in EPC contracts but creates a payment dispute mechanism. Acceptable if limited to amounts that are: (i) agreed in writing or determined by an adjudicator, and (ii) not disputed | Accept with "ascertained or agreed" qualifier |
| EPC 7.1A | No milestone due unless conditions satisfied, no material default, test cert accepted by IE | Effectively creates an Independent Engineer gate at every payment. Delay risk is significant if IE is slow | **DECIDED — accept for PAC payment only.** Implemented as Annex V6 §7.1A (IE/Client sign-off gates the PAC payment only, 10-BD deemed-acceptance; advance & pre-shipment unaffected). |
| EPC 13.3A | Liability caps do not apply to design defects, latent defects, firmware defects, cyber breach, regulatory non-compliance | This significantly expands the uncapped category beyond "manufacturing defects + fraud + wilful misconduct" | **DECIDED — accept recommendation.** Implemented as Annex V6 §13.3A (uncap latent defects + safety/grid-code non-compliance only; firmware/software/design stay OEM-backed and capped). |
| EPC 11.5 precedence / Anastasios suggestion | All project documents read as integrated suite; in case of inconsistency the interpretation **most favourable to the Client** governs | Client-elective "most favourable" is a wide concession (see Push-back A3) | **DECIDED — accept as client wants.** Implemented as Annex V6 §11.5 (integrated suite; most-favourable-to-Client interpretation governs). Fixed-precedence counter dropped. |
| LTSA — Per-Park 97% | Availability measured per Park individually, not at group/portfolio level | **Accept.** Anastasios is right. Group-level is not defensible for a two-park client and we already adjusted the Aeolian LTSA to per-Site. Update the Galascope LTSA to match. | Confirm accept? |
| LTSA — LD cap (20% → 100%/Park) | Availability LD cap raised from 20% of annual Service Fee to 100% of annual Park fee | The current 20% cap is very low (≈€13K/yr). Offer 100% of the annual Service Fee for that Park — it is still only ≈€44K/yr per park on Tier C, which is modest. This concession costs us the annual fee, not more. | Accept 100%? Or offer 50%? |
| LTSA — Remove sole remedy | Availability LDs no longer the sole remedy; Client can claim for repeated breach, wilful default, gross negligence, safety incidents on top | Accept the carve-out for **wilful default + gross negligence + safety incidents only**. These should never be capped anyway. Keep sole-remedy for ordinary availability shortfall. | Accept carve-out? |
| LTSA — SOH LD to full lost income | SOH LD = full market replacement cost/augmentation (current: 50% of total Service Fees paid) | Cannot accept "full market lost income" — this is a revenue guarantee, not a service contract. Counter: SOH LD = full cost of restoring the guaranteed capacity (augmentation or equivalent replacement), capped at the **total Service Fees paid for Tier C + warranty-extension services** (better than current 50% cap but not open-ended) | Accept this counter? |
| LTSA — Liability cap (12 months → 200%) | General liability cap raised from 12 months' fees to 200% | Our current 12-month cap is genuinely low for a 15-year relationship and a €3.4M system. Counter-offer: **24 months** for ordinary claims, preserving existing carve-outs (wilful/gross negligence/fraud) | Accept 24 months? |
| LTSA — Remove CPI+2% escalation | No increase in Service Fees | Cannot accept a flat freeze for a 15-year agreement. Counter: CPI only (no +2%), capped at 3% in any year | CPI-only acceptable? |
| LTSA — Asymmetric termination | Client 90 days; Service Provider 12 months + post-termination warranty/data obligations | Reasonable asymmetry given the client's project-finance context. Accept — our 15-year arrangement means we want to stay; 12-month notice protects continuity | **DECIDED — accept client.** LTSA now: Client 90-day convenience termination; Service Provider 12-month notice (post-Initial-Term only), warranty/data/transition obligations preserved. |
| LTSA — Systemic trigger 5% → 3% | SOH systemic-underperformance trigger lowered from 5% to 3% of capacity | Small change (3 vs 5% of 30 MWh = 0.6 MWh difference). Acceptable given OEM SOH guarantees back us. | **DECIDED — accept client.** Systemic-underperformance trigger lowered to 3% in LTSA §10.4(b) and Schedule 5 (Category B). |
| LTSA — Tier C default | Galascope treated as Tier C from PAC unless expressly selected otherwise | Accept — we assume they want Tier C. Just confirm with Dino that Schedule 2 will be completed accordingly. | Confirm with Dino |
| LTSA — Scheduled downtime 10 days → 2 days | Maximum annual scheduled downtime reduced from 240h/10 days to 48h/2 days | Very aggressive. Our quarterly maintenance windows need more than 48h/year (4 visits × ~2h each = 8h minimum, plus annual grounding tests). Counter: **4 days (96h)** per year, with visits pre-scheduled 30 days in advance and performed in low-dispatch windows | Counter at 4 days? |
| LTSA — Faster SLA: immediate ack, 2h on-site critical | See Push-back below | — | — |
| Spare parts: cells + full PCS + transformers in local warehouse | Client wants battery cells, full PCS units (1000/1250 kVA) and transformers stocked locally | Full PCS units and transformers are >€100K items — maintaining them in Cyprus is a significant cost. Counter: keep **critical sub-components** (control boards, sensors, fans, fuses) in local warehouse; full PCS/transformer replacement on 4-week OEM supply commitment | Accept sub-components only? |
| 15-year obsolescence commitment | Spare parts, firmware, equivalent replacement components available for 15 years | Reasonable for a 15-year contract. Accept the obligation to use commercially reasonable efforts; cannot guarantee OEM supply chain for 15 years | Accept reasonable-efforts version |

---

### A3. PUSH-BACK items (recommend counters)

| Ref | Ask | Our counter |
|-----|-----|-------------|
| EPC 11.5 / Anastasios | "Most favourable to Client" interpretation where documents conflict | **Counter with a fixed precedence order**, e.g.: (1) EPC Annex V6 > (2) EPC body > (3) LTSA > (4) Technical Agreements > (5) OEM documents. A client-elective "most favourable" clause is a blank cheque in any dispute — any inconsistency, however minor, becomes a renegotiation. Anastasios's own memo frames this as a suggestion, not a demand. |
| LTSA — availability LD to full lost revenue; SOH LD to full market lost income | Converts service-level credits into revenue guarantees | These are O&M service fees, not performance bonds. Our availability and SOH LDs should restore the service, not replace lost dispatch revenue. Revenue protection belongs in a power-purchase agreement, not an O&M contract. Counter is in the Negotiate section above (100% of annual Service Fee cap; SOH LD = full restoration cost). |
| LTSA — faster SLA: immediate ack, 2h on-site, 15-min auto-escalation | Current: 4h remote / next-Business-Day on-site for Critical; we deliberately relaxed from the v3 version | We have one Cyprus-based team. "Immediate" on-site or "within 2 hours" is operationally unsafe to commit. Counter: **immediate remote response** (we can always do this via the monitoring platform); **on-site by the next calendar day** (not just Business Day) for Critical; auto-escalation in 30 minutes not 15. The original relaxed SLA was agreed for this reason. |
| LTSA 12.7 — Client breach only suspends guarantees if proved to directly cause non-performance | Shifts the burden of proof entirely to us | Accept with modification: burden of proof stays on the Service Provider for ordinary maintenance failures; but for Client operational non-compliance (low SOC, no connectivity, access denial), the burden shifts — Client must show they complied. |

---

### A4. THIRD-PARTY items (cannot commit unilaterally)

| Ref | Ask | Who to engage | Status |
|-----|-----|---------------|--------|
| Anastasios #7 / EPC 10.9B | Issuing bank identity confirmed + governing law confirmed; bank "acceptable to Client" or confirmed through Cyprus/EU bank; partial drawings; no set-off | **Linyang / Bank of Communications + Alpha Bank** | Open — both marked [●] in specimens |
| EPC 13.6 + DWU 10.8A | Expanded manufacturing-defect carve-out (systemic, latent, design, firmware, batch, safety-recall defects); DWU irrevocable, waiver of defences | **Linyang** — needs to counter-sign the DWU with this wording | Draft DWU already has the carve-out language; Linyang hasn't signed it yet |
| EPC 14.5 | Insurance: additional insured / loss-payee / waiver of subrogation for Client and lender | **Marsh (Aris Samaras)** | Insurance not yet placed |
| EPC 18A / LTSA 18A | Cyber-security: IEC 62443, MFA, role-based access, audit logs, firmware integrity, incident reporting | **DISPERON / Voltus** — confirm their cyber-security posture and certifications | Not assessed |
| EPC 16.3A / LTSA 21.3B | Lender step-in rights + direct agreement | **Alpha Bank + Anastasios** | Alpha Bank connection-terms review pending |
| Anastasios risk note | Parent guarantee from Lighthief International Ltd for Lighthief Cyprus Ltd's EPC obligations | **Board decision** | **DECIDED — provide narrow confirmation letter.** Annex V6 §16.3B: Lighthief International Ltd performance undertaking (delivery, installation/commissioning, 5-yr EPC warranty), by confirmation letter signed by Dr. Arkadius Sybaris (Founder & CEO), delivered before advance payment. To be drafted. |
| Anastasios #5 | Technical Agreement fixes: (i) 2.7V vs 2.8V warranty-void threshold; (ii) pre-PAC charging responsibility; (iii) EMS "provided by customer" → DISPERON | **Technical team (Costas) + Linyang** | These are in the TA docs, not the EPC/LTSA generators |

---

## Part B — LTSA Redline (additional items not listed above)

| Ref | Ask | Rating | Recommended response |
|-----|-----|--------|----------------------|
| LTSA 2.4 | Integrated project-document suite clause | **ACCEPT** | Adding to LTSA |
| LTSA — Restoration/Resolution Time definitions | Add "Restoration Time" and "Resolution Time" to §3 definitions | **ACCEPT** | Good drafting; consistent with the SLA section |
| LTSA 4.3A | Corrective Maintenance includes all diagnosis, labour, travel within Cyprus, removal, re-installation, recommissioning, config restoration, testing | **ACCEPT** | Consistent with our turnkey-service intent; no new cost not already implied |
| LTSA 6.1A | Warranty preservation: SP must perform all maintenance required to preserve OEM warranty, DWU, SOH, corrosion, fire, PCS/MV, insurance; failure = SP loses right to invoke OEM warranty exclusion | **ACCEPT** | Protects client's warranty chain; also protects us (forces us to document our own work) |
| LTSA 6.3A | Warranty-preservation file per Park (checklists, photos, torque records, thermal images, grounding, firmware, alarm/SOC logs) | **ACCEPT** | Essential for Linyang warranty claims; matches the Linyang-acceptable data format obligation |
| LTSA 5.8A | Client data ownership — SP cannot use identifiable Client data for benchmarking/product development | **ACCEPT** | Standard GDPR-aligned data-ownership language |
| LTSA 5.6A | Richer reporting (raw data extracts, per-Park availability, SOH trend, cell imbalance, thermal deviation, firmware version, open punch items, spare-parts usage) | **ACCEPT** | No incremental cost; consistent with monitoring platform capability |
| LTSA 8.6A | Major Incident Procedure (fire, thermal event, forced outage >24h, cyber incident, grid-code breach) — notify, root-cause, RCA, client updates | **ACCEPT** | Good practice; aligns with regulatory reporting obligations |
| LTSA 9.2B | Availability calculated per Park AND aggregate | **ACCEPT** | Per-Park as discussed above |
| LTSA 9.8 | Chronic underperformance: below 95% in any year or below 97% for two consecutive years → remediation plan + independent audit | **ACCEPT** | Reasonable trigger; adds discipline |
| LTSA 10.3A | SOH/RTE/usable AC capacity testing pre-agreed protocol, witnessed by Client | **ACCEPT** | Already best practice; reduces disputes |
| LTSA 10.4A | SOH remedy includes all parts, labour, shipping, customs, craneage, installation, recommissioning, testing | **NEGOTIATE** | We accept parts + labour + recommissioning; customs + craneage for an OEM warranty return should be OEM-funded; request clarification |
| LTSA 10.6A | Annual evidence that OEM warranty reserve remains valid; notify Client within 5 Business Days of any OEM dispute | **ACCEPT** | Operational transparency; costs nothing |
| LTSA 13.6 | 90-day transition assistance on termination (data export, credentials, config files, register maps, firmware) | **ACCEPT** | Reasonable; industry standard |
| LTSA 20.5 | Independent expert for technical disputes (Availability, SOH, RTE, root cause) | **ACCEPT** | Better than litigation; reduces arbitration costs |
| LTSA Sched 5 / Schedule 4 | See Section A1 | **ACCEPT** | Implementing |
| LTSA 8.1A | Redundant monitoring channels, automatic alerts for low SOC/voltage/temperature/HVAC/fire/gas/PCS trip/comms loss | **ACCEPT** | Platform capability; no new hardware commitment |

---

## Pre-signature checklist (Anastasios)

- [ ] DWU **signed and sealed by Linyang** (still a draft)
- [ ] Performance guarantee **signed and sealed by Linyang** (still a draft)
- [ ] Final bank guarantees issued, **issuing bank + governing law confirmed**, forms match the specimens
- [ ] EMS Addendum **executed**; Lighthief Cyprus guarantee to cover DISPERON performance confirmed
- [ ] Technical Agreement fixes actioned (2.7V/2.8V, pre-PAC charging, EMS party)
- [ ] LTSA **Schedule 2 completed** (Tier, fees, warranty elections) before signing
- [ ] LTSA **reference updated** from EPC v4.0 to v6.0
- [ ] LTSA executed **simultaneously** with or as CP to the EPC

---

*Prepared by Lighthief Cyprus Ltd internal team · July 2026 · INTERNAL — not for distribution without redaction*
