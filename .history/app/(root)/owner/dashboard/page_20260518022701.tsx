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
  Archive,
  Image as ImageIcon,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  phone: string
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"
  logo?: string | null

  members?: { id: string }[]          // 👈 Member (association)
  users?: { id: string }[]            // 👈 OrganizationMember

  createdAt: string
}

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()
    setOrgs(data ?? []) // 🔥 sécurité anti undefined
    setLoading(false)
  }

  const action = async (id: string, type: "approve" | "reject") => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  useEffect(() => {
    load()
  }, [])

  // 🔥 STATS ULTRA SAFE
  const stats = useMemo(() => {
    return {
      total: orgs.length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      // 👇 SAFE COUNT MEMBERS (association)
      members: orgs.reduce((acc, o) => {
        return acc + (o.members?.length ?? 0)
      }, 0),

      // 👇 SAFE COUNT USERS (plateforme)
      users: orgs.reduce((acc, o) => {
        return acc + (o.users?.length ?? 0)
      }, 0),
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

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <StatCard label="Total" value={stats.total} icon={<Building2 />} color="text-blue-500" />
        <StatCard label="En attente" value={stats.pending} icon={<Clock />} color="text-yellow-500" />
        <StatCard label="Actives" value={stats.active} icon={<CheckCircle />} color="text-green-500" />
        <StatCard label="Suspendues" value={stats.suspended} icon={<XCircle />} color="text-red-500" />
        <StatCard label="Archivées" value={stats.archived} icon={<Archive />} color="text-gray-500" />
      </div>

      {/* EXTRA KPI */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="p-4 border rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" />
            <h2 className="font-semibold">Membres plateforme</h2>
          </div>

          <p className="text-2xl font-bold">{stats.users}</p>
          <p className="text-sm text-muted-foreground">
            utilisateurs liés aux organisations
          </p>
        </div>

        <div className="p-4 border rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4" />
            <h2 className="font-semibold">Membres associations</h2>
          </div>

          <p className="text-2xl font-bold">{stats.members}</p>
          <p className="text-sm text-muted-foreground">
            profils enregistrés
          </p>
        </div>
      </div>

      {/* LISTE ORGS */}
      <div className="space-y-3">
        <h2 className="font-semibold">Organisations</h2>

        {orgs.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 border rounded-xl flex justify-between items-center"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* LOGO */}
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {org.logo ? (
                  <img
                    src={org.logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-muted-foreground">{org.email}</p>
                <p className="text-xs text-muted-foreground">
                  Membres: {org.members?.length ?? 0}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() => action(org.id, "approve")}
                className="px-3 py-2 bg-green-500 text-white rounded-lg"
              >
                <CheckCircle size={16} />
              </button>

              <button
                onClick={() => action(org.id, "reject")}
                className="px-3 py-2 bg-red-500 text-white rounded-lg"
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

/* ========================= */
function StatCard({
  label,
  value,
  icon,
  color,
}: any) {
  return (
    <div className="p-4 border rounded-xl">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className={color}>{icon}</span>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}