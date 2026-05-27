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

interface SidebarProps {
  userType: "admin" | "member"

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
    role: string
  }
}

const adminLinks = [
  {
    href: "/admin/dashboard",
    label: "Tableau de Bord",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/members",
    label: "Membres",
    icon: Users,
  },
  {
    href: "/admin/solidarity",
    label: "Solidarité & Cotisations",
    icon: HeartHandshake,
  },
  {
    href: "/admin/transactions",
    label: "Transactions",
    icon: CreditCard,
  },
  {
    href: "/admin/events",
    label: "Événements",
    icon: Calendar,
  },
  {
    href: "/admin/reports",
    label: "Rapports",
    icon: FileText,
  },
  {
    href: "/admin/documents",
    label: "Documents",
    icon: FileText,
  },
  {
    href: "/admin/notes",
    label: "Notes",
    icon: FileText,
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
  },
]

const memberLinks = [
  {
    href: "/membre/dashboard",
    label: "Mon Espace",
    icon: Home,
  },
  {
    href: "/membre/payments",
    label: "Paiements",
    icon: Wallet,
  },
  {
    href: "/membre/dependents",
    label: "Personnes à charge",
    icon: Users,
  },
  {
    href: "/membre/beneficiaries",
    label: "Bénéficiaires designés",
    icon: ShieldCheck,
  },
  {
    href: "/membre/events",
    label: "Événements",
    icon: Calendar,
  },
  {
    href: "/membre/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/membre/profile",
    label: "Mon Profil",
    icon: User,
  },
]

export function Sidebar({
  userType,
  organization,
  currentUser,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const links =
    userType === "admin"
      ? adminLinks
      : memberLinks

  const initials = organization.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const userInitials = currentUser.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Erreur logout :", error)
    }
  }

  return (
    <motion.aside
      initial={false}
      animate={{
        width: collapsed ? 80 : 280,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen hidden md:flex flex-col",
        "border-r border-sidebar-border",
        "bg-sidebar text-sidebar-foreground",
        "backdrop-blur-xl"
      )}
      style={{
        background:
          "linear-gradient(180deg, var(--sidebar) 0%, oklch(0.08 0.02 160) 100%)",
      }}
    >
      {/* HEADER ORGANISATION */}
      <div className="p-4 border-b border-sidebar-border">
        <div
          className={cn(
            "flex items-center",
            collapsed
              ? "justify-center"
              : "justify-between"
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
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-white/10 bg-primary flex items-center justify-center shrink-0">
                  {organization.logo ? (
                    <Image
                      src={organization.logo}
                      alt={organization.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-bold text-sm text-primary-foreground">
                      {initials}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h1 className="font-bold text-base truncate">
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
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-white/10 bg-primary flex items-center justify-center">
              {organization.logo ? (
                <Image
                  src={organization.logo}
                  alt={organization.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="font-bold text-sm text-primary-foreground">
                  {initials}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <link.icon className="w-5 h-5 shrink-0" />

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        width: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                      }}
                      className="font-medium whitespace-nowrap overflow-hidden"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        {/* USER */}
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage
              src={currentUser.avatar || ""}
            />

            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="font-medium text-sm truncate">
                  {currentUser.name}
                </p>

                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {currentUser.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={cn(
                    "w-full justify-start",
                    "text-sidebar-foreground/70",
                    "hover:text-sidebar-foreground",
                    "hover:bg-sidebar-accent"
                  )}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
