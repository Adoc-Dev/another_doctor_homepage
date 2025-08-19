import prisma from '@/src/shared/lib/db'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

// 초기 관리자 계정 생성용 API
// 프로덕션 환경에서는 최초 설정 후 비활성화해야 함
export async function POST(req: NextRequest) {
  try {
    // 환경 변수로 보호된 비밀 키 확인
    const { secret, username, password, name, email } = await req.json()

    if (!secret || secret !== process.env.SETUP_SECRET_KEY) {
      return NextResponse.json({ error: '잘못된 접근입니다.' }, { status: 403 })
    }

    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { error: '모든 필수 정보를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 기존 사용자가 있는지 확인
    const existingUser = await prisma.user.findFirst()

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            '이미 관리자 계정이 존재합니다. 초기 설정은 한 번만 가능합니다.',
        },
        { status: 400 }
      )
    }

    // 사용자명과 이메일 중복 확인
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    })
    if (existingUsername) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자명입니다.' },
        { status: 400 }
      )
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (existingEmail) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 해싱
    const passwordHash = await hash(password, 12)

    // 초기 관리자 생성
    const admin = await prisma.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message:
          '관리자가 성공적으로 생성되었습니다. 이제 로그인할 수 있습니다.',
        user: {
          id: admin.id,
          name: admin.name,
          username: admin.username,
          email: admin.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating initial admin:', error)
    return NextResponse.json(
      { error: '관리자 계정을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
