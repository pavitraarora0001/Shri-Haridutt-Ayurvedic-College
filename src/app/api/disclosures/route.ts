import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NCISM_DISCLOSURES } from '@/lib/disclosure-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryNumber = searchParams.get('category');
    const academicYear = searchParams.get('year');
    const search = searchParams.get('q')?.toLowerCase();

    // Query from Prisma with fallback to NCISM_DISCLOSURES
    let categories: any[] = [];
    try {
      const dbCategories = await prisma.disclosureCategory.findMany({
        orderBy: { categoryNumber: 'asc' },
        include: {
          records: {
            orderBy: { order: 'asc' },
            include: {
              documents: {
                where: { isPublic: true },
                orderBy: { createdAt: 'desc' }
              }
            }
          },
          documents: {
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (dbCategories && dbCategories.length > 0) {
        categories = dbCategories;
      }
    } catch (dbErr) {
      console.warn('Prisma disclosure fetch failed, using fallback static data:', dbErr);
    }

    if (!categories || categories.length === 0) {
      categories = NCISM_DISCLOSURES as any;
    }

    let filtered = categories;

    if (categoryNumber) {
      const num = parseInt(categoryNumber, 10);
      filtered = filtered.filter((c: any) => c.categoryNumber === num || c.code === categoryNumber);
    }

    if (academicYear && academicYear !== 'ALL') {
      filtered = filtered.map((c: any) => ({
        ...c,
        records: (c.records || []).filter((r: any) => r.academicYear === academicYear),
        documents: (c.documents || []).filter((d: any) => d.academicYear === academicYear)
      }));
    }

    if (search) {
      filtered = filtered.filter((c: any) => {
        const titleMatch = c.title?.toLowerCase().includes(search);
        const descMatch = c.description?.toLowerCase().includes(search);
        const recordMatch = (c.records || []).some(
          (r: any) => r.title?.toLowerCase().includes(search) || r.summary?.toLowerCase().includes(search)
        );
        const docMatch = (c.documents || []).some(
          (d: any) => d.title?.toLowerCase().includes(search) || d.documentCode?.toLowerCase().includes(search)
        );
        return titleMatch || descMatch || recordMatch || docMatch;
      });
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
      regulatoryAuthority: 'National Commission for Indian System of Medicine (NCISM)',
      institution: 'Shri Haridutt Ayurvedic Medical College & Hospital',
      complianceStatus: 'VERIFIED_COMPLIANT'
    });
  } catch (error: any) {
    console.error('Error fetching disclosures:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
