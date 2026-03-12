# Team — Lighthief Cyprus Ltd

**Document Reference:** LCY-TEAM-001
**Last Updated:** February 2026

---

## Team Roster

| Name | Role | Monthly Gross | Type | Start Date | Status |
|------|------|--------------|------|------------|--------|
| Alexander Papacosta | Director | — | — | — | Active |
| Costas Hadjikyriacou | BESS Division Lead — ETEK Licensed Engineer, Sales & Technical Consultant | €3,000 | Employee | 19 Jan 2026 | Active |
| Andreas Christoforou | Business Development & Technical Sales Consultant | €2,500 | Employee | [TBC] | New Hire |
| Zinovia Efesopoulou | Sales Executive & Lead Intake Coordinator | €1,400 | Employee | 1 Jul 2025 | Active |
| Chris | Back Office & Operations Coordinator | €2,000 | Subcontractor | [TBC] | Active |
| Jihat | Field Engineer — Civil Works & O&M | €1,400 | Employee | [TBC] | Active |

---

## Accountant / Payroll

**Timkas** — gabriel@timkas.net
Handles: Social insurance, GESY, PAYE withholding, monthly TD7 declarations (Tax For All)

## Payroll Summary

| Employee | Gross | SI (8.8%) | GESY (2.65%) | PAYE | Net (approx) | Employer Cost |
|----------|-------|-----------|-------------|------|-------------|--------------|
| Costas | €3,000 | €264 | €79.50 | ~€241 | ~€2,416 | €3,462 |
| Andreas | €2,500 | €220 | €66.25 | ~€127 | ~€2,087 | €2,885 |
| Zinovia | €1,400 | €123 | €37.10 | €0 | ~€1,240 | €1,616 |
| Jihat | €1,400 | €123 | €37.10 | €0 | ~€1,240 | €1,616 |
| Chris | €2,000 | — | — | — | €2,000 | €2,000 |

Chris bills as subcontractor — handles own tax/SI/GESY.

---

## Sales Target Model

```
Annual Sales Target   = 20 × Annual Gross Salary
Minimum Sales Target  =  9 × Annual Gross Salary (reviewed every 6 months — employment continuation, not commission gate)
```

| Employee | Monthly Gross | Sales Target (20×) | 6-Month Minimum (9× ÷ 2) |
|----------|--------------|-------------------|--------------------------| 
| Costas | €3,000 | €720,000 | €162,000 |
| Andreas | €2,500 | €600,000 | €135,000 |
| Zinovia | €1,400 | €336,000 | €75,600 |

---

## Folder Structure

```
team/
├── team-data.ts                          ← SSOT for all employee data
├── contracts/
│   ├── templates/
│   │   └── employment-contract.template.md  ← Master sales contract template
│   ├── costas-hadjikyriacou/
│   ├── andreas/
│   ├── zinovia-efesopoulou/
│   ├── chris/                            ← Subcontractor service agreement
│   ├── jihat/
│   └── alexander-papacosta/
├── cv/
│   └── [folders per team member]
└── policies/
    ├── unified-commission-structure.md    ← Sales commission (Andreas, Costas, Zinovia)
    ├── backoffice-kpis.md                ← Back office KPIs (Chris)
    └── field-service-kpis.md             ← Field engineer KPIs (Jihat)
```

## Commands

```bash
npm run contracts:generate                    # Generate all contracts
npx tsx scripts/generate-contracts.ts --employee costas-hadjikyriacou  # Single employee
```

## Policies

| Document | Ref | Applies To |
|----------|-----|-----------|
| Unified Sales Commission Structure | LCY-COM-001 | Andreas, Costas, Zinovia |
| Back Office KPI Framework | LCY-KPI-001 | Chris |
| Field Engineer & Service KPI Framework | LCY-KPI-002 | Jihat |
