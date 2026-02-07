'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Navbar from '../../../components/feature/Navbar'
import Breadcrumb from '../../../components/base/Breadcrumb'
import Footer from '../../../components/feature/Footer'
import { getMediaVideos, MediaVideo } from '@/lib/supabase-media'
import { getVideoEmbedInfo, getVideoThumbnailUrl } from '@/lib/video-embed'

function VideoPlayerModal({
  video,
  onClose,
  closeLabel,
}: {
  video: MediaVideo
  onClose: () => void
  closeLabel: string
}) {
  const info = getVideoEmbedInfo(video.url)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!info) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={closeLabel}
      >
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 text-center">
          <p className="text-gray-600 mb-4">지원하지 않는 영상 URL입니다.</p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={closeLabel}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl overflow-hidden bg-black shadow-2xl transition-all duration-200"
        style={{ aspectRatio: '16/9' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label={closeLabel}
        >
          <i className="ri-close-line text-xl" />
        </button>

        {info.type === 'direct' && info.directSrc ? (
          <video
            key={video.id}
            src={info.directSrc}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <iframe
            key={video.id}
            src={info.embedSrc}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}

export default function MediaVideoPage() {
  const { t, i18n } = useTranslation()
  const [videos, setVideos] = useState<MediaVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openVideo, setOpenVideo] = useState<MediaVideo | null>(null)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
        const data = await getMediaVideos()
        setVideos(data)
      } catch (error) {
        console.error('Error loading media videos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleClose = useCallback(() => setOpenVideo(null), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      {/* Header - 기존 미디어 섹션과 동일 */}
      <section className="mt-[80px] sm:mt-[140px] pt-12 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6">
            {t('media.tabs.video')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('media.video.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('media.video.subtitle')}
          </p>
        </div>
      </section>

      {/* 영상 카드 그리드 - 수상/인증과 동일한 카드 디자인 */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
              <p className="mt-4 text-gray-600">{t('media.video.loading')}</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2" />
              <p>{t('media.video.empty')}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('media.video.sectionTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setOpenVideo(video)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group text-left w-full"
                  >
                    {/* 썸네일: URL에서 자동 추출(YouTube/Vimeo) 또는 기본 배경 */}
                    <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                      {(video.featured_image || getVideoThumbnailUrl(video.url)) ? (
                        <Image
                          src={video.featured_image || getVideoThumbnailUrl(video.url)!}
                          alt={i18n.language === 'ko' ? video.title : (video.title_en || video.title)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200" />
                      )}
                      {/* 영상임을 알 수 있는 재생 아이콘 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                          <i className="ri-play-fill text-violet-600 text-2xl ml-1" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                        {i18n.language === 'ko' ? video.title : (video.title_en || video.title)}
                      </h3>
                      {(video.description || video.description_en) && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {i18n.language === 'ko'
                            ? (video.description || video.description_en)
                            : (video.description_en || video.description)}
                        </p>
                      )}
                      {video.published_date && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <i className="ri-calendar-line" />
                          <span>
                            {new Date(video.published_date).toLocaleDateString(i18n.language === 'ko' ? 'ko-KR' : 'en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1.5 mt-2 text-violet-600 text-sm font-medium">
                        <i className="ri-play-circle-line" />
                        {t('media.video.playLabel')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {openVideo && (
        <VideoPlayerModal
          video={openVideo}
          onClose={handleClose}
          closeLabel={t('media.video.closeLabel')}
        />
      )}

      <Footer />
    </div>
  )
}
