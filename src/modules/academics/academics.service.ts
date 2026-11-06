import prisma from '@/lib/prisma';

export class AcademicsService {
  // ==================== COURSES ====================

  static async listCourses(options: { approvedOnly?: boolean } = {}) {
    const where: any = {};
    if (options.approvedOnly) {
      where.isApproved = true;
    }
    return prisma.course.findMany({
      where,
      include: {
        documents: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async getCourseByCode(code: string) {
    return prisma.course.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        documents: true,
      },
    });
  }

  static async createCourse(data: {
    code: string;
    title: string;
    degree: string;
    duration: string;
    intake: number;
    eligibility: string;
    description: string;
    syllabusOverview: string;
    careerOpportunities: string;
    feePerYear: string;
    approvalBody?: string;
  }) {
    return prisma.course.create({
      data: {
        code: data.code.toUpperCase().trim(),
        title: data.title,
        degree: data.degree,
        duration: data.duration,
        intake: Number(data.intake),
        eligibility: data.eligibility,
        description: data.description,
        syllabusOverview: data.syllabusOverview,
        careerOpportunities: data.careerOpportunities,
        feePerYear: data.feePerYear,
        approvalBody: data.approvalBody || 'NCISM & Ministry of AYUSH, Govt. of India',
        isApproved: true,
      },
    });
  }

  static async updateCourse(id: string, data: Partial<{
    title: string;
    degree: string;
    duration: string;
    intake: number;
    eligibility: string;
    description: string;
    syllabusOverview: string;
    careerOpportunities: string;
    feePerYear: string;
    isApproved: boolean;
  }>) {
    return prisma.course.update({
      where: { id },
      data,
    });
  }

  static async deleteCourse(id: string) {
    return prisma.course.delete({
      where: { id },
    });
  }

  // ==================== DEPARTMENTS ====================

  static async listDepartments() {
    return prisma.department.findMany({
      include: {
        faculties: {
          select: {
            id: true,
            facultyId: true,
            name: true,
            designation: true,
            qualification: true,
            specialization: true,
            image: true,
            isHOD: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  static async getDepartmentByCode(code: string) {
    return prisma.department.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        faculties: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // ==================== CALENDAR & RESOURCES ====================

  static async listAcademicCalendar() {
    return prisma.academicCalendarEvent.findMany({
      orderBy: { startDate: 'asc' },
    });
  }

  static async listStudentResources(courseCode?: string) {
    const where: any = { isPublished: true };
    if (courseCode) where.courseCode = courseCode.toUpperCase();
    return prisma.studentResource.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }
}
