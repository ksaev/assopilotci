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
  members?: { id: string }[]
  logs?: { id: string; action: string }[]
}

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/owner/organizations")

      const text = await res.text()
      const data = text ? JSON.parse(text) : []

      setOrgs(Array.isArray(data) ? data : [])
    } catch {
      setOrgs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id: string, action: string) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })

    await load()
  }

  const filtered = useMemo(() => {
    return orgs
      .filter((o) => (filter === "ALL" ? true : o.status === filter))
      .filter((o) =>
        o.name.toLowerCase().includes(search.toLowerCase())
      )
  }, [orgs, search, filter])

  if (loading) {
    return <div className="p-10">Chargement...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Control Center</h1>
        </div>

        <button
          onClick={load}
          className="flex gap-2 border px-3 py-2 rounded"
        >
          <RefreshCw size={16} />
          Reload
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2">
        <Search />
        <input
          className="border p-2 w-full"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["ALL", "ACTIVE", "PENDING", "SUSPENDED", "ARCHIVED"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="border px-3 py-1"
            >
              {f}
            </button>
          )
        )}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filtered.map((org) => (
          <motion.div
            key={org.id}
            className="border p-4 rounded flex justify-between"
          >
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
                <p className="text-sm">{org.email}</p>

                <p className="text-xs">
                  👥 {org.members?.length ?? 0}
                </p>

                <span className="text-xs px-2 py-1 bg-gray-200">
                  {org.status}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(org.id, "activate")}
                className="bg-green-500 text-white px-2"
              >
                ACTIVE
              </button>

              <button
                onClick={() => updateStatus(org.id, "suspend")}
                className="bg-orange-500 text-white px-2"
              >
                SUSPEND
              </button>

              <button
                onClick={() => updateStatus(org.id, "archive")}
                className="bg-gray-700 text-white px-2"
              >
                ARCHIVE
              </button>

              <button className="border px-2">
                <Eye size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}