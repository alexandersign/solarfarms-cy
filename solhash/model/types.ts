/**
 * Shared types for solhash ROI models (BTC mining, GPU mining, datacenter GPU).
 */

export interface ParkInput {
  id: string;
  name: string;
  mw: number;
  mwh: number;
  mwhPerYear: number; // MWh available to load per year (from PV yield)
}

export interface SharedROIInputs {
  /** Evaluation horizon (years) */
  years: number;
  /** Discount rate (decimal, e.g. 0.10 = 10%) */
  discountRate: number;
  /** Degradation compensation paid to park owner (€/MWh consumed) */
  degradationEurPerMwh: number;
  /** Annual opex (cooling, maintenance, labour, insurance, moves) in € */
  opexAnnualEur: number;
  /** EUR/USD for revenue in USD */
  eurUsd?: number;
  /** Daytime-only: load runs only when PV produces (no BESS). BTC/GPU unchanged; datacenter revenue × utilizationFactor */
  daytimeOnly?: boolean;
  /** When daytimeOnly: revenue multiplier for datacenter (cloud expects 24/7; batch/spot ~0.5–0.7). BTC/GPU use 1.0 */
  daytimeOnlyDatacenterRevenueFactor?: number;
}

export interface ROIResult {
  npvEur: number;
  irrPct: number;
  cashFlows: number[]; // [capex at t=0, then net cash flow per year]
  totalRevenueEur: number;
  totalDegradationCostEur: number;
  totalOpexEur: number;
  capexEur: number;
  label: string;
  /** Optional: miner/equipment details (e.g. S21 count) */
  meta?: Record<string, unknown>;
}
