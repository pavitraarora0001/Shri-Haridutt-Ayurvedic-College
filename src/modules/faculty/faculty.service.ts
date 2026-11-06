import prisma from '@/lib/prisma';

export class FacultyService {
  static async listFaculty(options: { departmentId?: string; isLeadership?: boolean; search?: string } = {}) {
    const where: any = { isActive: true };
    if (options.departmentId) where.departmentId = options.departmentId;
    if (options.isLeadership !== undefined) where.isLeadership = options.isLeadership;
    if (options.search) {
      where.OR = [
        { name: { contains: options.search } },
        { designation: { contains: options.search } },
        { specialization: { contains: options.search } },
      ];
    }

    return prisma.faculty.findMany({
      where,
      include: {
        department: {
          select: {
            id: true,
            code: true,
            name: true,
            sanskritName: true,
          },
        },
      },
      orderBy: [{ order: 'asc' }, { experienceYears: 'desc' }],
    });
  }

  static async getFacultyById(id: string) {
    return prisma.faculty.findFirst({
      where: {
        OR: [{ id }, { facultyId: id }],
      },
      include: {
        department: true,
      },
    });
  }

  static async createFaculty(data: {
    facultyId?: string;
    name: string;
    designation: string;
    departmentId?: string;
    qualification: string;
    experienceYears: number;
    specialization: string;
    email: string;
    phone?: string;
    bio: string;
    image: string;
    isHOD?: boolean;
    isLeadership?: boolean;
    order?: number;
  }) {
    const facultyId = data.facultyId || `SHAMC-FAC-${Math.floor(100 + Math.random() * 900)}`;
    return prisma.faculty.create({
      data: {
        facultyId,
        name: data.name,
        designation: data.designation,
        departmentId: data.departmentId || null,
        qualification: data.qualification,
        experienceYears: Number(data.experienceYears),
        specialization: data.specialization,
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        bio: data.bio,
        image: data.image,
        isHOD: Boolean(data.isHOD),
        isLeadership: Boolean(data.isLeadership),
        order: data.order ? Number(data.order) : 0,
        isActive: true,
      },
    });
  }

  static async updateFaculty(id: string, data: Partial<{
    name: string;
    designation: string;
    departmentId: string | null;
    qualification: string;
    experienceYears: number;
    specialization: string;
    email: string;
    phone: string;
    bio: string;
    image: string;
    isHOD: boolean;
    isLeadership: boolean;
    order: number;
    isActive: boolean;
  }>) {
    return prisma.faculty.update({
      where: { id },
      data,
    });
  }

  static async deleteFaculty(id: string) {
    return prisma.faculty.delete({
      where: { id },
    });
  }
}
