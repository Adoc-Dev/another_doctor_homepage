import { compare } from 'bcryptjs'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/src/shared/lib/db'
import { DefaultSession, NextAuthOptions } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username?: string
      active?: boolean
    } & DefaultSession['user']
  }

  interface User {
    id: string
    username?: string
    active?: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '사용자명', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // username으로만 찾고, active 체크는 따로 함
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          })
          console.log('🚀 ~ authorize ~ user:', user)

          // 사용자가 없는 경우
          if (!user) {
            console.log('사용자를 찾을 수 없음')
            return null
          }

          // 비활성 계정 체크
          if (!user.active) {
            console.log('비활성화된 계정')
            return null
          }

          // 비밀번호 확인
          const passwordValid = await compare(
            credentials.password,
            user.passwordHash
          )
          if (!passwordValid) {
            console.log('비밀번호 불일치')
            return null
          }

          // 성공 시 사용자 정보 반환
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            active: user.active,
          }
        } catch (error) {
          console.error('인증 중 오류 발생:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.active = token.active as boolean
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.active = user.active
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    // error: '/admin/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
