"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

type Organization = {
  id: string
  name: string
  slug: string
  logo?: string | null
  city?: string | null
  country?: string | null
}

type ApiResponse = {
  organizations: Organization[]
}

export default function SelectOrganizationPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)

  /**
   * =========================
   * FETCH ORGANIZATIONS
   * =========================
   */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch("/api/me/organizations")
        const data: ApiResponse = await res.json()

        setOrgs(data.organizations)

        // auto redirect si une seule org
        if (data.organizations.length === 1) {
          router.push(`/dashboard/${data.organizations[0].slug}`)
        }
      } catch (e) {
        setError("Impossible de charger les associations")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router])

  /**
   * =========================
   * FILTERED LIST
   * =========================
   */
  const filtered = useMemo(() => {
    if (!search) return orgs

    return orgs.filter((o) =>
      o.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, orgs])

  /**
   * =========================
   * SELECT ORGANIZATION
   * =========================
   */
  const selectOrganization = async (org: Organization) => {
    setSelected(org.id)

    try {
      await fetch("/api/me/set-active-org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId: org.id }),
      })

      router.push(`/dashboard/${org.slug}`)
    } catch (e) {
      setError("Erreur lors de la sélection")
      setSelected(null)
    }
  }

  /**
   * =========================
   * LOADING UI
   * =========================
   */
  if (loading) {
    return <LoadingScreen />
  }

  /**
   * =========================
   * ERROR UI
   * =========================
   */
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white border p-6 rounded-xl shadow">
          <h2 className="text-red-500 font-bold">Erreur</h2>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= CONTAINER ================= */}
      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-10"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Choisis ton espace d’organisation
          </h1>
          <p className="text-gray-500 mt-2">
            Chaque organisation possède ses données, membres et paramètres.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* ORGANIZATIONS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
          >
            {filtered.map((org, index) => (
              <OrganizationCard
                key={org.id}
                org={org}
                index={index}
                selected={selected === org.id}
                onClick={() => selectOrganization(org)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <EmptyState />
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
    <div className="w-full border-b bg-white/70 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO SYSTEM */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <h1 className="font-semibold">Assopilot</h1>
            <p className="text-xs text-gray-500">Multi-organisation system</p>
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="text-xs text-gray-500">
          Sélection obligatoire avant accès
        </div>

      </div>
    </div>
  )
}

/**
 * =========================
 * SEARCH BAR
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
    <div className="mt-8 flex justify-center">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher une organisation..."
        className="w-full md:w-[500px] px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
}

/**
 * =========================
 * ORGANIZATION CARD
 * =========================
 */
function OrganizationCard({
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
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`cursor-pointer border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition ${
        selected ? "border-black" : "border-gray-200"
      }`}
    >

      <div className="flex items-center gap-4">

        {/* LOGO */}
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
          {org.logo ? (
            <img
              src={org.logo}
              alt={org.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-gray-600">
              {org.name.charAt(0)}
            </span>
          )}
        </div>

        {/* INFOS */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {org.name}
          </h3>
          <p className="text-xs text-gray-500">
            {org.city || "Ville inconnue"} • {org.country || "Pays"}
          </p>
        </div>

        {/* ACTION */}
        <div className="text-xs text-gray-400">
          {selected ? "Sélectionné" : "Accéder"}
        </div>

      </div>

    </motion.div>
  )
}

/**
 * =========================
 * EMPTY STATE
 * =========================
 */
function EmptyState() {
  return (
    <div className="text-center mt-20">
      <div className="text-gray-400 text-sm">
        Aucune organisation trouvée
      </div>
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
    <div className="mt-16 text-center text-xs text-gray-400">
      © {new Date().getFullYear()} Assopilot — système multi-organisation sécurisé
    </div>
  )
}

/**
 * =========================
 * LOADING SCREEN
 * =========================
 */
function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-center">

        <div className="w-12 h-12 bg-gray-300 rounded-xl mx-auto mb-4" />

        <div className="h-4 w-40 bg-gray-300 rounded mx-auto mb-2" />
        <div className="h-3 w-32 bg-gray-200 rounded mx-auto" />

      </div>
    </div>
  )
}

/**
 * =========================================================
 * SECTION EXTENSIONS (UI SCALE — EXPANDABLE ARCHITECTURE)
 * =========================================================
 * NOTE:
 * Cette section est volontairement étendue pour architecture
 * SaaS future (favoris, récents, rôles, permissions, etc.)
 * =========================================================
 */

// (Tu peux brancher ici :
// - recent organizations
// - favorites
// - pinned org
// - role badges
// - analytics preview
// - last activity
// - invitation status
// - etc.)

/**
 * =========================================================
 * FUTURE UPGRADE READY
 * =========================================================
 *
 * - Multi-role per org
 * - Org switching dropdown global
 * - Redis cache active org
 * - JWT org context injection
 * - Server layout protection
 * - Permission gating UI
 *
 * =========================================================
 */