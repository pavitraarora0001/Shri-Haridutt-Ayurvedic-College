import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { CmsService } from '@/modules/cms/cms.service';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const settings = await CmsService.getAllSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function PATCH(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = await CmsService.updateSettings(body);

    await AuditService.logAction({
      action: 'UPDATE_SETTINGS',
      entity: 'WebsiteSetting',
      details: `Updated ${Object.keys(body).length} configuration keys`,
      performedBy: user.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
