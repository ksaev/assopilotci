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

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const [error, setError] = useState<ApiError | null>(null)

  const validate = () => {
    const newErrors: any = {}

    const value = email.trim()

    if (!value) {
      newErrors.email = "Email requis"
    }

    if (!password) {
      newErrors.password = "Mot de passe requis"
    } else if (password.length < 6) {
      newErrors.password = "Mot de passe trop court"
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
      // ✅ FIX IMPORTANT : route correcte
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      setIsLoading(false)

      if (!data.success) {
        setError({
          title: "Connexion impossible",
          message: data.message || "Erreur identifiants",
          code: data.code || "LOGIN_ERROR",
        })
        return
      }

      // ✅ SAFE ROUTING
      const role = data.role ?? "MEMBER"

      if (role === "SUPER_ADMIN") {
        router.push("/owner/dashboard")
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard")
      } else {
        router.push("/membre/dashboard")
      }
    } catch (err) {
      setIsLoading(false)

      setError({
        title: "Erreur réseau",
        message: "Serveur inaccessible",
        code: "NETWORK_ERROR",
      })
    }
  }

  return (
    <div className="min-h-screen flex bg-background">

      {/* LEFT SIDE (inchangé) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sidebar via-sidebar to-emerald-900 overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-sidebar-foreground">
          <h1 className="text-4xl font-bold mb-4">GestionAsso CI</h1>
        </div>
      </div>

      {/* RIGHT SIDE (inchangé design) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >

          <Card className="border-0 shadow-2xl rounded-3xl">

            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                Entrez vos identifiants pour accéder à votre espace
              </CardDescription>
            </CardHeader>

            <CardContent>

              {/* ERROR */}
              <AnimatePresence>
                {error && (
                  <motion.div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <div className="flex justify-between">
                      <strong>{error.title}</strong>
                      <button onClick={() => setError(null)}>
                        <XCircle />
                      </button>
                    </div>
                    <p className="text-sm">{error.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 opacity-50" />
                    <Input
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <Label>Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 opacity-50" />

                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <Button className="w-full h-12" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Connexion...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

              </form>

            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  )
}