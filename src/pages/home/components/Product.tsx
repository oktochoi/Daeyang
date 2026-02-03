'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import factory2 from '../../../assets/factory_2.png';
import factory3 from '../../../assets/factory_3.png';
import factory4 from '../../../assets/factroey_4.png';

export default function Product() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const features = [
    {
      icon: 'ri-flashlight-line',
      title: t('product.effects.effect1.title'),
      description: t('product.effects.effect1.description'),
      image: factory2
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: t('product.effects.effect2.title'),
      description: t('product.effects.effect2.description'),
      image: factory3
    },
    {
      icon: 'ri-leaf-line',
      title: t('product.effects.effect3.title'),
      description: t('product.effects.effect3.description'),
      image: factory4
    }
  ];

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-gray-50/80 border-t-2 border-gray-200 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-500 delay-50 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.product')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('product.hero.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('product.hero.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
            >
              <div className="h-48 overflow-hidden relative">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${feature.icon} text-3xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-500 delay-200 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/product/overview"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {t('home.product.cta')}
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

