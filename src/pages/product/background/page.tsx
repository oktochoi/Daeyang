import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductBackgroundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('business.background.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('business.background.subtitle')}
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('business.background.reason1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('business.background.reason1.description')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('business.background.reason2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('business.background.reason2.description')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('business.background.reason3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('business.background.reason3.description')}
              </p>
            </div>
          </div>
          <div className="bg-teal-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('business.background.whyNotEnough.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-close-circle-line text-red-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">{t('business.background.whyNotEnough.reason3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

