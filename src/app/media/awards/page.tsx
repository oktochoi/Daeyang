'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { getAwardsCertifications, AwardCertification } from '@/lib/supabase-media';

export default function MediaAwardsPage() {
  const { t, i18n } = useTranslation();
  const [awards, setAwards] = useState<AwardCertification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAwards() {
      setIsLoading(true);
      try {
        const awardsData = await getAwardsCertifications();
        setAwards(awardsData);
      } catch (error) {
        console.error('Error loading awards:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAwards();
  }, []);

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
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <p className="mt-4 text-gray-600">로딩 중...</p>
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>등록된 인증 및 수상 내역이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* Awards Grid */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {i18n.language === 'ko' ? '인증서 및 수상 내역' : 'Certificates & Awards'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {awards.map((award) => (
                    <div
                      key={award.id}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      {award.featured_image ? (
                        <div className="aspect-video rounded-lg mb-4 overflow-hidden relative">
                          <Image
                            src={award.featured_image}
                            alt={i18n.language === 'ko' ? award.title : (award.title_en || award.title)}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-teal-50 group-hover:to-teal-100 transition-colors">
                          <i className="ri-award-line text-4xl text-gray-400 group-hover:text-teal-600 transition-colors"></i>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {i18n.language === 'ko' ? award.title : (award.title_en || award.title)}
                        </h3>
                        {award.description && (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {i18n.language === 'ko' ? award.description : (award.description_en || award.description)}
                          </p>
                        )}
                      </div>
                      {award.award_date && (
                        <div className="mt-4 text-sm text-gray-500">
                          <i className="ri-calendar-line mr-2"></i>
                          {new Date(award.award_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}


