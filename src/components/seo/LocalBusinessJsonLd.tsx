/**
 * LocalBusiness JSON-LD for Local SEO
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */

import { SEO, canonical } from '@/lib/seo'

const LOCAL_BUSINESS = {
  name: SEO.organizationName,
  telephone: '+82-2-2619-2451',
  email: 'info@daeyangenv.com',
  address: {
    streetAddress: '디지털로33길 11, 에이스테크노타워8차 308호',
    addressLocality: '구로구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  areaServed: 'KR',
  sameAs: [] as string[],
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: LOCAL_BUSINESS.name,
    url: canonical('/'),
    logo: `${SEO.siteUrl}/logo.png`,
    telephone: LOCAL_BUSINESS.telephone,
    email: LOCAL_BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LOCAL_BUSINESS.address.streetAddress,
      addressLocality: LOCAL_BUSINESS.address.addressLocality,
      addressRegion: LOCAL_BUSINESS.address.addressRegion,
      addressCountry: LOCAL_BUSINESS.address.addressCountry,
    },
    areaServed: {
      '@type': 'Country',
      name: LOCAL_BUSINESS.areaServed,
    },
    ...(LOCAL_BUSINESS.sameAs.length > 0 && { sameAs: LOCAL_BUSINESS.sameAs }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
