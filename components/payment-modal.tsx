"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, Smartphone } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { members } from "@/lib/mock-data"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

const paymentSchema = z.object({
  memberId: z.string().min(1, "Sélectionnez un membre"),
  amount: z
    .string()
    .min(1, "Entrez un montant")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Montant invalide"),
  type: z.string().min(1, "Sélectionnez un type"),
  phone: z.string().min(8, "Numéro invalide"),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form")
  const { width, height } = useWindowSize()

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      memberId: "",
      amount: "",
      type: "",
      phone: "",
    },
  })

  const onSubmit = async (data: PaymentFormData) => {
    setStep("processing")
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStep("success")
    // Reset after 3 seconds
    setTimeout(() => {
      setStep("form")
      form.reset()
      onOpenChange(false)
    }, 3000)
  }

  const handleClose = () => {
    if (step === "form") {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Nouveau Paiement</DialogTitle>
                <DialogDescription>Enregistrez un paiement Mobile Money</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membre</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un membre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {members.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                               {member.name} ({member.phone})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de Paiement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type de paiement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Cotisation Mensuelle">Cotisation Mensuelle</SelectItem>
                            <SelectItem value="Fonds de Solidarité">Fonds de Solidarité</SelectItem>
                            <SelectItem value="Aide Sociale">Aide Sociale</SelectItem>
                            <SelectItem value="Donation">Donation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant (FCFA)</FormLabel>
                        <FormControl>
                          <Input placeholder="25000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro Mobile Money</FormLabel>
                        <FormControl>
                          <Input placeholder="+225 07 XX XX XX XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full gap-2">
                    <Smartphone className="w-4 h-4" />
                    Confirmer le Paiement
                  </Button>
                </form>
              </Form>
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
              <p className="text-sm text-muted-foreground">Veuillez patienter</p>
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
                className="text-sm text-muted-foreground"
              >
                Le paiement a été enregistré avec succès
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
