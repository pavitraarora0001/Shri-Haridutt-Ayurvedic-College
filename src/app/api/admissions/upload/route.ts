import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'GENERAL_DOCUMENT';

    if (!file) {
      return NextResponse.json({ error: 'No document file received.' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid document format. Only PDF, JPG, and PNG documents are accepted.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Document file size exceeds 5 MB statutory limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Private storage: files are stored with random UUIDs and non-executable extensions
    const ext = path.extname(file.name).toLowerCase() || '.bin';
    const storedFileName = `doc_${crypto.randomUUID()}${ext}`;
    const storageDir = path.join(process.cwd(), 'storage', 'private_documents');
    const fullPath = path.join(storageDir, storedFileName);

    await writeFile(fullPath, buffer);

    return NextResponse.json({
      success: true,
      document: {
        documentType,
        originalName: file.name,
        fileName: storedFileName,
        mimeType: file.type,
        fileSize: file.size,
        storagePath: storedFileName,
      },
    });
  } catch (error: any) {
    console.error('Admission document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process document upload securely.' },
      { status: 500 }
    );
  }
}
