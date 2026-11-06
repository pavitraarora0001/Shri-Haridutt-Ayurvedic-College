# COMPREHENSIVE IMAGE AUDIT REPORT
## Shri Haridutt Ayurvedic Medical College & Hospital
### Vedic Heritage × Modern Academic Luxury — Visual Identity Audit

---

## 1. EXECUTIVE AUDIT SUMMARY

An exhaustive audit of all image assets and references across the codebase was conducted, covering:
- **Components**: Homepage Hero, About Preview, Academic Showcase, Ayurvedic Experience, Campus Gallery, Faculty Highlights, Knowledge Hub Preview, News & Events, Testimonials.
- **Pages**: `/`, `/about`, `/about/history`, `/about/vision-mission`, `/about/principals-message`, `/about/chairmans-message`, `/academics/programmes`, `/courses/*`, `/departments`, `/departments/[code]`, `/faculty`, `/faculty/[id]`, `/infrastructure/*`, `/knowledge-hub`, `/gallery`, `/news-events`, `/achievements`, `/student-life`.
- **Data Layers**: `src/lib/data.ts` and `prisma/seed.mjs` (CMS database seed).

### Key Deficiencies Identified:
1. **Critical Repetition**: The single image `photo-1544716278-ca5e3f4abd8c` (an open generic book on a wooden desk) was re-used across 6 unrelated institutional contexts:
   - Homepage Cinematic Hero background
   - `/about` campus archway
   - `IntroSection` campus overview
   - `Samhita & Siddhanta` department banner
   - `AyurvedicExperience` Vedic tradition card
   - `CampusGallery` collegiate building card
   - `PageHeader` default fallback background
2. **Western Healthcare Stock Disconnect**:
   - The teaching hospital (`photo-1586773860418-d37222d8fce3`) used a modern western sterile hospital facade with cold white glass.
   - Laboratories (`photo-1532187863486-abf9dbad1b69`, `photo-1582719478250-c89cae4dc85b`) used generic blue test tubes instead of classical Ayurvedic copper Yantras, stone mortar/pestles (Khalwa Yantras), and authentic pharmacognostic herbarium specimens.
   - Panchakarma (`photo-1540555700478-4be289fbecef`) used a generic western luxury spa massage table instead of traditional teakwood Droni beds and brass Shirodhara vessels.
3. **Faculty & Scholar Representation**:
   - Senior faculty portraits used generic western models in casual attire rather than distinguished Indian professors, Vaidyas, and academic clinicians.
   - Student life and testimonials used western stock portraits.

---

## 2. SECTION-BY-SECTION IMAGE INVENTORY

| Section / Component | Current Image Asset | Defect / Reason for Replacement | Required Authentic Replacement |
|---|---|---|---|
| **Homepage Hero** | `photo-1544716278-ca5e3f4abd8c` | Generic open book stock photo; no architectural or botanical majesty | Majestic Indian collegiate sandstone archways with sunlit Ayurvedic flora |
| **Intro Section (`about`)** | `photo-1544716278-ca5e3f4abd8c` | Repeated book asset | Authentic Indian heritage academic building with arched corridors |
| **BAMS Program Card** | `photo-1576091160399-112ba8d25d1d` | Western clinic room with sterile white walls | Indian medical scholars studying classical Samhita texts with modern diagnostic tools |
| **MD Kayachikitsa Card** | `photo-1582719478250-c89cae4dc85b` | Western test tube biology lab | Authentic Ayurvedic clinical examination / Nadi Pariksha consultation |
| **Panchakarma Diploma Card** | `photo-1540555700478-4be289fbecef` | Generic commercial spa resort | Traditional bronze Shirodhara pot with streaming herbal oil and Ayurvedic brassware |
| **Samhita Department** | `photo-1544716278-ca5e3f4abd8c` | Duplicate open book | Traditional Sanskrit manuscript / Devanagari text on wooden desk with brass diya |
| **Sharir Rachana (Anatomy)** | `photo-1582719478250-c89cae4dc85b` | Western molecular glassware | Anatomical bone models and classical Ayurvedic Marma Sharir charts |
| **Sharir Kriya (Physiology)** | `photo-1532187863486-abf9dbad1b69` | Blue chemical tubes | Clinical physiology diagnostic setup and Ayurvedic Tridosha analysis |
| **Dravyaguna (Pharmacology)** | `photo-1512069772995-ec65ed45afd6` | Generic seasoning bowls | Authentic Indian dried roots, herbs, and stone Khalwa Yantra mortar-pestle |
| **Rasa Shastra (Pharmaceutics)**| `photo-1587854692152-cbe660dbde88`| Modern commercial pill bottles | Traditional Ayurvedic Bhasma preparation, stone mortars, and herbal calcinations |
| **Swasthavritta (Yoga)** | `photo-1506126613408-eca07ce68773` | Western beach yoga model | Classical Indian Yogasana & meditation in a serene collegiate courtyard |
| **Kayachikitsa (Medicine)** | `photo-1629909613654-28e377c37b09` | Western doctor holding tablet | Indian Ayurvedic clinician examining patient with herbal medicinal remedies |
| **Panchakarma Department** | `photo-1540555700478-4be289fbecef` | Duplicate spa image | Traditional Kerala Shirodhara therapy setup on carved wooden Droni table |
| **Principal (Prof. Tripathi)** | `photo-1537368910025-700350fe46c7` | Western doctor in white coat | Distinguished senior Indian academic physician / Vaidya with stethoscope |
| **Vice Principal (Acharya Shastri)**| `photo-1507003211169-0a1dd7228f2d`| Casual Western model | Revered senior Indian Sanskrit scholar / professor in traditional blazer |
| **Med. Supt. (Dr. Vyas)** | `photo-1622253692010-333f2da6031d` | Non-clinical portrait | Dedicated Indian doctor consulting in hospital clinical ward |
| **HOD Dravyaguna (Prof. Dwivedi)**| `photo-1500648767791-00dcc994a43e`| Casual fashion portrait | Senior Indian botanical scientist / Ayurvedic doctor in laboratory coat |
| **HOD Prasuti (Prof. Mishra)** | `photo-1594824813576-ff58622c1592` | Stock model | Accomplished Indian woman medical professor in clinical attire |
| **HOD Shalya (Prof. Gaur)** | `photo-1534528741775-53994a69daeb` | Fashion model | Experienced Indian surgeon and Kshara Sutra specialist |
| **Teaching Hospital** | `photo-1586773860418-d37222d8fce3` | Western corporate hospital | Clean, serene Ayurvedic teaching hospital and inpatient clinical wards |
| **Charak Vatika Herbal Garden**| `photo-1585320806297-9794b3e4eeae` | European flower shop | Sprawling lush 5-acre Ayurvedic medicinal botanical sanctuary |
| **Saraswati Central Library** | `photo-1521587760476-6c12a4b040da` | European library | Historic high-ceiling academic library with Sanskrit collections and study desks |
| **Residential Hostels** | `photo-1555854877-bab0e564b8d5` | Generic motel/hotel room | Peaceful collegiate residential campus with green lawns |
| **Campus Photo Gallery (9 items)**| Repetitive generic mix | Lacked cohesive Vedic aesthetic | Complete 9-part visual journey of genuine Ayurvedic academic and clinical sanctums |
| **Testimonials Avatars** | Western stock faces | Mismatched demographics | Authentic Indian Ayurvedic scholar, alumna medical officer, and recovered patient |
