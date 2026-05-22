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
  Eye,
  Image as ImageIcon,
  RefreshCw,
  Users,
} from "lucide-react"

/* ========================= TYPES ========================= */

type Log = {
  id: string
  action: string
}

type Org = {
  id: string
  name: string
  email: string
  logo?: string | null

  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"

  members?: { id: string }[]
  logs?: Log[]
}

/* ========================= PAGE ========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"ALL" | Org["status"]>("ALL")

  const [selected, setSelected] = useState<string[]>([])

  const [logs, setLogs] = useState<Log[] | null>(null)

  /* ========================= LOAD ========================= */

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/owner/organizations")
      const data = await res.json()
      setOrgs(Array.isArray(data) ? data : [])
    } catch {
      setOrgs([])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  /* ========================= ACTION ========================= */

  const updateStatus = async (
    ids: string[],
    status: Org["status"]
  ) => {
    await Promise.all(
      ids.map((id) =>
        fetch(`/api/owner/organizations/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        })
      )
    )

    setSelected([])
    load()
  }

  /* ========================= FILTERS ========================= */

  const filtered = useMemo(() => {
    return orgs
      .filter((o) => (tab === "ALL" ? true : o.status === tab))
      .filter((o) =>
        `${o.name} ${o.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  }, [orgs, tab, search])

  /* ========================= SELECTION ========================= */

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelected(filtered.map((o) => o.id))
  }

  const clearSelection = () => setSelected([])

  /* ========================= STATS ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter((o) => o.status === "ACTIVE").length,
      pending: orgs.filter((o) => o.status === "PENDING").length,
      suspended: orgs.filter((o) => o.status === "SUSPENDED").length,
      archived: orgs.filter((o) => o.status === "ARCHIVED").length,
    }
  }, [orgs])

  if (loading) return <div className="p-10">Loading...</div>

  /* ========================= UI ========================= */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Organizations Control
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

      {/* SEARCH + TABS */}
      <div className="space-y-3">

        {/* SEARCH */}
        <div className="flex items-center border rounded px-3 py-2">
          <Search size={16} />
          <input
            className="w-full p-2 outline-none"
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABS */}
        <div className="flex gap-2 flex-wrap">
          {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map(
            (t: any) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded border ${
                  tab === t ? "bg-black text-white" : ""
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* BULK ACTIONS */}
        {selected.length > 0 && (
          <div className="flex gap-2 p-2 border rounded bg-gray-50">
            <span className="text-sm">
              {selected.length} selected
            </span>

            <button
              onClick={() => updateStatus(selected, "ACTIVE")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Activate
            </button>

            <button
              onClick={() => updateStatus(selected, "SUSPENDED")}
              className="bg-orange-500 text-white px-3 py-1 rounded"
            >
              Suspend
            </button>

            <button
              onClick={() => updateStatus(selected, "ARCHIVED")}
              className="bg-gray-700 text-white px-3 py-1 rounded"
            >
              Archive
            </button>

            <button
              onClick={clearSelection}
              className="border px-3 py-1 rounded"
            >
              Clear
            </button>
          </div>
        )}

        <button
          onClick={selectAll}
          className="text-sm text-blue-500"
        >
          Select all visible
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((org) => (
          <motion.div
            key={org.id}
            className={`border p-4 rounded flex justify-between items-center ${
              selected.includes(org.id)
                ? "bg-blue-50 border-blue-300"
                : ""
            }`}
          >

            {/* LEFT */}
            <div className="flex gap-3 items-center">

              <input
                type="checkbox"
                checked={selected.includes(org.id)}
                onChange={() => toggleSelect(org.id)}
              />

              {/* LOGO */}
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                {org.logo ? (
                  <img src={org.logo} />
                ) : (
                  <ImageIcon />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-bold">{org.name}</p>
                <p className="text-sm text-gray-500">
                  {org.email}
                </p>

                <p className="text-xs text-gray-400">
                  👥 {org.members?.length ?? 0}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex gap-2">

              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                {org.status}
              </span>

              <button
                onClick={() => setLogs(org.logs ?? [])}
                className="border px-2 py-1 rounded"
              >
                <Eye size={14} />
              </button>

            </div>

          </motion.div>
        ))}
      </div>

      {/* LOG MODAL */}
      {logs && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-[400px]">
            <h2 className="font-bold mb-2">Logs</h2>

            {logs.map((l) => (
              <p key={l.id} className="text-sm border-b py-1">
                {l.action}
              </p>
            ))}

            <button
              onClick={() => setLogs(null)}
              className="mt-3 bg-black text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

/* ========================= COMPONENT ========================= */

function Stat({ label, value, icon }: any) {
  return (
    <div className="border p-3 rounded">
      <div className="flex justify-between text-gray-500 text-sm">
        {label}
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}