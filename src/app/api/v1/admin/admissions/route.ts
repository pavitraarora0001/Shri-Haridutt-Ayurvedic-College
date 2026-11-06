import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import { AdmissionsService } from '@/modules/admissions/admissions.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_ADMIN', 'PRINCIPAL'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '25', 10);
  const courseCode = searchParams.get('courseCode') || undefined;
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;

  const result = await AdmissionsService.listApplications({
    page,
    limit,
    courseCode,
    status,
    search,
  });

  return NextResponse.json({ success: true, ...result });
}
