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
  FileText,
} from "lucide-react"

/* =========================
   TYPES
========================= */

type Org = {
  id: string
  name: string
  email: string
  phone: string
  logo?: string | null

  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"

  members?: { id: string }[]         // Member association
  users?: { id: string }[]           // OrganizationMember
  logs?: { id: string; action: string; createdAt: string }[]

  createdAt: string
}

/* =========================
   PAGE
========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState<
    "ALL" | "ACTIVE" | "PENDING" | "SUSPENDED" | "ARCHIVED"
  >("ALL")

  /* =========================
     LOAD DATA
  ========================= */

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()
    setOrgs(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  /* =========================
     ACTIONS
  ========================= */

  const action = async (id: string, type: "approve" | "reject") => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  /* =========================
     FILTERED DATA
  ========================= */

  const filteredOrgs = useMemo(() => {
    if (filter === "ALL") return orgs
    return orgs.filter((o) => o.status === filter)
  }, [orgs, filter])

  /* =========================
     STATS SAFE
  ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      members: orgs.reduce((a, o) => a + (o.members?.length ?? 0), 0),
      users: orgs.reduce((a, o) => a + (o.users?.length ?? 0), 0),
      logs: orgs.reduce((a, o) => a + (o.logs?.length ?? 0), 0),
    }
  }, [orgs])

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Chargement du dashboard...
      </div>
    )
  }

  /* =========================
     UI
  ========================= */

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

      {/* FILTER */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded-lg text-sm border ${
              filter === f
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        <StatCard label="Total" value={stats.total} icon={<Building2 />} />
        <StatCard label="Pending" value={stats.pending} icon={<Clock />} />
        <StatCard label="Active" value={stats.active} icon={<CheckCircle />} />
        <StatCard label="Suspended" value={stats.suspended} icon={<XCircle />} />
        <StatCard label="Archived" value={stats.archived} icon={<Archive />} />
        <StatCard label="Members" value={stats.members} icon={<Users />} />
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Users plateforme</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Logs système</p>
          <p className="text-2xl font-bold">{stats.logs}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Taux actif</p>
          <p className="text-2xl font-bold">
            {((stats.active / (stats.total || 1)) * 100).toFixed(1)}%
          </p>
        </div>

      </div>

      {/* ORGANIZATIONS */}
      <div className="space-y-3">

        <h2 className="font-semibold">Organizations</h2>

        {filteredOrgs.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-4 border rounded-xl flex justify-between"
          >

            {/* LEFT */}
            <div className="flex gap-4">

              {/* LOGO */}
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {org.logo ? (
                  <img src={org.logo} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-muted-foreground">{org.email}</p>

                <div className="flex gap-3 text-xs mt-1 text-muted-foreground">
                  <span>Members: {org.members?.length ?? 0}</span>
                  <span>Users: {org.users?.length ?? 0}</span>
                </div>

                {/* LOGS PREVIEW */}
                <p className="text-xs mt-1 text-gray-400">
                  Logs: {org.logs?.length ?? 0}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              <StatusBadge status={org.status} />

              {org.status === "PENDING" && (
                <>
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
                </>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-red-100 text-red-700",
    ARCHIVED: "bg-gray-100 text-gray-600",
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${map[status]}`}>
      {status}
    </span>
  )
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}