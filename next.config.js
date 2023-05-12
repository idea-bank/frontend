/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_ROOT_URL}/:path*`,
      },
      {
        source: '/api/v2/:path*',
        destination: `${process.env.NEXT_PUBLIC_ROOT_URL_V2}/:path*`,
      }
    ]
  }
}

module.exports = nextConfig
