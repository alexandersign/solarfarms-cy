/**
 * BTC price scenarios for JV revenue modelling.
 * Includes 2028 halving (block reward 3.125 → 1.5625 BTC).
 */

/** Hash price €44/PH/s/day calibrated at ~€60K BTC */
export const HASH_PRICE_BASE_EUR = 44;
export const HASH_PRICE_CALIBRATION_BTC_EUR = 60_000;

/** Halving ~Apr 2028. Years 1–2 at full, years 3–5 at half. */
export const HALVING_YEARS_PRE = 2.1;
export const HALVING_YEARS_POST = 2.9;

/** Effective revenue multiplier over 5 years: (2.1×1 + 2.9×0.5) / 5 = 0.71 */
export const HALVING_MULTIPLIER_5Y =
  (HALVING_YEARS_PRE * 1 + HALVING_YEARS_POST * 0.5) / 5;

export const BTC_SCENARIOS = {
  low: { btcEur: 60_000, label: '€60K (Low)' },
  base: { btcEur: 100_000, label: '€100K (Base)' },
  high: { btcEur: 200_000, label: '€200K (High)' },
} as const;

/**
 * Revenue multiplier for a given BTC price scenario (5-year, with halving).
 */
export function btcScenarioMultiplier(btcEur: number): number {
  return (
    HALVING_MULTIPLIER_5Y *
    (btcEur / HASH_PRICE_CALIBRATION_BTC_EUR)
  );
}
