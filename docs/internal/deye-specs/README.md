# Deye C&I route — downloaded specs & analysis

Internal reference for **Trozena-style** projects: ~75 kWp PV (REC 410), ~215 kWh BESS, client genset, Deye stack.

**Fetched:** 2026-04-09. Sources are **Ningbo Deye ESS** (`deyeess.com`) and **Deye inverter** (`deye.com`). Firecrawl CLI was not authenticated in this environment; PDFs were downloaded with `curl` after URL discovery via public product pages.

## Files in this folder

| File | Source URL |
|------|------------|
| `Deye-MS-GS215-2H3-Series_Brochure-20251209V1.0-1.pdf` | `https://deyeess.com/wp-content/uploads/2025/12/Deye-MS-GS215-2H3-Series_Brochure-20251209V1.0-1.pdf` |
| `Deye-ESS-User-Manual-MS-G215-2H3-EU.pdf` | `https://deyeess.com/wp-content/uploads/2025/12/Deye-ESS-User-Manual-MS-G（S）215-2H3-EUENDE-V03-_202510301.pdf` |
| `DEYE-ESS-User-Manual-MS-EMS-MS-GS215-2H3-EN.pdf` | `https://deyeess.com/wp-content/uploads/2026/02/DEYE-ESS-User-Manual-MS-EMSMS-GS215-2H3-EN-V01-_20260123.pdf` |
| `DEYE-ESS-User-Manual-MS-EMS-EUEN.pdf` | `https://deyeess.com/wp-content/uploads/2026/02/DEYE-ESS-User-Manual-MS-EMS-EUEN-V01-_20260121.pdf` |
| `Deye-GE-F120-2H2F60-Series_Brochure-EU1.01.pdf` | `https://deyeess.com/wp-content/uploads/2025/12/Deye-GE-F120-2H2F60-Series_Brochure-20251215V-EU1.01.pdf` |
| `sun-60-80k-sg02hp3-eu-em6.pdf` | `https://deye.com/wp-content/uploads/2025/10/sun-60-80k-sg02hp3-eu-em6.pdf` |

**Note:** Trikkis lists **SUN-80K-SG01HP3-EU-BM4**; the manufacturer sheet above is **SG02HP3-EU-EM6** (same power class, next revision). Confirm interchangeability and G99/CEI compliance with Trikkis before substituting in a client BOM.

## Product naming: MS-G215 vs MS-GS215

- **MS-G215-2H3** — ESS + PCS; Deye ESS web specs focus on storage and **100 kW** AC.
- **MS-GS215-2H3** — **Solar + storage** integrated line: marketing table lists **up to 200 kWp PV**, integrated PCS (**SUN-100K-PCS01HP3** in brochure), parallel off-grid up to **10** units.

For **DC strings to the container**, the **MS-GS215** (“S” = solar) variant is the intended SKU — not a separate 80 kW hybrid, unless you deliberately design **AC coupling** or a second DC path.

## Do you need a separate SUN-80K hybrid?

**Usually no** if the BOM is **MS-GS215-2H3** (integrated MPPT + PCS + battery).

Evidence:

1. **User manual §2.1** (`Deye-ESS-User-Manual-MS-G215-2H3-EU.pdf`): system includes **MPPT** together with battery, PCS, TMS, and fire suppression.
2. **Brochure** (`Deye-MS-GS215-2H3-Series_Brochure-20251209V1.0-1.pdf`): PCS model **SUN-100K-PCS01HP3**; extracted table shows high **PV DC** capability (order of **200 kWp** / multiple MPPT channels — confirm exact string count and voltage windows in the full PDF tables).
3. A **standalone SUN-80K** hybrid is a second **battery-capable** inverter; paralleling it with a **fully integrated** MS-GS215 without a designed microgrid architecture risks duplicated control paths. Use it when you need **AC-coupled** retrofit PV, intentional **multi-unit parallel**, or a scope split explicitly signed off by Deye / the distributor.

## Generator backup

From **MS-G215 user manual** §4.2.7 (terminals; EN/DE issue 03):

- **Dry contacts (9, 10)** — diesel **generator start/stop**.
- **RS-485 (18, 19)** — **diesel generator** communication.
- **RS-485 (29, 30)** — customer **STS** device.

So generator management is **part of the ESS/EMS/STS ecosystem**, not something that requires the standalone hybrid inverter **for logic**. The **genset itself** remains client-supplied; integration (STS, protection, earthing, G59/NRS-type behaviour) is engineering scope.

## EMS: Deye vs external

- **MS-EMS** is Deye’s **station-level** controller: strategy templates, off-grid parameters, **STS** view (grid / generator / **parallel** relay states), MPPT/PV monitoring, diesel unit configuration (`DEYE-ESS-User-Manual-MS-EMS-MS-GS215-2H3-EN.pdf`).
- **External EMS** is optional if you need utility SCADA, multi-brand plants, or regulatory interfaces MS-EMS does not cover — not required for a **single-vendor Deye** site if Trikkis/Deye approve the full stack.

## GE-F120 series (context for Trikkis “switching” lines)

`Deye-GE-F120-2H2F60-Series_Brochure-EU1.01.pdf` describes **smaller** C&I **GE** cabinets (e.g. **122.8 kWh**, **~50 kW** class) with **integrated MPPT** and PV limits per model — useful to understand Deye’s **integrated** product philosophy; it is **not** the 215 kWh MS-GS215, but aligns with how **generator/grid** accessories are sold alongside ESS.

## Trikkis cross-check

Trikkis **700076** (215 kWh) shows **384 V** nominal on their list; Deye ESS brochure/manual emphasises **high-voltage** pack windows (e.g. **660–864 V** DC on the web spec table). **Treat as “same family, verify exact module code”** with Trikkis before locking electrical design.

## Licence / use

PDFs are © Ningbo Deye ESS / Deye Inverter. Keep for internal design review; redistribution to clients should use distributor-approved collateral.
