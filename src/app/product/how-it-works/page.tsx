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
  const sectionRef = useRef<HTMLDivElement>(null);
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
            {t('product.howItWorks.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Business Approach Method */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-4">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('product.howItWorks.approachTitle')}
            </h2>
            <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-8">
              {t('product.howItWorks.approachSubtitle')}
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
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">{t('product.howItWorks.step1Title')}</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                {t('product.howItWorks.step1Desc')}
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
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">{t('product.howItWorks.step2Title')}</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                {t('product.howItWorks.step2Desc')}
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
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">{t('product.howItWorks.step3Title')}</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                {t('product.howItWorks.step3Desc')}
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
              <h3 className="text-lg font-bold text-[#1f2933] mb-2 text-center whitespace-nowrap">{t('product.howItWorks.step4Title')}</h3>
              <p className="text-[14px] text-[#4b5563] leading-[1.6] font-normal text-center">
                {t('product.howItWorks.step4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">{t('product.howItWorks.detailTitle')}</h2>
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
                  alt={t('product.howItWorks.diluteTitle')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#1f2933]">{t('product.howItWorks.diluteTitle')}</h3>
                </div>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-4">
                  {t('product.howItWorks.diluteDesc')}
                </p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-[13px] text-[#4b5563] font-normal">
                    <i className="ri-information-line mr-2 text-teal-600"></i>
                    {t('product.howItWorks.diluteRatio')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory4} 
                  alt={t('product.howItWorks.dryTitle')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#1f2933]">{t('product.howItWorks.dryTitle')}</h3>
                </div>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-4">
                  {t('product.howItWorks.dryDesc')}
                </p>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-[13px] text-[#4b5563] font-normal">
                    <i className="ri-information-line mr-2 text-teal-600"></i>
                    {t('product.howItWorks.dryNote')}
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
                    alt={t('product.howItWorks.changes.change1')} 
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
                    alt={t('product.howItWorks.changes.change2')} 
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
                    {t('product.howItWorks.changes.change2Desc')}
                  </p>
                </div>
              </div>

              {/* Change 3: 연소 잔재물 감소 */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute inset-0">
                  <Image 
                    src={factory5} 
                    alt={t('product.howItWorks.changes.change3')} 
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
                    {t('product.howItWorks.changes.change3Desc')}
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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">{t('product.howItWorks.visualizationTitle')}</h2>
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
                    <p className="text-sm text-gray-500 mt-2 text-center">{t('product.howItWorks.stepDilute')}</p>
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
                    <p className="text-sm text-gray-500 mt-2 text-center">{t('product.howItWorks.stepPromote')}</p>
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

