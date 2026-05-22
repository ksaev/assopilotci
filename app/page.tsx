"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, CreditCard, Smartphone, Shield, BarChart3, Calendar, CheckCircle2, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Users,
    title: "Gestion des Membres",
    description: "Suivez tous vos membres, leur statut et leurs contributions en temps réel.",
  },
  {
    icon: CreditCard,
    title: "Cotisations Simplifiées",
    description: "Collectez les cotisations facilement avec suivi automatique des paiements.",
  },
  {
    icon: Smartphone,
    title: "Mobile Money",
    description: "Intégration Orange Money, MTN et Wave pour des paiements instantanés.",
  },
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description: "Vos données sont protégées avec un chiffrement de niveau bancaire.",
  },
  {
    icon: BarChart3,
    title: "Rapports Détaillés",
    description: "Visualisez vos finances avec des graphiques clairs et exportables.",
  },
  {
    icon: Calendar,
    title: "Événements",
    description: "Planifiez et gérez vos réunions, AG et activités associatives.",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Gratuit",
    description: "Pour les petites associations",
    features: ["Jusqu'à 20 membres", "Suivi des cotisations", "1 administrateur", "Support email"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "15 000",
    period: "/mois",
    description: "Pour les associations actives",
    features: [
      "Jusqu'à 100 membres",
      "Mobile Money intégré",
      "5 administrateurs",
      "Rapports avancés",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "45 000",
    period: "/mois",
    description: "Pour les grandes organisations",
    features: [
      "Membres illimités",
      "API personnalisée",
      "Administrateurs illimités",
      "Formation dédiée",
      "Support 24/7",
    ],
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GA</span>
              </div>
              <span className="font-bold text-xl">GestionAsso</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90">
                  Commencer
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">La solution n°1 en Côte d'Ivoire</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Gérez votre association <span className="text-primary">simplement</span> et{" "}
              <span className="text-primary">efficacement</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Cotisations, membres, événements — tout en un seul endroit. Conçu pour les associations ivoiriennes et
              africaines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Voir la démo
              </Button>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-muted-foreground">app.gestionasso.ci</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                <img src="/modern-dashboard-interface-with-charts-and-data-ta.jpg" alt="Dashboard Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour gérer efficacement votre association au quotidien.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tarifs transparents</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez le plan adapté à la taille de votre association. Tous les prix sont en FCFA.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full relative ${plan.highlighted ? "border-primary shadow-xl scale-105" : ""}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Populaire
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                      {plan.price !== "Gratuit" && <span className="text-sm text-muted-foreground ml-1">FCFA</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/login" className="block mt-8">
                      <Button
                        className={`w-full ${plan.highlighted ? "bg-primary hover:bg-primary/90" : ""}`}
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        Commencer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à moderniser votre association ?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Rejoignez les centaines d'associations qui font confiance à GestionAsso.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Créer un compte gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GA</span>
              </div>
              <span className="font-semibold">GestionAsso</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 GestionAsso. Conçu avec amour en Côte d'Ivoire.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
