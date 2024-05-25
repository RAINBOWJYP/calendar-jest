/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['default', 'en', 'ko', 'en-US'],
        defaultLocale: 'default',
        localeDetection: false,
    },
    trailingSlash: false,
}

export default nextConfig
