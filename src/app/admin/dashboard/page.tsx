'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Home,
  Image as ImageIcon,
  Video,
  Newspaper,
  Bell,
  BookOpen,
  GraduationCap,
  Users,
  FileText,
  Building2,
  HeartPulse,
  MessageSquareQuote,
  Settings,
  LogOut,
  KeyRound,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  Phone,
  Mail,
  MapPin,
  X,
  FileCheck,
  Check,
  Clock
} from 'lucide-react';

type CmsTab =
  | 'overview'
  | 'homepage'
  | 'gallery'
  | 'videos'
  | 'news'
  | 'notices'
  | 'courses'
  | 'faculty'
  | 'disclosures'
  | 'about'
  | 'hospital'
  | 'testimonials'
  | 'settings'
  | 'admissions';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CmsTab>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // User & Stats
  const [adminUser, setAdminUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({
    galleryPhotosCount: 0,
    videosCount: 0,
    publishedNewsCount: 0,
    activeNoticesCount: 0,
    documentsCount: 0,
    coursesCount: 0,
    departmentsCount: 0,
    facultyCount: 0,
    testimonialsCount: 0,
    totalApplications: 0,
    totalEnquiries: 0,
  });
  const [recentAuditLogs, setRecentAuditLogs] = useState<any[]>([]);

  // Modals
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Data states
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [noticesList, setNoticesList] = useState<any[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [disclosureCategories, setDisclosureCategories] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [websiteSettings, setWebsiteSettings] = useState<Record<string, string>>({});
  const [applications, setApplications] = useState<any[]>([]);

  // Page Content States (Homepage, About, Hospital)
  const [homepageContent, setHomepageContent] = useState<any>({
    heroTitle: 'Ayurvedic Medical Excellence & Ancient Healing Wisdom',
    heroSubtitle: 'National Commission for Indian System of Medicine (NCISM) Approved BAMS & MD Programmes',
    heroBannerUrl: '/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp',
    introText: 'Shri Haridutt Ayurvedic Medical College & Hospital stands as an eminent seat of higher Vedic medical learning.',
    affiliationText: 'Affiliated to Dr. S.R. Rajasthan Ayurved University, Jodhpur. Recognized by Ministry of AYUSH, Govt of India.',
    statsOpd: '45,000+',
    statsIpdbeds: '100 Beds',
    statsHerbs: '500+ Species',
    statsSeats: '100 Seats',
  });

  const [aboutContent, setAboutContent] = useState<any>({
    history: '',
    vision: '',
    mission: '',
    objectives: '',
    infrastructure: '',
  });

  const [hospitalContent, setHospitalContent] = useState<any>({
    intro: '',
    clinicalDepts: '',
    panchakarmaFacilities: '',
    opdSchedule: '',
    emergencyServices: '',
  });

  // Modal / Form States
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', category: 'Campus', imageUrl: '', caption: '', order: 0, isPublished: true });
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', videoUrl: '', caption: '', category: 'Video', order: 0, isPublished: true });

  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsForm, setNewsForm] = useState({ id: '', title: '', summary: '', content: '', category: 'Institutional', imageUrl: '', isFeatured: false, isPublished: true });

  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ id: '', title: '', category: 'Academic', date: '', fileUrl: '', isPinned: false, isPublished: true });

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ id: '', code: '', title: '', degree: 'Undergraduate', duration: '5.5 Years', intake: 100, eligibility: '', feePerYear: '₹2,25,000 / Year', description: '', syllabusOverview: '', careerOpportunities: '', isApproved: true });

  const [facultyModalOpen, setFacultyModalOpen] = useState(false);
  const [facultyForm, setFacultyForm] = useState({ id: '', name: '', designation: 'Professor', qualification: 'BAMS, MD', experienceYears: 10, specialization: 'Kayachikitsa', email: '', phone: '', bio: '', image: '', isHOD: false, isLeadership: false });

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docForm, setDocForm] = useState({ categoryId: '', title: '', documentCode: '', fileUrl: '', academicYear: '2026-27' });

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ id: '', authorName: '', role: 'BAMS Scholar', batchOrDesignation: 'Batch 2022-27', quote: '', avatarUrl: '', rating: 5, isPublished: true });

  // Preview Modal
  const [previewData, setPreviewData] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Initial Fetch
  const loadDashboardData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/admin/overview');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setAdminUser(data.adminUser);
        setRecentAuditLogs(data.recentAuditLogs || []);
      }

      // Display the overview dashboard shell immediately with zero delay
      setLoading(false);
      setRefreshing(false);

      // Fetch all sub-modules in parallel asynchronously in background
      Promise.all([
        fetch('/api/admin/gallery').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/news').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/notices').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/courses').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/faculty').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/disclosures').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/testimonials').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/settings').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/pages').then((r) => r.json()).catch(() => ({})),
      ]).then(([gData, nData, notData, cData, fData, dData, tData, sData, pData]) => {
        if (gData?.items) setGalleryItems(gData.items);
        if (nData?.news) setNewsList(nData.news);
        if (notData?.notices) setNoticesList(notData.notices);
        if (cData?.courses) setCoursesList(cData.courses);
        if (fData?.faculty) setFacultyList(fData.faculty);
        if (dData?.data) setDisclosureCategories(dData.data);
        if (tData?.testimonials) setTestimonialsList(tData.testimonials);
        if (sData?.settings) setWebsiteSettings(sData.settings);

        if (pData?.pages) {
          const hp = pData.pages.find((p: any) => p.slug === 'homepage');
          if (hp && hp.content) {
            try {
              setHomepageContent((prev: any) => ({ ...prev, ...JSON.parse(hp.content) }));
            } catch {
              setHomepageContent((prev: any) => ({ ...prev, introText: hp.content }));
            }
          }
          const ab = pData.pages.find((p: any) => p.slug === 'about');
          if (ab && ab.content) {
            try {
              setAboutContent(JSON.parse(ab.content));
            } catch {
              setAboutContent((prev: any) => ({ ...prev, history: ab.content }));
            }
          }
          const hosp = pData.pages.find((p: any) => p.slug === 'hospital');
          if (hosp && hosp.content) {
            try {
              setHospitalContent(JSON.parse(hosp.content));
            } catch {
              setHospitalContent((prev: any) => ({ ...prev, intro: hosp.content }));
            }
          }
        }
      });
    } catch (err) {
      console.error('Failed to load CMS data:', err);
      showToast('Error loading CMS data from database', 'error');
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Password updated. All sessions revoked. Redirecting to login...', 'success');
        setPasswordModalOpen(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setTimeout(() => {
          router.push('/admin/login');
        }, 1200);
      } else {
        showToast(data.error || 'Password update failed', 'error');
      }
    } catch {
      showToast('Failed to update password', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Generic File Upload Handler
  const uploadFiles = async (files: FileList | File[]): Promise<string[]> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return (data.files || [data]).map((f: any) => f.url);
      } else {
        showToast(data.error || 'Upload failed', 'error');
        return [];
      }
    } catch {
      showToast('Error uploading file', 'error');
      return [];
    } finally {
      setUploading(false);
    }
  };

  // Module A: Save Homepage
  const saveHomepage = async () => {
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'homepage',
          title: 'Institutional Homepage Content',
          content: homepageContent,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Homepage content saved and updated!');
      } else {
        showToast(data.error || 'Failed to save homepage', 'error');
      }
    } catch {
      showToast('Error saving homepage', 'error');
    }
  };

  // Module B: Gallery Photo Create
  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.imageUrl) {
      showToast('Please upload or provide an image URL', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Photo uploaded to gallery successfully');
        setPhotoModalOpen(false);
        setNewPhoto({ title: '', category: 'Campus', imageUrl: '', caption: '', order: 0, isPublished: true });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to create photo', 'error');
      }
    } catch {
      showToast('Error saving photo', 'error');
    }
  };

  // Module B: Gallery Delete
  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Photo deleted from gallery');
        setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        showToast('Failed to delete photo', 'error');
      }
    } catch {
      showToast('Error deleting photo', 'error');
    }
  };

  // Module E: Video Gallery Create
  const handleCreateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.videoUrl) {
      showToast('Please enter a YouTube or Vimeo embed URL', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newVideo.title,
          category: 'Video',
          imageUrl: newVideo.videoUrl,
          caption: newVideo.caption,
          order: newVideo.order,
          isPublished: newVideo.isPublished,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Video added to gallery');
        setVideoModalOpen(false);
        setNewVideo({ title: '', videoUrl: '', caption: '', category: 'Video', order: 0, isPublished: true });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to add video', 'error');
      }
    } catch {
      showToast('Error saving video', 'error');
    }
  };

  // Module C: News Create / Update
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = newsForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Article ${newsForm.id ? 'updated' : 'published'} successfully`);
        setNewsModalOpen(false);
        setNewsForm({ id: '', title: '', summary: '', content: '', category: 'Institutional', imageUrl: '', isFeatured: false, isPublished: true });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to save news', 'error');
      }
    } catch {
      showToast('Error saving news', 'error');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('News article deleted');
        setNewsList((prev) => prev.filter((n) => n.id !== id));
      }
    } catch {
      showToast('Error deleting news', 'error');
    }
  };

  // Module D: Notice Create / Update
  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = noticeForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/notices', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Notice ${noticeForm.id ? 'updated' : 'published'} successfully`);
        setNoticeModalOpen(false);
        setNoticeForm({ id: '', title: '', category: 'Academic', date: '', fileUrl: '', isPinned: false, isPublished: true });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to save notice', 'error');
      }
    } catch {
      showToast('Error saving notice', 'error');
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Notice deleted');
        setNoticesList((prev) => prev.filter((n) => n.id !== id));
      }
    } catch {
      showToast('Error deleting notice', 'error');
    }
  };

  // Module F: Courses Create / Update
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = courseForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/courses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Course ${courseForm.id ? 'updated' : 'created'} successfully`);
        setCourseModalOpen(false);
        setCourseForm({ id: '', code: '', title: '', degree: 'Undergraduate', duration: '5.5 Years', intake: 100, eligibility: '', feePerYear: '₹2,25,000 / Year', description: '', syllabusOverview: '', careerOpportunities: '', isApproved: true });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to save course', 'error');
      }
    } catch {
      showToast('Error saving course', 'error');
    }
  };

  // Module G: Faculty Create / Update
  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = facultyForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/faculty', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Faculty profile ${facultyForm.id ? 'updated' : 'added'} successfully`);
        setFacultyModalOpen(false);
        setFacultyForm({ id: '', name: '', designation: 'Professor', qualification: 'BAMS, MD', experienceYears: 10, specialization: 'Kayachikitsa', email: '', phone: '', bio: '', image: '', isHOD: false, isLeadership: false });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to save faculty profile', 'error');
      }
    } catch {
      showToast('Error saving faculty', 'error');
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this faculty profile?')) return;
    try {
      const res = await fetch(`/api/admin/faculty?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Faculty profile deleted');
        setFacultyList((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      showToast('Error deleting faculty', 'error');
    }
  };

  // Module H: Disclosure Document Upload
  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.fileUrl || !docForm.categoryId) {
      showToast('Category and PDF document URL are required', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/disclosures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_DOCUMENT',
          ...docForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Disclosure document uploaded successfully');
        setDocModalOpen(false);
        setDocForm({ categoryId: '', title: '', documentCode: '', fileUrl: '', academicYear: '2026-27' });
        loadDashboardData();
      } else {
        showToast(data.error || 'Failed to save document', 'error');
      }
    } catch {
      showToast('Error saving disclosure document', 'error');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this statutory disclosure document?')) return;
    try {
      const res = await fetch(`/api/admin/disclosures?documentId=${documentId}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Document removed');
        loadDashboardData();
      }
    } catch {
      showToast('Error deleting document', 'error');
    }
  };

  // Module I & J: Save About and Hospital Pages
  const saveAboutPage = async () => {
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'about',
          title: 'About College & Institutional Heritage',
          content: aboutContent,
        }),
      });
      if (res.ok) showToast('About College information saved');
      else showToast('Failed to save about information', 'error');
    } catch {
      showToast('Error saving about page', 'error');
    }
  };

  const saveHospitalPage = async () => {
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'hospital',
          title: 'Hospital Services & Facilities Content',
          content: hospitalContent,
        }),
      });
      if (res.ok) showToast('Hospital information saved');
      else showToast('Failed to save hospital page', 'error');
    } catch {
      showToast('Error saving hospital page', 'error');
    }
  };

  // Module K: Testimonial Create
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = testimonialForm.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Testimonial saved successfully');
        setTestimonialModalOpen(false);
        setTestimonialForm({ id: '', authorName: '', role: 'BAMS Scholar', batchOrDesignation: 'Batch 2022-27', quote: '', avatarUrl: '', rating: 5, isPublished: true });
        loadDashboardData();
      }
    } catch {
      showToast('Error saving testimonial', 'error');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Testimonial deleted');
        setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      showToast('Error deleting testimonial', 'error');
    }
  };

  // Module L: Settings Save
  const saveSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(websiteSettings),
      });
      if (res.ok) showToast('Website settings saved successfully');
      else showToast('Failed to update website settings', 'error');
    } catch {
      showToast('Error saving settings', 'error');
    }
  };

  const photosOnly = galleryItems.filter((i) => i.category !== 'Video');
  const videosOnly = galleryItems.filter((i) => i.category === 'Video');

  return (
    <div className="min-h-screen bg-[#F6F2E9] text-[#342B25] flex flex-col font-sans">
      {/* Toast Alert Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-2xl text-xs font-semibold text-white animate-fade-in ${
            toast.type === 'success' ? 'bg-[#173D32] border border-[#C5A46D]' : 'bg-red-800 border border-red-500'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-[#DFCA9E]" /> : <AlertCircle className="w-4 h-4 text-red-200" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top CMS Institutional Header */}
      <header className="bg-[#173D32] text-white border-b border-[#C5A46D]/30 sticky top-0 z-40 shadow-luxury">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {/* Vedic Emblem */}
            <div className="w-9 h-9 rounded-full border-2 border-[#C5A46D] bg-[#0F2821] flex items-center justify-center p-0.5 shadow-gold">
              <span className="text-[#C5A46D] text-xs font-serif font-bold">ॐ</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                  Shri Haridutt Ayurvedic College
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A46D]/20 text-[#DFCA9E] border border-[#C5A46D]/40 uppercase tracking-widest">
                  Single Admin CMS
                </span>
              </div>
              <p className="text-[10px] text-[#C5A46D]/90 font-light truncate">
                Centralized Content &amp; Media Directorate · shrihariduttayurvediccollege.org
              </p>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs text-[#DFCA9E] border border-[#C5A46D]/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={() => loadDashboardData()}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-[#DFCA9E] flex items-center space-x-1 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Admin Profile Pill */}
            <div className="flex items-center space-x-2 bg-[#0F2821] px-3 py-1.5 rounded-full border border-[#C5A46D]/40">
              <ShieldCheck className="w-4 h-4 text-[#DFCA9E]" />
              <div className="text-left hidden sm:block">
                <span className="text-xs font-semibold text-white block leading-tight">
                  {adminUser?.name || 'Super Administrator'}
                </span>
                <span className="text-[9px] text-[#C5A46D] block leading-none uppercase tracking-wider">
                  {adminUser?.role || 'SUPER_ADMIN'}
                </span>
              </div>
            </div>

            {/* Change Password */}
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="p-2 rounded hover:bg-white/10 text-[#DFCA9E] transition-colors"
              title="Change Password"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/40 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout with Sidebar + Content Panes */}
      <div className="flex-1 flex w-full max-w-[1920px] mx-auto overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 shrink-0 bg-[#0F2821] text-white border-r border-[#C5A46D]/20 flex flex-col py-4 hidden md:flex">
          <div className="px-4 mb-3">
            <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block">
              CMS Navigation
            </span>
          </div>

          <nav className="flex-1 space-y-0.5 px-2 overflow-y-auto">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'homepage', label: 'Homepage Content', icon: Home },
              { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
              { id: 'videos', label: 'Video Gallery', icon: Video },
              { id: 'news', label: 'News & Events', icon: Newspaper },
              { id: 'notices', label: 'Notices & Circulars', icon: Bell },
              { id: 'courses', label: 'Courses & Academics', icon: GraduationCap },
              { id: 'faculty', label: 'Faculty Profiles', icon: Users },
              { id: 'disclosures', label: 'Mandatory Disclosures', icon: FileCheck },
              { id: 'about', label: 'About College', icon: Building2 },
              { id: 'hospital', label: 'Hospital Services', icon: HeartPulse },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
              { id: 'settings', label: 'Website Settings & SEO', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CmsTab)}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-[#173D32] text-[#DFCA9E] border-l-4 border-[#C5A46D] shadow-sm font-semibold'
                      : 'text-[#F6F2E9]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DFCA9E]' : 'text-[#C5A46D]/70'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-4 pt-4 border-t border-[#C5A46D]/20 text-[10px] text-[#81917A]">
            <p>Database: PostgreSQL 17.2</p>
            <p className="mt-0.5">Mode: Single Administrator</p>
          </div>
        </aside>

        {/* Mobile Navigation Dropdown Bar */}
        <div className="md:hidden w-full bg-[#0F2821] text-white p-2 border-b border-[#C5A46D]/30 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#DFCA9E]">Module:</span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as CmsTab)}
            className="bg-[#173D32] text-white text-xs px-2.5 py-1.5 rounded border border-[#C5A46D]/40 outline-none"
          >
            <option value="overview">Dashboard Overview</option>
            <option value="homepage">Homepage Content</option>
            <option value="gallery">Photo Gallery</option>
            <option value="videos">Video Gallery</option>
            <option value="news">News & Events</option>
            <option value="notices">Notices & Circulars</option>
            <option value="courses">Courses & Academics</option>
            <option value="faculty">Faculty Profiles</option>
            <option value="disclosures">Mandatory Disclosures</option>
            <option value="about">About College</option>
            <option value="hospital">Hospital Services</option>
            <option value="testimonials">Testimonials</option>
            <option value="settings">Website Settings & SEO</option>
          </select>
        </div>

        {/* Workspace Panes */}
        <main className="flex-1 bg-[#F6F2E9] p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* ==================== 1. DASHBOARD OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-7xl">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                  Institutional CMS Directorate
                </h1>
                <p className="text-xs sm:text-sm text-[#342B25]/75 mt-0.5">
                  Real-time database metrics, content activity, and quick administrative actions.
                </p>
              </div>

              {/* 8 Primary Real DB Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { title: 'Total Gallery Photos', count: stats.galleryPhotosCount, icon: ImageIcon, tab: 'gallery' },
                  { title: 'Total Videos', count: stats.videosCount, icon: Video, tab: 'videos' },
                  { title: 'Published News', count: stats.publishedNewsCount, icon: Newspaper, tab: 'news' },
                  { title: 'Active Notices', count: stats.activeNoticesCount, icon: Bell, tab: 'notices' },
                  { title: 'Total Documents', count: stats.documentsCount, icon: FileText, tab: 'disclosures' },
                  { title: 'Total Courses', count: stats.coursesCount, icon: GraduationCap, tab: 'courses' },
                  { title: 'Total Departments', count: stats.departmentsCount, icon: Layers, tab: 'courses' },
                  { title: 'Total Faculty Profiles', count: stats.facultyCount, icon: Users, tab: 'faculty' },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveTab(card.tab as CmsTab)}
                      className="bg-white p-4 rounded-xl border border-[#C5A46D]/30 shadow-card hover:shadow-gold transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[#81917A] mb-2">
                        <span className="text-xs font-medium text-[#342B25]/80 group-hover:text-[#173D32] transition-colors line-clamp-1">
                          {card.title}
                        </span>
                        <Icon className="w-4 h-4 text-[#C5A46D] shrink-0" />
                      </div>
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                        {card.count}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Action Strip */}
              <div className="bg-gradient-to-r from-[#173D32] to-[#0F2821] p-5 rounded-xl text-white shadow-luxury flex flex-wrap items-center justify-between gap-3 border border-[#C5A46D]/40">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">Administrative Quick Actions</h3>
                  <p className="text-xs text-[#DFCA9E] font-light">Direct shortcuts to publish official institutional records.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setActiveTab('gallery'); setPhotoModalOpen(true); }}
                    className="px-3 py-1.5 rounded bg-[#C5A46D] text-[#173D32] text-xs font-bold hover:bg-[#DFCA9E] transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Upload Photos</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('notices'); setNoticeModalOpen(true); }}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[#DFCA9E] text-xs font-medium border border-[#C5A46D]/40 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Issue Notice</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('news'); setNewsModalOpen(true); }}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Publish News</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('videos'); setVideoModalOpen(true); }}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Add Video</span>
                  </button>
                </div>
              </div>

              {/* Two Column Grid: Recent Activity & Recent Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Audit Activity */}
                <div className="bg-white p-5 rounded-xl border border-[#C5A46D]/30 shadow-card">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A46D]/20 mb-3">
                    <span className="font-serif text-base font-bold text-[#173D32] flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#C5A46D]" />
                      <span>Recent Administrative Logs</span>
                    </span>
                    <span className="text-[10px] font-semibold text-[#81917A] uppercase">Immutable Records</span>
                  </div>
                  <div className="space-y-2.5">
                    {recentAuditLogs.length === 0 ? (
                      <p className="text-xs text-[#81917A] py-4 text-center">No recent audit logs found.</p>
                    ) : (
                      recentAuditLogs.map((log: any) => (
                        <div key={log.id} className="text-xs flex items-start justify-between py-1.5 border-b border-gray-100 last:border-0">
                          <div>
                            <span className="font-semibold text-[#173D32]">{log.action}</span>
                            <p className="text-[11px] text-[#342B25]/80">{log.details}</p>
                          </div>
                          <span className="text-[10px] text-[#81917A] shrink-0 whitespace-nowrap ml-2">
                            {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recently Published Notices */}
                <div className="bg-white p-5 rounded-xl border border-[#C5A46D]/30 shadow-card">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A46D]/20 mb-3">
                    <span className="font-serif text-base font-bold text-[#173D32] flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-[#C5A46D]" />
                      <span>Active Institutional Notices</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="text-xs text-[#C5A46D] font-semibold hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {noticesList.slice(0, 5).map((n: any) => (
                      <div key={n.id} className="text-xs flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                        <div className="min-w-0 pr-2">
                          <span className="font-medium text-[#173D32] truncate block">{n.title}</span>
                          <span className="text-[10px] text-[#81917A]">{n.category} · {n.date}</span>
                        </div>
                        {n.fileUrl && (
                          <a
                            href={n.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded bg-[#C5A46D]/20 text-[#173D32] text-[10px] font-semibold shrink-0"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. HOMEPAGE MANAGEMENT ==================== */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Homepage Content Management</h1>
                  <p className="text-xs text-[#342B25]/75">Update hero titles, banner visuals, institutional statistics, and highlights.</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setPreviewData({
                        title: 'Homepage Hero & Statistics Live Preview',
                        content: (
                          <div className="p-6 bg-[#173D32] text-white rounded-lg space-y-4">
                            <span className="text-xs uppercase tracking-widest text-[#C5A46D]">Hero Preview</span>
                            <h2 className="font-serif text-2xl font-bold text-white">{homepageContent.heroTitle}</h2>
                            <p className="text-sm text-[#DFCA9E]">{homepageContent.heroSubtitle}</p>
                            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/20 text-center">
                              <div><div className="font-bold text-lg text-[#C5A46D]">{homepageContent.statsOpd}</div><div className="text-[10px]">Annual OPD</div></div>
                              <div><div className="font-bold text-lg text-[#C5A46D]">{homepageContent.statsIpdbeds}</div><div className="text-[10px]">Hospital Beds</div></div>
                              <div><div className="font-bold text-lg text-[#C5A46D]">{homepageContent.statsHerbs}</div><div className="text-[10px]">Herbal Species</div></div>
                              <div><div className="font-bold text-lg text-[#C5A46D]">{homepageContent.statsSeats}</div><div className="text-[10px]">BAMS Intake</div></div>
                            </div>
                          </div>
                        ),
                      });
                    }}
                    className="px-3 py-2 rounded bg-white text-[#173D32] border border-[#C5A46D]/40 text-xs font-semibold hover:bg-gray-50 flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> <span>Preview</span>
                  </button>
                  <button
                    onClick={saveHomepage}
                    className="px-4 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] shadow-luxury"
                  >
                    Save &amp; Publish Homepage
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#173D32] border-b pb-2">Hero Banner Section</h3>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Primary Hero Headline</label>
                  <input
                    type="text"
                    value={homepageContent.heroTitle}
                    onChange={(e) => setHomepageContent({ ...homepageContent, heroTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs focus:ring-1 focus:ring-[#C5A46D] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Hero Subheading &amp; Accreditations</label>
                  <input
                    type="text"
                    value={homepageContent.heroSubtitle}
                    onChange={(e) => setHomepageContent({ ...homepageContent, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs focus:ring-1 focus:ring-[#C5A46D] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Hero Banner Image URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={homepageContent.heroBannerUrl}
                      onChange={(e) => setHomepageContent({ ...homepageContent, heroBannerUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    />
                    <label className="px-3 py-2 rounded bg-[#C5A46D]/20 text-[#173D32] text-xs font-semibold cursor-pointer hover:bg-[#C5A46D]/30 flex items-center space-x-1">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Banner</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const urls = await uploadFiles([e.target.files[0]]);
                            if (urls[0]) setHomepageContent({ ...homepageContent, heroBannerUrl: urls[0] });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <h3 className="font-serif text-base font-semibold text-[#173D32] border-b pb-2 pt-4">Homepage Institutional Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-700 block mb-1">Annual OPD Footfall</label>
                    <input
                      type="text"
                      value={homepageContent.statsOpd}
                      onChange={(e) => setHomepageContent({ ...homepageContent, statsOpd: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-700 block mb-1">Attached Hospital Beds</label>
                    <input
                      type="text"
                      value={homepageContent.statsIpdbeds}
                      onChange={(e) => setHomepageContent({ ...homepageContent, statsIpdbeds: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-700 block mb-1">Dravyaguna Herb Species</label>
                    <input
                      type="text"
                      value={homepageContent.statsHerbs}
                      onChange={(e) => setHomepageContent({ ...homepageContent, statsHerbs: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-700 block mb-1">Annual BAMS Seats</label>
                    <input
                      type="text"
                      value={homepageContent.statsSeats}
                      onChange={(e) => setHomepageContent({ ...homepageContent, statsSeats: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                </div>

                <h3 className="font-serif text-base font-semibold text-[#173D32] border-b pb-2 pt-4">Introduction Text</h3>
                <div>
                  <textarea
                    rows={4}
                    value={homepageContent.introText}
                    onChange={(e) => setHomepageContent({ ...homepageContent, introText: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. PHOTO GALLERY MANAGEMENT ==================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Photo Gallery Management</h1>
                  <p className="text-xs text-[#342B25]/75">Upload, organize, caption, and publish high-resolution campus and hospital photography.</p>
                </div>
                <div className="flex space-x-2">
                  <label className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold cursor-pointer hover:bg-[#0F2821] flex items-center space-x-1.5 shadow-luxury">
                    <UploadCloud className="w-4 h-4 text-[#DFCA9E]" />
                    <span>Upload Multiple Photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const urls = await uploadFiles(e.target.files);
                          for (const url of urls) {
                            await fetch('/api/admin/gallery', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                title: 'New Institutional Photo',
                                category: 'Campus',
                                imageUrl: url,
                                caption: '',
                                order: 0,
                                isPublished: true,
                              }),
                            });
                          }
                          showToast(`Successfully uploaded ${urls.length} photos!`);
                          loadDashboardData();
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => setPhotoModalOpen(true)}
                    className="px-3 py-2 rounded bg-white text-[#173D32] border border-[#C5A46D]/40 text-xs font-semibold hover:bg-gray-50 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Add Photo Manually</span>
                  </button>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photosOnly.map((photo: any) => (
                  <div key={photo.id} className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-sm overflow-hidden group flex flex-col justify-between">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium backdrop-blur-sm">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-2.5 space-y-1">
                      <p className="font-semibold text-xs text-[#173D32] truncate">{photo.title}</p>
                      <p className="text-[10px] text-gray-500 line-clamp-1">{photo.caption || 'No caption'}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${photo.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {photo.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 4. VIDEO GALLERY MANAGEMENT ==================== */}
          {activeTab === 'videos' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Video Gallery Management</h1>
                  <p className="text-xs text-[#342B25]/75">Embed YouTube, Vimeo, and institutional documentary videos.</p>
                </div>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add New Video</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videosOnly.map((vid: any) => (
                  <div key={vid.id} className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                      <iframe
                        src={vid.imageUrl.includes('embed') ? vid.imageUrl : vid.imageUrl.replace('watch?v=', 'embed/')}
                        title={vid.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="font-semibold text-xs text-[#173D32]">{vid.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2">{vid.caption}</p>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-[10px] text-gray-400">Order: {vid.order}</span>
                        <button onClick={() => handleDeletePhoto(vid.id)} className="text-red-600 p-1 hover:text-red-800">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 5. NEWS & EVENTS ==================== */}
          {activeTab === 'news' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">News &amp; Events Management</h1>
                  <p className="text-xs text-[#342B25]/75">Publish college news, academic seminars, free medical camps, and achievements.</p>
                </div>
                <button
                  onClick={() => {
                    setNewsForm({ id: '', title: '', summary: '', content: '', category: 'Institutional', imageUrl: '', isFeatured: false, isPublished: true });
                    setNewsModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add News Article</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#C5A46D]/30 shadow-card overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#173D32] text-[#DFCA9E] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Title &amp; Headline</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Published Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {newsList.map((article: any) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-[#173D32] max-w-xs truncate">{article.title}</td>
                        <td className="p-3 text-gray-600">{article.category}</td>
                        <td className="p-3 text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${article.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {article.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              setNewsForm(article);
                              setNewsModalOpen(true);
                            }}
                            className="p-1 rounded text-[#173D32] hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNews(article.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== 6. NOTICES & CIRCULARS ==================== */}
          {activeTab === 'notices' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Notices &amp; Official Circulars</h1>
                  <p className="text-xs text-[#342B25]/75">Manage academic datesheets, NCISM compliance circulars, and PDF notices.</p>
                </div>
                <button
                  onClick={() => {
                    setNoticeForm({ id: '', title: '', category: 'Academic', date: new Date().toISOString().split('T')[0], fileUrl: '', isPinned: false, isPublished: true });
                    setNoticeModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Issue Official Notice</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#C5A46D]/30 shadow-card overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#173D32] text-[#DFCA9E] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Notice Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Issued Date</th>
                      <th className="p-3">Attachment</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {noticesList.map((notice: any) => (
                      <tr key={notice.id} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-[#173D32] max-w-xs truncate">{notice.title}</td>
                        <td className="p-3 text-gray-600">{notice.category}</td>
                        <td className="p-3 text-gray-500">{notice.date}</td>
                        <td className="p-3">
                          {notice.fileUrl ? (
                            <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C5A46D] font-semibold underline">
                              View PDF
                            </a>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                        <td className="p-3">
                          {notice.isPinned ? <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Pinned</span> : <span className="text-gray-400">Normal</span>}
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              setNoticeForm(notice);
                              setNoticeModalOpen(true);
                            }}
                            className="p-1 rounded text-[#173D32] hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== 7. COURSES & ACADEMICS ==================== */}
          {activeTab === 'courses' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Courses &amp; Academic Programmes</h1>
                  <p className="text-xs text-[#342B25]/75">Manage approved medical degree programmes, annual intakes, and fees.</p>
                </div>
                <button
                  onClick={() => {
                    setCourseForm({ id: '', code: '', title: '', degree: 'Undergraduate', duration: '5.5 Years', intake: 100, eligibility: '', feePerYear: '₹2,25,000 / Year', description: '', syllabusOverview: '', careerOpportunities: '', isApproved: true });
                    setCourseModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coursesList.map((course: any) => (
                  <div key={course.id} className="bg-white p-5 rounded-xl border border-[#C5A46D]/30 shadow-card flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#C5A46D] uppercase tracking-wider">{course.code}</span>
                        <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">NCISM Approved</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#173D32]">{course.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-3">{course.description}</p>
                      <div className="mt-3 pt-3 border-t text-xs space-y-1 text-gray-700">
                        <div><strong>Duration:</strong> {course.duration}</div>
                        <div><strong>Intake:</strong> {course.intake} Seats</div>
                        <div><strong>Annual Fee:</strong> {course.feePerYear}</div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2 border-t">
                      <button
                        onClick={() => {
                          setCourseForm(course);
                          setCourseModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded bg-[#173D32] text-white text-xs font-medium hover:bg-[#0F2821]"
                      >
                        Edit Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 8. FACULTY MANAGEMENT ==================== */}
          {activeTab === 'faculty' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Teaching Faculty Directory</h1>
                  <p className="text-xs text-[#342B25]/75">Manage professor profiles, qualifications, clinical specializations, and orders.</p>
                </div>
                <button
                  onClick={() => {
                    setFacultyForm({ id: '', name: '', designation: 'Professor', qualification: 'BAMS, MD', experienceYears: 10, specialization: 'Kayachikitsa', email: '', phone: '', bio: '', image: '', isHOD: false, isLeadership: false });
                    setFacultyModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add Faculty Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {facultyList.map((fac: any) => (
                  <div key={fac.id} className="bg-white rounded-xl border border-[#C5A46D]/30 shadow-card overflow-hidden flex flex-col justify-between">
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img src={fac.image || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54'} alt={fac.name} className="w-full h-full object-cover" />
                      {fac.isHOD && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#C5A46D] text-[#173D32] text-[10px] font-bold shadow">
                          H.O.D.
                        </span>
                      )}
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#173D32] leading-tight">{fac.name}</h4>
                      <p className="text-[11px] text-[#C5A46D] font-medium">{fac.designation}</p>
                      <p className="text-[10px] text-gray-500">{fac.qualification}</p>
                      <p className="text-[10px] text-gray-600 line-clamp-2 mt-1">{fac.specialization}</p>
                      <div className="flex items-center justify-between pt-2 border-t mt-2">
                        <span className="text-[10px] text-gray-400">{fac.experienceYears} Yrs Exp</span>
                        <div className="space-x-1">
                          <button
                            onClick={() => { setFacultyForm(fac); setFacultyModalOpen(true); }}
                            className="p-1 rounded text-[#173D32] hover:bg-gray-100"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFaculty(fac.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 9. MANDATORY DISCLOSURES ==================== */}
          {activeTab === 'disclosures' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">NCISM Mandatory Disclosures &amp; Documents</h1>
                  <p className="text-xs text-[#342B25]/75">Upload official affiliation orders, clinical registers, and regulatory PDFs across all 16 statutory categories.</p>
                </div>
                <button
                  onClick={() => setDocModalOpen(true)}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Upload Disclosure Document</span>
                </button>
              </div>

              <div className="space-y-4">
                {disclosureCategories.map((cat: any) => (
                  <div key={cat.id} className="bg-white p-4 rounded-xl border border-[#C5A46D]/30 shadow-card">
                    <div className="flex items-center justify-between border-b pb-2 mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#C5A46D] uppercase">Category {cat.categoryNumber}</span>
                        <h3 className="font-serif text-sm font-bold text-[#173D32]">{cat.title}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{cat.documents?.length || 0} PDFs</span>
                    </div>

                    <div className="space-y-1.5">
                      {cat.documents?.map((doc: any) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 rounded bg-gray-50 text-xs">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-[#C5A46D] shrink-0" />
                            <span className="font-medium text-[#173D32]">{doc.title}</span>
                            <span className="text-[10px] text-gray-400">({doc.academicYear})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#C5A46D] font-semibold underline"
                            >
                              Download PDF
                            </a>
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 10. ABOUT COLLEGE ==================== */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">About College Content</h1>
                  <p className="text-xs text-[#342B25]/75">Manage history, vision, mission, and Vedic campus philosophy.</p>
                </div>
                <button
                  onClick={saveAboutPage}
                  className="px-4 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] shadow-luxury"
                >
                  Save About Content
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Institutional History &amp; Foundation</label>
                  <textarea
                    rows={4}
                    value={aboutContent.history}
                    onChange={(e) => setAboutContent({ ...aboutContent, history: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Enter the classical history and foundation story of the college..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Institutional Vision</label>
                  <textarea
                    rows={3}
                    value={aboutContent.vision}
                    onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Enter institutional vision..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Institutional Mission</label>
                  <textarea
                    rows={3}
                    value={aboutContent.mission}
                    onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Enter institutional mission..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 11. HOSPITAL MANAGEMENT CONTENT ==================== */}
          {activeTab === 'hospital' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Hospital Public Information</h1>
                  <p className="text-xs text-[#342B25]/75">Manage public clinical departments, Panchakarma facilities, OPD timings, and emergency services.</p>
                </div>
                <button
                  onClick={saveHospitalPage}
                  className="px-4 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] shadow-luxury"
                >
                  Save Hospital Info
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Hospital Introduction</label>
                  <textarea
                    rows={3}
                    value={hospitalContent.intro}
                    onChange={(e) => setHospitalContent({ ...hospitalContent, intro: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Describe the 100-bed attached Ayurvedic hospital..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Clinical Specialties &amp; Panchakarma</label>
                  <textarea
                    rows={3}
                    value={hospitalContent.panchakarmaFacilities}
                    onChange={(e) => setHospitalContent({ ...hospitalContent, panchakarmaFacilities: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Shirodhara, Vamana, Virechana, Basti, Nasya, Kshara Sutra..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">OPD Schedule &amp; Timings</label>
                  <input
                    type="text"
                    value={hospitalContent.opdSchedule}
                    onChange={(e) => setHospitalContent({ ...hospitalContent, opdSchedule: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="Daily 8:00 AM – 2:00 PM (Emergency 24x7)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 12. TESTIMONIALS ==================== */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Student &amp; Patient Testimonials</h1>
                  <p className="text-xs text-[#342B25]/75">Manage quotes, ratings, and feedback displayed on the public website.</p>
                </div>
                <button
                  onClick={() => {
                    setTestimonialForm({ id: '', authorName: '', role: 'BAMS Scholar', batchOrDesignation: 'Batch 2022-27', quote: '', avatarUrl: '', rating: 5, isPublished: true });
                    setTestimonialModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonialsList.map((t: any) => (
                  <div key={t.id} className="bg-white p-4 rounded-xl border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <img src={t.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'} alt={t.authorName} className="w-10 h-10 rounded-full object-cover border border-[#C5A46D]" />
                        <div>
                          <h4 className="font-bold text-xs text-[#173D32]">{t.authorName}</h4>
                          <span className="text-[10px] text-gray-500">{t.role} · {t.batchOrDesignation}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 italic">“{t.quote}”</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t mt-3">
                      <span className="text-xs text-amber-500 font-bold">★ {t.rating}/5</span>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== 13. WEBSITE SETTINGS & SEO ==================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32]">Website Settings &amp; SEO Configuration</h1>
                  <p className="text-xs text-[#342B25]/75">Configure college address, helplines, email contacts, Google Maps, and social media URLs.</p>
                </div>
                <button
                  onClick={saveSettings}
                  className="px-4 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] shadow-luxury"
                >
                  Save Global Settings
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#173D32] border-b pb-2">Institutional Contact Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#173D32] block mb-1">Admissions Helpline Phone</label>
                    <input
                      type="text"
                      value={websiteSettings['contact_phone'] || '+91 98290 44120'}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, contact_phone: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#173D32] block mb-1">Admissions Email Address</label>
                    <input
                      type="email"
                      value={websiteSettings['contact_email'] || 'admissions@hariduttayurveda.edu.in'}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, contact_email: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Campus Physical Address</label>
                  <input
                    type="text"
                    value={websiteSettings['campus_address'] || '5FR3+37H, near technology park, L. B. Shastri Nagar Colony, Sewar, Bharatpur, Sewar, Rajasthan 321001'}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, campus_address: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>

                <h3 className="font-serif text-base font-semibold text-[#173D32] border-b pb-2 pt-4">Google Maps &amp; Social Links</h3>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Google Maps Embed URL / Query</label>
                  <input
                    type="text"
                    value={websiteSettings['google_maps_url'] || ''}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, google_maps_url: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-300 text-xs outline-none"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#173D32] block mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={websiteSettings['social_facebook'] || ''}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, social_facebook: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#173D32] block mb-1">YouTube Channel URL</label>
                    <input
                      type="text"
                      value={websiteSettings['social_youtube'] || ''}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, social_youtube: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#173D32] block mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={websiteSettings['social_instagram'] || ''}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, social_instagram: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================== CHANGE PASSWORD MODAL ==================== */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-md w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-[#C5A46D]" />
                <h3 className="font-serif font-bold text-base text-[#173D32]">Change Admin Password</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPasswordModalOpen(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Current Password *</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 rounded border border-gray-300 text-xs outline-none focus:border-[#C5A46D] transition-colors"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#173D32] transition-colors focus:outline-none"
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    title={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">New Password (min 10 chars) *</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 rounded border border-gray-300 text-xs outline-none focus:border-[#C5A46D] transition-colors"
                    placeholder="Enter new password (min 10 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#173D32] transition-colors focus:outline-none"
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                    title={showNewPassword ? 'Hide new password' : 'Show new password'}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 pr-10 rounded border border-gray-300 text-xs outline-none focus:border-[#C5A46D] transition-colors"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#173D32] transition-colors focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                  }}
                  className="px-3 py-1.5 rounded text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] disabled:opacity-50"
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== PHOTO MODAL ==================== */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">Add Photo to Gallery</h3>
              <button onClick={() => setPhotoModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreatePhoto} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Category</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                >
                  <option value="Campus">Campus &amp; Architecture</option>
                  <option value="Hospital">Hospital &amp; Panchakarma</option>
                  <option value="Classrooms">Classrooms &amp; Laboratories</option>
                  <option value="Events">Events &amp; Convocations</option>
                  <option value="Seminars">Seminars &amp; CMEs</option>
                  <option value="Cultural">Cultural &amp; Sports</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Image File Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const urls = await uploadFiles([e.target.files[0]]);
                      if (urls[0]) setNewPhoto({ ...newPhoto, imageUrl: urls[0] });
                    }
                  }}
                  className="w-full text-xs text-gray-600"
                />
                {newPhoto.imageUrl && (
                  <div className="mt-2 text-[10px] text-green-700 font-semibold truncate">Uploaded: {newPhoto.imageUrl}</div>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setPhotoModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold">
                  {uploading ? 'Uploading...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== VIDEO MODAL ==================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">Add Video to Gallery</h3>
              <button onClick={() => setVideoModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreateVideo} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">YouTube / Vimeo Embed URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/embed/..."
                  value={newVideo.videoUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newVideo.caption}
                  onChange={(e) => setNewVideo({ ...newVideo, caption: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setVideoModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== NOTICE MODAL ==================== */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">{noticeForm.id ? 'Edit Notice' : 'Issue Official Notice'}</h3>
              <button onClick={() => setNoticeModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveNotice} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Admissions">Admissions</option>
                    <option value="NCISM">NCISM Regulatory</option>
                    <option value="General">General Circular</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={noticeForm.date}
                    onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Upload Notice PDF Document</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const urls = await uploadFiles([e.target.files[0]]);
                      if (urls[0]) setNoticeForm({ ...noticeForm, fileUrl: urls[0] });
                    }
                  }}
                  className="w-full text-xs text-gray-600"
                />
                {noticeForm.fileUrl && (
                  <div className="mt-1 text-[10px] text-green-700 font-semibold truncate">Attached: {noticeForm.fileUrl}</div>
                )}
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-1.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noticeForm.isPinned}
                    onChange={(e) => setNoticeForm({ ...noticeForm, isPinned: e.target.checked })}
                    className="rounded text-[#173D32]"
                  />
                  <span>Pin Notice to Top</span>
                </label>
                <label className="flex items-center space-x-1.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noticeForm.isPublished}
                    onChange={(e) => setNoticeForm({ ...noticeForm, isPublished: e.target.checked })}
                    className="rounded text-[#173D32]"
                  />
                  <span>Publish Immediately</span>
                </label>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setNoticeModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold">Save Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== NEWS MODAL ==================== */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-xl w-full p-6 my-8 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">
                {newsForm.id ? 'Edit News Article' : 'Publish New Article / Event'}
              </h3>
              <button onClick={() => setNewsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveNews} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. National Ayurveda Day Celebrated with 500+ Patients"
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none focus:border-[#C5A46D]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  >
                    <option value="Institutional">Institutional</option>
                    <option value="Academic">Academic &amp; Seminars</option>
                    <option value="Hospital">Hospital &amp; Health Camps</option>
                    <option value="Achievements">Achievements &amp; Awards</option>
                    <option value="Sports">Sports &amp; Cultural</option>
                    <option value="Research">Research &amp; Publications</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Featured Article</label>
                  <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer pt-1.5">
                    <input
                      type="checkbox"
                      checked={newsForm.isFeatured}
                      onChange={(e) => setNewsForm({ ...newsForm, isFeatured: e.target.checked })}
                      className="rounded text-[#173D32]"
                    />
                    <span>Highlight on Homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const urls = await uploadFiles([e.target.files[0]]);
                      if (urls[0]) setNewsForm({ ...newsForm, imageUrl: urls[0] });
                    }
                  }}
                  className="w-full text-xs text-gray-600 mb-1"
                />
                <input
                  type="text"
                  value={newsForm.imageUrl}
                  onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                  placeholder="Or enter image URL"
                  className="w-full px-3 py-1 rounded border border-gray-200 text-xs outline-none"
                />
                {newsForm.imageUrl && (
                  <div className="mt-1.5 flex items-center space-x-2">
                    <img src={newsForm.imageUrl} alt="Preview" className="w-12 h-9 object-cover rounded border" />
                    <span className="text-[10px] text-green-700 truncate">{newsForm.imageUrl}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  placeholder="Brief 1-2 sentence summary displayed on cards and news lists..."
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Full Article Content *</label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Comprehensive news details, event outcomes, quotes, and descriptions..."
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-1.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsForm.isPublished}
                    onChange={(e) => setNewsForm({ ...newsForm, isPublished: e.target.checked })}
                    className="rounded text-[#173D32]"
                  />
                  <span>Publish Immediately (Visible to Public)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setNewsModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821]">
                  {uploading ? 'Uploading...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== COURSE MODAL ==================== */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6 my-8 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">
                {courseForm.id ? 'Edit Academic Programme' : 'Add New Academic Programme'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveCourse} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.code}
                    onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                    placeholder="e.g. BAMS"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Approved Intake (Seats)</label>
                  <input
                    type="number"
                    value={courseForm.intake}
                    onChange={(e) => setCourseForm({ ...courseForm, intake: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Programme Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Bachelor of Ayurvedic Medicine and Surgery"
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Degree Type</label>
                  <select
                    value={courseForm.degree}
                    onChange={(e) => setCourseForm({ ...courseForm, degree: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  >
                    <option value="Undergraduate">Undergraduate (UG)</option>
                    <option value="Postgraduate">Postgraduate (PG)</option>
                    <option value="Diploma">Diploma / Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 5.5 Years"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={courseForm.eligibility}
                  onChange={(e) => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                  placeholder="e.g. 10+2 with PCB (50%) &amp; NEET UG Qualified"
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Fee Structure</label>
                <input
                  type="text"
                  value={courseForm.feePerYear}
                  onChange={(e) => setCourseForm({ ...courseForm, feePerYear: e.target.value })}
                  placeholder="e.g. ₹2,25,000 / Year"
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Overview &amp; Curriculum Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setCourseModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821]">Save Programme</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== FACULTY MODAL ==================== */}
      {facultyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-xl w-full p-6 my-8 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">
                {facultyForm.id ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <button onClick={() => setFacultyModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveFaculty} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={facultyForm.name}
                    onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                    placeholder="e.g. Dr. Vaidya Kripashankar Vyas"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={facultyForm.designation}
                    onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                    placeholder="e.g. Professor &amp; HOD"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Qualification</label>
                  <input
                    type="text"
                    value={facultyForm.qualification}
                    onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                    placeholder="e.g. BAMS, MD (Ayu)"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Specialization</label>
                  <input
                    type="text"
                    value={facultyForm.specialization}
                    onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })}
                    placeholder="e.g. Kayachikitsa"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={facultyForm.experienceYears}
                    onChange={(e) => setFacultyForm({ ...facultyForm, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Email</label>
                  <input
                    type="email"
                    value={facultyForm.email}
                    onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Phone</label>
                  <input
                    type="text"
                    value={facultyForm.phone}
                    onChange={(e) => setFacultyForm({ ...facultyForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Faculty Portrait Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const urls = await uploadFiles([e.target.files[0]]);
                      if (urls[0]) setFacultyForm({ ...facultyForm, image: urls[0] });
                    }
                  }}
                  className="w-full text-xs text-gray-600 mb-1"
                />
                <input
                  type="text"
                  value={facultyForm.image}
                  onChange={(e) => setFacultyForm({ ...facultyForm, image: e.target.value })}
                  placeholder="Or enter portrait image URL"
                  className="w-full px-3 py-1 rounded border border-gray-200 text-xs outline-none"
                />
              </div>
              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-1.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={facultyForm.isHOD}
                    onChange={(e) => setFacultyForm({ ...facultyForm, isHOD: e.target.checked })}
                    className="rounded text-[#173D32]"
                  />
                  <span>Head of Department (HOD)</span>
                </label>
                <label className="flex items-center space-x-1.5 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={facultyForm.isLeadership}
                    onChange={(e) => setFacultyForm({ ...facultyForm, isLeadership: e.target.checked })}
                    className="rounded text-[#173D32]"
                  />
                  <span>Executive / Clinical Leadership</span>
                </label>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Academic &amp; Clinical Biography</label>
                <textarea
                  rows={3}
                  value={facultyForm.bio}
                  onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setFacultyModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821]">
                  {uploading ? 'Uploading...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== DISCLOSURE DOCUMENT MODAL ==================== */}
      {docModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">Upload NCISM Mandatory Document</h3>
              <button onClick={() => setDocModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveDocument} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="e.g. NCISM Annual Affiliation &amp; Permission Order"
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Category *</label>
                  <select
                    required
                    value={docForm.categoryId}
                    onChange={(e) => setDocForm({ ...docForm, categoryId: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  >
                    <option value="">Select Category...</option>
                    {disclosureCategories.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={docForm.academicYear}
                    onChange={(e) => setDocForm({ ...docForm, academicYear: e.target.value })}
                    placeholder="2026-27"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Upload PDF Document *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const urls = await uploadFiles([e.target.files[0]]);
                      if (urls[0]) setDocForm({ ...docForm, fileUrl: urls[0] });
                    }
                  }}
                  className="w-full text-xs text-gray-600 mb-1"
                />
                <input
                  type="text"
                  value={docForm.fileUrl}
                  onChange={(e) => setDocForm({ ...docForm, fileUrl: e.target.value })}
                  placeholder="Or enter PDF URL"
                  className="w-full px-3 py-1 rounded border border-gray-200 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setDocModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" disabled={uploading} className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821]">
                  {uploading ? 'Uploading...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== TESTIMONIAL MODAL ==================== */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-lg w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">Add Scholar / Patient Review</h3>
              <button onClick={() => setTestimonialModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.authorName}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, authorName: e.target.value })}
                    placeholder="e.g. Vaidya Ananya Sharma"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Role / Affiliation</label>
                  <select
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  >
                    <option value="BAMS Scholar">BAMS Scholar</option>
                    <option value="Hospital Patient">Hospital Patient</option>
                    <option value="Alumni">Alumni Physician</option>
                    <option value="Parent">Parent / Guardian</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Batch / City</label>
                  <input
                    type="text"
                    value={testimonialForm.batchOrDesignation}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, batchOrDesignation: e.target.value })}
                    placeholder="e.g. Batch 2022-27"
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173D32] block mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#173D32] block mb-1">Review / Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  placeholder="Share the authentic learning experience, clinical training, or healing journey..."
                  className="w-full px-3 py-1.5 rounded border border-gray-300 text-xs outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button type="button" onClick={() => setTestimonialModalOpen(false)} className="px-3 py-1.5 rounded text-xs text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821]">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== PREVIEW MODAL ==================== */}
      {previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C5A46D] max-w-2xl w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif font-bold text-base text-[#173D32]">{previewData.title}</h3>
              <button onClick={() => setPreviewData(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div>{previewData.content}</div>
            <div className="flex justify-end pt-4 border-t mt-4">
              <button onClick={() => setPreviewData(null)} className="px-4 py-1.5 rounded bg-[#173D32] text-white text-xs font-semibold">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
