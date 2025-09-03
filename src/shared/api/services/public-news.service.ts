import { News } from '@/src/generated/prisma/client'

interface PublicNews extends Omit<News, 'published' | 'updatedAt'> {}

interface ApiListResponse<T> {
  data: T[]
  total: number
}

class PublicNewsService {
  private getBaseUrl() {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
    return ''
  }

  async getPublishedNews(params?: {
    limit?: number
    offset?: number
  }): Promise<ApiListResponse<PublicNews>> {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.offset) queryParams.append('offset', params.offset.toString())

      const queryString = queryParams.toString() ? `?${queryParams}` : ''
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/public/news${queryString}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('PublicNewsService getPublishedNews error:', error)
      return { data: [], total: 0 }
    }
  }

  async getPublishedNewsById(id: string | number): Promise<PublicNews | null> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/public/news/${id}`
      const response = await fetch(url)

      if (response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error(
        `PublicNewsService getPublishedNewsById(${id}) error:`,
        error
      )
      return null
    }
  }
}

export const publicNewsService = new PublicNewsService()
export type { PublicNews }
