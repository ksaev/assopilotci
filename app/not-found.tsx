"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none"
          >
            404
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-primary/5" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/50" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/70" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mt-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">Page Introuvable</h1>
          <p className="text-muted-foreground text-lg">
            Oops! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <Link href="/login">
              <ArrowLeft className="w-4 h-4" />
              Page de connexion
            </Link>
          </Button>
        </motion.div>


        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 rounded-2xl bg-muted/50"
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Search className="w-5 h-5" />
            <span>Vous cherchez quelque chose de spécifique?</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {[
              { href: "/admin/dashboard", label: "Tableau de bord Admin" },
              { href: "/membre/dashboard", label: "Espace Membre" },
              { href: "/admin/transactions", label: "Transactions" },
            ].map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </motion.div>


        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm text-muted-foreground mt-8"
        >
          Si le problème persiste, contactez{" "}
          <a href="mailto:support@gestionasso.ci" className="text-primary hover:underline">
            support@gestionasso.ci
          </a>
        </motion.p>
      </div>
    </div>
  )
}
