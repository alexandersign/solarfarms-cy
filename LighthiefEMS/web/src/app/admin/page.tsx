"use client";

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Administration</h1>
      <p className="text-sm text-gray-500 mt-1">User management, RBAC, and system administration</p>

      {/* User Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="card-header">Users</div>
          <button className="btn btn-primary text-sm">Add User</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-800">
              <th className="pb-3 font-medium">Username</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Login</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800/50">
              <td className="py-3">admin</td>
              <td>admin@gridmind.com</td>
              <td><span className="badge badge-blue">Admin</span></td>
              <td><span className="badge badge-green">Active</span></td>
              <td className="text-xs text-gray-500">Just now</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="py-3">operator</td>
              <td>operator@gridmind.com</td>
              <td><span className="badge badge-yellow">Operator</span></td>
              <td><span className="badge badge-green">Active</span></td>
              <td className="text-xs text-gray-500">2h ago</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RBAC Roles */}
      <div className="card">
        <div className="card-header">Role Permissions</div>
        <div className="grid grid-cols-6 gap-2 mt-4 text-xs text-center">
          <div className="font-medium text-gray-400">Permission</div>
          <div className="font-medium text-gray-400">Admin</div>
          <div className="font-medium text-gray-400">Operator</div>
          <div className="font-medium text-gray-400">Trader</div>
          <div className="font-medium text-gray-400">Engineer</div>
          <div className="font-medium text-gray-400">Viewer</div>

          <RoleRow perm="View Dashboard" admin="Y" operator="Y" trader="Y" engineer="Y" viewer="Y" />
          <RoleRow perm="Send Commands" admin="Y" operator="Y" trader="-" engineer="-" viewer="-" />
          <RoleRow perm="Trading" admin="Y" operator="-" trader="Y" engineer="-" viewer="-" />
          <RoleRow perm="Configuration" admin="Y" operator="-" trader="-" engineer="Y" viewer="-" />
          <RoleRow perm="User Management" admin="Y" operator="-" trader="-" engineer="-" viewer="-" />
          <RoleRow perm="Acknowledge Alarms" admin="Y" operator="Y" trader="-" engineer="Y" viewer="-" />
        </div>
      </div>

      {/* Audit Log */}
      <div className="card">
        <div className="card-header">Recent Audit Log</div>
        <div className="mt-4 text-sm text-gray-500">
          Audit log entries will appear here (NIS2 compliance).
        </div>
      </div>
    </div>
  );
}

function RoleRow({
  perm, admin, operator, trader, engineer, viewer
}: {
  perm: string; admin: string; operator: string; trader: string; engineer: string; viewer: string;
}) {
  const cell = (val: string) => (
    <div className={val === "Y" ? "text-green-400" : "text-gray-700"}>{val}</div>
  );
  return (
    <>
      <div className="text-left text-gray-300">{perm}</div>
      {cell(admin)}
      {cell(operator)}
      {cell(trader)}
      {cell(engineer)}
      {cell(viewer)}
    </>
  );
}
