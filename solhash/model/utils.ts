/**
 * Shared NPV/IRR helpers for solhash ROI models.
 */

/**
 * NPV: sum of (cf_t / (1 + r)^t) for t = 0..n
 */
export function npv(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + discountRate, t), 0);
}

/**
 * IRR via Newton-Raphson (same pattern as lib/calc/bess-finance).
 * Returns % (e.g. 12.5 for 12.5%). NaN if no convergence or outside sensible range.
 */
export function irr(cashFlows: number[], guess = 0.1, maxIterations = 100, tolerance = 1e-6): number {
  let rate = guess;
  for (let i = 0; i < maxIterations; i++) {
    let npvVal = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const factor = Math.pow(1 + rate, t);
      npvVal += cashFlows[t] / factor;
      if (t > 0) dNpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(npvVal) < tolerance) {
      const pct = rate * 100;
      return pct >= -99 && pct <= 500 ? pct : NaN;
    }
    if (dNpv === 0) return NaN;
    rate = rate - npvVal / dNpv;
    if (rate < -0.99) rate = -0.99;
    if (rate > 5) rate = 5;
    if (isNaN(rate)) return NaN;
  }
  return NaN;
}
