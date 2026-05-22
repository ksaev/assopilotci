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

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

  // INIT PARAMS
  useEffect(() => {
    params.then((p) => setOrganizationSlug(p.organizationSlug))
  }, [params])

  // LOAD SETTINGS
  async function loadSettings() {
    if (!organizationSlug) return

    try {
      setLoading(true)
      setLoadError(false)

      const res = await fetch(`/api/${organizationSlug}/settings`)
      if (!res.ok) throw new Error()

      const data = await res.json()

      reset({
        ...data,
      })
    } catch {
      setLoadError(true)
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [organizationSlug])

  // SAVE SETTINGS
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
        description: "Paramètres sauvegardés",
      })
    } catch {
      toast({
        title: "Erreur",
        description: "Sauvegarde impossible",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gestion de votre organisation
        </p>
      </div>

      {/* ERROR */}
      {loadError && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            Erreur de chargement des données
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <Tabs defaultValue="general">

          {/* GENERAL */}
          <TabsList>
            <TabsTrigger value="general">
              <Building2 className="w-4 h-4 mr-2" />
              Général
            </TabsTrigger>

            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>

            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* GENERAL */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Organisation</CardTitle>
                <CardDescription>
                  Infos principales
                </CardDescription>
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

                <Toggle
                  label="Email"
                  desc="Notifications par email"
                  value={watch("emailNotifications")}
                  onChange={(v) => setValue("emailNotifications", v)}
                  icon={<Mail className="w-4 h-4" />}
                />

                <Toggle
                  label="SMS"
                  desc="Notifications SMS"
                  value={watch("smsNotifications")}
                  onChange={(v) => setValue("smsNotifications", v)}
                  icon={<Smartphone className="w-4 h-4" />}
                />

                <Toggle
                  label="Rappels paiement"
                  desc="Cotisations"
                  value={watch("paymentReminders")}
                  onChange={(v) => setValue("paymentReminders", v)}
                />

                <Toggle
                  label="Événements"
                  desc="Réunions & alertes"
                  value={watch("eventReminders")}
                  onChange={(v) => setValue("eventReminders", v)}
                />

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
                <Toggle
                  label="Double authentification"
                  desc="Sécurité renforcée"
                  value={watch("twoFactorAuth")}
                  onChange={(v) => setValue("twoFactorAuth", v)}
                  icon={<Shield className="w-4 h-4" />}
                />
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
    </div>
  )
}

/* ===================== */
/* COMPONENT TOGGLE PRO  */
/* ===================== */

function Toggle({
  label,
  desc,
  value,
  onChange,
  icon,
}: any) {
  return (
    <div className="flex items-center justify-between border p-4 rounded-xl">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>

      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  )
}