import adminAdministratorsService, {
  ADMINISTRATORS_QUERY_KEYS,
  CreateAdminData,
  UpdateAdminData,
} from '@/src/shared/api/services/admin-administrators.service'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

// 관리자 목록 프리패치
export function prefetchAdminAdministratorsList(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: [ADMINISTRATORS_QUERY_KEYS, 'list'],
    queryFn: () => adminAdministratorsService.getAdministrators(),
  })
}

// 관리자 목록 쿼리
export function useAdminAdministratorsListQuery() {
  return useQuery({
    queryKey: [ADMINISTRATORS_QUERY_KEYS, 'list'],
    queryFn: () => adminAdministratorsService.getAdministrators(),
  })
}

// 단일 관리자 쿼리
export function useAdminAdministratorDetailQuery(id?: string) {
  return useQuery({
    queryKey: [ADMINISTRATORS_QUERY_KEYS, 'detail', id],
    queryFn: () =>
      id ? adminAdministratorsService.getAdministratorById(id) : null,
    enabled: !!id,
  })
}

// 관리자 생성 뮤테이션
export function useCreateAdminAdministratorMutation(options?: {
  onSuccess?: (data: { id: string }) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAdminData) =>
      adminAdministratorsService.createAdministrator(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ADMINISTRATORS_QUERY_KEYS, 'list'],
      })
      queryClient.invalidateQueries({ queryKey: [ADMINISTRATORS_QUERY_KEYS] })

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
  })
}

// 관리자 업데이트 뮤테이션
export function useUpdateAdminAdministratorMutation(options?: {
  onSuccess?: (id: string) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminData }) =>
      adminAdministratorsService.updateAdministrator(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [ADMINISTRATORS_QUERY_KEYS, 'list'],
      })
      queryClient.invalidateQueries({ queryKey: [ADMINISTRATORS_QUERY_KEYS] })
      queryClient.invalidateQueries({
        queryKey: [ADMINISTRATORS_QUERY_KEYS, 'detail', id],
      })

      if (options?.onSuccess) {
        options.onSuccess(id)
      }
    },
  })
}

// 관리자 비활성화 뮤테이션
export function useDeactivateAdminAdministratorMutation(options?: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      adminAdministratorsService.deactivateAdministrator(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [ADMINISTRATORS_QUERY_KEYS] })
      queryClient.invalidateQueries({
        queryKey: [ADMINISTRATORS_QUERY_KEYS, 'list'],
      })
      queryClient.invalidateQueries({
        queryKey: [ADMINISTRATORS_QUERY_KEYS, 'detail', id],
      })

      if (options?.onSuccess) {
        options.onSuccess()
      }
    },
  })
}
