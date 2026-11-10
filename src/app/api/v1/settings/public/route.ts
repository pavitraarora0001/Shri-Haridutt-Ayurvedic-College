import { NextResponse } from 'next/server';
import { getInstitutionalSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getInstitutionalSettings();
  return NextResponse.json({
    success: true,
    data: {
      ...settings.raw,
      institution_name: settings.name,
      college_name: settings.collegeName,
      hospital_name: settings.hospitalName,
      campus_address: settings.campusAddress,
      city: settings.city,
      district: settings.district,
      state: settings.state,
      pincode: settings.pincode,
      admissions_helpline: settings.admissionsHelpline,
      contact_phone: settings.contactPhone,
      secondary_phone: settings.secondaryPhone,
      hospital_emergency_phone: settings.hospitalEmergency,
      opd_contact_phone: settings.opdContactPhone,
      admissions_email: settings.admissionsEmail,
      contact_email: settings.contactEmail,
      info_email: settings.infoEmail,
      hospital_email: settings.hospitalEmail,
      college_office_timings: settings.collegeOfficeTimings,
      hospital_opd_timings: settings.hospitalOpdTimings,
      hospital_emergency_availability: settings.hospitalEmergencyAvailability,
      google_maps_url: settings.googleMapsUrl,
      google_maps_embed_url: settings.googleMapsEmbedUrl,
      social_facebook: settings.socialFacebook,
      social_instagram: settings.socialInstagram,
      social_youtube: settings.socialYoutube,
      social_linkedin: settings.socialLinkedin,
      social_twitter: settings.socialTwitter,
      social_whatsapp: settings.socialWhatsapp,
      official_website_url: settings.officialWebsiteUrl,
      announcement_banner_text: settings.announcementBannerText,
      admissions_open: String(settings.admissionsOpen),
    },
  });
}
