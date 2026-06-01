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
    <main className="relative overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-white dark:text-black">
      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />

        <div className="absolute right-[-200px] top-[10%] h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[160px]" />

        <div className="absolute bottom-[-250px] left-[20%] h-[800px] w-[800px] rounded-full bg-violet-500/10 blur-[180px]" />
      </div>

      {/* NAVBAR */}

      <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-3xl dark:border-black/10 dark:bg-white/70">
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

      {/* PARTIE 3 COMMENCE ICI */}

            {/* ===================================================== */}
      {/* PARTIE 3 PREMIUM */}
      {/* SECURITY + INTEGRATIONS + TIMELINE + TESTIMONIALS */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden px-6 py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-cyan-500/[0.04]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-20 xl:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-5 py-2 text-sm text-violet-500">
                <ShieldCheck className="h-4 w-4" />
                Sécurité Enterprise
              </div>

              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                Une sécurité pensée
                pour les organisations
                les plus exigeantes.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                Protection multicouche,
                contrôle des accès,
                journalisation avancée,
                sauvegardes automatiques
                et conformité moderne.
              </p>

              <div className="mt-12 grid gap-6">
                {[
                  "Authentification sécurisée",
                  "Permissions multi-rôles",
                  "Logs d'audit complets",
                  "Sauvegardes automatiques",
                  "Chiffrement des données",
                  "Surveillance continue",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <span className="text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "99.99%",
                  subtitle: "Disponibilité",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  title: "256-bit",
                  subtitle: "Chiffrement",
                  color: "from-violet-500 to-fuchsia-600",
                },
                {
                  title: "24/7",
                  subtitle: "Monitoring",
                  color: "from-emerald-500 to-green-600",
                },
                {
                  title: "100%",
                  subtitle: "Protection",
                  color: "from-orange-500 to-red-500",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-[36px] border border-black/5 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-neutral-950"
                >
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                  />

                  <h3 className="mt-8 text-5xl font-bold">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-neutral-500">
                    {card.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}

      <section className="px-6 py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="inline-flex rounded-full bg-cyan-500/10 px-5 py-2 text-sm text-cyan-500">
              Intégrations
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Connecté à votre écosystème.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">
              Synchronisez facilement vos outils,
              vos paiements et vos services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-6">
            {[
              "Orange Money",
              "MTN Money",
              "Wave",
              "Google",
              "Microsoft",
              "AWS",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="flex h-40 items-center justify-center rounded-[32px] border border-black/5 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-950"
              >
                <span className="text-lg font-semibold">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}

      <section className="relative px-6 py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-24 text-center">
            <div className="inline-flex rounded-full bg-emerald-500/10 px-5 py-2 text-sm text-emerald-500">
              Vision & Évolution
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Une plateforme construite
              pour l'avenir.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500" />

            <div className="space-y-16">
              {[
                {
                  year: "2024",
                  title: "Fondation",
                  desc: "Création de la vision AssoPilot.",
                },
                {
                  year: "2025",
                  title: "Paiements Mobile Money",
                  desc: "Intégration Orange, MTN et Wave.",
                },
                {
                  year: "2026",
                  title: "Analytics IA",
                  desc: "Rapports intelligents et prédictions.",
                },
                {
                  year: "2027",
                  title: "Expansion Internationale",
                  desc: "Déploiement multi-pays.",
                },
              ].map((item) => (
                <div
                  key={item.year}
                  className="relative ml-16"
                >
                  <div className="absolute -left-[53px] top-2 h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 shadow-lg" />

                  <span className="text-sm text-cyan-500">
                    {item.year}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="relative px-6 py-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="inline-flex rounded-full bg-orange-500/10 px-5 py-2 text-sm text-orange-500">
              Témoignages
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Les organisations nous font confiance.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Aminata K.",
                role: "Présidente",
                company: "Association Horizon",
                text: "Nous avons automatisé toute notre gestion en quelques semaines.",
              },
              {
                name: "Jean M.",
                role: "Trésorier",
                company: "Fondation Afrique",
                text: "Le suivi financier est devenu simple et totalement transparent.",
              },
              {
                name: "Sarah T.",
                role: "Directrice",
                company: "Youth Impact",
                text: "Une plateforme élégante et extrêmement professionnelle.",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -10 }}
                className="rounded-[40px] border border-black/5 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />

                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </div>

                <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                  "{item.text}"
                </p>

                <div className="mt-8 text-sm font-medium text-cyan-500">
                  {item.company}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE SECTION */}

      <section className="px-6 py-40">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[60px] bg-gradient-to-br from-black via-neutral-900 to-black p-14 text-white">
          <div className="grid items-center gap-16 xl:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                Enterprise Suite
              </span>

              <h2 className="mt-8 text-4xl font-bold md:text-5xl">
                Conçu pour les grandes
                organisations.
              </h2>

              <p className="mt-8 text-lg text-white/70">
                Gérez des milliers de membres,
                plusieurs entités et des volumes
                importants de transactions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                "API Avancée",
                "Multi-organisations",
                "Support Prioritaire",
                "Formation Dédiée",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-semibold">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FIN PARTIE 3 */}

            {/* ===================================================== */}
      {/* PARTIE 4 PREMIUM */}
      {/* PRICING + FAQ + FINAL CTA + FOOTER */}
      {/* ===================================================== */}

      <section
        id="pricing"
        className="relative overflow-hidden px-6 py-40"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-500">
              Tarification transparente
            </div>

            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Choisissez le plan adapté
              à votre organisation.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Des formules conçues pour accompagner
              les associations de toutes tailles.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-3">
            {/* STARTER */}

            <motion.div
              whileHover={{ y: -10 }}
              className="rounded-[40px] border border-black/5 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
            >
              <span className="text-sm text-neutral-500">
                STARTER
              </span>

              <h3 className="mt-6 text-3xl font-bold">
                Gratuit
              </h3>

              <p className="mt-3 text-neutral-500">
                Pour démarrer rapidement.
              </p>

              <div className="mt-10">
                <span className="text-6xl font-bold">
                  0
                </span>

                <span className="text-neutral-500">
                  {" "}
                  FCFA
                </span>
              </div>

              <div className="mt-10 space-y-5">
                {[
                  "20 membres",
                  "Paiements manuels",
                  "1 administrateur",
                  "Dashboard basique",
                  "Support standard",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-cyan-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full rounded-2xl border border-black/10 py-4 font-medium dark:border-white/10">
                Commencer
              </button>
            </motion.div>

            {/* PRO */}

            <motion.div
              whileHover={{ y: -12 }}
              className="relative overflow-hidden rounded-[40px] border border-cyan-500 bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-white shadow-[0_20px_80px_rgba(6,182,212,0.3)]"
            >
              <div className="absolute right-6 top-6 rounded-full bg-white px-4 py-1 text-xs font-semibold text-black">
                RECOMMANDÉ
              </div>

              <span className="text-sm text-cyan-100">
                PRO
              </span>

              <h3 className="mt-6 text-3xl font-bold">
                Professionnel
              </h3>

              <p className="mt-3 text-cyan-100">
                Pour les organisations modernes.
              </p>

              <div className="mt-10">
                <span className="text-6xl font-bold">
                  15K
                </span>

                <span className="text-cyan-100">
                  {" "}
                  FCFA/mois
                </span>
              </div>

              <div className="mt-10 space-y-5">
                {[
                  "100 membres",
                  "Orange Money",
                  "MTN Money",
                  "Wave",
                  "Rapports avancés",
                  "Notifications SMS",
                  "5 administrateurs",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-white" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full rounded-2xl bg-white py-4 font-bold text-black">
                Choisir Pro
              </button>
            </motion.div>

            {/* ELITE */}

            <motion.div
              whileHover={{ y: -10 }}
              className="rounded-[40px] border border-black/5 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
            >
              <span className="text-sm text-neutral-500">
                ELITE
              </span>

              <h3 className="mt-6 text-3xl font-bold">
                Enterprise
              </h3>

              <p className="mt-3 text-neutral-500">
                Pour les grandes structures.
              </p>

              <div className="mt-10">
                <span className="text-6xl font-bold">
                  45K
                </span>

                <span className="text-neutral-500">
                  {" "}
                  FCFA/mois
                </span>
              </div>

              <div className="mt-10 space-y-5">
                {[
                  "Membres illimités",
                  "API avancée",
                  "Analytics Premium",
                  "Support prioritaire",
                  "Multi-organisations",
                  "Audit complet",
                  "Formation dédiée",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-violet-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-10 w-full rounded-2xl border border-black/10 py-4 font-medium dark:border-white/10">
                Contacter l'équipe
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative px-6 py-40"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-20 text-center">
            <div className="inline-flex rounded-full bg-violet-500/10 px-5 py-2 text-sm text-violet-500">
              Questions fréquentes
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-5xl">
              Tout ce que vous devez savoir.
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Puis-je utiliser Orange Money ?",
                a: "Oui, Orange Money, MTN Money et Wave sont intégrés.",
              },
              {
                q: "Les données sont-elles sécurisées ?",
                a: "Oui, toutes les données sont chiffrées et protégées.",
              },
              {
                q: "Puis-je gérer plusieurs associations ?",
                a: "Le plan Elite permet la gestion multi-organisations.",
              },
              {
                q: "Existe-t-il une API ?",
                a: "Oui, disponible dans le plan Enterprise.",
              },
              {
                q: "Les membres reçoivent-ils des notifications ?",
                a: "Oui, SMS, emails et notifications automatiques.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-[32px] border border-black/5 p-8 dark:border-white/10"
              >
                <h3 className="text-xl font-semibold">
                  {item.q}
                </h3>

                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ===================================================== */}
{/* PARTIE 5 PREMIUM ELITE */}
{/* TRUST • SOCIAL PROOF • ROADMAP • FINAL EXPERIENCE */}
{/* ===================================================== */}

<section className="relative overflow-hidden px-6 py-40">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent" />

  <div className="relative mx-auto max-w-7xl">
    <div className="text-center">
      <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-500">
        Confiance mondiale
      </div>

      <h2 className="mx-auto mt-8 max-w-5xl text-4xl font-bold md:text-5xl">
        Déjà adopté par des associations,
        ONG et organisations modernes.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">
        Une plateforme pensée pour les leaders
        qui veulent professionnaliser leur gestion.
      </p>
    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          value: "50K+",
          label: "Transactions",
        },
        {
          value: "1K+",
          label: "Organisations",
        },
        {
          value: "99.99%",
          label: "Disponibilité",
        },
        {
          value: "12 Pays",
          label: "Présence",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="rounded-[36px] border border-black/5 bg-white p-10 text-center shadow-xl dark:border-white/10 dark:bg-neutral-950"
        >
          <h3 className="text-5xl font-bold">
            {item.value}
          </h3>

          <p className="mt-4 text-neutral-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ROADMAP */}

<section className="px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <div className="inline-flex rounded-full bg-violet-500/10 px-5 py-2 text-sm text-violet-500">
        Roadmap
      </div>

      <h2 className="mt-8 text-4xl font-bold md:text-5xl">
        Le futur d'AssoPilot.
      </h2>
    </div>

    <div className="grid gap-8 lg:grid-cols-4">
      {[
        {
          year: "2026",
          title: "IA Assistée",
          desc: "Analyse automatique des finances.",
        },
        {
          year: "2027",
          title: "Application Mobile",
          desc: "iOS & Android natifs.",
        },
        {
          year: "2028",
          title: "Marketplace",
          desc: "Modules et extensions.",
        },
        {
          year: "2029",
          title: "Plateforme Africaine",
          desc: "Expansion continentale.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-[36px] border border-black/5 bg-white p-10 dark:border-white/10 dark:bg-neutral-950"
        >
          <span className="text-cyan-500">
            {item.year}
          </span>

          <h3 className="mt-4 text-2xl font-bold">
            {item.title}
          </h3>

          <p className="mt-4 text-neutral-500">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ELITE CTA */}

<section className="relative px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="overflow-hidden rounded-[60px] bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700 px-12 py-32 text-center text-white shadow-[0_30px_120px_rgba(59,130,246,0.4)]">
      <span className="rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur-xl">
        AssoPilot Elite
      </span>

      <h2 className="mx-auto mt-10 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
        La plateforme qui transforme
        votre organisation.
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80">
        Gérez vos membres, vos paiements,
        vos événements et vos finances
        dans une expérience moderne,
        élégante et sécurisée.
      </p>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <Link
          href="/register"
          className="rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition hover:scale-105"
        >
          Commencer gratuitement
        </Link>

        <button className="rounded-full border border-white/20 px-10 py-5 text-lg backdrop-blur-xl">
          Planifier une démonstration
        </button>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}

      <footer
        id="contact"
        className="border-t border-black/5 px-6 py-20 dark:border-white/10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold">
                AssoPilot
              </h3>

              <p className="mt-5 max-w-md text-neutral-600 dark:text-neutral-400">
                La plateforme moderne de gestion
                associative conçue pour les organisations
                ambitieuses d'Afrique et d'ailleurs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Produit
              </h4>

              <div className="mt-5 space-y-3 text-neutral-500">
                <p>Fonctionnalités</p>
                <p>Analytics</p>
                <p>Sécurité</p>
                <p>API</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Ressources
              </h4>

              <div className="mt-5 space-y-3 text-neutral-500">
                <p>Documentation</p>
                <p>Guide</p>
                <p>Support</p>
                <p>FAQ</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Entreprise
              </h4>

              <div className="mt-5 space-y-3 text-neutral-500">
                <p>À propos</p>
                <p>Carrières</p>
                <p>Confidentialité</p>
                <p>Conditions</p>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-black/5 pt-8 text-sm text-neutral-500 dark:border-white/10">
            © 2026 AssoPilot. Tous droits réservés.
          </div>
        </div>
      </footer>

    </main>
  )
}