import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const page = await CmsService.getPageBySlug('institution');
  return NextResponse.json({
    success: true,
    data: {
      name: 'Shri Haridutt Ayurvedic Medical College & Hospital',
      sanskritMotto: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः',
      established: 2008,
      affiliation: 'National Commission for Indian System of Medicine (NCISM) & Ministry of AYUSH, Govt. of India',
      overview: page?.content || 'Premier seat of Vedic medical education and clinical research in Northern India.',
      campus: {
        acres: 15,
        hospitalBeds: 100,
        herbalGardenSpecies: 350,
        intakeBAMS: 100,
      },
      address: {
        campus: 'Shri Haridutt Campus, Institutional Area, Rajasthan',
        pincode: '302001',
        country: 'India',
      },
    },
  });
}
