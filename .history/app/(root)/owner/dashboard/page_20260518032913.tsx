"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  CheckCircle,
  Clock,
  Archive,
  PauseCircle,
  Search,
  RefreshCw,
  Eye,
  Users,
  SortAsc,
  Filter,
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
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"
  members?: { id: string }[]
  logs?: Log[]
  createdAt: string
}

/* ========================= COMPONENT ========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"ALL" | Org["status"]>("ALL")
  const [sort, setSort] = useState<"DATE" | "NAME" | "MEMBERS">("DATE")

  const [page, setPage] = useState(1)
  const perPage = 6

  const [selectedLogs, setSelectedLogs] = useState<Log[] | null>(null)

  /* ========================= LOAD SAFE ========================= */

  const load = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/owner/organizations")

      if (!res.ok) {
        console.error(await res.text())
        setOrgs([])
        return
      }

      const data = await res.json()
      setOrgs(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setOrgs([])
    } finally {
      setLoading(false)
    }
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

    await load()
  }

  /* ========================= FILTER + SEARCH ========================= */

  const filtered = useMemo(() => {
    let data = [...orgs]

    if (filter !== "ALL") {
      data = data.filter(o => o.status === filter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        o =>
          o.name.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q)
      )
    }

    if (sort === "NAME") {
      data.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sort === "MEMBERS") {
      data.sort((a, b) =>
        (b.members?.length ?? 0) - (a.members?.length ?? 0)
      )
    }

    if (sort === "DATE") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
    }

    return data
  }, [orgs, filter, search, sort])

  /* ========================= PAGINATION ========================= */

  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page])

  /* reset page on filter */
  useEffect(() => {
    setPage(1)
  }, [filter, search])

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

  /* ========================= LOADING ========================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Chargement système...
      </div>
    )
  }

  /* ========================= UI ========================= */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Admin Control Center
          </h1>
          <p className="text-gray-500">
            Gestion avancée des organisations
          </p>
        </div>

        <button
          onClick={load}
          className="flex gap-2 px-3 py-2 border rounded-lg"
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

      {/* CONTROL BAR */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* SEARCH */}
        <div className="flex items-center border rounded-lg px-3 w-full">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organization..."
            className="p-2 w-full outline-none"
          />
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 border rounded ${
                filter === f ? "bg-black text-white" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* SORT */}
        <button
          onClick={() =>
            setSort(prev =>
              prev === "DATE"
                ? "NAME"
                : prev === "NAME"
                ? "MEMBERS"
                : "DATE"
            )
          }
          className="flex items-center gap-2 border px-3 py-2 rounded"
        >
          <SortAsc size={16} />
          Sort
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {paginated.map(org => (
          <motion.div
            key={org.id}
            className="border rounded-xl p-4 flex justify-between hover:shadow-md transition"
          >

            {/* LEFT */}
            <div>
              <p className="font-semibold">{org.name}</p>
              <p className="text-sm text-gray-500">{org.email}</p>

              <div className="text-xs text-gray-400 mt-1 flex gap-3">
                <span>👥 {org.members?.length ?? 0}</span>
              </div>

              <span className="text-xs px-2 py-1 bg-gray-100 rounded mt-2 inline-block">
                {org.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              {org.status !== "ACTIVE" && (
                <button
                  onClick={() => updateStatus(org.id, "ACTIVE")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Activer
                </button>
              )}

              {org.status !== "SUSPENDED" && (
                <button
                  onClick={() => updateStatus(org.id, "SUSPENDED")}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  Suspendre
                </button>
              )}

              {org.status !== "ARCHIVED" && (
                <button
                  onClick={() => updateStatus(org.id, "ARCHIVED")}
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                >
                  Archiver
                </button>
              )}

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
          <div className="bg-white p-4 rounded w-[400px]">

            <h2 className="font-bold mb-2">Logs</h2>

            <div className="space-y-2 max-h-[300px] overflow-auto">
              {selectedLogs.map(l => (
                <p key={l.id} className="text-sm border-b py-1">
                  {l.action}
                </p>
              ))}
            </div>

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

/* ========================= UI COMPONENTS ========================= */

function Stat({ label, value, icon }: any) {
  return (
    <div className="border p-3 rounded-lg">
      <div className="flex justify-between text-sm text-gray-500">
        {label}
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}