import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const pgEnv = fs.readFileSync('.env.postgres', 'utf8');
const pgUrl = pgEnv.split('\n').find(l => l.startsWith('DATABASE_URL='))?.split('=')[1]?.trim()?.replace(/^["']|["']$/g, '');

const prisma = new PrismaClient({
  datasources: {
    db: { url: pgUrl }
  },
  log: ['warn', 'error']
});

async function testBackend() {
  console.log('Testing Prisma Client with the configured PostgreSQL database...');
  const start = Date.now();
  try {
    const rawRes = await prisma.$queryRaw`SELECT current_database(), current_user, version();`;
    const elapsed = Date.now() - start;
    console.log(`Connection established successfully in ${elapsed}ms!`);
    console.log('Raw diagnostic query result:', rawRes);

    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public';
    `;
    console.log(`Public tables count: ${tables.length}`);
    tables.forEach(t => console.log('  -', t.tablename));

    return { success: true, tableCount: tables.length };
  } catch (error) {
    console.error('Database query error:', error.message);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

testBackend();
