import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';
import prisma from '@/lib/prisma';
import { AuditService } from '@/modules/audit/audit.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await AuthService.getCurrentUser(request);
  if (!user || !AuthService.hasRole(user, ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_ADMIN', 'PRINCIPAL', 'ACADEMIC_ADMIN', 'CONTENT_MANAGER'])) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  try {
    const [
      totalApplications,
      submittedApps,
      underReviewApps,
      approvedApps,
      totalEnquiries,
      newEnquiries,
      totalFaculty,
      totalCourses,
      totalNotices,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.admissionApplication.count(),
      prisma.admissionApplication.count({ where: { status: 'SUBMITTED' } }),
      prisma.admissionApplication.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.admissionApplication.count({ where: { status: 'APPROVED' } }),
      prisma.admissionEnquiry.count(),
      prisma.admissionEnquiry.count({ where: { status: 'NEW' } }),
      prisma.faculty.count({ where: { isActive: true } }),
      prisma.course.count({ where: { isApproved: true } }),
      prisma.notice.count({ where: { isPublished: true } }),
      AuditService.listRecentLogs(10),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        admissions: {
          totalApplications,
          submitted: submittedApps,
          underReview: underReviewApps,
          approved: approvedApps,
          conversionRate: totalApplications > 0 ? ((approvedApps / totalApplications) * 100).toFixed(1) + '%' : '0.0%',
        },
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          resolved: totalEnquiries - newEnquiries,
        },
        academics: {
          activeFaculty: totalFaculty,
          approvedCourses: totalCourses,
          publishedNotices: totalNotices,
        },
        recentActivity: recentAuditLogs,
      },
    });
  } catch (error: any) {
    console.error('Error computing dashboard metrics:', error);
    return NextResponse.json({ success: false, error: 'Failed to aggregate dashboard metrics' }, { status: 500 });
  }
}
