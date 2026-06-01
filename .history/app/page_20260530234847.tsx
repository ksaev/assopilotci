"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Users,
  Wallet,
  BarChart3,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react"

export default function AssoPilotUltra() {
  const [dark, setDark] = useState(true)

  return (
    <main className={dark ? "dark bg-black text-white" : "bg-white text-black"}>

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500" />
            <span className="font-bold text-lg">AssoPilot</span>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-neutral-300">

            <a href="#product">Product / Produit</a>
            <a href="#features">Features / Fonctionnalités</a>
            <a href="#solutions">Solutions</a>
            <a href="#security">Security</a>
            <a href="#pricing">Pricing / Tarifs</a>
            <a href="#company">Company / Entreprise</a>

          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-white/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/login">
              <button className="px-4 py-2 rounded-xl border border-white/10">
                Sign in / Connexion
              </button>
            </Link>

            <Link href="/register">
              <button className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold">
                Get started / Commencer
              </button>
            </Link>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl"
        >

          <div className="inline-flex px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-300 text-sm">
            Association Operating System / Système d’Organisation Associative
          </div>

          <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-none mt-8">
            Manage associations<br />
            like a modern tech company
          </h1>

          <p className="mt-8 text-neutral-400 text-lg max-w-3xl mx-auto">
            🇫🇷 AssoPilot centralise membres, cotisations, événements et finances.<br/>
            🇬🇧 AssoPilot unifies members, payments, events and analytics in one OS.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link href="/register">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-black font-semibold flex items-center gap-2">
                Start free / Essayer <ArrowRight size={16} />
              </button>
            </Link>

            <button className="px-6 py-4 rounded-2xl border border-white/10">
              Watch demo / Démo
            </button>

          </div>

        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-32 max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold">
            Everything you need / Tout ce dont vous avez besoin
          </h2>

          <p className="mt-6 text-neutral-400">
            A complete operating system for modern associations
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              icon: Users,
              title: "Member Management / Gestion des membres",
              desc: "Profiles, roles, attendance, history, organization structure.",
            },
            {
              icon: Wallet,
              title: "Payments Engine / Paiements",
              desc: "Mobile Money (Orange, MTN, Wave) + tracking system.",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              desc: "Real-time financial insights and performance tracking.",
            },
            {
              icon: Shield,
              title: "Security Layer / Sécurité",
              desc: "JWT auth, RBAC roles, audit logs, encrypted data.",
            },
            {
              icon: Globe,
              title: "Multi-Organization",
              desc: "Manage multiple associations in one platform.",
            },
            {
              icon: Zap,
              title: "Automation / Automatisation",
              desc: "Reminders, notifications, smart workflows.",
            },
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/5">

              <f.icon className="text-emerald-400 mb-4" />

              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-neutral-400 mt-3">{f.desc}</p>

            </div>
          ))}

        </div>

      </section>

      {/* ================= SOLUTIONS ================= */}
      <section id="solutions" className="px-6 py-32 text-center">

        <h2 className="text-5xl font-bold">
          Built for Africa. Designed like Stripe.
        </h2>

        <p className="mt-8 text-neutral-400 max-w-3xl mx-auto">
          🇫🇷 Une solution adaptée aux réalités locales (Mobile Money)<br/>
          🇬🇧 Built for emerging markets with global SaaS standards
        </p>

      </section>

      {/* ================= SECURITY ================= */}
      <section id="security" className="px-6 py-32 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-bold">
              Enterprise-grade security
            </h2>

            <p className="mt-8 text-neutral-400">
              Protection des données, authentification avancée et monitoring continu.
            </p>

            <div className="mt-10 space-y-4 text-neutral-300">

              {[
                "JWT authentication system",
                "Role-based access control (RBAC)",
                "Encrypted financial data",
                "Audit logs & tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check />
                  {item}
                </div>
              ))}

            </div>

          </div>

          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="security dashboard"
            width={1200}
            height={800}
            className="rounded-3xl"
          />

        </div>

      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="px-6 py-32 max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Pricing / Tarification
        </h2>

        <div className="mt-20 grid md:grid-cols-3 gap-6">

          {[
            {
              name: "Starter",
              price: "0",
              desc: "Small organizations / Petites associations",
            },
            {
              name: "Pro",
              price: "15000",
              desc: "Growing organizations / Associations en croissance",
            },
            {
              name: "Elite",
              price: "45000",
              desc: "Large organizations / Grandes structures",
            },
          ].map((p, i) => (
            <div key={i} className="p-10 rounded-3xl border border-white/10">

              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="text-neutral-400 mt-2">{p.desc}</p>

              <div className="mt-8 text-5xl font-black">
                {p.price}
              </div>

              <button className="mt-10 w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold">
                Get started
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-40 text-center">

        <h2 className="text-6xl font-black">
          Build the future<br />
          of associations
        </h2>

        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto">
          Join the next generation of digital association management systems.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link href="/register">
            <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-semibold">
              Start now
            </button>
          </Link>

          <button className="px-8 py-4 border border-white/10 rounded-2xl">
            Contact sales
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-16 text-center text-neutral-500">

        AssoPilot © 2026 — Association Operating System

      </footer>

    </main>
  )
}