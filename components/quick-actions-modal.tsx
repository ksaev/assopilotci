
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, Calendar, Download } from "lucide-react"
import { AddMemberModal } from "./add-member-modal"
import { PaymentModal } from "./payment-modal"
import { CreateEventModal } from "./create-event-modal"
import { ExportReportModal } from "./export-report-modal"

interface QuickActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickActionsModal({ open, onOpenChange }: QuickActionsModalProps) {
  // States for other modals
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false)
  const [recordPaymentModalOpen, setRecordPaymentModalOpen] = useState(false)
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const [exportReportModalOpen, setExportReportModalOpen] = useState(false)

  const handleAction = (action: () => void) => {
    onOpenChange(false) // Close the QuickActionsModal
    action() // Open the specific modal
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Actions Rapides</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAction(() => setAddMemberModalOpen(true))}
            >
              <Users className="h-4 w-4 mr-2" />
              Ajouter un membre
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAction(() => setRecordPaymentModalOpen(true))}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Enregistrer paiement
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAction(() => setCreateEventModalOpen(true))}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Créer événement
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAction(() => setExportReportModalOpen(true))}
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter rapport
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Actual modals */}
      <AddMemberModal open={addMemberModalOpen} onOpenChange={setAddMemberModalOpen} />
      <PaymentModal open={recordPaymentModalOpen} onOpenChange={setRecordPaymentModalOpen} />
      <CreateEventModal open={createEventModalOpen} onOpenChange={setCreateEventModalOpen} />
      <ExportReportModal open={exportReportModalOpen} onOpenChange={setExportReportModalOpen} />
    </>
  )
}
