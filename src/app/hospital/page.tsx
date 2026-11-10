import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { 
  Building2, HeartHandshake, Phone, Clock, Stethoscope, 
  Bed, ShieldCheck, Activity, Users, Award, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { getInstitutionalSettings, formatPhoneForTel } from '@/lib/settings';

export const dynamic = 'force-dynamic';

const CLINICAL_DEPARTMENTS = [
  {
    name: 'Department of Kayachikitsa',
    sub: 'Internal Medicine & Chronic Disorders',
    desc: 'Specialized clinical care for metabolic diseases, diabetes (Prameha), arthritis (Amavata), liver disorders, and neuro-muscular conditions.',
    hod: 'Prof. Dr. D. N. Tripathi',
    beds: '30 Beds',
  },
  {
    name: 'Department of Panchakarma',
    sub: 'Classical Bio-Purification & Detoxification',
    desc: 'Equipped with authentic teakwood Droni beds, bronze Shirodhara suites, steam chambers for Vamana, Virechana, Basti, and Nasya.',
    hod: 'Dr. Vaidya Kripashankar Vyas',
    beds: '20 Beds',
  },
  {
    name: 'Department of Shalya Tantra',
    sub: 'Ayurvedic Surgery & Kshara Sutra Cell',
    desc: 'Recognized center of excellence for minimally invasive Kshara Sutra ligation in Fistula-in-Ano, Piles, Pilonidal Sinus, and wound healing.',
    hod: 'Dr. K. L. Meena',
    beds: '15 Beds',
  },
  {
    name: 'Department of Shalakya Tantra',
    sub: 'Ophthalmology & ENT (Netra, Karna, Nasa, Mukha)',
    desc: 'Classical ocular therapies including Tarpana, Aschyotana, and Nasya for diabetic retinopathy, myopia, chronic sinusitis, and hearing loss.',
    hod: 'Dr. O. P. Bhargava',
    beds: '10 Beds',
  },
  {
    name: 'Prasuti Tantra & Stri Roga',
    sub: 'Obstetrics, Gynecology & Antenatal Care',
    desc: 'Dedicated female care sanctum covering Garbha Samskara, Antenatal care, PCOD/PCOS herbal management, and Menopausal health.',
    hod: 'Dr. Sunita Sharma',
    beds: '15 Beds',
  },
  {
    name: 'Kaumarbhritya (Bala Roga)',
    sub: 'Ayurvedic Pediatrics & Neonatology',
    desc: 'Holistic pediatric healthcare, developmental delay therapy, recurrent respiratory infection treatment, and monthly Swarna Prashana drops.',
    hod: 'Dr. Meenakshi Joshi',
    beds: '10 Beds',
  },
];

const CLINICAL_STATISTICS = [
  { label: 'Attached Teaching Beds', value: '100 Beds', sub: 'NCISM Certified Ward Capacity' },
  { label: 'Daily OPD Patient Footfall', value: '350+ Patients', sub: 'Across 8 Out-Patient Chambers' },
  { label: 'Average IPD Occupancy', value: '82.4%', sub: 'Indoor Ward Bed Occupancy Rate' },
  { label: 'Panchakarma Therapies / Month', value: '1,200+ Procedures', sub: 'Shirodhara, Basti & Abhyanga' },
];

export default async function HospitalSanctumPage() {
  const settings = await getInstitutionalSettings();

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="100-Bed Teaching Hospital &amp; Panchakarma Sanctum"
        subtitle={`Compassionate Healing Through Classical Vedic Ayurveda · 8 Specialized Clinical OPDs · ${settings.hospitalEmergencyAvailability}`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Hospital' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Banner Overview Box */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NCISM Mandated 100-Bed Attached Ayurvedic Hospital</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              A Living Sanctuary of Classical Ayurvedic Healing
            </h2>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 font-light leading-relaxed">
              Serving our regional community and training future Vaidyas, our 100-bed clinical hospital combines traditional Ayurvedic treatments, herbal decoction dispensaries, specialized Panchakarma suites, and modern diagnostic laboratories under one unified roof.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <a
              href={`tel:${formatPhoneForTel(settings.hospitalEmergency)}`}
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all"
            >
              <Phone className="w-3.5 h-3.5 mr-2" />
              <span>24x7 Casualty: {settings.hospitalEmergency}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all text-center"
            >
              <span>OPD Timings ({settings.hospitalOpdTimings.split(':')[1]?.trim() || '8 AM – 2 PM'}) &amp; Route Map</span>
            </Link>
          </div>
        </div>

        {/* Clinical Statistics Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINICAL_STATISTICS.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-2">
              <span className="text-xs text-[#81917A] uppercase tracking-wider font-semibold block">{stat.label}</span>
              <span className="font-serif text-3xl font-bold text-[#173D32] block">{stat.value}</span>
              <p className="text-[11px] text-[#342B25]/75 font-light">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Clinical Statistics Statutory Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
          <Activity className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-950">Hospital Facility &amp; Clinical Audit Notice</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed font-light">
              Hospital bed capacity, ward allotments, and outpatient department (OPD) chambers conform to the Minimum Standard Requirements (MSR) prescribed by the National Commission for Indian System of Medicine (NCISM). Operational bed census and monthly clinical audits are documented under Section 6 of institutional Mandatory Disclosures.
            </p>
          </div>
        </div>

        {/* Clinical Departments Grid */}
        <section className="space-y-8">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#C5A46D] text-xs uppercase tracking-widest font-bold block mb-1">
                Specialized Clinical Wards
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
                Clinical Hospital Departments &amp; OPDs
              </h2>
            </div>
            <p className="text-xs text-[#81917A]">
              OPD Timings: Monday to Saturday · 8:30 AM to 2:00 PM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINICAL_DEPARTMENTS.map((dept, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#173D32] bg-[#173D32]/10 px-2.5 py-0.5 rounded text-[10px] uppercase">
                      {dept.beds}
                    </span>
                    <span className="text-[11px] text-[#81917A]">{dept.hod}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">
                      {dept.name}
                    </h3>
                    <p className="text-[11px] text-[#C5A46D] font-medium mt-0.5">{dept.sub}</p>
                  </div>

                  <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                    {dept.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C5A46D]/15 flex items-center justify-between text-xs">
                  <span className="text-[#81917A]">Nominal OPD Ticket: ₹10</span>
                  <Link href="/contact" className="font-semibold text-[#173D32] hover:text-[#C5A46D] flex items-center">
                    <span>Consult Doctor</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialized Facilities & Patient Welfare */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#173D32]">Diagnostic Pathology &amp; ECG</h3>
            <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
              Equipped with fully automated hematology analyzers, biochemistry units, urine micro-analysis, digital X-Ray (300 mA), and ECG for rapid baseline clinical assessment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#173D32]">In-House Ayurvedic Pharmacy</h3>
            <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
              Classical formulations, Kwathas, Tailas, Churnas, and Asava-Arishta prepared freshly according to Sharangadhara Samhita standards, supplied free/subsidized to indoor ward patients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#173D32]">Outreach Camps &amp; Swarna Prashana</h3>
            <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
              Monthly community medical camps in surrounding rural tehsils and free administration of Swarna Bindu Prashana drops to infants on Pushya Nakshatra.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
