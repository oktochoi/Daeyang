import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Navbar from '../../../components/feature/Navbar';
import Breadcrumb from '../../../components/base/Breadcrumb';
import Footer from '../../../components/feature/Footer';
import factory1 from '../../../assets/factory_1.png';
import factory5 from '../../../assets/factory_5.jpg';

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
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg relative h-64">
            <Image 
              src={factory1} 
              alt="제품 적용 방법" 
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-teal-50 rounded-2xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {t('product.application.description')}
            </p>
          </div>
          
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg relative h-80">
            <Image 
              src={factory5} 
              alt="제품 적용 현장" 
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('product.specifications.title')}
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <ul className="space-y-4">
              {Array.isArray(t('product.specifications.items', { returnObjects: true })) 
                ? (t('product.specifications.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-circle-fill text-xl text-teal-600"></i>
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))
                : null}
            </ul>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

