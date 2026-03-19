/**
 * Antminer S21 — containerized BTC mining model for full solar-field deployment.
 * Modular park sizes: 1, 2.6, 5, 10 MW. Mineshop pricing (15% quantity discount).
 */

/** Antminer S21+ — Mineshop (sale + 15% quantity discount) */
export const ANTMINER_S21_PLUS = {
  model: 'Antminer S21+',
  hashrateThs: 216,
  powerWatts: 3560,
  /** €/unit — Mineshop sale + 15% quantity discount */
  priceEur: 2_040,
  source: 'Mineshop.eu',
  date: '2025-03',
} as const;

/** Antminer S21 Pro — Mineshop (sale + 15% quantity discount) */
export const ANTMINER_S21_PRO = {
  model: 'Antminer S21 Pro',
  hashrateThs: 234,
  powerWatts: 3500,
  /** €/unit — Mineshop sale + 15% quantity discount */
  priceEur: 2_380,
  source: 'Mineshop.eu',
  date: '2025-03',
} as const;

/** Default miner for full-field sizing (S21+ best value) */
export const DEFAULT_MINER = ANTMINER_S21_PLUS;

/** Hash price: €/PH/s/day. ~$48/PH/s/day × 0.92 */
export const HASH_PRICE_EUR_PER_PH_PER_DAY = 44;

/** 20ft container — Mineshop: 168 slots, S21-compatible */
export const CONTAINER_20FT = {
  slots: 168,
  priceEur: 21_500,
  source: 'Mineshop.eu',
  date: '2025-03',
} as const;

/** Daytime-only: equivalent full-sun hours per day (Cyprus, with trackers extending morning/evening) */
export const DAYTIME_HOURS_PER_DAY = 8;

/**
 * Derive BTC mining params from S21+ and 20ft containers.
 * Sizes to consume available MWh/year (daytime-only). Full solar-field deployment.
 */
export function deriveBtcParamsFromS21(totalMwhPerYear: number): {
  s21Count: number;
  capexEur: number;
  revenueEurPerMwh: number;
  containerCount: number;
  utilizationPct: number;
} {
  const { hashrateThs, powerWatts, priceEur } = DEFAULT_MINER;
  const powerKw = powerWatts / 1000;

  // MWh/year available → kWh/day. Daytime only: run hoursPerDay.
  const kwhPerDay = (totalMwhPerYear * 1000) / 365;
  const hoursPerDay = DAYTIME_HOURS_PER_DAY;
  const kwNeeded = kwhPerDay / hoursPerDay;

  // S21s needed to consume that power when running
  const s21Count = Math.ceil(kwNeeded / powerKw);
  const actualKw = s21Count * powerKw;

  // Revenue: hashrate × hash price × 365 × (hours running / 24)
  const phPerS21 = hashrateThs / 1000;
  const revenuePerS21PerDay = phPerS21 * HASH_PRICE_EUR_PER_PH_PER_DAY;
  const daytimeFactor = hoursPerDay / 24;
  const revenueEurPerYear = s21Count * revenuePerS21PerDay * 365 * daytimeFactor;
  const revenueEurPerMwh = revenueEurPerYear / totalMwhPerYear;

  // Capex: S21+ units + 20ft containers (168 slots each)
  const containerCount = Math.ceil(s21Count / CONTAINER_20FT.slots);
  const capexEur = s21Count * priceEur + containerCount * CONTAINER_20FT.priceEur;

  const containerKw = containerCount * CONTAINER_20FT.slots * powerKw;
  const utilizationPct = containerKw > 0 ? (actualKw / containerKw) * 100 : 0;

  return {
    s21Count,
    capexEur,
    revenueEurPerMwh,
    containerCount,
    utilizationPct,
  };
}
