'use client'

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import mainBg from '../../../assets/main_bg.jpg';

export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="relative min-h-[max(320px,100dvh)] w-full overflow-hidden flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={mainBg}
          alt={t('home.hero.imageAlt')}
          fill
          className="object-cover object-center hero-bg-zoom"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/50"
          aria-hidden
        />
      </div>

      {/* Content - 반응형 패딩·타이포·터치 영역 */}
      <div className="relative flex items-center min-h-[max(320px,100dvh)] py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 min-[400px]:px-5 sm:px-6 lg:px-8 w-full safe-area-padding-x">
          <div className="text-left max-w-[720px]">
            {/* Eyebrow */}
            <div className="text-[11px] min-[380px]:text-xs sm:text-sm font-semibold text-white/65 uppercase tracking-[0.1em] sm:tracking-[0.12em] mb-3 sm:mb-4 hero-fade-up">
              {t('home.hero.eyebrow')}
            </div>

            {/* Main Title - 단계별 크기·줄간격·여백 */}
            <h1 className="text-[26px] min-[360px]:text-[30px] sm:text-[44px] md:text-[52px] lg:text-[64px] xl:text-[72px] font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-[1.22] sm:leading-[1.18] tracking-[-0.04em] hero-fade-up break-words">
              <span className="font-extrabold tracking-[0.02em]">{t('home.hero.titleLine1')}</span>{t('home.hero.titleLine2')}<br />
              <span className="font-extrabold tracking-[0.02em]">{t('home.hero.titleLine3')}</span>{t('home.hero.titleLine4')}
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm min-[400px]:text-base sm:text-lg font-medium text-white/80 mb-5 sm:mb-6 md:mb-7 leading-[1.5] sm:leading-[1.45] tracking-[-0.01em] hero-fade-in-delay-1 break-words max-w-[90vw] sm:max-w-none"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            >
              {t('home.hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <button
                type="button"
                onClick={() => router.push('/product/overview')}
                className="min-h-[44px] sm:min-h-[48px] h-12 px-5 sm:px-6 md:px-8 py-3 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm sm:text-base font-medium rounded-xl transition-colors duration-200 cursor-pointer hero-fade-in-delay-2 touch-manipulation"
              >
                {t('home.hero.cta.product')}
              </button>
              <button
                type="button"
                onClick={() => router.push('/contact')}
                className="min-h-[44px] sm:min-h-[48px] h-12 px-5 sm:px-6 md:px-8 py-3 bg-transparent hover:bg-white/5 active:bg-white/10 text-white text-sm sm:text-base font-medium rounded-xl border border-white/20 transition-all duration-200 cursor-pointer hero-fade-in-delay-3 touch-manipulation"
              >
                {t('home.hero.cta.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
