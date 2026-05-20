# DISPERON Client Order Agreements — Lighthief EU BESS Ltd

Client-facing EMS/SCADA order agreements for Cyprus BESS projects, adapted from the Voltus Energy templates in `legal/voltus-contracts/`.

## Source documents (Voltus)

| File | Purpose |
|------|---------|
| `legal/voltus-contracts/ORDER AGREEMENT PART I - EMS SCADA - FUNCTIONAL TECHNICAL AND COMERCIAL SCOPE.docx` | Functional scope, pricing, checklists |
| `legal/voltus-contracts/ORDER AGREEMENT PART II - EMS SCADA - GENERAL TERMS OF IMPLEMENTATION, SERVICE AND WARRANTY.docx` | Implementation, subscription, warranty |

## Generated DISPERON documents

| File | Reference |
|------|-----------|
| `DISPERON-Order-Agreement-Part-I-Functional-Scope.docx` | LEB-EMS-ORDER-I v1.0 |
| `DISPERON-Order-Agreement-Part-II-General-Terms.docx` | LEB-EMS-ORDER-II v1.0 |

Regenerate:

```powershell
python lighthief-eu-bess/legal/contracts/generate_disperon_order_agreement.py
```

## Key differences from Voltus templates

| Item | Voltus (original) | DISPERON (Lighthief EU BESS) |
|------|-------------------|------------------------------|
| Contractor | Voltus Energy Sp. z o.o. (Poland) | Lighthief EU BESS Ltd HE 474192 (Cyprus), trading as **DISPERON** |
| Governing law | Polish Civil Code | Republic of Cyprus; Limassol courts |
| Grid / market | Generic DSO/TSO, TGE/RDN | EAC, TSOC, IEC 60870-5-104, Cyprus MMS |
| Subscription | Generic tiers in Part II | EUR 400/MWh/yr + SCADA Local/Global maint rates (aligned with SHA v5 / v3 pricing) |
| Related docs | — | EMS Software Subscription Addendum (`scripts/generate-contracts-may2026.py`), EPC §4.4 guarantee |

## Related internal documents

- Shareholders Agreement: `DisperonEMS/docs/contract/DISPERON_SHA_v5_EN.docx`
- Pricing CSV: `DisperonEMS/docs/contract/voltusv3pricing`
- Portfolio SSOT: `lib/portfolio-data.ts` (EMS/SCADA adders)

## Usage per client

1. Run generator (or copy latest docx).
2. Complete Customer name, site parameters, checkboxes, and **Section 8** total price from `voltusv3pricing` / park schedule.
3. Attach **Schedule A** with park-specific EMS + SCADA Local/Global line items if not in EPC Component B.
4. Execute alongside EPC and EMS Subscription Addendum where subscription is billed separately.
