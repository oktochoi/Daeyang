import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';
import { performanceProjects } from '../../mocks/performance';

export default function PerformancePage() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('performance.filters.all') },
    { id: 'pilot', label: t('performance.filters.pilot') },
    { id: 'mongolia', label: t('performance.filters.mongolia') },
    { id: 'seasia', label: t('performance.filters.seasia') }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? performanceProjects 
    : performanceProjects.filter(p => p.category === activeFilter);

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
          <div className="grid grid-cols-3 gap-7">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-48">
                  <img
                    src={project.image}
                    alt={i18n.language === 'ko' ? project.name : project.nameEn}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {i18n.language === 'ko' ? project.name : project.nameEn}
                  </h3>
                  <p className="text-base text-gray-600 mb-1">
                    {i18n.language === 'ko' ? project.client : project.clientEn}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">{project.year}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xl font-bold text-teal-600">
                      {i18n.language === 'ko' ? project.result : project.resultEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
