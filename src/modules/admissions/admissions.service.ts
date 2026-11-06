import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export interface CreateEnquiryInput {
  studentName: string;
  parentName?: string;
  mobile: string;
  email: string;
  programme: string;
  previousQualification?: string;
  message?: string;
}

export interface CreateApplicationInput {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  category: string;
  neetRollNo?: string;
  neetScore?: number;
  neetRank?: number;
  previousSchool: string;
  qualification: string;
  marksPercentage: number;
  courseCode?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  documents?: Array<{
    documentType: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    fileSize: number;
    storagePath: string;
  }>;
}

export class AdmissionsService {
  /**
   * Generates sequential institutional application reference numbers
   */
  static generateApplicationNumber(year: number = 2026): string {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `HC-AYUR-${year}-${randomHex}`;
  }

  static generateEnquiryNumber(): string {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `ENQ-2026-${randomHex}`;
  }

  // ==================== ENQUIRIES ====================

  static async createEnquiry(input: CreateEnquiryInput) {
    const enquiryNumber = this.generateEnquiryNumber();
    const enquiry = await prisma.admissionEnquiry.create({
      data: {
        enquiryNumber,
        studentName: input.studentName,
        parentName: input.parentName || 'N/A',
        mobile: input.mobile,
        email: input.email.toLowerCase().trim(),
        programme: input.programme,
        previousQualification: input.previousQualification || '10+2',
        message: input.message || 'Admission inquiry',
        status: 'NEW',
      },
    });

    // Fire acknowledgment email asynchronously
    sendEmail({
      to: enquiry.email,
      subject: `Admissions Enquiry Acknowledged — Shri Haridutt Ayurvedic Medical College [#${enquiry.enquiryNumber}]`,
      template: 'ENQUIRY_ACKNOWLEDGEMENT',
      context: {
        studentName: enquiry.studentName,
        programme: enquiry.programme,
        enquiryNumber: enquiry.enquiryNumber,
      },
    }).catch(console.error);

    return enquiry;
  }

  static async listEnquiries(options: { page?: number; limit?: number; status?: string; search?: string } = {}) {
    const page = options.page || 1;
    const limit = options.limit || 25;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.status) where.status = options.status;
    if (options.search) {
      where.OR = [
        { studentName: { contains: options.search } },
        { email: { contains: options.search } },
        { enquiryNumber: { contains: options.search } },
      ];
    }

    const [total, items] = await Promise.all([
      prisma.admissionEnquiry.count({ where }),
      prisma.admissionEnquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async updateEnquiryStatus(id: string, status: string) {
    return prisma.admissionEnquiry.update({
      where: { id },
      data: { status },
    });
  }

  // ==================== APPLICATIONS ====================

  static async createApplication(input: CreateApplicationInput) {
    const courseCode = input.courseCode || 'BAMS';

    // Duplicate check 1: Same email + course
    const existingCandidate = await prisma.admissionApplication.findFirst({
      where: {
        email: input.email.toLowerCase().trim(),
        courseCode,
      },
    });

    if (existingCandidate) {
      throw new Error(`An admission application for ${input.email} under programme ${courseCode} has already been registered (${existingCandidate.applicationNumber}).`);
    }

    // Duplicate check 2: Same NEET roll number if provided
    if (input.neetRollNo && input.neetRollNo.trim() !== '') {
      const existingRoll = await prisma.admissionApplication.findFirst({
        where: { neetRollNo: input.neetRollNo.trim() },
      });
      if (existingRoll) {
        throw new Error(`An application with NEET Roll Number ${input.neetRollNo} has already been submitted (${existingRoll.applicationNumber}).`);
      }
    }

    const applicationNumber = this.generateApplicationNumber();

    const application = await prisma.admissionApplication.create({
      data: {
        applicationNumber,
        fullName: input.fullName,
        fatherName: input.fatherName,
        motherName: input.motherName,
        dob: input.dob,
        gender: input.gender,
        email: input.email.toLowerCase().trim(),
        phone: input.phone,
        category: input.category,
        neetRollNo: input.neetRollNo || null,
        neetScore: input.neetScore ? Number(input.neetScore) : null,
        neetRank: input.neetRank ? Number(input.neetRank) : null,
        previousSchool: input.previousSchool,
        qualification: input.qualification,
        marksPercentage: Number(input.marksPercentage),
        courseCode,
        address: input.address,
        city: input.city,
        state: input.state,
        pincode: input.pincode,
        status: 'SUBMITTED',
        statusHistory: {
          create: {
            oldStatus: 'NONE',
            newStatus: 'SUBMITTED',
            changedBy: 'Candidate Self-Service',
            remarks: 'Application submitted through institutional web portal.',
          },
        },
        documents: input.documents && input.documents.length > 0 ? {
          create: input.documents.map((doc) => ({
            documentType: doc.documentType,
            fileName: doc.fileName,
            originalName: doc.originalName,
            mimeType: doc.mimeType,
            fileSize: doc.fileSize,
            storagePath: doc.storagePath,
          })),
        } : undefined,
      },
      include: {
        documents: true,
        statusHistory: true,
      },
    });

    // Send confirmation email
    sendEmail({
      to: application.email,
      subject: `Official BAMS Application Confirmation — Shri Haridutt Ayurvedic Medical College [#${application.applicationNumber}]`,
      template: 'APPLICATION_CONFIRMATION',
      context: {
        fullName: application.fullName,
        applicationNumber: application.applicationNumber,
        courseCode: application.courseCode,
      },
    }).catch(console.error);

    return application;
  }

  static async listApplications(options: {
    page?: number;
    limit?: number;
    courseCode?: string;
    status?: string;
    search?: string;
  } = {}) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.courseCode) where.courseCode = options.courseCode;
    if (options.status) where.status = options.status;
    if (options.search) {
      where.OR = [
        { fullName: { contains: options.search } },
        { applicationNumber: { contains: options.search } },
        { email: { contains: options.search } },
        { neetRollNo: { contains: options.search } },
      ];
    }

    const [total, items] = await Promise.all([
      prisma.admissionApplication.count({ where }),
      prisma.admissionApplication.findMany({
        where,
        skip,
        take: limit,
        include: {
          documents: {
            select: {
              id: true,
              documentType: true,
              originalName: true,
              fileSize: true,
              isVerified: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getApplicationById(id: string) {
    return prisma.admissionApplication.findUnique({
      where: { id },
      include: {
        documents: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  static async getApplicationByNumber(applicationNumber: string) {
    return prisma.admissionApplication.findUnique({
      where: { applicationNumber },
      include: {
        documents: {
          select: {
            id: true,
            documentType: true,
            originalName: true,
            fileSize: true,
            isVerified: true,
            createdAt: true,
          },
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  static async updateApplicationStatus(
    id: string,
    newStatus: string,
    changedBy: string = 'Admin Directorate',
    remarks?: string
  ) {
    const application = await prisma.admissionApplication.findUnique({ where: { id } });
    if (!application) throw new Error('Application dossier not found.');

    const oldStatus = application.status;

    const updated = await prisma.admissionApplication.update({
      where: { id },
      data: {
        status: newStatus,
        statusHistory: {
          create: {
            oldStatus,
            newStatus,
            changedBy,
            remarks: remarks || `Status changed from ${oldStatus} to ${newStatus}`,
          },
        },
      },
      include: {
        documents: true,
        statusHistory: true,
      },
    });

    // Notify applicant of status update
    sendEmail({
      to: updated.email,
      subject: `Application Status Updated: ${newStatus} — Shri Haridutt Ayurvedic Medical College [#${updated.applicationNumber}]`,
      template: 'STATUS_UPDATE',
      context: {
        fullName: updated.fullName,
        applicationNumber: updated.applicationNumber,
        status: newStatus,
        remarks: remarks || 'Please log in to your candidate tracking portal for subsequent admission guidelines.',
      },
    }).catch(console.error);

    return updated;
  }

  static async updateAdminNotes(id: string, adminNotes: string) {
    return prisma.admissionApplication.update({
      where: { id },
      data: { adminNotes },
    });
  }
}
