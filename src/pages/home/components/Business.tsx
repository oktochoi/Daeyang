'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Business() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: 'ri-flashlight-line',
      title: t('home.business.power.title'),
      description: t('home.business.power.description'),
      image: 'https://readdy.ai/api/search-image?query=Modern%20coal-fired%20power%20plant%20with%20large%20cooling%20towers%20and%20industrial%20structures%2C%20aerial%20view%20of%20clean%20energy%20facility%20with%20blue%20sky%2C%20professional%20industrial%20photography%20showing%20scale%20and%20technology%2C%20teal%20and%20blue%20color%20tones%2C%20environmental%20technology%20focus&width=600&height=400&seq=power-plant-industry-001&orientation=landscape'
    },
    {
      icon: 'ri-hammer-line',
      title: t('home.business.steel.title'),
      description: t('home.business.steel.description'),
      image: 'https://readdy.ai/api/search-image?query=Steel%20mill%20industrial%20facility%20with%20blast%20furnaces%20and%20manufacturing%20equipment%2C%20modern%20metallurgical%20plant%20interior%20with%20glowing%20furnaces%2C%20professional%20industrial%20photography%20with%20dramatic%20lighting%2C%20heavy%20industry%20setting%20with%20teal%20accents%2C%20advanced%20manufacturing%20technology&width=600&height=400&seq=steel-industry-001&orientation=landscape'
    },
    {
      icon: 'ri-recycle-line',
      title: t('home.business.incineration.title'),
      description: t('home.business.incineration.description'),
      image: 'https://readdy.ai/api/search-image?query=Modern%20industrial%20incinerator%20facility%20with%20waste-to-energy%20technology%2C%20clean%20industrial%20environment%20with%20advanced%20emission%20control%20systems%2C%20professional%20photography%20of%20environmental%20technology%2C%20teal%20and%20white%20color%20scheme%2C%20sustainable%20waste%20management%20facility&width=600&height=400&seq=incineration-industry-001&orientation=landscape'
    },
    {
      icon: 'ri-global-line',
      title: t('home.business.overseas.title'),
      description: t('home.business.overseas.description'),
      image: 'https://readdy.ai/api/search-image?query=International%20industrial%20facility%20in%20Southeast%20Asia%20with%20modern%20coal%20processing%20equipment%2C%20global%20industrial%20partnership%20concept%20with%20world%20map%20overlay%2C%20professional%20business%20photography%20with%20teal%20accents%2C%20international%20cooperation%20in%20energy%20sector&width=600&height=400&seq=overseas-industry-001&orientation=landscape'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('home.business.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            {t('home.business.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <i className={`${industry.icon} text-xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {industry.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/product/industries"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
          >
            {t('home.business.cta')}
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
