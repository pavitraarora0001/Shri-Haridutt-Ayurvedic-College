import { NextResponse } from 'next/server';
import { FacultyService } from '@/modules/faculty/faculty.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get('departmentId') || undefined;
  const isLeadership = searchParams.get('leadership') ? searchParams.get('leadership') === 'true' : undefined;
  const search = searchParams.get('search') || undefined;

  const faculty = await FacultyService.listFaculty({ departmentId, isLeadership, search });
  return NextResponse.json({
    success: true,
    count: faculty.length,
    data: faculty,
  });
}
