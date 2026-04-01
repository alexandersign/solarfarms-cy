"use client";

import { useState } from "react";

export default function ScadaPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SCADA HMI</h1>
          <p className="text-sm text-gray-500 mt-1">Single-line diagram and live values</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-green">IEC 104 Connected</span>
          <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
            <option>CY-BESS-001</option>
          </select>
        </div>
      </div>

      {/* Single Line Diagram */}
      <div className="card">
        <div className="card-header">Single Line Diagram</div>
        <div className="relative bg-gray-950 rounded-lg p-8 min-h-[400px]">
          {/* Grid Connection */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 inline-block">
              <div className="text-xs text-gray-400">Grid (EAC)</div>
              <div className="text-sm font-bold text-cyan-400">11 kV</div>
            </div>
          </div>

          {/* Transformer */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2">
            <div className="w-px h-8 bg-cyan-600 mx-auto" />
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400">Transformer</div>
              <div className="text-sm font-bold">10 MVA</div>
              <div className="text-xs text-gray-500">0.69/35 kV</div>
            </div>
            <div className="w-px h-8 bg-yellow-600 mx-auto" />
          </div>

          {/* PCS */}
          <div className="absolute top-56 left-1/3 -translate-x-1/2">
            <div className="bg-gray-800 border border-blue-700/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400">Kehua PCS</div>
              <div className="text-lg font-mono font-bold text-blue-400">0.0 kW</div>
              <div className="text-xs text-gray-500">0.0 kVAr</div>
              <div className="mt-2">
                <span className="badge badge-gray">STANDBY</span>
              </div>
            </div>
          </div>

          {/* Battery */}
          <div className="absolute top-56 right-1/3 translate-x-1/2">
            <div className="bg-gray-800 border border-green-700/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400">Linyang BESS</div>
              <div className="text-lg font-mono font-bold text-green-400">72.5%</div>
              <div className="text-xs text-gray-500">SOH: 99.2%</div>
              <div className="mt-2 h-3 bg-gray-700 rounded-full w-24 mx-auto">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "72.5%" }} />
              </div>
            </div>
          </div>

          {/* Measurements Panel */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-6 gap-3">
              <MeasurementCell label="P" value="0.0" unit="kW" color="text-blue-400" />
              <MeasurementCell label="Q" value="0.0" unit="kVAr" color="text-purple-400" />
              <MeasurementCell label="V_ac" value="690" unit="V" color="text-yellow-400" />
              <MeasurementCell label="I_ac" value="0.0" unit="A" color="text-orange-400" />
              <MeasurementCell label="f" value="50.01" unit="Hz" color="text-cyan-400" />
              <MeasurementCell label="PF" value="1.00" unit="" color="text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">Setpoint Control</div>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs text-gray-400">Active Power (kW)</label>
              <div className="flex gap-2 mt-1">
                <input type="number" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm font-mono" placeholder="0.0" />
                <button className="btn btn-primary">Set</button>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">Reactive Power (kVAr)</label>
              <div className="flex gap-2 mt-1">
                <input type="number" className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm font-mono" placeholder="0.0" />
                <button className="btn btn-primary">Set</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">DSO Discrete Commands</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="btn btn-outline">Level 1 (100%)</button>
            <button className="btn btn-outline">Level 2 (60%)</button>
            <button className="btn btn-outline">Level 3 (30%)</button>
            <button className="btn btn-danger">Level 4 (0%)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeasurementCell({
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
    <div className="bg-gray-900 border border-gray-800 rounded p-2 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-sm font-mono font-bold ${color}`}>
        {value} <span className="text-xs text-gray-600">{unit}</span>
      </div>
    </div>
  );
}
