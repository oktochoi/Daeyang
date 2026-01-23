'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { mediaItems } from '../../../mocks/media';

export default function MediaAwardsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            기사 아카이빙
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            기사 아카이빙
          </h1>
          <p className="text-lg text-gray-600">
            {i18n.language === 'ko' 
              ? '회사 관련 기사와 보도자료를 모아보세요' 
              : 'Browse company-related articles and press releases'}
          </p>
        </div>
      </section>

      {/* Awards & Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Articles List */}
          <div className="space-y-6 mb-12">
            {mediaItems.awards.map((item) => (
              <Link
                key={item.id}
                href={`/media/awards/${item.id}`}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-teal-400 transition-all duration-300 block cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-full sm:w-40 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                    <i className="ri-newspaper-line text-3xl text-gray-400"></i>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                        {i18n.language === 'ko' ? '기사' : 'Article'}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {i18n.language === 'ko' ? item.title : item.titleEn}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {i18n.language === 'ko' ? item.summary : item.summaryEn}
                    </p>
                    <div className="flex items-center gap-1 text-teal-600 text-sm font-medium">
                      {i18n.language === 'ko' ? '자세히 보기' : 'Read more'}
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Awards Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {i18n.language === 'ko' ? '인증서 및 수상 내역' : 'Certificates & Awards'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-teal-400 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-teal-50 group-hover:to-teal-100 transition-colors">
                    <i className="ri-award-line text-4xl text-gray-400 group-hover:text-teal-600 transition-colors"></i>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <i className="ri-calendar-line mr-2"></i>
                    {i18n.language === 'ko' ? '날짜 영역' : 'Date'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Article Placeholder */}
          <div className="p-8 bg-teal-50 rounded-xl border-2 border-dashed border-teal-300">
            <div className="text-center mb-6">
              <i className="ri-add-circle-line text-4xl text-teal-600 mb-3"></i>
              <p className="text-lg text-teal-700 font-medium mb-2">
                {i18n.language === 'ko' 
                  ? '관리자가 기사를 추가할 수 있습니다' 
                  : 'Administrators can add articles'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-teal-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {i18n.language === 'ko' ? '기사 URL 입력' : 'Enter Article URL'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {i18n.language === 'ko' ? '기사 URL' : 'Article URL'}
                  </label>
                  <input
                    type="url"
                    placeholder={i18n.language === 'ko' ? 'https://example.com/news/article' : 'https://example.com/news/article'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  {i18n.language === 'ko' ? '기사 추가' : 'Add Article'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

