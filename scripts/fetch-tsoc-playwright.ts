/**
 * TSOC Cyprus Day-Ahead Market Data Fetcher
 *
 * Downloads REP_MO-003 Excel files from TSOC (hosted on S3) into market/excel/.
 *
 * Usage:
 *   npm run market:fetch
 *   npm run market:fetch -- --backfill
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/fetch-tsoc-playwright.ts --index-html market/tsoc-index.html
 *
 * Scrape order (Cloudflare bypass):
 *   1. Direct HTTP (works locally; often blocked on GitHub Actions)
 *   2. ScrapingBee (set SCRAPINGBEE_API_KEY in GitHub secrets — recommended for CI)
 *   3. ZenRows (ZENROWS_API_KEY)
 *   4. Playwright Chromium (last resort)
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  TSOC_DAM_REPORTS_URL,
  OPEN_MARKET_START,
  extractReportDateFromFilename,
  downloadExcelFile,
  scrapeWithHttp,
  scrapeWithScrapingBee,
  scrapeWithZenRows,
  loadLinksFromIndexHtml,
  type ExcelLink,
} from '../lib/tsoc-market-fetch'

const EXCEL_DIR = path.join(process.cwd(), 'market', 'excel')
const DOWNLOAD_DELAY_MS = 1500
const MAX_CLOUDFLARE_WAIT_SECONDS = 30

if (!fs.existsSync(EXCEL_DIR)) fs.mkdirSync(EXCEL_DIR, { recursive: true })

function isCloudflareChallengeTitle(title: string): boolean {
  const lower = title.toLowerCase()
  return (
    lower.includes('just a moment') ||
    lower.includes('checking your browser') ||
    lower.includes('attention required') ||
    lower.includes('cloudflare')
  )
}

async function scrapeWithPlaywright(): Promise<ExcelLink[]> {
  const { chromium } = await import('playwright')

  console.log('Strategy 4: Playwright browser')
  console.log('  Launching Chromium...')

  const proxyUrl = process.env.PROXY_URL
  const launchOptions: Record<string, unknown> = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-dev-shm-usage',
    ],
  }

  if (proxyUrl) {
    console.log(`  Using proxy: ${proxyUrl.replace(/:\/\/.*@/, '://***@')}`)
    launchOptions.proxy = { server: proxyUrl }
  }

  const browser = await chromium.launch(launchOptions)

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      locale: 'en-US',
      timezoneId: 'Europe/Nicosia',
    })

    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    })

    const page = await context.newPage()
    console.log('  Navigating to TSOC...')
    const response = await page.goto(TSOC_DAM_REPORTS_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    console.log(`  HTTP ${response?.status()}`)

    let pageTitle = await page.title()
    if (isCloudflareChallengeTitle(pageTitle)) {
      const maxAttempts = Math.ceil(MAX_CLOUDFLARE_WAIT_SECONDS / 5)
      for (let i = 0; i < maxAttempts; i++) {
        await page.waitForTimeout(5000)
        pageTitle = await page.title()
        if (!isCloudflareChallengeTitle(pageTitle)) break
      }
    }

    await page.waitForTimeout(2000)

    let links = await page.evaluate(() => {
      const results: { url: string; filename: string }[] = []
      document.querySelectorAll('a').forEach((a) => {
        const href = a.href || ''
        if (href.match(/\.xlsx?(\?|$)/i)) {
          const filename = href.split('/').pop()?.split('?')[0] || ''
          if (filename) results.push({ url: href, filename })
        }
      })
      return results
    })

    if (links.length === 0) {
      const html = await page.content()
      const { extractExcelLinksFromHtml } = await import('../lib/tsoc-market-fetch')
      links = extractExcelLinksFromHtml(html)
    }

    const seen = new Set<string>()
    links = links.filter((l) => {
      if (seen.has(l.filename)) return false
      seen.add(l.filename)
      return true
    })

    console.log(`  Found ${links.length} unique Excel links`)
    await browser.close()
    return links
  } catch (err) {
    await browser.close()
    throw err
  }
}

async function resolveExcelLinks(indexHtmlPath?: string): Promise<ExcelLink[]> {
  if (indexHtmlPath) {
    console.log(`Using saved index HTML: ${indexHtmlPath}`)
    return loadLinksFromIndexHtml(indexHtmlPath)
  }

  const strategies: Array<{ name: string; fn: () => Promise<ExcelLink[]> }> = [
    { name: 'HTTP', fn: async () => { console.log('Strategy 1: Direct HTTP'); return scrapeWithHttp() } },
    { name: 'ScrapingBee', fn: async () => { console.log('Strategy 2: ScrapingBee API'); return scrapeWithScrapingBee() } },
    { name: 'ZenRows', fn: async () => { console.log('Strategy 3: ZenRows API'); return scrapeWithZenRows() } },
    { name: 'Playwright', fn: scrapeWithPlaywright },
  ]

  for (const strategy of strategies) {
    try {
      const links = await strategy.fn()
      if (links.length > 0) {
        console.log(`\n✓ ${strategy.name} found ${links.length} Excel links`)
        return links
      }
      console.log(`\n⚠ ${strategy.name} returned 0 links`)
    } catch (err) {
      console.log(`\n⚠ ${strategy.name} failed: ${(err as Error).message}`)
    }
  }

  throw new Error(
    'All scraping strategies failed. Set SCRAPINGBEE_API_KEY in GitHub secrets, or run locally with --index-html after saving the TSOC page.'
  )
}

async function main() {
  const isBackfill = process.argv.includes('--backfill') || process.env.TSOC_BACKFILL === 'true'
  const indexArg = process.argv.find((a) => a.startsWith('--index-html='))
  const indexHtmlPath = indexArg
    ? indexArg.split('=')[1]
    : process.argv.includes('--index-html')
      ? process.argv[process.argv.indexOf('--index-html') + 1]
      : undefined

  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  TSOC Market Data Fetcher (REP_MO-003)                  ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`Mode:     ${isBackfill ? 'BACKFILL (all since Oct 2025)' : 'DAILY (last 7 days)'}`)
  console.log(`Target:   ${TSOC_DAM_REPORTS_URL}`)
  console.log(`Save to:  ${EXCEL_DIR}`)
  console.log(`Existing: ${fs.readdirSync(EXCEL_DIR).filter((f) => f.endsWith('.xlsx')).length} files`)
  console.log('')

  const excelLinks = await resolveExcelLinks(indexHtmlPath)

  const sinceEnv = process.env.TSOC_SINCE?.replace(/-/g, '')
  const cutoff = sinceEnv
    ? sinceEnv
    : isBackfill
      ? OPEN_MARKET_START
      : (() => {
          const d = new Date()
          d.setDate(d.getDate() - 7)
          return d.toISOString().slice(0, 10).replace(/-/g, '')
        })()

  const filtered = excelLinks.filter((l) => {
    const date = extractReportDateFromFilename(l.filename)
    return date && date >= cutoff
  })

  console.log(`\n${filtered.length} files match date filter (since ${cutoff})`)

  let downloaded = 0
  let skipped = 0
  let failed = 0

  for (const link of filtered) {
    const dest = path.join(EXCEL_DIR, link.filename)

    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest)
      if (stats.size > 1000) {
        skipped++
        continue
      }
      fs.unlinkSync(dest)
    }

    try {
      process.stdout.write(`  ↓ ${link.filename}... `)
      await downloadExcelFile(link.url, dest)

      const stats = fs.statSync(dest)
      if (stats.size < 500) {
        const content = fs.readFileSync(dest, 'utf-8').substring(0, 200)
        if (content.includes('<html') || content.includes('<!DOCTYPE')) {
          fs.unlinkSync(dest)
          console.log('BLOCKED (HTML response)')
          failed++
          continue
        }
      }

      console.log(`OK (${(stats.size / 1024).toFixed(0)} KB)`)
      downloaded++
      await new Promise((r) => setTimeout(r, DOWNLOAD_DELAY_MS))
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`)
      failed++
      if (fs.existsSync(dest)) fs.unlinkSync(dest)
    }
  }

  const totalFiles = fs.readdirSync(EXCEL_DIR).filter((f) => f.endsWith('.xlsx')).length
  console.log('')
  console.log('═══════════════════════════════════════════')
  console.log(`  Downloaded: ${downloaded} new files`)
  console.log(`  Skipped:    ${skipped} (already had)`)
  console.log(`  Failed:     ${failed}`)
  console.log(`  Total:      ${totalFiles} Excel files`)
  console.log('═══════════════════════════════════════════')

  if (downloaded === 0 && failed > 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
