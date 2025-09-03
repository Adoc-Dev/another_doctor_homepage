'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthSessionProviderProps {
  children: React.ReactNode
}

function AuthSessionProvider(props: AuthSessionProviderProps) {
  const { children } = props

  return <SessionProvider>{children}</SessionProvider>
}

export { AuthSessionProvider }
