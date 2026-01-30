# Internal Documentation Index

> **CONFIDENTIAL - ADMIN ACCESS REQUIRED**
> **Last Updated**: January 27, 2026

---

## Quick Links

| Document | Purpose | Status |
|----------|---------|--------|
| [**Linyang Quotation Jan 2026**](./linyang-quotation-jan2026.md) | **LY202601271 - Updated CIF pricing** | ✅ **NEW** |
| [**Client Pricing 13%**](./client-pricing-13-percent.md) | **All 47 parks @ 13% margin** | ✅ **NEW** |
| [**PCS Capacity RFI**](./pcs-capacity-rfi-linyang-jan2026.html) | **🔴 URGENT - 10 parks over limit** | 🔴 **ACTION** |
| [**Import Duty Model**](./import-duty-model.md) | **Weighted duty calc (0.9% vs 2.7%)** | ✅ **NEW** |

### RFPs/RFQs Ready to Send

| Document | Scope | Vendor Target |
|----------|-------|---------------|
| [Concrete Base RFP](./concrete-base-rfp-jan2026.html) | Civil works - 47 parks | TBD Cyprus contractor |
| [SCADA/EMS RFP](./scada-ems-rfp-jan2026.html) | SCADA integration | Axol |
| [LPS/SPD RFQ](./lightning-protection-rfq-dhen.md) | Lightning protection | DEHN (Artur Łasak) |
| [Electrical Install RFP](./rfp-electrical-installation-jan2026.html) | MV/LV cabling & terminations | TBD |
| [Cybersecurity RFP](./rfp-cybersecurity-nis2-jan2026.html) | NIS2 compliance | TBD |
| [Insurance RFP](./rfp-insurance-car-ear-jan2026.html) | CAR/EAR coverage | TBD broker |
| [Protection Testing RFP](./rfp-protection-testing-jan2026.html) | Relay testing & DSO witness | TBD |
| [Remote Trip & UPS RFP](./rfp-remote-trip-ups-jan2026.html) | Trip system & auxiliary power | TBD |
| [Earthing RFP](./rfp-earthing-grounding-jan2026.html) | Earth grid & grounding | TBD |
| [Transport RFQ](./rfq-transport-asoulis-jan2026.html) | Heavy haulage - 246 containers | A. Soulis |
| [Performance Guarantees RFI](./rfi-performance-guarantees-linyang-jan2026.html) | LDs, Bonds, Warranty confirmation | Linyang |

### Client-Facing Documents

| Document | Purpose | Status |
|----------|---------|--------|
| [**GROUP EPC Proposal (PDF)**](./client-proposal-group-epc-jan2026.html) | **Full turnkey pricing - 47 parks** | ✅ **FINAL REVIEW** |
| [BESS Portfolio Proposal](./client-proposal-cyprus-bess-jan2026.html) | Interactive web proposal | ✅ Ready |
| [Client FAQ - Guarantees & Bonds](./client-faq-guarantees-bonds-jan2026.html) | LDs, availability, warranty FAQ | ✅ Ready |
| [**Final RFI Linyang**](./FINAL_RFI_LINYANG_JAN2026.md) | **Outstanding docs + scope clarification** | 🔴 Active |
| [Dino Requirements Tracker](./dino-requirements-tracker.md) | Contract requirements from Dino - 8 gaps | 🔴 Action Required |
| [Pricing Gap Analysis](./pricing-gap-analysis.md) | Group pricing vs our model | ⚠️ Under Review |
| [Linyang RFI Tracker](./linyang-rfi-tracker.md) | DSO/TSO documentation requests to Linyang | 🔴 Active |
| [Group RFI Tracker](./group-rfi-tracker.md) | Group questions & final offering checklist | 🟡 In Progress |
| [Solar Park EPC](./solarpark-epc.md) | PV + BESS self-cost model | ✅ Complete |
| [Solar Park Validation](./solarpark-epc-validation.md) | Cost assumption validation | ✅ Complete |
| [Civil Works Estimate](./civil-works-estimate.md) | Ground prep cost estimates | ✅ Complete |
| [Guarantee Comparison](./guarantee-comparison.md) | Competitor vs Lighthief guarantees | ✅ Complete |
| [Pricing Verification](./pricing-verification.md) | EPC cost verification & tracking | ⚠️ Needs Update |
| [Clients Index](../clients/_index.md) | Client portfolio overview | ✅ Updated |
| [Linyang Specs](../linyang.md) | Equipment specifications | ✅ Complete |
| [Cyprus DSO](../CyprusDSO.md) | Grid connection requirements | ✅ Complete |
| [Public FAQ](../public-faq.md) | Chat agent knowledge base | ✅ Complete |

---

## Pricing Model Summary

### EPC Markup Structure

| Component | Self-Cost | Markup | Client Price |
|-----------|-----------|--------|--------------|
| **PV EPC** | Base | **+€100k/MW** | Self-Cost + (MW × €100k) |
| **BESS EPC** | Base | **+17.4%** | Self-Cost × 1.174 |
| **Non-Group** | Client Price | **+12%** | Additional markup (BESS only) |

### BESS Four-Tier Structure

| Tier | Description | Markup | Who Sees |
|------|-------------|--------|----------|
| **CIF** | Linyang equipment cost | Base | Internal only |
| **Installed** | CIF + EPC adders | +€100-170k | Internal only |
| **Client** | Group order price | +17.4% | Group clients |
| **Non-Group** | Public/prospect price | +12% | Public, prospects |

### Public Calculator Settings

The BESS Finance Calculator on solarfarms.cy uses:
- **Default CAPEX**: €137,000/MWh (€137/kWh) - Non-Group pricing
- **€/kWh Range**: €120-190 depending on system size
- **Users can adjust**: Group clients can lower to ~€122/kWh (Client Price)
- **File**: `lib/calc/bess-finance/types.ts` → `BESS_CALCULATOR_DEFAULTS.capex.bessCostPerMWh`

#### Price Reference by System Size

| System Size | Non-Group €/kWh | Notes |
|-------------|-----------------|-------|
| 100 MWh | ~€113 | Best economies of scale |
| 40-60 MWh | €122-145 | Large scale |
| 20-35 MWh | €130-140 | Medium scale |
| 10-15 MWh | €137-153 | **Default range** |
| 4-8 MWh | €152-189 | Small scale premium |

---

## System Access Levels (Future)

| Role | Access | Features |
|------|--------|----------|
| **Public** | Calculator, info pages | View only |
| **Client** | Project portal | View project status |
| **Sales** | Quotation tool | Generate quotes |
| **Admin** | Full access | All internal docs, RFI, compliance |

---

## Document Categories

### Technical Specifications
- `linyang.md` - Battery, PCS, MV Skid specs
- `CyprusDSO.md` - Grid connection requirements

### Client Management
- `clients/_index.md` - Portfolio overview
- `clients/*.md` - Individual client files

### Internal Operations
- `internal/pricing-verification.md` - Cost tracking
- `internal/rfi-tracker.md` - (Future) RFI management
- `internal/compliance-tracker.md` - (Future) Compliance status

### Legal & Commercial
- `legal/ClientLTSA.md` - LTSA templates
- (Future) Contract templates

---

## Data Flow

```
Linyang Quote → CIF Price
       ↓
EPC Adders → Installed Cost
       ↓
+17.4% Margin → Client Price (Group)
       ↓
+12% Markup → Non-Group Price (Public)
```

---

## Verification Workflow

1. **Receive Quotation** → Log in pricing-verification.md
2. **Verify Data** → Update status from 🔴 to 🟢
3. **Update Client Files** → Apply verified costs
4. **Update Calculator** → Refresh default values

---

## Contact & Responsibility

| Area | Responsible | Status |
|------|-------------|--------|
| Linyang Liaison | TBD | - |
| EPC Coordination | TBD | - |
| DSO Applications | TBD | - |
| Client Relations | TBD | - |
