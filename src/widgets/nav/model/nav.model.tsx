import LogoIcon from '@/public/logo.svg'
import {
  LayoutDashboardIcon,
  LucideIcon,
  TableOfContentsIcon,
} from 'lucide-react'

type DataType = {
  teams: {
    name: string
    logo: LucideIcon
    plan: string
  }[]
  navMain: {
    title: string
    url: string
    icon: LucideIcon
    close?: boolean
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[]
  navSecondary: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}

export const navData: DataType = {
  teams: [
    {
      name: 'ANOTHER DOCTOR',
      logo: LogoIcon,
      plan: '관리자',
    },
  ],
  navMain: [
    {
      title: '대시보드',
      url: '/admin/dashboard',
      icon: LayoutDashboardIcon,
    },
    {
      title: '컨텐츠',
      url: '/admin/contents',
      icon: TableOfContentsIcon,
      items: [
        {
          title: '뉴스 관리',
          url: '/admin/contents/news',
        },
      ],
    },
    // {
    //   title: '시스템',
    //   url: '/admin/system',
    //   icon: Settings,
    //   items: [
    //     {
    //       title: '운영진 관리',
    //       url: '/admin/system/administrators',
    //     },
    //   ],
    // },
  ],
  navSecondary: [],
}
