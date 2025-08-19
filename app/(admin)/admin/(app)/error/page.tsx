'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  let errorMessage = '로그인 과정에서 오류가 발생했습니다.'

  // 에러 유형에 따른 메시지 설정
  if (error === 'AccessDenied') {
    errorMessage = '관리자 계정만 로그인이 가능합니다.'
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-red-600">
          로그인 오류
        </h1>
        <p className="mb-6 text-center text-gray-700">{errorMessage}</p>
        <div className="flex justify-center">
          <Link
            href="/admin/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
