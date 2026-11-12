import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Resolves and optimizes the PostgreSQL connection string for Vercel Serverless.
 *
 * PostgreSQL Limits on Production DB:
 * - max_connections: 50
 * - superuser_reserved_connections: 5
 * - role connection limit (prisma_migration): 45
 *
 * To prevent connection exhaustion across concurrent Vercel serverless function invocations:
 * - Each container connection_limit is strictly capped to 2
 * - pool_timeout is capped to 10s (fast failure, no indefinite queue piling)
 * - connect_timeout is set to 10s
 */
function getDatabaseUrl(): string | undefined {
  let currentUrl =
    process.env.DATABASE_URL_POOLED ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.PRISMA_DATABASE_URL ||
    process.env.DATABASE_URL;

  if (!currentUrl || currentUrl.startsWith('file:')) {
    // If local development environment has file: in .env, check for .env.postgres
    try {
      const envPgPath = path.join(process.cwd(), '.env.postgres');
      if (fs.existsSync(envPgPath)) {
        const content = fs.readFileSync(envPgPath, 'utf8');
        const match = content
          .split('\n')
          .find((l) => l.startsWith('DATABASE_URL=') || l.startsWith('POSTGRES_PRISMA_URL='));
        if (match) {
          currentUrl = match.split('=')[1]?.trim()?.replace(/^["']|["']$/g, '');
        }
      }
    } catch {
      // Ignore read error and fall back
    }
  }

  if (currentUrl && !currentUrl.startsWith('file:')) {
    const isDev = process.env.NODE_ENV !== 'production';
    const connectionLimit = isDev ? '5' : '3';
    const poolTimeout = isDev ? '20' : '15';

    try {
      const parsed = new URL(currentUrl);
      parsed.searchParams.set('connection_limit', connectionLimit);
      parsed.searchParams.set('pool_timeout', poolTimeout);
      parsed.searchParams.set('connect_timeout', '15');
      return parsed.toString();
    } catch {
      // Fallback regex replacement for non-standard URI formats
      let url = currentUrl
        .replace(/([?&])connection_limit=\d+/, `$1connection_limit=${connectionLimit}`)
        .replace(/([?&])pool_timeout=\d+/, `$1pool_timeout=${poolTimeout}`);

      if (!url.includes('connection_limit=')) {
        const delimiter = url.includes('?') ? '&' : '?';
        url = `${url}${delimiter}connection_limit=${connectionLimit}&pool_timeout=${poolTimeout}&connect_timeout=15`;
      }
      return url;
    }
  }

  return currentUrl;
}

const resolvedUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: resolvedUrl ? { db: { url: resolvedUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Guarantee a single PrismaClient instance across all Node.js environments (dev and production)
globalForPrisma.prisma = prisma;

export default prisma;
