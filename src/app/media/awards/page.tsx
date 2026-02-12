'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import ImageLightbox from '../../../components/base/ImageLightbox';
import { getAwards, AwardCertification } from '@/lib/supabase-media';

export default function MediaAwardsPage() {
  const { t, i18n } = useTranslation();
  const [awards, setAwards] = useState<AwardCertification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  useEffect(() => {
    async function loadAwards() {
      setIsLoading(true);
      try {
        const awardsData = await getAwards();
        setAwards(awardsData);
      } catch (error) {
        console.error('Error loading awards:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAwards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.media')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.awards.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('media.awards.subtitle')}
          </p>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">{t('media.awards.loading')}</p>
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>{t('media.awards.empty')}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('media.awards.sectionTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
                  >
                    {/* A4 비율 이미지 컨테이너 — 클릭 시 확대 */}
                    <div
                      className="relative w-full cursor-zoom-in"
                      style={{ aspectRatio: '210 / 297' }}
                      role="button"
                      tabIndex={0}
                      onClick={() => award.featured_image && setLightbox({ src: award.featured_image!, alt: i18n.language === 'ko' ? award.title : (award.title_en || award.title), caption: i18n.language === 'ko' ? award.title : (award.title_en || award.title) })}
                      onKeyDown={(e) => e.key === 'Enter' && award.featured_image && setLightbox({ src: award.featured_image!, alt: i18n.language === 'ko' ? award.title : (award.title_en || award.title), caption: i18n.language === 'ko' ? award.title : (award.title_en || award.title) })}
                    >
                      {award.featured_image ? (
                        <Image
                          src={award.featured_image}
                          alt={i18n.language === 'ko' ? award.title : (award.title_en || award.title)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="210" height="297"%3E%3Crect width="210" height="297" fill="%23f3f4f6"/%3E%3Ctext x="105" y="148" text-anchor="middle" dy=".3em" fill="%23999"%3E인증서%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <i className="ri-file-paper-line text-5xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500">{t('media.awards.certificateImage')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* 정보 섹션 */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {i18n.language === 'ko' ? award.title : (award.title_en || award.title)}
                      </h3>
                      {(award.description || award.description_en) && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {i18n.language === 'ko' ? (award.description || award.description_en) : (award.description_en || award.description)}
                        </p>
                      )}
                      {award.award_date && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <i className="ri-calendar-line"></i>
                          <span>
                            {new Date(award.award_date).toLocaleDateString(i18n.language === 'ko' ? 'ko-KR' : 'en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      {award.url && (
                        <a
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                        >
                          {t('media.awards.readMore')}
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

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
        />
      )}

      <Footer />
    </div>
  );
}

