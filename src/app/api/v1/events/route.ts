import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upcomingOnly = searchParams.get('upcoming') === 'true';

  const events = await CmsService.listEvents({ upcomingOnly });
  return NextResponse.json({
    success: true,
    count: events.length,
    data: events,
  });
}
