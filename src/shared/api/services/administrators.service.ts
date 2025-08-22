import administratorsApi, {
  AdminListResponse,
  AdminResponse,
  AdminSuccessResponse,
  CreateAdminData,
  UpdateAdminData,
} from '@/src/shared/api/apis/administrators.api'

export type {
  AdminListResponse,
  AdminResponse,
  AdminSuccessResponse,
  CreateAdminData,
  UpdateAdminData,
}

export const ADMINISTRATORS_QUERY_KEYS = 'administrators'

class AdministratorsService {
  // 관리자 목록 조회
  async getAdministrators(): Promise<AdminListResponse> {
    try {
      return await administratorsApi.getAdministrators()
    } catch (error) {
      console.error('관리자 서비스 - 목록 조회 오류:', error)
      throw error
    }
  }

  // 특정 ID의 관리자 정보 가져오기
  async getAdministratorById(id: string): Promise<AdminResponse> {
    try {
      return await administratorsApi.getAdministratorById(id)
    } catch (error) {
      console.error(`관리자 서비스 - 조회 오류(ID: ${id}):`, error)
      throw error
    }
  }

  // 새 관리자 계정 생성
  async createAdministrator(data: CreateAdminData): Promise<AdminResponse> {
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
  ): Promise<AdminResponse> {
    try {
      return await administratorsApi.updateAdministrator(id, data)
    } catch (error) {
      console.error(`관리자 서비스 - 업데이트 오류(ID: ${id}):`, error)
      throw error
    }
  }

  // 관리자 계정 비활성화 (소프트 삭제)
  async deactivateAdministrator(id: string): Promise<AdminSuccessResponse> {
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
