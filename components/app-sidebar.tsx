"use client"

import { BarChart3, Calendar, Home, ListTodo, Settings, AlertTriangle, BookHeart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Apuestas",
      icon: ListTodo,
      href: "/apuestas",
    },
    {
      title: "Escaleras",
      icon: TrendingUp,
      href: "/escaleras",
    },
    {
      title: "Bitácora",
      icon: BookHeart,
      href: "/bitacora",
    },
    {
      title: "Disciplina",
      icon: AlertTriangle,
      href: "/disciplina",
    },
    {
      title: "Análisis",
      icon: BarChart3,
      href: "/analisis",
    },
    {
      title: "Calendario",
      icon: Calendar,
      href: "/calendario",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">BetTracker</h1>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configuración">
              <Link href="/configuracion">
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
