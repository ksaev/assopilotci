"use client"

import type React from "react"
import { useEffect, useState } from "react"
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

type ApiError = {
  title: string
  message: string
  code?: string
}

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const [error, setError] = useState<ApiError | null>(null)

  /* ===============================
     VALIDATION
  =============================== */
  const validate = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = "Email requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide"
    }

    if (!password) {
      newErrors.password = "Mot de passe requis"
    } else if (password.length < 6) {
      newErrors.password = "Min 6 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ===============================
     LOGIN
  =============================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validate()) return

    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe, // 👈 IMPORTANT
        }),
      })

      const data = await res.json()
      setIsLoading(false)

      if (!data.success) {
        setError({
          title: data.error?.title || "Erreur",
          message: data.error?.message || "Connexion impossible",
          code: data.error?.code,
        })
        return
      }

      // ROUTING
      if (data.role === "SUPER_ADMIN") {
        router.push("/owner/dashboard")
      } else if (data.role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/membre/dashboard")
      }
    } catch (err) {
      setIsLoading(false)
      setError({
        title: "Erreur réseau",
        message: "Serveur inaccessible",
        code: "NETWORK",
      })
    }
  }

  return (
    <div className="min-h-screen flex bg-background">

      {/* LEFT SIDE (INCHANGÉ) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sidebar via-sidebar to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-sidebar-foreground">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-bold mb-4">
              GestionAsso CI
            </h1>
            <p className="text-xl opacity-70">
              Plateforme moderne de gestion associative
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">

        <div className="w-full max-w-md">

          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                Accédez à votre espace
              </CardDescription>
            </CardHeader>

            <CardContent>

              {/* ERROR */}
              <AnimatePresence>
                {error && (
                  <motion.div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-500 font-semibold">
                      {error.title}
                    </p>
                    <p className="text-sm text-gray-300">
                      {error.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* EMAIL */}
                <div>
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* PASSWORD */}
                <div>
                  <Label>Mot de passe</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Masquer" : "Voir"}
                  </button>

                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* REMEMBER ME */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Se souvenir de moi
                </label>

                {/* BUTTON */}
                <Button disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

              </form>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}