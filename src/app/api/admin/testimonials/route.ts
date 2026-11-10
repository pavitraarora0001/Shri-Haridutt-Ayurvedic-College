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

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, testimonials });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch testimonials.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    if (!data.authorName || !data.quote) {
      return NextResponse.json({ error: 'Author name and quote are required.' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName: data.authorName.trim(),
        role: data.role || 'BAMS Scholar',
        batchOrDesignation: data.batchOrDesignation || 'Batch 2025–26',
        quote: data.quote.trim(),
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        rating: parseInt(data.rating) || 5,
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_TESTIMONIAL',
        entity: 'Testimonial',
        entityId: testimonial.id,
        details: `Created testimonial by "${testimonial.authorName}"`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'Testimonial ID required.' }, { status: 400 });

    const testimonial = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        authorName: data.authorName,
        role: data.role,
        batchOrDesignation: data.batchOrDesignation,
        quote: data.quote,
        avatarUrl: data.avatarUrl,
        rating: parseInt(data.rating) || 5,
        isPublished: Boolean(data.isPublished),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_TESTIMONIAL',
        entity: 'Testimonial',
        entityId: testimonial.id,
        details: `Updated testimonial ID ${testimonial.id}`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update testimonial.' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Testimonial ID required.' }, { status: 400 });

    await prisma.testimonial.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_TESTIMONIAL',
        entity: 'Testimonial',
        entityId: id,
        details: `Deleted testimonial ID ${id}`,
        performedBy: user.id,
      },
    });

    try {
      revalidatePath('/');
    } catch (e) {
      console.warn('Revalidate error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete testimonial.' }, { status: 500 });
  }
}
