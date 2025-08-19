import { authOptions } from '@/app/(admin)/admin/api/auth/[...nextauth]/route'
import prisma from '@/src/shared/lib/db'
import { hash } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface UserParams {
  params: {
    id: string
  }
}

// GET: 특정 ID의 사용자 정보 가져오기
export async function GET(_req: NextRequest, { params }: UserParams) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // 자신의 정보만 볼 수 있음
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error(`Error fetching user ${params.id}:`, error)
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 사용자 정보 업데이트
export async function PUT(req: NextRequest, { params }: UserParams) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // 자신의 정보만 수정 가능
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const body = await req.json()
    const updateData: any = {}

    // 이름과 비밀번호만 변경 가능
    if (body.name) updateData.name = body.name
    if (body.password) updateData.passwordHash = await hash(body.password, 12)

    // 업데이트할 내용이 없는 경우
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '업데이트할 내용이 없습니다.' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        active: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ user: updatedUser }, { status: 200 })
  } catch (error) {
    console.error(`Error updating user ${params.id}:`, error)
    return NextResponse.json(
      { error: '사용자 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 계정 비활성화 (소프트 삭제)
export async function DELETE(_req: NextRequest, { params }: UserParams) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // 자신의 계정만 비활성화 가능
    if (session.user.id !== params.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    // 사용자가 있는지 확인
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 계정 비활성화
    await prisma.user.update({
      where: { id: params.id },
      data: { active: false },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`Error deactivating user ${params.id}:`, error)
    return NextResponse.json(
      { error: '계정 비활성화 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
