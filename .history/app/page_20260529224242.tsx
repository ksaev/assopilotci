"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Users,
  BarChart3,
  Smartphone,
  CalendarDays,
  Check,
  Sparkles,
  Globe,
  BellRing,
  LockKeyhole,
  Layers3,
  ChevronRight,
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
    features: [
      "20 membres",
      "Paiements manuels",
      "1 administrateur",
      "Dashboard basique",
    ],
  },
  {
    name: "Pro",
    price: "15 000",
    popular: true,
    description: "Pour associations modernes",
    features: [
      "100 membres",
      "Mobile Money intégré",
      "Notifications SMS",
      "5 administrateurs",
      "Rapports avancés",
    ],
  },
  {
    name: "Elite",
    price: "45 000",
    description: "Pour organisations avancées",
    features: [
      "Membres illimités",
      "Analytics premium",
      "API avancée",
      "Support prioritaire",
      "Formation dédiée",
    ],
  },
]

const stats = [
  {
    label: "Associations actives",
    value: "1K+",
  },
  {
    label: "Transactions suivies",
    value: "50K+",
  },
  {
    label: "Disponibilité",
    value: "99.9%",
  },
]

// =====================================================
// ASSOPILOT ELITE LANDING PAGE
// Next.js 15 + TailwindCSS + Framer Motion
// Premium SaaS Architecture
// =====================================================

// INSTALLATION:
// npm install framer-motion lucide-react
//
// TAILWIND:
// Enable dark mode and use latest Tailwind version.
//
// RECOMMENDED FONT:
// Geist / Inter / Satoshi
//
// FEATURES:
// - Responsive Premium Design
// - Glassmorphism UI
// - Mobile First
// - Animated Sections
// - SaaS Premium Layout
// - Optimized CTA
// - Dashboard Showcase
// - Professional Typography
// - Green & White Harmony Theme
// - Modern Enterprise UX
// =====================================================



export default function EliteLandingPage() {

  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02150d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:70px_70px] opacity-20" />
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-300 shadow-[0_0_40px_rgba(59,130,246,0.45)]">
              <Layers3 className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">AssoPilot</h1>
              <p className="text-xs text-zinc-500">Association Operating System</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 lg:flex">
            <a href="#features" className="transition hover:text-white">
              Fonctionnalités
            </a>
            <a href="#analytics" className="transition hover:text-white">
              Analytics
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Tarifs
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10">
                Connexion
              </button>
            </Link>

            <Link href="/register">
              <button className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold shadow-[0_0_40px_rgba(59,130,246,0.45)] transition hover:bg-emerald-500">
                Commencer
              </button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative px-6 pb-28 pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Plateforme moderne axée sur l’harmonie, la transparence et la paix organisationnelle
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-6xl xl:text-7xl">
              Gérez votre association avec une expérience moderne et professionnelle.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Une expérience digitale élégante conçue pour les associations modernes africaines. Centralisez vos membres, vos cotisations et vos activités dans une interface inspirant confiance, stabilité et sérénité.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <button className="group flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold shadow-[0_0_60px_rgba(59,130,246,0.35)] transition hover:bg-emerald-500">
                  Créer une organisation
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>
              </Link>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold transition hover:bg-white/10">
                Voir la démonstration
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {stats.map((item) => (
                <div key={item.label}>
                  <h3 className="text-4xl font-black">{item.value}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_0_100px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-6 py-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-zinc-500">dashboard.assopilot.app</span>
              </div>

              <div className="space-y-6 p-6">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                  alt="Dashboard"
                  width={1600}
                  height={900}
                  className="rounded-3xl border border-white/10 object-cover"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-400">Cotisations collectées</p>
                      <Wallet className="h-5 w-5 text-emerald-400" />
                    </div>

                    <h3 className="mt-5 text-4xl font-black">2.4M</h3>
                    <p className="mt-1 text-sm text-zinc-500">FCFA ce mois</p>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full w-[82%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-400">Membres actifs</p>
                      <Users className="h-5 w-5 text-green-200" />
                    </div>

                    <h3 className="mt-5 text-4xl font-black">842</h3>
                    <p className="mt-1 text-sm text-zinc-500">+12% ce mois</p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-emerald-300">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      Système synchronisé
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              Fonctionnalités premium
            </div>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Une plateforme inspirée par l’unité, la confiance et la croissance collective.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Une expérience ultra moderne combinant automatisation, paiements Mobile Money et gestion avancée.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-emerald-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10">
                    <feature.icon className="h-7 w-7 text-emerald-400" />
                  </div>

                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-4 leading-relaxed text-zinc-400">{feature.description}</p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-300">
                    Découvrir
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="analytics" className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-3xl" />

            <Image
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
              alt="Analytics"
              width={1600}
              height={1200}
              className="relative rounded-[36px] border border-white/10 object-cover shadow-2xl"
            />
          </div>

          <div>
            <div className="mb-6 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-green-200">
              Dashboard analytique
            </div>

            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Une identité visuelle verte et blanche inspirée par l’harmonie et la paix.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              AssoPilot offre une interface premium avec animations fluides, dashboards intelligents et workflows optimisés.
            </p>

            <div className="mt-10 space-y-6">
              {[
                "Architecture Next.js moderne",
                "Design glassmorphism premium",
                "Mobile-first responsive",
                "Paiements Mobile Money intelligents",
                "Gestion multi-organisations sécurisée",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="text-4xl font-black md:text-5xl">Tarification transparente</h2>
            <p className="mt-6 text-lg text-zinc-400">
              Des plans conçus pour accompagner la croissance de chaque organisation.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-[36px] border p-10 ${
                  plan.popular
                    ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_100px_rgba(59,130,246,0.2)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold">
                    Populaire
                  </div>
                )}

                <h3 className="text-3xl font-black">{plan.name}</h3>
                <p className="mt-3 text-zinc-400">{plan.description}</p>

                <div className="mt-10 flex items-end gap-2">
                  <span className="text-6xl font-black">{plan.price}</span>
                  <span className="mb-2 text-zinc-500">FCFA/mois</span>
                </div>

                <div className="mt-10 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-10 w-full rounded-2xl py-4 font-semibold transition-all ${
                    plan.popular
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "border border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[42px] border border-white/10 bg-gradient-to-br from-emerald-600 via-blue-700 to-cyan-600 px-10 py-20 text-center shadow-[0_0_120px_rgba(59,130,246,0.35)] md:px-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-2xl">
              <Globe className="h-10 w-10" />
            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Construisez une association moderne dans un environnement de confiance et de paix.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-blue-100">
              Automatisez vos cotisations, améliorez la gestion de vos membres et centralisez toute votre organisation.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <button className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black transition hover:scale-105">
                  Commencer gratuitement
                </button>
              </Link>

              <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/20">
                Planifier une démonstration
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Expérience digitale nouvelle génération
            </div>

            <h2 className="mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Une plateforme associative conçue comme un véritable produit technologique international.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-zinc-400">
              Design émotionnel, fluidité moderne, architecture élite et expérience immersive pensée pour les organisations africaines ambitieuses.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Expérience premium",
                text: "Une interface pensée pour inspirer confiance, modernité et professionnalisme dès les premières secondes.",
              },
              {
                title: "Architecture scalable",
                text: "Conçue avec les standards modernes SaaS pour évoluer avec les grandes organisations.",
              },
              {
                title: "Écosystème intelligent",
                text: "Paiements, membres, statistiques, événements et communication centralisés dans un seul système.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.03] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                    <ShieldCheck className="h-10 w-10 text-emerald-300" />
                  </div>

                  <h3 className="text-3xl font-black tracking-tight">{card.title}</h3>
                  <p className="mt-6 leading-relaxed text-zinc-400">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 xl:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300">
                Interface immersive ultra moderne
              </div>

              <h2 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
                Le design donne immédiatement une image haut de gamme à votre organisation.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-zinc-400">
                AssoPilot adopte les meilleurs standards UX modernes : hiérarchie visuelle premium, espaces respirants, animations fluides et expérience responsive irréprochable.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  "Animations fluides Framer Motion",
                  "Responsive mobile/tablette/desktop",
                  "Typography premium moderne",
                  "Glassmorphism nouvelle génération",
                  "Performance optimisée Next.js",
                  "Design émotionnel et professionnel",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.25)]">
                      <Check className="h-5 w-5" />
                    </div>

                    <span className="text-base font-medium text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_100px_rgba(16,185,129,0.15)] backdrop-blur-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                  alt="Elite dashboard"
                  width={1600}
                  height={1200}
                  className="rounded-[28px] border border-white/10 object-cover"
                />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <p className="text-sm text-zinc-500">Croissance des adhésions</p>
                    <h3 className="mt-4 text-5xl font-black">+82%</h3>
                    <p className="mt-3 text-sm text-emerald-300">Évolution positive continue</p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                    <p className="text-sm text-zinc-500">Transactions sécurisées</p>
                    <h3 className="mt-4 text-5xl font-black">100%</h3>
                    <p className="mt-3 text-sm text-emerald-300">Protection avancée active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl rounded-[42px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl md:p-20">
          <div className="grid gap-16 xl:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-300">
                Confiance • Harmonie • Transparence
              </div>

              <h2 className="text-5xl font-black leading-tight tracking-tight">
                Une identité visuelle inspirée par la stabilité et la paix.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-zinc-400">
                Les couleurs vertes et blanches ont été pensées pour transmettre une sensation de sérénité, de croissance collective et de confiance durable.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                "Design inspiré des meilleures plateformes SaaS mondiales",
                "Expérience premium moderne et rassurante",
                "Navigation ultra fluide et intuitive",
                "Typographie élégante et lisible",
                "Sections immersives et vivantes",
                "Architecture pensée pour l’évolutivité",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-black/20 p-8 transition-all duration-300 hover:border-emerald-500/30"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Sparkles className="h-7 w-7 text-emerald-300" />
                  </div>

                  <p className="leading-relaxed text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black">AssoPilot</h3>
                <p className="text-sm text-zinc-500">
                  Plateforme premium de gestion associative.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
            <a href="#">Confidentialité</a>
            <a href="#">Conditions</a>
            <a href="#">Documentation</a>
            <a href="#">Support</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
  }
