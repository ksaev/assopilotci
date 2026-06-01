"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, CheckCircle2, CreditCard, Calendar, FileText, Megaphone, Trash2, Check, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { activities } from "@/lib/mock-data"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "payment" | "event" | "document" | "announcement"
  title: string
  description: string
  date: string
  read: boolean
}

export default function MemberNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(activities.map((a) => ({ ...a, read: false })))
  const [filter, setFilter] = useState<string>("all")

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === filter)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CreditCard className="w-5 h-5 text-primary" />
      case "event":
        return <Calendar className="w-5 h-5 text-blue-500" />
      case "document":
        return <FileText className="w-5 h-5 text-amber-500" />
      case "announcement":
        return <Megaphone className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment":
        return "Paiement"
      case "event":
        return "Événement"
      case "document":
        return "Document"
      case "announcement":
        return "Annonce"
      default:
        return type
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success("Toutes les notifications marquées comme lues")
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    toast.success("Notification supprimée")
  }

  const handleClearAll = () => {
    setNotifications([])
    toast.success("Toutes les notifications supprimées")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Toutes lues"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" className="text-destructive bg-transparent" onClick={handleClearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Tout supprimer
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: notifications.length, icon: Bell, color: "text-muted-foreground" },
          { label: "Non lues", value: unreadCount, icon: Bell, color: "text-primary" },
          {
            label: "Paiements",
            value: notifications.filter((n) => n.type === "payment").length,
            icon: CreditCard,
            color: "text-primary",
          },
          {
            label: "Événements",
            value: notifications.filter((n) => n.type === "event").length,
            icon: Calendar,
            color: "text-blue-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter & List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Toutes les notifications</CardTitle>
            <CardDescription>Gérez vos alertes et messages</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="unread">Non lues</SelectItem>
              <SelectItem value="payment">Paiements</SelectItem>
              <SelectItem value="event">Événements</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="announcement">Annonces</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                    notification.read ? "bg-muted/30" : "bg-muted/70 border-l-4 border-primary"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-background">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                        {notification.title}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(notification.type)}
                      </Badge>
                      {!notification.read && <Badge className="bg-primary/10 text-primary text-xs">Nouveau</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.date).toLocaleDateString("fr-CI", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="icon" onClick={() => handleMarkAsRead(notification.id)}>
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune notification</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
