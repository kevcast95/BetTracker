import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthGuard } from "@/components/auth/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestor de Apuestas",
  description: "Gestiona tus apuestas deportivas de forma organizada y consciente",
  generator: "v0.dev",
}

function ConditionalLayout({ children }: { children: React.ReactNode }) {
  // Check if we're on the login page (client-side check)
  const isLoginPage = typeof window !== "undefined" && window.location.pathname === "/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
