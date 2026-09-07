'use client'

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import mainBg from '../../../assets/main_bg.svg';

export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={mainBg}
          alt={t('home.hero.imageAlt')}
          fill
          className="object-cover object-[62%_center] sm:object-[70%_center] lg:object-center hero-bg-zoom"
          priority
          sizes="100vw"
        />
        {/* 모바일: 텍스트 가독용 소프트 스크림 / 데스크톱: 최소화 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/50 to-white/25 sm:from-white/45 sm:via-white/20 sm:to-transparent lg:from-white/25 lg:via-transparent lg:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent sm:from-white/40 sm:via-transparent lg:from-white/20"
          aria-hidden
        />
      </div>

      {/* Content: 내비 아래부터 시작, 짧은 화면에서도 CTA가 보이도록 */}
      <div
        className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-start sm:justify-center
          pt-[calc(3.5rem+env(safe-area-inset-top,0px)+1.5rem)]
          sm:pt-[calc(4rem+env(safe-area-inset-top,0px)+1.25rem)]
          md:pt-[calc(5rem+env(safe-area-inset-top,0px))]
          pb-[max(1.75rem,env(safe-area-inset-bottom,0px)+1rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 min-[400px]:px-6 sm:px-8 lg:px-[8%] safe-area-padding-x">
          <div className="w-full max-w-[min(100%,22rem)] min-[400px]:max-w-[26rem] sm:max-w-[36rem] lg:max-w-[42rem]">
            <p className="mb-3 sm:mb-4 lg:mb-6 text-[10px] min-[380px]:text-[11px] sm:text-[13px] lg:text-[14px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] lg:tracking-[0.14em] text-teal-700 break-words hero-fade-up">
              {t('home.hero.eyebrow')}
            </p>

            <h1 className="mb-3.5 sm:mb-5 lg:mb-6 font-bold text-[#111827] leading-[1.28] sm:leading-[1.22] tracking-[-0.03em] break-keep hero-fade-up
              text-[clamp(1.625rem,0.9rem+4.2vw,4.25rem)]">
              <span className="block">{t('home.hero.titleLine1')}</span>
              <span className="block">
                {t('home.hero.titleLine2')}
                <span className="text-teal-700">{t('home.hero.titleHighlight')}</span>
                {t('home.hero.titleAfter')}
              </span>
            </h1>

            <p className="mb-6 sm:mb-8 lg:mb-10 text-[13px] min-[400px]:text-[14px] sm:text-[17px] lg:text-[18px] font-medium text-[#1f2937]/90 leading-[1.55] tracking-[-0.01em] break-keep hero-fade-in-delay-1">
              {t('home.hero.subtitle')}
            </p>

            <div className="flex w-full flex-col gap-2.5 min-[400px]:gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => router.push('/product/overview')}
                className="inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center px-6 sm:px-8 py-3
                  rounded-xl bg-teal-700 text-[15px] sm:text-base font-medium text-white
                  hover:bg-teal-800 active:bg-teal-900
                  transition-colors duration-200 cursor-pointer touch-manipulation
                  hero-fade-in-delay-2"
              >
                {t('home.hero.cta.product')}
              </button>
              <button
                type="button"
                onClick={() => router.push('/contact')}
                className="inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center px-6 sm:px-8 py-3
                  rounded-xl border border-teal-700/50 bg-white/90 sm:bg-white
                  text-[15px] sm:text-base font-medium text-teal-800
                  hover:bg-teal-50 active:bg-teal-100
                  transition-all duration-200 cursor-pointer touch-manipulation
                  hero-fade-in-delay-3"
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
