import { prisma } from '@/lib/prisma';
import { INSTITUTION_INFO } from '@/lib/data';

export interface InstitutionalSettings {
  // A. Institutional Information
  name: string;
  collegeName: string;
  hospitalName: string;
  shortName: string;
  legalEntityName: string;
  collegeDescription: string;
  hospitalDescription: string;
  logoUrl: string;
  tagline: string;
  sanskritMotto: string;
  mottoMeaning: string;
  recognitionDetails: string;

  // B. Address Information
  campusAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  latitude: string;
  longitude: string;

  // C. Contact Information
  admissionsHelpline: string;
  secondaryPhone: string;
  contactPhone: string;
  hospitalEmergency: string;
  opdContactPhone: string;
  admissionsEmail: string;
  contactEmail: string;
  infoEmail: string;
  hospitalEmail: string;

  // D. Operational Information
  collegeOfficeTimings: string;
  admissionsOfficeTimings: string;
  hospitalOpdTimings: string;
  hospitalEmergencyAvailability: string;
  weeklyWorkingDays: string;
  holidayInfo: string;

  // E. Digital Presence
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialYoutube: string;
  socialTwitter: string;
  socialWhatsapp: string;
  officialWebsiteUrl: string;

  // F. Announcements
  announcementBannerText: string;
  announcementVisible: boolean;
  announcementLink: string;
  announcementPriority: string;
  admissionsOpen: boolean;

  // Raw mapping
  raw: Record<string, string>;
}

export const DEFAULT_CAMPUS_ADDRESS =
  '5FR3+37H, near technology park, L. B. Shastri Nagar Colony, Sewar, Bharatpur, Sewar, Rajasthan 321001';
export const DEFAULT_CITY = 'Bharatpur';
export const DEFAULT_DISTRICT = 'Bharatpur';
export const DEFAULT_STATE = 'Rajasthan';
export const DEFAULT_PINCODE = '321001';
export const DEFAULT_ADMISSIONS_HELPLINE = '+91 98290 44120';
export const DEFAULT_SECONDARY_PHONE = '+91 (01464) 224589';
export const DEFAULT_HOSPITAL_EMERGENCY = '+91 94140 33815';
export const DEFAULT_OPD_PHONE = '+91 98290 44121';
export const DEFAULT_ADMISSIONS_EMAIL = 'admissions@hariduttayurveda.edu.in';
export const DEFAULT_INFO_EMAIL = 'info@hariduttayurveda.edu.in';
export const DEFAULT_HOSPITAL_EMAIL = 'hospital.ms@hariduttayurveda.edu.in';
export const DEFAULT_OFFICE_TIMINGS = 'Monday to Saturday: 9:00 AM – 5:00 PM';
export const DEFAULT_HOSPITAL_OPD_TIMINGS = 'Monday to Saturday: 8:00 AM – 2:00 PM';
export const DEFAULT_HOSPITAL_EMERGENCY_AVAILABILITY = '24x7 Round the Clock (365 Days Open)';
export const DEFAULT_WORKING_DAYS = 'Monday to Saturday (Emergency Open 24x7)';
export const DEFAULT_MAP_EMBED_URL =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(DEFAULT_CAMPUS_ADDRESS) +
  '&t=&z=14&ie=UTF8&iwloc=&output=embed';

/**
 * Strips non-numeric characters for tel: links
 */
export function formatPhoneForTel(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^0-9+]/g, '');
}

/**
 * Formats WhatsApp link
 */
export function formatWhatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (!digits) return '';
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Generates or normalizes a safe Google Maps embed iframe URL
 */
export function buildGoogleMapsEmbed(queryOrUrl: string): string {
  if (!queryOrUrl || queryOrUrl.trim() === '') {
    return DEFAULT_MAP_EMBED_URL;
  }
  const clean = queryOrUrl.trim();
  if (clean.includes('output=embed') || clean.includes('/embed')) {
    return clean;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(clean)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Centralized strongly typed institutional settings getter
 */
export async function getInstitutionalSettings(): Promise<InstitutionalSettings> {
  try {
    const records = await prisma.websiteSetting.findMany();
    const map: Record<string, string> = {};
    for (const item of records) {
      if (item.value && item.value.trim() !== '') {
        map[item.key] = item.value.trim();
      }
    }

    const campusAddress = map['campus_address'] || DEFAULT_CAMPUS_ADDRESS;
    const city = map['city'] || DEFAULT_CITY;
    const district = map['district'] || DEFAULT_DISTRICT;
    const state = map['state'] || DEFAULT_STATE;
    const pincode = map['pincode'] || DEFAULT_PINCODE;

    const admissionsHelpline =
      map['admissions_helpline'] || map['contact_phone'] || DEFAULT_ADMISSIONS_HELPLINE;
    const contactPhone =
      map['contact_phone'] || map['admissions_helpline'] || DEFAULT_ADMISSIONS_HELPLINE;
    const secondaryPhone = map['secondary_phone'] || DEFAULT_SECONDARY_PHONE;
    const hospitalEmergency =
      map['hospital_emergency_phone'] || DEFAULT_HOSPITAL_EMERGENCY;
    const opdContactPhone = map['opd_contact_phone'] || DEFAULT_OPD_PHONE;

    const admissionsEmail =
      map['admissions_email'] || map['contact_email'] || DEFAULT_ADMISSIONS_EMAIL;
    const contactEmail =
      map['contact_email'] || map['admissions_email'] || DEFAULT_ADMISSIONS_EMAIL;
    const infoEmail = map['info_email'] || DEFAULT_INFO_EMAIL;
    const hospitalEmail = map['hospital_email'] || DEFAULT_HOSPITAL_EMAIL;

    const collegeOfficeTimings = map['college_office_timings'] || DEFAULT_OFFICE_TIMINGS;
    const admissionsOfficeTimings =
      map['admissions_office_timings'] || collegeOfficeTimings;
    const hospitalOpdTimings =
      map['hospital_opd_timings'] || DEFAULT_HOSPITAL_OPD_TIMINGS;
    const hospitalEmergencyAvailability =
      map['hospital_emergency_availability'] || DEFAULT_HOSPITAL_EMERGENCY_AVAILABILITY;
    const weeklyWorkingDays = map['weekly_working_days'] || DEFAULT_WORKING_DAYS;
    const holidayInfo = map['holiday_info'] || 'Gazetted Holidays Observed';

    const googleMapsEmbedUrl = buildGoogleMapsEmbed(
      map['google_maps_url'] || campusAddress
    );

    const institutionName = map['site.institution_name'] || INSTITUTION_INFO.name;
    const hospitalName =
      map['site.hospital_name'] || 'Shri Haridutt Ayurvedic Hospital (100-Bed Teaching Hospital)';

    return {
      name: institutionName,
      collegeName: institutionName,
      hospitalName,
      shortName: INSTITUTION_INFO.shortName,
      legalEntityName:
        map['site.legal_entity_name'] ||
        'Shri Haridutt Ayurvedic Medical College and Research Society',
      collegeDescription:
        map['site.college_description'] || INSTITUTION_INFO.subTagline,
      hospitalDescription:
        map['site.hospital_description'] ||
        '100-Bed Attached Teaching Hospital conforming to NCISM Minimum Standard Requirements.',
      logoUrl: map['site.logo_url'] || '/logo.png',
      tagline: map['site.tagline'] || INSTITUTION_INFO.tagline,
      sanskritMotto: map['site.sanskrit_motto'] || INSTITUTION_INFO.sanskritMotto,
      mottoMeaning: map['site.motto_meaning'] || INSTITUTION_INFO.mottoMeaning,
      recognitionDetails:
        map['site.recognition_details'] || INSTITUTION_INFO.approvals,

      campusAddress,
      city,
      district,
      state,
      pincode,
      googleMapsUrl: map['google_maps_url'] || googleMapsEmbedUrl,
      googleMapsEmbedUrl,
      latitude: map['latitude'] || '27.2152',
      longitude: map['longitude'] || '77.4930',

      admissionsHelpline,
      secondaryPhone,
      contactPhone,
      hospitalEmergency,
      opdContactPhone,
      admissionsEmail,
      contactEmail,
      infoEmail,
      hospitalEmail,

      collegeOfficeTimings,
      admissionsOfficeTimings,
      hospitalOpdTimings,
      hospitalEmergencyAvailability,
      weeklyWorkingDays,
      holidayInfo,

      socialFacebook: map['social_facebook'] || '',
      socialInstagram: map['social_instagram'] || '',
      socialLinkedin: map['social_linkedin'] || '',
      socialYoutube: map['social_youtube'] || '',
      socialTwitter: map['social_twitter'] || '',
      socialWhatsapp: map['social_whatsapp'] || admissionsHelpline,
      officialWebsiteUrl:
        map['official_website_url'] ||
        map['site.website'] ||
        'https://www.shrihariduttayurvediccollege.org',

      announcementBannerText:
        map['announcement_banner_text'] ||
        'NEET-UG 2026 AYUSH State & All-India Counseling Active',
      announcementVisible: map['announcement_visible'] !== 'false',
      announcementLink: map['announcement_link'] || '/admissions/apply',
      announcementPriority: map['announcement_priority'] || 'NORMAL',
      admissionsOpen: map['admissions_open'] !== 'false',

      raw: map,
    };
  } catch (error) {
    console.error('Error in getInstitutionalSettings, returning robust defaults:', error);
    return {
      name: INSTITUTION_INFO.name,
      collegeName: INSTITUTION_INFO.name,
      hospitalName: 'Shri Haridutt Ayurvedic Hospital (100-Bed Teaching Hospital)',
      shortName: INSTITUTION_INFO.shortName,
      legalEntityName: 'Shri Haridutt Ayurvedic Medical College and Research Society',
      collegeDescription: INSTITUTION_INFO.subTagline,
      hospitalDescription:
        '100-Bed Attached Teaching Hospital conforming to NCISM Minimum Standard Requirements.',
      logoUrl: '/logo.png',
      tagline: INSTITUTION_INFO.tagline,
      sanskritMotto: INSTITUTION_INFO.sanskritMotto,
      mottoMeaning: INSTITUTION_INFO.mottoMeaning,
      recognitionDetails: INSTITUTION_INFO.approvals,

      campusAddress: DEFAULT_CAMPUS_ADDRESS,
      city: DEFAULT_CITY,
      district: DEFAULT_DISTRICT,
      state: DEFAULT_STATE,
      pincode: DEFAULT_PINCODE,
      googleMapsUrl: DEFAULT_MAP_EMBED_URL,
      googleMapsEmbedUrl: DEFAULT_MAP_EMBED_URL,
      latitude: '27.2152',
      longitude: '77.4930',

      admissionsHelpline: DEFAULT_ADMISSIONS_HELPLINE,
      secondaryPhone: DEFAULT_SECONDARY_PHONE,
      contactPhone: DEFAULT_ADMISSIONS_HELPLINE,
      hospitalEmergency: DEFAULT_HOSPITAL_EMERGENCY,
      opdContactPhone: DEFAULT_OPD_PHONE,
      admissionsEmail: DEFAULT_ADMISSIONS_EMAIL,
      contactEmail: DEFAULT_ADMISSIONS_EMAIL,
      infoEmail: DEFAULT_INFO_EMAIL,
      hospitalEmail: DEFAULT_HOSPITAL_EMAIL,

      collegeOfficeTimings: DEFAULT_OFFICE_TIMINGS,
      admissionsOfficeTimings: DEFAULT_OFFICE_TIMINGS,
      hospitalOpdTimings: DEFAULT_HOSPITAL_OPD_TIMINGS,
      hospitalEmergencyAvailability: DEFAULT_HOSPITAL_EMERGENCY_AVAILABILITY,
      weeklyWorkingDays: DEFAULT_WORKING_DAYS,
      holidayInfo: 'Gazetted Holidays Observed',

      socialFacebook: '',
      socialInstagram: '',
      socialLinkedin: '',
      socialYoutube: '',
      socialTwitter: '',
      socialWhatsapp: DEFAULT_ADMISSIONS_HELPLINE,
      officialWebsiteUrl: 'https://www.shrihariduttayurvediccollege.org',

      announcementBannerText: 'NEET-UG 2026 AYUSH State & All-India Counseling Active',
      announcementVisible: true,
      announcementLink: '/admissions/apply',
      announcementPriority: 'NORMAL',
      admissionsOpen: true,

      raw: {},
    };
  }
}
