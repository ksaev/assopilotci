"use client"

import { motion } from "framer-motion"
import { type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatItem {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  trend: string
  trendUp: boolean
}

interface StatsGridProps {
  stats: StatItem[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="cursor-default"
        >
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      stat.trendUp ? "text-emerald-600" : "text-red-500",
                    )}
                  >
                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
