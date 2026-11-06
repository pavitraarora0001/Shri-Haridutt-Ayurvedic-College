import { NextResponse } from 'next/server';
import { AcademicsService } from '@/modules/academics/academics.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const department = await AcademicsService.getDepartmentByCode(slug);

  if (!department) {
    return NextResponse.json({ success: false, error: 'Department not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: department,
  });
}
