import { News } from '@/src/generated/prisma/client'
import {
  ApiListResponse,
  ApiSuccessResponse,
} from '@/src/shared/api/types/api.types'

const BASE_URL = '/admin/api/news'

const newsApi = {
  getNews: async (filters?: {
    published?: boolean
  }): Promise<ApiListResponse<News>> => {
    const queryParams = new URLSearchParams()
    if (filters?.published !== undefined) {
      queryParams.append('published', filters.published.toString())
    }

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : ''
    const response = await fetch(`${BASE_URL}${queryString}`)

    if (!response.ok) {
      throw new Error(
        `뉴스를 가져오는 중 오류가 발생했습니다. (${response.status})`
      )
    }

    const data = await response.json()
    return data
  },

  getNewsById: async (id: string): Promise<News | null> => {
    if (!id) return null

    const response = await fetch(`${BASE_URL}/${id}`)

    if (!response.ok) {
      throw new Error(
        `뉴스를 가져오는 중 오류가 발생했습니다. (${response.status})`
      )
    }

    const data = await response.json()
    return data.news
  },

  createNews: async (
    news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ id: number }> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.error ||
          `뉴스를 생성하는 중 오류가 발생했습니다. (${response.status})`
      )
    }

    const data = await response.json()
    return data
  },

  updateNews: async (
    id: string,
    news: Partial<News>
  ): Promise<ApiSuccessResponse> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.error ||
          `뉴스를 업데이트하는 중 오류가 발생했습니다. (${response.status})`
      )
    }

    const data = await response.json()
    return data
  },

  deleteNews: async (id: string): Promise<ApiSuccessResponse> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        error.error ||
          `뉴스를 삭제하는 중 오류가 발생했습니다. (${response.status})`
      )
    }

    const data = await response.json()
    return data
  },
}

export { newsApi }
