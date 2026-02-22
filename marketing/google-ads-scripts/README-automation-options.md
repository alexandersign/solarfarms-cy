# Google Ads Automation — Your 3 Options

## Quick Comparison

| Method | Create Campaigns | Manage/Optimize | Difficulty | Best For |
|--------|:---:|:---:|:---:|---|
| **Google Ads Scripts** | ❌ No | ✅ Yes | Easy | Auto bid adjustments, negative keywords, reports |
| **Google Ads API** | ✅ Yes | ✅ Yes | Hard | Full programmatic control from your codebase |
| **Third-Party Tools** | ✅ Yes | ✅ Yes | Medium | If you want a UI but with automation |

---

## Option 1: Google Ads Scripts (RECOMMENDED — Start Here)

**What:** JavaScript that runs inside your Google Ads account. No server needed.

**Can do:**
- Auto-adjust bids based on performance
- Auto-pause bad keywords
- Auto-add negative keywords from search terms
- Send email reports
- Manage budgets
- Enable/pause campaigns on schedule

**Cannot do:**
- Create new campaigns (must be done in web UI first)
- Create new ad groups or ads

**How to set up:**
1. Go to ads.google.com → Tools & Settings → Bulk Actions → Scripts
2. Click "+" → paste script → Preview → Run
3. Schedule: set to run daily or weekly

**Files:** `create-bess-campaign.js` has 4 ready scripts:
- `addNegativeKeywords()` — run once
- `dailyOptimization()` — schedule daily
- `searchTermsAudit()` — schedule weekly
- `weeklyReport()` — schedule weekly

---

## Option 2: Google Ads API (Full Power)

**What:** REST API that gives you complete control over your Google Ads account from code.

**Can do:** EVERYTHING — create campaigns, ad groups, keywords, ads, manage bids, pull reports.

**Setup required:**
1. Apply for Google Ads API access: https://developers.google.com/google-ads/api/docs/get-started/dev-token
2. Create OAuth2 credentials in Google Cloud Console
3. Get a Developer Token (takes 1-5 business days approval)
4. Install client library: `npm install google-ads-api`

**Environment variables needed:**
```
GOOGLE_ADS_CLIENT_ID=your-oauth-client-id
GOOGLE_ADS_CLIENT_SECRET=your-oauth-client-secret
GOOGLE_ADS_DEVELOPER_TOKEN=your-dev-token
GOOGLE_ADS_REFRESH_TOKEN=your-refresh-token
GOOGLE_ADS_CUSTOMER_ID=17133012148
```

**Approval time:** 1-5 business days for developer token. You need a Google Ads account spending real money (which you have).

---

## Option 3: Third-Party Tools

### Optmyzr (https://www.optmyzr.com)
- Rule-based optimization
- One-click optimizations
- Automated reporting
- ~$250/month

### Adalysis (https://adalysis.com)
- Ad testing automation
- Quality score monitoring
- ~$150/month

### Google Ads Automated Rules (FREE — Built In!)
- ads.google.com → Tools → Rules
- Create rules like "Pause keyword if CPC > €8 and conversions = 0"
- No coding required

---

## Recommended Approach

**Week 1 (Now):**
1. Create campaigns manually in web UI (already done ✅)
2. Add the `addNegativeKeywords()` script in Google Ads Scripts
3. Set up Automated Rules in Google Ads (no coding)

**Week 2:**
1. Schedule `dailyOptimization()` script to run every day at 6am
2. Schedule `searchTermsAudit()` to run every Monday
3. Schedule `weeklyReport()` to run every Monday

**Month 2 (Optional):**
1. Apply for Google Ads API developer token
2. Build full programmatic management into your Next.js codebase
3. Create dashboard for campaign performance on solarfarms.cy admin

---

## Google Ads Automated Rules (Quickest Win — No Code)

Go to ads.google.com → Tools & Settings → Rules → + New Rule

### Rule 1: Pause Expensive Non-Converters
- Apply to: Keywords
- Action: Pause
- Condition: Cost > €180 AND Conversions < 1
- Frequency: Daily
- Time period: Last 14 days

### Rule 2: Increase Bids on Converters  
- Apply to: Keywords
- Action: Increase max CPC bid by 10%
- Condition: Conversions ≥ 1 AND CPA < €100
- Upper bid limit: €8.00
- Frequency: Weekly
- Time period: Last 14 days

### Rule 3: Decrease Bids on High CPC
- Apply to: Keywords
- Action: Decrease max CPC bid by 15%
- Condition: Clicks ≥ 5 AND Conversions < 1 AND Avg CPC > €5
- Lower bid limit: €1.50
- Frequency: Weekly
- Time period: Last 14 days

### Rule 4: Alert on Budget Exhaustion
- Apply to: Campaigns
- Action: Send email
- Condition: Impression Share Lost (Budget) > 30%
- Frequency: Daily
