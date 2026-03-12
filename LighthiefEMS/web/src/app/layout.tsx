import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridMind",
  description: "Energy Management System - BESS Monitoring, Control & Trading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h1 className="text-xl font-bold text-brand-400">GridMind</h1>
              <p className="text-xs text-gray-500 mt-1">Energy Management System</p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <NavItem href="/dashboard" label="Dashboard" />
              <NavItem href="/scada" label="SCADA HMI" />
              <NavItem href="/trading" label="Trading" />
              <NavItem href="/analytics" label="Analytics" />
              <NavItem href="/assets" label="Assets" />
              <NavItem href="/alarms" label="Alarms" />
              <NavItem href="/maintenance" label="Maintenance" />
              <NavItem href="/settings" label="Settings" />
              <NavItem href="/admin" label="Admin" />
            </nav>
            <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
              v0.1.0
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
    >
      {label}
    </a>
  );
}
