import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { CmsService } from '@/modules/cms/cms.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const item = await CmsService.createNews(body);

    await AuditService.logAction({
      action: 'PUBLISH_NEWS',
      entity: 'News',
      entityId: item.id,
      details: `Published article: ${item.title}`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
