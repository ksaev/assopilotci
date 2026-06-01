"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import {
  ArrowRight,
  Menu,
  Moon,
  Sun,
  Users,
  Wallet,
  Calendar,
  Bell,
  Shield,
  BarChart3,
  Globe,
  Building2,
  CheckCircle2,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestion des membres",
    subtitle: "Member Management",
    description:
      "Centralisez les profils, rôles, présences, historiques et données importantes dans une seule plateforme moderne.",
  },
  {
    icon: Wallet,
    title: "Paiements Mobile Money",
    subtitle: "Mobile Payments",
    description:
      "Orange Money, MTN Money, Wave et paiements bancaires intégrés avec suivi automatique.",
  },
  {
    icon: Calendar,
    title: "Gestion des événements",
    subtitle: "Events",
    description:
      "Réunions, assemblées générales, activités et planification collaborative.",
  },
  {
    icon: Bell,
    title: "Notifications intelligentes",
    subtitle: "Smart Notifications",
    description:
      "SMS, emails et rappels automatiques pour une communication efficace.",
  },
  {
    icon: BarChart3,
    title: "Analytique avancée",
    subtitle: "Analytics",
    description:
      "Rapports financiers, statistiques et tableaux de bord en temps réel.",
  },
  {
    icon: Shield,
    title: "Sécurité entreprise",
    subtitle: "Enterprise Security",
    description:
      "Authentification sécurisée, permissions avancées et protection des données.",
  },
]

export default function Page() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="overflow-x-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white">
      {/* NAVBAR */}

      <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500" />

            <span className="text-lg font-semibold">
              AssoPilot
            </span>
          </div>

          <nav className="hidden xl:flex items-center gap-8 text-sm">
            <a href="#features">Fonctionnalités</a>
            <a href="#solutions">Solutions</a>
            <a href="#payments">Paiements</a>
            <a href="#security">Sécurité</a>
            <a href="#pricing">Tarification</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <Link
              href="/login"
              className="hidden md:flex"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-black px-5 py-3 text-white dark:bg-white dark:text-black"
            >
              Commencer
            </Link>

            <button className="xl:hidden">
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-32 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[150px]" />

          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-8 text-sm uppercase tracking-[0.4em] text-neutral-500">
              Association Operating System
            </p>

            <h1 className="text-[clamp(4rem,12vw,10rem)] font-semibold leading-none tracking-tight">
              Gérez.
              <br />
              Développez.
              <br />
              Transformez.
            </h1>

            <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
              Une plateforme moderne conçue pour les associations,
              ONG, coopératives, églises, syndicats et organisations
              souhaitant centraliser leurs opérations.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-white transition hover:scale-105 dark:bg-white dark:text-black"
              >
                Créer mon organisation

                <ArrowRight size={18} />
              </Link>

              <button className="rounded-full border border-black/10 px-8 py-4 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                Voir la démonstration
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
            className="mt-24"
          >
            <div className="overflow-hidden rounded-[48px] border border-black/10 shadow-2xl dark:border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2200&auto=format&fit=crop"
                alt="Dashboard"
                width={2200}
                height={1400}
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-neutral-500">
            Utilisé par des organisations modernes
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-5">
            {[
              "Association",
              "Fondation",
              "ONG",
              "Coopérative",
              "Communauté",
            ].map((item) => (
              <div
                key={item}
                className="text-lg font-semibold text-neutral-400"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="py-32 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500">
              Fonctionnalités
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight">
              Tout ce dont votre
              <br />
              organisation a besoin.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
              Une plateforme complète pour gérer les membres,
              les cotisations, les paiements, les événements,
              la communication et la croissance.
            </p>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="rounded-[40px] border border-black/10 p-8 transition-all duration-300 hover:-translate-y-2 dark:border-white/10"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10">
                  <feature.icon className="h-8 w-8 text-emerald-500" />
                </div>

                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  {feature.subtitle}
                </p>

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* DASHBOARD SHOWCASE */}

      <section className="relative py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 xl:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Dashboard intelligent
              </p>

              <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-tight">
                Une visibilité
                <br />
                complète.
              </h2>

              <p className="mt-8 max-w-xl text-xl text-neutral-600 dark:text-neutral-400">
                Analysez les adhésions, les cotisations, les
                finances, les activités et les performances de
                votre organisation depuis un tableau de bord
                moderne inspiré des meilleurs produits SaaS.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  "Rapports financiers en temps réel",
                  "Statistiques détaillées",
                  "Suivi des cotisations",
                  "Croissance des membres",
                  "Export Excel et PDF",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
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
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-[48px] border border-black/10 shadow-2xl dark:border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2200&auto=format&fit=crop"
                  alt="Analytics"
                  width={2200}
                  height={1600}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOBILE MONEY */}

      <section
        id="payments"
        className="relative py-40 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-24 xl:grid-cols-2">
            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-[50px] border border-black/10 shadow-2xl dark:border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop"
                  alt="Mobile Money"
                  width={1800}
                  height={2400}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Mobile Money
              </p>

              <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none">
                Paiements.
                <br />
                Réinventés.
              </h2>

              <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-400">
                Collectez vos cotisations et contributions
                depuis n'importe où grâce aux intégrations
                Mobile Money et bancaires.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-5">
                {[
                  "Orange Money",
                  "MTN Money",
                  "Wave",
                  "Moov Money",
                  "Visa",
                  "Mastercard",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                    rounded-3xl
                    border
                    border-black/10
                    dark:border-white/10
                    p-5
                    text-center
                    font-medium
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <div className="rounded-3xl bg-emerald-500/10 px-6 py-4 text-emerald-600 dark:text-emerald-400">
                  Transactions instantanées
                </div>

                <div className="rounded-3xl bg-cyan-500/10 px-6 py-4 text-cyan-600 dark:text-cyan-400">
                  Suivi automatique
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}

      <section
        id="solutions"
        className="py-40 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Solutions
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight">
              Conçu pour toutes
              <br />
              les organisations.
            </h2>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Associations",
                text: "Gestion complète des adhérents, cotisations et activités.",
                icon: Users,
              },
              {
                title: "ONG",
                text: "Suivi des projets, membres et financements.",
                icon: Globe,
              },
              {
                title: "Coopératives",
                text: "Gestion financière et pilotage des adhésions.",
                icon: Building2,
              },
              {
                title: "Églises",
                text: "Offrandes, événements et gestion communautaire.",
                icon: Users,
              },
              {
                title: "Syndicats",
                text: "Suivi des cotisations et communication interne.",
                icon: Shield,
              },
              {
                title: "Clubs",
                text: "Organisation des membres et événements sportifs.",
                icon: Calendar,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                className="
                rounded-[40px]
                border
                border-black/10
                dark:border-white/10
                p-8
                "
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10">
                  <item.icon className="h-8 w-8 text-cyan-500" />
                </div>

                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}

      <section
        id="security"
        className="relative py-40 px-6"
      >
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Sécurité
          </p>

          <h2 className="mt-8 text-[clamp(4rem,10vw,8rem)] font-semibold leading-none tracking-tight">
            Vos données.
            <br />
            Protégées.
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
            Une architecture moderne pensée pour garantir la
            confidentialité, la disponibilité et la protection
            des informations critiques de votre organisation.
          </p>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Authentification sécurisée",
              "Permissions avancées",
              "Historique des actions",
              "Sauvegardes automatiques",
            ].map((item) => (
              <div
                key={item}
                className="
                rounded-[32px]
                border
                border-black/10
                dark:border-white/10
                p-8
                "
              >
                <Shield className="mx-auto mb-6 h-10 w-10 text-emerald-500" />

                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* ANALYTICS */}

      <section className="relative py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-24 xl:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Intelligence & Analytique
              </p>

              <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-tight">
                Décidez avec
                <br />
                confiance.
              </h2>

              <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-400">
                Suivez l’évolution de votre organisation grâce à des
                indicateurs en temps réel, des tableaux de bord intelligents
                et des rapports détaillés accessibles partout.
              </p>

              <div className="mt-12 grid gap-5">
                {[
                  "Rapports financiers détaillés",
                  "Prévisions de trésorerie",
                  "Évolution des adhésions",
                  "Analyse des paiements",
                  "Export PDF, Excel et CSV",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-[48px] border border-black/10 shadow-2xl dark:border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2200&auto=format&fit=crop"
                  alt="Analytics Dashboard"
                  width={2200}
                  height={1600}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 text-center md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                value: "1K+",
                label: "Organisations actives",
              },
              {
                value: "50K+",
                label: "Transactions traitées",
              },
              {
                value: "99.9%",
                label: "Disponibilité",
              },
              {
                value: "15+",
                label: "Pays couverts",
              },
            ].map((stat) => (
              <div key={stat.label}>
                <h3 className="text-7xl font-semibold tracking-tight">
                  {stat.value}
                </h3>

                <p className="mt-4 text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Témoignages
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight">
              Adopté par les
              <br />
              organisations ambitieuses.
            </h2>
          </div>

          <div className="mt-24 grid gap-8 xl:grid-cols-3">
            {[
              {
                name: "Association Horizon",
                role: "Président",
                text: "AssoPilot nous a permis de réduire considérablement le temps consacré à l’administration.",
              },
              {
                name: "ONG Vision",
                role: "Trésorière",
                text: "Nous avons enfin une visibilité complète sur nos finances et nos adhérents.",
              },
              {
                name: "Hope Foundation",
                role: "Director",
                text: "The best platform we found for managing members, payments and community operations.",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[40px] border border-black/10 p-10 dark:border-white/10"
              >
                <div className="mb-6 text-5xl">✦</div>

                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.text}
                </p>

                <div className="mt-8">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}

      <section
        id="pricing"
        className="py-40 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Tarification
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight">
              Simple.
              <br />
              Transparente.
            </h2>
          </div>

          <div className="mt-24 grid gap-8 xl:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "0",
                desc: "Petites associations",
              },
              {
                name: "Pro",
                price: "15 000",
                desc: "Associations modernes",
                featured: true,
              },
              {
                name: "Elite",
                price: "45 000",
                desc: "Grandes organisations",
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{
                  y: -10,
                }}
                className={`rounded-[40px] border p-10 ${
                  plan.featured
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                <h3 className="text-3xl font-semibold">
                  {plan.name}
                </h3>

                <p className="mt-3 opacity-70">
                  {plan.desc}
                </p>

                <div className="mt-10">
                  <span className="text-6xl font-semibold">
                    {plan.price}
                  </span>

                  <span className="ml-2 opacity-70">
                    FCFA/mois
                  </span>
                </div>

                <div className="mt-10 space-y-4">
                  {[
                    "Gestion des membres",
                    "Tableau de bord",
                    "Paiements",
                    "Rapports",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="
                  mt-10
                  w-full
                  rounded-full
                  border
                  py-4
                  font-medium
                  "
                >
                  Choisir ce plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="py-40 px-6"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-[clamp(3rem,8vw,5rem)] font-semibold">
              Questions fréquentes
            </h2>
          </div>

          <div className="mt-20 space-y-6">
            {[
              {
                q: "Puis-je gérer plusieurs organisations ?",
                a: "Oui, AssoPilot permet la gestion multi-organisations.",
              },
              {
                q: "Le Mobile Money est-il intégré ?",
                a: "Oui, Orange Money, MTN Money, Wave et plusieurs autres solutions sont supportées.",
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Toutes les données sont protégées par des mécanismes modernes de sécurité.",
              },
              {
                q: "Existe-t-il une version gratuite ?",
                a: "Oui, le plan Starter permet de démarrer gratuitement.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-[32px] border border-black/10 p-8 dark:border-white/10"
              >
                <h3 className="text-xl font-semibold">
                  {faq.q}
                </h3>

                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[150px]" />
        </div>

        <div className="relative max-w-6xl text-center">
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-semibold leading-none tracking-tight">
            L’avenir de votre
            <br />
            organisation
            <br />
            commence ici.
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
            Rejoignez les organisations qui modernisent leur gestion,
            automatisent leurs processus et développent leur impact.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-black px-10 py-5 text-lg text-white dark:bg-white dark:text-black"
            >
              Créer mon organisation
            </Link>

            <button className="rounded-full border border-black/10 px-10 py-5 text-lg dark:border-white/10">
              Planifier une démonstration
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-black/10 px-6 py-20 dark:border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-5">
            <div>
              <h3 className="text-2xl font-semibold">
                AssoPilot
              </h3>

              <p className="mt-4 text-neutral-500">
                Association Operating System
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Produit
              </h4>

              <div className="space-y-3 text-neutral-500">
                <p>Fonctionnalités</p>
                <p>Tarification</p>
                <p>Intégrations</p>
                <p>Mises à jour</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Ressources
              </h4>

              <div className="space-y-3 text-neutral-500">
                <p>Documentation</p>
                <p>Centre d'aide</p>
                <p>Blog</p>
                <p>Guides</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Entreprise
              </h4>

              <div className="space-y-3 text-neutral-500">
                <p>À propos</p>
                <p>Partenaires</p>
                <p>Carrières</p>
                <p>Contact</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Légal
              </h4>

              <div className="space-y-3 text-neutral-500">
                <p>Confidentialité</p>
                <p>Conditions</p>
                <p>Cookies</p>
                <p>Sécurité</p>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-black/10 pt-8 text-center text-neutral-500 dark:border-white/10">
            © 2026 AssoPilot. Tous droits réservés.
          </div>
        </div>
      </footer>

    </main>
  )
}

{/* TRUSTED BY */}

<section className="py-32 px-6 border-y border-black/5 dark:border-white/5">
  <div className="mx-auto max-w-7xl">
    <p className="text-center text-sm uppercase tracking-[0.4em] text-neutral-500">
      Utilisé par des organisations ambitieuses
    </p>

    <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-3 xl:grid-cols-6">
      {[
        "HORIZON",
        "VISION",
        "UNITY",
        "AFRICA+",
        "HOPE",
        "NEXTORG",
      ].map((logo) => (
        <div
          key={logo}
          className="text-center text-2xl font-semibold opacity-40"
        >
          {logo}
        </div>
      ))}
    </div>
  </div>
</section>

{/* COMPARAISON */}

<section className="py-40 px-6">
  <div className="mx-auto max-w-7xl">
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        Pourquoi AssoPilot
      </p>

      <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold">
        Arrêtez Excel.
        <br />
        Passez au niveau supérieur.
      </h2>
    </div>

    <div className="mt-24 overflow-hidden rounded-[48px] border border-black/10 dark:border-white/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="p-8 text-left"></th>
            <th className="p-8 text-left">Excel</th>
            <th className="p-8 text-left">WhatsApp</th>
            <th className="p-8 text-left text-emerald-500">
              AssoPilot
            </th>
          </tr>
        </thead>

        <tbody>
          {[
            "Gestion des membres",
            "Paiements Mobile Money",
            "Rapports automatiques",
            "Tableau de bord",
            "Multi-organisations",
            "Sécurité",
          ].map((feature) => (
            <tr
              key={feature}
              className="border-b border-black/5 dark:border-white/5"
            >
              <td className="p-8">{feature}</td>
              <td className="p-8">✕</td>
              <td className="p-8">✕</td>
              <td className="p-8 text-emerald-500">✓</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>

{/* IA */}

<section className="relative py-40 px-6 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
  </div>

  <div className="relative mx-auto max-w-6xl text-center">
    <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
      Intelligence artificielle
    </p>

    <h2 className="mt-8 text-[clamp(4rem,10vw,8rem)] font-semibold leading-none">
      Une plateforme
      <br />
      plus intelligente.
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
      Analyse automatique des finances,
      recommandations intelligentes,
      prévisions des cotisations
      et rapports générés automatiquement.
    </p>

    <div className="mt-16 flex flex-wrap justify-center gap-4">
      {[
        "AI Reports",
        "Smart Analytics",
        "Financial Forecast",
        "Risk Detection",
      ].map((tag) => (
        <div
          key={tag}
          className="
          rounded-full
          border
          border-black/10
          dark:border-white/10
          px-6
          py-3
          "
        >
          {tag}
        </div>
      ))}
    </div>
  </div>
</section>

{/* ROADMAP */}

<section className="py-40 px-6">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <h2 className="text-[clamp(3rem,8vw,6rem)] font-semibold">
        Roadmap Produit
      </h2>
    </div>

    <div className="mt-24 grid gap-10">
      {[
        {
          version: "Q1 2026",
          text: "Mobile Money + Analytics",
        },
        {
          version: "Q2 2026",
          text: "Application mobile native",
        },
        {
          version: "Q3 2026",
          text: "IA & automatisations",
        },
        {
          version: "Q4 2026",
          text: "Marketplace d'intégrations",
        },
      ].map((item) => (
        <div
          key={item.version}
          className="
          flex
          items-center
          justify-between
          rounded-[32px]
          border
          border-black/10
          dark:border-white/10
          p-8
          "
        >
          <h3 className="text-2xl font-semibold">
            {item.version}
          </h3>

          <p>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* GLOBAL ECOSYSTEM */}

<section className="relative overflow-hidden py-48 px-6">
  <div className="absolute inset-0">
    <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />
    <div className="absolute right-0 bottom-0 h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[160px]" />
  </div>

  <div className="relative mx-auto max-w-7xl text-center">
    <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
      Global Ecosystem
    </p>

    <h2 className="mt-8 text-[clamp(4rem,10vw,8rem)] font-semibold leading-none tracking-tight">
      Connecté à
      <br />
      tout votre écosystème.
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
      Centralisez vos opérations et synchronisez vos outils
      préférés dans une plateforme unique.
    </p>

    <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-6">
      {[
        "Stripe",
        "Wave",
        "Orange",
        "MTN",
        "Google",
        "Microsoft",
      ].map((item) => (
        <div
          key={item}
          className="rounded-[30px] border border-black/10 dark:border-white/10 p-8 text-lg font-semibold"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
</section>

{/* LIVE METRICS */}

<section className="py-40 px-6">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          value: "2.4M+",
          label: "FCFA collectés",
        },
        {
          value: "120K+",
          label: "Membres actifs",
        },
        {
          value: "850+",
          label: "Organisations",
        },
        {
          value: "99.99%",
          label: "Uptime",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="rounded-[40px] border border-black/10 dark:border-white/10 p-10"
        >
          <h3 className="text-6xl font-semibold tracking-tight">
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

{/* ENTERPRISE */}

<section className="py-40 px-6">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-20 xl:grid-cols-2 items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          Enterprise
        </p>

        <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none">
          Conçu pour
          <br />
          évoluer.
        </h2>

        <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-400">
          Que vous gériez 20 membres ou 100 000,
          AssoPilot évolue avec votre organisation.
        </p>

        <div className="mt-12 space-y-5">
          {[
            "Architecture Cloud Native",
            "Scalabilité horizontale",
            "API REST & Webhooks",
            "Multi-organisations",
            "Multi-administrateurs",
            "Audit & conformité",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[50px] border border-black/10 dark:border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
          alt="Enterprise"
          width={2000}
          height={1400}
          className="w-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

{/* FINAL ULTRA CTA */}

<section className="relative overflow-hidden py-56 px-6">
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-blue-500/20 blur-[180px]" />
  </div>

  <div className="relative mx-auto max-w-6xl text-center">
    <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
      Start Today
    </p>

    <h2 className="mt-8 text-[clamp(5rem,12vw,11rem)] font-semibold leading-none tracking-tight">
      Build.
      <br />
      Grow.
      <br />
      Lead.
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
      La plateforme de nouvelle génération pour les associations,
      ONG, coopératives, fédérations et communautés ambitieuses.
    </p>

    <div className="mt-14 flex flex-wrap justify-center gap-5">
      <Link
        href="/register"
        className="rounded-full bg-black px-12 py-5 text-lg text-white dark:bg-white dark:text-black"
      >
        Commencer gratuitement
      </Link>

      <button className="rounded-full border border-black/10 dark:border-white/10 px-12 py-5 text-lg">
        Réserver une démonstration
      </button>
    </div>
  </div>
</section>