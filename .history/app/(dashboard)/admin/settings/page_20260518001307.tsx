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

type Props = {
  params: Promise<{ organizationSlug: string }>
}

export default function SettingsPage({ params }: Props) {
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

  // resolve params
  useEffect(() => {
    params
      .then((p) => setOrganizationSlug(p.organizationSlug))
      .catch(() => {
        setLoadError(true)
        toast({
          title: "Erreur",
          description: "Impossible de charger l'organisation",
          variant: "destructive",
        })
      })
  }, [params, toast])

  // load settings
  useEffect(() => {
    if (!organizationSlug) return

    const load = async () => {
      try {
        setLoading(true)
        setLoadError(false)

        const res = await fetch(`/api/${organizationSlug}/settings`)

        if (!res.ok) throw new Error()

        const data = await res.json()

        reset({
          associationName: data.associationName ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          description: data.description ?? "",
          language: data.language ?? "fr",
          currency: data.currency ?? "XOF",
          emailNotifications: data.emailNotifications ?? true,
          smsNotifications: data.smsNotifications ?? false,
          paymentReminders: data.paymentReminders ?? true,
          eventReminders: data.eventReminders ?? true,
          monthlyReports: data.monthlyReports ?? true,
          twoFactorAuth: data.twoFactorAuth ?? false,
          sessionTimeout: data.sessionTimeout ?? 30,
        })
      } catch {
        setLoadError(true)
        toast({
          title: "Chargement impossible",
          description: "Les paramètres n'ont pas pu être récupérés",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [organizationSlug, reset, toast])

  const onSubmit = async (values: SettingsInput) => {
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
        description: "Impossible de sauvegarder",
        variant: "destructive",
      })
    }
  }


  return (
    <div className="space-y-6">

      {/* ERROR STATE */}
      {loadError && (
        <Alert className="border-red-500/30 bg-red-500/10">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>Impossible de charger les paramètres</span>
            <Button size="sm" onClick={() => location.reload()}>
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gestion complète de votre organisation
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <Tabs defaultValue="general">

          {/* GENERAL */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
                <CardDescription>Organisation</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 sm:grid-cols-2">

                <div>
                  <Label>Nom</Label>
                  <Input {...register("associationName")} />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} />
                </div>

                <div>
                  <Label>Téléphone</Label>
                  <Input {...register("phone")} />
                </div>

                <div>
                  <Label>Adresse</Label>
                  <Input {...register("address")} />
                </div>

                <div className="sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea {...register("description")} />
                </div>

                {/* LANGUE */}
                <div>
                  <Label>Langue</Label>
                  <Select
                    value={watch("language")}
                    onValueChange={(v: "fr" | "en") =>
                      setValue("language", v)
                    }
                  >
                    <SelectTrigger>
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">FR</SelectItem>
                      <SelectItem value="en">EN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* MONNAIE PRO */}
                <div>
                  <Label>Monnaie</Label>
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
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="USD">Dollar</SelectItem>
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
                <CardDescription>Préférences</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Mail />
                    <div>
                      <p>Email</p>
                      <p className="text-sm text-muted-foreground">Alertes email</p>
                    </div>
                  </div>

                  <Switch
                    checked={watch("emailNotifications")}
                    onCheckedChange={(v: boolean) =>
                      setValue("emailNotifications", v)
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Smartphone />
                    <div>
                      <p>SMS</p>
                      <p className="text-sm text-muted-foreground">Alertes SMS</p>
                    </div>
                  </div>

                  <Switch
                    checked={watch("smsNotifications")}
                    onCheckedChange={(v: boolean) =>
                      setValue("smsNotifications", v)
                    }
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Shield />
                    <div>
                      <p>2FA</p>
                      <p className="text-sm text-muted-foreground">Double authentification</p>
                    </div>
                  </div>

                  <Switch
                    checked={watch("twoFactorAuth")}
                    onCheckedChange={(v: boolean) =>
                      setValue("twoFactorAuth", v)
                    }
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
    </div>
  )
}