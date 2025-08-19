'use client'

import { SessionProvider } from 'next-auth/react'

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout(props: AdminLayoutProps) {
  const { children } = props

  return <SessionProvider>{children}</SessionProvider>
}

export { AdminLayout }
