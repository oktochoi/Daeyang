'use client'

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  const stats = [
    {
      title: '보도자료',
      count: 3,
      icon: 'ri-newspaper-line',
      color: 'bg-blue-500',
      link: '/media/press'
    },
    {
      title: '인증 및 수상',
      count: 3,
      icon: 'ri-award-line',
      color: 'bg-yellow-500',
      link: '/media/awards'
    },
    {
      title: '기술 자료',
      count: 4,
      icon: 'ri-file-text-line',
      color: 'bg-green-500',
      link: '/product/technical'
    },
    {
      title: '적용 실적',
      count: 3,
      icon: 'ri-building-line',
      color: 'bg-teal-500',
      link: '/performance'
    }
  ];

  const quickActions = [
    {
      title: '보도자료 관리',
      description: '보도자료 추가/수정/삭제',
      icon: 'ri-newspaper-line',
      link: '/media/press',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: '인증 및 수상 관리',
      description: '인증서, 수상 내역 관리',
      icon: 'ri-award-line',
      link: '/media/awards',
      color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    },
    {
      title: '기술 자료 관리',
      description: '기술 문서, 가이드라인 관리',
      icon: 'ri-file-text-line',
      link: '/product/technical',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: '적용 실적 관리',
      description: '프로젝트 실적 관리',
      icon: 'ri-building-line',
      link: '/performance',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-shield-user-line text-xl text-white"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">관리자 대시보드</h1>
                <p className="text-sm text-gray-500">대양환경기술 관리자 페이지</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <i className="ri-home-line"></i>
                홈으로
              </Link>
              <button className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-2">
                <i className="ri-logout-box-line"></i>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-2xl text-white`}></i>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.count}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {stat.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 작업</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={`${action.color} rounded-xl p-6 transition-all cursor-pointer border border-transparent hover:border-gray-300`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <i className={`${action.icon} text-2xl`}></i>
                  <h3 className="text-lg font-bold">
                    {action.title}
                  </h3>
                </div>
                <p className="text-sm opacity-80">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Management Tables */}
        <div className="mt-8 space-y-6">
          {/* Press Releases Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">보도자료 관리</h2>
              <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                <i className="ri-add-line mr-2"></i>
                추가
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">1</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Coal Green14001 신기술 개발 성공</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2024.01.15</td>
                    <td className="px-4 py-3 text-sm text-teal-600">
                      <a href="#" className="hover:underline">URL 입력</a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Articles Archive Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">기사 아카이빙 관리</h2>
              <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                <i className="ri-add-line mr-2"></i>
                추가
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">날짜</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">4</td>
                    <td className="px-4 py-3 text-sm text-gray-900">ISO 9001 품질경영시스템 인증</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2023.12.05</td>
                    <td className="px-4 py-3 text-sm text-teal-600">
                      <a href="#" className="hover:underline">URL 입력</a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">적용 실적 관리</h2>
              <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                <i className="ri-add-line mr-2"></i>
                추가
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">프로젝트명</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객사</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">연도</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">1</td>
                    <td className="px-4 py-3 text-sm text-gray-900">국내 시험로</td>
                    <td className="px-4 py-3 text-sm text-gray-500">국내 시험 설비</td>
                    <td className="px-4 py-3 text-sm text-gray-500">2024</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-200">
          <div className="flex items-start gap-4">
            <i className="ri-information-line text-2xl text-teal-600 mt-1"></i>
            <div>
              <h3 className="text-lg font-bold text-teal-900 mb-2">관리자 안내</h3>
              <p className="text-sm text-teal-700 leading-relaxed mb-2">
                각 섹션의 테이블을 통해 콘텐츠를 추가, 수정, 삭제할 수 있습니다. 
                보도자료와 기사는 URL을 입력하여 자동으로 내용을 가져올 수 있습니다.
              </p>
              <ul className="text-sm text-teal-700 list-disc list-inside space-y-1">
                <li>보도자료: 뉴스 URL을 입력하여 기사 내용 자동 수집</li>
                <li>기사 아카이빙: 회사 관련 기사 URL 입력 및 관리</li>
                <li>적용 실적: 프로젝트명, 고객사, 연도, 성과 입력</li>
                <li>기술 자료: PDF 문서 업로드 및 관리</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

