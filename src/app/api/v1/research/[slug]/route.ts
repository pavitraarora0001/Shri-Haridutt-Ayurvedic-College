import { NextResponse } from 'next/server';
import { ResearchService } from '@/modules/research/research.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const pub = await ResearchService.getPublicationById(slug);

  if (!pub) {
    return NextResponse.json({ success: false, error: 'Publication not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: pub,
  });
}
