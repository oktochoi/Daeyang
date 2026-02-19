'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/feature/Navbar'
import Breadcrumb from '../../components/base/Breadcrumb'
import Footer from '../../components/feature/Footer'
import { getPerformanceProjects, PerformanceProject as SupabasePerformanceProject, PerformanceProjectItem } from '@/lib/supabase'
import { performanceProjects as mockProjects } from '../../mocks/performance'
import fallback1 from '../../assets/중국발전소테스트.jpg'
import fallback2 from '../../assets/몽골.jpg'
import fallback3 from '../../assets/팔라위현장짤.jpg'

const FALLBACK_IMAGES = [fallback1, fallback2, fallback3]

function transformSupabaseProject(project: SupabasePerformanceProject & { titleEn?: string; descriptionEn?: string; image?: string }) {
  const icon = (project as { image?: string }).image ?? project.icon
  return {
    id: project.id,
    title: project.title,
    titleEn: project.title_en ?? (project as { titleEn?: string }).titleEn,
    icon,
    description: project.description ?? (project as { result?: string }).result,
    descriptionEn: project.description_en ?? (project as { descriptionEn?: string }).descriptionEn ?? (project as { resultEn?: string }).resultEn,
    items: project.items || [],
  }
}

// Mock에서 연도·지역 등 보조 정보 매핑 (있을 경우 표시)
function getProjectMeta(project: { id: number; title: string }, lang: string) {
  const mock = mockProjects.find((p) => p.id === project.id)
  if (!mock) return null
  const year = (mock as { year?: number }).year
  const result = lang === 'ko' ? (mock as { result?: string }).result : (mock as { resultEn?: string }).resultEn
  return { year, result }
}

export default function PerformancePage() {
  const { t, i18n } = useTranslation()
  interface ProjectDisplay {
    id: number
    title: string
    titleEn?: string
    icon: string
    description?: string
    descriptionEn?: string
    items?: PerformanceProjectItem[]
  }

  const [projects, setProjects] = useState<ProjectDisplay[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true)
      try {
        const supabaseProjects = await getPerformanceProjects()
        if (supabaseProjects && supabaseProjects.length > 0) {
          setProjects(supabaseProjects.map(transformSupabaseProject))
        } else {
          setProjects(mockProjects.map(transformSupabaseProject))
        }
      } catch {
        setProjects(mockProjects.map(transformSupabaseProject))
      } finally {
        setIsLoading(false)
      }
    }
    loadProjects()
  }, [])

  const lang = i18n.language === 'ko' ? 'ko' : 'en'

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />

      {/* Hero — 배경 이미지(은은) + 그라데이션 + 포인트 라인 */}
      <section className="relative mt-[88px] sm:mt-[140px] pt-8 sm:pt-20 pb-6 sm:pb-16 overflow-hidden border-b border-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: "url('/media_bg.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/55 to-white" aria-hidden />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 safe-area-padding-x">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight border-l-4 border-teal-500 pl-4 sm:pl-5">
            {t('common.nav.performance')}
          </h1>
          <p className="mt-2 text-gray-600 text-base sm:text-lg max-w-2xl pl-5">
            {t('performance.page.subtitle')}
          </p>
          <span className="mt-5 ml-5 block h-0.5 w-16 bg-teal-400/80 rounded-full" aria-hidden />
        </div>
      </section>

      {/* 성과 쇼케이스 */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 safe-area-padding-x">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-9 w-9 border-2 border-gray-200 border-t-teal-500" />
              <p className="ml-3 text-gray-500">{t('performance.page.loading')}</p>
            </div>
          ) : Array.isArray(projects) && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {projects.map((project, index) => {
                const meta = getProjectMeta(project, lang)
                const title = lang === 'ko' ? project.title : (project.titleEn || project.title)
                const desc = lang === 'ko' ? project.description : (project.descriptionEn || project.description)
                const itemCount = project.items?.length ?? 0
                const hasImage = project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://'))

                return (
                  <Link
                    key={project.id}
                    href={`/performance/${project.id}`}
                    className="group block relative aspect-[4/3] sm:aspect-[5/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-all duration-300"
                  >
                    {/* 배경 이미지 — 크게 */}
                    <div className="absolute inset-0 bg-gray-200">
                      {hasImage ? (
                        <Image
                          src={project.icon}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          unoptimized
                          priority={index < 3}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            const fb = FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0]
                            const target = e.target as HTMLImageElement
                            target.src = typeof fb === 'string' ? fb : (fb as { src: string }).src
                            target.onerror = null
                          }}
                        />
                      ) : (
                        <Image
                          src={FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0]}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      {/* 어두운 그라데이션 오버레이 */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/90"
                        aria-hidden
                      />
                    </div>

                    {/* 텍스트 — 이미지 위 하단 정렬 */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                      <p className="text-teal-400/95 text-xs sm:text-[13px] font-semibold uppercase tracking-wider mb-1.5">
                        {meta?.year && <span>{meta.year}</span>}
                        {meta?.year && itemCount > 0 && ' · '}
                        {itemCount > 0 && (
                          <span>
                            {itemCount} {t('performance.page.itemsCount')}
                          </span>
                        )}
                        {!meta?.year && itemCount === 0 && '\u00A0'}
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                        {title}
                      </h2>
                      {(desc || meta?.result) && (
                        <p className="mt-2 text-sm text-white/90 leading-snug line-clamp-2">
                          {meta?.result || desc}
                        </p>
                      )}
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl ring-1 ring-black/5 transition-all duration-300 ease-out group-hover:ring-teal-400/30"
                      aria-hidden
                    />
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('performance.page.empty')}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
