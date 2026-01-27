'use client'

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import factory1 from '../../../assets/factory_1.png';
import factory5 from '../../../assets/factory_5.jpg';

export default function ProductApplicationPage() {
  const { t } = useTranslation();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isSpecVisible, setIsSpecVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === contentRef.current) {
              setIsContentVisible(true);
            } else if (entry.target === specRef.current) {
              setIsSpecVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    if (specRef.current) observer.observe(specRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (specRef.current) observer.unobserve(specRef.current);
    };
  }, []);

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
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">적용 방법</h2>
          </div>
          
          {/* Left Text, Right Image Layout */}
          <div 
            ref={contentRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 transition-all duration-700 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-teal-600 mb-4">Save Earth, Save Energy</h3>
                <h4 className="text-xl font-bold text-[#1f2933] mb-6">석탄 조연제 COAL GREEN을 소개합니다.</h4>
              </div>
              
              <div className="space-y-4 text-[15px] text-[#4b5563] leading-[1.8] font-normal">
                <p>
                  Coal Green is a trace substance added to liquid and solid fuels to improve quality for complete combustion, maintain a clean fuel chamber, prevent wear, prevent clinker formation, prevent ash adhesion, and prevent corrosion of boiler materials and heating tubes.
                </p>
                <p>
                  By adding the additive to coal fuel, fuel consumption can be reduced, clinker can be prevented, and pollutant gas emissions can be decreased.
                </p>
                <p>
                  The additive's components are 100% water-soluble, harmless to the human body, and pose no risk of damage to power generation equipment or explosion. The product has undergone continuous performance improvement, with the current version being Ver 7.0.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-[#1f2933] mb-2">※클링커(Clinker)란?</p>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  When the temperature of the combustion bed during coal combustion rises above the melting point of ash, causing the coal ash to melt and solidify into lumps.
                </p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-gray-200 relative h-[600px] lg:sticky lg:top-24 hover:shadow-xl transition-all duration-300 group">
              <Image 
                src={factory5} 
                alt="제품 적용 현장" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">
              {t('product.specifications.title')}
            </h2>
          </div>
          <div 
            ref={specRef}
            className={`bg-[#f9fafb] rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
              isSpecVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <ul className="space-y-3">
              {Array.isArray(t('product.specifications.items', { returnObjects: true })) 
                ? (t('product.specifications.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 hover:scale-110 transition-transform duration-300">
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

