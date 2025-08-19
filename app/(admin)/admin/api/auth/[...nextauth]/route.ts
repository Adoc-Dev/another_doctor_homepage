import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth/next'
import Google from 'next-auth/providers/google'

import prisma from '@/src/shared/lib/db'
import { DefaultSession, NextAuthOptions } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: 'USER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User {
    role?: 'USER' | 'ADMIN'
  }
}

// 관리자 이메일 목록
const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
      // 사용자 이메일이 정의된 관리자 목록에 있는지 확인
      return !!user.email && adminEmails.includes(user.email)
    },
    async session({ session, token }) {
      // JWT 전략에서는 token에서 정보를 가져옴
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'USER' | 'ADMIN'
      }
      return session
    },
    async jwt({ token, user }) {
      // 초기 로그인 시 user 객체가 있음
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  events: {
    async createUser({
      user,
    }: {
      user: { id: string; email?: string | null }
    }) {
      // 관리자 이메일인 경우 역할 설정
      if (user.email && adminEmails.includes(user.email)) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' },
        })
      }
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
