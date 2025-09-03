import prisma from '@/src/shared/lib/db'
import { compare } from 'bcryptjs'
import { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      active?: boolean
    } & DefaultSession['user']
  }

  interface User {
    id: string
    email: string
    active?: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.administrator.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            return null
          }

          if (!user.active) {
            return null
          }

          // 비밀번호 확인
          const passwordValid = await compare(
            credentials.password,
            user.passwordHash
          )
          if (!passwordValid) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
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
        session.user.email = token.email as string
        session.user.active = token.active as boolean
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.active = user.active
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8시간
  },
  secret: process.env.NEXTAUTH_SECRET,
}
