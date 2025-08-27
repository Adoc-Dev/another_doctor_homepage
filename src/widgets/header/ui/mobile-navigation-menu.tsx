import LogoIcon from '@/public/logo.svg'
import { usePathname } from '@/src/i18n/navigation'
import { cn } from '@/src/shared/lib/utils'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui'
import { navItems } from '@/src/widgets/header/model/constants'
import { MenuIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function MobileNavigationMenu() {
  const t = useTranslations('header')
  const pathname = usePathname()

  const isActive = (href: string) => {
    // 정확한 경로 일치
    if (pathname === href) return true

    // 서브 경로 일치 (예: /company/about이 /company로 시작하는지)
    if (href !== '/' && pathname.startsWith(href)) return true

    return false
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="flex min-h-0 rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 sm:hidden dark:border-gray-800"
        >
          <MenuIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        showHandle={false}
        className="mx-3 mb-3 rounded-2xl border-none after:hidden"
      >
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <LogoIcon className="h-5" />

          <DrawerClose asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex min-h-0 rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 sm:hidden dark:border-gray-800"
            >
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <DrawerFooter className="m-4 flex flex-col gap-0 overflow-hidden rounded-xl border border-gray-200 p-0 dark:border-gray-800">
          {navItems.map((item) => {
            if (item.type === 'dropdown') {
              // Dropdown 타입: 하위 메뉴들을 평평하게 렌더링
              return item.contents?.map((subItem, index) => {
                const isActiveRoute = isActive(subItem.href)
                return (
                  <DrawerClose key={`${item.key}-${index}`} asChild>
                    <Link
                      href={subItem.href}
                      className={cn(
                        'block w-full border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 last:border-b-0 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800',
                        isActiveRoute &&
                          'text-foreground bg-gray-50 font-semibold dark:bg-gray-900'
                      )}
                    >
                      {t(subItem.titleKey)}
                    </Link>
                  </DrawerClose>
                )
              })
            } else {
              // Link 타입: 단일 링크 렌더링
              const isActiveRoute = isActive(item.href ?? '')
              return (
                <DrawerClose key={item.key} asChild>
                  <Link
                    href={item.href ?? ''}
                    className={cn(
                      'block border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 last:border-b-0 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800',
                      isActiveRoute &&
                        'text-foreground bg-gray-50 font-semibold dark:bg-gray-900'
                    )}
                  >
                    {t(item.translationKey)}
                  </Link>
                </DrawerClose>
              )
            }
          })}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { MobileNavigationMenu }
