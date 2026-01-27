'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import ceo1 from '../../../assets/ceo1.png';
import ceo2 from '../../../assets/ceo2.png';

export default function AboutCeoPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          {/* Save Earth, Save Energy */}
          <p className="text-teal-600 text-[18px] font-semibold mb-2">
            Save Earth, Save Energy
          </p>
          
          {/* Main Title */}
          <h1 className="text-[36px] font-bold text-teal-600 mb-12 leading-[1.3]">
            주식회사 대양환경기술의 지속가능한 미래를 위한 기술의 약속
          </h1>

          {/* Content Layout: Left Text, Right Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Text Content */}
            <div className="lg:col-span-2 space-y-6 text-[15px] text-[#1f2933] leading-[1.8] font-normal">
              <p>
                주식회사 대양환경기술은 환경개선과 에너지 효율 혁신을 선도하는 기술 기업으로, 지속가능한 미래 가치를 창출하고 있습니다.
              </p>
              
              <p>
                저희는 전 세계적인 에너지 환경 변화와 기후변화를 기회로 삼아, 환경보호와 에너지 절약을 동시에 달성하는 통합 솔루션 제공자로 성장해왔습니다.
              </p>
              
              <p>
                특히 화석연료 사용이 불가피한 산업 현장에서 연소 효율 개선과 오염물질 감소 기술을 통해 상당한 탄소 감축 성과를 달성하며, 환경과 경제성을 동시에 개선하는 혁신적인 솔루션을 제공하고 있습니다.
              </p>
              
              <p>
                수년간 축적된 기술력과 현장 경험을 바탕으로, 석탄 및 중유 등 화석연료의 효율을 극대화하기 위한 조연제(COAL GREEN14001)를 활용한 환경 기술을 개발·상용화하여 산업 현장의 지속가능성을 높이고 있습니다.
              </p>
              
              <p>
                저희의 핵심 경쟁력은 &apos;현장 검증 기술&apos;입니다. 몽골, 베트남, 중국 등 아시아 주요 국가에서 진행 중인 실증 프로젝트와 현지 협력을 통해 기술의 신뢰성을 입증하고 있으며, 연소 효율 개선, 배출물 감소, 에너지 비용 절감 등 실질적인 성과를 지속적으로 확대해 나가고 있습니다.
              </p>
              
              <p>
                앞으로도 지속적인 R&D와 글로벌 협력을 통해 환경보호(Save the Earth)와 에너지 절약(Save Energy)을 동시에 실현하는 차세대 환경 기술의 표준이 되도록 최선을 다하겠습니다.
              </p>
              
              <p className="pt-4">
                도전과 성장의 여정에 여러분의 지속적인 관심과 협력을 부탁드리며, 감사합니다.
              </p>
            </div>

            {/* Right: CEO and CTO Images */}
            <div className="space-y-6">
              {/* CEO */}
              <div className="text-center">
                <div className="relative w-full max-w-[200px] mx-auto aspect-[3/4] rounded-xl overflow-hidden mb-4 border border-gray-200">
                  <Image
                    src={ceo1}
                    alt="CEO 김정환"
                    fill
                    className="object-cover object-center"
                    sizes="200px"
                  />
                </div>
                <div className="text-[14px] text-[#4b5563] font-normal mb-1">
                  주식회사 대양환경기술 CEO
                </div>
                <div className="text-[18px] font-bold text-[#1f2933]">
                  김정환
                </div>
              </div>

              {/* CTO */}
              <div className="text-center">
                <div className="relative w-full max-w-[200px] mx-auto aspect-[3/4] rounded-xl overflow-hidden mb-4 border border-gray-200">
                  <Image
                    src={ceo2}
                    alt="CTO 서하경"
                    fill
                    className="object-cover object-center"
                    sizes="200px"
                  />
                </div>
                <div className="text-[14px] text-[#4b5563] font-normal mb-1">
                  주식회사 대양환경기술 CTO
                </div>
                <div className="text-[18px] font-bold text-[#1f2933]">
                  서하경
                </div>
              </div>
            </div>
          </div>

          {/* Footer Company Name */}
          <div className="mt-16 text-center">
            <p className="text-teal-600 text-[20px] font-semibold">
              주식회사 대양환경기술
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


