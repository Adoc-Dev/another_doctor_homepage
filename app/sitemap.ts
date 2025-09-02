import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.anotherdoctor.org'
  const staticRoutes = ['', '/newsroom', '/support', '/team']

  const routes: MetadataRoute.Sitemap = []

  staticRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/newsroom' ? 'daily' : 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          ko: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    })
  })

  staticRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/newsroom' ? 'daily' : 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          ko: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    })
  })

  return routes
}
