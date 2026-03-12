"use client";

import { useState } from "react";

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "positions" | "history">("overview");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trading</h1>
          <p className="text-sm text-gray-500 mt-1">Market trading desk</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">New Order</button>
          <button className="btn btn-outline">Import</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-800">
        {(["overview", "orders", "positions", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors
              ${activeTab === tab
                ? "text-brand-400 border-b-2 border-brand-400"
                : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="card-header">Total P&L (Today)</div>
              <div className="metric-value text-green-400">+1,250<span className="metric-unit">EUR</span></div>
            </div>
            <div className="card">
              <div className="card-header">Open Positions</div>
              <div className="metric-value text-blue-400">3</div>
            </div>
            <div className="card">
              <div className="card-header">Volume Traded</div>
              <div className="metric-value text-purple-400">12.5<span className="metric-unit">MWh</span></div>
            </div>
            <div className="card">
              <div className="card-header">Avg Price</div>
              <div className="metric-value text-yellow-400">85.20<span className="metric-unit">EUR/MWh</span></div>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <div className="card-header">Day-Ahead Market</div>
              <div className="space-y-3">
                <MarketRow label="Current Price" value="82.50" unit="EUR/MWh" trend="up" />
                <MarketRow label="Avg Today" value="78.30" unit="EUR/MWh" trend="flat" />
                <MarketRow label="Peak Price" value="120.00" unit="EUR/MWh" trend="up" />
                <MarketRow label="Off-Peak" value="45.00" unit="EUR/MWh" trend="down" />
              </div>
            </div>
            <div className="card">
              <div className="card-header">Balancing Market</div>
              <div className="space-y-3">
                <MarketRow label="FCR Price" value="12.50" unit="EUR/MW/h" trend="up" />
                <MarketRow label="aFRR Up" value="95.00" unit="EUR/MWh" trend="flat" />
                <MarketRow label="aFRR Down" value="35.00" unit="EUR/MWh" trend="down" />
                <MarketRow label="mFRR Price" value="110.00" unit="EUR/MWh" trend="up" />
              </div>
            </div>
          </div>

          {/* Revenue by Market */}
          <div className="card">
            <div className="card-header">Revenue by Market (MTD)</div>
            <div className="h-64 flex items-center justify-center text-gray-600">
              Stacked bar chart: DA / ID / FCR / aFRR / mFRR / OTC
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="card">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-800">
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Market</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Direction</th>
                <th className="pb-3 font-medium">Qty (MW)</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-3 font-mono text-xs">14:30:00</td>
                <td>Day-Ahead</td>
                <td>Hour 18</td>
                <td><span className="badge badge-green">Sell</span></td>
                <td className="font-mono">1.25</td>
                <td className="font-mono">95.00</td>
                <td><span className="badge badge-green">Filled</span></td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 font-mono text-xs">14:15:00</td>
                <td>Intraday</td>
                <td>QH 17:15</td>
                <td><span className="badge badge-blue">Buy</span></td>
                <td className="font-mono">0.50</td>
                <td className="font-mono">42.00</td>
                <td><span className="badge badge-yellow">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Positions Tab */}
      {activeTab === "positions" && (
        <div className="card">
          <div className="card-header">Open Positions</div>
          <p className="text-gray-500 mt-4">No open positions to display.</p>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="card">
          <div className="card-header">Trade History</div>
          <p className="text-gray-500 mt-4">Select a date range to view historical trades.</p>
        </div>
      )}
    </div>
  );
}

function MarketRow({
  label,
  value,
  unit,
  trend,
}: {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "flat";
}) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    flat: "text-gray-400",
  };
  const trendIcons = { up: "^", down: "v", flat: "-" };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono font-medium">{value}</span>
        <span className="text-xs text-gray-500">{unit}</span>
        <span className={`text-xs ${trendColors[trend]}`}>{trendIcons[trend]}</span>
      </div>
    </div>
  );
}
