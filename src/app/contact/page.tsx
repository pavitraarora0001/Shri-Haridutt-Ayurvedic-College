import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { getInstitutionalSettings, formatPhoneForTel } from '@/lib/settings';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getInstitutionalSettings();

  return (
    <div>
      <PageHeader
        title="Contact Us &amp; Campus Visit"
        subtitle="Institutional Directory &amp; Route Navigation"
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#173D32] text-white p-8 rounded-lg border-2 border-[#C5A46D] shadow-luxury space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                    Campus Secretariat
                  </span>
                  <h2 className="font-serif text-2xl font-bold mt-1">
                    {settings.name}
                  </h2>
                </div>

                <div className="space-y-4 text-xs text-[#F6F2E9]/90">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-serif">Postal Address:</strong>
                      <span className="leading-relaxed">{settings.campusAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-serif">Admissions Helpline:</strong>
                      <a
                        href={`tel:${formatPhoneForTel(settings.admissionsHelpline)}`}
                        className="text-white hover:text-[#DFCA9E] transition-colors block"
                      >
                        {settings.admissionsHelpline}
                      </a>
                      <span className="block text-[#81917A] mt-0.5">
                        Campus EPABX:{' '}
                        <a
                          href={`tel:${formatPhoneForTel(settings.secondaryPhone)}`}
                          className="hover:text-[#DFCA9E] transition-colors"
                        >
                          {settings.secondaryPhone}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <ShieldAlert className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-serif">Hospital 24x7 Casualty &amp; OPD:</strong>
                      <a
                        href={`tel:${formatPhoneForTel(settings.hospitalEmergency)}`}
                        className="text-[#DFCA9E] font-medium hover:underline block"
                      >
                        {settings.hospitalEmergency}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-serif">Electronic Mail:</strong>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="hover:text-[#DFCA9E] transition-colors block"
                      >
                        {settings.contactEmail}
                      </a>
                      <a
                        href={`mailto:${settings.infoEmail}`}
                        className="block text-[#81917A] hover:text-[#DFCA9E] transition-colors"
                      >
                        {settings.infoEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-serif">Administrative Hours:</strong>
                      <span>{settings.collegeOfficeTimings}</span>
                      <span className="block text-[#81917A] mt-0.5">
                        {settings.hospitalEmergencyAvailability} (OPD: {settings.hospitalOpdTimings})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Message Form (7 Cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#173D32]">Campus Geo-Location &amp; Route</h4>
            <div className="w-full h-80 rounded overflow-hidden border border-[#C5A46D]/30 shadow-inner">
              <iframe
                title="Google Maps Campus Directions"
                src={settings.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
