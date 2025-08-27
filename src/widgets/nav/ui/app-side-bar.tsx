'use client'

import {
  NavMain,
  NavSecondary,
  NavUser,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  TeamSwitcher,
  useSidebar,
} from '@/src/shared/ui'
import Link from 'next/link'

import { cn } from '@/src/shared/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { navData } from '../model'

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const sidebar = useSidebar()

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url)
  }

  function handleLogout() {
    signOut()
    router.push('/admin/login')
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gray-200">
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-gray-100">
        <NavMain
          items={navData.navMain}
          linkRender={(item) => {
            return (
              <Link
                href={item.url}
                className={cn(
                  isActive(item.url) && 'font-bold',
                  'text-gray-500'
                )}
                onClick={() => {
                  if (sidebar.openMobile) {
                    sidebar.toggleSidebar()
                  }
                }}
              >
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            )
          }}
        />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-gray-100">
        {session?.user && (
          <NavUser
            onLogout={handleLogout}
            user={{
              name: session.user.name ?? '',
              description: '관리자',
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
