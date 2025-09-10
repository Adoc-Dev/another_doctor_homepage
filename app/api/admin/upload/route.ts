import { authOptions } from '@/src/shared/lib/auth'
import { sanitizeFileName } from '@/src/shared/util/string'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
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

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const sanitizedName = sanitizeFileName(file.name)
    const fileName = `${Date.now()}_${sanitizedName}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, await file.arrayBuffer(), {
        contentType: file.type,
        cacheControl: '3600',
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

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
