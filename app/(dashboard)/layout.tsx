import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userType="admin" />
      <div className="md:ml-[280px] transition-all duration-300">
        <Header userType="admin" />
        <main className="p-4 md:p-6 pb-20 md:pb-6">{children}</main>
      </div>
      <BottomNav userType="admin" />
    </div>
  )
}
