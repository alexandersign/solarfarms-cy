"use client";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Historical data analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
          <button className="btn btn-outline">Export</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-header">Energy Charged</div>
          <div className="metric-value text-blue-400">0<span className="metric-unit">MWh</span></div>
        </div>
        <div className="card">
          <div className="card-header">Energy Discharged</div>
          <div className="metric-value text-yellow-400">0<span className="metric-unit">MWh</span></div>
        </div>
        <div className="card">
          <div className="card-header">Round-Trip Efficiency</div>
          <div className="metric-value text-green-400">87.8<span className="metric-unit">%</span></div>
        </div>
        <div className="card">
          <div className="card-header">Revenue</div>
          <div className="metric-value text-emerald-400">0<span className="metric-unit">EUR</span></div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">Power Profile</div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Time-series chart: Active power, reactive power
          </div>
        </div>
        <div className="card">
          <div className="card-header">SOC History</div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Time-series chart: SOC, SOH
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">Revenue by Source</div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Pie/bar chart: Arbitrage, FCR, aFRR, mFRR, OTC
          </div>
        </div>
        <div className="card">
          <div className="card-header">Battery Health Trend</div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Line chart: SOH degradation over time
          </div>
        </div>
      </div>
    </div>
  );
}
