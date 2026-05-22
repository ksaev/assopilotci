"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MemberCard } from "@/components/member/member-card"
import { QuickPayButton } from "@/components/member/quick-pay-button"
import { ActivityTimeline } from "@/components/member/activity-timeline"
import { MemberPaymentModal } from "@/components/member/member-payment-modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { currentMember, events, formatFCFA } from "@/lib/mock-data"
import { Calendar, Download, FileText } from "lucide-react"

export default function MemberDashboard() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-balance">Bienvenue, {currentMember.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Voici votre espace membre personnel.</p>
      </motion.div>

      {/* Member Card & Quick Pay */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MemberCard member={currentMember} />
        </div>
        <div className="flex flex-col gap-4">
          <QuickPayButton onPay={() => setPaymentModalOpen(true)} pendingDues={currentMember.pendingDues} />

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Mes Contributions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total versé</span>
                <span className="font-bold text-primary">{formatFCFA(currentMember.totalContributed)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">En attente</span>
                <span className="font-bold text-amber-600">{formatFCFA(currentMember.pendingDues)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Membre depuis</span>
                <span className="font-medium">
                  {new Date(currentMember.joinDate).toLocaleDateString("fr-CI", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Prochains Événements</CardTitle>
            <CardDescription>Ne manquez pas les activités de l'association</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/membre/events">Voir tout</a>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.slice(0, 2).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <p className="text-sm text-primary mt-2 font-medium">
                          {new Date(event.date).toLocaleDateString("fr-CI", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityTimeline />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documents</CardTitle>
            <CardDescription>Téléchargez les documents officiels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Rapport Financier Q3 2024", date: "Déc 2024" },
              { name: "Statuts de l'Association", date: "Jan 2024" },
              { name: "PV Assemblée Générale", date: "Nov 2024" },
            ].map((doc, index) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <MemberPaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </div>
  )
}
