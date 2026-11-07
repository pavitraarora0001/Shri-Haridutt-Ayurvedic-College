import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { validateUploadedFile } from '@/lib/file-validator';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'GENERAL_DOCUMENT';

    if (!file) {
      return NextResponse.json({ error: 'No document file received.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cryptographic Magic Byte Signature Verification
    const validation = validateUploadedFile(buffer, file.name, file.type, MAX_FILE_SIZE);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Private isolated storage: files are stored with random UUIDs and strictly verified extensions
    const safeExt = validation.safeExtension || '.bin';
    const storedFileName = `doc_${crypto.randomUUID()}${safeExt}`;
    const storageDir = path.join(process.cwd(), 'storage', 'private_documents');
    const fullPath = path.join(storageDir, storedFileName);

    await writeFile(fullPath, buffer);

    return NextResponse.json({
      success: true,
      document: {
        documentType,
        originalName: file.name,
        fileName: storedFileName,
        mimeType: validation.detectedType || file.type,
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
