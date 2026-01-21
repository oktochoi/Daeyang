import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import { performanceProjects } from '../../../mocks/performance';

export default function PerformancePilotPage() {
  const { t, i18n } = useTranslation();
  
  const project = performanceProjects.find(p => p.category === 'pilot');

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
            {t('common.nav.performanceAdvantages')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {i18n.language === 'ko' 
              ? '국내 시험로에서 검증된 Coal Green14001의 효과를 확인하세요' 
              : 'Check the verified effects of Coal Green14001 at domestic test facilities'}
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
                      ? '국내 시험로에서 Coal Green14001의 효과를 실증적으로 검증했습니다. 미연소 물질 감소와 배출가스 저감 효과가 확인되었습니다.'
                      : 'The effects of Coal Green14001 were empirically verified at domestic test facilities. Reduction of unburned materials and emission reduction effects were confirmed.'}
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
            {i18n.language === 'ko' ? '시험 결과 상세' : 'Detailed Test Results'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-fire-line',
                title: i18n.language === 'ko' ? '연소 효율 향상' : 'Improved Combustion Efficiency',
                description: i18n.language === 'ko' ? '미연소 물질 감소로 연소 효율이 크게 향상되었습니다.' : 'Combustion efficiency significantly improved through reduction of unburned materials.'
              },
              {
                icon: 'ri-leaf-line',
                title: i18n.language === 'ko' ? '배출가스 저감' : 'Emission Reduction',
                description: i18n.language === 'ko' ? 'CO, CO₂, NOx 등 주요 배출가스가 현저히 감소했습니다.' : 'Major emissions such as CO, CO₂, and NOx were significantly reduced.'
              },
              {
                icon: 'ri-checkbox-circle-line',
                title: i18n.language === 'ko' ? '실증 검증 완료' : 'Empirical Verification',
                description: i18n.language === 'ko' ? '국내 시험로에서 객관적인 데이터로 효과가 입증되었습니다.' : 'Effects were proven with objective data at domestic test facilities.'
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

