'use client'

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { createPerformanceProject, getPerformanceProjects, deletePerformanceProject, uploadImage, PerformanceProject as SupabasePerformanceProject } from '@/lib/supabase';
import { 
  getPressReleases, 
  createPressRelease, 
  deletePressRelease,
  getAwardsCertifications,
  createAwardCertification,
  deleteAwardCertification,
  getTechnicalResources,
  createTechnicalResource,
  deleteTechnicalResource,
  PressRelease,
  AwardCertification,
  TechnicalResource
} from '@/lib/supabase-media';

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const [selectedIcon, setSelectedIcon] = useState<string>('🇰🇷');
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [performanceProjects, setPerformanceProjects] = useState<SupabasePerformanceProject[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [awardsCertifications, setAwardsCertifications] = useState<AwardCertification[]>([]);
  const [technicalResources, setTechnicalResources] = useState<TechnicalResource[]>([]);
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
  const [uploadingImages, setUploadingImages] = useState({
    pressRelease: false,
    award: false,
    technical: false
  });
  
  // 실제 데이터 기반 통계 계산
  const stats = [
    {
      title: '보도자료',
      count: pressReleases.length,
      icon: 'ri-newspaper-line',
      color: 'bg-blue-500',
      link: '/media/press'
    },
    {
      title: '인증 및 수상',
      count: awardsCertifications.length,
      icon: 'ri-award-line',
      color: 'bg-yellow-500',
      link: '/media/awards'
    },
    {
      title: '기술 자료',
      count: technicalResources.length,
      icon: 'ri-file-text-line',
      color: 'bg-green-500',
      link: '/product/technical'
    },
    {
      title: '적용 실적',
      count: performanceProjects.length,
      icon: 'ri-building-line',
      color: 'bg-teal-500',
      link: '/performance'
    }
  ];
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: ''
  });

  // 데이터 로드
  useEffect(() => {
    loadPerformanceProjects();
    loadPressReleases();
    loadAwardsCertifications();
    loadTechnicalResources();
  }, []);

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

  async function loadAwardsCertifications() {
    try {
      const awards = await getAwardsCertifications();
      setAwardsCertifications(awards || []);
    } catch (error) {
      console.error('Error loading awards certifications:', error);
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

  // 프로젝트 추가 (기본 정보만)
  async function handleAddPerformance(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    // icon이 없으면 기본값 설정
    if (!iconImage && !selectedIcon) {
      setSelectedIcon('🇰🇷');
    }

    setIsLoading(true);
    try {
      // icon이 이미지 URL이면 사용하고, 아니면 선택된 국기 이모지 사용, 둘 다 없으면 기본값
      const finalIcon = iconImage || selectedIcon || '🇰🇷';

      const project = {
        title: formData.title,
        title_en: formData.titleEn || undefined,
        icon: finalIcon,
        description: formData.description || undefined,
        description_en: formData.descriptionEn || undefined,
      };

      const created = await createPerformanceProject(project);
      if (created) {
        alert('프로젝트가 성공적으로 생성되었습니다. 이제 프로젝트에 항목을 추가할 수 있습니다.');
        // 폼 초기화
        setFormData({
          title: '',
          titleEn: '',
          description: '',
          descriptionEn: ''
        });
        setSelectedIcon('🇰🇷');
        setIconImage(null);
        // 목록 새로고침
        loadPerformanceProjects();
      } else {
        alert('프로젝트 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding performance project:', error);
      alert('프로젝트 생성 중 오류가 발생했습니다.');
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

  // 보도 자료 추가
  async function handleAddPressRelease(e: React.FormEvent) {
    e.preventDefault();
    if (!pressReleaseForm.title || !pressReleaseForm.url) {
      alert('제목과 URL은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const release = {
        title: pressReleaseForm.title,
        title_en: pressReleaseForm.title_en || undefined,
        description: pressReleaseForm.description || undefined,
        description_en: pressReleaseForm.description_en || undefined,
        url: pressReleaseForm.url,
        featured_image: pressReleaseForm.featured_image || undefined,
        published_date: pressReleaseForm.published_date || undefined,
      };

      const created = await createPressRelease(release);
      if (created) {
        alert('보도 자료가 추가되었습니다.');
        setPressReleaseForm({
          title: '',
          title_en: '',
          description: '',
          description_en: '',
          url: '',
          published_date: '',
          featured_image: ''
        });
        loadPressReleases();
      } else {
        alert('보도 자료 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding press release:', error);
      alert('보도 자료 추가 중 오류가 발생했습니다.');
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

  // 인증 및 수상 추가
  async function handleAddAward(e: React.FormEvent) {
    e.preventDefault();
    if (!awardForm.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const award = {
        title: awardForm.title,
        title_en: awardForm.title_en || undefined,
        description: awardForm.description || undefined,
        description_en: awardForm.description_en || undefined,
        url: awardForm.url || undefined,
        featured_image: awardForm.featured_image || undefined,
        award_date: awardForm.award_date || undefined,
      };

      const created = await createAwardCertification(award);
      if (created) {
        alert('인증/수상이 추가되었습니다.');
        setAwardForm({
          title: '',
          title_en: '',
          description: '',
          description_en: '',
          url: '',
          award_date: '',
          featured_image: ''
        });
        loadAwardsCertifications();
      } else {
        alert('인증/수상 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding award:', error);
      alert('인증/수상 추가 중 오류가 발생했습니다.');
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
        alert('인증/수상이 삭제되었습니다.');
        loadAwardsCertifications();
      } else {
        alert('인증/수상 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting award:', error);
      alert('인증/수상 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  // 기술자료 추가
  async function handleAddTechnicalResource(e: React.FormEvent) {
    e.preventDefault();
    if (!technicalForm.title) {
      alert('제목은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const resource = {
        title: technicalForm.title,
        title_en: technicalForm.title_en || undefined,
        description: technicalForm.description || undefined,
        description_en: technicalForm.description_en || undefined,
        url: technicalForm.url || undefined,
        featured_image: technicalForm.featured_image || undefined,
        document_type: technicalForm.document_type || undefined,
      };

      const created = await createTechnicalResource(resource);
      if (created) {
        alert('기술자료가 추가되었습니다.');
        setTechnicalForm({
          title: '',
          title_en: '',
          description: '',
          description_en: '',
          url: '',
          document_type: '',
          featured_image: ''
        });
        loadTechnicalResources();
      } else {
        alert('기술자료 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding technical resource:', error);
      alert('기술자료 추가 중 오류가 발생했습니다.');
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


  const quickActions = [
    {
      title: '보도자료 관리',
      description: '보도자료 추가/수정/삭제',
      icon: 'ri-newspaper-line',
      link: '/media/press',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: '인증 및 수상 관리',
      description: '인증서, 수상 내역 관리',
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
              <button className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-2">
                <i className="ri-logout-box-line"></i>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - 간소화 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-300 transition-colors"
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
            </div>
          ))}
        </div>

        {/* Performance Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">적용 실적 관리</h2>
              <p className="text-sm text-gray-500 mt-1">프로젝트를 생성하고 항목을 추가하세요</p>
            </div>
          </div>
          
          {/* Add Project Form - 간소화 */}
          <div className="mb-8 p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-200">
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
                  아이콘 (이미지 업로드 또는 국기 선택) *
                </label>
                
                {/* 이미지 업로드 */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-2">이미지 업로드 (선택사항)</label>
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
                                setSelectedIcon(''); // 이미지 업로드 시 국기 선택 해제
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
                  <p className="text-xs text-gray-500 mt-1">* 이미지를 업로드하면 국기 선택이 무시됩니다.</p>
                </div>

                {/* 국기 선택 */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">또는 국기 선택</label>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {[
                      { icon: '🇰🇷', label: '한국' },
                      { icon: '🇨🇳', label: '중국' },
                      { icon: '🇲🇳', label: '몽골' },
                      { icon: '🇹🇭', label: '태국' },
                      { icon: '🇱🇦', label: '라오스' },
                      { icon: '🇻🇳', label: '베트남' },
                      { icon: '🇮🇩', label: '인도네시아' },
                      { icon: '🇵🇭', label: '필리핀' },
                      { icon: '🇵🇼', label: '팔라우' },
                      { icon: '🇯🇵', label: '일본' },
                      { icon: '🇺🇸', label: '미국' },
                      { icon: '🇬🇧', label: '영국' },
                      { icon: '🇩🇪', label: '독일' },
                      { icon: '🇫🇷', label: '프랑스' },
                      { icon: '🇷🇺', label: '러시아' },
                      { icon: '🇮🇳', label: '인도' },
                      { icon: '🇸🇬', label: '싱가포르' },
                      { icon: '🇲🇾', label: '말레이시아' }
                    ].map((item) => (
                      <button
                        key={item.icon}
                        type="button"
                        onClick={() => {
                          setSelectedIcon(item.icon);
                          setIconImage(null); // 국기 선택 시 이미지 제거
                        }}
                        className={`p-3 border-2 rounded-lg transition-all text-2xl ${
                          selectedIcon === item.icon && !iconImage
                            ? 'border-teal-500 bg-teal-50 scale-110'
                            : 'border-gray-200 hover:border-teal-300 hover:scale-105'
                        }`}
                        title={item.label}
                        disabled={!!iconImage}
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                  {!iconImage && (
                    <p className="text-xs text-gray-500 mt-2">
                      선택된 국기: {selectedIcon || '없음 (기본값: 🇰🇷)'}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 (선택사항)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="프로젝트에 대한 간단한 설명"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '생성 중...' : '프로젝트 생성'}
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
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
                  설명
                </label>
                <textarea
                  rows={2}
                  value={pressReleaseForm.description}
                  onChange={(e) => setPressReleaseForm({ ...pressReleaseForm, description: e.target.value })}
                  placeholder="간단한 설명"
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '추가 중...' : '보도 자료 추가'}
              </button>
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
                        {release.description && (
                          <p className="text-sm text-gray-600 mt-1">{release.description}</p>
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
                      <button
                        onClick={() => handleDeletePressRelease(release.id)}
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

        {/* Awards & Certifications Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">인증 및 수상 관리</h2>
              <p className="text-sm text-gray-500 mt-1">인증 및 수상 내역을 추가하고 관리하세요</p>
            </div>
          </div>

          {/* Add Award Form */}
          <div className="mb-8 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <form onSubmit={handleAddAward} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={awardForm.title}
                    onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                    placeholder="인증/수상 제목"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명
                </label>
                <textarea
                  rows={2}
                  value={awardForm.description}
                  onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                  placeholder="간단한 설명"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대표 사진
                </label>
                <div className="flex items-center gap-3">
                  {awardForm.featured_image ? (
                    <div className="relative w-24 h-24">
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
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '추가 중...' : '인증/수상 추가'}
              </button>
            </form>
          </div>

          {/* Awards List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">인증 및 수상 목록 ({awardsCertifications.length})</h3>
            {awardsCertifications.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <i className="ri-inbox-line text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">등록된 인증/수상이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {awardsCertifications.map((award) => (
                  <div key={award.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-all">
                    <div className="flex items-start gap-4">
                      {award.featured_image && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image src={award.featured_image} alt={award.title} fill className="object-cover rounded-lg" unoptimized />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{award.title}</h4>
                        {award.description && (
                          <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                        )}
                        {award.award_date && (
                          <p className="text-xs text-gray-500 mt-2">📅 {award.award_date}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteAward(award.id)}
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

        {/* Technical Resources Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
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
                  설명
                </label>
                <textarea
                  rows={2}
                  value={technicalForm.description}
                  onChange={(e) => setTechnicalForm({ ...technicalForm, description: e.target.value })}
                  placeholder="간단한 설명"
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '추가 중...' : '기술자료 추가'}
              </button>
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
                        {resource.description && (
                          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
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
                      <button
                        onClick={() => handleDeleteTechnicalResource(resource.id)}
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

