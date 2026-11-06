import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const publications = await prisma.researchPublication.findMany({
    orderBy: { year: 'desc' },
  });
  return NextResponse.json({ publications });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.type !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.authors || !data.journal || !data.year) {
      return NextResponse.json({ error: 'Title, authors, journal, and year are mandatory.' }, { status: 400 });
    }

    const pub = await prisma.researchPublication.create({
      data: {
        title: data.title.trim(),
        authors: data.authors.trim(),
        journal: data.journal.trim(),
        year: parseInt(data.year) || new Date().getFullYear(),
        volume: data.volume || '',
        doi: data.doi || null,
        abstract: data.abstract || '',
        category: data.category || 'Clinical Trial',
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_RESEARCH_PUBLICATION',
        entity: 'ResearchPublication',
        entityId: pub.id,
        details: `Created publication "${pub.title}"`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true, publication: pub });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create research publication.' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Publication ID required.' }, { status: 400 });

    await prisma.researchPublication.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_RESEARCH_PUBLICATION',
        entity: 'ResearchPublication',
        entityId: id,
        details: `Deleted publication ID ${id}`,
        performedBy: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete publication.' }, { status: 500 });
  }
}
