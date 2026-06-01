"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Wallet,
  BarChart3,
  Shield,
  Calendar,
  Bell,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react"

export default function Page() {
  const [dark, setDark] = useState(true)

  return (
    <main className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black dark:bg-[#02150d] dark:text-white transition-colors duration-500">

        {/* AURORA BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 opacity-40">
          <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-400 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-green-600 blur-[120px]" />
        </div>

        {/* NAVBAR */}
        <header className="fixed top-0 z-50 w-full border-b border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-black/40">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            <h1 className="text-xl font-bold">AssoPilot</h1>

            <nav className="hidden md:flex gap-8 text-sm opacity-70">
              <a href="#features">Features</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </nav>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full border border-black/10 dark:border-white/10"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="pt-40 pb-20 px-6 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            The future of <br /> association management
          </motion.h1>

          <p className="mt-6 text-lg opacity-70 max-w-2xl mx-auto">
            Gérez membres, cotisations, événements et Mobile Money dans une plateforme SaaS moderne.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full flex items-center gap-2">
              Get started <ArrowRight size={16} />
            </button>
            <button className="border px-6 py-3 rounded-full">
              Demo
            </button>
          </div>
        </section>

        {/* DASHBOARD */}
        <section id="dashboard" className="px-6 py-20">
          <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 dark:bg-black/20 p-6 backdrop-blur-xl">
            <div className="grid md:grid-cols-4 gap-4">

              <Card title="Members" value="1,248" />
              <Card title="Contributions" value="12.4M FCFA" />
              <Card title="Events" value="34" />
              <Card title="Growth" value="+18%" />

            </div>
          </div>
        </section>

        {/* FEATURES BENTO */}
        <section id="features" className="px-6 py-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

            <Feature icon={<Users />} title="Members Management" />
            <Feature icon={<Wallet />} title="Mobile Money" />
            <Feature icon={<BarChart3 />} title="Analytics" />
            <Feature icon={<Shield />} title="Security" />
            <Feature icon={<Calendar />} title="Events" />
            <Feature icon={<Bell />} title="Notifications" />

          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

            <Testimonial />
            <Testimonial />
            <Testimonial />

          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">Pricing</h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            <Price name="Starter" price="0 FCFA" />
            <Price name="Pro" price="15 000 FCFA" highlight />
            <Price name="Enterprise" price="Custom" />

          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-24 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center">FAQ</h2>

          <div className="mt-10 space-y-4">
            <Faq q="Mobile Money support ?" a="Yes, Orange, MTN, Wave supported." />
            <Faq q="Multi association ?" a="Yes, full multi-org architecture." />
            <Faq q="Security ?" a="JWT + RBAC + Audit logs." />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 text-center">
          <h2 className="text-5xl font-bold">
            Build your association future
          </h2>

          <button className="mt-10 bg-emerald-600 text-white px-8 py-4 rounded-full">
            Start now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 px-6 py-10 text-center opacity-60">
          AssoPilot © 2026
        </footer>

      </div>
    </main>
  )
}

/* ================= COMPONENTS ================= */

function Card({ title, value }: any) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 dark:bg-black/20">
      <p className="text-sm opacity-60">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  )
}

function Feature({ icon, title }: any) {
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 hover:scale-[1.02] transition">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold">{title}</h3>
    </div>
  )
}

function Testimonial() {
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/5">
      <p className="text-sm opacity-70">
        “AssoPilot changed the way we manage our association completely.”
      </p>
      <p className="mt-4 font-bold">President</p>
    </div>
  )
}

function Price({ name, price, highlight }: any) {
  return (
    <div className={`p-8 rounded-3xl border ${highlight ? "border-emerald-500" : "border-white/10"}`}>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mt-4 text-2xl font-bold">{price}</p>
    </div>
  )
}

function Faq({ q, a }: any) {
  return (
    <div className="p-6 rounded-2xl border border-white/10">
      <h3 className="font-bold">{q}</h3>
      <p className="opacity-70 mt-2">{a}</p>
    </div>
  )
}