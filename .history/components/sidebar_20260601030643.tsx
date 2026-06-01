"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useParams } from "next/navigation"
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

interface SidebarProps {
  userType: "admin" | "member"
}

export function Sidebar({ userType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const params = useParams<{
    organizationSlug: string
    memberSlug?: string
  }>()

  const organizationSlug = params.organizationSlug
  const memberSlug = params.memberSlug

  /* ================= ADMIN LINKS ================= */
  const adminLinks = [
    { href: `/${organizationSlug}/admin/dashboard`, label: "Tableau de Bord", icon: LayoutDashboard },
    { href: `/${organizationSlug}/admin/members`, label: "Membres", icon: Users },
    { href: `/${organizationSlug}/admin/solidarity`, label: "Solidarité & Cotisations", icon: HeartHandshake },
    { href: `/${organizationSlug}/admin/transactions`, label: "Transactions", icon: CreditCard },
    { href: `/${organizationSlug}/admin/events`, label: "Événements", icon: Calendar },
    { href: `/${organizationSlug}/admin/reports`, label: "Rapports", icon: FileText },
    { href: `/${organizationSlug}/admin/documents`, label: "Documents", icon: FileText },
    { href: `/${organizationSlug}/admin/notes`, label: "Notes", icon: FileText },
    { href: `/${organizationSlug}/admin/settings`, label: "Paramètres", icon: Settings },
  ]

  /* ================= MEMBER LINKS ================= */
  const memberLinks = [
    { href: `/${organizationSlug}/member/${memberSlug}/dashboard`, label: "Mon Espace", icon: Home },
    { href: `/${organizationSlug}/member/${memberSlug}/payments`, label: "Paiements", icon: Wallet },
    { href: `/${organizationSlug}/member/${memberSlug}/dependents`, label: "Personnes à charge", icon: Users },
    { href: `/${organizationSlug}/member/${memberSlug}/beneficiaries`, label: "Bénéficiaires", icon: ShieldCheck },
    { href: `/${organizationSlug}/member/${memberSlug}/events`, label: "Événements", icon: Calendar },
    { href: `/${organizationSlug}/member/${memberSlug}/notifications`, label: "Notifications", icon: Bell },
    { href: `/${organizationSlug}/member/${memberSlug}/profile`, label: "Mon Profil", icon: User },
  ]

  const links = userType === "admin" ? adminLinks : memberLinks

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden md:flex flex-col backdrop-blur-xl"
    >
      {/* ================= LOGO ================= */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">GA</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">GestionAsso</h1>
              <p className="text-xs text-sidebar-foreground/60">Côte d'Ivoire</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-lg">GA</span>
          </div>
        )}
      </div>

      {/* ================= NAV ================= */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/70"
                )}
              >
                <link.icon className="w-5 h-5" />

                {!collapsed && (
                  <span className="font-medium">{link.label}</span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* ================= USER ================= */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src="/african-professional.jpg" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div>
              <p className="font-medium text-sm">Adama Koné</p>
              <p className="text-xs text-sidebar-foreground/60">
                {userType === "admin" ? "Administrateur" : "Membre"}
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