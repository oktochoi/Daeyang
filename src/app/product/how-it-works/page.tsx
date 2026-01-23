'use client'

import { useTranslation } from 'react-i18next';
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
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('product.howItWorks.title')}
          </h1>
          <p className="text-lg text-gray-600">
            Coal Green은 어떤 원리로 작동하나요?
          </p>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">작동 원리 상세</h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border border-teal-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('product.howItWorks.description')}
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl overflow-hidden border-2 border-teal-100 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img 
                  src={typeof factory3 === 'string' ? factory3 : factory3.src || factory3} 
                  alt="희석 및 분사" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">희석 및 분사</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  조연제를 물과 1:4000 비율로 희석하여 석탄 표면에 균일하게 분사합니다.
                </p>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-teal-700 font-medium">
                    <i className="ri-information-line mr-2"></i>
                    희석 비율: 물 4000 : 조연제 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border-2 border-teal-100 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img 
                  src={typeof factory4 === 'string' ? factory4 : factory4.src || factory4} 
                  alt="건조 처리" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">건조 처리</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  조연제가 석탄 표면에 흡착된 후 적절히 건조시켜 연소 준비를 완료합니다.
                </p>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-teal-700 font-medium">
                    <i className="ri-information-line mr-2"></i>
                    건조 상태 확인 필수
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Changes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('product.howItWorks.changes.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 shadow-sm">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-fire-line text-4xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {t('product.howItWorks.changes.change1')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  조연제가 연소 반응을 촉진하여 화염 온도가 상승하고, 더 완전한 연소가 이루어집니다.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-8 border border-red-100 shadow-sm">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-decrease-line text-4xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {t('product.howItWorks.changes.change2')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  불완전 연소가 감소하여 미연소 물질이 현저히 줄어듭니다.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-delete-bin-line text-4xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {t('product.howItWorks.changes.change3')}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  크링커와 바텀애시 같은 연소 잔재물이 감소하여 설비 보호 효과가 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Diagram */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">작동 과정 시각화</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200">
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

