import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductHowItWorksPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('product.howItWorks.title')}
          </h1>
          <p className="text-lg text-gray-600">
            Coal Green은 어떤 원리로 작동하나요?
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {t('product.howItWorks.description')}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('product.howItWorks.changes.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-fire-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('product.howItWorks.changes.change1')}
              </h3>
            </div>
            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-decrease-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('product.howItWorks.changes.change2')}
              </h3>
            </div>
            <div className="bg-teal-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-delete-bin-line text-3xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('product.howItWorks.changes.change3')}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Diagram */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-lg flex-shrink-0">
                      <i className="ri-flask-line text-2xl text-white"></i>
                    </div>
                    <div className="flex-1">
                      <div className="h-1 bg-teal-600"></div>
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-900 rounded-lg flex-shrink-0">
                      <i className="ri-fire-line text-2xl text-white"></i>
                    </div>
                  </div>
                  <div className="text-center">
                    <i className="ri-arrow-down-line text-3xl text-gray-400"></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-lg flex-shrink-0">
                      <i className="ri-speed-up-line text-2xl text-white"></i>
                    </div>
                    <div className="flex-1">
                      <div className="h-1 bg-teal-600"></div>
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-900 rounded-lg flex-shrink-0">
                      <i className="ri-leaf-line text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

