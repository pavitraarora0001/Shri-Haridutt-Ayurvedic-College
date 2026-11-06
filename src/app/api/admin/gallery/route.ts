import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required.' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: data.title.trim(),
        category: data.category || 'Campus',
        imageUrl: data.imageUrl,
        caption: data.caption || '',
        order: parseInt(data.order) || 0,
        isPublished: data.isPublished ?? true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: item.id,
        details: `Created gallery image "${item.title}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to add gallery item.' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Gallery ID required.' }, { status: 400 });

    await prisma.galleryItem.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: id,
        details: `Deleted gallery ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete gallery item.' }, { status: 500 });
  }
}
