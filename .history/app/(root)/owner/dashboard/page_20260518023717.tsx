"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Users,
  Archive,
  Image as ImageIcon,
  PauseCircle,
  PlayCircle,
} from "lucide-react"

/* =========================
   TYPE
========================= */

type Org = {
  id: string
  name: string
  email: string
  phone?: string
  logo?: string | null

  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"

  members?: { id: string }[]
  users?: { id: string }[]
  logs?: { id: string; action: string }[]

  createdAt: string
}

/* =========================
   PAGE
========================= */

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)

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
    type: "activate" | "suspend" | "archive" | "reject"
  ) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  /* =========================
     STATS SAFE
  ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,

      members: orgs.reduce((a, o) => a + (o.members?.length ?? 0), 0),
      users: orgs.reduce((a, o) => a + (o.users?.length ?? 0), 0),
    }
  }, [orgs])

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Chargement...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Admin Platform</h1>
        <p className="text-gray-500">
          Gestion des organisations
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Pending" value={stats.pending} icon={<Clock />} />
        <Stat label="Active" value={stats.active} icon={<CheckCircle />} />
        <Stat label="Suspended" value={stats.suspended} icon={<PauseCircle />} />
        <Stat label="Archived" value={stats.archived} icon={<Archive />} />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {orgs.map((org) => (
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
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div>
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-gray-500">{org.email}</p>

                <div className="text-xs text-gray-400 mt-1">
                  Members: {org.members?.length ?? 0} | Users: {org.users?.length ?? 0}
                </div>

                <div className="text-xs text-gray-400">
                  Logs: {org.logs?.length ?? 0}
                </div>

                <StatusBadge status={org.status} />
              </div>
            </div>

            {/* ACTIONS */}
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

              {org.status === "PENDING" && (
                <button
                  onClick={() => action(org.id, "reject")}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg"
                >
                  Reject
                </button>
              )}

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  )
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-orange-100 text-orange-700",
    ARCHIVED: "bg-gray-200 text-gray-600",
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${map[status]}`}>
      {status}
    </span>
  )
}

/* =========================
   STAT CARD
========================= */

function Stat({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}