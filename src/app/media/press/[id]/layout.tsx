import type { Metadata } from 'next'
import { fetchPressForMetadata } from '@/lib/seo-data'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PressArticleJsonLd } from '@/components/seo/PressArticleJsonLd'

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const numId = parseInt(id, 10)
  if (isNaN(numId)) return genMeta({ title: '보도자료', description: '대양환경기술 보도자료', path: '/media/press' })

  const data = await fetchPressForMetadata(numId)
  if (!data) return genMeta({ title: '보도자료', description: '대양환경기술 보도자료', path: '/media/press' })

  const title = data.title
  const description = (data.summary || data.title).slice(0, 155)
  const path = `/media/press/${id}`
  const publishedTime = data.published_date || data.date
    ? new Date(data.published_date || data.date || '').toISOString()
    : undefined
  const modifiedTime = data.updated_at ? new Date(data.updated_at).toISOString() : undefined

  return genMeta({
    title,
    description,
    path,
    image: data.featured_image,
    type: 'article',
    publishedTime,
  })
}

export default async function PressIdLayout({ params, children }: Props) {
  const { id } = await params
  const numId = parseInt(id, 10)
  return (
    <>
      {!isNaN(numId) && <PressArticleJsonLd id={numId} />}
      {children}
    </>
  )
}
