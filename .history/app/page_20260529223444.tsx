"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Users,
  Wallet,
  Shield,
  BarChart3,
  Moon,
  Sun,
  Check,
  Sparkles,
  Globe,
  MessageCircle,
  HelpCircle,
} from "lucide-react"

// =========================
// DATA
// =========================

const features = [
  {
    icon: Users,
    title: "Gestion intelligente",
    desc: "Suivi complet des membres avec rôles et activité.",
  },
  {
    icon: Wallet,
    title: "Paiements Mobile Money",
    desc: "Orange Money, Wave, MTN intégrés.",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    desc: "Tableaux de bord dynamiques et intelligents.",
  },
  {
    icon: Shield,
    title: "Sécurité renforcée",
    desc: "JWT, rôles, audit complet des actions.",
  },
]

const testimonials = [
  {
    name: "Association Espoir",
    text: "Nous avons réduit 70% des erreurs de gestion.",
  },
  {
    name: "Jeunes Leaders CI",
    text: "Interface simple et très professionnelle.",
  },
  {
    name: "ONG Horizon",
    text: "Paiements automatisés ultra efficaces.",
  },
]

const pricing = [
  {
    name: "Starter",
    price: "0 FCFA",
    features: ["20 membres", "Dashboard basique", "Support email"],
  },
  {
    name: "Pro",
    price: "15 000 FCFA",
    features: ["100 membres", "Mobile Money", "Analytics"],
    popular: true,
  },
  {
    name: "Elite",
    price: "45 000 FCFA",
    features: ["Illimité", "API", "Support VIP"],
  },
]

const faqs = [
  {
    q: "AssoPilot est-il sécurisé ?",
    a: "Oui, architecture JWT + permissions avancées.",
  },
  {
    q: "Puis-je gérer plusieurs associations ?",
    a: "Oui, multi-organisation supporté.",
  },
  {
    q: "Paiement Mobile Money ?",
    a: "Orange Money, MTN et Wave intégrés.",
  },
]

// =========================
// COMPONENT
// =========================

export default function EliteLandingV2() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <main className={dark ? "dark bg-black text-white" : "bg-white text-black"}>

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl" />
            <h1 className="font-bold text-xl">AssoPilot</h1>
          </div>

          <nav className="hidden md:flex gap-6 text-sm opacity-80">
            <a href="#features">Fonctionnalités</a>
            <a href="#pricing">Tarifs</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-white/10"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/login">
              <button className="px-4 py-2 rounded-xl border">
                Connexion
              </button>
            </Link>

            <Link href="/register">
              <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white">
                Commencer
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-full text-sm">
            <Sparkles size={14} /> Plateforme moderne
          </div>

          <h1 className="text-5xl font-black mt-6 leading-tight">
            Gérez votre association comme une entreprise moderne.
          </h1>

          <p className="mt-6 opacity-70">
            Centralisation des membres, paiements et événements dans une seule plateforme.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 bg-emerald-500 rounded-xl text-white flex items-center gap-2">
              Démarrer <ArrowRight size={16} />
            </button>

            <button className="px-6 py-3 border rounded-xl">
              Démo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="rounded-3xl overflow-hidden border">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              width={900}
              height={600}
              alt="dashboard"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Fonctionnalités puissantes
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 border rounded-2xl">
              <f.icon className="mb-4 text-emerald-500" />
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-sm opacity-70 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Témoignages
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 border rounded-2xl">
              <p>"{t.text}"</p>
              <span className="block mt-4 font-bold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Tarification
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((p, i) => (
            <div key={i} className="p-8 border rounded-3xl">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-3xl font-black mt-4">{p.price}</p>

              <div className="mt-6 space-y-2">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <Check size={14} /> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-32 px-6 max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          FAQ
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border p-6 rounded-2xl">
              <h3 className="font-bold flex items-center gap-2">
                <HelpCircle size={16} /> {f.q}
              </h3>
              <p className="mt-2 opacity-70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center px-6">

        <h2 className="text-4xl font-black">
          Construisez votre association moderne
        </h2>

        <button className="mt-8 px-8 py-4 bg-emerald-500 rounded-xl text-white">
          Commencer maintenant
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10 text-center text-sm opacity-60">
        © 2026 AssoPilot. Tous droits réservés.
      </footer>

    </main>
  )
}