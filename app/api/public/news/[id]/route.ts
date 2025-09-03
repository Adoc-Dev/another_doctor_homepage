import prisma from '@/src/shared/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const news = await prisma.news.findFirst({
      where: {
        id: parseInt(id),
        published: true,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        contents: true,
        createdAt: true,
        link: true,
        date: true,
      },
    })

    if (!news) {
      return NextResponse.json(
        { error: '뉴스를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { data: news },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200', // 10분 캐시
        },
      }
    )
  } catch (error) {
    console.error('Error fetching news detail:', error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
