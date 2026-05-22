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
  RefreshCw,
  AlertTriangle,
  Mail,
  Smartphone,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
  const [notificationShown, setNotificationShown] = useState(false)

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

  /* =========================
     INIT PARAMS
  ========================= */
  useEffect(() => {
    params.then((p) => setOrganizationSlug(p.organizationSlug))
  }, [params])

  /* =========================
     LOAD SETTINGS
  ========================= */
  async function loadSettings() {
    if (!organizationSlug) return

    try {
      setLoading(true)
      setLoadError(false)

      const res = await fetch(`/api/${organizationSlug}/settings`)

      if (!res.ok) throw new Error("LOAD_FAILED")

      const data = await res.json()

      reset(data)
    } catch (error) {
      console.error(error)

      setLoadError(true)

      // ⚠️ NOTIFICATION UNIQUE (anti spam)
      if (!notificationShown) {
        toast({
          title: "Chargement impossible",
          description:
            "Les paramètres n'ont pas pu être chargés. Vérifiez votre connexion ou réessayez.",
          variant: "destructive",
        })

        setNotificationShown(true)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [organizationSlug])

  /* =========================
     SAVE SETTINGS
  ========================= */
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
        description: "Paramètres mis à jour avec succès",
      })
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder",
        variant: "destructive",
      })
    }
  }

  /* =========================
     LOADING BLOCK UI
  ========================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            Chargement des paramètres...
          </p>
        </motion.div>
      </div>
    )
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gestion de votre organisation
        </p>
      </div>

      {/* ERROR ALERT (persistant) */}
      {loadError && (
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Les données n'ont pas pu être chargées
            </span>

            <Button
              size="sm"
              variant="outline"
              onClick={loadSettings}
            >
              Réessayer
            </Button>
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
                  Informations principales
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input placeholder="Nom" {...register("associationName")} />
                <Input placeholder="Email" {...register("email")} />
                <Input placeholder="Téléphone" {...register("phone")} />
                <Input placeholder="Adresse" {...register("address")} />
                <Textarea placeholder="Description" {...register("description")} />
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
                  desc="Notifications email"
                  icon={<Mail className="w-4 h-4" />}
                  value={watch("emailNotifications")}
                  onChange={(v) => setValue("emailNotifications", v)}
                />

                <Toggle
                  label="SMS"
                  desc="Notifications SMS"
                  icon={<Smartphone className="w-4 h-4" />}
                  value={watch("smsNotifications")}
                  onChange={(v) => setValue("smsNotifications", v)}
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
                  icon={<Shield className="w-4 h-4" />}
                  value={watch("twoFactorAuth")}
                  onChange={(v) => setValue("twoFactorAuth", v)}
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

/* =========================
   TOGGLE COMPONENT PRO
========================= */
function Toggle({
  label,
  desc,
  value,
  onChange,
  icon,
}: any) {
  return (
    <div className="flex items-center justify-between border rounded-xl p-4">
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