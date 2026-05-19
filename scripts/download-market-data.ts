/**
 * TSOC Cyprus Day-Ahead Market Data Downloader
 * 
 * Downloads Excel files from the TSOC website:
 * https://tsoc.org.cy/competitive-electricity-market/mms-reports/day-ahead-market-daily-activity-reports-en/
 * 
 * Usage:
 *   npx ts-node scripts/download-market-data.ts
 *   npx ts-node scripts/download-market-data.ts --days 30
 *   npx ts-node scripts/download-market-data.ts --all
 * 
 * The script:
 * 1. Scrapes the TSOC reports page for Excel download links
 * 2. Downloads new files to market/excel/
 * 3. Parses all Excel files and generates market/data/market-data.json
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

import {
  TSOC_DAM_REPORTS_URL,
  TSOC_BASE,
  extractExcelLinksFromHtml,
  extractReportDateFromFilename,
} from '../lib/tsoc-market-fetch'

const TSOC_BASE_URL = TSOC_BASE
const TSOC_REPORTS_URL = TSOC_DAM_REPORTS_URL
const EXCEL_DIR = path.join(process.cwd(), 'market', 'excel')
const DATA_DIR = path.join(process.cwd(), 'market', 'data')

// Ensure directories exist
if (!fs.existsSync(EXCEL_DIR)) fs.mkdirSync(EXCEL_DIR, { recursive: true })
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

/**
 * Fetch a URL and return the response body as a string
 */
function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : `${TSOC_BASE_URL}${res.headers.location}`
        fetchUrl(redirectUrl).then(resolve).catch(reject)
        return
      }
      
      let data = ''
      res.on('data', (chunk: string) => data += chunk)
      res.on('end', () => resolve(data))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(30000, () => {
      req.destroy()
      reject(new Error('Request timed out'))
    })
  })
}

/**
 * Download a file from URL to local path
 */
function downloadFile(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,*/*',
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${TSOC_BASE_URL}${res.headers.location}`
        downloadFile(redirectUrl, filePath).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }

      const file = fs.createWriteStream(filePath)
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
      file.on('error', (err) => {
        fs.unlink(filePath, () => {})
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

function extractExcelLinks(html: string): { url: string; filename: string }[] {
  return extractExcelLinksFromHtml(html)
}

/**
 * Parse command line arguments
 */
function parseArgs(): { maxDays: number; all: boolean; parseOnly: boolean } {
  const args = process.argv.slice(2)
  let maxDays = 7 // default: last 7 days
  let all = false
  let parseOnly = false
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--days' && args[i + 1]) {
      maxDays = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--all') {
      all = true
    } else if (args[i] === '--parse-only') {
      parseOnly = true
    }
  }
  
  return { maxDays, all, parseOnly }
}

/**
 * Parse all Excel files in the market/excel directory and generate consolidated JSON
 */
async function parseAllExcelFiles(): Promise<void> {
  // Dynamic import xlsx
  const XLSX = await import('xlsx')
  
  const files = fs.readdirSync(EXCEL_DIR)
    .filter(f => (f.endsWith('.xlsx') || f.endsWith('.xls')) && !f.startsWith('._'))
    .sort()
  
  if (files.length === 0) {
    console.log('No Excel files found in market/excel/')
    return
  }
  
  console.log(`\nParsing ${files.length} Excel files...`)
  
  interface HourlyRecord {
    date: string
    hour: number
    period: string
    price: number // EUR/MWh
    volume: number // MWh
    buyVolume: number
    sellVolume: number
  }
  
  const allRecords: HourlyRecord[] = []
  
  for (const file of files) {
    try {
      const filePath = path.join(EXCEL_DIR, file)
      const workbook = XLSX.readFile(filePath)
      
      // Try to extract date from filename (pattern: YYYYMMDD in filename)
      const dateMatch = file.match(/(\d{8})/)
      const fileDate = dateMatch 
        ? `${dateMatch[1].slice(0, 4)}-${dateMatch[1].slice(4, 6)}-${dateMatch[1].slice(6, 8)}`
        : null
      
      // Process each sheet
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][]
        
        if (data.length < 2) continue
        
        // Find header row - look for common column names
        let headerRowIdx = -1
        let priceColIdx = -1
        let volumeColIdx = -1
        let periodColIdx = -1
        let dateColIdx = -1
        let buyColIdx = -1
        let sellColIdx = -1
        
        for (let i = 0; i < Math.min(data.length, 15); i++) {
          const row = data[i]
          if (!row) continue
          
          for (let j = 0; j < row.length; j++) {
            const cell = String(row[j] || '').toLowerCase().trim()
            
            // Look for price column (MCP, price, clearing price, DAM Price)
            if (cell.includes('price') || cell.includes('mcp') || cell === 'dam price' || 
                cell.includes('clearing') || cell.includes('€/mwh') || cell.includes('eur/mwh')) {
              priceColIdx = j
              headerRowIdx = i
            }
            
            // Look for volume column
            if (cell.includes('volume') || cell.includes('mwh') || cell.includes('quantity') ||
                cell.includes('matched')) {
              if (cell.includes('buy') || cell.includes('demand')) {
                buyColIdx = j
              } else if (cell.includes('sell') || cell.includes('supply')) {
                sellColIdx = j
              } else if (volumeColIdx === -1) {
                volumeColIdx = j
              }
              if (headerRowIdx === -1) headerRowIdx = i
            }
            
            // Look for period/hour column
            if (cell.includes('period') || cell.includes('hour') || cell.includes('mtu') ||
                cell.includes('time') || cell.includes('interval') || cell.includes('market time')) {
              periodColIdx = j
              if (headerRowIdx === -1) headerRowIdx = i
            }
            
            // Look for date column
            if (cell.includes('date') || cell.includes('delivery')) {
              dateColIdx = j
              if (headerRowIdx === -1) headerRowIdx = i
            }
          }
          
          if (priceColIdx >= 0) break
        }
        
        // If we couldn't find a price column, try alternative parsing
        // Some files have a simpler structure with just hours and prices
        if (priceColIdx === -1) {
          // Look for numeric data that looks like prices (typically 20-300 EUR/MWh)
          for (let i = 0; i < Math.min(data.length, 10); i++) {
            const row = data[i]
            if (!row) continue
            for (let j = 0; j < row.length; j++) {
              const val = Number(row[j])
              if (val >= 10 && val <= 500 && i > 0) {
                // This might be a price - check if the column above has a header
                const header = String(data[0]?.[j] || '').toLowerCase()
                if (header.includes('price') || header.includes('€') || header.includes('eur')) {
                  priceColIdx = j
                  headerRowIdx = 0
                  break
                }
              }
            }
            if (priceColIdx >= 0) break
          }
        }
        
        if (headerRowIdx === -1 || priceColIdx === -1) {
          // Last resort: assume first numeric column after period is price
          // Skip this sheet
          continue
        }
        
        // Parse data rows
        for (let i = headerRowIdx + 1; i < data.length; i++) {
          const row = data[i]
          if (!row || row.length === 0) continue
          
          const price = Number(row[priceColIdx])
          if (isNaN(price)) continue
          // Note: price === 0 is valid (solar curtailment events), don't skip
          
          // Extract period/hour
          let hour = 0
          let period = ''
          if (periodColIdx >= 0 && row[periodColIdx] !== undefined) {
            const periodVal = String(row[periodColIdx])
            
            // Parse various period formats, ordered by specificity:
            //
            // Format 1: "DD/MM/YYYY HH:MM-DD/MM/YYYY HH:MM" (TSOC full datetime range)
            //   e.g. "11/02/2026 19:00-11/02/2026 19:30"
            //   → extract the first HH from the time portion (after the date)
            //
            // Format 2: "HH:MM-HH:MM" or "HH:MM" (time only)
            //   e.g. "19:00-19:30" or "19:00"
            //
            // Format 3: "MTU1", "MTU48" (market time unit number, 1-48 half-hours)
            //
            // Format 4: Plain number "1"-"48" (period number)
            
            let parsed = -1
            
            // Try Format 1: full datetime "DD/MM/YYYY HH:MM-..."
            // Look for time pattern after a date pattern
            const fullDateTimeMatch = periodVal.match(/\d{1,2}\/\d{1,2}\/\d{4}\s+(\d{1,2}):\d{2}/)
            if (fullDateTimeMatch) {
              parsed = parseInt(fullDateTimeMatch[1], 10)
              hour = parsed // This is already the hour (0-23), no conversion needed
            }
            
            // Try Format 2: "HH:MM" time pattern (but NOT preceded by a date)
            if (parsed === -1) {
              const timeMatch = periodVal.match(/^(\d{1,2}):\d{2}/)
              if (timeMatch) {
                parsed = parseInt(timeMatch[1], 10)
                hour = parsed
              }
            }
            
            // Try Format 3: "MTU" prefix
            if (parsed === -1) {
              const mtuMatch = periodVal.match(/MTU\s*(\d+)/i)
              if (mtuMatch) {
                const mtuNum = parseInt(mtuMatch[1], 10)
                hour = Math.floor((mtuNum - 1) / 2) // MTU 1-2 = hour 0, MTU 3-4 = hour 1, etc.
                parsed = mtuNum
              }
            }
            
            // Try Format 4: plain number (period index 1-48 or 1-24)
            if (parsed === -1) {
              const numMatch = periodVal.match(/^(\d{1,2})$/)
              if (numMatch) {
                const num = parseInt(numMatch[1], 10)
                if (num > 24) {
                  hour = Math.floor((num - 1) / 2)
                } else if (num >= 1 && num <= 24) {
                  hour = num - 1
                } else {
                  hour = num
                }
                parsed = num
              }
            }
            
            // Fallback: grab first standalone number (not part of a date)
            if (parsed === -1) {
              const fallbackMatch = periodVal.match(/(\d{1,2})/)
              if (fallbackMatch) {
                const num = parseInt(fallbackMatch[1], 10)
                hour = num <= 24 ? (num > 0 ? num - 1 : 0) : Math.floor((num - 1) / 2)
              }
            }
            
            period = periodVal
          } else {
            // Use row index as period
            hour = (i - headerRowIdx - 1) % 24
            period = `${hour}:00`
          }
          
          // Extract date
          let date = fileDate || ''
          if (dateColIdx >= 0 && row[dateColIdx]) {
            const dateVal = row[dateColIdx]
            if (typeof dateVal === 'number') {
              // Excel serial date
              const excelDate = XLSX.SSF.parse_date_code(dateVal)
              date = `${excelDate.y}-${String(excelDate.m).padStart(2, '0')}-${String(excelDate.d).padStart(2, '0')}`
            } else {
              const dateStr = String(dateVal)
              const dMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/)
              if (dMatch) {
                date = `${dMatch[1]}-${dMatch[2]}-${dMatch[3]}`
              }
            }
          }
          
          const volume = volumeColIdx >= 0 ? Number(row[volumeColIdx]) || 0 : 0
          const buyVolume = buyColIdx >= 0 ? Number(row[buyColIdx]) || 0 : 0
          const sellVolume = sellColIdx >= 0 ? Number(row[sellColIdx]) || 0 : 0
          
          allRecords.push({
            date,
            hour: Math.min(Math.max(hour, 0), 23),
            period,
            price,
            volume,
            buyVolume,
            sellVolume,
          })
        }
      }
      
      console.log(`  ✓ Parsed: ${file}`)
    } catch (err) {
      console.error(`  ✗ Error parsing ${file}:`, (err as Error).message)
    }
  }
  
  // Sort by date and hour
  allRecords.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.hour - b.hour
  })
  
  // Generate statistics
  const stats = generateStatistics(allRecords)
  
  // Write consolidated data
  const output = {
    lastUpdated: new Date().toISOString(),
    totalRecords: allRecords.length,
    totalFiles: files.length,
    dateRange: {
      start: allRecords[0]?.date || '',
      end: allRecords[allRecords.length - 1]?.date || '',
    },
    statistics: stats,
    records: allRecords,
  }
  
  const outputPath = path.join(DATA_DIR, 'market-data.json')
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`\n✓ Wrote ${allRecords.length} records to ${outputPath}`)
  console.log(`  Date range: ${output.dateRange.start} to ${output.dateRange.end}`)
  console.log(`  Avg price: €${stats.overall.avgPrice.toFixed(2)}/MWh`)
  console.log(`  Min price: €${stats.overall.minPrice.toFixed(2)}/MWh`)
  console.log(`  Max price: €${stats.overall.maxPrice.toFixed(2)}/MWh`)
}

interface DailyStats {
  date: string
  avgPrice: number
  minPrice: number
  maxPrice: number
  avgVolume: number
  totalVolume: number
  peakHourPrice: number
  offPeakAvgPrice: number
  solarHourAvgPrice: number
}

interface HourlyAvg {
  hour: number
  avgPrice: number
  minPrice: number
  maxPrice: number
  avgVolume: number
  count: number
}

function generateStatistics(records: any[]): any {
  if (records.length === 0) {
    return { overall: { avgPrice: 0, minPrice: 0, maxPrice: 0 }, daily: [], hourlyAvg: [] }
  }
  
  // Overall stats
  const prices = records.map(r => r.price).filter(p => p > 0)
  const overall = {
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    medianPrice: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)],
    totalRecords: records.length,
    // Solar hours (6:00-18:00) average
    solarHoursAvg: (() => {
      const solarPrices = records.filter(r => r.hour >= 6 && r.hour <= 18).map(r => r.price)
      return solarPrices.length > 0 ? solarPrices.reduce((a, b) => a + b, 0) / solarPrices.length : 0
    })(),
    // Peak hours (17:00-21:00) average
    peakHoursAvg: (() => {
      const peakPrices = records.filter(r => r.hour >= 17 && r.hour <= 21).map(r => r.price)
      return peakPrices.length > 0 ? peakPrices.reduce((a, b) => a + b, 0) / peakPrices.length : 0
    })(),
    // Off-peak (22:00-06:00) average
    offPeakAvg: (() => {
      const offPeakPrices = records.filter(r => r.hour >= 22 || r.hour <= 6).map(r => r.price)
      return offPeakPrices.length > 0 ? offPeakPrices.reduce((a, b) => a + b, 0) / offPeakPrices.length : 0
    })(),
    // Spread (peak - solar) = BESS arbitrage opportunity
    arbitrageSpread: 0,
  }
  overall.arbitrageSpread = overall.peakHoursAvg - overall.solarHoursAvg
  
  // Daily stats
  const dailyMap = new Map<string, any[]>()
  for (const r of records) {
    if (!dailyMap.has(r.date)) dailyMap.set(r.date, [])
    dailyMap.get(r.date)!.push(r)
  }
  
  const daily: DailyStats[] = []
  for (const [date, dayRecords] of dailyMap) {
    const dayPrices = dayRecords.map((r: any) => r.price)
    const peakRecords = dayRecords.filter((r: any) => r.hour >= 17 && r.hour <= 21)
    const offPeakRecords = dayRecords.filter((r: any) => r.hour >= 22 || r.hour <= 6)
    const solarRecords = dayRecords.filter((r: any) => r.hour >= 6 && r.hour <= 18)
    
    daily.push({
      date,
      avgPrice: dayPrices.reduce((a: number, b: number) => a + b, 0) / dayPrices.length,
      minPrice: Math.min(...dayPrices),
      maxPrice: Math.max(...dayPrices),
      avgVolume: dayRecords.reduce((a: number, r: any) => a + r.volume, 0) / dayRecords.length,
      totalVolume: dayRecords.reduce((a: number, r: any) => a + r.volume, 0),
      peakHourPrice: peakRecords.length > 0 
        ? peakRecords.reduce((a: number, r: any) => a + r.price, 0) / peakRecords.length : 0,
      offPeakAvgPrice: offPeakRecords.length > 0
        ? offPeakRecords.reduce((a: number, r: any) => a + r.price, 0) / offPeakRecords.length : 0,
      solarHourAvgPrice: solarRecords.length > 0
        ? solarRecords.reduce((a: number, r: any) => a + r.price, 0) / solarRecords.length : 0,
    })
  }
  daily.sort((a, b) => a.date.localeCompare(b.date))
  
  // Hourly averages across all days
  const hourlyMap = new Map<number, number[]>()
  for (const r of records) {
    if (!hourlyMap.has(r.hour)) hourlyMap.set(r.hour, [])
    hourlyMap.get(r.hour)!.push(r.price)
  }
  
  const hourlyAvg: HourlyAvg[] = []
  for (let h = 0; h < 24; h++) {
    const hPrices = hourlyMap.get(h) || []
    if (hPrices.length === 0) {
      hourlyAvg.push({ hour: h, avgPrice: 0, minPrice: 0, maxPrice: 0, avgVolume: 0, count: 0 })
    } else {
      hourlyAvg.push({
        hour: h,
        avgPrice: hPrices.reduce((a, b) => a + b, 0) / hPrices.length,
        minPrice: Math.min(...hPrices),
        maxPrice: Math.max(...hPrices),
        avgVolume: 0, // Would need volume data
        count: hPrices.length,
      })
    }
  }
  
  // Weekly averages
  const weeklyMap = new Map<string, number[]>()
  for (const d of daily) {
    const weekStart = getWeekStart(d.date)
    if (!weeklyMap.has(weekStart)) weeklyMap.set(weekStart, [])
    weeklyMap.get(weekStart)!.push(d.avgPrice)
  }
  
  const weekly = Array.from(weeklyMap.entries()).map(([week, prices]) => ({
    week,
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    count: prices.length,
  })).sort((a, b) => a.week.localeCompare(b.week))
  
  return { overall, daily, hourlyAvg, weekly }
}

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday
  d.setDate(diff)
  return d.toISOString().slice(0, 10)
}

/**
 * Main execution
 */
async function main() {
  const { maxDays, all, parseOnly } = parseArgs()
  
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  TSOC Cyprus Day-Ahead Market Data Downloader          ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log('')
  
  if (parseOnly) {
    console.log('Parse-only mode: skipping download, parsing existing files...')
    await parseAllExcelFiles()
    return
  }
  
  console.log(`Fetching report list from TSOC...`)
  console.log(`URL: ${TSOC_REPORTS_URL}`)
  console.log('')
  
  try {
    const html = await fetchUrl(TSOC_REPORTS_URL)
    const links = extractExcelLinks(html)
    
    if (links.length === 0) {
      console.log('No Excel links found on the page.')
      console.log('The page structure may have changed. Try visiting the URL manually.')
      console.log('')
      console.log('Falling back to parsing existing files...')
      await parseAllExcelFiles()
      return
    }
    
    console.log(`Found ${links.length} Excel files on the page.`)
    
    // Filter by date if not downloading all
    let linksToDownload = links
    if (!all) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - maxDays)
      const cutoffStr = cutoffDate.toISOString().slice(0, 10).replace(/-/g, '')
      
      linksToDownload = links.filter(l => {
        const reportDate = extractReportDateFromFilename(l.filename)
        if (!reportDate) return true // Download files without dates
        return reportDate >= cutoffStr
      })
      
      console.log(`Downloading ${linksToDownload.length} files (last ${maxDays} days)`)
    }
    
    // Download files
    let downloaded = 0
    let skipped = 0
    
    for (const link of linksToDownload) {
      const filePath = path.join(EXCEL_DIR, link.filename)
      
      if (fs.existsSync(filePath)) {
        skipped++
        continue
      }
      
      try {
        console.log(`  ↓ Downloading: ${link.filename}`)
        await downloadFile(link.url, filePath)
        downloaded++
        
        // Small delay between downloads to be respectful
        await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        console.error(`  ✗ Failed: ${link.filename} - ${(err as Error).message}`)
      }
    }
    
    console.log(`\nDownload complete: ${downloaded} new, ${skipped} already existed`)
    
  } catch (err) {
    console.error('Error fetching TSOC page:', (err as Error).message)
    console.log('\nTip: If TSOC is unreachable, you can manually download Excel files')
    console.log('     to market/excel/ and then run: npx ts-node scripts/download-market-data.ts --parse-only')
    console.log('')
  }
  
  // Always parse whatever files we have
  await parseAllExcelFiles()
}

main().catch(console.error)
