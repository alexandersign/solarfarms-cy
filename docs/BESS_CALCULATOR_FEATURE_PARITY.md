# BESS Calculator Feature Parity Plan

## Comparison: eFinancialModels Excel vs SolarFarms.cy Calculator

Based on comprehensive review of `Solar-BESS-eFinancialModels-V1.20-PREMIUM-DEMO.pdf`

---

## 1. GENERAL ASSUMPTIONS

| Feature | Excel Model | Our Calculator | Gap |
|---------|-------------|----------------|-----|
| Project Name | ✅ | ✅ | - |
| Currency (USD/EUR/GBP) | ✅ | ✅ | - |
| Forecast Period (up to 40 years) | ✅ 40 years | ✅ 25 years | Extend to 40 |
| Discount Rate (WACC) | ✅ | ✅ | - |
| Inflation Rate | ✅ | ✅ | - |

---

## 2. BATTERY USE MODES (Major Feature)

| Mode | Excel Model | Our Calculator | Priority |
|------|-------------|----------------|----------|
| **Excess Production** | ✅ Only excess solar charges battery | ❌ | HIGH |
| **Solar Only** | ✅ Only solar charges battery | ❌ | HIGH |
| **Price Arbitrage** | ✅ Grid electricity can charge for trading | ✅ (default) | - |

**Action Required:** Add battery use mode selector with 3 options

---

## 3. USAGE MODELS

| Model | Excel Model | Our Calculator | Priority |
|-------|-------------|----------------|----------|
| Simplified Usage Model | ✅ Monthly totals + daily cycles | ✅ | - |
| Hourly Usage Model | ✅ 24h × 12 months matrix | ⚠️ 24h only | MEDIUM |
| Hourly price by month | ✅ Different prices per month | ❌ | MEDIUM |

**Action Required:** Extend hourly model with monthly variations

---

## 4. TIMELINE & PHASES

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Construction Phase | ✅ With start/end dates | ❌ | LOW |
| Solar Phases (1-3) | ✅ 3 independent phases | ❌ Single config | HIGH |
| Battery Phases (1-5) | ✅ 5 batteries with lifecycles | ❌ Single battery | HIGH |
| PPA/REC Duration | ✅ Independent timelines | ⚠️ Basic | MEDIUM |

**Action Required:** Add multi-phase solar and multi-battery support

---

## 5. BATTERY CONFIGURATION

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Multiple batteries (1-5) | ✅ | ❌ | HIGH |
| Capacity per battery | ✅ kWh | ✅ MWh | - |
| Charging/Discharging duration | ✅ Hours | ✅ | - |
| Charging/Discharging speed | ✅ kWh/Hour | ✅ MW | - |
| Round-Trip Efficiency | ✅ % | ✅ | - |
| Daily cycles (EFC) | ✅ | ✅ | - |
| Fading Models | ✅ 8 models (Constant, Low/Med/High Accel, ±Recycling) | ⚠️ 2 models | MEDIUM |
| Battery Recycling | ✅ With cost and schedule | ❌ | MEDIUM |
| Maximum/Minimum Load | ✅ % | ✅ (DoD, SoC) | - |
| Availability % | ✅ | ✅ | - |

**Fading Models Needed:**
1. Constant (linear)
2. Low Acceleration
3. Medium Acceleration
4. High Acceleration
5. Constant + Recycling
6. Low Acceleration + Recycling
7. Medium Acceleration + Recycling
8. High Acceleration + Recycling

---

## 6. SOLAR FARM CONFIGURATION

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Multiple phases (1-3) | ✅ | ❌ | HIGH |
| Capacity per phase (kWp) | ✅ | ✅ (MWp) | - |
| Solar Yield (kWh/kWp) | ✅ | ✅ | - |
| Efficiency Factor | ✅ % | ✅ (technology multiplier) | - |
| Capacity Decline | ✅ % p.a. | ✅ | - |
| Monthly production share | ✅ 12 values | ❌ | MEDIUM |
| Hourly production pattern | ✅ 24 × 12 matrix | ❌ | MEDIUM |

---

## 7. ELECTRICITY CONSUMPTION

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Annual consumption | ✅ kWh/Year | ❌ (we model throughput) | MEDIUM |
| Monthly breakdown (12 values) | ✅ | ❌ | MEDIUM |
| Yearly growth rate | ✅ % | ❌ | LOW |
| Hourly consumption pattern | ✅ 24 × 12 matrix | ❌ | MEDIUM |

**Note:** Excel model has "Micro-grids" and "Commercial" use cases with consumption modeling. Our model focuses on grid-scale BESS.

---

## 8. ELECTRICITY PRICES

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Purchase Price (€/kWh) | ✅ | ✅ (dayPrice) | - |
| Sales Price (€/kWh) | ✅ | ✅ (nightPrice) | - |
| PPA Price | ✅ | ✅ | - |
| REC Price | ✅ | ❌ | MEDIUM |
| Battery Reserve Price | ✅ €/kWh/Month | ❌ | LOW |
| Hourly price curves | ✅ 24h × 12 months | ⚠️ 24h only | MEDIUM |
| Price Escalation Factors | ✅ Per price type | ✅ Single escalation | LOW |

**Action Required:** Add REC pricing and monthly price variations

---

## 9. REVENUE SOURCES (with toggles)

| Revenue Stream | Excel Model | Our Calculator | Priority |
|----------------|-------------|----------------|----------|
| Electricity Savings | ✅ Toggle | ❌ | MEDIUM |
| Electricity Sales (Market) | ✅ Toggle | ✅ (Arbitrage) | - |
| Electricity Sales (PPA) | ✅ Toggle | ✅ Toggle | - |
| Electricity Sales (REC) | ✅ Toggle | ❌ | MEDIUM |
| Battery Reserve | ✅ Toggle | ❌ | LOW |
| Grid Services | ❌ | ✅ | - |
| Capacity Payments | ❌ | ✅ | - |
| Other Income | ✅ | ✅ | - |

---

## 10. CAPEX STRUCTURE

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Solar Farm CAPEX by phase | ✅ Detailed line items | ✅ Aggregated | - |
| Battery CAPEX per unit | ✅ | ✅ €/MWh | - |
| Fixtures | ✅ | ❌ | LOW |
| Inverters | ✅ | ⚠️ Included in BESS cost | - |
| Transport/Installation | ✅ | ❌ | LOW |
| Grid Connection | ✅ | ✅ | - |
| Contingency | ✅ % | ✅ | - |
| Cost per kWp calculations | ✅ | ✅ | - |

---

## 11. O&M / OPEX

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Broker Costs (% of sales) | ✅ | ✅ | - |
| Repairs & Maintenance | ✅ €/kWh | ✅ €/MWh/year | - |
| Cleaning | ✅ €/kWp/year | ❌ (in PV O&M) | - |
| Insurance | ✅ | ✅ | - |
| Land/Roof Lease | ✅ | ✅ | - |
| Administration | ✅ | ✅ | - |
| Monitoring | ✅ | ✅ | - |

---

## 12. DEBT FINANCING

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Multiple debt facilities | ✅ 3 (Equipment, Loan A, B) | ❌ Single loan | MEDIUM |
| LTV ratios | ✅ Per facility | ✅ Single | - |
| Interest rates | ✅ Per facility | ✅ Single | - |
| Grace periods | ✅ | ✅ | - |
| Repayment types | ✅ Linear, Service Payment | ✅ Linear, Annuity, Sculpted | - |
| Drawdown periods | ✅ | ❌ | LOW |

---

## 13. BANK COVENANTS

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| LTV Max | ✅ | ✅ | - |
| DSCR Min | ✅ | ✅ | - |
| EBIT/Interest Min | ✅ | ✅ (Interest Coverage) | - |
| Covenant breach warnings | ✅ | ✅ | - |

---

## 14. INVESTOR WATERFALL

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Developer + 4 Investors | ✅ | ⚠️ Multiple but simpler | MEDIUM |
| Entry/Exit timing | ✅ Full control | ⚠️ Basic | MEDIUM |
| Equity stakes (pre/post sale) | ✅ | ❌ | MEDIUM |
| Equity injections | ✅ | ✅ | - |
| Dividend policy | ✅ Cash Sweep, Profit Share | ⚠️ Basic | MEDIUM |
| IRR/Multiple per investor | ✅ | ✅ | - |
| Payback per investor | ✅ | ✅ | - |

---

## 15. TAX SETTINGS

| Feature | Excel Model | Our Calculator | Priority |
|---------|-------------|----------------|----------|
| Federal Income Tax | ✅ | ❌ (simplified) | LOW |
| State/Local Tax | ✅ | ❌ | LOW |
| Tax Holidays | ✅ | ❌ | LOW |
| Tax Loss Carry Forwards | ✅ | ❌ | LOW |
| Investment Tax Credits | ✅ | ❌ | LOW |
| Production Tax Credits | ✅ | ❌ | LOW |

**Note:** Tax complexity is US-focused. Cyprus has simpler tax regime.

---

## 16. FINANCIAL OUTPUTS

| Output | Excel Model | Our Calculator | Priority |
|--------|-------------|----------------|----------|
| Income Statement | ✅ Detailed | ✅ | - |
| Balance Sheet | ✅ Full | ⚠️ Simplified | MEDIUM |
| Cash Flow Statement | ✅ 3-section | ✅ | - |
| Debt Schedule | ✅ | ✅ | - |
| Relative metrics (per kWp, kWh) | ✅ | ⚠️ Partial | LOW |
| LCOE Calculation | ✅ | ❌ | MEDIUM |

---

## 17. CHARTS & VISUALIZATIONS

| Chart | Excel Model | Our Calculator | Priority |
|-------|-------------|----------------|----------|
| Battery capacity fading | ✅ All 8 models | ✅ Single curve | - |
| Electricity production vs consumption | ✅ | ⚠️ Energy chart | - |
| Self-sufficiency % | ✅ | ❌ | LOW |
| Financial debt and LTV | ✅ | ❌ | MEDIUM |
| Debt service with DSCR | ✅ | ❌ | MEDIUM |
| Revenue breakdown pie | ✅ | ✅ | - |
| Cash flow bar chart | ✅ | ✅ | - |
| Hourly price curves | ✅ | ✅ | - |
| Hourly dispatch schedule | ✅ | ✅ | - |

---

## PRIORITY IMPLEMENTATION PHASES

### Phase 1: HIGH Priority (Core Feature Parity)
1. **Battery Use Modes** - Add selector (Excess Production, Solar Only, Price Arbitrage)
2. **Multi-Battery Support** - Up to 5 batteries with independent lifecycles
3. **Multi-Phase Solar** - Up to 3 phases with independent timelines
4. **Extended Fading Models** - 8 models including recycling options

### Phase 2: MEDIUM Priority (Enhanced Functionality)
1. **Monthly Price Variations** - 12-month price matrices
2. **REC (Renewable Energy Certificate)** - Pricing and revenue toggle
3. **Multiple Debt Facilities** - Up to 3 loans with independent terms
4. **Enhanced Investor Waterfall** - Entry/exit timing, equity sales
5. **LCOE Calculation** - Levelized Cost of Energy
6. **Additional Charts** - Debt/LTV, DSCR tracking

### Phase 3: LOW Priority (Nice-to-Have)
1. Electricity consumption modeling
2. Construction phase timeline
3. Detailed CAPEX line items
4. Tax credits (US-specific)
5. Battery Reserve pricing
6. Relative metrics dashboard

---

## UI/UX IMPROVEMENTS

### Branding Updates (SolarFarms.cy)
- Primary colors: `solar-500` (#f59e0b) and `cyprus-600` (#0284c7)
- Chart colors: Match brand palette
- Headers: Use gradient text style
- Cards: Consistent shadow and border styling

### Layout Improvements
- Add collapsible sections for advanced inputs
- Group related inputs (like Excel's worksheet approach)
- Add scenario comparison view
- Improve mobile responsiveness

---

## ESTIMATED EFFORT

| Phase | Features | Complexity | Est. Time |
|-------|----------|------------|-----------|
| Phase 1 | Battery modes, Multi-battery, Multi-solar, Fading models | High | 2-3 days |
| Phase 2 | Monthly prices, REC, Multi-debt, Investor, LCOE | Medium | 2-3 days |
| Phase 3 | Consumption, Construction, Tax credits | Low | 1-2 days |
| UI/UX | Branding, Layout, Mobile | Medium | 1 day |

**Total Estimated: 6-9 days**
