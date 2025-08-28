const fs = require('fs')
const path = require('path')

const environment = process.argv[2] || 'development'
const tempFile = '.env.temp'
const outputFile = environment === 'direct' ? '.env' : `.env.${environment}`

// 허용할 환경변수 접두사들
const allowedPrefixes = [
  'NEXT_',
  'NEXTAUTH_',
  'SUPABASE_',
  'DATABASE_',
  'DIRECT_',
  'GOOGLE_',
  'PRISMA_',
  'VERCEL_URL',
  'AUTH_',
]

// 특정 환경변수 이름들
const allowedVariables = ['NODE_ENV', 'PORT']

function filterEnvFile() {
  if (!fs.existsSync(tempFile)) {
    console.error(`❌ File ${tempFile} not found`)
    process.exit(1)
  }

  const content = fs.readFileSync(tempFile, 'utf8')
  const lines = content.split('\n')

  const filteredLines = lines.filter((line) => {
    const trimmedLine = line.trim()

    // 빈 줄과 주석은 유지
    if (trimmedLine === '' || trimmedLine.startsWith('#')) {
      return true
    }

    const [key] = line.split('=')
    if (!key || !key.trim()) return false

    const cleanKey = key.trim()

    // 허용된 접두사나 특정 변수명인지 확인
    return (
      allowedPrefixes.some((prefix) => cleanKey.startsWith(prefix)) ||
      allowedVariables.includes(cleanKey)
    )
  })

  // 필터링된 내용 저장
  const filteredContent = filteredLines.join('\n')
  fs.writeFileSync(outputFile, filteredContent)

  // 임시 파일 삭제
  fs.unlinkSync(tempFile)

  const validVariables = filteredLines.filter(
    (l) => l.includes('=') && !l.trim().startsWith('#')
  )

  console.log(`✅ Filtered environment variables for ${environment}`)
  console.log(`📊 Kept ${validVariables.length} variables in ${outputFile}`)
  console.log(`🗑️  Removed system variables (NX_DAEMON, npm_*, etc.)`)
}

// 메인 실행
try {
  filterEnvFile()
} catch (error) {
  console.error('❌ Error filtering environment variables:', error.message)
  process.exit(1)
}
