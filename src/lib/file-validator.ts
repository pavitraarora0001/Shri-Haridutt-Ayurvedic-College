import path from 'path';

export interface ValidationResult {
  valid: boolean;
  detectedType?: string;
  error?: string;
  safeExtension?: string;
}

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];

/**
 * Validates a file buffer against binary magic signatures and extension integrity.
 */
export function validateUploadedFile(
  buffer: Buffer,
  originalFileName: string,
  declaredMimeType: string,
  maxBytes: number = 5 * 1024 * 1024
): ValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Empty file payload.' };
  }

  if (buffer.length > maxBytes) {
    return { valid: false, error: 'File exceeds maximum permitted limit of 5 MB.' };
  }

  const rawExt = path.extname(originalFileName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
    return {
      valid: false,
      error: `Invalid file extension (${rawExt || 'none'}). Only PDF, JPG, PNG, and WebP are accepted.`,
    };
  }

  // Detect True Binary Signature (Magic Bytes)
  let detectedType: string | null = null;
  let safeExtension: string = rawExt;

  // 1. PDF: %PDF- (0x25 0x50 0x44 0x46)
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    detectedType = 'application/pdf';
    safeExtension = '.pdf';
  }
  // 2. JPEG: \xFF\xD8\xFF
  else if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    detectedType = 'image/jpeg';
    safeExtension = rawExt === '.jpeg' ? '.jpeg' : '.jpg';
  }
  // 3. PNG: \x89PNG\r\n\x1a\n (0x89 0x50 0x4E 0x47)
  else if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    detectedType = 'image/png';
    safeExtension = '.png';
  }
  // 4. WebP: RIFF....WEBP (0x52 0x49 0x46 0x46 ... 0x57 0x45 0x42 0x50)
  else if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    detectedType = 'image/webp';
    safeExtension = '.webp';
  }

  if (!detectedType) {
    return {
      valid: false,
      error: 'File content does not match a verified authentic document signature (PDF/JPEG/PNG/WebP).',
    };
  }

  // Cross-check extension against detected signature
  const isImageMatch =
    (detectedType === 'image/jpeg' && (rawExt === '.jpg' || rawExt === '.jpeg')) ||
    (detectedType === 'image/png' && rawExt === '.png') ||
    (detectedType === 'image/webp' && rawExt === '.webp');
  const isPdfMatch = detectedType === 'application/pdf' && rawExt === '.pdf';

  if (!isImageMatch && !isPdfMatch) {
    return {
      valid: false,
      error: `File signature mismatch: file content is ${detectedType} but claimed extension is ${rawExt}.`,
    };
  }

  return {
    valid: true,
    detectedType,
    safeExtension,
  };
}
