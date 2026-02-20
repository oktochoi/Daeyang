/**
 * Maps project category/tag to related solution pages for internal linking
 * Extend when new categories or solution pages are added
 */

export interface RelatedSolutionLink {
  href: string
  labelKo: string
  labelEn: string
}

const CATEGORY_MAP: Record<string, RelatedSolutionLink[]> = {
  pilot: [
    { href: '/product/overview', labelKo: '제품 개요', labelEn: 'Product Overview' },
    { href: '/product/technical', labelKo: '기술자료', labelEn: 'Technical' },
  ],
  mongolia: [
    { href: '/product/application', labelKo: '적용 분야', labelEn: 'Application' },
    { href: '/product/overview', labelKo: '제품 개요', labelEn: 'Product Overview' },
  ],
  seasia: [
    { href: '/product/application', labelKo: '적용 분야', labelEn: 'Application' },
    { href: '/product/overview', labelKo: '제품 개요', labelEn: 'Product Overview' },
  ],
}

const DEFAULT_LINKS: RelatedSolutionLink[] = [
  { href: '/product/overview', labelKo: '제품 개요', labelEn: 'Product Overview' },
  { href: '/product/application', labelKo: '적용 분야', labelEn: 'Application' },
  { href: '/product/technical', labelKo: '기술자료', labelEn: 'Technical' },
]

export function getRelatedSolutions(category?: string | null): RelatedSolutionLink[] {
  if (category && CATEGORY_MAP[category]) {
    return CATEGORY_MAP[category]
  }
  return DEFAULT_LINKS
}
