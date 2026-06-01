"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Globe,
  Sparkles,
  ShieldCheck,
  Users,
  Wallet,
  Smartphone,
  CalendarDays,
  BellRing,
  Check,

} from "lucide-react"

export default function HeroSection() {
  const [lang, setLang] = useState<"fr" | "en">("fr")
  

  const content = {
    fr: {
      badge: "Plateforme nouvelle génération",
      title1: "La gestion associative",
      title2: "réinventée.",
      description:
        "Centralisez vos membres, cotisations, événements, finances et communications dans une plateforme moderne conçue pour les associations ambitieuses.",
      primary: "Créer une organisation",
      secondary: "Voir la démonstration",
      stats1: "Associations",
      stats2: "Transactions",
      stats3: "Disponibilité",
    },

    en: {
      badge: "Next-generation platform",
      title1: "Association management",
      title2: "reimagined.",
      description:
        "Centralize members, payments, events, finances and communications in one modern platform built for ambitious organizations.",
      primary: "Create organization",
      secondary: "Watch demo",
      stats1: "Organizations",
      stats2: "Transactions",
      stats3: "Availability",
    },
  }

  const t = content[lang]

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating blur */}
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[150px]" />

      {/* Language Switch */}
      <div className="absolute right-6 top-6 z-20">
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl transition hover:bg-white/10"
        >
          <Globe className="h-4 w-4" />
          {lang === "fr" ? "English" : "Français"}
        </button>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-400"
        >
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="
            font-black
            leading-[0.95]
            tracking-tight
            text-[clamp(3rem,9vw,8rem)]
          "
        >
          {t.title1}
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-white bg-clip-text text-transparent">
            {t.title2}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-[clamp(1rem,2vw,1.3rem)]
            leading-relaxed
            text-zinc-400
          "
        >
          {t.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/register">
            <button className="group flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105">
              {t.primary}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          </Link>

          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium backdrop-blur-xl transition hover:bg-white/10">
            {t.secondary}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-20 grid grid-cols-3 gap-6 md:gap-12"
        >
          <div>
            <h3 className="text-[clamp(2rem,4vw,4rem)] font-black text-emerald-400">
              1K+
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              {t.stats1}
            </p>
          </div>

          <div>
            <h3 className="text-[clamp(2rem,4vw,4rem)] font-black text-emerald-400">
              50K+
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              {t.stats2}
            </p>
          </div>

          <div>
            <h3 className="text-[clamp(2rem,4vw,4rem)] font-black text-emerald-400">
              99.9%
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              {t.stats3}
            </p>
          </div>
        </motion.div>

        {/* Trust */}
        <div className="mt-20 flex items-center justify-center gap-3 text-zinc-500">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>
            Enterprise Security • Mobile Money • Multi-Organisation
          </span>
        </div>
      </div>
    </section>
  )
}

{/* ===================================================== */}
{/* FEATURES */}
{/* ===================================================== */}

<section
  id="fonctionnalites"
  className="relative py-32 lg:py-40"
>
  <div className="mx-auto max-w-7xl px-6">

    <div className="mx-auto max-w-4xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-600 dark:text-emerald-300">
        <Sparkles className="h-4 w-4" />
        {language === "fr"
          ? "Plateforme complète de gestion associative"
          : "Complete Association Management Platform"}
      </div>

      <h2 className="mt-8 text-4xl font-black tracking-tight md:text-6xl">
        {language === "fr"
          ? "Tout ce dont votre organisation a besoin."
          : "Everything your organization needs."}
      </h2>

      <p className="mt-8 text-xl text-zinc-600 dark:text-zinc-400">
        {language === "fr"
          ? "Conçue pour les associations modernes, ONG, fédérations, mutuelles, syndicats, clubs sportifs, organisations religieuses et structures communautaires."
          : "Built for modern associations, NGOs, federations, unions, sports clubs, religious organizations and community groups."}
      </p>
    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {[
        {
          icon: Users,
          titleFr: "Gestion des membres",
          titleEn: "Member Management",
          descFr:
            "Profils complets, rôles, historique, adhésions et suivi des activités.",
          descEn:
            "Complete profiles, roles, memberships and activity tracking.",
        },
        {
          icon: Wallet,
          titleFr: "Cotisations & Paiements",
          titleEn: "Payments & Contributions",
          descFr:
            "Suivi automatique des paiements et cotisations.",
          descEn:
            "Automated contribution and payment tracking.",
        },
        {
          icon: Smartphone,
          titleFr: "Mobile Money",
          titleEn: "Mobile Money",
          descFr:
            "Orange Money, MTN Money, Wave et paiements hybrides.",
          descEn:
            "Orange Money, MTN Money, Wave and hybrid payments.",
        },
        {
          icon: CalendarDays,
          titleFr: "Événements",
          titleEn: "Events",
          descFr:
            "Assemblées générales, réunions et activités.",
          descEn:
            "General meetings, events and activities.",
        },
        {
          icon: BellRing,
          titleFr: "Notifications",
          titleEn: "Notifications",
          descFr:
            "SMS, emails et rappels automatiques.",
          descEn:
            "SMS, email and automated reminders.",
        },
        {
          icon: ShieldCheck,
          titleFr: "Sécurité avancée",
          titleEn: "Enterprise Security",
          descFr:
            "JWT, audit logs, permissions avancées.",
          descEn:
            "JWT, audit logs and advanced permissions.",
        },
      ].map((item) => (
        <motion.div
          key={item.titleFr}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            group
            rounded-[32px]
            border
            border-zinc-200
            dark:border-white/10
            bg-white
            dark:bg-white/[0.03]
            p-8
            shadow-sm
            transition-all
            hover:-translate-y-2
            hover:border-emerald-500/30
          "
        >
          <div
            className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            bg-emerald-500/10
            border
            border-emerald-500/20
            "
          >
            <item.icon className="h-8 w-8 text-emerald-500" />
          </div>

          <h3 className="mt-8 text-2xl font-bold">
            {language === "fr"
              ? item.titleFr
              : item.titleEn}
          </h3>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {language === "fr"
              ? item.descFr
              : item.descEn}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* DASHBOARD VC READY */}
{/* ===================================================== */}

<section
  id="dashboard"
  className="relative py-32 lg:py-40"
>
  <div className="mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-20 xl:grid-cols-2">

      <div>

        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-500">
          VC Ready Dashboard
        </div>

        <h2 className="mt-8 text-5xl font-black leading-tight">
          {language === "fr"
            ? "Une plateforme pensée pour la croissance."
            : "Built for organizational growth."}
        </h2>

        <p className="mt-8 text-xl text-zinc-600 dark:text-zinc-400">
          {language === "fr"
            ? "Visualisez en temps réel les membres, finances, cotisations, événements et indicateurs stratégiques."
            : "Monitor members, finances, events and strategic metrics in real-time."}
        </p>

        <div className="mt-12 space-y-6">

          {[
            language === "fr"
              ? "Tableaux de bord temps réel"
              : "Real-time dashboards",

            language === "fr"
              ? "Rapports financiers intelligents"
              : "Advanced financial reports",

            language === "fr"
              ? "Analyse de croissance"
              : "Growth analytics",

            language === "fr"
              ? "Historique complet"
              : "Complete activity history",

            language === "fr"
              ? "Exports PDF & Excel"
              : "PDF & Excel exports",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-4 w-4 text-white" />
              </div>

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
        <div
          className="
          overflow-hidden
          rounded-[40px]
          border
          border-zinc-200
          dark:border-white/10
          bg-white
          dark:bg-white/[0.03]
          p-6
          shadow-2xl
          "
        >
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
            alt="Dashboard"
            width={1600}
            height={1000}
            className="rounded-[28px]"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div className="rounded-3xl bg-emerald-500/10 p-6">
              <p className="text-sm text-zinc-500">
                {language === "fr"
                  ? "Membres actifs"
                  : "Active Members"}
              </p>

              <h3 className="mt-3 text-5xl font-black">
                5 842
              </h3>
            </div>

            <div className="rounded-3xl bg-emerald-500/10 p-6">
              <p className="text-sm text-zinc-500">
                {language === "fr"
                  ? "Cotisations"
                  : "Contributions"}
              </p>

              <h3 className="mt-3 text-5xl font-black">
                24M
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
</section>

{/* ===================================================== */}
{/* MOBILE MONEY */}
{/* ===================================================== */}

<section
  id="paiements"
  className="relative py-32 bg-emerald-500/[0.04]"
>
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <h2 className="text-5xl font-black">
        {language === "fr"
          ? "Mobile Money intégré."
          : "Integrated Mobile Money."}
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-zinc-600 dark:text-zinc-400">
        {language === "fr"
          ? "Recevez vos cotisations via Orange Money, MTN Money, Wave ou paiements bancaires."
          : "Collect contributions through Orange Money, MTN Money, Wave and bank payments."}
      </p>
    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-4">

      {[
        "Orange Money",
        "MTN Money",
        "Wave",
        "Bank Transfer",
      ].map((item) => (
        <div
          key={item}
          className="
          rounded-[32px]
          border
          border-zinc-200
          dark:border-white/10
          bg-white
          dark:bg-white/[0.03]
          p-10
          text-center
          "
        >
          <h3 className="text-2xl font-bold">
            {item}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* SECURITY */}
{/* ===================================================== */}

<section
  id="security"
  className="
  relative
  overflow-hidden
  py-40
  bg-black
  text-white
  "
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_40%)]" />

  <div className="relative mx-auto max-w-5xl px-6 text-center">

    <ShieldCheck className="mx-auto h-16 w-16 text-emerald-400" />

    <h2 className="mt-8 text-6xl font-black leading-tight">
      {language === "fr"
        ? "Vos données sont protégées."
        : "Your data is protected."}
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-xl text-zinc-400">
      {language === "fr"
        ? "Authentification sécurisée, rôles avancés, audit logs, sauvegardes automatiques et protection des données."
        : "Secure authentication, advanced permissions, audit logs, automated backups and data protection."}
    </p>

  </div>
</section>

{/* ===================================================== */}
{/* SOCIAL PROOF - STRIPE STYLE */}
{/* ===================================================== */}

<section className="relative py-32 lg:py-40">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-black">
        {language === "fr"
          ? "Adopté par des organisations ambitieuses"
          : "Trusted by ambitious organizations"}
      </h2>

      <p className="mt-8 text-xl text-zinc-600 dark:text-zinc-400">
        {language === "fr"
          ? "Des associations, ONG et structures modernes qui ont transformé leur gestion."
          : "Associations, NGOs and modern organizations transforming their operations."}
      </p>
    </div>

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      {[
        {
          name: "ONG Horizon",
          role: "Directeur",
          text:
            "AssoPilot a remplacé Excel et WhatsApp. Tout est désormais centralisé et professionnel.",
        },
        {
          name: "Fondation Lumière",
          role: "Trésorière",
          text:
            "La gestion des cotisations est devenue simple, rapide et totalement transparente.",
        },
        {
          name: "Union Jeunesse",
          role: "Président",
          text:
            "On a gagné un temps énorme dans la gestion des membres et événements.",
        },
      ].map((item) => (
        <div
          key={item.name}
          className="rounded-[32px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-10"
        >
          <div className="text-3xl mb-6">★★★★★</div>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
            “{item.text}”
          </p>

          <div className="mt-8">
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-sm text-zinc-500">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* BEFORE / AFTER STRIPE STYLE */}
{/* ===================================================== */}

<section className="relative py-32 bg-zinc-50 dark:bg-black">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-black">
        {language === "fr"
          ? "Avant vs Après AssoPilot"
          : "Before vs After AssoPilot"}
      </h2>
    </div>

    <div className="mt-20 grid gap-10 lg:grid-cols-2">

      {/* BEFORE */}
      <div className="rounded-[36px] border border-red-200 dark:border-red-900 bg-white dark:bg-white/[0.02] p-10">
        <h3 className="text-3xl font-bold text-red-500">
          {language === "fr" ? "Avant" : "Before"}
        </h3>

        <ul className="mt-10 space-y-6 text-zinc-600 dark:text-zinc-400">
          <li>❌ Excel dispersé</li>
          <li>❌ Cotisations manuelles</li>
          <li>❌ Perte de données fréquente</li>
          <li>❌ Communication désorganisée</li>
          <li>❌ Aucune vision globale</li>
        </ul>
      </div>

      {/* AFTER */}
      <div className="rounded-[36px] border border-emerald-200 dark:border-emerald-900 bg-emerald-500/5 p-10">
        <h3 className="text-3xl font-bold text-emerald-500">
          {language === "fr" ? "Après" : "After"}
        </h3>

        <ul className="mt-10 space-y-6 text-zinc-800 dark:text-zinc-200">
          <li>✔ Plateforme centralisée</li>
          <li>✔ Paiements automatisés</li>
          <li>✔ Données sécurisées</li>
          <li>✔ Communication unifiée</li>
          <li>✔ Dashboard intelligent</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* USE CASES */}
{/* ===================================================== */}

<section className="relative py-32">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-black">
        {language === "fr"
          ? "Conçu pour toutes les organisations"
          : "Built for every organization"}
      </h2>
    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      {[
        {
          title: "ONG",
          desc: "Gestion des dons et projets humanitaires",
        },
        {
          title: "Églises",
          desc: "Dîmes, membres et événements",
        },
        {
          title: "Coopératives",
          desc: "Cotisations et bénéfices partagés",
        },
        {
          title: "Clubs sportifs",
          desc: "Licences et gestion des joueurs",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-[30px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8"
        >
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* PRICING VC READY */}
{/* ===================================================== */}

<section className="relative py-40 bg-black text-white">
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">
      <h2 className="text-6xl font-black">
        {language === "fr"
          ? "Tarification simple et transparente"
          : "Simple transparent pricing"}
      </h2>

      <p className="mt-8 text-xl text-zinc-400">
        {language === "fr"
          ? "Choisissez un plan adapté à la taille de votre organisation"
          : "Choose a plan that fits your organization size"}
      </p>
    </div>

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      {[
        {
          name: "Starter",
          price: "0",
          features: ["20 membres", "Support communautaire", "Basic dashboard"],
        },
        {
          name: "Pro",
          price: "15 000",
          features: [
            "100 membres",
            "Mobile Money",
            "Analytics avancées",
            "Support prioritaire",
          ],
        },
        {
          name: "Elite",
          price: "45 000",
          features: [
            "Membres illimités",
            "API complète",
            "Sécurité avancée",
            "Support dédié",
          ],
        },
      ].map((plan, index) => (
        <div
          key={plan.name}
          className={`rounded-[36px] p-10 border ${
            index === 1
              ? "bg-emerald-500 text-black"
              : "border-white/10 bg-white/5"
          }`}
        >
          <h3 className="text-3xl font-bold">{plan.name}</h3>

          <div className="mt-6 text-5xl font-black">
            {plan.price} FCFA
          </div>

          <ul className="mt-10 space-y-4">
            {plan.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>

          <button className="mt-10 w-full rounded-full bg-black/10 dark:bg-white/10 py-4">
            {language === "fr" ? "Choisir" : "Select"}
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ===================================================== */}
{/* FAQ PREMIUM */}
{/* ===================================================== */}

<section className="relative py-40">
  <div className="mx-auto max-w-4xl px-6">

    <div className="text-center">
      <h2 className="text-5xl font-black">
        FAQ
      </h2>
    </div>

    <div className="mt-20 space-y-6">

      {[
        {
          q: "Puis-je gérer plusieurs associations ?",
          a: "Oui, vous pouvez gérer plusieurs organisations depuis un seul compte.",
        },
        {
          q: "Le paiement Mobile Money est-il sécurisé ?",
          a: "Oui, toutes les transactions sont cryptées et tracées.",
        },
        {
          q: "Est-ce adapté aux ONG ?",
          a: "Oui, la plateforme est conçue pour ONG, clubs et associations.",
        },
        {
          q: "Existe-t-il une version gratuite ?",
          a: "Oui, un plan Starter gratuit est disponible.",
        },
      ].map((faq) => (
        <div
          key={faq.q}
          className="rounded-[28px] border border-zinc-200 dark:border-white/10 p-8"
        >
          <h3 className="text-xl font-bold">{faq.q}</h3>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {faq.a}
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
        className="relative px-6 py-40"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Pricing
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Simple pricing.
              <br />
              Powerful features.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              Choose the plan that fits your organization
              today and scale whenever you need.
            </p>

          </div>

          <div className="mt-24 grid gap-8 xl:grid-cols-3">

            {/* STARTER */}

            <div className="rounded-[40px] border border-emerald-100 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-[#0B1510]">

              <span className="text-sm font-semibold text-slate-500">
                STARTER
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Free
              </h3>

              <div className="mt-8">
                <span className="text-6xl font-bold">
                  0
                </span>
                <span className="text-slate-500">
                  /month
                </span>
              </div>

              <div className="mt-10 space-y-4">

                {[
                  "50 Members",
                  "Basic Dashboard",
                  "Member Directory",
                  "Event Management",
                  "Email Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}

              </div>

              <button className="mt-10 w-full rounded-2xl border border-emerald-200 py-4 font-semibold">
                Get Started
              </button>

            </div>

            {/* PRO */}

            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-emerald-600 to-green-600 p-10 text-white shadow-[0_25px_80px_rgba(16,185,129,0.35)]">

              <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-1 text-xs font-bold text-black">
                MOST POPULAR
              </div>

              <span className="text-sm font-semibold text-white/70">
                PROFESSIONAL
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Pro
              </h3>

              <div className="mt-8">
                <span className="text-6xl font-bold">
                  15K
                </span>
                <span className="text-white/70">
                  FCFA/month
                </span>
              </div>

              <div className="mt-10 space-y-4">

                {[
                  "Unlimited Members",
                  "Mobile Money",
                  "Advanced Reports",
                  "SMS Notifications",
                  "Custom Roles",
                  "Analytics",
                  "Priority Support",
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
                Start Pro
              </button>

            </div>

            {/* ENTERPRISE */}

            <div className="rounded-[40px] border border-emerald-100 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-[#0B1510]">

              <span className="text-sm font-semibold text-slate-500">
                ENTERPRISE
              </span>

              <h3 className="mt-5 text-3xl font-bold">
                Custom
              </h3>

              <div className="mt-8">
                <span className="text-4xl font-bold">
                  Contact Us
                </span>
              </div>

              <div className="mt-10 space-y-4">

                {[
                  "Multi Organizations",
                  "Custom API",
                  "Dedicated Infrastructure",
                  "White Label",
                  "Advanced Security",
                  "Dedicated Manager",
                  "24/7 Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-lime-500" />
                    {item}
                  </div>
                ))}

              </div>

              <button className="mt-10 w-full rounded-2xl border border-emerald-200 py-4 font-semibold">
                Contact Sales
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

          <div className="text-center">

            <div className="inline-flex rounded-full bg-lime-50 px-5 py-2 text-sm font-medium text-lime-700 dark:bg-lime-500/10 dark:text-lime-400">
              FAQ
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Frequently Asked Questions
            </h2>

          </div>

          <div className="mt-20 space-y-6">

            {[
              {
                q: "Can I use Mobile Money?",
                a: "Yes. Orange Money, MTN Money and Wave are supported."
              },
              {
                q: "Are my data secure?",
                a: "All data are encrypted and protected using enterprise-grade security."
              },
              {
                q: "Can I manage multiple organizations?",
                a: "Yes, through our Enterprise plan."
              },
              {
                q: "Do you provide APIs?",
                a: "Yes, custom API access is available."
              }
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-[32px] border border-emerald-100 p-8 dark:border-white/10"
              >
                <h3 className="text-xl font-semibold">
                  {faq.q}
                </h3>

                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* NEWSLETTER */}
      {/* ===================================================== */}

      <section className="px-6 py-32">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-bold md:text-5xl">
            Stay updated.
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Receive product updates,
            new features and expert insights.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-2xl border border-emerald-200 px-6 py-4 outline-none dark:border-white/10 dark:bg-[#0B1510]"
            />

            <button className="rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white">
              Subscribe
            </button>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[60px] bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 px-10 py-28 text-center text-white">

            <h2 className="mx-auto max-w-5xl text-5xl font-bold md:text-7xl">
              Ready to transform
              your organization?
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80">
              Join thousands of organizations already
              using AssoPilot to manage members,
              payments and growth.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">

              <Link
                href="/register"
                className="rounded-full bg-white px-10 py-5 font-bold text-black transition hover:scale-105"
              >
                Start Free
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-10 py-5 backdrop-blur-xl"
              >
                Contact Sales
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="border-t border-emerald-100 px-6 py-20 dark:border-white/10">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

            <div className="lg:col-span-2">

              <h3 className="text-3xl font-bold">
                AssoPilot
              </h3>

              <p className="mt-5 max-w-md text-slate-600 dark:text-slate-400">
                The all-in-one platform for associations,
                NGOs, communities and modern organizations.
              </p>

            </div>

            <div>
              <h4 className="font-semibold">
                Product
              </h4>

              <div className="mt-5 space-y-3 text-slate-500">
                <p>Features</p>
                <p>Pricing</p>
                <p>Security</p>
                <p>API</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Resources
              </h4>

              <div className="mt-5 space-y-3 text-slate-500">
                <p>Documentation</p>
                <p>Guides</p>
                <p>Support</p>
                <p>Blog</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">
                Company
              </h4>

              <div className="mt-5 space-y-3 text-slate-500">
                <p>About</p>
                <p>Careers</p>
                <p>Privacy</p>
                <p>Terms</p>
              </div>
            </div>

          </div>

          <div className="mt-20 border-t border-emerald-100 pt-8 text-sm text-slate-500 dark:border-white/10">
            © 2026 AssoPilot. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  )
}