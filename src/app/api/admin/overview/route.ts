import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.type !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const [
      galleryPhotosCount,
      videosCount,
      publishedNewsCount,
      activeNoticesCount,
      documentsCount,
      coursesCount,
      departmentsCount,
      facultyCount,
      testimonialsCount,
      totalApplications,
      totalEnquiries,
      recentPhotos,
      recentNotices,
      recentAuditLogs,
      recentApplications,
    ] = await Promise.all([
      // 1. Photos
      prisma.galleryItem.count({ where: { NOT: { category: 'Video' } } }),
      // 2. Videos
      prisma.galleryItem.count({ where: { category: 'Video' } }),
      // 3. News
      prisma.news.count({ where: { isPublished: true } }),
      // 4. Notices
      prisma.notice.count({ where: { isPublished: true } }),
      // 5. Documents
      prisma.disclosureDocument.count(),
      // 6. Courses
      prisma.course.count(),
      // 7. Departments
      prisma.department.count(),
      // 8. Faculty
      prisma.faculty.count(),
      // 9. Testimonials
      prisma.testimonial.count(),
      // 10. Applications
      prisma.admissionApplication.count(),
      // 11. Enquiries
      prisma.admissionEnquiry.count(),
      // Recent photos
      prisma.galleryItem.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      // Recent notices
      prisma.notice.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      // Recent audit logs
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true, role: true } } },
      }),
      // Recent applications
      prisma.admissionApplication.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        galleryPhotosCount,
        videosCount,
        publishedNewsCount,
        activeNoticesCount,
        documentsCount,
        coursesCount,
        departmentsCount,
        facultyCount,
        testimonialsCount,
        totalApplications,
        totalEnquiries,
      },
      recentPhotos,
      recentNotices,
      recentAuditLogs,
      recentApplications,
      adminUser: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Overview metrics aggregation error:', error);
    return NextResponse.json({ error: 'Failed to aggregate CMS metrics.' }, { status: 500 });
  }
}
