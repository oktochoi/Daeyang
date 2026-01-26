'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Solution() {
  const { t } = useTranslation();

  const effects = [
    {
      icon: 'ri-flashlight-line',
      title: t('home.solution.effect1.title'),
      description: t('home.solution.effect1.description')
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: t('home.solution.effect2.title'),
      description: t('home.solution.effect2.description')
    },
    {
      icon: 'ri-leaf-line',
      title: t('home.solution.effect3.title'),
      description: t('home.solution.effect3.description')
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20industrial%20coal%20combustion%20additive%20in%20modern%20laboratory%20setting%2C%20clean%20white%20background%20with%20teal%20accents%2C%20scientific%20equipment%20and%20coal%20samples%20visible%2C%20high-tech%20industrial%20chemical%20product%20presentation%2C%20professional%20lighting%20with%20soft%20shadows%2C%20modern%20industrial%20design%20aesthetic&width=800&height=800&seq=coal-green-product-001&orientation=squarish"
                alt="Coal Green14001"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-teal-600"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">검증된 기술</p>
                  <p className="text-lg font-bold text-gray-900">50+ 현장 적용</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('home.solution.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              {t('home.solution.subtitle')}
            </p>

            <div className="space-y-6 mb-10">
              {effects.map((effect, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className={`${effect.icon} text-xl text-teal-600`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {effect.title}
                    </h3>
                    <p className="text-gray-600">
                      {effect.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/product/overview"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              {t('home.solution.cta')}
              <i className="ri-arrow-right-line text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
