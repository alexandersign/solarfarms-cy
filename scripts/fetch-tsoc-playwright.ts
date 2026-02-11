/**
 * TSOC Cyprus Day-Ahead Market Data Fetcher (Playwright)
 * 
 * Uses a real headless browser to bypass Cloudflare protection on tsoc.org.cy.
 * Designed to run in GitHub Actions (daily cron) or locally.
 * 
 * Usage:
 *   npx playwright install chromium
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/fetch-tsoc-playwright.ts
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/fetch-tsoc-playwright.ts --backfill
 * 
 * Modes:
 *   Default:    Downloads only the last 3 days of Excel files (for daily cron)
 *   --backfill: Downloads ALL available files since the open market start (Oct 2025)
 * 
 * Cloudflare Bypass Strategy:
 *   1. Uses Playwright's real Chromium browser (not detectable as headless)
 *   2. Removes navigator.webdriver flag
 *   3. Uses realistic viewport, user agent, and locale
 *   4. Waits for Cloudflare JS challenge to auto-resolve (5-30s)
 *   5. Falls back to page.waitForSelector for Excel links
 * 
 * Alternative Cloudflare Bypass Options (if Playwright alone fails):
 *   - Add puppeteer-extra-plugin-stealth (pip: playwright-stealth)
 *   - Use a residential proxy (PROXY_URL env var)
 *   - Use ScrapingBee/ZenRows API (SCRAPINGBEE_API_KEY env var)
 *   - Use got-scraping for TLS fingerprint matching (lighter but no JS execution)
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

// ─── Configuration ──────────────────────────────────────────────────────────

const TSOC_URL = 'https://tsoc.org.cy/competitive-electricity-market/mms-reports/day-ahead-market-daily-activity-reports-en/'
const TSOC_BASE = 'https://tsoc.org.cy'
const EXCEL_DIR = path.join(process.cwd(), 'market', 'excel')
const DATA_DIR = path.join(process.cwd(), 'market', 'data')
const OPEN_MARKET_START = '20251001' // Oct 1, 2025 - when open market began
const MAX_CLOUDFLARE_WAIT_SECONDS = 30
const DOWNLOAD_DELAY_MS = 1500

// ─── Setup ──────────────────────────────────────────────────────────────────

if (!fs.existsSync(EXCEL_DIR)) fs.mkdirSync(EXCEL_DIR, { recursive: true })
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/(\d{8})/)
  return match ? match[1] : null
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/octet-stream,*/*',
        'Referer': TSOC_URL,
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${TSOC_BASE}${res.headers.location}`
        downloadFile(redirectUrl, dest).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }

      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
      file.on('error', (err) => {
        fs.unlink(dest, () => {})
        reject(err)
      })
    })
    req.on('error', reject)
    req.setTimeout(30000, () => {
      req.destroy()
      reject(new Error('Download timed out'))
    })
  })
}

function isCloudflareChallenge(title: string): boolean {
  const lower = title.toLowerCase()
  return lower.includes('just a moment') ||
    lower.includes('checking your browser') ||
    lower.includes('attention required') ||
    lower.includes('cloudflare')
}

// ─── Scraping Strategies ────────────────────────────────────────────────────

/**
 * Strategy 1: Playwright with stealth (primary)
 * Launches a real Chromium browser, navigates to TSOC, waits for
 * Cloudflare challenge to auto-resolve, then extracts Excel links.
 */
async function scrapeWithPlaywright(): Promise<{ url: string; filename: string }[]> {
  // Dynamic import so the script doesn't crash if playwright isn't installed
  const { chromium } = await import('playwright')

  console.log('Strategy 1: Playwright browser')
  console.log('  Launching Chromium...')

  const proxyUrl = process.env.PROXY_URL
  const launchOptions: any = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-dev-shm-usage',
    ],
  }

  // Optional: use a proxy for additional evasion
  if (proxyUrl) {
    console.log(`  Using proxy: ${proxyUrl.replace(/:\/\/.*@/, '://***@')}`)
    launchOptions.proxy = { server: proxyUrl }
  }

  const browser = await chromium.launch(launchOptions)

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      locale: 'en-US',
      timezoneId: 'Europe/Nicosia',
      javaScriptEnabled: true,
    })

    // Anti-detection scripts
    await context.addInitScript(() => {
      // Remove webdriver flag
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined })

      // Chrome runtime mock
      // @ts-ignore
      window.chrome = { runtime: {} }

      // Override permissions query
      const originalQuery = window.navigator.permissions.query
      // @ts-ignore
      window.navigator.permissions.query = (parameters: any) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission } as PermissionStatus)
          : originalQuery(parameters)

      // Mock plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      })

      // Mock languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      })
    })

    const page = await context.newPage()

    // Navigate to TSOC
    console.log('  Navigating to TSOC...')
    const response = await page.goto(TSOC_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    console.log(`  HTTP ${response?.status()}`)

    // Handle Cloudflare challenge
    let pageTitle = await page.title()
    console.log(`  Page title: "${pageTitle}"`)

    if (isCloudflareChallenge(pageTitle)) {
      console.log('  ⏳ Cloudflare challenge detected, waiting for auto-resolve...')
      const maxAttempts = Math.ceil(MAX_CLOUDFLARE_WAIT_SECONDS / 5)

      for (let i = 0; i < maxAttempts; i++) {
        await page.waitForTimeout(5000)
        pageTitle = await page.title()
        console.log(`    Attempt ${i + 1}/${maxAttempts}: "${pageTitle}"`)

        if (!isCloudflareChallenge(pageTitle)) {
          console.log('  ✓ Cloudflare challenge passed!')
          break
        }
      }

      if (isCloudflareChallenge(pageTitle)) {
        // Last resort: wait for Excel link selector
        try {
          console.log('  Waiting for Excel links to appear...')
          await page.waitForSelector('a[href*=".xlsx"]', { timeout: 15000 })
          console.log('  ✓ Excel links found after extended wait!')
        } catch {
          // Save debug info
          const debugDir = path.join(process.cwd(), 'market')
          await page.screenshot({
            path: path.join(debugDir, 'debug-cloudflare.png'),
            fullPage: true
          })
          fs.writeFileSync(
            path.join(debugDir, 'debug-cloudflare.html'),
            await page.content()
          )
          console.error('  ✗ Could not bypass Cloudflare challenge')
          console.error('    Debug files saved to market/debug-cloudflare.*')
          throw new Error('Cloudflare challenge not resolved')
        }
      }
    }

    // Wait for content to stabilize
    await page.waitForTimeout(3000)

    // Extract Excel links - Method 1: DOM query
    console.log('  Extracting Excel links...')
    let links = await page.evaluate(() => {
      const results: { url: string; filename: string }[] = []
      document.querySelectorAll('a').forEach(a => {
        const href = a.href || ''
        if (href.match(/\.xlsx?(\?|$)/i)) {
          const filename = href.split('/').pop()?.split('?')[0] || ''
          if (filename) {
            results.push({ url: href, filename })
          }
        }
      })
      return results
    })

    // Method 2: Regex on HTML (catches links in data attributes, scripts, etc.)
    if (links.length === 0) {
      console.log('  No links via DOM, trying HTML regex...')
      const html = await page.content()
      const regex = /href=["']([^"']*\.xlsx?)["']/gi
      let match
      while ((match = regex.exec(html)) !== null) {
        let url = match[1]
        if (!url.startsWith('http')) url = `${TSOC_BASE}${url}`
        const filename = url.split('/').pop()?.split('?')[0] || ''
        if (filename) links.push({ url, filename })
      }
    }

    // Method 3: Check iframes
    if (links.length === 0) {
      console.log('  Checking iframes...')
      for (const frame of page.frames()) {
        try {
          const frameLinks = await frame.evaluate(() => {
            const results: { url: string; filename: string }[] = []
            document.querySelectorAll('a').forEach(a => {
              const href = a.href || ''
              if (href.match(/\.xlsx?(\?|$)/i)) {
                const filename = href.split('/').pop()?.split('?')[0] || ''
                if (filename) results.push({ url: href, filename })
              }
            })
            return results
          })
          links.push(...frameLinks)
        } catch { /* frame might be cross-origin */ }
      }
    }

    // Deduplicate
    const seen = new Set<string>()
    links = links.filter(l => {
      if (seen.has(l.filename)) return false
      seen.add(l.filename)
      return true
    })

    console.log(`  Found ${links.length} unique Excel links`)

    if (links.length === 0) {
      // Save debug info
      const html = await page.content()
      fs.writeFileSync(path.join(process.cwd(), 'market', 'debug-empty-page.html'), html)
      await page.screenshot({
        path: path.join(process.cwd(), 'market', 'debug-empty-page.png'),
        fullPage: true
      })
      console.error('  No Excel links found! Debug files saved.')
    }

    await browser.close()
    return links

  } catch (err) {
    await browser.close()
    throw err
  }
}

/**
 * Strategy 2: ScrapingBee API (fallback)
 * Uses a cloud scraping service that handles Cloudflare automatically.
 * Requires SCRAPINGBEE_API_KEY environment variable.
 * Free tier: 1000 API credits/month (1 credit per request with JS rendering)
 */
async function scrapeWithScrapingBee(): Promise<{ url: string; filename: string }[]> {
  const apiKey = process.env.SCRAPINGBEE_API_KEY
  if (!apiKey) throw new Error('SCRAPINGBEE_API_KEY not set')

  console.log('Strategy 2: ScrapingBee API')

  const apiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(TSOC_URL)}&render_js=true&premium_proxy=true&country_code=cy`

  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(60000) })
  if (!response.ok) {
    throw new Error(`ScrapingBee API error: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  console.log(`  Got ${html.length} bytes of HTML`)

  // Extract links from HTML
  const links: { url: string; filename: string }[] = []
  const regex = /href=["']([^"']*\.xlsx?)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    let url = match[1]
    if (!url.startsWith('http')) url = `${TSOC_BASE}${url}`
    const filename = url.split('/').pop()?.split('?')[0] || ''
    if (filename) links.push({ url, filename })
  }

  // Deduplicate
  const seen = new Set<string>()
  return links.filter(l => {
    if (seen.has(l.filename)) return false
    seen.add(l.filename)
    return true
  })
}

/**
 * Strategy 3: ZenRows API (fallback)
 * Another cloud scraping service with Cloudflare bypass.
 * Requires ZENROWS_API_KEY environment variable.
 * Free tier: 1000 requests/month.
 */
async function scrapeWithZenRows(): Promise<{ url: string; filename: string }[]> {
  const apiKey = process.env.ZENROWS_API_KEY
  if (!apiKey) throw new Error('ZENROWS_API_KEY not set')

  console.log('Strategy 3: ZenRows API')

  const apiUrl = `https://api.zenrows.com/v1/?apikey=${apiKey}&url=${encodeURIComponent(TSOC_URL)}&js_render=true&antibot=true`

  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(60000) })
  if (!response.ok) {
    throw new Error(`ZenRows API error: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  console.log(`  Got ${html.length} bytes of HTML`)

  const links: { url: string; filename: string }[] = []
  const regex = /href=["']([^"']*\.xlsx?)["']/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    let url = match[1]
    if (!url.startsWith('http')) url = `${TSOC_BASE}${url}`
    const filename = url.split('/').pop()?.split('?')[0] || ''
    if (filename) links.push({ url, filename })
  }

  const seen = new Set<string>()
  return links.filter(l => {
    if (seen.has(l.filename)) return false
    seen.add(l.filename)
    return true
  })
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const isBackfill = process.argv.includes('--backfill') || process.env.TSOC_BACKFILL === 'true'

  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  TSOC Market Data Fetcher                               ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`Mode:     ${isBackfill ? 'BACKFILL (all since Oct 2025)' : 'DAILY (last 3 days)'}`)
  console.log(`Target:   ${TSOC_URL}`)
  console.log(`Save to:  ${EXCEL_DIR}`)
  console.log(`Existing: ${fs.readdirSync(EXCEL_DIR).filter(f => f.endsWith('.xlsx')).length} files`)
  console.log('')

  // ── Try scraping strategies in order ──
  let excelLinks: { url: string; filename: string }[] = []
  const strategies = [
    { name: 'Playwright', fn: scrapeWithPlaywright },
    { name: 'ScrapingBee', fn: scrapeWithScrapingBee },
    { name: 'ZenRows', fn: scrapeWithZenRows },
  ]

  for (const strategy of strategies) {
    try {
      excelLinks = await strategy.fn()
      if (excelLinks.length > 0) {
        console.log(`\n✓ ${strategy.name} found ${excelLinks.length} Excel links`)
        break
      }
      console.log(`\n⚠ ${strategy.name} returned 0 links, trying next strategy...`)
    } catch (err) {
      console.log(`\n⚠ ${strategy.name} failed: ${(err as Error).message}`)
      if (strategy.name === strategies[strategies.length - 1].name) {
        console.error('\nAll scraping strategies failed!')
        console.error('Possible solutions:')
        console.error('  1. Check if TSOC website is accessible manually')
        console.error('  2. Set PROXY_URL env var with a residential proxy')
        console.error('  3. Set SCRAPINGBEE_API_KEY env var (free at scrapingbee.com)')
        console.error('  4. Set ZENROWS_API_KEY env var (free at zenrows.com)')
        console.error('  5. Download Excel files manually to market/excel/')
        console.error('     Then run: npm run market:parse')
        process.exit(1)
      }
    }
  }

  // ── Filter links by date ──
  const cutoff = isBackfill
    ? OPEN_MARKET_START
    : (() => {
      const d = new Date()
      d.setDate(d.getDate() - 3)
      return d.toISOString().slice(0, 10).replace(/-/g, '')
    })()

  const filtered = excelLinks.filter(l => {
    const date = extractDateFromFilename(l.filename)
    return date && date >= cutoff
  })

  console.log(`\n${filtered.length} files match date filter (since ${cutoff})`)

  // ── Download files ──
  let downloaded = 0
  let skipped = 0
  let failed = 0

  for (const link of filtered) {
    const dest = path.join(EXCEL_DIR, link.filename)

    // Skip if already downloaded
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest)
      if (stats.size > 1000) { // Only skip if file seems valid
        skipped++
        continue
      }
      // Remove tiny/corrupt files
      fs.unlinkSync(dest)
    }

    try {
      process.stdout.write(`  ↓ ${link.filename}... `)
      await downloadFile(link.url, dest)

      // Verify the downloaded file is actually an Excel file (not HTML error)
      const stats = fs.statSync(dest)
      if (stats.size < 500) {
        const content = fs.readFileSync(dest, 'utf-8').substring(0, 200)
        if (content.includes('<html') || content.includes('<!DOCTYPE') || content.includes('403')) {
          fs.unlinkSync(dest)
          console.log(`BLOCKED (${stats.size} bytes, got HTML)`)
          failed++
          continue
        }
      }

      console.log(`OK (${(stats.size / 1024).toFixed(0)} KB)`)
      downloaded++

      // Polite delay between downloads
      await new Promise(r => setTimeout(r, DOWNLOAD_DELAY_MS))
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`)
      failed++
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
    }
  }

  // ── Summary ──
  const totalFiles = fs.readdirSync(EXCEL_DIR).filter(f => f.endsWith('.xlsx')).length
  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log(`  Downloaded: ${downloaded} new files`)
  console.log(`  Skipped:    ${skipped} (already had)`)
  console.log(`  Failed:     ${failed}`)
  console.log(`  Total:      ${totalFiles} Excel files in directory`)
  console.log('═══════════════════════════════════════════')

  if (downloaded === 0 && failed > 0) {
    console.error('\nWarning: No new files downloaded. Check if TSOC is blocking downloads.')
    process.exit(1)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
