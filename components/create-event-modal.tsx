
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un événement</DialogTitle>
          <DialogDescription>
            Organisez une nouvelle réunion ou activité pour l'association.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l'événement</Label>
            <Input id="title" placeholder="Ex: Assemblée Générale" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input id="time" type="time" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input id="location" placeholder="Ex: Salle des fêtes" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Détails de l'événement..." />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Création en cours..." : "Créer l'événement"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
