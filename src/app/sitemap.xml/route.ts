import { getSitemapEntries } from '../sitemap'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toIso(date: Date): string {
  return date.toISOString()
}

export async function GET(): Promise<Response> {
  const entries = await getSitemapEntries()
  const urlset = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <lastmod>${toIso(e.lastModified ?? new Date())}</lastmod>` +
        (e.changeFrequency ? `\n    <changefreq>${e.changeFrequency}</changefreq>` : '') +
        (e.priority != null ? `\n    <priority>${e.priority}</priority>` : '') +
        '\n  </url>'
    )
    .join('\n')

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urlset +
    '\n</urlset>'

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
