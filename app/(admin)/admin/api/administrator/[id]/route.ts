import { authOptions } from '@/src/shared/lib/auth'
import prisma from '@/src/shared/lib/db'
import { hash } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (session.user.id !== id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const user = await prisma.administrator.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        createdAt: true,
        updatedAt: true,
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
    console.error(`Error fetching user ${id}:`, error)
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (session.user.id !== id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const body = await req.json()
    const updateData: any = {}

    if (body.name) updateData.name = body.name
    if (body.password) updateData.passwordHash = await hash(body.password, 12)

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '업데이트할 내용이 없습니다.' },
        { status: 400 }
      )
    }

    await prisma.administrator.update({
      where: { id: id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(`Error updating user ${id}:`, error)
    return NextResponse.json(
      { error: '사용자 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    if (session.user.id !== id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const user = await prisma.administrator.findUnique({
      where: { id: id },
    })

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    await prisma.administrator.update({
      where: { id: id },
      data: { active: false },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(`Error deactivating user ${id}:`, error)
    return NextResponse.json(
      { error: '계정 비활성화 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
