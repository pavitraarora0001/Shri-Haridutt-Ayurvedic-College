import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ success: true, news });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch news.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    if (!data.title || !data.summary || !data.content) {
      return NextResponse.json({ error: 'Title, summary, and content are required.' }, { status: 400 });
    }

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`;

    const article = await prisma.news.create({
      data: {
        title: data.title.trim(),
        slug,
        summary: data.summary.trim(),
        content: data.content.trim(),
        category: data.category || 'Institutional',
        imageUrl: data.imageUrl || '/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp',
        isFeatured: Boolean(data.isFeatured),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_NEWS',
        entity: 'News',
        entityId: article.id,
        details: `Created news article "${article.title}"`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/news-events');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    console.error('News create error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create news.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'News article ID is required.' }, { status: 400 });
    }

    const article = await prisma.news.update({
      where: { id: data.id },
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl,
        isFeatured: Boolean(data.isFeatured),
        isPublished: Boolean(data.isPublished),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_NEWS',
        entity: 'News',
        entityId: article.id,
        details: `Updated news article "${article.title}"`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/news-events');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update news article.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Article ID required.' }, { status: 400 });

    await prisma.news.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_NEWS',
        entity: 'News',
        entityId: id,
        details: `Deleted news article ID ${id}`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/news-events');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete news article.' }, { status: 500 });
  }
}
