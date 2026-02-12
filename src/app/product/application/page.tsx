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

    const contentCurrent = contentRef.current;
    const specCurrent = specRef.current;

    if (contentCurrent) observer.observe(contentCurrent);
    if (specCurrent) observer.observe(specCurrent);

    return () => {
      if (contentCurrent) observer.unobserve(contentCurrent);
      if (specCurrent) observer.unobserve(specCurrent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-[100px] sm:pt-[160px] pb-20 sm:pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25] break-words">
            {t('product.application.title')}
          </h1>
          <p className="text-sm sm:text-[5px] text-[#4b5563] leading-[1.6] max-w-[480px] font-normal">
            {t('product.application.heroSubtitle')}
          </p>
        </div>
      </section>


      {/* Application Method */}
      <section className="pb-[96px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-left">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2 underline decoration-teal-600 decoration-2">{t('product.application.title')}</h2>
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
                <h4 className="text-xl font-bold text-[#1f2933] mb-6">{t('product.application.introTitle')}</h4>
              </div>
              
              <div className="space-y-4 text-[15px] text-[#4b5563] leading-[1.8] font-normal">
                <p>{t('product.application.intro1')}</p>
                <p>{t('product.application.intro2')}</p>
                <p>{t('product.application.intro3')}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-[#1f2933] mb-2">{t('product.application.clinkerTitle')}</p>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                  {t('product.application.clinkerDesc')}
                </p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-gray-200 relative h-[600px] lg:sticky lg:top-24 hover:shadow-xl transition-all duration-300 group">
              <Image 
                src={factory5} 
                alt={t('product.application.imageAlt')} 
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

