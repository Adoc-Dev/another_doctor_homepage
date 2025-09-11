'use client'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/src/shared/ui'
import { AppSidebar } from '@/src/widgets/nav/ui'
import { AppBreadcrumb } from '@/src/widgets/nav/ui/app-breadcrumb'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    return redirect('/admin/login')
  }

  return (
    <SidebarProvider>
      <div className="flex w-full max-w-[100vw] overflow-hidden">
        <AppSidebar className="shrink-0 border-none" />
        <SidebarInset className="w-full max-w-full overflow-hidden">
          <div className="flex min-h-[100vh] w-full flex-col items-center justify-center">
            <div className="bg-background h-full w-full overflow-x-auto">
              <header className="flex h-16 shrink-0 items-center gap-2 bg-gray-200">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="hover:text-foreground focus:text-foreground -ml-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-100" />
                  <div className="mr-2 h-4 w-[1px] bg-gray-200" />

                  <AppBreadcrumb />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 overflow-x-auto p-4 pt-0">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default AdminAppLayout
