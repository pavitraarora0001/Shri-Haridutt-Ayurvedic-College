import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const notice = await prisma.notice.findUnique({
    where: { id: slug },
  });

  if (!notice) {
    return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: notice,
  });
}
