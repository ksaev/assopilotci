"use client"

import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { transactions, formatFCFA, type PaymentStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface TransactionsTableProps {
  limit?: number
}

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  Overdue: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
}

const statusLabels: Record<PaymentStatus, string> = {
  Paid: "Payé",
  Pending: "En attente",
  Overdue: "En retard",
}

export function TransactionsTable({ limit }: TransactionsTableProps) {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Membre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedTransactions.map((tx, index) => (
            <motion.tr
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`/thoughtful-african-person.png?height=32&width=32&query=african person ${tx.memberName.split(" ")[0]}`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {tx.memberName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{tx.memberName}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{tx.type}</TableCell>
              <TableCell className="font-semibold">{formatFCFA(tx.amount)}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={cn(statusStyles[tx.status])}>
                  {statusLabels[tx.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {new Date(tx.date).toLocaleDateString("fr-CI", {
                  day: "numeric",
                  month: "short",
                })}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
