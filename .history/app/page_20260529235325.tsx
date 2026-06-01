"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"

export default function Page() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-b border-black/5 dark:border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <h1 className="text-xl font-semibold tracking-tight">
            AssoPilot
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#product">Produit</a>
            <a href="#story">Histoire</a>
            <a href="#pricing">Tarifs</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Association Operating System
            </p>

            <h1 className="text-[clamp(4rem,12vw,9rem)] font-semibold tracking-tight leading-none">
              L’organisation.
              <br />
              Réinventée.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Une plateforme moderne qui centralise membres,
              cotisations, Mobile Money et événements dans une
              expérience simple, élégante et puissante.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black"
              >
                Commencer
              </Link>

              <button className="rounded-full border border-black/10 dark:border-white/10 px-8 py-4">
                Voir la démo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISUAL STORY */}
      <section
        id="story"
        className="relative flex min-h-screen items-center px-6"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-neutral-500">
              Une seule plateforme
            </p>

            <h2 className="text-6xl font-semibold tracking-tight">
              Tous vos membres.
              <br />
              Toutes vos données.
            </h2>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-400">
              Plus besoin de feuilles Excel dispersées,
              de groupes WhatsApp désorganisés ou de
              paiements difficiles à suivre.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
              alt="Dashboard"
              width={1600}
              height={1000}
              className="rounded-[40px] shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
    </main>
  )
}