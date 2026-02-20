import type { Metadata } from 'next'
import { fetchPerformanceForMetadata } from '@/lib/seo-data'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PerformanceProjectJsonLd } from '@/components/seo/PerformanceProjectJsonLd'

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const numId = parseInt(id, 10)
  if (isNaN(numId)) return genMeta({ title: '적용 실적', description: '대양환경기술 적용 실적', path: '/performance' })

  const data = await fetchPerformanceForMetadata(numId)
  if (!data) return genMeta({ title: '적용 실적', description: '대양환경기술 적용 실적', path: '/performance' })

  const title = data.title
  const description = (data.description || data.title).slice(0, 155)
  const path = `/performance/${id}`

  return genMeta({
    title,
    description,
    path,
  })
}

export default async function PerformanceIdLayout({ params, children }: Props) {
  const { id } = await params
  const numId = parseInt(id, 10)
  return (
    <>
      {!isNaN(numId) && <PerformanceProjectJsonLd id={numId} />}
      {children}
    </>
  )
}
