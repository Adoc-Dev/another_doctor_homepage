import { News } from '@/src/generated/prisma/client'
import { newsApi } from '@/src/shared/api/apis/news.api'

class NewsService {
  async getNews(filters?: { published?: boolean }) {
    try {
      return await newsApi.getNews(filters)
    } catch (error) {
      console.error('NewsService getNews error:', error)
      throw error
    }
  }

  async getNewsById(id: string) {
    try {
      return await newsApi.getNewsById(id)
    } catch (error) {
      console.error(`NewsService getNewsById(${id}) error:`, error)
      throw error
    }
  }

  async createNews(news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      return await newsApi.createNews(news)
    } catch (error) {
      console.error('NewsService createNews error:', error)
      throw error
    }
  }

  async updateNews(id: string, news: Partial<News>) {
    try {
      return await newsApi.updateNews(id, news)
    } catch (error) {
      console.error(`NewsService updateNews(${id}) error:`, error)
      throw error
    }
  }

  async deleteNews(id: string) {
    try {
      return await newsApi.deleteNews(id)
    } catch (error) {
      console.error(`NewsService deleteNews(${id}) error:`, error)
      throw error
    }
  }

  async toggleNewsPublishState(id: string, currentState: boolean) {
    return this.updateNews(id, { published: !currentState })
  }
}

// 싱글톤 패턴으로 서비스 인스턴스 생성
const newsService = new NewsService()

export default newsService
