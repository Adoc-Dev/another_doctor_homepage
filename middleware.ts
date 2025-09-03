import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './src/i18n/routing'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // admin 경로는 다국어 처리 제외
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // SEO 관련 파일들은 다국어 처리 제외 ✅ 추가
  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico'
  ) {
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

  if (pathname === '/') {
    const response = createMiddleware({
      ...routing,
      localeDetection: false,
    })(request)

    if (response.headers.get('location')?.includes('/en')) {
      return NextResponse.next()
    }

    return response
  }

  return createMiddleware(routing)(request)
}

export const config = {
  // robots.txt와 sitemap.xml도 matcher에서 제외 ✅ 수정
  matcher: [
    '/((?!api|_next|_static|favicon.ico|robots.txt|sitemap.xml|admin).*)',
  ],
}
