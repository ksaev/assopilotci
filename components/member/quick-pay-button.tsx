"use client"

import { motion } from "framer-motion"
import { Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatFCFA } from "@/lib/mock-data"

interface QuickPayButtonProps {
  onPay: () => void
  pendingDues: number
}

export function QuickPayButton({ onPay, pendingDues }: QuickPayButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/5" />

        <CardContent className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
              <Wallet className="w-6 h-6" />
            </div>
            <Smartphone className="w-8 h-8 opacity-50" />
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-sm opacity-80">Paiement Rapide</p>
            <p className="text-2xl font-bold">Mobile Money</p>
          </div>

          {pendingDues > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-white/10 backdrop-blur">
              <p className="text-sm opacity-80">Montant en attente</p>
              <p className="text-xl font-bold">{formatFCFA(pendingDues)}</p>
            </div>
          )}

          <Button onClick={onPay} variant="secondary" className="w-full font-semibold" size="lg">
            {pendingDues > 0 ? "Payer Maintenant" : "Effectuer un Paiement"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
