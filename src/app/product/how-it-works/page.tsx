'use client'

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import factory1 from '../../../assets/factory_1.png';
import factory2 from '../../../assets/factory_2.png';
import factory3 from '../../../assets/factory_3.png';
import factory4 from '../../../assets/factroey_4.png';
import factory5 from '../../../assets/factory_5.jpg';

export default function ProductHowItWorksPage() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const changesRef = useRef<HTMLDivElement>(null);
  const [isChangesVisible, setIsChangesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChangesVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = changesRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('product.howItWorks.title')}
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mb-0 font-normal">
            Coal Green은 어떤 원리로 작동하나요?
          </p>
        </div>
      </section>

      {/* Business Approach Method */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-4">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              사업 접근 방식
            </h2>
            <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-8">
              테스트 적용 → 본 공급까지의 일반적인 흐름
            </p>
          </div>

          {/* 4-Step Process Flow */}
          <div 
            ref={sectionRef}
            className={`flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex-1 w-full lg:w-auto hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="ri-search-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">현장분석 및 문제 파악</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                현장조건과 문제점을 <span className="font-bold">정확히</span> 파악합니다
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center animate-pulse">
              <i className="ri-arrow-right-line text-4xl text-teal-600"></i>
            </div>
            <div className="lg:hidden flex items-center py-2 animate-pulse">
              <i className="ri-arrow-down-line text-4xl text-teal-600"></i>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex-1 w-full lg:w-auto hover:shadow-xl hover:scale-105 transition-all duration-300" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="ri-file-edit-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">맞춤형 솔루션 설계</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                현장에 <span className="font-bold">최적화된</span> 솔루션을 설계합니다
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center animate-pulse">
              <i className="ri-arrow-right-line text-4xl text-teal-600"></i>
            </div>
            <div className="lg:hidden flex items-center py-2 animate-pulse">
              <i className="ri-arrow-down-line text-4xl text-teal-600"></i>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex-1 w-full lg:w-auto hover:shadow-xl hover:scale-105 transition-all duration-300" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="ri-file-check-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">시범 적용 및 성능 검증</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                소규모 테스트를 통해 <span className="font-bold">효과를 검증</span>합니다
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center animate-pulse">
              <i className="ri-arrow-right-line text-4xl text-teal-600"></i>
            </div>
            <div className="lg:hidden flex items-center py-2 animate-pulse">
              <i className="ri-arrow-down-line text-4xl text-teal-600"></i>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex-1 w-full lg:w-auto hover:shadow-xl hover:scale-105 transition-all duration-300" style={{ transitionDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <i className="ri-truck-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">본 적용 및 정기 공급</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                검증 후 <span className="font-bold">본격 적용</span> 및 정기 공급을 진행합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">작동 원리 상세</h2>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm mb-12">
            <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
              {t('product.howItWorks.description')}
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory3} 
                  alt="희석 및 분사" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#1f2933]">희석 및 분사</h3>
                </div>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-4">
                  조연제를 물과 1:4000 비율로 희석하여 석탄 표면에 균일하게 분사합니다.
                </p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-[13px] text-[#4b5563] font-normal">
                    <i className="ri-information-line mr-2 text-teal-600"></i>
                    희석 비율: 물 4000 : 조연제 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory4} 
                  alt="건조 처리" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#1f2933]">건조 처리</h3>
                </div>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-4">
                  조연제가 석탄 표면에 흡착된 후 적절히 건조시켜 연소 준비를 완료합니다.
                </p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-[13px] text-[#4b5563] font-normal">
                    <i className="ri-information-line mr-2 text-teal-600"></i>
                    건조 상태 확인 필수
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Changes */}
          <div ref={changesRef} className="mb-0">
            <div className="mb-8">
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
                {t('product.howItWorks.changes.title')}
              </h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              isChangesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Change 1: 화염 온도 상승 */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105">
                <div className="absolute inset-0">
                  <Image 
                    src={factory1} 
                    alt="화염 온도 상승" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 z-10 group-hover:from-gray-900/85 group-hover:via-gray-800/80 transition-all duration-300"></div>
                <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <i className="ri-fire-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('product.howItWorks.changes.change1')}
                  </h3>
                  <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                    조연제가 연소 반응을 <span className="font-bold text-white">촉진</span>하여 화염 온도가 <span className="font-bold text-white">상승</span>하고, 더 <span className="font-bold text-white">완전한 연소</span>가 이루어집니다.
                  </p>
                </div>
              </div>

              {/* Change 2: 미연소 감소 */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0.1s' }}>
                <div className="absolute inset-0">
                  <Image 
                    src={factory2} 
                    alt="미연소 감소" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 z-10 group-hover:from-gray-900/85 group-hover:via-gray-800/80 transition-all duration-300"></div>
                <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <i className="ri-subtract-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('product.howItWorks.changes.change2')}
                  </h3>
                  <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                    불완전 연소가 <span className="font-bold text-white">감소</span>하여 미연소 물질이 <span className="font-bold text-white">현저히 줄어듭니다</span>.
                  </p>
                </div>
              </div>

              {/* Change 3: 연소 잔재물 감소 */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute inset-0">
                  <Image 
                    src={factory5} 
                    alt="연소 잔재물 감소" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 z-10 group-hover:from-gray-900/85 group-hover:via-gray-800/80 transition-all duration-300"></div>
                <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <i className="ri-delete-bin-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('product.howItWorks.changes.change3')}
                  </h3>
                  <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                    크링커와 바텀애시 같은 연소 잔재물이 <span className="font-bold text-white">감소</span>하여 <span className="font-bold text-white">설비 보호 효과</span>가 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Diagram */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">작동 과정 시각화</h2>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex-shrink-0 shadow-md">
                    <i className="ri-flask-line text-4xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"></div>
                    <p className="text-sm text-gray-500 mt-2 text-center">조연제 희석</p>
                  </div>
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex-shrink-0 shadow-md">
                    <i className="ri-fire-line text-4xl text-white"></i>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="text-center">
                  <i className="ri-arrow-down-line text-5xl text-teal-600"></i>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex-shrink-0 shadow-md">
                    <i className="ri-speed-up-line text-4xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"></div>
                    <p className="text-sm text-gray-500 mt-2 text-center">연소 반응 촉진</p>
                  </div>
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex-shrink-0 shadow-md">
                    <i className="ri-leaf-line text-4xl text-white"></i>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

