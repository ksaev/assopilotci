"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import {
  Layers3,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  Wallet,
  BarChart3,
  ShieldCheck,
} from "lucide-react"

export default function EliteLandingPage() {
  // =========================
  // STATE
  // =========================
  const [darkMode, setDarkMode] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [stats, setStats] = useState({
    members: 842,
    money: 2400000,
    growth: 82,
  })

  // =========================
  // DARK MODE TRANSITION (FADE)
  // =========================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  // =========================
  // LIVE MOCK DATA (DASHBOARD)
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        members: prev.members + Math.floor(Math.random() * 3),
        money: prev.money + Math.floor(Math.random() * 5000),
        growth: Math.min(100, prev.growth + Math.random() * 0.5),
      }))
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  // =========================
  // PARALLAX SCROLL
  // =========================
  const { scrollY } = useScroll()
  const yHero = useTransform(scrollY, [0, 500], [0, 120])
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0.6])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02150d] text-white">

      {/* 🌌 FADE MODE TRANSITION OVERLAY */}
      <AnimatePresence>
        <motion.div
          key={darkMode ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.15 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-black pointer-events-none z-50"
        />
      </AnimatePresence>

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
              <Layers3 className="h-5 w-5" />
            </div>
            <span className="font-bold">AssoPilot</span>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-sm text-zinc-300">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#dashboard">Dashboard</a>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* THEME TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border border-white/10 bg-white/5 p-2"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2"
            >
              <Menu size={18} />
            </button>

            <Link href="/login" className="hidden md:block">
              <button className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                Login
              </button>
            </Link>

            <Link href="/register" className="hidden md:block">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold">
                Start
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ANIMÉ ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-8"
          >
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>

            <div className="mt-10 flex flex-col gap-6 text-xl">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#dashboard">Dashboard</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO ================= */}
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="relative flex min-h-screen items-center px-6 pt-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

          {/* TEXT */}
          <div>
            <h1 className="text-5xl font-black leading-tight">
              Manage associations like a VC-backed SaaS
            </h1>

            <p className="mt-6 text-zinc-400">
              Modern platform for African organizations with real-time intelligence.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-emerald-500 px-6 py-3">
                Get Started
              </button>
              <button className="rounded-xl border border-white/10 px-6 py-3">
                Demo
              </button>
            </div>
          </div>

          {/* DASHBOARD LIVE PREVIEW */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-4">

              <div className="rounded-2xl bg-black/40 p-4">
                <p className="text-sm text-zinc-400">Members</p>
                <h2 className="text-3xl font-bold">{stats.members}</h2>
              </div>

              <div className="rounded-2xl bg-black/40 p-4">
                <p className="text-sm text-zinc-400">Revenue</p>
                <h2 className="text-3xl font-bold">
                  {stats.money.toLocaleString()} FCFA
                </h2>
              </div>

              <div className="rounded-2xl bg-black/40 p-4">
                <p className="text-sm text-zinc-400">Growth</p>
                <h2 className="text-3xl font-bold">{stats.growth.toFixed(1)}%</h2>
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

          {[Users, Wallet, ShieldCheck].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <Icon />
              <h3 className="mt-4 font-bold">Premium Feature</h3>
              <p className="text-sm text-zinc-400">
                Scalable SaaS architecture for modern organizations.
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 p-10 text-center text-sm text-zinc-500">
        © 2026 AssoPilot — VC Ready SaaS Platform
      </footer>
    </div>
  )
}