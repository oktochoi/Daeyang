import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors whitespace-nowrap cursor-pointer"
      aria-label="언어 변경"
    >
      <i className="ri-global-line text-lg"></i>
      <span>{i18n.language === 'ko' ? 'EN' : 'KO'}</span>
    </button>
  );
}
