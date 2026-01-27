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
          <div className="mb-12">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('about.vision.coreValues.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          
          <div 
            ref={coreValuesRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${
              coreValuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* 환경 보호 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105" style={{ transitionDelay: '0s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-900/90 z-10 group-hover:from-green-900/85 group-hover:via-green-800/80 transition-all duration-300"></div>
              <div 
                className="absolute inset-0 opacity-20 z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
                }}
              ></div>
              <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                  <i className="ri-leaf-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('about.vision.coreValues.saveEarth.title')}
                </h3>
                <p className="text-white/90 leading-relaxed text-base flex-grow">
                  연소 과정에서 발생하는 오염물질을 줄여 지속가능한 산업 환경을 만듭니다.
                </p>
              </div>
            </div>
            
            {/* 에너지 절감 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-blue-900/90 z-10 group-hover:from-blue-900/85 group-hover:via-indigo-900/80 transition-all duration-300"></div>
              <div 
                className="absolute inset-0 opacity-20 z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
                }}
              ></div>
              <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                  <i className="ri-flashlight-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('about.vision.coreValues.saveEnergy.title')}
                </h3>
                <p className="text-white/90 leading-relaxed text-base flex-grow">
                  연소 효율을 높여 불필요한 에너지 손실을 줄이고 연료 사용의 효율을 극대화합니다.
                </p>
              </div>
            </div>
            
            {/* 기술을 통한 실질적 개선 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-700/85 to-slate-800/90 z-10 group-hover:from-slate-800/85 group-hover:via-slate-700/80 transition-all duration-300"></div>
              <div 
                className="absolute inset-0 opacity-20 z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
                }}
              ></div>
              <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                  <i className="ri-building-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('about.vision.coreValues.practical.title')}
                </h3>
                <p className="text-white/90 leading-relaxed text-base flex-grow">
                  현장에서 검증된 기술로 즉시 적용 가능한 변화를 만들어냅니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority & Future Vision */}
      <section className="pb-[96px] bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div 
            ref={priorityRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
              priorityRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* 우선 방향 */}
            <div className="bg-gray-100 rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-compass-3-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1f2933]">우선 방향</h3>
              </div>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('about.vision.priority')}
              </p>
            </div>
            
            {/* 5~10년 후 비전 */}
            <div className="bg-gray-100 rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-rocket-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1f2933]">
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


