"use client";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-sm text-gray-500 mt-1">System configuration</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <div className="card-header">Control Settings</div>
          <SettingRow label="Control Loop Cycle Time" value="100" unit="ms" />
          <SettingRow label="SOC Low Limit" value="5.0" unit="%" />
          <SettingRow label="SOC High Limit" value="95.0" unit="%" />
          <SettingRow label="Max Ramp Rate" value="250" unit="kW/s" />
          <SettingRow label="Default Mode" value="PQ" unit="" />
        </div>

        <div className="card space-y-4">
          <div className="card-header">Protection Settings</div>
          <SettingRow label="Undervoltage Stage 1" value="0.9" unit="pu / 0.2s" />
          <SettingRow label="Overvoltage Stage 1" value="1.1" unit="pu / 0.2s" />
          <SettingRow label="Underfrequency Stage 1" value="47.0" unit="Hz / 0.2s" />
          <SettingRow label="Overfrequency Stage 1" value="52.0" unit="Hz / 0.2s" />
          <SettingRow label="LFSM-O Activation" value="50.2" unit="Hz" />
        </div>

        <div className="card space-y-4">
          <div className="card-header">SCADA Configuration</div>
          <SettingRow label="IEC 104 Port" value="2404" unit="" />
          <SettingRow label="Common Address" value="1" unit="" />
          <SettingRow label="Point Map" value="eac_point_map.yaml" unit="" />
          <SettingRow label="Status" value="Listening" unit="" />
        </div>

        <div className="card space-y-4">
          <div className="card-header">Cloud Connection</div>
          <SettingRow label="NATS URL" value="nats://cloud.gridmind.com:4222" unit="" />
          <SettingRow label="TLS" value="Enabled" unit="" />
          <SettingRow label="Telemetry Interval" value="1000" unit="ms" />
          <SettingRow label="Status" value="Connected" unit="" />
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-mono">
        {value} <span className="text-gray-600">{unit}</span>
      </span>
    </div>
  );
}
