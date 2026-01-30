import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ExportPdfButton } from '@/components/docs/ExportPdfButton';
import { PrintStyles } from '@/components/docs/PrintStyles';

// Auth check
const DOCS_PASSWORD = 'CyprusBess2026';
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

interface PageProps {
  params: Promise<{ filename: string }>;
}

export default async function ViewDocumentPage({ params }: PageProps) {
  const { filename } = await params;
  
  // Verify auth
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('docs-auth');
  
  if (authCookie?.value !== AUTH_TOKEN) {
    redirect('/internal-docs/login');
  }

  // Decode and validate filename
  const decodedFilename = decodeURIComponent(filename);
  
  // Security: prevent path traversal
  if (decodedFilename.includes('..') || decodedFilename.includes('/')) {
    notFound();
  }

  // Only allow .html and .md files
  if (!decodedFilename.endsWith('.html') && !decodedFilename.endsWith('.md')) {
    notFound();
  }

  // Read the file
  const filePath = path.join(process.cwd(), 'docs', 'internal', decodedFilename);
  
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    notFound();
  }

  const isHtml = decodedFilename.endsWith('.html');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/internal-docs"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Documents
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{decodedFilename}</span>
            <ExportPdfButton filename={decodedFilename} />
          </div>
        </div>
      </header>

      {/* Document Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isHtml ? (
          // Render HTML document in an iframe for full fidelity
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <iframe
              srcDoc={content}
              className="w-full min-h-screen border-0"
              title={decodedFilename}
              sandbox="allow-same-origin allow-scripts allow-popups"
            />
          </div>
        ) : (
          // Render Markdown as preformatted text (or use a markdown renderer)
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-x-auto">
              {content}
            </pre>
          </div>
        )}
      </main>

      {/* Print styles */}
      <PrintStyles />
    </div>
  );
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  
  return {
    title: `${decodedFilename} — Internal Docs`,
    robots: 'noindex, nofollow',
  };
}
