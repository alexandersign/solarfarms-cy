"use client";

import { useState } from "react";

interface AlarmEntry {
  id: string;
  timestamp: string;
  severity: string;
  state: string;
  source: string;
  code: number;
  message: string;
  siteId: string;
}

export default function AlarmsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "acknowledged">("active");

  const alarms: AlarmEntry[] = [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      severity: "warning",
      state: "active",
      source: "BMS",
      code: 13,
      message: "SOC low warning - charge recommended",
      siteId: "CY-BESS-001",
    },
  ];

  const severityStyles: Record<string, string> = {
    info: "border-l-blue-400 bg-blue-500/5",
    warning: "border-l-yellow-400 bg-yellow-500/5",
    alarm: "border-l-orange-400 bg-orange-500/5",
    critical: "border-l-red-400 bg-red-500/5",
    emergency: "border-l-red-600 bg-red-600/10",
  };

  const severityBadge: Record<string, string> = {
    info: "badge-blue",
    warning: "badge-yellow",
    alarm: "badge-yellow",
    critical: "badge-red",
    emergency: "badge-red",
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alarms</h1>
          <p className="text-sm text-gray-500 mt-1">System alarm console</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setFilter("all")}>All</button>
          <button className="btn btn-outline" onClick={() => setFilter("active")}>Active</button>
          <button className="btn btn-outline" onClick={() => setFilter("acknowledged")}>Acknowledged</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card"><div className="card-header">Emergency</div><div className="metric-value text-red-500">0</div></div>
        <div className="card"><div className="card-header">Critical</div><div className="metric-value text-red-400">0</div></div>
        <div className="card"><div className="card-header">Alarm</div><div className="metric-value text-orange-400">0</div></div>
        <div className="card"><div className="card-header">Warning</div><div className="metric-value text-yellow-400">1</div></div>
        <div className="card"><div className="card-header">Info</div><div className="metric-value text-blue-400">0</div></div>
      </div>

      {/* Alarm List */}
      <div className="space-y-2">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`card border-l-4 ${severityStyles[alarm.severity]} flex items-start justify-between`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`badge ${severityBadge[alarm.severity]}`}>
                  {alarm.severity.toUpperCase()}
                </span>
                <span className="text-sm font-medium">{alarm.message}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>Source: {alarm.source}</span>
                <span>Code: {alarm.code}</span>
                <span>Site: {alarm.siteId}</span>
                <span>{new Date(alarm.timestamp).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline text-xs">Acknowledge</button>
              <button className="btn btn-outline text-xs">Clear</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
