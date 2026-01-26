'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import office1 from '../../../assets/office_1.png';
import office2 from '../../../assets/office_2.png';

export default function AboutOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Company Overview */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* 제목 - 좌측 정렬 */}
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('about.overview.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-building-2-line text-2xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933]">정식 사업 분야</h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t('about.overview.businessFields', { returnObjects: true })) 
                  ? (t('about.overview.businessFields', { returnObjects: true }) as string[]).map((field: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      <span className="text-[#4b5563] text-[15px] leading-[1.6] font-normal">{field}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
            
            <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-group-line text-2xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933]">주요 고객 유형</h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t('about.overview.customerTypes', { returnObjects: true })) 
                  ? (t('about.overview.customerTypes', { returnObjects: true }) as string[]).map((type: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      <span className="text-[#4b5563] text-[15px] leading-[1.6] font-normal">{type}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 현장에서 검증된 기술 Section */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* 섹션 제목 */}
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              현장에서 검증된 기술
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>

          {/* 설명 문단 */}
          <div className="mb-12">
            <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mb-3 font-normal">
              석탄 연소 효율을 높이고 대기오염을 저감하는<br />
              친환경 연소 솔루션을 개발·공급합니다.
            </p>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] max-w-[480px] mb-0 font-normal">
              기존 설비 변경 없이<br />
              효율과 수익성을 동시에 개선합니다.
            </p>
          </div>

          {/* Stats - 3개, 스타일 개선 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm">
              <div className="text-[18px] font-semibold text-[#1f2933]">
                {t('about.stats.experience')}+년 업계 경험
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm">
              <div className="text-[18px] font-semibold text-[#1f2933]">
                {t('about.stats.sites')}+개 적용 현장
              </div>
            </div>
            <div className="bg-[#f9fafb] rounded-xl p-6 shadow-sm">
              <div className="text-[18px] font-semibold text-[#1f2933]">
                {t('about.stats.patents')}건 특허·인증
              </div>
            </div>
          </div>

          {/* Office Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 relative">
              <Image 
                src={office1} 
                alt="대양환경기술 사무실" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 relative">
              <Image 
                src={office2} 
                alt="대양환경기술 사무실" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


