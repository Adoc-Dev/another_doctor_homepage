import { News } from '@/src/generated/prisma/client'
import {
  ApiListResponse,
  ApiSuccessResponse,
} from '@/src/shared/api/types/api.types'

export const NEWS_QUERY_KEYS = 'news'

class AdminNewsService {
  private getBaseUrl() {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
    return ''
  }

  async getNews(filters?: {
    published?: boolean
  }): Promise<ApiListResponse<News>> {
    try {
      const queryParams = new URLSearchParams()
      if (filters?.published !== undefined) {
        queryParams.append('published', filters.published.toString())
      }

      const queryString = queryParams.toString() ? `?${queryParams}` : ''
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/news${queryString}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AdminNewsService getNews error:', error)
      return { data: [], total: 0 }
    }
  }

  async getNewsById(id: string): Promise<News | null> {
    try {
      if (!id) return null

      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/news/${id}`
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
      console.error(`AdminNewsService getNewsById(${id}) error:`, error)
      return null
    }
  }

  async createNews(
    news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ id: number }> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/news`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AdminNewsService createNews error:', error)
      throw error
    }
  }

  async updateNews(
    id: string,
    news: Partial<News>
  ): Promise<ApiSuccessResponse> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/news/${id}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`AdminNewsService updateNews(${id}) error:`, error)
      throw error
    }
  }

  async deleteNews(id: string): Promise<ApiSuccessResponse> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/news/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`AdminNewsService deleteNews(${id}) error:`, error)
      throw error
    }
  }

  async toggleNewsPublishState(
    id: string,
    currentState: boolean
  ): Promise<ApiSuccessResponse> {
    return this.updateNews(id, { published: !currentState })
  }
}

const adminNewsService = new AdminNewsService()

export default adminNewsService
export { AdminNewsService }
