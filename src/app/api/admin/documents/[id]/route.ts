import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied. Administrative privilege required.' }, { status: 403 });
    }

    const { id } = await params;
    const document = await prisma.applicationDocument.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document record not found in registry.' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'storage', 'private_documents', document.storagePath);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': document.mimeType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${encodeURIComponent(document.originalName)}"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Document stream error:', error);
    return NextResponse.json(
      { error: 'Document cannot be retrieved or file is missing on storage volume.' },
      { status: 500 }
    );
  }
}
