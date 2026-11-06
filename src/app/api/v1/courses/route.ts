import { NextResponse } from 'next/server';
import { AcademicsService } from '@/modules/academics/academics.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const courses = await AcademicsService.listCourses({ approvedOnly: true });
  return NextResponse.json({
    success: true,
    count: courses.length,
    data: courses,
  });
}
