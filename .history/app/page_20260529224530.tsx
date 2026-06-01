"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Users,
  BarChart3,
  CalendarDays,
  Check,
  Sparkles,
  Globe,
  BellRing,
  LockKeyhole,
  Layers3,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestion intelligente des membres",
    description:
      "Profils complets, rôles, présences, historiques et suivi des cotisations dans une seule plateforme moderne.",
  },
  {
    icon: Wallet,
    title: "Paiements Mobile Money",
    description:
      "Orange Money, MTN, Wave et paiements manuels sécurisés avec validation intelligente.",
  },
  {
    icon: BarChart3,
    title: "Rapports financiers avancés",
    description:
      "Visualisez les revenus, cotisations et statistiques grâce à des dashboards analytiques modernes.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité premium",
    description:
      "Architecture sécurisée JWT, permissions multi-rôles, logs d’audit et protection avancée.",
  },
  {
    icon: CalendarDays,
    title: "Gestion d’événements",
    description:
      "Assemblées générales, réunions, convocations et planification complète des activités.",
  },
  {
    icon: BellRing,
    title: "Notifications automatiques",
    description:
      "SMS, emails et rappels automatiques pour améliorer la communication associative.",
  },
]

const pricing = [
  {
    name: "Starter",
    price: "0",
    description: "Pour petites associations",
    features: ["20 membres", "Paiements manuels", "1 administrateur", "Dashboard basique"],
  },
  {
    name: "Pro",
    price: "15 000",
    popular: true,
    description: "Pour associations modernes",
    features: ["100 membres", "Mobile Money intégré", "Notifications SMS", "5 administrateurs", "Rapports avancés"],
  },
  {
    name: "Elite",
    price: "45 000",
    description: "Pour organisations avancées",
    features: ["Membres illimités", "Analytics premium", "API avancée", "Support prioritaire", "Formation dédiée"],
  },
]

const stats = [
  { label: "Associations actives", value: "1K+" },
  { label: "Transactions suivies", value: "50K+" },
  { label: "Disponibilité", value: "99.9%" },
]

export default function EliteLandingPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const [mock, setMock] = useState({
    members: 842,
    money: 2.4,
    growth: 82,
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  useEffect(() => {
    const interval = setInterval(() => {
      setMock((prev) => ({
        members: prev.members + Math.floor(Math.random() * 3),
        money: +(prev.money + Math.random() * 0.02).toFixed(2),
        growth: Math.min(99, prev.growth + Math.random() * 0.3),
      }))
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 800], [0, -120])

  return (
    <main
      className={`relative min-h-screen overflow-hidden text-white transition-colors duration-700 ${
        darkMode ? "bg-[#02150d]" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* BACKGROUND ANIMÉ (fade mode nuit) */}
      <motion.div
        style={{ y: parallax }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_40%)]"
      />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Layers3 className="h-7 w-7 text-emerald-400" />
            <div>
              <h1 className="text-xl font-black">AssoPilot</h1>
              <p className="text-xs text-zinc-500">SaaS Association OS</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#features">Features</a>
            <a href="#analytics">Analytics</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* MODE NUIT */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border border-white/10 bg-white/5 p-2"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* MOBILE MENU */}
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>

            <Link href="/login" className="hidden lg:block">
              <button className="px-4 py-2 rounded-xl bg-white/5">Login</button>
            </Link>

            <Link href="/register">
              <button className="px-4 py-2 rounded-xl bg-emerald-600">
                Start
              </button>
            </Link>
          </div>
        </div>

        {/* MOBILE MENU ANIMÉ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-black/90 border-t border-white/10 p-6 space-y-4"
            >
              <a href="#features">Features</a>
              <a href="#analytics">Analytics</a>
              <a href="#pricing">Pricing</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="pt-40 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-black leading-tight">
              SaaS moderne pour associations africaines
            </h1>

            <p className="mt-6 text-zinc-400">
              Gestion, paiements, analytics — tout dans une plateforme VC-ready.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="bg-emerald-600 px-6 py-3 rounded-xl">
                Get Started
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black">{s.value}</p>
                  <p className="text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DASHBOARD LIVE MOCK */}
          <motion.div style={{ y: parallax }} className="relative">
            <div className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur">
              <h3 className="text-sm text-zinc-400">Live Dashboard</h3>

              <div className="mt-6 space-y-4">
                <p>Membres: {mock.members}</p>
                <p>Cash: {mock.money}M FCFA</p>
                <p>Croissance: {mock.growth.toFixed(1)}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-28">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl border border-white/10 bg-white/5"
            >
              <f.icon />
              <h3 className="mt-4 font-bold">{f.title}</h3>
              <p className="text-sm text-zinc-400 mt-2">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-28">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div key={p.name} className="p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-black">{p.name}</h3>
              <p className="text-zinc-400">{p.description}</p>
              <p className="text-4xl font-black mt-6">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}