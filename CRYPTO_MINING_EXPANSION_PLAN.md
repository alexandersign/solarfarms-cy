# 🚀 SolarFarms.cy Crypto Mining & AI Expansion Plan

**Created**: November 26, 2025  
**Status**: Implementation in Progress

## 📋 **PHASE 1: Calculator Updates** (Priority: HIGH)

### **1.1 Update Pricing Scenarios**
- [ ] Update investment sizes from current to realistic €1.2M-1.7M range
- [ ] Add capex mode selector: EPC Dev (€500k/MW), Turnkey (€1.2M/MW), RTB Old (€1.2M/MW), RTB New/Tracking (€1.7M/MW)
- [ ] Show €500k/MW financing cap clearly in financing options
- [ ] Update all investment size cards on homepage

### **1.2 Enhanced Calculator Features**
- [ ] lib/constants.ts: Update INVESTMENT_SIZES with new pricing
- [ ] components/calculators/ROICalculator.tsx: Add capex mode selector
- [ ] Add "Market Assumptions" accordion showing all defaults
- [ ] Implement financing cap visualization

## 📋 **PHASE 2: Crypto Investment Section** (Priority: HIGH)

### **2.1 Navigation & Structure**
- [ ] Add "Crypto Investments" to main navigation
- [ ] Create `/crypto` landing page
- [ ] Create `/crypto/solar-mining` - Solar BTC mining page
- [ ] Create `/crypto/ai-mining` - AI GPU mining page
- [ ] Create `/crypto/tax-advantages` - Cyprus 8% tax page

### **2.2 Crypto Landing Page Content**
- [ ] Hero: "Invest in Solar with Crypto - 8% Flat Tax Cyprus Advantage"
- [ ] Benefits: Tax efficiency, renewable energy, stable returns
- [ ] Mining options: BTC mining, AI GPU mining
- [ ] PPA offerings for mining operations
- [ ] Case studies and ROI scenarios

### **2.3 Key Value Propositions**
- **Cyprus Tax Advantage**: 8% flat tax on crypto gains
- **Solar-Powered Mining**: Renewable energy at cost
- **PPA for Miners**: Long-term power agreements
- **Off-Grid Solutions**: For parks without grid connection
- **Lighthief Partnership**: Technical expertise + solar integration

## 📋 **PHASE 3: Blog Content** (Priority: HIGH)

### **3.1 Solar BTC Mining in Cyprus Blog**
**URL**: `/blog/solar-bitcoin-mining-cyprus-case-study`

**Content Structure**:
1. **Introduction**: Cyprus advantages for BTC mining
2. **Tax Benefits**: 8% flat tax vs 20-40% elsewhere
3. **Energy Costs**: Solar power at €0.06-0.10/kWh vs €0.15-0.25 grid
4. **Case Study 1**: 5MW park WITHOUT BESS
   - Mining during curtailment periods (free energy)
   - Economics of mining curtailed energy
   - Equipment: Antminer S19 XP specs
5. **Case Study 2**: 5MW park WITH BESS
   - 24/7 mining capability
   - Energy arbitrage + mining revenue
   - Enhanced ROI scenarios
6. **Off-Grid Opportunity**: Parks without connection terms
   - 100% mining utilization
   - No curtailment risk
   - Equipment financing
7. **Lighthief Cyprus Services**: PPA terms, installation, O&M

### **3.2 AI Processing Power & Off-Grid Solar Blog**
**URL**: `/blog/ai-gpu-mining-renewable-energy-cyprus`

**Content Structure**:
1. **Global AI Boom**: Processing power demand explosion
2. **Energy Challenge**: AI data centers consuming massive power
3. **Cyprus Solution**: Renewable energy + strategic location
4. **Off-Grid Advantage**: 
   - Parks without grid connection
   - 100% energy utilization for AI processing
   - No curtailment, no waste
5. **GPU Mining Economics**:
   - Revenue per GPU
   - Solar power cost advantages
   - Cyprus tax benefits (8% vs 20-40%)
6. **Technical Setup**:
   - Cooling requirements in Cyprus climate
   - Container-based solutions
   - Remote management
7. **Lighthief Partnership**: Full-service provider

## 📋 **PHASE 4: Homepage Updates** (Priority: MEDIUM)

### **4.1 Feature PARK-REF-5001**
- [ ] Add featured project section on homepage
- [ ] Highlight: "New Listing: 5MW Park with Tracking - €9.6M"
- [ ] Quick stats: Curtailment data, BESS opportunity
- [ ] CTA to full listing page

### **4.2 Reorder Featured Parks**
Current order → New order:
1. PARK-REF-5001 (5MW with tracking) - NEW FEATURED
2. 10MW Farm
3. 5MW Farm  
4. 1MW Farm

## 📋 **PHASE 5: Crypto Pages Implementation**

### **5.1 Crypto Landing Page** `/crypto`
```typescript
// Key sections:
- Hero: "Crypto Meets Solar: 8% Tax Paradise"
- Tax comparison: Cyprus vs other jurisdictions
- Investment pathways: Direct solar, Mining operations, Hybrid
- Mining services: BTC mining, AI GPU mining
- PPA for miners: Power purchase agreements
- Success metrics: kWh costs, ROI projections, tax savings
```

### **5.2 Solar Mining Page** `/crypto/solar-mining`
```typescript
// Features:
- BTC mining economics calculator
- Curtailment-based mining (free energy)
- BESS-enabled 24/7 mining
- Equipment specifications
- Revenue projections
- Contact for PPA terms
```

### **5.3 AI Mining Page** `/crypto/ai-mining`
```typescript
// Features:
- GPU mining vs training workloads
- Processing power revenue models
- Off-grid park solutions
- Cooling and infrastructure
- Partnership opportunities
```

## 📋 **PHASE 6: Technical Implementation**

### **6.1 New Sanity Schemas**
- [ ] cryptoPage.ts - Crypto content pages
- [ ] miningService.ts - Mining service offerings
- [ ] ppaTerms.ts - Power purchase agreement templates

### **6.2 New Constants**
```typescript
// lib/constants.ts additions
export const CRYPTO_MINING_DATA = {
  btcMining: {
    equipmentCost: 3000, // per TH/s
    powerConsumption: 3250, // W per miner (S19 XP)
    hashrate: 140, // TH/s per miner
    avgRevenue: 12, // $/day per TH/s
  },
  aiGpuMining: {
    equipmentCost: 15000, // per H100 GPU
    powerConsumption: 700, // W per GPU
    avgRevenue: 50, // $/day per GPU
  },
  cyprusTax: {
    cryptoGains: 0.08, // 8% flat tax
    comparison: {
      usa: 0.37,
      uk: 0.45,
      germany: 0.42,
      portugal: 0.28
    }
  }
}
```

### **6.3 Calculator Enhancements**
```typescript
// Add to ROI Calculator
interface CapexMode {
  type: 'epc-dev' | 'turnkey' | 'rtb-old' | 'rtb-new'
  pricePerMW: number
  description: string
}

const CAPEX_MODES = {
  'epc-dev': { pricePerMW: 500000, description: 'EPC Development from scratch' },
  'turnkey': { pricePerMW: 1200000, description: 'Turnkey new build' },
  'rtb-old': { pricePerMW: 1200000, description: 'Energized park (older, fixed-tilt)' },
  'rtb-new': { pricePerMW: 1700000, description: 'Energized park (new, tracking)' }
}
```

## 🎯 **IMPLEMENTATION PRIORITY ORDER:**

### **Week 1:**
1. ✅ Calculator pricing updates (€1.2M-1.7M range)
2. ✅ Financing cap visualization (€500k/MW)
3. ✅ Feature PARK-REF-5001 on homepage
4. ✅ Crypto landing page (`/crypto`)

### **Week 2:**
5. ✅ Solar BTC mining blog post
6. ✅ AI GPU mining blog post
7. ✅ Mining service pages
8. ✅ PPA calculator for miners

### **Week 3:**
9. ✅ Crypto navigation integration
10. ✅ Tax comparison tools
11. ✅ Mining ROI calculators
12. ✅ Off-grid solutions page

## 🔧 **TECHNICAL REQUIREMENTS:**

### **Dependencies to Add:**
```bash
# For PDF generation (future)
npm install @react-pdf/renderer
npm install jspdf

# For advanced charts
npm install recharts
```

### **Environment Variables:**
```bash
# Future crypto price APIs
COINMARKETCAP_API_KEY=
CRYPTO_PRICE_API=
```

## 📊 **SEO STRATEGY:**

### **Target Keywords:**
- "Cyprus crypto tax 8%"
- "solar bitcoin mining Cyprus"
- "AI GPU mining renewable energy"
- "crypto solar investment"
- "Cyprus tax haven crypto"
- "renewable energy mining"
- "off-grid bitcoin mining"
- "solar powered data center Cyprus"

### **Content Hubs:**
1. **Solar Investment** (existing)
2. **Crypto Investment** (new)
3. **Mining Services** (new)
4. **Tax Optimization** (new)

## 🎯 **CURRENT STATUS:**

- [x] LOI generator implemented
- [x] 5MW park listing with BESS
- [x] Curtailment crisis blog
- [ ] Calculator pricing updates
- [ ] Crypto section
- [ ] Mining blogs
- [ ] Homepage featured projects

---

**Next immediate actions**: Update calculator, create crypto landing page, write mining blog posts.

