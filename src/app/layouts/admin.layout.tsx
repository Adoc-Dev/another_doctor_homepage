'use client'

import { AdminAuthProvider } from '@/src/app/providers/admin-auth-provider'

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout(props: AdminLayoutProps) {
  const { children } = props

  return <AdminAuthProvider>{children}</AdminAuthProvider>
}

export { AdminLayout }
