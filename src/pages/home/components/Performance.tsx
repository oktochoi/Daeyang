import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Performance() {
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

  const stats = [
    {
      value: t('home.trust.years'),
      label: t('home.trust.yearsLabel'),
      icon: 'ri-time-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      value: t('home.trust.sites'),
      label: t('home.trust.sitesLabel'),
      icon: 'ri-building-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      value: t('home.trust.patents'),
      label: t('home.trust.patentsLabel'),
      icon: 'ri-award-line',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      value: t('home.trust.efficiency'),
      label: t('home.trust.efficiencyLabel'),
      icon: 'ri-line-chart-line',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const projects = [
    {
      title: '국내 시험로',
      description: '국내 주요 발전소 시험 적용 완료',
      image: ''
    },
    {
      title: '몽골 석탄공장',
      description: '해외 현장 검증 성공',
      image: ''
    },
    {
      title: '태국·라오스 산업 현장',
      description: '동남아시아 시장 진출',
      image: ''
    }
  ];

  return (
    <section ref={sectionRef} className={`py-24 lg:py-32 bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.performance')}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            적용 실적
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            검증된 기술력과 다양한 적용 사례
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 5) * 0.1}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-b border-gray-200">
                <div className="text-center">
                  <i className="ri-image-line text-5xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">프로젝트 이미지</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/performance"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            적용 실적 자세히 보기
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

