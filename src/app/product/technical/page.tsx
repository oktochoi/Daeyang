'use client'

import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductTechnicalPage() {
  const { t } = useTranslation();

  const techDocs = [
    {
      title: 'Coal Green14001 기술 백서',
      description: '제품 원리 및 적용 사례 상세 분석',
      date: '2024.02.01',
      type: 'PDF'
    },
    {
      title: '발전소 적용 가이드라인',
      description: '화력발전소 도입 절차 및 최적화 방법',
      date: '2023.10.12',
      type: 'PDF'
    },
    {
      title: '환경 영향 평가 보고서',
      description: '배출가스 저감 효과 실증 데이터',
      date: '2023.07.25',
      type: 'PDF'
    },
    {
      title: '시험성적 및 인증서',
      description: '국내외 시험성적 및 인증 자료',
      date: '2023.05.20',
      type: 'PDF'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.technical')}
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            기술 자료
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            제품 기술 문서, 가이드라인, 시험성적 및 인증 자료를 확인하세요
          </p>
        </div>
      </section>

      {/* Technical Documents */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techDocs.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors">
                  <i className="ri-file-pdf-line text-3xl text-teal-600 group-hover:text-white transition-colors"></i>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                    {doc.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{doc.date}</span>
                  <div className="flex items-center gap-2 text-teal-600 font-medium text-sm">
                    다운로드
                    <i className="ri-download-line"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Document Placeholder */}
          <div className="mt-12 p-8 bg-teal-50 rounded-2xl border-2 border-dashed border-teal-300">
            <div className="text-center mb-6">
              <i className="ri-add-circle-line text-4xl text-teal-600 mb-4"></i>
              <p className="text-lg text-teal-700 font-medium mb-2">
                관리자가 기술 자료를 추가할 수 있습니다
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-teal-200 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">새 기술 자료 추가</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <input
                    type="text"
                    placeholder="기술 자료 제목을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                  <textarea
                    placeholder="기술 자료에 대한 설명을 입력하세요"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">파일 업로드</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
                    <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">PDF 파일을 드래그하거나 클릭하여 업로드</p>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  기술 자료 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              인증 및 수상
            </h2>
            <p className="text-lg text-gray-600">
              특허, 인증서, 수상 내역
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <i className="ri-award-line text-4xl text-gray-400"></i>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <i className="ri-calendar-line mr-2"></i>
                  날짜 영역
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200 text-center">
            <i className="ri-add-circle-line text-3xl text-teal-600 mb-2"></i>
            <p className="text-sm text-teal-700 font-medium">
              관리자가 인증 및 수상 내용을 추가할 수 있습니다
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

