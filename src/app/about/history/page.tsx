'use client'

import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

export default function AboutHistoryPage() {
  const { t } = useTranslation();
  
  const milestones = useMemo(() => (t('about.history.milestones', { returnObjects: true }) as Milestone[]), [t]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // 기존 연혁 항목들
    milestones.forEach((_, index) => {
      const element = document.getElementById(`milestone-${index}`);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          },
          {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });
    
    // 현재 항목
    const currentElement = document.getElementById(`milestone-current`);
    if (currentElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, milestones.length]));
          }
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      observer.observe(currentElement);
      observers.push(observer);
    }
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [milestones]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="mt-[80px] sm:mt-[140px] pt-16 sm:pt-20 pb-8 sm:pb-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-left safe-area-padding-x">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              {t('about.history.title')}
            </h1>
            <div className="w-16 h-1 bg-teal-600 rounded-full mb-4" />
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="pb-[48px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 safe-area-padding-x">
          <div className="mb-8">
            <h2 className="text-[30px] font-bold text-[#1f2933] mb-2">
              {t('about.history.milestoneSectionTitle')}
            </h2>
            <div className="w-12 h-0.5 bg-teal-600"></div>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-teal-600"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone: Milestone, index: number) => (
                <div 
                  key={index} 
                  id={`milestone-${index}`}
                  className={`relative pl-24 transition-all duration-700 ${
                    visibleItems.has(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-[-20px]'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 bg-white border-4 border-teal-600 rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                  </div>
                  
                  <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[20px] font-semibold text-[#1f2933]">{milestone.year}</span>
                      <h3 className="text-[20px] font-semibold text-[#1f2933]">{milestone.title}</h3>
                    </div>
                    <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal whitespace-pre-line">{milestone.description}</p>
                  </div>
                </div>
              ))}
              
              {/* 현재 항목 추가 */}
              <div 
                id={`milestone-current`}
                className={`relative pl-24 transition-all duration-700 ${
                  visibleItems.has(milestones.length) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-[-20px]'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 w-16 h-16 bg-white border-4 border-teal-600 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse"></div>
                </div>
                
                <div className="bg-[#f9fafb] rounded-xl p-8 shadow-sm border-2 border-teal-600">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[20px] font-semibold text-[#1f2933]">{t('about.history.currentItem.year')}</span>
                    <h3 className="text-[20px] font-semibold text-[#1f2933]">{t('about.history.currentItem.title')}</h3>
                  </div>
                  <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal whitespace-pre-line">
                    {t('about.history.currentItem.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coal Green Position */}
          <div className="mt-16 bg-[#f9fafb] rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-lightbulb-line text-2xl text-white"></i>
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#1f2933] mb-2">{t('about.history.coreTechTitle')}</h3>
                <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">{t('about.history.coalGreenPosition')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


