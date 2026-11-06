import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileParam = searchParams.get('file');
    const nameParam = searchParams.get('name') || searchParams.get('filename') || 'document';

    if (!fileParam) {
      return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
    }

    // Strip leading slashes/backslashes and eliminate traversal
    const cleanRelative = fileParam
      .replace(/^[/\\]+/, '')
      .replace(/\.\.[/\\]/g, '')
      .replace(/\\/g, '/');

    // Must be inside public/documents/
    const publicDir = path.resolve(process.cwd(), 'public');
    const fullPath = path.resolve(publicDir, cleanRelative);
    const allowedPrefix = path.resolve(publicDir, 'documents');

    if (!fullPath.startsWith(allowedPrefix) || !fullPath.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Unauthorized file access' }, { status: 403 });
    }

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(fullPath);

    // Sanitize downloaded filename
    const cleanFilename = nameParam
      .replace(/[^a-zA-Z0-9-_\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);

    const finalFilename = cleanFilename.toLowerCase().endsWith('.pdf')
      ? cleanFilename
      : `${cleanFilename || 'document'}.pdf`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${finalFilename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json({ error: 'Internal server error processing download' }, { status: 500 });
  }
}
