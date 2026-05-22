
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulation de l'ajout
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un membre</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour ajouter un nouveau membre.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" placeholder="Ex: Jean Dupont" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input id="email" type="email" placeholder="Ex: jean.dupont@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" placeholder="Ex: +225 0102030405" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ajout en cours..." : "Ajouter le membre"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
