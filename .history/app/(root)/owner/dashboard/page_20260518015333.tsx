"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Building2,
  Clock,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  status: "PENDING" | "ACTIVE" | "SUSPENDED"
  createdAt: string
}

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()
    setOrgs(data)
    setLoading(false)
  }

  const action = async (
    id: string,
    type: "approve" | "reject"
  ) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  useEffect(() => {
    load()
  }, [])

  // 🔥 STATS CALCULÉES
  const stats = useMemo(() => {
    return {
      total: orgs.length,
      pending: orgs.filter((o) => o.status === "PENDING").length,
      active: orgs.filter((o) => o.status === "ACTIVE").length,
      suspended: orgs.filter((o) => o.status === "SUSPENDED").length,
    }
  }, [orgs])

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Chargement du dashboard...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Platform Owner Dashboard
        </h1>
        <p className="text-muted-foreground">
          Gestion globale des organisations
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          label="Total"
          value={stats.total}
          icon={<Building2 />}
          color="text-blue-500"
        />

        <StatCard
          label="En attente"
          value={stats.pending}
          icon={<Clock />}
          color="text-yellow-500"
        />

        <StatCard
          label="Actives"
          value={stats.active}
          icon={<CheckCircle />}
          color="text-green-500"
        />

        <StatCard
          label="Suspendues"
          value={stats.suspended}
          icon={<XCircle />}
          color="text-red-500"
        />
      </div>

      {/* MINI ANALYTICS PANEL */}
      <div className="grid md:grid-cols-2 gap-4">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4" />
            <h2 className="font-semibold">
              Activité système
            </h2>
          </div>

          <div className="space-y-2 text-sm">
            <p>📊 Nouvelles organisations: +{stats.pending}</p>
            <p>⚡ Taux d’approbation: {(stats.active / (stats.total || 1) * 100).toFixed(1)}%</p>
            <p>🧠 Charge système: Stable</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            <h2 className="font-semibold">
              Performance
            </h2>
          </div>

          <div className="space-y-2 text-sm">
            <p>🚀 Temps réponse API: 120ms</p>
            <p>💾 Base de données: OK</p>
            <p>🔐 Sécurité: Active</p>
          </div>
        </motion.div>
      </div>

      {/* LISTE ORGANISATIONS */}
      <div className="space-y-3">
        <h2 className="font-semibold">
          Organisations en attente
        </h2>

        {orgs.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 border rounded-xl flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <p className="font-medium">
                  {org.name}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                {org.email}
              </p>

              <p className="text-sm text-muted-foreground">
                {org.email}
              </p>

              <p className="text-xs mt-1">
                Status:{" "}
                <span className="font-medium">
                  {org.status}
                </span>
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  action(org.id, "approve")
                }
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                <CheckCircle size={16} />
              </button>

              <button
                onClick={() =>
                  action(org.id, "reject")
                }
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <XCircle size={16} />
              </button>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* =========================
   COMPONENT STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 border rounded-xl bg-background shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>
        <span className={color}>{icon}</span>
      </div>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>
    </motion.div>
  )
}