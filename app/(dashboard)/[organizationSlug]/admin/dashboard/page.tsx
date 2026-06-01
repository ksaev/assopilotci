"use client"

import { motion } from "framer-motion"
import { Users, 
  Wallet, 
  CreditCard,
  Calendar,
  TrendingUp,
  Plus,
  Download,
  Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsGrid } from "@/components/stats-grid"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { MembershipChart } from "@/components/charts/membership-chart"
import { TransactionsTable } from "@/components/transactions-table"
import { EventsGrid } from "@/components/events-grid"
import { BudgetWidget } from "@/components/budget-widget"
import { PaymentModal } from "@/components/payment-modal"
import { QuickActionsModal } from "@/components/quick-actions-modal"
import { stats, formatFCFA } from "@/lib/mock-data"
import { useState } from "react"


const statsData = [
  {
    title: "Total Membres",
    value: stats.totalMembers.toString(),
    subtitle: `${stats.activeMembers} actifs`,
    icon: Users,
    trend: "+3",
    trendUp: true,
  },
  {
    title: "Total Collecté",
    value: formatFCFA(stats.totalFCFA),
    subtitle: formatFCFA(stats.pendingFCFA) + " en attente",
    icon: Wallet,
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Événements",
    value: stats.totalEvents.toString(),
    subtitle: `${stats.upcomingEvents} à venir`,
    icon: Calendar,
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Budget Annuel",
    value: Math.round((stats.currentBudget / stats.annualBudget) * 100) + "%",
    subtitle: formatFCFA(stats.currentBudget),
    icon: TrendingUp,
    trend: "+8%",
    trendUp: true,
  },
]

export default function AdminDashboard() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [quickActionsModalOpen, setQuickActionsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue, Adama. Voici l'aperçu de votre association.</p>
        </div>
        <Button onClick={() => setPaymentModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nouveau Paiement
        </Button>
      </motion.div>
      <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Actions rapides <p className="text-sm text-muted-foreground">(membres, paiements, événements...)</p></span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setQuickActionsModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Choisir une action
                    </Button>
                  </CardTitle>
                </CardHeader>

              </Card>
            </motion.div>

      {/* Stats Grid */}
      <StatsGrid stats={statsData} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenus vs Dépenses</CardTitle>
            <CardDescription>Évolution mensuelle en FCFA</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <BudgetWidget />
      </div>

      {/* Membership Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Croissance des Membres</CardTitle>
          <CardDescription>Nouveaux membres par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <MembershipChart />
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transactions Récentes</CardTitle>
            <CardDescription>Les derniers paiements reçus</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/transactions">Voir tout</a>
          </Button>
        </CardHeader>
        <CardContent>
          <TransactionsTable limit={5} />
        </CardContent>
      </Card>

      {/* Events Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Événements à Venir</CardTitle>
            <CardDescription>Prochaines réunions et activités</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/events">Voir tout</a>
          </Button>
        </CardHeader>
        <CardContent>
          <EventsGrid />
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <PaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} />
      <QuickActionsModal open={quickActionsModalOpen} onOpenChange={setQuickActionsModalOpen} />
    </div>
  )
}
