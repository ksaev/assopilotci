"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, Smartphone, CreditCard, Wallet } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { currentMember, formatFCFA } from "@/lib/mock-data"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

interface MemberPaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const paymentMethods = [
  { id: "orange", name: "Orange Money", icon: Smartphone, color: "bg-orange-500" },
  { id: "mtn", name: "MTN Mobile Money", icon: Wallet, color: "bg-yellow-500" },
  { id: "wave", name: "Wave", icon: CreditCard, color: "bg-blue-500" },
]

const amounts = [10000, 25000, 50000, 100000]

export function MemberPaymentModal({ open, onOpenChange }: MemberPaymentModalProps) {
  const [step, setStep] = useState<"amount" | "method" | "confirm" | "processing" | "success">("amount")
  const [selectedAmount, setSelectedAmount] = useState<number>(currentMember.pendingDues || 25000)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("orange")
  const [phone, setPhone] = useState("")
  const { width, height } = useWindowSize()

  const handleNext = () => {
    if (step === "amount") setStep("method")
    else if (step === "method") setStep("confirm")
    else if (step === "confirm") {
      setStep("processing")
      setTimeout(() => setStep("success"), 2000)
      setTimeout(() => {
        setStep("amount")
        setSelectedAmount(currentMember.pendingDues || 25000)
        setCustomAmount("")
        setPhone("")
        onOpenChange(false)
      }, 5000)
    }
  }

  const handleBack = () => {
    if (step === "method") setStep("amount")
    else if (step === "confirm") setStep("method")
  }

  const handleClose = () => {
    if (step === "amount" || step === "method" || step === "confirm") {
      onOpenChange(false)
    }
  }

  const finalAmount = customAmount ? Number.parseInt(customAmount) : selectedAmount

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === "amount" && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Montant du Paiement</DialogTitle>
                <DialogDescription>Sélectionnez ou entrez le montant à payer</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {currentMember.pendingDues > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  >
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Vous avez {formatFCFA(currentMember.pendingDues)} en attente
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {amounts.map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount("")
                      }}
                      className={`p-4 rounded-xl border-2 transition-colors ${
                        selectedAmount === amount && !customAmount
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-bold">{formatFCFA(amount)}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Ou entrez un montant personnalisé</Label>
                  <Input
                    type="number"
                    placeholder="Montant en FCFA"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>

                <Button onClick={handleNext} className="w-full" disabled={!finalAmount || finalAmount <= 0}>
                  Continuer
                </Button>
              </div>
            </motion.div>
          )}

          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Mode de Paiement</DialogTitle>
                <DialogDescription>Choisissez votre méthode de paiement</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.div key={method.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <label
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} className="sr-only" />
                        <div className={`p-3 rounded-xl ${method.color} text-white`}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </label>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="space-y-2">
                  <Label>Numéro de téléphone</Label>
                  <Input placeholder="+225 07 XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    Retour
                  </Button>
                  <Button onClick={handleNext} className="flex-1" disabled={!phone}>
                    Continuer
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>Vérifiez les détails de votre paiement</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="p-6 rounded-xl bg-muted space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-bold text-xl text-primary">{formatFCFA(finalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Méthode</span>
                    <span className="font-medium">{paymentMethods.find((m) => m.id === selectedMethod)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">Cotisation Mensuelle</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    Retour
                  </Button>
                  <Button onClick={handleNext} className="flex-1 gap-2">
                    <Smartphone className="w-4 h-4" />
                    Payer
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-primary" />
              </motion.div>
              <p className="mt-4 text-lg font-medium">Traitement en cours...</p>
              <p className="text-sm text-muted-foreground">Validez sur votre téléphone</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
                colors={["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"]}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-lg font-medium"
              >
                Paiement Réussi!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground text-center"
              >
                {formatFCFA(finalAmount)} ont été versés avec succès
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
