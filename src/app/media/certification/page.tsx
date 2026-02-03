'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getCertifications, AwardCertification } from '@/lib/supabase-media';

export default function MediaCertificationPage() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState<AwardCertification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await getCertifications();
        setItems(data);
      } catch (error) {
        console.error('Error loading certifications:', error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.media')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.certification.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('media.certification.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">{t('media.certification.loading')}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{t('media.certification.empty')}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('media.certification.sectionTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                  >
                    <div className="relative w-full" style={{ aspectRatio: '210 / 297' }}>
                      {item.featured_image ? (
                        <Image
                          src={item.featured_image}
                          alt={i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="210" height="297"%3E%3Crect width="210" height="297" fill="%23f3f4f6"/%3E%3Ctext x="105" y="148" text-anchor="middle" dy=".3em" fill="%23999"%3E인증%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <i className="ri-file-paper-line text-5xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">{t('media.certification.certificateImage')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {i18n.language === 'ko' ? item.description : (item.description_en || item.description)}
                        </p>
                      )}
                      {item.award_date && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <i className="ri-calendar-line"></i>
                          <span>
                            {new Date(item.award_date).toLocaleDateString(i18n.language === 'ko' ? 'ko-KR' : 'en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                        >
                          {t('media.certification.readMore')}
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
