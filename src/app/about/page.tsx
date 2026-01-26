'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function AboutPage() {
  const { t } = useTranslation();

  const aboutOptions = [
    {
      title: '회사 개요',
      description: '대양환경기술의 회사 소개 및 개요',
      href: '/about/overview',
      icon: 'ri-building-line',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      title: '연혁',
      description: '회사 설립부터 현재까지의 주요 이정표',
      href: '/about/history',
      icon: 'ri-history-line',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: '비전 및 철학',
      description: '회사의 경영이념과 미래 비전',
      href: '/about/vision',
      icon: 'ri-lightbulb-line',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'CEO 인사말',
      description: '대표이사의 인사말과 경영 철학',
      href: '/about/ceo',
      icon: 'ri-user-voice-line',
      color: 'bg-purple-100 text-purple-600'
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
            {t('common.nav.about')}
          </h1>
          
          {/* 한 줄 안내 */}
          <p className="text-lg text-gray-600 text-center mb-12">
            대양환경기술의 회사 정보 / 연혁 / 경영이념을 확인하세요
          </p>
          
          {/* 중앙 대형 박스 - 탐색 허브 */}
          <div className="bg-white rounded-[32px] p-16 shadow-[0_10px_30px_rgba(0,0,0,0.05)] max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutOptions.map((option, index) => (
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

