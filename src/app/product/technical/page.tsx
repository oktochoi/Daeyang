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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header - 수상 페이지와 동일한 왼쪽 정렬 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.technical')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('product.technical.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('product.technical.subtitle')}
          </p>
        </div>
      </section>

      {/* Patents */}
      <section className="py-16 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">{t('product.technical.loading')}</p>
            </div>
          ) : techDocs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{t('product.technical.empty')}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('product.technical.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group"
                >
                  {doc.featured_image ? (
                    <div className="bg-gray-100 overflow-hidden relative w-full">
                      <div className="relative w-full" style={{ minHeight: '200px' }}>
                        <Image
                          src={doc.featured_image}
                          alt={i18n.language === 'ko' ? doc.title : (doc.title_en || doc.title)}
                          width={400}
                          height={600}
                          className="w-full h-auto object-contain"
                          unoptimized
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                      <i className="ri-file-paper-line text-5xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {i18n.language === 'ko' ? doc.title : (doc.title_en || doc.title)}
                    </h3>
                    {doc.description && (
                      <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal line-clamp-3">
                        {i18n.language === 'ko' ? doc.description : (doc.description_en || doc.description)}
                      </p>
                    )}
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        {t('product.technical.readMore')}
                        <i className="ri-external-link-line"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

