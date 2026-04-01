"use client";

export default function AssetsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assets</h1>
          <p className="text-sm text-gray-500 mt-1">Site and device management</p>
        </div>
        <button className="btn btn-primary">Add Site</button>
      </div>

      {/* Site List */}
      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-800">
              <th className="pb-3 font-medium">Site ID</th>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Market</th>
              <th className="pb-3 font-medium">Power</th>
              <th className="pb-3 font-medium">Energy</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50">
              <td className="py-3 font-mono text-xs">CY-BESS-001</td>
              <td>Cyprus BESS Pilot</td>
              <td>Cyprus</td>
              <td className="font-mono">1.25 MW</td>
              <td className="font-mono">5.02 MWh</td>
              <td><span className="badge badge-green">Active</span></td>
              <td>
                <button className="text-xs text-brand-400 hover:text-brand-300">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Device Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">PCS - Kehua BCS1250K</div>
          <div className="space-y-2 mt-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Manufacturer</span><span>Xiamen Kehua Digital Energy</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Model</span><span>BCS1250K-C-HUD</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Rated Power</span><span className="font-mono">1,250 kW</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Protocol</span><span>Modbus TCP</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="badge badge-green">Online</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">BESS - Linyang Power Atlantic</div>
          <div className="space-y-2 mt-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Manufacturer</span><span>Jiangsu Linyang Energy Storage</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Model</span><span>Power Atlantic ME 5.015 MWh</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Cell Type</span><span>LFP (EVE LF314)</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Configuration</span><span className="font-mono">12P416S</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Protocol</span><span>Modbus TCP</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="badge badge-green">Online</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
