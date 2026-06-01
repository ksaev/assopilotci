"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  FileText,
  Settings,
  Home,
  Wallet,
  Bell,
  LogOut,


  ShieldCheck,
  HeartHandshake,

} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface MobileNavProps {
  userType: "admin" | "member"
}

const adminLinks = [
  { href: "/admin/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/admin/members", label: "Membres", icon: Users },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
  { href: "/admin/solidarity", label: "Solidarité & Cotisations", icon: HeartHandshake },
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

export function MobileNav({ userType }: MobileNavProps) {
  const pathname = usePathname()
  const links = userType === "admin" ? adminLinks : memberLinks

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">GA</span>
        </div>
        <div>
          <h1 className="font-bold text-lg">GestionAsso</h1>
          <p className="text-xs text-sidebar-foreground/60">Côte d'Ivoire</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground",
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src="/african-professional.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">Adama Koné</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {userType === "admin" ? "Administrateur" : "Membre Gold"}
            </p>
          </div>
        </div>
        <Link href="/login">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </Link>
      </div>
    </div>
  )
}
