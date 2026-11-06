export interface CourseItem {
  id: string;
  code: string;
  title: string;
  degree: string;
  duration: string;
  intake: number;
  eligibility: string;
  description: string;
  syllabusOverview: string;
  careerOpportunities: string;
  feePerYear: string;
  isApproved: boolean;
  approvalBody: string;
  image?: string;
}

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  sanskritName: string;
  description: string;
  headOfDepartment: string;
  facultyCount: number;
  labs: string;
  image: string;
}

export interface FacultyItem {
  id: string;
  facultyId: string;
  name: string;
  designation: string;
  departmentCode?: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  email: string;
  phone?: string;
  bio: string;
  image: string;
  isHOD: boolean;
  isLeadership: boolean;
  order: number;
}

export interface HerbalPlantItem {
  id: string;
  botanicalName: string;
  sanskritName: string;
  commonName: string;
  family: string;
  rasa: string;
  guna: string;
  virya: string;
  vipaka: string;
  therapeuticUses: string;
  habitat: string;
  imageUrl: string;
  category: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: string;
  date: string;
  fileUrl?: string;
  isPinned: boolean;
  isPublished: boolean;
}

export interface NewsEventItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  location: string;
  isFeatured: boolean;
}

export interface FacilityItem {
  id: string;
  facilityId: string;
  title: string;
  category: string;
  description: string;
  capacity: string;
  highlights: string;
  imageUrl: string;
  order: number;
}
