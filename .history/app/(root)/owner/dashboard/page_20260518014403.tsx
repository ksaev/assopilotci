"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  status: "ACTIVE" | "PENDING" | "SUSPENDED"
  createdAt: string
}

export default function SuperAdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()
    setOrgs(data)
    setLoading(false)
  }

  const action = async (id: string, type: "approve" | "reject") => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: type }),
    })

    await load()
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter((o) => o.status === "ACTIVE").length,
      pending: orgs.filter((o) => o.status === "PENDING").length,
      suspended: orgs.filter((o) => o.status === "SUSPENDED").length,
    }
  }, [orgs])

  return (
    <div className="p-6 space-y-6 bg-muted/30 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Super Admin Console
        </h1>

        <button
          onClick={load}
          className="flex items-center gap-2 px-3 py-2 border rounded-lg"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Stat label="Total" value={stats.total} />
        <Stat label="Actives" value={stats.active} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Suspended" value={stats.suspended} />

      </div>

      {/* LIST */}
      <div className="space-y-3">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          orgs.map((org) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-xl bg-white flex justify-between items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-semibold">
                    {org.name}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {org.email}
                </p>

                <StatusBadge status={org.status} />
              </div>

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
          ))
        )}
      </div>
    </div>
  )
}

/* ================= UI COMPONENTS ================= */

function Stat({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  const map: any = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-red-100 text-red-700",
  }

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[status]}`}>
      {status}
    </span>
  )
}