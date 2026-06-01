"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Users,
  Wallet,
  BarChart3,
  ShieldCheck,
  CalendarDays,
  BellRing,
  Layers3,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"

/* =========================
   DATA
========================= */

const features = [
  {
    icon: Users,
    title: "Members system",
    description: "Full lifecycle management of members and roles.",
  },
  {
    icon: Wallet,
    title: "Mobile payments",
    description: "Orange Money, MTN, Wave integrated flows.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Real-time financial and engagement insights.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "JWT auth, roles, audit logs, protection layer.",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description: "Meetings, convocations, scheduling system.",
  },
  {
    icon: BellRing,
    title: "Notifications",
    description: "Email & SMS automated alerts system.",
  },
]

const pricing = [
  {
    name: "Starter",
    price: "0",
    features: ["20 members", "Manual payments", "Basic dashboard"],
  },
  {
    name: "Pro",
    price: "15K",
    popular: true,
    features: ["100 members", "Mobile Money", "Advanced analytics"],
  },
  {
    name: "Elite",
    price: "45K",
    features: ["Unlimited", "API access", "Priority support"],
  },
]

/* =========================
   COMPONENT
========================= */

export default function Landing() {
  const [dark, setDark] = useState(true)
  const [menu, setMenu] = useState(false)

  const [mock, setMock] = useState({
    members: 842,
    revenue: 2.4,
    growth: 82,
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  useEffect(() => {
    const t = setInterval(() => {
      setMock((p) => ({
        members: p.members + Math.floor(Math.random() * 2),
        revenue: +(p.revenue + Math.random() * 0.02).toFixed(2),
        growth: Math.min(99, p.growth + Math.random() * 0.2),
      }))
    }, 2500)

    return () => clearInterval(t)
  }, [])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -120])

  return (
    <main className="min-h-screen bg-[#050b08] text-white transition-colors duration-700">

      {/* BACKGROUND */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]"
      />

      {/* ================= NAV ================= */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          <div className="flex items-center gap-3">
            <Layers3 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">AssoPilot</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDark(!dark)}
              className="rounded-xl border border-white/10 bg-white/5 p-2"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button className="md:hidden" onClick={() => setMenu(!menu)}>
              {menu ? <X /> : <Menu />}
            </button>

            <Link href="/login" className="hidden md:block text-sm text-zinc-400">
              Sign in
            </Link>

            <Link href="/register">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm text-black font-medium">
                Get started
              </button>
            </Link>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t border-white/10 bg-black/90 p-6 space-y-4"
            >
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#dashboard">Dashboard</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-semibold tracking-tight"
          >
            Modern SaaS for association management
          </motion.h1>

          <p className="mt-6 text-zinc-400 text-lg">
            Payments, members, analytics, events — unified in one system.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <button className="rounded-xl bg-emerald-500 px-6 py-3 text-black font-medium">
                Start free
              </button>
            </Link>

            <button className="rounded-xl border border-white/10 px-6 py-3 text-zinc-300">
              View demo
            </button>
          </div>

        </div>
      </section>

      {/* ================= LIVE DASHBOARD ================= */}
      <section id="dashboard" className="pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <motion.div
            style={{ y }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Live system</span>
              <span className="text-emerald-400">● active</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div>
                <p className="text-zinc-500 text-xs">Members</p>
                <p className="text-2xl font-semibold">{mock.members}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs">Revenue</p>
                <p className="text-2xl font-semibold">{mock.revenue}M</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs">Growth</p>
                <p className="text-2xl font-semibold">{mock.growth.toFixed(1)}%</p>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="pb-28">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <f.icon className="h-4 w-4 text-emerald-400" />
              <h3 className="mt-4 font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{f.description}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="pb-32">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-6">

          {pricing.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.popular ? "border-emerald-500 bg-emerald-500/5" : "border-white/10"
              }`}
            >
              <p className="text-sm text-zinc-400">{p.name}</p>
              <p className="text-3xl font-semibold mt-2">{p.price}</p>

              <div className="mt-4 space-y-2 text-sm text-zinc-500">
                {p.features.map((f) => (
                  <p key={f}>• {f}</p>
                ))}
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  )
}