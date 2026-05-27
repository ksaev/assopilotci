"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Wallet,
  Bell,
  LogOut,
  User,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* =========================
   TYPES
========================= */
interface SidebarProps {
  organization: {
    id: string
    name: string
    logo?: string | null
    country?: string | null
  }

  currentUser: {
    name: string
    email: string
    avatar?: string | null
    role: "SUPER_ADMIN" | "OWNER" | "ADMIN" | "TREASURER" | "SECRETARY" | "MEMBER"
  }
}

/* =========================
   LINKS
========================= */
const adminLinks = [
  { href: "/admin/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/admin/members", label: "Membres", icon: Users },
  { href: "/admin/solidarity", label: "Solidarité & Cotisations", icon: HeartHandshake },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
  { href: "/admin/events", label: "Événements", icon: Calendar },
  { href: "/admin/reports", label: "Rapports", icon: FileText },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/notes", label: "Notes", icon: FileText },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

const memberLinks = [
  { href: "/membre/dashboard", label: "Mon Espace", icon: Home },
  { href: "/membre/payments", label: "Paiements", icon: Wallet },
  { href: "/membre/dependents", label: "Personnes à charge", icon: Users },
  { href: "/membre/beneficiaries", label: "Bénéficiaires", icon: ShieldCheck },
  { href: "/membre/events", label: "Événements", icon: Calendar },
  { href: "/membre/notifications", label: "Notifications", icon: Bell },
  { href: "/membre/profile", label: "Mon Profil", icon: User },
]

/* =========================
   COMPONENT
========================= */
export function Sidebar({
  organization,
  currentUser,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const links =
    currentUser.role === "OWNER" ||
    currentUser.role === "ADMIN" ||
    currentUser.role === "SUPER_ADMIN"
      ? adminLinks
      : memberLinks

  const initials = organization.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const userInitials = currentUser.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const roleColor =
    currentUser.role === "OWNER"
      ? "text-yellow-400"
      : currentUser.role === "ADMIN"
      ? "text-blue-400"
      : currentUser.role === "TREASURER"
      ? "text-green-400"
      : "text-gray-400"

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      router.push("/login")
      router.refresh()
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen hidden md:flex flex-col",
        "border-r border-sidebar-border",
        "bg-sidebar text-sidebar-foreground"
      )}
    >
      {/* =========================
          HEADER ORGANISATION
      ========================= */}
      <div className="p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-primary flex items-center justify-center">
                  {organization.logo ? (
                    <Image
                      src={organization.logo}
                      alt={organization.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {initials}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h1 className="font-bold text-sm truncate">
                    {organization.name}
                  </h1>

                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {organization.country || "Organisation"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {collapsed && (
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
              {organization.logo ? (
                <Image
                  src={organization.logo}
                  alt={organization.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-white">
                  {initials}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition",
                  isActive
                    ? "bg-sidebar-primary text-white"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/70"
                )}
              >
                <link.icon className="w-5 h-5" />

                {!collapsed && (
                  <span className="text-sm font-medium">
                    {link.label}
                  </span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* =========================
          FOOTER USER
      ========================= */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar || ""} />
            <AvatarFallback>
              {userInitials}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {currentUser.name}
              </p>

              <p className={cn("text-xs", roleColor)}>
                {currentUser.role}
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </Button>

          {!collapsed && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}