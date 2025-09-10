'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AdminAuthProviderProps {
  children: React.ReactNode
}

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // 로딩 중이면 대기

    if (!session) {
      router.push('/admin/login') // 로그인되지 않았으면 로그인 페이지로
      return
    }
  }, [session, status, router])

  return <>{children}</>
}

function AdminAuthProvider(props: AdminAuthProviderProps) {
  const { children } = props

  return (
    <SessionProvider>
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </SessionProvider>
  )
}

export { AdminAuthProvider }
