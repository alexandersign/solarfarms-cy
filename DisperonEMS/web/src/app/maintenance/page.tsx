"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Engineer {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  currentLocationLat: number | null;
  currentLocationLon: number | null;
  locationUpdatedAt: string | null;
  certifications: string[];
  assignedSites: string[];
}

interface WorkOrder {
  id: string;
  siteId: string;
  alarmId: string | null;
  assignedEngineerId: string | null;
  assignedEngineerName: string;
  type: string;
  priority: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  slaDeadline: string | null;
  slaMet: boolean | null;
  acknowledgedAt: string | null;
  arrivedAt: string | null;
  completedAt: string | null;
}

interface Escalation {
  id: string;
  alarmId: string;
  severityLevel: number;
  escalationStep: number;
  engineerId: string | null;
  engineerName: string;
  contactMethod: string;
  contactInitiatedAt: string;
  contactAcknowledgedAt: string | null;
  responseTimeSeconds: number | null;
  slaMet: boolean | null;
  escalatedToNext: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockEngineers: Engineer[] = [
  {
    id: "eng-001",
    name: "Andreas Petrou",
    phone: "+357 99 123456",
    email: "andreas@gridmind.com",
    role: "senior_engineer",
    status: "on_call",
    currentLocationLat: 34.9823,
    currentLocationLon: 33.1456,
    locationUpdatedAt: new Date().toISOString(),
    certifications: ["electrical", "bess", "hv_switching"],
    assignedSites: ["CY-BESS-001"],
  },
  {
    id: "eng-002",
    name: "Maria Christou",
    phone: "+357 99 654321",
    email: "maria@gridmind.com",
    role: "field_engineer",
    status: "available",
    currentLocationLat: 35.1653,
    currentLocationLon: 33.3612,
    locationUpdatedAt: new Date(Date.now() - 300000).toISOString(),
    certifications: ["electrical", "bess"],
    assignedSites: ["CY-BESS-001", "CY-BESS-002"],
  },
  {
    id: "eng-003",
    name: "Nikos Georgiou",
    phone: "+357 99 111222",
    email: "nikos@gridmind.com",
    role: "manager",
    status: "off_duty",
    currentLocationLat: null,
    currentLocationLon: null,
    locationUpdatedAt: null,
    certifications: ["electrical", "bess", "hv_switching", "project_mgmt"],
    assignedSites: ["CY-BESS-001", "CY-BESS-002", "CY-BESS-003"],
  },
];

const mockWorkOrders: WorkOrder[] = [
  {
    id: "wo-001",
    siteId: "CY-BESS-001",
    alarmId: "alm-042",
    assignedEngineerId: "eng-001",
    assignedEngineerName: "Andreas Petrou",
    type: "reactive",
    priority: "critical",
    status: "en_route",
    title: "[L4] PCS communication fault - Modbus timeout",
    description: "PCS lost Modbus TCP communication. Auto-generated from alarm.",
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    slaDeadline: new Date(Date.now() + 600000).toISOString(),
    slaMet: null,
    acknowledgedAt: new Date(Date.now() - 900000).toISOString(),
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: "wo-002",
    siteId: "CY-BESS-001",
    alarmId: null,
    assignedEngineerId: "eng-002",
    assignedEngineerName: "Maria Christou",
    type: "preventive",
    priority: "medium",
    status: "assigned",
    title: "Quarterly coolant system inspection",
    description: "Scheduled Q1 2026 inspection of liquid cooling system. Check coolant level, flow rate, filter condition.",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    slaDeadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    slaMet: null,
    acknowledgedAt: null,
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: "wo-003",
    siteId: "CY-BESS-001",
    alarmId: "alm-039",
    assignedEngineerId: "eng-001",
    assignedEngineerName: "Andreas Petrou",
    type: "reactive",
    priority: "high",
    status: "completed",
    title: "[L3] BMS cell voltage imbalance detected",
    description: "Cell voltage spread exceeded 80mV threshold. Balancing required.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    slaDeadline: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
    slaMet: true,
    acknowledgedAt: new Date(Date.now() - 86400000 * 2 + 300000).toISOString(),
    arrivedAt: new Date(Date.now() - 86400000 * 2 + 2400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2 + 7200000).toISOString(),
  },
];

const mockEscalations: Escalation[] = [
  {
    id: "esc-001",
    alarmId: "alm-042",
    severityLevel: 4,
    escalationStep: 1,
    engineerId: "eng-001",
    engineerName: "Andreas Petrou",
    contactMethod: "call",
    contactInitiatedAt: new Date(Date.now() - 1200000).toISOString(),
    contactAcknowledgedAt: new Date(Date.now() - 900000).toISOString(),
    responseTimeSeconds: 300,
    slaMet: true,
    escalatedToNext: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "engineers" | "work-orders" | "escalations" | "schedules"
  >("dashboard");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart Maintenance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Engineer dispatch, alarm escalation, and maintenance tracking
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">New Work Order</button>
          <button className="btn btn-outline">On-Call Roster</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-800">
        {(
          ["dashboard", "engineers", "work-orders", "escalations", "schedules"] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors
              ${
                activeTab === tab
                  ? "text-brand-400 border-b-2 border-brand-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* ── Dashboard Tab ──────────────────────────────────────────────── */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <KPICard label="Engineers On-Call" value="1" color="text-blue-400" />
            <KPICard label="Active Work Orders" value="1" color="text-yellow-400" />
            <KPICard label="Pending Escalations" value="0" color="text-green-400" />
            <KPICard label="SLA Compliance" value="100%" color="text-emerald-400" />
            <KPICard
              label="Avg Response Time"
              value="5 min"
              color="text-cyan-400"
            />
          </div>

          {/* Active Work Orders + Escalation Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Active Work Orders */}
            <div className="card">
              <div className="card-header">Active Work Orders</div>
              <div className="mt-3 space-y-3">
                {mockWorkOrders
                  .filter((wo) => wo.status !== "completed")
                  .map((wo) => (
                    <WorkOrderCard key={wo.id} wo={wo} />
                  ))}
              </div>
            </div>

            {/* Recent Escalations */}
            <div className="card">
              <div className="card-header">Recent Escalations</div>
              <div className="mt-3 space-y-3">
                {mockEscalations.map((esc) => (
                  <EscalationCard key={esc.id} esc={esc} />
                ))}
                {mockEscalations.length === 0 && (
                  <p className="text-sm text-gray-600">No recent escalations</p>
                )}
              </div>
            </div>
          </div>

          {/* Engineer Overview Map Placeholder */}
          <div className="card">
            <div className="card-header">Engineer Locations</div>
            <div className="h-64 flex items-center justify-center text-gray-600 bg-gray-950 rounded-lg mt-2">
              <div className="text-center">
                <div className="text-sm">Interactive map with engineer GPS locations</div>
                <div className="text-xs text-gray-700 mt-1">
                  Integration: Leaflet / Mapbox with real-time position updates
                </div>
                <div className="mt-4 flex justify-center gap-6">
                  {mockEngineers.filter(e => e.currentLocationLat).map(eng => (
                    <div key={eng.id} className="text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                        eng.status === "on_call" ? "bg-yellow-400" :
                        eng.status === "available" ? "bg-green-400" : "bg-gray-600"
                      }`} />
                      <div className="text-xs text-gray-400">{eng.name}</div>
                      <div className="text-xs text-gray-600">
                        {eng.currentLocationLat?.toFixed(3)}, {eng.currentLocationLon?.toFixed(3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Engineers Tab ──────────────────────────────────────────────── */}
      {activeTab === "engineers" && (
        <div className="space-y-4">
          {mockEngineers.map((eng) => (
            <div key={eng.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{eng.name}</h3>
                    <StatusBadge status={eng.status} />
                    <span className="text-xs text-gray-500 capitalize bg-gray-800 px-2 py-0.5 rounded">
                      {eng.role.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{eng.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono">{eng.phone}</div>
                  {eng.locationUpdatedAt && (
                    <div className="text-xs text-gray-600 mt-1">
                      Location: {timeAgo(eng.locationUpdatedAt)}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">Certifications</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {eng.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded"
                      >
                        {cert.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Assigned Sites</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {eng.assignedSites.map((site) => (
                      <span
                        key={site}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-mono"
                      >
                        {site}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">GPS Coordinates</div>
                  <div className="text-sm font-mono mt-1">
                    {eng.currentLocationLat
                      ? `${eng.currentLocationLat.toFixed(4)}, ${eng.currentLocationLon?.toFixed(4)}`
                      : "N/A"}
                  </div>
                </div>
                <div className="flex gap-2 items-end justify-end">
                  <button className="btn btn-outline text-xs">Call</button>
                  <button className="btn btn-outline text-xs">Message</button>
                  <button className="btn btn-outline text-xs">Track</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Work Orders Tab ───────────────────────────────────────────── */}
      {activeTab === "work-orders" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm">
              <option>All Statuses</option>
              <option>Created</option>
              <option>Assigned</option>
              <option>Acknowledged</option>
              <option>En Route</option>
              <option>On Site</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm">
              <option>All Priorities</option>
              <option>Emergency</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm">
              <option>All Types</option>
              <option>Reactive</option>
              <option>Preventive</option>
              <option>Predictive</option>
              <option>Inspection</option>
            </select>
          </div>

          {/* Work Order List */}
          <div className="card">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-800">
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Engineer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">SLA</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {mockWorkOrders.map((wo) => (
                  <tr key={wo.id} className="border-b border-gray-800/50">
                    <td className="py-3">
                      <PriorityBadge priority={wo.priority} />
                    </td>
                    <td className="py-3">
                      <div className="font-medium text-sm">{wo.title}</div>
                      <div className="text-xs text-gray-500">{wo.siteId}</div>
                    </td>
                    <td className="py-3 capitalize text-xs">{wo.type}</td>
                    <td className="py-3 text-xs">{wo.assignedEngineerName}</td>
                    <td className="py-3">
                      <WorkOrderStatusBadge status={wo.status} />
                    </td>
                    <td className="py-3">
                      <SLAIndicator
                        deadline={wo.slaDeadline}
                        met={wo.slaMet}
                        completedAt={wo.completedAt}
                      />
                    </td>
                    <td className="py-3 text-xs text-gray-500">
                      {timeAgo(wo.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Escalations Tab ───────────────────────────────────────────── */}
      {activeTab === "escalations" && (
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">Escalation History</div>
            <table className="w-full text-sm mt-3">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-800">
                  <th className="pb-3 font-medium">Level</th>
                  <th className="pb-3 font-medium">Alarm</th>
                  <th className="pb-3 font-medium">Step</th>
                  <th className="pb-3 font-medium">Engineer</th>
                  <th className="pb-3 font-medium">Contact</th>
                  <th className="pb-3 font-medium">Response</th>
                  <th className="pb-3 font-medium">SLA</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {mockEscalations.map((esc) => (
                  <tr key={esc.id} className="border-b border-gray-800/50">
                    <td className="py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          esc.severityLevel >= 4
                            ? "bg-red-900/30 text-red-300"
                            : esc.severityLevel === 3
                            ? "bg-orange-900/30 text-orange-300"
                            : "bg-yellow-900/30 text-yellow-300"
                        }`}
                      >
                        L{esc.severityLevel}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-xs">{esc.alarmId}</td>
                    <td className="py-3 text-center">{esc.escalationStep}</td>
                    <td className="py-3 text-xs">{esc.engineerName}</td>
                    <td className="py-3 text-xs capitalize">{esc.contactMethod}</td>
                    <td className="py-3 text-xs font-mono">
                      {esc.responseTimeSeconds
                        ? `${Math.floor(esc.responseTimeSeconds / 60)}m ${esc.responseTimeSeconds % 60}s`
                        : "Pending..."}
                    </td>
                    <td className="py-3">
                      {esc.slaMet === null ? (
                        <span className="text-xs text-gray-500">-</span>
                      ) : esc.slaMet ? (
                        <span className="text-xs text-green-400">Met</span>
                      ) : (
                        <span className="text-xs text-red-400">Missed</span>
                      )}
                    </td>
                    <td className="py-3">
                      {esc.contactAcknowledgedAt ? (
                        <span className="badge badge-green">Confirmed</span>
                      ) : esc.escalatedToNext ? (
                        <span className="badge badge-red">Escalated</span>
                      ) : (
                        <span className="badge badge-yellow">Awaiting</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Escalation Flow Diagram */}
          <div className="card">
            <div className="card-header">Escalation Policy</div>
            <div className="mt-3 grid grid-cols-5 gap-3 text-center text-xs">
              <EscalationLevelCard
                level="L1"
                name="INFO"
                sla="None"
                action="Dashboard only"
                color="bg-blue-900/20 border-blue-800"
              />
              <EscalationLevelCard
                level="L2"
                name="WARNING"
                sla="4 hours"
                action="Push notification"
                color="bg-yellow-900/20 border-yellow-800"
              />
              <EscalationLevelCard
                level="L3"
                name="ALARM"
                sla="1 hour"
                action="Auto-call on-call"
                color="bg-orange-900/20 border-orange-800"
              />
              <EscalationLevelCard
                level="L4"
                name="CRITICAL"
                sla="15 min"
                action="Call primary + backup"
                color="bg-red-900/20 border-red-800"
              />
              <EscalationLevelCard
                level="L5"
                name="EMERGENCY"
                sla="Immediate"
                action="Call all + manager + DSO"
                color="bg-red-900/40 border-red-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Schedules Tab ─────────────────────────────────────────────── */}
      {activeTab === "schedules" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <div className="card-header">Upcoming Scheduled Maintenance</div>
              <div className="space-y-3 mt-3">
                <ScheduleItem
                  title="Quarterly coolant inspection"
                  site="CY-BESS-001"
                  dueDate="2026-03-15"
                  type="preventive"
                  engineer="Maria Christou"
                  hours={4}
                />
                <ScheduleItem
                  title="Annual HV switching test"
                  site="CY-BESS-001"
                  dueDate="2026-04-01"
                  type="inspection"
                  engineer="Andreas Petrou"
                  hours={8}
                />
                <ScheduleItem
                  title="BMS firmware update"
                  site="CY-BESS-001"
                  dueDate="2026-03-20"
                  type="preventive"
                  engineer="Maria Christou"
                  hours={2}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">Predictive Maintenance Alerts</div>
              <div className="space-y-3 mt-3">
                <PredictiveAlert
                  title="Cell voltage imbalance trend detected"
                  source="BSM Analytics"
                  confidence={85}
                  recommendation="Schedule balancing service within 2 weeks"
                />
                <PredictiveAlert
                  title="Cooling efficiency declining"
                  source="Thermal Model"
                  confidence={72}
                  recommendation="Inspect coolant filters at next scheduled visit"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="card">
      <div className="card-header">{label}</div>
      <div className={`metric-value ${color}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available: "badge-green",
    on_call: "badge-yellow",
    busy: "badge-red",
    off_duty: "badge-gray",
    on_leave: "badge-gray",
  };
  return (
    <span className={`badge ${styles[status] || "badge-gray"}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    emergency: "bg-red-600/20 text-red-300 border border-red-600/40",
    critical: "bg-red-900/30 text-red-300",
    high: "bg-orange-900/30 text-orange-300",
    medium: "bg-yellow-900/30 text-yellow-300",
    low: "bg-gray-800 text-gray-400",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${styles[priority] || ""}`}>
      {priority.toUpperCase()}
    </span>
  );
}

function WorkOrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    created: "badge-gray",
    assigned: "badge-blue",
    acknowledged: "badge-blue",
    en_route: "badge-yellow",
    on_site: "badge-yellow",
    in_progress: "badge-yellow",
    completed: "badge-green",
    cancelled: "badge-red",
  };
  return (
    <span className={`badge ${styles[status] || "badge-gray"}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}

function SLAIndicator({
  deadline,
  met,
  completedAt,
}: {
  deadline: string | null;
  met: boolean | null;
  completedAt: string | null;
}) {
  if (!deadline) return <span className="text-xs text-gray-600">N/A</span>;

  if (met === true) {
    return <span className="text-xs text-green-400 font-medium">SLA Met</span>;
  }
  if (met === false) {
    return <span className="text-xs text-red-400 font-medium">SLA Missed</span>;
  }

  const remaining = new Date(deadline).getTime() - Date.now();
  if (remaining < 0) {
    return <span className="text-xs text-red-400 font-medium animate-pulse">OVERDUE</span>;
  }
  const mins = Math.floor(remaining / 60000);
  const color = mins < 15 ? "text-red-400" : mins < 60 ? "text-yellow-400" : "text-green-400";
  return (
    <span className={`text-xs font-mono ${color}`}>
      {mins < 60 ? `${mins}m left` : `${Math.floor(mins / 60)}h ${mins % 60}m`}
    </span>
  );
}

function WorkOrderCard({ wo }: { wo: WorkOrder }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={wo.priority} />
          <span className="text-sm font-medium">{wo.title}</span>
        </div>
        <WorkOrderStatusBadge status={wo.status} />
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <span>Engineer: {wo.assignedEngineerName}</span>
        <span>Site: {wo.siteId}</span>
        <SLAIndicator deadline={wo.slaDeadline} met={wo.slaMet} completedAt={wo.completedAt} />
      </div>
      {/* Status timeline */}
      <div className="flex items-center gap-1 mt-3">
        <TimelineStep done={true} label="Created" />
        <TimelineConnector done={!!wo.acknowledgedAt} />
        <TimelineStep done={!!wo.acknowledgedAt} label="Ack'd" />
        <TimelineConnector done={wo.status === "en_route" || !!wo.arrivedAt} />
        <TimelineStep done={wo.status === "en_route" || !!wo.arrivedAt} label="En Route" active={wo.status === "en_route"} />
        <TimelineConnector done={!!wo.arrivedAt} />
        <TimelineStep done={!!wo.arrivedAt} label="On Site" />
        <TimelineConnector done={!!wo.completedAt} />
        <TimelineStep done={!!wo.completedAt} label="Done" />
      </div>
    </div>
  );
}

function TimelineStep({
  done,
  label,
  active,
}: {
  done: boolean;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={`w-3 h-3 rounded-full mx-auto ${
          active
            ? "bg-yellow-400 animate-pulse"
            : done
            ? "bg-green-400"
            : "bg-gray-700"
        }`}
      />
      <div className="text-[10px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function TimelineConnector({ done }: { done: boolean }) {
  return (
    <div
      className={`flex-1 h-0.5 mt-[-10px] ${done ? "bg-green-600" : "bg-gray-700"}`}
    />
  );
}

function EscalationCard({ esc }: { esc: Escalation }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              esc.severityLevel >= 4
                ? "bg-red-900/30 text-red-300"
                : "bg-orange-900/30 text-orange-300"
            }`}
          >
            L{esc.severityLevel}
          </span>
          <span className="text-sm">{esc.engineerName}</span>
          <span className="text-xs text-gray-500">via {esc.contactMethod}</span>
        </div>
        {esc.contactAcknowledgedAt ? (
          <span className="badge badge-green">Confirmed</span>
        ) : (
          <span className="badge badge-yellow animate-pulse">Awaiting Response</span>
        )}
      </div>
      {esc.responseTimeSeconds && (
        <div className="text-xs text-gray-500 mt-1">
          Response: {Math.floor(esc.responseTimeSeconds / 60)}m{" "}
          {esc.responseTimeSeconds % 60}s
          {esc.slaMet && <span className="text-green-400 ml-2">SLA Met</span>}
        </div>
      )}
    </div>
  );
}

function EscalationLevelCard({
  level,
  name,
  sla,
  action,
  color,
}: {
  level: string;
  name: string;
  sla: string;
  action: string;
  color: string;
}) {
  return (
    <div className={`border rounded-lg p-3 ${color}`}>
      <div className="text-lg font-bold">{level}</div>
      <div className="text-xs font-medium mt-1">{name}</div>
      <div className="text-xs text-gray-400 mt-2">SLA: {sla}</div>
      <div className="text-xs text-gray-400">{action}</div>
    </div>
  );
}

function ScheduleItem({
  title,
  site,
  dueDate,
  type,
  engineer,
  hours,
}: {
  title: string;
  site: string;
  dueDate: string;
  type: string;
  engineer: string;
  hours: number;
}) {
  const daysUntil = Math.ceil(
    (new Date(dueDate).getTime() - Date.now()) / 86400000
  );
  const urgency =
    daysUntil < 7
      ? "border-l-yellow-400"
      : daysUntil < 30
      ? "border-l-blue-400"
      : "border-l-gray-600";

  return (
    <div className={`bg-gray-900 border-l-4 ${urgency} rounded-r-lg p-3`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{site}</span>
            <span className="capitalize">{type}</span>
            <span>{engineer}</span>
            <span>{hours}h est.</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-mono">{dueDate}</div>
          <div
            className={`text-xs ${
              daysUntil < 7 ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            {daysUntil} days
          </div>
        </div>
      </div>
    </div>
  );
}

function PredictiveAlert({
  title,
  source,
  confidence,
  recommendation,
}: {
  title: string;
  source: string;
  confidence: number;
  recommendation: string;
}) {
  return (
    <div className="bg-gray-900 border-l-4 border-l-purple-500 rounded-r-lg p-3">
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium">{title}</div>
        <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded">
          {confidence}% conf.
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">Source: {source}</div>
      <div className="text-xs text-purple-300 mt-2">{recommendation}</div>
    </div>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function timeAgo(isoString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(isoString).getTime()) / 1000
  );
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
