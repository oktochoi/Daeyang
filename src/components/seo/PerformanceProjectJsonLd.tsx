import { fetchPerformanceForMetadata } from '@/lib/seo-data'
import { ProjectJsonLd } from './ProjectJsonLd'

export async function PerformanceProjectJsonLd({ id }: { id: number }) {
  const data = await fetchPerformanceForMetadata(id)
  if (!data) return null
  const path = `/performance/${id}`
  return (
    <ProjectJsonLd
      name={data.title}
      description={data.description || undefined}
      path={path}
      dateCreated={data.created_at}
    />
  )
}
