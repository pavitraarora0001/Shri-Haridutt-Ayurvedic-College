import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalApplications,
      submittedApps,
      underReviewApps,
      approvedApps,
      totalEnquiries,
      totalFaculty,
      totalCourses,
      totalNotices,
      totalGallery,
      recentApplications,
      recentEnquiries,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.admissionApplication.count(),
      prisma.admissionApplication.count({ where: { status: 'SUBMITTED' } }),
      prisma.admissionApplication.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.admissionApplication.count({ where: { status: 'APPROVED' } }),
      prisma.admissionEnquiry.count(),
      prisma.faculty.count(),
      prisma.course.count(),
      prisma.notice.count({ where: { isPublished: true } }),
      prisma.galleryItem.count(),
      prisma.admissionApplication.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.admissionEnquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, role: true } } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalApplications,
        submittedApps,
        underReviewApps,
        approvedApps,
        totalEnquiries,
        totalFaculty,
        totalCourses,
        totalNotices,
        totalGallery,
      },
      recentApplications,
      recentEnquiries,
      recentAuditLogs,
    });
  } catch (error: any) {
    console.error('Overview metrics error:', error);
    return NextResponse.json({ error: 'Failed to aggregate metrics.' }, { status: 500 });
  }
}
