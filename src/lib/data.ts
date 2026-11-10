import { CourseItem, DepartmentItem, FacultyItem, HerbalPlantItem, NoticeItem, NewsEventItem, FacilityItem } from './types';

export const INSTITUTION_INFO = {
  name: "Shri Haridutt Ayurvedic Medical College & Hospital",
  shortName: "SHAMC",
  sanskritMotto: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
  mottoMeaning: "May all be prosperous and happy, may all be free from illness.",
  tagline: "Where Ancient Wisdom Meets Modern Healthcare",
  subTagline: "Discover the science of Ayurveda. Build a future rooted in knowledge, compassion and holistic healing.",
  approvals: "Recognised by NCISM, Ministry of AYUSH, Govt. of India & Affiliated to State AYUSH University",
  address: "5FR3+37H, near technology park, L. B. Shastri Nagar Colony, Sewar, Bharatpur, Sewar, Rajasthan 321001, India",
  phone: "+91 (01464) 224589, +91 94140 33812",
  email: "admissions@hariduttayurveda.edu.in",
  infoEmail: "info@hariduttayurveda.edu.in",
  hospitalEmergency: "+91 94140 33815 (24x7 Casualty & Panchakarma OPD)",
  admissionsHelpline: "+91 98290 44120",
  website: "https://hariduttayurveda.edu.in",
  establishedYear: "2008",
  stats: {
    yearsOfExcellence: "18+",
    qualifiedFaculty: "48+",
    hospitalBeds: "100+",
    herbalGardenSpecies: "350+",
    graduatedVaidyas: "1,250+",
    annualOpdPatients: "45,000+",
    specializedLabs: "14",
    neetSeats: "100",
  }
};

export const COURSES: CourseItem[] = [
  {
    id: "c1",
    code: "BAMS",
    title: "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
    degree: "Undergraduate (Professional Medical Degree)",
    duration: "5.5 Years (4.5 Years Academic + 1 Year Compulsory Rotatory Internship)",
    intake: 100,
    eligibility: "Passed 10+2 with Physics, Chemistry, Biology & English with minimum 50% aggregate (40% for reserved categories) and qualified in NEET-UG 2026.",
    description: "The flagship professional degree program integrating classical Ayurvedic Samhitas (Charaka, Sushruta, Vagbhata) with modern medical diagnostics, pathology, pharmacology, and surgical principles. Students receive comprehensive bedside clinical exposure at our 100-bed attached hospital.",
    syllabusOverview: "Phase 1: Padartha Vijnana, Sharir Rachana (Anatomy), Sharir Kriya (Physiology), Sanskrit & Samhita Adhyayan. Phase 2: Dravyaguna Vijnana (Pharmacology), Rasa Shastra & Bhaishajya Kalpana (Pharmaceutics), Roga Nidan (Pathology), Charaka Samhita Purvardha. Phase 3: Agada Tantra (Toxicology), Swasthavritta & Yoga, Prasuti Tantra & Stri Roga, Kaumarbhritya (Pediatrics), Charaka Uttarardha. Phase 4: Kayachikitsa (Internal Medicine), Shalya Tantra (Surgery), Shalakya Tantra (ENT/Ophthalmology), Panchakarma. 1 Year: Rotatory Clinical Internship across OPD, IPD, Casualty, and Rural Health Centers.",
    careerOpportunities: "Ayurvedic Physician (Vaidya), Hospital Medical Officer (AMO), Panchakarma Specialist, Research Scientist in CCRAS/ICMR, Ayurvedic Pharmaceutical Formulation Developer, Global Wellness Consultant, Post-Graduate MD/MS Academician.",
    feePerYear: "₹2,25,000 / Year (Approved as per State Fee Regulatory Committee norms)",
    isApproved: true,
    approvalBody: "National Commission for Indian System of Medicine (NCISM), New Delhi & Ministry of AYUSH, Govt. of India",
    image: "/images/ayurveda/courses/bams-ayurvedic-medicine.webp"
  },
  {
    id: "c2",
    code: "MD-KAYACHIKITSA",
    title: "M.D. (Ayurveda) in Kayachikitsa (Internal Medicine)",
    degree: "Postgraduate Medical Degree",
    duration: "3 Years Full-time Residency",
    intake: 12,
    eligibility: "Recognised BAMS degree from an NCISM/CCIM approved college and valid qualifying score in AIAPGET (All India AYUSH Post Graduate Entrance Test).",
    description: "Advanced post-graduate residency focusing on chronic metabolic disorders, autoimmune diseases, neuromuscular conditions, and clinical research methodologies in classical Ayurvedic therapeutics.",
    syllabusOverview: "Year 1: Research Methodology & Medical Statistics, Fundamentals of Kayachikitsa, bedside clinical training. Year 2: Specialty disease management (Madhumeha, Amavata, Sandhivata, Liver & GI disorders), Dissertation thesis work. Year 3: Advanced clinical practice, emergency Ayurvedic management, final clinical examinations.",
    careerOpportunities: "Senior Consultant Vaidya, Assistant Professor / Reader in Ayurvedic Colleges, Principal Investigator in Clinical Trials, Clinical Specialist.",
    feePerYear: "₹3,50,000 / Year",
    isApproved: true,
    approvalBody: "NCISM & Ministry of AYUSH, New Delhi",
    image: "/images/ayurveda/courses/md-kayachikitsa-internal-medicine.webp"
  },
  {
    id: "c3",
    code: "CERT-PANCHAKARMA",
    title: "Certificate Course in Panchakarma & Ayurvedic Nursing",
    degree: "Paramedical / Continuing Education Certificate",
    duration: "1 Year (Hands-on Clinical Training)",
    intake: 30,
    eligibility: "Passed 10+2 in any stream (Science preferred) or Diploma in Nursing.",
    description: "A practical vocational and clinical program dedicated to mastering authentic detoxification therapies: Vamana, Virechana, Basti, Nasya, Raktamokshana, Shirodhara, Abhyanga, and rehabilitation.",
    syllabusOverview: "Theory of Doshas, Purvakarma (Snehana & Swedana), Pradhanakarma (Five purification therapies), Paschatkarma (Dietary and lifestyle rehabilitation), Clinical practicals in Panchakarma theatre.",
    careerOpportunities: "Certified Panchakarma Therapist, Wellness Clinic Supervisor, Ayurvedic Resort Therapist (India & Abroad), Hospital Panchakarma Attendant.",
    feePerYear: "₹65,000 / Year",
    isApproved: true,
    approvalBody: "Institutional Board & State Paramedical Council Affiliated",
    image: "/images/ayurveda/courses/panchakarma-therapy-nursing.webp"
  }
];

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: "dept-1",
    code: "SAMHITA",
    name: "Samhita & Sanskrit Siddhanta",
    sanskritName: "संहिता एवं सिद्धान्त विभाग",
    description: "The foundational bedrock of Ayurveda dealing with the philosophical, conceptual, and linguistic study of ancient medical treatises including Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya.",
    headOfDepartment: "Prof. (Dr.) Acharya Vachaspati Shastri, MD (Ayur), Ph.D.",
    facultyCount: 5,
    labs: "Classical Manuscript Reading Hall & Philosophical Seminar Room",
    image: "/images/ayurveda/manuscripts/ancient-ayurveda-manuscript.webp"
  },
  {
    id: "dept-2",
    code: "RACHANA",
    name: "Sharir Rachana (Human Anatomy)",
    sanskritName: "शारीर रचना विभाग",
    description: "Combines classical Ayurvedic structural concepts (Marma, Srotas, Asthi, Sandhi) with modern human anatomy, cadaveric dissection, and osteology models.",
    headOfDepartment: "Dr. Arvind Kumar Sharma, MD (Ayurveda - Sharir Rachana)",
    facultyCount: 4,
    labs: "State-of-the-art Cadaveric Dissection Hall, Museum with 120+ wet specimens & 40+ models",
    image: "/images/ayurveda/research/botanical-herbarium-specimen.webp"
  },
  {
    id: "dept-3",
    code: "KRIYA",
    name: "Sharir Kriya (Human Physiology)",
    sanskritName: "शारीर क्रिया विभाग",
    description: "Explores functional aspects of human biology through Tridosha (Vata, Pitta, Kapha), Sapta Dhatus, Ojas, Agni, and modern hematological & physiological testing.",
    headOfDepartment: "Dr. Meenakshi Pathak, MD (Ayur - Sharir Kriya)",
    facultyCount: 4,
    labs: "Equipped Physiology Lab with microscopes, spirometers, hemocytometers and ECG monitors",
    image: "/images/ayurveda/research/phytochemical-extract-analysis.webp"
  },
  {
    id: "dept-4",
    code: "DRAVYAGUNA",
    name: "Dravyaguna Vijnana (Materia Medica & Pharmacology)",
    sanskritName: "द्रव्यगुण विज्ञान विभाग",
    description: "Comprehensive study of medicinal herbs, mineral origins, identification, pharmacodynamics, Rasa-Panchaka (Rasa, Guna, Virya, Vipaka, Prabhava), and cultivation techniques.",
    headOfDepartment: "Prof. (Dr.) Ramakant Dwivedi, MD (Ayur - Dravyaguna), Ph.D.",
    facultyCount: 5,
    labs: "Pharmacognosy Lab, Dry Herbarium Museum with 400+ crude drug samples & attached 5-Acre Charak Vatika",
    image: "/images/ayurveda/medicine-preparation/ayurvedic-herbal-materia-medica.webp"
  },
  {
    id: "dept-5",
    code: "RASA-SHASTRA",
    name: "Rasa Shastra & Bhaishajya Kalpana (Pharmaceutics)",
    sanskritName: "रसशास्त्र एवं भैषज्य कल्पना विभाग",
    description: "The science of Ayurvedic drug manufacturing, alchemy, purification of minerals (Shodhana), calcination (Marana), and classical dosage forms (Asava, Arishta, Taila, Ghrita, Vati, Churna).",
    headOfDepartment: "Dr. Shrikant Upadhyay, MD (Ayur - Rasa Shastra)",
    facultyCount: 4,
    labs: "Working Pilot Pharmacy with automated pulverizers, muffle furnaces, distilling units & quality testing unit",
    image: "/images/ayurveda/medicine-preparation/ayurvedic-medicine-roots-herbs.webp"
  },
  {
    id: "dept-6",
    code: "ROGA-NIDAN",
    name: "Roga Nidan & Vikriti Vijnana (Diagnostics & Pathology)",
    sanskritName: "रोग निदान एवं विकृति विज्ञान विभाग",
    description: "Diagnosis of ailments through classical Ashta-Vidha Pariksha (Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Druk, Akriti) harmonized with modern clinical biochemistry, hematology, and imaging.",
    headOfDepartment: "Dr. Rajeshwar Prasad Joshi, MD (Ayur - Roga Nidan)",
    facultyCount: 4,
    labs: "NABL-calibrated Clinical Pathology Lab with auto-analyzers, urine chemistry & microbiology section",
    image: "/images/ayurveda/research/ayurvedic-pharmacognosy-lab.webp"
  },
  {
    id: "dept-7",
    code: "SWASTHAVRITTA",
    name: "Swasthavritta & Yoga (Preventive Medicine)",
    sanskritName: "स्वस्थवृत्त एवं योग विभाग",
    description: "Promoting disease prevention, seasonal regimens (Ritucharya), daily routines (Dinacharya), Rasayana revitalization, and therapeutic Yogasanas & Pranayama.",
    headOfDepartment: "Dr. Suman Lata Sharma, MD (Ayur - Swasthavritta), PGDY",
    facultyCount: 3,
    labs: "Yoga & Meditation Pavilion, Naturopathy hydrotherapy & dietetics demonstration kitchen",
    image: "/images/ayurveda/botanical-gardens/medicinal-plant-sanctuary.webp"
  },
  {
    id: "dept-8",
    code: "AGAD-TANTRA",
    name: "Agad Tantra & Vidhi Vaidyaka (Toxicology & Jurisprudence)",
    sanskritName: "अगद तन्त्र एवं विधि वैद्यक विभाग",
    description: "Study of animal, mineral, and vegetable poisons, forensic medicine, medical ethics, medical negligence laws, and statutory duties of registered practitioners.",
    headOfDepartment: "Dr. Alok Chandra Dixit, MD (Ayur - Agad Tantra)",
    facultyCount: 3,
    labs: "Forensic Museum with venomous snake models, post-mortem charts, toxic botanical specimens",
    image: "/images/ayurveda/herbs/neem-medicinal-leaves.webp"
  },
  {
    id: "dept-9",
    code: "PRASUTI-STRI",
    name: "Prasuti Tantra & Stri Roga (Obstetrics & Gynecology)",
    sanskritName: "प्रसूति तन्त्र एवं स्त्री रोग विभाग",
    description: "Ayurvedic management of women's reproductive health, Garbhini Paricharya (antenatal care), natural labour conduction, and management of gynecological ailments.",
    headOfDepartment: "Prof. (Dr.) Anuradha Mishra, MD (Ayur - Prasuti & Stri Roga)",
    facultyCount: 4,
    labs: "Labour Room, Antenatal Demonstration Ward & Colposcopy / Ultrasound unit",
    image: "/images/ayurveda/herbs/shatavari-roots.webp"
  },
  {
    id: "dept-10",
    code: "KAUMARBHRITYA",
    name: "Kaumarbhritya / Bala Roga (Pediatrics)",
    sanskritName: "कौमारभृत्य / बाल रोग विभाग",
    description: "Holistic child healthcare from neonate to adolescence, Suvarnaprashana immune drops, developmental milestones, and childhood nutritional disorders.",
    headOfDepartment: "Dr. Hemant Kumar Tiwari, MD (Ayur - Kaumarbhritya)",
    facultyCount: 3,
    labs: "Pediatric Clinical Ward with phototherapy, infant incubator, child growth tracking models",
    image: "/images/ayurveda/herbs/brahmi-botanical-foliage.webp"
  },
  {
    id: "dept-11",
    code: "KAYACHIKITSA",
    name: "Kayachikitsa (General Medicine)",
    sanskritName: "कायचिकित्सा विभाग",
    description: "The core clinical discipline of Ayurveda treating internal systemic disorders, metabolic syndromes, neurological disorders, respiratory and digestive ailments.",
    headOfDepartment: "Prof. (Dr.) Devendra Nath Tripathi, MD (Ayur), Ph.D., Principal",
    facultyCount: 6,
    labs: "100-Bed In-Patient Department (IPD), Kayachikitsa Specialty OPD, ICU & Cardiac monitor unit",
    image: "/images/ayurveda/medicine-preparation/traditional-herbal-preparation.webp"
  },
  {
    id: "dept-12",
    code: "SHALYA-TANTRA",
    name: "Shalya Tantra (Surgery & Kshara Sutra)",
    sanskritName: "शल्य तन्त्र विभाग",
    description: "Sushruta's ancient surgical tradition, modern minor and major surgical techniques, wound healing (Vrana Ropana), and specialized Kshara Sutra therapy for anorectal conditions.",
    headOfDepartment: "Prof. (Dr.) Maheshwar Dayal Gaur, MS (Ayurveda - Shalya Tantra)",
    facultyCount: 4,
    labs: "Modern Major Operation Theatre (OT), Kshara Sutra Preparation Lab & Post-Op Recovery Ward",
    image: "/images/ayurveda/medicine-preparation/copper-vessel-ayurvedic-decoction.webp"
  },
  {
    id: "dept-13",
    code: "SHALAKYA-TANTRA",
    name: "Shalakya Tantra (ENT, Ophthalmology & Dentistry)",
    sanskritName: "शालाक्य तन्त्र विभाग",
    description: "Deals with diseases occurring above the clavicle (Urdhwajatrugata Roga) including Netra (Eye), Karna (Ear), Nasa (Nose), Mukha (Oral cavity) and Shiro-Roga with Kriyakalpa procedures.",
    headOfDepartment: "Dr. Vinay Kumar Agrawal, MS (Ayurveda - Shalakya)",
    facultyCount: 3,
    labs: "Netra Kriyakalpa Room (Tarpana, Putapaka, Aschyotana, Seka), Slit Lamp & ENT examination unit",
    image: "/images/ayurveda/herbs/amla-indian-gooseberry.webp"
  },
  {
    id: "dept-14",
    code: "PANCHAKARMA",
    name: "Panchakarma (Detoxification & Rejuvenation)",
    sanskritName: "पञ्चकर्म विभाग",
    description: "The world-renowned five-fold biopurification therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana) accompanied by Shirodhara, Pizhichil, and therapeutic medicated baths.",
    headOfDepartment: "Dr. Vaidya Kripashankar Vyas, MD (Ayur - Panchakarma)",
    facultyCount: 5,
    labs: "Dedicated Male & Female Panchakarma Theatres, Shirodhara suites, Steam herb baths & Basti preparation area",
    image: "/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp"
  }
];

export const LEADERSHIP: FacultyItem[] = [
  {
    id: "fac-1",
    facultyId: "SHAMC-FAC-001",
    name: "Prof. (Dr.) Devendra Nath Tripathi",
    designation: "Principal & Professor of Kayachikitsa",
    departmentCode: "KAYACHIKITSA",
    qualification: "BAMS, MD (Ayurveda - Kayachikitsa), Ph.D., FICA",
    experienceYears: 24,
    specialization: "Metabolic Disorders, Autoimmune Arthritis & Clinical Research",
    email: "principal@hariduttayurveda.edu.in",
    phone: "+91 94140 33811",
    bio: "Over 24 years of scholarly leadership in Ayurvedic higher education. Author of 4 books and 42 peer-reviewed scientific papers. Former member of CCIM/NCISM syllabus inspection committee.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: true,
    order: 1
  },
  {
    id: "fac-2",
    facultyId: "SHAMC-FAC-002",
    name: "Prof. (Dr.) Acharya Vachaspati Shastri",
    designation: "Vice-Principal & Head, Samhita & Siddhanta",
    departmentCode: "SAMHITA",
    qualification: "Acharya, BAMS, MD (Ayur - Samhita), D.Litt (Sanskrit)",
    experienceYears: 22,
    specialization: "Charaka Samhita Critical Text Commentary & Vedic Epistemology",
    email: "vachaspati@hariduttayurveda.edu.in",
    bio: "Eminent Sanskrit scholar and philosopher who has deciphered classical palm-leaf manuscripts and led Vedic research projects under national grants.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: true,
    order: 2
  },
  {
    id: "fac-3",
    facultyId: "SHAMC-FAC-003",
    name: "Dr. Vaidya Kripashankar Vyas",
    designation: "Medical Superintendent & HOD Panchakarma",
    departmentCode: "PANCHAKARMA",
    qualification: "BAMS, MD (Ayurveda - Panchakarma)",
    experienceYears: 19,
    specialization: "Authentic Kerala Panchakarma, Neurological Rehabilitation & Spine Care",
    email: "kripashankar@hariduttayurveda.edu.in",
    bio: "Leads the 100-bed hospital clinical services with specialized mastery over classical bio-purification therapies and chronic musculoskeletal care.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: true,
    order: 3
  },
  {
    id: "fac-4",
    facultyId: "SHAMC-FAC-004",
    name: "Prof. (Dr.) Ramakant Dwivedi",
    designation: "Professor & HOD, Dravyaguna Vijnana",
    departmentCode: "DRAVYAGUNA",
    qualification: "BAMS, MD (Ayurveda - Dravyaguna), Ph.D., Botanical Fellow",
    experienceYears: 20,
    specialization: "Medicinal Flora of Aravalli & Western Ghats, Pharmacognosy",
    email: "ramakant@hariduttayurveda.edu.in",
    bio: "Oversees our 5-acre Charak Vatika herbal garden housing 350+ authenticated medicinal species. Published key treatises on endangered desert flora.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: false,
    order: 4
  },
  {
    id: "fac-5",
    facultyId: "SHAMC-FAC-005",
    name: "Prof. (Dr.) Anuradha Mishra",
    designation: "Professor & HOD, Prasuti Tantra & Stri Roga",
    departmentCode: "PRASUTI-STRI",
    qualification: "BAMS, MD (Ayurveda - Prasuti & Stri Roga)",
    experienceYears: 18,
    specialization: "Garbhini Paricharya, Infertility (Vandhyatva) & Natural Birthing",
    email: "anuradha@hariduttayurveda.edu.in",
    bio: "Pioneered specialized Garbh Sanskar workshops and Ayurvedic protocols for polycystic ovarian syndrome (PCOS) and reproductive harmony.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: false,
    order: 5
  },
  {
    id: "fac-6",
    facultyId: "SHAMC-FAC-006",
    name: "Prof. (Dr.) Maheshwar Dayal Gaur",
    designation: "Professor & HOD, Shalya Tantra",
    departmentCode: "SHALYA-TANTRA",
    qualification: "BAMS, MS (Ayurveda - Shalya Tantra), FAIS",
    experienceYears: 21,
    specialization: "Kshara Sutra Therapy for Fistula-in-Ano, Non-healing Ulcers & Wound Care",
    email: "maheshwar@hariduttayurveda.edu.in",
    bio: "Master surgical practitioner who has treated over 8,000 cases of complex anorectal disorders using standardized Kshara Sutra ligature techniques.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    isHOD: true,
    isLeadership: false,
    order: 6
  }
];

export const HERBAL_PLANTS: HerbalPlantItem[] = [
  {
    id: "herb-1",
    botanicalName: "Withania somnifera",
    sanskritName: "अश्वगन्धा (Ashwagandha)",
    commonName: "Indian Ginseng / Winter Cherry",
    family: "Solanaceae",
    rasa: "Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)",
    guna: "Laghu (Light), Snigdha (Unctuous)",
    virya: "Ushna (Hot potency)",
    vipaka: "Madhura (Sweet post-digestive)",
    therapeuticUses: "Premier Rasayana herb promoting longevity, cognitive clarity, vitality, stress resilience, and Vata-Kapha balance.",
    habitat: "Cultivated in dry sub-tropical plains of Rajasthan & Madhya Pradesh",
    imageUrl: "/images/ayurveda/herbs/ashwagandha-botanical.webp",
    category: "Rasayana & Medhya"
  },
  {
    id: "herb-2",
    botanicalName: "Tinospora cordifolia",
    sanskritName: "गुडूची / अमृता (Guduchi / Amrita)",
    commonName: "Heart-leaved Moonseed / Giloy",
    family: "Menispermaceae",
    rasa: "Tikta (Bitter), Kashaya (Astringent)",
    guna: "Laghu (Light), Snigdha (Unctuous)",
    virya: "Ushna (Hot potency)",
    vipaka: "Madhura (Sweet post-digestive)",
    therapeuticUses: "Potent immunomodulator, antipyretic (Jwarahara), hepato-protective, and metabolic cleanser (Ama-Pachana).",
    habitat: "Native climbing shrub grown in Charak Vatika medicinal garden",
    imageUrl: "/images/ayurveda/herbs/giloy-medicinal-vine.webp",
    category: "Jwarahara & Rasayana"
  },
  {
    id: "herb-3",
    botanicalName: "Bacopa monnieri",
    sanskritName: "ब्राह्मी (Brahmi)",
    commonName: "Water Hyssop / Herb of Grace",
    family: "Plantaginaceae",
    rasa: "Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)",
    guna: "Laghu (Light), Sara (Flowing)",
    virya: "Sheeta (Cold potency)",
    vipaka: "Madhura (Sweet)",
    therapeuticUses: "Renowned Medhya Rasayana supporting neuroplasticity, memory retention, concentration, and calming nervous exhaustion.",
    habitat: "Wetland water tanks and aquatic borders in institutional herbal park",
    imageUrl: "/images/ayurveda/herbs/brahmi-botanical-foliage.webp",
    category: "Medhya (Brain Tonic)"
  },
  {
    id: "herb-4",
    botanicalName: "Asparagus racemosus",
    sanskritName: "शतावरी (Shatavari)",
    commonName: "Wild Asparagus",
    family: "Asparagaceae",
    rasa: "Madhura (Sweet), Tikta (Bitter)",
    guna: "Guru (Heavy), Snigdha (Unctuous)",
    virya: "Sheeta (Cold potency)",
    vipaka: "Madhura (Sweet post-digestive)",
    therapeuticUses: "Supreme rejuvenator for the female reproductive system, hormonal balance, lactation enhancer (Stanyajanana) and Pitta pacifier.",
    habitat: "Rocky hill slopes and dry deciduous forests across Rajasthan",
    imageUrl: "/images/ayurveda/herbs/shatavari-roots.webp",
    category: "Stree Rogahara & Balya"
  },
  {
    id: "herb-5",
    botanicalName: "Emblica officinalis",
    sanskritName: "आमलकी / धात्री (Amalaki)",
    commonName: "Indian Gooseberry / Amla",
    family: "Phyllanthaceae",
    rasa: "Pancha-Rasa (except Lavana / Salty)",
    guna: "Laghu (Light), Ruksha (Dry)",
    virya: "Sheeta (Cold potency)",
    vipaka: "Madhura (Sweet)",
    therapeuticUses: "Cornerstone of Chyawanprash, exceptionally rich in natural antioxidant Vitamin C, cleanses blood, nourishes hair, eyes, and cardiac tissue.",
    habitat: "Thriving in orchard groves of Haridutt Ayurvedic campus",
    imageUrl: "/images/ayurveda/herbs/amla-indian-gooseberry.webp",
    category: "Rasayana & Chakshushya"
  },
  {
    id: "herb-6",
    botanicalName: "Ocimum sanctum",
    sanskritName: "तुलसी (Tulsi)",
    commonName: "Holy Basil",
    family: "Lamiaceae",
    rasa: "Katu (Pungent), Tikta (Bitter)",
    guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
    virya: "Ushna (Hot potency)",
    vipaka: "Katu (Pungent)",
    therapeuticUses: "Sacred herb for respiratory support (Kasa-Shwasa), anti-microbial protection, adaptogenic vitality, and cellular detoxification.",
    habitat: "Cultivated in temple courtyard and institutional botanical nurseries",
    imageUrl: "/images/ayurveda/herbs/tulsi-medicinal-leaves.webp",
    category: "Swasahara & Krimighna"
  }
];

export const NOTICES: NoticeItem[] = [
  {
    id: "not-1",
    title: "NEET-UG 2026 AYUSH State Counseling: BAMS Admissions Round 1 Seat Allotment Guidelines",
    category: "Admissions",
    date: "2026-10-28",
    fileUrl: "/downloads/Admissions_Round1_2026.pdf",
    isPinned: true,
    isPublished: true
  },
  {
    id: "not-2",
    title: "NCISM Annual Institutional Compliance Inspection & Academic Calendar Approval for 2026-27",
    category: "NCISM",
    date: "2026-10-15",
    fileUrl: "/downloads/NCISM_Approval_2026_27.pdf",
    isPinned: true,
    isPublished: true
  },
  {
    id: "not-3",
    title: "Dhanwantari Jayanti & 11th National Ayurveda Day Mega Free Health & Panchakarma Camp",
    category: "Hospital",
    date: "2026-10-02",
    isPinned: false,
    isPublished: true
  },
  {
    id: "not-4",
    title: "Final BAMS Professional Examination Schedule & Internal Assessment Submission Window",
    category: "Examination",
    date: "2026-09-22",
    isPinned: false,
    isPublished: true
  },
  {
    id: "not-5",
    title: "National Seminar on 'Classical Rasa Shastra Formulations in Modern Oncology': Call for Papers",
    category: "Academic",
    date: "2026-09-10",
    isPinned: false,
    isPublished: true
  }
];

export const NEWS_EVENTS: NewsEventItem[] = [
  {
    id: "news-1",
    title: "International Ayurveda Symposium 2026 Held at Shri Haridutt Campus",
    slug: "international-ayurveda-symposium-2026",
    date: "October 20, 2026",
    category: "Conference",
    summary: "Over 600 Vaidyas, global researchers and policymakers gathered to deliberate on standardized clinical trials and evidence-based Ayurvedic formulations.",
    content: "The three-day symposium inaugurated by the Hon'ble Minister of AYUSH featured plenary sessions on integration of modern diagnostics with Nadi Pariksha, pharmacovigilance of mineral preparations, and climate resilience of indigenous medicinal plants.",
    imageUrl: "/images/ayurveda/ancient-heritage/carved-stone-pillars.webp",
    location: "Sushruta Memorial Auditorium, Main Campus",
    isFeatured: true
  },
  {
    id: "news-2",
    title: "100-Bed Panchakarma Hospital Completes 50,000 Outpatient Consultations This Year",
    slug: "hospital-completes-50000-outpatient-consultations",
    date: "September 18, 2026",
    category: "Hospital Milestone",
    summary: "Providing affordable classical healthcare to rural and suburban communities with high remission rates in chronic arthritis and sciatica.",
    content: "The hospital's specialized clinical units in Shalya Kshara Sutra and Netra Kriyakalpa have achieved outstanding patient recovery records, supported by 24x7 Ayurvedic emergency casualty services.",
    imageUrl: "/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp",
    location: "Hospital Clinical Wing",
    isFeatured: true
  },
  {
    id: "news-3",
    title: "Charak Vatika Herbal Garden Expands with 50 Rare Himalayan & Desert Species",
    slug: "charak-vatika-expansion-rare-species",
    date: "August 30, 2026",
    category: "Botany & Research",
    summary: "New poly-houses and mist chambers inaugurated to preserve endangered red-listed Ayurvedic herbs under controlled microclimates.",
    content: "Students of Dravyaguna department have begun live germplasm propagation of Saraca asoca, Commiphora mukul, and Rauvolfia serpentina to sustain in-situ research.",
    imageUrl: "/images/ayurveda/botanical-gardens/charak-vatika-botanical.webp",
    location: "Dravyaguna Botanical Conservatory",
    isFeatured: false
  }
];

export const FACILITIES: FacilityItem[] = [
  {
    id: "fac-1",
    facilityId: "FAC-HOSPITAL",
    title: "100-Bedded Attached Teaching Hospital & Panchakarma Wing",
    category: "Clinical",
    description: "Full-fledged IPD and OPD clinical training complex with dedicated Panchakarma theaters, Shirodhara suites, Kshara Sutra unit, Labour Room, Operation Theater, and 24x7 Casualty services.",
    capacity: "100 In-patient Beds, 12 OPD Chambers, 8 Panchakarma suites",
    highlights: "Full Panchakarma infrastructure, authentic medicated oil preparation, clinical pathology support, daily bed-side rounds for interns.",
    imageUrl: "/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp",
    order: 1
  },
  {
    id: "fac-2",
    facilityId: "FAC-GARDEN",
    title: "Charak Vatika — 5-Acre Botanical Herbal Garden",
    category: "Research",
    description: "An authentic botanical sanctuary housing 350+ identified medicinal plant species, specialized drip-irrigated quadrants, green house, poly-tunnel and Nakshatra Vana.",
    capacity: "350+ Species, 5 Acres sprawling natural habitat",
    highlights: "Rare species conservation, live demonstration beds for Dravyaguna scholars, organic composting unit, irrigation harvesting.",
    imageUrl: "/images/ayurveda/botanical-gardens/herbal-garden-landscape.webp",
    order: 2
  },
  {
    id: "fac-3",
    facilityId: "FAC-LIBRARY",
    title: "Saraswati Central Library & Manuscript Digital Center",
    category: "Academic",
    description: "Vast scholarly library holding over 12,500 classical textbooks, rare commentaries, palm-leaf manuscripts, international AYUSH journals, and high-speed digital research terminals.",
    capacity: "150+ Seating Capacity, 12,500+ Volumes, 25+ Subscribed National & International Journals",
    highlights: "Digital OPAC catalog, Delnet e-journal access, quiet thesis research zone, rare Sanskrit treatises collection.",
    imageUrl: "/images/ayurveda/manuscripts/palm-leaf-ayurveda-scripture.webp",
    order: 3
  },
  {
    id: "fac-4",
    facilityId: "FAC-PHARMACY",
    title: "Rasa Shastra Pilot Pharmacy & Quality Control Lab",
    category: "Academic",
    description: "Standardized manufacturing unit compliant with GMP norms for training students in classical medicine preparation like Bhasmas, Asavas, Tailas, and Churnas.",
    capacity: "Fully equipped pilot plant with extraction units, muffle furnaces, disintegrators",
    highlights: "Standardization protocols, heavy-metal safety analysis, student formulation projects.",
    imageUrl: "/images/ayurveda/medicine-preparation/traditional-herbal-preparation.webp",
    order: 4
  },
  {
    id: "fac-5",
    facilityId: "FAC-AUDITORIUM",
    title: "Sushruta Memorial Auditorium & Seminar Halls",
    category: "Cultural",
    description: "Acoustically treated multi-tier auditorium equipped with 4K projection, Dolby audio, and live streaming capabilities for international symposia and student cultural convocations.",
    capacity: "650 Seating capacity",
    highlights: "Full audio-visual connectivity, centralized air-cooling, green rooms, conference dais.",
    imageUrl: "/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp",
    order: 5
  },
  {
    id: "fac-6",
    facilityId: "FAC-HOSTEL",
    title: "Ayurvedic Heritage Residential Hostels (Boys & Girls)",
    category: "Residential",
    description: "Secure, hygienic on-campus hostels with furnished twin/triple sharing rooms, Satvik vegetarian dining mess, reading rooms, gym, and 24x7 round-the-clock security surveillance.",
    capacity: "300+ Students accommodation",
    highlights: "Nutritious Satvik food curated by nutritionists, high-speed Wi-Fi, laundry facilities, CCTV.",
    imageUrl: "/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp",
    order: 6
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    authorName: "Dr. Priyanshu Sharma",
    role: "Alumnus (BAMS Batch 2018-24) — Now Medical Officer, State AYUSH Services",
    quote: "Studying at Shri Haridutt Ayurvedic Medical College shaped my clinical intuition. The sheer volume of OPD patients and the rigour of Charaka Samhita classes under legendary Vaidyas gave me the confidence to diagnose complex autoimmune conditions successfully.",
    avatarUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300",
    rating: 5
  },
  {
    id: "t2",
    authorName: "Ananya Rathore",
    role: "Final Year BAMS Scholar (Batch 2021-27)",
    quote: "The combination of Vedic tranquility and modern laboratory equipment is unmatched. In our Dravyaguna herbarium and Rasa Shastra pilot plant, we don't just memorize textbook descriptions—we plant the herbs and formulate genuine classical medicines.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    rating: 5
  },
  {
    id: "t3",
    authorName: "Rajendra Meena",
    role: "Patient, Panchakarma Hospital (Recovered from Severe Sciatica / Gridhrasi)",
    quote: "After 2 years of excruciating back pain, the 21-day Kati Basti and specialized Panchakarma protocol under Dr. Vyas gave me a new life without requiring spine surgery. The compassion and cleanliness here are truly divine.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    rating: 5
  }
];

export const RESEARCH_PUBLICATIONS = [
  {
    id: "res-1",
    title: "Clinical Evaluation of Standardized Guduchi (Tinospora cordifolia) Ghanavati in Chronic Non-Communicable Inflammatory Conditions: A Randomized Single-Blind Study",
    authors: "Dr. Devendra Nath Tripathi, Dr. Ramakant Dwivedi, et al.",
    journal: "Journal of Ayurveda & Integrative Medicine (JAIM)",
    year: 2025,
    volume: "Vol. 16, Issue 3, pp. 210-218",
    doi: "10.1016/j.jaim.2025.100912",
    abstract: "Investigated clinical efficacy in 120 patients with elevated inflammatory biomarkers. Demonstrating statistically significant reduction in ESR and hs-CRP with zero adverse hepatotoxic reactions.",
    category: "Clinical Trial"
  },
  {
    id: "res-2",
    title: "Physico-Chemical Characterization and Safety Profiling of Classical Yashada Bhasma Prepared with Apamarga Kshara",
    authors: "Dr. Shrikant Upadhyay, Dr. Arvind Kumar Sharma",
    journal: "International Journal of Ayurvedic Medicine (IJAM)",
    year: 2024,
    volume: "Vol. 15, Issue 2, pp. 88-96",
    doi: "10.47552/ijam.v15i2.2140",
    abstract: "XRD, SEM-EDX, and FTIR analysis confirming nanoscale particle size (<50 nm) of zinc oxide crystalline lattice conforming to Sushruta's classical Varitaratva test.",
    category: "Rasa Shastra & Nanotechnology"
  },
  {
    id: "res-3",
    title: "Therapeutic Efficacy of Kshara Sutra Ligature versus Modern Fistulectomy in Complex High-Anal Fistula: A 5-Year Retrospective Cohort Analysis",
    authors: "Prof. (Dr.) Maheshwar Dayal Gaur, et al.",
    journal: "Ancient Science of Life",
    year: 2024,
    volume: "Vol. 42, Issue 4, pp. 145-152",
    doi: "10.4103/asl.ASL_84_24",
    abstract: "Demonstrating recurrence rates of under 1.8% with preserved anal sphincter continence in 340 treated fistula cases at Shri Haridutt Ayurvedic Hospital.",
    category: "Shalya Tantra"
  }
];

export const FAQS = [
  {
    q: "What is the procedure for BAMS Admission at Shri Haridutt Ayurvedic Medical College for 2026-27?",
    a: "Admissions to the 100 BAMS seats are strictly conducted based on merit scored in the National Eligibility cum Entrance Test (NEET-UG 2026) through the State AYUSH Counseling Committee (85% State Quota) and the AYUSH Admissions Central Counseling Committee (AACCC, 15% All India Quota). Candidates must register online on the counseling portal and select Shri Haridutt Ayurvedic Medical College as their preferred choice."
  },
  {
    q: "Is Shri Haridutt Ayurvedic Medical College approved by the Government of India?",
    a: "Yes. The institution is fully recognised and approved by the National Commission for Indian System of Medicine (NCISM), Ministry of AYUSH, Government of India, New Delhi, and is affiliated with the State AYUSH University."
  },
  {
    q: "What is the annual intake capacity and course duration for BAMS?",
    a: "The approved annual intake is 100 seats. The duration is 5.5 years, which comprises 4.5 years of comprehensive theoretical and practical medical education divided into four professional phases, followed by 1 full year of compulsory rotatory clinical internship at our 100-bed hospital."
  },
  {
    q: "What clinical exposure do students receive during the course?",
    a: "Students undergo daily clinical training in our 100-bedded hospital. They actively rotate through Kayachikitsa (General Medicine), Shalya Tantra (Surgery & Kshara Sutra), Shalakya (ENT & Eye), Prasuti & Stri Roga (OB-GYN), Kaumarbhritya (Pediatrics), and our specialized Panchakarma biopurification unit with over 45,000 OPD patients annually."
  },
  {
    q: "Are hostel accommodations available for boys and girls?",
    a: "Yes. The college provides separate, well-secured residential hostels for male and female scholars located right on the serene campus, featuring hygienic Satvik dining, 24x7 security surveillance, reading halls, and Wi-Fi."
  },
  {
    q: "Can candidates apply for institutional scholarship assistance?",
    a: "Yes, candidates belonging to SC/ST/OBC/EWS/Minority categories are eligible for state and central government post-matric scholarship schemes. The college admission cell provides full guidance for scholarship documentation."
  }
];
