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

          {/* Add New Article Placeholder */}
          <div className="mb-12 p-8 bg-teal-50 rounded-xl border-2 border-dashed border-teal-300">
            <div className="text-center mb-6">
              <i className="ri-add-circle-line text-4xl text-teal-600 mb-3"></i>
              <p className="text-lg text-teal-700 font-medium mb-2">
                {i18n.language === 'ko' 
                  ? '관리자가 보도자료를 추가할 수 있습니다' 
                  : 'Administrators can add press releases'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {i18n.language === 'ko' ? '뉴스 URL 입력' : 'Enter News URL'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'ko' ? '뉴스 URL' : 'News URL'}
                  </label>
                  <input
                    type="url"
                    placeholder={i18n.language === 'ko' ? 'https://example.com/news/article' : 'https://example.com/news/article'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'ko' ? '제목 (선택사항)' : 'Title (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={i18n.language === 'ko' ? '기사 제목을 입력하세요' : 'Enter article title'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  {i18n.language === 'ko' ? '기사 추가' : 'Add Article'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {i18n.language === 'ko' 
                  ? '* URL을 입력하면 자동으로 기사 내용을 가져올 수 있습니다' 
                  : '* Enter URL to automatically fetch article content'}
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-teal-50 rounded-lg">
                <i className="ri-video-line text-2xl text-teal-600"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {i18n.language === 'ko' ? '동영상' : 'Videos'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-teal-400 transition-colors cursor-pointer"
                >
                  <div className="text-center">
                    <i className="ri-video-add-line text-4xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-500">동영상 영역</p>
                    <p className="text-xs text-gray-400 mt-1">관리자가 동영상을 추가할 수 있습니다</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 bg-teal-50 rounded-xl border-2 border-dashed border-teal-300 text-center">
              <i className="ri-add-circle-line text-3xl text-teal-600 mb-2"></i>
              <p className="text-sm text-teal-700 font-medium">
                {i18n.language === 'ko' 
                  ? '관리자가 동영상을 추가할 수 있습니다' 
                  : 'Administrators can add videos'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


