import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Auth check
const DOCS_PASSWORD = 'CyprusBess2026';
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

interface RouteParams {
  params: Promise<{ filename: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // Verify auth
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('docs-auth');
  
  if (authCookie?.value !== AUTH_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  
  // Security: prevent path traversal
  if (decodedFilename.includes('..') || decodedFilename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  // Only allow .html and .md files
  if (!decodedFilename.endsWith('.html') && !decodedFilename.endsWith('.md')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  // Read the file
  const filePath = path.join(process.cwd(), 'docs', 'internal', decodedFilename);
  
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const isHtml = decodedFilename.endsWith('.html');
  
  if (isHtml) {
    // Return raw HTML for proper printing
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } else {
    // Wrap markdown in a simple HTML template for printing
    const htmlWrapper = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${decodedFilename}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; }
    pre { background: #f5f5f5; padding: 20px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; font-size: 14px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${decodedFilename}</h1>
  <pre>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
    
    return new NextResponse(htmlWrapper, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }
}
