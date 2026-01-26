'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getPerformanceProjectById, PerformanceProject as SupabasePerformanceProject } from '@/lib/supabase';
import { performanceProjects as mockProjects } from '../../../mocks/performance';

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

export default function PerformanceDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            setProject(transformSupabaseProject(mockProject as any));
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
        // 에러 발생 시 mocks에서 찾기
        const mockProject = mockProjects.find(p => p.id === id);
        if (mockProject) {
          setProject(transformSupabaseProject(mockProject as any));
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumb />
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
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
              {i18n.language === 'ko' ? '적용 실적을 찾을 수 없습니다' : 'Performance not found'}
            </h1>
            <p className="text-lg text-gray-600">
              {i18n.language === 'ko' ? '요청하신 적용 실적이 존재하지 않습니다.' : 'The requested performance record does not exist.'}
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
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
              {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                <img src={project.icon} alt="Project icon" className="w-full h-full object-cover" />
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

      {/* Project Items */}
      {project.items && project.items.length > 0 && (
        <section className="pb-[96px] bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
                {i18n.language === 'ko' ? '프로젝트 항목' : 'Project Items'}
              </h2>
              <div className="w-12 h-0.5 bg-teal-600"></div>
            </div>
            <div className="space-y-12">
              {project.items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-[24px] font-bold text-[#1f2933] mb-6">
                    {i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)}
                  </h3>
                  {item.photos && item.photos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {item.photos.map((photo, photoIndex) => (
                        <div key={photoIndex} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                          <img
                            src={photo}
                            alt={`${i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)} - ${photoIndex + 1}`}
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(!project.items || project.items.length === 0) && (
        <section className="pb-[96px] bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{i18n.language === 'ko' ? '등록된 항목이 없습니다.' : 'No items registered.'}</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

