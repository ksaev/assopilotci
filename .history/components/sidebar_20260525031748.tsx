"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname,useRouter } from "next/navigation"
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
  { href: "/membre/beneficiaries", label: "Bénéficiaires designés", icon: ShieldCheck },

  { href: "/membre/events", label: "Événements", icon: Calendar },
  { href: "/membre/notifications", label: "Notifications", icon: Bell },
  { href: "/membre/profile", label: "Mon Profil", icon: User },

]
  const router = useRouter()


  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    router.push("/login")
    router.refresh()
  }

export function Sidebar({ userType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const links = userType === "admin" ? adminLinks : memberLinks

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden md:flex flex-col backdrop-blur-xl"
      style={{
        background: "linear-gradient(180deg, var(--sidebar) 0%, oklch(0.08 0.02 160) 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GA</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">GestionAsso</h1>
                <p className="text-xs text-sidebar-foreground/60">Côte d'Ivoire</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-lg">GA</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground",
                )}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap"
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

      {/* User Profile & Collapse */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src="/african-professional.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
          </Avatar>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="font-medium text-sm truncate">Adama Koné</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {userType === "admin" ? "Administrateur" : "Membre Gold"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
