'use client'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/src/shared/ui'
import { AnimatedThemeToggler } from '@/src/widgets/header/ui/animated-theme-toggler'
import { AppSidebar } from '@/src/widgets/nav/ui'
import { AppBreadcrumb } from '@/src/widgets/nav/ui/app-breadcrumb'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return redirect('/admin/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar className="border-none" />
      <SidebarInset>
        <div className="flex min-h-[100vh] w-full flex-col items-center justify-center bg-gray-50 p-2">
          <div className="bg-background h-full w-full rounded-xl border-gray-200 shadow-md">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="hover:text-foreground focus:text-foreground -ml-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-100" />
                <div className="mr-2 h-4 w-[1px] bg-gray-200" />

                <AppBreadcrumb />
              </div>
              <AnimatedThemeToggler className="mr-4 ml-auto cursor-pointer" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminAppLayout
