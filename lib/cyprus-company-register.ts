/**
 * Cyprus Dept of Registrar (e-filing) company lookup via Playwright.
 */

export const COMPANY_REGISTER_URL =
  'https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU'

export interface RegisterLookupResult {
  company_name: string
  matched_name: string
  company_reg_no: string
  org_status: string
  org_type: string
  registered_address: string
  directors: string[]
  secretary: string
  register_url: string
}

export function cleanForRegisterSearch(name: string): string {
  return name
    .replace(/\s+(LTD|LIMITED|PLC|PUBLIC|LLC)\.?$/i, '')
    .replace(/\s+(ΛΤΔ|ΛΙΜΙΤΕΔ|ΛΤΔ\.)$/i, '')
    .replace(/&/g, ' ')
    .replace(/[()]/g, '')
    .trim()
}

/** Normalize director name for cross-SPV counting */
export function normalizeDirectorKey(name: string): string {
  return name
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function lookupCompanyRegister(
  page: import('playwright').Page,
  companyName: string
): Promise<RegisterLookupResult | null> {
  const searchName = cleanForRegisterSearch(companyName)

  await page.goto(COMPANY_REGISTER_URL, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1500)

  try {
    await page.fill('#ctl00_cphMyMasterCentral_ucSearch_txtName', searchName, {
      timeout: 5000,
    })
  } catch {
    const inputs = await page.$$('input[type="text"]')
    if (inputs.length === 0) return null
    await inputs[0].fill(searchName)
  }

  await page.waitForTimeout(300)
  await page.click('#ctl00_cphMyMasterCentral_ucSearch_lbtnSearch')
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1500)

  const gridData = await page.evaluate(() => {
    const results: {
      name: string
      regPrefix: string
      regNo: string
      type: string
      status: string
    }[] = []
    const rows = document.querySelectorAll('table[id*="GridView"] tr, table.grid tr')
    rows.forEach((row, idx) => {
      if (idx === 0) return
      const cells = row.querySelectorAll('td')
      if (cells.length >= 6) {
        results.push({
          name: (cells[1] as HTMLElement)?.innerText?.trim() || '',
          regPrefix: (cells[2] as HTMLElement)?.innerText?.trim() || '',
          regNo: (cells[3] as HTMLElement)?.innerText?.trim() || '',
          type: (cells[4] as HTMLElement)?.innerText?.trim() || '',
          status: (cells[6] as HTMLElement)?.innerText?.trim() || '',
        })
      }
    })
    return results
  })

  if (gridData.length === 0) return null

  const searchUpper = companyName.toUpperCase()
  const cleanUpper = cleanForRegisterSearch(companyName).toUpperCase()
  const bestMatch =
    gridData.find((r) => r.name.toUpperCase() === searchUpper) ||
    gridData.find((r) => r.name.toUpperCase().includes(cleanUpper)) ||
    gridData[0]

  const regNo =
    bestMatch.regPrefix && bestMatch.regNo
      ? `${bestMatch.regPrefix} ${bestMatch.regNo}`
      : ''

  let details = { address: '', directors: [] as string[], secretary: '' }

  try {
    const matchIdx = gridData.indexOf(bestMatch)
    await page.evaluate((idx: number) => {
      const fn = (window as { __doPostBack?: (a: string, b: string) => void }).__doPostBack
      if (typeof fn === 'function') {
        fn('ctl00$cphMyMasterCentral$GridView1', `Select$${idx}`)
      }
    }, matchIdx)
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {})
    await page.waitForTimeout(2000)

    details = await page.evaluate(() => {
      const result = { address: '', directors: [] as string[], secretary: '' }
      const grid = document.getElementById('ctl00_cphMyMasterCentral_OfficialsGrid')
      if (grid) {
        grid.querySelectorAll('tr.gridRow, tr.gridAlternateRow').forEach((row) => {
          const cells = row.querySelectorAll('td')
          if (cells.length >= 2) {
            const name = (cells[0] as HTMLElement).innerText.trim()
            const role = (cells[1] as HTMLElement).innerText.trim()
            if (name.length > 2) {
              if (role.toLowerCase() === 'director') result.directors.push(name)
              else if (role.toLowerCase() === 'secretary') result.secretary = name
            }
          }
        })
      }
      const street = document.getElementById('ctl00_cphMyMasterCentral_Street')
      const building = document.getElementById('ctl00_cphMyMasterCentral_Building')
      const parish = document.getElementById('ctl00_cphMyMasterCentral_Parish')
      const territory = document.getElementById('ctl00_cphMyMasterCentral_Teritory')
      const addrParts = [street, building, parish, territory]
        .map((el) => el?.innerText?.trim() || '')
        .filter((s) => s.length > 0)
      if (addrParts.length > 0) {
        result.address = addrParts
          .join(' ')
          .replace(/\s+/g, ' ')
          .replace(/,\s*,/g, ',')
          .trim()
      }
      return result
    })
  } catch {
    /* grid-only data */
  }

  return {
    company_name: companyName,
    matched_name: bestMatch.name,
    company_reg_no: regNo,
    org_status: bestMatch.status,
    org_type: bestMatch.type,
    registered_address: details.address,
    directors: details.directors,
    secretary: details.secretary,
    register_url: COMPANY_REGISTER_URL,
  }
}
