import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { AdmissionsService } from '@/modules/admissions/admissions.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { id } = await context.params;
  const application = await AdmissionsService.getApplicationById(id);

  if (!application) {
    return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: application });
}
