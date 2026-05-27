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
   TYPES SAFE
========================= */
interface SidebarProps {
  organization?: {
    id?: string
    name?: string
    logo?: string | null
    country?: string | null
  }

  currentUser?: {
    name?: string
    email?: string
    avatar?: string | null
    role?: string
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
   COMPONENT SAFE
========================= */
export function Sidebar({
  organization,
  currentUser,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  /* =========================
     SAFE VALUES (ANTI CRASH)
  ========================= */
  const role = currentUser?.role ?? "MEMBER"
  const userName = currentUser?.name ?? "Utilisateur"
  const userAvatar = currentUser?.avatar ?? ""

  const orgName = organization?.name ?? "Organisation"
  const orgLogo = organization?.logo ?? null
  const orgCountry = organization?.country ?? "..."

  const links =
    role === "OWNER" ||
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
      ? adminLinks
      : memberLinks

  /* =========================
     INITIALS SAFE
  ========================= */
  const orgInitials =
    orgName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "OR"

  const userInitials =
    userName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"

  const roleColor =
    role === "OWNER"
      ? "text-yellow-400"
      : role === "ADMIN"
      ? "text-blue-400"
      : role === "TREASURER"
      ? "text-green-400"
      : "text-gray-400"

  /* =========================
     LOADING SAFE STATE
  ========================= */
  if (!currentUser || !organization) {
    return (
      <aside className="h-screen w-[280px] border-r bg-sidebar flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Chargement...
        </p>
      </aside>
    )
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.25 }}
      className="fixed left-0 top-0 z-40 h-screen hidden md:flex flex-col border-r bg-sidebar text-sidebar-foreground"
    >
      {/* =========================
          ORGANIZATION HEADER
      ========================= */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-primary flex items-center justify-center">
                {orgLogo ? (
                  <Image
                    src={orgLogo}
                    alt={orgName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {orgInitials}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-sm font-bold truncate">
                  {orgName}
                </h1>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {orgCountry}
                </p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
              {orgInitials}
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
          USER FOOTER
      ========================= */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>
              {userInitials}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {userName}
              </p>

              <p className={cn("text-xs", roleColor)}>
                {role}
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
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
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