'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  // Google 로그인 처리
  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/admin/dashboard' })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">관리자 로그인</h1>
        <p className="mb-6 text-center text-gray-600">
          관리자 계정으로만 로그인이 가능합니다
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <svg
            className="mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
          >
            <defs>
              <path
                id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              />
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
            <path
              clipPath="url(#b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            />
          </svg>
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  )
}
