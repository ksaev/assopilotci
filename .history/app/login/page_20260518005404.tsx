"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Shield,
  AlertTriangle,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ApiError = {
  title: string
  message: string
  code?: string
}

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"admin" | "member">("member")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const [error, setError] = useState<ApiError | null>(null)

  const validate = () => {
    const newErrors: {
      email?: string
      password?: string
    } = {}

    if (!email) {
      newErrors.email = "Email requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide"
    }

    if (!password) {
      newErrors.password = "Mot de passe requis"
    } else if (password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)

    if (!validate()) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      setIsLoading(false)

      if (!data.success) {
        setError({
          title:
            data.error?.title || "Connexion impossible",
          message:
            data.error?.message ||
            "Vérifiez vos identifiants et réessayez.",
          code: data.error?.code || "LOGIN_ERROR",
        })

        return
      }

      // Routing intelligent
      if (
        data.role === "ADMIN" ||
        data.role === "SUPER_ADMIN"
      ) {
        router.push("/admin/dashboard")
      } else {
        router.push("/membre/dashboard")
      }
    } catch (err) {
      console.error(err)

      setIsLoading(false)

      setError({
        title: "Erreur réseau",
        message:
          "Impossible de contacter le serveur actuellement. Vérifiez votre connexion internet.",
        code: "NETWORK_ERROR",
      })
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sidebar via-sidebar to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-sidebar-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30"
            >
              <span className="text-primary-foreground font-bold text-4xl">
                GA
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold mb-4">
              GestionAsso CI
            </h1>

            <p className="text-xl text-sidebar-foreground/70 max-w-md">
              Plateforme moderne de gestion associative
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-md mt-10">
              {[
                {
                  icon: User,
                  label: "20+ Membres",
                  desc: "Actifs",
                },
                {
                  icon: Shield,
                  label: "Sécurisé",
                  desc: "Protection avancée",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                  }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                >
                  <item.icon className="w-8 h-8 text-primary mb-2" />

                  <p className="font-bold">
                    {item.label}
                  </p>

                  <p className="text-sm text-sidebar-foreground/60">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                GA
              </span>
            </div>

            <div>
              <h1 className="font-bold text-xl">
                GestionAsso CI
              </h1>

              <p className="text-xs text-muted-foreground">
                Côte d'Ivoire
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">
                Connexion
              </CardTitle>

              <CardDescription>
                Entrez vos identifiants pour accéder à votre espace
              </CardDescription>
            </CardHeader>

            <CardContent>


              {/* ERROR CARD */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 backdrop-blur"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-red-500">
                            {error.title}
                          </h3>

                          <button
                            onClick={() => setError(null)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                          {error.message}
                        </p>

                        <div className="mt-3 inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400 border border-red-500/20">
                          Code : {error.code}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="adama.kone@email.ci"
                      className="pl-10"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>

                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mot de passe
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-input"
                    />

                    <span className="text-muted-foreground">
                      Se souvenir de moi
                    </span>
                  </label>

                  <a
                    href="#"
                    className="text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl h-12"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Vous souhaitez créer un compte pour votre organisation ?{" "}
                <a
                  href="/create-organization"
                  className="text-primary hover:underline font-medium"
                >
                  Faire une demande d’accès
                </a>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2025 GestionAsso CI. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </div>
  )
}