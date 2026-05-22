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
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react"

/* =========================
   TYPES ROBUSTES
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
  phone?: string | null
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
  const [filter, setFilter] = useState("ALL")
  const [selectedLogs, setSelectedLogs] = useState<Log[] | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null)

  const [page, setPage] = useState(1)
  const perPage = 6

  /* =========================
     LOAD SAFE
  ========================= */

  const load = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/owner/organizations")
      const data = await res.json()

      setOrgs(Array.isArray(data) ? data : [])
    } catch (e) {
      setOrgs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  /* =========================
     ACTIONS PRO
  ========================= */

  const updateStatus = async (
    id: string,
    status: Org["status"]
  ) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    await load()
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
        const q = search.toLowerCase()
        return (
          o.name?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q)
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))

  /* =========================
     STATS SAFE
  ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      members: orgs.reduce(
        (a, o) => a + (o.members?.length ?? 0),
        0
      ),

      users: orgs.reduce(
        (a, o) => a + (o.users?.length ?? 0),
        0
      ),

      logs: orgs.reduce(
        (a, o) => a + (o.logs?.length ?? 0),
        0
      ),
    }
  }, [orgs])

  /* =========================
     UI STATES
========================= */

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
          <h1 className="text-2xl font-bold">
            Admin Control Center
          </h1>
          <p className="text-gray-500">
            Gestion complète des organisations
          </p>
        </div>

        <button
          onClick={load}
          className="px-3 py-2 border rounded-lg flex gap-2 items-center"
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
            placeholder="Search organization..."
            className="p-2 w-full outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map((f) => (
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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">

        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Active" value={stats.active} icon={<CheckCircle />} />
        <Stat label="Pending" value={stats.pending} icon={<Clock />} />
        <Stat label="Suspended" value={stats.suspended} icon={<PauseCircle />} />
        <Stat label="Archived" value={stats.archived} icon={<Archive />} />
        <Stat label="Members" value={stats.members} icon={<Users />} />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {paginated.map((org) => (
          <motion.div
            key={org.id}
            className="p-4 border rounded-xl flex justify-between items-center"
          >

            {/* LEFT */}
            <div className="flex gap-4">

              {/* LOGO SAFE */}
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {org.logo ? (
                  <img
                    src={org.logo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-semibold">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <div className="text-xs text-gray-400 mt-1 flex gap-3">
                  <span>👥 {org.members?.length ?? 0}</span>
                  <span>👤 {org.users?.length ?? 0}</span>
                  <span>📜 {org.logs?.length ?? 0}</span>
                </div>

                <Status status={org.status} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 flex-wrap">

              {org.status !== "ACTIVE" && (
                <button
                  onClick={() => updateStatus(org.id, "ACTIVE")}
                  className="px-3 py-2 bg-green-500 text-white rounded"
                >
                  Activate
                </button>
              )}

              {org.status !== "SUSPENDED" && (
                <button
                  onClick={() => updateStatus(org.id, "SUSPENDED")}
                  className="px-3 py-2 bg-orange-500 text-white rounded"
                >
                  Suspend
                </button>
              )}

              {org.status !== "ARCHIVED" && (
                <button
                  onClick={() => updateStatus(org.id, "ARCHIVED")}
                  className="px-3 py-2 bg-gray-700 text-white rounded"
                >
                  Archive
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedLogs(org.logs ?? [])
                  setSelectedOrg(org)
                }}
                className="px-3 py-2 border rounded"
              >
                <Eye size={16} />
              </button>

            </div>

          </motion.div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2">
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

      {/* LOG MODAL */}
      {selectedLogs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl w-[400px]">

            <h2 className="font-bold mb-3">
              Logs {selectedOrg?.name}
            </h2>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {selectedLogs.map((l) => (
                <div key={l.id} className="text-sm border-b py-2">
                  {l.action}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedLogs(null)}
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

/* =========================
   COMPONENTS
========================= */

function Status({ status }: { status: string }) {
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
    <div className="border rounded-xl p-3">
      <div className="flex justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        {icon}
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}