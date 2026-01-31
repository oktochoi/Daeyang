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
      <section className="mt-[80px] sm:mt-[140px] pt-8 sm:pt-12 pb-[100px] sm:pb-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 text-left">
          {/* Save Earth, Save Energy - 라벨 */}
          <p 
            className="text-teal-600 text-[13px] font-medium mb-3"
            style={{ letterSpacing: '0.08em' }}
          >
            {t('about.ceo.heroLabel')}
          </p>
          
          {/* Main Title */}
          <h1 
            className="text-[34px] sm:text-[36px] font-bold text-[#111827] mb-8 leading-[1.25] max-w-[680px]"
            style={{ letterSpacing: '-0.01em' }}
          >
            {t('about.ceo.mainTitle')}
          </h1>

          {/* Content Layout: Left Text, Right Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Text Content */}
            <div 
              className="lg:col-span-2 max-w-[720px] [&>p+p]:mt-[22px] text-[15.5px] sm:text-[16px] text-[#374151] leading-[1.8] font-normal"
              style={{ letterSpacing: '-0.005em' }}
            >
              {(t('about.ceo.paragraphs', { returnObjects: true }) as string[]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Right: CEO and CTO Images */}
            <div className="space-y-8">
              {/* CEO */}
              <div className="text-center">
                <div className="relative w-full max-w-[260px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-gray-200 shadow-sm">
                  <Image
                    src={ceo1}
                    alt={t('about.ceo.ceoAlt')}
                    fill
                    className="object-cover object-center"
                    sizes="260px"
                  />
                </div>
                <div className="text-[13px] text-[#6B7280] font-normal leading-[1.4] mt-3">
                  {t('about.ceo.ceoTitle')}
                </div>
                <div className="text-[15px] font-semibold text-[#111827] leading-[1.4]">
                  {t('about.ceo.ceoName')}
                </div>
              </div>

              {/* CTO */}
              <div className="text-center">
                <div className="relative w-full max-w-[260px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-gray-200 shadow-sm">
                  <Image
                    src={ceo2}
                    alt={t('about.ceo.ctoAlt')}
                    fill
                    className="object-cover object-center"
                    sizes="260px"
                  />
                </div>
                <div className="text-[13px] text-[#6B7280] font-normal leading-[1.4] mt-3">
                  {t('about.ceo.ctoTitle')}
                </div>
                <div className="text-[15px] font-semibold text-[#111827] leading-[1.4]">
                  {t('about.ceo.ctoName')}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Company Name - 서명 */}
          <div className="mt-12 sm:mt-14 text-center">
            <p 
              className="text-teal-600 text-[14px] font-medium"
              style={{ letterSpacing: '0.04em' }}
            >
              {t('about.ceo.footerCompany')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


