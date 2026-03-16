/**
 * Alex Anarita — Park configuration for Solhash studies.
 * East-West, 1 m pitch, 10° tilt. Plot: 700 m².
 */

/** Plot area (m²) */
export const ALEX_ANARITA_PLOT_M2 = 700;

/** Land use: m² per kWp (tight E-W, 1 m pitch, 10°) */
export const ALEX_ANARITA_M2_PER_KWP = 8;

/** PV capacity on 700 m² */
export const ALEX_ANARITA_KWP = Math.floor(ALEX_ANARITA_PLOT_M2 / ALEX_ANARITA_M2_PER_KWP);

/** Effective yield: 80% of south-facing (1800) due to E-W layout */
export const ALEX_ANARITA_KWH_PER_KWP = 1440;

/** MWh/year */
export const ALEX_ANARITA_MWH_PER_YEAR = (ALEX_ANARITA_KWP / 1000) * ALEX_ANARITA_KWH_PER_KWP;

export const ALEX_ANARITA_PARK = {
  id: 'alex-anarita',
  name: 'Alex Anarita',
  project: 'Alex Anarita',
  site: 'Anarita',
  district: 'Paphos',
  plotM2: ALEX_ANARITA_PLOT_M2,
  kwp: ALEX_ANARITA_KWP,
  mwhPerYear: ALEX_ANARITA_MWH_PER_YEAR,
  orientation: 'East-West' as const,
  pitchM: 1,
  tiltDeg: 10,
  kwhPerKwpPerYear: ALEX_ANARITA_KWH_PER_KWP,
  source: 'park-study.md',
  date: '2026-03',
} as const;
