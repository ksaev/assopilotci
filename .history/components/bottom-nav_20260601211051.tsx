"use client"

import Link from "next/link"
import { usePathname,useRouter,useParams } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, CreditCard, Calendar, Home, Wallet, Bell, User, ShieldCheck, Settings, FileText, HeartHandshake } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  userType: "admin" | "member"
}


const adminLinks = (organizationSlug: string) => [
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
const memberLinks = (organizationSlug: string) => [
  { href: `/${organizationSlug}/member/dashboard`, label: "Mon Espace", icon: Home },
  { href: `/${organizationSlug}/member/payments`, label: "Paiements", icon: Wallet },
  { href: `/${organizationSlug}/member/dependents`, label: "Personnes à charge", icon: Users },
  { href: `/${organizationSlug}/member/beneficiaries`, label: "Bénéficiaires désignés", icon: ShieldCheck },
  { href: `/${organizationSlug}/member/events`, label: "Événements", icon: Calendar },
  { href: `/${organizationSlug}/member/notifications`, label: "Notifications", icon: Bell },
  { href: `/${organizationSlug}/member/profile`, label: "Mon Profil", icon: User },
]   

export function BottomNav({ userType }: BottomNavProps) {
  const pathname = usePathname()
  const params = useParams<{ organizationSlug: string }>()
  const organizationSlug = params?.organizationSlug || ""

  const links = userType === "admin" ? adminLinks(organizationSlug) : memberLinks(organizationSlug)

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
