"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  Globe,
  Users,
  ShieldCheck,
  Wallet,
  TrendingUp,
  Building2,
  ChevronRight,
  Lock,
  Shield,
  Database,
  Activity,
  CheckCircle2,
  
} from "lucide-react"

const companies = [
  "ORANGE",
  "MTN",
  "WAVE",
  "GOOGLE",
  "MICROSOFT",
  "AWS",
  "VISA",
  "MASTERCARD",
]

const stats = [
  {
    value: "1K+",
    label: "Organisations",
  },
  {
    value: "50K+",
    label: "Transactions",
  },
  {
    value: "99.9%",
    label: "Disponibilité",
  },
  {
    value: "15+",
    label: "Pays",
  },
]

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <main className="relative overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white">
      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />

        <div className="absolute right-[-200px] top-[10%] h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[160px]" />

        <div className="absolute bottom-[-250px] left-[20%] h-[800px] w-[800px] rounded-full bg-violet-500/10 blur-[180px]" />
      </div>

      {/* NAVBAR */}

      <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-3xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* LOGO */}

          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight">
                AssoPilot
              </h2>

              <p className="text-xs text-neutral-500">
                Association Operating System
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              Fonctionnalités
            </a>

            <a
              href="#dashboard"
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="#analytics"
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              Analytics
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              Tarifs
            </a>

            <a
              href="#faq"
              className="text-sm font-medium text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              FAQ
            </a>
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full border border-black/10 p-2 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <Link
              href="/login"
              className="hidden rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10 lg:block"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black lg:block"
            >
              Commencer
            </Link>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
            >
              {mobileMenu ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (
          <div className="border-t border-black/5 bg-white dark:border-white/10 dark:bg-black lg:hidden">
            <div className="flex flex-col p-6">
              {[
                "Fonctionnalités",
                "Dashboard",
                "Analytics",
                "Tarifs",
                "FAQ",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="py-4 text-lg"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-600 dark:text-cyan-400">
              <Sparkles className="h-4 w-4" />
              Nouvelle génération de gestion associative
            </div>

            <h1 className="mx-auto max-w-6xl text-5xl font-bold leading-tight tracking-tight md:text-6xl xl:text-7xl">
              Gérez votre organisation
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                autrement.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-xl">
              Une plateforme moderne qui centralise les membres,
              les paiements Mobile Money, les événements,
              la communication et les finances dans une
              expérience fluide, élégante et sécurisée.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-3 rounded-full bg-black px-8 py-4 text-white transition hover:scale-105 dark:bg-white dark:text-black"
              >
                Créer mon organisation

                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <button className="rounded-full border border-black/10 px-8 py-4 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
                Voir la démonstration
              </button>
            </div>

            {/* STATS */}

            <div className="mt-24 grid gap-10 md:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label}>
                  <h3 className="text-5xl font-bold">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-neutral-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}

      <section className="border-y border-black/5 py-16 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-12 text-center text-sm uppercase tracking-[0.3em] text-neutral-500">
            Compatible avec votre écosystème
          </p>

          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 xl:grid-cols-8">
            {companies.map((item) => (
              <div
                key={item}
                className="text-xl font-semibold text-neutral-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}

      <section className="relative py-40 px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-24 xl:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Globe className="h-4 w-4" />
              Une seule plateforme
            </div>

            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Centralisez tout.
              <br />
              Simplifiez tout.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              Fini les feuilles Excel dispersées,
              les groupes WhatsApp désorganisés
              et les suivis manuels compliqués.

              AssoPilot rassemble toutes les opérations
              de votre organisation dans une seule
              interface intuitive.
            </p>

            <div className="mt-12 space-y-5">
              {[
                {
                  icon: Users,
                  text: "Gestion intelligente des membres",
                  color: "text-cyan-500",
                },
                {
                  icon: Wallet,
                  text: "Paiements Mobile Money",
                  color: "text-emerald-500",
                },
                {
                  icon: ShieldCheck,
                  text: "Sécurité avancée",
                  color: "text-violet-500",
                },
                {
                  icon: TrendingUp,
                  text: "Rapports et analyses",
                  color: "text-orange-500",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4"
                >
                  <item.icon
                    className={`h-6 w-6 ${item.color}`}
                  />

                  <span className="text-lg">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-12 flex items-center gap-2 font-medium text-cyan-500">
              Découvrir la plateforme

              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2200&auto=format&fit=crop"
              alt="Dashboard"
              width={2200}
              height={1600}
              className="rounded-[40px] shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* PARTIE 2 COMMENCE ICI */}

            {/* ===================================================== */}
      {/* PARTIE 2 PREMIUM */}
      {/* BENTO FEATURES + DASHBOARD + MOBILE MONEY + ANALYTICS */}
      {/* ===================================================== */}

      <section
        id="features"
        className="relative overflow-hidden px-6 py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-500">
              <Sparkles className="h-4 w-4" />
              Fonctionnalités nouvelle génération
            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Pensé pour les organisations
              modernes et ambitieuses.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">
              Une expérience complète permettant
              d'automatiser les opérations,
              améliorer la transparence financière
              et renforcer la collaboration.
            </p>
          </div>

          {/* BENTO GRID */}

          <div className="grid auto-rows-[260px] gap-6 lg:grid-cols-4">
            {/* CARD 1 */}

            <motion.div
              whileHover={{ y: -8 }}
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-[36px] border border-black/5 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 p-10 dark:border-white/10"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500 text-white shadow-xl">
                <Users className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold">
                Gestion intelligente des membres
              </h3>

              <p className="mt-5 max-w-xl text-neutral-600 dark:text-neutral-400">
                Profils détaillés, rôles, groupes,
                historiques, présence, cotisations
                et activités centralisés.
              </p>

              <div className="absolute bottom-8 right-8">
                <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                  <p className="text-sm text-neutral-500">
                    Membres actifs
                  </p>

                  <h4 className="mt-2 text-5xl font-bold">
                    842
                  </h4>

                  <span className="text-sm text-emerald-500">
                    +12% ce mois
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CARD 2 */}

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[36px] border border-black/5 bg-gradient-to-br from-emerald-500/10 to-green-500/10 p-8 dark:border-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <Wallet className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold">
                Mobile Money
              </h3>

              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                Orange Money, MTN Money,
                Wave et paiements bancaires.
              </p>
            </motion.div>

            {/* CARD 3 */}

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[36px] border border-black/5 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-8 dark:border-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-white">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold">
                Sécurité
              </h3>

              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                Protection avancée,
                permissions et audit complet.
              </p>
            </motion.div>

            {/* CARD 4 */}

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[36px] border border-black/5 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-8 dark:border-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                <TrendingUp className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold">
                Analytics
              </h3>

              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                Rapports et statistiques
                en temps réel.
              </p>
            </motion.div>

            {/* CARD 5 */}

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[36px] border border-black/5 bg-gradient-to-br from-pink-500/10 to-rose-500/10 p-8 dark:border-white/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500 text-white">
                <Globe className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold">
                Multi-organisations
              </h3>

              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                Gérez plusieurs structures
                depuis un seul espace.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}

      <section
        id="dashboard"
        className="relative overflow-hidden px-6 py-40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-blue-950/30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-20 xl:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-500">
                Dashboard Premium
              </div>

              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                Toutes vos données.
                <br />
                Une seule interface.
              </h2>

              <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-400">
                Un tableau de bord conçu pour
                offrir une visibilité complète
                sur les membres, les paiements,
                les événements et la croissance.
              </p>

              <div className="mt-12 grid gap-5">
                {[
                  "Rapports financiers",
                  "Cotisations automatisées",
                  "Historiques détaillés",
                  "Suivi des activités",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2200&auto=format&fit=crop"
                alt="Dashboard"
                width={2200}
                height={1600}
                className="rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOBILE MONEY */}

      <section className="px-6 py-40">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[48px] bg-gradient-to-br from-emerald-500 to-green-700 p-14 text-white">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
                  Mobile Money
                </span>

                <h2 className="mt-8 text-4xl font-bold md:text-5xl">
                  Encaissez les cotisations
                  sans effort.
                </h2>

                <p className="mt-6 text-lg text-white/80">
                  Connectez Orange Money,
                  MTN Money, Wave et les
                  virements bancaires pour
                  simplifier la collecte.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {["Orange", "MTN", "Wave", "Visa"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl"
                    >
                      <h3 className="text-2xl font-bold">
                        {item}
                      </h3>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}

      <section
        id="analytics"
        className="relative px-6 py-40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="inline-flex rounded-full bg-orange-500/10 px-5 py-2 text-sm text-orange-500">
              Analytics & Intelligence
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Décidez avec des données.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Croissance",
                value: "+82%",
                color: "cyan",
              },
              {
                title: "Cotisations",
                value: "2.4M FCFA",
                color: "emerald",
              },
              {
                title: "Présence",
                value: "94%",
                color: "orange",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-black/5 p-10 dark:border-white/10"
              >
                <p className="text-neutral-500">
                  {item.title}
                </p>

                <h3 className="mt-4 text-5xl font-bold">
                  {item.value}
                </h3>

                <div className="mt-8 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="h-full w-[80%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      {/* SECURITY SECTION */}
      {/* ===================== */}
      <section className="relative py-40 px-6 overflow-hidden">

        <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-6xl text-center relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.3em] text-sm text-emerald-500">
              SECURITY • SÉCURITÉ • TRUST
            </p>

            <h2 className="mt-6 text-5xl md:text-7xl font-semibold leading-tight">
              Vos données sont protégées
              <br />
              comme une banque.
            </h2>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Your data is protected with enterprise-grade security, encryption,
              and zero-trust architecture designed for modern organizations.
            </p>
          </motion.div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">

            {[
              {
                icon: Lock,
                title: "JWT Secure Auth",
                desc: "Authentification sécurisée avec tokens chiffrés.",
              },
              {
                icon: Shield,
                title: "Role-based Access",
                desc: "Admin / Member / Owner permissions strictes.",
              },
              {
                icon: Database,
                title: "Encrypted Database",
                desc: "Données protégées au niveau serveur et transport.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="p-8 rounded-[32px] border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl"
              >
                <item.icon className="w-8 h-8 text-emerald-500" />

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-neutral-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-neutral-50 dark:bg-neutral-950">

        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[0.3em] text-sm text-emerald-500">
              ARCHITECTURE • INFRASTRUCTURE
            </p>

            <h2 className="mt-6 text-5xl font-semibold leading-tight">
              Built for scale.
              <br />
              Conçu pour évoluer.
            </h2>

            <p className="mt-8 text-neutral-600 dark:text-neutral-400 text-lg">
              Next.js architecture + scalable backend + modern API design
              for high-performance association management.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Next.js 15 App Router architecture",
                "Prisma ORM + PostgreSQL scalable DB",
                "API secure REST / Server Actions",
                "Multi-organization system",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  <span>{t}</span>
                </div>
              ))}

            </div>

          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >

            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />

            <div className="relative rounded-[40px] border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-10">

              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">System Health</h3>
                <Activity className="text-emerald-500" />
              </div>

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-neutral-500">API Status</p>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-2">
                    <div className="h-2 bg-emerald-500 w-[98%] rounded-full" />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Database Load</p>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-2">
                    <div className="h-2 bg-emerald-500 w-[72%] rounded-full" />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Latency</p>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-2">
                    <div className="h-2 bg-emerald-500 w-[45%] rounded-full" />
                  </div>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      <section className="relative py-44 px-6 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/10" />

        <div className="mx-auto max-w-5xl text-center relative">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >

            <p className="uppercase tracking-[0.3em] text-emerald-500">
              FUTURE • VISION • EVOLUTION
            </p>

            <h2 className="mt-8 text-6xl md:text-8xl font-semibold leading-none">
              A new standard
              <br />
              for associations.
            </h2>

            <p className="mt-10 text-xl text-neutral-600 dark:text-neutral-400">
              Une plateforme pensée comme Stripe pour les paiements,
              Linear pour la productivité et Apple pour l’expérience.
            </p>

            <div className="mt-14 flex justify-center gap-4 flex-wrap">

              <button className="px-8 py-4 rounded-full bg-emerald-500 text-black font-semibold hover:scale-105 transition">
                Start now
              </button>

              <button className="px-8 py-4 rounded-full border border-black/10 dark:border-white/10">
                Learn more
              </button>

            </div>

          </motion.div>

        </div>
      </section>

      <footer className="py-20 px-6 border-t border-black/10 dark:border-white/10">

        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h3 className="text-2xl font-semibold">AssoPilot</h3>
            <p className="text-neutral-500 mt-2">
              Association Operating System — Elite SaaS Platform
            </p>
          </div>

          <div className="flex gap-10 text-sm text-neutral-500">
            <div className="space-y-2">
              <p className="font-semibold text-black dark:text-white">Product</p>
              <p>Features</p>
              <p>Security</p>
              <p>Pricing</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-black dark:text-white">Company</p>
              <p>About</p>
              <p>Careers</p>
              <p>Contact</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-black dark:text-white">Legal</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>

        </div>

      </footer>

    </main>
  )
}

