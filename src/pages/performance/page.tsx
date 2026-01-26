'use client'

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';
import { performanceProjects } from '../../mocks/performance';

export default function PerformancePage() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'pilot', label: '국내 시험로' },
    { id: 'mongolia', label: '몽골 석탄공장' },
    { id: 'seasia', label: '태국·라오스' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? performanceProjects 
    : performanceProjects.filter(p => p.category === activeFilter);

  const getProjectLink = (category?: string) => {
    if (!category) return '/performance';
    const linkMap: { [key: string]: string } = {
      'pilot': '/performance/pilot',
      'mongolia': '/performance/mongolia',
      'seasia': '/performance/seasia'
    };
    return linkMap[category] || '/performance';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-12">
            {t('performance.title')}
          </h1>
          
          {/* Filters */}
          <div className="flex items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={getProjectLink(project.category || undefined)}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-teal-400 group cursor-pointer"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <i className="ri-image-line text-5xl text-gray-400"></i>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                      {project.year}
                    </span>
                    <i className="ri-arrow-right-line text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {i18n.language === 'ko' ? project.name : project.nameEn}
                  </h3>
                  <p className="text-base text-gray-600 mb-4">
                    {i18n.language === 'ko' ? project.client : project.clientEn}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-lg font-bold text-teal-600">
                      {i18n.language === 'ko' ? project.result : project.resultEn}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Add New Project Placeholder */}
          <div className="mt-12 p-8 bg-teal-50 rounded-xl border-2 border-dashed border-teal-300 text-center">
            <i className="ri-add-circle-line text-4xl text-teal-600 mb-3"></i>
            <p className="text-lg text-teal-700 font-medium mb-2">
              관리자가 적용 실적을 추가할 수 있습니다
            </p>
            <p className="text-sm text-teal-600">
              프로젝트명, 고객사, 연도, 성과 등을 입력하여 새로운 실적을 추가할 수 있습니다
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
