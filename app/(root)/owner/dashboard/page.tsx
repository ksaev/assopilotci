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
  Shield,
  Sparkles,
  Activity,
  ChevronRight,
  Users,
  LogOut,
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
  const [tab, setTab] =
    useState<"ALL" | Org["status"]>("ALL")

  const [selected, setSelected] = useState<string[]>([])
  const [logs, setLogs] = useState<Log[] | null>(null)

  /* ========================= LOAD ========================= */

  const load = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/owner/organizations")

      if (!res.ok) {
        throw new Error("Erreur API")
      }

      const data = await res.json()

      setOrgs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error(error)
      setOrgs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  /* ========================= LOGOUT ========================= */

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      window.location.href = "/login"
    } catch (error) {
      console.error(error)
    }
  }

  /* ========================= UPDATE ========================= */

  const updateStatus = async (
    ids: string[],
    status: Org["status"]
  ) => {
    try {
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/owner/organizations/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          })
        )
      )

      setSelected([])

      load()
    } catch (error) {
      console.error(error)
    }
  }

  /* ========================= FILTER ========================= */

  const filtered = useMemo(() => {
    return orgs
      .filter((o) =>
        tab === "ALL" ? true : o.status === tab
      )
      .filter((o) =>
        `${o.name} ${o.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  }, [orgs, search, tab])

  /* ========================= STATS ========================= */

  const stats = useMemo(() => {
    return {
      total: orgs.length,
      active: orgs.filter(
        (o) => o.status === "ACTIVE"
      ).length,

      pending: orgs.filter(
        (o) => o.status === "PENDING"
      ).length,

      suspended: orgs.filter(
        (o) => o.status === "SUSPENDED"
      ).length,

      archived: orgs.filter(
        (o) => o.status === "ARCHIVED"
      ).length,
    }
  }, [orgs])

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

  const clearSelection = () => {
    setSelected([])
  }

  /* ========================= LOADING ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin" size={35} />
          <p className="text-gray-400">
            Chargement du système...
          </p>
        </div>
      </div>
    )
  }

  /* ========================= UI ========================= */

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">

      {/* BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">

        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[120px]" />

      </div>

      <div className="relative z-10 space-y-6">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between lg:items-center gap-4"
        >

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Shield size={18} />
              <span className="text-sm uppercase tracking-[4px]">
                Elite Administration
              </span>
            </div>

            <h1 className="text-4xl font-black">
              Organizations Control
            </h1>

            <p className="text-gray-400 mt-2">
              Gestion avancée des organisations,
              sécurité et supervision globale.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>

            {/* REFRESH */}
            <button
              onClick={load}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-lg shadow-cyan-500/30"
            >
              <RefreshCw size={18} />
              Refresh System
            </button>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

          <EliteStat
            title="Organizations"
            value={stats.total}
            icon={<Building2 />}
            color="from-cyan-500 to-blue-600"
          />

          <EliteStat
            title="Active"
            value={stats.active}
            icon={<CheckCircle />}
            color="from-green-500 to-emerald-600"
          />

          <EliteStat
            title="Pending"
            value={stats.pending}
            icon={<Clock />}
            color="from-yellow-500 to-orange-500"
          />

          <EliteStat
            title="Suspended"
            value={stats.suspended}
            icon={<PauseCircle />}
            color="from-orange-500 to-red-500"
          />

          <EliteStat
            title="Archived"
            value={stats.archived}
            icon={<Archive />}
            color="from-gray-500 to-gray-700"
          />

        </div>

        {/* SEARCH */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 space-y-5">

          <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-2xl px-4 py-3">

            <Search className="text-cyan-400" size={18} />

            <input
              placeholder="Search organization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
            />

          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-3">

            {[
              "ALL",
              "ACTIVE",
              "PENDING",
              "SUSPENDED",
              "ARCHIVED",
            ].map((item: any) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-5 py-2 rounded-2xl transition-all font-medium border ${
                  tab === item
                    ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* BULK */}

          {selected.length > 0 && (
            <div className="bg-black/30 border border-cyan-500/20 rounded-2xl p-4 flex flex-wrap gap-3 items-center">

              <div className="text-cyan-300 font-semibold">
                {selected.length} selected
              </div>

              <button
                onClick={() =>
                  updateStatus(selected, "ACTIVE")
                }
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl"
              >
                Activate
              </button>

              <button
                onClick={() =>
                  updateStatus(selected, "SUSPENDED")
                }
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl"
              >
                Suspend
              </button>

              <button
                onClick={() =>
                  updateStatus(selected, "ARCHIVED")
                }
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl"
              >
                Archive
              </button>

              <button
                onClick={clearSelection}
                className="border border-white/20 px-4 py-2 rounded-xl"
              >
                Clear
              </button>

            </div>
          )}

          <button
            onClick={selectAll}
            className="text-cyan-400 text-sm"
          >
            Select all visible organizations
          </button>

        </div>

        {/* LIST */}

        <div className="space-y-4">

          {filtered.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group bg-white/5 backdrop-blur-xl border rounded-3xl p-5 transition-all hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                selected.includes(org.id)
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10"
              }`}
            >

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  <input
                    type="checkbox"
                    checked={selected.includes(org.id)}
                    onChange={() => toggleSelect(org.id)}
                    className="w-5 h-5"
                  />

                  {/* LOGO */}

                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/30 border border-white/10 flex items-center justify-center">

                    {org.logo ? (
                      <img
                        src={org.logo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-gray-500" />
                    )}

                  </div>

                  {/* INFO */}

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="font-bold text-xl">
                        {org.name}
                      </h2>

                      <ChevronRight
                        className="text-cyan-400"
                        size={16}
                      />

                    </div>

                    <p className="text-gray-400 text-sm">
                      {org.email}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">

                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {org.members?.length ?? 0} Members
                      </div>

                      <div className="flex items-center gap-1">
                        <Activity size={14} />
                        {org.logs?.length ?? 0} Logs
                      </div>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3 flex-wrap">

                  <StatusBadge status={org.status} />

                  <button
                    onClick={() =>
                      setLogs(org.logs ?? [])
                    }
                    className="bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 px-4 py-2 rounded-2xl transition-all flex items-center gap-2"
                  >
                    <Eye size={15} />
                    Logs
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* MODAL */}

      {logs && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 w-[450px] max-h-[500px] overflow-auto"
          >

            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="text-cyan-400" />
              <h2 className="text-2xl font-bold">
                Activity Logs
              </h2>
            </div>

            <div className="space-y-3">

              {logs.length === 0 && (
                <p className="text-gray-500">
                  Aucun log disponible.
                </p>
              )}

              {logs.map((log) => (
                <div
                  key={log.id}
                  className="border border-white/10 bg-black/20 rounded-2xl p-3 text-sm"
                >
                  {log.action}
                </div>
              ))}

            </div>

            <button
              onClick={() => setLogs(null)}
              className="mt-5 w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-2xl transition-all"
            >
              Close
            </button>

          </motion.div>

        </div>
      )}

    </div>
  )
}

/* ========================= ELITE STAT ========================= */

function EliteStat({
  title,
  value,
  icon,
  color,
}: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
    >

      <div
        className={`absolute inset-0 opacity-10 bg-gradient-to-br ${color}`}
      />

      <div className="relative z-10">

        <div className="flex justify-between items-center">

          <div className="text-gray-400 text-sm">
            {title}
          </div>

          <div
            className={`p-2 rounded-xl bg-gradient-to-br ${color}`}
          >
            {icon}
          </div>

        </div>

        <div className="text-4xl font-black mt-4">
          {value}
        </div>

      </div>

    </motion.div>
  )
}

/* ========================= STATUS ========================= */

function StatusBadge({
  status,
}: {
  status: string
}) {
  const styles: any = {
    ACTIVE:
      "bg-green-500/20 text-green-400 border-green-500/30",

    PENDING:
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",

    SUSPENDED:
      "bg-orange-500/20 text-orange-300 border-orange-500/30",

    ARCHIVED:
      "bg-gray-500/20 text-gray-300 border-gray-500/30",
  }

  return (
    <span
      className={`px-4 py-2 rounded-2xl text-xs font-bold border ${styles[status]}`}
    >
      {status}
    </span>
  )
} 