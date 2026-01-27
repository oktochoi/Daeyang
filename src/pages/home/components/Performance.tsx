'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { getPerformanceProjects, getPerformanceProjectItems } from '@/lib/supabase';

export default function Performance() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // 최근 프로젝트 로드
  useEffect(() => {
    async function loadRecentProjects() {
      setIsLoadingProjects(true);
      try {
        const projects = await getPerformanceProjects();
        const projectsWithImages: Array<{
          id: number;
          title: string;
          titleEn?: string;
          description?: string;
          descriptionEn?: string;
          image?: string;
        }> = [];

        // 최근 3개 프로젝트만 처리
        const recentThreeProjects = projects.slice(0, 3);

        // 각 프로젝트의 첫 번째 이미지 찾기
        for (const project of recentThreeProjects) {
          let firstImage: string | undefined;
          
          try {
            const items = await getPerformanceProjectItems(project.id);
            for (const item of items) {
              if (item.photos && item.photos.length > 0) {
                // 첫 번째 이미지만 사용
                if (!firstImage) {
                  firstImage = item.photos[0];
                }
                break; // 첫 번째 이미지만 찾으면 중단
              }
            }
          } catch (error) {
            console.error(`Error loading items for project ${project.id}:`, error);
          }

          projectsWithImages.push({
            id: project.id,
            title: project.title,
            titleEn: project.title_en,
            description: project.description,
            descriptionEn: project.description_en,
            image: firstImage
          });
        }

        setRecentProjects(projectsWithImages);
      } catch (error) {
        console.error('Error loading recent projects:', error);
      } finally {
        setIsLoadingProjects(false);
      }
    }
    loadRecentProjects();
  }, []);

  const stats = [
    {
      value: t('home.trust.years'),
      label: t('home.trust.yearsLabel'),
      icon: 'ri-time-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      value: t('home.trust.sites'),
      label: t('home.trust.sitesLabel'),
      icon: 'ri-building-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      value: t('home.trust.patents'),
      label: t('home.trust.patentsLabel'),
      icon: 'ri-award-line',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      value: t('home.trust.efficiency'),
      label: t('home.trust.efficiencyLabel'),
      icon: 'ri-line-chart-line',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const [recentProjects, setRecentProjects] = useState<Array<{
    id: number;
    title: string;
    titleEn?: string;
    description?: string;
    descriptionEn?: string;
    image?: string;
  }>>([]);

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-500 delay-50 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.performance')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            적용 실적
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            검증된 기술력과 다양한 적용 사례
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all duration-300 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-500 delay-150 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {recentProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/performance/${project.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                style={{ transitionDelay: `${(index + 5) * 0.05}s` }}
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden border-b border-gray-200">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={i18n.language === 'ko' ? project.title : (project.titleEn || project.title)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <i className="ri-image-line text-5xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-500">프로젝트 이미지</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {i18n.language === 'ko' ? project.title : (project.titleEn || project.title)}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600">
                      {i18n.language === 'ko' ? project.description : (project.descriptionEn || project.description)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className={`text-center transition-all duration-500 delay-200 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/performance"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            적용 실적 자세히 보기
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

