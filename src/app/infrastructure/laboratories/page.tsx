import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { FlaskConical, Microscope, Eye, ShieldCheck } from 'lucide-react';

export default function LaboratoriesPage() {
  const labs = [
    {
      name: 'Sharir Rachana Dissection Hall & Anatomical Museum',
      dept: 'Sharir Rachana (Anatomy)',
      desc: 'Equipped with cold-storage cadaveric tanks, stainless dissection tables, 120+ mounted wet organ jars, articulated human skeletons, and specialized Marma Sharir topographical charts.',
    },
    {
      name: 'Physiology & Clinical Hematology Laboratory',
      dept: 'Sharir Kriya (Physiology)',
      desc: 'Binocular oil-immersion microscopes, Neubauer hemocytometers, ESR Westergren tubes, hemoglobinometers, spirometers, and electro-cardiogram (ECG) recording setups.',
    },
    {
      name: 'Rasa Shastra & Bhaishajya Kalpana Pilot Pharmacy',
      dept: 'Pharmaceutics & Alchemy',
      desc: 'Heavy-duty disintegrators, pulverizers, stainless Khalwa Yantras, muffle furnaces (Bhatti) for Puta calcination, oil extractors, and tablet punching machines compliant with Schedule-T GMP guidelines.',
    },
    {
      name: 'Pharmacognosy & Dry Herbarium Museum',
      dept: 'Dravyaguna Vijnana',
      desc: 'Houses 400+ crude botanical root, bark, fruit, and mineral samples with microtomes, polarimeters, and chemical reagents for phytochemical screening and TLC chromatography.',
    },
    {
      name: 'Clinical Pathology, Biochemistry & Microbiology Unit',
      dept: 'Roga Nidan & Hospital Lab',
      desc: 'Semi-automated biochemistry analyzers, electrolyte meters, urine test analyzers, centrifugation units, and autoclave sterilization validating modern diagnostic markers.',
    },
    {
      name: 'Modern High-Speed Computer & ICT Laboratory',
      dept: 'Digital Technology & E-Learning',
      desc: 'Workstations with high-speed fiber-optic internet, DELNET library repository terminal access, statistical data processing software, and digital Ayurvedic Samhita archives.',
    },
    {
      name: 'Smart Audiovisual Recording Studio & ICT Lecture Theatre',
      dept: 'Pedagogy & Educational Technology',
      desc: 'Acoustically insulated studio equipped with high-definition lecture capture cameras, interactive smartboards, and live streaming capabilities for online clinical demonstrations.',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Ayurvedic Medical Laboratories"
        subtitle="Experimental Science Meets Classical Pharmacy"
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: 'Laboratories' }]}
        bgImage="/images/ayurveda/medicine-preparation/stone-mortar-pestle-leaves.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Practical Competency
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              Equipped for Anatomical, Physiological & Alchemical Mastery
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light leading-relaxed">
              Every department maintains specialized laboratory apparatus adhering strictly to NCISM MSR statutory specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labs.map((lab, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#C5A46D]">
                      Lab #{String(i + 1).padStart(2, '0')}
                    </span>
                    <FlaskConical className="w-5 h-5 text-[#173D32]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#173D32] mb-1 leading-snug">
                    {lab.name}
                  </h3>
                  <p className="text-[11px] text-[#81917A] uppercase tracking-wider font-semibold mb-3">
                    {lab.dept}
                  </p>
                  <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                    {lab.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C5A46D]/20 text-[11px] text-[#173D32] font-semibold flex items-center justify-between">
                  <span>NCISM Inspected & Certified</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
