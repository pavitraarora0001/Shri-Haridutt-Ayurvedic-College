import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'haridutt-ayurveda-jwt-secret-key-2026-production';
const TOKEN_EXPIRY = '7d';

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  type?: 'ADMIN' | 'STUDENT' | 'FACULTY';
}

// In-Memory sliding-window rate limiter for sensitive endpoints
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export class AuthService {
  /**
   * Hashes a raw password securely using bcrypt with 10 salt rounds
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compares raw password against hashed password
   */
  static async comparePassword(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }

  /**
   * Signs a JWT session token with institutional payload
   */
  static signToken(payload: AuthSessionUser): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  }

  /**
   * Verifies a JWT token string
   */
  static verifyToken(token: string): AuthSessionUser | null {
    try {
      return jwt.verify(token, JWT_SECRET) as AuthSessionUser;
    } catch {
      return null;
    }
  }

  /**
   * Resolves currently authenticated user from HTTP-only cookie or Authorization Header
   */
  static async getCurrentUser(request?: Request): Promise<AuthSessionUser | null> {
    // 1. Check Authorization Bearer Header if request is passed
    if (request) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const verified = this.verifyToken(token);
        if (verified) return verified;
      }
    }

    // 2. Check Cookie Store
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('auth_token')?.value;
      if (!token) return null;
      return this.verifyToken(token);
    } catch {
      return null;
    }
  }

  /**
   * Enforces role-based authorization guard
   */
  static hasRole(user: AuthSessionUser | null, allowedRoles: string[]): boolean {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    return allowedRoles.includes(user.role);
  }

  /**
   * Enforces granular permission guard against the database
   */
  static async hasPermission(userId: string, permissionSlug: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive) return false;
    if (user.role === 'SUPER_ADMIN') return true;

    // Check direct role and userRoles joins
    for (const ur of user.userRoles) {
      const matched = ur.role.permissions.some(
        (rp) => rp.permission.slug === permissionSlug
      );
      if (matched) return true;
    }

    return false;
  }

  /**
   * Rate Limiter: Allows max `limit` requests per `windowMs`
   */
  static checkRateLimit(key: string, limit: number = 60, windowMs: number = 60000): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (!record || now > record.expiresAt) {
      rateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
      return { allowed: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    record.count += 1;
    return { allowed: true, remaining: limit - record.count };
  }
}
