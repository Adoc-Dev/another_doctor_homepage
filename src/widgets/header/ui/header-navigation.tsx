'use client'

import LogoHorizontal from '@/public/icons/logo-horizontal.svg'
import { GlobalButton } from '@/src/features/global/ui'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarLogo,
} from '@/src/shared/ui'
import { navItems } from '@/src/widgets/header/model/constants'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

export function HeaderNavigation() {
  const t = useTranslations('header')

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="fixed top-0 right-0 left-0 z-[99] w-full">
      <Navbar>
        <NavBody className="rounded-xl">
          <NavbarLogo />
          <NavItems
            items={navItems.map((item) => ({
              name: t(item.translationKey),
              link: item.href ?? '',
            }))}
          />
          <div className="flex items-center gap-4">
            <GlobalButton />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Link href="/">
              <LogoHorizontal className="h-3" />
            </Link>
            <div className="flex items-center gap-4">
              <GlobalButton />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{t(item.translationKey)}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
