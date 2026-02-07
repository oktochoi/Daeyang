'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getPressReleases, PressRelease } from '@/lib/supabase-media';

export default function MediaPressPage() {
  const { t, i18n } = useTranslation();
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPressReleases() {
      setIsLoading(true);
      try {
        const releases = await getPressReleases();
        setPressReleases(releases);
      } catch (error) {
        console.error('Error loading press releases:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPressReleases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.press')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.tabs.press')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('media.press.subtitle')}
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">{t('media.press.loading')}</p>
            </div>
          ) : pressReleases.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{t('media.press.empty')}</p>
            </div>
          ) : (
            <div className="space-y-6 mb-12">
              {pressReleases.map((item) => {
                const isValidUrl = item.url && (item.url.startsWith('http://') || item.url.startsWith('https://'));
                return (
                <article
                  key={item.id}
                  className={`bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ${isValidUrl ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (isValidUrl) {
                      window.open(item.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {item.featured_image ? (
                      <div className="w-full sm:w-40 sm:h-24 rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={item.featured_image}
                          alt={i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-full sm:w-40 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                        <i className="ri-image-line text-3xl text-gray-400"></i>
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        {item.published_date && (
                          <span className="text-sm text-gray-500">
                            {new Date(item.published_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                          </span>
                        )}
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                          {t('media.press.badge')}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors">
                        {i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                      </h2>
                      {(item.description || item.description_en) && (
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {i18n.language === 'ko' ? (item.description || item.description_en) : (item.description_en || item.description)}
                        </p>
                      )}
                      {isValidUrl && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation(); // article 클릭 이벤트와 충돌 방지
                          }}
                        >
                          {t('media.press.readMore')}
                          <i className="ri-arrow-right-line"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}


