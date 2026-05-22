"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  Calendar,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MemberPaymentModal } from "@/components/member/member-payment-modal"
import { transactions, currentMember, formatFCFA } from "@/lib/mock-data"
import { toast } from "sonner"

// Filter transactions for current member
const memberTransactions = transactions.filter((t) => t.memberId === currentMember.id)

// Add more mock transactions for better display
const allMemberTransactions = [
  ...memberTransactions,
  {
    id: "tx-member-1",
    memberId: currentMember.id,
    memberName: currentMember.name,
    amount: 25000,
    type: "Cotisation Mensuelle" as const,
    status: "Paid" as const,
    date: "2024-11-15",
  },
  {
    id: "tx-member-2",
    memberId: currentMember.id,
    memberName: currentMember.name,
    amount: 25000,
    type: "Cotisation Mensuelle" as const,
    status: "Paid" as const,
    date: "2024-10-15",
  },
  {
    id: "tx-member-3",
    memberId: currentMember.id,
    memberName: currentMember.name,
    amount: 50000,
    type: "Fonds de Solidarité" as const,
    status: "Paid" as const,
    date: "2024-09-20",
  },
]

export default function MemberPaymentsPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredTransactions =
    filterStatus === "all" ? allMemberTransactions : allMemberTransactions.filter((t) => t.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle2 className="w-4 h-4 text-primary" />
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "Overdue":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Payé</Badge>
      case "Pending":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">En attente</Badge>
      case "Overdue":
        return <Badge variant="destructive">En retard</Badge>
      default:
        return null
    }
  }

  const handleDownloadReceipt = (id: string) => {
    toast.success("Téléchargement du reçu en cours...")
  }

  const totalPaid = allMemberTransactions.filter((t) => t.status === "Paid").reduce((acc, t) => acc + t.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mes Paiements</h1>
          <p className="text-muted-foreground">Historique et gestion de vos cotisations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setPaymentModalOpen(true)}>
          <CreditCard className="w-4 h-4 mr-2" />
          Effectuer un paiement
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatFCFA(totalPaid)}</p>
                  <p className="text-sm text-muted-foreground">Total versé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatFCFA(currentMember.pendingDues)}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-muted">
                  <Receipt className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allMemberTransactions.length}</p>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Historique des paiements</CardTitle>
            <CardDescription>Consultez toutes vos transactions</CardDescription>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="Paid">Payés</SelectItem>
              <SelectItem value="Pending">En attente</SelectItem>
              <SelectItem value="Overdue">En retard</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-background">{getStatusIcon(transaction.status)}</div>
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(transaction.date).toLocaleDateString("fr-CI", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">{formatFCFA(transaction.amount)}</p>
                      {getStatusBadge(transaction.status)}
                    </div>
                    {transaction.status === "Paid" && (
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadReceipt(transaction.id)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune transaction trouvée</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <MemberPaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
    </div>
  )
}
