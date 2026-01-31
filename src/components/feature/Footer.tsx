'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import whiteLogo from '../../assets/white_logo.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info with Logo */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 relative h-16 w-48">
              <Image 
                src={whiteLogo} 
                alt={t('common.logoAlt')} 
                fill
                sizes="192px"
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('common.footer.description')}
            </p>
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-400 mb-1">{t('common.footer.company')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('common.footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  {t('common.nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/product/overview" className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  {t('common.nav.product')}
                </Link>
              </li>
              <li>
                <Link href="/performance" className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  {t('common.nav.performance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('common.footer.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/media" className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  {t('common.nav.media')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  {t('common.nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t('common.footer.contact')}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-teal-600/20 rounded mt-0.5 flex-shrink-0">
                  <i className="ri-phone-line text-teal-400 text-sm"></i>
                </div>
                <span className="hover:text-white transition-colors">{t('contact.info.phone.value')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-teal-600/20 rounded mt-0.5 flex-shrink-0">
                  <i className="ri-mail-line text-teal-400 text-sm"></i>
                </div>
                <span className="hover:text-white transition-colors break-all">info@daeyangenv.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-teal-600/20 rounded mt-0.5 flex-shrink-0">
                  <i className="ri-map-pin-line text-teal-400 text-sm"></i>
                </div>
                <span className="hover:text-white transition-colors">{t('common.footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2025 {t('common.footer.company')}. {t('common.footer.rights')}
            </p>
            <span className="text-xs text-gray-500">
              Powered by okto
            </span>
          </div>
          <div className="mt-4 text-center">
            <Link 
              href="/admin" 
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors cursor-pointer"
              style={{ opacity: 0.4 }}
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
