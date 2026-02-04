/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/love-tarot' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/love-tarot/' : '',
}

module.exports = nextConfig
