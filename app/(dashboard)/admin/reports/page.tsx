"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { stats, monthlyData, membershipGrowth, transactions, members, formatFCFA } from "@/lib/mock-data"
import { toast } from "sonner"

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"]

const membersByStatus = [
  { name: "Gold", value: members.filter((m) => m.status === "Gold").length, color: "#F59E0B" },
  { name: "Silver", value: members.filter((m) => m.status === "Silver").length, color: "#94A3B8" },
  { name: "Bronze", value: members.filter((m) => m.status === "Bronze").length, color: "#CD7F32" },
]

const paymentsByType = [
  { name: "Cotisation", value: transactions.filter((t) => t.type === "Cotisation Mensuelle").length },
  { name: "Solidarité", value: transactions.filter((t) => t.type === "Fonds de Solidarité").length },
  { name: "Donation", value: transactions.filter((t) => t.type === "Donation").length },
  { name: "Aide", value: transactions.filter((t) => t.type === "Aide Sociale").length },
]

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("year")

  const handleExport = (type: string) => {
    toast.success(`Export ${type} en cours...`)
    setTimeout(() => {
      toast.success(`Rapport ${type} téléchargé!`)
    }, 1500)
  }

  const totalRevenue = monthlyData.reduce((acc, m) => acc + m.revenus, 0)
  const totalExpenses = monthlyData.reduce((acc, m) => acc + m.depenses, 0)
  const netBalance = totalRevenue - totalExpenses

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Rapports & Statistiques</h1>
          <p className="text-muted-foreground">Analysez les performances de l'association</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport("PDF")}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Revenus totaux",
            value: formatFCFA(totalRevenue),
            change: "+12.5%",
            trend: "up",
            icon: TrendingUp,
            color: "text-primary",
          },
          {
            label: "Dépenses totales",
            value: formatFCFA(totalExpenses),
            change: "+8.2%",
            trend: "up",
            icon: TrendingDown,
            color: "text-red-500",
          },
          {
            label: "Solde net",
            value: formatFCFA(netBalance),
            change: "+18.3%",
            trend: "up",
            icon: CreditCard,
            color: "text-blue-500",
          },
          {
            label: "Membres actifs",
            value: stats.activeMembers,
            change: "+5",
            trend: "up",
            icon: Users,
            color: "text-amber-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant={stat.trend === "up" ? "default" : "destructive"} className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold mt-4">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Finances
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Membres
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Paiements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses */}
            <Card>
              <CardHeader>
                <CardTitle>Revenus vs Dépenses</CardTitle>
                <CardDescription>Evolution mensuelle des finances</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenus: { label: "Revenus", color: "hsl(var(--primary))" },
                    depenses: { label: "Dépenses", color: "hsl(var(--destructive))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={(value) => `${value / 1000}k`} className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenus"
                        stackId="1"
                        stroke="var(--color-revenus)"
                        fill="var(--color-revenus)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="depenses"
                        stackId="2"
                        stroke="var(--color-depenses)"
                        fill="var(--color-depenses)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Comparaison mensuelle</CardTitle>
                <CardDescription>Revenus et dépenses par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenus: { label: "Revenus", color: "hsl(var(--primary))" },
                    depenses: { label: "Dépenses", color: "hsl(var(--muted-foreground))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={(value) => `${value / 1000}k`} className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenus" fill="var(--color-revenus)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="depenses" fill="var(--color-depenses)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Membership Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Croissance des membres</CardTitle>
                <CardDescription>Evolution du nombre de membres</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    membres: { label: "Membres", color: "hsl(var(--primary))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={membershipGrowth}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="membres"
                        stroke="var(--color-membres)"
                        fill="var(--color-membres)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Members by Status */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par statut</CardTitle>
                <CardDescription>Distribution des membres par niveau</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={membersByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {membersByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {membersByStatus.map((status) => (
                    <div key={status.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-sm text-muted-foreground">
                        {status.name} ({status.value})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payments by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Types de paiements</CardTitle>
                <CardDescription>Distribution par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Nombre", color: "hsl(var(--primary))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentsByType} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" width={80} className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Statut des paiements</CardTitle>
                <CardDescription>Répartition par état</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 py-4">
                  {[
                    {
                      label: "Payés",
                      count: transactions.filter((t) => t.status === "Paid").length,
                      color: "bg-primary",
                    },
                    {
                      label: "En attente",
                      count: transactions.filter((t) => t.status === "Pending").length,
                      color: "bg-amber-500",
                    },
                    {
                      label: "En retard",
                      count: transactions.filter((t) => t.status === "Overdue").length,
                      color: "bg-destructive",
                    },
                  ].map((status) => (
                    <div key={status.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{status.label}</span>
                        <span className="font-medium">{status.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${status.color} rounded-full`}
                          style={{ width: `${(status.count / transactions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Exporter les rapports</CardTitle>
          <CardDescription>Téléchargez les rapports dans différents formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Rapport financier", type: "PDF", icon: FileText },
              { name: "Liste des membres", type: "Excel", icon: Users },
              { name: "Historique transactions", type: "CSV", icon: CreditCard },
              { name: "Rapport événements", type: "PDF", icon: Calendar },
            ].map((report) => (
              <Button
                key={report.name}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                onClick={() => handleExport(report.type)}
              >
                <report.icon className="w-6 h-6 text-primary" />
                <span className="font-medium">{report.name}</span>
                <Badge variant="secondary">{report.type}</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
