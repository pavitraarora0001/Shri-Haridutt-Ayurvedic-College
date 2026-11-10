import { prisma } from '@/lib/prisma';
import { INSTITUTION_INFO } from '@/lib/data';

export interface InstitutionalSettings {
  name: string;
  shortName: string;
  campusAddress: string;
  contactPhone: string;
  admissionsHelpline: string;
  contactEmail: string;
  admissionsEmail: string;
  infoEmail: string;
  hospitalEmergency: string;
  googleMapsUrl: string;
  socialFacebook: string;
  socialYoutube: string;
  socialInstagram: string;
  announcementBannerText: string;
  admissionsOpen: boolean;
  raw: Record<string, string>;
}

const DEFAULT_ADDRESS =
  '5FR3+37H, near technology park, L. B. Shastri Nagar Colony, Sewar, Bharatpur, Sewar, Rajasthan 321001';

export async function getInstitutionalSettings(): Promise<InstitutionalSettings> {
  try {
    const records = await prisma.websiteSetting.findMany();
    const map: Record<string, string> = {};
    for (const item of records) {
      if (item.value && item.value.trim() !== '') {
        map[item.key] = item.value.trim();
      }
    }

    const campusAddress = map['campus_address'] || DEFAULT_ADDRESS;
    const contactPhone =
      map['contact_phone'] || map['admissions_helpline'] || INSTITUTION_INFO.admissionsHelpline;
    const admissionsHelpline =
      map['admissions_helpline'] || map['contact_phone'] || INSTITUTION_INFO.admissionsHelpline;
    const contactEmail =
      map['contact_email'] || map['admissions_email'] || INSTITUTION_INFO.email;
    const admissionsEmail =
      map['admissions_email'] || map['contact_email'] || INSTITUTION_INFO.email;
    const infoEmail = map['info_email'] || INSTITUTION_INFO.infoEmail;
    const hospitalEmergency =
      map['hospital_emergency_phone'] || INSTITUTION_INFO.hospitalEmergency;

    // Build embed-friendly Google Maps URL if custom query or embed is not specified
    let googleMapsUrl = map['google_maps_url'] || '';
    if (!googleMapsUrl) {
      googleMapsUrl =
        'https://maps.google.com/maps?q=' +
        encodeURIComponent(campusAddress) +
        '&t=&z=14&ie=UTF8&iwloc=&output=embed';
    } else if (!googleMapsUrl.includes('output=embed') && !googleMapsUrl.includes('embed')) {
      googleMapsUrl =
        'https://maps.google.com/maps?q=' +
        encodeURIComponent(googleMapsUrl) +
        '&t=&z=14&ie=UTF8&iwloc=&output=embed';
    }

    return {
      name: map['site.institution_name'] || INSTITUTION_INFO.name,
      shortName: INSTITUTION_INFO.shortName,
      campusAddress,
      contactPhone,
      admissionsHelpline,
      contactEmail,
      admissionsEmail,
      infoEmail,
      hospitalEmergency,
      googleMapsUrl,
      socialFacebook: map['social_facebook'] || '',
      socialYoutube: map['social_youtube'] || '',
      socialInstagram: map['social_instagram'] || '',
      announcementBannerText:
        map['announcement_banner_text'] ||
        'NEET-UG 2026 AYUSH State & All-India Counseling Active',
      admissionsOpen: map['admissions_open'] !== 'false',
      raw: map,
    };
  } catch (error) {
    console.error('Error fetching institutional settings, using robust defaults:', error);
    return {
      name: INSTITUTION_INFO.name,
      shortName: INSTITUTION_INFO.shortName,
      campusAddress: DEFAULT_ADDRESS,
      contactPhone: INSTITUTION_INFO.admissionsHelpline,
      admissionsHelpline: INSTITUTION_INFO.admissionsHelpline,
      contactEmail: INSTITUTION_INFO.email,
      admissionsEmail: INSTITUTION_INFO.email,
      infoEmail: INSTITUTION_INFO.infoEmail,
      hospitalEmergency: INSTITUTION_INFO.hospitalEmergency,
      googleMapsUrl:
        'https://maps.google.com/maps?q=' +
        encodeURIComponent(DEFAULT_ADDRESS) +
        '&t=&z=14&ie=UTF8&iwloc=&output=embed',
      socialFacebook: '',
      socialYoutube: '',
      socialInstagram: '',
      announcementBannerText:
        'NEET-UG 2026 AYUSH State & All-India Counseling Active',
      admissionsOpen: true,
      raw: {},
    };
  }
}
