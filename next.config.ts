import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ovghdkvnzzxptfwpqpuy.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/company/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/company/message',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/company/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:locale(ko|en)/company/about',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(ko|en)/company/message',
        destination: '/:locale/team',
        permanent: true,
      },
      {
        source: '/:locale(ko|en)/company/:path*',
        destination: '/:locale',
        permanent: true,
      },
    ]
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    optimizePackageImports: [
      '@radix-ui/react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      'lucide-react',
      'recharts',
    ],
  },
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      }
    )
    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value:
              '<https://ovghdkvnzzxptfwpqpuy.supabase.co>; rel=preconnect; crossorigin, <https://supabase.co>; rel=preconnect; crossorigin',
          },
        ],
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzerConfig(withNextIntl(nextConfig))
