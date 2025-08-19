import { routing } from '@/src/i18n/routing'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
