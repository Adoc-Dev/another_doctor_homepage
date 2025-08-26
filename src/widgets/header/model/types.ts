type NavItemType = {
  type: 'dropdown' | 'link'
  key: string
  translationKey: string
  href?: string
  contents?: {
    href: string
    titleKey: string
    descriptionKey: string
  }[]
}

export type { NavItemType }
