'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export default function AboutVisionPage() {
  const { t } = useTranslation();
  const coreValuesRef = useScrollAnimation();
  const priorityRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[38px] font-[650] text-[#1f2933] mb-5 leading-[1.25]">
            {t('about.vision.title')}
          </h1>
        </div>
      </section>

      {/* Core Values */}
      <section className="pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.vision.coreValues.title')}
            </h2>
            <p className="text-lg text-gray-600">환경과 기술을 통한 실질적 개선</p>
          </div>
          
          <div 
            ref={coreValuesRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-700 ${
              coreValuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border border-teal-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-earth-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('about.vision.coreValues.saveEarth.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.coreValues.saveEarth.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-flashlight-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('about.vision.coreValues.saveEnergy.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.coreValues.saveEnergy.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-tools-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('about.vision.coreValues.practical.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.coreValues.practical.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority & Future Vision */}
      <section className="pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div 
            ref={priorityRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 ${
              priorityRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-compass-3-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">우선 방향</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.vision.priority')}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <i className="ri-rocket-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t('about.vision.futureVision.title')}
                </h3>
              </div>
              <ul className="space-y-4">
                {(t('about.vision.futureVision.goals', { returnObjects: true }) as string[]).map((goal: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


