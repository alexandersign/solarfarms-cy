/**
 * Modular park sizes for full solar-field deployment.
 * Plan: use entire solar fields (1, 2.6, 5, 10 MW) — not small 6-unit deployments.
 */

/** Cyprus PV yield: kWh/kWp/year */
export const KWH_PER_KWP_PER_YEAR = 1800;

/** Daytime-only: equivalent full-sun hours per day (Cyprus) */
export const DAYTIME_HOURS_PER_DAY = 6;

/** PV capex: €/kWp (Cyprus utility-scale). Use 0 for JV — park built anyway, no PPA loss. */
export const PV_CAPEX_EUR_PER_KWP = 600;

/** Park O&M: €/kW/year (cleaning, inspections). Park owner cost. */
export const PARK_OM_EUR_PER_KW_PER_YEAR = 10;

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
