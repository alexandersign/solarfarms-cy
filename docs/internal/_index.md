# Internal Documentation Index

> **CONFIDENTIAL - ADMIN ACCESS REQUIRED**
> **Last Updated**: January 23, 2026

---

## Quick Links

| Document | Purpose | Status |
|----------|---------|--------|
| [Dino Requirements Tracker](./dino-requirements-tracker.md) | **Contract requirements from Dino - 8 gaps** | 🔴 Action Required |
| [Pricing Gap Analysis](./pricing-gap-analysis.md) | Group pricing vs our model | ⚠️ Under Review |
| [Linyang RFI Tracker](./linyang-rfi-tracker.md) | DSO/TSO documentation requests to Linyang | 🔴 Active |
| [Group RFI Tracker](./group-rfi-tracker.md) | Group questions & final offering checklist | 🟡 In Progress |
| [Solar Park EPC](./solarpark-epc.md) | PV + BESS self-cost model | ✅ New |
| [Solar Park Validation](./solarpark-epc-validation.md) | Cost assumption validation | ✅ New |
| [Civil Works Estimate](./civil-works-estimate.md) | Ground prep cost estimates | ✅ New |
| [Guarantee Comparison](./guarantee-comparison.md) | Competitor vs Lighthief guarantees | ✅ Complete |
| [Pricing Verification](./pricing-verification.md) | EPC cost verification & tracking | ⚠️ Needs Update |
| [Clients Index](../clients/_index.md) | Client portfolio overview | ✅ Complete |
| [Linyang Specs](../linyang.md) | Equipment specifications | ✅ Complete |
| [Cyprus DSO](../CyprusDSO.md) | Grid connection requirements | ✅ Complete |
| [Public FAQ](../public-faq.md) | **Chat agent knowledge base** | ✅ New |

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
