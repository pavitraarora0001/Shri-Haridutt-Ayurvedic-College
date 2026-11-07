import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ success: true, notices });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch notices.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, category, date, fileUrl, isPinned, isPublished } = await req.json();

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and Category are required.' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        date: date || new Date().toISOString().split('T')[0],
        fileUrl: fileUrl || null,
        isPinned: !!isPinned,
        isPublished: isPublished !== undefined ? !!isPublished : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_NOTICE',
        entity: 'Notice',
        entityId: notice.id,
        details: `Created notice "${notice.title}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create notice.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'Notice ID required.' }, { status: 400 });

    const notice = await prisma.notice.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        date: data.date,
        fileUrl: data.fileUrl !== undefined ? data.fileUrl : undefined,
        isPinned: Boolean(data.isPinned),
        isPublished: Boolean(data.isPublished),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_NOTICE',
        entity: 'Notice',
        entityId: notice.id,
        details: `Updated notice "${notice.title}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update notice.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Notice ID required.' }, { status: 400 });

    await prisma.notice.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_NOTICE',
        entity: 'Notice',
        entityId: id,
        details: `Deleted notice ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete notice.' }, { status: 500 });
  }
}
