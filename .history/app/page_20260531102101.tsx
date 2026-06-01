"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  ShieldCheck,
  Users,
  Wallet,
  Building2,
  Globe2,
  ChevronRight,
  PlayCircle,
} from "lucide-react"

const stats = [
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
    value: "15+",
    label: "Pays",
  },
]

const companies = [
  "Orange",
  "MTN",
  "Wave",
  "Visa",
  "Mastercard",
  "Google",
  "Microsoft",
  "AWS",
]

export default function LandingPage() {
  // LIGHT MODE PAR DÉFAUT
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <main className="relative overflow-hidden bg-white text-slate-900 transition-all duration-500 dark:bg-[#07120B] dark:text-white">

      {/* ===================================================== */}
      {/* PREMIUM BACKGROUND */}
      {/* ===================================================== */}

      <div className="fixed inset-0 -z-50 overflow-hidden">

        <div className="absolute left-[-250px] top-[-200px] h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[160px]" />

        <div className="absolute right-[-250px] top-[20%] h-[700px] w-[700px] rounded-full bg-green-400/10 blur-[180px]" />

        <div className="absolute bottom-[-300px] left-[20%] h-[800px] w-[800px] rounded-full bg-lime-500/10 blur-[200px]" />

      </div>

      {/* ===================================================== */}
      {/* NAVBAR PREMIUM */}
      {/* ===================================================== */}

      <header className="fixed top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-3xl dark:border-white/10 dark:bg-[#07120B]/80">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 shadow-xl">

              <Building2 className="h-6 w-6 text-white" />

            </div>

            <div>
              <h2 className="text-xl font-bold">
                AssoPilot
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Association Management Platform
              </p>
            </div>
          </Link>

          {/* MENU */}

          <nav className="hidden items-center gap-8 lg:flex">

            {[
              "Features",
              "Solutions",
              "Pricing",
              "Security",
              "Resources",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                {item}
              </a>
            ))}

          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full border border-emerald-100 p-2 transition hover:bg-emerald-50 dark:border-white/10 dark:hover:bg-white/10"
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <Link
              href="/login"
              className="hidden rounded-full border border-emerald-200 px-5 py-2.5 text-sm font-medium transition hover:bg-emerald-50 dark:border-white/10 dark:hover:bg-white/10 lg:block"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="hidden rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 lg:block"
            >
              Start Free
            </Link>

            <button
              className="lg:hidden"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              {mobileMenu ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </div>

        {/* MOBILE */}

        {mobileMenu && (
          <div className="border-t border-emerald-100 bg-white dark:border-white/10 dark:bg-[#07120B]">

            <div className="flex flex-col p-6">

              {[
                "Features",
                "Solutions",
                "Pricing",
                "Security",
                "Resources",
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

      {/* ===================================================== */}
      {/* HERO ELITE */}
      {/* ===================================================== */}

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-32">

        <div className="mx-auto max-w-7xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">

            <Sparkles className="h-4 w-4" />

            New Generation Association Platform

          </div>

          <h1 className="mx-auto mt-10 max-w-6xl text-5xl font-bold leading-tight md:text-7xl xl:text-8xl">

            Manage.
            <br />

            Grow.
            <br />

            <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 bg-clip-text text-transparent">
              Transform.
            </span>

          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">

            The complete operating system for associations,
            NGOs, communities, clubs and professional
            organizations.

            Manage members, finances, events, payments,
            communication and analytics from one platform.

          </p>

          {/* CTA */}

          <div className="mt-14 flex flex-wrap justify-center gap-4">

            <Link
              href="/register"
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-4 font-semibold text-white shadow-2xl transition hover:scale-105"
            >
              Start Free

              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <button className="flex items-center gap-3 rounded-full border border-emerald-200 px-8 py-4 font-medium transition hover:bg-emerald-50 dark:border-white/10 dark:hover:bg-white/10">

              <PlayCircle className="h-5 w-5 text-emerald-500" />

              Watch Demo

            </button>

          </div>

          {/* STATS */}

          <div className="mt-28 grid gap-10 md:grid-cols-4">

            {stats.map((item) => (
              <div key={item.label}>

                <h3 className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-500">
                  {item.label}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* TRUSTED BY */}
      {/* ===================================================== */}

      <section className="border-y border-emerald-100 py-16 dark:border-white/10">

        <div className="mx-auto max-w-7xl px-6">

          <p className="mb-12 text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Trusted Integrations
          </p>

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 xl:grid-cols-8">

            {companies.map((company) => (
              <div
                key={company}
                className="text-lg font-semibold text-slate-400"
              >
                {company}
              </div>
            ))}

          </div>

        </div>
      </section>

            {/* ===================================================== */}
      {/* FEATURES ELITE */}
      {/* ===================================================== */}

      <section
        id="features"
        className="relative overflow-hidden px-6 py-40"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Smart Features
            </div>

            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold md:text-6xl">
              Everything your organization
              needs to scale.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              Built for associations, NGOs, clubs,
              communities and federations looking
              for efficiency, transparency and growth.
            </p>

          </div>

          {/* BENTO */}

          <div className="mt-24 grid auto-rows-[260px] gap-6 lg:grid-cols-4">

            {/* BIG CARD */}

            <motion.div
              whileHover={{ y: -8 }}
              className="col-span-2 row-span-2 overflow-hidden rounded-[40px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-10 dark:border-white/10 dark:from-emerald-500/10 dark:to-green-500/10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl">
                <Users className="h-8 w-8" />
              </div>

              <h3 className="mt-8 text-3xl font-bold">
                Smart Member Management
              </h3>

              <p className="mt-5 max-w-xl text-slate-600 dark:text-slate-400">
                Manage profiles, memberships,
                attendance, roles, contributions,
                communication and activities
                from a unified platform.
              </p>

              <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl dark:bg-[#0B1510]">

                <p className="text-sm text-slate-500">
                  Active Members
                </p>

                <h4 className="mt-2 text-6xl font-bold">
                  842
                </h4>

                <span className="text-sm font-medium text-emerald-500">
                  +12.8% this month
                </span>

              </div>
            </motion.div>

            {/* CARD */}

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[40px] border border-emerald-100 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
            >
              <Wallet className="h-10 w-10 text-emerald-500" />

              <h3 className="mt-6 text-2xl font-bold">
                Mobile Money
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Orange Money,
                MTN Money,
                Wave,
                Visa.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[40px] border border-emerald-100 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
            >
              <ShieldCheck className="h-10 w-10 text-green-500" />

              <h3 className="mt-6 text-2xl font-bold">
                Security
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Enterprise-grade security,
                encryption and audit logs.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[40px] border border-emerald-100 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
            >
              <Globe2 className="h-10 w-10 text-lime-500" />

              <h3 className="mt-6 text-2xl font-bold">
                Multi Organization
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Manage multiple structures
                from one dashboard.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-[40px] border border-emerald-100 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
            >
              <Building2 className="h-10 w-10 text-emerald-600" />

              <h3 className="mt-6 text-2xl font-bold">
                Administration
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Centralized governance
                and operational control.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* DASHBOARD SHOWCASE */}
      {/* ===================================================== */}

      <section className="relative px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-20 xl:grid-cols-2">

            <div>

              <div className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                Dashboard Experience
              </div>

              <h2 className="mt-8 text-4xl font-bold md:text-6xl">
                One platform.
                <br />
                Total visibility.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Monitor members, finances,
                events, contributions and growth
                from a beautifully designed dashboard.
              </p>

              <div className="mt-10 space-y-5">

                {[
                  "Real-time reporting",
                  "Automated workflows",
                  "Contribution tracking",
                  "Financial insights",
                  "Custom dashboards",
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

            <div>

              <div className="rounded-[40px] border border-emerald-100 bg-white p-8 shadow-[0_40px_100px_rgba(16,185,129,0.15)] dark:border-white/10 dark:bg-[#0B1510]">

                <div className="grid gap-6 md:grid-cols-2">

                  <div className="rounded-3xl bg-emerald-50 p-6 dark:bg-emerald-500/10">
                    <p className="text-sm text-slate-500">
                      Revenue
                    </p>

                    <h3 className="mt-3 text-4xl font-bold">
                      8.2M
                    </h3>

                    <span className="text-emerald-500">
                      +24%
                    </span>
                  </div>

                  <div className="rounded-3xl bg-lime-50 p-6 dark:bg-lime-500/10">
                    <p className="text-sm text-slate-500">
                      Members
                    </p>

                    <h3 className="mt-3 text-4xl font-bold">
                      3,428
                    </h3>

                    <span className="text-lime-500">
                      +16%
                    </span>
                  </div>

                  <div className="rounded-3xl bg-green-50 p-6 dark:bg-green-500/10">
                    <p className="text-sm text-slate-500">
                      Events
                    </p>

                    <h3 className="mt-3 text-4xl font-bold">
                      124
                    </h3>

                    <span className="text-green-500">
                      Active
                    </span>
                  </div>

                  <div className="rounded-3xl bg-emerald-50 p-6 dark:bg-emerald-500/10">
                    <p className="text-sm text-slate-500">
                      Attendance
                    </p>

                    <h3 className="mt-3 text-4xl font-bold">
                      94%
                    </h3>

                    <span className="text-emerald-500">
                      Excellent
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* AI SECTION */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[50px] bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 p-16 text-white">

            <div className="max-w-4xl">

              <span className="rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur-xl">
                AI Powered Platform
              </span>

              <h2 className="mt-8 text-4xl font-bold md:text-6xl">
                Automate operations
                with intelligent insights.
              </h2>

              <p className="mt-8 text-xl text-white/80">
                Leverage automation, smart reporting,
                predictive analytics and member engagement
                recommendations powered by modern AI.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">

                <button className="rounded-full bg-white px-8 py-4 font-semibold text-black">
                  Explore AI
                </button>

                <button className="rounded-full border border-white/20 px-8 py-4">
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

            {/* ===================================================== */}
      {/* SECURITY ENTERPRISE */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-20 xl:grid-cols-2">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Enterprise Security
              </div>

              <h2 className="mt-8 text-4xl font-bold leading-tight md:text-6xl">
                Security built
                for modern organizations.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Every transaction, member profile,
                contribution and financial operation
                is protected by enterprise-grade
                security architecture.
              </p>

              <div className="mt-12 space-y-6">

                {[
                  "End-to-end encryption",
                  "Role based permissions",
                  "Audit logs",
                  "Automatic backups",
                  "Fraud monitoring",
                  "Advanced authentication",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
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
                  value: "99.99%",
                  label: "Uptime",
                },
                {
                  value: "256-bit",
                  label: "Encryption",
                },
                {
                  value: "24/7",
                  label: "Monitoring",
                },
                {
                  value: "100%",
                  label: "Data Protection",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-[36px] border border-emerald-100 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#0B1510]"
                >
                  <h3 className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                    {card.value}
                  </h3>

                  <p className="mt-4 text-slate-500">
                    {card.label}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* INTEGRATIONS */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Integrations
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Connect your ecosystem.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              Integrate payments, communication,
              cloud services and productivity tools
              into one centralized workflow.
            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3 xl:grid-cols-6">

            {[
              "Orange Money",
              "MTN Money",
              "Wave",
              "Google",
              "Microsoft",
              "AWS",
            ].map((item) => (
              <div
                key={item}
                className="flex h-40 items-center justify-center rounded-[32px] border border-emerald-100 bg-white text-lg font-semibold shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
              >
                {item}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* USE CASES */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="inline-flex rounded-full bg-lime-50 px-5 py-2 text-sm font-medium text-lime-700 dark:bg-lime-500/10 dark:text-lime-400">
              Use Cases
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Built for every organization.
            </h2>

          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-4">

            {[
              {
                title: "Associations",
                desc: "Membership, dues, events and governance.",
              },
              {
                title: "NGOs",
                desc: "Donor management and reporting.",
              },
              {
                title: "Churches",
                desc: "Community engagement and contributions.",
              },
              {
                title: "Professional Clubs",
                desc: "Networking and member management.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[36px] border border-emerald-100 bg-white p-10 shadow-lg dark:border-white/10 dark:bg-[#0B1510]"
              >
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* TESTIMONIALS */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <div className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Testimonials
            </div>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Trusted by leaders.
            </h2>

          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-3">

            {[
              {
                name: "Aminata Koné",
                role: "President",
                text: "AssoPilot transformed the way we manage members and finances.",
              },
              {
                name: "Jean Kouassi",
                role: "Treasurer",
                text: "The reporting and payment tools saved us countless hours.",
              },
              {
                name: "Sarah Johnson",
                role: "Director",
                text: "The best platform we've used for organizational management.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-[40px] border border-emerald-100 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-[#0B1510]"
              >
                <div className="mb-6 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500" />

                <h4 className="text-xl font-semibold">
                  {item.name}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {item.role}
                </p>

                <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">
                  "{item.text}"
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* ENTERPRISE CTA */}
      {/* ===================================================== */}

      <section className="px-6 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[60px] bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 p-16 text-white">

            <span className="rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur-xl">
              Enterprise Suite
            </span>

            <h2 className="mt-8 max-w-4xl text-5xl font-bold md:text-7xl">
              Ready to modernize
              your organization?
            </h2>

            <p className="mt-8 max-w-3xl text-xl text-white/80">
              Empower your teams, automate operations,
              increase transparency and accelerate growth
              with a next-generation platform.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">

              <button className="rounded-full bg-white px-8 py-4 font-semibold text-black">
                Start Free
              </button>

              <button className="rounded-full border border-white/20 px-8 py-4">
                Book a Demo
              </button>

            </div>

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