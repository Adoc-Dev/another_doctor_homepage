import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/src/shared/lib/db'
import { hash } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const users = await prisma.administrator.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(
      { data: users, total: users.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: '사용자 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await req.json()

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: '모든 필수 정보를 입력해주세요.' },
        { status: 400 }
      )
    }

    const existingEmail = await prisma.administrator.findUnique({
      where: { email: body.email },
    })
    if (existingEmail) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      )
    }

    const passwordHash = await hash(body.password, 12)

    const user = await prisma.administrator.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ id: user.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: '사용자를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
