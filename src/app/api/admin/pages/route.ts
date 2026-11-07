import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = await prisma.websitePage.findUnique({
        where: { slug },
      });
      return NextResponse.json({ success: true, page });
    }

    const pages = await prisma.websitePage.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ success: true, pages });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to load website pages.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug, title, content, metaTitle, metaDesc, isPublished } = await req.json();

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required.' }, { status: 400 });
    }

    const page = await prisma.websitePage.upsert({
      where: { slug: slug.toLowerCase().trim() },
      update: {
        title,
        content: typeof content === 'object' ? JSON.stringify(content) : String(content || ''),
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
      create: {
        slug: slug.toLowerCase().trim(),
        title,
        content: typeof content === 'object' ? JSON.stringify(content) : String(content || ''),
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_WEBSITE_PAGE',
        entity: 'WebsitePage',
        entityId: page.id,
        details: `Saved content for page slug "${slug}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, page });
  } catch (err: any) {
    console.error('Page save error:', err);
    return NextResponse.json({ error: 'Failed to save page content.' }, { status: 500 });
  }
}
