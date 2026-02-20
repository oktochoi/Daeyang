/**
 * Project JSON-LD for performance/case study pages
 * @see https://schema.org/Project
 */

import { SEO, canonical } from '@/lib/seo'

export interface ProjectJsonLdProps {
  name: string
  description?: string
  path: string
  dateCreated?: string
  location?: string
  image?: string
}

export function ProjectJsonLd({
  name,
  description,
  path,
  dateCreated,
  location,
  image,
}: ProjectJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name,
    ...(description && { description }),
    url: canonical(path),
    ...(dateCreated && { dateCreated }),
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
      },
    }),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${SEO.siteUrl}${image}`,
      },
    }),
    provider: {
      '@type': 'Organization',
      name: SEO.organizationName,
      url: SEO.siteUrl,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
