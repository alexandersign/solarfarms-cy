"use client";

import { useState, useEffect } from "react";

interface SiteOverview {
  siteId: string;
  name: string;
  state: string;
  activePowerKw: number;
  reactivePowerKvar: number;
  socPercent: number;
  sohPercent: number;
  frequencyHz: number;
  activeAlarms: number;
}

export default function DashboardPage() {
  const [sites, setSites] = useState<SiteOverview[]>([
    {
      siteId: "CY-BESS-001",
      name: "Cyprus BESS Pilot",
      state: "STANDBY",
      activePowerKw: 0,
      reactivePowerKvar: 0,
      socPercent: 72.5,
      sohPercent: 99.2,
      frequencyHz: 50.01,
      activeAlarms: 0,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time fleet overview</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-green">System Online</span>
          <span className="text-xs text-gray-500 font-mono">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Total Sites" value="1" unit="" color="text-white" />
        <MetricCard label="Total Power" value="0.0" unit="MW" color="text-blue-400" />
        <MetricCard label="Avg SOC" value="72.5" unit="%" color="text-green-400" />
        <MetricCard label="Active Alarms" value="0" unit="" color="text-gray-400" />
      </div>

      {/* Site Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Sites</h2>
        {sites.map((site) => (
          <SiteCard key={site.siteId} site={site} />
        ))}
      </div>

      {/* Market Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">Day-Ahead Prices (EUR/MWh)</div>
          <div className="h-48 flex items-center justify-center text-gray-600">
            Price chart will render here
          </div>
        </div>
        <div className="card">
          <div className="card-header">Revenue Today</div>
          <div className="h-48 flex items-center justify-center text-gray-600">
            Revenue breakdown will render here
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="card">
      <div className="card-header">{label}</div>
      <div className={`metric-value ${color}`}>
        {value}
        <span className="metric-unit">{unit}</span>
      </div>
    </div>
  );
}

function SiteCard({ site }: { site: SiteOverview }) {
  const stateColors: Record<string, string> = {
    STANDBY: "badge-gray",
    CHARGING: "badge-blue",
    DISCHARGING: "badge-yellow",
    FAULT: "badge-red",
    IDLE: "badge-gray",
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{site.name}</h3>
            <span className={`badge ${stateColors[site.state] || "badge-gray"}`}>
              {site.state}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{site.siteId}</p>
        </div>
        <div className="text-right">
          {site.activeAlarms > 0 ? (
            <span className="badge badge-red">{site.activeAlarms} alarms</span>
          ) : (
            <span className="badge badge-green">No alarms</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
        <div>
          <div className="text-xs text-gray-500">Active Power</div>
          <div className="text-lg font-mono font-bold text-blue-400">
            {site.activePowerKw.toFixed(1)} <span className="text-xs text-gray-500">kW</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Reactive Power</div>
          <div className="text-lg font-mono font-bold text-purple-400">
            {site.reactivePowerKvar.toFixed(1)} <span className="text-xs text-gray-500">kVAr</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">SOC</div>
          <div className="text-lg font-mono font-bold text-green-400">
            {site.socPercent.toFixed(1)} <span className="text-xs text-gray-500">%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">SOH</div>
          <div className="text-lg font-mono font-bold text-emerald-400">
            {site.sohPercent.toFixed(1)} <span className="text-xs text-gray-500">%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Frequency</div>
          <div className="text-lg font-mono font-bold text-cyan-400">
            {site.frequencyHz.toFixed(2)} <span className="text-xs text-gray-500">Hz</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">SOC Bar</div>
          <div className="mt-1 h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all"
              style={{ width: `${site.socPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
