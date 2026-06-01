"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Eye, Trash2, Upload } from "lucide-react"
import { documents as initialDocuments } from "@/lib/data"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState(initialDocuments)
  const [filterType, setFilterType] = React.useState<string>("all")
  const { toast } = useToast()

  const filteredDocuments = documents.filter((doc) => filterType === "all" || doc.type === filterType)

  const handleAddDocument = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Document ajouté",
      description: "Le document a été téléchargé avec succès.",
    })
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      statut: "bg-chart-1/10 text-chart-1",
      pv: "bg-chart-2/10 text-chart-2",
      rapport: "bg-chart-3/10 text-chart-3",
      budget: "bg-chart-4/10 text-chart-4",
      autre: "bg-muted text-muted-foreground",
    }
    return colors[type] || "bg-muted text-muted-foreground"
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Documents</h1>
            <p className="text-muted-foreground">Gérer les documents de l'association</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Télécharger un document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un document</DialogTitle>
                <DialogDescription>Télécharger un nouveau fichier</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddDocument} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-title">Titre du document</Label>
                  <Input id="doc-title" placeholder="Procès-Verbal AG 2025" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Type</Label>
                  <Select>
                    <SelectTrigger id="doc-type">
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="statut">Statut</SelectItem>
                      <SelectItem value="pv">Procès-Verbal</SelectItem>
                      <SelectItem value="rapport">Rapport</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-file">Fichier</Label>
                  <Input id="doc-file" type="file" accept=".pdf,.doc,.docx,.xlsx" required />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                  <Button type="submit">Télécharger</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <Card>
          <CardContent className="pt-6">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="statut">Statuts</SelectItem>
                <SelectItem value="pv">Procès-Verbaux</SelectItem>
                <SelectItem value="rapport">Rapports</SelectItem>
                <SelectItem value="budget">Budgets</SelectItem>
                <SelectItem value="autre">Autres</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${getTypeColor(document.type)}`}
                    >
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge className={getTypeColor(document.type)} variant="secondary">
                      {document.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-base text-balance">{document.title}</CardTitle>
                  <CardDescription>
                    Téléchargé le {new Date(document.uploadDate).toLocaleDateString("fr-FR")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Taille: {document.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
  )
}
