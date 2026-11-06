import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const item = await CmsService.getNewsBySlug(slug);

  if (!item) {
    return NextResponse.json({ success: false, error: 'News article not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: item,
  });
}
