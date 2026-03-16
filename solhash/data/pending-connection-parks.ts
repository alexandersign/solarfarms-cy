/**
 * Parks with pending grid connection — for solhash pre-connection utilization.
 * SSOT: lib/portfolio-data.ts (ESP_2028, PARKS). This file re-exports and extends.
 */

import { ESP_2028 } from '../../lib/portfolio-data';

export interface PendingConnectionPark {
  id: string;
  name: string;
  district: string;
  mw: number;
  mwh: number;
  connectionYear: number;
  source: string;
}

/**
 * Esperia Tseri 2028 — 5 parks, 27.5 MW, 87.5 MWh.
 * Per-park data from Group2 Esperia proposal (SSOT: portfolio-data.ts aggregate).
 */
export const ESP_2028_PARKS: PendingConnectionPark[] = [
  { id: 'esp-tseri-1', name: 'Esperia Tseri', district: 'Nicosia', mw: 7, mwh: 20, connectionYear: 2028, source: 'ESP_2028' },
  { id: 'esp-tseri-2a', name: 'Esperia Tseri 2a', district: 'Nicosia', mw: 2.5, mwh: 7.5, connectionYear: 2028, source: 'ESP_2028' },
  { id: 'esp-tseri-2b', name: 'Esperia Tseri 2b', district: 'Nicosia', mw: 7.5, mwh: 25, connectionYear: 2028, source: 'ESP_2028' },
  { id: 'esp-tseri-2c', name: 'Esperia Tseri 2c', district: 'Nicosia', mw: 6, mwh: 20, connectionYear: 2028, source: 'ESP_2028' },
  { id: 'esp-tseri-3', name: 'Esperia Tseri 3', district: 'Nicosia', mw: 4.5, mwh: 15, connectionYear: 2028, source: 'ESP_2028' },
];

/** Default list of parks with pending connection (extend here for other cohorts). */
export const PENDING_CONNECTION_PARKS: PendingConnectionPark[] = [...ESP_2028_PARKS];

/** Aggregate from SSOT — must match ESP_2028 in lib/portfolio-data.ts */
export const PENDING_CONNECTION_SUMMARY = {
  name: ESP_2028.name,
  parks: ESP_2028.parks,
  mw: ESP_2028.mw,
  mwh: ESP_2028.mwh,
  note: ESP_2028.note,
} as const;
