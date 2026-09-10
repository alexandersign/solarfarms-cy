# M2 Ventures GmbH — Cyprus PV + BESS (5 MWp / 5 MWh)

> **INTERNAL** — client file for the German family-office inquiry of 17 July 2026.

---

## Counterparty

| Field | Value |
|---|---|
| Company | M2 Ventures GmbH |
| Management | Dr Stefan Mittnik, Dr Alissa Mittnik |
| Email | m2ventures@mail.gmx |
| Phone | +49 159 04528661 |
| Fax | +49 4347 9098952 |
| Mailing address | Schauenburgerstr. 116, 24118 Kiel, Germany |
| Seat | Flintbek, Germany |
| Register | Amtsgericht Kiel, HRB 16213 KI |
| VAT | DE317974192 |
| LEI | 967600PQN7XJM2UADP60 |
| Mandate | Acquire RTB ground-mounted solar up to 5 MWp + up to 5 MWh BESS in Cyprus; award turnkey EPC + long-term O&M to a tier-1 island partner |

Correspondence: `correspondence/2026-07-17_M2-Ventures-inquiry-and-Arkadius-reply.pdf`

---

## NDA status — do not treat the PDF as an NDA

The attached PDF is **not an NDA**. It is the 17–18 July 2026 email thread:

1. Stefan Mittnik (M2 Ventures) inquiring for RTB 5 MWp / 5 MWh in Cyprus.
2. Arkadius Sybaris reply (18 July), pointing to lighthief.energy/company and offering a call. No project teasers were sent.

**No confidentiality agreement is on file with M2 Ventures.** Implication:

| Material | Send now (no NDA)? | Label? |
|---|---|---|
| Non-binding teasers (PARK-REF codes, no seller SPV) | Yes | **Yes — label every file** |
| Named-seller packs (Galascope Limited, Novikov / Arnal Verde, Ragelia / Balatsos) | **No** | Hold until mutual NDA |
| Data room, Excel models, permit PDFs, title | After NDA | Prepared for M2 Ventures |

### Labelling decision

**Label. Do not send unlabelled masters.**

Every outbound HTML in `send-pack/` has a navy banner: *CONFIDENTIAL — Prepared for M2 Ventures GmbH · Not for onward distribution*. PARK-REF-5001 (Dino / Galascope operational tracker) is **anonymised** in the send copy: SPV name removed, reference code only. Library copies in `teasers/` keep original wording for internal use and still carry the M2 banner so they are not mixed with public files.

Do not send `teasers/` as a zip. Several files name sellers (Novikov, Arnal Verde, Galascope Limited) and are for the data room after NDA.

---

## What they asked vs what we have

Their brief: **RTB, up to 5 MWp, up to 5 MWh, secured EAC/TSO, buy ticket + award EPC/O&M.**

| Asset | Ref | Why it is in the pack | Gap vs mandate |
|---|---|---|---|
| **Agios Theodoros, Larnaca** | PARK-RTB-2026 | The **2.6 MWp Larnaca RTB** they specifically wanted sent. Permits in place. | 2.64 MWp (not 5). BESS modelled at 10.56 MWh / 4h, not 5 MWh. |
| **Dino existing park = Galascope 5 MW trackers** | PARK-REF-5001 | Same asset. Operational 5.01 MWp Nclave trackers (Famagusta), asking **€9.00M**, BESS option 12.5 MWh. | Secondary sale of a working plant, not RTB. Storage is optional capex on top of the ticket. |
| Indicative 5 MWp tracker + 4h BESS | LH-CY-PVBESS-TRK | Closest **greenfield** shape if they insist on 5 MWp RTB + EPC. | Models **20 MWh (4h)**, not 5 MWh. No named land/grid ticket at 5 MWp is currently RTB. |

There is **no fully permitted 5 MWp / 5 MWh RTB ticket** in the current Cyprus pipeline. That is consistent with Arkadius’s July reply (thin RTB pool at this size; Cyprus RTB pricing among the highest in the EU).

### Other Cyprus teasers (library only — not in first send)

- Sia / Larnaca 3.2 MWp RTB (PARK-RTB-SIA-2026) — names Novikov / Arnal Verde; hold for NDA.
- RelyEZ 3.2 Larnaca — overlapping Sia grid story; permit-ready, not a second ticket.
- Christos Nicosia 3.3 MWp operational + 1.7 MWp expansion — another existing park; not Dino’s.
- Ragelia licensed tickets — smaller, grid terms mostly pending.
- Vanalio Nicosia RTB.
- Market / 1–5–10 MW one-pagers and the data-centre microgrid teaser.

---

## Folder

```
docs/clients/M2_Ventures/
  README.md                          ← this file (internal)
  draft-email.md                    ← ready to send from Alexander
  correspondence/                   ← July inquiry PDF
  send-pack/                        ← ATTACH THESE (labelled)
    00-cover-note.html
    01-larnaca-2.64mwp-rtb-agios-theodoros.html
    02-operational-5mwp-trackers-park-ref-5001.html
    03-indicative-cyprus-pv-trackers-4h-bess.html
    04-indicative-1-5-10mw-onepager.html   (optional; overlaps 03)
  teasers/                          ← full Cyprus teaser library (do not bulk-send)
```

Print the HTML files to PDF before attaching (Print / PDF in each file).

---

## Suggested first send

1. Cover note (`00`)
2. Larnaca 2.64 RTB (`01`)
3. PARK-REF-5001 operational trackers (`02`) — Dino / Galascope, anonymised
4. Indicative 5 MWp + 4h (`03`) — so they can compare a true 5 MWp RTB+EPC case

Hold `04` unless they want a shorter one-pager. Do not attach the `teasers/` library.

On the call: confirm 1-hour vs 4-hour storage, then issue mutual NDA and open the two data rooms.
