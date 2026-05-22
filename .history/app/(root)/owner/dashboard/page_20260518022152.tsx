"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Building2,
  Clock,
  Users,
  Activity,
  Archive,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type Log = {
  id: string
  action: string
  entity: string
  createdAt: string
}

type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
}

type Org = {
  id: string
  name: string
  email: string
  phone?: string
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "ARCHIVED"
  logo?: string | null
  members: Member[]
  logs: Log[]
}

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch("/api/owner/organizations")
    const data = await res.json()
    setOrgs(data)
    setLoading(false)
  }

  const action = async (id: string, type: string) => {
    await fetch(`/api/owner/organizations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    })

    load()
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(o => o.status === "ACTIVE").length,
      pending: orgs.filter(o => o.status === "PENDING").length,
      suspended: orgs.filter(o => o.status === "SUSPENDED").length,
      archived: orgs.filter(o => o.status === "ARCHIVED").length,
      members: orgs.reduce((a, o) => a + o.members.length, 0),
    }
  }, [orgs])

  if (loading) return <div className="p-10">Chargement...</div>

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Platform Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Gestion complète des organisations
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

        <Stat label="Total" value={stats.total} icon={<Building2 />} />
        <Stat label="Membres" value={stats.members} icon={<Users />} />
        <Stat label="Actives" value={stats.active} icon={<CheckCircle />} />
        <Stat label="En attente" value={stats.pending} icon={<Clock />} />
        <Stat label="Suspendues" value={stats.suspended} icon={<XCircle />} />
        <Stat label="Archivées" value={stats.archived} icon={<Archive />} />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {orgs.map(org => (
          <motion.div
            key={org.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">

              {/* LEFT INFO */}
              <div className="flex items-center gap-3">

                {/* LOGO */}
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border">

                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-5 h-5 text-gray-500" />
                  )}

                </div>

                {/* INFO */}
                <div>
                  <p className="font-bold">{org.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {org.email} {org.phone && `• ${org.phone}`}
                  </p>

                  <p className="text-xs mt-1">
                    👥 {org.members.length} membres • Status: {org.status}
                  </p>
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 items-center">

                <button
                  onClick={() => setOpen(open === org.id ? null : org.id)}
                  className="px-2 py-1 border rounded"
                >
                  {open === org.id ? <ChevronUp /> : <ChevronDown />}
                </button>

                <button onClick={() => action(org.id, "approve")} className="p-2 text-green-600">
                  <CheckCircle size={18} />
                </button>

                <button onClick={() => action(org.id, "reject")} className="p-2 text-red-600">
                  <XCircle size={18} />
                </button>

                <button onClick={() => action(org.id, "archive")} className="p-2 text-gray-600">
                  <Archive size={18} />
                </button>

              </div>
            </div>

            {/* DETAILS */}
            <AnimatePresence>
              {open === org.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >

                  {/* MEMBERS */}
                  <div className="p-3 border rounded-lg">
                    <p className="font-semibold mb-2">Membres</p>

                    {org.members.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Aucun membre
                      </p>
                    ) : (
                      org.members.map(m => (
                        <p key={m.id} className="text-sm">
                          • {m.firstName} {m.lastName} ({m.email})
                        </p>
                      ))
                    )}
                  </div>

                  {/* LOGS */}
                  <div className="p-3 border rounded-lg">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Activity size={16} />
                      Logs système
                    </p>

                    {org.logs.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Aucun log
                      </p>
                    ) : (
                      org.logs.map(l => (
                        <p key={l.id} className="text-xs">
                          • {l.action} → {l.entity}
                        </p>
                      ))
                    )}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ))}

      </div>
    </div>
  )
}

/* ================= STAT CARD ================= */

function Stat({ label, value, icon }: any) {
  return (
    <div className="p-3 border rounded-xl bg-white">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  )
}