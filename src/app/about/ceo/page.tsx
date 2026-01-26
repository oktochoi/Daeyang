'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function AboutCeoPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[48px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('about.ceo.title')}
          </h1>
        </div>
      </section>

      {/* CEO Message */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-[#f9fafb] rounded-xl p-8 sm:p-10 shadow-sm">
            {/* CEO Info */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-24 h-24 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-user-3-line text-4xl text-white"></i>
              </div>
              <div>
                <div className="text-[28px] font-bold text-[#1f2933] mb-1">{t('about.ceo.name')}</div>
                <div className="text-[15px] text-[#4b5563] font-normal">{t('about.ceo.position')}</div>
              </div>
            </div>
            
            {/* Message */}
            <div className="mb-8">
              <div className="text-[15px] text-[#4b5563] leading-[1.6] font-normal whitespace-pre-line">
                {t('about.ceo.message')}
              </div>
            </div>
            
            {/* Key Message */}
            <div className="bg-white rounded-xl p-8 border-l-4 border-teal-600">
              <div className="flex items-start gap-3">
                <i className="ri-double-quotes-l text-3xl text-teal-600 mt-1"></i>
                <p className="text-[18px] font-semibold text-[#1f2933] leading-[1.6]">
                  {t('about.ceo.keyMessage')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


