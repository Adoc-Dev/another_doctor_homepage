'use client'

import LogoIcon from '@/public/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import { AnimatedThemeToggler } from '@/src/shared/ui'
import Link from 'next/link'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const MenuItem = memo(
  ({
    active,
    label,
    onClick,
  }: {
    active: boolean
    label: string
    onClick: () => void
  }) => (
    <div
      onClick={onClick}
      className={cn(
        'text-body-02 z-10 flex h-full cursor-pointer items-center justify-center px-4 py-2 font-medium tracking-tight transition-colors duration-200',
        active
          ? 'text-foreground scale-120 font-semibold'
          : 'text-foreground/50 hover:text-foreground'
      )}
    >
      {label}
    </div>
  )
)
MenuItem.displayName = 'MenuItem'

const MENU_SECTIONS = [
  { id: 'hero', section: 'home', label: '홈' },
  { id: 'product', section: 'product', label: '제품' },
  { id: 'news', section: 'news', label: '뉴스' },
  { id: 'contact', section: 'contact', label: '문의' },
]

const SECTION_CONFIGS = [
  { id: 'hero', section: 'home' },
  { id: 'vision', section: 'home' },
  { id: 'cooperation', section: 'home' },
  { id: 'mission', section: 'home' },
  { id: 'product', section: 'product' },
  { id: 'news', section: 'news' },
  { id: 'contact', section: 'contact' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isScrollingRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true

        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          isScrollingRef.current = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxVisibleRatio = 0
      let visibleSection = activeSection

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibleRatio) {
          maxVisibleRatio = entry.intersectionRatio
          const sectionId = entry.target.id
          const sectionConfig = SECTION_CONFIGS.find((s) =>
            sectionId.includes(s.id)
          )
          if (sectionConfig) {
            visibleSection = sectionConfig.section
          }
        }
      })

      if (maxVisibleRatio > 0 && visibleSection !== activeSection) {
        setActiveSection(visibleSection)
      }
    }

    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions
    )

    SECTION_CONFIGS.forEach(({ id }) => {
      const element = document.getElementById(id + '-section')
      if (element) observerRef.current?.observe(element)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [activeSection])

  const scrollToSection = useCallback((sectionId: string) => {
    if (timeoutRef.current) return

    const section = document.getElementById(sectionId + '-section')
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth',
      })

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
      }, 800)
    }
  }, [])

  const menuItems = useMemo(
    () =>
      MENU_SECTIONS.map(({ section, id, label }) => (
        <MenuItem
          key={section}
          active={activeSection === section}
          label={label}
          onClick={() => scrollToSection(id)}
        />
      )),
    [activeSection, scrollToSection]
  )

  return (
    <div className="fixed top-4 z-50 flex w-full justify-center transition-all duration-300">
      <div
        className={cn(
          'flex items-center justify-between rounded-4xl px-4 py-2 transition-all duration-300 will-change-transform',
          scrolled
            ? 'bg-background/10 border-foreground/10 w-[40%] border backdrop-blur-sm'
            : 'border-foreground/10 w-[80%] bg-transparent backdrop-blur-sm'
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="size-6" />
          <div
            className={cn(
              'text-body-01 font-nova-square flex flex-col font-bold tracking-tighter transition-all duration-300',
              scrolled ? 'text-sm' : 'text-base'
            )}
          >
            <p className="leading-none">ANOTHER</p>
            <p className="leading-none">DOCTOR</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 md:gap-5">
          <div
            className={cn(
              'flex items-center gap-2 transition-all duration-300 md:gap-4',
              scrolled ? 'text-sm' : 'text-base'
            )}
          >
            {menuItems}
          </div>
        </nav>
        <div className="flex w-20 items-center justify-end">
          <AnimatedThemeToggler className="flex size-8 items-center justify-center rounded-full border border-gray-200 p-1.5 shadow-sm" />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
export { Header }
