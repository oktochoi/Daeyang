'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import factory3 from '../../../assets/factory_3.png';
import factory4 from '../../../assets/factroey_4.png';

export default function ProductHowItWorksPage() {
  const { t } = useTranslation();

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

      {/* How It Works - Detailed */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">작동 원리 상세</h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
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
          <div className="mb-0">
            <div className="mb-8">
              <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
                {t('product.howItWorks.changes.title')}
              </h2>
              <div className="w-12 h-0.5 bg-teal-600"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                  <i className="ri-fire-line text-3xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.howItWorks.changes.change1')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  조연제가 연소 반응을 촉진하여 화염 온도가 상승하고, 더 완전한 연소가 이루어집니다.
                </p>
              </div>
              <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                  <i className="ri-decrease-line text-3xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.howItWorks.changes.change2')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  불완전 연소가 감소하여 미연소 물질이 현저히 줄어듭니다.
                </p>
              </div>
              <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                  <i className="ri-delete-bin-line text-3xl text-white"></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {t('product.howItWorks.changes.change3')}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  크링커와 바텀애시 같은 연소 잔재물이 감소하여 설비 보호 효과가 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Diagram */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">작동 과정 시각화</h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
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

