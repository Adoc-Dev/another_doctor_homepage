/**
 * HTML 문자열에서 태그를 제거하고 일반 텍스트로 변환
 */
export function stripHtmlTags(html: string): string {
  // DOMParser는 브라우저에서만 사용 가능하므로 서버 사이드에서는 정규식 사용
  if (typeof window === 'undefined') {
    return html
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // 특수 문자 변환
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim()
  }

  // 브라우저 환경에서는 DOMParser 사용
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
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
