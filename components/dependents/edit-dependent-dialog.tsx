"use client"

import * as React from "react"
import { Dependent } from "@/lib/data"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditProps {
  dependent: Dependent
  onUpdate: (d: Dependent) => void
}

export default function EditDependentDialog({ dependent, onUpdate }: EditProps) {

  const [open, setOpen] = React.useState(false)

  const [form, setForm] = React.useState({
    name: dependent.name,
    relation: dependent.relationShip,
    birthDate: dependent.birthDate,
    phone: dependent.phone || "",
    photo: null as File | null
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm((prev) => ({ ...prev, photo: file }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updated: Dependent = {
      ...dependent,
      name: form.name,
      relationShip: form.relation,
      birthDate: form.birthDate,
      phone: form.phone,
      photo: form.photo
        ? [{ name: form.photo.name, url: URL.createObjectURL(form.photo) }]
        : dependent.photo
    }

    onUpdate(updated)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Modifier</Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Modifier l'ayant droit</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 py-4">

          <div>
            <Label>Nom complet</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Relation</Label>
            <select
              name="relation"
              value={form.relation}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Choisir une relation</option>
              <option value="pere">Père</option>
              <option value="mere">Mère</option>
              <option value="conjoint">Conjoint(e)</option>
              <option value="enfant">Enfant</option>
              <option value="frere">Frère</option>
              <option value="soeur">Sœur</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <Label>Date de naissance</Label>
            <Input
              name="birthDate"
              type="date"
              value={form.birthDate instanceof Date ? form.birthDate.toISOString().substring(0, 10) : form.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Téléphone</Label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Photo</Label>
            <Input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}