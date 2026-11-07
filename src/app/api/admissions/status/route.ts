import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/modules/auth/auth.service';

export async function GET(req: Request) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Anti-enumeration Rate Limiter (Max 10 queries per minute per IP)
    const rateLimit = await AuthService.checkRateLimit(`admissions_status:${clientIp}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many lookup attempts. For privacy protection, please wait ${rateLimit.retryAfterSec || 60} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();
    const appNo = searchParams.get('appNo')?.trim() || searchParams.get('applicationNumber')?.trim();
    const verifier = searchParams.get('verify')?.trim() || searchParams.get('phone')?.trim() || searchParams.get('email')?.trim();

    // 1. Dual-Factor Verification (Recommended Secure Path)
    if (appNo && verifier) {
      const application = await prisma.admissionApplication.findFirst({
        where: {
          applicationNumber: appNo,
          OR: [
            { email: verifier.toLowerCase() },
            { phone: verifier },
            { dob: verifier },
          ],
        },
        include: {
          documents: {
            select: {
              documentType: true,
              isVerified: true,
              createdAt: true,
            },
          },
        },
      });

      if (!application) {
        return NextResponse.json(
          { error: 'No matching application found for this reference number and verification detail.' },
          { status: 404 }
        );
      }

      // Return sanitized public tracking dossier (strictly excluding adminNotes and internal storage keys)
      return NextResponse.json({
        success: true,
        application: {
          applicationNumber: application.applicationNumber,
          fullName: application.fullName,
          courseCode: application.courseCode,
          status: application.status,
          submittedAt: application.createdAt,
          documents: application.documents.map((d) => ({
            documentType: d.documentType,
            status: d.isVerified ? 'VERIFIED' : 'PENDING_VERIFICATION',
          })),
        },
      });
    }

    // 2. Single Parameter Query with Privacy Guard
    if (query) {
      // Check if user entered both in a single box (e.g. "HC-AYUR-2026-0001, 9829044120" or space separated)
      const parts = query.split(/[\s,]+/).filter(Boolean);
      if (parts.length >= 2) {
        const [candidateAppNo, candidateVerifier] = parts;
        const application = await prisma.admissionApplication.findFirst({
          where: {
            OR: [
              { applicationNumber: candidateAppNo },
              { applicationNumber: candidateVerifier },
            ],
            AND: [
              {
                OR: [
                  { email: candidateVerifier.toLowerCase() },
                  { phone: candidateVerifier },
                  { email: candidateAppNo.toLowerCase() },
                  { phone: candidateAppNo },
                ],
              },
            ],
          },
          include: {
            documents: {
              select: {
                documentType: true,
                isVerified: true,
              },
            },
          },
        });

        if (application) {
          return NextResponse.json({
            success: true,
            application: {
              applicationNumber: application.applicationNumber,
              fullName: application.fullName,
              courseCode: application.courseCode,
              status: application.status,
              submittedAt: application.createdAt,
              documents: application.documents.map((d) => ({
                documentType: d.documentType,
                status: d.isVerified ? 'VERIFIED' : 'PENDING_VERIFICATION',
              })),
            },
          });
        }
      }

      // If user provided only an Application Number or only a phone/email, prompt for the secondary credential
      const potentialApp = await prisma.admissionApplication.findFirst({
        where: {
          OR: [
            { applicationNumber: { equals: query } },
            { email: { equals: query.toLowerCase() } },
            { phone: { equals: query } },
          ],
        },
      });

      if (potentialApp) {
        return NextResponse.json(
          {
            error:
              'For student data privacy, application verification requires both your Application Number and registered Mobile/Email.',
            requiresVerification: true,
            applicationNumber: potentialApp.applicationNumber,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'No matching application dossier found for the provided reference.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Please enter your Application Reference Number and registered Mobile or Email.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while retrieving application status.' },
      { status: 500 }
    );
  }
}
