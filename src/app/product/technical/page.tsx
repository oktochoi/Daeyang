'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductTechnicalPage() {
  const { t } = useTranslation();

  const techDocs = [
    {
      title: '특허 제10-2024-0012345호',
      description: '석탄 연소 효율 향상 첨가제 조성물',
      image: 'https://readdy.ai/api/search-image?query=patent%20certificate%20document%20with%20official%20seal%20and%20stamp%2C%20professional%20legal%20document%20with%20patent%20number%20and%20technical%20diagram&width=400&height=300&seq=patent1&orientation=landscape'
    },
    {
      title: 'ISO 9001 품질경영시스템 인증',
      description: '국제 표준 품질관리 체계 구축 인정',
      image: 'https://readdy.ai/api/search-image?query=ISO%209001%20certification%20certificate%20with%20official%20seal%20and%20ribbon%2C%20professional%20quality%20management%20documentation&width=400&height=300&seq=cert1&orientation=landscape'
    },
    {
      title: '환경부 녹색기술 인증',
      description: '친환경 기술력 공식 인정',
      image: 'https://readdy.ai/api/search-image?query=green%20technology%20award%20certificate%20with%20environmental%20theme%2C%20official%20government%20certification%20document&width=400&height=300&seq=cert2&orientation=landscape'
    },
    {
      title: '시험성적서',
      description: '국내외 시험성적 및 검증 자료',
      image: 'https://readdy.ai/api/search-image?query=test%20report%20certificate%20with%20laboratory%20seal%20and%20test%20results%2C%20professional%20technical%20documentation&width=400&height=300&seq=test1&orientation=landscape'
    },
    {
      title: '특허 제10-2023-0056789호',
      description: '배출가스 저감 기술 및 방법',
      image: 'https://readdy.ai/api/search-image?query=patent%20certificate%20document%20with%20official%20seal%20and%20technical%20specifications%2C%20professional%20legal%20document&width=400&height=300&seq=patent2&orientation=landscape'
    },
    {
      title: '산업기술대상 수상',
      description: '산업 혁신 기여 공로 인정',
      image: 'https://readdy.ai/api/search-image?query=prestigious%20industrial%20award%20certificate%20with%20trophy%20presentation%2C%20formal%20government%20award%20document&width=400&height=300&seq=award1&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.technical')}
          </div>
          <h1 className="text-[32px] font-bold text-[#1f2933] mb-4 leading-[1.25]">
            기술 자료
          </h1>
          <p className="text-[15px] text-[#4b5563] leading-[1.6] max-w-[480px] mx-auto font-normal">
            특허, 인증서, 수상 내역 등 기술 자료를 확인하세요
          </p>
        </div>
      </section>

      {/* Technical Documents */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techDocs.map((doc, index) => (
              <div
                key={index}
                className="bg-[#f9fafb] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold text-[#1f2933] mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-[15px] text-[#4b5563] leading-[1.6] font-normal">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

