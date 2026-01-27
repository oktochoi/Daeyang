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
      setOpenMegaSections(new Set(['/product', '/performance', '/media']));
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
        { path: '/about/overview', label: t('common.nav.aboutIntro') },
        { path: '/about/history', label: t('common.nav.aboutHistory') },
        { path: '/about/vision', label: t('common.nav.aboutTech') },
        { path: '/about/ceo', label: t('common.nav.aboutCI') },
      ]
    },
    { 
      path: '/product', 
      label: t('common.nav.product'),
      submenu: [
        { path: '/product/overview', label: t('common.nav.productOverview') },
        { path: '/product/how-it-works', label: t('common.nav.productHowItWorks') },
        { path: '/product/application', label: t('common.nav.productApplication') },
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
        { path: '/media/awards', label: t('common.nav.mediaAwards') },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <Image 
              src={logo} 
              alt="대양환경기술 로고" 
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
                    pathname && pathname === link.path
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
                    <div className="bg-white shadow-lg rounded-lg py-2 border border-gray-100">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          href={sublink.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors cursor-pointer"
                        >
                          {sublink.label}
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

          {/* Mobile Menu Button */}
          <button
            onClick={handleMegaMenuToggle}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-teal-600 cursor-pointer"
          >
            <i className={`${isMegaMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
          </button>
        </div>

        {/* Mega Menu Overlay (mobile & tablet) */}
        {isMegaMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white text-gray-900 overflow-y-auto">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 border-b border-gray-200">
              <Link href="/" onClick={handleMegaMenuClose} className="flex items-center gap-2 cursor-pointer">
                <Image 
                  src={logo} 
                  alt="대양환경기술 로고" 
                  width={120}
                  height={48}
                  className="object-contain h-8 w-auto"
                  priority
                />
              </Link>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={handleMegaMenuClose}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-teal-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-10 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {navLinks.map((link) => {
                  const isSectionOpen = openMegaSections.has(link.path);
                  return (
                    <div key={link.path} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                      {link.submenu ? (
                        <>
                          <button
                            onClick={(e) => handleMegaSectionToggle(link.path, e)}
                            className="w-full text-left text-2xl font-bold text-gray-900 mb-4 flex items-center justify-between cursor-pointer"
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
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // 하위 메뉴 클릭 시에도 메가메뉴 토글 상태 유지
                                      // 메가메뉴를 닫지 않음
                                    }}
                                    className="text-base text-gray-700 hover:text-teal-600 transition-colors cursor-pointer block"
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
                          className="text-2xl font-bold text-gray-900 mb-4 inline-block cursor-pointer"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Contact CTA */}
                <div className="bg-teal-600 text-white rounded-2xl p-6 shadow-md border border-teal-500">
                  <h3 className="text-2xl font-bold mb-3">{t('common.nav.contact')}</h3>
                  <p className="text-sm text-white/80 mb-6 leading-relaxed">
                    {t('home.finalCta.subtitle')}
                  </p>
                  <Link
                    href="/contact"
                    onClick={handleMegaMenuClose}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {t('common.cta.contact')}
                    <i className="ri-arrow-right-line"></i>
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
