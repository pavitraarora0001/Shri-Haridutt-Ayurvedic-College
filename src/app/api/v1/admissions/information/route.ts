import { NextResponse } from 'next/server';
import { AcademicsService } from '@/modules/academics/academics.service';
import { getInstitutionalSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [courses, settings] = await Promise.all([
    AcademicsService.listCourses({ approvedOnly: true }),
    getInstitutionalSettings(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      academicYear: '2026–27',
      counselingAuthority: 'AYUSH Admissions Central Counseling Committee (AACCC) & State AYUSH Directorate',
      intakeSummary: {
        bamsSeats: 100,
        mdSeats: 12,
        panchakarmaDiplomaSeats: 30,
      },
      admissionRounds: [
        { round: 'Round 1 AIQ & State Allotment', status: 'ACTIVE', dates: 'October – November 2026' },
        { round: 'Round 2 Counseling', status: 'UPCOMING', dates: 'December 2026' },
        { round: 'Mop-Up / Stray Vacancy', status: 'SCHEDULED', dates: 'January 2027' },
      ],
      helpline: settings.admissionsHelpline,
      email: settings.admissionsEmail,
      courses,
    },
  });
}
