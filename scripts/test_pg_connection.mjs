import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPostgres() {
  console.log('Connecting to Prisma Postgres database via DATABASE_URL...');
  try {
    const res = await prisma.$queryRaw`SELECT 1 as connected, current_database() as db_name, version() as pg_version`;
    console.log('Database Connection Status: SUCCESS');
    console.log('Query result:', res);

    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log(`Tables currently existing in PostgreSQL database: ${tables.length}`);
    tables.forEach(t => console.log('  -', t.table_name));

    return { connected: true, tableCount: tables.length };
  } catch (err) {
    console.error('Database connection FAILED:', err.message);
    return { connected: false, error: err.message };
  } finally {
    await prisma.$disconnect();
  }
}

checkPostgres();
