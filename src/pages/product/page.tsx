import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function ProductPage() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('product.features.efficiency.title'),
      description: t('product.features.efficiency.description'),
      image: 'https://readdy.ai/api/search-image?query=close%20up%20of%20intense%20coal%20combustion%20flames%20in%20industrial%20boiler%20with%20bright%20orange%20and%20yellow%20fire%2C%20detailed%20view%20of%20efficient%20burning%20process%20in%20power%20plant%20furnace&width=500&height=700&seq=prod1&orientation=portrait'
    },
    {
      title: t('product.features.emission.title'),
      description: t('product.features.emission.description'),
      image: 'https://readdy.ai/api/search-image?query=clean%20industrial%20smokestacks%20with%20minimal%20emissions%20against%20blue%20sky%2C%20modern%20environmental%20technology%20reducing%20air%20pollution%20at%20power%20plant%2C%20eco-friendly%20industrial%20facility&width=500&height=700&seq=prod2&orientation=portrait'
    },
    {
      title: t('product.features.maintenance.title'),
      description: t('product.features.maintenance.description'),
      image: 'https://readdy.ai/api/search-image?query=well%20maintained%20industrial%20boiler%20interior%20showing%20clean%20metal%20surfaces%20and%20protected%20equipment%2C%20professional%20maintenance%20of%20thermal%20power%20generation%20machinery&width=500&height=700&seq=prod3&orientation=portrait'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            {t('product.hero.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('product.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Definition */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('product.definition.title')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('product.definition.description')}
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('product.problems.title')}
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
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
            <div className="bg-white rounded-xl p-8 shadow-sm">
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
            <div className="bg-white rounded-xl p-8 shadow-sm">
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

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-base leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-16">
            {/* Left - Specs */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                {t('product.specifications.title')}
              </h2>
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

            {/* Right - Diagram */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="bg-gray-50 rounded-2xl p-8">
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
        </div>
      </section>

      {/* Effects */}
      <section className="py-24 bg-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('product.effects.title')}
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-flashlight-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.effects.effect1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.effects.effect1.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-money-dollar-circle-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.effects.effect2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.effects.effect2.description')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-leaf-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('product.effects.effect3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('product.effects.effect3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('product.targets.title')}
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <i className="ri-flashlight-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target1')}</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <i className="ri-hammer-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target2')}</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <i className="ri-building-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target3')}</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <i className="ri-global-line text-4xl text-teal-600 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900">{t('product.targets.target4')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            {t('product.benefits.title')}
          </h2>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.cost.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.cost.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.cost.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.emission.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.emission.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.emission.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-teal-500 mb-3">
                {t('product.benefits.maintenance.value')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t('product.benefits.maintenance.title')}
              </h3>
              <p className="text-base text-gray-400">
                {t('product.benefits.maintenance.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
