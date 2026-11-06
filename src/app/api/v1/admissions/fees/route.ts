import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      academicYear: '2026–27',
      feeRegulationBody: 'State Fee Regulatory Committee & NCISM Guidelines',
      feeBreakdown: [
        {
          course: 'BAMS (Ayurvedacharya)',
          tuitionFeePerYear: '₹2,25,000',
          cautionMoneyRefundable: '₹25,000 (one-time)',
          libraryAndLaboratoryFee: '₹15,000 / Year',
          hostelFeeOptional: '₹60,000 / Year (Mess included)',
        },
        {
          course: 'M.D. (Ayurveda - Kayachikitsa)',
          tuitionFeePerYear: '₹3,50,000',
          cautionMoneyRefundable: '₹30,000 (one-time)',
          clinicalTrainingFee: '₹20,000 / Year',
          stipendPayable: '₹35,000 - ₹45,000 / Month (as per NCISM Norms)',
        },
        {
          course: 'Certificate in Panchakarma',
          tuitionFeePerYear: '₹65,000',
          cautionMoneyRefundable: '₹5,000 (one-time)',
          practicalKitFee: '₹5,000',
        },
      ],
      paymentOptions: [
        'Demand Draft in favor of Shri Haridutt Ayurvedic Medical College',
        'Direct RTGS / NEFT to College Account',
        'Online Net Banking through Candidate Portal',
      ],
    },
  });
}
