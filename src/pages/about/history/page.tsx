import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function AboutHistoryPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t('about.history.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('about.history.founded')}
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-teal-400 to-teal-300"></div>
            
            <div className="space-y-12">
              {(t('about.history.milestones', { returnObjects: true }) as any[]).map((milestone: any, index: number) => (
                <div key={index} className="relative pl-24">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 bg-white border-4 border-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border-l-4 border-teal-600 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl font-bold text-teal-600">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Coal Green Position */}
          <div className="mt-16 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-lightbulb-line text-2xl text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">핵심 기술</h3>
                <p className="text-gray-700 leading-relaxed">{t('about.history.coalGreenPosition')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

