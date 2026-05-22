"use client"

import { motion } from "framer-motion"
import { CreditCard, Calendar, FileText, Megaphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { activities } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const activityIcons = {
  payment: CreditCard,
  event: Calendar,
  document: FileText,
  announcement: Megaphone,
}

const activityColors = {
  payment: "bg-emerald-500/10 text-emerald-600",
  event: "bg-blue-500/10 text-blue-600",
  document: "bg-purple-500/10 text-purple-600",
  announcement: "bg-amber-500/10 text-amber-600",
}

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités Récentes</CardTitle>
        <CardDescription>Suivez les dernières actualités de l'association</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          {/* Activities */}
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activityIcons[activity.type]
              const colorClass = activityColors[activity.type]

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-4 pl-2"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                      colorClass,
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        {activity.documentUrl && (
                          <a
                            href={activity.documentUrl}
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                          >
                            <FileText className="w-3 h-3" />
                            Télécharger
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(activity.date).toLocaleDateString("fr-CI", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
