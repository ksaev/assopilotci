"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Search,
  ArrowRight,
  Shield,
  Sparkles,
  Globe,
} from "lucide-react"

/**
 * =========================
 * TYPES
 * =========================
 */

type Organization = {
  id: string
  name: string
  slug: string
  logo?: string | null
  city?: string | null
  country?: string | null
  role: string
}

type ApiResponse = {
  organizations: Organization[]
}

/**
 * =========================
 * MAIN PAGE
 * =========================
 */

export default function SelectOrganizationPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  /**
   * =========================
   * LOAD DATA
   * =========================
   */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch("/api/me/organizations")
        const data: ApiResponse = await res.json()

        setOrgs(data.organizations || [])

        if (data.organizations?.length === 1) {
          router.push(`/dashboard/${data.organizations[0].slug}`)
        }
      } catch {
        setError("Impossible de charger vos organisations")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router])

  /**
   * =========================
   * FILTER
   * =========================
   */
  const filtered = useMemo(() => {
    return orgs.filter((o) =>
      o.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, orgs])

  /**
   * =========================
   * SELECT ORG
   * =========================
   */
  const selectOrg = async (org: Organization) => {
    setSelected(org.id)

    try {
      await fetch("/api/me/set-active-org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: org.id }),
      })

      router.push(`/dashboard/${org.slug}`)
    } catch {
      setSelected(null)
      setError("Erreur de sélection")
    }
  }

  /**
   * =========================
   * LOADING
   * =========================
   */
  if (loading) {
    return <Loading />
  }

  /**
   * =========================
   * ERROR
   * =========================
   */
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <div className="text-center">
          <div className="text-red-400 font-semibold">{error}</div>
        </div>
      </div>
    )
  }

  /**
   * =========================
   * UI
   * =========================
   */
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">

      {/* HEADER */}
      <Header />

      {/* CONTAINER */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* TITLE */}
        <Hero />

        {/* SEARCH */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* LIST */}
        <AnimatePresence>
          <div className="mt-10 space-y-3">
            {filtered.map((org, i) => (
              <OrgCard
                key={org.id}
                org={org}
                index={i}
                selected={selected === org.id}
                onClick={() => selectOrg(org)}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <Empty />
        )}

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  )
}

/**
 * =========================
 * HEADER
 * =========================
 */

function Header() {
  return (
    <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <div className="font-semibold">Assopilot</div>
          <div className="text-xs text-white/40">
            Multi-organisation secure system
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/40">
        <Shield size={14} />
        Sélection obligatoire
      </div>
    </div>
  )
}

/**
 * =========================
 * HERO
 * =========================
 */

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Sparkles size={14} />
        Accès sécurisé multi-tenant
      </div>

      <h1 className="text-3xl font-bold mt-2">
        Choisis ton espace de travail
      </h1>

      <p className="text-white/50 mt-2 text-sm">
        Chaque organisation possède ses données isolées, membres et permissions.
      </p>
    </motion.div>
  )
}

/**
 * =========================
 * SEARCH
 * =========================
 */

function SearchBar({
  search,
  setSearch,
}: {
  search: string
  setSearch: (v: string) => void
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 text-white/40" size={18} />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher une organisation..."
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  )
}

/**
 * =========================
 * CARD
 * =========================
 */

function OrgCard({
  org,
  onClick,
  selected,
  index,
}: {
  org: Organization
  onClick: () => void
  selected: boolean
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`
        flex items-center justify-between p-4 rounded-2xl cursor-pointer
        border transition
        ${selected ? "border-white bg-white/10" : "border-white/10 bg-white/5"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
          {org.logo ? (
            <img src={org.logo} className="w-full h-full object-cover" />
          ) : (
            <Building2 size={18} />
          )}
        </div>

        <div>
          <div className="font-medium">{org.name}</div>
          <div className="text-xs text-white/40 flex items-center gap-1">
            <Globe size={12} />
            {org.city || "—"} • {org.country || "—"}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/40">{org.role}</span>
        <ArrowRight size={16} className="text-white/40" />
      </div>
    </motion.div>
  )
}

/**
 * =========================
 * EMPTY
 * =========================
 */

function Empty() {
  return (
    <div className="text-center mt-10 text-white/40 text-sm">
      Aucune organisation trouvée
    </div>
  )
}

/**
 * =========================
 * FOOTER
 * =========================
 */

function Footer() {
  return (
    <div className="text-center mt-12 text-xs text-white/30">
      © {new Date().getFullYear()} Assopilot — Secure multi-tenant architecture
    </div>
  )
}

/**
 * =========================
 * LOADING
 * =========================
 */

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0B0F19] text-white">
      <div className="animate-pulse text-center">
        <div className="w-12 h-12 bg-white/10 rounded-xl mx-auto mb-4" />
        <div className="h-3 w-40 bg-white/10 rounded mx-auto" />
      </div>
    </div>
  )
}