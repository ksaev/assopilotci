"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Archive,
  Search,
  Eye,
  Users,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  logo?: string | null
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"
  members?: any[]
  users?: any[]
  logs?: any[]
}

export default function Dashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")
  const [logs, setLogs] = useState<any[] | null>(null)

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

  const update = async (id: string, action: string) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })

    await load()
  }

  const filtered = useMemo(() => {
    return orgs
      .filter(o => filter === "ALL" || o.status === filter)
      .filter(o =>
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase())
      )
  }, [orgs, filter, search])

  const stats = useMemo(() => ({
    total: orgs.length,
    active: orgs.filter(o => o.status === "ACTIVE").length,
    pending: orgs.filter(o => o.status === "PENDING").length,
    suspended: orgs.filter(o => o.status === "SUSPENDED").length,
    archived: orgs.filter(o => o.status === "ARCHIVED").length,
    members: orgs.reduce((a, o) => a + (o.members?.length ?? 0), 0),
  }), [orgs])

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Control Panel</h1>

        <button onClick={load} className="flex gap-2 border px-3 py-2">
          <RefreshCw size={16} />
          Reload
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-3">
        <Stat label="Total" value={stats.total} />
        <Stat label="Active" value={stats.active} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Suspended" value={stats.suspended} />
        <Stat label="Archived" value={stats.archived} />
      </div>

      {/* SEARCH */}
      <input
        className="border p-2 w-full"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="flex gap-2">
        {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="border px-2 py-1"
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map(org => (
          <motion.div
            key={org.id}
            className="border p-4 rounded flex justify-between"
          >

            {/* LEFT */}
            <div className="flex gap-3">

              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                {org.logo ? (
                  <img src={org.logo} />
                ) : (
                  <ImageIcon />
                )}
              </div>

              <div>
                <p className="font-bold">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <p className="text-xs">
                  👥 {org.members?.length ?? 0} | 👤 {org.users?.length ?? 0}
                </p>

                <p className="text-xs">{org.status}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button onClick={() => update(org.id, "activate")} className="bg-green-500 text-white px-2">
                Active
              </button>

              <button onClick={() => update(org.id, "suspend")} className="bg-orange-500 text-white px-2">
                Suspend
              </button>

              <button onClick={() => update(org.id, "archive")} className="bg-gray-700 text-white px-2">
                Archive
              </button>

              <button onClick={() => setLogs(org.logs ?? [])} className="border px-2">
                <Eye size={16} />
              </button>

            </div>

          </motion.div>
        ))}
      </div>

      {/* LOGS */}
      {logs && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 w-[400px]">
            {logs.map(l => (
              <div key={l.id}>{l.action}</div>
            ))}

            <button onClick={() => setLogs(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: any) {
  return (
    <div className="border p-3">
      <p className="text-xs">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}