"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Building2,
  Bell,
  Shield,
  Save,
  Globe,
  Mail,
  Smartphone,
  RefreshCw,
  AlertTriangle,
  Upload,
  Moon,
  Sun,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

import { settingsSchema, type SettingsInput } from "@/lib/validations"

export default function SettingsPage({
  params,
}: {
  params: Promise<{ organizationSlug: string }>
}) {
  const { toast } = useToast()

  const [slug, setSlug] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      associationName: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      language: "fr",
      currency: "XOF",
      emailNotifications: true,
      smsNotifications: false,
      paymentReminders: true,
      eventReminders: true,
      monthlyReports: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  })

  /* ===================== LOAD PARAMS ===================== */
  useEffect(() => {
    params.then((p) => setSlug(p.organizationSlug)).catch(() => {
      setError("Impossible de charger l'organisation")
    })
  }, [params])

  /* ===================== LOAD SETTINGS ===================== */
  useEffect(() => {
    if (!slug) return

    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/${slug}/settings`)
        if (!res.ok) throw new Error()

        const data = await res.json()
        reset(data)
        setLogoPreview(data.logo || null)
      } catch {
        setError("Chargement impossible des paramètres")

        toast({
          title: "Erreur",
          description: "Impossible de charger les paramètres",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug, reset, toast])

  /* ===================== AUTO SAVE ===================== */
  useEffect(() => {
    const subscription = watch((values) => {
      const timeout = setTimeout(async () => {
        if (!slug) return

        await fetch(`/api/${slug}/settings`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
      }, 1200)

      return () => clearTimeout(timeout)
    })

    return () => subscription.unsubscribe()
  }, [watch, slug])

  /* ===================== LOGO UPLOAD ===================== */
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <RefreshCw className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* ERROR BANNER */}
      {error && (
        <Alert className="border-red-500/40 bg-red-500/10">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Gestion avancée de votre organisation
        </p>
      </div>

      <form className="space-y-6">

        <Tabs defaultValue="general">

          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="notif">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="appearance">UI</TabsTrigger>
          </TabsList>

          {/* ================= GENERAL ================= */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Organisation</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* LOGO */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                    {logoPreview ? (
                      <img src={logoPreview} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 />
                    )}
                  </div>

                  <label className="cursor-pointer text-sm text-primary">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Upload logo
                    <input type="file" hidden onChange={handleLogo} />
                  </label>
                </div>

                <Input {...register("associationName")} placeholder="Nom organisation" />
                <Input {...register("email")} placeholder="Email" />
                <Input {...register("phone")} placeholder="Téléphone" />
                <Input {...register("address")} placeholder="Adresse" />

                <Textarea {...register("description")} placeholder="Description" />

                {/* MONNAIE */}
                <Select
                  value={watch("currency")}
                  onValueChange={(v: "XOF" | "EUR" | "USD") =>
                    setValue("currency", v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XOF">FCFA</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= NOTIFICATIONS ================= */}
          <TabsContent value="notif">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <Toggle label="Email" icon={Mail}
                  checked={watch("emailNotifications")}
                  onChange={(v: boolean) => setValue("emailNotifications", v)}
                />

                <Toggle label="SMS" icon={Smartphone}
                  checked={watch("smsNotifications")}
                  onChange={(v: boolean) => setValue("smsNotifications", v)}
                />

                <Toggle label="Rapports mensuels"
                  checked={watch("monthlyReports")}
                  onChange={(v: boolean) => setValue("monthlyReports", v)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= SECURITY ================= */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>

              <CardContent>
                <Toggle
                  label="2FA (Double authentification)"
                  icon={Shield}
                  checked={watch("twoFactorAuth")}
                  onChange={(v: boolean) => setValue("twoFactorAuth", v)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= APPEARANCE ================= */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Interface</CardTitle>
              </CardHeader>

  
            </Card>
          </TabsContent>

        </Tabs>

        {/* SAVE */}
        <Button type="submit" disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>

      </form>
    </div>
  )
}

/* ================= REUSABLE TOGGLE ================= */
function Toggle({
  label,
  icon: Icon,
  checked,
  onChange,
}: {
  label: string
  icon?: any
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-xl">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <span>{label}</span>
      </div>

      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}