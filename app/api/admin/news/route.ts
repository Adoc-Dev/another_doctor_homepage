import { authOptions } from '@/src/shared/lib/auth'
import prisma from '@/src/shared/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const published = searchParams.get('published')

    const news = await prisma.news.findMany({
      where: published ? { published: published === 'true' } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      { data: news, total: news.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching admin news:', error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const body = await req.json()

    if (!body.title || !body.contents) {
      return NextResponse.json(
        { error: '제목과 내용은 필수 항목입니다.' },
        { status: 400 }
      )
    }

    const news = await prisma.news.create({
      data: {
        title: body.title,
        contents: body.contents,
        published: body.published ?? false,
        thumbnail: body.thumbnail,
        link: body.link,
        date: body.date ? new Date(body.date) : new Date(),
      },
    })

    return NextResponse.json({ id: news.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating admin news:', error)
    return NextResponse.json(
      { error: '뉴스를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
