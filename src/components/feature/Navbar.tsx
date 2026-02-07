'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import LanguageSwitcher from '../base/LanguageSwitcher';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [openMegaSections, setOpenMegaSections] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const { t } = useTranslation();

  // Mega menu 기본 오픈 섹션 (제품소개, 적용 실적, 미디어) 유지
  useEffect(() => {
    if (isMegaMenuOpen) {
      setOpenMegaSections(new Set(['/product/overview', '/performance', '/media']));
    } else {
      setOpenMegaSections(new Set());
    }
  }, [isMegaMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('common.nav.home') },
    { 
      path: '/about', 
      label: t('common.nav.about'),
      submenu: [
        { path: '/about/history', label: t('common.nav.aboutHistory') },
        { path: '/about/vision', label: t('common.nav.aboutTech') },
        { path: '/about/ceo', label: t('common.nav.aboutCI') },
      ]
    },
    { 
      path: '/product/overview', 
      label: t('common.nav.product'),
      submenu: [
        { path: '/product/overview', label: t('product.hero.title') },
      ]
    },
    { 
      path: '/performance', 
      label: t('common.nav.performance'),
    },
    { 
      path: '/media', 
      label: t('common.nav.media'),
      submenu: [
        { path: '/media/press', label: t('common.nav.mediaPress') },
        { path: '/media/certification', label: t('common.nav.mediaCertification') },
        { path: '/media/awards', label: t('common.nav.mediaAwards') },
        { path: '/media/video', label: t('media.tabs.video') },
        { path: '/product/technical', label: t('common.nav.mediaTechnical') },
      ]
    },
  ];

  const handleMouseEnter = (path: string) => {
    setOpenDropdown(path);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleMegaMenuToggle = () => {
    setIsMegaMenuOpen((prev) => !prev);
  };

  const handleMegaMenuClose = () => {
    setIsMegaMenuOpen(false);
    // 토글 상태는 유지 (다음에 열었을 때 같은 섹션이 열려있도록)
  };

  const handleMegaSectionToggle = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMegaSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-area-padding-x">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <Image 
              src={logo} 
              alt={t('common.logoAlt')} 
              width={120}
              height={48}
              className="object-contain h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.submenu && handleMouseEnter(link.path)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    pathname && (pathname === link.path || (link.submenu && pathname.startsWith(link.path + '/')))
                      ? 'text-teal-600'
                      : 'text-gray-700 hover:text-teal-600'
                  }`}
                >
                  {link.label}
                  {link.submenu && (
                    <i className="ri-arrow-down-s-line text-base"></i>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.submenu && openDropdown === link.path && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-48"
                    onMouseEnter={() => handleMouseEnter(link.path)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative bg-white shadow-xl rounded-xl py-2 border border-gray-100 overflow-hidden ring-1 ring-black/5">
                      {/* 상단 틸 악센트 바 */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 rounded-t-xl" />
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          href={sublink.path}
                          className="group flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-teal-600 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-teal-500 hover:bg-teal-50/70 hover:pl-5"
                        >
                          <i className="ri-arrow-right-s-line text-gray-200 group-hover:text-teal-400 text-sm transition-colors duration-200 flex-shrink-0" />
                          <span>{sublink.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-teal-600 text-white text-sm font-medium rounded-full hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('common.cta.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button - 터치 영역 44px 이상 */}
          <button
            type="button"
            onClick={handleMegaMenuToggle}
            aria-label={isMegaMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 text-gray-700 hover:text-teal-600 active:bg-gray-100 rounded-lg cursor-pointer touch-manipulation"
          >
            <i className={`${isMegaMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`} aria-hidden></i>
          </button>
        </div>

        {/* Mega Menu Overlay (mobile & tablet) */}
        {isMegaMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white text-gray-900 overflow-y-auto">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-16 border-b border-gray-200 safe-area-padding-x">
              <Link href="/" onClick={handleMegaMenuClose} className="flex items-center gap-2 cursor-pointer">
                <Image 
                  src={logo} 
                  alt={t('common.logoAlt')} 
                  width={120}
                  height={48}
                  className="object-contain h-8 w-auto"
                  priority
                />
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  type="button"
                  onClick={handleMegaMenuClose}
                  aria-label="메뉴 닫기"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700 hover:text-teal-600 active:bg-gray-100 rounded-lg cursor-pointer touch-manipulation"
                >
                  <i className="ri-close-line text-2xl" aria-hidden></i>
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-10 pb-safe">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {navLinks.map((link) => {
                  const isSectionOpen = openMegaSections.has(link.path);
                  return (
                    <div key={link.path} className="bg-gray-50 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                      {link.submenu ? (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handleMegaSectionToggle(link.path, e)}
                            className="w-full text-left text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-between cursor-pointer min-h-[48px] py-1 touch-manipulation"
                          >
                            <span>{link.label}</span>
                            <i className={`ri-arrow-${isSectionOpen ? 'up' : 'down'}-s-line text-xl text-gray-500`}></i>
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isSectionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <ul className="space-y-3 mt-2" onClick={(e) => e.stopPropagation()}>
                              {link.submenu.map((sublink) => (
                                <li key={sublink.path}>
                                  <Link
                                    href={sublink.path}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-base text-gray-700 hover:text-teal-600 transition-colors cursor-pointer flex items-center py-2.5 min-h-[44px] touch-manipulation"
                                  >
                                    {sublink.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={link.path}
                          onClick={handleMegaMenuClose}
                          className="text-xl sm:text-2xl font-bold text-gray-900 mb-0 inline-flex items-center min-h-[48px] cursor-pointer touch-manipulation"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Contact CTA - 모바일 터치 영역 */}
                <div className="bg-teal-600 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-teal-500">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{t('common.nav.contact')}</h3>
                  <p className="text-sm text-white/80 mb-5 sm:mb-6 leading-relaxed">
                    {t('home.finalCta.subtitle')}
                  </p>
                  <Link
                    href="/contact"
                    onClick={handleMegaMenuClose}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer touch-manipulation"
                  >
                    {t('common.cta.contact')}
                    <i className="ri-arrow-right-line" aria-hidden></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
