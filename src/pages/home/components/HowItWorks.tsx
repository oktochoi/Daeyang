'use client'

import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      icon: 'ri-drop-line',
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description')
    },
    {
      number: '02',
      icon: 'ri-sun-line',
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description')
    },
    {
      number: '03',
      icon: 'ri-fire-fill',
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description')
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('home.howItWorks.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            {t('home.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 text-white rounded-full mb-6 shadow-lg">
                  <i className={`${step.icon} text-3xl`}></i>
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-3 bg-white px-3 py-1 rounded-full border-2 border-teal-600">
                  <span className="text-sm font-bold text-teal-600">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
