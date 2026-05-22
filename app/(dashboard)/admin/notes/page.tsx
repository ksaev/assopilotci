"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, StickyNote } from "lucide-react"
import { notes as initialNotes } from "@/lib/data"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function NotesPage() {
  const [notes, setNotes] = React.useState(initialNotes)
  const { toast } = useToast()

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Note créée",
      description: "La note a été enregistrée avec succès.",
    })
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Notes Internes</h1>
            <p className="text-muted-foreground">Gérer vos notes et rappels</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer une note</DialogTitle>
                <DialogDescription>Ajouter un mémo ou un rappel</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note-title">Titre</Label>
                  <Input id="note-title" placeholder="Titre de la note" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note-content">Contenu</Label>
                  <Textarea id="note-content" placeholder="Écrivez votre note ici..." rows={6} required />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <StickyNote className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-base text-balance">{note.title}</CardTitle>
                  <CardDescription>Par {note.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">{note.content}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Créé: {new Date(note.createdAt).toLocaleDateString("fr-FR")}</span>
                    <span>Modifié: {new Date(note.updatedAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
  )
}
