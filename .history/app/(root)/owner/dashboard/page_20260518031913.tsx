"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  CheckCircle,
  Clock,
  Archive,
  PauseCircle,
  Users,
  RefreshCw,
  Eye,
  Image as ImageIcon,
} from "lucide-react"

/* ========================= TYPES ========================= */

type Log = {
  id: string
  action: string
  createdAt: string
}

type Org = {
  id: string
  name: string
  email: string
  phone?: string | null
  logo?: string | null

  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"

  members?: { id: string }[]
  logs?: Log[]

  createdAt: string
}

/* ========================= PAGE ========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [selectedLogs, setSelectedLogs] = useState<Log[] | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()

    setOrgs(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  /* ========================= UPDATE STATUS ========================= */

  const updateStatus = async (id: string, status: Org["status"]) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    load()
  }

  /* ========================= FILTER ========================= */

  const filtered = useMemo(() => {
    return orgs
      .filter((o) => filter === "ALL" || o.status === filter)
      .filter((o) => {
        const q = search.toLowerCase()
        return (
          o.name?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q)
        )
      })
  }, [orgs, filter, search])

  /* ========================= STATS ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,
      members: orgs.reduce((a, o) => a + (o.members?.length ?? 0), 0),
    }
  }, [orgs])

  if (loading) {
    return <div className="p-10">Chargement...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Admin Control Center
        </h1>

        <button
          onClick={load}
          className="flex gap-2 border px-3 py-2 rounded"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Active" value={stats.active} icon={<CheckCircle />} />
        <Stat label="Pending" value={stats.pending} icon={<Clock />} />
        <Stat label="Suspended" value={stats.suspended} icon={<PauseCircle />} />
        <Stat label="Archived" value={stats.archived} icon={<Archive />} />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((org) => (
          <motion.div
            key={org.id}
            className="border p-4 rounded-xl flex justify-between"
          >

            {/* LEFT */}
            <div className="flex gap-4">

              {/* LOGO */}
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                {org.logo ? (
                  <img src={org.logo} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-bold">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <div className="text-xs text-gray-400">
                  👥 {org.members?.length ?? 0} membres
                </div>

                <Status status={org.status} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button onClick={() => updateStatus(org.id, "ACTIVE")} className="bg-green-500 text-white px-3 py-1 rounded">
                Activer
              </button>

              <button onClick={() => updateStatus(org.id, "SUSPENDED")} className="bg-orange-500 text-white px-3 py-1 rounded">
                Suspendre
              </button>

              <button onClick={() => updateStatus(org.id, "ARCHIVED")} className="bg-gray-700 text-white px-3 py-1 rounded">
                Archiver
              </button>

              <button
                onClick={() => setSelectedLogs(org.logs ?? [])}
                className="border px-3 py-1 rounded"
              >
                <Eye size={16} />
              </button>

            </div>

          </motion.div>
        ))}
      </div>

      {/* LOGS */}
      {selectedLogs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-[400px]">
            <h2 className="font-bold mb-2">Logs</h2>

            {selectedLogs.map(l => (
              <p key={l.id} className="text-sm border-b py-1">
                {l.action}
              </p>
            ))}

            <button
              onClick={() => setSelectedLogs(null)}
              className="mt-3 bg-black text-white px-3 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

/* ========================= COMPONENTS ========================= */

function Stat({ label, value, icon }: any) {
  return (
    <div className="border p-3 rounded">
      <div className="flex justify-between text-sm text-gray-500">
        {label}
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}

function Status({ status }: { status: string }) {
  const map: any = {
    ACTIVE: "text-green-600",
    PENDING: "text-yellow-600",
    SUSPENDED: "text-orange-600",
    ARCHIVED: "text-gray-500",
  }

  return (
    <span className={`text-xs font-bold ${map[status]}`}>
      {status}
    </span>
  )
}