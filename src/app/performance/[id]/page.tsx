'use client'

import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getPerformanceProjectById, PerformanceProject as SupabasePerformanceProject, PerformanceProjectItem } from '@/lib/supabase';
import { performanceProjects as mockProjects } from '../../../mocks/performance';
import type { PerformanceProject as MockProject } from '../../../mocks/performance';

const ITEMS_PER_PAGE = 9;

// Mock 데이터를 Supabase 형식으로 변환
function mockToSupabaseFormat(mock: MockProject): SupabasePerformanceProject {
  return {
    id: mock.id,
    title: mock.title,
    title_en: mock.titleEn,
    icon: mock.icon,
    description: mock.description,
    description_en: mock.descriptionEn,
    items: []
  };
}

// Supabase 데이터를 표시 형식으로 변환
function transformSupabaseProject(project: SupabasePerformanceProject) {
  return {
    id: project.id,
    title: project.title,
    titleEn: project.title_en,
    icon: project.icon,
    iconColor: 'bg-gray-50',
    description: project.description,
    descriptionEn: project.description_en,
    items: project.items || []
  };
}

interface ProjectDisplay {
  id: number;
  title: string;
  titleEn?: string;
  icon: string;
  iconColor: string;
  description?: string;
  descriptionEn?: string;
  items?: PerformanceProjectItem[];
}

export default function PerformanceDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;
  const [project, setProject] = useState<ProjectDisplay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProject() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const supabaseProject = await getPerformanceProjectById(id);
        if (supabaseProject) {
          setProject(transformSupabaseProject(supabaseProject));
        } else {
          // Supabase에 없으면 mocks에서 찾기
          const mockProject = mockProjects.find(p => p.id === id);
          if (mockProject) {
            setProject(transformSupabaseProject(mockToSupabaseFormat(mockProject)));
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
        // 에러 발생 시 mocks에서 찾기
        const mockProject = mockProjects.find(p => p.id === id);
        if (mockProject) {
          setProject(transformSupabaseProject(mockToSupabaseFormat(mockProject)));
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const items = useMemo(() => project?.items ?? [], [project?.items]);
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumb />
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">{t('performance.detail.loading')}</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumb />
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('performance.detail.notFound')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('performance.detail.notFoundDesc')}
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.performance')}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative">
              {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                <Image src={project.icon} alt={t('performance.detail.projectIconAlt')} fill className="object-cover" unoptimized priority />
              ) : project.icon && !project.icon.startsWith('ri-') && project.icon.length <= 2 ? (
                <span className="text-5xl leading-none">{project.icon}</span>
              ) : project.icon && project.icon.startsWith('ri-') ? (
                <i className={`${project.icon} text-3xl`}></i>
              ) : (
                <span className="text-5xl leading-none">🇰🇷</span>
              )}
            </div>
            <div>
              <h1 className="text-[32px] font-bold text-[#1f2933] mb-2 leading-[1.25]">
                {i18n.language === 'ko' ? project.title : (project.titleEn || project.title)}
              </h1>
              {project.description && (
                <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] font-normal">
                  {i18n.language === 'ko' ? project.description : (project.descriptionEn || project.description)}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Items — 갤러리 3열 그리드 + 페이지네이션 */}
      {project.items && project.items.length > 0 && (
        <section className="pb-[96px] bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
                {i18n.language === 'ko' ? '프로젝트 항목' : 'Project Items'}
              </h2>
              <div className="w-12 h-0.5 bg-teal-600"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item: PerformanceProjectItem) => (
                <article key={item.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {item.photos && item.photos[0] ? (
                    <div className="relative w-full aspect-video bg-gray-200">
                      <Image
                        src={item.photos[0]}
                        alt={i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)}
                        fill
                        className="object-cover"
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                      <i className="ri-image-line text-4xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-[#1f2933] line-clamp-2">
                      {i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)}
                    </h3>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="페이지 네비게이션">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {i18n.language === 'ko' ? '이전' : 'Previous'}
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {i18n.language === 'ko' ? '다음' : 'Next'}
                </button>
              </nav>
            )}
          </div>
        </section>
      )}

      {(!project.items || project.items.length === 0) && (
        <section className="pb-[96px] bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{t('performance.detail.noItems')}</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

