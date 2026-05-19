/**
 * Shared TSOC Day-Ahead Market (REP_MO-003) fetch helpers.
 * Used by scripts/fetch-tsoc-playwright.ts and scripts/download-market-data.ts
 */

import * as https from 'https'
import * as http from 'http'
import * as fs from 'fs'

export const TSOC_DAM_REPORTS_URL =
  'https://tsoc.org.cy/competitive-electricity-market/mms-reports/day-ahead-market-daily-activity-reports-en/'

export const TSOC_BASE = 'https://tsoc.org.cy'

export const OPEN_MARKET_START = '20251001'

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

export interface ExcelLink {
  url: string
  filename: string
}

/** Delivery date from REP_MO-003-S-en-YYYYMMDD-...xlsx (preferred) or first YYYYMMDD */
export function extractReportDateFromFilename(filename: string): string | null {
  const mo = filename.match(/REP_MO-003-S-en-(\d{8})/i)
  if (mo) return mo[1]
  const any = filename.match(/(\d{8})/)
  return any ? any[1] : null
}

export function extractExcelLinksFromHtml(html: string): ExcelLink[] {
  const links: ExcelLink[] = []
  const regex = /href=["']([^"']*\.xlsx[^"']*)["']/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    let url = match[1]
    if (!url.startsWith('http')) {
      url = `${TSOC_BASE}${url.startsWith('/') ? '' : '/'}${url}`
    }
    const filename = url.split('/').pop()?.split('?')[0] || ''
    if (filename && /\.xlsx?$/i.test(filename)) {
      links.push({ url, filename })
    }
  }

  const seen = new Set<string>()
  return links.filter((l) => {
    if (seen.has(l.filename)) return false
    seen.add(l.filename)
    return true
  })
}

export function fetchHtml(url: string, timeoutMs = 45000): Promise<string> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(
      url,
      {
        headers: {
          'User-Agent': BROWSER_UA,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          Referer: `${TSOC_BASE}/`,
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirect = res.headers.location.startsWith('http')
            ? res.headers.location
            : `${TSOC_BASE}${res.headers.location}`
          fetchHtml(redirect, timeoutMs).then(resolve).catch(reject)
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`))
          return
        }
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => resolve(data))
        res.on('error', reject)
      }
    )
    req.on('error', reject)
    req.setTimeout(timeoutMs, () => {
      req.destroy()
      reject(new Error('Request timed out'))
    })
  })
}

export function downloadExcelFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(
      url,
      {
        headers: {
          'User-Agent': BROWSER_UA,
          Accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/octet-stream,*/*',
          Referer: `${TSOC_BASE}/`,
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : `${TSOC_BASE}${res.headers.location}`
          downloadExcelFile(redirectUrl, dest).then(resolve).catch(reject)
          return
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`))
          return
        }

        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
        file.on('error', (err) => {
          fs.unlink(dest, () => {})
          reject(err)
        })
      }
    )
    req.on('error', reject)
    req.setTimeout(30000, () => {
      req.destroy()
      reject(new Error('Download timed out'))
    })
  })
}

export function isCloudflareChallenge(html: string, title = ''): boolean {
  const lower = `${title} ${html}`.toLowerCase()
  return (
    lower.includes('just a moment') ||
    lower.includes('checking your browser') ||
    lower.includes('attention required') ||
    lower.includes('cf-mitigated') ||
    (lower.includes('cloudflare') && lower.includes('challenge'))
  )
}

export async function scrapeWithHttp(): Promise<ExcelLink[]> {
  const html = await fetchHtml(TSOC_DAM_REPORTS_URL)
  if (isCloudflareChallenge(html)) {
    throw new Error('Cloudflare challenge (HTTP fetch blocked)')
  }
  const links = extractExcelLinksFromHtml(html)
  if (links.length === 0) {
    throw new Error('No Excel links in page HTML')
  }
  return links
}

export async function scrapeWithScrapingBee(): Promise<ExcelLink[]> {
  const apiKey = process.env.SCRAPINGBEE_API_KEY
  if (!apiKey) throw new Error('SCRAPINGBEE_API_KEY not set')

  const apiUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(TSOC_DAM_REPORTS_URL)}&render_js=true&premium_proxy=true&country_code=cy`

  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(90000) })
  if (!response.ok) {
    throw new Error(`ScrapingBee API error: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const links = extractExcelLinksFromHtml(html)
  if (links.length === 0) throw new Error('No Excel links in ScrapingBee response')
  return links
}

export async function scrapeWithZenRows(): Promise<ExcelLink[]> {
  const apiKey = process.env.ZENROWS_API_KEY
  if (!apiKey) throw new Error('ZENROWS_API_KEY not set')

  const apiUrl = `https://api.zenrows.com/v1/?apikey=${apiKey}&url=${encodeURIComponent(TSOC_DAM_REPORTS_URL)}&js_render=true&antibot=true`

  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(90000) })
  if (!response.ok) {
    throw new Error(`ZenRows API error: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const links = extractExcelLinksFromHtml(html)
  if (links.length === 0) throw new Error('No Excel links in ZenRows response')
  return links
}

export function loadLinksFromIndexHtml(filePath: string): ExcelLink[] {
  const html = fs.readFileSync(filePath, 'utf-8')
  const links = extractExcelLinksFromHtml(html)
  if (links.length === 0) throw new Error(`No Excel links in ${filePath}`)
  return links
}
