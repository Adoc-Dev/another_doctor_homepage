const MENU_SECTIONS = [
  { id: 'hero', section: 'home', label: '홈' },
  { id: 'product', section: 'product', label: '제품' },
  { id: 'news', section: 'news', label: '뉴스' },
  { id: 'contact', section: 'contact', label: '문의' },
] as const

const SECTION_CONFIGS = [
  { id: 'hero', section: 'home' },
  { id: 'vision', section: 'home' },
  { id: 'cooperation', section: 'home' },
  { id: 'mission', section: 'home' },
  { id: 'product', section: 'product' },
  { id: 'news', section: 'news' },
  { id: 'contact', section: 'contact' },
] as const

export { MENU_SECTIONS, SECTION_CONFIGS }
