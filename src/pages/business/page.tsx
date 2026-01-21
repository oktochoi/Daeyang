import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Breadcrumb from '../../components/base/Breadcrumb';
import Footer from '../../components/feature/Footer';

export default function BusinessPage() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: 'ri-flashlight-line',
      title: t('business.industries.power.title'),
      description: t('business.industries.power.description')
    },
    {
      icon: 'ri-hammer-line',
      title: t('business.industries.steel.title'),
      description: t('business.industries.steel.description')
    },
    {
      icon: 'ri-building-line',
      title: t('business.industries.incineration.title'),
      description: t('business.industries.incineration.description')
    },
    {
      icon: 'ri-global-line',
      title: t('business.industries.overseas.title'),
      description: t('business.industries.overseas.description')
    }
  ];

  const process = [
    {
      step: '01',
      title: t('business.approach.step1.title'),
      description: t('business.approach.step1.description')
    },
    {
      step: '02',
      title: t('business.approach.step2.title'),
      description: t('business.approach.step2.description')
    },
    {
      step: '03',
      title: t('business.approach.step3.title'),
      description: t('business.approach.step3.description')
    },
    {
      step: '04',
      title: t('business.approach.step4.title'),
      description: t('business.approach.step4.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=panoramic%20view%20of%20multiple%20industrial%20facilities%20including%20power%20plants%20steel%20mills%20and%20cement%20factories%2C%20wide%20industrial%20landscape%20showing%20diverse%20heavy%20industry%20sectors%2C%20professional%20aerial%20photography%20of%20industrial%20complex&width=1920&height=600&seq=business1&orientation=landscape"
            alt="Industrial Sectors"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{t('business.hero.title')}</h1>
          <p className="text-xl">{t('business.hero.subtitle')}</p>
        </div>
      </section>

      {/* Background */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('business.background.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            {t('business.background.subtitle')}
          </p>
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

      {/* Industries */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t('business.industries.title')}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            {t('business.industries.subtitle')}
          </p>
          <div className="grid grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-full mb-6">
                  <i className={`${industry.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {industry.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
                <a href="#" className="inline-block mt-6 text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
                  {t('common.cta.viewDetails')} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t('business.approach.title')}
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16">
            {t('business.approach.subtitle')}
          </p>
          <div className="grid grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-teal-600 rounded-full text-3xl font-bold text-white mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
