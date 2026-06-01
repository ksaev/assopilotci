"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Users,
  Wallet,
  Shield,
  BarChart3,
  Calendar,
  Bell,
  ArrowRight,
  Moon,
  Sun,
  Check,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestion complète des membres",
    desc: "Profils détaillés, rôles, statuts, historique et segmentation intelligente.",
  },
  {
    icon: Wallet,
    title: "Paiements Mobile Money",
    desc: "Orange Money, Wave, MTN intégrés avec validation automatique.",
  },
  {
    icon: BarChart3,
    title: "Analytique avancée",
    desc: "Statistiques financières et croissance en temps réel.",
  },
  {
    icon: Shield,
    title: "Sécurité maximale",
    desc: "JWT, rôles, permissions et audit logs complets.",
  },
  {
    icon: Calendar,
    title: "Gestion événements",
    desc: "Réunions, assemblées générales et rappels automatiques.",
  },
  {
    icon: Bell,
    title: "Notifications intelligentes",
    desc: "Email, SMS et alertes automatiques.",
  },
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#04140c] dark:text-white transition-colors">

      {/* ================= NAVBAR ================= */}
      <header className="fixed w-full z-50 backdrop-blur border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="font-black text-green-600 text-xl">AssoPilot</h1>

          <nav className="hidden md:flex gap-6 text-sm opacity-70">
            <a href="#features">Fonctionnalités</a>
            <a href="#vision">Vision</a>
            <a href="#pricing">Tarifs</a>
            <a href="#faq">FAQ</a>
          </nav>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl border border-black/10 dark:border-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Gérez votre association avec
            <span className="text-green-600"> intelligence et harmonie</span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-300">
            Une plateforme complète pour centraliser membres, finances, événements et communication.
          </p>

          <div className="mt-8 flex gap-4 flex-col sm:flex-row">
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2">
              Commencer <ArrowRight size={18} />
            </button>

            <button className="border px-6 py-3 rounded-2xl">
              Démo
            </button>
          </div>
        </motion.div>

        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400"
          alt="dashboard"
          width={800}
          height={600}
          className="rounded-3xl shadow-xl border"
        />
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mt-32 px-6 max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-black">
            Une plateforme complète et moderne
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Tout ce qu’il faut pour gérer une organisation sérieusement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5"
            >
              <f.icon className="text-green-600 mb-4" />
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-sm opacity-70 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section id="vision" className="mt-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <Image
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
          width={800}
          height={600}
          className="rounded-3xl border"
          alt="vision"
        />

        <div>
          <h2 className="text-4xl font-black">
            Une vision moderne et responsable
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Transparence, confiance et efficacité pour toutes les associations.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex gap-2 items-center"><Check className="text-green-600" /> Centralisation complète</li>
            <li className="flex gap-2 items-center"><Check className="text-green-600" /> Sécurité avancée</li>
            <li className="flex gap-2 items-center"><Check className="text-green-600" /> Interface intuitive</li>
            <li className="flex gap-2 items-center"><Check className="text-green-600" /> Performance élevée</li>
          </ul>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="mt-32 px-6 max-w-7xl mx-auto text-center">

        <h2 className="text-4xl font-black">Tarification simple</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {["Starter", "Pro", "Elite"].map((plan, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border bg-white dark:bg-white/5"
            >
              <h3 className="font-bold text-xl">{plan}</h3>
              <p className="mt-4 text-green-600 font-black text-3xl">
                {i === 0 ? "0" : i === 1 ? "15K" : "45K"} FCFA
              </p>

              <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl">
                Choisir
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mt-32 py-20 bg-green-600 text-white text-center px-6">
        <h2 className="text-4xl font-black">
          Construisez une organisation forte
        </h2>
        <p className="mt-4 opacity-90">
          Simple. Moderne. Sécurisé.
        </p>

        <button className="mt-6 bg-white text-green-600 px-8 py-3 rounded-2xl font-bold">
          Rejoindre
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-sm opacity-60">
        © 2026 AssoPilot — Tous droits réservés
      </footer>

    </main>
  )
}