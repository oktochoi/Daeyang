import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();

  const pathMap: { [key: string]: string } = {
    '/': t('common.nav.home'),
    '/about': t('common.nav.about'),
    '/product': t('common.nav.product'),
    '/business': t('common.nav.business'),
    '/performance': t('common.nav.performance'),
    '/media': t('common.nav.media'),
    '/contact': t('common.cta.contact'),
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs = [
    { path: '/', label: 'Home' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    if (pathMap[currentPath]) {
      breadcrumbs.push({
        path: currentPath,
        label: pathMap[currentPath]
      });
    }
  });

  if (breadcrumbs.length === 1) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
            <i className="ri-home-4-line"></i>
          </Link>
          {breadcrumbs.slice(1).map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              {index === breadcrumbs.length - 2 ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
