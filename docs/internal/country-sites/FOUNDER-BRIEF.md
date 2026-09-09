# Lighthief country websites + CRM — founder brief

**For:** Dr. Arkadius Sybaris  
**From:** Cyprus / digital  
**Date:** 4 September 2026  
**Decision needed:** approve the plan so build starts

---

## What we are doing

One Lighthief look. One system. Five country addresses:

| Site | Role | When |
|---|---|---|
| **lighthief.it** | Italy — public site + CRM + HR | First |
| **lighthief.de** | Germany — public site + CRM + HR | First |
| lighthief.cy | Cyprus public site | Later (solarfarms.cy already covers this) |
| lighthief.es | Spain | After IT / DE |
| lighthief.com | Poland + group (existing Google rankings) | Last, carefully |

Each site uses the **local three languages**. Each country shows only **its** projects, services, prices, and market story. The design stays the same.

solarfarms.cy stays as it is for now (Cyprus investors + the CRM the Cyprus team already uses). It is a **separate** site and is not mixed into this project.

---

## Why not stay on WordPress

lighthief.com and lighthief.cy are WordPress. That is fine for one country. It is a mess for five countries, three languages, different prices, and a sales CRM.

We already built the real working system on solarfarms.cy: website, sales CRM, leave / payslips, and a way to fill the CRM from public energy registers. We copy that model — we do not rebuild five WordPress sites.

---

## How it works (plain language)

Think of it as **one shop with five front doors**.

- A visitor in Milan opens lighthief.it and sees Italy: Italian first, then English and German. Italian projects. Italian services. Maurizio as contact.
- A visitor in Hannover opens lighthief.de and sees Germany the same way.
- A staff member logs into `/crm` on their country site and sees **only that country’s pipeline**.
- You (and Alexander / Leon) can switch country and see everything.

The website and the CRM are the same product. A contact form on the Italian site becomes an Italian lead. Leave requests go to the local director, not to Cyprus by default.

---

## One system, five addresses (how the domains work)

This is **one codebase** and **one hosting project** (Vercel — the same platform that already runs solarfarms.cy). It is not five websites to maintain.

```
lighthief.it   ─┐
lighthief.de   ─┤
lighthief.es   ─┼──  one project  →  visitor’s address decides the country
lighthief.cy   ─┤
lighthief.com  ─┘

solarfarms.cy  ────  stays on its own project (unchanged)
```

We do **not** build five copies. We attach more front doors to the same shop. A design fix or CRM improvement ships once and appears on every country site.

### Pointing a domain (when we go live)

Two steps, per country:

1. **Add the address** to the new Vercel project (lighthief.it, then lighthief.de, …).
2. **At the domain registrar** (where the name was bought), point the website record at Vercel. Email records are left alone — `m.ganis@lighthief.com` / office mail keep working.

Until we flip that switch, we test on a private preview link. The live country site does not change until you say so.

| Address | Point to the new system | Why |
|---|---|---|
| **lighthief.it** | First | Italy launch |
| **lighthief.de** | First | Germany launch |
| lighthief.es | Later | Same project — just add the door |
| lighthief.cy | Later | WordPress stays until we switch |
| lighthief.com | **Last** | Polish Google rankings — do not move early |
| solarfarms.cy | Never onto this project | Separate investor + Cyprus CRM site |

`www` will redirect to the main address (lighthief.it, not www.lighthief.it). Same for Germany.

---

## What the Cyprus CRM already does (we keep this)

The Cyprus team already has a working sales desk on solarfarms.cy:

- Pipeline of park owners and warehouse rooftops
- Call notes, tasks, daily queue, email sequences
- Internal knowledge (how we sell BESS, EPC, O&M)
- Leave requests and payslips
- Alexander sees the team dashboard and approves leave

We are **not** inventing a new CRM. We are taking this desk and making it work per country.

---

## How we fill the CRM (same method as Cyprus)

In Cyprus we did not type parks by hand. We built a list from public sources, then found the people:

1. **Public energy register** — who owns which park (CERA in Cyprus)
2. **Grid / connection lists** — who is actually ready to build (EAC)
3. **Company register** — directors and addresses
4. **Email tools** — find a real inbox (Hunter)
5. **Warehouse roofs** — map large roofs and estimate solar savings (same method works in any EU country)

Then the list lands in the CRM. Salespeople call. The system does not overwrite their notes when we refresh the data.

**Italy** — same idea, different registers: Terna / GSE plant lists + Italian company register (Registro Imprese).  
**Germany** — Marktstammdatenregister (MaStR) is the closest thing to CERA, plus Handelsregister. Germany’s register is huge, so we only take utility-scale parks (same size cut we used in Cyprus: roughly 250 kW and up).

First wave for Italy and Germany: known relationships Maurizio / Leon already have, plus a filtered public download. Full automation comes after the sites are live. We will not wait for a perfect scraper before the websites launch.

---

## Employment / HR per country

The leave screen stays the same. The **rules** change:

| | Cyprus (today) | Italy | Germany | Poland (later) |
|---|---|---|---|---|
| Annual leave floor | 20 days | 20 days (often 26–28 by CCNL) | 20 days (often more by contract) | 20 days, 26 after 10 years’ service |
| Public holidays | ~14, extra | National + region | National + Land | 14, extra |
| Who approves | Alexander | Italy director | Germany lead | Poland director |
| Extra local rules | 13th salary, Holiday Fund | 13th / 14th, CCNL, 2 weeks must be taken in-year | Bundesland holidays | Seniority step-up |

Payslips stay per legal entity. Italian staff do not see Cyprus payslips.

This is a simple country settings file — not a new HR software.

---

## What each country will sell (first cut)

The pages look the same. The menu changes.

- **Italy:** EPC, O&M, BESS (metering / standalone rules), institutional / developer work. Contact: Maurizio Ganis. Monitoring: Trieste.
- **Germany:** O&M, EPC, BESS (grid charging allowed; grid-fee rules), compliance-heavy clients. Contact: Leon Volkerink. Monitoring: Hannover.
- **Cyprus (later on lighthief.cy):** what we already sell — BESS, EPC, licensing, investment. solarfarms.cy stays the investor door.
- **Poland (last):** keep today’s Google pages — O&M, recycling, washing, BDO, due diligence. Same addresses. New design only.

Prices and project lists are per country. Internal costs and margins never appear on the public site.

---

## Google / lighthief.com

lighthief.com already ranks in Poland for O&M, recycling, washing, due diligence. We do **not** touch it until Italy and Germany are live and stable.

When we do: same Polish page addresses, new design. English and German get extra language paths. No “new website” that wipes the old links.

---

## What we need from you

1. **Approve this approach** — one codebase, one hosting project, five country addresses. Italy and Germany first. Poland last.
2. **Confirm Italy and Germany services** — what we actually sell there in 2026 (so the menu is honest).
3. **Name the local CRM / HR owners** — Maurizio for Italy; who approves leave and owns the pipeline in Germany.
4. **First prospect lists** — any Excel / email lists the Italy and Germany teams already have. We load those on day one; public-register fill comes next.
5. **Domains** — confirm we control lighthief.it and lighthief.de (who is the registrar). We need login or a person who can change the website DNS. Email stays as it is.

Cyprus team and solarfarms.cy keep working. Nothing there is switched off.

---

## After approval

Build starts with the Italy and Germany public sites (same design, local language, local contact). We test on a preview link first. Only when you approve do we point lighthief.it and lighthief.de at the new system. CRM and HR turn on on those same addresses as soon as the country settings and first user logins are ready.

The detailed build order is in [PROJECT-PLAN.md](./PROJECT-PLAN.md).
