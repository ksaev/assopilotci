"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Building2,
  Clock,
  Activity,
  TrendingUp,
  Archive,
  Users,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  phone: string
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"
  createdAt: string
  membersCount: number
  logs?: {
    id: string
    action: string
    createdAt: string
  }[]
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
    type: "approve" | "reject" | "archive"
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

  // 📊 STATS
  const stats = useMemo(() => {
    return {
      total: orgs.length,
      pending: orgs.filter((o) => o.status === "PENDING").length,
      active: orgs.filter((o) => o.status === "ACTIVE").length,
      suspended: orgs.filter((o) => o.status === "SUSPENDED").length,
      archived: orgs.filter((o) => o.status === "ARCHIVED").length,
    }
  }, [orgs])

  // FILTERS
  const pendingOrgs = useMemo(
    () => orgs.filter((o) => o.status === "PENDING"),
    [orgs]
  )

  const activeOrgs = useMemo(
    () => orgs.filter((o) => o.status === "ACTIVE"),
    [orgs]
  )

  const suspendedOrgs = useMemo(
    () => orgs.filter((o) => o.status === "SUSPENDED"),
    [orgs]
  )

  const archivedOrgs = useMemo(
    () => orgs.filter((o) => o.status === "ARCHIVED"),
    [orgs]
  )

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Chargement du dashboard...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">

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

        <StatCard label="Total" value={stats.total} icon={<Building2 />} />
        <StatCard label="Pending" value={stats.pending} icon={<Clock />} />
        <StatCard label="Active" value={stats.active} icon={<CheckCircle />} />
        <StatCard label="Suspended" value={stats.suspended} icon={<XCircle />} />
        <StatCard label="Archived" value={stats.archived} icon={<Archive />} />

      </div>

      {/* PENDING */}
      <Section title="En attente" color="text-yellow-500">
        {pendingOrgs.map((org, i) => (
          <OrgCard key={org.id} org={org} i={i} action={action} />
        ))}
      </Section>

      {/* ACTIVE */}
      <Section title="Actives" color="text-green-500">
        {activeOrgs.map((org, i) => (
          <OrgCard key={org.id} org={org} i={i} action={action} />
        ))}
      </Section>

      {/* SUSPENDED */}
      <Section title="Suspendues" color="text-red-500">
        {suspendedOrgs.map((org, i) => (
          <OrgCard key={org.id} org={org} i={i} action={action} />
        ))}
      </Section>

      {/* ARCHIVED */}
      <Section title="Archivées" color="text-gray-500">
        {archivedOrgs.map((org, i) => (
          <OrgCard key={org.id} org={org} i={i} action={action} />
        ))}
      </Section>

    </div>
  )
}

/* =========================
   SECTION WRAPPER
========================= */

function Section({
  title,
  color,
  children,
}: {
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <h2 className={`font-semibold ${color}`}>
        {title}
      </h2>
      {children}
    </div>
  )
}

/* =========================
   ORG CARD
========================= */

function OrgCard({
  org,
  i,
  action,
}: {
  org: Org
  i: number
  action: (id: string, type: "approve" | "reject" | "archive") => void
}) {
  const [showLogs, setShowLogs] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="p-4 border rounded-xl flex justify-between"
    >
      {/* LEFT */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <p className="font-medium">{org.name}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          {org.email}
        </p>

        <p className="text-sm text-muted-foreground">
          {org.phone}
        </p>

        <p className="text-xs">
          Status: <b>{org.status}</b>
        </p>

        <p className="text-sm flex items-center gap-1">
          <Users className="w-4 h-4" />
          {org.membersCount} membres
        </p>

        <button
          onClick={() => setShowLogs(!showLogs)}
          className="text-xs text-blue-500 mt-1"
        >
          Voir logs
        </button>

        {showLogs && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs space-y-1">
            {org.logs?.map((log) => (
              <div key={log.id} className="flex justify-between">
                <span>{log.action}</span>
                <span className="text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
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

        <button
          onClick={() => action(org.id, "archive")}
          className="px-3 py-2 bg-gray-500 text-white rounded-lg"
        >
          <Archive size={16} />
        </button>
      </div>
    </motion.div>
  )
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="p-4 border rounded-xl">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}