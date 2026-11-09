import { put, del } from '@vercel/blob';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';

export interface StorageUploadResult {
  url: string;
  pathname: string;
  contentType?: string;
  size: number;
}

/**
 * Uploads media buffer to persistent storage (Vercel Blob in production, or fallback to local disk in dev).
 */
export async function uploadMedia(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<StorageUploadResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!token) {
    if (isProduction) {
      throw new Error(
        'CRITICAL CONFIGURATION ERROR: BLOB_READ_WRITE_TOKEN is missing in production. Ephemeral local filesystem storage is forbidden.'
      );
    }

    // Local development fallback only when no token is present
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const localPath = path.join(uploadDir, filename);
    await writeFile(localPath, buffer);
    return {
      url: `/uploads/${filename}`,
      pathname: `/uploads/${filename}`,
      contentType,
      size: buffer.length,
    };
  }

  // Upload to Vercel Blob persistent storage
  const blob = await put(filename, buffer, {
    access: 'public',
    contentType,
    token,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType,
    size: buffer.length,
  };
}

/**
 * Safely deletes a file from persistent storage or local filesystem.
 */
export async function deleteMedia(url: string): Promise<boolean> {
  if (!url) return false;

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // 1. Vercel Blob URL
  if (url.includes('.blob.vercel-storage.com')) {
    if (token) {
      try {
        await del(url, { token });
        return true;
      } catch (err) {
        console.error('Failed to delete Vercel Blob:', err);
        return false;
      }
    }
    return false;
  }

  // 2. Local uploads folder
  if (url.startsWith('/uploads/')) {
    try {
      const fileName = path.basename(url);
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }

  // 3. External CDN URL (Unsplash, Wikipedia, etc.) - safely ignore
  return true;
}
