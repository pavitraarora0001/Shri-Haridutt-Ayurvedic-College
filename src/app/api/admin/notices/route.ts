import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ notices });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, category, date, isPinned, isPublished } = await req.json();

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and Category are required.' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        category,
        date: date || new Date().toISOString().split('T')[0],
        isPinned: !!isPinned,
        isPublished: isPublished !== undefined ? !!isPublished : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_NOTICE',
        entity: 'Notice',
        entityId: notice.id,
        details: `Created notice "${title}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
  }
}
