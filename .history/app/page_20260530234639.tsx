"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Users,
  Wallet,
  BarChart3,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react"
import { useState } from "react"

export default function AssoPilotVC() {
  const [dark, setDark] = useState(true)

  return (
    <main className={dark ? "dark bg-black text-white" : "bg-white text-black"}>

      {/* ================= NAV ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500" />
            <span className="font-bold text-lg">AssoPilot</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#vision">Vision</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-white/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/login">
              <button className="px-4 py-2 rounded-xl border border-white/10">
                Sign in
              </button>
            </Link>

            <Link href="/register">
              <button className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold">
                Get started
              </button>
            </Link>

          </div>

        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-300">
            VC-ready SaaS for Africa
          </div>

          <h1 className="text-[clamp(3rem,7vw,7rem)] font-black leading-none mt-8">
            The Operating System<br />
            for Modern Associations
          </h1>

          <p className="mt-8 text-neutral-400 text-lg max-w-2xl mx-auto">
            AssoPilot is a Stripe-level infrastructure for associations:
            members, payments, events, analytics — all in one unified system.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link href="/register">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-black font-semibold flex items-center gap-2">
                Start Free <ArrowRight size={16} />
              </button>
            </Link>

            <button className="px-6 py-4 rounded-2xl border border-white/10">
              Watch Demo
            </button>

          </div>

          <div className="mt-14 text-sm text-neutral-500">
            Trusted by growing organizations in Africa
          </div>

        </motion.div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="px-6 py-32 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold">
            The problem is broken systems
          </h2>

          <p className="mt-6 text-neutral-400">
            Associations still run on Excel, WhatsApp and manual tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            "Fragmented member data",
            "Untraceable payments",
            "Manual reporting",
          ].map((p, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/5">
              ❌ {p}
            </div>
          ))}

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-32 max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">
          Everything you need to scale
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              icon: Users,
              title: "Member OS",
              desc: "Full lifecycle management of members & roles",
            },
            {
              icon: Wallet,
              title: "Payments Engine",
              desc: "Mobile Money + tracking + reconciliation",
            },
            {
              icon: BarChart3,
              title: "Analytics Core",
              desc: "Real-time financial intelligence dashboard",
            },
            {
              icon: Shield,
              title: "Security Layer",
              desc: "JWT, RBAC, audit logs, encryption",
            },
            {
              icon: Globe,
              title: "Multi-org system",
              desc: "Manage unlimited organizations",
            },
            {
              icon: Zap,
              title: "Automation Engine",
              desc: "Smart reminders + workflows",
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

      {/* ================= STORY ================= */}
      <section className="px-6 py-40 text-center relative">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_50%)]" />

        <h2 className="text-6xl font-black">
          Built like Stripe<br />
          for African associations
        </h2>

        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto">
          We are building infrastructure, not just software.
          A financial + organizational OS.
        </p>

      </section>

      {/* ================= DASHBOARD ================= */}
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

      {/* ================= METRICS ================= */}
      <section className="px-6 py-32 max-w-7xl mx-auto">

        <div className="grid md:grid-cols-3 text-center gap-10">

          <div>
            <h3 className="text-6xl font-bold">1K+</h3>
            <p className="text-neutral-500 mt-3">Active associations</p>
          </div>

          <div>
            <h3 className="text-6xl font-bold">50K+</h3>
            <p className="text-neutral-500 mt-3">Transactions tracked</p>
          </div>

          <div>
            <h3 className="text-6xl font-bold">99.9%</h3>
            <p className="text-neutral-500 mt-3">System uptime</p>
          </div>

        </div>

      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="px-6 py-32 max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-20">
          Pricing built for scale
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
              <p className="text-4xl font-black mt-6">{p.price} FCFA</p>

              <button className="mt-10 w-full py-3 rounded-xl border">
                Get started
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-40 text-center">

        <h2 className="text-6xl font-black">
          Ready to build<br />
          the future?
        </h2>

        <div className="mt-10 flex justify-center gap-4">

          <Link href="/register">
            <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-semibold">
              Start now
            </button>
          </Link>

          <button className="px-8 py-4 border border-white/10 rounded-2xl">
            Talk to us
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-16 text-center text-neutral-500">

        AssoPilot © 2026 — Infrastructure for associations

      </footer>

    </main>
  )
}