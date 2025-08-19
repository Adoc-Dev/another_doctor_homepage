'use client'

import {
  NavMain,
  NavSecondary,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  TeamSwitcher,
  useSidebar,
} from '@/src/shared/ui'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import { navData } from '../model'

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  // const auth = useAuth()
  const router = useRouter()
  const sidebar = useSidebar()

  function handleLogout() {
    // await auth.logout()
    // await router.invalidate()
    router.push('/auth')
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navData.teams} />
      </SidebarHeader>
      <SidebarContent className="border-gray-200">
        <NavMain
          items={navData.navMain}
          linkRender={(item) => {
            return (
              <Link
                href={item.url}
                // className={({ isActive }) => (isActive ? 'font-bold' : '')}
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
      {/* <SidebarFooter>
        {auth.user && (
          <NavUser
            onLogout={handleLogout}
            user={{
              name: auth.user.nickname,
              description: '관리자',
            }}
          />
        )}
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
