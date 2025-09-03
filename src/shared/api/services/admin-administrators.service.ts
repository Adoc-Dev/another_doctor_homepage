import { Administrator } from '@/src/generated/prisma'
import {
  ApiListResponse,
  ApiSuccessResponse,
} from '@/src/shared/api/types/api.types'

interface CreateAdminData {
  name: string
  email: string
  password: string
}

interface UpdateAdminData {
  name?: string
  password?: string
}

export const ADMINISTRATORS_QUERY_KEYS = 'administrators'

class AdminAdministratorsService {
  private getBaseUrl() {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
    return ''
  }

  // 관리자 목록 조회
  async getAdministrators(): Promise<ApiListResponse<Administrator>> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/administrator`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(
        'AdminAdministratorsService getAdministrators error:',
        error
      )
      return { data: [], total: 0 }
    }
  }

  // 특정 ID의 관리자 정보 가져오기
  async getAdministratorById(id: string): Promise<Administrator | null> {
    try {
      if (!id) return null

      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/administrator/${id}`
      const response = await fetch(url)

      if (response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      return result.user
    } catch (error) {
      console.error(
        `AdminAdministratorsService getAdministratorById(${id}) error:`,
        error
      )
      return null
    }
  }

  // 새 관리자 계정 생성
  async createAdministrator(data: CreateAdminData): Promise<{ id: string }> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/administrator`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(
        'AdminAdministratorsService createAdministrator error:',
        error
      )
      throw error
    }
  }

  // 관리자 정보 업데이트
  async updateAdministrator(
    id: string,
    data: UpdateAdminData
  ): Promise<ApiSuccessResponse> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/administrator/${id}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(
        `AdminAdministratorsService updateAdministrator(${id}) error:`,
        error
      )
      throw error
    }
  }

  // 관리자 계정 비활성화 (소프트 삭제)
  async deactivateAdministrator(id: string): Promise<ApiSuccessResponse> {
    try {
      const baseUrl = this.getBaseUrl()
      const url = `${baseUrl}/api/admin/administrator/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(
        `AdminAdministratorsService deactivateAdministrator(${id}) error:`,
        error
      )
      throw error
    }
  }
}

const adminAdministratorsService = new AdminAdministratorsService()

export default adminAdministratorsService
export { AdminAdministratorsService }
export type { CreateAdminData, UpdateAdminData }
