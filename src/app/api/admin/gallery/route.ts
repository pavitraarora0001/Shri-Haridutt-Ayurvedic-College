import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch gallery items.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.imageUrl) {
      return NextResponse.json({ error: 'Title and media/image URL are required.' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: data.title.trim(),
        category: data.category || 'Campus',
        imageUrl: data.imageUrl,
        caption: data.caption || '',
        order: parseInt(data.order) || 0,
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: item.id,
        details: `Created gallery media "${item.title}" (${item.category})`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/gallery');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to add gallery item.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'Gallery ID required.' }, { status: 400 });

    const item = await prisma.galleryItem.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        imageUrl: data.imageUrl,
        caption: data.caption,
        order: parseInt(data.order) || 0,
        isPublished: Boolean(data.isPublished),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: item.id,
        details: `Updated gallery media "${item.title}"`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/gallery');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update gallery item.' }, { status: 500 });
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

    try {
      revalidatePath('/gallery');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete gallery item.' }, { status: 500 });
  }
}
