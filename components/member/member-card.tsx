"use client"

import { motion } from "framer-motion"
import { Award, Star, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { type Member, type MemberStatus, formatFCFA } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface MemberCardProps {
  member: Member
}

const statusConfig: Record<MemberStatus, { icon: typeof Award; color: string; bgColor: string; label: string }> = {
  Bronze: {
    icon: Award,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    label: "Bronze",
  },
  Silver: {
    icon: Star,
    color: "text-slate-500",
    bgColor: "bg-slate-100",
    label: "Silver",
  },
  Gold: {
    icon: Crown,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    label: "Gold",
  },
}

export function MemberCard({ member }: MemberCardProps) {
  const config = statusConfig[member.status]
  const StatusIcon = config.icon

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/5" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary/5" />

        <CardContent className="relative p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="/african-professional.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn("absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg", config.bgColor, config.color)}
              >
                <StatusIcon className="w-5 h-5" />
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <Badge className={cn(config.bgColor, config.color, "font-semibold")}>{config.label}</Badge>
                </div>
                <p className="text-muted-foreground">{member.email}</p>
                <p className="text-sm text-muted-foreground">{member.phone}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Total Contribué</p>
                  <p className="text-lg font-bold text-primary">{formatFCFA(member.totalContributed)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En Attente</p>
                  <p
                    className={cn("text-lg font-bold", member.pendingDues > 0 ? "text-amber-600" : "text-emerald-600")}
                  >
                    {formatFCFA(member.pendingDues)}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm text-muted-foreground">Membre Depuis</p>
                  <p className="text-lg font-bold">
                    {new Date(member.joinDate).toLocaleDateString("fr-CI", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
