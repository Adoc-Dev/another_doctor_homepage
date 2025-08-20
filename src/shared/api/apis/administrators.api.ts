import { Administrator } from '@/src/generated/prisma'

export interface AdminListResponse {
  users: Administrator[]
}

export interface AdminResponse {
  user: Administrator
}

export interface AdminSuccessResponse {
  success: boolean
}

export interface CreateAdminData {
  name: string
  email: string
  password: string
}

export interface UpdateAdminData {
  name?: string
  password?: string
}

const administratorsApi = {
  // 모든 관리자 목록 조회
  getAdministrators: async (): Promise<AdminListResponse> => {
    try {
      const response = await fetch('/admin/api/administrator')
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '관리자 목록을 가져오는데 실패했습니다')
      }
      return response.json()
    } catch (error) {
      console.error('관리자 목록 조회 오류:', error)
      throw error
    }
  },

  // 특정 관리자 정보 조회
  getAdministratorById: async (id: string): Promise<AdminResponse> => {
    try {
      const response = await fetch(`/admin/api/administrator/${id}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '관리자 정보를 가져오는데 실패했습니다')
      }
      return response.json()
    } catch (error) {
      console.error(`관리자 정보 조회 오류(ID: ${id}):`, error)
      throw error
    }
  },

  // 새 관리자 생성
  createAdministrator: async (
    data: CreateAdminData
  ): Promise<AdminResponse> => {
    try {
      const response = await fetch('/admin/api/administrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '관리자 생성에 실패했습니다')
      }
      return response.json()
    } catch (error) {
      console.error('관리자 생성 오류:', error)
      throw error
    }
  },

  // 관리자 정보 업데이트
  updateAdministrator: async (
    id: string,
    data: UpdateAdminData
  ): Promise<AdminResponse> => {
    try {
      const response = await fetch(`/admin/api/administrator/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '관리자 정보 업데이트에 실패했습니다')
      }
      return response.json()
    } catch (error) {
      console.error(`관리자 정보 업데이트 오류(ID: ${id}):`, error)
      throw error
    }
  },

  // 관리자 계정 비활성화 (소프트 삭제)
  deactivateAdministrator: async (
    id: string
  ): Promise<AdminSuccessResponse> => {
    try {
      const response = await fetch(`/admin/api/administrator/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '관리자 계정 비활성화에 실패했습니다')
      }
      return response.json()
    } catch (error) {
      console.error(`관리자 계정 비활성화 오류(ID: ${id}):`, error)
      throw error
    }
  },
}

export default administratorsApi
