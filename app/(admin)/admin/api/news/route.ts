import { authOptions } from '@/app/(admin)/admin/api/auth/[...nextauth]/route'
import { prisma } from '@/src/shared/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET: 모든 뉴스 가져오기
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const published = searchParams.get('published')

    const news = await prisma.news.findMany({
      where: published ? { published: published === 'true' } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ news }, { status: 200 })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 새 뉴스 생성
export async function POST(req: NextRequest) {
  try {
    // 인증 확인
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 })
    }

    const body = await req.json()

    // 필수 필드 검증
    if (!body.title || !body.contents) {
      return NextResponse.json(
        { error: '제목과 내용은 필수 항목입니다.' },
        { status: 400 }
      )
    }

    // 뉴스 생성
    const news = await prisma.news.create({
      data: {
        title: body.title,
        contents: body.contents,
        published: body.published ?? false,
        thumbnail: body.thumbnail,
        link: body.link,
        date: body.date ? new Date(body.date) : undefined,
        authorId: session.user.id,
      },
    })

    return NextResponse.json({ news }, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: '뉴스를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
