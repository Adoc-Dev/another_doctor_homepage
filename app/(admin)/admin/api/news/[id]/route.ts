import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/src/shared/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface NewsParams {
  params: {
    id: string
  }
}

export async function GET(_req: NextRequest, { params }: NewsParams) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const news = await prisma.news.findUnique({
      where: { id },
    })

    if (!news) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ news }, { status: 200 })
  } catch (error) {
    console.error(`Error fetching news ${params.id}:`, error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: NewsParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const body = await req.json()

    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    await prisma.news.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        contents: body.contents !== undefined ? body.contents : undefined,
        published: body.published !== undefined ? body.published : undefined,
        thumbnail: body.thumbnail !== undefined ? body.thumbnail : undefined,
        link: body.link !== undefined ? body.link : undefined,
        date: body.date !== undefined ? new Date(body.date) : undefined,
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(`Error updating news ${params.id}:`, error)
    return NextResponse.json(
      { error: '뉴스를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: NewsParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      )
    }

    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    await prisma.news.delete({
      where: { id },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error(`Error deleting news ${params.id}:`, error)
    return NextResponse.json(
      { error: '뉴스를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
