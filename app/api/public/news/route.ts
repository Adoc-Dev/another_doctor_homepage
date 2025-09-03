import prisma from '@/src/shared/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const offset = parseInt(searchParams.get('offset') ?? '0')

    const news = await prisma.news.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        thumbnail: true,
        contents: true,
        createdAt: true,
        date: true,
        link: true,
      },
    })

    const total = await prisma.news.count({
      where: {
        published: true,
      },
    })

    return NextResponse.json(
      { data: news, total },
      {
        status: 200,
        headers: {
          'Cache-Control': 'max-age=300, stale-while-revalidate=60',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: '뉴스를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
