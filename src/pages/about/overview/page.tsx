import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import office1 from '../../../assets/office_1.png';
import office2 from '../../../assets/office_2.png';

export default function AboutOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              {t('about.label')}
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">{t('about.hero.title1')}</span>
              <span className="block text-gray-600 mt-2">{t('about.hero.title2')}</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.description')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">{t('about.stats.founded')}</div>
              <div className="text-sm text-gray-600">{t('about.stats.foundedLabel')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">{t('about.stats.patents')}</div>
              <div className="text-sm text-gray-600">{t('about.stats.patentsLabel')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">{t('about.stats.experience')}</div>
              <div className="text-sm text-gray-600">{t('about.stats.experienceLabel')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">{t('about.stats.sites')}</div>
              <div className="text-sm text-gray-600">{t('about.stats.sitesLabel')}</div>
            </div>
          </div>

          {/* Office Images */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={office1} 
                alt="대양환경기술 사무실" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={office2} 
                alt="대양환경기술 사무실" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.overview.title')}
            </h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <i className="ri-building-2-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">정식 사업 분야</h3>
              </div>
              <ul className="space-y-4">
                {(t('about.overview.businessFields', { returnObjects: true }) as string[]).map((field: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{field}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <i className="ri-group-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">주요 고객 유형</h3>
              </div>
              <ul className="space-y-4">
                {(t('about.overview.customerTypes', { returnObjects: true }) as string[]).map((type: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

