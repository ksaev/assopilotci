"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminProfilePage() {
  const { toast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées.",
    })
  }

  return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">Gérer vos informations personnelles</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Photo de Profil</CardTitle>
            <CardDescription>Cliquez pour changer votre photo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">AP</AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </button>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Changer la photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG ou GIF. Max 2MB.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
              <CardDescription>Mettez à jour vos coordonnées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Principal" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@association.ci" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" defaultValue="+225 07 12 34 56 78" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input id="role" defaultValue="Administrateur" disabled />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 sm:flex-none">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </Button>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
  )
}
