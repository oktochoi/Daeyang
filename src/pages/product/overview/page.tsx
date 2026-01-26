import { useTranslation } from 'react-i18next';
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
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            {t('product.hero.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('product.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Technical Resources */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              기술 자료
            </h2>
            <p className="text-lg text-gray-600">
              제품 기술 백서, 적용 가이드, 시험성적 및 환경 영향 평가 자료
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200 max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-text-line text-2xl text-teal-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              기술 자료 모아보기
            </h3>
            <p className="text-gray-600 mb-8">
              기술 백서, 적용 가이드라인, 시험성적, 환경 영향 평가 자료를 확인하세요.
            </p>
            <a
              href="/product/tech"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              기술 자료 바로가기
              <i className="ri-arrow-right-line text-xl"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Problems Section - Moved from problems page */}
      <section className="py-24 bg-red-50 border-t border-red-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('product.problems.title')}
            </h2>
            <p className="text-lg text-gray-600">기존 석탄 연소 방식의 핵심 문제점</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-fire-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem1.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-cloud-line text-3xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem2.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-tools-line text-3xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div 
          ref={definitionRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
            definitionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8">
            <div className="max-w-md mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg relative h-64">
              <Image 
                src={factory1} 
                alt="Coal Green 제품" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('product.definition.title')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('product.definition.description')}
          </p>
        </div>
      </section>

      {/* Effects */}
      <section className="py-24 bg-teal-50 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('product.effects.title')}
          </h2>
          <div 
            ref={effectsRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              effectsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory2} 
                  alt="연소 효율 향상" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('product.effects.effect1.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('product.effects.effect1.description')}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory3} 
                  alt="비용 절감" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('product.effects.effect2.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('product.effects.effect2.description')}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden text-center shadow-sm">
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={factory4} 
                  alt="환경 개선" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('product.effects.effect3.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('product.effects.effect3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            {t('product.benefits.title')}
          </h2>
          <div 
            ref={benefitsRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${
              benefitsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.cost.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.cost.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.cost.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.emission.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.emission.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.emission.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.maintenance.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.maintenance.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.maintenance.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Background */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('business.background.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('business.background.subtitle')}
            </p>
          </div>
          
          <div 
            ref={backgroundRef.ref as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-700 ${
              backgroundRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory5} 
                  alt={t('business.background.reason1.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('business.background.reason1.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('business.background.reason1.description')}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory1} 
                  alt={t('business.background.reason2.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('business.background.reason2.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('business.background.reason2.description')}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200">
              <div className="h-40 overflow-hidden relative">
                <Image 
                  src={factory2} 
                  alt={t('business.background.reason3.title')} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('business.background.reason3.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('business.background.reason3.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-8 border border-teal-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('business.background.whyNotEnough.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              인증 및 수상
            </h2>
            <p className="text-lg text-gray-600">
              특허, 인증, 시험성적
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-award-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t('media.tabs.awards')}
                </h3>
              </div>
              <div className="space-y-4">
                {mediaItems.awards.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.summary}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

