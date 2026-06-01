"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, CheckCircle2, Clock, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { events } from "@/lib/mock-data"
import { toast } from "sonner"

export default function MemberEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(["evt-1"])

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date())
  const pastEvents = events.filter((e) => new Date(e.date) < new Date())

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
      toast.success(`Désinscription de "${eventTitle}" effectuée`)
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
      toast.success(`Inscription à "${eventTitle}" confirmée!`)
    }
  }

  const getEventStatus = (date: string) => {
    const eventDate = new Date(date)
    const today = new Date()
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return { label: "Aujourd'hui", variant: "destructive" as const }
    if (diffDays <= 7) return { label: `Dans ${diffDays} jour${diffDays > 1 ? "s" : ""}`, variant: "default" as const }
    return { label: "À venir", variant: "secondary" as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Événements</h1>
        <p className="text-muted-foreground">Découvrez et participez aux activités de l'association</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  <p className="text-sm text-muted-foreground">À venir</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registeredEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Inscrit(e)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pastEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Passés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />À venir ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="registered" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mes inscriptions ({registeredEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Passés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event, index) => {
              const status = getEventStatus(event.date)
              const isRegistered = registeredEvents.includes(event.id)

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full ${isRegistered ? "border-primary" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        {isRegistered && (
                          <Badge className="bg-primary/10 text-primary">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Inscrit
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString("fr-CI", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.currentParticipants}/{event.maxParticipants} participants
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Places disponibles</span>
                          <span className="font-medium">
                            {event.maxParticipants - event.currentParticipants} restantes
                          </span>
                        </div>
                        <Progress value={event.joinRate} className="h-2" />
                      </div>

                      <Button
                        className="w-full"
                        variant={isRegistered ? "outline" : "default"}
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Se désinscrire
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4 mr-2" />
                            S'inscrire
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents
              .filter((e) => registeredEvents.includes(e.id))
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-primary">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit bg-primary/10 text-primary">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Inscrit
                      </Badge>
                      <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString("fr-CI", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        Se désinscrire
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            {registeredEvents.length === 0 && (
              <Card className="col-span-full py-12">
                <CardContent className="text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Vous n'êtes inscrit à aucun événement</p>
                  <Button className="mt-4 bg-transparent" variant="outline">
                    Voir les événements
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="opacity-60">
                  <CardHeader className="pb-2">
                    <Badge variant="secondary">Passé</Badge>
                    <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString("fr-CI")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-12">
              <CardContent className="text-center">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun événement passé</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
