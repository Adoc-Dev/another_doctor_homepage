import { Administrator } from '@/src/generated/prisma'
import administratorsApi, {
  CreateAdminData,
  UpdateAdminData,
} from '@/src/shared/api/apis/administrators.api'
import {
  ApiListResponse,
  ApiSuccessResponse,
} from '@/src/shared/api/types/api.types'

export type { CreateAdminData, UpdateAdminData }

export const ADMINISTRATORS_QUERY_KEYS = 'administrators'

class AdministratorsService {
  // 관리자 목록 조회
  async getAdministrators(): Promise<ApiListResponse<Administrator>> {
    try {
      const response = await administratorsApi.getAdministrators()
      return response
    } catch (error) {
      console.error('관리자 서비스 - 목록 조회 오류:', error)
      return { data: [], total: 0 }
    }
  }

  // 특정 ID의 관리자 정보 가져오기
  async getAdministratorById(id: string): Promise<Administrator | null> {
    try {
      const response = await administratorsApi.getAdministratorById(id)
      return response?.data || null
    } catch (error) {
      console.error(`관리자 서비스 - 조회 오류(ID: ${id}):`, error)
      return null
    }
  }

  // 새 관리자 계정 생성
  async createAdministrator(data: CreateAdminData): Promise<{ id: string }> {
    try {
      return await administratorsApi.createAdministrator(data)
    } catch (error) {
      console.error('관리자 서비스 - 생성 오류:', error)
      throw error
    }
  }

  // 관리자 정보 업데이트
  async updateAdministrator(
    id: string,
    data: UpdateAdminData
  ): Promise<ApiSuccessResponse> {
    try {
      return await administratorsApi.updateAdministrator(id, data)
    } catch (error) {
      console.error(`관리자 서비스 - 업데이트 오류(ID: ${id}):`, error)
      throw error
    }
  }

  // 관리자 계정 비활성화 (소프트 삭제)
  async deactivateAdministrator(id: string): Promise<ApiSuccessResponse> {
    try {
      return await administratorsApi.deactivateAdministrator(id)
    } catch (error) {
      console.error(`관리자 서비스 - 비활성화 오류(ID: ${id}):`, error)
      throw error
    }
  }
}

const administratorsService = new AdministratorsService()

export default administratorsService
