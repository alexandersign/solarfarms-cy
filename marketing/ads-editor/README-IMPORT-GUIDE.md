# Google Ads Editor Import Guide

## Your Account Details
- **Google Ads ID:** AW-17133012148
- **GA4 ID:** G-2XED6Q5QT9
- **Tracking:** Already active (form_submit, remarketing, calculator events all firing)

---

## Step-by-Step Import Process

### Step 1: Open Google Ads Editor & Download Account
1. Open Google Ads Editor
2. File → Add Account (if not already added)
3. Enter your Google Ads account ID: **AW-17133012148**
4. Click "Get Recent Changes" → "All campaigns" to sync current state

### Step 2: Import Campaigns & Ad Groups
1. Go to **Account** menu → **Import** → **From CSV file**
2. Select: `01-campaigns-and-adgroups.csv`
3. Map the columns when prompted (they should auto-map):
   - Campaign → Campaign
   - Ad Group → Ad Group
   - Budget → Budget
   - Bid Strategy Type → Bid Strategy Type
   - Max CPC → Default Max CPC
4. Click **Import**
5. Review the imported items in the left panel — you should see 6 campaigns with 16 ad groups total

### Step 3: Import Keywords
1. Navigate to **Keywords** in the left panel
2. **Account** menu → **Import** → **From CSV file**
3. Select: `02-keywords.csv`
4. Map columns:
   - Campaign → Campaign
   - Ad Group → Ad Group
   - Keyword → Keyword
   - Match Type → Match Type
   - Max CPC → Max CPC
5. Click **Import**
6. You should see 100+ keywords across all ad groups

### Step 4: Import Negative Keywords
1. Navigate to **Keywords, Negative** in the left panel (under Keywords section)
2. **Account** menu → **Import** → **From CSV file**
3. Select: `03-negative-keywords.csv`
4. Map columns similarly
5. Click **Import**

**IMPORTANT:** For best coverage, after importing, also create a **Shared Negative Keyword List**:
- Go to **Shared Library** → **Negative keyword lists**
- Create list: "Master Negatives"
- Add ALL the negative keywords from the file
- Apply this list to ALL campaigns

### Step 5: Import Responsive Search Ads
1. Navigate to **Ads** → **Responsive search ads** in the left panel
2. **Account** menu → **Import** → **From CSV file**
3. Select: `04-responsive-search-ads.csv`
4. Map all Headline and Description columns
5. Click **Import**
6. You should see 15 RSAs (one per ad group, some ad groups have 2)

### Step 6: Review Before Posting

**Check these in Ads Editor before uploading:**

#### Campaigns
- [ ] All 6 campaigns set to **Paused** (do NOT go live yet)
- [ ] Budgets correct: €15, €80, €60, €50, €40 daily
- [ ] Bid strategy: Manual CPC (switch to Maximize Conversions after 30 conversions)
- [ ] Locations correct per campaign (see below)

#### Location Targeting (verify per campaign)
| Campaign | Locations |
|----------|-----------|
| Brand | Cyprus, Greece, UK, Germany, UAE |
| Solar Investment | Cyprus, Greece, UK, Germany, UAE, Switzerland |
| BESS Curtailment | **Cyprus only** |
| BESS Investment | Cyprus, Greece, UK, Germany, UAE |
| Alternative Investment | Cyprus, Greece, UK, Germany |

#### Language Targeting
| Campaign | Languages |
|----------|-----------|
| Brand | English + Greek |
| Solar Investment | English |
| BESS Curtailment | **English + Greek** |
| BESS Investment | English |
| Alternative Investment | English |

#### Ad Group Review
- [ ] Each ad group has 6-10 keywords
- [ ] Each ad group has at least 1 RSA
- [ ] Final URLs point to correct pages (/invest or /bess)

#### Keyword Review
- [ ] No duplicate keywords across ad groups
- [ ] Match types correct (mostly Phrase, some Exact for high-intent)
- [ ] Max CPC bids reasonable (€2-6 range)

#### Negative Keywords
- [ ] Residential/home terms blocked on ALL campaigns
- [ ] Job/career terms blocked on ALL campaigns
- [ ] Stock/ETF terms blocked on ALL campaigns
- [ ] DIY/education terms blocked on ALL campaigns

### Step 7: Post Changes
1. Click **Post** (top toolbar) → **Post selected campaigns**
2. Select ALL 6 campaigns
3. Click **Post**
4. Wait for confirmation — all changes upload to Google Ads

### Step 8: Go-Live Sequence
**Do NOT enable all campaigns at once.** Follow this sequence:

**Week 1:** Enable only:
1. ✅ Brand — SolarFarms / Lighthief (€15/day)
2. ✅ Search — BESS Curtailment Cyprus [Park Owners] (€60/day)
3. ✅ Search — Solar Investment Cyprus [HNI] (€80/day)
- Total: **€155/day = ~€4,650/month**

**Week 3 (after validating conversions work):** Enable:
4. ✅ Search — BESS Investment [HNI+Technical] (€50/day)

**Month 2:** Enable:
5. ✅ Search — Alternative Investments [HNI] (€40/day)

**Month 2-3 (when audience lists have 1000+ users):**
6. ✅ Create Display/Retargeting campaign in web UI (needs audience setup)

---

## Daily Optimization Checklist (First 2 Weeks)

### Every Day
- [ ] Check **Search Terms Report** — add irrelevant terms as negatives
- [ ] Check **CTR** — anything below 2% needs ad copy review
- [ ] Check **CPC** — adjust bids if too high or too low
- [ ] Check for **Conversions** — are form submits tracking?

### Every 3 Days
- [ ] Review **Quality Score** per keyword — pause anything below 4/10
- [ ] Check **Ad strength** — aim for "Good" or "Excellent" on all RSAs
- [ ] Review **Impression Share** — Brand campaign should be 95%+

### Every Week
- [ ] **Search Terms Report deep dive** — find new keyword opportunities
- [ ] **Geographic performance** — which countries convert? Shift budget there
- [ ] **Device performance** — mobile vs desktop? Adjust bids
- [ ] **Hour of day** — when do conversions happen? Set ad schedule
- [ ] **Update bids** based on CPA data

---

## Optimization Strategies

### After 2 Weeks: Quick Wins
1. **Pause low-performing keywords** — no impressions or very low CTR
2. **Add top search terms as exact match** — the terms that convert
3. **Increase bids on converting keywords** — pay more for what works
4. **Decrease bids on high-cost no-convert** — stop bleeding

### After 1 Month: Smart Bidding
1. **Switch to Maximize Conversions** once you have 15+ conversions
2. **Set Target CPA** — based on actual CPA from first month
3. **Enable Broad Match** on top performers — let Google find similar queries
4. **Create audience segments** — remarketing lists, similar audiences

### After 2 Months: Scale
1. **Increase budget** on winning campaigns (highest conversion rate, lowest CPA)
2. **Pause losing campaigns** (high spend, no conversions)
3. **Test new ad copy** — create Ad Group Experiments
4. **Launch retargeting** — Display campaign targeting website visitors
5. **Consider Performance Max** — if search campaigns are stable

---

## Key Metrics to Track

| Metric | Target (Month 1) | Target (Month 3+) |
|--------|-------------------|---------------------|
| CTR (Search) | >3% | >5% |
| CPC | €2-6 | €2-5 |
| Conversion Rate | >2% | >4% |
| CPA (Cost per Lead) | <€200 | <€120 |
| Quality Score | >5/10 | >7/10 |
| Impression Share (Brand) | >90% | >95% |
| Impression Share (Non-Brand) | >30% | >50% |

---

## Files in This Folder

| File | What It Contains | Import Order |
|------|-----------------|-------------|
| `01-campaigns-and-adgroups.csv` | 6 campaigns, 16 ad groups, budgets, bids, locations | 1st |
| `02-keywords.csv` | 100+ keywords with match types and CPCs | 2nd |
| `03-negative-keywords.csv` | 85+ negative keywords per campaign | 3rd |
| `04-responsive-search-ads.csv` | 15 RSAs with 15 headlines + 4 descriptions each | 4th |
| `README-IMPORT-GUIDE.md` | This file | — |
