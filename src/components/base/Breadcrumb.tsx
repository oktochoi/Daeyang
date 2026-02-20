'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BreadcrumbJsonLd } from '../seo/JsonLd';

export default function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useTranslation();

  // 한국어와 영어 라벨 매핑
  const pathMap: { [key: string]: { ko: string; en: string } } = {
    '/': { ko: '홈', en: 'Home' },
    '/about': { ko: t('common.nav.about'), en: 'About' },
    '/about/history': { ko: t('common.nav.aboutHistory'), en: 'History' },
    '/about/vision': { ko: t('common.nav.aboutTech'), en: 'Vision & Philosophy' },
    '/about/ceo': { ko: t('common.nav.aboutCI'), en: 'CEO Message' },
    '/product': { ko: t('common.nav.product'), en: 'Product' },
    '/product/overview': { ko: t('common.nav.productOverview'), en: 'Product Overview' },
    '/product/how-it-works': { ko: t('common.nav.productHowItWorks'), en: 'How It Works' },
    '/product/application': { ko: t('common.nav.productApplication'), en: 'Application' },
    '/product/industries': { ko: t('common.nav.productIndustries'), en: 'Industries' },
    '/product/technical': { ko: t('common.nav.mediaTechnical'), en: 'Technical Resources' },
    '/performance': { ko: t('common.nav.performance'), en: 'Performance' },
    '/media': { ko: t('common.nav.media'), en: 'Media' },
    '/media/press': { ko: t('common.nav.mediaPress'), en: 'Press Release' },
    '/media/certification': { ko: t('common.nav.mediaCertification'), en: 'Certification' },
    '/media/awards': { ko: t('common.nav.mediaAwards'), en: 'Awards' },
    '/media/video': { ko: t('media.tabs.video'), en: 'Videos' },
    '/contact': { ko: t('common.cta.contact'), en: 'Contact' },
  };

  if (!pathname) return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbs: Array<{ path: string; labelKo: string; labelEn: string }> = [
    { path: '/', labelKo: '홈', labelEn: 'Home' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (pathMap[currentPath]) {
      breadcrumbs.push({
        path: currentPath,
        labelKo: pathMap[currentPath].ko,
        labelEn: pathMap[currentPath].en
      });
    } else if (index === pathSegments.length - 1 && pathSegments[0] === 'performance' && !isNaN(Number(segment))) {
      // 동적 performance/[id] 경로 처리
      breadcrumbs.push({
        path: currentPath,
        labelKo: '적용 실적 상세',
        labelEn: 'Performance Detail'
      });
    } else {
      // pathMap에 없는 경로도 추가 (예: /product 같은 경우)
      breadcrumbs.push({
        path: currentPath,
        labelKo: segment,
        labelEn: segment
      });
    }
  });

  // 홈 페이지만 있으면 breadcrumb 숨기기
  if (breadcrumbs.length === 1 && pathname === '/') return null;

  const jsonLdItems = breadcrumbs.map((c) => ({
    name: c.labelKo,
    path: c.path,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
    <div className="bg-gray-50 border-b border-gray-200 fixed top-14 sm:top-16 md:top-20 left-0 right-0 z-40 safe-area-padding-x">
      <div className="max-w-7xl mx-auto py-2.5 sm:py-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap">
          <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
            <i className="ri-home-4-line"></i>
          </Link>
          {breadcrumbs.slice(1).map((crumb, index) => (
            <div key={crumb.path} className="flex items-center gap-2">
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              {index === breadcrumbs.length - 2 ? (
                <span className="text-gray-900 font-medium">
                  {crumb.labelKo} <span className="text-gray-500 font-normal">({crumb.labelEn})</span>
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  {crumb.labelKo} <span className="text-gray-400">({crumb.labelEn})</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
