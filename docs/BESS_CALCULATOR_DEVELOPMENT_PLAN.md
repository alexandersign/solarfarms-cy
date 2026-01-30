# BESS Finance Calculator - Development Plan

## Overview

A comprehensive, investor-grade BESS (Battery Energy Storage System) financial calculator for the solarfarms.cy platform. Located under the `/energy-storage` page, this calculator enables users to model standalone BESS investments or BESS additions to existing solar parks with full financial projections.

**Key Features:**
- Standalone BESS or Solar+BESS scenarios (toggle)
- Full financial modeling (Income Statement, Cash Flow, Balance Sheet)
- Investor waterfall and IRR calculations
- Monthly and optional hourly modeling
- Interactive charts with Recharts
- Email-gated PDF export
- Scenario persistence to Supabase

---

## Architecture

### Frontend Components

```
components/calculators/
├── BESSFinanceCalculator.tsx       # Main calculator component
├── bess-calculator/
│   ├── InputSections/
│   │   ├── ProjectInfoSection.tsx   # Project name, mode (standalone/solar+bess)
│   │   ├── BatteryConfigSection.tsx # Capacity, duration, efficiency, degradation
│   │   ├── SolarConfigSection.tsx   # PV specs (conditional, for solar+bess mode)
│   │   ├── RevenueSection.tsx       # Arbitrage, grid services, PPA settings
│   │   ├── CapexSection.tsx         # BESS & PV capital costs
│   │   ├── OpexSection.tsx          # O&M, insurance, land, admin
│   │   ├── FinancingSection.tsx     # Debt/equity, LTV, interest, term
│   │   └── InvestorSection.tsx      # Equity stakes, dividend rules (Phase 3)
│   ├── OutputSections/
│   │   ├── ExecutiveSummary.tsx     # KPI dashboard with key metrics
│   │   ├── EnergyBalanceChart.tsx   # Production, consumption, storage flows
│   │   ├── CashFlowChart.tsx        # Annual/monthly cash flow visualization
│   │   ├── RevenueBreakdown.tsx     # Revenue stream breakdown
│   │   ├── FinancialStatements.tsx  # Income, Balance, Cash Flow statements
│   │   ├── DebtMetrics.tsx          # LTV, DSCR, interest coverage
│   │   ├── InvestorReturns.tsx      # Per-investor IRR, multiple, payback
│   │   └── DegradationChart.tsx     # Battery capacity over time
│   ├── PDFExport/
│   │   ├── EmailGateModal.tsx       # Email capture before PDF
│   │   └── PDFReportGenerator.tsx   # HTML-based PDF generation
│   └── HourlyModel/
│       ├── HourlyToggle.tsx         # Enable/disable hourly analysis
│       └── HourlyInputs.tsx         # 24h price curves, consumption patterns
```

### Calculation Engine

```
lib/calc/
├── bess.ts                          # Existing - extend with new functions
├── bess-finance/
│   ├── index.ts                     # Main calculation orchestrator
│   ├── types.ts                     # TypeScript interfaces
│   ├── energy-balance.ts            # Solar production, battery flows, grid
│   ├── revenue.ts                   # Revenue stream calculations
│   ├── capex.ts                     # Capital expenditure modeling
│   ├── opex.ts                      # Operating cost calculations
│   ├── financing.ts                 # Debt schedules, equity flows
│   ├── statements.ts                # Financial statement generation
│   ├── valuation.ts                 # NPV, IRR, payback calculations
│   ├── degradation.ts               # Battery fading models
│   ├── hourly-model.ts              # 24h × 12 month calculations
│   └── validation.ts                # Input validation & checks
```

### Database Schema (Supabase)

```sql
-- BESS Calculator Scenarios
CREATE TABLE bess_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  project_name TEXT NOT NULL,
  scenario_name TEXT DEFAULT 'Base Case',
  mode TEXT NOT NULL CHECK (mode IN ('standalone', 'solar_bess')),
  inputs JSONB NOT NULL,
  results JSONB,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX idx_bess_scenarios_email ON bess_scenarios(user_email);

-- RLS Policies
ALTER TABLE bess_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scenarios"
  ON bess_scenarios FOR SELECT
  USING (user_email = current_user_email());

CREATE POLICY "Public can insert scenarios"
  ON bess_scenarios FOR INSERT
  WITH CHECK (true);

-- PDF Download Unlocks (Email Gate)
CREATE TABLE bess_pdf_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  scenario_id UUID REFERENCES bess_scenarios(id),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, scenario_id)
);
```

### API Routes

```
app/api/
├── bess-calculator/
│   ├── scenarios/
│   │   ├── route.ts                 # GET (list), POST (create)
│   │   └── [id]/route.ts            # GET, PUT, DELETE single scenario
│   ├── calculate/route.ts           # POST - run calculations
│   ├── unlock-pdf/route.ts          # POST - email gate for PDF
│   └── export-pdf/route.ts          # POST - generate PDF
```

---

## Implementation Phases

### Phase 1: Core Calculator MVP (Priority: HIGH)
**Estimated Effort: 3-4 days**

1. **Create Type Definitions** (`lib/calc/bess-finance/types.ts`)
   - Input interfaces for all sections
   - Output/results interfaces
   - Constants and defaults

2. **Build Calculation Engine** (`lib/calc/bess-finance/`)
   - Energy balance calculations
   - Revenue modeling (arbitrage, grid services)
   - CAPEX/OPEX calculations
   - NPV, IRR, payback (leverage existing `calculateIRR`)
   - Monthly cash flow projections

3. **Create Main Calculator Component**
   - Tabbed input interface (Project, Battery, Revenue, Costs, Financing)
   - Live results sidebar with KPI cards
   - Mode toggle (Standalone BESS / Solar+BESS)

4. **Basic Output Display**
   - Executive summary with key metrics
   - Revenue breakdown table
   - Cost breakdown table

**Deliverables:**
- Working calculator with core inputs/outputs
- Monthly projection model
- Basic results display

---

### Phase 2: Solar+BESS Integration & Charts (Priority: HIGH)
**Estimated Effort: 2-3 days**

1. **Solar Configuration Section**
   - PV capacity, yield, degradation
   - Curtailment rate inputs
   - Production calculations

2. **Energy Balance Modeling**
   - Solar production
   - Battery charge/discharge cycles
   - Grid import/export
   - Self-sufficiency calculation

3. **Interactive Charts** (Recharts)
   - Cash flow chart (annual bars)
   - Revenue breakdown pie chart
   - Battery degradation line chart
   - Energy balance stacked area chart

4. **Comparison View**
   - Solar-only vs Solar+BESS side-by-side
   - Delta metrics highlighting

**Deliverables:**
- Full Solar+BESS integration
- 4+ interactive charts
- Comparison analysis

---

### Phase 3: Financial Statements & Debt (Priority: MEDIUM)
**Estimated Effort: 2-3 days**

1. **Debt Financing Module**
   - LTV, interest rate, term inputs
   - Debt drawdown schedule
   - Amortization calculations
   - DSCR, interest coverage ratios

2. **Financial Statements**
   - Income Statement (Revenue - OPEX - Depreciation - Interest - Tax)
   - Cash Flow Statement (Operating, Investing, Financing)
   - Balance Sheet (Assets, Liabilities, Equity)

3. **Investor Metrics Section**
   - Equity required
   - Cash-on-cash return
   - Equity multiple
   - Investor IRR

**Deliverables:**
- Full financial statements
- Debt modeling with covenants
- Investor metrics dashboard

---

### Phase 4: PDF Export & Email Gate (Priority: MEDIUM)
**Estimated Effort: 1-2 days**

1. **Email Gate Modal**
   - Simple email input with validation
   - "Get PDF Report" CTA
   - Store email in `bess_pdf_unlocks`
   - Track as newsletter subscriber (optional)

2. **PDF Report Generator**
   - Executive summary page
   - Assumptions table
   - Key charts (static versions)
   - Financial projections table
   - Disclaimer

3. **API Integration**
   - `/api/bess-calculator/unlock-pdf` - validate email, grant access
   - Generate HTML, open in new window for print/save

**Deliverables:**
- Email-gated PDF download
- Professional PDF report format
- Lead capture integration

---

### Phase 5: Hourly Model (Priority: MEDIUM) ✅ COMPLETE
**Estimated Effort: 2 days**

1. **Hourly Toggle** ✅
   - Switch between simplified (monthly) and hourly model
   - Toggle in dedicated "Hourly" tab

2. **Hourly Inputs** ✅
   - 24-hour price curve (buy/sell) with visualization
   - Cyprus price presets (summer/winter peak, max arbitrage)
   - Charge/discharge hour configuration
   - Low/high price sliders for quick adjustments

3. **Hourly Calculations** ✅
   - Optimized dispatch based on price spread
   - Calculate hourly arbitrage revenue
   - Monthly arbitrage from daily pattern
   - Revenue uplift comparison vs simplified model

4. **Hourly Outputs** ✅
   - 24-hour price curve chart (Recharts)
   - Battery dispatch schedule visualization
   - Arbitrage spread indicator
   - Info box showing optimization status

**Deliverables:**
- Optional hourly analysis toggle
- Price curve inputs
- Hourly optimization logic

---

### Phase 6: Persistence & Scenarios (Priority: MEDIUM)
**Estimated Effort: 1-2 days**

1. **Supabase Integration**
   - Create tables via SQL script
   - API routes for CRUD operations

2. **Scenario Management UI**
   - Save current scenario
   - Load saved scenarios
   - Clone scenario for comparison
   - Delete scenarios

3. **Scenario Comparison**
   - Side-by-side comparison of 2-3 scenarios
   - Highlight differences

**Deliverables:**
- Scenario save/load functionality
- Comparison dashboard
- User scenario history

---

### Phase 7: Investor Waterfall (Priority: LOW)
**Estimated Effort: 2 days**

1. **Multi-Investor Configuration**
   - Up to 5 investors + developer
   - Equity stakes (%)
   - Preferred returns, catch-up provisions

2. **Waterfall Calculations**
   - Return of capital
   - Preferred return
   - Catch-up
   - Profit split

3. **Investor Dashboard**
   - Per-investor cash flows
   - Individual IRR, multiple, payback
   - Distribution schedule

**Deliverables:**
- Full investor waterfall logic
- Per-investor metrics
- Distribution visualization

---

## Input Variables Summary

### Project Info
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| projectName | string | "" | Project identifier |
| mode | enum | "standalone" | "standalone" or "solar_bess" |
| currency | enum | "EUR" | Currency for display |
| forecastYears | number | 25 | Project lifetime |

### Battery System
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| capacityMWh | number | 10 | Total storage capacity |
| durationHours | number | 4 | Discharge duration |
| roundTripEfficiency | number | 88.39 | RTE % (Linyang default) |
| maxDoD | number | 90 | Max depth of discharge % |
| dailyCycles | number | 1 | Cycles per day |
| annualDegradation | number | 2.5 | Capacity loss % per year |
| warrantyYears | number | 15 | Warranty period |

### Solar (Solar+BESS mode only)
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| pvCapacityMWp | number | 5 | Installed DC capacity |
| annualYieldKwhKwp | number | 1650 | Specific yield |
| pvDegradation | number | 0.5 | Annual degradation % |
| curtailmentRate | number | 25.8 | Grid curtailment % |
| curtailmentRecovery | number | 50 | % recoverable via BESS |

### Revenue
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| arbitrageSpread | number | 50 | €/MWh day-night spread |
| dayPrice | number | 110 | €/MWh daytime |
| nightPrice | number | 160 | €/MWh evening peak |
| gridServicesRevenue | number | 0 | €/MWh/year for ancillary |
| ppaRate | number | 0.15 | €/kWh for PPA (if applicable) |

### CAPEX
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| bessCostPerMWh | number | 127000 | €/MWh installed |
| pvCostPerMWp | number | 720000 | €/MWp (25% margin) |
| contingency | number | 5 | % of total |
| devCosts | number | 0 | Development/RTB costs |

### OPEX
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| bessOmPerMWh | number | 2470 | €/MWh/year basic O&M |
| pvOmPerMW | number | 15000 | €/MW/year PV O&M |
| insurance | number | 0.5 | % of CAPEX |
| landLease | number | 25000 | €/year |
| admin | number | 30000 | €/year |

### Financing
| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| ltvPercent | number | 70 | Loan-to-value % |
| interestRate | number | 4.5 | Annual interest % |
| loanTermYears | number | 15 | Repayment term |
| discountRate | number | 8 | WACC for NPV |

---

## Output Metrics

### Key Performance Indicators
- Total CAPEX
- Equity Required
- Annual Revenue
- Annual OPEX
- EBITDA
- Net Profit
- Cash-on-Cash ROI
- IRR (Unlevered & Levered)
- NPV (25-year)
- Payback Period
- DSCR
- Equity Multiple

### Energy Metrics
- Annual Energy Throughput (MWh)
- Curtailment Recovered (MWh)
- Grid Services Delivered
- Self-Sufficiency Ratio (Solar+BESS)

### Financial Statements
- Income Statement (25 years)
- Cash Flow Statement (25 years)
- Balance Sheet (annual snapshots)

---

## Technology Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Frontend | Next.js 14 + React | Existing stack |
| UI Components | shadcn/ui | Existing components |
| Charts | Recharts | Need to install |
| State Management | React hooks | useState, useCallback, useMemo |
| Calculations | Pure TypeScript functions | Stateless, testable |
| Database | Supabase (PostgreSQL) | Existing setup |
| PDF Generation | HTML template + print | Existing pattern |
| Email | Resend | Existing integration |

### New Dependencies
```bash
npm install recharts
```

---

## File Structure

```
app/
├── (marketing)/
│   └── energy-storage/
│       └── calculator/
│           └── page.tsx           # New calculator page route

components/
└── calculators/
    └── BESSFinanceCalculator.tsx  # Main component

lib/
└── calc/
    └── bess-finance/
        ├── index.ts
        ├── types.ts
        ├── calculations.ts
        ├── validation.ts
        └── pdf-template.ts
```

---

## Success Criteria

1. **Functional Equivalence**: Calculator produces results consistent with reference PDF model
2. **User Experience**: Intuitive tabbed interface with live results
3. **Lead Capture**: Email gate captures leads before PDF download
4. **Performance**: Calculations complete in <100ms
5. **Mobile Responsive**: Works on tablet and desktop
6. **Accuracy**: Financial statements reconcile correctly
7. **Export Quality**: PDF report is professional and printable

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Calculation complexity | Start with MVP, iterate |
| Chart library learning curve | Recharts has good docs, similar to existing patterns |
| Hourly model performance | Memoize calculations, optional toggle |
| PDF quality | Test across browsers, use print-friendly CSS |

---

## Implementation Status

### Completed ✅

1. ✅ Create development plan document
2. ✅ Install Recharts dependency (already installed)
3. ✅ Create type definitions (`lib/calc/bess-finance/types.ts`)
4. ✅ Build calculation engine (`lib/calc/bess-finance/calculations.ts`)
5. ✅ Build main calculator component (`components/calculators/BESSFinanceCalculator.tsx`)
6. ✅ Add charts (Cash Flow, Degradation, Revenue Breakdown with Recharts)
7. ✅ Implement PDF export with email gate
8. ✅ Create page route (`/energy-storage/calculator`)
9. ✅ Add navigation links
10. ✅ Create Supabase schema (`supabase-bess-calculator-schema.sql`)
11. ✅ Create API routes for scenarios and PDF unlock

### Pending 🔲

1. ✅ Add hourly model toggle and inputs (Phase 5) - COMPLETE
2. ✅ Add scenario save/load UI in calculator - COMPLETE
3. ✅ Add investor waterfall calculations - COMPLETE
4. 🔲 Add scenario comparison view (future enhancement)

### Known Issues

- Balance sheet generation simplified
- Scenario comparison view not yet implemented (lower priority)

## Access URL

**Calculator**: https://solarfarms.cy/energy-storage/calculator

---

**Document Version**: 1.0  
**Created**: January 2026  
**Author**: Development Team  
**Status**: Ready for Implementation
