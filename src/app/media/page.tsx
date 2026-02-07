'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Navbar from '../../components/feature/Navbar'
import Breadcrumb from '../../components/base/Breadcrumb'
import Footer from '../../components/feature/Footer'

const CARD_STYLES = {
  press: { bar: 'border-l-teal-500', icon: 'text-teal-600' },
  certification: { bar: 'border-l-blue-500', icon: 'text-blue-600' },
  awards: { bar: 'border-l-amber-500', icon: 'text-amber-600' },
  technical: { bar: 'border-l-emerald-600', icon: 'text-emerald-600' },
  video: { bar: 'border-l-violet-500', icon: 'text-violet-600' },
} as const

export default function MediaPage() {
  const { t } = useTranslation()

  const mediaOptions = [
    { key: 'press', title: t('media.page.options.press.title'), description: t('media.page.options.press.description'), href: '/media/press', icon: 'ri-newspaper-line' },
    { key: 'certification', title: t('media.page.options.certification.title'), description: t('media.page.options.certification.description'), href: '/media/certification', icon: 'ri-verified-badge-line' },
    { key: 'awards', title: t('media.page.options.awards.title'), description: t('media.page.options.awards.description'), href: '/media/awards', icon: 'ri-award-line' },
    { key: 'technical', title: t('media.page.options.technical.title'), description: t('media.page.options.technical.description'), href: '/product/technical', icon: 'ri-file-text-line' },
    { key: 'video', title: t('media.page.options.video.title'), description: t('media.page.options.video.description'), href: '/media/video', icon: 'ri-play-circle-line' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <Breadcrumb />

      {/* 상단 — 성과 페이지 인상, 한 줄 성과 메시지 */}
      <section className="mt-[80px] sm:mt-[140px] pt-14 pb-12 sm:pb-16">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <p className="text-sm font-medium text-teal-600 tracking-wide mb-3">
            {t('media.page.heroMessage')}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
            {t('media.page.heroTitle')}
          </h1>
          <p className="mt-3 text-sm text-[#6B7280] max-w-xl">
            {t('media.page.heroSub')}
          </p>
        </div>
      </section>

      {/* 카드 — 왼쪽 얇은 컬러 바, 미세한 포인트 */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {mediaOptions.map((option) => {
              const style = CARD_STYLES[option.key as keyof typeof CARD_STYLES]
              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className={`block bg-white rounded-xl pl-7 pr-7 sm:pl-8 sm:pr-8 py-7 sm:py-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-200 border-l-4 ${style?.bar || 'border-l-gray-300'}`}
                >
                  <div className={`w-9 h-9 flex items-center justify-center mb-5 ${style?.icon || 'text-[#9CA3AF]'}`}>
                    <i className={`${option.icon} text-xl`} />
                  </div>
                  <h2 className="text-lg font-semibold text-[#111827] mb-2">
                    {option.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {option.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
