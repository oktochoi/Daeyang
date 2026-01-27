'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { getPressReleases, PressRelease } from '@/lib/supabase-media';

export default function Media() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [latestItems, setLatestItems] = useState<PressRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Get latest press releases from Supabase
  useEffect(() => {
    async function loadPressReleases() {
      setIsLoading(true);
      try {
        const releases = await getPressReleases();
        // 최신 3개만 가져오기
        setLatestItems(releases.slice(0, 3));
      } catch (error) {
        console.error('Error loading press releases:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPressReleases();
  }, []);

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-white border-t border-gray-100 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-500 delay-50 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.media')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('media.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {i18n.language === 'ko' 
              ? '최신 소식과 자료를 확인하세요' 
              : 'Check out our latest news and resources'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12 mb-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="ml-4 text-gray-600">로딩 중...</p>
          </div>
        ) : latestItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.url || `/media/press`}
                target={item.url?.startsWith('http') ? '_blank' : '_self'}
                rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 will-change-transform cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden border-b border-gray-200">
                  {item.featured_image ? (
                    <Image
                      src={item.featured_image}
                      alt={i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <i className="ri-newspaper-line text-5xl text-gray-400 mb-2"></i>
                        <p className="text-sm text-gray-500">보도자료 이미지</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {item.published_date && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-500">
                        {new Date(item.published_date).toLocaleDateString(i18n.language === 'ko' ? 'ko-KR' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {i18n.language === 'ko' ? item.title : (item.title_en || item.title)}
                  </h3>
                  {(item.description || item.description_en) && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {i18n.language === 'ko' ? item.description : (item.description_en || item.description)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-12">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">등록된 보도자료가 없습니다.</p>
          </div>
        )}

        <div className={`text-center transition-all duration-500 delay-200 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {i18n.language === 'ko' ? '더 많은 소식 보기' : 'View More News'}
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
