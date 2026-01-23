'use client'

import { useTranslation } from 'react-i18next';
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
      
      {/* Hero Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* 제목 - 좌측 정렬, 하나만 */}
          <h1 className="text-[38px] font-[650] text-[#1f2933] mb-5 leading-[1.25]">
            연소 효율을 바꾸는 기업
          </h1>
          
          {/* 설명 문단 - 좌측 정렬, 분리 */}
          <div className="mb-10">
            <p className="text-[17px] text-[#4b5563] leading-[1.8] max-w-[480px] mb-5">
              석탄 연소 효율을 높이고 대기오염을 저감하는<br />
              친환경 연소 솔루션을 개발·공급합니다.
            </p>
            <p className="text-[17px] text-[#4b5563] leading-[1.8] max-w-[480px] mb-0">
              기존 설비 변경 없이<br />
              효율과 수익성을 동시에 개선합니다.
            </p>
          </div>

          {/* Stats - 3개, 스타일 개선 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-[140px]">
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <div className="text-xl font-semibold text-[#1f2933]">
                {t('about.stats.experience')}+년 업계 경험
              </div>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <div className="text-xl font-semibold text-[#1f2933]">
                {t('about.stats.sites')}+개 적용 현장
              </div>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <div className="text-xl font-semibold text-[#1f2933]">
                {t('about.stats.patents')}건 특허·인증
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-12"></div>

          {/* 섹션 제목 */}
          <h2 className="text-2xl font-bold text-[#1f2933] mb-8">
            현장에서 검증된 기술
          </h2>

          {/* Office Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200">
              <img 
                src={typeof office1 === 'string' ? office1 : (office1 as any).src || office1} 
                alt="대양환경기술 사무실" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200">
              <img 
                src={typeof office2 === 'string' ? office2 : (office2 as any).src || office2} 
                alt="대양환경기술 사무실" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* 제목 - 좌측 정렬 */}
          <h2 className="text-3xl font-bold text-[#1f2933] mb-5">
            {t('about.overview.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1f2933] rounded-lg flex items-center justify-center">
                  <i className="ri-building-2-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2933]">정식 사업 분야</h3>
              </div>
              <ul className="space-y-4">
                {(t('about.overview.businessFields', { returnObjects: true }) as string[]).map((field: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1f2933] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-[#4b5563] text-lg leading-relaxed">{field}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1f2933] rounded-lg flex items-center justify-center">
                  <i className="ri-group-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1f2933]">주요 고객 유형</h3>
              </div>
              <ul className="space-y-4">
                {(t('about.overview.customerTypes', { returnObjects: true }) as string[]).map((type: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#1f2933] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-[#4b5563] text-lg leading-relaxed">{type}</span>
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


