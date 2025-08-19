'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  username: string
  email: string
  role: 'ADMIN' | 'SUPER_ADMIN'
  active: boolean
  createdAt: string
  lastLoginAt?: string
  creator?: {
    name: string
    username: string
  }
}

export default function UsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/admin/api/users')
      if (!response.ok) {
        throw new Error('사용자 목록을 가져오는데 실패했습니다.')
      }
      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // 슈퍼어드민만 접근 가능
  if (session?.user.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-500">
          접근 권한이 없습니다. 관리자에게 문의하세요.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">관리자 계정 관리</h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          onClick={() => {
            /* 계정 생성 모달 열기 */
          }}
        >
          새 계정 생성
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>관리자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">이름</th>
                  <th className="p-2 text-left">사용자명</th>
                  <th className="p-2 text-left">이메일</th>
                  <th className="p-2 text-left">권한</th>
                  <th className="p-2 text-left">상태</th>
                  <th className="p-2 text-left">생성일</th>
                  <th className="p-2 text-left">마지막 로그인</th>
                  <th className="p-2 text-left">생성자</th>
                  <th className="p-2 text-left">작업</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      {user.role === 'SUPER_ADMIN' ? '슈퍼 관리자' : '관리자'}
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-bold ${
                          user.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.active ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="p-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="p-2">
                      {user.creator ? user.creator.name : '-'}
                    </td>
                    <td className="space-x-2 p-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          /* 편집 모달 열기 */
                        }}
                      >
                        편집
                      </button>
                      {session?.user.id !== user.id && (
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            /* 삭제 확인 모달 열기 */
                          }}
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center">
                      등록된 관리자가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
