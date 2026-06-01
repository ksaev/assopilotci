"use client"
import * as React from "react"
import { Eye, X } from "lucide-react"
import { useTheme } from "@/lib/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { notifications, members, transactions } from "@/lib/data"
import { useState } from "react"
import Link from "next/link"
import { Bell, Sun, Moon, Menu } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/mobile-nav"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatFCFA, stats, type PaymentStatus, type PaymentType } from "@/lib/mock-data"
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
import router from "next/router"
import { useRouter } from "next/navigation" 


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




interface HeaderProps {
  userType: "admin" | "member"
}

export function Header({ userType }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [notificationCount] = useState(3)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showSearchResults, setShowSearchResults] = React.useState(false)
  const [selectedMember, setSelectedMember] = React.useState<(typeof members)[0] | null>(null)
  const [showQuickPayment, setShowQuickPayment] = React.useState(false)
  const [paymentAmount, setPaymentAmount] = React.useState("")
  const [paymentMethod, setPaymentMethod] = React.useState("")
  const [paymentType, setPaymentType] = React.useState("Cotisation Mensuelle")
  const unreadCount = notifications.filter((n) => !n.read).length
  const { toast } = useToast()
  const searchRef = React.useRef<HTMLDivElement>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [newPayment, setNewPayment] = useState({
    memberId: "",
    amount: 25000,
    type: "Cotisation Mensuelle" as PaymentType,
    method: "orange",
  })

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return { members: [], transactions: [] }

    const query = searchQuery.toLowerCase()
      const q = query.toLowerCase();
      const qPhone = query.replace(/\D/g, "");

      const filteredMembers = members.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.replace(/\D/g, "").includes(qPhone) ||
        m.id.toLowerCase().includes(q)
      );  
    const filteredTransactions = transactions
      .filter(
        (t) =>
          t.memberName.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query),
      )
      .slice(0, 3)

    return { members: filteredMembers.slice(0, 5), transactions: filteredTransactions }
  }, [searchQuery])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleMemberSelect = (member: (typeof members)[0]) => {
    setSelectedMember(member)
    setSearchQuery("")
    setShowSearchResults(false)
    setIsPaymentModalOpen(true)
  }

  const handleQuickPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember || !paymentAmount || !paymentMethod) return

    toast({
      title: "Paiement enregistré",
      description: `Paiement de ${paymentAmount} FCFA pour ${selectedMember.name} via ${paymentMethod}`,
    })

    setShowQuickPayment(false)
    setPaymentAmount("")
    setPaymentMethod("")
    setSelectedMember(null)
  }

  React.useEffect(() => {
    setShowSearchResults(searchQuery.length > 0)
  }, [searchQuery])

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

  const router = useRouter()


  const resetModal = () => {
    setPaymentStep(1)
    setNewPayment({ memberId: "", amount: 25000, type: "Cotisation Mensuelle", method: "orange" })
  }

    const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })

    router.push("/login")
    router.refresh()
  }



  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <MobileNav userType={userType} />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        {userType=="admin" && (
        <div className="flex-1 max-w-md mx-4 hidden sm:block" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher membre, transaction..."
              className="pl-9 pr-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowSearchResults(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
              </button>
            )}

            {/* Résultats de recherche */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                >
                  {searchResults.members.length > 0 && (
                    <div className="p-2 border-b border-border bg-muted/30">
                      <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">Membres</p>
                      {searchResults.members.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => handleMemberSelect(member)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors group"
                        >
                          <Avatar className="h-8 w-8 border border-border group-hover:border-primary/50 transition-colors">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium truncate">{member.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{member.phone}</p>
                            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                          </div>
                          <Badge variant="outline" className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Sélectionner</Badge>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.transactions.length > 0 && (
                    <div className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">Transactions</p>
                      {searchResults.transactions.map((t) => (
                        <div key={t.id} className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors cursor-default">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium truncate">{t.memberName}</p>
                            <p className="text-xs text-muted-foreground truncate">{t.id} • {t.amount} FCFA</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.members.length === 0 && searchResults.transactions.length === 0 && (
                    <div className="p-8 text-center">
                      <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-20" />
                      <p className="text-sm text-muted-foreground">Aucun résultat pour "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
         )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Theme Toggle */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </motion.div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Nouveau paiement reçu</span>
                <span className="text-sm text-muted-foreground">
                  Nadia Kouadio a effectué un paiement de 50,000 FCFA
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Rappel: Assemblée Générale</span>
                <span className="text-sm text-muted-foreground">L'AG annuelle aura lieu le 28 Décembre</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">3 cotisations en attente</span>
                <span className="text-sm text-muted-foreground">Des membres ont des paiements en retard</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src="/african-professional.jpg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Adama Koné</span>
                  <span className="text-sm font-normal text-muted-foreground">adama.kone@email.ci</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={userType === "admin" ? "/admin/settings" : "/membre/profile"}>Mon Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={userType === "admin" ? "/membre/dashboard" : "/admin/dashboard"}>
                  {userType === "admin" ? "Espace Membre" : "Espace Admin"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

        {/*Nouveau paiement*/}
      <Dialog
        open={isPaymentModalOpen}
        onOpenChange={(open) => {
          setIsPaymentModalOpen(open)
          if (!open) resetModal()
        }}
      >
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentStep === 1 && "Nouveau Paiement"}
              {paymentStep === 2 && "Mode de Paiement"}
              {paymentStep === 3 && "Confirmation"}
            </DialogTitle>
            <DialogDescription>
              {paymentStep === 1 && `Enregistrer un paiement pour ${selectedMember?.name} au ${selectedMember?.phone}`}
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

    </header>
  )
}
