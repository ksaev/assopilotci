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
  Check,
} from "lucide-react"

export default function AssoPilotElite() {
  const [dark, setDark] = useState(true)

  const features = [
    {
      icon: Users,
      title: "Gestion intelligente des membres",
      desc: "Centralisez vos membres, rôles, présences et activités dans un espace unique.",
    },
    {
      icon: Wallet,
      title: "Paiements Mobile Money",
      desc: "Orange Money, MTN, Wave : paiements simples, rapides et sécurisés.",
    },
    {
      icon: BarChart3,
      title: "Tableaux de bord avancés",
      desc: "Analyse en temps réel des cotisations et performances financières.",
    },
    {
      icon: Shield,
      title: "Sécurité de niveau entreprise",
      desc: "Authentification sécurisée, rôles, permissions et logs complets.",
    },
    {
      icon: Globe,
      title: "Multi-organisations",
      desc: "Gérez plusieurs associations depuis un seul compte.",
    },
    {
      icon: Zap,
      title: "Automatisation intelligente",
      desc: "Rappels automatiques, notifications et gestion optimisée.",
    },
  ]

  return (
    <main className={dark ? "dark bg-black text-white" : "bg-white text-black"}>

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500" />
            <span className="font-bold text-lg">AssoPilot</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-neutral-300">
            <a href="#features">Fonctionnalités</a>
            <a href="#vision">Vision</a>
            <a href="#securite">Sécurité</a>
            <a href="#tarifs">Tarifs</a>
            <a href="#contact">Contact</a>
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
                Connexion
              </button>
            </Link>

            <Link href="/register">
              <button className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold">
                Commencer
              </button>
            </Link>

          </div>

        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-300 text-sm">
            Plateforme moderne de gestion associative
          </div>

          <h1 className="text-[clamp(2.8rem,6vw,6rem)] font-black leading-none mt-8">
            Gérez votre association<br />
            comme une entreprise moderne
          </h1>

          <p className="mt-8 text-neutral-400 text-lg">
            AssoPilot centralise membres, cotisations, événements et finances
            dans une seule plateforme élégante, rapide et sécurisée.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link href="/register">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-black font-semibold flex items-center gap-2">
                Essayer gratuitement <ArrowRight size={16} />
              </button>
            </Link>

            <button className="px-6 py-4 rounded-2xl border border-white/10">
              Voir la démonstration
            </button>

          </div>

        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="px-6 py-32 max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold">
            Fonctionnalités puissantes
          </h2>

          <p className="mt-6 text-neutral-400">
            Tout ce dont une association moderne a besoin.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >

              <f.icon className="text-emerald-400 mb-4" />

              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-neutral-400 mt-3">{f.desc}</p>

            </div>
          ))}

        </div>

      </section>

      {/* ================= VISION ================= */}
      <section id="vision" className="px-6 py-40 text-center">

        <h2 className="text-6xl font-black">
          Une vision moderne<br />
          de la gestion associative
        </h2>

        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto">
          Une plateforme pensée pour transformer les associations en organisations structurées,
          transparentes et efficaces.
        </p>

      </section>

      {/* ================= SECURITY ================= */}
      <section id="securite" className="px-6 py-32 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-5xl font-bold">
              Sécurité avancée
            </h2>

            <p className="mt-8 text-neutral-400">
              Protection des données, contrôle d’accès et architecture moderne.
            </p>

            <div className="mt-10 space-y-4">

              {[
                "Authentification sécurisée",
                "Gestion des rôles (admin, membre, trésorier)",
                "Chiffrement des données",
                "Historique complet des actions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-neutral-300">
                  <Check className="text-emerald-400" />
                  {item}
                </div>
              ))}

            </div>

          </div>

          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            alt="dashboard"
            width={1200}
            height={800}
            className="rounded-3xl"
          />

        </div>

      </section>

      {/* ================= PRICING ================= */}
      <section id="tarifs" className="px-6 py-32 max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Tarification simple
        </h2>

        <div className="mt-20 grid md:grid-cols-3 gap-6">

          {[
            { name: "Starter", price: "0" },
            { name: "Pro", price: "15 000" },
            { name: "Elite", price: "45 000" },
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
                Choisir
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-40 text-center">

        <h2 className="text-6xl font-black">
          Commencez dès maintenant
        </h2>

        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto">
          Rejoignez la nouvelle génération des associations digitales.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link href="/register">
            <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-semibold">
              Créer un compte
            </button>
          </Link>

          <button className="px-8 py-4 border border-white/10 rounded-2xl">
            Contacter
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-16 text-center text-neutral-500">

        AssoPilot © 2026 — Tous droits réservés

      </footer>

    </main>
  )
}