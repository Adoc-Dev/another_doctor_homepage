type NavItemType = {
  type: 'dropdown' | 'link'
  key: string
  translationKey: string
  href?: string
  content?: {
    href: string
    titleKey: string
    descriptionKey: string
    minWidth: string
  }
}

export type { NavItemType }
