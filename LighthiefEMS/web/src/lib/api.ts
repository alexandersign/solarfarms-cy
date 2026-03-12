/**
 * GridMind API Client
 *
 * Typed API client for the FastAPI backend.
 */

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

// ─── Sites ───────────────────────────────────────────────────────────────────

export async function getSites(params?: { market?: string; status?: string }) {
  const { data } = await api.get("/sites/", { params });
  return data;
}

export async function getSite(siteId: string) {
  const { data } = await api.get(`/sites/${siteId}`);
  return data;
}

export async function createSite(site: any) {
  const { data } = await api.post("/sites/", site);
  return data;
}

// ─── Telemetry ───────────────────────────────────────────────────────────────

export async function getLatestMeasurement(siteId: string) {
  const { data } = await api.get(`/telemetry/${siteId}/latest`);
  return data;
}

export async function getSiteState(siteId: string) {
  const { data } = await api.get(`/telemetry/${siteId}/state`);
  return data;
}

export async function queryTelemetry(query: {
  site_id: string;
  start_time: string;
  end_time: string;
  resolution?: string;
}) {
  const { data } = await api.post("/telemetry/query", query);
  return data;
}

// ─── Commands ────────────────────────────────────────────────────────────────

export async function sendCommand(
  siteId: string,
  command: {
    active_power_kw?: number;
    reactive_power_kvar?: number;
    mode?: string;
    reason?: string;
  }
) {
  const { data } = await api.post(`/commands/${siteId}`, command);
  return data;
}

export async function getCommands(siteId: string, limit = 50) {
  const { data } = await api.get(`/commands/${siteId}`, { params: { limit } });
  return data;
}

// ─── Alarms ──────────────────────────────────────────────────────────────────

export async function getActiveAlarms(siteId: string) {
  const { data } = await api.get(`/alarms/${siteId}/active`);
  return data;
}

export async function acknowledgeAlarm(alarmId: string, by: string) {
  const { data } = await api.post(`/alarms/${alarmId}/acknowledge`, {
    acknowledged_by: by,
  });
  return data;
}

export async function getAlarmSummary() {
  const { data } = await api.get("/alarms/summary/all");
  return data;
}

// ─── Trading ─────────────────────────────────────────────────────────────────

export async function getTrades(params?: { market?: string; status?: string }) {
  const { data } = await api.get("/trading/trades", { params });
  return data;
}

export async function createTrade(trade: any) {
  const { data } = await api.post("/trading/trades", trade);
  return data;
}

export async function getPortfolioSummary() {
  const { data } = await api.get("/trading/portfolio/summary");
  return data;
}

export async function getOpenPositions() {
  const { data } = await api.get("/trading/positions");
  return data;
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function exportData(
  siteId: string,
  format: "csv" | "json" | "excel",
  startTime: string,
  endTime: string
) {
  const { data } = await api.get(`/reports/${siteId}/export`, {
    params: { format, start_time: startTime, end_time: endTime },
    responseType: format === "excel" ? "blob" : "text",
  });
  return data;
}
