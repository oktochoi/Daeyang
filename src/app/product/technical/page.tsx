'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getTechnicalResources, TechnicalResource } from '@/lib/supabase-media';

export default function ProductTechnicalPage() {
  const { t, i18n } = useTranslation();
  const [techDocs, setTechDocs] = useState<TechnicalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTechnicalResources() {
      setIsLoading(true);
      try {
        const resources = await getTechnicalResources();
        setTechDocs(resources);
      } catch (error) {
        console.error('Error loading technical resources:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTechnicalResources();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.technical')}
          </div>
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            기술 자료
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mx-auto font-normal">
            특허, 인증서, 수상 내역 등 기술 자료를 확인하세요
          </p>
        </div>
      </section>

      {/* Technical Documents */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">로딩 중...</p>
            </div>
          ) : techDocs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>등록된 기술 자료가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {doc.featured_image && (
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                      <Image
                        src={doc.featured_image}
                        alt={i18n.language === 'ko' ? doc.title : (doc.title_en || doc.title)}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-[18px] font-semibold text-[#1f2933] mb-2">
                      {i18n.language === 'ko' ? doc.title : (doc.title_en || doc.title)}
                    </h3>
                    {doc.description && (
                      <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                        {i18n.language === 'ko' ? doc.description : (doc.description_en || doc.description)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

