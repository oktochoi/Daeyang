import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { performanceProjects } from '../../../mocks/performance';

export default function PerformanceSeasiaPage() {
  const { t, i18n } = useTranslation();
  
  const project = performanceProjects.find(p => p.category === 'seasia');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
            {t('common.nav.performance')}
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t('common.nav.performanceComparison')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {i18n.language === 'ko' 
              ? '태국·라오스 산업 현장에서 검증된 Coal Green14001의 글로벌 적용 사례를 확인하세요' 
              : 'Check the global application cases of Coal Green14001 verified at industrial sites in Thailand and Laos'}
          </p>
        </div>
      </section>

      {/* Project Detail */}
      {project && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              {project.image && (
                <div className="order-2 lg:order-1">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative">
                    <Image
                      src={project.image}
                      alt={i18n.language === 'ko' ? (project.name || '') : (project.nameEn || project.name || '')}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="order-1 lg:order-2">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-4">
                    {project.year}
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {i18n.language === 'ko' ? project.name : project.nameEn}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {i18n.language === 'ko' ? project.client : project.clientEn}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {i18n.language === 'ko' ? '주요 성과' : 'Key Results'}
                  </h3>
                  <p className="text-2xl font-bold text-teal-600 mb-4">
                    {i18n.language === 'ko' ? project.result : project.resultEn}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {i18n.language === 'ko' 
                      ? '태국과 라오스의 산업 현장에서 Coal Green14001을 적용하여 배출가스와 분진을 저감하고 설비 보호 효과를 달성했습니다. 동남아시아 시장에서의 성공적인 적용 사례입니다.'
                      : 'By applying Coal Green14001 at industrial sites in Thailand and Laos, we achieved emission and dust reduction as well as equipment protection. This is a successful application case in the Southeast Asian market.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {i18n.language === 'ko' ? '적용 효과 상세' : 'Detailed Application Effects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-windy-line',
                title: i18n.language === 'ko' ? '배출가스 저감' : 'Emission Reduction',
                description: i18n.language === 'ko' ? 'CO, NOx, SOx 등 주요 배출가스가 현저히 감소했습니다.' : 'Major emissions such as CO, NOx, and SOx were significantly reduced.'
              },
              {
                icon: 'ri-dust-line',
                title: i18n.language === 'ko' ? '분진 저감' : 'Dust Reduction',
                description: i18n.language === 'ko' ? '분진 발생량이 감소하여 작업 환경이 개선되었습니다.' : 'Dust generation decreased, improving the working environment.'
              },
              {
                icon: 'ri-shield-check-line',
                title: i18n.language === 'ko' ? '설비 보호' : 'Equipment Protection',
                description: i18n.language === 'ko' ? '크링커·애시 감소로 인한 설비 손상 방지 효과를 확인했습니다.' : 'Equipment damage prevention effects were confirmed through reduction of clinker and ash.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <i className={`${item.icon} text-3xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

