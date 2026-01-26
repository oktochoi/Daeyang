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
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[48px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('about.vision.title')}
          </h1>
        </div>
      </section>

      {/* Core Values */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('about.vision.coreValues.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">환경과 기술을 통한 실질적 개선</p>
          </div>
          
          <div 
            ref={coreValuesRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              coreValuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-earth-line text-3xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('about.vision.coreValues.saveEarth.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('about.vision.coreValues.saveEarth.description')}
              </p>
            </div>
            
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-flashlight-line text-3xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('about.vision.coreValues.saveEnergy.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('about.vision.coreValues.saveEnergy.description')}
              </p>
            </div>
            
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-tools-line text-3xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('about.vision.coreValues.practical.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('about.vision.coreValues.practical.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority & Future Vision */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div 
            ref={priorityRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
              priorityRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-compass-3-line text-2xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933]">우선 방향</h3>
              </div>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('about.vision.priority')}
              </p>
            </div>
            
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-rocket-line text-2xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933]">
                  {t('about.vision.futureVision.title')}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t('about.vision.futureVision.goals', { returnObjects: true })) 
                  ? (t('about.vision.futureVision.goals', { returnObjects: true }) as string[]).map((goal: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      <span className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{goal}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


