'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';
import { getPerformanceProjects, PerformanceProject as SupabasePerformanceProject, PerformanceProjectItem } from '@/lib/supabase';
import { performanceProjects as mockProjects } from '../../mocks/performance';

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

export default function PerformancePage() {
  const { t, i18n } = useTranslation();
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
  
  const [projects, setProjects] = useState<ProjectDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const supabaseProjects = await getPerformanceProjects();
        if (supabaseProjects && supabaseProjects.length > 0) {
          setProjects(supabaseProjects.map(transformSupabaseProject));
        } else {
          // Supabase에 데이터가 없으면 mocks 사용
          setProjects(mockProjects.map(transformSupabaseProject));
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        // 에러 발생 시 mocks 사용
        setProjects(mockProjects.map(transformSupabaseProject));
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero - 레이어감 있는 섹션 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-24 bg-gray-100/80">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
            {t('common.nav.performance')}
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            {t('performance.page.subtitle')}
          </p>

          {/* 카드 컨테이너: 섹션과 구분되는 레이어 */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-200/80 w-full">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                <p className="mt-4 text-gray-500">{t('performance.page.loading')}</p>
              </div>
            ) : Array.isArray(projects) && projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-0">
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/performance/${project.id}`}
                    className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden min-w-0 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  >
                    {/* 상단 캡: 시각적 구분 영역 */}
                    <div className="h-1.5 w-full bg-gray-200 group-hover:bg-gray-300 transition-colors" aria-hidden />

                    {/* 카드 본문: 여백 리듬 */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative">
                          {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                            <Image src={project.icon} alt={t('performance.page.projectIconAlt')} fill className="object-cover" unoptimized priority={index < 3} />
                          ) : project.icon && !project.icon.startsWith('ri-') && project.icon.length <= 2 ? (
                            <span className="text-2xl leading-none">{project.icon}</span>
                          ) : project.icon && project.icon.startsWith('ri-') ? (
                            <i className={`${project.icon} text-2xl text-gray-600`} aria-hidden />
                          ) : (
                            <span className="text-2xl leading-none">🇰🇷</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700">
                          {i18n.language === 'ko' ? project.title : (project.titleEn || project.title)}
                        </h3>
                      </div>
                      {project.description && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                          {i18n.language === 'ko' ? project.description : (project.descriptionEn || project.description)}
                        </p>
                      )}
                      {!project.description && <div className="flex-1 min-h-[2.5rem]" />}
                    </div>

                    {/* 하단 메타: 시각적 마침표 */}
                    <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/60">
                      <span className="text-xs font-medium text-gray-500">
                        {(project.items?.length ?? 0)}{t('performance.page.itemsCount')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <i className="ri-inbox-line text-6xl text-gray-300 mb-4" aria-hidden />
                <p className="text-gray-500 text-lg">{t('performance.page.empty')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

