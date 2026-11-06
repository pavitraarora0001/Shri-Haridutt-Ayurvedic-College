import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'CONNECTED';
  let dbLatencyMs = 0;

  try {
    const pingStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - pingStart;
  } catch (error) {
    dbStatus = 'DISCONNECTED';
    console.error('Database ping failed:', error);
  }

  const isHealthy = dbStatus === 'CONNECTED';

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      institution: 'Shri Haridutt Ayurvedic Medical College & Hospital',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      services: {
        database: {
          status: dbStatus,
          latencyMs: dbLatencyMs,
        },
        apiGateway: {
          status: 'OPERATIONAL',
          uptimeSeconds: Math.floor(process.uptime()),
        },
      },
      durationMs: Date.now() - startTime,
    },
    { status: isHealthy ? 200 : 503 }
  );
}
