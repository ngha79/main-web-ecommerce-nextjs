/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn4.vectorstock.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  },
}

export default nextConfig
