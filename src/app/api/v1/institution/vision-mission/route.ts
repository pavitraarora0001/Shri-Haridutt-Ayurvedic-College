import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const page = await CmsService.getPageBySlug('vision-mission');
  return NextResponse.json({
    success: true,
    data: {
      title: page?.title || 'Institutional Vision & Mission',
      content: page?.content || 'To be globally recognized as a premier seat of Ayurvedic healthcare, innovative clinical research, and academic excellence rooted in Vedic philosophy.',
      coreValues: [
        'Satya & Dharma in Ayurvedic Therapeutics',
        'Scientific Rigor in Classical Drug Formulation',
        'Holistic Compassion in Patient Care',
        'Preservation & Cultivation of Indigenous Flora',
      ],
    },
  });
}
