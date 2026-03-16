/**
 * BTC mining ROI for solhash pre-connection utilization.
 * Revenue from mining; costs: degradation (park owner), opex, capex.
 */

import type { ParkInput, SharedROIInputs, ROIResult } from './types';
import { npv, irr } from './utils';

export interface BTCMiningInputs {
  /** Revenue per MWh consumed (€/MWh) — from hash price × efficiency */
  revenueEurPerMwh: number;
  /** Total capex (containers + ASICs, etc.) in € */
  capexEur: number;
  /** Year 0: capex; no revenue in year 0 if commissioning in year 1 */
  revenueStartsYear?: number;
  /** Optional metadata (e.g. s21Count, containerCount) for display */
  meta?: Record<string, unknown>;
  /** Override label (e.g. "BTC mining (S21)") */
  label?: string;
}

/**
 * Single run: aggregate MWh/year across parks; one capex; annual revenue − degradation − opex.
 */
export function runBtcMiningROI(
  parks: ParkInput[],
  shared: SharedROIInputs,
  btc: BTCMiningInputs
): ROIResult {
  const totalMwhPerYear = parks.reduce((s, p) => s + p.mwhPerYear, 0);
  const degradationEurPerYear = totalMwhPerYear * shared.degradationEurPerMwh;
  const revenueEurPerYear = totalMwhPerYear * btc.revenueEurPerMwh;
  const startYear = btc.revenueStartsYear ?? 1;

  const cashFlows: number[] = [];
  cashFlows[0] = -btc.capexEur;
  let totalRevenue = 0;
  let totalDegradation = 0;
  let totalOpex = 0;

  for (let y = 1; y <= shared.years; y++) {
    const rev = y >= startYear ? revenueEurPerYear : 0;
    const deg = y >= startYear ? degradationEurPerYear : 0;
    const op = shared.opexAnnualEur;
    const net = rev - deg - op;
    cashFlows.push(net);
    totalRevenue += rev;
    totalDegradation += deg;
    totalOpex += op;
  }

  return {
    npvEur: npv(cashFlows, shared.discountRate),
    irrPct: irr(cashFlows),
    cashFlows,
    totalRevenueEur: totalRevenue,
    totalDegradationCostEur: totalDegradation,
    totalOpexEur: totalOpex,
    capexEur: btc.capexEur,
    label: btc.label ?? 'BTC mining',
    meta: btc.meta,
  };
}
