import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { LogoutButton } from '@/components/docs/LogoutButton';

// Document categories
const DOCUMENT_CATEGORIES = {
  proposals: {
    title: 'Client Proposals',
    icon: '📄',
    files: [
      'client-proposal-group-epc-jan2026.html',
      'client-proposal-cyprus-bess-jan2026.html',
      'client-faq-guarantees-bonds-jan2026.html',
    ],
  },
  pricing: {
    title: 'Pricing & Commercial',
    icon: '💰',
    files: [
      'client-pricing-13-percent.md',
      'pricing-gap-analysis.md',
      'pricing-verification.md',
      'linyang-quotation-jan2026.md',
      'import-duty-model.md',
    ],
  },
  rfi: {
    title: 'RFI & Technical',
    icon: '📋',
    files: [
      'FINAL_RFI_LINYANG_JAN2026.md',
      'linyang-rfi-tracker.md',
      'group-rfi-tracker.md',
      'pcs-capacity-rfi-linyang-jan2026.html',
      'rfi-performance-guarantees-linyang-jan2026.html',
    ],
  },
  rfp: {
    title: 'RFP & Procurement',
    icon: '📦',
    files: [
      'rfp-electrical-installation-jan2026.html',
      'rfp-protection-testing-jan2026.html',
      'rfp-earthing-grounding-jan2026.html',
      'rfp-remote-trip-ups-jan2026.html',
      'rfp-insurance-car-ear-jan2026.html',
      'rfp-cybersecurity-nis2-jan2026.html',
      'concrete-base-rfp-jan2026.html',
      'rfq-transport-asoulis-jan2026.html',
      'lightning-protection-rfq-dhen.md',
    ],
  },
  technical: {
    title: 'Technical Documentation',
    icon: '⚡',
    files: [
      'scada-ems-rfp-jan2026.html',
      'lightning-protection-diagram-5mw-20mwh.html',
      'civil-works-estimate.md',
      'solarpark-epc.md',
      'solarpark-epc-validation.md',
    ],
  },
  tracking: {
    title: 'Project Tracking',
    icon: '📊',
    files: [
      '_index.md',
      'dino-requirements-tracker.md',
      'guarantee-comparison.md',
    ],
  },
};

function getDocumentTitle(filename: string): string {
  return filename
    .replace(/\.(html|md)$/, '')
    .replace(/-/g, ' ')
    .replace(/jan2026/gi, '(Jan 2026)')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function InternalDocsPage() {
  // Verify auth
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('docs-auth');
  const DOCS_PASSWORD = 'CyprusBess2026';
  const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');
  
  if (authCookie?.value !== AUTH_TOKEN) {
    redirect('/internal-docs/login');
  }

  // Get list of available files
  const docsDir = path.join(process.cwd(), 'docs', 'internal');
  let availableFiles: string[] = [];
  
  try {
    availableFiles = fs.readdirSync(docsDir).filter(
      (f) => (f.endsWith('.html') || f.endsWith('.md')) && !f.startsWith('._')
    );
  } catch {
    // Directory might not exist
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Internal Documents</h1>
              <p className="text-gray-400 text-sm">Lighthief Energy — Confidential</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(DOCUMENT_CATEGORIES).map(([key, category]) => (
            <div key={key} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-lg font-semibold text-white">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.files.map((file) => {
                  const exists = availableFiles.includes(file);
                  return (
                    <li key={file}>
                      {exists ? (
                        <Link
                          href={`/internal-docs/view/${encodeURIComponent(file)}`}
                          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm"
                        >
                          <span className="text-gray-500">
                            {file.endsWith('.html') ? '🌐' : '📝'}
                          </span>
                          {getDocumentTitle(file)}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 text-gray-500 text-sm">
                          <span>❌</span>
                          {getDocumentTitle(file)}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* All Files Section */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">📁 All Available Files ({availableFiles.length})</h2>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {availableFiles.sort().map((file) => (
              <Link
                key={file}
                href={`/internal-docs/view/${encodeURIComponent(file)}`}
                className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors text-sm py-1"
              >
                <span className="text-gray-500">
                  {file.endsWith('.html') ? '🌐' : '📝'}
                </span>
                {file}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-700 py-6">
        <p className="text-center text-gray-500 text-sm">
          🔒 Password Protected — Do not share access credentials
        </p>
      </footer>
    </div>
  );
}
