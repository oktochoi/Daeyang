import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Contact() {
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
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden border-t border-gray-700 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-500 delay-50 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium mb-6">
            {t('common.nav.contact')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            문의하기
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {t('home.finalCta.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-500 delay-100 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-phone-line text-2xl text-teal-300"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">전화</div>
            <div className="text-gray-300">{t('contact.info.phone.value')}</div>
          </div>
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-500 delay-150 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-mail-line text-2xl text-teal-300"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">이메일</div>
            <div className="text-gray-300">info@daeyangenv.com</div>
          </div>
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-500 delay-200 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-map-pin-line text-2xl text-teal-300"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">주소</div>
            <div className="text-gray-300">{t('common.footer.address')}</div>
          </div>
        </div>

        <div className={`transition-all duration-500 delay-250 will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
          >
            {t('home.finalCta.button')}
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

