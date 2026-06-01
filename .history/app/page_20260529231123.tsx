"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Users,
  BarChart3,
  CalendarDays,
  Check,
  Sparkles,
  Globe,
  BellRing,
  LockKeyhole,
  Layers3,
  ChevronRight,
  Sun,
  Moon,
  Menu,
  X,
  Star,
  Quote,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Gestion intelligente des membres",
    description:
      "Profils complets, rôles, historiques, présences et cotisations centralisés.",
  },
  {
    icon: Wallet,
    title: "Mobile Money intégré",
    description:
      "Orange Money, MTN Money, Wave et paiements manuels sécurisés.",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    description:
      "Suivi des revenus, statistiques et performances en temps réel.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité premium",
    description:
      "Permissions multi-rôles, JWT sécurisé et audit complet.",
  },
  {
    icon: CalendarDays,
    title: "Gestion des événements",
    description:
      "Assemblées, réunions, convocations et suivi de participation.",
  },
  {
    icon: BellRing,
    title: "Notifications intelligentes",
    description:
      "SMS, emails et rappels automatiques pour vos membres.",
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
      "Dashboard simple",
      "1 administrateur",
    ],
  },
  {
    name: "Pro",
    price: "15000",
    popular: true,
    description: "Le plus populaire",
    features: [
      "100 membres",
      "Mobile Money",
      "Rapports avancés",
      "Notifications SMS",
      "5 administrateurs",
    ],
  },
  {
    name: "Elite",
    price: "45000",
    description: "Pour organisations avancées",
    features: [
      "Membres illimités",
      "Analytics Premium",
      "API",
      "Support prioritaire",
      "Formation dédiée",
    ],
  },
]

const stats = [
  {
    value: "1K+",
    label: "Associations",
  },
  {
    value: "50K+",
    label: "Transactions",
  },
  {
    value: "99.9%",
    label: "Disponibilité",
  },
]

const testimonials = [
  {
    name: "Association Horizon",
    text: "AssoPilot a complètement modernisé notre gestion.",
  },
  {
    name: "Jeunesse Unie",
    text: "Les cotisations Mobile Money nous font gagner énormément de temps.",
  },
  {
    name: "Fondation Impact",
    text: "Une plateforme digne des meilleurs SaaS internationaux.",
  },
]

const faqs = [
  {
    q: "Peut-on utiliser Orange Money ?",
    a: "Oui, Orange Money, MTN Money et Wave sont pris en charge.",
  },
  {
    q: "Les données sont-elles sécurisées ?",
    a: "Toutes les données sont protégées avec les meilleures pratiques modernes.",
  },
  {
    q: "Existe-t-il une version gratuite ?",
    a: "Oui, le plan Starter est gratuit.",
  },
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main
      className="
      min-h-screen
      overflow-x-hidden
      bg-white
      text-slate-900
      transition-colors
      duration-500

      dark:bg-[#02150d]
      dark:text-white
      "
    >
      {/* Background */}

      <div
        className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_35%)]
        dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%)]
        "
      />

      {/* NAVBAR */}

      <header
        className="
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        border-slate-200
        bg-white/70
        backdrop-blur-2xl

        dark:border-white/10
        dark:bg-black/30
        "
      >
        <div
          className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-4
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              to-green-300
              "
            >
              <Layers3 className="h-6 w-6 text-black" />
            </div>

            <div>
              <h1 className="font-black text-xl">
                AssoPilot
              </h1>

              <p
                className="
                text-xs
                text-slate-500
                dark:text-zinc-500
                "
              >
                Association Operating System
              </p>
            </div>
          </div>

          <nav
            className="
            hidden
            lg:flex
            items-center
            gap-8
            "
          >
            <a href="#features">Fonctionnalités</a>
            <a href="#analytics">Analytics</a>
            <a href="#pricing">Tarifs</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="
              rounded-2xl
              border
              border-slate-200
              px-3
              py-2

              dark:border-white/10
              "
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link href="/login">
              <button
                className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-2.5

                dark:border-white/10
                "
              >
                Connexion
              </button>
            </Link>

            <Link href="/register">
              <button
                className="
                rounded-2xl
                bg-emerald-600
                px-5
                py-2.5
                font-semibold
                text-white
                "
              >
                Commencer
              </button>
            </Link>
          </div>

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden"
          >
            {mobileMenu ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div
            className="
            border-t
            border-slate-200
            p-5

            dark:border-white/10
            "
          >
            <div className="flex flex-col gap-4">
              <a href="#features">
                Fonctionnalités
              </a>

              <a href="#analytics">
                Analytics
              </a>

              <a href="#pricing">
                Tarifs
              </a>

              <a href="#faq">
                FAQ
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}

      <section
        className="
        relative
        px-4
        pt-40
        pb-32
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          grid
          gap-16
          lg:grid-cols-2
          items-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div
              className="
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              "
            >
              <Sparkles className="h-4 w-4" />
              Plateforme associative nouvelle génération
            </div>

            <h1
              className="
              text-[clamp(3rem,8vw,6rem)]
              font-black
              leading-none
              tracking-tight
              "
            >
              Gérez votre association avec une expérience premium.
            </h1>

            <p
              className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-slate-600
              dark:text-zinc-400
              "
            >
              Centralisez membres,
              cotisations,
              Mobile Money,
              événements et
              statistiques dans une
              plateforme moderne.
            </p>

            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-4
              "
            >
              <Link href="/register">
                <button
                  className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-emerald-600
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  "
                >
                  Créer une organisation

                  <ArrowRight />
                </button>
              </Link>

              <button
                className="
                rounded-2xl
                border
                border-slate-200
                px-8
                py-4

                dark:border-white/10
                "
              >
                Voir la démo
              </button>
            </div>

            <div
              className="
              mt-16
              grid
              grid-cols-3
              gap-6
              "
            >
              {stats.map((item) => (
                <div key={item.label}>
                  <h3 className="text-4xl font-black">
                    {item.value}
                  </h3>

                  <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500
                    dark:text-zinc-500
                    "
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

                    {/* DASHBOARD SHOWCASE */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div
              className="
              absolute
              inset-0
              rounded-full
              bg-emerald-500/20
              blur-3xl
              "
            />

            <div
              className="
              relative
              overflow-hidden
              rounded-[36px]
              border
              border-slate-200
              bg-white/70
              backdrop-blur-2xl
              shadow-2xl

              dark:border-white/10
              dark:bg-white/[0.04]
              "
            >
              <div
                className="
                flex
                items-center
                gap-2
                border-b
                border-slate-200
                px-6
                py-4

                dark:border-white/10
                "
              >
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />

                <span
                  className="
                  ml-4
                  text-sm
                  text-slate-500
                  dark:text-zinc-500
                  "
                >
                  dashboard.assopilot.app
                </span>
              </div>

              <div className="p-6">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                  alt="Dashboard"
                  width={1600}
                  height={900}
                  className="
                  rounded-3xl
                  object-cover
                  border
                  border-slate-200

                  dark:border-white/10
                  "
                />

                <div
                  className="
                  mt-6
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                  "
                >
                  <div
                    className="
                    rounded-3xl
                    p-6
                    border
                    border-slate-200

                    dark:border-white/10
                    "
                  >
                    <p className="text-sm text-zinc-500">
                      Cotisations
                    </p>

                    <h3 className="mt-4 text-4xl font-black">
                      2.4M
                    </h3>

                    <p className="text-emerald-500">
                      FCFA ce mois
                    </p>
                  </div>

                  <div
                    className="
                    rounded-3xl
                    p-6
                    border
                    border-slate-200

                    dark:border-white/10
                    "
                  >
                    <p className="text-sm text-zinc-500">
                      Membres actifs
                    </p>

                    <h3 className="mt-4 text-4xl font-black">
                      842
                    </h3>

                    <p className="text-emerald-500">
                      +12%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="
        px-4
        py-28
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          "
        >
          <div
            className="
            mb-20
            text-center
            "
          >
            <div
              className="
              inline-flex
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              "
            >
              Fonctionnalités Premium
            </div>

            <h2
              className="
              mt-6
              text-4xl
              md:text-5xl
              font-black
              "
            >
              Tout ce dont votre
              organisation a besoin.
            </h2>

            <p
              className="
              mt-6
              text-lg
              text-slate-600
              dark:text-zinc-400
              "
            >
              Une plateforme moderne
              inspirée des meilleurs
              SaaS internationaux.
            </p>
          </div>

          <div
            className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            "
          >
            {features.map(
              (
                feature,
                index
              ) => (
                <motion.div
                  key={
                    feature.title
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                  group
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl

                  dark:border-white/10
                  dark:bg-white/[0.03]
                  "
                >
                  <div
                    className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-emerald-500/10
                    "
                  >
                    <feature.icon
                      className="
                      h-7
                      w-7
                      text-emerald-500
                      "
                    />
                  </div>

                  <h3
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                    mt-4
                    text-slate-600
                    dark:text-zinc-400
                    "
                  >
                    {
                      feature.description
                    }
                  </p>

                  <div
                    className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-emerald-500
                    "
                  >
                    Découvrir
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ANALYTICS */}

      <section
        id="analytics"
        className="
        px-4
        py-28
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          grid
          gap-16
          lg:grid-cols-2
          items-center
          "
        >
          <div>
            <Image
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
              alt="Analytics"
              width={1600}
              height={1200}
              className="
              rounded-[36px]
              object-cover
              border
              border-slate-200

              dark:border-white/10
              "
            />
          </div>

          <div>
            <div
              className="
              inline-flex
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              "
            >
              Dashboard analytique
            </div>

            <h2
              className="
              mt-6
              text-5xl
              font-black
              "
            >
              Des données
              exploitables en
              temps réel.
            </h2>

            <p
              className="
              mt-8
              text-lg
              text-slate-600
              dark:text-zinc-400
              "
            >
              Visualisez les
              revenus,
              les cotisations,
              les membres et
              l'activité globale.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Rapports avancés",
                "Mobile Money intégré",
                "Statistiques temps réel",
                "Exports Excel",
                "Gestion multi-rôles",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="
                    flex
                    items-center
                    gap-4
                    "
                  >
                    <div
                      className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-500
                      text-white
                      "
                    >
                      <Check className="h-4 w-4" />
                    </div>

                    <span>
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}

      <section
        id="pricing"
        className="
        px-4
        py-28
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          "
        >
          <div className="text-center mb-20">
            <h2
              className="
              text-5xl
              font-black
              "
            >
              Tarification
              transparente
            </h2>

            <p
              className="
              mt-6
              text-lg
              text-slate-600
              dark:text-zinc-400
              "
            >
              Des plans adaptés à
              chaque taille
              d'organisation.
            </p>
          </div>

          <div
            className="
            grid
            gap-8
            lg:grid-cols-3
            "
          >
            {pricing.map(
              (plan) => (
                <div
                  key={plan.name}
                  className={`
                  relative
                  rounded-[36px]
                  border
                  p-10

                  ${
                    plan.popular
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-200 dark:border-white/10"
                  }
                  `}
                >
                  {plan.popular && (
                    <div
                      className="
                      absolute
                      right-6
                      top-6
                      rounded-full
                      bg-emerald-500
                      px-4
                      py-1
                      text-sm
                      text-white
                      "
                    >
                      Populaire
                    </div>
                  )}

                  <h3 className="text-3xl font-black">
                    {plan.name}
                  </h3>

                  <p className="mt-3 text-zinc-500">
                    {plan.description}
                  </p>

                  <div className="mt-8">
                    <span className="text-6xl font-black">
                      {plan.price}
                    </span>

                    <span className="ml-2">
                      FCFA/mois
                    </span>
                  </div>

                                    <div className="mt-10 space-y-4">
                    {plan.features.map(
                      (feature) => (
                        <div
                          key={feature}
                          className="
                          flex
                          items-center
                          gap-3
                          "
                        >
                          <div
                            className="
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-500
                            text-white
                            "
                          >
                            <Check className="h-3 w-3" />
                          </div>

                          <span>
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <button
                    className={`
                    mt-10
                    w-full
                    rounded-2xl
                    py-4
                    font-semibold
                    transition

                    ${
                      plan.popular
                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                        : "border border-slate-200 dark:border-white/10"
                    }
                    `}
                  >
                    Choisir ce plan
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section
        className="
        px-4
        py-28
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          "
        >
          <div className="text-center mb-20">
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-2
              "
            >
              <Star className="h-4 w-4" />
              Témoignages
            </div>

            <h2
              className="
              mt-6
              text-5xl
              font-black
              "
            >
              Ce que disent nos clients
            </h2>
          </div>

          <div
            className="
            grid
            gap-6
            lg:grid-cols-3
            "
          >
            {testimonials.map(
              (item) => (
                <div
                  key={item.name}
                  className="
                  rounded-[32px]
                  border
                  border-slate-200
                  p-8
                  bg-white

                  dark:bg-white/[0.03]
                  dark:border-white/10
                  "
                >
                  <Quote
                    className="
                    h-10
                    w-10
                    text-emerald-500
                    "
                  />

                  <p
                    className="
                    mt-6
                    leading-relaxed
                    text-slate-600

                    dark:text-zinc-400
                    "
                  >
                    {item.text}
                  </p>

                  <h4
                    className="
                    mt-6
                    font-bold
                    "
                  >
                    {item.name}
                  </h4>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="
        px-4
        py-28
        "
      >
        <div
          className="
          mx-auto
          max-w-4xl
          "
        >
          <div className="text-center mb-20">
            <h2
              className="
              text-5xl
              font-black
              "
            >
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map(
              (faq) => (
                <div
                  key={faq.q}
                  className="
                  rounded-3xl
                  border
                  border-slate-200
                  p-8

                  dark:border-white/10
                  "
                >
                  <h3
                    className="
                    text-xl
                    font-bold
                    "
                  >
                    {faq.q}
                  </h3>

                  <p
                    className="
                    mt-4
                    text-slate-600

                    dark:text-zinc-400
                    "
                  >
                    {faq.a}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section
        className="
        px-4
        py-32
        "
      >
        <div
          className="
          relative
          overflow-hidden
          mx-auto
          max-w-6xl
          rounded-[42px]

          bg-gradient-to-br
          from-emerald-600
          via-green-500
          to-cyan-600

          px-10
          py-24

          text-center
          text-white

          shadow-[0_0_120px_rgba(16,185,129,0.30)]
          "
        >
          <div
            className="
            absolute
            inset-0
            bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)]
            bg-[size:60px_60px]
            opacity-20
            "
          />

          <div className="relative">
            <div
              className="
              mx-auto
              mb-8
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[30px]
              bg-white/10
              backdrop-blur-2xl
              "
            >
              <Globe className="h-12 w-12" />
            </div>

            <h2
              className="
              mx-auto
              max-w-4xl
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              "
            >
              Construisez une organisation moderne.
            </h2>

            <p
              className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-white/80
              "
            >
              Automatisez les cotisations,
              centralisez les membres,
              simplifiez la gestion et
              développez votre association.
            </p>

            <div
              className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
              "
            >
              <Link href="/register">
                <button
                  className="
                  rounded-2xl
                  bg-white
                  px-8
                  py-4
                  text-lg
                  font-bold
                  text-black
                  transition
                  hover:scale-105
                  "
                >
                  Commencer gratuitement
                </button>
              </Link>

              <button
                className="
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-8
                py-4
                text-lg
                font-semibold
                backdrop-blur-xl
                "
              >
                Planifier une démonstration
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="
        border-t
        border-slate-200

        dark:border-white/10

        px-4
        py-14
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          flex
          flex-col
          gap-10

          lg:flex-row
          lg:items-center
          lg:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-4">
              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-emerald-600
                text-white
                "
              >
                <LockKeyhole className="h-6 w-6" />
              </div>

              <div>
                <h3
                  className="
                  text-2xl
                  font-black
                  "
                >
                  AssoPilot
                </h3>

                <p
                  className="
                  text-sm
                  text-slate-500

                  dark:text-zinc-500
                  "
                >
                  Plateforme premium de
                  gestion associative.
                </p>
              </div>
            </div>
          </div>

          <div
            className="
            flex
            flex-wrap
            gap-6
            text-sm

            text-slate-500
            dark:text-zinc-500
            "
          >
            <a href="#">
              Confidentialité
            </a>

            <a href="#">
              Conditions
            </a>

            <a href="#">
              Documentation
            </a>

            <a href="#">
              Support
            </a>

            <a href="#">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}