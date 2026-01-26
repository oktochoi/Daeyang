'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { mediaItems } from '../../../mocks/media';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import factory1 from '../../../assets/factory_1.png';
import factory2 from '../../../assets/factory_2.png';
import factory3 from '../../../assets/factory_3.png';
import factory4 from '../../../assets/factroey_4.png';
import factory5 from '../../../assets/factory_5.jpg';

export default function ProductOverviewPage() {
  const { t } = useTranslation();
  const definitionRef = useScrollAnimation();
  const effectsRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();
  const backgroundRef = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('product.hero.title')}
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mb-0 font-normal">
            {t('product.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              기술 자료
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              제품 기술 백서, 적용 가이드, 시험성적 및 환경 영향 평가 자료
            </p>
          </div>

          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-file-text-line text-2xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933]">
                기술 자료 모아보기
              </h3>
            </div>
            <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal mb-6">
              기술 백서, 적용 가이드라인, 시험성적, 환경 영향 평가 자료를 확인하세요.
            </p>
            <Link
              href="/product/technical"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-[15px] font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              기술 자료 바로가기
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('product.problems.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              기존 석탄 연소 방식의 핵심 문제점
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-fire-line text-2xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.problems.problem1.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.problems.problem1.description')}
              </p>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-cloud-line text-2xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.problems.problem2.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.problems.problem2.description')}
              </p>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-tools-line text-2xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.problems.problem3.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.problems.problem3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div 
            ref={definitionRef.ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${
              definitionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-8">
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
                {t('product.definition.title')}
              </h2>
              <div className="w-12 h-0.5 bg-teal-600"></div>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 relative h-[400px]">
              <Image 
                src={factory1} 
                alt="Coal Green 제품" 
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] font-normal mb-0">
              {t('product.definition.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Effects */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('product.effects.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          <div 
            ref={effectsRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              effectsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory2} 
                  alt="연소 효율 향상" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.effects.effect1.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.effects.effect1.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory3} 
                  alt="비용 절감" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.effects.effect2.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.effects.effect2.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory4} 
                  alt="환경 개선" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.effects.effect3.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.effects.effect3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('product.benefits.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          <div 
            ref={benefitsRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              benefitsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="text-[48px] font-bold text-teal-600 mb-3">
                {t('product.benefits.cost.value')}
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.benefits.cost.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.benefits.cost.description')}
              </p>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="text-[48px] font-bold text-teal-600 mb-3">
                {t('product.benefits.emission.value')}
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.benefits.emission.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.benefits.emission.description')}
              </p>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="text-[48px] font-bold text-teal-600 mb-3">
                {t('product.benefits.maintenance.value')}
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                {t('product.benefits.maintenance.title')}
              </h3>
              <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                {t('product.benefits.maintenance.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Background */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('business.background.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              {t('business.background.subtitle')}
            </p>
          </div>
          
          <div 
            ref={backgroundRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-700 ${
              backgroundRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory5} 
                  alt={t('business.background.reason1.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('business.background.reason1.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('business.background.reason1.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory1} 
                  alt={t('business.background.reason2.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('business.background.reason2.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('business.background.reason2.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory2} 
                  alt={t('business.background.reason3.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('business.background.reason3.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('business.background.reason3.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
            <h3 className="text-[20px] font-semibold text-[#1f2933] mb-6">
              {t('business.background.whyNotEnough.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-close-line text-white text-xs"></i>
                </div>
                <span className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{t('business.background.whyNotEnough.reason1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-close-line text-white text-xs"></i>
                </div>
                <span className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{t('business.background.whyNotEnough.reason2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-close-line text-white text-xs"></i>
                </div>
                <span className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{t('business.background.whyNotEnough.reason3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              인증 및 수상
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              특허, 인증, 시험성적
            </p>
          </div>

          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-award-line text-2xl text-white"></i>
              </div>
              <h3 className="text-[20px] font-semibold text-[#1f2933]">
                {t('media.tabs.awards')}
              </h3>
            </div>
            <div className="space-y-4">
              {mediaItems.awards.map((item) => (
                <div key={item.id} className="p-6 rounded-lg bg-white border border-gray-200">
                  <div className="text-[13px] text-[#4b5563] opacity-70 mb-2 font-normal">{item.date}</div>
                  <div className="text-[18px] font-semibold text-[#1f2933] mb-2">
                    {item.title}
                  </div>
                  <div className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                    {item.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

