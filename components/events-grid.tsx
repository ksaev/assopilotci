"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { events } from "@/lib/mock-data"

export function EventsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString("fr-CI", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Participation</span>
                  </div>
                  <span className="font-medium">{event.joinRate}%</span>
                </div>
                <Progress value={event.joinRate} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {event.currentParticipants} / {event.maxParticipants} inscrits
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
