import { authOptions } from '@/app/(admin)/admin/api/auth/[...nextauth]/route'
import prisma from '@/src/shared/lib/db'
import { hash } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET: 모든 관리자 계정 가져오기
export async function GET(req: NextRequest) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        active: true,
        createdAt: true,
        lastLoginAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: '사용자 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새 관리자 계정 생성
export async function POST(req: NextRequest) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await req.json()

    // 필수 필드 검증
    if (!body.name || !body.username || !body.email || !body.password) {
      return NextResponse.json(
        { error: '모든 필수 정보를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 사용자명 중복 확인
    const existingUsername = await prisma.user.findUnique({
      where: { username: body.username },
    })
    if (existingUsername) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자명입니다.' },
        { status: 400 }
      )
    }

    // 이메일 중복 확인
    const existingEmail = await prisma.user.findUnique({
      where: { email: body.email },
    })
    if (existingEmail) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 해싱
    const passwordHash = await hash(body.password, 12)

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        active: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: '사용자를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
