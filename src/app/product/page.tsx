'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function ProductPage() {
  const { t } = useTranslation();

  const productOptions = [
    {
      title: '제품 개요',
      description: 'Coal Green14001의 상세 정보',
      href: '/product/overview',
      icon: 'ri-file-text-line',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      title: '작동 원리',
      description: '제품의 작동 방식과 원리',
      href: '/product/how-it-works',
      icon: 'ri-settings-3-line',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: '적용 방법',
      description: '제품 적용 절차와 방법',
      href: '/product/application',
      icon: 'ri-tools-line',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: '적용 산업',
      description: '적용 가능한 산업 분야',
      href: '/product/industries',
      icon: 'ri-building-line',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: '기술 자료',
      description: '기술 백서, 시험성적, 가이드',
      href: '/product/technical',
      icon: 'ri-book-open-line',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero - 탐색 허브 스타일 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* 페이지 제목 */}
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
            {t('product.hero.title')}
          </h1>
          
          {/* 한 줄 안내 */}
          <p className="text-lg text-gray-600 text-center mb-12">
            대양환경기술의 제품 / 기술 / 적용 분야를 확인하세요
          </p>
          
          {/* 중앙 대형 박스 - 탐색 허브 */}
          <div className="bg-white rounded-[32px] p-16 shadow-[0_10px_30px_rgba(0,0,0,0.05)] max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productOptions.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className="group bg-gray-50 rounded-2xl p-6 hover:bg-teal-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-teal-300 hover:shadow-md"
                >
                  <div className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`${option.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

