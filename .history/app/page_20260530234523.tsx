"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Shield,
  Users,
  Wallet,
  BarChart3,
  Globe,
  Sparkles,
  Moon,
  Sun,
  Zap,
} from "lucide-react"
import { useState } from "react"

export default function AssoPilotLanding() {
  const [dark, setDark] = useState(true)

  const features = [
    {
      icon: Users,
      title: "Gestion des membres / Member Management",
      desc: "Centralisation complète des membres, rôles, activités et historique.",
    },
    {
      icon: Wallet,
      title: "Mobile Money intégré",
      desc: "Orange Money, MTN, Wave — paiements sécurisés et traçables.",
    },
    {
      icon: BarChart3,
      title: "Analytics en temps réel",
      desc: "Tableaux de bord avancés pour décisions rapides et claires.",
    },
    {
      icon: Shield,
      title: "Sécurité enterprise",
      desc: "JWT, RBAC, audit logs et protection avancée des données.",
    },
    {
      icon: Globe,
      title: "Multi-associations",
      desc: "Gérez plusieurs organisations dans un seul espace.",
    },
    {
      icon: Zap,
      title: "Automatisation",
      desc: "Cotisations, rappels et notifications automatiques.",
    },
  ]

  return (
    <main className={dark ? "dark bg-black text-white" : "bg-white text-black"}>
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/40 dark:bg-black/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

          <h1 className="font-bold text-xl tracking-tight">
            AssoPilot
          </h1>

          <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
            <a href="#features">Features</a>
            <a href="#vision">Vision</a>
            <a href="#pricing">Pricing</a>
            <a href="#cta">Start</a>
          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/login">
              <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold">
                Get Started
              </button>
            </Link>

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl text-center"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm">
            <Sparkles size={16} />
            VC-Ready SaaS • Association OS
          </div>

          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-none mt-8">
            Build modern associations
            <br />
            like a tech company.
          </h1>

          <p className="mt-8 text-neutral-400 text-lg max-w-2xl mx-auto">
            Une plateforme elite pour gérer membres, paiements Mobile Money,
            événements et analytics — conçue comme Stripe × Linear pour l’Afrique.
          </p>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">

            <Link href="/register">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-black font-semibold flex items-center gap-2">
                Start Free <ArrowRight size={16} />
              </button>
            </Link>

            <button className="px-6 py-4 rounded-2xl border border-white/10">
              Watch Demo
            </button>

          </div>

        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-32 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold">Everything you need</h2>
          <p className="text-neutral-400 mt-4">
            Une plateforme complète, simple, puissante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >

              <f.icon className="text-emerald-400 mb-4" />

              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-neutral-400 mt-3">{f.desc}</p>

            </motion.div>
          ))}

        </div>
      </section>

      {/* VISION STRIPE STYLE */}
      <section className="px-6 py-40 text-center relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_50%)]" />

        <h2 className="text-6xl font-black">
          Built for trust.<br />
          Designed for scale.
        </h2>

        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto">
          Une architecture pensée pour les organisations sérieuses,
          scalable comme un produit SaaS mondial.
        </p>

      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="px-6 py-32 max-w-7xl mx-auto">

        <div className="rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="dashboard"
            width={1600}
            height={900}
            className="w-full"
          />
        </div>

      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-32 max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">
          Simple pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            { name: "Starter", price: "0" },
            { name: "Pro", price: "15000" },
            { name: "Elite", price: "45000" },
          ].map((p, i) => (
            <div
              key={i}
              className={`p-10 rounded-3xl border ${
                i === 1 ? "bg-emerald-500 text-black" : "border-white/10"
              }`}
            >

              <h3 className="text-2xl font-bold">{p.name}</h3>

              <p className="text-4xl font-black mt-6">
                {p.price} FCFA
              </p>

              <button className="mt-10 w-full py-3 rounded-xl border">
                Choose
              </button>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-6 py-40 text-center">

        <h2 className="text-6xl font-black">
          Ready to build
          <br />
          your association?
        </h2>

        <div className="mt-10 flex justify-center gap-4">

          <Link href="/register">
            <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-semibold">
              Get Started
            </button>
          </Link>

          <button className="px-8 py-4 border border-white/10 rounded-2xl">
            Contact Sales
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="px-6 py-20 border-t border-white/10 text-center text-neutral-500">

        <p>AssoPilot © 2026 — Built for modern organizations</p>

      </footer>

    </main>
  )
}