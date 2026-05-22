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
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

import { settingsSchema, type SettingsInput } from "@/lib/validations"

export default function SettingsPage({
  params,
}: {
  params: Promise<{ organizationSlug: string }>
}) {
  const { toast } = useToast()

  const [organizationSlug, setOrganizationSlug] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

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

  /* ---------------- LOAD PARAMS ---------------- */
  useEffect(() => {
    async function init() {
      try {
        const resolved = await params
        setOrganizationSlug(resolved.organizationSlug)
      } catch {
        setLoadError(true)
      }
    }
    init()
  }, [params])

  /* ---------------- LOAD SETTINGS ---------------- */
  async function loadSettings() {
    if (!organizationSlug) return

    try {
      setLoading(true)
      setLoadError(false)

      const res = await fetch(`/api/${organizationSlug}/settings`)
      const data = await res.json()

      reset(data)
    } catch {
      setLoadError(true)
      toast({
        title: "Erreur",
        description: "Chargement impossible",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [organizationSlug])

  /* ---------------- SAVE ---------------- */
  async function onSubmit(values: SettingsInput) {
    try {
      const res = await fetch(`/api/${organizationSlug}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error()

      toast({
        title: "Succès",
        description: "Paramètres enregistrés",
      })
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder",
        variant: "destructive",
      })
    }
  }

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </motion.div>
      </div>
    )
  }

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gestion de l'organisation</p>
      </div>

      {/* ERROR */}
      {loadError && (
        <Alert className="border-red-500/30">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="flex justify-between items-center">
            Erreur de chargement
            <Button size="sm" onClick={loadSettings}>
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* TABS */}
      <Tabs defaultValue="general">

        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="general">
            <Building2 className="w-4 h-4 mr-2" /> Général
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" /> Sécurité
          </TabsTrigger>
        </TabsList>

        {/* GENERAL */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Infos organisation</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
              <Input placeholder="Nom" {...register("associationName")} />
              <Input placeholder="Email" {...register("email")} />
              <Input placeholder="Téléphone" {...register("phone")} />
              <Input placeholder="Adresse" {...register("address")} />
              <Textarea placeholder="Description" {...register("description")} />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={watch("language")}
                  onValueChange={(v) => setValue("language", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">FR</SelectItem>
                    <SelectItem value="en">EN</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={watch("currency")}
                  onValueChange={(v) => setValue("currency", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XOF">FCFA</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex justify-between">
                <span>Email</span>
                <Switch
                  checked={watch("emailNotifications")}
                  onCheckedChange={(v) => setValue("emailNotifications", v)}
                />
              </div>

              <div className="flex justify-between">
                <span>SMS</span>
                <Switch
                  checked={watch("smsNotifications")}
                  onCheckedChange={(v) => setValue("smsNotifications", v)}
                />
              </div>

              <div className="flex justify-between">
                <span>Rappels paiement</span>
                <Switch
                  checked={watch("paymentReminders")}
                  onCheckedChange={(v) => setValue("paymentReminders", v)}
                />
              </div>

              <div className="flex justify-between">
                <span>Événements</span>
                <Switch
                  checked={watch("eventReminders")}
                  onCheckedChange={(v) => setValue("eventReminders", v)}
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between">
                <span>2FA</span>
                <Switch
                  checked={watch("twoFactorAuth")}
                  onCheckedChange={(v) => setValue("twoFactorAuth", v)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* SAVE */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Sauvegarde..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  )
}