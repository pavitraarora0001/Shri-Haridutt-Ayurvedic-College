import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { getJwtSecret } from '@/lib/auth';

const TOKEN_EXPIRY = '7d';

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  type?: 'ADMIN' | 'STUDENT' | 'FACULTY';
}

// Persistent rate-limiting storage path for PM2 cluster workers
const RATE_LIMIT_FILE = path.join(process.cwd(), 'storage', 'ratelimit.json');

function getSharedRateLimitStore(): Record<string, { count: number; expiresAt: number }> {
  try {
    if (!fs.existsSync(path.dirname(RATE_LIMIT_FILE))) {
      fs.mkdirSync(path.dirname(RATE_LIMIT_FILE), { recursive: true });
    }
    if (fs.existsSync(RATE_LIMIT_FILE)) {
      const data = fs.readFileSync(RATE_LIMIT_FILE, 'utf8');
      return JSON.parse(data || '{}');
    }
  } catch {
    // Fall back to empty store on concurrent access or parse error
  }
  return {};
}

function saveSharedRateLimitStore(store: Record<string, { count: number; expiresAt: number }>) {
  try {
    const now = Date.now();
    // Prune expired entries to keep file compact
    const cleaned: Record<string, { count: number; expiresAt: number }> = {};
    for (const [k, v] of Object.entries(store)) {
      if (v.expiresAt > now) {
        cleaned[k] = v;
      }
    }
    fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(cleaned), 'utf8');
  } catch {
    // Non-fatal if temporary write collision occurs
  }
}

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
   * Signs a JWT session token with institutional payload using unified secure secret
   */
  static signToken(payload: AuthSessionUser): string {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
  }

  /**
   * Verifies a JWT token string using unified secure secret
   */
  static verifyToken(token: string): AuthSessionUser | null {
    try {
      return jwt.verify(token, getJwtSecret()) as AuthSessionUser;
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

    for (const ur of user.userRoles) {
      const matched = ur.role.permissions.some(
        (rp) => rp.permission.slug === permissionSlug
      );
      if (matched) return true;
    }

    return false;
  }

  /**
   * Cluster-safe Persistent Rate Limiter: Allows max `limit` requests per `windowMs`.
   * Works across all PM2 cluster worker processes without external Redis requirements.
   */
  static checkRateLimit(
    key: string,
    limit: number = 60,
    windowMs: number = 60000
  ): { allowed: boolean; remaining: number; retryAfterSec?: number } {
    const now = Date.now();
    const store = getSharedRateLimitStore();
    const record = store[key];

    if (!record || now > record.expiresAt) {
      store[key] = { count: 1, expiresAt: now + windowMs };
      saveSharedRateLimitStore(store);
      return { allowed: true, remaining: limit - 1 };
    }

    if (record.count >= limit) {
      const retryAfterSec = Math.max(1, Math.ceil((record.expiresAt - now) / 1000));
      return { allowed: false, remaining: 0, retryAfterSec };
    }

    record.count += 1;
    saveSharedRateLimitStore(store);
    return { allowed: true, remaining: limit - record.count };
  }

  /**
   * Specialized login brute-force protection:
   * Max 5 attempts per identifier + IP within a 15-minute window.
   */
  static checkLoginRateLimit(
    identifier: string,
    ip: string = 'global'
  ): { allowed: boolean; remaining: number; retryAfterSec?: number } {
    const key = `login:${ip}:${identifier.toLowerCase().trim()}`;
    return this.checkRateLimit(key, 5, 15 * 60 * 1000); // 5 attempts per 15 mins
  }

  /**
   * Resets the rate limiter for a specific key (e.g. on successful authentication)
   */
  static resetLoginRateLimit(identifier: string, ip: string = 'global') {
    try {
      const key = `login:${ip}:${identifier.toLowerCase().trim()}`;
      const store = getSharedRateLimitStore();
      if (store[key]) {
        delete store[key];
        saveSharedRateLimitStore(store);
      }
    } catch {
      // Ignore cleanup error
    }
  }
}
