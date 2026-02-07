'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

import visionHeroBg from '../../../assets/factory_5.jpg';

export default function AboutVisionPage() {
  const { t } = useTranslation();
  const coreValuesRef = useScrollAnimation();
  const visionRef = useScrollAnimation();
  const goals = Array.isArray(t('about.vision.futureVision.goals', { returnObjects: true }))
    ? (t('about.vision.futureVision.goals', { returnObjects: true }) as string[])
    : [];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero - 되돌림: 고정 높이·기본 그라디언트, 반응형 타이포·패딩 */}
      <section className="relative min-h-[280px] min-[400px]:min-h-[320px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[400px] flex items-end overflow-hidden pt-[88px] sm:pt-24 md:pt-32 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src={visionHeroBg}
            alt="비전 및 철학 히어로 배경, 산업 시설"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" aria-hidden />
        </div>
        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 safe-area-padding-x">
          <span className="inline-block px-3 py-1.5 bg-white/20 text-white/95 text-xs font-semibold uppercase tracking-[0.15em] rounded mb-4 sm:mb-6 backdrop-blur-sm">
            {t('about.vision.heroEyebrow')}
          </span>
          <h1 className="space-y-2 sm:space-y-3">
            <span className="block text-[28px] min-[380px]:text-[32px] sm:text-[38px] md:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight">
              {t('about.vision.heroLine1')}
            </span>
            <span className="block text-[28px] min-[380px]:text-[32px] sm:text-[38px] md:text-[42px] lg:text-[48px] font-extrabold text-teal-400 leading-[1.1] tracking-tight">
              {t('about.vision.heroLine2')}
            </span>
          </h1>
        </div>
      </section>

      {/* Core Values - 반응형: 패딩·갭·타이포·터치 영역 */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 safe-area-padding-x">
          <h2 className="text-base sm:text-lg md:text-xl font-medium text-[#111827] mb-6 sm:mb-8 md:mb-10">
            {t('about.vision.coreValues.title')}
          </h2>
          
          <div 
            ref={coreValuesRef.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-stretch"
          >
            {/* 환경 보호 */}
            <div 
              className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 flex flex-col min-h-0 transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-gray-300 touch-manipulation ${
                coreValuesRef.isVisible ? 'vision-card-scroll-side' : 'vision-card-initial'
              }`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-3 sm:mb-4">
                <i className="ri-leaf-line text-2xl sm:text-[26px] text-teal-600" aria-hidden />
              </div>
              <h3 className="text-[15px] sm:text-base font-semibold text-[#111827] mb-1">
                {t('about.vision.coreValues.saveEarth.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-2 sm:mb-3">{t('about.vision.coreValues.saveEarth.subtitle')}</p>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed flex-grow whitespace-pre-line break-words">
                {t('about.vision.coreValues.saveEarth.description')}
              </p>
            </div>
            
            {/* 에너지 절감 - 대표 카드 강조 */}
            <div 
              className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-9 border-2 border-teal-500 flex flex-col relative z-10 min-h-0 transition-all duration-300 ease-out md:scale-[1.02] shadow-[0_12px_40px_rgba(0,59,92,0.12)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,59,92,0.18)] hover:border-teal-600 touch-manipulation ${
                coreValuesRef.isVisible ? 'vision-card-scroll-center' : 'vision-card-initial'
              }`}
            >
              <span className={`absolute -top-2.5 sm:-top-3 left-4 sm:left-5 md:left-6 px-2.5 sm:px-3 py-1 bg-teal-600 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded ${
                coreValuesRef.isVisible ? 'vision-badge-pop' : 'opacity-0'
              }`}>
                {t('about.vision.coreValues.coreBadge')}
              </span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 mt-0.5 sm:mt-1">
                <i className="ri-flashlight-line text-2xl sm:text-[26px] md:text-[30px] text-teal-600" aria-hidden />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#111827] mb-1">
                {t('about.vision.coreValues.saveEnergy.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-2 sm:mb-3 md:mb-4">{t('about.vision.coreValues.saveEnergy.subtitle')}</p>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed flex-grow whitespace-pre-line break-words">
                {t('about.vision.coreValues.saveEnergy.description')}
              </p>
            </div>
            
            {/* 기술을 통한 실질적 개선 */}
            <div 
              className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 flex flex-col min-h-0 transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-gray-300 touch-manipulation ${
                coreValuesRef.isVisible ? 'vision-card-scroll-side' : 'vision-card-initial'
              }`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-3 sm:mb-4">
                <i className="ri-building-line text-2xl sm:text-[26px] text-teal-600" aria-hidden />
              </div>
              <h3 className="text-[15px] sm:text-base font-semibold text-[#111827] mb-1">
                {t('about.vision.coreValues.practical.title')}
              </h3>
              <p className="text-xs text-gray-500 mb-2 sm:mb-3">{t('about.vision.coreValues.practical.subtitle')}</p>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed flex-grow whitespace-pre-line break-words">
                {t('about.vision.coreValues.practical.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 우선 방향 + 5~10년 후 비전 — 반응형 패딩·타이포·그리드 */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100 overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 safe-area-padding-x">
          <div
            ref={visionRef.ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-500 ${visionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* 우선 방향 — 컴팩트 블록 */}
            <div className="rounded-xl sm:rounded-2xl bg-gray-50/80 border border-gray-200 p-5 sm:p-6 md:p-8 mb-8 sm:mb-10 md:mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <p className="text-[11px] sm:text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2 sm:mb-3">
                {t('about.vision.priorityTitle')}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug whitespace-pre-line">
                {t('about.vision.priorityHeadline')}
              </p>
              <p className="mt-1.5 sm:mt-2 text-sm text-gray-500 whitespace-pre-line break-words">
                {t('about.vision.prioritySub')}
              </p>
            </div>

            {/* 5~10년 후 비전 — 타이틀 + 헤드라인 */}
            <div className="mb-8 sm:mb-10">
              <p className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-widest mb-2 sm:mb-3">
                {t('about.vision.futureVision.title')}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug whitespace-pre-line max-w-2xl break-words">
                {t('about.vision.futureVision.headline')}
              </h2>
            </div>

            {/* 목표 3개 — 1열(모바일) / 3열(sm+), 갭·패딩 반응형 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-14">
              {goals.map((goal: string, index: number) => (
                <div
                  key={index}
                  className={`rounded-xl bg-white border border-gray-200 p-4 sm:p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:border-teal-200 transition-all duration-300 ease-out touch-manipulation ${
                    visionRef.isVisible ? 'vision-list-item' : 'opacity-0'
                  }`}
                  style={visionRef.isVisible ? { animationDelay: `${index * 80}ms` } : undefined}
                >
                  <span className="inline-flex w-8 h-8 rounded-lg bg-teal-100 text-teal-600 items-center justify-center text-sm font-bold mb-2 sm:mb-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed break-words">{goal}</p>
                </div>
              ))}
            </div>

            {/* 클로징 문장 — 풀블리드, 반응형 패딩·타이포 */}
            <div
              className={`vision-emphasis-bleed relative py-10 sm:py-12 md:py-16 overflow-hidden ${
                visionRef.isVisible ? 'vision-list-item' : 'opacity-0'
              }`}
              style={visionRef.isVisible ? { animationDelay: `${goals.length * 80}ms` } : undefined}
            >
              <div className="absolute inset-0 bg-teal-600" aria-hidden />
              <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" aria-hidden />
              <div className="absolute bottom-0 left-0 w-40 sm:w-48 h-40 sm:h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden />
              <div className="absolute top-1/2 left-1/4 w-20 sm:w-24 h-20 sm:h-24 border border-white/10 rounded-full -translate-y-1/2" aria-hidden />
              <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 safe-area-padding-x">
                <p className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-line max-w-2xl break-words [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                  {t('about.vision.futureVision.closing')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
