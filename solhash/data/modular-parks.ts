/**
 * Modular park sizes for full solar-field deployment.
 * Plan: use entire solar fields (1, 2.6, 5, 10 MW) — not small 6-unit deployments.
 * Tracker + bifacial + albedo configuration for maximum yield.
 */

/** Cyprus PV yield: kWh/kWp/year (credible tracker + bifacial baseline for investor diligence) */
export const KWH_PER_KWP_PER_YEAR = 2200;

/** Daytime-only: equivalent full-sun hours per day (Cyprus, with trackers extending morning/evening) */
export const DAYTIME_HOURS_PER_DAY = 8;

/** PV capex: €/kWp (Cyprus utility-scale, tracker + bifacial). */
export const PV_CAPEX_EUR_PER_KWP = 750;

/** Park O&M: €/kW/year (cleaning, inspections — base). Park owner cost. */
export const PARK_OM_EUR_PER_KW_PER_YEAR = 10;

/** Tracker O&M: €/year per site (motor maintenance, alignment, lubrication). */
export const TRACKER_OM_EUR_PER_YEAR = 20_000;

export interface ModularParkSize {
  id: string;
  mwPv: number;
  mwhPerYear: number;
  label: string;
}

/** Standard modular sizes: 1, 2.6, 5, 10 MW parks. MWh/year = MWp × KWH_PER_KWP_PER_YEAR. */
export const MODULAR_PARK_SIZES: ModularParkSize[] = [
  { id: '1mw', mwPv: 1, mwhPerYear: 1 * KWH_PER_KWP_PER_YEAR, label: '1 MW' },
  { id: '2.6mw', mwPv: 2.6, mwhPerYear: 2.6 * KWH_PER_KWP_PER_YEAR, label: '2.6 MW' },
  { id: '5mw', mwPv: 5, mwhPerYear: 5 * KWH_PER_KWP_PER_YEAR, label: '5 MW' },
  { id: '10mw', mwPv: 10, mwhPerYear: 10 * KWH_PER_KWP_PER_YEAR, label: '10 MW' },
];
