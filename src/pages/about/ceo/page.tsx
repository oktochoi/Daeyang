import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function AboutCeoPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t('about.ceo.title')}
          </h1>
          <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200">
            {/* CEO Info */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <i className="ri-user-3-line text-4xl text-white"></i>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{t('about.ceo.name')}</div>
                <div className="text-lg text-gray-600">{t('about.ceo.position')}</div>
              </div>
            </div>
            
            {/* Message */}
            <div className="prose prose-lg max-w-none mb-6">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {t('about.ceo.message')}
              </div>
            </div>
            
            {/* Key Message */}
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
              <div className="flex items-start gap-3">
                <i className="ri-double-quotes-l text-3xl text-teal-600 mt-1"></i>
                <p className="text-xl font-semibold text-teal-900 leading-relaxed">
                  {t('about.ceo.keyMessage')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

