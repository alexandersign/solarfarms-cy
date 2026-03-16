/**
 * Christos Nicosia 3.3 MW — Park configuration for Solhash studies.
 * 1.7 MWp without connection terms. Bifacial at 1900 kWh/kWp/year.
 */

/** Total park capacity (MWp) */
export const CHRISTOS_NICOSIA_TOTAL_MWP = 3.3;

/** PV capacity without connection terms (MWp) — available for pre-connection mining */
export const CHRISTOS_NICOSIA_PRE_CONNECTION_MWP = 1.7;

/** Bifacial yield: kWh/kWp/year (from Individual_Christos_Nicosia data) */
export const CHRISTOS_NICOSIA_KWH_PER_KWP = 1900;

/** MWh/year for pre-connection area */
export const CHRISTOS_NICOSIA_MWH_PER_YEAR =
  CHRISTOS_NICOSIA_PRE_CONNECTION_MWP * CHRISTOS_NICOSIA_KWH_PER_KWP;

export const CHRISTOS_NICOSIA_PARK = {
  id: 'christos-nicosia-3.3',
  name: 'Christos Nicosia',
  project: 'Christos Nicosia 3.3 MW',
  site: 'Nicosia',
  district: 'Nicosia',
  totalMwp: CHRISTOS_NICOSIA_TOTAL_MWP,
  preConnectionMwp: CHRISTOS_NICOSIA_PRE_CONNECTION_MWP,
  mwhPerYear: CHRISTOS_NICOSIA_MWH_PER_YEAR,
  kwhPerKwpPerYear: CHRISTOS_NICOSIA_KWH_PER_KWP,
  bifacial: true,
  source: 'Individual_Christos_Nicosia',
  date: '2026-03',
} as const;
