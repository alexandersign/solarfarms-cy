# VAT Solutions Research — Cyprus & BESS Project

**Date:** March 2026  
**Purpose:** Verify which of the proposed VAT/cashflow solutions apply in Cyprus and for the Lighthief BESS EPC project.

---

## 1. Postponed Accounting for Import VAT (Article 211) — Cyprus

**Proposal:** Apply Postponed VAT Accounting (PVA) so import VAT is declared in the VAT return and claimed as input VAT in the same return, with **no payment at the border**.

**EU basis:** Council Directive 2006/112/EC Article 211 allows Member States to permit import VAT to be accounted for in the VAT return rather than paid at customs.

**Cyprus status:** **Not implemented.**

- Cyprus is consistently listed among the **EU Member States that do not have** postponed import VAT accounting (alongside Germany, Greece, Italy, Malta in various summaries).
- Cyprus VAT Law (Cap. 95 / Law 95(I)/2000) does **not** implement Article 211 in the sense of “no cash at border”: import VAT is still **paid at (or in connection with) customs clearance**; input VAT can then be reclaimed on the VAT return, but the **cash outlay happens first**.
- Some Cyprus materials refer to a “deferred payment scheme” for import VAT (e.g. payment delayed until the VAT return is filed). That may ease **timing** (e.g. pay when submitting the return rather than literally at the port) but does **not** amount to true PVA where output and input are declared in the same return with **zero cash flow** at the border. For our project we assume **import VAT is paid in cash** when goods clear customs (or shortly after, if deferred to return date), and refund/offset comes later.

**Conclusion for our project:** **Solution 1 (PVA in Cyprus) does not apply.** The cashflow model correctly assumes Cyprus import VAT is paid at clearance and refunded/offset in a later period. Lobbying or future law change could alter this; until then, no reliance on PVA in Cyprus.

---

## 2. VAT on Advance Payments — Place of Supply

**Proposal:** If advance payments are for goods still outside the EU (e.g. in China), the place-of-supply rules might allow advance payments to be treated without Cyprus VAT until the goods enter the EU.

**EU basis:**  
- Article 65: VAT becomes chargeable when payment is received (in advance).  
- Article 32: For goods imported from a third country, the place of supply by the **importer** (and any subsequent supply) is the **Member State of importation**.

**Application:**  
- When a **Cyprus company** is the importer of record and receives an advance from a client for **future supply of goods** (that will be imported into Cyprus), the supply is deemed to take place in **Cyprus** (Member State of importation).  
- The **tax point** for the advance is when the payment is received (Article 65).  
- So **Cyprus VAT is due on the advance** when the client pays; there is no general exemption or 0% treatment merely because the goods are still in China. The “advance for future imported goods” structure does **not**, under the Directive, avoid Cyprus VAT on advances.

**Conclusion for our project:** **Structuring advances as “for future imported goods” does not remove the obligation to charge/remit Cyprus VAT on advances when received.** The April 1 start and matching Linyang terms remain the main levers to align cash in/out and avoid Q1 output VAT.

---

## 3. Polish Company as Importer — Intra-Community Supply to Cyprus

**Proposal:** Use a Polish entity in the chain: China → Polish company (importer) → Cyprus. Poland has postponed import VAT; the sale from Poland to Cyprus is an intra-community supply (0% in Poland); Cyprus treats it as an intra-community acquisition with reverse charge (no cash at border).

**EU / Member State basis:**  
- **Poland:** Has implemented **postponed import VAT accounting** (from 1 July 2020). VAT-registered importers can account for import VAT on the VAT return rather than paying at the border.  
- **Intra-community supply (Poland → Cyprus):** In Poland the supply is 0% (ICS). In **Cyprus**, the acquisition is subject to **reverse charge**: the Cyprus acquirer self-assesses acquisition VAT (output) and, if the goods are used for taxable supplies, claims the same amount as input VAT — **no cash payment at the border**, only entries on the Cyprus VAT return.

**Conclusion for our project:** **Solution 3 (Polish company as importer, then supply to Cyprus) is structurally valid** for avoiding:

- **Cash at Polish border:** None (postponed accounting in Poland).  
- **Cash at Cyprus border:** None (acquisition VAT is reverse-charged; net effect on return, no physical payment).

**Practical considerations:**  
- Need a **Polish VAT-registered entity** (or use of an existing group entity / partner) as importer and seller.  
- Contracts: China → Polish entity (purchase); Polish entity → Cyprus (sale). Title/risk and Incoterms must be clear.  
- Compliance: Intrastat, EC sales list, Polish and Cyprus VAT returns, EORI, etc.  
- Cost/benefit: Legal and admin cost vs. cash flow benefit (avoiding ~€15M+ import VAT outlay at Cyprus customs across batches).  
- **Linyang:** Would need to agree to sell to the Polish entity (and possibly to deliver to Poland or an EU port where Poland clears), not directly CIF Cyprus.

This is a **structural alternative** that works under current EU and national law; feasibility for the project depends on group structure, Linyang’s willingness, and cost of implementation.

---

## Summary Table

| Solution | Works in Cyprus / for our project? | Note |
|----------|------------------------------------|------|
| **1. Postponed accounting (Art 211) in Cyprus** | **No** | Cyprus has not implemented PVA; import VAT is paid at clearance. |
| **2. Advance payments not triggering Cyprus VAT** | **No** | Place of supply is Cyprus (Member State of importation); VAT due when advance received. |
| **3. Polish company as importer → supply to Cyprus** | **Yes (structurally)** | Poland: PVA (no cash at border). Cyprus: acquisition reverse charge (no cash at border). Requires Polish entity and contract restructure. |

---

## References (summary)

- EU VAT Directive 2006/112/EC: Art. 65 (chargeable event), Art. 211 (postponed accounting option), Art. 32 (place of supply, import).
- Cyprus VAT Law 95(I)/2000 (Cap. 95); Cyprus Tax Department / customs guidance.
- EU-wide summaries: Eurotax, vatcalc.com, vatupdate.com (Cyprus among states without PVA).
- Poland: postponed import VAT from 1 July 2020; intra-community supply 0% with reporting.
- Cyprus: reverse charge for intra-community acquisitions (output + input on return, no cash at border).
