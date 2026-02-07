'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Navbar from '../../../components/feature/Navbar'
import Breadcrumb from '../../../components/base/Breadcrumb'
import Footer from '../../../components/feature/Footer'
import ceo1 from '../../../assets/ceo1.png'
import office1 from '../../../assets/office_1.png'

export default function AboutCeoPage() {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const paragraphs = (t('about.ceo.paragraphs', { returnObjects: true }) as string[]) || []

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />

      {/* Hero — 그라데이션 오버레이 + 살짝 블러 느낌 + 타이틀 강조 */}
      <section className="mt-[80px] sm:mt-[140px] relative w-full min-h-[280px] sm:min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={office1}
            alt=""
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/65"
            aria-hidden
          />
        </div>
        <div className="relative text-center px-5">
          <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold text-white tracking-tight">
            {t('about.ceo.title')}
          </h1>
          <span
            className="mt-4 block h-px w-12 sm:w-16 mx-auto bg-teal-400/80"
            aria-hidden
          />
        </div>
      </section>

      {/* 디바이더 */}
      <div className="h-px w-full bg-gray-100" aria-hidden />

      {/* CEO 인사말 메인 — 스크롤 등장 + 첫 문장 강조 + 프로필 카드 */}
      <section className="pt-10 sm:pt-14 md:pt-18 pb-12 sm:pb-16 md:pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 safe-area-padding-x" ref={contentRef}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="lg:col-span-8 order-2 lg:order-1 pt-0">
              <div className="[&>p]:mt-0 [&>p+p]:mt-6 text-[16px] sm:text-[17px] text-gray-600 leading-[1.9] tracking-[-0.01em]">
                {paragraphs.map((para, i) =>
                  i === 0 ? (
                    <p key={i} className="text-gray-800 font-medium text-[17px] sm:text-[18px] leading-[1.85] border-l-2 border-teal-500/80 pl-5">
                      {para}
                    </p>
                  ) : (
                    <p key={i}>{para}</p>
                  )
                )}
              </div>
              <p className="mt-10 text-gray-500 text-[15px] font-medium">
                {t('about.ceo.footerCompany')}
              </p>
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end lg:sticky lg:top-28 pt-0">
              <div className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-full rounded-xl overflow-hidden border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src={ceo1}
                    alt={t('about.ceo.ceoAlt')}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 280px, 320px"
                  />
                </div>
                <div className="py-5 px-4 text-center lg:text-left border-t border-gray-50">
                  <p className="text-[13px] text-gray-500 font-medium">
                    {t('about.ceo.ceoTitle')}
                  </p>
                  <p className="mt-1 text-[17px] font-semibold text-gray-900">
                    {t('about.ceo.ceoName')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 디바이더 */}
      <div className="h-px w-full bg-gray-100" aria-hidden />

      <Footer />
    </div>
  )
}
