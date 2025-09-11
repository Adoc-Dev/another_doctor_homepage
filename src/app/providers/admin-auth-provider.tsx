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
    if (status === 'loading') return

    if (!session) {
      router.push('/admin/login')
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
