import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  const notices = await CmsService.listNotices({ publishedOnly: true, category });
  return NextResponse.json({
    success: true,
    count: notices.length,
    data: notices,
  });
}
