import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { performanceProjects } from '../../../mocks/performance';

export default function PerformanceMongoliaPage() {
  const { t, i18n } = useTranslation();
  
  const project = performanceProjects.find(p => p.category === 'mongolia');

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
            {t('common.nav.performanceCases')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {i18n.language === 'ko' 
              ? '몽골 현지 석탄공장에서 검증된 Coal Green14001의 실전 효과를 확인하세요' 
              : 'Check the proven effects of Coal Green14001 at local coal facilities in Mongolia'}
          </p>
        </div>
      </section>

      {/* Project Detail */}
      {project && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={project.image}
                    alt={i18n.language === 'ko' ? project.name : project.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

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
                      ? '몽골 현지 석탄공장에서 Coal Green14001을 적용하여 연소 효율 향상과 연료비 절감 효과를 달성했습니다. 현장 검증을 통해 제품의 실전 효과가 입증되었습니다.'
                      : 'By applying Coal Green14001 at local coal facilities in Mongolia, we achieved improved combustion efficiency and fuel cost reduction. The product\'s practical effects were proven through field verification.'}
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
                icon: 'ri-line-chart-line',
                title: i18n.language === 'ko' ? '연소 효율 개선' : 'Improved Combustion Efficiency',
                description: i18n.language === 'ko' ? '연소 효율이 향상되어 더 많은 에너지를 생산할 수 있게 되었습니다.' : 'Combustion efficiency improved, enabling production of more energy.'
              },
              {
                icon: 'ri-money-dollar-circle-line',
                title: i18n.language === 'ko' ? '연료비 절감' : 'Fuel Cost Reduction',
                description: i18n.language === 'ko' ? '연료 사용량 감소로 인한 직접적인 비용 절감 효과를 확인했습니다.' : 'Direct cost savings were confirmed through reduced fuel consumption.'
              },
              {
                icon: 'ri-global-line',
                title: i18n.language === 'ko' ? '해외 현장 검증' : 'Overseas Field Verification',
                description: i18n.language === 'ko' ? '몽골 현지 환경에서도 안정적으로 작동함을 입증했습니다.' : 'Proven to work stably even in local Mongolian conditions.'
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

