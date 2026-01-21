import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductApplicationPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('product.application.title')}
          </h1>
          <p className="text-lg text-gray-600">
            제품 투입 방식은 어떻게 되나요?
          </p>
        </div>
      </section>

      {/* Application Method */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-teal-50 rounded-2xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {t('product.application.description')}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('product.specifications.title')}
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <ul className="space-y-4">
              {t('product.specifications.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-checkbox-circle-fill text-xl text-teal-600"></i>
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('product.targets.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <i className="ri-flashlight-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target1')}</h3>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <i className="ri-hammer-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target2')}</h3>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <i className="ri-building-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target3')}</h3>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <i className="ri-global-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target4')}</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

