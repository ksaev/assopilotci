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
      {/* PRODUCT SHOWCASE */}

      <section
        id="product"
        className="relative min-h-screen flex items-center px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
              Une expérience nouvelle génération
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,7rem)] font-semibold tracking-tight">
              Pensé pour la simplicité.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
              Une interface élégante qui transforme la gestion associative
              en une expérience fluide et intuitive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="overflow-hidden rounded-[48px] border border-black/10 dark:border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2200&auto=format&fit=crop"
                alt="Analytics"
                width={2200}
                height={1400}
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BEFORE AFTER */}

      <section className="min-h-screen flex items-center px-6 py-32">
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500">
              Avant / Après
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold">
              La différence est immédiate.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[40px] bg-neutral-100 dark:bg-neutral-900 p-10">
              <h3 className="text-3xl font-semibold">
                Avant AssoPilot
              </h3>

              <ul className="mt-10 space-y-6 text-lg text-neutral-600 dark:text-neutral-400">
                <li>❌ Fichiers Excel dispersés</li>
                <li>❌ Cotisations difficiles à suivre</li>
                <li>❌ Communication fragmentée</li>
                <li>❌ Rapports manuels</li>
                <li>❌ Perte de temps quotidienne</li>
              </ul>
            </div>

            <div className="rounded-[40px] bg-black text-white dark:bg-white dark:text-black p-10">
              <h3 className="text-3xl font-semibold">
                Avec AssoPilot
              </h3>

              <ul className="mt-10 space-y-6 text-lg">
                <li>✓ Gestion centralisée</li>
                <li>✓ Mobile Money intégré</li>
                <li>✓ Statistiques en temps réel</li>
                <li>✓ Automatisation intelligente</li>
                <li>✓ Productivité maximale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE MONEY */}

      <section className="min-h-screen flex items-center px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500">
              Paiements simplifiés
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none">
              Mobile Money.
              <br />
              Intégré.
            </h2>

            <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-400">
              Orange Money, MTN Money, Wave et paiements bancaires
              réunis dans une seule plateforme.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto max-w-sm rounded-[60px] border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 p-4 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop"
                alt="Mobile"
                width={1200}
                height={1800}
                className="rounded-[48px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECURITY */}

      <section className="relative min-h-screen flex items-center justify-center px-6 bg-black text-white">
        <div className="text-center max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[clamp(4rem,10vw,9rem)] font-semibold leading-none"
          >
            Vos données.
            <br />
            Protégées.
          </motion.h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-400">
            Architecture moderne, authentification sécurisée,
            permissions avancées et surveillance continue.
          </p>
        </div>
      </section>

      {/* STATS */}

      <section className="py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-7xl font-semibold">1K+</h3>
              <p className="mt-4 text-neutral-500">
                Associations actives
              </p>
            </div>

            <div>
              <h3 className="text-7xl font-semibold">50K+</h3>
              <p className="mt-4 text-neutral-500">
                Transactions
              </p>
            </div>

            <div>
              <h3 className="text-7xl font-semibold">99.9%</h3>
              <p className="mt-4 text-neutral-500">
                Disponibilité
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* TESTIMONIALS */}

      <section className="relative py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500">
              Témoignages
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold tracking-tight">
              Adopté par les organisations
              <br />
              les plus ambitieuses.
            </h2>
          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Association Horizon",
                role: "Président",
                text: "AssoPilot a transformé notre manière de gérer les membres et les cotisations."
              },
              {
                name: "Fondation Vision",
                role: "Trésorier",
                text: "Une expérience moderne, intuitive et incroyablement efficace."
              },
              {
                name: "ONG Espoir",
                role: "Directrice",
                text: "Enfin une plateforme qui rassemble toute notre organisation."
              }
            ].map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  rounded-[40px]
                  border
                  border-black/10
                  dark:border-white/10
                  bg-white
                  dark:bg-neutral-950
                  p-10
                "
              >
                <div className="text-4xl mb-6">✦</div>

                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.text}
                </p>

                <div className="mt-8">
                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

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
        className="relative py-40 px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500">
              Tarification
            </p>

            <h2 className="mt-6 text-[clamp(3rem,8vw,6rem)] font-semibold">
              Simple.
              <br />
              Transparente.
            </h2>
          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "0",
                desc: "Petites associations"
              },
              {
                name: "Pro",
                price: "15 000",
                desc: "Associations modernes"
              },
              {
                name: "Elite",
                price: "45 000",
                desc: "Grandes organisations"
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                whileHover={{
                  y: -10
                }}
                className={`
                  rounded-[40px]
                  p-10
                  border

                  ${
                    index === 1
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border-black/10 dark:border-white/10"
                  }
                `}
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

                <button
                  className="
                  mt-10
                  w-full
                  rounded-full
                  py-4
                  font-medium
                  border
                  "
                >
                  Commencer
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="py-40 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-[clamp(3rem,8vw,5rem)] font-semibold">
              Questions fréquentes
            </h2>
          </div>

          <div className="mt-20 space-y-6">
            {[
              {
                q: "Puis-je gérer plusieurs associations ?",
                a: "Oui, AssoPilot prend en charge plusieurs organisations."
              },
              {
                q: "Le Mobile Money est-il intégré ?",
                a: "Oui, Orange Money, MTN Money et Wave sont compatibles."
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Toutes les données sont protégées avec des standards modernes."
              },
              {
                q: "Existe-t-il une version gratuite ?",
                a: "Oui, un plan Starter est disponible."
              }
            ].map((faq) => (
              <div
                key={faq.q}
                className="
                  rounded-[32px]
                  border
                  border-black/10
                  dark:border-white/10
                  p-8
                "
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

      {/* APPLE CTA */}

      <section
        className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        overflow-hidden
        "
      >
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-b
          from-emerald-500/20
          via-transparent
          to-cyan-500/20
          blur-3xl
          "
        />

        <div className="relative text-center max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="
            text-[clamp(4rem,10vw,10rem)]
            font-semibold
            leading-none
            tracking-tight
            "
          >
            L’avenir de votre
            <br />
            organisation
            <br />
            commence ici.
          </motion.h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl text-neutral-600 dark:text-neutral-400">
            Une expérience moderne conçue pour les organisations
            qui souhaitent évoluer avec confiance.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="
              rounded-full
              bg-black
              text-white
              dark:bg-white
              dark:text-black
              px-10
              py-5
              text-lg
              "
            >
              Commencer gratuitement
            </Link>

            <button
              className="
              rounded-full
              border
              border-black/10
              dark:border-white/10
              px-10
              py-5
              text-lg
              "
            >
              Voir une démonstration
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        id="contact"
        className="
        border-t
        border-black/10
        dark:border-white/10
        py-16
        px-6
        "
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-semibold">
                AssoPilot
              </h3>

              <p className="mt-2 text-neutral-500">
                Association Operating System
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-neutral-500">
              <a href="#">Produit</a>
              <a href="#">Tarifs</a>
              <a href="#">Documentation</a>
              <a href="#">Support</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}