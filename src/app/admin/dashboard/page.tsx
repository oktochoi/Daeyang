'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { createPerformanceProject, getPerformanceProjects, deletePerformanceProject, updatePerformanceProject, uploadImage, getContactInquiries, PerformanceProject as SupabasePerformanceProject, ContactInquiry } from '@/lib/supabase';
import { 
  getPressReleases, 
  createPressRelease, 
  updatePressRelease,
  deletePressRelease,
  getCertifications,
  getAwards,
  createAwardCertification,
  updateAwardCertification,
  deleteAwardCertification,
  getTechnicalResources,
  createTechnicalResource,
  updateTechnicalResource,
  deleteTechnicalResource,
  getMediaVideos,
  createMediaVideo,
  updateMediaVideo,
  deleteMediaVideo,
  PressRelease,
  AwardCertification,
  TechnicalResource,
  MediaVideo
} from '@/lib/supabase-media';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [performanceProjects, setPerformanceProjects] = useState<SupabasePerformanceProject[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [certifications, setCertifications] = useState<AwardCertification[]>([]);
  const [awards, setAwards] = useState<AwardCertification[]>([]);
  const [technicalResources, setTechnicalResources] = useState<TechnicalResource[]>([]);
  const [videos, setVideos] = useState<MediaVideo[]>([]);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 폼 상태
  const [pressReleaseForm, setPressReleaseForm] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    url: '',
    published_date: '',
    featured_image: ''
  });
  const [awardForm, setAwardForm] = useState({
    type: 'certification' as 'certification' | 'award',
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    url: '',
    award_date: '',
    featured_image: ''
  });
  const [technicalForm, setTechnicalForm] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    url: '',
    document_type: '',
    featured_image: ''
  });
  const [videoForm, setVideoForm] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    url: '',
    published_date: '',
    featured_image: ''
  });
  const [uploadingImages, setUploadingImages] = useState({
    pressRelease: false,
    award: false,
    technical: false,
    video: false
  });
  const [editingPerformanceId, setEditingPerformanceId] = useState<number | null>(null);
  const [editingPressId, setEditingPressId] = useState<number | null>(null);
  const [editingAwardId, setEditingAwardId] = useState<number | null>(null);
  const [editingTechnicalId, setEditingTechnicalId] = useState<number | null>(null);
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);
  
  // 실제 데이터 기반 통계 계산 (sectionId: 클릭 시 해당 칸으로 스크롤)
  const stats = [
    { title: '문의', count: contactInquiries.length, icon: 'ri-mail-line', color: 'bg-indigo-500', link: '#', sectionId: 'section-contact' },
    { title: '보도자료', count: pressReleases.length, icon: 'ri-newspaper-line', color: 'bg-blue-500', link: '/media/press', sectionId: 'section-press' },
    { title: '인증', count: certifications.length, icon: 'ri-verified-badge-line', color: 'bg-blue-500', link: '/media/certification', sectionId: 'section-award' },
    { title: '수상', count: awards.length, icon: 'ri-award-line', color: 'bg-yellow-500', link: '/media/awards', sectionId: 'section-award' },
    { title: '기술 자료', count: technicalResources.length, icon: 'ri-file-text-line', color: 'bg-green-500', link: '/product/technical', sectionId: 'section-technical' },
    { title: '영상', count: videos.length, icon: 'ri-play-circle-line', color: 'bg-violet-500', link: '/media/video', sectionId: 'section-video' },
    { title: '적용 실적', count: performanceProjects.length, icon: 'ri-building-line', color: 'bg-teal-500', link: '/performance', sectionId: 'section-performance' }
  ];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: ''
  });

  // 인증 체크
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/check');
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadPerformanceProjects();
          loadPressReleases();
          loadCertifications();
          loadAwards();
          loadTechnicalResources();
          loadVideos();
          loadContactInquiries();
        } else {
          setIsAuthenticated(false);
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        router.push('/admin');
      }
    }
    checkAuth();
  }, [router]);

  // 로그아웃 핸들러
  async function handleLogout() {
    if (!confirm('로그아웃 하시겠습니까?')) {
      return;
    }

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  }

  // 인증되지 않은 경우 로딩 표시
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // 리다이렉트 중
  }

  async function loadPerformanceProjects() {
    setIsLoading(true);
    try {
      const projects = await getPerformanceProjects();
      setPerformanceProjects(projects || []);
    } catch (error) {
      console.error('Error loading performance projects:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadPressReleases() {
    try {
      const releases = await getPressReleases();
      setPressReleases(releases || []);
    } catch (error) {
      console.error('Error loading press releases:', error);
    }
  }

  async function loadCertifications() {
    try {
      const data = await getCertifications();
      setCertifications(data || []);
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
  }

  async function loadAwards() {
    try {
      const data = await getAwards();
      setAwards(data || []);
    } catch (error) {
      console.error('Error loading awards:', error);
    }
  }

  async function loadTechnicalResources() {
    try {
      const resources = await getTechnicalResources();
      setTechnicalResources(resources || []);
    } catch (error) {
      console.error('Error loading technical resources:', error);
    }
  }

  async function loadVideos() {
    try {
      const data = await getMediaVideos();
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading media videos:', error);
    }
  }

  async function loadContactInquiries() {
    try {
      const data = await getContactInquiries();
      setContactInquiries(data || []);
    } catch (error) {
      console.error('Error loading contact inquiries:', error);
    }
  }

  // 프로젝트 추가 또는 수정 (기본 정보만)
  async function handleAddPerformance(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const finalIcon = iconImage || '🇰🇷';
      const project = {
        title: formData.title,
        title_en: formData.titleEn || undefined,
        icon: finalIcon,
        description: formData.description || undefined,
        description_en: formData.descriptionEn || undefined,
      };

      if (editingPerformanceId !== null) {
        const updated = await updatePerformanceProject(editingPerformanceId, project);
        if (updated) {
          alert('적용 실적이 수정되었습니다.');
          setEditingPerformanceId(null);
          setFormData({ title: '', titleEn: '', description: '', descriptionEn: '' });
          setIconImage(null);
          loadPerformanceProjects();
        } else {
          alert('적용 실적 수정에 실패했습니다.');
        }
      } else {
        const created = await createPerformanceProject(project);
        if (created) {
          alert('프로젝트가 성공적으로 생성되었습니다. 이제 프로젝트에 항목을 추가할 수 있습니다.');
          setFormData({ title: '', titleEn: '', description: '', descriptionEn: '' });
          setIconImage(null);
          loadPerformanceProjects();
        } else {
          alert('프로젝트 생성에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error adding performance project:', error);
      alert(editingPerformanceId !== null ? '적용 실적 수정 중 오류가 발생했습니다.' : '프로젝트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 적용실적 삭제
  async function handleDeletePerformance(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await deletePerformanceProject(id);
      if (success) {
        alert('적용 실적이 삭제되었습니다.');
        loadPerformanceProjects();
      } else {
        alert('적용 실적 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting performance project:', error);
      alert('적용 실적 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 보도 자료 추가 또는 수정
  async function handleAddPressRelease(e: React.FormEvent) {
    e.preventDefault();
    if (!pressReleaseForm.title || !pressReleaseForm.url) {
      alert('제목과 URL은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: pressReleaseForm.title,
        title_en: pressReleaseForm.title_en || undefined,
        description: pressReleaseForm.description || undefined,
        description_en: pressReleaseForm.description_en || undefined,
        url: pressReleaseForm.url,
        featured_image: pressReleaseForm.featured_image || undefined,
        published_date: pressReleaseForm.published_date || undefined,
      };

      if (editingPressId !== null) {
        const updated = await updatePressRelease(editingPressId, payload);
        if (updated) {
          alert('보도 자료가 수정되었습니다.');
          setEditingPressId(null);
          setPressReleaseForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' });
          loadPressReleases();
        } else {
          alert('보도 자료 수정에 실패했습니다.');
        }
      } else {
        const created = await createPressRelease(payload);
        if (created) {
          alert('보도 자료가 추가되었습니다.');
          setPressReleaseForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' });
          loadPressReleases();
        } else {
          alert('보도 자료 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error saving press release:', error);
      alert('보도 자료 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 보도 자료 삭제
  async function handleDeletePressRelease(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await deletePressRelease(id);
      if (success) {
        alert('보도 자료가 삭제되었습니다.');
        loadPressReleases();
      } else {
        alert('보도 자료 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting press release:', error);
      alert('보도 자료 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 인증 및 수상 추가 또는 수정
  async function handleAddAward(e: React.FormEvent) {
    e.preventDefault();
    if (!awardForm.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        type: awardForm.type,
        category: awardForm.type,
        title: awardForm.title,
        title_en: awardForm.title_en || undefined,
        description: awardForm.description || undefined,
        description_en: awardForm.description_en || undefined,
        url: awardForm.url || undefined,
        featured_image: awardForm.featured_image || undefined,
        award_date: awardForm.award_date || undefined,
      };

      if (editingAwardId !== null) {
        const updated = await updateAwardCertification(editingAwardId, payload);
        if (updated) {
          alert('수정되었습니다.');
          setEditingAwardId(null);
          setAwardForm({ type: awardForm.type, title: '', title_en: '', description: '', description_en: '', url: '', award_date: '', featured_image: '' });
          loadCertifications();
          loadAwards();
        } else {
          alert('수정에 실패했습니다.');
        }
      } else {
        const created = await createAwardCertification(payload);
        if (created) {
          alert(awardForm.type === 'certification' ? '인증이 추가되었습니다.' : '수상이 추가되었습니다.');
          setAwardForm({ type: awardForm.type, title: '', title_en: '', description: '', description_en: '', url: '', award_date: '', featured_image: '' });
          loadCertifications();
          loadAwards();
        } else {
          alert(
            '인증/수상 추가에 실패했습니다.\n\n인증과 수상이 구분되어 보이려면 Supabase awards_certifications 테이블에 category 컬럼이 필요합니다.\n\nSupabase 대시보드 → SQL Editor에서 아래를 실행해 주세요:\n\nALTER TABLE awards_certifications ADD COLUMN IF NOT EXISTS category text CHECK (category IN (\'certification\', \'award\')) DEFAULT \'award\';'
          );
        }
      }
    } catch (error) {
      console.error('Error saving award:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 인증 및 수상 삭제
  async function handleDeleteAward(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await deleteAwardCertification(id);
      if (success) {
        alert('삭제되었습니다.');
        loadCertifications();
        loadAwards();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting award certification:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 기술자료 추가 또는 수정
  async function handleAddTechnicalResource(e: React.FormEvent) {
    e.preventDefault();
    if (!technicalForm.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: technicalForm.title,
        title_en: technicalForm.title_en || undefined,
        description: technicalForm.description || undefined,
        description_en: technicalForm.description_en || undefined,
        url: technicalForm.url || undefined,
        featured_image: technicalForm.featured_image || undefined,
        document_type: technicalForm.document_type || undefined,
      };

      if (editingTechnicalId !== null) {
        const updated = await updateTechnicalResource(editingTechnicalId, payload);
        if (updated) {
          alert('기술자료가 수정되었습니다.');
          setEditingTechnicalId(null);
          setTechnicalForm({ title: '', title_en: '', description: '', description_en: '', url: '', document_type: '', featured_image: '' });
          loadTechnicalResources();
        } else {
          alert('기술자료 수정에 실패했습니다.');
        }
      } else {
        const created = await createTechnicalResource(payload);
        if (created) {
          alert('기술자료가 추가되었습니다.');
          setTechnicalForm({ title: '', title_en: '', description: '', description_en: '', url: '', document_type: '', featured_image: '' });
          loadTechnicalResources();
        } else {
          alert('기술자료 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error saving technical resource:', error);
      alert('기술자료 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 기술자료 삭제
  async function handleDeleteTechnicalResource(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await deleteTechnicalResource(id);
      if (success) {
        alert('기술자료가 삭제되었습니다.');
        loadTechnicalResources();
      } else {
        alert('기술자료 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting technical resource:', error);
      alert('기술자료 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 영상 추가 또는 수정
  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!videoForm.title || !videoForm.url) {
      alert('제목과 영상 URL은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: videoForm.title,
        title_en: videoForm.title_en || undefined,
        description: videoForm.description || undefined,
        description_en: videoForm.description_en || undefined,
        url: videoForm.url,
        published_date: videoForm.published_date || undefined,
      };

      if (editingVideoId !== null) {
        const updated = await updateMediaVideo(editingVideoId, payload);
        if (updated) {
          alert('영상이 수정되었습니다.');
          setEditingVideoId(null);
          setVideoForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' });
          loadVideos();
        } else {
          alert('영상 수정에 실패했습니다.');
        }
      } else {
        const created = await createMediaVideo(payload);
        if (created) {
          alert('영상이 추가되었습니다.');
          setVideoForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' });
          loadVideos();
        } else {
          alert('영상 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error saving video:', error);
      alert('영상 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 영상 삭제
  async function handleDeleteVideo(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setIsLoading(true);
    try {
      const success = await deleteMediaVideo(id);
      if (success) {
        alert('영상이 삭제되었습니다.');
        loadVideos();
      } else {
        alert('영상 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('영상 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }


  const quickActions = [
    {
      title: '보도자료 관리',
      description: '보도자료 추가/수정/삭제',
      icon: 'ri-newspaper-line',
      link: '/media/press',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: '인증 관리',
      description: '인증 내역 관리',
      icon: 'ri-verified-badge-line',
      link: '/media/certification',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: '수상 관리',
      description: '수상 내역 관리',
      icon: 'ri-award-line',
      link: '/media/awards',
      color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    },
    {
      title: '기술 자료 관리',
      description: '기술 문서, 가이드라인 관리',
      icon: 'ri-file-text-line',
      link: '/product/technical',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: '영상 관리',
      description: '영상 URL 등록 및 관리',
      icon: 'ri-play-circle-line',
      link: '/media/video',
      color: 'bg-violet-50 text-violet-600 hover:bg-violet-100'
    },
    {
      title: '적용 실적 관리',
      description: '프로젝트 실적 관리',
      icon: 'ri-building-line',
      link: '/performance',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-shield-user-line text-xl text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">관리자 대시보드</h1>
                <p className="text-sm text-gray-500">대양환경기술 관리자 페이지</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <i className="ri-home-line"></i>
                홈으로
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                <i className="ri-logout-box-line"></i>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - 클릭 시 해당 칸으로 스크롤 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <button
              key={index}
              type="button"
              onClick={() => stat.sectionId && scrollToSection(stat.sectionId)}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-300 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <i className={`${stat.icon} text-xl text-white`}></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 문의 목록 (Contact) */}
        <div id="section-contact" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">문의 목록</h2>
              <p className="text-sm text-gray-500 mt-1">문의하기 페이지에서 접수된 문의입니다</p>
            </div>
            <button
              type="button"
              onClick={loadContactInquiries}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="ri-refresh-line mr-1"></i>새로고침
            </button>
          </div>
          {contactInquiries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <i className="ri-inbox-line text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-500">접수된 문의가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600">
                    <th className="py-3 px-2 font-medium">접수일시</th>
                    <th className="py-3 px-2 font-medium">이름</th>
                    <th className="py-3 px-2 font-medium">회사</th>
                    <th className="py-3 px-2 font-medium">이메일</th>
                    <th className="py-3 px-2 font-medium">연락처</th>
                    <th className="py-3 px-2 font-medium">산업</th>
                    <th className="py-3 px-2 font-medium">문의 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {contactInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-2 text-gray-500 whitespace-nowrap">
                        {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('ko-KR') : '-'}
                      </td>
                      <td className="py-3 px-2">{inquiry.name ?? '-'}</td>
                      <td className="py-3 px-2">{inquiry.company ?? '-'}</td>
                      <td className="py-3 px-2">
                        {inquiry.email ? (
                          <a href={`mailto:${inquiry.email}`} className="text-teal-600 hover:underline">{inquiry.email}</a>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-2">{inquiry.phone ?? '-'}</td>
                      <td className="py-3 px-2">{inquiry.industry ?? '-'}</td>
                      <td className="py-3 px-2 max-w-xs">
                        <span className="line-clamp-2 text-gray-700" title={inquiry.message ?? ''}>{inquiry.message ?? '-'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Performance Management */}
        <div id="section-performance" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">적용 실적 관리</h2>
              <p className="text-sm text-gray-500 mt-1">프로젝트를 생성하고 항목을 추가하세요</p>
            </div>
          </div>
          
          {/* Add/Edit Project Form - 간소화 */}
          <div className="mb-8 p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-200">
            {editingPerformanceId !== null && (
              <p className="text-sm text-teal-700 mb-4 font-medium">
                적용 실적 수정 중 · <button type="button" onClick={() => { setEditingPerformanceId(null); setFormData({ title: '', titleEn: '', description: '', descriptionEn: '' }); setIconImage(null); }} className="underline">취소</button>
              </p>
            )}
            <form onSubmit={handleAddPerformance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="적용 실적 제목을 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 (영문, 선택사항)
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="English title (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이콘 (이미지 업로드, 선택사항)
                </label>
                
                {/* 이미지 업로드 */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">이미지 업로드 (선택사항, 없으면 기본값 🇰🇷 사용)</label>
                  <div className="flex items-center gap-3">
                    {iconImage ? (
                      <div className="relative w-16 h-16">
                        <Image src={iconImage} alt="Icon preview" fill className="object-cover rounded-lg border-2 border-teal-500" unoptimized />
                        <button
                          type="button"
                          onClick={() => setIconImage(null)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors flex items-center gap-2">
                        <i className="ri-upload-line"></i>
                        <span className="text-sm">이미지 업로드</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // 파일 크기 체크 (5MB)
                            const maxSize = 5 * 1024 * 1024; // 5MB
                            if (file.size > maxSize) {
                              alert('파일 크기는 5MB 이하여야 합니다.');
                              e.target.value = '';
                              return;
                            }

                            setUploadingIcon(true);
                            try {
                              const url = await uploadImage(file, 'icons');
                              if (url) {
                                setIconImage(url);
                              } else {
                                alert('파일 업로드에 실패했습니다.');
                              }
                            } catch (error) {
                              console.error('Error uploading icon:', error);
                              alert('파일 업로드 중 오류가 발생했습니다.');
                            } finally {
                              setUploadingIcon(false);
                              e.target.value = '';
                            }
                          }}
                          disabled={uploadingIcon}
                        />
                      </label>
                    )}
                    {uploadingIcon && (
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600 mr-2"></div>
                        업로드 중...
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">* 이미지를 업로드하지 않으면 기본 아이콘(🇰🇷)이 사용됩니다.</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (선택사항)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="프로젝트에 대한 간단한 설명"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (영문, 선택사항)
                </label>
                <textarea
                  rows={2}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="Description (English, optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (editingPerformanceId !== null ? '수정 중...' : '생성 중...') : (editingPerformanceId !== null ? '수정 완료' : '프로젝트 생성')}
              </button>
            </form>
          </div>
          
          {/* Projects List - 카드 형식 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">프로젝트 목록</h3>
            {isLoading && performanceProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                <p className="mt-4 text-gray-600">로딩 중...</p>
              </div>
            ) : performanceProjects.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <i className="ri-inbox-line text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceProjects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                            <Image src={project.icon} alt="Project icon" fill className="object-cover" unoptimized />
                          ) : project.icon && !project.icon.startsWith('ri-') && project.icon.length <= 2 ? (
                            <span className="text-3xl leading-none">{project.icon}</span>
                          ) : project.icon && project.icon.startsWith('ri-') ? (
                            <i className={`${project.icon} text-xl`}></i>
                          ) : (
                            <span className="text-3xl leading-none">🇰🇷</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {project.items ? `${project.items.length}개 항목` : '0개 항목'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPerformanceId(project.id);
                          setFormData({
                            title: project.title,
                            titleEn: project.title_en || '',
                            description: project.description || '',
                            descriptionEn: project.description_en || ''
                          });
                          setIconImage(project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? project.icon : null);
                          document.getElementById('section-performance')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="px-3 py-2 border border-teal-300 text-teal-700 text-sm font-medium rounded-lg hover:bg-teal-50 transition-colors"
                        title="수정"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <Link
                        href={`/admin/performance/${project.id}`}
                        className="flex-1 px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors text-center"
                      >
                        <i className="ri-settings-3-line mr-1"></i>
                        항목 관리
                      </Link>
                      <Link
                        href={`/performance/${project.id}`}
                        target="_blank"
                        className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        title="미리보기"
                      >
                        <i className="ri-eye-line"></i>
                      </Link>
                      <button
                        onClick={() => handleDeletePerformance(project.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                        disabled={isLoading}
                        title="삭제"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Press Releases Management */}
        <div id="section-press" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">보도 자료 관리</h2>
              <p className="text-sm text-gray-500 mt-1">보도 자료를 추가하고 관리하세요</p>
            </div>
          </div>

          {/* Add Press Release Form */}
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <form onSubmit={handleAddPressRelease} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={pressReleaseForm.title}
                    onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, title: e.target.value })}
                    placeholder="보도 자료 제목"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 (영문)
                  </label>
                  <input
                    type="text"
                    value={pressReleaseForm.title_en}
                    onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, title_en: e.target.value })}
                    placeholder="English title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={pressReleaseForm.url}
                    onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, url: e.target.value })}
                    placeholder="https://example.com/article"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    발행 날짜
                  </label>
                  <input
                    type="date"
                    value={pressReleaseForm.published_date}
                    onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, published_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (한국어)
                </label>
                <textarea
                  rows={2}
                  value={pressReleaseForm.description}
                  onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, description: e.target.value })}
                  placeholder="간단한 설명 (한국어)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (영문)
                </label>
                <textarea
                  rows={2}
                  value={pressReleaseForm.description_en}
                  onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, description_en: e.target.value })}
                  placeholder="Description (English) - 영어 전환 시 표시됩니다"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대표 사진
                </label>
                <div className="flex items-center gap-3">
                  {pressReleaseForm.featured_image ? (
                    <div className="relative w-24 h-24">
                      <Image src={pressReleaseForm.featured_image} alt="Preview" fill className="object-cover rounded-lg border-2 border-blue-500" unoptimized />
                      <button
                        type="button"
                        onClick={() => setPressReleaseForm({ ...pressReleaseForm, featured_image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors flex items-center gap-2">
                      <i className="ri-upload-line"></i>
                      <span className="text-sm">이미지 업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const maxSize = 5 * 1024 * 1024;
                          if (file.size > maxSize) {
                            alert('파일 크기는 5MB 이하여야 합니다.');
                            e.target.value = '';
                            return;
                          }
                          setUploadingImages({ ...uploadingImages, pressRelease: true });
                          try {
                            const url = await uploadImage(file, 'press');
                            if (url) {
                              setPressReleaseForm({ ...pressReleaseForm, featured_image: url });
                            }
                          } finally {
                            setUploadingImages({ ...uploadingImages, pressRelease: false });
                            e.target.value = '';
                          }
                        }}
                        disabled={uploadingImages.pressRelease}
                      />
                    </label>
                  )}
                  {uploadingImages.pressRelease && (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      업로드 중...
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {editingPressId !== null && (
                  <button
                    type="button"
                    onClick={() => { setEditingPressId(null); setPressReleaseForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' }); }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 ${editingPressId !== null ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isLoading ? (editingPressId !== null ? '수정 중...' : '추가 중...') : (editingPressId !== null ? '수정 완료' : '보도 자료 추가')}
                </button>
              </div>
            </form>
          </div>

          {/* Press Releases List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">보도 자료 목록 ({pressReleases.length})</h3>
            {pressReleases.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <i className="ri-inbox-line text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">등록된 보도 자료가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pressReleases.map((release) => (
                  <div key={release.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-4">
                      {release.featured_image && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image src={release.featured_image} alt={release.title} fill className="object-cover rounded-lg" unoptimized />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{release.title}</h4>
                        {(release.description || release.description_en) && (
                          <p className="text-sm text-gray-600 mt-1">{release.description || release.description_en}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          {release.published_date && <span>📅 {release.published_date}</span>}
                          {release.url && (
                            <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              링크 보기
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPressId(release.id);
                            setPressReleaseForm({
                              title: release.title,
                              title_en: release.title_en || '',
                              description: release.description || '',
                              description_en: release.description_en || '',
                              url: release.url || '',
                              published_date: release.published_date || '',
                              featured_image: release.featured_image || ''
                            });
                          }}
                          className="px-3 py-2 border border-blue-300 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-edit-line"></i> 수정
                        </button>
                        <button
                          onClick={() => handleDeletePressRelease(release.id)}
                          className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 인증·수상 관리 */}
        <div id="section-award" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">인증 · 수상 관리</h2>
              <p className="text-sm text-gray-500 mt-1">구분을 선택한 뒤 인증 또는 수상 내역을 추가하세요</p>
            </div>
          </div>

          {/* 추가 폼 */}
          <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
            <form onSubmit={handleAddAward} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구분 *
                </label>
                <select
                  value={awardForm.type}
                  onChange={(e) => setAwardForm({ ...awardForm, type: e.target.value as 'certification' | 'award' })}
                  className="w-full md:max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="certification">인증</option>
                  <option value="award">수상</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={awardForm.title}
                    onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                    placeholder={awardForm.type === 'certification' ? '인증 제목' : '수상 제목'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수상 날짜
                  </label>
                  <input
                    type="date"
                    value={awardForm.award_date}
                    onChange={(e) => setAwardForm({ ...awardForm, award_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 (영문)
                  </label>
                  <input
                    type="text"
                    value={awardForm.title_en}
                    onChange={(e) => setAwardForm({ ...awardForm, title_en: e.target.value })}
                    placeholder="Title (English)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={awardForm.url}
                    onChange={(e) => setAwardForm({ ...awardForm, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (한국어)
                </label>
                <textarea
                  rows={2}
                  value={awardForm.description}
                  onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                  placeholder="간단한 설명 (한국어)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (영문)
                </label>
                <textarea
                  rows={2}
                  value={awardForm.description_en}
                  onChange={(e) => setAwardForm({ ...awardForm, description_en: e.target.value })}
                  placeholder="Description (English) - 영어 전환 시 표시됩니다"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대표 사진 (A4 비율 권장)
                </label>
                <div className="flex items-center gap-3">
                  {awardForm.featured_image ? (
                    <div className="relative" style={{ width: '148px', aspectRatio: '210 / 297' }}>
                      <Image src={awardForm.featured_image} alt="Preview" fill className="object-cover rounded-lg border-2 border-yellow-500" unoptimized />
                      <button
                        type="button"
                        onClick={() => setAwardForm({ ...awardForm, featured_image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors flex items-center gap-2">
                      <i className="ri-upload-line"></i>
                      <span className="text-sm">이미지 업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const maxSize = 5 * 1024 * 1024;
                          if (file.size > maxSize) {
                            alert('파일 크기는 5MB 이하여야 합니다.');
                            e.target.value = '';
                            return;
                          }
                          setUploadingImages({ ...uploadingImages, award: true });
                          try {
                            const url = await uploadImage(file, 'awards');
                            if (url) {
                              setAwardForm({ ...awardForm, featured_image: url });
                            }
                          } finally {
                            setUploadingImages({ ...uploadingImages, award: false });
                            e.target.value = '';
                          }
                        }}
                        disabled={uploadingImages.award}
                      />
                    </label>
                  )}
                  {uploadingImages.award && (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                      업로드 중...
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">* A4 비율(210:297) 이미지를 권장합니다.</p>
              </div>
              <div className="flex gap-2">
                {editingAwardId !== null && (
                  <button
                    type="button"
                    onClick={() => { setEditingAwardId(null); setAwardForm({ type: awardForm.type, title: '', title_en: '', description: '', description_en: '', url: '', award_date: '', featured_image: '' }); }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 ${editingAwardId !== null ? 'bg-amber-600 hover:bg-amber-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                >
                  {isLoading ? (editingAwardId !== null ? '수정 중...' : '추가 중...') : (editingAwardId !== null ? '수정 완료' : (awardForm.type === 'certification' ? '인증 추가' : '수상 추가'))}
                </button>
              </div>
            </form>
          </div>

          {/* 인증 목록 */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-verified-badge-line text-blue-600"></i>
              인증 목록 ({certifications.length})
            </h3>
            {certifications.length === 0 ? (
              <div className="text-center py-8 bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-200">
                <i className="ri-verified-badge-line text-3xl text-blue-400 mb-2"></i>
                <p className="text-gray-500 text-sm">등록된 인증이 없습니다. 위 폼에서 구분을 「인증」으로 선택 후 추가하세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all bg-white">
                    <div className="relative w-full mb-4" style={{ aspectRatio: '210 / 297' }}>
                      {item.featured_image ? (
                        <Image src={item.featured_image} alt={item.title} fill className="object-cover rounded-lg" unoptimized />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-paper-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      {(item.description || item.description_en) && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description || item.description_en}</p>
                      )}
                      {item.award_date && (
                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          {item.award_date}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAwardId(item.id);
                            setAwardForm({
                              type: 'certification',
                              title: item.title,
                              title_en: item.title_en || '',
                              description: item.description || '',
                              description_en: item.description_en || '',
                              url: item.url || '',
                              award_date: item.award_date || '',
                              featured_image: item.featured_image || ''
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-blue-300 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50"
                          disabled={isLoading}
                        >
                          <i className="ri-edit-line"></i> 수정
                        </button>
                        <button
                          onClick={() => handleDeleteAward(item.id)}
                          className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 수상 목록 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-award-line text-yellow-600"></i>
              수상 목록 ({awards.length})
            </h3>
            {awards.length === 0 ? (
              <div className="text-center py-8 bg-yellow-50/50 rounded-lg border-2 border-dashed border-yellow-200">
                <i className="ri-award-line text-3xl text-yellow-400 mb-2"></i>
                <p className="text-gray-500 text-sm">등록된 수상이 없습니다. 위 폼에서 구분을 「수상」으로 선택 후 추가하세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-all bg-white">
                    <div className="relative w-full mb-4" style={{ aspectRatio: '210 / 297' }}>
                      {item.featured_image ? (
                        <Image src={item.featured_image} alt={item.title} fill className="object-cover rounded-lg" unoptimized />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-paper-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      {(item.description || item.description_en) && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description || item.description_en}</p>
                      )}
                      {item.award_date && (
                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          {item.award_date}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAwardId(item.id);
                            setAwardForm({
                              type: 'award',
                              title: item.title,
                              title_en: item.title_en || '',
                              description: item.description || '',
                              description_en: item.description_en || '',
                              url: item.url || '',
                              award_date: item.award_date || '',
                              featured_image: item.featured_image || ''
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-blue-300 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50"
                          disabled={isLoading}
                        >
                          <i className="ri-edit-line"></i> 수정
                        </button>
                        <button
                          onClick={() => handleDeleteAward(item.id)}
                          className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Technical Resources Management */}
        <div id="section-technical" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">기술자료 관리</h2>
              <p className="text-sm text-gray-500 mt-1">기술자료를 추가하고 관리하세요</p>
            </div>
          </div>

          {/* Add Technical Resource Form */}
          <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <form onSubmit={handleAddTechnicalResource} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={technicalForm.title}
                    onChange={(e) => setTechnicalForm({ ...technicalForm, title: e.target.value })}
                    placeholder="기술자료 제목"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문서 유형
                  </label>
                  <select
                    value={technicalForm.document_type}
                    onChange={(e) => setTechnicalForm({ ...technicalForm, document_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">선택하세요</option>
                    <option value="patent">특허</option>
                    <option value="certification">인증서</option>
                    <option value="technical_doc">기술 문서</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={technicalForm.url}
                  onChange={(e) => setTechnicalForm({ ...technicalForm, url: e.target.value })}
                  placeholder="https://example.com/document"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (한국어)
                </label>
                <textarea
                  rows={2}
                  value={technicalForm.description}
                  onChange={(e) => setTechnicalForm({ ...technicalForm, description: e.target.value })}
                  placeholder="간단한 설명 (한국어)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (영문)
                </label>
                <textarea
                  rows={2}
                  value={technicalForm.description_en}
                  onChange={(e) => setTechnicalForm({ ...technicalForm, description_en: e.target.value })}
                  placeholder="Description (English) - 영어 전환 시 표시됩니다"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대표 사진
                </label>
                <div className="flex items-center gap-3">
                  {technicalForm.featured_image ? (
                    <div className="relative w-24 h-24">
                      <Image src={technicalForm.featured_image} alt="Preview" fill className="object-cover rounded-lg border-2 border-green-500" unoptimized />
                      <button
                        type="button"
                        onClick={() => setTechnicalForm({ ...technicalForm, featured_image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors flex items-center gap-2">
                      <i className="ri-upload-line"></i>
                      <span className="text-sm">이미지 업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const maxSize = 5 * 1024 * 1024;
                          if (file.size > maxSize) {
                            alert('파일 크기는 5MB 이하여야 합니다.');
                            e.target.value = '';
                            return;
                          }
                          setUploadingImages({ ...uploadingImages, technical: true });
                          try {
                            const url = await uploadImage(file, 'technical');
                            if (url) {
                              setTechnicalForm({ ...technicalForm, featured_image: url });
                            }
                          } finally {
                            setUploadingImages({ ...uploadingImages, technical: false });
                            e.target.value = '';
                          }
                        }}
                        disabled={uploadingImages.technical}
                      />
                    </label>
                  )}
                  {uploadingImages.technical && (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                      업로드 중...
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {editingTechnicalId !== null && (
                  <button
                    type="button"
                    onClick={() => { setEditingTechnicalId(null); setTechnicalForm({ title: '', title_en: '', description: '', description_en: '', url: '', document_type: '', featured_image: '' }); }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 ${editingTechnicalId !== null ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isLoading ? (editingTechnicalId !== null ? '수정 중...' : '추가 중...') : (editingTechnicalId !== null ? '수정 완료' : '기술자료 추가')}
                </button>
              </div>
            </form>
          </div>

          {/* Technical Resources List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">기술자료 목록 ({technicalResources.length})</h3>
            {technicalResources.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <i className="ri-inbox-line text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">등록된 기술자료가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {technicalResources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-all">
                    <div className="flex items-start gap-4">
                      {resource.featured_image && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image src={resource.featured_image} alt={resource.title} fill className="object-cover rounded-lg" unoptimized />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        {(resource.description || resource.description_en) && (
                          <p className="text-sm text-gray-600 mt-1">{resource.description || resource.description_en}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          {resource.document_type && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                              {resource.document_type === 'patent' ? '특허' : resource.document_type === 'certification' ? '인증서' : '기술 문서'}
                            </span>
                          )}
                          {resource.url && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                              링크 보기
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTechnicalId(resource.id);
                            setTechnicalForm({
                              title: resource.title,
                              title_en: resource.title_en || '',
                              description: resource.description || '',
                              description_en: resource.description_en || '',
                              url: resource.url || '',
                              document_type: resource.document_type || '',
                              featured_image: resource.featured_image || ''
                            });
                          }}
                          className="px-3 py-2 border border-blue-300 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-edit-line"></i> 수정
                        </button>
                        <button
                          onClick={() => handleDeleteTechnicalResource(resource.id)}
                          className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          disabled={isLoading}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 영상 관리 */}
        <div id="section-video" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">영상 관리</h2>
              <p className="text-sm text-gray-500 mt-1">영상 URL(YouTube, Vimeo, 직접 링크)을 등록하세요. 썸네일은 영상 URL에서 자동으로 표시됩니다.</p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200">
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    placeholder="영상 제목"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목 (영문)</label>
                  <input
                    type="text"
                    value={videoForm.title_en}
                    onChange={(e) => setVideoForm({ ...videoForm, title_en: e.target.value })}
                    placeholder="English title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">영상 URL *</label>
                <input
                  type="url"
                  value={videoForm.url}
                  onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... 또는 https://vimeo.com/... 또는 직접 mp4 URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">공개일</label>
                  <input
                    type="date"
                    value={videoForm.published_date}
                    onChange={(e) => setVideoForm({ ...videoForm, published_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명 (한국어)</label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="간단한 설명 (한국어)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">설명 (영문)</label>
                <textarea
                  rows={2}
                  value={videoForm.description_en}
                  onChange={(e) => setVideoForm({ ...videoForm, description_en: e.target.value })}
                  placeholder="Description (English) - 영어 전환 시 표시됩니다"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div className="flex gap-2">
                {editingVideoId !== null && (
                  <button
                    type="button"
                    onClick={() => { setEditingVideoId(null); setVideoForm({ title: '', title_en: '', description: '', description_en: '', url: '', published_date: '', featured_image: '' }); }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 ${editingVideoId !== null ? 'bg-amber-600 hover:bg-amber-700' : 'bg-violet-600 hover:bg-violet-700'}`}
                >
                  {isLoading ? (editingVideoId !== null ? '수정 중...' : '추가 중...') : (editingVideoId !== null ? '수정 완료' : '영상 추가')}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-play-circle-line text-violet-600"></i>
              영상 목록 ({videos.length})
            </h3>
            {videos.length === 0 ? (
              <div className="text-center py-8 bg-violet-50/50 rounded-lg border-2 border-dashed border-violet-200">
                <i className="ri-play-circle-line text-3xl text-violet-400 mb-2"></i>
                <p className="text-gray-500 text-sm">등록된 영상이 없습니다. 위 폼에서 영상 URL을 입력 후 추가하세요.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((v) => (
                  <div key={v.id} className="border border-gray-200 rounded-lg p-4 hover:border-violet-300 transition-all flex items-center gap-4">
                    {v.featured_image && (
                      <div className="relative w-24 h-14 flex-shrink-0 rounded overflow-hidden">
                        <Image src={v.featured_image} alt={v.title} fill className="object-cover" unoptimized />
                      </div>
                    )}
                    {!v.featured_image && (
                      <div className="w-24 h-14 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center">
                        <i className="ri-play-circle-line text-2xl text-violet-400"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{v.title}</h4>
                      {v.url && (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-600 hover:underline truncate block">
                          {v.url}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideoId(v.id);
                          setVideoForm({
                            title: v.title,
                            title_en: v.title_en || '',
                            description: v.description || '',
                            description_en: v.description_en || '',
                            url: v.url || '',
                            published_date: v.published_date || '',
                            featured_image: v.featured_image || ''
                          });
                        }}
                        className="px-3 py-2 border border-blue-300 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        disabled={isLoading}
                      >
                        <i className="ri-edit-line"></i> 수정
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(v.id)}
                        className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                        disabled={isLoading}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

