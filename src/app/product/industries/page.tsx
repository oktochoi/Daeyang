'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductIndustriesPage() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: 'ri-flashlight-line',
      title: t('business.industries.power.title'),
      description: t('business.industries.power.description')
    },
    {
      icon: 'ri-hammer-line',
      title: t('business.industries.steel.title'),
      description: t('business.industries.steel.description')
    },
    {
      icon: 'ri-building-line',
      title: t('business.industries.incineration.title'),
      description: t('business.industries.incineration.description')
    },
    {
      icon: 'ri-global-line',
      title: t('business.industries.overseas.title'),
      description: t('business.industries.overseas.description')
    }
  ];

  const process = [
    {
      step: '01',
      title: t('business.approach.step1.title'),
      description: t('business.approach.step1.description')
    },
    {
      step: '02',
      title: t('business.approach.step2.title'),
      description: t('business.approach.step2.description')
    },
    {
      step: '03',
      title: t('business.approach.step3.title'),
      description: t('business.approach.step3.description')
    },
    {
      step: '04',
      title: t('business.approach.step4.title'),
      description: t('business.approach.step4.description')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t('business.industries.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('business.industries.subtitle')}
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-full mb-6">
                  <i className={`${industry.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {industry.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
                <a href="#" className="inline-block mt-6 text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
                  {t('common.cta.viewDetails')} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t('business.approach.title')}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16">
            {t('business.approach.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-teal-600 rounded-full text-3xl font-bold text-white mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

