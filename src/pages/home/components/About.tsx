import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function About() {
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

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              {t('common.nav.about')}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              환경기술 기반의<br />
              <span className="text-teal-600">솔루션 기업</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('about.hero.description')}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-teal-600 mb-2">{t('about.stats.founded')}</div>
                <div className="text-sm text-gray-600">{t('about.stats.foundedLabel')}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-teal-600 mb-2">{t('about.stats.patents')}</div>
                <div className="text-sm text-gray-600">{t('about.stats.patentsLabel')}</div>
              </div>
            </div>
            <Link
              to="/about/overview"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              회사소개 자세히 보기
              <i className="ri-arrow-right-line text-xl"></i>
            </Link>
          </div>

          {/* Right: Image Placeholder */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="aspect-[4/3] bg-gradient-to-br from-teal-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-building-2-line text-6xl text-gray-400 mb-4"></i>
                <p className="text-lg text-gray-500 font-medium">회사 이미지</p>
                <p className="text-sm text-gray-400 mt-2">관리자가 이미지를 추가할 수 있습니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

