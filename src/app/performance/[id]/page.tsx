'use client'

import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/feature/Navbar'
import Breadcrumb from '../../../components/base/Breadcrumb'
import Footer from '../../../components/feature/Footer'
import { getPerformanceProjectById, PerformanceProject as SupabasePerformanceProject, PerformanceProjectItem } from '@/lib/supabase'
import { performanceProjects as mockProjects } from '../../../mocks/performance'
import type { PerformanceProject as MockProject } from '../../../mocks/performance'

const ITEMS_PER_PAGE = 9

function mockToSupabaseFormat(mock: MockProject): SupabasePerformanceProject {
  return {
    id: mock.id,
    title: mock.title,
    title_en: mock.titleEn,
    icon: mock.icon,
    description: mock.description,
    description_en: mock.descriptionEn,
    items: [],
  }
}

function transformSupabaseProject(project: SupabasePerformanceProject) {
  return {
    id: project.id,
    title: project.title,
    titleEn: project.title_en,
    icon: project.icon,
    iconColor: 'bg-gray-50',
    description: project.description,
    descriptionEn: project.description_en,
    items: project.items || [],
  }
}

interface ProjectDisplay {
  id: number
  title: string
  titleEn?: string
  icon: string
  iconColor: string
  description?: string
  descriptionEn?: string
  items?: PerformanceProjectItem[]
}

export default function PerformanceDetailPage() {
  const { t, i18n } = useTranslation()
  const params = useParams()
  const id = params?.id ? parseInt(params.id as string) : null
  const [project, setProject] = useState<ProjectDisplay | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function loadProject() {
      if (!id) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      try {
        const supabaseProject = await getPerformanceProjectById(id)
        if (supabaseProject) {
          setProject(transformSupabaseProject(supabaseProject))
        } else {
          const mockProject = mockProjects.find((p) => p.id === id)
          if (mockProject) {
            setProject(transformSupabaseProject(mockToSupabaseFormat(mockProject)))
          }
        }
      } catch {
        const mockProject = mockProjects.find((p) => p.id === id)
        if (mockProject) {
          setProject(transformSupabaseProject(mockToSupabaseFormat(mockProject)))
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadProject()
  }, [id])

  const items = useMemo(() => project?.items ?? [], [project?.items])
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE))
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return items.slice(start, start + ITEMS_PER_PAGE)
  }, [items, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumb />
        <section className="mt-[80px] sm:mt-[140px] pt-24 pb-20 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
            <div className="inline-block animate-spin rounded-full h-9 w-9 border-2 border-gray-200 border-t-teal-500" />
            <p className="mt-4 text-gray-600">{t('performance.detail.loading')}</p>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Breadcrumb />
        <section className="mt-[80px] sm:mt-[140px] pt-24 pb-20 bg-gray-50/60 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {t('performance.detail.notFound')}
            </h1>
            <p className="text-gray-600">{t('performance.detail.notFoundDesc')}</p>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const title = i18n.language === 'ko' ? project.title : (project.titleEn || project.title)
  const description = i18n.language === 'ko' ? project.description : (project.descriptionEn || project.description)
  const hasHeroImage = project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://'))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb />

      {/* 히어로 — 대표 이미지 있으면 풀폭 커버, 없으면 그라데이션 헤더 */}
      {hasHeroImage ? (
        <section className="mt-[80px] sm:mt-[140px] relative min-h-[280px] sm:min-h-[340px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={project.icon}
              alt=""
              fill
              className="object-cover"
              unoptimized
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" aria-hidden />
          </div>
          <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pb-10 sm:pb-12">
            <Link
              href="/performance"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4 transition-colors"
            >
              <i className="ri-arrow-left-line" aria-hidden />
              {i18n.language === 'ko' ? '적용 실적 목록' : 'Back to list'}
            </Link>
            <h1 className="text-2xl sm:text-[32px] md:text-[36px] font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-white/90 text-sm sm:text-base max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="mt-[80px] sm:mt-[140px] pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-teal-50/50 via-gray-50/50 to-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Link
              href="/performance"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium mb-6 transition-colors"
            >
              <i className="ri-arrow-left-line" aria-hidden />
              {i18n.language === 'ko' ? '적용 실적 목록' : 'Back to list'}
            </Link>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-4">
              {t('common.nav.performance')}
            </p>
            <div className="border-l-4 border-teal-500 pl-5 sm:pl-6">
              <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
                {title}
              </h1>
              {description && (
                <p className="mt-3 text-[15px] sm:text-base text-gray-600 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 프로젝트 항목 — 그리드 + 호버 강화 */}
      {project.items && project.items.length > 0 ? (
        <section className="py-14 sm:py-20 bg-gray-50/40">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight border-b-2 border-teal-500 pb-2 inline-block">
                {i18n.language === 'ko' ? '프로젝트 항목' : 'Project Items'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {paginatedItems.map((item: PerformanceProjectItem) => {
                const itemTitle = i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)
                const hasPhoto = item.photos && item.photos[0]

                return (
                  <article
                    key={item.id}
                    className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                      {hasPhoto ? (
                        <Image
                          src={item.photos[0]}
                          alt={itemTitle}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23e5e7eb"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <i className="ri-image-line text-4xl" aria-hidden />
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        {itemTitle}
                      </h3>
                    </div>
                  </article>
                )
              })}
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-12 flex items-center justify-center gap-2"
                aria-label={i18n.language === 'ko' ? '페이지 네비게이션' : 'Pagination'}
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {i18n.language === 'ko' ? '이전' : 'Previous'}
                </button>
                <span className="px-4 py-2 text-sm text-gray-500">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {i18n.language === 'ko' ? '다음' : 'Next'}
                </button>
              </nav>
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50/60 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-3 block" aria-hidden />
              <p>{t('performance.detail.noItems')}</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
