'use client'

import { useTranslation } from 'react-i18next';

export default function Trust() {
  const { t } = useTranslation();

  const stats = [
    {
      value: t('home.trust.years'),
      label: t('home.trust.yearsLabel'),
      icon: 'ri-time-line'
    },
    {
      value: t('home.trust.sites'),
      label: t('home.trust.sitesLabel'),
      icon: 'ri-building-line'
    },
    {
      value: t('home.trust.patents'),
      label: t('home.trust.patentsLabel'),
      icon: 'ri-award-line'
    },
    {
      value: t('home.trust.efficiency'),
      label: t('home.trust.efficiencyLabel'),
      icon: 'ri-line-chart-line'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-teal-600 to-cyan-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('home.trust.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${stat.icon} text-3xl text-white`}></i>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
