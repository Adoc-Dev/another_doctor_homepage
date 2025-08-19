'use client'

import { NavItem } from '@/src/entities/header/ui'
import { Link } from '@/src/i18n/navigation'
import { cn } from '@/src/shared/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/src/shared/ui'
import { GlobalButton } from '@/src/widgets/feature/global/ui'
import { navItems } from '@/src/widgets/header/model/constants'
import { NavItemType } from '@/src/widgets/header/model/types'
import { AnimatedThemeToggler } from '@/src/widgets/header/ui/animated-theme-toggler'
import { Logo } from '@/src/widgets/header/ui/header-logo'
import { MobileNavigationMenu } from '@/src/widgets/header/ui/mobile-navigation-menu'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const TRIGGER_CLASS =
  'text-body-01 bg-transparent font-semibold hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:text-foreground data-[state=open]:text-foreground'

const MENU_LINK_CLASS =
  'text-body-01 bg-transparent px-4 font-semibold hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:hover:text-foreground data-[state=open]:text-foreground hover:text-foreground focus:text-foreground'

const MENU_CONTENT_CLASS =
  'w-full border-none p-0 data-[state=open]:bg-background/80 data-[state=open]:text-foreground data-[state=open]:backdrop-blur-xl'

function HeaderNavigation() {
  const t = useTranslations('header')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderDropdownMenuItem = (item: NavItemType) => {
    if (item.type !== 'dropdown' || !item.content) return null

    return (
      <NavigationMenuItem key={item.key}>
        <NavigationMenuTrigger className={TRIGGER_CLASS}>
          {t(item.translationKey)}
        </NavigationMenuTrigger>
        <NavigationMenuContent
          className={cn(MENU_CONTENT_CLASS, `min-w-[${item.content.minWidth}]`)}
        >
          <ul className="flex flex-col gap-2 rounded-xl p-2 backdrop-blur-xl">
            <NavItem
              href={item.content.href}
              title={t(item.content.titleKey)}
              description={t(item.content.descriptionKey)}
            />
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  const renderLinkMenuItem = (item: NavItemType) => {
    if (item.type !== 'link' || !item.href) return null

    return (
      <NavigationMenuItem key={item.key}>
        <NavigationMenuLink asChild className={MENU_LINK_CLASS}>
          <Link href={item.href}>{t(item.translationKey)}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <nav className="border-foreground/10 fixed top-2 z-50 flex w-full items-center justify-center">
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-xl border-gray-200 px-4 py-3 transition-all duration-300 dark:border-gray-800',
          isScrolled &&
            'bg-background/80 w-xs border backdrop-blur-sm sm:w-md xl:w-lg'
        )}
      >
        <Logo />

        <div className="hidden sm:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.type === 'dropdown'
                  ? renderDropdownMenuItem(item)
                  : renderLinkMenuItem(item)
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <GlobalButton />
          <AnimatedThemeToggler />
          <MobileNavigationMenu />
        </div>
      </div>
    </nav>
  )
}

export { HeaderNavigation }
