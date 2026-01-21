import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
                to="/"
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
              to={stat.link}
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
                to={action.link}
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

        {/* Info Section */}
        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-200">
          <div className="flex items-start gap-4">
            <i className="ri-information-line text-2xl text-teal-600 mt-1"></i>
            <div>
              <h3 className="text-lg font-bold text-teal-900 mb-2">관리자 안내</h3>
              <p className="text-sm text-teal-700 leading-relaxed">
                각 섹션의 관리자 추가 영역을 통해 콘텐츠를 추가, 수정, 삭제할 수 있습니다. 
                보도자료, 인증 및 수상, 기술 자료, 적용 실적 등을 관리할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

