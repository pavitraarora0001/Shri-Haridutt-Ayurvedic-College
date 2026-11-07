import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { validateUploadedFile } from '@/lib/file-validator';

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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

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
      const filePath = path.join(uploadDir, uniqueName);

      await writeFile(filePath, buffer);
      const publicUrl = `/uploads/${uniqueName}`;

      // Persist in UploadedFile database model
      await prisma.uploadedFile.create({
        data: {
          originalName: file.name,
          fileName: uniqueName,
          mimeType: validation.detectedType || file.type || 'application/octet-stream',
          size: file.size,
          path: publicUrl,
          isPrivate: false,
          uploadedBy: user.id,
        },
      });

      uploadedResults.push({
        url: publicUrl,
        fileName: file.name,
        storedName: uniqueName,
        size: file.size,
        mimeType: validation.detectedType,
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
      { error: 'An unexpected error occurred during file upload.' },
      { status: 500 }
    );
  }
}
