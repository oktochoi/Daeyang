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
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('business.industries.title')}
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mb-0 font-normal">
            {t('business.industries.subtitle')}
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">적용 산업</h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-[#f9fafb] rounded-xl p-8 shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-teal-600 rounded-lg mb-6">
                  <i className={`${industry.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {industry.title}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('business.approach.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
            <p className="text-[13px] text-[#4b5563] opacity-70 leading-[1.6] mt-2 font-normal">
              {t('business.approach.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-left">
                <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-full text-[24px] font-bold text-white mb-6">
                  {item.step}
                </div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
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

