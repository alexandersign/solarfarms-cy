/**
 * TSOC DAM Excel column detection — shared by download script and tests.
 * Fixes false-positive volume detection when "€/MWh" headers match "mwh".
 */

export interface TsocColumnMap {
  headerRowIdx: number
  priceColIdx: number
  periodColIdx: number
  dateColIdx: number
  volumeColIdx: number
  buyColIdx: number
  sellColIdx: number
}

function isPriceHeader(cell: string): boolean {
  return (
    cell.includes('€/mwh') ||
    cell.includes('eur/mwh') ||
    cell.includes('eur / mwh') ||
    cell === 'dam price' ||
    cell.includes('clearing price') ||
    (cell.includes('mcp') && cell.includes('price')) ||
    (cell.includes('price') && !cell.includes('volume'))
  )
}

function isVolumeHeader(cell: string): boolean {
  if (isPriceHeader(cell)) return false
  if (cell.includes('buy') || cell.includes('demand')) return true
  if (cell.includes('sell') || cell.includes('supply')) return true
  if (cell.includes('matched') && (cell.includes('qty') || cell.includes('quantity') || cell.includes('volume'))) return true
  if (cell.includes('cleared') && cell.includes('volume')) return true
  if (cell.includes('traded') && cell.includes('volume')) return true
  if (cell === 'volume' || cell === 'quantity' || cell === 'mwh') return true
  if (cell.includes('volume') && cell.includes('mwh')) return true
  return false
}

function isPeriodHeader(cell: string): boolean {
  return (
    cell.includes('period') ||
    cell.includes('hour') ||
    cell.includes('mtu') ||
    cell.includes('interval') ||
    cell.includes('market time') ||
    (cell.includes('time') && !cell.includes('volume'))
  )
}

/**
 * Scan first rows of a TSOC sheet for column indices.
 */
export function detectTsocColumns(data: unknown[][]): TsocColumnMap {
  const result: TsocColumnMap = {
    headerRowIdx: -1,
    priceColIdx: -1,
    periodColIdx: -1,
    dateColIdx: -1,
    volumeColIdx: -1,
    buyColIdx: -1,
    sellColIdx: -1,
  }

  for (let i = 0; i < Math.min(data.length, 20); i++) {
    const row = data[i]
    if (!row) continue

    for (let j = 0; j < row.length; j++) {
      const cell = String(row[j] ?? '').toLowerCase().trim()
      if (!cell) continue

      if (isPriceHeader(cell) || cell.includes('mcp') || cell === 'price') {
        result.priceColIdx = j
        result.headerRowIdx = i
      }

      if (cell.includes('buy') || (cell.includes('demand') && !cell.includes('price'))) {
        result.buyColIdx = j
        result.headerRowIdx = result.headerRowIdx >= 0 ? result.headerRowIdx : i
      }

      if (cell.includes('sell') || (cell.includes('supply') && !cell.includes('price'))) {
        result.sellColIdx = j
        result.headerRowIdx = result.headerRowIdx >= 0 ? result.headerRowIdx : i
      }

      if (isVolumeHeader(cell) && result.volumeColIdx === -1) {
        result.volumeColIdx = j
        result.headerRowIdx = result.headerRowIdx >= 0 ? result.headerRowIdx : i
      }

      if (isPeriodHeader(cell)) {
        result.periodColIdx = j
        result.headerRowIdx = result.headerRowIdx >= 0 ? result.headerRowIdx : i
      }

      if (cell.includes('date') || cell.includes('delivery day')) {
        result.dateColIdx = j
        result.headerRowIdx = result.headerRowIdx >= 0 ? result.headerRowIdx : i
      }
    }

    if (result.priceColIdx >= 0) break
  }

  // Never use the same column for price and volume
  if (result.volumeColIdx === result.priceColIdx) {
    result.volumeColIdx = -1
  }

  return result
}

/** Typical half-hourly DAM traded volume range for Cyprus (MWh). */
export function looksLikeEnergyVolume(value: number, price: number): boolean {
  if (!Number.isFinite(value) || value <= 0) return false
  // Price and volume accidentally parsed from same column
  if (Math.abs(value - price) < 0.01) return false
  // DAM volumes are usually tens–hundreds of MWh per half-hour, not €/MWh prices
  if (value >= 15 && value <= 2000) return true
  return false
}

export function resolveRecordVolume(
  price: number,
  row: unknown[],
  cols: Pick<TsocColumnMap, 'volumeColIdx' | 'buyColIdx' | 'sellColIdx'>
): { volume: number; buyVolume: number; sellVolume: number } {
  const buyVolume =
    cols.buyColIdx >= 0 ? Number(row[cols.buyColIdx]) || 0 : 0
  const sellVolume =
    cols.sellColIdx >= 0 ? Number(row[cols.sellColIdx]) || 0 : 0

  let volume = 0
  if (buyVolume > 0 && sellVolume > 0) {
    volume = (buyVolume + sellVolume) / 2
  } else if (buyVolume > 0) {
    volume = buyVolume
  } else if (sellVolume > 0) {
    volume = sellVolume
  } else if (cols.volumeColIdx >= 0) {
    const raw = Number(row[cols.volumeColIdx]) || 0
    if (looksLikeEnergyVolume(raw, price)) {
      volume = raw
    }
  }

  return { volume, buyVolume, sellVolume }
}
