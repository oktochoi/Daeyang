'use client'

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { getAwardsCertifications } from '@/lib/supabase-media';
import factory1 from '../../../assets/factory_1.png';
import factory2 from '../../../assets/factory_2.png';
import factory3 from '../../../assets/factory_3.png';
import factory4 from '../../../assets/factroey_4.png';
import factory5 from '../../../assets/factory_5.jpg';

export default function ProductOverviewPage() {
  const { t, i18n } = useTranslation();
  const definitionRef = useScrollAnimation();
  const effectsRef = useScrollAnimation();
  const benefitsRef = useScrollAnimation();
  const backgroundRef = useScrollAnimation();
  const [awards, setAwards] = useState<any[]>([]);
  const [isLoadingAwards, setIsLoadingAwards] = useState(true);
  const [isProblemsVisible, setIsProblemsVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const problemsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === problemsRef.current) {
              setIsProblemsVisible(true);
            } else if (entry.target === tableRef.current) {
              setIsTableVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (problemsRef.current) observer.observe(problemsRef.current);
    if (tableRef.current) observer.observe(tableRef.current);

    return () => {
      if (problemsRef.current) observer.unobserve(problemsRef.current);
      if (tableRef.current) observer.unobserve(tableRef.current);
    };
  }, []);

  useEffect(() => {
    async function loadAwards() {
      setIsLoadingAwards(true);
      try {
        const data = await getAwardsCertifications();
        setAwards(data.slice(0, 3)); // 최근 3개만 표시
      } catch (error) {
        console.error('Error loading awards:', error);
      } finally {
        setIsLoadingAwards(false);
      }
    }
    loadAwards();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero - Introduction Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* Left Text, Right Image Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div>
              <div className="mb-6">
                <p className="text-teal-600 text-[18px] font-semibold mb-2">Save Earth, Save Energy</p>
                <h1 className="text-[32px] font-bold text-[#1f2933] mb-6 leading-[1.3]">
                  석탄 조연제 COAL GREEN을 소개합니다.
                </h1>
              </div>
              
              <div className="space-y-4 text-[15px] text-[#4b5563] leading-[1.8] font-normal">
                <p>
                  Coal Green is a trace substance added to liquid and solid fuels to improve quality for complete combustion, maintain a clean fuel chamber, prevent wear, prevent clinker formation, prevent ash adhesion, and prevent corrosion of boiler materials and heating tubes.
                </p>
                <p>
                  By adding the additive to coal fuel, fuel consumption can be reduced, clinker can be prevented, and pollutant gas emissions can be decreased.
                </p>
                <p>
                  The additive's components are 100% water-soluble, harmless to the human body, and pose no risk of damage to power generation equipment or explosion. The product has undergone continuous performance improvement, with the current version being Ver 7.0.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-[#1f2933] mb-2">※클링커(Clinker)란?</p>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  When the temperature of the combustion bed during coal combustion rises above the melting point of ash, causing the coal ash to melt and solidify into lumps.
                </p>
              </div>
            </div>
            
            {/* Right: Industrial Facility Image */}
            <div className="rounded-xl overflow-hidden border border-gray-200 relative h-[600px] lg:sticky lg:top-24">
              <Image 
                src={factory5} 
                alt="산업 시설 내부" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Table */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              제품 비교
            </h2>
          </div>

          <div 
            ref={tableRef}
            className={`bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-700 ${
              isTableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <table className="w-full">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold text-[15px] border-r border-teal-700">제품명</th>
                  <th className="px-6 py-4 text-center font-semibold text-[15px] border-r border-teal-700">석탄용 조연제</th>
                  <th className="px-6 py-4 text-center font-semibold text-[15px]">소각용 첨가제</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">사용처</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] border-r border-gray-200">석탄 화력발전소</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563]">쓰레기소각장</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">형상</td>
                  <td colSpan={2} className="px-6 py-4 text-center text-[15px] text-[#4b5563]">
                    원액 : 겔타입의 액체<br />
                    <span className="text-[13px] text-gray-500">색상 : 갈색 또는 투명</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">사용방법</td>
                  <td colSpan={2} className="px-6 py-4 text-center text-[15px] text-[#4b5563]">
                    물과 원액을 희석 후 석탄 투입 전 스프레이 분사
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 bg-gray-50 font-semibold text-[#1f2933] text-[15px] border-r border-gray-200">비율(원액 : 물)</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] font-semibold border-r border-gray-200">1:4,000</td>
                  <td className="px-6 py-4 text-center text-[15px] text-[#4b5563] font-semibold">1:400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              기술 자료
            </h2>
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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('product.problems.title')}
            </h2>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              기존 석탄 연소 방식의 핵심 문제점
            </p>
          </div>
          <div 
            ref={problemsRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              isProblemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Problem 1: 미연소·불완전연소 문제 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0s' }}>
              <div className="absolute inset-0">
                <Image 
                  src={factory1} 
                  alt="미연소·불완전연소 문제" 
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
                  {t('product.problems.problem1.title')}
                </h3>
                <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                  {t('product.problems.problem1.description')}
                </p>
              </div>
            </div>

            {/* Problem 2: 대기오염물질 과다 배출 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute inset-0">
                <Image 
                  src={factory2} 
                  alt="대기오염물질 과다 배출" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 z-10 group-hover:from-gray-900/85 group-hover:via-gray-800/80 transition-all duration-300"></div>
              <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                  <i className="ri-cloud-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('product.problems.problem2.title')}
                </h3>
                <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                  {t('product.problems.problem2.description')}
                </p>
              </div>
            </div>

            {/* Problem 3: 크링커·바텀애시로 인한 설비 손상 */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[320px] hover:scale-105" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute inset-0">
                <Image 
                  src={factory3} 
                  alt="크링커·바텀애시로 인한 설비 손상" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90 z-10 group-hover:from-gray-900/85 group-hover:via-gray-800/80 transition-all duration-300"></div>
              <div className="relative z-20 p-8 min-h-[320px] flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all duration-300">
                  <i className="ri-tools-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('product.problems.problem3.title')}
                </h3>
                <p className="text-[15px] text-white/90 leading-[1.8] font-normal">
                  {t('product.problems.problem3.description')}
                </p>
              </div>
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
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
                {t('product.definition.title')}
              </h2>
            </div>
            
            {/* Left Text, Right Image Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Text Content */}
              <div>
                <div className="mb-6">
                  <p className="text-teal-600 text-[18px] font-semibold mb-2">Save Earth, Save Energy</p>
                  <h3 className="text-[28px] font-bold text-[#1f2933] mb-6 leading-[1.3]">
                    석탄 조연제 COAL GREEN을 소개합니다.
                  </h3>
                </div>
                
                <div className="space-y-4 text-[15px] text-[#4b5563] leading-[1.8] font-normal">
                  <p>
                    Coal Green is a trace substance added to liquid and solid fuels to improve quality for complete combustion, maintain a clean fuel chamber, prevent wear, prevent clinker formation, prevent ash adhesion, and prevent corrosion of boiler materials and heating tubes.
                  </p>
                  <p>
                    By adding the additive to coal fuel, fuel consumption can be reduced, clinker can be prevented, and pollutant gas emissions can be decreased.
                  </p>
                  <p>
                    The additive's components are 100% water-soluble, harmless to the human body, and pose no risk of damage to power generation equipment or explosion. The product has undergone continuous performance improvement, with the current version being Ver 7.0.
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-[#1f2933] mb-2">※클링커(Clinker)란?</p>
                  <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                    When the temperature of the combustion bed during coal combustion rises above the melting point of ash, causing the coal ash to melt and solidify into lumps.
                  </p>
                </div>
              </div>
              
              {/* Right: Industrial Facility Image */}
              <div className="rounded-xl overflow-hidden border border-gray-200 relative h-[600px] lg:sticky lg:top-24">
                <Image 
                  src={factory1} 
                  alt="Coal Green 제품" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Effects */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('product.effects.title')}
            </h2>
          </div>
          <div 
            ref={effectsRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              effectsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory2} 
                  alt="연소 효율 향상" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3 group-hover:text-teal-600 transition-colors">
                  {t('product.effects.effect1.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.effects.effect1.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:scale-105" style={{ transitionDelay: '0.1s' }}>
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory3} 
                  alt="비용 절감" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3 group-hover:text-teal-600 transition-colors">
                  {t('product.effects.effect2.title')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.effects.effect2.description')}
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:scale-105" style={{ transitionDelay: '0.2s' }}>
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory4} 
                  alt="환경 개선" 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3 group-hover:text-teal-600 transition-colors">
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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('product.benefits.title')}
            </h2>
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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('business.background.title')}
            </h2>
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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              인증 및 수상
            </h2>
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
            {isLoadingAwards ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              </div>
            ) : awards.length > 0 ? (
              <div className="space-y-4">
                {awards.map((item) => (
                  <div key={item.id} className="p-6 rounded-lg bg-white border border-gray-200">
                    {item.award_date && (
                      <div className="text-[13px] text-[#4b5563] opacity-70 mb-2 font-normal">
                        {new Date(item.award_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </div>
                    )}
                    <div className="text-[18px] font-semibold text-[#1f2933] mb-2">
                      {i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                    </div>
                    {item.description && (
                      <div className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                        {i18n.language === 'ko' ? item.description : (item.description_en || item.description)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>등록된 인증 및 수상 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

