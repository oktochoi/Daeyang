'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export default function AboutVisionPage() {
  const { t } = useTranslation();
  const coreValuesRef = useScrollAnimation();
  const visionRef = useScrollAnimation();
  const goals = Array.isArray(t('about.vision.futureVision.goals', { returnObjects: true }))
    ? (t('about.vision.futureVision.goals', { returnObjects: true }) as string[])
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero - "무대" 카드 (배경 #F9FAFB로 구분) */}
      <section className="mt-[80px] sm:mt-[140px] pt-8 sm:pt-12 pb-16 sm:pb-24 px-6 sm:px-8 bg-[#F9FAFB]">
        <div 
          className="max-w-[1200px] mx-auto rounded-[28px] py-16 sm:py-24 px-8 sm:px-16"
          style={{
            background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 70%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          }}
        >
          <span className="inline-block px-3 py-1.5 bg-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-[0.15em] rounded mb-8">
            {t('about.vision.heroEyebrow')}
          </span>
          <div className="space-y-6">
            <p 
              className="vision-hero-line-1 text-[36px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#111827] leading-[1.1]"
              style={{ letterSpacing: '-0.01em' }}
            >
              {t('about.vision.heroLine1')}
            </p>
            <p 
              className="vision-hero-line-2 text-[36px] sm:text-[44px] lg:text-[52px] font-extrabold text-teal-600 leading-[1.1]"
              style={{ letterSpacing: '-0.01em' }}
            >
              {t('about.vision.heroLine2')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values - 배경 #F9FAFB */}
      <section className="py-16 sm:py-20 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#111827] mb-10">
            {t('about.vision.coreValues.title')}
          </h2>
          
          <div 
            ref={coreValuesRef.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end"
          >
            {/* 환경 보호 */}
            <div 
              className={`bg-white rounded-xl p-6 border border-gray-200 flex flex-col h-full transition-all duration-300 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] ${
                coreValuesRef.isVisible ? 'vision-card-scroll-side' : 'vision-card-initial'
              }`}
            >
              <div className="w-7 h-7 flex items-center justify-center mb-4">
                <i className="ri-leaf-line text-[26px] text-teal-600"></i>
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-1">
                {t('about.vision.coreValues.saveEarth.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{t('about.vision.coreValues.saveEarth.subtitle')}</p>
              <p className="text-sm text-gray-600 leading-relaxed flex-grow whitespace-pre-line">
                {t('about.vision.coreValues.saveEarth.description')}
              </p>
            </div>
            
            {/* 에너지 절감 - CORE VALUE */}
            <div 
              className={`bg-white rounded-xl p-8 md:p-9 border-[3px] border-teal-500 flex flex-col relative z-10 transition-all duration-300 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] ${
                coreValuesRef.isVisible ? 'vision-card-scroll-center' : 'vision-card-initial'
              }`}
              style={{ minHeight: 'calc(100% + 16px)' }}
            >
              <span className={`absolute -top-3 left-6 px-3 py-1 bg-teal-600 text-white text-xs font-semibold uppercase tracking-wider rounded ${
                coreValuesRef.isVisible ? 'vision-badge-pop' : 'opacity-0'
              }`}>
                {t('about.vision.coreValues.coreBadge')}
              </span>
              <div className="w-9 h-9 flex items-center justify-center mb-6 mt-2">
                <i className="ri-flashlight-line text-[30px] text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-1">
                {t('about.vision.coreValues.saveEnergy.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{t('about.vision.coreValues.saveEnergy.subtitle')}</p>
<p className="text-sm text-gray-600 leading-relaxed flex-grow whitespace-pre-line">
              {t('about.vision.coreValues.saveEnergy.description')}
              </p>
            </div>
            
            {/* 기술을 통한 실질적 개선 */}
            <div 
              className={`bg-white rounded-xl p-6 border border-gray-200 flex flex-col h-full transition-all duration-300 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] ${
                coreValuesRef.isVisible ? 'vision-card-scroll-side' : 'vision-card-initial'
              }`}
            >
              <div className="w-7 h-7 flex items-center justify-center mb-4">
                <i className="ri-building-line text-[26px] text-teal-600"></i>
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-1">
                {t('about.vision.coreValues.practical.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{t('about.vision.coreValues.practical.subtitle')}</p>
              <p className="text-sm text-gray-600 leading-relaxed flex-grow whitespace-pre-line">
                {t('about.vision.coreValues.practical.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 우선 방향 - 배경 #F1F5F9 */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div 
            ref={visionRef.ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-500 ${
              visionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div 
              className="relative rounded-xl py-8 px-8 sm:px-10 pl-12 sm:pl-14 overflow-hidden"
              style={{ background: '#F1F5F9' }}
            >
              {/* Line Draw */}
              <div 
                className={`absolute left-0 top-0 w-1 bg-[#10B981] rounded-l-xl ${
                  visionRef.isVisible ? 'vision-line-draw' : 'h-0'
                }`}
              />
              <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
                {t('about.vision.priorityTitle')}
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-[#111827] leading-snug max-w-2xl mb-4 whitespace-pre-line">
                {t('about.vision.priorityHeadline')}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl whitespace-pre-line">
                {t('about.vision.prioritySub')}
              </p>
            </div>
            
            {/* 5~10년 후 비전 - 배경 #FFFFFF, 체크 진하게, 마지막 문장 강조 */}
            <div className="mt-16">
              <h2 className="text-lg font-medium text-teal-600 mb-4">{t('about.vision.futureVision.title')}</h2>
              <p className="text-xl sm:text-2xl font-medium text-[#111827] leading-relaxed mb-8 max-w-2xl whitespace-pre-line">
                {t('about.vision.futureVision.headline')}
              </p>
              <ul className="space-y-4 max-w-xl mb-12">
                {goals.map((goal: string, index: number) => (
                  <li 
                    key={index} 
                    className={`flex items-start gap-3 ${
                      visionRef.isVisible ? 'vision-list-item' : 'opacity-0'
                    }`}
                    style={visionRef.isVisible ? { animationDelay: `${index * 80}ms` } : undefined}
                  >
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-teal-600 flex items-center justify-center">
                      <i className="ri-check-line text-white text-xs"></i>
                    </span>
                    <span className="text-[15px] text-gray-600 leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
              <p 
                className={`text-xl sm:text-2xl font-bold text-teal-700 leading-relaxed max-w-2xl whitespace-pre-line ${
                  visionRef.isVisible ? 'vision-list-item' : 'opacity-0'
                }`}
                style={visionRef.isVisible ? { animationDelay: `${goals.length * 80}ms` } : undefined}
              >
                {t('about.vision.futureVision.closing')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
