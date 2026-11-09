import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string | undefined {
  let currentUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
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
      // Ignore error and fall back to currentUrl
    }
  }

  if (currentUrl && !currentUrl.startsWith('file:') && !currentUrl.includes('connection_limit=')) {
    const delimiter = currentUrl.includes('?') ? '&' : '?';
    return `${currentUrl}${delimiter}connection_limit=20&pool_timeout=30`;
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

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
