import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';
import { mediaItems } from '../../mocks/media';

export default function MediaPage() {
  const { t, i18n } = useTranslation();
  const [openSections, setOpenSections] = useState<{
    press: boolean;
    awards: boolean;
  }>({
    press: true,
    awards: true
  });

  const toggleSection = (section: 'press' | 'awards') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { id: 'press' as const, label: t('media.tabs.press'), icon: 'ri-newspaper-line' },
    { id: 'awards' as const, label: t('media.tabs.awards'), icon: 'ri-award-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {i18n.language === 'ko' 
              ? '최신 소식과 자료를 확인하세요' 
              : 'Check out our latest news and resources'}
          </p>
        </div>
      </section>

      {/* Toggle Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Toggle Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-50 rounded-lg">
                    <i className={`${section.icon} text-2xl text-teal-600`}></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.label}
                  </h2>
                </div>
                <i className={`ri-arrow-${openSections[section.id] ? 'up' : 'down'}-s-line text-2xl text-gray-400 transition-transform duration-300`}></i>
              </button>

              {/* Toggle Content */}
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openSections[section.id] 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pt-4 border-t border-gray-100">
                  {section.id === 'press' && (
                    <div className="space-y-6">
                      {/* Articles */}
                      <div className="space-y-4">
                        {mediaItems[section.id].map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-6 p-5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                          >
                            <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                              <i className="ri-image-line text-3xl text-gray-400"></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {i18n.language === 'ko' ? item.title : item.titleEn}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {i18n.language === 'ko' ? item.summary : item.summaryEn}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <div className="text-sm text-gray-500">
                                {item.date}
                              </div>
                              <div className="flex items-center gap-1 text-teal-600 text-sm font-medium">
                                {i18n.language === 'ko' ? '자세히 보기' : 'Read more'}
                                <i className="ri-arrow-right-line"></i>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Video Section */}
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <i className="ri-video-line text-teal-600"></i>
                          {i18n.language === 'ko' ? '동영상' : 'Videos'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center">
                              <i className="ri-video-add-line text-4xl text-gray-400 mb-2"></i>
                              <p className="text-sm text-gray-500">동영상 영역</p>
                              <p className="text-xs text-gray-400 mt-1">관리자가 동영상을 추가할 수 있습니다</p>
                            </div>
                          </div>
                          <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center">
                              <i className="ri-video-add-line text-4xl text-gray-400 mb-2"></i>
                              <p className="text-sm text-gray-500">동영상 영역</p>
                              <p className="text-xs text-gray-400 mt-1">관리자가 동영상을 추가할 수 있습니다</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {section.id === 'awards' && (
                    <div className="space-y-4">
                      {/* Awards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <div
                            key={index}
                            className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors cursor-pointer"
                          >
                            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                              <i className="ri-award-line text-4xl text-gray-400"></i>
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                              <i className="ri-calendar-line mr-2"></i>
                              날짜 영역
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add New Award Placeholder */}
                      <div className="mt-6 p-6 bg-teal-50 rounded-xl border-2 border-dashed border-teal-300 text-center">
                        <i className="ri-add-circle-line text-3xl text-teal-600 mb-2"></i>
                        <p className="text-sm text-teal-700 font-medium">
                          {i18n.language === 'ko' 
                            ? '관리자가 인증 및 수상 내용을 추가할 수 있습니다' 
                            : 'Administrators can add awards and certifications'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
