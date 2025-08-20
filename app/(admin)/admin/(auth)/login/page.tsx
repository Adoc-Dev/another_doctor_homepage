'use client'

import { LoginForm } from '@/src/features/auth/ui'
import { BlurFade } from '@/src/shared/ui'

function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gray-50 p-6 md:p-10 dark:bg-gray-900">
      <div className="w-full max-w-sm md:max-w-md">
        <BlurFade>
          <LoginForm />
        </BlurFade>
      </div>
    </div>
  )
}

export default LoginPage
