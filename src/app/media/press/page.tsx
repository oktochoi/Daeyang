'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { mediaItems } from '../../../mocks/media';

export default function MediaPressPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.press')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.tabs.press')}
          </h1>
          <p className="text-lg text-gray-600">
            {i18n.language === 'ko' 
              ? '최신 보도자료와 뉴스를 확인하세요' 
              : 'Check out our latest press releases and news'}
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Articles */}
          <div className="space-y-6 mb-12">
            {mediaItems.press.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-full sm:w-40 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                    <i className="ri-image-line text-3xl text-gray-400"></i>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                        보도자료
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors">
                      {i18n.language === 'ko' ? item.title : item.titleEn}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {i18n.language === 'ko' ? item.summary : item.summaryEn}
                    </p>
                    <Link
                      href={`/media/press/${item.id}`}
                      className="flex items-center gap-1 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
                    >
                      {i18n.language === 'ko' ? '자세히 보기' : 'Read more'}
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}


