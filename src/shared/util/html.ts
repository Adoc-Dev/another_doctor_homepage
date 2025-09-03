/**
 * HTML 문자열에서 태그를 제거하고 일반 텍스트로 변환
 */
export function stripHtmlTags(html: string): string {
  // 서버와 클라이언트 모두 동일한 정규식 방식 사용
  return html
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/&nbsp;/g, ' ') // 특수 문자 변환
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&lsquo;/g, "'") // 추가: 왼쪽 작은따옴표
    .replace(/&rsquo;/g, "'") // 추가: 오른쪽 작은따옴표
    .replace(/&ldquo;/g, '"') // 추가: 왼쪽 큰따옴표
    .replace(/&rdquo;/g, '"') // 추가: 오른쪽 큰따옴표
    .trim()
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표 추가
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * HTML 콘텐츠에서 텍스트를 추출하고 지정된 길이로 자름
 */
export function truncateHtmlContent(
  html: string,
  maxLength: number = 100
): string {
  const plainText = stripHtmlTags(html)
  return truncateText(plainText, maxLength)
}
