'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, white 48%, white 52%, transparent 52%)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t('home.finalCta.title')}
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          {t('home.finalCta.subtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white text-lg font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl whitespace-nowrap cursor-pointer"
        >
          {t('home.finalCta.button')}
          <i className="ri-arrow-right-line text-xl"></i>
        </Link>
      </div>
    </section>
  );
}
