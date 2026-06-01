"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Filter, CheckCircle2, Clock, AlertCircle, Smartphone, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { transactions, members, formatFCFA, stats, type PaymentStatus, type PaymentType } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
// @ts-ignore
import confetti from "canvas-confetti"
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const statusConfig: Record<PaymentStatus, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Paid: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", label: "Payé" },
  Pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", label: "En attente" },
  Overdue: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "En retard" },
}

const paymentMethods = [
  { id: "orange", name: "Orange Money", image: "/orange.png" },
  { id: "mtn", name: "MTN Mobile Money", image: "/mtn.png" },
  { id: "moov", name: "Moov", image: "/moov.png" },
  { id: "wave", name: "Wave", image: "/wave.jpg" },
  { id: "especes", name: "Espèces", image: "/especes.png" },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [newPayment, setNewPayment] = useState({
    memberId: "",
    amount: 25000,
    type: "Cotisation Mensuelle" as PaymentType,
    method: "orange",
  })
  const [newContribution, setNewContribution] = useState({
      memberId: "all",
      amount: 25000,
      motif: "Cotisation Mensuelle",
      commentaire: "",
      date: "",
    })



  const { toast } = useToast()

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })


  const handlePaymentSubmit = () => {
    if (paymentStep < 3) {
      setPaymentStep(paymentStep + 1)
      return
    }

    // Final step - process payment
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10B981", "#34D399", "#6EE7B7"],
    })

    toast({
      title: "Paiement enregistré !",
      description: `${formatFCFA(newPayment.amount)} reçu avec succès.`,
    })

    // Simulate budget update
    stats.currentBudget += newPayment.amount

    setIsPaymentModalOpen(false)
    setPaymentStep(1)
    setNewPayment({ memberId: "", amount: 25000, type: "Cotisation Mensuelle", method: "orange" })
  }


  const resetModal = () => {
    setPaymentStep(1)
    setNewPayment({ memberId: "", amount: 25000, type: "Cotisation Mensuelle", method: "orange" })
  }

    const handleContributionSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10B981", "#34D399", "#6EE7B7"],
    })

    toast({
      title: "Contribution enregistrée !",
      description: `Contribution de ${formatFCFA(newContribution.amount)} pour ${members.find(m => m.id === newContribution.memberId)?.name || "membre"} ajoutée.`,
    })

    setIsContributionModalOpen(false)
    setNewContribution({ memberId: "all", amount: 25000, motif: "Cotisation Mensuelle", commentaire: "", date: "" })
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Historique et gestion des paiements</p>
        </div>

          {/* === BOUTON CONTRIBUTION === */}
          <Dialog open={isContributionModalOpen} onOpenChange={setIsContributionModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Nouvelle Contribution
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nouvelle Contribution</DialogTitle>
                <DialogDescription>Enregistrez une contribution pour un ou plusieurs membre(s).</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Label>Membre</Label>
                <Select
                  value={newContribution.memberId}
                  onValueChange={(v) => setNewContribution({ ...newContribution, memberId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un membre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les membres</SelectItem>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label>Montant (FCFA)</Label>
                <Input
                  type="number"
                  placeholder="Montant"
                  value={newContribution.amount}
                  onChange={(e) =>
                    setNewContribution({ ...newContribution, amount: Number(e.target.value) || 0 })
                  }
                />

                  <div className="space-y-2">
                    <Label>Type de paiement</Label>
                    <Select
                      value={newContribution.motif}
                      onValueChange={(value) => setNewContribution({ ...newContribution, motif: value as string })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cotisation Mensuelle">Cotisation Mensuelle</SelectItem>
                        <SelectItem value="Fonds de Solidarité">Fonds de Solidarité</SelectItem>
                        <SelectItem value="Aide Sociale">Aide Sociale</SelectItem>
                        <SelectItem value="Donation">Donation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                <Label>Commentaire</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-20"
                  placeholder="Commentaire facultatif"
                  value={newContribution.commentaire}
                  onChange={(e) =>
                    setNewContribution({ ...newContribution, commentaire: e.target.value })
                  }
                />

                <Label>Délai</Label>
                <Input
                  type="date"
                  value={newContribution.date}
                  onChange={(e) => setNewContribution({ ...newContribution, date: e.target.value })}
                />
              </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={
                    !newContribution.memberId ||
                    !newContribution.amount ||
                    !newContribution.motif
                  }
                >
                  Enregistrer
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirmer la contribution
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Cette action va enregistrer la contribution.
                    Vérifiez les informations avant de continuer.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Annuler
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={handleContributionSubmit}
                  >
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </DialogContent>
          </Dialog>
        

        {/*Nouveau paiement*/}
        <Dialog
          open={isPaymentModalOpen}
          onOpenChange={(open) => {
            setIsPaymentModalOpen(open)
            if (!open) resetModal()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Paiement
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {paymentStep === 1 && "Nouveau Paiement"}
                {paymentStep === 2 && "Mode de Paiement"}
                {paymentStep === 3 && "Confirmation"}
              </DialogTitle>
              <DialogDescription>
                {paymentStep === 1 && "Enregistrez un nouveau paiement pour un membre."}
                {paymentStep === 2 && "Sélectionnez le mode de paiement utilisé."}
                {paymentStep === 3 && "Vérifiez les détails avant de confirmer."}
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {/* Step 1: Payment Details */}
              {paymentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 py-4"
                >
                  <div className="space-y-2">
                    <Label>Membre</Label>
                    <Select
                      value={newPayment.memberId}
                      onValueChange={(value) => setNewPayment({ ...newPayment, memberId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un membre" />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type de paiement</Label>
                    <Select
                      value={newPayment.type}
                      onValueChange={(value) => setNewPayment({ ...newPayment, type: value as PaymentType })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cotisation Mensuelle">Cotisation Mensuelle</SelectItem>
                        <SelectItem value="Fonds de Solidarité">Fonds de Solidarité</SelectItem>
                        <SelectItem value="Aide Sociale">Aide Sociale</SelectItem>
                        <SelectItem value="Donation">Donation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Montant (FCFA)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[10000, 25000, 50000].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={newPayment.amount === amount ? "default" : "outline"}
                          onClick={() => setNewPayment({ ...newPayment, amount })}
                        >
                          {formatFCFA(amount).replace(" FCFA", "")}
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Autre montant"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: Number.parseInt(e.target.value) || 0 })}
                      className="mt-2"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {paymentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-4"
                >
                  <RadioGroup
                    value={newPayment.method}
                    onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                  >
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <Label
                          key={method.id}
                          htmlFor={method.id}
                          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                            newPayment.method === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                            <img src={method.image} alt={method.name} className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium">{method.name}</span>
                        </Label>
                      ))}

                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {paymentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-4"
                >
                  <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Membre</span>
                      <span className="font-medium">
                        {members.find((m) => m.id === newPayment.memberId)?.name || "Non sélectionné"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">{newPayment.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mode</span>
                      <span className="font-medium">
                        {paymentMethods.find((m) => m.id === newPayment.method)?.name || "Espèces"}
                      </span>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-2xl font-bold text-primary">{formatFCFA(newPayment.amount)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <DialogFooter className="gap-2">
              {paymentStep > 1 && (
                <Button variant="outline" onClick={() => setPaymentStep(paymentStep - 1)}>
                  Retour
                </Button>
              )}
              <Button onClick={handlePaymentSubmit} disabled={paymentStep === 1 && !newPayment.memberId}>
                {paymentStep < 3 ? "Continuer" : "Confirmer le paiement"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom de membre..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Paid">Payé</SelectItem>
                <SelectItem value="Pending">En attente</SelectItem>
                <SelectItem value="Overdue">En retard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Cotisation Mensuelle">Cotisation</SelectItem>
                <SelectItem value="Fonds de Solidarité">Solidarité</SelectItem>
                <SelectItem value="Aide Sociale">Aide Sociale</SelectItem>
                <SelectItem value="Donation">Donation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Membre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredTransactions.map((tx, index) => {
                    const StatusIcon = statusConfig[tx.status].icon
                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <TableCell className="text-muted-foreground">
                          {new Date(tx.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="font-medium">{tx.memberName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`${statusConfig[tx.status].bg} ${statusConfig[tx.status].color} border-0`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[tx.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{formatFCFA(tx.amount)}</TableCell>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
