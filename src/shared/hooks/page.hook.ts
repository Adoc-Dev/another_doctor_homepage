'use client'

import { useDebounce } from '@/src/shared/hooks/debounce.hook'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function usePageFilters(
  excludeKeys = ['modalAction', 'id'],
  debounceTime = 300
) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => {
    const params: Record<string, any> = {}
    searchParams.forEach((value, key) => {
      if (/^\d+$/.test(value)) {
        params[key] = parseInt(value)
      } else {
        params[key] = value
      }
    })
    return params
  }, [searchParams])

  const navigate = useCallback(
    (partialFilters: Record<string, any> & { to?: string }) => {
      // to 파라미터가 있으면 직접 해당 경로로 이동
      if (partialFilters.to) {
        const { to, ...restFilters } = partialFilters

        // 추가 필터가 있는 경우 쿼리스트링 구성
        if (Object.keys(restFilters).length > 0) {
          const newParams = new URLSearchParams()

          Object.entries(restFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
              newParams.set(key, String(value))
            }
          })

          const queryString = newParams.toString()
          router.push(`${to}${queryString ? `?${queryString}` : ''}`)
        } else {
          // 추가 필터 없이 경로만 이동
          router.push(to)
        }
        return
      }

      // 기존 로직 (현재 경로에서 쿼리 파라미터만 변경)
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(partialFilters).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })

      router.push(`${pathname}?${newParams.toString()}`)
    },
    [pathname, router, searchParams]
  )

  const debouncedNavigate = useDebounce(navigate, debounceTime)

  const pagination = useMemo(
    () => ({
      pageIndex: (filters.page || 1) - 1,
      pageSize: filters.pageSize || 20,
    }),
    [filters]
  )

  const sorting = useMemo(() => {
    if (!filters.sort) return []
    return [
      {
        id: filters.sort,
        desc: filters.order === 'DESC',
      },
    ]
  }, [filters])

  return {
    filters,
    navigate,
    debouncedNavigate,
    pagination,
    sorting,
  }
}
