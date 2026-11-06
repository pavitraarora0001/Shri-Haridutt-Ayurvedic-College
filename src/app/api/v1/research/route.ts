import { NextResponse } from 'next/server';
import { ResearchService } from '@/modules/research/research.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  const publications = await ResearchService.listPublications(category);
  return NextResponse.json({
    success: true,
    count: publications.length,
    data: publications,
  });
}
