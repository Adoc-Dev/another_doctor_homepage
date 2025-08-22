// app/api/upload/route.ts (서버 측 API 엔드포인트)
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
console.log('🚀 ~ supabaseUrl:', supabaseUrl)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // 서비스 롤 키 (관리자 권한)
console.log('🚀 ~ supabaseServiceKey:', supabaseServiceKey)

export async function POST(req: NextRequest) {
  // Next-Auth 세션 확인
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: '인증되지 않은 요청' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'default'

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 })
    }

    // 서비스 롤 키를 사용한 Supabase 클라이언트 생성
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 파일 이름 생성
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
    const filePath = `${folder}/${fileName}`

    // 파일 업로드
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, await file.arrayBuffer(), {
        contentType: file.type,
        cacheControl: '3600',
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 공개 URL 반환
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (error) {
    console.error('업로드 오류:', error)
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
