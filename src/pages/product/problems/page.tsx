import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';

export default function ProductProblemsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('product.problems.title')}
          </h1>
          <p className="text-lg text-gray-600">
            기존 석탄 연소 방식의 가장 큰 문제점
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-fire-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem1.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-cloud-line text-3xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem2.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-tools-line text-3xl text-yellow-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.problems.problem3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.problems.problem3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

