import { News } from '@/src/generated/prisma/client'
import { newsApi } from '@/src/shared/api/apis/news.api'
import {
  ApiListResponse,
  ApiSuccessResponse,
} from '@/src/shared/api/types/api.types'

export const NEWS_QUERY_KEYS = 'news'

class NewsService {
  async getNews(filters?: {
    published?: boolean
  }): Promise<ApiListResponse<News>> {
    try {
      const response = await newsApi.getNews(filters)
      return response
    } catch (error) {
      console.error('NewsService getNews error:', error)
      return { data: [], total: 0 }
    }
  }

  async getNewsById(id: string): Promise<News | null> {
    try {
      const response = await newsApi.getNewsById(id)
      return response || null
    } catch (error) {
      console.error(`NewsService getNewsById(${id}) error:`, error)
      return null
    }
  }

  async createNews(
    news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ id: number }> {
    try {
      return await newsApi.createNews(news)
    } catch (error) {
      console.error('NewsService createNews error:', error)
      throw error
    }
  }

  async updateNews(
    id: string,
    news: Partial<News>
  ): Promise<ApiSuccessResponse> {
    try {
      return await newsApi.updateNews(id, news)
    } catch (error) {
      console.error(`NewsService updateNews(${id}) error:`, error)
      throw error
    }
  }

  async deleteNews(id: string): Promise<ApiSuccessResponse> {
    try {
      return await newsApi.deleteNews(id)
    } catch (error) {
      console.error(`NewsService deleteNews(${id}) error:`, error)
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

const newsService = new NewsService()

export default newsService
