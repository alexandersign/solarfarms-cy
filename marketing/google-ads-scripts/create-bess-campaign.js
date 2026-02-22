/**
 * Google Ads Script: Create BESS Curtailment Campaign
 * 
 * HOW TO USE:
 * 1. Go to ads.google.com → Tools & Settings → Bulk Actions → Scripts
 * 2. Click "+" to create new script
 * 3. Paste this entire script
 * 4. Click "Preview" to test (no changes made)
 * 5. Click "Run" to execute (creates the campaign)
 * 
 * NOTE: Google Ads Scripts cannot create campaigns from scratch.
 * They CAN manage existing campaigns: adjust bids, pause/enable keywords,
 * add negative keywords, generate reports, send email alerts.
 * 
 * For campaign CREATION, use the Google Ads API (see Option 2 below).
 * This script manages and optimizes an EXISTING campaign.
 */

// ============================================================
// CONFIGURATION — Update these to match your campaign
// ============================================================
var CONFIG = {
  campaignName: 'Search — BESS Curtailment Cyprus',
  maxCpc: 6.00,
  targetCpa: 150.00,
  emailAlerts: 'office@lighthief.com',
  
  // Negative keywords to add
  negativeKeywords: [
    'home solar panels', 'residential solar', 'solar panels for house',
    'rooftop solar', 'home battery', 'powerwall', 'solar jobs',
    'solar engineer', 'diy solar', 'solar stock', 'solar etf',
    'battery stock', 'tesla stock', 'free', 'cheap', 'subsidy',
    'government grant', 'solar panel cleaning', 'cleaning', 
    'window cleaning', 'used solar', 'second hand'
  ]
};

// ============================================================
// SCRIPT 1: Add Negative Keywords to Campaign
// Run this ONCE after creating the campaign in the web UI
// ============================================================
function addNegativeKeywords() {
  var campaignIterator = AdsApp.campaigns()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .get();
  
  if (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    
    CONFIG.negativeKeywords.forEach(function(keyword) {
      campaign.createNegativeKeyword('[' + keyword + ']');
      Logger.log('Added negative keyword: ' + keyword);
    });
    
    Logger.log('✅ Added ' + CONFIG.negativeKeywords.length + ' negative keywords to ' + CONFIG.campaignName);
  } else {
    Logger.log('❌ Campaign not found: ' + CONFIG.campaignName);
  }
}

// ============================================================
// SCRIPT 2: Daily Optimization — Schedule this DAILY
// Pauses bad keywords, alerts on high spend, adjusts bids
// ============================================================
function dailyOptimization() {
  var today = new Date();
  var dateRange = 'LAST_7_DAYS';
  var report = [];
  
  // --- 1. Pause keywords with 0 conversions and high spend ---
  var keywordIterator = AdsApp.keywords()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .withCondition("metrics.cost_micros > " + (CONFIG.targetCpa * 1.5 * 1000000))
    .withCondition("metrics.conversions < 1")
    .forDateRange(dateRange)
    .get();
  
  while (keywordIterator.hasNext()) {
    var keyword = keywordIterator.next();
    var stats = keyword.getStatsFor(dateRange);
    keyword.pause();
    report.push('⏸ PAUSED (high spend, 0 conversions): "' + keyword.getText() + 
                '" — Spent €' + stats.getCost().toFixed(2));
  }
  
  // --- 2. Increase bids on converting keywords ---
  var convertingIterator = AdsApp.keywords()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .withCondition("metrics.conversions >= 1")
    .forDateRange(dateRange)
    .get();
  
  while (convertingIterator.hasNext()) {
    var keyword = convertingIterator.next();
    var stats = keyword.getStatsFor(dateRange);
    var cpa = stats.getCost() / stats.getConversions();
    
    if (cpa < CONFIG.targetCpa * 0.8) {
      // CPA is good — increase bid by 15%
      var currentBid = keyword.bidding().getCpc();
      var newBid = Math.min(currentBid * 1.15, CONFIG.maxCpc);
      keyword.bidding().setCpc(newBid);
      report.push('📈 BID UP: "' + keyword.getText() + 
                  '" — CPA €' + cpa.toFixed(2) + ' — Bid: €' + currentBid.toFixed(2) + ' → €' + newBid.toFixed(2));
    }
  }
  
  // --- 3. Decrease bids on expensive non-converting keywords ---
  var expensiveIterator = AdsApp.keywords()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .withCondition("metrics.clicks > 5")
    .withCondition("metrics.conversions < 1")
    .forDateRange(dateRange)
    .get();
  
  while (expensiveIterator.hasNext()) {
    var keyword = expensiveIterator.next();
    var stats = keyword.getStatsFor(dateRange);
    var currentBid = keyword.bidding().getCpc();
    var newBid = Math.max(currentBid * 0.8, 1.00);
    keyword.bidding().setCpc(newBid);
    report.push('📉 BID DOWN: "' + keyword.getText() + 
                '" — ' + stats.getClicks() + ' clicks, 0 conversions — Bid: €' + currentBid.toFixed(2) + ' → €' + newBid.toFixed(2));
  }
  
  // --- 4. Log summary ---
  if (report.length > 0) {
    Logger.log('\n===== DAILY OPTIMIZATION REPORT =====');
    report.forEach(function(line) { Logger.log(line); });
    Logger.log('=====================================\n');
    
    // Send email alert
    if (CONFIG.emailAlerts) {
      MailApp.sendEmail({
        to: CONFIG.emailAlerts,
        subject: '🔋 BESS Campaign Daily Report — ' + today.toLocaleDateString(),
        body: 'Google Ads Optimization Report\n\n' + report.join('\n') + 
              '\n\nCampaign: ' + CONFIG.campaignName
      });
    }
  } else {
    Logger.log('No optimization actions needed today.');
  }
}

// ============================================================
// SCRIPT 3: Search Terms Audit — Schedule WEEKLY
// Finds irrelevant search terms and adds them as negatives
// ============================================================
function searchTermsAudit() {
  var report = AdsApp.report(
    "SELECT search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions " +
    "FROM search_term_view " +
    "WHERE campaign.name = '" + CONFIG.campaignName + "' " +
    "AND segments.date DURING LAST_14_DAYS " +
    "AND metrics.clicks > 0 " +
    "ORDER BY metrics.cost_micros DESC"
  );
  
  var rows = report.rows();
  var irrelevantTerms = [];
  var goodTerms = [];
  var logLines = [];
  
  // Words that indicate irrelevant traffic
  var badSignals = ['home', 'house', 'residential', 'rooftop', 'diy', 'job', 'career',
                    'stock', 'etf', 'cleaning', 'panel cost', 'free', 'cheap',
                    'australia', 'usa', 'india', 'uk', 'texas', 'california'];
  
  while (rows.hasNext()) {
    var row = rows.next();
    var term = row['search_term_view.search_term'];
    var clicks = parseInt(row['metrics.clicks']);
    var cost = parseInt(row['metrics.cost_micros']) / 1000000;
    var conversions = parseFloat(row['metrics.conversions']);
    
    var isBad = false;
    badSignals.forEach(function(signal) {
      if (term.toLowerCase().indexOf(signal) !== -1) isBad = true;
    });
    
    if (isBad && conversions === 0) {
      irrelevantTerms.push(term);
      logLines.push('🚫 NEGATIVE: "' + term + '" — ' + clicks + ' clicks, €' + cost.toFixed(2) + ', 0 conversions');
    } else if (conversions > 0) {
      goodTerms.push(term);
      logLines.push('✅ CONVERTING: "' + term + '" — ' + clicks + ' clicks, €' + cost.toFixed(2) + ', ' + conversions + ' conversions');
    } else if (clicks >= 3 && conversions === 0) {
      logLines.push('⚠️ REVIEW: "' + term + '" — ' + clicks + ' clicks, €' + cost.toFixed(2) + ', 0 conversions');
    }
  }
  
  // Add irrelevant terms as negatives
  if (irrelevantTerms.length > 0) {
    var campaignIterator = AdsApp.campaigns()
      .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
      .get();
    
    if (campaignIterator.hasNext()) {
      var campaign = campaignIterator.next();
      irrelevantTerms.forEach(function(term) {
        campaign.createNegativeKeyword('"' + term + '"');
      });
      Logger.log('Added ' + irrelevantTerms.length + ' new negative keywords');
    }
  }
  
  // Log everything
  Logger.log('\n===== SEARCH TERMS AUDIT =====');
  logLines.forEach(function(line) { Logger.log(line); });
  Logger.log('==============================\n');
  
  // Email report
  if (CONFIG.emailAlerts && logLines.length > 0) {
    MailApp.sendEmail({
      to: CONFIG.emailAlerts,
      subject: '🔍 BESS Campaign Search Terms Audit',
      body: 'Weekly Search Terms Report\n\n' + logLines.join('\n') +
            '\n\nAuto-added ' + irrelevantTerms.length + ' negative keywords.' +
            '\n\nConverting terms: ' + goodTerms.length +
            '\nCampaign: ' + CONFIG.campaignName
    });
  }
}

// ============================================================
// SCRIPT 4: Weekly Performance Summary — Schedule WEEKLY
// ============================================================
function weeklyReport() {
  var campaignIterator = AdsApp.campaigns()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .get();
  
  if (!campaignIterator.hasNext()) {
    Logger.log('Campaign not found');
    return;
  }
  
  var campaign = campaignIterator.next();
  var stats7 = campaign.getStatsFor('LAST_7_DAYS');
  var stats30 = campaign.getStatsFor('LAST_30_DAYS');
  
  var report = '=== BESS CURTAILMENT CAMPAIGN — WEEKLY REPORT ===\n\n';
  
  report += 'LAST 7 DAYS:\n';
  report += '  Impressions: ' + stats7.getImpressions() + '\n';
  report += '  Clicks: ' + stats7.getClicks() + '\n';
  report += '  CTR: ' + (stats7.getCtr() * 100).toFixed(2) + '%\n';
  report += '  Avg CPC: €' + stats7.getAverageCpc().toFixed(2) + '\n';
  report += '  Cost: €' + stats7.getCost().toFixed(2) + '\n';
  report += '  Conversions: ' + stats7.getConversions() + '\n';
  if (stats7.getConversions() > 0) {
    report += '  CPA: €' + (stats7.getCost() / stats7.getConversions()).toFixed(2) + '\n';
  }
  
  report += '\nLAST 30 DAYS:\n';
  report += '  Impressions: ' + stats30.getImpressions() + '\n';
  report += '  Clicks: ' + stats30.getClicks() + '\n';
  report += '  CTR: ' + (stats30.getCtr() * 100).toFixed(2) + '%\n';
  report += '  Avg CPC: €' + stats30.getAverageCpc().toFixed(2) + '\n';
  report += '  Cost: €' + stats30.getCost().toFixed(2) + '\n';
  report += '  Conversions: ' + stats30.getConversions() + '\n';
  if (stats30.getConversions() > 0) {
    report += '  CPA: €' + (stats30.getCost() / stats30.getConversions()).toFixed(2) + '\n';
  }
  
  // Top keywords
  report += '\nTOP KEYWORDS (by clicks, last 7 days):\n';
  var kwIterator = AdsApp.keywords()
    .withCondition("campaign.name = '" + CONFIG.campaignName + "'")
    .orderBy("metrics.clicks DESC")
    .withLimit(10)
    .forDateRange('LAST_7_DAYS')
    .get();
  
  while (kwIterator.hasNext()) {
    var kw = kwIterator.next();
    var kwStats = kw.getStatsFor('LAST_7_DAYS');
    report += '  ' + kw.getText() + ' — ' + kwStats.getClicks() + ' clicks, €' + kwStats.getCost().toFixed(2);
    if (kwStats.getConversions() > 0) report += ' ✅ ' + kwStats.getConversions() + ' conv';
    report += '\n';
  }
  
  Logger.log(report);
  
  if (CONFIG.emailAlerts) {
    MailApp.sendEmail({
      to: CONFIG.emailAlerts,
      subject: '📊 BESS Campaign Weekly Report — ' + new Date().toLocaleDateString(),
      body: report
    });
  }
}

// ============================================================
// MAIN — Choose which function to run
// ============================================================
function main() {
  // Uncomment the function you want to run:
  
  addNegativeKeywords();     // Run ONCE — adds all negative keywords
  // dailyOptimization();    // Schedule DAILY — auto-adjusts bids, pauses bad keywords
  // searchTermsAudit();     // Schedule WEEKLY — finds and blocks irrelevant search terms  
  // weeklyReport();         // Schedule WEEKLY — emails you performance summary
}
