"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Users,
  Wallet,
  TrendingUp,
  CalendarDays,
  BellRing,
  Brain,
  Globe,
} from "lucide-react"

export default function HeroSection() {
  return (
    <>
      {/* ===================================================== */}
      {/* NAVBAR PREMIUM */}
      {/* ===================================================== */}

      <header className="fixed top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-zinc-900">
                AssoPilot
              </h2>

              <p className="text-xs text-zinc-500">
                Association Operating System
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#fonctionnalites"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
            >
              Fonctionnalités
            </a>

            <a
              href="#solution"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
            >
              Solutions
            </a>

            <a
              href="#tarifs"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
            >
              Tarifs
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-zinc-600 transition hover:text-green-600"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium transition hover:bg-zinc-50 lg:block"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
            >
              Commencer
            </Link>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* HERO PREMIUM */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden pt-40">
        {/* BACKGROUND */}

        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-250px] top-[-250px] h-[700px] w-[700px] rounded-full bg-green-500/10 blur-[180px]" />

          <div className="absolute right-[-200px] top-[10%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[180px]" />

          <div className="absolute bottom-[-250px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[220px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-24 xl:grid-cols-2">
            {/* LEFT */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
                <Sparkles className="h-4 w-4" />
                Plateforme intelligente pour associations
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-zinc-900 md:text-6xl xl:text-7xl">
                Toute votre organisation.
                <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                  Une seule plateforme.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-600">
                Gérez vos membres, vos cotisations,
                vos paiements Mobile Money,
                vos événements et vos finances
                depuis une plateforme moderne,
                sécurisée et conçue pour la croissance.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="group flex items-center gap-3 rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-700"
                >
                  Créer mon organisation

                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>

                <button className="rounded-full border border-zinc-200 px-8 py-4 font-medium transition hover:bg-zinc-50">
                  Voir la démonstration
                </button>
              </div>

              {/* SOCIAL PROOF */}

              <div className="mt-14 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-zinc-600">
                    +1 000 organisations
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-zinc-600">
                    Mobile Money intégré
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-zinc-600">
                    Sécurité Enterprise
                  </span>
                </div>
              </div>

              {/* KPIs */}

              <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                {[
                  ["50K+", "Transactions"],
                  ["99.99%", "Disponibilité"],
                  ["15+", "Pays"],
                  ["24/7", "Support"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <h3 className="text-3xl font-bold text-zinc-900">
                      {value}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 80,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="relative"
            >
              {/* CARD 1 */}

              <div className="absolute -left-8 top-10 z-20 rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl">
                <p className="text-sm text-zinc-500">
                  Revenus mensuels
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  2.4M
                </h3>

                <span className="text-sm text-green-600">
                  +18% ce mois
                </span>
              </div>

              {/* CARD 2 */}

              <div className="absolute -right-8 bottom-10 z-20 rounded-3xl border border-zinc-200 bg-white p-5 shadow-2xl">
                <p className="text-sm text-zinc-500">
                  Membres actifs
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  842
                </h3>

                <span className="text-sm text-green-600">
                  +12%
                </span>
              </div>

              {/* DASHBOARD */}

              <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
                <Image
                  src="/dashboard-preview.png"
                  alt="Dashboard AssoPilot"
                  width={2200}
                  height={1600}
                  className="w-full"
                  priority
                />
              </div>

              {/* MINI CARD */}

              <div className="absolute left-12 bottom-12 rounded-2xl bg-green-600 px-5 py-4 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />

                  <div>
                    <p className="text-xs opacity-80">
                      Croissance
                    </p>

                    <h4 className="font-bold">
                      +82%
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TRUST BAR */}
      {/* ===================================================== */}

      <section className="mt-32 border-y border-zinc-200 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Compatible avec votre écosystème
          </p>

          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 xl:grid-cols-8">
            {[
              "Orange",
              "MTN",
              "Wave",
              "Visa",
              "Mastercard",
              "Google",
              "Microsoft",
              "AWS",
            ].map((item) => (
              <div
                key={item}
                className="text-lg font-semibold text-zinc-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

{/* ===================================================== */}
{/* PARTIE 2 PREMIUM */}
{/* BENTO FEATURES */}
{/* ===================================================== */}

<section
  id="fonctionnalites"
  className="relative overflow-hidden px-6 py-40"
>
  <div className="mx-auto max-w-7xl">

    {/* HEADER */}

    <div className="mx-auto mb-24 max-w-4xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
        <Sparkles className="h-4 w-4" />
        Fonctionnalités intelligentes
      </div>

      <h2 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
        Tout ce dont votre organisation
        a besoin pour grandir.
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-600">
        AssoPilot centralise la gestion des membres,
        finances, événements, paiements Mobile Money
        et communications dans une plateforme moderne,
        sécurisée et conçue pour l'efficacité.
      </p>

    </div>

    {/* BENTO GRID */}

    <div className="grid auto-rows-[280px] gap-6 lg:grid-cols-4">

      {/* BIG CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="group relative col-span-2 row-span-2 overflow-hidden rounded-[36px] border border-zinc-200 bg-white p-10 shadow-xl"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-100">
          <Users className="h-8 w-8 text-green-600" />
        </div>

        <h3 className="mt-8 text-3xl font-bold">
          Gestion avancée des membres
        </h3>

        <p className="mt-5 max-w-lg text-zinc-600">
          Centralisez les profils,
          rôles, groupes, présences,
          cotisations, historiques et activités.
        </p>

        <div className="absolute bottom-8 right-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">
          <p className="text-sm text-zinc-500">
            Membres actifs
          </p>

          <h4 className="mt-2 text-5xl font-bold">
            842
          </h4>

          <span className="text-green-600">
            +12% ce mois
          </span>
        </div>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
          <Wallet className="h-7 w-7 text-green-600" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Mobile Money
        </h3>

        <p className="mt-4 text-zinc-600">
          Orange Money, MTN Money,
          Wave et paiements bancaires.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
          <ShieldCheck className="h-7 w-7 text-green-600" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Sécurité
        </h3>

        <p className="mt-4 text-zinc-600">
          Permissions avancées,
          audit et chiffrement.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
          <CalendarDays className="h-7 w-7 text-green-600" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Événements
        </h3>

        <p className="mt-4 text-zinc-600">
          Organisation et suivi
          des activités en temps réel.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-[36px] border border-zinc-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
          <BellRing className="h-7 w-7 text-green-600" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Notifications
        </h3>

        <p className="mt-4 text-zinc-600">
          SMS, emails et alertes
          automatisées.
        </p>
      </motion.div>

      {/* BIG CARD */}

      <motion.div
        whileHover={{ y: -6 }}
        className="relative col-span-2 overflow-hidden rounded-[36px] bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 p-10 text-white shadow-2xl"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15">
          <Brain className="h-8 w-8" />
        </div>

        <h3 className="mt-8 text-3xl font-bold">
          Intelligence & Analyses
        </h3>

        <p className="mt-5 max-w-lg text-white/80">
          Visualisez la croissance,
          les finances, les présences
          et les performances grâce à
          des tableaux de bord avancés.
        </p>

        <div className="mt-10 flex gap-4">

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
            <p className="text-sm text-white/70">
              Croissance
            </p>

            <h4 className="mt-1 text-3xl font-bold">
              +82%
            </h4>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
            <p className="text-sm text-white/70">
              Revenus
            </p>

            <h4 className="mt-1 text-3xl font-bold">
              2.4M
            </h4>
          </div>

        </div>
      </motion.div>

    </div>
  </div>
</section>

{/* ===================================================== */}
{/* PARTIE 3 ELITE */}
{/* FEATURES EXPERIENCE + AUTOMATIONS + COLLABORATION */}
{/* ===================================================== */}

<section
  id="features"
  className="relative overflow-hidden px-6 py-40"
>
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />

  <div className="relative mx-auto max-w-7xl">
    {/* HEADER */}

    <div className="mx-auto mb-24 max-w-4xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600">
        <Sparkles className="h-4 w-4" />
        Fonctionnalités intelligentes
      </div>

      <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
        Tout ce dont votre
        <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent">
          {" "}organisation a besoin
        </span>
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-600">
        Une plateforme conçue pour centraliser la gestion,
        automatiser les tâches répétitives et améliorer
        l'expérience des membres.
      </p>
    </div>

    {/* BENTO GRID */}

    <div className="grid gap-6 lg:grid-cols-4">
      {/* BIG CARD */}

      <motion.div
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-[40px] border border-neutral-200 bg-white p-10 shadow-xl lg:col-span-2 lg:row-span-2"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-lg">
            <Users className="h-8 w-8" />
          </div>

          <h3 className="mt-8 text-3xl font-bold">
            Gestion complète des membres
          </h3>

          <p className="mt-4 max-w-lg text-neutral-600">
            Profils détaillés, rôles, cotisations,
            historique des paiements, suivi de présence
            et gestion documentaire centralisée.
          </p>

          <div className="mt-10 rounded-3xl border border-neutral-100 bg-neutral-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">
                Membres actifs
              </span>

              <span className="text-emerald-500">
                +18%
              </span>
            </div>

            <h4 className="mt-3 text-5xl font-bold">
              2,847
            </h4>
          </div>
        </div>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -8 }}
        className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white">
          <Wallet className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Paiements
        </h3>

        <p className="mt-3 text-neutral-600">
          Orange Money, MTN, Wave,
          Visa et virements bancaires.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -8 }}
        className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-white">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Sécurité
        </h3>

        <p className="mt-3 text-neutral-600">
          Contrôle d'accès,
          audit et protection avancée.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -8 }}
        className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
          <TrendingUp className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Rapports
        </h3>

        <p className="mt-3 text-neutral-600">
          Tableaux de bord,
          statistiques et indicateurs.
        </p>
      </motion.div>

      {/* CARD */}

      <motion.div
        whileHover={{ y: -8 }}
        className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
          <Globe className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          Multi-sites
        </h3>

        <p className="mt-3 text-neutral-600">
          Gérez plusieurs branches
          depuis un seul espace.
        </p>
      </motion.div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* AUTOMATISATIONS */}
{/* ===================================================== */}

<section className="px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="grid items-center gap-20 xl:grid-cols-2">
      <div>
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
          Automatisation
        </span>

        <h2 className="mt-8 text-4xl font-bold md:text-5xl">
          Réduisez les tâches
          administratives de 80%.
        </h2>

        <p className="mt-8 text-lg leading-relaxed text-neutral-600">
          Automatisez les rappels de cotisation,
          les reçus de paiement, les notifications,
          les convocations et les rapports financiers.
        </p>

        <div className="mt-10 space-y-5">
          {[
            "Notifications automatiques",
            "Reçus PDF instantanés",
            "Rappels de paiement",
            "Suivi des présences",
            "Rapports programmés",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[40px] border border-neutral-200 bg-white p-10 shadow-2xl">
        <div className="space-y-6">
          <div className="rounded-3xl bg-neutral-50 p-6">
            <p className="text-sm text-neutral-500">
              Cotisations collectées
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              12,450,000 FCFA
            </h3>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-6">
            <p className="text-sm text-neutral-500">
              Paiements automatiques
            </p>

            <h3 className="mt-2 text-4xl font-bold text-emerald-600">
              94%
            </h3>
          </div>

          <div className="rounded-3xl bg-blue-50 p-6">
            <p className="text-sm text-neutral-500">
              Temps économisé
            </p>

            <h3 className="mt-2 text-4xl font-bold text-blue-600">
              37h/mois
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* COLLABORATION */}
{/* ===================================================== */}

<section className="px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        Collaboration
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-5xl">
        Travaillez ensemble.
        En temps réel.
      </h2>
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      {[
        {
          title: "Équipe dirigeante",
          desc: "Attribuez des rôles et gérez les permissions.",
        },
        {
          title: "Communication interne",
          desc: "Annonces, messages et notifications.",
        },
        {
          title: "Gestion documentaire",
          desc: "Centralisez tous les fichiers importants.",
        },
      ].map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ y: -10 }}
          className="rounded-[36px] border border-neutral-200 bg-white p-10 shadow-xl"
        >
          <h3 className="text-2xl font-bold">
            {item.title}
          </h3>

          <p className="mt-4 text-neutral-600">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* PARTIE 4 ELITE */}
{/* ANALYTICS • SÉCURITÉ • INTÉGRATIONS • DASHBOARD IA */}
{/* ===================================================== */}

<section
  id="analytics"
  className="relative overflow-hidden px-6 py-40"
>
  <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-transparent to-transparent dark:from-emerald-950/10" />

  <div className="relative mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        Analytics Intelligence
      </span>

      <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
        Décidez avec des
        <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent">
          {" "}données fiables
        </span>
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">
        Visualisez instantanément les performances,
        les revenus, les cotisations et l'engagement
        de votre communauté.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      {[
        {
          title: "Croissance annuelle",
          value: "+84%",
          color: "emerald",
        },
        {
          title: "Revenus collectés",
          value: "18M FCFA",
          color: "blue",
        },
        {
          title: "Participation",
          value: "96%",
          color: "violet",
        },
      ].map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ y: -8 }}
          className="rounded-[36px] border border-neutral-200 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
        >
          <p className="text-neutral-500">
            {item.title}
          </p>

          <h3 className="mt-5 text-5xl font-bold">
            {item.value}
          </h3>

          <div className="mt-8 h-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className={`h-full rounded-full ${
                item.color === "emerald"
                  ? "w-[84%] bg-emerald-500"
                  : item.color === "blue"
                  ? "w-[75%] bg-blue-500"
                  : "w-[96%] bg-violet-500"
              }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* DASHBOARD IA */}
{/* ===================================================== */}

<section className="px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="grid items-center gap-20 xl:grid-cols-2">
      <div>
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
          Tableau de bord intelligent
        </span>

        <h2 className="mt-8 text-4xl font-bold md:text-5xl">
          Une vision complète
          de votre organisation.
        </h2>

        <p className="mt-8 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          Obtenez une vue globale sur les finances,
          les événements, les membres et les objectifs.
          Toutes les informations importantes sont
          centralisées dans une seule interface.
        </p>

        <div className="mt-10 space-y-5">
          {[
            "Vue financière temps réel",
            "Suivi des cotisations",
            "Analyse des membres",
            "Prévisions automatiques",
            "Rapports exportables",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="overflow-hidden rounded-[40px] border border-neutral-200 bg-white p-8 shadow-[0_30px_80px_rgba(16,185,129,0.15)] dark:border-white/10 dark:bg-neutral-950"
      >
        <div className="space-y-6">
          <div className="rounded-3xl bg-neutral-50 p-6 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">
              Revenus du mois
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              3.8M FCFA
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-emerald-50 p-6 dark:bg-emerald-500/10">
              <p className="text-sm text-neutral-500">
                Membres actifs
              </p>

              <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                2,847
              </h3>
            </div>

            <div className="rounded-3xl bg-blue-50 p-6 dark:bg-blue-500/10">
              <p className="text-sm text-neutral-500">
                Événements
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                128
              </h3>
            </div>
          </div>

          <div className="rounded-3xl bg-violet-50 p-6 dark:bg-violet-500/10">
            <p className="text-sm text-neutral-500">
              Prévision IA
            </p>

            <h3 className="mt-2 text-3xl font-bold text-violet-600">
              +22% croissance prévue
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* SÉCURITÉ */}
{/* ===================================================== */}

<section
  id="security"
  className="relative overflow-hidden px-6 py-40"
>
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-violet-100 px-5 py-2 text-sm font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
        Sécurité Enterprise
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-6xl">
        Vos données.
        Toujours protégées.
      </h2>
    </div>

    <div className="grid gap-8 lg:grid-cols-4">
      {[
        "Authentification sécurisée",
        "Gestion des rôles",
        "Audit & Historique",
        "Sauvegardes automatiques",
      ].map((item) => (
        <motion.div
          key={item}
          whileHover={{ y: -8 }}
          className="rounded-[36px] border border-neutral-200 bg-white p-10 shadow-lg dark:border-white/10 dark:bg-neutral-950"
        >
          <ShieldCheck className="h-12 w-12 text-emerald-500" />

          <h3 className="mt-6 text-xl font-bold">
            {item}
          </h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* INTÉGRATIONS */}
{/* ===================================================== */}

<section
  id="integrations"
  className="px-6 py-40"
>
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        Intégrations
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-6xl">
        Connecté à tout votre écosystème.
      </h2>
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
          className="flex h-40 items-center justify-center rounded-[32px] border border-neutral-200 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-950"
        >
          <span className="font-semibold">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* PARTIE 5 ELITE */}
{/* TESTIMONIALS • ROADMAP • PRICING • FAQ • CTA • FOOTER */}
{/* ===================================================== */}

<section
  id="testimonials"
  className="relative overflow-hidden px-6 py-40"
>
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
        Témoignages clients
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-6xl">
        Plus de confiance.
        <br />
        Plus d'impact.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-600 dark:text-neutral-400">
        Associations, ONG, fondations et organisations
        utilisent AssoPilot pour moderniser leur gestion.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-3">
      {[
        {
          name: "Aminata Koné",
          role: "Présidente",
          company: "Association Horizon",
          text: "Nous avons digitalisé toute notre gestion. Les cotisations sont désormais automatiques et transparentes.",
        },
        {
          name: "Jean Kouassi",
          role: "Trésorier",
          company: "Fondation Impact",
          text: "Le suivi financier est devenu extrêmement simple. Les rapports sont instantanés.",
        },
        {
          name: "Sarah Diallo",
          role: "Directrice",
          company: "Youth Africa",
          text: "Une expérience moderne et professionnelle. Nos membres adorent la plateforme.",
        },
      ].map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ y: -10 }}
          className="rounded-[40px] border border-neutral-200 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-neutral-950"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600" />

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

          <div className="mt-8 text-sm font-semibold text-emerald-600">
            {item.company}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* ROADMAP */}
{/* ===================================================== */}

<section
  id="roadmap"
  className="relative px-6 py-40"
>
  <div className="mx-auto max-w-6xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
        Vision produit
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-6xl">
        Construire l'avenir
        des organisations.
      </h2>
    </div>

    <div className="space-y-10">
      {[
        {
          year: "2026",
          title: "Assistant IA",
          desc: "Analyse automatique des finances et recommandations intelligentes.",
        },
        {
          year: "2027",
          title: "Applications mobiles",
          desc: "Applications iOS et Android natives.",
        },
        {
          year: "2028",
          title: "Marketplace",
          desc: "Modules et extensions personnalisées.",
        },
        {
          year: "2029",
          title: "Expansion internationale",
          desc: "Déploiement dans plusieurs pays africains.",
        },
      ].map((item) => (
        <div
          key={item.year}
          className="rounded-[36px] border border-neutral-200 bg-white p-10 shadow-lg dark:border-white/10 dark:bg-neutral-950"
        >
          <span className="font-semibold text-emerald-600">
            {item.year}
          </span>

          <h3 className="mt-3 text-2xl font-bold">
            {item.title}
          </h3>

          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* PRICING */}
{/* ===================================================== */}

<section
  id="pricing"
  className="px-6 py-40"
>
  <div className="mx-auto max-w-7xl">
    <div className="mb-24 text-center">
      <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
        Tarification
      </span>

      <h2 className="mt-8 text-4xl font-bold md:text-6xl">
        Des plans adaptés
        à chaque organisation.
      </h2>
    </div>

    <div className="grid gap-8 xl:grid-cols-3">
      {/* STARTER */}

      <div className="rounded-[40px] border border-neutral-200 bg-white p-10 shadow-lg dark:border-white/10 dark:bg-neutral-950">
        <h3 className="text-2xl font-bold">
          Starter
        </h3>

        <div className="mt-8">
          <span className="text-6xl font-bold">
            0
          </span>
          <span className="text-neutral-500">
            {" "}FCFA
          </span>
        </div>

        <div className="mt-10 space-y-4">
          <p>✓ 20 membres</p>
          <p>✓ Dashboard basique</p>
          <p>✓ Support standard</p>
        </div>

        <button className="mt-10 w-full rounded-2xl border py-4">
          Commencer
        </button>
      </div>

      {/* PRO */}

      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-emerald-500 to-green-700 p-10 text-white shadow-[0_30px_80px_rgba(16,185,129,0.25)]">
        <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-1 text-xs font-bold text-black">
          POPULAIRE
        </div>

        <h3 className="text-2xl font-bold">
          Pro
        </h3>

        <div className="mt-8">
          <span className="text-6xl font-bold">
            15K
          </span>
          <span className="text-white/80">
            {" "}FCFA/mois
          </span>
        </div>

        <div className="mt-10 space-y-4">
          <p>✓ 100 membres</p>
          <p>✓ Orange Money</p>
          <p>✓ MTN Money</p>
          <p>✓ Wave</p>
          <p>✓ Rapports avancés</p>
          <p>✓ Notifications automatiques</p>
        </div>

        <button className="mt-10 w-full rounded-2xl bg-white py-4 font-semibold text-black">
          Choisir Pro
        </button>
      </div>

      {/* ENTERPRISE */}

      <div className="rounded-[40px] border border-neutral-200 bg-white p-10 shadow-lg dark:border-white/10 dark:bg-neutral-950">
        <h3 className="text-2xl font-bold">
          Enterprise
        </h3>

        <div className="mt-8">
          <span className="text-6xl font-bold">
            Sur devis
          </span>
        </div>

        <div className="mt-10 space-y-4">
          <p>✓ Membres illimités</p>
          <p>✓ Multi-organisations</p>
          <p>✓ API complète</p>
          <p>✓ Analytics avancés</p>
          <p>✓ Support prioritaire</p>
        </div>

        <button className="mt-10 w-full rounded-2xl border py-4">
          Contacter l'équipe
        </button>
      </div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* FAQ */}
{/* ===================================================== */}

<section
  id="faq"
  className="px-6 py-40"
>
  <div className="mx-auto max-w-5xl">
    <div className="mb-20 text-center">
      <h2 className="text-4xl font-bold md:text-5xl">
        Questions fréquentes
      </h2>
    </div>

    <div className="space-y-6">
      {[
        {
          q: "Puis-je utiliser Orange Money ?",
          a: "Oui, Orange Money, MTN Money et Wave sont supportés.",
        },
        {
          q: "Les données sont-elles sécurisées ?",
          a: "Toutes les données sont chiffrées et sauvegardées.",
        },
        {
          q: "Puis-je gérer plusieurs organisations ?",
          a: "Oui avec le plan Enterprise.",
        },
        {
          q: "Existe-t-il une API ?",
          a: "Oui, une API complète est disponible.",
        },
      ].map((item) => (
        <div
          key={item.q}
          className="rounded-[32px] border border-neutral-200 bg-white p-8 dark:border-white/10 dark:bg-neutral-950"
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
{/* FINAL CTA */}
{/* ===================================================== */}

<section className="px-6 py-40">
  <div className="mx-auto max-w-7xl">
    <div className="overflow-hidden rounded-[60px] bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-800 px-10 py-28 text-center text-white shadow-[0_30px_120px_rgba(16,185,129,0.35)]">
      <h2 className="mx-auto max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
        Transformez votre organisation
        dès aujourd'hui.
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80">
        Rejoignez les organisations qui utilisent
        déjà AssoPilot pour gagner du temps,
        améliorer leur transparence et accélérer
        leur croissance.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/register"
          className="rounded-full bg-white px-10 py-5 text-lg font-bold text-black"
        >
          Commencer gratuitement
        </Link>

        <button className="rounded-full border border-white/20 px-10 py-5 text-lg">
          Réserver une démo
        </button>
      </div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* FOOTER */}
{/* ===================================================== */}

<footer className="border-t border-neutral-200 px-6 py-20 dark:border-white/10">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-4">
      <div>
        <h3 className="text-3xl font-bold">
          AssoPilot
        </h3>

        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          La plateforme de gestion moderne
          pour associations, ONG et organisations.
        </p>
      </div>

      <div>
        <h4 className="font-semibold">
          Produit
        </h4>

        <div className="mt-4 space-y-3 text-neutral-500">
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

        <div className="mt-4 space-y-3 text-neutral-500">
          <p>Documentation</p>
          <p>Support</p>
          <p>Guide</p>
          <p>FAQ</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">
          Entreprise
        </h4>

        <div className="mt-4 space-y-3 text-neutral-500">
          <p>À propos</p>
          <p>Partenaires</p>
          <p>Confidentialité</p>
          <p>Conditions</p>
        </div>
      </div>
    </div>

    <div className="mt-16 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-white/10">
      © 2026 AssoPilot. Tous droits réservés.
    </div>
  </div>
</footer>

{/* ===================================================== */}
{/* SECTION FINALE PREMIUM */}
{/* LAST IMPRESSION */}
{/* ===================================================== */}

<section className="relative overflow-hidden px-6 py-48">
  {/* BACKGROUND */}

  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

    <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-green-500/10 blur-[140px]" />

    <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />
  </div>

  <div className="relative mx-auto max-w-6xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
      ✨ Nouvelle génération
    </span>

    <h2 className="mx-auto mt-10 max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
      L'avenir de la gestion
      associative commence
      aujourd'hui.
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
      Moins d'administration.
      Plus de transparence.

      Plus d'impact.

      Offrez à votre organisation
      une plateforme moderne,
      sécurisée et pensée pour sa croissance.
    </p>

    <div className="mt-16 flex flex-wrap justify-center gap-5">
      <Link
        href="/register"
        className="group flex items-center gap-3 rounded-full bg-emerald-600 px-10 py-5 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-emerald-700"
      >
        Créer mon organisation

        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
      </Link>

      <Link
        href="/contact"
        className="rounded-full border border-neutral-300 bg-white px-10 py-5 text-lg font-medium transition hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
      >
        Parler à un expert
      </Link>
    </div>

    {/* TRUST */}

    <div className="mt-24 grid gap-8 md:grid-cols-4">
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
          value: "24/7",
          label: "Support",
        },
      ].map((item) => (
        <div key={item.label}>
          <h3 className="text-4xl font-bold text-emerald-600">
            {item.value}
          </h3>

          <p className="mt-3 text-neutral-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* SIGNATURE ELITE */}
{/* ===================================================== */}

<section className="border-t border-neutral-200 px-6 py-12 dark:border-white/10">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
    <div>
      <h3 className="text-2xl font-bold">
        AssoPilot
      </h3>

      <p className="mt-2 text-sm text-neutral-500">
        Construit pour les organisations qui veulent grandir.
      </p>
    </div>

    <div className="flex items-center gap-8 text-sm text-neutral-500">
      <span>Afrique</span>
      <span>•</span>
      <span>Innovation</span>
      <span>•</span>
      <span>Gestion Moderne</span>
    </div>
  </div>
</section>
</>
    )
}
