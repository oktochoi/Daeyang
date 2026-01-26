'use client'

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import factory1 from '../../../assets/factory_1.png';
import factory5 from '../../../assets/factory_5.jpg';

export default function ProductApplicationPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            {t('product.application.title')}
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mb-0 font-normal">
            제품 투입 방식은 어떻게 되나요?
          </p>
        </div>
      </section>

      {/* Application Method */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">적용 방법</h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          
          <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 relative h-[400px]">
            <Image 
              src={factory1} 
              alt="제품 적용 방법" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm mb-12">
            <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
              {t('product.application.description')}
            </p>
          </div>
          
          <div className="mb-12 rounded-xl overflow-hidden border border-gray-200 relative h-[400px]">
            <Image 
              src={factory5} 
              alt="제품 적용 현장" 
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('product.specifications.title')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              {Array.isArray(t('product.specifications.items', { returnObjects: true })) 
                ? (t('product.specifications.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{item}</span>
                  </li>
                ))
                : null}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

