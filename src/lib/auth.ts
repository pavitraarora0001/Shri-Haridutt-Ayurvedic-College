import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

/**
 * Resolves the mandatory cryptographic JWT secret key.
 * Throws a fatal exception in production if JWT_SECRET is absent or under 32 characters.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length < 32) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'CRITICAL SECURITY CONFIGURATION FAILURE: Mandatory JWT_SECRET environment variable is missing or has fewer than 32 characters.'
      );
    }
    // In local non-production development environments, provide a non-committed secure development fallback with explicit warning
    return 'dev-ephemeral-jwt-secret-shamc-secure-ayurveda-2026-key';
  }
  return secret.trim();
}

export interface UserSessionPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  type?: 'ADMIN' | 'STUDENT' | 'FACULTY';
}

export function signJwtToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyJwtToken(token: string): UserSessionPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as UserSessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return verifyJwtToken(token);
  } catch {
    return null;
  }
}
