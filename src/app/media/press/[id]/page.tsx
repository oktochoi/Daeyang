'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../../components/feature/Navbar';
import Breadcrumb from '../../../../components/base/Breadcrumb';
import Footer from '../../../../components/feature/Footer';
import { mediaItems } from '../../../../mocks/media';

export default function MediaPressDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { t, i18n } = useTranslation();
  
  const article = mediaItems.press.find(item => item.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('media.pressDetail.notFound')}</h1>
          <Link href="/media/press" className="text-teal-600 hover:text-teal-700">
            {t('media.pressDetail.backToList')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/media/press"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <i className="ri-arrow-left-line"></i>
            {t('media.pressDetail.backLink')}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-500">{article.date}</span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
              보도자료
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'ko' ? article.title : article.titleEn}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white rounded-xl p-8 sm:p-12 shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-8">
                  <i className="ri-image-line text-5xl text-gray-400"></i>
                </div>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {i18n.language === 'ko' ? article.summary : article.summaryEn}
              </p>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {t('media.pressDetail.placeholderContent')}
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}


