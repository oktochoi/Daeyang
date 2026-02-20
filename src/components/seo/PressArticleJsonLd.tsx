import { fetchPressForMetadata } from '@/lib/seo-data'
import { ArticleJsonLd } from './JsonLd'

export async function PressArticleJsonLd({ id }: { id: number }) {
  const data = await fetchPressForMetadata(id)
  if (!data) return null
  const path = `/media/press/${id}`
  const publishedTime = data.published_date || data.date
    ? new Date(data.published_date || data.date || '').toISOString()
    : undefined
  const modifiedTime = data.updated_at ? new Date(data.updated_at).toISOString() : undefined
  return (
    <ArticleJsonLd
      title={data.title}
      description={data.summary || data.title}
      path={path}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      image={data.featured_image}
    />
  )
}
