import { useTranslation } from 'react-i18next';

interface Milestone {
  year: string;
  title: string;
  description: string;
}
import Image from 'next/image';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-16">
            {/* Left Content */}
            <div className="w-2/5">
              <div className="inline-block px-4 py-1 border border-gray-300 rounded-full text-xs text-gray-600 mb-8">
                {t('about.label')}
              </div>
              
              <h1 className="text-5xl font-bold leading-tight mb-4">
                <span className="text-gray-900">{t('about.hero.title1')}</span>
                <br />
                <span className="text-gray-500">{t('about.hero.title2')}</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-10 mt-12">
                {t('about.hero.description')}
              </p>
              
              <a href="#" className="text-base text-gray-900 underline hover:text-teal-600 transition-colors cursor-pointer">
                {t('about.hero.link')}
              </a>
            </div>

            {/* Right Stats */}
            <div className="flex-1 flex justify-end gap-16 pt-8">
              <div className="text-right">
                <div className="text-7xl font-bold text-gray-900 mb-2">2011</div>
                <div className="text-sm text-gray-600">{t('about.stats.founded')}</div>
              </div>
              <div className="text-right">
                <div className="text-7xl font-bold text-gray-900 mb-2">5+</div>
                <div className="text-sm text-gray-600">{t('about.stats.patents')}</div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="mt-16 relative h-96">
            <div className="absolute left-0 top-0 w-64 h-64">
              <div className="relative w-full h-full">
                <Image
                src="https://readdy.ai/api/search-image?query=modern%20industrial%20research%20laboratory%20with%20scientists%20in%20white%20coats%20working%20with%20chemical%20equipment%20and%20testing%20materials%2C%20clean%20professional%20lab%20environment%20with%20advanced%20technology&width=400&height=400&seq=about1&orientation=squarish"
                alt="Research Lab"
                fill
                className="object-cover rounded-2xl shadow-lg"
                unoptimized
              />
              </div>
            </div>
            <div className="absolute right-0 top-12 w-96 h-80">
              <div className="relative w-full h-full">
                <Image
                src="https://readdy.ai/api/search-image?query=industrial%20power%20plant%20with%20workers%20in%20safety%20gear%20inspecting%20large%20boiler%20equipment%2C%20professional%20on-site%20application%20of%20industrial%20technology%2C%20engineers%20working%20at%20thermal%20facility&width=600&height=500&seq=about2&orientation=portrait"
                alt="Industrial Application"
                fill
                className="object-cover rounded-2xl shadow-lg"
                unoptimized
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            {t('about.overview.title')}
          </h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">정식 사업 분야</h3>
              <ul className="space-y-2">
                {Array.isArray(t('about.overview.businessFields', { returnObjects: true })) 
                  ? (t('about.overview.businessFields', { returnObjects: true }) as string[]).map((field: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-1"></i>
                      <span className="text-gray-700">{field}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">주요 고객 유형</h3>
              <ul className="space-y-2">
                {Array.isArray(t('about.overview.customerTypes', { returnObjects: true })) 
                  ? (t('about.overview.customerTypes', { returnObjects: true }) as string[]).map((type: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-1"></i>
                      <span className="text-gray-700">{type}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('about.history.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            {t('about.history.founded')}
          </p>
          <div className="space-y-8">
            {Array.isArray(t('about.history.milestones', { returnObjects: true })) 
              ? (t('about.history.milestones', { returnObjects: true }) as Milestone[]).map((milestone: Milestone, index: number) => (
                <div key={index} className="flex gap-8 pb-8 border-b border-gray-200 last:border-0">
                  <div className="w-24 flex-shrink-0">
                    <div className="text-2xl font-bold text-teal-600">{milestone.year}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))
              : null}
          </div>
          <div className="mt-8 p-6 bg-teal-50 rounded-lg">
            <p className="text-gray-700 font-medium">{t('about.history.coalGreenPosition')}</p>
          </div>
        </div>
      </section>

      {/* Vision & Philosophy */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            {t('about.vision.title')}
          </h2>
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('about.vision.coreValues.title')}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t('about.vision.coreValues.saveEarth.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.vision.coreValues.saveEarth.description')}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t('about.vision.coreValues.saveEnergy.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.vision.coreValues.saveEnergy.description')}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t('about.vision.coreValues.practical.title')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.vision.coreValues.practical.description')}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">우선 방향</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t('about.vision.priority')}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.vision.futureVision.title')}
              </h3>
              <ul className="space-y-3">
                {Array.isArray(t('about.vision.futureVision.goals', { returnObjects: true })) 
                  ? (t('about.vision.futureVision.goals', { returnObjects: true }) as string[]).map((goal: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="ri-arrow-right-s-line text-teal-600 mt-1"></i>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            {t('about.ceo.title')}
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12">
            <div className="mb-6">
              <div className="text-2xl font-bold text-gray-900">{t('about.ceo.name')}</div>
              <div className="text-lg text-gray-600">{t('about.ceo.position')}</div>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {t('about.ceo.message')}
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-lg font-semibold text-teal-600">
                {t('about.ceo.keyMessage')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
