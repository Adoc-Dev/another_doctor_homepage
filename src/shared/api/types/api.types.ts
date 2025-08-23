// src/shared/types/api.ts
export interface ApiListResponse<T> {
  data: T[]
  total: number
}

export interface ApiItemResponse<T> {
  data: T
}

export interface ApiErrorResponse {
  error: string
}

export interface ApiSuccessResponse {
  status: number
}
