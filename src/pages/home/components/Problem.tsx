import { useTranslation } from 'react-i18next';

export default function Problem() {
  const { t } = useTranslation();

  const problems = [
    {
      icon: 'ri-fire-line',
      title: t('home.problem.card1.title'),
      description: t('home.problem.card1.description')
    },
    {
      icon: 'ri-cloud-line',
      title: t('home.problem.card2.title'),
      description: t('home.problem.card2.description')
    },
    {
      icon: 'ri-tools-line',
      title: t('home.problem.card3.title'),
      description: t('home.problem.card3.description')
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('home.problem.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.problem.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className={`${problem.icon} text-3xl text-red-600`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
