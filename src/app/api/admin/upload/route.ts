import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import crypto from 'crypto';
import { validateUploadedFile } from '@/lib/file-validator';
import { uploadMedia, deleteMedia } from '@/lib/storage';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB for high-res photos and documents

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const formData = await req.formData();

    // Support both multiple files ('files') or single file ('file')
    const rawFiles = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;
    const filesToProcess = rawFiles.length > 0 ? rawFiles : singleFile ? [singleFile] : [];

    if (filesToProcess.length === 0) {
      return NextResponse.json({ error: 'No files provided in upload payload.' }, { status: 400 });
    }

    const uploadedResults = [];

    for (const file of filesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Cryptographic Magic Byte Signature Verification
      const validation = validateUploadedFile(buffer, file.name, file.type, MAX_FILE_SIZE);
      if (!validation.valid) {
        return NextResponse.json({ error: `File "${file.name}": ${validation.error}` }, { status: 400 });
      }

      // Generate guaranteed-safe unique filename
      const safeExt = validation.safeExtension || '.jpg';
      const uniqueName = `media_${Date.now()}_${crypto.randomBytes(6).toString('hex')}${safeExt}`;
      const contentType = validation.detectedType || file.type || 'application/octet-stream';

      // Upload to persistent storage (Vercel Blob / dev fallback)
      const storageResult = await uploadMedia(buffer, uniqueName, contentType);

      // Persist in UploadedFile database model
      await prisma.uploadedFile.create({
        data: {
          originalName: file.name,
          fileName: uniqueName,
          mimeType: contentType,
          size: file.size,
          path: storageResult.url,
          isPrivate: false,
          uploadedBy: user.id,
        },
      });

      uploadedResults.push({
        url: storageResult.url,
        fileName: file.name,
        storedName: uniqueName,
        size: file.size,
        mimeType: contentType,
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedResults,
      // Backward compatibility for single file callers
      url: uploadedResults[0].url,
      fileName: uploadedResults[0].fileName,
      storedName: uploadedResults[0].storedName,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during file upload.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required.' }, { status: 400 });
    }

    // Safely remove blob or local file
    await deleteMedia(url);

    // Clean up record in UploadedFile if present
    await prisma.uploadedFile.deleteMany({
      where: { path: url },
    });

    return NextResponse.json({ success: true, message: 'File deleted successfully.' });
  } catch (error: any) {
    console.error('File delete error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during file deletion.' },
      { status: 500 }
    );
  }
}
