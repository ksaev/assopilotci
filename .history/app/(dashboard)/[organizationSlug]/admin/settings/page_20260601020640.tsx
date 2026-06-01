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
  Upload,
  Moon,
  Sun,
  Globe,
  Mail,
  Smartphone,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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

/* ======================= PAGE ======================= */

export default function SettingsPage({
  params,
}: {
  params: Promise<{ organizationSlug: string }>
}) {
  const { toast } = useToast()

  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [logo, setLogo] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      associationName: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      currency: "XOF",
      language: "fr",
      emailNotifications: true,
      smsNotifications: false,
      paymentReminders: true,
      eventReminders: true,
      monthlyReports: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  })

  /* ================= LOAD PARAM ================= */
  useEffect(() => {
    params
      .then((p) => setSlug(p.organizationSlug))
      .catch(() => setError("Impossible de charger l'organisation"))
  }, [params])

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!slug) return

    const load = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/${slug}/settings`)
        if (!res.ok) throw new Error()

        const data = await res.json()

        reset(data)
        setLogo(data.logo || null)
      } catch {
        setError("Impossible de charger les paramètres")

        toast({
          title: "Erreur",
          description: "Chargement impossible",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug, reset, toast])

  /* ================= AUTO SAVE ================= */
  useEffect(() => {
    const sub = watch((values) => {
      const t = setTimeout(async () => {
        if (!slug) return

        await fetch(`/api/${slug}/settings`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
      }, 1200)

      return () => clearTimeout(t)
    })

    return () => sub.unsubscribe()
  }, [watch, slug])

  /* ================= LOGO ================= */
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setLogo(reader.result as string)
    reader.readAsDataURL(file)
  }
  

  const onSubmit = async (
  data: SettingsInput
) => {
  try {
    const res = await fetch(
      `/api/${slug}/settings`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...data,
          logo,
        }),
      }
    )

    if (!res.ok) {
      throw new Error()
    }

    toast({
      title: "Succès",
      description:
        "Paramètres enregistrés",
    })
  } catch {
    toast({
      title: "Erreur",
      description:
        "Impossible de sauvegarder",
      variant: "destructive",
    })
  }
}


  return (
    <div className="space-y-6">

      {/* ERROR */}
      {error && (
        <Alert className="border-red-500/30 bg-red-500/10">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Gestion professionnelle de votre organisation
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* ================= GENERAL ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Organisation</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                {logo ? (
                  <img src={logo} className="w-full h-full object-cover" />
                ) : (
                  <Building2 />
                )}
              </div>

              <label className="text-sm text-primary cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload logo
                <input type="file" hidden onChange={handleLogo} />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="Nom organisation" {...register("associationName")} />
              <Input placeholder="Email" {...register("email")} />
              <Input placeholder="Téléphone" {...register("phone")} />
              <Input placeholder="Adresse" {...register("address")} />
            </div>

            <Textarea placeholder="Description" {...register("description")} />

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
                <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* ================= NOTIFICATIONS ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            <Toggle label="Email" icon={Mail}
              checked={watch("emailNotifications")}
              onChange={(v) => setValue("emailNotifications", v)}
            />

            <Toggle label="SMS" icon={Smartphone}
              checked={watch("smsNotifications")}
              onChange={(v) => setValue("smsNotifications", v)}
            />

            <Toggle label="Rapports mensuels"
              checked={watch("monthlyReports")}
              onChange={(v) => setValue("monthlyReports", v)}
            />
          </CardContent>
        </Card>

        {/* ================= SECURITY ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>

          <CardContent>
            <Toggle
              label="Double authentification (2FA)"
              icon={Shield}
              checked={watch("twoFactorAuth")}
              onChange={(v) => setValue("twoFactorAuth", v)}
            />
          </CardContent>
        </Card>

        {/* SAVE */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Sauvegarde..." : "Enregistrer"}
        </Button>

      </form>
    </div>
  )
}

/* ================= TOGGLE COMPONENT ================= */
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