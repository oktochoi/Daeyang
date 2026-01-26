'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';
import { getPerformanceProjects, PerformanceProject as SupabasePerformanceProject } from '@/lib/supabase';
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
  const [projects, setProjects] = useState<any[]>([]);
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
      
      {/* Hero - 탐색 허브 스타일 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* 페이지 제목 */}
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
            {t('common.nav.performance')}
          </h1>
          
          {/* 한 줄 안내 */}
          <p className="text-lg text-gray-600 text-center mb-12">
            대양환경기술의 제품 적용 실적과 성과를 확인하세요
          </p>
          
          {/* 중앙 대형 박스 - 탐색 허브 */}
          <div className="bg-white rounded-[32px] p-8 sm:p-16 shadow-[0_10px_30px_rgba(0,0,0,0.05)] max-w-5xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                <p className="mt-4 text-gray-600">로딩 중...</p>
              </div>
            ) : Array.isArray(projects) && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/performance/${project.id}`}
                    className="group bg-gray-50 rounded-2xl p-6 hover:bg-teal-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-teal-300 hover:shadow-lg"
                  >
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
                      {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                        <img src={project.icon} alt="Project icon" className="w-full h-full object-cover" />
                      ) : project.icon && !project.icon.startsWith('ri-') && project.icon.length <= 2 ? (
                        <span className="text-5xl leading-none">{project.icon}</span>
                      ) : project.icon && project.icon.startsWith('ri-') ? (
                        <i className={`${project.icon} text-3xl text-teal-600`}></i>
                      ) : (
                        <span className="text-5xl leading-none">🇰🇷</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {i18n.language === 'ko' ? project.title : (project.titleEn || project.title)}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {i18n.language === 'ko' ? project.description : (project.descriptionEn || project.description)}
                      </p>
                    )}
                    {project.items && project.items.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-xs text-teal-600 font-medium">
                          {project.items.length}개 항목
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">등록된 적용 실적이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

