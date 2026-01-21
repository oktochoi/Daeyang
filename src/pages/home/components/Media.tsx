import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mediaItems } from '../../../mocks/media';

export default function Media() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Get latest press releases
  const latestItems = mediaItems.press.slice(0, 3);

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {latestItems.map((item, index) => (
            <article
              key={item.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-b border-gray-200">
                <div className="text-center">
                  <i className="ri-newspaper-line text-5xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">보도자료 이미지</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {i18n.language === 'ko' ? item.title : item.titleEn}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {i18n.language === 'ko' ? item.summary : item.summaryEn}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/media"
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
