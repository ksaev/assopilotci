"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Archive,
  PauseCircle,
  Eye,
  Users,
  RefreshCw,
  Image as ImageIcon,
  Search,
} from "lucide-react"

/* ================= TYPES ================= */

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

  members?: any[]
  memberProfiles?: any[]
  logs?: Log[]

  _count?: {
    members: number
    memberProfiles: number
    logs: number
  }

  createdAt: string
}

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [logs, setLogs] = useState<Log[] | null>(null)

  /* ================= LOAD ================= */

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

  /* ================= ACTION ================= */

  const action = async (id: string, action: string) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })

    load()
  }

  /* ================= FILTER ================= */

  const filtered = useMemo(() => {
    return orgs
      .filter(o => filter === "ALL" || o.status === filter)
      .filter(o =>
        o.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.email?.toLowerCase().includes(search.toLowerCase())
      )
  }, [orgs, filter, search])

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      members: orgs.reduce((a, o) => a + (o._count?.members ?? 0), 0),
      logs: orgs.reduce((a, o) => a + (o._count?.logs ?? 0), 0),
    }
  }, [orgs])

  if (loading) {
    return <div className="p-10 text-gray-500">Chargement système...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Control Center</h1>
          <p className="text-gray-500">Gestion SaaS organisations</p>
        </div>

        <button
          onClick={load}
          className="border px-3 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="border flex items-center px-2 w-full md:w-1/2">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full outline-none"
            placeholder="Search..."
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["ALL","ACTIVE","PENDING","SUSPENDED","ARCHIVED"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 border rounded ${
                filter === f ? "bg-black text-white" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Active" value={stats.active} icon={<CheckCircle />} />
        <Stat label="Pending" value={stats.pending} icon={<Clock />} />
        <Stat label="Suspended" value={stats.suspended} icon={<PauseCircle />} />
        <Stat label="Members" value={stats.members} icon={<Users />} />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filtered.map(org => (
          <motion.div
            key={org.id}
            className="border rounded-xl p-4 flex justify-between"
          >

            {/* LEFT */}
            <div className="flex gap-4">

              {/* LOGO */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {org.logo ? (
                  <img src={org.logo} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-400 w-5 h-5" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-semibold">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <div className="text-xs text-gray-400 flex gap-3 mt-1">
                  <span>👥 {org._count?.members ?? 0}</span>
                  <span>📜 {org._count?.logs ?? 0}</span>
                </div>

                <Status status={org.status} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 flex-wrap">

              {org.status !== "ACTIVE" && (
                <button
                  onClick={() => action(org.id, "activate")}
                  className="px-3 py-2 bg-green-500 text-white rounded"
                >
                  Activate
                </button>
              )}

              {org.status !== "SUSPENDED" && (
                <button
                  onClick={() => action(org.id, "suspend")}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Suspend
                </button>
              )}

              {org.status !== "ARCHIVED" && (
                <button
                  onClick={() => action(org.id, "archive")}
                  className="px-3 py-2 bg-gray-700 text-white rounded"
                >
                  Archive
                </button>
              )}

              {org.status === "ARCHIVED" && (
                <button
                  onClick={() => action(org.id, "restore")}
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                >
                  Restore
                </button>
              )}

              <button
                onClick={() => setLogs(org.logs ?? [])}
                className="px-3 py-2 border rounded"
              >
                <Eye size={16} />
              </button>

            </div>

          </motion.div>
        ))}
      </div>

      {/* LOGS */}
      {logs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-[400px]">
            <h2 className="font-bold mb-3">Logs</h2>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {logs.map(l => (
                <div key={l.id} className="text-sm border-b py-2">
                  {l.action}
                </div>
              ))}
            </div>

            <button
              onClick={() => setLogs(null)}
              className="mt-3 px-3 py-2 bg-black text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

/* ================= UI COMPONENTS ================= */

function Status({ status }: { status: string }) {
  const map: any = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-red-100 text-red-700",
    ARCHIVED: "bg-gray-200 text-gray-600",
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  )
}

function Stat({ label, value, icon }: any) {
  return (
    <div className="border rounded-xl p-3 bg-white">
      <div className="flex justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        {icon}
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}