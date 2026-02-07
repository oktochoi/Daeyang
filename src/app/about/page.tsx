'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/feature/Navbar'
import Breadcrumb from '../../components/base/Breadcrumb'
import Footer from '../../components/feature/Footer'
import ceo1 from '../../assets/ceo1.png'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Breadcrumb />

      {/* 상단 타이틀 영역 — 좌측 정렬, 넓은 여백, 선언형 문장 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 sm:pt-16 pb-5 sm:pb-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 safe-area-padding-x">
          <h1 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-[#111827] leading-[1.2] tracking-tight max-w-5xl">
            {t('about.page.heroTitle')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B7280] max-w-xl">
            {t('about.page.heroSub')}
          </p>
        </div>
      </section>

      {/* 상단 2열: 연혁 / 비전 및 철학 */}
      <section className="pb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 safe-area-padding-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {/* 연혁 카드 — 정보형, 안정적 */}
            <Link
              href="/about/history"
              className="group block bg-white rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[#6B7280] mb-6">
                <i className="ri-history-line text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
                {t('about.page.options.history.title')}
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">
                {t('about.page.options.history.oneLiner')}
              </p>
            </Link>

            {/* 비전 및 철학 카드 — 강조, 은은한 그린 포인트 */}
            <Link
              href="/about/vision"
              className="group block rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-[#F0FDF9] via-white to-[#ECFDF5] border border-[#CCFBF1]/50"
            >
              <div className="w-10 h-10 flex items-center justify-center text-teal-600 mb-6">
                <i className="ri-leaf-line text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">
                {t('about.page.options.vision.title')}
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">
                {t('about.page.options.vision.oneLiner')}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 하단: CEO 인사말 — 풀폭 강조 카드 */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <Link
            href="/about/ceo"
            className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] min-h-[280px] lg:min-h-[320px]">
              {/* 사람 중심 이미지 영역 */}
              <div className="relative h-[260px] sm:h-[280px] lg:h-full lg:min-h-[320px] bg-gradient-to-br from-gray-100 to-gray-50">
                <Image
                  src={ceo1}
                  alt={t('about.ceo.ceoAlt')}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/80" />
              </div>
              {/* 문장형 메시지 */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
                  {t('about.ceo.title')}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-4">
                  {t('about.page.options.ceo.title')}
                </h2>
                <p className="text-[15px] sm:text-base text-[#4B5563] leading-relaxed max-w-xl">
                  {t('about.page.options.ceo.oneLiner')}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
