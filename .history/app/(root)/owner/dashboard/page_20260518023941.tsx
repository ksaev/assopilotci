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
  PlayCircle,
  Search,
  Eye,
  Users,
  Activity,
  FileText,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react"

/* =========================
   TYPES
========================= */

type Log = {
  id: string
  action: string
  createdAt: string
}

type Org = {
  id: string
  name: string
  email: string
  phone?: string
  logo?: string | null

  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"

  members?: { id: string }[]
  users?: { id: string }[]
  logs?: Log[]

  createdAt: string
}

/* =========================
   PAGE
========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("ALL")
  const [selectedLogs, setSelectedLogs] = useState<Log[] | null>(null)

  const [page, setPage] = useState(1)
  const perPage = 5

  /* =========================
     LOAD
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

  const action = async (
    id: string,
    type: "activate" | "suspend" | "archive" | "reject" | "restore"
  ) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  /* =========================
     FILTER + SEARCH
  ========================= */

  const filtered = useMemo(() => {
    return orgs
      .filter((o) => {
        if (filter === "ALL") return true
        return o.status === filter
      })
      .filter((o) => {
        return (
          o.name.toLowerCase().includes(search.toLowerCase()) ||
          o.email.toLowerCase().includes(search.toLowerCase())
        )
      })
  }, [orgs, filter, search])

  /* =========================
     PAGINATION
  ========================= */

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / perPage)

  /* =========================
     STATS
  ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      members: orgs.reduce((a, o) => a + (o.members?.length ?? 0), 0),
      users: orgs.reduce((a, o) => a + (o.users?.length ?? 0), 0),
      logs: orgs.reduce((a, o) => a + (o.logs?.length ?? 0), 0),
    }
  }, [orgs])

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Chargement système...
      </div>
    )
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Control Center</h1>
          <p className="text-gray-500">Gestion avancée des organisations</p>
        </div>

        <button
          onClick={load}
          className="px-3 py-2 border rounded-lg flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3">

        <div className="flex items-center border rounded-lg px-3 w-full md:w-1/2">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search org..."
            className="p-2 w-full outline-none"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                filter === f ? "bg-black text-white" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Active" value={stats.active} icon={<CheckCircle />} />
        <Stat label="Pending" value={stats.pending} icon={<Clock />} />
        <Stat label="Suspended" value={stats.suspended} icon={<PauseCircle />} />
        <Stat label="Archived" value={stats.archived} icon={<Archive />} />
        <Stat label="Members" value={stats.members} icon={<Users />} />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {paginated.map((org, i) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-xl p-4 flex justify-between"
          >

            {/* LEFT */}
            <div className="flex gap-4">

              {/* LOGO */}
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                {org.logo ? (
                  <img src={org.logo} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-400 w-5 h-5" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <div className="text-xs text-gray-400 mt-1 flex gap-3">
                  <span>👥 {org.members?.length ?? 0}</span>
                  <span>👤 {org.users?.length ?? 0}</span>
                  <span>📜 {org.logs?.length ?? 0}</span>
                </div>

                <StatusBadge status={org.status} />
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-2 flex-wrap items-center">

              {org.status !== "ACTIVE" && (
                <button
                  onClick={() => action(org.id, "activate")}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg"
                >
                  <PlayCircle size={16} />
                </button>
              )}

              {org.status !== "SUSPENDED" && (
                <button
                  onClick={() => action(org.id, "suspend")}
                  className="px-3 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Suspend
                </button>
              )}

              {org.status !== "ARCHIVED" && (
                <button
                  onClick={() => action(org.id, "archive")}
                  className="px-3 py-2 bg-gray-700 text-white rounded-lg"
                >
                  Archive
                </button>
              )}

              {/* LOGS */}
              <button
                onClick={() => setSelectedLogs(org.logs ?? [])}
                className="px-3 py-2 border rounded-lg"
              >
                <Eye size={16} />
              </button>

            </div>

          </motion.div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* LOGS MODAL */}
      {selectedLogs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-[400px]">

            <h2 className="font-bold mb-3">Logs</h2>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {selectedLogs.map((log) => (
                <div key={log.id} className="text-sm border-b pb-2">
                  {log.action}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedLogs(null)}
              className="mt-3 px-3 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

/* =========================
   COMPONENTS
========================= */

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-orange-100 text-orange-700",
    ARCHIVED: "bg-gray-200 text-gray-600",
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${map[status]}`}>
      {status}
    </span>
  )
}

function Stat({ label, value, icon }: any) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}