import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await CmsService.getPublicSettings();
  return NextResponse.json({
    success: true,
    data: settings,
  });
}
