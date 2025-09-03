import { authOptions } from '@/src/shared/lib/auth'
import prisma from '@/src/shared/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const { id } = await params
    const news = await prisma.news.findUnique({
      where: { id: parseInt(id) },
    })

    if (!news) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: news }, { status: 200 })
  } catch (error) {
    console.error('Error fetching admin news detail:', error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()

    const updatedNews = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.contents && { contents: body.contents }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.thumbnail && { thumbnail: body.thumbnail }),
        ...(body.link !== undefined && { link: body.link }),
        ...(body.date && { date: new Date(body.date) }),
      },
    })

    return NextResponse.json(
      { success: true, data: updatedNews },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating admin news:', error)
    return NextResponse.json(
      { error: '뉴스를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const { id } = await params
    await prisma.news.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting admin news:', error)
    return NextResponse.json(
      { error: '뉴스를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
