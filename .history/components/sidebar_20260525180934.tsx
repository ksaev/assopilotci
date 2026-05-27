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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/* =========================
   TYPES
========================= */
interface SidebarProps {
  userType: "admin" | "member"

  organization?: {
    name?: string
    logo?: string | null
    country?: string | null
  }

  currentUser?: {
    name?: string
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
  userType,
  organization,
  currentUser,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const links =
    userType === "admin" ? adminLinks : memberLinks

  /* =========================
     SAFE DATA (IMPORTANT)
  ========================= */
  const orgName = organization?.name || "Organisation"
  const orgLogo = organization?.logo || null
  const orgCountry = organization?.country || ""

  const userName = currentUser?.name || "Utilisateur"
  const userAvatar = currentUser?.avatar || ""
  const userRole = currentUser?.role || "MEMBER"

  const orgInitials =
    orgName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  const userInitials =
    userName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-40 h-screen md:flex hidden flex-col border-r bg-sidebar text-sidebar-foreground"
    >
      {/* =========================
          ORGANIZATION HEADER
      ========================= */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          {orgLogo ? (
            <div className="relative w-11 h-11 rounded-xl overflow-hidden">
              <Image src={orgLogo} alt={orgName} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
              {orgInitials}
            </div>
          )}

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold truncate">
                {orgName}
              </h1>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {orgCountry || "Organisation"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
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
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {userRole}
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