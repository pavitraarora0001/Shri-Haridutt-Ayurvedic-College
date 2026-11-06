import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      program: 'Bachelor of Ayurvedic Medicine and Surgery (B.A.M.S.)',
      minimumAge: '17 years as on 31st December of the admission year',
      academicQualification: {
        exam: '10+2 / Intermediate Examination or equivalent',
        subjects: ['Physics', 'Chemistry', 'Biology (or Biotechnology)', 'English'],
        minimumMarksPercentage: {
          general: '50% aggregate in PCB',
          obc_sc_st: '40% aggregate in PCB',
          physicallyHandicapped: '45% aggregate in PCB',
        },
      },
      entranceExam: {
        name: 'National Eligibility cum Entrance Test (NEET-UG 2026)',
        mandatory: true,
        percentileCutoff: {
          general_ews: '50th Percentile',
          obc_sc_st: '40th Percentile',
          pwd: '45th Percentile',
        },
      },
      quotaDistribution: {
        allIndiaQuota: '15% through AACCC counseling',
        stateQuota: '85% through State AYUSH counseling & Institutional allotment',
      },
    },
  });
}
