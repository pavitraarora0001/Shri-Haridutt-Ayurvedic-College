import { NextResponse } from 'next/server';
import { AcademicsService } from '@/modules/academics/academics.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const course = await AcademicsService.getCourseByCode(slug);

  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: course,
  });
}
