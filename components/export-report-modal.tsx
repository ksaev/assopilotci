
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, FileSpreadsheet, Download } from "lucide-react"

interface ExportReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportReportModal({ open, onOpenChange }: ExportReportModalProps) {
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState("pdf")

  const handleExport = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exporter un rapport</DialogTitle>
          <DialogDescription>
            Générez et téléchargez un rapport d'activité de l'association.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Type de rapport</Label>
            <Select defaultValue="finance">
              <SelectTrigger>
                <SelectValue placeholder="Choisir le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="finance">Rapport Financier</SelectItem>
                <SelectItem value="members">Liste des Membres</SelectItem>
                <SelectItem value="events">Rapport des Événements</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Format d'exportation</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant={format === "pdf" ? "default" : "outline"} 
                className="gap-2"
                onClick={() => setFormat("pdf")}
              >
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              <Button 
                variant={format === "excel" ? "default" : "outline"} 
                className="gap-2"
                onClick={() => setFormat("excel")}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
          <Button className="w-full gap-2" onClick={handleExport} disabled={loading}>
            <Download className="h-4 w-4" />
            {loading ? "Génération..." : "Télécharger le rapport"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
