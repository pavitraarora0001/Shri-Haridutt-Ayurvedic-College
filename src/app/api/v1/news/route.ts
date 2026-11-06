import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const news = await CmsService.listNews({ publishedOnly: true });
  return NextResponse.json({
    success: true,
    count: news.length,
    data: news,
  });
}
