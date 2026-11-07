import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export const JWT_ISSUER = 'hariduttayurveda.edu.in';
export const JWT_AUDIENCE = 'shamc-portal';
export const ACCESS_TOKEN_EXPIRY = '15m'; // 15-Minute Short-Lived Access Token
export const REFRESH_TOKEN_DAYS = 7;     // 7-Day Refresh Token Life

/**
 * Resolves the mandatory cryptographic JWT secret key.
 * Throws a fatal exception in production if JWT_SECRET is absent or under 32 characters.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length < 32) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'CRITICAL SECURITY CONFIGURATION FAILURE: Mandatory JWT_SECRET environment variable is missing or has fewer than 32 characters in production.'
      );
    }
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
  sessionId?: string;
  iss?: string;
  aud?: string;
}

/**
 * Signs a short-lived access token (15 mins) with strict issuer and audience.
 */
export function signAccessToken(payload: UserSessionPayload): string {
  return jwt.sign(
    {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      type: payload.type,
      sessionId: payload.sessionId,
    },
    getJwtSecret(),
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
}

/**
 * Backward compatibility alias for existing code
 */
export function signJwtToken(payload: UserSessionPayload): string {
  return signAccessToken(payload);
}

/**
 * Verifies access token cryptographic integrity, expiration, issuer, and audience.
 */
export function verifyAccessToken(token: string): UserSessionPayload | null {
  try {
    return jwt.verify(token, getJwtSecret(), {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as UserSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Backward compatibility alias for existing code
 */
export function verifyJwtToken(token: string): UserSessionPayload | null {
  return verifyAccessToken(token);
}

/**
 * Creates a database-persisted refresh token session.
 * Stores a SHA-256 hash of the random token rather than plaintext.
 */
export async function createRefreshTokenSession(
  userId: string,
  userType: 'USER' | 'STUDENT',
  ipAddress?: string,
  userAgent?: string
): Promise<{ rawToken: string; sessionId: string }> {
  const rawToken = crypto.randomBytes(48).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);

  const session = await prisma.userSession.create({
    data: {
      userId,
      userType,
      tokenHash,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      expiresAt,
    },
  });

  return { rawToken: `${session.id}.${rawToken}`, sessionId: session.id };
}

/**
 * Rotates a refresh token: verifies hash, checks revocation, detects replay attacks,
 * and issues a new access token + new refresh token.
 */
export async function rotateRefreshTokenSession(
  compoundRefreshToken: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{
  accessToken: string;
  newRefreshToken: string;
  user: UserSessionPayload;
} | null> {
  try {
    const parts = compoundRefreshToken.split('.');
    if (parts.length !== 2) return null;
    const [sessionId, rawToken] = parts;
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const session = await prisma.userSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) return null;

    // Detect token reuse / theft attack: If revoked token is presented, invalidate ALL user sessions
    if (session.isRevoked) {
      console.warn(`[SECURITY ALERT]: Detected attempted replay of revoked refresh token for user ${session.userId}. Invalidating all sessions.`);
      await revokeAllUserSessions(session.userId);
      return null;
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await prisma.userSession.update({
        where: { id: sessionId },
        data: { isRevoked: true },
      });
      return null;
    }

    if (session.tokenHash !== tokenHash) {
      return null;
    }

    // Resolve user details and verify active status
    let payload: UserSessionPayload | null = null;
    if (session.userType === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { id: session.userId } });
      if (!student) return null;
      payload = {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'STUDENT',
        type: 'STUDENT',
        sessionId: session.id,
      };
    } else {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user || !user.isActive) return null;
      payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: user.role === 'FACULTY' ? 'FACULTY' : 'ADMIN',
        sessionId: session.id,
      };
    }

    // Revoke old session and generate rotated new session (Token Rotation)
    await prisma.userSession.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    });

    const newSession = await createRefreshTokenSession(
      payload.id,
      session.userType as 'USER' | 'STUDENT',
      ipAddress,
      userAgent
    );

    payload.sessionId = newSession.sessionId;
    const accessToken = signAccessToken(payload);

    return {
      accessToken,
      newRefreshToken: newSession.rawToken,
      user: payload,
    };
  } catch (error) {
    console.error('Error rotating refresh token:', error);
    return null;
  }
}

/**
 * Revokes a single session (Logout).
 */
export async function revokeSession(sessionId: string): Promise<boolean> {
  try {
    await prisma.userSession.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Revokes all sessions for a user (Password reset, deactivation, or security breach).
 */
export async function revokeAllUserSessions(userId: string): Promise<number> {
  try {
    const res = await prisma.userSession.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
    return res.count;
  } catch {
    return 0;
  }
}

/**
 * Resolves currently authenticated user from HTTP-only cookie or Authorization Header.
 * Verifies active database account status on server-side calls.
 */
export async function getCurrentUser(): Promise<UserSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    const verified = verifyAccessToken(token);
    if (!verified) return null;

    // Verify active status in database
    if (verified.type === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { id: verified.id } });
      if (!student) return null;
    } else {
      const user = await prisma.user.findUnique({ where: { id: verified.id } });
      if (!user || !user.isActive) return null;
    }

    return verified;
  } catch {
    return null;
  }
}
