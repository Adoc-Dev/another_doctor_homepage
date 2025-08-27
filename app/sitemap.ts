import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anotherdoctor.co.kr'

  // 기본 페이지들
  const staticRoutes = [
    '',
    '/company/about',
    '/company/message',
    '/newsroom',
    '/support',
  ]

  // 언어별 사이트맵 생성
  const locales = ['ko', 'en']
  const routes: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/newsroom' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route === '/company/about' ? 0.9 : 0.8,
        alternates: {
          languages: {
            ko: `${baseUrl}/ko${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      })
    })
  })

  return routes
}
