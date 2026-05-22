"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, CreditCard, Calendar, Home, Wallet, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  userType: "admin" | "member"
}

const adminLinks = [
  { href: "/admin/dashboard", label: "Accueil", icon: LayoutDashboard },
  { href: "/admin/members", label: "Membres", icon: Users },
  { href: "/admin/transactions", label: "Paiements", icon: CreditCard },
  { href: "/admin/events", label: "Événements", icon: Calendar },
]

const memberLinks = [
  { href: "/membre/dashboard", label: "Accueil", icon: Home },
  { href: "/membre/payments", label: "Paiements", icon: Wallet },
  { href: "/membre/events", label: "Événements", icon: Calendar },
  { href: "/membre/notifications", label: "Alertes", icon: Bell },
]

export function BottomNav({ userType }: BottomNavProps) {
  const pathname = usePathname()
  const links = userType === "admin" ? adminLinks : memberLinks

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex flex-col items-center gap-1 py-2",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className={cn("p-2 rounded-xl transition-colors", isActive && "bg-primary/10")}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{link.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
