import { NextResponse } from 'next/server';
import { CmsService } from '@/modules/cms/cms.service';
import { getInstitutionalSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [page, settings] = await Promise.all([
    CmsService.getPageBySlug('institution'),
    getInstitutionalSettings(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      name: settings.name,
      collegeName: settings.collegeName,
      hospitalName: settings.hospitalName,
      sanskritMotto: settings.sanskritMotto,
      mottoMeaning: settings.mottoMeaning,
      established: 2008,
      affiliation: settings.recognitionDetails,
      overview: page?.content || settings.collegeDescription,
      campus: {
        acres: 15,
        hospitalBeds: 100,
        herbalGardenSpecies: 350,
        intakeBAMS: 100,
      },
      address: {
        campus: settings.campusAddress,
        city: settings.city,
        district: settings.district,
        state: settings.state,
        pincode: settings.pincode,
        country: 'India',
        googleMapsUrl: settings.googleMapsUrl,
      },
      contact: {
        admissionsHelpline: settings.admissionsHelpline,
        secondaryPhone: settings.secondaryPhone,
        hospitalEmergency: settings.hospitalEmergency,
        email: settings.contactEmail,
      },
      timings: {
        officeTimings: settings.collegeOfficeTimings,
        hospitalOpdTimings: settings.hospitalOpdTimings,
        hospitalEmergency: settings.hospitalEmergencyAvailability,
      },
    },
  });
}
