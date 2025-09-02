import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './src/i18n/routing'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // admin 경로는 다국어 처리 제외
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // 정적 파일들은 다국어 처리 제외
  if (
    pathname.startsWith('/images/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/js/') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js')
  ) {
    return NextResponse.next()
  }

  // 기본 언어를 강제로 한국어로 설정
  if (pathname === '/') {
    const response = createMiddleware({
      ...routing,
      // 언어 감지를 비활성화하고 기본 언어 사용
      localeDetection: false,
    })(request)

    // 만약 /en으로 리다이렉트되려고 한다면 차단
    if (response.headers.get('location')?.includes('/en')) {
      return NextResponse.next()
    }

    return response
  }

  return createMiddleware(routing)(request)
}

export const config = {
  matcher: ['/((?!api|_next|_static|favicon.ico|admin).*)'],
}
