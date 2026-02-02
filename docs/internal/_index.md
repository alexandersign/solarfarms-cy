# Internal Documentation Index

> **CONFIDENTIAL - ADMIN ACCESS REQUIRED**
> **Last Updated**: January 31, 2026

---

## Quick Links

| Document | Purpose | Status |
|----------|---------|--------|
| [**🎯 FINAL RFI LINYANG v1.2**](./final-rfi-linyang-consolidated-jan2026.html) | **41 items - READY TO SEND** | 🔴 **FINAL** |
| [**📋 RFI Master Tracker**](./rfi-master-tracker-jan2026.md) | **Track all RFI responses** | 🔴 **ACTIVE** |
| [**Linyang Quotation Jan 2026**](./linyang-quotation-jan2026.md) | **LY202601271 - Updated CIF pricing** | ✅ **CURRENT** |
| [**Client Pricing 13%**](./client-pricing-13-percent.md) | **All 47 parks @ 13% margin** | ✅ **CURRENT** |
| [**Import Duty Model**](./import-duty-model.md) | **Weighted duty calc (verify 2.7% vs 0.9%)** | ⚠️ **VERIFY** |
| [**Logistics Quote**](./logistics-quote-interfreight-jan2026.md) | **Interfreight - transport & customs** | ✅ **NEW** |

### RFIs - Linyang/Kehua

| Document | Scope | Status |
|----------|-------|--------|
| [**FINAL RFI Linyang v1.2 (HTML)**](./final-rfi-linyang-consolidated-jan2026.html) | **41 items - All topics combined** | 🔴 **SEND** |
| [**FINAL RFI Linyang v1.2 (MD)**](./final-rfi-linyang-consolidated-jan2026.md) | **Email body version** | 🔴 **SEND** |
| [**Spares List RFI**](./rfi-spares-list-jan2026.md) | **Spare parts & lead times** | 🔴 **SEND** |

### RFPs/RFQs - Other Vendors

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

### Commercial Terms & Clarifications

| Document | Purpose | Status |
|----------|---------|--------|
| [**Commercial Terms Clarification**](./commercial-terms-clarification-jan2026.md) | **Payment, VAT, Timeline, LDs, EOL** | 🔴 **NEW** |

### Client-Facing Documents

| Document | Purpose | Status |
|----------|---------|--------|
| [**GROUP EPC Proposal (PDF)**](./client-proposal-group-epc-jan2026.html) | **Full turnkey pricing - 47 parks** | ✅ **FINAL** |
| [**Spanercom Offer (Anarita)**](./offer-anarita-10mw-jan2026.html) | **10MW/40MWh - Paphos** | ✅ **NEW** |
| [BESS Portfolio Proposal](./client-proposal-cyprus-bess-jan2026.html) | Interactive web proposal | ⚠️ Review Pricing |
| [Client FAQ - Guarantees & Bonds](./client-faq-guarantees-bonds-jan2026.html) | LDs, availability, warranty FAQ | ✅ Ready |

### Commercial & Pricing

| Document | Purpose | Status |
|----------|---------|--------|
| [**LTSA Updated Rates**](./ltsa-updated-rates-jan2026.md) | **Group €1,740 / Non-Group €2,469** | ✅ **FINAL** |
| [**Commercial Terms Clarification**](./commercial-terms-clarification-jan2026.md) | **Payment, VAT, Timeline, LDs, EOL** | ✅ **CURRENT** |
| [Dino Requirements Tracker](./dino-requirements-tracker.md) | Contract requirements from Dino | 🔴 Action |
| [Pricing Gap Analysis](./pricing-gap-analysis.md) | Group pricing vs our model | ⚠️ Review |
| [Guarantee Comparison](./guarantee-comparison.md) | Competitor vs Lighthief guarantees | ✅ Complete |
| [Pricing Verification](./pricing-verification.md) | EPC cost verification & tracking | ⚠️ Update |
| [**Logistics Cost Comparison**](./logistics-cost-comparison-jan2026.md) | **Interfreight vs A. Soulis** | ✅ **NEW** |

### Technical Reference

| Document | Purpose | Status |
|----------|---------|--------|
| [Solar Park EPC](./solarpark-epc.md) | PV + BESS self-cost model | ✅ Complete |
| [Solar Park Validation](./solarpark-epc-validation.md) | Cost assumption validation | ✅ Complete |
| [Civil Works Estimate](./civil-works-estimate.md) | Ground prep cost estimates | ✅ Complete |
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
- `kehua-pcs/` - **Kehua PCS catalogues & drawings (NEW)**
  - BCS2000K~2500K (2-2.5MW PCS)
  - BCS4000K~5000K (4-5MW PCS)
  - Single line diagrams, foundation specs, DWG files

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
