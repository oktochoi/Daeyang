/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // i18n 설정은 App Router에서는 다른 방식으로 처리
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig

